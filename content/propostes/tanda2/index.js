// Each group has passed an independent review and a final check of corrections.
import { tercer } from './tercer.js';
import { quart } from './quart.js';
import { cinque } from './cinque.js';
import { sise } from './sise.js';
export const secondBatchActivities = [...tercer, ...quart, ...cinque, ...sise];
export const secondBatchSources = Object.fromEntries([
  ...tercer.map(entry => [entry.code, 'content/propostes/tanda2/tercer.js']),
  ...quart.map(entry => [entry.code, 'content/propostes/tanda2/quart.js']),
  ...cinque.map(entry => [entry.code, 'content/propostes/tanda2/cinque.js']),
  ...sise.map(entry => [entry.code, 'content/propostes/tanda2/sise.js']),
]);
