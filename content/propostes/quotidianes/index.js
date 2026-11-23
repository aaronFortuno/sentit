import { dailyMar } from './mar.js';
import { dailyFerran } from './ferran.js';
import { dailyLaiaBiel } from './laia-biel.js';
export const dailyActivities = [...dailyMar, ...dailyFerran, ...dailyLaiaBiel];
export const dailySources = Object.fromEntries([
  ...dailyMar.map(entry => [entry.code, 'content/propostes/quotidianes/mar.js']),
  ...dailyFerran.map(entry => [entry.code, 'content/propostes/quotidianes/ferran.js']),
  ...dailyLaiaBiel.map(entry => [entry.code, 'content/propostes/quotidianes/laia-biel.js']),
]);
