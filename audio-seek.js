import { clockTime } from './session.js';

// Full-width teacher timeline; no cramped browser volume/menu controls.
export function mountAudioSeek(root, audio, t) {
  const range = document.createElement('input'); range.type = 'range'; range.min = '0'; range.max = '0'; range.step = '0.1'; range.value = '0';
  range.setAttribute('aria-label', t('audioSeek'));
  const times = document.createElement('div'), current = document.createElement('span'), total = document.createElement('span');
  times.className = 'audio-seek-times'; times.append(current, total); root.replaceChildren(range, times); root.classList.add('audio-seek');
  const paint = () => {
    const duration = Number.isFinite(audio.duration) ? audio.duration : 0, value = audio.currentTime || 0;
    range.disabled = duration <= 0; range.max = String(duration); range.value = String(Math.min(value, duration));
    range.setAttribute('aria-valuetext', `${clockTime(value)} / ${clockTime(duration)}`);
    current.textContent = clockTime(value); total.textContent = duration ? clockTime(duration) : '—:—';
    range.style.setProperty('--played', `${duration ? value / duration * 100 : 0}%`);
  };
  range.addEventListener('input', () => { if (Number.isFinite(audio.duration)) audio.currentTime = Number(range.value); paint(); });
  for (const event of ['loadedmetadata', 'durationchange', 'timeupdate', 'seeking', 'ended', 'emptied']) audio.addEventListener(event, paint);
  audio.preload = 'metadata'; paint();
}
