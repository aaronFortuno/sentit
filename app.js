import { activities } from './catalogue.js';
import { strings } from './locales.js';
import { defaultFormat, maxLines, questionFormat, renderWorksheet } from './worksheet.js';
import { clockTime, decodeSession, defaultSession, encodeSession, guidedPrompts } from './session.js';
import { initGuidedPlayer } from './guided-player.js';

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
const query = new URL(location.href).searchParams;
const listenId = query.get('escolta');
const listenKey = entry => `${entry.language}-${entry.code}`;
const publicListenUrl = entry => listenUrl(entry, 'https://sentit.ortogra.fi/');
const printLocale = entry => strings[entry.language] ?? strings.ca;
const formatForm = byId('worksheet-format');
const sessionEditor = byId('session-editor');
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

function sessionSettings(entry) {
  return { ...defaultSession, ...activitySettings[entry.id]?.session };
}

function configuredSession(entry) {
  if (!guidedPrompts(entry)) return null;
  const session = sessionSettings(entry);
  return session.enabled ? session : null;
}

function listenUrl(entry, base = location.href) {
  const url = new URL(`?escolta=${encodeURIComponent(listenKey(entry))}`, base);
  const session = configuredSession(entry);
  if (session) url.searchParams.set('p', encodeSession(session));
  return url.href;
}

const icons = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19m0-14-1.4 1.4M6.4 17.6 5 19"/>',
  moon: '<path d="M20.9 13.35A9 9 0 1 1 10.65 3.1a7 7 0 0 0 10.25 10.25Z"/>',
  languages: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
  printer: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6zm12-2h.01"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
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
  const select = byId('activity-select');
  select.replaceChildren();
  for (const entry of matched) {
    const option = new Option(`${entry.code} · ${entry.title}`, entry.id);
    option.lang = entry.language;
    select.append(option);
  }
  if (!matched.length) select.append(new Option(t('noResults'), ''));
  select.disabled = !selected;
  select.value = selected?.id ?? '';
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
  const scroller = paper.parentElement;
  const scrollTop = scroller.scrollTop;
  const answerKey = documentMode === 'answers';
  renderWorksheet(paper, selected, format, activitySettings[selected.id], {
    answerKey,
    labels: printLocale(selected),
    toolLabels: strings[language],
    listenUrl: !answerKey && selected.audio ? publicListenUrl(selected) : null,
    session: configuredSession(selected),
  });
  scroller.scrollTop = scrollTop;
}

function syncFormat() {
  for (const key of Object.keys(defaultFormat)) formatForm.elements.namedItem(key).value = format[key];
}

function renderEditor() {
  byId('worksheet-editor').hidden = !selected;
  const list = byId('hidden-questions');
  list.replaceChildren();
  byId('question-panel').hidden = true;
  if (!selected) return;
  const settings = activitySettings[selected.id];
  byId('classroom-code').value = settings?.code ?? '';
  selected.questions.forEach((question, index) => {
    const { id, included } = questionFormat(question, index, settings);
    if (included) return;
    const row = node('li');
    const label = node('span', `${index + 1}. ${question.prompt}`);
    label.lang = selected.language;
    const restore = node('button', t('restore'), 'subtle');
    restore.type = 'button';
    restore.dataset.restoreQuestion = id;
    restore.setAttribute('aria-label', t('questionRestore')(index + 1));
    row.append(label, restore);
    list.append(row);
  });
  byId('hidden-count').textContent = list.childElementCount;
  byId('question-panel').hidden = list.childElementCount === 0;
}

function saveActivity() {
  preferences.set('worksheet-activities', JSON.stringify(activitySettings));
  renderPaper();
}

function renderSessionEditor() {
  const available = Boolean(guidedPrompts(selected));
  sessionEditor.hidden = !available;
  if (available) {
    const session = sessionSettings(selected);
    byId('guided-mode').checked = session.enabled;
    byId('session-reading').value = session.reading;
    byId('session-listens').value = session.listens;
    byId('session-interval').value = session.interval;
    byId('session-fields').disabled = !session.enabled;
    byId('session-fields').hidden = !session.enabled;
    byId('session-interval').disabled = session.listens === 1;
    byId('session-prepare').checked = session.prepare;
    byId('session-prepare').disabled = session.reading === 0;
    byId('session-repeat').checked = session.repeat;
    byId('session-repeat').disabled = session.listens === 1;
  }
  if (selected) byId('open-player').href = listenUrl(selected);
  byId('open-player').hidden = !selected?.audio;
  byId('copy-link').hidden = !selected?.audio;
  byId('copy-fallback').hidden = true;
  byId('copy-status').textContent = '';
}

function renderSelection() {
  byId('worksheet-mode').setAttribute('aria-pressed', String(documentMode === 'worksheet'));
  byId('answers-mode').setAttribute('aria-pressed', String(documentMode === 'answers'));
  byId('print').disabled = !selected;
  byId('print-label').textContent = t(documentMode === 'answers' ? 'printAnswers' : 'printWorksheet');
  byId('print-kind').textContent = selected ? t('printHint') : '';
  byId('activity-meta').textContent = selected ? `${t('grades')[selected.grade]} · ${t('genres')[selected.genre]} · ${clockTime(selected.seconds)}${selected.sample ? ` · ${t('sample')}` : ''}` : '';
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
  renderSessionEditor();
}

