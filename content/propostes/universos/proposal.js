import { proposal } from '../proposal.js';

// Drafts for recurring settings. This prepares text only; no audio is requested.
export function universeProposal(data) {
  const parts = data.transcript.filter(part => part.speaker).map(part => part.id);
  return proposal({
    ...data,
    soundCredits: 'Ambients i accions proposats d’enregistraments reals amb font i llicència compatibles, pendents de seleccionar. No hi ha cap mostra ni veu produïda per a aquest guió.',
    generationPlan: {
      note: 'Títol i diàleg sencers en una presa de dues veus recurrents. Acotacions només per al muntatge: entrada de TTS en text pla, sense instruccions literals de pausa. Agrupar escenes amb el mateix repartiment fins a una previsió útil de sis a vuit minuts. Validació docent pendent.',
      takes: [{ id: `${data.code}-T01`, label: 'Títol i diàleg complets', parts: ['introduction', ...parts], requests: 1, note: `${Object.entries(data.voices).map(([name, voice]) => `${name}: ${voice}`).join('; ')}. ${Object.keys(data.voices)[0]} llegeix el títol. Conservar identitat, registre i ritme naturals.` }],
      localCuts: [{ id: `${data.code}-L01`, after: 'introduction', label: 'Separar presentació i diàleg', note: 'Quan arribi la presa, comprovar les paraules, la pausa real i els marges de consonants abans de tallar. Conservar l’original. Audició docent de les veus abans de muntar.' }],
    },
  });
}
