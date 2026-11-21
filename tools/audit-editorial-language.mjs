// Read-only candidates for an editorial pass. A match is never a review verdict.
import { activities } from '../catalogue.js';
const selected = process.argv.find(arg => arg.startsWith('--codes='))?.slice(8).split(',').map(code => code.trim().replace(/^ca-/i, '').toUpperCase());
const entries = activities.filter(entry => selected ? selected.includes(entry.code) : entry.reviewStatus === 'pending');
if (selected?.some(code => !entries.some(entry => entry.code === code))) throw Error('Hi ha un codi desconegut.');
const patterns = [
  ['possible-aclariment', /\bno\s+(?:vol dir|significa|implica|equival|garanteix|demostra|autoritza)\b|\bno\s+(?:és|serà|constitueix)\s+(?:encara\s+)?una autorització/iu],
  ['contrast-a-valorar', /\b(?:però|en canvi|ara bé)[^.!?]{0,100}\bno\b|\bno\s+(?:començarem|donarem per fet|podem assegurar)\b/iu],
  ['protocol-o-conclusio', /\b(?:ho deixarem anotat|farem constar|traslladarem els resultats|això ens ensenya|la lliçó és|això demostra que)\b/iu],
];
const candidates = [];
for (const entry of entries) {
  const fields = [
    ...entry.transcript.filter(part => part.speaker).map(part => ({ part: part.id, speaker: part.speaker, text: part.text })),
    ...entry.questions.map(question => ({ part: `pregunta:${question.id}`, text: question.prompt })),
  ];
  for (const field of fields) for (const sentence of field.text.match(/[^.!?]+[.!?]?/gu) ?? []) {
    const reasons = patterns.filter(([, pattern]) => pattern.test(sentence)).map(([reason]) => reason);
    if (reasons.length) candidates.push({ code: `${entry.language}-${entry.code}`, part: field.part, ...(field.speaker ? { speaker: field.speaker } : {}), reasons, text: sentence.trim() });
  }
}
console.log(JSON.stringify({ purpose: 'Candidats per a lectura contextual; no certifica cap revisió ni corregeix text.', reviewedCodes: entries.map(entry => `${entry.language}-${entry.code}`), candidates }, null, 2));