function player(entry) {
  const audio = byId('student-audio');
  const play = byId('play');
  const sessionCode = query.get('p');
  const session = sessionCode === null ? null : decodeSession(sessionCode);
  const prompts = guidedPrompts(entry);
  const invalidConfig = Boolean(entry) && sessionCode !== null && (!session || !prompts);
  const available = Boolean(entry?.audio) && !invalidConfig;
  byId('player-title').textContent = invalidConfig ? t('invalidSession') : entry?.title ?? t('invalid');
  byId('player-title').lang = entry?.language ?? language;
  byId('player-hint').hidden = available;
  play.hidden = !available;
  if (!available) return;
  if (session) {
    const statusNode = byId('play-status');
    const timer = byId('session-countdown');
    const label = byId('play-label');
    statusNode.classList.remove('sr-only');
    initGuidedPlayer(entry, session, prompts, play, ({ action, status, countdown, number, busy }) => {
      if (label.textContent !== t(action)) {
        label.textContent = t(action);
        icon(play.querySelector('[data-icon]'), action === 'pause' ? 'pause' : 'play');
      }
      const message = status === 'sessionListening' ? t(status)(number, session.listens) : status ? t(status) : '';
      if (statusNode.textContent !== message) statusNode.textContent = message;
      const time = countdown === null ? '' : clockTime(countdown);
      if (timer.textContent !== time) timer.textContent = time;
      timer.hidden = countdown === null;
      play.disabled = busy;
    });
    return;
  }
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
sessionEditor.addEventListener('submit', event => event.preventDefault());
sessionEditor.addEventListener('change', () => {
  if (!guidedPrompts(selected)) return;
  if (sessionEditor.checkValidity()) {
    (activitySettings[selected.id] ??= {}).session = {
      enabled: byId('guided-mode').checked,
      reading: byId('session-reading').valueAsNumber,
      listens: Number(byId('session-listens').value),
      interval: byId('session-interval').valueAsNumber,
      prepare: byId('session-prepare').checked,
      repeat: byId('session-repeat').checked,
    };
    saveActivity();
  }
  renderSessionEditor();
});
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
paper.addEventListener('click', event => {
  const button = event.target.closest('[data-question-action]');
  if (!selected || !button) return;
  const tools = button.closest('[data-question-id]');
  const { questionId: id } = tools.dataset;
  const action = button.dataset.questionAction;
  if (action === 'toggle') {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    tools.classList.toggle('is-open', open);
    return;
  }
  const settings = activitySettings[selected.id] ??= {};
  const index = selected.questions.findIndex((question, i) => (question.id ?? String(i)) === id);
  if (index === -1) return;
  const { lines } = questionFormat(selected.questions[index], index, settings);
  settings.questions ??= {};
  const override = settings.questions[id] ??= {};
  if (action === 'hide') override.included = false;
  else override.lines = Math.max(0, Math.min(maxLines, lines + (action === 'more' ? 1 : -1)));
  const expanded = tools.classList.contains('is-open');
  saveActivity();
  renderEditor();
  if (action === 'hide') {
    byId('question-panel').open = true;
    byId('question-panel').querySelector('summary').focus({ preventScroll: true });
  } else {
    const restored = [...paper.querySelectorAll('.paper-question-tools')].find(element => element.dataset.questionId === id);
    if (expanded) {
      restored.classList.add('is-open');
      restored.querySelector('[data-question-action="toggle"]').setAttribute('aria-expanded', 'true');
    }
    const focus = restored.querySelector(`[data-question-action="${action}"]`);
    (focus.disabled ? restored.querySelector(`[data-question-action="${action === 'more' ? 'less' : 'more'}"]`) : focus).focus({ preventScroll: true });
  }
});
byId('hidden-questions').addEventListener('click', event => {
  const button = event.target.closest('[data-restore-question]');
  if (!selected || !button) return;
  activitySettings[selected.id].questions[button.dataset.restoreQuestion].included = true;
  saveActivity();
  renderEditor();
  if (!byId('question-panel').hidden) byId('question-panel').querySelector('summary').focus({ preventScroll: true });
});
byId('restore-all').addEventListener('click', () => {
  if (!selected) return;
  const settings = activitySettings[selected.id];
  for (const override of Object.values(settings?.questions ?? {})) override.included = true;
  saveActivity();
  renderEditor();
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
byId('activity-select').addEventListener('change', event => {
  selected = activities.find(entry => entry.id === event.target.value);
  paper.parentElement.scrollTop = 0;
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
const mobileLayout = matchMedia('(max-width: 640px)');
const compactCatalog = matchMedia('(max-width: 1000px)');
function toggleSettings(open) {
  byId('settings-toggle').setAttribute('aria-expanded', String(open));
  byId('settings-scroll').hidden = !open;
}
toggleSettings(!mobileLayout.matches);
byId('filter-panel').open = !compactCatalog.matches;
byId('settings-toggle').addEventListener('click', () => toggleSettings(byId('settings-scroll').hidden));
mobileLayout.addEventListener('change', event => { toggleSettings(!event.matches); });
compactCatalog.addEventListener('change', event => { byId('filter-panel').open = !event.matches; });
theme();
translate();
