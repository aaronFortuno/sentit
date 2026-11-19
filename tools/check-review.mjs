import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { activities } from '../catalogue.js';
import { strings } from '../locales.js';
import { isPendingReview, reviewScript } from '../review.js';
import { takeParts } from '../generation-plan.js';
const require = createRequire(import.meta.url);
const { request } = require('./audio-plan.cjs');
const pending = activities.filter(isPendingReview);
assert.deepEqual(pending.map(entry => entry.code).sort(), ['S015', 'S023']);
for (const entry of pending) {
  assert.equal(entry.audio, null);
  const ids = ['introduction', ...entry.transcript.filter(part => part.speaker).map(part => part.id)];
  const takes = entry.generationPlan.takes;
  assert.deepEqual(takes.flatMap(take => take.parts), ids, `${entry.code}: exact ordered coverage, no missing or duplicated spoken parts`);
  for (const take of takes) {
    assert([0,1].includes(take.requests));
    assert(takeParts(entry,take).every(part => part?.speaker && part.text && part.kind !== 'direction'));
    if (take.source) await access(new URL('../'+take.source,import.meta.url));
    if (!take.requests) assert(take.reuse && take.note);
  }
  const script = reviewScript(entry, strings.ca);
  assert.equal(script.filter(part => part.kind === 'take').length, takes.length);
  assert.equal(script.filter(part => part.speaker).length, ids.length);
  assert(script.some(part => part.kind === 'direction' && part.text.includes('60 segons')));
  const altered = reviewScript(entry, strings.ca, { reading: 0, listens: 1, interval: 0, jingle: false });
  assert(!altered.some(part => part.text === strings.ca.reviewSignature));
  assert(altered.some(part => part.text === strings.ca.reviewRepetition(1,0,true)));
}
assert.equal(pending.flatMap(entry=>entry.generationPlan.takes).reduce((sum,take)=>sum+take.requests,0),3);
const radio = activities.find(entry=>entry.code==='S008R');
const body = takeParts(radio,radio.generationPlan.takes[1]);
const payload = request(body,{voices:{Narradora:'Aoede'},pace:'Test only. No request sent.'});
assert.equal(body.length,8);
assert(payload.input[0].content[0].text.startsWith('Benvingudes'));
assert(payload.input[0].content.at(-1).text.endsWith('pròxim programa.'));
assert(!JSON.stringify(payload).includes('Entrada del programa:'));
assert(activities.find(entry=>entry.code==='S008').audio,'Existing S008 stays available through the same code');
console.log('PASS · Review scripts, three planned new calls, exact take boundaries, conserved recordings, complete narration, montage exclusion and existing S008 preserved. Zero synthesis.');
