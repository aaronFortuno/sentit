import { activities } from './catalogue.js';
import { strings } from './locales.js';

const byId = id => document.getElementById(id);
const preferences = {
  get(key) { try { return localStorage.getItem(`sentit-${key}`); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(`sentit-${key}`, value); } catch { /* Usable without storage. */ } },
};
const mediaTheme = matchMedia('(prefers-color-scheme: dark)');
let language = preferences.get('lang') === 'es' ? 'es' : 'ca';
let selected = activities[0] ?? null;
let documentMode = 'worksheet';
const t = key => strings[language][key];
const filterNames = ['grade', 'level', 'duration', 'genre'];
const listenId = new URL(location.href).searchParams.get('escolta');
const listenUrl = entry => new URL(`?escolta=${encodeURIComponent(entry.id)}`, location.href).href;
const publicListenUrl = entry => `https://sentit.ortogra.fi/?escolta=${encodeURIComponent(entry.id)}`;
const printLocale = entry => strings[entry.language] ?? strings.ca;

const icons = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19m0-14-1.4 1.4M6.4 17.6 5 19"/>',
  moon: '<path d="M20.9 13.35A9 9 0 1 1 10.65 3.1a7 7 0 0 0 10.25 10.25Z"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
  printer: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6zm12-2h.01"/>',
  play: '<path d="m7 4 14 8-14 8Z"/>',
  pause: '<path d="M9 4H6v16h3zm9 0h-3v16h3z"/>',
};
function icon(container, name) {
  container.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;
}
function node(tag, text, className) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  if (className) element.className = className;
  return element;
}
function duration(entry) {
  return `${Math.floor(entry.seconds / 60)}:${String(entry.seconds % 60).padStart(2, '0')}`;
}
function filterDuration(entry) {
  if (entry.seconds <= 60) return 'short';
  return entry.seconds <= 120 ? 'medium' : 'long';
}
function theme() {
  const dark = (preferences.get('theme') ?? (mediaTheme.matches ? 'dark' : 'light')) === 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  byId('theme').setAttribute('aria-pressed', String(dark));
  document.querySelector('[name="theme-color"]').content = dark ? '#131f1b' : '#f7f5ee';
  icon(byId('theme').querySelector('[data-icon]'), dark ? 'sun' : 'moon');
}

function renderFilters() {
  const choices = { grade: t('grades'), level: t('levels'), duration: t('durations'), genre: t('genres') };
  for (const field of filterNames) {
    const select = byId(field);
    const value = select.value;
    select.replaceChildren(new Option(t('all'), ''), ...Object.entries(choices[field]).map(([key, label]) => new Option(label, key)));
    select.value = value;
  }
}

function renderCatalogue() {
  const values = Object.fromEntries(new FormData(byId('filters')));
  const matched = activities.filter(entry => filterNames.every(field =>
    !values[field] || values[field] === (field === 'duration' ? filterDuration(entry) : entry[field])));
  if (!matched.includes(selected)) selected = matched[0] ?? null;
  byId('count').textContent = matched.length;
  byId('catalog-empty').hidden = matched.length > 0;
  const list = byId('activity-list');
  list.replaceChildren();
  for (const entry of matched) {
    const item = node('li');
    const button = node('button', undefined, 'activity');
    button.type = 'button';
    button.dataset.activity = entry.id;
    button.setAttribute('aria-pressed', String(entry === selected));
    const title = node('strong', entry.title);
    title.lang = entry.language;
    button.append(title, node('span', `${t('grades')[entry.grade]} · ${t('genres')[entry.genre]} · ${duration(entry)}`, 'meta'));
    if (entry.sample) button.append(node('span', t('sample'), 'meta'));
    item.append(button);
    list.append(item);
  }
  renderSelection();
}

function renderPaper(entry) {
  const paper = byId('paper');
  paper.replaceChildren();
  paper.hidden = !entry;
  byId('paper-empty').hidden = Boolean(entry);
  if (!entry) return;
  paper.lang = entry.language;
  const labels = printLocale(entry);
  const head = node('div', undefined, 'paper-top');
  head.append(node('span', `Sentit · ${documentMode === 'answers' ? labels.answers : labels.sheetTitle}`, 'paper-brand'),
    node('span', entry.code, 'paper-code'));
  paper.append(head, node('h3', entry.title));
  if (entry.sample) paper.append(node('p', labels.sample, 'paper-caption'));
  if (documentMode === 'worksheet') {
    const identity = node('div', undefined, 'paper-identity');
    for (const key of ['name', 'date']) {
      const line = node('span', labels[key]);
      line.append(node('i'));
      identity.append(line);
    }
    paper.append(identity, node('p', labels.instructions, 'paper-instructions'));
  }
  const questions = node('ol', undefined, 'paper-questions');
  for (const question of entry.questions) {
    const item = node('li', question.prompt);
    if (documentMode === 'answers') item.append(node('p', question.answer, 'paper-answer'));
    else item.append(node('div', undefined, 'write-line'));
    questions.append(item);
  }
  paper.append(questions);
  if (documentMode === 'worksheet' && entry.audio) {
    const block = node('div', undefined, 'paper-listen');
    const url = publicListenUrl(entry);
    if (typeof globalThis.qrcode === 'function') {
      const qr = globalThis.qrcode(0, 'M');
      qr.addData(url);
      qr.make();
      const image = node('div');
      image.setAttribute('aria-hidden', 'true');
      image.innerHTML = qr.createSvgTag(3, 12);
      block.append(image);
    }
    const body = node('div');
    const link = node('a', url.replace('https://', ''));
    link.href = url;
    body.append(node('strong', labels.listen), node('br'), link);
    block.append(body);
    paper.append(block);
  }
}

