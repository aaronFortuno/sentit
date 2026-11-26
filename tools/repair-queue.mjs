// Offline inventory. No provider calls, credentials or approval changes.
import { createRequire } from 'node:module';
const { estimateSynthesis } = createRequire(import.meta.url)('./audio-batch-policy.cjs');
const receivedStates = new Set(['received-awaiting-listening', 'approved-awaiting-application']);
export function repairQueue(entries, progress, plans) {
  const queued = [], received = [], conditional = [], notes = [], retakes = [];
  const add = (entry, part, status, formal) => {
    if (!part?.speaker || !part.text) throw Error('Unresolved pending voice turn: ' + entry.code);
    const plan = plans[entry.code], voice = plan?.voices?.[part.speaker] ?? entry.production?.voices?.[part.speaker];
    if (!voice) throw Error('Unresolved pending voice: ' + entry.code + '/' + part.speaker);
    const item = { code: entry.code, part: part.part ?? part.id, speaker: part.speaker, voice, text: part.text, formal };
    const state = progress[entry.language + '-' + entry.code];
    // The teacher requested these two consecutive paragraphs as ONE take.
    item.take = entry.code === 'S017' ? 'S017-coordinacio-retorn' : entry.code + '-' + item.part;
    if (status === 'conditional') conditional.push(item); else queued.push(item);
  };
  for (const entry of entries) {
    const state = progress[entry.language + '-' + entry.code];
    if (!state || state.state === 'published' || plans[entry.code]?.status === 'closed-original-accepted') continue;
    // A mounted, teacher-approved take has already resolved its old repair plan.
    // Keep any genuinely pending feedback or new audition candidate visible.
    if (state.state === 'montage-awaiting-listening' && state.voiceApproval?.status === 'approved'
      && !(state.feedback ?? []).some(feedback => feedback.status === 'pending')
      && !(state.receivedRepairs ?? []).some(repair => receivedStates.has(repair.status))) continue;
    if (state.plannedRepair?.scope === 'whole-recording') {
      const plan = state.plannedRepair;
      if (plan.status === 'received-awaiting-listening') {
        received.push({code:entry.code,part:'gravació completa',speaker:Object.keys(entry.production.voices).join(' + '),voice:Object.values(entry.production.voices).join(' + '),status:'received-awaiting-listening',candidate:state.voicePreviewFile});
        continue;
      }
      retakes.push({code:entry.code,take:plan.takeId,voices:entry.production.voices,parts:plan.parts,text:[entry.introduction,...entry.transcript.filter(p=>p.speaker).map(p=>p.text)].join('\n\n'),planFile:plan.planFile,status:plan.status});
      continue;
    }
    const covered = new Set();
    for (const repair of plans[entry.code]?.repairs ?? []) {
      for (const part of repair.sourceParts ?? [repair.part]) covered.add(part);
      const comparisons = (state.receivedRepairs ?? []).filter(r => r.part === repair.part);
      if (comparisons.some(r => r.applied)) continue;
      const candidate = comparisons.find(r => receivedStates.has(r.status));
      if (candidate) received.push({ code: entry.code, part: repair.part, speaker: repair.speaker, voice: plans[entry.code].voices[repair.speaker], status: candidate.status, candidate: candidate.candidateFile, localTrial: state.localRepairTrial?.status ?? null });
      else add(entry, repair, 'queued', true);
    }
    const planned = state.plannedRepair;
    const partIds = new Set([...(planned?.parts ?? []).map(p => typeof p === 'string' ? p : p.part), ...(state.feedback ?? []).filter(f => f.status === 'pending').map(f => f.part)]);
    for (const id of partIds) {
      if (covered.has(id)) continue;
      if (id === 'whole') { notes.push({ code: entry.code, reason: 'Cal revisar també l’estabilitat del conjunt de veus; dues frases corregides poden no resoldre tota la peça.' }); continue; }
      const part = entry.transcript?.find(t => t.id === id && t.speaker);
      if (!part) { notes.push({ code: entry.code, reason: 'Incidència pendent de concretar en parla canònica: ' + id }); continue; }
      add(entry, part, planned?.status === 'awaiting-teacher-recheck-of-clean-audio' ? 'conditional' : 'queued', false);
    }
  }
  return { queued, received, conditional, notes, retakes, takes: new Set(queued.map(i => i.take)).size };
}
export function repairQueueMarkdown(queue, date) {
  const fmt = n => `${Math.floor(n / 60)}:${String(Math.round(n) % 60).padStart(2, '0')}`;
  const groups = [
    { label: 'Mar + informadora', voices: ['Erinome', 'Callirrhoe'], complement: 'Situacions quotidianes de la Mar amb una interlocutora de veu Callirrhoe.' },
    { label: 'Ferran', voices: ['Algenib'], complement: 'Records narrats de Ferran; pot incorporar Aina/Zephyr en nous diàlegs.' },
    { label: 'Elies', voices: ['Algieba'], complement: 'Diàlegs de taller amb Biel/Puck, sense repetir «funda» com a farciment.' },
    { label: 'Mireia', voices: ['Aoede'], complement: 'Escenes d’aula amb una sola veu d’alumne per petició; evitar tornar al muntatge de tres veus.' },
    { label: 'Laia + Biel', voices: ['Leda', 'Puck'], complement: 'Converses quotidianes breus del duet. S011 necessita abans una decisió sobre l’estabilitat global.' },
    { label: 'Empleada', voices: ['Gacrux'], complement: 'Situacions de servei amb la mateixa identitat femenina ocasional i una segona veu fixa.' },
    { label: 'Joana + Nora', voices: ['Vindemiatrix', 'Kore'], complement: 'L04 és molt petit; pot esperar. Cal conciliar el registre editorial històric de S015.' },
  ];
  let text = `# Pla d’esmenes de veu\n\nActualitzat: **${date.split('-').reverse().join('/')}**. **${queue.queued.length} fragments en ${queue.takes} preses previstes** encara necessiten síntesi o re-síntesi. Les correccions de paràgrafs consecutius de la mateixa veu es compten com una sola presa. **${queue.conditional.length} fragment addicional pendent de confirmar a l’àudio net** i **${queue.received.length} fragments ja rebuts que no s’han de tornar a generar ara**.\n\nAquest inventari exclou les esmenes ja incorporades als muntatges i les publicacions definitives. No és una autorització ni una cua executable. No s’ha fet cap petició nova per preparar-lo.\n\n## Blocs per completar\n\nLes esmenes soles no arriben als **6–8 minuts** acordats. Les durades següents són estimacions de parla a 170 mots/minut i un marge de quatre segons per bloc; el resultat real pot variar. Consulteu la [tanda d’equilibri](pla-equilibri-2026-11-25.md) i la [cua vigent](lots-sintesi.md) per distingir complements encara disponibles i veus ja rebudes. Aquesta taula mesura només les esmenes; els complements proposats són orientacions editorials.\n\n| Bloc candidat | Fragments / preses | Esmenes | Parla estimada | Complement que ajudaria |\n| --- | ---: | --- | ---: | --- |\n`;
  for (const group of groups) { const items = queue.queued.filter(i => group.voices.includes(i.voice)); if (!items.length) continue; const seconds = estimateSynthesis({ input: [{ content: items.map(i => ({ type: 'text', text: i.text })) }] }).seconds;
    text += `| ${group.label} | ${items.length} / ${new Set(items.map(i => i.take)).size} | ${[...new Set(items.map(i => i.code))].join(', ')} | ${fmt(seconds)} | ${group.complement} |\n`; }
  if(queue.retakes.length){text+='\n## Regeneracions completes\n\nAquestes peces necessiten una presa seguida, no una suma d’esmenes aïllades. Els originals es conserven; cal un lot compatible de sis a vuit minuts i una nova audició abans del muntatge.\n\n| Peça | Presa nova | Veus | Previsió | Pla exacte |\n| --- | --- | --- | ---: | --- |\n';for(const item of queue.retakes){const seconds=estimateSynthesis({input:[{content:[{type:'text',text:item.text}]}]}).seconds;text+=`| [${item.code}](https://sentit.ortogra.fi/#lectura=ca-${item.code}) | ${item.take} · títol i diàleg complets | ${Object.entries(item.voices).map(([speaker,voice])=>speaker+' / '+voice).join('; ')} | ${fmt(seconds)} | [Pla i empremta](../${item.planFile}) |\n`;}}
  text += '\nCompletar els blocs pendents de la taula amb guions validats de veus compatibles. No omplir cap lot amb frases repetides ni fer passar instruccions de pronunciació al text parlat. Una proposta amb una sola veu pot admetre una segona veu fixa, però mai una tercera.\n\n## Fragments exactes i estat de preparació\n\n| Peça | Fragment | Veu | Preparació |\n| --- | --- | --- | --- |\n';
  for (const item of queue.queued) text += `| [${item.code}](https://sentit.ortogra.fi/#lectura=ca-${item.code}) | ${item.part} | ${item.speaker} · ${item.voice} | ${item.formal ? 'Pla exacte disponible; falta completar i verificar el lot' : 'Retorn docent registrat; cal formalitzar la petició exacta'} |\n`;
  text += '\n## Material rebut i decisions locals\n\n';
  for (const item of queue.received) text += `- **${item.code} / ${item.part}:** ${item.status === 'approved-awaiting-application' ? 'fragment validat, pendent d’aplicar' : 'presa rebuda, pendent d’audició'}${item.localTrial ? '; comparació parcial local demanada' : ''}. No generar-ne una altra abans de resoldre aquesta revisió.\n`;
  for (const item of queue.conditional) text += `- **${item.code} / ${item.part}:** tornar a escoltar la presa neta de metadades abans de confirmar que cal regenerar «trossets».\n`;
  for (const note of queue.notes) text += `- **${note.code}:** ${note.reason}\n`;
  return text + '\nLa quota disponible es consulta a AI Studio. Aquest document i el registre local no en substitueixen el comptador. [Cua i rebuts](lots-sintesi.md) · [Seguiment de producció](seguiment-produccio.md).\n';
}
