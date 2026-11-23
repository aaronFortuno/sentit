import { dailyMar } from './mar.js';
import { dailyFerran } from './ferran.js';
import { dailyLaiaBiel } from './laia-biel.js';
import { dailyMarServices } from './mar-serveis.js';
import { dailyFerranErrands } from './ferran-gestions.js';
import { dailyMarEnquiries } from './mar-consultes.js';
import { dailyLaiaOnaErrands } from './laia-ona-gestions.js';
export const dailyActivities = [...dailyMar, ...dailyFerran, ...dailyLaiaBiel, ...dailyMarServices, ...dailyFerranErrands, ...dailyMarEnquiries, ...dailyLaiaOnaErrands];
export const dailySources = Object.fromEntries([
  ...dailyMar.map(entry => [entry.code, 'content/propostes/quotidianes/mar.js']),
  ...dailyFerran.map(entry => [entry.code, 'content/propostes/quotidianes/ferran.js']),
  ...dailyLaiaBiel.map(entry => [entry.code, 'content/propostes/quotidianes/laia-biel.js']),
  ...dailyMarServices.map(entry => [entry.code, 'content/propostes/quotidianes/mar-serveis.js']),
  ...dailyFerranErrands.map(entry => [entry.code, 'content/propostes/quotidianes/ferran-gestions.js']),
  ...dailyMarEnquiries.map(entry => [entry.code, 'content/propostes/quotidianes/mar-consultes.js']),
  ...dailyLaiaOnaErrands.map(entry => [entry.code, 'content/propostes/quotidianes/laia-ona-gestions.js']),
]);
