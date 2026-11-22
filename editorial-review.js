import { editorialReviews } from './content/editorial-reviews.js';
import { productionProgress } from './content/production-progress.js';

const passed = new WeakMap();

// Review the content, not the teacher's sheet formatting or the production phase.
export function editorialSnapshot(entry) {
  return JSON.stringify({
    schema: 1, code: entry.code, language: entry.language, title: entry.title,
    grade: entry.grade, level: entry.level, genre: entry.genre, summary: entry.summary,
    introduction: entry.introduction, transcript: entry.transcript, questions: entry.questions,
    production: entry.production, productionNotes: entry.productionNotes,
    generationPlan: entry.generationPlan, recordingCues: entry.recordingCues,
    image: entry.image,
  });
}

export async function editorialFingerprint(entry) {
  const bytes = new TextEncoder().encode(editorialSnapshot(entry));
  const hash = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(hash)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function registerEditorialReviews(entries, records = editorialReviews) {
  await Promise.all(entries.map(async entry => {
    passed.delete(entry);
    const record = records[`${entry.language}-${entry.code}`];
    if (record?.status !== 'passed' || !record.reviewer || !/^\d{4}-\d{2}-\d{2}$/.test(record.reviewedAt)) return;
    // Fail closed on an unsupported browser: the draft stays available for review.
    try {
      if (record.fingerprint === await editorialFingerprint(entry)) passed.set(entry, record);
    } catch { /* No provisional badge without verification. */ }
  }));
}

export const editorialReview = entry => passed.get(entry) ?? null;
export const isEditoriallyReviewed = entry => Boolean(editorialReview(entry));
export const hasPendingMontage = entry => {
  const progress=productionProgress[`${entry?.language}-${entry?.code}`];
  return !entry?.audio && progress?.state==='voices-received' && editorialReview(entry)?.fingerprint===progress.editorialFingerprint;
};
export const hasApprovedScript = entry => {
  const progress=productionProgress[`${entry?.language}-${entry?.code}`];
  return !entry?.audio && progress?.state==='ready-for-voices' && editorialReview(entry)?.fingerprint===progress.editorialFingerprint;
};
export const hasPendingSynthesisEdit = entry => ['pending','audio-review'].includes(entry?.reviewStatus) && productionProgress[`${entry.language}-${entry.code}`]?.state === 'audio-corrections-pending' && productionProgress[`${entry.language}-${entry.code}`].feedback?.some(item => item.status === 'pending');
export const reviewCaption = (entry, labels) => hasPendingSynthesisEdit(entry) ? labels.reviewSynthesisEdit : entry?.reviewStatus === 'audio-review' ? labels.audioReview : hasPendingMontage(entry) ? labels.reviewVoicesReceived : hasApprovedScript(entry) ? labels.reviewReadyForVoices : isEditoriallyReviewed(entry) ? labels.reviewProvisional : labels.reviewInProgress;
