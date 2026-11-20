// Run only after an independent agent has checked the final revised content.
// This records editorial review, never teacher approval or a synthesis request.
import { writeFile } from 'node:fs/promises';
import { activities } from '../catalogue.js';
import { editorialReviews } from '../content/editorial-reviews.js';
import { editorialFingerprint } from '../editorial-review.js';
const option = name => process.argv.find(arg => arg.startsWith(`--${name}=`))?.split('=').slice(1).join('=');
const codes = option('codes')?.split(',').map(code => code.trim());
const date = option('date'), reviewer = option('reviewer');
if (!codes?.length || !/^\d{4}-\d{2}-\d{2}$/.test(date ?? '') || !reviewer) throw Error('Indica --codes=ca-S003,... --date=AAAA-MM-DD --reviewer=identificador, després de la revisió independent final.');
const entries = codes.map(code => {
  const entry = activities.find(entry => `${entry.language}-${entry.code}` === code);
  if (!entry || entry.reviewStatus !== 'pending') throw Error(`${code}: només es registra una proposta pendent; no es modifica cap aprovació existent.`);
  return entry;
});
for (const entry of entries) editorialReviews[`${entry.language}-${entry.code}`] = {
  status: 'passed', reviewedAt: date, reviewer, fingerprint: await editorialFingerprint(entry),
};
const sorted = Object.fromEntries(Object.entries(editorialReviews).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(new URL('../content/editorial-reviews.js', import.meta.url), `// Final independent reviews only. This is not teacher approval for production.\nexport const editorialReviews = ${JSON.stringify(sorted, null, 2)};\n`);
console.log(`${entries.length} revisions finals registrades. Cap validació docent ni petició de síntesi.`);
