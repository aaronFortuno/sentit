'use strict';
// Offline integration check: authorization, PCM splices and the current public master.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { waveParts } = require('./gemini-result.cjs');
const { assertExactSelection } = require('./render-reviewed-revision.cjs');
const root = path.resolve(__dirname, '..');
const sha = data => createHash('sha256').update(data).digest('hex');

(async () => {
  const { activities } = await import('../catalogue.js');
  const { productionProgress } = await import('../content/production-progress.js');
  let edits = 0;
  for (const code of ['S007', 'S013', 'S024', 'S029', 'S069', 'S082']) {
    const progress = productionProgress['ca-' + code];
    const folder = path.join(root, '../output/sentit-primera-tanda', code.toLowerCase(), code === 'S013' ? 'reviewed-repair-v4' : 'reviewed-repair-v3');
    const record = JSON.parse(await fs.readFile(path.join(folder, 'repair-application.json')));
    assertExactSelection(code, record, progress.repairApplicationApproval);
    const originalBytes = await fs.readFile(record.originalRawFile);
    const patchedBytes = await fs.readFile(record.patchedFile);
    assert.equal(sha(originalBytes), record.originalRawSha256, code + ' original identity');
    assert.equal(sha(patchedBytes), record.patchedSha256, code + ' patched identity');
    const original = waveParts(originalBytes), patched = waveParts(patchedBytes);
    assert(original.format.equals(patched.format));
    const rate = patched.format.readUInt32LE(4), frame = patched.format.readUInt16LE(12);
    const offset = seconds => Math.round(seconds * rate) * frame;
    const coverage = [];
    for (const kept of record.retainedRanges) {
      const source = original.pcm.subarray(offset(kept.originalStart), offset(kept.originalEnd));
      const start = offset(kept.outputStart), result = patched.pcm.subarray(start, start + source.length);
      assert.equal(sha(source), kept.sha256);
      assert(result.equals(source), code + ' unchanged PCM outside repairs');
      coverage.push([start, start + source.length]);
    }
    for (const edit of record.edits) {
      assert.equal(edit.text, edit.accepted.text);
      assert.equal(sha(await fs.readFile(path.join(root, edit.accepted.candidateFile))), edit.accepted.candidateSha256);
      const bytes = await fs.readFile(edit.candidateRawFile);
      assert.equal(sha(bytes), edit.candidateRawSha256);
      const candidate = waveParts(bytes);
      assert(candidate.format.equals(patched.format));
      const fragment = candidate.pcm.subarray(offset(edit.candidateRange.start), offset(edit.candidateRange.end));
      const start = offset(edit.outputStart), actual = patched.pcm.subarray(start, start + fragment.length);
      const gain = 10 ** (edit.gainDb / 20);
      let peak = 0;
      for (let n = 0; n < fragment.length; n += 2) {
        const value = Math.round(fragment.readInt16LE(n) * gain);
        assert.equal(actual.readInt16LE(n), value, code + ' constant gain only');
        peak = Math.max(peak, Math.abs(value));
      }
      assert.equal(peak, edit.peakAfterGain);
      assert(peak <= 30000);
      assert([...edit.originalRange.handles, ...edit.candidateRange.handles].every(db => db <= -40));
      coverage.push([start, start + fragment.length]);
      const receipt = progress.receivedRepairs.find(r => r.part === edit.part);
      assert(receipt.applied);
      assert.equal(receipt.candidateFile, edit.accepted.candidateFile);
      edits++;
    }
    coverage.sort((a, b) => a[0] - b[0]);
    let cursor = 0;
    for (const [start, end] of coverage) { assert.equal(start, cursor, code + ' complete, non-overlapping PCM proof'); cursor = end; }
    assert.equal(cursor, patched.pcm.length);
    assert.equal(record.newRequests, 0);
    assert.equal(record.voiceRetimed, false);
    assert.equal(record.pitchShifted, false);
    const manifest = JSON.parse(await fs.readFile(path.join(root, 'assets/audio', code.toLowerCase() + '-production-manifest.json')));
    assert.equal(manifest.repairApplication.patchedSha256, record.patchedSha256);
    assert.equal(manifest.repairApplication.scope, record.scope);
    assert.equal(sha(await fs.readFile(path.join(root, 'assets/audio', manifest.file))), manifest.sha256);
    assert.equal(activities.find(a => a.code === code).audio, './assets/audio/' + manifest.file);
    if (progress.state === 'montage-awaiting-listening') assert.equal(progress.listeningApproval, false);
    if (record.scope === 'provisional-timbre-trial' && progress.timbreReview?.status === 'pending-listening') {
      assert.notEqual(progress.voiceApproval?.status, 'approved');
      assert.equal(progress.timbreReview.trialAudio, './assets/audio/' + manifest.file);
      assert.notEqual(progress.timbreReview.previousAudio, progress.timbreReview.trialAudio);
    }
    // The guard must reject crossed identities even if outer part names remain unique.
    const changed = structuredClone(record); changed.edits[0].accepted.candidateSha256 = 'changed';
    assert.throws(() => assertExactSelection(code, changed, progress.repairApplicationApproval));
    const wrongScope = structuredClone(record); wrongScope.scope += '-changed';
    assert.throws(() => assertExactSelection(code, wrongScope, progress.repairApplicationApproval));
    assert.throws(() => assertExactSelection('wrong-code', record, progress.repairApplicationApproval));
    if (record.edits.length > 1) {
      const duplicate = structuredClone(record); duplicate.edits[1].accepted = duplicate.edits[0].accepted;
      assert.throws(() => assertExactSelection(code, duplicate, progress.repairApplicationApproval));
      duplicate.edits[1] = duplicate.edits[0];
      assert.throws(() => assertExactSelection(code, duplicate, progress.repairApplicationApproval));
    }
  }
  const titlePending = productionProgress['ca-S061'];
  if (titlePending.missingVoiceParts?.includes('introduction')) {
    assert.equal(titlePending.bodyVoiceApproval.status, 'approved');
    assert.equal(titlePending.bodyVoiceApproval.confirmedAfterMetadataCleanup, true);
    assert.equal(sha(await fs.readFile(path.join(root, titlePending.bodyVoiceApproval.sourcePreviewFile))), titlePending.bodyVoiceApproval.sourcePreviewSha256);
    assert.equal(titlePending.voiceApproval, false);
    assert.equal(activities.find(a => a.code === 'S061').audio, null);
  }
  console.log(JSON.stringify({ pass: true, repairedMontages: 6, exactRepairs: edits, retainedPcmIdentical: true, newRequests: 0 }));
})().catch(error => { console.error(error.stack); process.exitCode = 1; });
