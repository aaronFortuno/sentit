import { proposal } from '../proposal.js';

// Guest roles belong to an activity, not to the recurring character directory.
export function dailyProposal(data) {
  const parts = data.transcript.filter(part => part.speaker).map(part => part.id);
  return proposal({
    ...data,
    universeIds: ['situacions-quotidianes'],
    soundCredits: 'Ambients proposats d’enregistraments reals amb llicència compatible, pendents de seleccionar i acreditar. Cap mostra ni veu produïda per a aquesta proposta.',
    generationPlan: {
      note: 'Títol i conversa sencers en una presa de dues veus. Les acotacions són només d’edició: el text enviat serà pla, sense etiquetes literals de pausa. Agrupar amb veus compatibles, amb un màxim de dues veus al lot i sis a vuit minuts estimats. Pendent de validació docent; no autoritza cap petició.',
      takes: [{ id: `${data.code}-T01`, label: 'Títol i conversa complets', parts: ['introduction', ...parts], requests: 1, note: `Veus proposades: ${Object.entries(data.voices).map(([name, voice]) => `${name}: ${voice}`).join('; ')}. ${Object.keys(data.voices)[0]} llegeix el títol. Els convidats són ocasionals, sense fitxa pròpia. Veus pendents d’audició.` }],
      localCuts: [{ id: `${data.code}-L01`, after: 'introduction', label: 'Separar presentació i conversa', note: 'Comprovar la pausa real i els marges abans de retallar; conservar la presa crua, totes les paraules i els finals. Sense retocs de to o ritme per dissimular canvis d’identitat.' }],
    },
  });
}
