// Local documentation only: no credentials, quota reservations or synthesis calls.
import { readFile, readdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { activities } from '../catalogue.js';
import { durationBounds, gradeLabel } from '../activity-meta.js';
import { editorialReview, isEditoriallyReviewed, hasPendingMontage, hasApprovedScript } from '../editorial-review.js';
import { productionProgress } from '../content/production-progress.js';
import { fourthBatchGroups } from '../content/propostes/tanda4/index.js';

const require = createRequire(import.meta.url);
const { fingerprint } = require('./production-approval.cjs');
const { productionSpec, packedProposalRequests } = require('./proposal-plan.cjs');
const { policy, estimateSynthesis } = require('./audio-batch-policy.cjs');
const { plainSpeechForecast } = require('./synthesis-forecast.cjs');
const json = file => readFile(new URL('../' + file, import.meta.url), 'utf8').then(JSON.parse);
const levels = { easy: 'Accessible', middle: 'Intermèdia', advanced: 'Avançada' };
const genres = { dialogue: 'Diàleg', story: 'Narració', instructions: 'Instruccions', interview: 'Entrevista', news: 'Notícia', explanation: 'Explicació' };
const cell = text => String(text ?? '—').replaceAll('|', '\\|').replace(/\s+/gu, ' ').trim();
const row = values => '| ' + values.map(cell).join(' | ') + ' |\n';
const link = entry => `[${entry.language}-${entry.code}](https://sentit.ortogra.fi/#lectura=${entry.language}-${entry.code})`;
const grade = gradeLabel;
export const clock = seconds => { const n = Math.round(seconds); return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`; };
export const isPublished = entry => entry.reviewStatus === 'validated' && productionProgress[`${entry.language}-${entry.code}`]?.state === 'published' && productionProgress[`${entry.language}-${entry.code}`]?.editorialFingerprint === editorialReview(entry)?.fingerprint;
const progress = entry => productionProgress[`${entry.language}-${entry.code}`];
const list = entries => entries.map(link).join(', ') || 'Cap';

export async function productionDocuments(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(date) || new Date(date).toISOString().slice(0, 10) !== date) throw Error('Invalid report date');
  const displayDate = date.split('-').reverse().join('/');
  const [plans, batchCatalogue, repairs] = await Promise.all([
    json('content/production-plans.json'), json('content/synthesis-batches.json'), json('content/audio-repairs.json'),
  ]);
  const receiptDirectory = new URL('../assets/audio/synthesis-batches/', import.meta.url);
  const receiptFiles = (await readdir(receiptDirectory)).filter(file => /^l\d+\.json$/u.test(file));
  const receipts = await Promise.all(receiptFiles.map(file => readFile(new URL(file, receiptDirectory), 'utf8').then(JSON.parse)));
  receipts.sort((a, b) => a.startedAt.localeCompare(b.startedAt));
  const receivedIds = new Set(receipts.flatMap(receipt => receipt.parts.map(part => part.id)));
  const published = activities.filter(isPublished), pending = activities.filter(entry => !isPublished(entry));
  const correcting = pending.filter(entry => progress(entry)?.state === 'audio-corrections-pending');
  const listening = pending.filter(entry => entry.audio && progress(entry)?.state === 'montage-awaiting-listening');
  const voices = pending.filter(hasApprovedScript), montage = pending.filter(hasPendingMontage);
  const accounted = new Set([...correcting, ...listening, ...voices, ...montage]);
  const other = pending.filter(entry => !accounted.has(entry));
  const duration = entry => { const bounds = durationBounds(entry); return bounds.estimated ? `Prevista ${clock(bounds.min)}–${clock(bounds.max)}` : clock(bounds.min); };
  const header = `Actualitzat: **${displayDate}**.`;
  const refresh = 'Regeneració local: `node tools/update-production-table.mjs --date=AAAA-MM-DD`. Llegeix catàleg, aprovacions, incidències i rebuts; no envia peticions ni modifica validacions.';

  let tracking = `# Seguiment de les comprensions\n\n${header} **${pending.length} pendents** de ${activities.length} comprensions orals; **${published.length} finalitzades** al [registre de publicacions](publicades.md). Les variants es compten per separat.\n\nLa taula conté només feina oberta. Una peça en surt quan té publicació definitiva registrada per al contingut exacte. Les noves propostes s’hi incorporen automàticament; quan no quedi feina, la taula quedarà buida.\n\n## Proper pas\n\n| Feina | Peces | Codis |\n| --- | ---: | --- |\n`;
  tracking += row(['Escoltar el muntatge', listening.length, list(listening)]);
  tracking += row(['Resoldre esmenes de veu i tornar a escoltar', correcting.length, list(correcting)]);
  tracking += row(['Produir les veus, amb guió validat', voices.length, list(voices)]);
  tracking += row(['Muntar les veus rebudes', montage.length, list(montage)]);
  tracking += row(['Revisió editorial o validació inicial pendent', other.length, list(other)]);
  tracking += '\n## Taula de pendents\n\n**✅ Completat** · **⏳ Proper pas** · **◐ Parcial o històric sense validació completa registrada** · **— Encara no toca**\n\n| Codi | Títol | Curs | Dificultat · tipologia | Fragment | Preg. | 1. Guió/escaleta | 2. Revisió adversària | 3. Proposta validada | 4. Veus rebudes | 5. Muntatge fet | 6. Àudio validat | 7. Definitiva |\n| --- | --- | --- | --- | --- | ---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n';
  const specialSpecs = { S008R: require('./radio-production.cjs').spec, S015: require('./interview-production.cjs').spec, S023: require('./news-production.cjs').spec };
  const teacherApproved = entry => {
    if (isPublished(entry)) return true;
    const plan = plans[entry.code], spec = entry.production ? productionSpec(entry) : specialSpecs[entry.code];
    return plan?.status === 'approved' && Boolean(spec) && plan.approvedFingerprint === fingerprint(entry, spec, plan);
  };
  for (const entry of pending) {
    const plan = plans[entry.code], spec = entry.production ? productionSpec(entry) : specialSpecs[entry.code];
    const approved = plan?.status === 'approved' && spec && plan.approvedFingerprint === fingerprint(entry, spec, plan);
    const reviewing = entry.reviewStatus === 'pending', audio = Boolean(entry.audio), received = audio || hasPendingMontage(entry) || (progress(entry)?.receivedTakes?.total>0&&progress(entry).receivedTakes.received.length===progress(entry).receivedTakes.total);
    tracking += row([link(entry), entry.title, grade(entry), `${levels[entry.level]} · ${genres[entry.genre]}`, duration(entry), entry.questions.length,
      '✅', isEditoriallyReviewed(entry) ? '✅' : reviewing ? '**⏳ Revisar**' : '◐',
      approved ? (plan.approvedScope === 'voices-only' ? '✅ Veus' : '✅') : plan?.contentValidation ? '◐ Contingut · **⏳ Guió**' : reviewing ? '**⏳ Revisar**' : '◐',
      received ? '✅' : hasApprovedScript(entry) ? '**⏳ Síntesi**' : '—',
      audio ? '✅' : received ? '**⏳ Muntar**' : '—',
      audio ? progress(entry)?.state === 'audio-corrections-pending' ? '◐ **Correccions**' : entry.reviewStatus === 'audio-review' ? '**⏳ Escoltar**' : '◐' : '—', '—']);
  }
  if (!pending.length) tracking += '\nNo queda cap comprensió pendent.\n';
  tracking += '\n## Esmenes obertes\n\n| Codi | Estat de la revisió docent |\n| --- | --- |\n';
  for (const entry of correcting) tracking += row([link(entry), progress(entry).teacherAssessment ?? progress(entry).confirmation ?? 'Incidència pendent']);
  if (!correcting.length) tracking += '\nCap esmena oberta.\n';
  tracking += '\nLes proves rebudes encara poden estar pendents d’audició i aplicació. Consulteu [la cua de síntesi i les comparacions](lots-sintesi.md). Rebre una presa no resol automàticament una incidència.\n\n## Criteris i registres\n\n- S001 i S002 són prototips anteriors al registre formal; continuen oberts, sense atribuir-los retrospectivament una aprovació.\n- Una síntesi rebuda, un muntatge fet i una audició validada són passos diferents. Només el docent confirma les validacions.\n- **Provisional** implica revisió adversària independent superada per al contingut exacte. Abans és un esborrany en revisió.\n- [Publicacions finalitzades](publicades.md) · [Cua de síntesi](lots-sintesi.md) · [Històric de síntesi](historic-sintesi.md).\n- [Aprovacions i empremtes](../content/production-plans.json) · [Incidències i estat de producció](../content/production-progress.js) · [Revisió independent](revisio-coherencia.md) · [Tancament dels materials](tancament-publicacio.md) · [Fonts sonores](fonts-sonores.md).\n\n' + refresh + '\n';
  const grading = pending.filter(entry => progress(entry)?.gradingReview?.status === 'pending-listening');
  if (grading.length) {
    let notes = '\n## Curs i dificultat pendents de valorar després de l’audició\n\n| Peça | Curs actual | Dificultat actual | Possible curs | Nota del docent |\n| --- | --- | --- | --- | --- |\n';
    for (const entry of grading) notes += row([link(entry), grade(entry), levels[entry.level], progress(entry).gradingReview.candidateGradeLabel ?? (progress(entry).gradingReview.candidateGrade ? grade({grade:progress(entry).gradingReview.candidateGrade}) : 'Per decidir'), progress(entry).gradingReview.note]);
    tracking = tracking.replace('\n## Criteris i registres\n', notes + '\n## Criteris i registres\n');
  }

  let finished = `# Comprensions finalitzades\n\n${header} **${published.length} publicacions definitives**. Aquest registre conserva les peces que han sortit de la [taula de pendents](seguiment-produccio.md). Les variants es validen per separat.\n\n| Codi | Títol | Curs | Dificultat · tipologia | Fragment | Validació definitiva |\n| --- | --- | --- | --- | --- | --- |\n`;
  for (const entry of published) finished += row([link(entry), entry.title, grade(entry), `${levels[entry.level]} · ${genres[entry.genre]}`, duration(entry), progress(entry).validatedAt]);
  finished += '\nLes aprovacions estan vinculades al guió i al màster exactes al [registre de producció](../content/production-progress.js). No es concedeix cap aprovació per regenerar aquest document.\n\n' + refresh + '\n';

  let synthesis = `# Cua de síntesi\n\n${header} Aquest document mostra només la feina pendent d’enviar o de revisar. Els lots ja rebuts consten a l’[històric de síntesi](historic-sintesi.md); no s’han de tornar a enviar.\n\n## Lots pendents\n\n| Lot | Material pendent | Veus | Previsió orientativa | Què falta |\n| --- | --- | --- | ---: | --- |\n`;
  const waiting = batchCatalogue.batches.filter(batch => ['planned','authorized','waiting-for-compatible-material','provider-failed'].includes(batch.state));
  for (const batch of waiting) {
    let weight = 0; const batchVoices = new Set(), descriptions = [], blockers = [];
    for (const ref of batch.blocks) {
      const id = ref.take ?? ref.code + '-' + ref.part;
      if (receivedIds.has(id)) throw Error(`${batch.id}: received material still listed as pending: ${id}`);
      const entry = activities.find(entry => entry.code === ref.code);
      if (!entry) throw Error('Unknown pending activity: ' + ref.code);
      let body;
      if (ref.take) {
        if (entry.audio) throw Error('Pending take already has a montage: ' + ref.code);
        const index = entry.generationPlan.takes.findIndex(take => take.id === ref.take);
        if (index < 0) throw Error('Unknown pending take: ' + ref.take);
        body = packedProposalRequests(entry)[index];
        const speech = body.generation_config.speech_config;
        for (const speaker of Array.isArray(speech) ? speech : speech.speakers) batchVoices.add(speaker.voice);
        descriptions.push(ref.code);
      } else {
        const plan = repairs[ref.code], repair = plan?.repairs.find(repair => repair.part === ref.part);
        if (!repair) throw Error('Unknown pending repair: ' + id);
        body = { input: [{ content: [{ type: 'text', text: repair.text }] }] };
        batchVoices.add(plan.voices[repair.speaker]);
        descriptions.push(`${ref.code}: ${repair.text}`);
      }
      const estimate = estimateSynthesis(body);
      weight += estimate.words * 60 / policy.wordsPerMinute + (batch.speechTextFormat==='plain-v1' ? 0 : estimate.longPauses * policy.longPauseSeconds + estimate.shortPauses * policy.shortPauseSeconds + 2 * policy.longPauseSeconds);
      if (!isEditoriallyReviewed(entry)) blockers.push(`${ref.code}: conciliar el registre editorial històric abans de preparar l’esmena`);
    }
    const seconds = Math.ceil(weight + 4);
    if (seconds < policy.minimumSeconds) blockers.unshift('Completar amb material del mateix repartiment');
    if (seconds > policy.maximumSeconds) blockers.unshift('Dividir el lot');
    synthesis += row([batch.id, descriptions.join('; '), [...batchVoices].join(' + '), clock(seconds), batch.state==='provider-failed' ? batch.failureSummary : blockers.join('; ') || (batch.state==='authorized'?'Entrada verificada · pendent d’enviament':'Preparar i comprovar l’entrada definitiva')]);
  }
  if (!waiting.length) synthesis += '\nNo queda cap lot pendent.\n';
  const voicePreviews = pending.filter(entry => hasPendingMontage(entry) && progress(entry)?.voicePreview);
  if (voicePreviews.length) {
    synthesis += '\n## Veus rebudes · per escoltar abans del muntatge\n\nLes preses originals es conserven i la cobertura s’ha comprovat localment. La pronunciació i la identitat de les veus continuen pendents d’audició; encara no són muntatges finals.\n\n| Peça | Presa |\n| --- | --- |\n';
    for (const entry of voicePreviews) synthesis += row([link(entry), `[Escolta les veus](${progress(entry).voicePreview.replace(/^\.\//u,'../')})`]);
  }
  synthesis += '\nLes previsions provenen dels guions i del calibratge local; cal recalcular-les amb el format definitiu abans d’enviar. Una mateixa veu en dos guions no implica el mateix personatge. No es canvien repartiments ni s’allarguen guions per omplir un lot.\n';
  const proposals = await json('content/synthesis-proposals.json');
  const validationPriorities = [];
  const plannedIds = new Set(batchCatalogue.batches.filter(batch=>['planned','authorized','provider-failed'].includes(batch.state)).flatMap(batch=>batch.blocks.map(ref=>ref.take??ref.code+'-'+ref.part)));
  synthesis += '\n## Agrupacions candidates · validació i preparació pendents\n\nLa previsió utilitza el text pla real, amb els títols i sense marques literals de pausa ni marges afegits per omplir la petició. Un grup de guions validats encara necessita preparar i comprovar l’entrada definitiva abans d’enviar-lo. Els candidats petits continuen esperant material compatible.\n\n| Proposta | Repartiment | Comprensions | Previsió en text pla | Mida orientativa | Guions validats | Validacions que falten |\n| --- | --- | --- | ---: | --- | ---: | --- |\n';
  for (const group of proposals.groups) {
    const proposed = group.codes.map(code => activities.find(entry => entry.code === code));
    if (proposed.some(entry => !entry)) throw Error('Unknown activity in batch proposal: ' + group.id);
    const entries = proposed.filter(entry => !entry.audio && !hasPendingMontage(entry) && !entry.generationPlan?.takes.some(take => receivedIds.has(take.id)||plannedIds.has(take.id)));
    if (!entries.length) continue;
    const seconds = plainSpeechForecast(entries).seconds;
    synthesis += row([group.anchor ? `[${group.id}](lot-cicle-superior.md#${group.anchor})` : group.id, group.cast, list(entries), clock(seconds), seconds < policy.minimumSeconds ? 'Per completar' : seconds > policy.maximumSeconds ? 'Per dividir' : 'Dins la finestra prevista', entries.filter(teacherApproved).length + '/' + entries.length, list(entries.filter(entry => !teacherApproved(entry)))]);
    const missing = entries.filter(entry => !teacherApproved(entry));
    if (missing.length && seconds >= policy.minimumSeconds && seconds <= policy.maximumSeconds) validationPriorities.push({ group, entries, missing, seconds });
  }
  if (validationPriorities.length) {
    validationPriorities.sort((a,b) => a.missing.length - b.missing.length || a.group.id.localeCompare(b.group.id));
    let priority = '\n## Validacions que completen un lot\n\nOrdenades pel nombre de guions que falta validar. Són candidats de mida compatible; després cal preparar l’entrada definitiva.\n\n| Prioritat | Guions que falten | Lot complet resultant | Text pla estimat |\n| --- | --- | --- | ---: |\n';
    for (const item of validationPriorities) priority += row([item.group.id, list(item.missing), list(item.entries), clock(item.seconds)]);
    synthesis = synthesis.replace('\n## Agrupacions candidates', priority + '\n## Agrupacions candidates');
  }
  synthesis += '\nP02 reuneix quatre lectures breus del mateix repartiment per conservar els guions de 3r curts i senzills. Els grups nous de 5è–6è es poden validar per repartiments sencers i es proposen en lots de dues o tres comprensions completes. Les previsions utilitzen el text pla i encara s’han de verificar amb l’entrada definitiva; la validació dels guions no garanteix que la mida final del lot sigui admissible. Les preses ja rebudes s’exclouen d’aquesta taula. [Tanda de 3r–4t](lot-cicle-mitja.md) · [Tanda de 5è–6è per repartiment](lot-cicle-superior.md) · [Composició proposada](../content/synthesis-proposals.json).\n\n## Esmenes de veu\n\n| Peça | Prova rebuda | Estat actual | Comparació |\n| --- | --- | --- | --- |\n';
  const repairParts = receipts.flatMap(receipt => receipt.parts.filter(part => !/-T\d+$/u.test(part.id)).map(part => ({ ...part, batch: receipt.id })));
  for (const part of repairParts) {
    const code = part.code, name = part.id.slice(code.length + 1), repair = repairs[code]?.repairs.find(repair => repair.part === name);
    const current = progress(activities.find(entry => entry.code === code))?.receivedRepairs?.find(repair => repair.part === name);
    const status = current?.applied ? 'Incorporada · pendent d’audició del muntatge' : current?.status === 'approved-awaiting-application' ? 'Validada · pendent d’incorporar' : current?.status?.startsWith('rejected-') ? 'Rebutjada · cal una altra prova' : 'Pendent d’audició';
    synthesis += row([code, repair?.text ?? name, status, `[${part.batch}](../proves/correccions-${part.batch.toLowerCase()}.html)`]);
  }
  const newRepairs = pending.filter(entry => progress(entry)?.plannedRepair?.status === 'awaiting-compatible-batch');
  if (newRepairs.length) {
    synthesis += '\n### Següents esmenes · encara sense petició\n\n| Peça | Veu | Fragment |\n| --- | --- | --- |\n';
    for (const entry of newRepairs) { const repair = progress(entry).plannedRepair; synthesis += row([link(entry), `${repair.speaker} · ${repair.voice}`, repair.trialIds ? 'Dues proves TTS: «raíls» i «raïls»; text editorial intacte' : repair.parts?.join(' + ') ?? repair.part]); }
    synthesis += '\nEsperen un lot compatible de sis a vuit minuts. Les proves auxiliars de S022 es poden comprovar localment amb `node tools/pronunciation-trials.cjs --only=S022`; aquest comandament no envia cap petició.\n';
  }
  synthesis += '\nAquestes preses són proves per comparar amb l’original; el [registre de pendents](seguiment-produccio.md#esmenes-obertes) indica què continua obert. La recepció no n’autoritza l’aplicació ni valida el muntatge final.\n\nS011, S025 i S041 tenen retorns posteriors a aquests lots: cal preparar les esmenes d’identitat o pronunciació que descriu el [registre de producció](../content/production-progress.js). Els antics R01–R04 són agrupacions alternatives, no peticions addicionals: part del seu material ja és als lots rebuts.\n\n## Criteris per al proper enviament\n\n1. Guió, veus i escaleta validats pel docent, amb aprovació i empremta vigents. Les propostes noves esperen aquesta confirmació encara que la quota s’hagi restablert.\n2. **6–8 minuts estimats**, com a màxim dues veus. Prioritzar dues o tres comprensions completes amb el mateix repartiment. Els lots petits esperen; una excepció requereix explicar-ne la mida al docent i acordar-la explícitament.\n3. Els nous lots de lectures completes utilitzen `plain-v1`: cap marca literal de pausa al text, guió i repartiment intactes, direcció no parlada a `speech_metadata.style`. L14 és la primera presa d’aquest format i continua pendent d’audició; la cobertura automàtica no certifica la dicció. El format segueix la [documentació oficial de Gemini TTS](https://aistudio.google.com/docs/speech-generation#controllable).\n4. Un únic enviament en curs, almenys 65 segons entre inicis. Comprovar aprovacions, duplicats, mida, espai en disc i límits abans de reservar quota o llegir claus. No repetir automàticament intents incerts.\n5. Conservar resposta i preses crues. Comprovar cobertura, identitats, inici, unions i final; retallar només farciment localitzat amb marges de consonants. El reconeixement automàtic no certifica pronunciació ni timbre.\n6. Muntar i escoltar abans de publicar definitivament. Actualitzar el seguiment després de cada canvi de fase.\n\n## Quota i fonts de dades\n\nAquest document no mostra crèdits ni peticions restants. El recompte vigent es consulta a AI Studio; el registre local ajuda a evitar duplicats i limita enviaments, però no és el comptador del proveïdor. No es conserva aquí una previsió de restabliment que quedi caducada.\n\n- [Manifest de lots](../content/synthesis-batches.json): composició i estat de cada lot.\n- [Aprovacions de guió](../content/production-plans.json) · [Plans exactes d’esmena](../content/audio-repairs.json).\n- [Rebuts d’enviaments](../assets/audio/synthesis-batches) · [Històric llegible](historic-sintesi.md) · [Feina pendent](seguiment-produccio.md).\n\n' + refresh + '\n';

  const seconds = receipts.reduce((n, receipt) => n + receipt.rawSeconds, 0);
  const voiceCodes = new Set(receipts.flatMap(receipt => receipt.parts.filter(part => /-T\d+$/u.test(part.id)).map(part => part.code)));
  let history = `# Històric de lots de síntesi\n\n${header} Registre dels **${receipts.length} lots ja rebuts**, amb ${clock(seconds)} d’àudio cru i ${receipts.reduce((n, receipt) => n + receipt.usage.total_input_tokens, 0).toLocaleString('ca-ES')} tokens d’entrada. No és una cua executable ni un comptador de quota. [Tornar als pendents](lots-sintesi.md).\n\nAquests enviaments van aportar veus per a **${voiceCodes.size} comprensions** i **${repairParts.length} frases d’esmena**. És l’abast d’aquests lots, no el nombre total de comprensions del catàleg ni el nombre de peces pendents avui. L’estat actual de cada activitat consta al [seguiment](seguiment-produccio.md).\n\n| Lot | Data d’enviament · UTC | Preses i esmenes | Àudio cru | Tokens d’entrada | Tokens d’àudio |\n| --- | --- | --- | ---: | ---: | ---: |\n`;
  for (const receipt of receipts) history += row([`[${receipt.id}](../assets/audio/synthesis-batches/${receipt.id.toLowerCase()}.json)`, receipt.startedAt.slice(0, 10), receipt.parts.map(part => part.id).join(', '), clock(receipt.rawSeconds), receipt.usage.total_input_tokens, receipt.usage.total_output_tokens]);
  history += '\nCada rebut apunta a la petició exacta i a les empremtes d’origen; les respostes completes, les preses crues i els mapes de tall es conserven localment. No es repeteix una presa perquè encara falti revisar-la o muntar-la. Les planificacions anteriors, superades pels rebuts, es conserven a l’historial de Git.\n\nLes escenes de tres veus S007, S011 i S017 es van construir a partir de dues preses. S011 va presentar inestabilitat de veus; S032 i S041 van incloure instruccions de pausa llegides. Aquests resultats motiven els [criteris del proper enviament](lots-sintesi.md#criteris-per-al-proper-enviament); la cobertura de text no equival a una validació perceptiva.\n\n' + refresh + '\n';
  const cohortEntries = fourthBatchGroups.flatMap(group => group.entries);
  let cohort = `# Propostes de cicle superior i ESO · validació per repartiments\n\n${header} **${cohortEntries.length} comprensions orals** en ${fourthBatchGroups.length} blocs de repartiment. Cada peça té guió, preguntes, solucionari i escaleta. La revisió independent i la validació docent són passos diferents; aquest índex no autoritza síntesi.\n\n| Bloc per revisar | Repartiment fix | Codis | Guions validats pel docent |\n| --- | --- | --- | ---: |\n`;
  for (const group of fourthBatchGroups) cohort += row([`[${group.title}](#${group.id})`, group.cast, group.entries.map(entry => entry.code).join(', '), group.entries.filter(teacherApproved).length + '/' + group.entries.length]);
  cohort += '\n## Com validar els blocs\n\nObre les lectures d’un mateix bloc i revisa el guió i l’escaleta al solucionari. Pots indicar els codis aprovats o validar el bloc sencer. Cada codi conserva una aprovació separada: aprovar un personatge, un text anterior o una síntesi no valida automàticament els altres.\n\nLes [agrupacions orientatives de síntesi](lots-sintesi.md#agrupacions-proposades--encara-sense-autorització) mantenen el mateix repartiment i dues o tres lectures completes per petició. Abans d’enviar-les cal comprovar l’aprovació exacta, preparar l’entrada sense marques de pausa llegibles i verificar la finestra de sis a vuit minuts.\n';
  for (const group of fourthBatchGroups) {
    cohort += `\n<a id="${group.id}"></a>\n\n## ${group.title}\n\n${group.cast}. Les lectures són independents; no cal haver-ne escoltat cap altra per entendre-les.\n\n| Codi | Títol | Curs · dificultat | Tipologia | Durada prevista | Preguntes | Estat |\n| --- | --- | --- | --- | --- | ---: | --- |\n`;
    for (const entry of group.entries) {
      const state = (isPublished(entry) ? 'Definitiva' : entry.audio ? 'Àudio en revisió' : hasPendingMontage(entry) ? 'Veus rebudes' : hasApprovedScript(entry) ? 'Guió validat' : isEditoriallyReviewed(entry) ? 'Provisional · pendent del docent' : 'Esborrany en revisió') + (progress(entry)?.gradingReview?.status === 'pending-listening' ? (progress(entry).gradingReview.reviewDifficulty ? (progress(entry).gradingReview.reviewCourse === false ? ' · dificultat per valorar després d’escoltar' : ' · curs i dificultat per valorar després d’escoltar') : ' · curs per valorar després d’escoltar') : '');
      cohort += row([link(entry), entry.title, grade(entry) + ' · ' + levels[entry.level], genres[entry.genre], duration(entry), entry.questions.length, state]);
    }
    const castQuery = new URLSearchParams();
    for (const name of Object.keys(group.voices)) castQuery.append('personatge', name.toLocaleLowerCase('ca'));
    if (Object.keys(group.voices).length > 1) castQuery.set('coincidencia', 'tots');
    cohort += '\n[Filtra el catàleg per aquest repartiment](https://sentit.ortogra.fi/?' + castQuery + ') · [Guions i escaletes del bloc](../content/propostes/tanda4/' + group.source + '.js). El filtre també pot mostrar peces de tandes anteriors; activa «Només provisionals» per revisar feina oberta. Les acotacions descriuen recursos proposats, no gravacions ja produïdes.\n';
  }
  cohort += '\n## Criteris editorials de la tanda\n\n- Una o dues veus fixes per bloc, sense repartir una tercera veu entre preses separades.\n- Context autosuficient i vocabulari propi de cada persona. Laia i Biel parlen com a joves; els adults expliquen els termes concrets que calguin.\n- Dificultat en les causes, les relacions i les inferències; no en ambigüitats involuntàries o llistes de xifres accessòries.\n- Cap moralina o aclariment preventiu d’una obvietat. A les aules, activitat concreta i conversa humana, sense protocol administratiu.\n- Música molt baixa i diferent a les narracions; ambients i detalls d’enregistraments reals encara pendents d’acreditar. Els sons no han de resoldre preguntes que depenen de la parla.\n- Revisió independent de contingut, preguntes, cites i muntatge previst abans de mostrar una proposta com a provisional. Il·lustració i àudio es treballen després de validar el contingut.\n\n## Després d’aquesta tanda\n\n[«Vida quotidiana»](vida-quotidiana.md) queda anotada per iniciar una tanda pròpia de cicle inicial i mitjà: converses de botiga, parc, carrer o visita familiar més espontànies. Encara no s’activa cap univers ni curs nou.\n\n' + refresh + '\n';
  return { 'seguiment-produccio.md': tracking, 'publicades.md': finished, 'lots-sintesi.md': synthesis, 'historic-sintesi.md': history, 'lot-cicle-superior.md': cohort };
}
