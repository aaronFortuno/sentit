import { productionProgress } from './content/production-progress.js';
import { hasPendingSynthesisEdit } from './editorial-review.js';

// A received repair is a comparison take, not an applied or approved correction.
export function cardReviewUpdate(entry) {
  const progress = productionProgress[`${entry.language}-${entry.code}`];
  if (hasPendingSynthesisEdit(entry)) {
    const pending = progress.feedback.filter(item => item.status === 'pending');
    const received = pending.filter(item => progress.receivedRepairs?.some(repair => repair.part === item.part && repair.applied === false && repair.status === 'received-awaiting-listening'));
    const waiting = pending.filter(item => !received.includes(item));
    return {
      id: received.length === pending.length ? 'repair-received' : received.length ? 'repair-mixed' : 'repair-pending',
      title: received.length === pending.length ? 'reviewRepairReceived' : received.length ? 'reviewRepairPartial' : 'reviewRepairPending',
      help: received.length === pending.length ? 'reviewRepairOriginal' : 'reviewRepairWait',
      words: [...new Set((waiting.length ? waiting : pending).map(item => item.word).filter(Boolean))].join(' · '),
    };
  }
  const update = progress?.reviewUpdate;
  if (entry.reviewStatus === 'audio-review' && update?.audio === entry.audio) {
    return { id: 'montage-updated', title: 'reviewMontageUpdated', help: 'reviewListenAgain', summary: update.summary };
  }
  if (entry.reviewStatus === 'audio-review' && entry.audio) return { id: 'audio-review', title: 'reviewMontageReady', help: 'reviewFirstListening' };
  return null;
}
