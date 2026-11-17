import { activities } from './catalogue.js';
import { strings } from './locales.js';
import { defaultFormat, maxLines, questionFormat, renderWorksheet } from './worksheet.js';

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
const listenKey = entry => `${entry.language}-${entry.code}`;
const listenUrl = (entry, base = location.href) => new URL(`?escolta=${encodeURIComponent(listenKey(entry))}`, base).href;
const publicListenUrl = entry => listenUrl(entry, 'https://sentit.ortogra.fi/');
const printLocale = entry => strings[entry.language] ?? strings.ca;
const formatForm = byId('worksheet-format');
const paper = byId('paper');
const format = { ...defaultFormat };
let activitySettings = {};
try {
  const saved = JSON.parse(preferences.get('worksheet-format'));
  for (const [key, fallback] of Object.entries(defaultFormat)) {
    const input = formatForm.elements.namedItem(key);
    input.value = saved?.[key] ?? fallback;
    if (input.value && input.checkValidity()) format[key] = input.type === 'number' ? input.valueAsNumber : input.value;
  }
  activitySettings = JSON.parse(preferences.get('worksheet-activities')) ?? {};
} catch { /* Use defaults if settings cannot be read. */ }

const icons = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19m0-14-1.4 1.4M6.4 17.6 5 19"/>',
  moon: '<path d="M20.9 13.35A9 9 0 1 1 10.65 3.1a7 7 0 0 0 10.25 10.25Z"/>',
  languages: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
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

function fitZoom() {
  if (paper.clientWidth) paper.style.setProperty('--sheet-zoom', Math.min(1, paper.clientWidth / (210 * 96 / 25.4)));
}

function renderPaper() {
  paper.hidden = !selected;
  byId('paper-empty').hidden = Boolean(selected);
  if (!selected) {
    paper.replaceChildren();
    return;
  }
  fitZoom();
  const answerKey = documentMode === 'answers';
  renderWorksheet(paper, selected, format, activitySettings[selected.id], {
    answerKey,
    labels: printLocale(selected),
    listenUrl: !answerKey && selected.audio ? publicListenUrl(selected) : null,
  });
}

function syncFormat() {
  for (const key of Object.keys(defaultFormat)) formatForm.elements.namedItem(key).value = format[key];
}

function renderEditor() {
  byId('worksheet-editor').hidden = !selected;
  const list = byId('question-list');
  list.replaceChildren();
  if (!selected) return;
  const settings = activitySettings[selected.id];
  byId('classroom-code').value = settings?.code ?? '';
  selected.questions.forEach((question, index) => {
    const { id, included, lines } = questionFormat(question, index, settings);
    const row = node('div', undefined, 'question-setting');
    const include = node('input');
    include.type = 'checkbox';
    include.checked = included;
    include.dataset.questionId = id;
    include.dataset.questionField = 'included';
    const label = node('label', undefined, 'question-choice');
    label.lang = selected.language;
    label.append(include, node('span', `${index + 1}. ${question.prompt}`));

    const lineLabel = node('label', undefined, 'question-lines');
    const count = node('input');
    Object.assign(count, { type: 'number', min: 0, max: maxLines, value: lines, disabled: !included });
    count.dataset.questionId = id;
    count.dataset.questionField = 'lines';
    count.setAttribute('aria-label', `${t('responseLines')} · ${index + 1}`);
    lineLabel.append(node('span', t('responseLines')), count);
    row.append(label, lineLabel);
    list.append(row);
  });
}

function saveActivity() {
  preferences.set('worksheet-activities', JSON.stringify(activitySettings));
  renderPaper();
}

function renderSelection() {
  byId('worksheet-mode').setAttribute('aria-pressed', String(documentMode === 'worksheet'));
  byId('answers-mode').setAttribute('aria-pressed', String(documentMode === 'answers'));
  byId('print').disabled = !selected;
  byId('print-kind').textContent = selected ? `${t('printKind')} · ${t(documentMode)}` : '';
  renderPaper();
  renderEditor();
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
  byId('player-hint').hidden = Boolean(entry?.audio);
  play.hidden = !entry?.audio;
  if (!entry?.audio) return;
  if (!audio.hasAttribute('src')) audio.src = entry.audio;
  function announce(error = Boolean(audio.error)) {
    const status = byId('play-status');
    const label = audio.ended ? 'repeat' : !audio.paused ? 'pause' : audio.currentTime ? 'resume' : 'listen';
    byId('play-label').textContent = t(label);
    status.classList.toggle('sr-only', !error);
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
    for (const event of ['play', 'pause', 'ended', 'error']) audio.addEventListener(event, () => announce());
  }
  announce();
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
    const key = listenId.trim().toLowerCase();
    const entry = activities.find(activity => listenKey(activity).toLowerCase() === key)
      ?? activities.find(activity => activity.id === key);
    player(entry);
  }
}

byId('language').value = language;
syncFormat();
new ResizeObserver(fitZoom).observe(paper);
formatForm.addEventListener('submit', event => event.preventDefault());
formatForm.addEventListener('change', event => {
  const input = event.target;
  if (!Object.hasOwn(defaultFormat, input.name)) return;
  if (input.type === 'number' && (!input.value || !input.checkValidity())) input.value = format[input.name];
  format[input.name] = input.type === 'number' ? input.valueAsNumber : input.value;
  preferences.set('worksheet-format', JSON.stringify(format));
  renderPaper();
});
formatForm.addEventListener('reset', event => {
  event.preventDefault();
  Object.assign(format, defaultFormat);
  syncFormat();
  preferences.set('worksheet-format', JSON.stringify(format));
  renderPaper();
});
byId('classroom-code').addEventListener('input', event => {
  if (!selected) return;
  (activitySettings[selected.id] ??= {}).code = event.target.value;
  saveActivity();
});
byId('question-settings').addEventListener('change', event => {
  const input = event.target;
  const { questionId: id, questionField: field } = input.dataset;
  if (!selected || !field) return;
  const settings = activitySettings[selected.id] ??= {};
  const index = selected.questions.findIndex((question, i) => (question.id ?? String(i)) === id);
  if (index === -1) return;
  const { lines } = questionFormat(selected.questions[index], index, settings);
  settings.questions ??= {};
  const override = settings.questions[id] ??= {};
  if (field === 'lines') {
    if (!input.value || !input.checkValidity()) input.value = lines;
    override.lines = input.valueAsNumber;
  } else {
    override.included = input.checked;
    input.closest('.question-setting').querySelector('[data-question-field="lines"]').disabled = !input.checked;
  }
  saveActivity();
});
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
for (const element of document.querySelectorAll('[data-icon]')) {
  if (Object.hasOwn(icons, element.dataset.icon)) icon(element, element.dataset.icon);
}
if (listenId === null) {
  document.querySelector('.top').hidden = false;
  byId('workspace').hidden = false;
  document.querySelector('.bottom').hidden = false;
} else {
  document.body.classList.add('listening');
  byId('player').hidden = false;
  document.querySelector('.skip').href = '#player';
}
if (matchMedia('(max-width: 1040px)').matches) byId('format-panel').open = false;
if (matchMedia('(max-width: 590px)').matches) byId('filter-panel').open = false;
theme();
translate();
