import assert from 'node:assert/strict';
import { activities } from '../catalogue.js';
import { editorialReviews } from '../content/editorial-reviews.js';
import { editorialFingerprint, registerEditorialReviews, isEditoriallyReviewed, reviewCaption, hasPendingMontage } from '../editorial-review.js';
import { strings } from '../locales.js';

const pending = activities.filter(entry => entry.reviewStatus === 'pending');
for (const entry of pending) {
  const record = editorialReviews[`${entry.language}-${entry.code}`];
  assert.equal(record?.status, 'passed', `${entry.code}: falta la revisió independent final`);
  assert.equal(record.fingerprint, await editorialFingerprint(entry), `${entry.code}: la revisió és d'una altra versió`);
  assert(isEditoriallyReviewed(entry), `${entry.code}: només el contingut exacte revisat és provisional`);
  assert.equal(reviewCaption(entry, strings.ca), hasPendingMontage(entry)?strings.ca.reviewVoicesReceived:strings.ca.reviewProvisional);
}
for (const key of Object.keys(editorialReviews)) assert(activities.some(entry => `${entry.language}-${entry.code}` === key), `${key}: registre sense activitat`);
const original = pending[0], key = `${original.language}-${original.code}`;
for (const change of ['dialogue', 'question', 'answer', 'evidence', 'cue', 'voices']) {
  const modified = structuredClone(original);
  if (change === 'dialogue') modified.transcript.find(part => part.speaker).text += ' Nou fet.';
  if (change === 'question') modified.questions[0].prompt += ' Un altre supòsit?';
  if (change === 'answer') modified.questions[0].answer += ' Una altra resposta.';
  if (change === 'evidence') modified.questions[0].evidence[0].quote += ' Una altra pista.';
  if (change === 'cue') modified.transcript.find(part => part.kind === 'direction').text += ' Canvi d’espai.';
  if (change === 'voices') modified.production.voices = {...modified.production.voices, Extra: 'Aoede'};
  await registerEditorialReviews([modified], {[key]: editorialReviews[key]});
  assert(!isEditoriallyReviewed(modified), `${change}: un canvi invalida la revisió`);
  assert.equal(reviewCaption(modified, strings.ca), strings.ca.reviewInProgress);
}
const unreviewed = structuredClone(original);
await registerEditorialReviews([unreviewed], {});
assert(!isEditoriallyReviewed(unreviewed), 'L’absència de registre no és una aprovació');
await registerEditorialReviews([unreviewed], {[key]: {...editorialReviews[key], status: 'awaiting-review'}});
assert(!isEditoriallyReviewed(unreviewed));
assert(pending.every(entry => entry.audio === null && entry.reviewStatus === 'pending'));
console.log(`PASS · ${pending.length} revisions independents exactes; canvis de guió, preguntes, respostes, pistes, sons i veus invaliden la marca provisional. Sense aprovació docent ni síntesi.`);
