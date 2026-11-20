const repo = 'https://github.com/aaronFortuno/sentit/blob/main/';
import { productionProgress } from './content/production-progress.js';
const gemini = { title: 'Gemini TTS · Google', url: 'https://ai.google.dev/gemini-api/docs/speech-generation', license: 'Condicions de Gemini API', licenseUrl: 'https://ai.google.dev/gemini-api/terms' };
const original = { title: 'Sentit · síntesi i muntatge originals amb FFmpeg', url: repo + 'tools/remaster-audio.cjs', license: 'MIT · projecte Sentit', licenseUrl: repo + 'LICENSE' };

// Only resources actually heard in the published master. Future cue sheets live in docs/.
export const audioResources = {
  'ca-S003': { voices: 'Leda: Laia i presentació. Puck: Biel. Una petició per al títol i tot el diàleg; rialles breus sol·licitades a totes dues veus dins la mateixa presa. Àudio pendent d’audició docent.', sounds: 'Passos originals al passadís durant el canvi de classe, un fregadís de bossa abans de la descoberta i passos que s’allunyen al final. Ambient molt baix sota la crida inicial i veu neta a les pistes. Sense gravacions externes.', recipe: 'tools/render-proposal.cjs' },
  'ca-S013': { voices: 'Aoede: Mireia, narració i presentació. Una petició per al títol i tota l’explicació. Àudio pendent d’audició docent.', sounds: 'Paper d’un sobre a l’entrada, transició de paper entre classificació i repartiment i dues notes de sortida originals. Sense màquines ni efectes sota les dades del procés.', recipe: 'tools/render-proposal.cjs' },
  'ca-S015': { voices: 'Puck: Biel, entrevistador i presentació. Kore: Nora, restauradora. Una única petició per al títol i tot el diàleg, amb separació local dins un silenci comprovat. Guió i escaleta validats; àudio pendent d’audició docent.', sounds: 'Sintonia breu a l’entrada i a la sortida, ambient de sala molt baix al primer torn i un moviment discret de pàgina. Veu neta a les explicacions tècniques. Tots els sons són originals procedurals, sense gravacions externes.', recipe: 'tools/render-interview.cjs' },
  'ca-S008R': { voices: 'Aoede: una única narradora adulta, sense nom al relat. Presentació reutilitzada de S008. Una petició nova per a tot el programa; àudio pendent d’audició docent.', sounds: 'Separador de ràdio original de dos segons, base instrumental amb atenuació sota la veu, pas de pàgina i comiat musical. Síntesi i muntatge locals amb FFmpeg, sense gravacions externes.', recipe: 'tools/render-radio.cjs' },
  'ca-S001': { voices: 'Leda (Laia), Puck (Biel); Aoede (presentació).', sounds: 'Tocs de ràdio i sintonia final originals. Sintonia inicial opcional de Sentit.' },
  'ca-S002': { voices: 'Aoede (mestra i presentació).', sounds: 'Separacions entre passos i sintonia inicial opcional de Sentit.' },
  'ca-S008': { voices: 'Aoede (una única narradora, sense nom en el relat; també la presentació). L’Aina i l’avi són personatges narrats, sense veu pròpia. Àudio pendent d’audició docent.', sounds: 'Base instrumental suau, transició de paper i sintonia inicial opcional originals de Sentit. La versió de programa de ràdio amb benvinguda i comiat està disponible amb el codi ca-S008R, també pendent d’audició.' },
};

export function renderAudioResources(root, entry, t) {
  root.replaceChildren();
  if (!entry) return;
  const record = audioResources[`${entry.language}-${entry.code}`];
  const add = (tag, text, parent = root) => { const node = document.createElement(tag); node.textContent = text; parent.append(node); return node; };
  const link = (parent, text, url) => { const a = add('a', text, parent); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; };
  const progress = productionProgress[`${entry.language}-${entry.code}`];
  if(progress?.state==='voices-received'){
    add('p', t('reviewVoicesNotice'));
    if(progress.sharedJingle?.status==='awaiting-validation')link(root,t('hearJingleProposal'),new URL(progress.sharedJingle.url,import.meta.url).href);
  }
  if (!record && !entry.audio) add('p', t('audioSourcesPending'));
  if (record) {
    for (const [label, text, source] of [[t('resourceVoice'), record.voices, gemini], [t('resourceOriginal'), record.sounds, original]]) {
      add('h4', label);
      const p = add('p', text); p.lang = 'ca';
      const attribution = add('p', '');
      link(attribution, source.title, source===original&&record.recipe?repo+record.recipe:source.url);
      attribution.append(document.createTextNode(' · '));
      link(attribution, source.license, source.licenseUrl);
    }
  }
  const p = add('p', '');
  link(p, t('fullAudioCredits'), repo + 'docs/fonts-sonores.md');
}
