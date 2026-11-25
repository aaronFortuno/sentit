import { proposal } from '../proposal.js';
export { direction as d, spoken as s, evidence as e } from '../proposal.js';

// Canonical open questions and ABCD are authored together, stored separately.
export function item(id, prompt, answer, options, correct, explanation, evidence, lines = 1) {
  // Fixed editorial ordering: the same item always has the same A–D sequence.
  // No randomness, browser preference or per-print shuffling enters this mapping.
  const ordered = [...options], correctText = options['abcd'.indexOf(correct)];
  let hash = 2166136261;
  for (const character of id + '|' + prompt) hash = Math.imul(hash ^ character.codePointAt(0), 16777619) >>> 0;
  for (let i = 3; i > 0; i--) { const j = hash % (i + 1); [ordered[i],ordered[j]] = [ordered[j],ordered[i]]; hash = Math.imul(hash ^ (hash >>> 13), 16777619) >>> 0; }
  return { open: { id, prompt, answer, lines, evidence }, choice: { prompt, options:ordered, correct:'abcd'[ordered.indexOf(correctText)], explanation, evidence } };
}
export function draft({ items, context, ...data }) {
  const parts = data.transcript.filter(part => part.speaker).map(part => part.id);
  // Avoid accidental all-A/all-D sets while keeping the editorial mapping fixed.
  const used = [0,0,0,0], limit = Math.ceil(items.length / 4);
  const choices = items.map((item,index) => {
    const choice = { ...item.choice, options:[...item.choice.options] }, old = 'abcd'.indexOf(choice.correct);
    if (used[old] >= limit) {
      const order = Array.from({length:4},(_,i)=>(i + Number(data.code.slice(1)) + index)%4).sort((a,b)=>used[a]-used[b]);
      const next = order.find(position=>used[position]<limit);
      [choice.options[old],choice.options[next]] = [choice.options[next],choice.options[old]];
      choice.correct = 'abcd'[next];
    }
    used['abcd'.indexOf(choice.correct)]++;
    return [item.open.id,choice];
  });
  const entry = proposal({
    ...data, strategy: 'plain-v1', questions: items.map(item => item.open),
    soundCredits: 'Muntatge proposat amb enregistraments reals acreditats o la base comuna ja registrada. Cap veu, mostra nova ni il·lustració produïda per a aquesta proposta.',
    generationPlan: {
      note: 'Un tall complet per comprensió, amb títol i cos. Agrupar amb el mateix repartiment en un lot estimat de 6–8 minuts. Text pla sense etiquetes de pausa llegibles; direcció només a les metadades. La revisió independent no autoritza síntesi: falta validació docent del guió i de tota l’escaleta.',
      takes: [{ id: data.code + '-T01', label: 'Presentació i fragment complets', parts: ['introduction', ...parts], requests: 1, note: 'Una presa completa dins un lot compartit, no una petició separada per cada comprensió. Màxim dues veus i cap canvi d’identitat entre torns.' }],
      localCuts: [{ id: data.code + '-L01', after: 'introduction', label: 'Separar presentació del cos', note: 'Comprovar cobertura i marges de consonants en rebre la presa. Fer els talls locals dins el silenci real; conservar el cru. Audició docent de veus abans del muntatge.' }],
    },
  });
  return { entry, choices: { questions: Object.fromEntries(choices), openOnly: {} }, context };
}
export const entries = drafts => drafts.map(draft => draft.entry);
export const alternatives = drafts => Object.fromEntries(drafts.map(draft => [draft.entry.language + '-' + draft.entry.code, draft.choices]));
export const contexts = drafts => Object.fromEntries(drafts.map(draft => [draft.entry.language + '-' + draft.entry.code, draft.context]));
