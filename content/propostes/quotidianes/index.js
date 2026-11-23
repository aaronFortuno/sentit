import { dailyMar } from './mar.js';
export const dailyActivities = [...dailyMar];
export const dailySources = Object.fromEntries(dailyMar.map(entry => [entry.code, 'content/propostes/quotidianes/mar.js']));
