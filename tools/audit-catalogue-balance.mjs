// Local catalogue audit: the same facets as the web, no approvals or synthesis.
import { writeFile } from 'node:fs/promises';
import { activities } from '../catalogue.js';
import { matchesCatalogFacet } from '../catalog-filters.js';
import { durationBounds } from '../activity-meta.js';
import { universes, universeName } from '../content/universes.js';
import { needsReview } from '../review.js';
import { isPublished } from './production-documents.mjs';

const date = process.argv.find(arg => arg.startsWith('--date='))?.slice(7);
if (!/^\d{4}-\d{2}-\d{2}$/u.test(date ?? '') || new Date(date).toISOString().slice(0, 10) !== date) {
  throw Error('Cal indicar --date=AAAA-MM-DD per datar la instantània.');
}
const axes = {
  grade: [['1','1r'],['2','2n'],['3','3r'],['4','4t'],['5','5è'],['6','6è'],['eso1','1r d’ESO']],
  level: [['easy','Accessible'],['middle','Intermèdia'],['advanced','Avançada']],
  duration: [['short','Fins a 1 min'],['medium','Més d’1 i fins a 2 min'],['long','Més de 2 min']],
  genre: [['dialogue','Diàleg'],['story','Narració'],['news','Notícia'],['interview','Entrevista'],['instructions','Instruccions'],['explanation','Explicació']],
  universe: [...universes.map(u => [u.id, universeName(u)]), ['independent','Sense univers']],
};
const published = activities.filter(isPublished), open = activities.filter(a => !isPublished(a));
const publicCatalogue = activities.filter(a => !needsReview(a));
const legacy = publicCatalogue.filter(a => !isPublished(a));
const count = (entries, field, value) => entries.filter(a => matchesCatalogFacet(a, field, value)).length;
const pairs = (entries, x, value, y, other) => entries.filter(a => matchesCatalogFacet(a, x, value) && matchesCatalogFacet(a, y, other)).length;
const row = cells => '| ' + cells.map(x => String(x).replaceAll('|','\\|')).join(' | ') + ' |\n';
const table = (headers, rows) => row(headers) + row(headers.map((_, i) => i ? '---:' : '---')) + rows.map(row).join('');
const pair = (x, value, y, other) => `${pairs(published,x,value,y,other)} / ${pairs(activities,x,value,y,other)}`;
const activeGrades = axes.grade.filter(([value]) => count(activities,'grade',value));
const estimates = activities.filter(a => durationBounds(a)?.estimated);
const overlaps = activities.filter(a => axes.duration.filter(([value]) => matchesCatalogFacet(a,'duration',value)).length > 1);
const variants = activities.filter(a => !/^S\d+$/u.test(a.code));
const languages = [...new Set(activities.map(a => a.language))].map(language =>
  `${({ca:'català',es:'castellà'})[language] ?? language} (${activities.filter(a=>a.language===language).length})`);

let text = `# Equilibri del catàleg · dades\n\nInstantània del **${date.split('-').reverse().join('/')}**. [Prioritats i proposta de tanda](prioritats-cataleg.md).\n\n`;
text += `**${activities.length} entrades**, amb **${published.length} publicacions definitives** i **${open.length} peces obertes**. Les ${variants.length} variants addicionals es compten per separat, com al catàleg. Idiomes del contingut: ${languages.join(', ')}.\n\n`;
text += `El catàleg sense provisionals mostra ${publicCatalogue.length} entrades` + (legacy.length
  ? `: les ${published.length} definitives i els prototips històrics ${legacy.map(a=>a.code).join(', ')}. Aquests prototips encara no tenen el tancament formal de publicació i aquí no es compten com a definitius.\n\n`
  : ', totes amb tancament formal de publicació.\n\n');
for (const [field, title] of [['grade','Curs'],['level','Dificultat'],['duration','Durada del fragment'],['genre','Tipologia textual'],['universe','Univers']]) {
  text += `## ${title}\n\n`;
  text += table([title,'Definitives','Obertes','Total previst'], axes[field].map(([value,label]) => [label,count(published,field,value),count(open,field,value),count(activities,field,value)]));
  if (field === 'grade') text += '\n1r i 2n es mostren per fer visible l’abast encara sense cobrir; no són opcions actives dels filtres actuals.\n';
  if (field === 'duration') text += `\nS’utilitza el mateix predicat que al filtre del web. ${estimates.length} peces encara tenen durada estimada en aquestes metadades. ${overlaps.length} estimacions travessen una frontera i apareixen en dues franges: ${overlaps.map(a=>a.code).join(', ')}. Els totals de les franges no s’han de sumar com si fossin grups exclusius. Les durades de les definitives ja són mesurades.\n\nLa durada correspon al fragment d’una escolta amb el seu muntatge, sense presentació, lectura prèvia, repeticions ni pauses de la sessió. No és una mesura de dificultat.\n`;
  if (field === 'universe') text += '\nUna peça pot pertànyer a més d’un univers; els recomptes d’aquesta taula se solapen.\n';
  text += '\n';
}
for (const [field, title] of [['level','Curs × dificultat'],['genre','Curs × tipologia']]) {
  text += `## ${title}\n\nCada casella indica **definitives / total amb pendents**.\n\n`;
  text += table(['Curs',...axes[field].map(([,label])=>label)], activeGrades.map(([grade,label]) => [label,...axes[field].map(([value])=>pair('grade',grade,field,value))]))+'\n';
}
text += '## Curs × durada · només definitives\n\n';
text += table(['Curs',...axes.duration.map(([,label])=>label)],activeGrades.map(([grade,label])=>[label,...axes.duration.map(([value])=>pairs(published,'grade',grade,'duration',value))]))+'\n';
text += '## Univers × curs\n\nCada casella indica **definitives / total amb pendents**. Les pertinences se solapen.\n\n';
text += table(['Univers',...activeGrades.map(([,label])=>label)],axes.universe.map(([value,label])=>[label,...activeGrades.map(([grade])=>pair('universe',value,'grade',grade))]))+'\n';
text += '## Reproduir el recompte\n\n`node tools/audit-catalogue-balance.mjs --date=AAAA-MM-DD --write`\n\nEl generador llegeix el catàleg, els predicats dels filtres i les publicacions exactes. Només reescriu aquest informe; no canvia etiquetes, validacions, guions ni cues de síntesi. Les prioritats editorials es conserven al document enllaçat a l’inici.\n';
if (process.argv.includes('--write')) {
  await writeFile(new URL('../docs/equilibri-cataleg.md', import.meta.url), text);
  console.log(`Informe actualitzat: ${activities.length} entrades, ${published.length} definitives, ${open.length} obertes.`);
} else process.stdout.write(text);
