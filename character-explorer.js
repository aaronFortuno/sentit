import { characters } from './content/characters.js';
import { animateRefresh } from './motion.js';

const make = (tag, text, className) => {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
};
const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 4 14 8-14 8Z"/></svg>';

export function mountCharacterExplorer(root, { activities, t, initialId, onSelect, onBrowse, onOpen }) {
  let activeId = characters.some(character => character.id === initialId) ? initialId : characters[0].id;
  let roster, detail, play, audioStatus;
  let playVersion = 0;
  const audio = document.createElement('audio');
  audio.preload = 'none';

  function stop() {
    playVersion++;
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    if (play) {
      play.setAttribute('aria-pressed', 'false');
      play.querySelector('span:last-child').textContent = t('hearIntroduction');
    }
  }

  function select(id, animated = true) {
    if (!characters.some(character => character.id === id)) return;
    activeId = id;
    for (const button of roster.querySelectorAll('button')) {
      const selected = button.dataset.character === id;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('is-active', selected);
    }
    renderDetail();
    if (animated) animateRefresh(detail.querySelector('.character-detail-scroll'));
    onSelect?.(id);
  }

  function renderDetail() {
    stop();
    const character = characters.find(character => character.id === activeId);
    detail.replaceChildren();
    const scroll = make('div', undefined, 'character-detail-scroll');
    const top = make('div', undefined, 'character-profile-top');
    const image = make('img', undefined, 'character-portrait');
    Object.assign(image, { src: character.portrait, alt: character.name, width: 1024, height: 1024, decoding: 'async' });
    const introduction = make('div', undefined, 'character-profile-intro');
    const name = make('h3', character.name); name.id = root.id + '-name';
    detail.setAttribute('aria-labelledby', name.id);
    const role = make('p', character.role, 'character-profile-role'); role.lang = 'ca';
    const quote = make('blockquote', character.introduction.text, 'character-greeting'); quote.lang = character.introduction.language;
    play = make('button', undefined, 'button character-introduction-play'); play.type = 'button';
    const symbol = make('span'); symbol.innerHTML = playIcon;
    play.append(symbol, make('span', t('hearIntroduction')));
    play.disabled = !character.introduction.audio;
    play.setAttribute('aria-pressed', 'false');
    audioStatus = make('p', character.introduction.audio ? '' : t('characterAudioPending'), 'character-audio-status');
    audioStatus.id = root.id + '-audio-status'; audioStatus.setAttribute('role', 'status');
    play.setAttribute('aria-describedby', audioStatus.id);
    play.addEventListener('click', async () => {
      if (!character.introduction.audio) return;
      if (!audio.paused) { audio.pause(); return; }
      const version = ++playVersion;
      if (audio.getAttribute('src') !== character.introduction.audio) audio.src = character.introduction.audio;
      try { await audio.play(); }
      catch { if (version === playVersion) audioStatus.textContent = t('audioError'); }
    });
    introduction.append(role, name, quote, play, audioStatus);
    top.append(image, introduction);
    scroll.append(top);
    const bio = make('div', undefined, 'character-bio'); bio.lang = 'ca';
    for (const [label, text] of [[t('characterPersonality'), character.personality], [t('characterInterests'), character.interests]]) {
      const p = make('p'); p.append(make('strong', label + '. '), document.createTextNode(text)); bio.append(p);
    }
    scroll.append(bio);
    const stories = character.appearances.filter(appearance => appearance.kind !== 'narrated').map(appearance => ({ appearance, entry: activities.find(entry => `${entry.language}-${entry.code}` === appearance.code) })).filter(item => item.entry);
    const listHeading = make('h4', t('characterStories')); scroll.append(listHeading);
    const list = make('ul', undefined, 'character-stories');
    for (const { entry, appearance } of stories) {
      const item = make('li');
      const button = make('button', undefined, 'character-story'); button.type = 'button'; button.dataset.activity=entry.code;
      button.append(make('span', entry.title), make('small', `${entry.code}${appearance.kind === 'narrator' ? ' · ' + t('narratorRole') : ''}`));
      button.lang = entry.language;
      button.addEventListener('click', () => { stop(); onOpen(entry); });
      item.append(button); list.append(item);
    }
    scroll.append(list);
    if (!stories.length) scroll.append(make('p', t('noSpokenStories'), 'character-audio-status'));
    const actions = make('div', undefined, 'character-detail-actions');
    const browse = make('button', t('browseCharacterStories')(stories.length), 'button primary'); browse.type = 'button';
    browse.disabled = !stories.length;
    browse.addEventListener('click', () => { stop(); onBrowse(character.id); });
    actions.append(browse); detail.append(scroll, actions);
  }

  function render() {
    stop();
    root.replaceChildren();
    roster = make('nav', undefined, 'character-roster'); roster.setAttribute('aria-label', t('characters'));
    for (const character of characters) {
      const button = make('button', undefined, 'character-roster-button'); button.type = 'button';
      button.dataset.character = character.id;
      button.setAttribute('aria-controls', root.id + '-profile');
      const portrait = make('img'); Object.assign(portrait, { src: character.portrait, alt: '', width: 54, height: 54, loading: 'lazy', decoding: 'async' });
      button.append(portrait, make('span', character.name));
      button.addEventListener('click', () => select(character.id));
      roster.append(button);
    }
    detail = make('section', undefined, 'character-detail'); detail.id = root.id + '-profile';
    root.append(roster, detail);
    select(activeId, false);
  }

  for (const event of ['play', 'pause', 'ended']) audio.addEventListener(event, () => {
    play?.setAttribute('aria-pressed', String(!audio.paused));
    if (play) play.querySelector('span:last-child').textContent = t(audio.paused ? 'hearIntroduction' : 'pause');
  });
  audio.addEventListener('error', () => { if (audio.getAttribute('src')) audioStatus.textContent = t('audioError'); });
  root.closest('dialog')?.addEventListener('close', stop);
  root.closest('dialog')?.addEventListener('cancel', stop);
  root.closest('dialog')?.addEventListener('beforetoggle', event => { if (event.newState === 'closed') stop(); });
  window.addEventListener('pagehide', stop);
  render();
  return { render, select, stop };
}
