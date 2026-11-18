import assert from 'node:assert/strict';
import { activities } from '../catalogue.js';
import { buildEvidence, evidenceQuestions, evidenceSegments } from '../evidence.js';

for (const entry of activities) {
  const evidence = buildEvidence(entry);
  assert.deepEqual(evidence.errors, [], `Invalid evidence anchors in ${entry.code}`);
  const expected = entry.questions.filter(question => question.evidence?.length).length;
  assert.equal(evidence.byQuestion.size, expected);
  assert.equal(new Set([...evidence.byQuestion.values()].map(ref => ref.color)).size, expected);
  for (const part of entry.transcript ?? []) {
    const ranges = evidence.byPart.get(part.id);
    assert.equal(evidenceSegments(part.text, ranges).map(segment => segment.text).join(''), part.text);
    for (const cut of [1, Math.floor(part.text.length / 2), part.text.length - 1]) {
      const chunks = [...evidenceSegments(part.text.slice(0, cut), ranges), ...evidenceSegments(part.text.slice(cut), ranges, cut)];
      assert.equal(chunks.map(segment => segment.text).join(''), part.text, 'Page splits must preserve the exact transcript');
      const targets = chunks.flatMap(segment => segment.badges).map(ref => ref.target).filter(Boolean);
      assert.equal(new Set(targets).size, targets.length);
    }
  }
}
const radio = activities[0];
const hidden = buildEvidence(radio, evidenceQuestions(radio, { questions: { activitat: { included: false } } }));
assert(!hidden.byQuestion.has('activitat'));
assert.equal(hidden.byQuestion.get('canvi-de-lloc').number, 1);
assert(!buildEvidence(radio).byQuestion.has('repetir-lloc'), 'An open question has no literal source cue');
const overlap = {
  id: 'overlap', transcript: [{ id: 'p1', text: 'abcdef abcdef' }], questions: [
    { id: 'a', evidence: [{ part: 'p1', quote: 'abcd', occurrence: 0 }] },
    { id: 'b', evidence: [{ part: 'p1', quote: 'cdef', occurrence: 0 }] },
  ],
};
const built = buildEvidence(overlap);
assert.deepEqual(built.errors, []);
const segments = evidenceSegments(overlap.transcript[0].text, built.byPart.get('p1'));
assert.equal(segments.find(segment => segment.references.length === 2).text, 'cd');
assert.equal(segments.map(segment => segment.text).join(''), overlap.transcript[0].text);
const invalid = structuredClone(overlap);
delete invalid.questions[0].evidence[0].occurrence;
invalid.questions[1].evidence[0].quote = 'absent';
assert.equal(buildEvidence(invalid).errors.length, 2, 'Reject ambiguous and absent quotes instead of guessing');
console.log('PASS · Published anchors, exact text, overlapping passages, page splits and visible question numbers.');
