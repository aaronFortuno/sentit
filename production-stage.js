import { needsReview, isAudioReview } from './review.js';
import { hasApprovedScript, hasPendingMontage, hasPendingSynthesisEdit } from './editorial-review.js';
import { productionProgress } from './content/production-progress.js';

// A visual position in the workflow, not elapsed work or a time estimate.
// Corrections are optional and can return after a new listening review.
export const productionStages = Object.freeze([
  { id: 'script', number: 1 },
  { id: 'synthesis', number: 2 },
  { id: 'voices', number: 3 },
  { id: 'corrections', number: 4 },
  { id: 'montage', number: 5 },
  { id: 'published', number: 6 },
].map(Object.freeze));
export const pendingProductionStages = productionStages.slice(0, -1);

export function productionStage(entry) {
  if (!entry) return null;
  if (!needsReview(entry)) {
    const progress = productionProgress[`${entry.language}-${entry.code}`];
    // Historical prototypes have no retrospective final approval.
    return entry.reviewStatus === 'validated' && progress?.state === 'published' ? productionStages[5] : null;
  }
  if (productionProgress[`${entry.language}-${entry.code}`]?.state === 'voices-awaiting-listening') return productionStages[2];
  if (hasPendingSynthesisEdit(entry)) return productionStages[3];
  if (isAudioReview(entry) && entry.audio) return productionStages[4];
  if (hasPendingMontage(entry)) return productionStages[2];
  if (hasApprovedScript(entry)) return productionStages[1];
  return productionStages[0];
}
