// Run after the named independent reviewer has read the complete final alternatives.
// The report must name every item in one batch and match its exact fingerprint.
import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { activities } from '../catalogue.js';
import { questionChoiceBatches } from '../content/question-choices/index.js';
import { questionChoiceReviews } from '../content/question-choice-reviews.js';
import { questionChoiceSnapshot } from '../question-responses.js';
const file = process.argv.find(arg => arg.startsWith('--file='))?.slice(7);
assert(file, 'Indica --file=informe-independent.json. No registra validació docent.');
const report = JSON.parse(await readFile(file, 'utf8'));
const batch = questionChoiceBatches.find(batch => batch.id === report.batch);
assert(batch && batch.id !== 'pilot-001', 'Cal un lot nou registrat; el pilot conserva la validació pròpia.');
assert.equal(report.author, batch.author);
assert(report.reviewer && report.reviewer !== report.author, 'Autoria i revisió han de ser independents.');
assert(/^\d{4}-\d{2}-\d{2}$/.test(report.reviewedAt), 'Data de revisió necessària.');
assert.equal(report.status, 'passed');
const expected = activities.filter(a => batch.choices[`${a.language}-${a.code}`]).flatMap(a => a.questions.map(q => ({ entry:a, question:q, key:`${a.language}-${a.code}/${q.id}` })));
assert.equal(report.reviews?.length, expected.length, 'Cal revisar tots els ítems, inclosos els que continuen oberts.');
const index = new Map(report.reviews.map(record => [`${record.activity}/${record.questionId}`, record]));
assert.equal(index.size, expected.length, 'Informe amb duplicats.');
const records = new Map(questionChoiceReviews.map(record => [`${record.activity}/${record.questionId}`, record]));
for (const {entry,question,key} of expected) {
  const review = index.get(key);
  assert.equal(review?.status, 'passed', key);
  const fingerprint = createHash('sha256').update(questionChoiceSnapshot(entry,question)).digest('hex');
  assert.equal(review.fingerprint, fingerprint, key + ': el contingut ha canviat després de la revisió.');
  const previous = records.get(key);
  const teacher = previous?.fingerprint === fingerprint && previous.teacherValidation === 'approved'
    ? { teacherValidation:'approved', teacherValidatedAt:previous.teacherValidatedAt, teacherConfirmation:previous.teacherConfirmation }
    : { teacherValidation:'pending' };
  records.set(key,{ activity:`${entry.language}-${entry.code}`, questionId:question.id, status:'passed', author:report.author, reviewer:report.reviewer, reviewedAt:report.reviewedAt, ...teacher, fingerprint });
}
const sorted = [...records.values()].sort((a,b) => a.activity.localeCompare(b.activity,'en',{numeric:true}) || a.questionId.localeCompare(b.questionId));
await writeFile(new URL('../content/question-choice-reviews.js',import.meta.url), '// Exact independent review records; teacher validation is recorded separately per item.\nexport const questionChoiceReviews = ' + JSON.stringify(sorted,null,2) + ';\n');
console.log(`${report.batch}: ${expected.length} revisions exactes registrades. Cap aprovació docent, canvi d’àudio ni síntesi.`);
