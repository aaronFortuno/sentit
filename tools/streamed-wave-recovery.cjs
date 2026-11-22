'use strict';
// Explicit recovery of a provider WAV prefix followed by PCM. Strict normal
// WAV parsing remains unchanged. Preserve the entire provider response too.
const { createHash } = require('node:crypto');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
function recoverStreamedWave(bytes) {
  if (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WAVE') throw Error('Not a RIFF/WAVE prefix');
  const end = bytes.readUInt32LE(4) + 8, chunks = [];
  if (end < 44 || end >= bytes.length) throw Error('No trailing stream to recover');
  for (let at = 12; at < end;) {
    if (at + 8 > end) throw Error('Truncated prefix');
    const tag = bytes.toString('ascii', at, at + 4), size = bytes.readUInt32LE(at + 4), next = at + 8 + size + size % 2;
    if (next > end) throw Error('Truncated prefix chunk');
    chunks.push({ tag, data: bytes.subarray(at + 8, at + 8 + size) }); at = next;
  }
  if (chunks.map(chunk => chunk.tag).join(',') !== 'fmt ,data,C2PA') throw Error('Unknown prefix layout: no automatic recovery');
  const [fmt, first] = chunks.map(chunk => chunk.data), rest = bytes.subarray(end);
  if (fmt.length !== 16 || fmt.readUInt16LE(0) !== 1 || fmt.readUInt16LE(2) !== 1 || fmt.readUInt16LE(14) !== 16 || fmt.readUInt16LE(12) !== 2 || fmt.readUInt32LE(4) !== 24000 || fmt.readUInt32LE(8) !== 48000 || first.length % 2 || rest.length % 2) throw Error('Unsupported PCM format');
  if (first.length !== 1920) throw Error('Unexpected first streaming frame');
  const pcm = Buffer.concat([first, rest]), audio = Buffer.alloc(44 + pcm.length);
  audio.write('RIFF'); audio.writeUInt32LE(audio.length - 8, 4); audio.write('WAVEfmt ', 8); audio.writeUInt32LE(16, 16); fmt.copy(audio, 20); audio.write('data', 36); audio.writeUInt32LE(pcm.length, 40); pcm.copy(audio, 44);
  return { audio, report: { mode: 'riff-c2pa-prefix-plus-pcm-v1', providerWaveSha256: sha(bytes), recoveredWaveSha256: sha(audio), pcmSha256: sha(pcm), prefixPcmBytes: first.length, trailingPcmBytes: rest.length, metadataBytes: chunks[2].data.length, seconds: pcm.length / 48000, allPcmSamplesPreserved: true, voiceRetimed: false } };
}
module.exports = { recoverStreamedWave };
if (require.main === module) (async () => {
  const fs = require('node:fs/promises'), path = require('node:path'), { promisify } = require('node:util'), { gzip } = require('node:zlib');
  const id = process.argv.find(arg => arg.startsWith('--only='))?.slice(7).toUpperCase(), root = path.resolve(__dirname, '..'), catalogue = JSON.parse(await fs.readFile(path.join(root, 'content/synthesis-batches.json'))), batch = catalogue.batches.find(batch => batch.id === id);
  if (!batch?.approvedRequestHash || batch.state === 'received') throw Error('Need a frozen unreceived batch');
  const folder = path.resolve(root, '../output/sentit-primera-tanda/mixed-batches', id.toLowerCase() + '-' + batch.approvedRequestHash.slice(0, 12));
  const attemptFile = path.join(folder, 'attempt.json'), attempt = JSON.parse(await fs.readFile(attemptFile)), server = JSON.parse(await fs.readFile(path.join(folder, 'interaction.json')));
  const bytes = await fs.readFile(path.join(folder, 'response.json')), result = JSON.parse(bytes), clips = result.steps.flatMap(step => step.content ?? []).filter(item => item.type === 'audio');
  if (attempt.state !== 'failed-or-uncertain' || attempt.requestHash !== batch.approvedRequestHash || server.requestHash !== batch.approvedRequestHash || result.id !== server.id || result.status !== 'completed' || result.model !== 'gemini-3.8-flash-tts' || clips.length !== 1) throw Error('Unverified response identity');
  const recovered = recoverStreamedWave(Buffer.from(clips[0].data, 'base64'));
  require('./audio-files.cjs').checkWave(recovered.audio);
  await fs.writeFile(path.join(folder, 'provider-wave.wav'), Buffer.from(clips[0].data, 'base64'), { flag: 'wx' });
  await fs.writeFile(path.join(folder, 'wave-recovery.json'), JSON.stringify({ ...recovered.report, providerId: result.id, newRequests: 0, pronunciationValidated: false }, null, 2) + '\n');
  await fs.writeFile(path.join(folder, 'raw.wav'), recovered.audio, { flag: 'wx' });
  await fs.writeFile(path.join(folder, 'response.json.gz'), await promisify(gzip)(bytes));
  Object.assign(attempt, { state: 'raw-received', completedAt: new Date().toISOString(), rawSha256: recovered.report.recoveredWaveSha256, responseSha256: sha(bytes), responseFile: 'response.json.gz', waveRecovery: recovered.report });
  await fs.writeFile(attemptFile, JSON.stringify(attempt, null, 2) + '\n');
  console.log(JSON.stringify({ batch: id, ...recovered.report, newRequests: 0, coverage: 'requires-local-alignment' }));
})().catch(error => { console.error(error.message); process.exitCode = 1; });
