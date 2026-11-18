import { activities, legacyActivities } from './catalogue.js';
import { strings } from './locales.js';
import { defaultFormat, imageOptions, maxLines, questionFormat, renderWorksheet } from './worksheet.js';
import { clockTime, decodeSession, defaultSession, encodeSession, guidedPrompts } from './session.js';
import { initGuidedPlayer } from './guided-player.js';
import { mountCatalog } from './catalog.js';
import { listCollections, saveCollectionLayout } from './collections.js';
import { durationText } from './activity-meta.js';
import { animateRefresh, mountDetails, mountDialogs, openDialog, closeDialog, scrollToTarget, setDetailsOpen, setDisclosure } from './motion.js';
import { mountCharacterExplorer } from './character-explorer.js';
import { mountLanguageMenu } from './language-menu.js';
import { mottos, nextMotto } from './mottos.js';

const byId = id => document.getElementById(id);
const preferences = {
  get(key) { try { return localStorage.getItem(`sentit-${key}`); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(`sentit-${key}`, value); } catch { /* Usable without storage. */ } },
};
const mediaTheme = matchMedia('(prefers-color-scheme: dark)');
let language = preferences.get('lang') === 'es' ? 'es' : 'ca';
let mottoIndex = nextMotto();
const linkedActivities = [...activities, ...legacyActivities];
let selected = null;
let activeCollectionId = '';
let currentSettings = {};
let documentMode = 'worksheet';
const t = key => strings[language][key];
const query = new URL(location.href).searchParams;
const listenId = query.get('escolta');
const listenKey = entry => `${entry.language}-${entry.code}`;
const findActivity = reference => {
  const key = String(reference ?? '').trim().toLowerCase();
  return linkedActivities.find(entry => listenKey(entry).toLowerCase() === key) ?? linkedActivities.find(entry => entry.id === key);
};
const publicListenUrl = entry => listenUrl(entry, 'https://sentit.ortogra.fi/');
const printLocale = entry => strings[entry.language] ?? strings.ca;
const formatForm = byId('worksheet-format');
const sessionEditor = byId('session-editor');
const paper = byId('paper');
const format = { ...defaultFormat };
let activitySettings = {};
function restoreFormat(saved) {
  const previousDefault = saved?.font === 'serif' && saved.size === 12
    && ((saved.spacing === 4 && saved.leading === 1.35) || (saved.spacing === 5 && saved.leading === 1.5));
  return previousDefault ? { ...defaultFormat } : saved;
}
try {
  const saved = restoreFormat(JSON.parse(preferences.get('worksheet-format')));
  for (const [key, fallback] of Object.entries(defaultFormat)) {
    const input = formatForm.elements.namedItem(key);
    input.value = saved?.[key] ?? fallback;
    if (input.value && input.checkValidity()) format[key] = input.type === 'number' ? input.valueAsNumber : input.value;
  }
  activitySettings = JSON.parse(preferences.get('worksheet-activities')) ?? {};
} catch { /* Use defaults if settings cannot be read. */ }
const standardFormat = { ...format };

function snapshot(entry, collectionId = '') {
  const stored = collectionId ? listCollections().find(item => item.id === collectionId)?.layouts?.[entry.id] : null;
  if (stored) return structuredClone(stored);
  const { format: savedFormat, ...settings } = activitySettings[entry.id] ?? {};
  return { format: { ...standardFormat, ...savedFormat }, settings: structuredClone(settings) };
}

function applyFormat(settings) {
  const saved = restoreFormat(settings);
  for (const [key, fallback] of Object.entries(defaultFormat)) {
    const input = formatForm.elements.namedItem(key);
    input.value = saved?.[key] ?? fallback;
    format[key] = input.value && input.checkValidity() ? input.type === 'number' ? input.valueAsNumber : input.value : fallback;
  }
  syncFormat();
}

