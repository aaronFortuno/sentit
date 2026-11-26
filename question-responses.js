import { questionChoices } from './content/question-choices/index.js?v=0.1.121';
import { questionChoiceReviews } from './content/question-choice-reviews.js?v=0.1.121';

const reviewed = new WeakMap();
const key = entry => `${entry.language}-${entry.code}`;
export function draftQuestionChoice(entry, question) {
  const record = questionChoices[key(entry)]?.questions[question.id];
  return record ? { ...record, options: record.options.map((text, i) => ({ id: 'abcd'[i], text })), evidence: record.evidence ?? question.evidence ?? [] } : null;
}
export function questionChoiceSnapshot(entry, question) {
  return JSON.stringify({ schema: 1, activity: key(entry), questionId: question.id,
    grade: entry.grade, level: entry.level, introduction: entry.introduction, transcript: entry.transcript,
    question, alternative: draftQuestionChoice(entry, question),
    openOnly: questionChoices[key(entry)]?.openOnly[question.id] ?? null });
}
export async function registerQuestionChoices(entries, records = questionChoiceReviews) {
  const index = new Map(records.map(record => [`${record.activity}/${record.questionId}`, record]));
  await Promise.all(entries.map(async entry => {
    reviewed.delete(entry);
    const valid = new Map();
    await Promise.all(entry.questions.map(async question => {
      const record = index.get(`${key(entry)}/${question.id}`);
      if (record?.status !== 'passed' || !record.author || !record.reviewer || record.author === record.reviewer) return;
      try {
        const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(questionChoiceSnapshot(entry, question)));
        const fingerprint = [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2,'0')).join('');
        if (record.fingerprint === fingerprint) valid.set(question.id, record);
      } catch { /* Without exact verification, retain the original open question. */ }
    }));
    reviewed.set(entry, valid);
  }));
}
export const multipleChoice = (entry, question) => reviewed.get(entry)?.has(question.id) ? draftQuestionChoice(entry, question) : null;
export const openOnlyReason = (entry, question) => reviewed.get(entry)?.has(question.id) ? questionChoices[key(entry)]?.openOnly[question.id] ?? '' : '';
export function questionMode(entry, question, settings = {}) {
  return multipleChoice(entry, question) && (settings.questionModes?.[question.id] ?? settings.questionMode ?? 'choice') === 'choice' ? 'choice' : 'open';
}
export function responseQuestion(entry, question, settings = {}) {
  const alternative = multipleChoice(entry, question), responseMode = questionMode(entry, question, settings);
  if (responseMode === 'open') return { ...question, alternative, responseMode, openOnlyReason: openOnlyReason(entry, question) };
  const correct = alternative.options.find(option => option.id === alternative.correct);
  return { ...question, alternative, responseMode, prompt: alternative.prompt,
    answer: `${correct.id.toUpperCase()}. ${correct.text}\n${alternative.explanation}`, evidence: alternative.evidence };
}
// Missing format in an existing saved layout means its historical open format.
export function responseSettings(settings = {}, legacy = false) {
  return { ...settings, questionMode: ['open','choice'].includes(settings.questionMode) ? settings.questionMode : legacy ? 'open' : 'choice',
    questionModes: Object.fromEntries(Object.entries(settings.questionModes ?? {}).filter(([,value]) => ['open','choice'].includes(value))) };
}
export function responseSummary(entry, settings = {}) {
  const visible = entry.questions.filter(q => settings.questions?.[q.id]?.included !== false);
  const compatible = visible.filter(q => multipleChoice(entry,q));
  const choices = compatible.filter(q => questionMode(entry,q,settings) === 'choice').length;
  const pendingApproval = compatible.filter(q => questionMode(entry,q,settings) === 'choice' && reviewed.get(entry)?.get(q.id)?.teacherValidation !== 'approved').length;
  return { available: compatible.length, choices, open: visible.length - choices, total: visible.length, pendingApproval };
}
