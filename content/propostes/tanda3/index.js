import { ferran } from './ferran.js';
import { mercat } from './mercat.js';
import { nora } from './nora.js';

export const thirdBatchActivities = [...ferran, ...mercat, ...nora];
export const thirdBatchSources = Object.fromEntries([
  ...ferran.map(entry => [entry.code, 'content/propostes/tanda3/ferran.js']),
  ...mercat.map(entry => [entry.code, 'content/propostes/tanda3/mercat.js']),
  ...nora.map(entry => [entry.code, 'content/propostes/tanda3/nora.js']),
]);
