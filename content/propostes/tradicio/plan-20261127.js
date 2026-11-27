import { cultural } from './shared.js';

// New candidates only: never change a voice or fingerprint of an older take.
export function culturalCandidate({ voice, music, batch, ...data }) {
  const result = cultural({
    ...data, voices: { Narrador: voice },
    delivery: 'Una sola veu narradora en català central, clara i expressiva, amb ritme natural. Els diàlegs citats mantenen el mateix timbre, amb canvis suaus d’intenció. Llegir exactament el text; direcció i acotacions només a metadades.',
    soundPlan: `Base compartida ${music} del repertori de tradició aprovat, pendent de confirmar l’alternança amb els usos recents abans del muntatge. Entrada discreta d’un segon; música molt atenuada durant tota la narració. Després de l’última paraula, mig segon de marge, pujada de dos segons i fosa final. Sense efectes puntuals, pauses de farciment ni música que doni respostes. Separar títol i cos localment. Primer audició i validació docent de les veus; després muntatge.`,
    soundCredits: 'Música prevista del repertori compartit de Sentit, amb origen, autor i llicència a Fonts i crèdits sonors. Encara no s’ha utilitzat cap pista en aquesta proposta. Adaptació catalana pròpia; les fonts contrasten l’argument tradicional, sense reproduir una traducció moderna.',
  });
  result.entry.production.voicePolicy = {
    status: 'candidate-not-frozen', role: 'Narrador', defaultCandidate: voice,
    candidates: [voice], maxPhysicalVoices: 1,
    note: `Candidat per al grup ${batch}. Narrador anònim, sense atribuir-li la identitat del recurrent que comparteix timbre. Una única veu durant tot el relat. La selecció i el lot encara requereixen validació docent i congelació explícita; cap enviament autoritzat per aquesta proposta.`,
  };
  result.entry.productionNotes[2] = `Veu candidata: Narrador — ${voice}. Grup de treball ${batch}; pla viu a docs/lot-tradicio-20261127.md. Una presa completa ${data.code}-T01, amb presentació i cos, dins una petició compartida de dues veus com a màxim. La revisió editorial no valida ni envia la síntesi.`;
  return result;
}
