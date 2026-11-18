export const collectionsKey = 'sentit.collections.v1';
const object = value => value && typeof value === 'object' && !Array.isArray(value);
const validId = value => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);

function validCollection(entry) {
  return object(entry) && validId(entry.id) && typeof entry.name === 'string'
    && entry.name.trim().length > 0 && entry.name.length <= 60
    && Array.isArray(entry.readingIds) && entry.readingIds.every(validId)
    && new Set(entry.readingIds).size === entry.readingIds.length;
}

export function listCollections(storage = localStorage) {
  try {
    const entries = JSON.parse(storage.getItem(collectionsKey));
    return Array.isArray(entries) ? entries.filter(validCollection) : [];
  } catch { return []; }
}

function writeCollections(entries, storage) {
  storage.setItem(collectionsKey, JSON.stringify(entries));
}

function editCollection(id, change, storage) {
  const entries = listCollections(storage);
  const current = entries.find(entry => entry.id === id);
  if (!current) throw new Error('collectionMissing');
  const entry = change(current, entries);
  writeCollections(entries.map(item => item.id === id ? entry : item), storage);
  return entry;
}

function collectionName(name, entries, except) {
  const trimmed = name.trim();
  if (!trimmed || trimmed.length > 60) throw new Error('collectionNameError');
  if (entries.some(entry => entry.id !== except && entry.name.localeCompare(trimmed, undefined, { sensitivity: 'base' }) === 0)) {
    throw new Error('collectionDuplicate');
  }
  return trimmed;
}

export function saveCollectionEntries(name, readings, layouts, targetId = '', storage = localStorage) {
  const entries = listCollections(storage);
  const target = entries.find(entry => entry.id === targetId);
  if (targetId && !target) throw new Error('collectionMissing');
  const ids = [...new Set(readings.map(entry => entry.id))];
  if (!ids.length || !ids.every(validId)) throw new Error('collectionSelectionError');
  const entry = target ? structuredClone(target) : {
    id: crypto.randomUUID(), name: collectionName(name, entries), readingIds: [], layouts: {},
  };
  entry.layouts ??= {};
  for (const id of ids) {
    if (!entry.readingIds.includes(id)) entry.readingIds.push(id);
    if (!Object.hasOwn(entry.layouts, id) && layouts[id]) entry.layouts[id] = structuredClone(layouts[id]);
  }
  writeCollections(target ? entries.map(item => item.id === targetId ? entry : item) : [...entries, entry], storage);
  return entry;
}

export function renameCollection(id, name, storage = localStorage) {
  return editCollection(id, (entry, entries) => ({ ...entry, name: collectionName(name, entries, id) }), storage);
}

export function removeCollection(id, storage = localStorage) {
  writeCollections(listCollections(storage).filter(entry => entry.id !== id), storage);
}

export function moveCollectionReading(id, readingId, beforeId, storage = localStorage) {
  return editCollection(id, entry => {
    if (!entry.readingIds.includes(readingId) || readingId === beforeId) return entry;
    const readingIds = entry.readingIds.filter(item => item !== readingId);
    const position = beforeId ? readingIds.indexOf(beforeId) : readingIds.length;
    if (position < 0) throw new Error('collectionChanged');
    readingIds.splice(position, 0, readingId);
    return { ...entry, readingIds };
  }, storage);
}

export function removeCollectionReading(id, readingId, storage = localStorage) {
  // Keep its layout so adding the activity again restores the teacher's choices.
  return editCollection(id, entry => ({ ...entry, readingIds: entry.readingIds.filter(item => item !== readingId) }), storage);
}

export function saveCollectionLayout(id, readingId, layout, storage = localStorage) {
  return editCollection(id, entry => {
    if (!entry.readingIds.includes(readingId)) throw new Error('collectionChanged');
    return { ...entry, layouts: { ...entry.layouts, [readingId]: structuredClone(layout) } };
  }, storage);
}
