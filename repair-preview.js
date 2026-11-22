import { productionProgress } from './content/production-progress.js';
import { openDialog, closeDialog } from './motion.js';
import { mountAudioSeek } from './audio-seek.js';

export function pendingRepairClips(entry) {
  return productionProgress[`${entry?.language}-${entry?.code}`]?.receivedRepairs?.filter(repair => repair.applied === false && repair.status === 'received-awaiting-listening' && repair.candidateFile && repair.originalFile) ?? [];
}

let mounted = false;
export function renderVoicePreview(root, entry, t, icon) {
  root.querySelectorAll('audio').forEach(audio => audio.pause());
  root.replaceChildren();
  const progress = productionProgress[`${entry?.language}-${entry?.code}`];
  root.hidden = !progress?.voicePreviewFile || Boolean(entry.audio && progress.voiceApproval?.status === 'approved');
  if (root.hidden) return;
  document.getElementById('audio-empty').hidden = true;
  const title = document.createElement('h3'); title.textContent = t('hearReceivedVoices');
  const audio = document.createElement('audio'); audio.hidden = true; audio.src = progress.voicePreviewFile;
  audio.setAttribute('aria-label', `${entry.code} · ${t('hearReceivedVoices')}`);
  const button=document.createElement('button'),symbol=document.createElement('span'),caption=document.createElement('span'),seek=document.createElement('div');
  button.type='button';button.className='button';button.append(symbol,caption);
  const paint=()=>{const playing=!audio.paused&&!audio.ended;caption.textContent=t(playing?'pauseComprehension':'hearReceivedVoices');button.setAttribute('aria-pressed',String(playing));icon(symbol,playing?'pause':'play');};
  button.addEventListener('click',()=>{if(!audio.paused)audio.pause();else audio.play().catch(()=>{note.textContent=t('audioError');});});
  for(const event of ['play','pause','ended'])audio.addEventListener(event,paint);
  mountAudioSeek(seek,audio,t);paint();
  audio.addEventListener('play', () => { window.dispatchEvent(new Event('sentit-pause-playback')); document.querySelectorAll('audio').forEach(other => { if (other !== audio) other.pause(); }); });
  const note = document.createElement('p'); note.className = 'small'; note.textContent = progress.voiceReviewUpdate?.summary?.[document.documentElement.lang] ?? progress.voiceReviewUpdate?.summary?.ca ?? t(progress.missingVoiceParts?.length ? 'reviewMissingTitle' : 'voiceBeforeMontage');
  root.append(title, button, seek, audio, note);
}

export function renderRepairPreview(root, entry, t) {
  const dialog = document.getElementById('repair-preview-dialog');
  const stop = () => dialog.querySelectorAll('audio').forEach(audio => audio.pause());
  if (!mounted) {
    dialog.addEventListener('close', stop);
    dialog.addEventListener('submit', stop);
    dialog.addEventListener('cancel', stop);
    window.addEventListener('hashchange', () => { stop(); closeDialog(dialog); });
    window.addEventListener('sentit-pause-playback', stop);
    mounted = true;
  }
  root.replaceChildren();
  const repairs = pendingRepairClips(entry);
  root.hidden = repairs.length === 0;
  if (!repairs.length) return;
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'button repair-preview-button';
  button.textContent = t('listenRepairs');
  button.setAttribute('aria-haspopup', 'dialog'); button.setAttribute('aria-controls', dialog.id);
  const note = document.createElement('p'); note.className = 'small'; note.textContent = t('repairsNotApplied');
  root.append(button, note);
  button.addEventListener('click', () => {
    window.dispatchEvent(new Event('sentit-pause-playback'));
    document.querySelectorAll('audio').forEach(audio => audio.pause());
    document.getElementById('repair-preview-title').textContent = `${entry.code} · ${t('listenRepairs')}`;
    document.getElementById('repair-preview-notice').textContent = t('repairsNotApplied');
    const list = document.getElementById('repair-preview-list'); list.replaceChildren();
    for (const repair of repairs) {
      const section = document.createElement('section'); section.className = 'repair-preview-pair';
      const sentence = document.createElement('p'); sentence.textContent = repair.text; sentence.lang = entry.language;
      const clips = document.createElement('div'); clips.className = 'repair-preview-clips';
      for (const [key, label] of [['originalFile', 'repairOriginal'], ['candidateFile', 'repairNewTake']]) {
        const wrapper = document.createElement('label'), caption = document.createElement('span'), audio = document.createElement('audio');
        caption.textContent = t(label); audio.controls = true; audio.preload = 'none'; audio.src = repair[key];
        audio.dataset.repairPart = repair.part; audio.dataset.repairVersion = key;
        audio.setAttribute('aria-label', `${t(label)} · ${repair.text}`);
        audio.addEventListener('play', () => { document.querySelectorAll('audio').forEach(other => { if (other !== audio) other.pause(); }); });
        wrapper.append(caption, audio); clips.append(wrapper);
      }
      section.append(sentence, clips); list.append(section);
    }
    openDialog(dialog);
  });
}
