import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { activities, legacyActivities } from '../catalogue.js';
import { durationBounds, durationText, durationTier, matchesDuration } from '../activity-meta.js';
import { strings } from '../locales.js';
import { characters } from '../content/characters.js';

const ids = new Set();
const codes = new Set();
assert(!activities.some(entry => entry.sample), 'Technical pilots do not belong to the public catalogue');
for (const entry of [...activities, ...legacyActivities]) {
  assert(!ids.has(entry.id)); ids.add(entry.id);
  const code = `${entry.language}-${entry.code}`;
  assert(!codes.has(code)); codes.add(code);
  assert(entry.title && entry.questions.length && strings.ca.grades[entry.grade] && strings.ca.levels[entry.level] && strings.ca.genres[entry.genre]);
  assert.equal(new Set(entry.questions.map(q => q.id)).size, entry.questions.length);
  assert(entry.questions.every(q => q.prompt && q.answer && Number.isInteger(q.lines) && q.lines >= 0));
  const bounds = durationBounds(entry);
  assert(bounds && bounds.min > 0 && bounds.max >= bounds.min, code + ' has an actual or explicitly estimated duration');
  if (entry.audio) {
    assert(!bounds.estimated);
    await access(new URL('../' + entry.audio, import.meta.url));
  } else {
    assert.equal(entry.status, 'awaiting-audio');
    assert(bounds.estimated);
  }
  if (entry.image) {
    assert(entry.image.alt && entry.image.width > 0 && entry.image.height > 0);
    await access(new URL('../' + entry.image.src, import.meta.url));
  }
}

for (const [seconds, expected] of [[60, 'short'], [60.1, 'medium'], [120, 'medium'], [120.1, 'long']]) {
  const entry = { audio: 'recording.mp3', fragment: { seconds } };
  assert.deepEqual(['short', 'medium', 'long'].filter(bucket => matchesDuration(entry, bucket)), [expected]);
}
const castIds = new Set();
const castVoices = new Set();
for (const character of characters) {
  assert(!castIds.has(character.id), 'Stable character IDs must be unique'); castIds.add(character.id);
  assert(!castVoices.has(character.voice.id), 'Distinct characters have distinct reference voices'); castVoices.add(character.voice.id);
  assert(['heard', 'candidate'].includes(character.voice.status));
  assert(character.name && character.look && character.personality && character.interests && character.delivery);
  await access(new URL('../' + character.modelSheet, import.meta.url));
  await access(new URL('../' + character.previewSheet, import.meta.url));
  for (const appearance of character.appearances) {
    const activity = activities.find(entry => `${entry.language}-${entry.code}` === appearance.code);
    assert(activity, 'Every appearance points to an existing activity');
    if (appearance.speaker) assert(activity.transcript.some(part => part.speaker === appearance.speaker));
    if (character.voice.status === 'heard' && appearance.currentVoice) assert.equal(character.voice.id, appearance.currentVoice);
  }
}
const draft = { audio: null, seconds: 0, fragment: { seconds: 0 }, durationEstimate: { min: 150, max: 180 } };
for (const [seconds, tier] of [[1, 1], [60, 1], [60.1, 2], [120, 2], [120.1, 3], [180, 3], [180.1, 4], [600, 4]]) {
  assert.equal(durationTier({ audio: 'ready.mp3', seconds }), tier);
}
assert.equal(durationTier({}), 0, 'Unknown lengths do not fill duration segments');
assert.equal(durationTier({ durationEstimate: { min: 50, max: 80 } }), 2, 'Estimated lengths use the upper bound');
assert(matchesDuration(draft, 'long'));
assert(!matchesDuration(draft, 'short'));
assert.equal(durationText(draft, key => strings.ca[key]), 'Prevista: 2:30–3:00');
assert(!matchesDuration({ audio: null, seconds: 0 }, 'short'), 'Unknown durations must not appear as short recordings');
assert.equal(durationBounds({ ...draft, audio: 'ready.mp3', fragment: { seconds: 145 } }).min, 145, 'Actual length replaces estimates after synthesis');
console.log('PASS · Catalogue, character identities and references, real files, questions and duration filter boundaries.');
