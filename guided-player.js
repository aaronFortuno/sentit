import { selectedJingleUrl } from './session.js';

// Native media preserves pitch. Waits use real seconds, independently of speech rate.
// Padded, separate tracks finish naturally instead of cutting speech with a timer.
export function initGuidedPlayer(entry, session, prompts, button, render, onAction=()=>{}, options={}) {
  const listeners = new AbortController();
  let disposed = false;
  const audio = new Audio();
  audio.preload = 'auto';
  audio.preservesPitch = true;
  const rate = session.rate ?? 1;
  const steps = [];
  const clip = (url, status, options = {}) => steps.push({ url, status, ...options });
  const wait = (seconds, status) => { if (seconds > 0) steps.push({ seconds, status }); };
  if (session.jingle ?? true) clip(selectedJingleUrl(session.jingleId), 'sessionIntroduction');
  if (session.enabled === false) clip(entry.audio, 'sessionListening', { rate, number: 1 });
  else {
    const split = entry.tracks;
    clip(split?.introduction ?? entry.audio, 'sessionIntroduction', { rate, end: split ? undefined : entry.fragment.start });
    if (session.reading > 0 && (session.prepare ?? true)) clip(session.reading === 60 ? prompts.prepareMinute : prompts.prepare, 'sessionReading');
    wait(session.reading, 'sessionReading');
    for (let number = 1; number <= session.listens; number++) {
      if (number > 1) {
        wait(session.interval, 'sessionInterval');
        if (session.repeat ?? true) clip(prompts.repeat, 'sessionNext');
      }
      clip(split?.body ?? entry.audio, 'sessionListening', { rate, offset: split ? 0 : entry.fragment.start, number });
    }
  }
  let index = -1, running = false, busy = false, failed = false, frame, remaining = 0, started = 0, version = 0;
  const current = () => steps[index];
  const left = () => remaining - (running ? (performance.now() - started) / 1000 : 0);
  function paint() {
    if (disposed) return;
    cancelAnimationFrame(frame);
    if (running && current()?.seconds && left() <= 0) { advance(); return; }
    const done = index >= steps.length;
    render({ action: done ? 'restartSession' : index < 0 ? 'startSession' : running ? 'pause' : 'resume',
      status: failed ? 'audioError' : busy ? 'loadingSession' : done ? 'sessionEnded' : current()?.status,
      countdown: current()?.seconds ? Math.max(0, Math.ceil(left())) : null, number: current()?.number, busy, running: running && !done });
    if (running) frame = requestAnimationFrame(paint);
  }
  async function advance() {
    if (disposed) return;
    const token = ++version;
    audio.pause(); index++;
    const step = current();
    if (!step) { running = false; busy = false; paint(); onAction('finalitza'); return; }
    remaining = step.seconds ?? 0; started = performance.now();
    if (step.seconds && options.skipWaits?.()) { await advance(); return; }
    if (!step.url) { busy = false; paint(); return; }
    busy = true; paint();
    audio.src = step.url; audio.playbackRate = step.rate ?? 1;
    try {
      if (step.offset) {
        await new Promise((resolve, reject) => { audio.onloadedmetadata = resolve; audio.onerror = reject; });
        if (disposed || token !== version) return;
        audio.currentTime = step.offset;
      }
      if (disposed || token !== version) return;
      await audio.play();
    } catch { if (token === version) { failed = true; running = false; } }
    if (token === version) { busy = false; paint(); }
  }
  audio.addEventListener('ended', () => { if (running) advance(); });
  audio.addEventListener('timeupdate', () => {
    if (running && current()?.end && audio.currentTime >= current().end) advance();
  });
  audio.addEventListener('error', () => { failed = true; running = false; busy = false; paint(); });
  const toggle = async () => {
    if (busy) return;
    if (index < 0 || index >= steps.length || failed) {
      const restart=index>=steps.length;failed = false; index = -1; running = true; await advance();if(!failed)onAction(restart?'reinicia':'inicia');
    } else if (running) {
      if (current()?.seconds) remaining = Math.max(0, left());
      running = false; audio.pause(); paint();onAction('pausa');
    } else {
      running = true; started = performance.now(); busy = true; paint();
      try { if (current()?.url) await audio.play(); }
      catch { failed = true; running = false; }
      busy = false; paint();if(!failed)onAction('repren');
    }
  };
  if (options.bindButton !== false) button.addEventListener('click', toggle, { signal: listeners.signal });
  const pause = () => {if(!running)return;if(current()?.seconds)remaining=Math.max(0,left());running=false;audio.pause();paint();onAction('pausa');};
  const dispose = () => {disposed=true;version++;running=false;audio.pause();audio.removeAttribute('src');audio.load();cancelAnimationFrame(frame);listeners.abort();};
  window.addEventListener('sentit-pause-playback', pause, { signal: listeners.signal });
  // A page restored from the browser's back/forward cache keeps its controls.
  // Pause on navigation; dispose only when the owning preview is closed.
  window.addEventListener('pagehide', () => { version++; pause(); busy=false; audio.pause(); cancelAnimationFrame(frame); paint(); }, { signal: listeners.signal });
  paint();
  return { dispose, toggle, skipWait() { if (!disposed && current()?.seconds) { running=true; advance(); } } };
}
