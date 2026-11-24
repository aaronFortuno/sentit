import { handsOnActivities } from './mans-a-lobra.js';
import { walkingActivities } from './a-peu-de-cami.js';

export { handsOnActivities, walkingActivities };
export const newUniverseActivities = [...handsOnActivities, ...walkingActivities];
export const newUniverseSources = Object.fromEntries([
  ...handsOnActivities.map(entry => [entry.code, 'content/propostes/universos/mans-a-lobra.js']),
  ...walkingActivities.map(entry => [entry.code, 'content/propostes/universos/a-peu-de-cami.js']),
]);
