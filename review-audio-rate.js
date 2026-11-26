const rates = [1, 1.25, 1.5];
const storageKey = 'sentit.audio-review-rate.v1';
const controls = new WeakMap();
let selectedRate = 1;
try {
  const stored = Number(sessionStorage.getItem(storageKey));
  if (rates.includes(stored)) selectedRate = stored;
} catch { /* Review controls also work when browser storage is unavailable. */ }

export function mountReviewRateControls(audio, t) {
  const label = t?.('reviewPlaybackSpeed') ?? (document.documentElement.lang === 'es' ? 'Velocidad de revisión' : 'Velocitat de revisió');
  const root = document.createElement('div');
  root.className = 'review-rate-controls';
  root.setAttribute('role', 'group');
  root.setAttribute('aria-label', label);
  const buttons = rates.map(rate => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = '×' + String(rate).replace('.', ',');
    button.setAttribute('aria-label', label + ': ' + button.textContent);
    button.addEventListener('click', () => {
      selectedRate = rate;
      try { sessionStorage.setItem(storageKey, String(rate)); } catch { /* Keep the in-memory preference. */ }
      document.querySelectorAll('.review-rate-controls').forEach(group => controls.get(group)?.());
    });
    root.append(button);
    return button;
  });
  const apply = () => {
    audio.defaultPlaybackRate = selectedRate;
    audio.playbackRate = selectedRate;
    audio.preservesPitch = true;
    if ('webkitPreservesPitch' in audio) audio.webkitPreservesPitch = true;
    buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(rates[index] === selectedRate)));
  };
  controls.set(root, apply);
  audio.addEventListener('loadedmetadata', apply);
  apply();
  return root;
}
