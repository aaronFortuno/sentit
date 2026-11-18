import { collectionsKey, listCollections, saveCollectionEntries, renameCollection, removeCollection, moveCollectionReading, removeCollectionReading } from './collections.js';
import { durationText, durationTier, matchesDuration } from './activity-meta.js';
import { animateRefresh, closeDialog, openDialog, setDisclosure } from './motion.js';
import { mountCatalogGestures } from './catalog-gestures.js';

const normalise = value => value.toLocaleLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
const activeKey = 'sentit.collection.active.v1';

export function mountCatalog({ activities, t, locale, icon, snapshot, onOpen, onCollectionsChange }) {
  const byId = id => document.getElementById(id);
  const index = new Map(activities.map(entry => [entry.id, entry]));
  const searchIndex = new Map(activities.map(entry => [entry.id, normalise(`${entry.language}-${entry.code} ${entry.title} ${entry.summary ?? ''}`)]));
  const fields = ['grade', 'level', 'duration', 'genre'];
  let collectionId = '';
  try { collectionId = localStorage.getItem(activeKey) ?? ''; } catch { /* Start with the full catalogue. */ }
  let selecting = false;
  let selectedIds = new Set();
  let selectionSource = '';
  let addingTo = '';
  let matches = [];
  let limit = 12;
  const grid = byId('activity-grid');
  const dialog = byId('collection-dialog');
  const scroller = byId('catalog-view').querySelector('.catalog-results-scroll');
  let gestures;

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function languageName(code) {
    try { return new Intl.DisplayNames([locale()], { type: 'language' }).of(code); }
    catch { return code; }
  }

  function currentCollection() {
    return listCollections().find(entry => entry.id === collectionId);
  }

  function sourceEntries() {
    const collection = currentCollection();
    return collection ? collection.readingIds.map(id => index.get(id)).filter(Boolean) : activities;
  }

  function errorMessage(error) {
    return t(error.message) ?? t('storageError');
  }

  function setCollection(id) {
    gestures?.close();
    collectionId = id;
    try { localStorage.setItem(activeKey, id); } catch { /* Retain this selection for this visit. */ }
    selecting = false;
    selectedIds.clear();
    addingTo = '';
    for (const select of byId('filters').querySelectorAll('select')) select.value = '';
    byId('search').value = '';
    setDisclosure(byId('collection-rename'), false);
    byId('collection-rename-toggle').setAttribute('aria-expanded', 'false');
    limit = 12;
    render();
  }

  function renderFilters() {
    const dictionaries = { grade: t('grades'), level: t('levels'), duration: t('durations'), genre: t('genres') };
    for (const field of fields) {
      const select = byId(field);
      const saved = select.value;
      const choices = { ...dictionaries[field] };
      if (field !== 'duration') for (const entry of activities) choices[entry[field]] ??= entry[field];
      select.replaceChildren(new Option(t('all'), ''), ...Object.entries(choices).map(([value, text]) => new Option(text, value)));
      select.value = saved;
    }
    const select = byId('content-language');
    const saved = select.value;
    select.replaceChildren(new Option(t('all'), ''), ...[...new Set(activities.map(entry => entry.language))].map(code => new Option(languageName(code), code)));
    select.value = saved;
  }

  function renderSelection() {
    byId('selection-count').textContent = t('selectionCount')(selectedIds.size);
    byId('selection-save').disabled = selectedIds.size === 0;
    byId('collection-save').setAttribute('aria-pressed', String(selecting));
    byId('collection-save').hidden = selecting;
    setDisclosure(byId('catalog-selection'), selecting);
    grid.classList.toggle('is-selecting', selecting);
    for (const card of grid.children) {
      const selected = selecting && selectedIds.has(card.dataset.id);
      card.classList.toggle('is-selected', selected);
      card.querySelector('.card-selection').hidden = !selected;
      if (selecting) card.setAttribute('aria-pressed', String(selected));
      else card.removeAttribute('aria-pressed');
      card.setAttribute('aria-describedby', selecting ? 'catalog-selection-help' : 'catalog-card-help');
    }
    if (selecting) gestures?.close();
    gestures?.sync();
  }

  function renderCards() {
    grid.replaceChildren();
    for (const entry of matches.slice(0, limit)) {
      const card = element('button', undefined, 'activity-card');
      card.type = 'button';
      card.dataset.id = entry.id;
      card.dataset.openActivity = entry.id;
      card.dataset.genre = entry.genre;
      card.dataset.level = entry.level;
      if (entry.image?.src) {
        const art = element('span', undefined, 'activity-card-art');
        art.setAttribute('aria-hidden', 'true');
        const illustration = element('img');
        Object.assign(illustration, { src: entry.image.src, alt: '', loading: 'lazy', decoding: 'async', width: entry.image.width, height: entry.image.height });
        art.append(illustration);
        card.append(art);
      }
      const selection = element('span', undefined, 'card-selection');
      const check = element('span'); icon(check, 'check');
      selection.append(check, element('span', t('selectedActivity')));
      selection.setAttribute('aria-hidden', 'true');
      selection.hidden = true;
      card.append(selection);
      const code = element('span', `${entry.code} · ${languageName(entry.language)}`, 'activity-card-code');
      const head = element('div', undefined, 'activity-card-head');
      const type = element('span', undefined, 'activity-type');
      const symbol = element('span');
      icon(symbol, { story: 'book', interview: 'mic', news: 'news', instructions: 'checklist', dialogue: 'messages' }[entry.genre] ?? 'book');
      type.append(symbol, element('span', t('genres')[entry.genre] ?? entry.genre));
      head.append(type, code);
      const title = element('h2', entry.title);
      title.lang = entry.language;
      card.append(head, title);
      if (entry.summary) {
        const summary = element('p', entry.summary, 'activity-card-summary');
        summary.lang = entry.language;
        card.append(summary);
      }
      const context = element('div', undefined, 'activity-card-context');
      context.append(element('span', t('grades')[entry.grade] ?? entry.grade, 'meta'));
      if (!entry.audio) context.append(element('span', t('audioPending'), 'activity-card-status'));
      const footer = element('div', undefined, 'activity-card-bottom');
      const duration = element('span', undefined, 'activity-duration');
      const clock = element('span'); icon(clock, 'clock');
      duration.append(clock, element('span', durationText(entry, t)));
      const meter = element('span', undefined, 'duration-meter');
      const tier = durationTier(entry);
      meter.setAttribute('aria-hidden', 'true');
      meter.hidden = !tier;
      for (let i = 0; i < 4; i++) meter.append(element('i', undefined, i < tier ? 'is-filled' : ''));
      duration.append(meter);
      duration.title = `${durationText(entry, t)} · ${t('durationScale')}`;
      const level = element('span', undefined, 'activity-difficulty');
      const dots = element('span', undefined, 'difficulty-dots');
      dots.setAttribute('aria-hidden', 'true');
      const filled = { easy: 1, middle: 2, advanced: 3 }[entry.level] ?? 1;
      for (let i = 0; i < 3; i++) dots.append(element('i', undefined, i < filled ? 'is-filled' : ''));
      level.append(dots, element('span', t('levels')[entry.level] ?? entry.level));
      footer.append(duration, level);
      card.append(context, footer);
      grid.append(card);
    }
    byId('catalog-empty').hidden = matches.length > 0;
    byId('catalog-more').hidden = limit >= matches.length;
    renderSelection();
    animateRefresh(grid);
  }

  function render() {
    gestures?.close();
    const collections = listCollections();
    if (collectionId && !collections.some(entry => entry.id === collectionId)) collectionId = '';
    const picker = byId('collection-select');
    picker.replaceChildren(new Option(t('wholeCatalogue'), ''), ...collections.map(entry => new Option(entry.name, entry.id)));
    picker.value = collectionId;
    byId('collection-actions').hidden = !collectionId;
    byId('collection-help').textContent = t(collectionId ? 'collectionGestureHelp' : 'catalogGestureHelp');
    renderFilters();
    const values = Object.fromEntries(new FormData(byId('filters')));
    const terms = normalise(byId('search').value).trim().split(/\s+/u).filter(Boolean);
    matches = sourceEntries().filter(entry => {
      return fields.every(field => field === 'duration' ? matchesDuration(entry, values[field]) : !values[field] || values[field] === entry[field])
        && (!values['content-language'] || entry.language === values['content-language'])
        && terms.every(term => searchIndex.get(entry.id).includes(term));
    });
    const scope = currentCollection();
    byId('catalog-count').textContent = `${t('catalogCount')(matches.length)}${scope ? ` · ${scope.name}` : ''}`;
    renderCards();
  }

  function refresh() {
    limit = 12;
    render();
    byId('catalog-view').querySelector('.catalog-results-scroll').scrollTop = 0;
  }

  function startSelection(target = '') {
    gestures?.close();
    addingTo = target;
    if (target) {
      setCollection('');
      addingTo = target;
    }
    selecting = true;
    selectionSource = collectionId;
    selectedIds.clear();
    refresh();
  }

  function updateDestination() {
    const append = Boolean(byId('collection-target').value);
    byId('collection-name-row').hidden = append;
    byId('collection-name').disabled = append;
    byId('collection-submit').textContent = t(append ? 'addSelection' : 'saveCollection');
  }

  function saveSelection() {
    const targets = listCollections().filter(entry => entry.id !== selectionSource);
    byId('collection-target').replaceChildren(new Option(t('newCollection'), ''), ...targets.map(entry => new Option(entry.name, entry.id)));
    byId('collection-target').value = addingTo;
    byId('collection-target-row').hidden = targets.length === 0;
    byId('collection-name').value = '';
    byId('collection-error').textContent = '';
    updateDestination();
    openDialog(dialog);
    byId(addingTo ? 'collection-submit' : 'collection-name').focus();
  }

  function updatePicker() {
    const picker = byId('collection-select');
    picker.replaceChildren(new Option(t('wholeCatalogue'), ''), ...listCollections().map(entry => new Option(entry.name, entry.id)));
    picker.value = collectionId;
  }

  function focusCard(id) {
    [...grid.children].find(card => card.dataset.id === id)?.focus({ preventScroll: true });
  }

  function commit(change, focusId, message) {
    const scrollTop = scroller.scrollTop;
    try {
      change();
      render();
      byId('catalog-status').textContent = '';
      byId('catalog-card-status').textContent = message;
      onCollectionsChange();
    } catch (error) {
      // Sortable has already moved the DOM; rebuild from the saved order on failure.
      render();
      byId('catalog-status').textContent = errorMessage(error);
    }
    scroller.scrollTop = scrollTop;
    focusCard(focusId);
  }

  function afterReading(id, movingId) {
    const ids = currentCollection()?.readingIds ?? [];
    return ids.slice(ids.indexOf(id) + 1).find(next => next !== movingId);
  }

  function moveReading(id, beforeId) {
    if (!beforeId) {
      // The last visible card can precede filtered or not-yet-loaded entries.
      const previous = [...grid.children].findLast(card => card.dataset.id !== id);
      beforeId = afterReading(previous?.dataset.id, id);
    }
    commit(() => moveCollectionReading(collectionId, id, beforeId), id, t('collectionReordered'));
  }

  gestures = mountCatalogGestures({
    root: document, grid, scroller, t,
    getState: () => ({ collectionId, selecting }),
    getCollections: () => listCollections(),
    onMove: moveReading,
    onStep(id, step) {
      const visible = matches.slice(0, limit);
      const position = visible.findIndex(entry => entry.id === id);
      const neighbour = visible[position + step];
      if (!neighbour) return;
      const beforeId = step < 0 ? neighbour.id : afterReading(neighbour.id, id);
      commit(() => moveCollectionReading(collectionId, id, beforeId), id, t('collectionReordered'));
    },
    onAdd(id, target, name) {
      try {
        const entry = index.get(id);
        const collection = saveCollectionEntries(name, [entry], { [id]: snapshot(entry, collectionId) }, target);
        // Keep the menu's anchor alive while adding to more than one collection.
        updatePicker();
        onCollectionsChange();
        return { ok: true, message: t('activityAdded')(collection.name) };
      } catch (error) { return { ok: false, message: errorMessage(error) }; }
    },
    onRemove(id) {
      const position = matches.findIndex(entry => entry.id === id);
      const next = matches[position + 1] ?? matches[position - 1];
      commit(() => removeCollectionReading(collectionId, id), next?.id, t('activityRemoved'));
    },
  });

  grid.addEventListener('click', event => {
    const button = event.target.closest('[data-open-activity]');
    if (!button) return;
    const id = button.dataset.id;
    if (selecting) {
      if (selectedIds.has(id)) selectedIds.delete(id);
      else selectedIds.add(id);
      renderSelection();
    } else onOpen(index.get(id), collectionId);
  });
  byId('filters').addEventListener('change', refresh);
  byId('filters').addEventListener('reset', event => {
    event.preventDefault();
    for (const select of byId('filters').querySelectorAll('select')) select.value = '';
    byId('search').value = '';
    refresh();
  });
  byId('search').addEventListener('input', refresh);
  byId('catalog-more').addEventListener('click', () => { gestures.close(); limit += 12; renderCards(); });
  byId('collection-select').addEventListener('change', event => setCollection(event.target.value));
  byId('collection-save').addEventListener('click', () => startSelection());
  byId('collection-add').addEventListener('click', () => startSelection(collectionId));
  byId('selection-all').addEventListener('click', () => { for (const entry of matches) selectedIds.add(entry.id); renderSelection(); });
  byId('selection-cancel').addEventListener('click', () => { selecting = false; selectedIds.clear(); addingTo = ''; render(); });
  byId('selection-save').addEventListener('click', saveSelection);
  byId('collection-target').addEventListener('change', updateDestination);
  byId('collection-form').addEventListener('submit', event => {
    event.preventDefault();
    try {
      const readings = sourceEntries().filter(entry => selectedIds.has(entry.id));
      const layouts = Object.fromEntries(readings.map(entry => [entry.id, snapshot(entry, selectionSource)]));
      const collection = saveCollectionEntries(byId('collection-name').value, readings, layouts, byId('collection-target').value);
      setCollection(collection.id);
      closeDialog(dialog, () => byId('collection-add').focus({ preventScroll: true }));
      onCollectionsChange();
    } catch (error) { byId('collection-error').textContent = errorMessage(error); }
  });
  byId('collection-rename-toggle').addEventListener('click', event => {
    const button = event.currentTarget;
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    byId('collection-rename-name').value = currentCollection()?.name ?? '';
    setDisclosure(byId('collection-rename'), open);
    if (open) byId('collection-rename-name').focus({ preventScroll: true });
  });
  byId('collection-rename').addEventListener('submit', event => {
    event.preventDefault();
    commit(() => renameCollection(collectionId, byId('collection-rename-name').value), undefined, t('collectionRenamed'));
    if (!byId('catalog-status').textContent) {
      setDisclosure(byId('collection-rename'), false);
      byId('collection-rename-toggle').setAttribute('aria-expanded', 'false');
      byId('collection-rename-toggle').focus({ preventScroll: true });
    }
  });
  byId('collection-delete').addEventListener('click', () => {
    const entry = currentCollection();
    if (!entry || !confirm(t('collectionDeleteConfirm')(entry.name))) return;
    try { removeCollection(collectionId); setCollection(''); onCollectionsChange(); }
    catch (error) { byId('catalog-status').textContent = errorMessage(error); }
  });
  window.addEventListener('storage', event => {
    if (event.key === collectionsKey || event.key === null) {
      render();
      onCollectionsChange();
    }
  });

  return { render, entries: () => matches, collectionId: () => collectionId, setCollection };
}
