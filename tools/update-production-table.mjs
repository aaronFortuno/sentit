import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { activities } from '../catalogue.js';
import { durationBounds } from '../activity-meta.js';
const require=createRequire(import.meta.url),plans=JSON.parse(await readFile(new URL('../content/production-plans.json',import.meta.url),'utf8'));
const {fingerprint}=require('./production-approval.cjs');
const {productionSpec}=require('./proposal-plan.cjs');
const clock=n=>`${Math.floor(n/60)}:${String(Math.round(n%60)).padStart(2,'0')}`;
const date=process.argv.find(arg=>arg.startsWith('--date='))?.slice(7)??new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Berlin'}).format(new Date());
const [year,month,day]=date.split('-');
const specs={S008R:require('./radio-production.cjs').spec,S015:require('./interview-production.cjs').spec,S023:require('./news-production.cjs').spec};
const levels={easy:'Accessible',middle:'Intermèdia',advanced:'Avançada'},genres={dialogue:'Diàleg',story:'Narració',instructions:'Instruccions',interview:'Entrevista',news:'Notícia',explanation:'Explicació'};
let md=`# Seguiment de les comprensions\n\nActualitzat: **${day}/${month}/${year}**. Catàleg base de **24 peces**, més la revisió **S008R**. La publicació al web com a esborrany no equival a publicació definitiva.\n\n**✅ Completat** · **⏳ Proper pas** · **◐ Històric sense validació formal registrada** · **— Encara no toca**\n\n| Codi | Títol | Curs | Dificultat · tipus | Fragment | Preg. | 1. Guió/escaleta | 2. Proposta validada | 3. Veus rebudes | 4. Muntatge fet | 5. Àudio validat | 6. Definitiva |\n| --- | --- | --- | --- | --- | ---: | :---: | :---: | :---: | :---: | :---: | :---: |\n`;
for(const entry of activities){
 const plan=plans[entry.code],spec=entry.production?productionSpec(entry):specs[entry.code];
 const approved=plan?.status==='approved'&&spec&&plan.approvedFingerprint===fingerprint(entry,spec,plan);
 const duration=durationBounds(entry),time=duration.estimated?`Prevista ${clock(duration.min)}–${clock(duration.max)}`:clock(duration.min);
 const review=entry.reviewStatus==='pending',audio=Boolean(entry.audio);
 md+=`| [ca-${entry.code}](https://sentit.ortogra.fi/#lectura=ca-${entry.code}) | ${entry.title} | ${entry.grade}${entry.grade==='3'?'r':entry.grade==='4'?'t':'è'} | ${levels[entry.level]} · ${genres[entry.genre]} | ${time} | ${entry.questions.length} | ✅ | ${approved?'✅':review?'**⏳ Revisar**':'◐'} | ${audio?'✅':'—'} | ${audio?'✅':'—'} | ${audio?(entry.reviewStatus==='audio-review'?'**⏳ Escoltar**':'◐'):'—'} | — |\n`;
}
md+=`\n## Com revisar-les\n\n- **20 propostes esperen validar el guió i l’escaleta**: S003–S007, S009–S014, S016–S024. Es poden revisar per codi, en qualsevol ordre. El solucionari s’obre amb el guió anotat primer i les preguntes i respostes després. Cada proposta preveu una petició, amb títol i fragment junts i un tall local. No s’han enviat a Gemini.\n- **S008, S008R i S015 esperen audició**. El PDF diu «Àudio pendent de validar» i es pot imprimir per revisar. La confirmació del guió no valida automàticament el muntatge.\n- **S001 i S002** són prototips anteriors al registre formal de validacions. No se’ls ha atribuït retrospectivament una aprovació definitiva.\n- **S008R** revisa la mateixa història de S008 com a programa de ràdio, amb benvinguda i comiat; no és una peça número 25 del catàleg base.\n\n## Registres i criteris\n\n- [Dossier de les 19 propostes noves](lot-editorial-24.md): repartiment, continguts, fonts factuals i criteris de correcció. Les il·lustracions noves i els retrats de Joana, Elies i Ona estan pendents; no bloquegen revisar els guions.\n- [Aprovacions i empremtes](../content/production-plans.json). Només una confirmació del docent pot completar les columnes de validació.\n- [Fonts sonores](fonts-sonores.md) · [S008R: manifest](../assets/audio/s008r-production-manifest.json) · [S015: manifest](../assets/audio/s015-production-manifest.json).\n- Consum comprovat d’aquesta tanda: S008R, 1 petició (513 + 2.373 tokens); S015, 1 petició (601 + 3.349). Les propostes noves no han consumit síntesi. Aquest registre no és una lectura de la quota restant.\n\nLa taula es regenera amb \`node tools/update-production-table.mjs --date=AAAA-MM-DD\` després d’actualitzar els continguts o les aprovacions. No marca àudios ni publicacions com a definitivament validats per inferència.\n`;
await writeFile(new URL('../docs/seguiment-produccio.md',import.meta.url),md);
console.log(`${activities.length} files actualitzades sense modificar cap validació.`);
