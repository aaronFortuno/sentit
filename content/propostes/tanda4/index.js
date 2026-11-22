import { noticies } from './noticies.js';
import { troballes } from './troballes.js';
import { aula } from './aula.js';
import { records } from './records.js';
import { cuina } from './cuina.js';
import { taller } from './taller.js';

// Editorial blocks for teacher validation; never synthesis authorizations.
export const fourthBatchGroups = [
  { id: 'mar', title: 'Les notícies de la Mar', cast: 'Mar · Erinome', voices: { Mar: 'Erinome' }, source: 'noticies', entries: noticies },
  { id: 'laia-biel', title: 'Les troballes de la Laia i en Biel', cast: 'Laia i Biel · Leda + Puck', voices: { Laia: 'Leda', Biel: 'Puck' }, source: 'troballes', entries: troballes },
  { id: 'mireia-biel', title: 'A classe amb la Mireia · amb en Biel', cast: 'Mireia i Biel · Aoede + Puck', voices: { Mireia: 'Aoede', Biel: 'Puck' }, source: 'aula', entries: aula },
  { id: 'ferran', title: 'Els records de l’avi Ferran', cast: 'Ferran · Algenib', voices: { Ferran: 'Algenib' }, source: 'records', entries: records },
  { id: 'laia-ona', title: 'Converses de cuina · Laia i Ona', cast: 'Laia i Ona · Leda + Sulafat', voices: { Laia: 'Leda', Ona: 'Sulafat' }, source: 'cuina', entries: cuina },
  { id: 'biel-elies', title: 'Converses al taller · Biel i Elies', cast: 'Biel i Elies · Puck + Algieba', voices: { Biel: 'Puck', Elies: 'Algieba' }, source: 'taller', entries: taller },
];
export const fourthBatchActivities = fourthBatchGroups.flatMap(group => group.entries);
export const fourthBatchSources = Object.fromEntries(fourthBatchGroups.flatMap(group => group.entries.map(entry => [entry.code, 'content/propostes/tanda4/' + group.source + '.js'])));
