'use strict';
// Verify that shortening repeated directions preserves the frozen speech and cast.
const assert = require('node:assert/strict'), fs = require('node:fs/promises'), path = require('node:path');
const { buildBatch } = require('./synthesis-batch.cjs');
const { assertSynthesisWindow } = require('./audio-batch-policy.cjs');
(async () => {
  const root = path.resolve(__dirname, '..'), { activities } = await import('../catalogue.js');
  const read = file => fs.readFile(path.join(root, file), 'utf8').then(JSON.parse);
  const plans = await read('content/production-plans.json'), repairs = await read('content/audio-repairs.json'), catalog = await read('content/synthesis-batches.json');
  const log = path.resolve(root, '../output/sentit-primera-tanda/request-log.json'), before = await fs.readFile(log);
  const batch = catalog.batches.find(b => b.id === 'L35'), compact = await buildBatch(activities, plans, repairs, batch);
  assertSynthesisWindow(compact.body);
  assert(compact.estimatedInputTokens <= 8192);
  assert.deepEqual(compact.voices.map(v => v.voice), ['Erinome', 'Despina']);
  const normalize = text => text.replace(/\s+/gu, ' ').trim();
  for (const block of compact.blocks) {
    const entry = activities.find(a => a.code === block.code);
    assert.equal(normalize(block.items.map(item => item.text).join(' ')), normalize([entry.introduction, ...entry.transcript.filter(p => p.speaker).map(p => p.text)].join(' ')), block.code + ': every title and spoken word exactly once');
    assert(compact.body.input[0].content[block.firstItem].annotations[0].style.includes('separate complete recording'));
    assert(compact.body.input[0].content[block.lastItem].annotations[0].style.includes('Finish the final word fully'));
  }
  const verbose = structuredClone(batch); delete verbose.styleFormat;
  await assert.rejects(buildBatch(activities, plans, repairs, verbose), /8.192 tokens/);
  const unsupported = { ...batch, styleFormat: 'unknown' };
  await assert.rejects(buildBatch(activities, plans, repairs, unsupported), /Format de direcció/);
  const nonplain = { ...batch, speechTextFormat: undefined };
  await assert.rejects(buildBatch(activities, plans, repairs, nonplain), /text pla/);
  for (const id of ['L30', 'L31']) {
    const frozen = catalog.batches.find(b => b.id === id);
    assert.equal((await buildBatch(activities, plans, repairs, frozen)).requestHash, frozen.approvedRequestHash, 'Historical frozen requests stay identical');
  }
  assert.equal((await buildBatch(activities, plans, repairs, batch)).requestHash, compact.requestHash);
  assert((await fs.readFile(log)).equals(before));
  console.log('PASS · compact directions retain all speech, two voices, boundaries and prior frozen hashes; oversized, unsupported and nonplain requests rejected. Zero provider calls.');
})().catch(error => { console.error(error); process.exitCode = 1; });
