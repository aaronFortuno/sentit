import { draft, item as q, d, s, e, entries, alternatives, contexts } from '../equilibri/proposal.js';

// Narrator is a role, not a new recurring character. The provisional timbre can
// be chosen when freezing a compatible batch; no production approval is implied.
export const cultural = data => {
  const result = draft({ voices:{Narrador:'Algenib'},
    delivery:'Narració en català central, càlida, clara i expressiva, amb ritme natural. Una sola veu narradora, també als diàlegs citats, amb canvis suaus d’intenció i sense imitar criatures o monstres. Algenib és candidat provisional; el docent autoritza triar un timbre compatible amb el lot abans de congelar-lo. No llegir acotacions ni indicacions de pausa.',
    soundPlan:'Base musical narrativa molt suau, pròpia d’aquesta peça, amb font i llicència registrades abans de muntar. Entrada breu i discreta, atenuació sota tota la parla i pujada de dos segons abans de la fosa final. Ambient i efectes reals opcionals en línia amb la veu, sense silencis d’espera, crits sobtats ni pistes que resolguin preguntes. Títol separat localment després de comprovar el silenci real. Les veus es validen abans del muntatge.',
    soundCredits:'Encara no s’ha escollit ni utilitzat cap música, enregistrament o il·lustració. L’adaptació catalana està redactada per a Sentit; les referències textuals i les decisions d’adaptació s’identifiquen al guió.',
    genre:'story', ...data });
  result.entry.production.voicePolicy = {
    status:'candidate-not-frozen', role:'Narrador', defaultCandidate:'Algenib',
    candidates:['Algenib','Erinome','Aoede','Algieba'], maxPhysicalVoices:1,
    note:'Timbres alternatius per completar un lot compatible sense canviar el text ni atribuir la narració a un recurrent. Fixar-ne un per peça abans de l’enviament; conservar-lo en totes les preses i esmenes. Cap veu queda aprovada per la revisió editorial.'
  };
  result.entry.productionNotes.splice(2,0,'Veu flexible: narrador anònim. Algenib és una candidata; també es poden valorar Erinome, Aoede o Algieba segons el lot. La tria final i la direcció es congelen abans de sintetitzar, sense canviar d’identitat a mig relat.');
  return result;
};
