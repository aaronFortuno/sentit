'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs/promises'), path = require('node:path');
const { buildBatch } = require('./synthesis-batch.cjs');
const { plainSpeechForecast } = require('./synthesis-forecast.cjs');

(async () => {
  const { activities } = await import('../catalogue.js');
  const plans = require('../content/production-plans.json'), repairs = require('../content/audio-repairs.json');
  const catalogue = require('../content/synthesis-batches.json'), proposals = require('../content/synthesis-proposals.json');
  const logFile = path.resolve(__dirname, '../../output/sentit-primera-tanda/request-log.json');
  const logBefore = await fs.readFile(logFile, 'utf8');
  const reserved = new Set();
  let ready = 0;
  for (const batch of catalogue.batches.filter(batch => ['planned', 'authorized'].includes(batch.state))) {
    for (const block of batch.blocks) {
      const id = block.take ?? block.code + '-' + block.part;
      assert(!reserved.has(id), 'Take repeated in active batches: ' + id);
      reserved.add(id);
    }
    if (batch.speechTextFormat !== 'plain-v1') continue;
    const built = await buildBatch(activities, plans, repairs, batch);
    const entries = batch.blocks.map(block => activities.find(entry => entry.code === block.code));
    assert.equal(plainSpeechForecast(entries).seconds, built.estimate.seconds, batch.id + ': forecast equals the final input');
    assert.equal(built.requestHash, batch.approvedRequestHash, batch.id + ': frozen request retained');
    assert(built.estimate.seconds >= 360 && built.estimate.seconds <= 480);
    assert(built.estimatedInputTokens <= 8192);
    assert(!built.body.input[0].content.some(item => /<long pause>|<short pause>/u.test(item.text)));
    if (built.voices.length === 1) {
      assert(!JSON.stringify(built.body).includes('same two character voices'));
      assert(JSON.stringify(built.body).includes('same single character voice'));
    }
    ready++;
  }
  const codes = proposals.groups.flatMap(group => group.codes);
  assert.equal(new Set(codes).size, codes.length, 'No duplicated readings across alternative candidate groups');
  const remainder = proposals.groups.find(group => group.id === 'P13');
  assert(plainSpeechForecast(remainder.codes.map(code => activities.find(entry => entry.code === code))).seconds < 360, 'Short groups cannot gain artificial pause margins');
  const voiceForecast = plainSpeechForecast([activities.find(entry => entry.code === 'S069')]);
  assert.equal(voiceForecast.longPauses, 0);
  assert.equal(await fs.readFile(logFile, 'utf8'), logBefore, 'Planning reserves no requests');
  console.log(`PASS · ${ready} frozen inputs match plain forecasts, duration/token limits, single-voice direction, unique candidates, short-group guard and unchanged request log.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
