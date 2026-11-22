import { guidedPrompts, sessionJingles } from './session.js';
import { initGuidedPlayer } from './guided-player.js';
import { openDialog } from './motion.js';
import { mountAudioSeek } from './audio-seek.js';

// Teacher-only rehearsal. The shared player keeps the QR session and this
// preview in sync; skipping waits never changes the teacher's saved settings.
export function mountAudioPreview({ t, entry, session, pauseFragment, icon, track }) {
  const byId = id => document.getElementById(id);
  const pairs = byId('jingles-dialog'), fragment = byId('teacher-audio');
  mountAudioSeek(byId('fragment-seek'), fragment, t);
  const fullButton = byId('preview-session'), fragmentButton = byId('preview-fragment'), statusLine = byId('audio-preview-status');
  let controller;
  const stop = () => {
    controller?.dispose(); controller = null;
    fullButton.disabled = false; fullButton.setAttribute('aria-pressed', 'false');
    byId('preview-session-label').textContent = t('listenFullSession');
    icon(fullButton.querySelector('[data-icon]'), 'play'); statusLine.textContent = '';
  };
  const silence = dialog => { for (const audio of dialog.querySelectorAll('audio')) audio.pause(); };
  const pauseOtherAudio = () => { pauseFragment(); window.dispatchEvent(new Event('sentit-pause-playback')); silence(pairs); };
  const paintFragment = () => {
    const playing = !fragment.paused && !fragment.ended;
    fragmentButton.setAttribute('aria-pressed', String(playing));
    byId('preview-fragment-label').textContent = t(playing ? 'pauseComprehension' : 'listenComprehension');
    icon(fragmentButton.querySelector('[data-icon]'), playing ? 'pause' : 'play');
  };
  byId('compare-jingles').addEventListener('click', () => {
    pauseOtherAudio();
    byId('jingles-list').replaceChildren(...sessionJingles.map(jingle => {
      const card = document.createElement('section'); card.className = 'jingle-pair';
      const title = document.createElement('h3'); title.textContent = jingle.title; card.append(title);
      const description = document.createElement('p'); description.className = 'jingle-description';
      description.textContent = t('jingleDescriptions')[jingle.id]; card.append(description);
      for (const kind of ['opening', 'closing']) {
        const label = document.createElement('label'), name = document.createElement('span'), audio = document.createElement('audio');
        name.textContent = t(kind === 'opening' ? 'jingleOpening' : 'jingleClosing');
        audio.controls = true; audio.preload = 'metadata'; audio.src = jingle[kind];
        audio.setAttribute('aria-label', `${jingle.title} · ${name.textContent}`);
        audio.addEventListener('play', () => { pauseFragment(); stop(); for (const other of pairs.querySelectorAll('audio')) if (other !== audio) other.pause(); });
        label.append(name, audio); card.append(label);
      }
      return card;
    }));
    openDialog(pairs); track('compara_sintonies');
  });
  pairs.addEventListener('close', () => silence(pairs));
  fragmentButton.addEventListener('click', async () => {
    if (!entry()?.audio) return;
    if (!fragment.paused) { fragment.pause(); statusLine.textContent = t('previewPaused'); return; }
    stop(); silence(pairs); window.dispatchEvent(new Event('sentit-pause-playback'));
    if (fragment.ended) fragment.currentTime = 0;
    try { await fragment.play(); } catch { statusLine.textContent = t('audioError'); }
  });
  fragment.addEventListener('play', () => { stop(); silence(pairs); paintFragment(); statusLine.textContent = t('previewFragmentPlaying'); });
  for (const event of ['pause', 'ended', 'emptied']) fragment.addEventListener(event, paintFragment);
  fragment.addEventListener('ended', () => { statusLine.textContent = t('sessionEnded'); });
  fragment.addEventListener('error', () => { statusLine.textContent = t('audioError'); });
  fullButton.addEventListener('click', () => {
    const selected = entry(); if (!selected?.audio) return;
    pauseFragment(); silence(pairs);
    if (controller) { controller.toggle(); return; }
    window.dispatchEvent(new Event('sentit-pause-playback'));
    const config = session();
    controller = initGuidedPlayer(selected, config, guidedPrompts(selected), fullButton, ({ action, status, number, busy, running }) => {
      byId('preview-session-label').textContent = t(action === 'pause' ? 'pauseFullSession' : action === 'resume' ? 'resumeFullSession' : 'listenFullSession');
      icon(fullButton.querySelector('[data-icon]'), action === 'pause' ? 'pause' : 'play');
      fullButton.disabled = busy; fullButton.setAttribute('aria-pressed', String(running));
      statusLine.textContent = status === 'sessionListening' ? t(status)(number, config.enabled === false ? 1 : config.listens) : status ? t(status) : '';
    }, action => track('prova_sessio', { code: selected.code, accio: action }), { skipWaits: () => true, bindButton: false });
    controller.toggle();
  });
  byId('session-editor').addEventListener('change', () => { pauseFragment(); stop(); });
  byId('language').addEventListener('change', () => { pauseFragment(); stop(); paintFragment(); });
  window.addEventListener('hashchange', () => { pauseFragment(); stop(); });
  fragment.addEventListener('emptied', stop);
  paintFragment();
  return { stop };
}
