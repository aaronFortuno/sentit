import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { activities } from '../catalogue.js';
import { listeningContexts, listeningContext } from '../content/listening-contexts.js';

const sha = value => createHash('sha256').update(value).digest('hex');
const review = JSON.parse(await readFile(new URL('../content/listening-context-review.json', import.meta.url), 'utf8'));
assert.equal(review.status, 'passed');
assert(review.reviewer && /^\d{4}-\d{2}-\d{2}$/u.test(review.reviewedAt));
assert.equal(review.fileSha256, sha(await readFile(new URL('../content/listening-contexts.js', import.meta.url))), 'Context text changed since independent review');
const keys = activities.map(entry => `${entry.language}-${entry.code}`).sort();
assert.deepEqual(Object.keys(listeningContexts).sort(), keys, 'Every activity and variant needs its own context');
assert.deepEqual(Object.keys(review.entries).sort(), keys);
for (const entry of activities) {
  const key = `${entry.language}-${entry.code}`, text = listeningContext(entry);
  assert.equal(typeof text, 'string');
  const words = text.split(/\s+/u).length;
  assert(words >= 20 && words <= 75, key + ': keep the context brief');
  assert(!/[<>]/u.test(text), key + ': plain text only');
  const source = JSON.stringify({
    code: entry.code, language: entry.language, title: entry.title, introduction: entry.introduction,
    transcript: entry.transcript.filter(part => part.speaker).map(({ speaker, text }) => ({ speaker, text })),
    questions: entry.questions.map(({ id, prompt, answer }) => ({ id, prompt, answer })),
  });
  assert.equal(review.entries[key].contextSha256, sha(text), key + ': unreviewed context');
  assert.equal(review.entries[key].sourceSha256, sha(source), key + ': source changed; check the context again');
}
assert.equal(listeningContext({language:'es',code:'S001'}), '', 'No Catalan fallback for another language');
console.log(`PASS · ${keys.length} contexts, exact independent review, source and answer consistency fingerprints; no synthesis.`);
