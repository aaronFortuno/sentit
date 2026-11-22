import { productionProgress } from './content/production-progress.js';
import { hasPendingSynthesisEdit } from './editorial-review.js';

// A received repair is a comparison take, not an applied or approved correction.
export function cardReviewUpdate(entry) {
  const progress = productionProgress[`${entry.language}-${entry.code}`];
  if (!entry.audio && progress?.synthesisIssue) return { id: 'synthesis-failed', title: 'reviewSynthesisFailed', help: 'reviewSynthesisNotRepeated' };
  if (progress?.state === 'voices-awaiting-listening') return { id: 'voices-awaiting-listening', title: 'reviewVoicesReceived', help: 'openReview', summary: progress.voiceReviewNote };
  if (!entry.audio && progress?.missingVoiceParts?.length) return { id: 'voices-incomplete', title: 'reviewVoicesIncomplete', help: 'reviewMissingTitle' };
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
  if(!entry.audio&&progress?.voiceReviewUpdate?.file===progress.voicePreviewFile)return{id:'voices-cleaned',title:'reviewRepairReceived',help:'reviewListenAgain',summary:progress.voiceReviewUpdate.summary};
  const update = progress?.reviewUpdate;
  if (entry.reviewStatus === 'audio-review' && update?.audio === entry.audio) {
    return { id: 'montage-updated', title: 'reviewMontageUpdated', help: 'reviewListenAgain', summary: update.summary };
  }
  if (entry.reviewStatus === 'audio-review' && entry.audio && progress?.feedback?.some(item => item.status === 'applied')) {
    return { id: 'montage-updated', title: 'reviewMontageUpdated', help: 'reviewListenAgain', words: [...new Set(progress.feedback.filter(item => item.status === 'applied').map(item => item.word).filter(Boolean))].join(' · ') };
  }
  if (entry.reviewStatus === 'audio-review' && entry.audio) return { id: 'audio-review', title: 'reviewMontageReady', help: 'reviewCardFirstListening' };
  return null;
}
