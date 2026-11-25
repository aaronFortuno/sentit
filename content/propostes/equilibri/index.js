import { balanceNews, balanceNewsChoices, balanceNewsContexts } from './noticies.js';
import { balanceExplanations, balanceExplanationChoices, balanceExplanationContexts } from './explicacions.js';
import { balanceWorkshops, balanceWorkshopChoices, balanceWorkshopContexts } from './taller.js';
export { balanceNews, balanceExplanations, balanceWorkshops, balanceNewsChoices, balanceExplanationChoices, balanceWorkshopChoices };
export const balanceActivities = [...balanceNews,...balanceExplanations,...balanceWorkshops];
export const balanceContexts = { ...balanceNewsContexts,...balanceExplanationContexts,...balanceWorkshopContexts };
export const balanceSources = Object.fromEntries([
  ...balanceNews.map(a=>[a.code,'content/propostes/equilibri/noticies.js']),
  ...balanceExplanations.map(a=>[a.code,'content/propostes/equilibri/explicacions.js']),
  ...balanceWorkshops.map(a=>[a.code,'content/propostes/equilibri/taller.js']),
]);
