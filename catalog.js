import { collectionsKey, listCollections, saveCollectionEntries, renameCollection, removeCollection, moveCollectionReading, removeCollectionReading } from './collections.js';

const normalise = value => value.toLocaleLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
const activeKey = 'sentit.collection.active.v1';

export function mountCatalog({ activities, t, locale, icon, snapshot, onOpen, onCollectionsChange }) {
  const byId = id => document.getElementById(id);
  const index = new Map(activities.map(entry => [entry.id, entry]));
  const searchIndex = new Map(activities.map(entry => [entry.id, normalise(`${entry.code} ${entry.title} ${entry.summary ?? ''}`)]));
  const fields = ['grade', 'level', 'duration', 'genre'];
  let collectionId = '';
  try { collectionId = localStorage.getItem(activeKey) ?? ''; } catch { /* Start with the full catalogue. */ }
  let selecting = false;
  let selectedIds = new Set();
  let selectionSource = '';
  let addingTo = '';
  let libraryId = '';
  let draggedId;
  let matches = [];
  let limit = 12;
  const grid = byId('activity-grid');
  const dialog = byId('collection-dialog');
  const library = byId('collection-library');

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
    collectionId = id;
    try { localStorage.setItem(activeKey, id); } catch { /* Retain this selection for this visit. */ }
    selecting = false;
    selectedIds.clear();
    addingTo = '';
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
    byId('catalog-selection').hidden = !selecting;
    byId('selection-count').textContent = t('selectionCount')(selectedIds.size);
    byId('selection-save').disabled = selectedIds.size === 0;
    byId('collection-save').setAttribute('aria-pressed', String(selecting));
    for (const input of grid.querySelectorAll('[data-select-activity]')) {
      input.checked = selectedIds.has(input.dataset.selectActivity);
      input.closest('.activity-card').classList.toggle('is-selected', input.checked);
    }
  }

  function renderCards() {
    grid.replaceChildren();
    for (const entry of matches.slice(0, limit)) {
      const card = element(selecting ? 'label' : 'button', undefined, 'activity-card');
      if (selecting) {
        const select = element('input');
        select.type = 'checkbox';
        select.dataset.selectActivity = entry.id;
        select.setAttribute('aria-label', t('selectActivity')(entry.title));
        card.append(select);
      } else {
        card.type = 'button';
        card.dataset.openActivity = entry.id;
      }
      const code = element('span', `${entry.code} · ${languageName(entry.language)}`, 'activity-card-code');
      const title = element('h2', entry.title);
      title.lang = entry.language;
      card.append(code, title);
      if (entry.summary) {
        const summary = element('p', entry.summary, 'activity-card-summary');
        summary.lang = entry.language;
        card.append(summary);
      }
      card.append(element('p', `${t('grades')[entry.grade] ?? entry.grade} · ${t('levels')[entry.level] ?? entry.level}`, 'meta'));
      const duration = entry.fragment?.seconds ?? entry.seconds;
      const time = `${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}`;
      card.append(element('span', `${t('genres')[entry.genre] ?? entry.genre} · ${time}${entry.sample ? ` · ${t('sample')}` : ''}`, 'activity-card-bottom'));
      grid.append(card);
    }
    byId('catalog-empty').hidden = matches.length > 0;
    byId('catalog-more').hidden = limit >= matches.length;
    renderSelection();
  }

  function render() {
    const collections = listCollections();
    if (collectionId && !collections.some(entry => entry.id === collectionId)) collectionId = '';
    const picker = byId('collection-select');
    picker.replaceChildren(new Option(t('wholeCatalogue'), ''), ...collections.map(entry => new Option(entry.name, entry.id)));
    picker.value = collectionId;
    byId('collection-manage').disabled = !collectionId;
    renderFilters();
    const values = Object.fromEntries(new FormData(byId('filters')));
    const terms = normalise(byId('search').value).trim().split(/\s+/u).filter(Boolean);
    matches = sourceEntries().filter(entry => {
      const seconds = entry.fragment?.seconds ?? entry.seconds;
      const bucket = seconds <= 60 ? 'short' : seconds <= 120 ? 'medium' : 'long';
      return fields.every(field => !values[field] || values[field] === (field === 'duration' ? bucket : entry[field]))
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
    addingTo = target;
    if (target) collectionId = '';
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
    dialog.showModal();
    byId(addingTo ? 'collection-submit' : 'collection-name').focus();
  }

  function actionButton(action, label, symbol, disabled = false) {
    const button = element('button', undefined, 'icon-button');
    button.type = 'button';
    button.dataset.action = action;
    button.disabled = disabled;
    button.setAttribute('aria-label', label);
    button.title = label;
    icon(button, symbol);
    return button;
  }

  function renderLibrary(focusId, action) {
    const collection = listCollections().find(entry => entry.id === libraryId);
    byId('collection-library-title').textContent = collection?.name ?? t('collections');
    byId('collection-rename-name').value = collection?.name ?? '';
    const ids = collection?.readingIds ?? [];
    byId('collection-library-empty').hidden = ids.length > 0;
    const list = byId('collection-library-list');
    list.replaceChildren();
    ids.forEach((id, position) => {
      const entry = index.get(id);
      const name = entry?.title ?? id;
      const row = element('li');
      row.dataset.id = id;
      const drag = actionButton('drag', t('dragActivity')(name), 'grip');
      drag.draggable = true;
      drag.classList.add('collection-drag');
      const copy = element('div', undefined, 'collection-library-copy');
      copy.append(element('small', entry ? `${entry.code} · ${languageName(entry.language)}` : t('unavailableActivity')), element('span', name));
      if (entry) copy.lang = entry.language;
      const actions = element('div', undefined, 'collection-row-actions');
      const edit = element('button', t('edit'), 'button');
      edit.type = 'button';
      edit.dataset.action = 'edit';
      edit.disabled = !entry;
      actions.append(edit, actionButton('up', t('moveUp')(name), 'arrow-up', position === 0),
        actionButton('down', t('moveDown')(name), 'arrow-down', position === ids.length - 1),
        actionButton('remove', t('removeFromCollection')(name), 'close'));
      row.append(drag, copy, actions);
      list.append(row);
    });
    if (focusId) {
      const row = [...list.children].find(row => row.dataset.id === focusId);
      const focus = row?.querySelector(`[data-action="${action}"]:not(:disabled)`) ?? row?.querySelector('button:not(:disabled)');
      focus?.focus({ preventScroll: true });
    }
  }

  function manage() {
    if (!currentCollection()) return;
    libraryId = collectionId;
    byId('collection-library-status').textContent = '';
    renderLibrary();
    library.showModal();
    byId('collection-library-title').focus();
  }

  function commit(change, focusId, action) {
    try {
      change();
      byId('collection-library-status').textContent = '';
      render();
      renderLibrary(focusId, action);
    } catch (error) { byId('collection-library-status').textContent = errorMessage(error); }
  }

  grid.addEventListener('click', event => {
    const button = event.target.closest('[data-open-activity]');
    if (button) onOpen(index.get(button.dataset.openActivity), collectionId);
  });
  grid.addEventListener('change', event => {
    const input = event.target.closest('[data-select-activity]');
    if (!input) return;
    if (input.checked) selectedIds.add(input.dataset.selectActivity);
    else selectedIds.delete(input.dataset.selectActivity);
    renderSelection();
  });
  byId('filters').addEventListener('change', refresh);
  byId('filters').addEventListener('reset', event => {
    event.preventDefault();
    for (const select of byId('filters').querySelectorAll('select')) select.value = '';
    byId('search').value = '';
    refresh();
  });
  byId('search').addEventListener('input', refresh);
  byId('catalog-more').addEventListener('click', () => { limit += 12; renderCards(); });
  byId('collection-select').addEventListener('change', event => setCollection(event.target.value));
  byId('collection-save').addEventListener('click', () => {
    if (selecting) { selecting = false; selectedIds.clear(); render(); }
    else startSelection();
  });
  byId('selection-all').addEventListener('click', () => { for (const entry of matches) selectedIds.add(entry.id); renderSelection(); });
  byId('selection-cancel').addEventListener('click', () => { selecting = false; selectedIds.clear(); render(); });
  byId('selection-save').addEventListener('click', saveSelection);
  byId('collection-target').addEventListener('change', updateDestination);
  byId('collection-form').addEventListener('submit', event => {
    event.preventDefault();
    try {
      const readings = sourceEntries().filter(entry => selectedIds.has(entry.id));
      const layouts = Object.fromEntries(readings.map(entry => [entry.id, snapshot(entry, selectionSource)]));
      const collection = saveCollectionEntries(byId('collection-name').value, readings, layouts, byId('collection-target').value);
      dialog.close();
      setCollection(collection.id);
    } catch (error) { byId('collection-error').textContent = errorMessage(error); }
  });
  byId('collection-manage').addEventListener('click', manage);
  byId('collection-rename').addEventListener('submit', event => {
    event.preventDefault();
    commit(() => renameCollection(libraryId, byId('collection-rename-name').value));
  });
  byId('collection-library-add').addEventListener('click', () => { library.close(); startSelection(libraryId); });
  byId('collection-library-delete').addEventListener('click', () => {
    const entry = listCollections().find(item => item.id === libraryId);
    if (!entry || !confirm(t('collectionDeleteConfirm')(entry.name))) return;
    try { removeCollection(libraryId); library.close(); setCollection(''); }
    catch (error) { byId('collection-library-status').textContent = errorMessage(error); }
  });
  byId('collection-library-list').addEventListener('click', event => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const id = button.closest('li').dataset.id;
    const collection = listCollections().find(entry => entry.id === libraryId);
    const position = collection?.readingIds.indexOf(id) ?? -1;
    if (position < 0) return;
    const action = button.dataset.action;
    if (action === 'edit') { library.close(); onOpen(index.get(id), libraryId); }
    if (action === 'up' && position > 0) commit(() => moveCollectionReading(libraryId, id, collection.readingIds[position - 1]), id, action);
    if (action === 'down' && position < collection.readingIds.length - 1) commit(() => moveCollectionReading(libraryId, id, collection.readingIds[position + 2]), id, action);
    if (action === 'remove') commit(() => removeCollectionReading(libraryId, id));
  });
  const list = byId('collection-library-list');
  function clearDrag() { draggedId = undefined; for (const row of list.children) delete row.dataset.drop; }
  list.addEventListener('dragstart', event => {
    const handle = event.target.closest('.collection-drag');
    if (!handle) return;
    draggedId = handle.closest('li').dataset.id;
    event.dataTransfer.setData('text/plain', draggedId);
    event.dataTransfer.effectAllowed = 'move';
  });
  list.addEventListener('dragover', event => {
    const row = event.target.closest('li');
    if (!draggedId || !row) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    for (const item of list.children) delete item.dataset.drop;
    const box = row.getBoundingClientRect();
    row.dataset.drop = event.clientY < box.top + box.height / 2 ? 'before' : 'after';
  });
  list.addEventListener('drop', event => {
    const row = event.target.closest('li');
    if (!draggedId || !row) return;
    event.preventDefault();
    const id = draggedId;
    const beforeId = row.dataset.drop === 'after' ? row.nextElementSibling?.dataset.id : row.dataset.id;
    clearDrag();
    commit(() => moveCollectionReading(libraryId, id, beforeId), id, 'drag');
  });
  list.addEventListener('dragend', clearDrag);
  for (const panel of [dialog, library]) panel.addEventListener('click', event => { if (event.target === panel) panel.close(); });
  window.addEventListener('storage', event => {
    if (event.key === collectionsKey || event.key === null) {
      render();
      if (library.open) renderLibrary();
      onCollectionsChange();
    }
  });

  return { render, entries: () => matches, collectionId: () => collectionId, setCollection };
}