function sessionSettings(entry) {
  return { ...defaultSession, ...(entry === selected ? currentSettings.session : activitySettings[entry.id]?.session) };
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
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/><circle cx="9" cy="7" r="4"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
  printer: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6zm12-2h.01"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  play: '<path d="m7 4 14 8-14 8Z"/>',
  pause: '<path d="M9 4H6v16h3zm9 0h-3v16h3z"/>',
  'arrow-left': '<path d="m12 19-7-7 7-7M5 12h14"/>',
  'arrow-up': '<path d="m5 12 7-7 7 7M12 5v14"/>',
  'arrow-down': '<path d="m5 12 7 7 7-7M12 5v14"/>',
  grip: '<circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  book: '<path d="M12 7v14M3 3h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5v17h-5a4 4 0 0 0-4 1 4 4 0 0 0-4-1H3Z"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"/>',
  news: '<path d="M4 5h16v15H4a2 2 0 0 1-2-2V8h2M4 5v13M8 9h8M8 13h3M8 16h3M14 13h2M14 16h2"/>',
  checklist: '<path d="m3 6 1 1 2-3M10 6h11M3 12l1 1 2-3M10 12h11M3 18l1 1 2-3M10 18h11"/>',
  messages: '<path d="M21 11V3H3v13l4-4h6M16 16h6v6l-3-3h-6v-7h9v4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
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
function theme() {
  const dark = (preferences.get('theme') ?? (mediaTheme.matches ? 'dark' : 'light')) === 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  byId('theme').setAttribute('aria-pressed', String(dark));
  document.querySelector('[name="theme-color"]').content = dark ? '#131f1b' : '#f7f5ee';
  icon(byId('theme').querySelector('[data-icon]'), dark ? 'sun' : 'moon');
}

function fitZoom() {
  if (paper.clientWidth) paper.style.setProperty('--sheet-zoom', Math.min(1, paper.clientWidth / (210 * 96 / 25.4)));
}

function renderPaper() {
  paper.hidden = !selected;
  byId('paper-empty').hidden = Boolean(selected);
  if (!selected || byId('workspace').hidden) {
    paper.replaceChildren();
    return;
  }
  fitZoom();
  const scroller = paper.parentElement;
  const scrollTop = scroller.scrollTop;
  const answerKey = documentMode === 'answers';
  renderWorksheet(paper, selected, format, currentSettings, {
    answerKey,
    labels: printLocale(selected),
    toolLabels: strings[language],
    listenUrl: !answerKey && selected.audio ? publicListenUrl(selected) : null,
    session: configuredSession(selected),
  });
  scroller.scrollTop = scrollTop;
  animateRefresh(paper);
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
  const settings = currentSettings;
  byId('classroom-code').value = settings?.code ?? '';
  byId('show-instructions').checked = settings.showInstructions ?? true;
  byId('show-instructions').closest('label').hidden = documentMode === 'answers';
  byId('evidence-option').hidden = documentMode !== 'answers';
  byId('show-evidence').checked = settings.showEvidence ?? true;
  renderImageEditor();
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

function renderImageEditor() {
  const options = imageOptions(selected, currentSettings);
  byId('image-panel').hidden = !options.available;
  byId('show-image').checked = options.visible;
  byId('image-width').value = options.width;
  byId('image-position').value = options.position;
  byId('image-fields').disabled = !options.visible;
}

function saveActivity() {
  if (!selected) return;
  try {
    if (activeCollectionId) saveCollectionLayout(activeCollectionId, selected.id, { format: { ...format }, settings: currentSettings });
    else {
      activitySettings[selected.id] = { ...currentSettings, format: { ...format } };
      localStorage.setItem('sentit-worksheet-activities', JSON.stringify(activitySettings));
    }
    byId('layout-status').textContent = '';
  } catch { byId('layout-status').textContent = t('layoutStorageError'); }
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
    setDisclosure(byId('session-fields'), session.enabled);
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
  const entries = catalog.entries();
  const options = entries.includes(selected) ? entries : [...entries, selected].filter(Boolean);
  byId('activity-select').replaceChildren(...options.map(entry => new Option(`${entry.code} · ${entry.title}`, entry.id)));
  byId('activity-select').value = selected?.id ?? '';
  byId('worksheet-mode').setAttribute('aria-pressed', String(documentMode === 'worksheet'));
  byId('answers-mode').setAttribute('aria-pressed', String(documentMode === 'answers'));
  byId('print').disabled = !selected;
  byId('print-label').textContent = t(documentMode === 'answers' ? 'printAnswers' : 'printWorksheet');
  byId('print-kind').textContent = selected ? t('printHint') : '';
  const scope = listCollections().find(entry => entry.id === activeCollectionId);
  byId('activity-meta').textContent = selected ? `${t('grades')[selected.grade] ?? selected.grade} · ${t('genres')[selected.genre] ?? selected.genre} · ${durationText(selected, t)}${scope ? ` · ${scope.name}` : ''}` : '';
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
  byId('audio-empty').textContent = selected ? t('audioPendingHint') : t('noAudio');
  renderSessionEditor();
}

function showActivity(entry, collectionId = '') {
  const collection = listCollections().find(item => item.id === collectionId);
  activeCollectionId = collection?.readingIds.includes(entry.id) ? collectionId : '';
  if (catalog.collectionId() !== activeCollectionId) catalog.setCollection(activeCollectionId);
  selected = entry;
  const saved = snapshot(entry, activeCollectionId);
  currentSettings = saved.settings ?? {};
  applyFormat(saved.format);
  documentMode = 'worksheet';
  byId('catalog-view').hidden = true;
  byId('workspace').hidden = false;
  byId('layout-status').textContent = '';
  document.querySelector('.skip').href = '#workspace';
  paper.parentElement.scrollTop = 0;
  renderSelection();
  byId('workspace').focus({ preventScroll: true });
  animateRefresh(byId('workspace'));
}

function route() {
  if (listenId !== null) return;
  const hash = new URLSearchParams(location.hash.slice(1));
  const entry = findActivity(hash.get('lectura'));
  if (entry) {
    if (hash.get('lectura') !== listenKey(entry)) {
      hash.set('lectura', listenKey(entry));
      const url = new URL(location.href);
      url.hash = hash.toString();
      history.replaceState(null, '', url);
    }
    showActivity(entry, hash.get('col') ?? '');
  }
  else {
    byId('teacher-audio').pause();
    byId('workspace').hidden = true;
    byId('catalog-view').hidden = false;
    document.querySelector('.skip').href = '#catalog-view';
    catalog.render();
    byId('catalog-view').focus({ preventScroll: true });
    animateRefresh(byId('catalog-view'));
  }
}

function openActivity(entry, collectionId = '') {
  if (!entry) return;
  const hash = new URLSearchParams({ lectura: listenKey(entry) });
  if (collectionId) hash.set('col', collectionId);
  const url = new URL(location.href);
  url.hash = hash.toString();
  history.pushState(null, '', url);
  route();
}

function openCatalog() {
  const url = new URL(location.href);
  url.hash = '';
  history.pushState(null, '', url);
  route();
}

function player(entry) {
  const audio = byId('student-audio');
  const play = byId('play');
  const sessionCode = query.get('p');
  const session = sessionCode === null ? null : decodeSession(sessionCode);
  const prompts = guidedPrompts(entry);
  const invalidConfig = Boolean(entry?.audio) && sessionCode !== null && (!session || !prompts);
  const available = Boolean(entry?.audio) && !invalidConfig;
  byId('player-title').textContent = invalidConfig ? t('invalidSession') : entry?.title ?? t('invalid');
  byId('player-title').lang = entry?.language ?? language;
  byId('player-hint').hidden = available;
  byId('player-hint').textContent = entry && !entry.audio ? t('audioPendingHint') : t('invalidHint');
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
  for (const element of document.querySelectorAll('[data-placeholder]')) element.placeholder = t(element.dataset.placeholder);
  byId('header-motto').textContent = mottos[language][mottoIndex];
  characterExplorer?.render();
  if (listenId === null) {
    catalog.render();
    if (!byId('workspace').hidden) renderSelection();
  } else {
    player(findActivity(listenId));
  }
}

const catalog = mountCatalog({
  activities, t, locale: () => language, icon, snapshot, onOpen: openActivity,
  onCollectionsChange() {
    if (!activeCollectionId || byId('workspace').hidden) return;
    const collection = listCollections().find(item => item.id === activeCollectionId);
    if (collection?.readingIds.includes(selected.id)) showActivity(selected, activeCollectionId);
    else openCatalog();
  },
});

const characterExplorer = listenId === null ? mountCharacterExplorer(byId('dialog-character-explorer'), {
  activities, t,
  onBrowse(id) { closeDialog(byId('characters-dialog'), () => { catalog.showCharacter(id); openCatalog(); }); },
  onOpen(entry) { closeDialog(byId('characters-dialog'), () => { catalog.setCollection(''); openActivity(entry); }); },
}) : null;

byId('language').value = language;
mountLanguageMenu(byId('language-button'), byId('language-menu'), byId('language'));
byId('header-motto').addEventListener('click', () => {
  mottoIndex = nextMotto(mottoIndex);
  byId('header-motto').textContent = mottos[language][mottoIndex];
  animateRefresh(byId('header-motto'));
});
syncFormat();
new ResizeObserver(fitZoom).observe(paper);
sessionEditor.addEventListener('submit', event => event.preventDefault());
function updateSession(event) {
  if (!guidedPrompts(selected)) return;
  if (event.type === 'input' && !sessionEditor.checkValidity()) return;
  if (sessionEditor.checkValidity()) {
    const session = {
      enabled: byId('guided-mode').checked,
      reading: byId('session-reading').valueAsNumber,
      listens: Number(byId('session-listens').value),
      interval: byId('session-interval').valueAsNumber,
      prepare: byId('session-prepare').checked,
      repeat: byId('session-repeat').checked,
    };
    if (JSON.stringify(session) !== JSON.stringify(sessionSettings(selected))) {
      currentSettings.session = session;
      saveActivity();
    } else return;
  }
  renderSessionEditor();
}
sessionEditor.addEventListener('input', updateSession);
sessionEditor.addEventListener('change', updateSession);
formatForm.addEventListener('submit', event => event.preventDefault());
function updateFormat(event) {
  const input = event.target;
  if (!Object.hasOwn(defaultFormat, input.name)) return;
  if (input.type === 'number' && (!input.value || !input.checkValidity())) {
    if (event.type === 'change') input.value = format[input.name];
    return;
  }
  const value = input.type === 'number' ? input.valueAsNumber : input.value;
  if (format[input.name] === value) return;
  format[input.name] = value;
  if (!activeCollectionId) {
    Object.assign(standardFormat, format);
    preferences.set('worksheet-format', JSON.stringify(format));
  }
  saveActivity();
}
formatForm.addEventListener('input', updateFormat);
formatForm.addEventListener('change', updateFormat);
formatForm.addEventListener('reset', event => {
  event.preventDefault();
  Object.assign(format, defaultFormat);
  syncFormat();
  if (!activeCollectionId) {
    Object.assign(standardFormat, format);
    preferences.set('worksheet-format', JSON.stringify(format));
  }
  saveActivity();
});
byId('show-instructions').addEventListener('change', event => {
  currentSettings.showInstructions = event.target.checked;
  saveActivity();
});
byId('show-evidence').addEventListener('change', event => {
  currentSettings.showEvidence = event.target.checked;
  saveActivity();
});
function updateImage(event) {
  if (!selected) return;
  const previous = imageOptions(selected, currentSettings);
  const width = byId('image-width');
  if (event.target === width && (!width.value || !width.checkValidity())) {
    if (event.type === 'change') width.value = previous.width;
    return;
  }
  const next = {
    showImage: byId('show-image').checked,
    imageWidth: width.value && width.checkValidity() ? width.valueAsNumber : previous.width,
    imagePosition: byId('image-position').value,
  };
  if (previous.visible === next.showImage && previous.width === next.imageWidth && previous.position === next.imagePosition) return;
  Object.assign(currentSettings, next);
  saveActivity();
  renderImageEditor();
}
byId('image-editor').addEventListener('submit', event => event.preventDefault());
byId('image-editor').addEventListener('input', updateImage);
byId('image-editor').addEventListener('change', updateImage);
byId('classroom-code').addEventListener('input', event => {
  if (!selected) return;
  currentSettings.code = event.target.value;
  saveActivity();
});
paper.addEventListener('click', event => {
  const cue = event.target.closest('[data-evidence-target]');
  if (cue) {
    event.preventDefault();
    const target = document.getElementById(cue.dataset.evidenceTarget);
    scrollToTarget(target);
    target?.focus({ preventScroll: true });
    return;
  }
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
  const settings = currentSettings;
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
    setDetailsOpen(byId('question-panel'), true);
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
  currentSettings.questions[button.dataset.restoreQuestion].included = true;
  saveActivity();
  renderEditor();
  if (!byId('question-panel').hidden) byId('question-panel').querySelector('summary').focus({ preventScroll: true });
});
byId('restore-all').addEventListener('click', () => {
  if (!selected) return;
  const settings = currentSettings;
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
byId('activity-select').addEventListener('change', event => {
  openActivity(activities.find(entry => entry.id === event.target.value), activeCollectionId);
});
byId('back-catalog').addEventListener('click', openCatalog);
document.querySelector('.brand').addEventListener('click', event => {
  if (listenId === null && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
    event.preventDefault();
    openCatalog();
  }
});
window.addEventListener('hashchange', route);
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
  button.addEventListener('click', () => openDialog(dialog));
}
for (const element of document.querySelectorAll('[data-icon]')) {
  if (Object.hasOwn(icons, element.dataset.icon)) icon(element, element.dataset.icon);
}
if (listenId === null) {
  document.querySelector('.top').hidden = false;
  document.querySelector('.bottom').hidden = false;
} else {
  document.body.classList.add('listening');
  byId('player').hidden = false;
  document.querySelector('.skip').href = '#player';
}
const mobileLayout = matchMedia('(max-width: 640px)');
mountDetails();
mountDialogs();
const compactCatalog = matchMedia('(max-width: 640px)');
function toggleSettings(open) {
  byId('settings-toggle').setAttribute('aria-expanded', String(open));
  setDisclosure(byId('settings-scroll'), open);
}
toggleSettings(!mobileLayout.matches);
setDetailsOpen(byId('filter-panel'), !compactCatalog.matches || catalog.hasCharacterFilter(), { animated: false });
if (catalog.hasCharacterFilter()) setDetailsOpen(byId('character-filter'), true, { animated: false });
byId('settings-toggle').addEventListener('click', () => toggleSettings(byId('settings-toggle').getAttribute('aria-expanded') !== 'true'));
mobileLayout.addEventListener('change', event => { toggleSettings(!event.matches); });
compactCatalog.addEventListener('change', event => { setDetailsOpen(byId('filter-panel'), !event.matches); });
theme();
translate();
route();
