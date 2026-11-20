import { clockTime, guidedPrompts, sessionJingles } from './session.js';
import { initGuidedPlayer } from './guided-player.js';
import { openDialog } from './motion.js';

// Teacher-only rehearsal. The shared player keeps the QR session and this
// preview in sync; skipping waits never changes the teacher's saved settings.
export function mountAudioPreview({ t, entry, session, pauseFragment, icon, track }) {
  const byId = id => document.getElementById(id);
  const pairs = byId('jingles-dialog'), preview = byId('session-preview-dialog');
  let controller;
  const stop = () => { controller?.dispose(); controller = null; };
  const silence = dialog => { for (const audio of dialog.querySelectorAll('audio')) audio.pause(); };
  const pauseOtherAudio = () => { pauseFragment(); window.dispatchEvent(new Event('sentit-pause-playback')); silence(pairs); };
  byId('compare-jingles').addEventListener('click', () => {
    pauseOtherAudio();
    byId('jingles-list').replaceChildren(...sessionJingles.map(jingle => {
      const card = document.createElement('section'); card.className = 'jingle-pair';
      const title = document.createElement('h3'); title.textContent = jingle.title; card.append(title);
      for (const kind of ['opening', 'closing']) {
        const label = document.createElement('label'), name = document.createElement('span'), audio = document.createElement('audio');
        name.textContent = t(kind === 'opening' ? 'jingleOpening' : 'jingleClosing');
        audio.controls = true; audio.preload = 'metadata'; audio.src = jingle[kind];
        audio.setAttribute('aria-label', `${jingle.title} · ${name.textContent}`);
        audio.addEventListener('play', () => { for (const other of pairs.querySelectorAll('audio')) if (other !== audio) other.pause(); });
        label.append(name, audio); card.append(label);
      }
      return card;
    }));
    openDialog(pairs); track('compara_sintonies');
  });
  pairs.addEventListener('close', () => silence(pairs));
  byId('preview-session').addEventListener('click', () => {
    const selected = entry(); if (!selected?.audio) return;
    pauseOtherAudio(); stop();
    const config = session();
    byId('session-preview-context').textContent = `${selected.code} · ${selected.title}`;
    const play = byId('preview-session-play'), skip = byId('preview-session-skip');
    controller = initGuidedPlayer(selected, config, guidedPrompts(selected), play, ({ action, status, countdown, number, busy }) => {
      byId('preview-session-label').textContent = t(action);
      icon(play.querySelector('[data-icon]'), action === 'pause' ? 'pause' : 'play'); play.disabled = busy;
      byId('preview-session-status').textContent = status === 'sessionListening' ? t(status)(number, config.enabled === false ? 1 : config.listens) : status ? t(status) : '';
      const timer = byId('preview-session-countdown'); timer.hidden = countdown === null; timer.textContent = countdown === null ? '' : clockTime(countdown);
      skip.hidden = countdown === null;
    }, action => track('prova_sessio', { code: selected.code, accio: action }), { skipWaits: () => byId('preview-skip-pauses').checked });
    openDialog(preview);
  });
  byId('preview-session-skip').addEventListener('click', () => controller?.skipWait());
  byId('preview-skip-pauses').addEventListener('change', event => { if (event.target.checked) controller?.skipWait(); });
  preview.addEventListener('close', stop);
  preview.addEventListener('cancel', stop);
  preview.addEventListener('submit', stop);
  return { stop };
}