function renderSelection() {
  byId('worksheet-mode').setAttribute('aria-pressed', String(documentMode === 'worksheet'));
  byId('answers-mode').setAttribute('aria-pressed', String(documentMode === 'answers'));
  byId('print').disabled = !selected;
  byId('print-kind').textContent = selected ? `${t('printKind')} · ${t(documentMode)}` : '';
  renderPaper(selected);
  const audio = byId('teacher-audio');
  if (selected?.audio !== (audio.getAttribute('src') ?? undefined)) {
    audio.pause();
    if (selected?.audio) audio.src = selected.audio;
    else audio.removeAttribute('src');
    audio.load();
  }
  byId('audio-actions').hidden = !selected?.audio;
  byId('audio-empty').hidden = Boolean(selected?.audio);
  if (selected) byId('open-player').href = listenUrl(selected);
  byId('copy-fallback').hidden = true;
  byId('copy-status').textContent = '';
}

function player(entry) {
  const audio = byId('student-audio');
  const play = byId('play');
  byId('player-title').textContent = entry?.title ?? t('invalid');
  byId('player-title').lang = entry?.language ?? language;
  byId('player-instructions').textContent = t(entry?.audio ? 'playerInstructions' : 'invalidHint');
  play.hidden = !entry?.audio;
  if (!entry?.audio) return;
  if (!audio.hasAttribute('src')) audio.src = entry.audio;
  function announce(error = false) {
    const status = byId('play-status');
    const label = audio.ended ? 'repeat' : !audio.paused ? 'pause' : audio.currentTime ? 'resume' : 'listen';
    byId('play-label').textContent = t(label);
    status.textContent = error ? t('audioError') : audio.paused ? '' : t('playing');
    icon(play.querySelector('[data-icon]'), audio.paused ? 'play' : 'pause');
  }
  if (!play.onclick) {
    play.onclick = async () => {
      if (!audio.paused) audio.pause();
      else {
        if (audio.ended) audio.currentTime = 0;
        try { await audio.play(); } catch { announce(true); }
      }
    };
    for (const event of ['play', 'pause', 'ended']) audio.addEventListener(event, () => announce());
    audio.addEventListener('error', () => announce(true));
  }
  announce(Boolean(audio.error));
}

function translate() {
  document.documentElement.lang = language;
  document.title = t('title');
  for (const element of document.querySelectorAll('[data-t]')) element.textContent = t(element.dataset.t);
  for (const element of document.querySelectorAll('[data-label]')) {
    element.setAttribute('aria-label', t(element.dataset.label));
    if (element.matches('button')) element.title = t(element.dataset.label);
  }
  if (listenId === null) {
    renderFilters();
    renderCatalogue();
  } else {
    player(activities.find(entry => entry.id === listenId));
  }
}

byId('language').value = language;
byId('language').addEventListener('change', event => {
  language = event.target.value;
  preferences.set('lang', language);
  translate();
});
byId('theme').addEventListener('click', () => {
  preferences.set('theme', document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  theme();
});
mediaTheme.addEventListener('change', theme);
byId('filters').addEventListener('change', renderCatalogue);
byId('filters').addEventListener('reset', event => {
  event.preventDefault();
  for (const field of filterNames) byId(field).value = '';
  renderCatalogue();
});
byId('activity-list').addEventListener('click', event => {
  const button = event.target.closest('[data-activity]');
  if (!button) return;
  selected = activities.find(entry => entry.id === button.dataset.activity);
  for (const item of byId('activity-list').querySelectorAll('button')) item.setAttribute('aria-pressed', String(item === button));
  renderSelection();
});
for (const [id, mode] of [['worksheet-mode', 'worksheet'], ['answers-mode', 'answers']]) {
  byId(id).addEventListener('click', () => {
    documentMode = mode;
    renderSelection();
  });
}
byId('print').addEventListener('click', () => window.print());
byId('copy-link').addEventListener('click', async () => {
  if (!selected) return;
  const url = publicListenUrl(selected);
  try {
    await navigator.clipboard.writeText(url);
    byId('copy-status').textContent = t('copied');
  } catch {
    const input = byId('copy-fallback');
    input.hidden = false;
    input.value = url;
    input.select();
    byId('copy-status').textContent = t('copyHelp');
  }
});
byId('copy-lightning').addEventListener('click', async () => {
  const address = document.querySelector('.support code');
  try {
    await navigator.clipboard.writeText(address.textContent);
    byId('lightning-status').textContent = t('addressCopied');
  } catch {
    byId('lightning-status').textContent = t('copyHelp');
    getSelection()?.selectAllChildren(address);
  }
});
for (const button of document.querySelectorAll('[data-open]')) {
  const dialog = byId(button.dataset.open);
  button.addEventListener('click', () => dialog.showModal());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
}
for (const element of document.querySelectorAll('[data-icon="close"],[data-icon="printer"]')) icon(element, element.dataset.icon);
if (listenId !== null) {
  byId('workspace').hidden = true;
  byId('player').hidden = false;
  document.querySelector('.skip').href = '#player';
}
if (matchMedia('(max-width: 590px)').matches) byId('filter-panel').open = false;
theme();
translate();
