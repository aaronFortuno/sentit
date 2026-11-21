import { matchesDuration } from './activity-meta.js';
import { matchesCharacters } from './content/characters.js';
import { matchesUniverse } from './content/universes.js';
import { needsReview } from './review.js';
import { productionStage } from './production-stage.js';

export function matchesCatalogFacet(entry, field, value) {
  if (field === 'characters') return matchesCharacters(entry, value);
  if (field === 'duration') return matchesDuration(entry, value);
  if (field === 'universe') return matchesUniverse(entry, value);
  if (field === 'content-language') return !value || entry.language === value;
  return !value || entry[field] === value;
}

// Cards and option counts share the same predicate. A facet's options ignore
// only that facet's current selection; all the other restrictions still apply.
export function matchesCatalogFilters(entry, state, except = '') {
  const { values, selectedCharacters, terms, searchIndex, showProvisional, phaseFilter } = state;
  return needsReview(entry) === showProvisional
    && ['content-language', 'grade', 'level', 'duration', 'genre', 'universe'].every(field =>
      field === except || matchesCatalogFacet(entry, field, values[field]))
    && (except === 'characters' || matchesCharacters(entry, selectedCharacters, values['character-match']))
    && (except === 'phase' || !showProvisional || !phaseFilter || productionStage(entry)?.id === phaseFilter)
    && terms.every(term => searchIndex.get(entry.id).includes(term));
}

export function catalogFacetCounts(entries, state, field, values) {
  const candidates = entries.filter(entry => matchesCatalogFilters(entry, state, field));
  return new Map(values.map(value => [value, candidates.filter(entry =>
    matchesCatalogFacet(entry, field, field === 'characters' ? [value] : value)).length]));
}
