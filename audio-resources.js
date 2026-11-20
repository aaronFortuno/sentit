const repo = 'https://github.com/aaronFortuno/sentit/blob/main/';
import { productionProgress } from './content/production-progress.js';
import { musicForActivity } from './content/music-catalogue.js';
import { soundSourcesForActivity } from './content/sound-sources.js';
import { hasApprovedScript, hasPendingMontage } from './editorial-review.js';
const gemini = { title: 'Gemini TTS · Google', url: 'https://ai.google.dev/gemini-api/docs/speech-generation', license: 'Condicions de Gemini API', licenseUrl: 'https://ai.google.dev/gemini-api/terms' };
const original = { title: 'Sentit · síntesi i muntatge originals amb FFmpeg', url: repo + 'tools/remaster-audio.cjs', license: 'MIT · projecte Sentit', licenseUrl: repo + 'LICENSE' };

// Only resources actually heard in the published master. Future cue sheets live in docs/.
export const audioResources = {
  'ca-S019': { voices: 'Leda: Laia i presentació. Sulafat: Ona, cuinera. Una petició completa amb les confirmacions breus i el «Sí, sí» solapat sol·licitat dins la mateixa presa. Naturalitat del solapament pendent d’audició docent.', sounds: 'Contacte discret de recipient i paper abans del diàleg, un full de menú entre compra i servei i sortida breu originals de Sentit, MIT. Sense fregit o soroll continu sota les respostes ni gravacions externes.', recipe: 'tools/render-proposal.cjs' },
  'ca-S023': { voices: 'Erinome: Mar, periodista, i presentació. Charon: Pau, comerciant. Títol i notícia sencers en una sola petició; guió i escaleta validats. Àudio pendent d’audició docent.', sounds: 'Capçalera i sortida originals, ambient de sala, passos i paper molt discrets abans del testimoni. Veu neta als accessos, horaris, opinions i decisions pendents. Sense clientela gravada ni mostres externes.', recipe: 'tools/render-proposal.cjs' },
  'ca-S004': { voices: 'Aoede: una narradora adulta i presentació. Aina i Ferran són personatges narrats, sense veus pròpies en aquesta versió. Una petició completa; àudio pendent d’audició docent.', sounds: 'Base original «Un fil per seguir», molt baixa durant el relat, amb fosa d’entrada i pujada seguida de fosa després de la veu. Fregadís de roba dins una pausa, sense anticipar el botó ni subratllar les pistes.', recipe: 'tools/render-proposal.cjs' },
  'ca-S004D': { voices: 'Zephyr: Aina, narració en primera persona i presentació. Algenib: avi Ferran. Una petició amb totes les intervencions; àudio pendent d’audició docent.', sounds: 'La mateixa composició original de S004, perquè és una versió de la mateixa història, amb mescla pròpia. Música molt baixa, fregadís de roba abans de la recerca i foses fora de la parla. Sense efectes de descoberta ni veus addicionals.', recipe: 'tools/render-proposal.cjs' },
  'ca-S005': { voices: 'Puck: Biel i presentació. Vindemiatrix: Joana, cartera. Una petició amb tota l’entrevista, salutacions i comiat mutu. Àudio pendent d’audició docent.', sounds: 'Sintonia i sobres originals a l’entrada, passes discretes al canvi de tema i sintonia després del comiat. Veu neta a les adreces i les explicacions. Sense enregistraments externs.', recipe: 'tools/render-proposal.cjs' },
  'ca-S016': { voices: 'Erinome: Mar, periodista i presentació. Una petició per al títol i tota la notícia amb el tancament pràctic validat. La resta de la peça està ben valorada pel docent; un artefacte substitueix «Si» a «Si l’estudi avança, l’equip». Correcció local pendent.', sounds: 'Capçalera informativa, ambient inicial molt baix, paper al canvi de font i sortida originals de Sentit. Jingles inicial i final pendents de polir segons el feedback docent. Les dades, les hipòtesis i el rumor es mantenen amb veu neta. Sense gravacions externes.', recipe: 'tools/render-proposal.cjs' },
  'ca-S012': { voices: 'Puck: Biel i presentació. Algieba: Elies, lutier. Una petició per al títol i l’entrevista completa, amb salutacions. Àudio pendent d’audició docent.', sounds: 'Moviment de paper original al canvi de tema. Cap guitarra sintetitzada: la gravació real de l’obertura té una font i una llicència pròpies, indicades a sota. Silenci al comiat, sense suggerir una reparació acabada.', recipe: 'tools/render-proposal.cjs' },
  'ca-S010': { voices: 'Leda: Laia i presentació. Puck: Biel. Diàleg complet i títol en una petició. Muntatge validat pel docent; «Després» i «Til·lers» pendents de correcció. Aquest remuntatge conserva íntegra la veu, encara sense aplicar-hi les correccions.', sounds: 'Passos reals d’evsecrets (CC0) a l’arribada, a la pausa del carreró i al comiat. Els nous fragments esperen audició; les pistes del trajecte es mantenen amb veu neta.', recipe: 'tools/render-proposal.cjs' },
  'ca-S022': { voices: 'Algenib: Ferran recorda en primera persona; també llegeix la presentació. Aina i el pare són personatges del record, sense veus pròpies. Una petició per al títol i tot el relat. Muntatge valorat positivament pel docent; pronunciació de «rails» pendent de corregir.', sounds: 'Base original pròpia de corda polsada i piano sord, molt suau durant el relat. Fosa d’obertura i pujada seguida de fosa després de la veu. Fragments reals d’un tramvia modern de migweis (CC0) abans de començar i dins la pausa del retorn al present, més paper original. Substitueixen el toc sintètic descartat. Evocació sonora, sense pretendre ser un arxiu històric; nous efectes pendents d’audició.', recipe: 'tools/render-proposal.cjs' },
  'ca-S018': { voices: 'Aoede: una narradora adulta i presentació. Aina i Ferran són personatges narrats, sense veus pròpies en aquest relat. Una petició per al títol i tota la narració; àudio pendent d’audició docent.', sounds: 'Base musical original molt suau, amb fosa d’entrada, nivell baix durant la narració i pujada seguida de fosa després de la veu. Clau, cartró i paper discrets dins les pauses, sense gravacions externes.', recipe: 'tools/render-proposal.cjs' },
  'ca-S003': { voices: 'Leda: Laia i presentació. Puck: Biel. Una petició per al títol i tot el diàleg; rialles breus sol·licitades a totes dues veus dins la mateixa presa. Àudio pendent d’audició docent.', sounds: 'Passos originals al passadís durant el canvi de classe, un fregadís de bossa abans de la descoberta i passos que s’allunyen al final. Ambient molt baix sota la crida inicial i veu neta a les pistes. Sense gravacions externes.', recipe: 'tools/render-proposal.cjs' },
  'ca-S013': { voices: 'Aoede: Mireia, narració i presentació. Una petició per al títol i tota l’explicació. El docent valora positivament la peça, amb dues ocurrències de «bústia» pendents de correcció de tonicitat.', sounds: 'Paper d’un sobre a l’entrada i transició entre classificació i repartiment. Retirada la sintonia final de dues notes, descartada pel docent. Nova identitat sonora pendent de tria. Sense màquines sota les dades.', recipe: 'tools/render-proposal.cjs' },
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
  if(hasPendingMontage(entry)||hasApprovedScript(entry)){
    add('p', t(hasPendingMontage(entry)?'reviewVoicesNotice':'reviewReadyNotice'));
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
    const music=musicForActivity(entry);
    if(music&&entry.audio){
      add('h4',t('resourceMusic'));
      add('p',`${music.title} · ${music.author} · ${music.license}`);
      const source=add('p','');link(source,t('musicRecipe'),repo+music.source);
      source.append(document.createTextNode(' · '));link(source,t('musicRegister'),repo+'docs/musiques.md');
    }
    for(const recording of soundSourcesForActivity(entry)){
      add('h4',t('resourceExternal'));
      const description=add('p',recording.description+' '+recording.treatment);description.lang='ca';
      const attribution=add('p','');link(attribution,`${recording.title} · ${recording.author}`,recording.url);
      attribution.append(document.createTextNode(' · '));link(attribution,recording.license,recording.licenseUrl);
    }
  }
  const p = add('p', '');
  link(p, t('fullAudioCredits'), repo + 'docs/fonts-sonores.md');
}
