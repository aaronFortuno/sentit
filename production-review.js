import { productionProgress } from './content/production-progress.js';
import { hasPendingSynthesisEdit } from './editorial-review.js';

// A received repair is a comparison take, not an applied or approved correction.
export function cardReviewUpdate(entry) {
  const progress = productionProgress[`${entry.language}-${entry.code}`];
  if (!entry.audio && progress?.synthesisIssue) return { id: 'synthesis-failed', title: 'reviewSynthesisFailed', help: 'reviewSynthesisNotRepeated' };
  if (progress?.state === 'voices-awaiting-listening') return { id: 'voices-awaiting-listening', title: 'reviewVoicesReceived', help: 'openReview', summary: progress.voiceReviewNote };
  if (!entry.audio && progress?.missingVoiceParts?.some(part=>!progress.receivedRepairs?.some(r=>(r.part===part||r.missingPart===part)&&r.applied===false&&r.status==='received-awaiting-listening'))) return { id: 'voices-incomplete', title: 'reviewVoicesIncomplete', help: progress.missingVoiceParts.some(part=>part!=='introduction')?'reviewIncompleteVoices':'reviewMissingTitle',summary:progress.voiceReviewUpdate?.summary };
  if (!entry.audio && progress?.uncertainTurns?.some(turn=>turn.status==='incomplete-turn-awaiting-listening')) return {id:'voices-uncertain',title:'reviewVoicesUncertain',help:'reviewIncompleteVoices',summary:progress.voiceReviewNote};
  if (hasPendingSynthesisEdit(entry)) {
    const pending = progress.feedback.filter(item => item.status === 'pending');
    const received = pending.filter(item => progress.receivedRepairs?.some(repair => repair.part === item.part && repair.applied === false && repair.status === 'received-awaiting-listening'));
    const approved = pending.filter(item => progress.receivedRepairs?.some(repair => repair.part === item.part && repair.applied === false && repair.status === 'approved-awaiting-application'));
    const waiting = pending.filter(item => !received.includes(item) && !approved.includes(item));
    return {
      id: approved.length === pending.length ? 'repair-approved' : received.length === pending.length ? 'repair-received' : received.length ? 'repair-mixed' : 'repair-pending',
      title: approved.length === pending.length ? 'reviewRepairApproved' : received.length === pending.length ? 'reviewRepairReceived' : received.length ? 'reviewRepairPartial' : 'reviewRepairPending',
      help: approved.length === pending.length ? 'reviewRepairApply' : received.length === pending.length ? 'reviewRepairOriginal' : 'reviewRepairWait',
      words: [...new Set((waiting.length ? waiting : pending).map(item => item.word).filter(Boolean))].join(' · '),
    };
  }
  if(!entry.audio&&progress?.voiceReviewUpdate&&progress.voiceReviewUpdate.file===progress.voicePreviewFile)return{id:'voices-cleaned',title:'reviewRepairReceived',help:'reviewListenAgain',summary:progress.voiceReviewUpdate.summary};
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
