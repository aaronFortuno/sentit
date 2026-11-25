import { dailyProposal } from './proposal.js';
import { direction as d, spoken as s, question as q, evidence as e } from '../proposal.js';

const delivery = 'Laia/Leda i Biel/Puck, veus juvenils recurrents estables. Conversa propera i espontània amb frases quotidianes curtes, reaccions i humor discret. Sense registre expert, moralines, rialles llegides ni narrador. Conservar les dues identitats durant tota la presa.';
const park = 'Ambient enregistrat real de parc tranquil, molt baix sota la conversa, sense crits propers, paraules intel·ligibles o sons que donin respostes. Entrada suau d’un segon; mig segon després de l’última frase, pujada discreta i fosa curta. Sense música ni efectes puntuals que afegeixin silencis.';

export const dailyLaiaBiel = [
  dailyProposal({
    id: 'ens-falta-espai-per-jugar', code: 'S090', title: 'Ens falta espai per jugar', grade: '4', level: 'easy', genre: 'dialogue',
    voices: { Laia: 'Leda', Biel: 'Puck' }, delivery,
    summary: 'La Laia i en Biel es passen una pilota al parc. Una passada massa llarga els fa buscar un altre racó per continuar jugant.',
    editorialFocus: '4t accessible: un únic problema al parc, propostes curtes que s’ajusten entre tots dos i una decisió concreta. Situació present, sense plans professionals ni informació de fons per memoritzar.',
    soundPlan: park, illustrationBrief: 'Laia i Biel al parc, amb una pilota aturada al costat d’un d’ells i un camí al fons. No mostrar la ubicació final del joc, porteries improvisades ni la mida de les passades.',
    transcript: [
      d('Parc tranquil enregistrat, molt baix. El moviment de la pilota s’explica amb les veus; sense impactes ni terceres veus.'),
      s('pilota', 'Laia', 'Biel, la pilota! Agafa-la, que va cap al camí!'),
      s('agafar', 'Biel', 'Ja la tinc. Uf, gairebé toca aquell cotxet. M’has fet una passada llarguíssima.'),
      s('perdo', 'Laia', 'Ja, perdona. Volia que t’arribés per terra i ha botat. Aquí passa molta gent. Anem a jugar darrere del banc?'),
      s('banc', 'Biel', 'Allà? Però hi ha l’arbre al mig. Cada vegada que et passi la pilota em tocarà esquivar-lo.'),
      s('gespa', 'Laia', 'Doncs a l’herba, al costat de la font. Ara no hi ha ningú. Podríem posar les motxilles de porteria.'),
      s('font', 'Biel', 'És que la gent que va a beure passarà just per allà. I si ens posem una mica més enllà, cap a aquella paret?'),
      d('Mantenir el mateix parc. Canvi de lloc suggerit amb la conversa, sense passos aïllats ni pausa llarga.'),
      s('tria', 'Laia', 'Sí, allí hi ha més lloc. Però fem passades curtes, eh? Que si xuto fort em tocarà anar-la a buscar a mi.'),
      s('posar', 'Biel', 'Va. Jo em poso aquí i tu una mica més enllà. Les motxilles les deixem juntes al peu de l’arbre?'),
      s('motxilles', 'Laia', 'Sí. Espera, que tanco la meva, que se’m veuen tots els papers. Ara. Preparat?'),
      s('final', 'Biel', 'Preparat! I aquesta vegada passa-me-la baixeta, que jo de porter amb el cap no en sé gaire.'),
      d('Última frase completa i fosa curta del parc. Sense cop de pilota ni notes musicals de sortida.'),
    ],
    questions: [
      q('camino', 'Cap on va la primera pilota que s’escapa?', 'Cap al camí.', 1, [e('pilota', 'va cap al camí')]),
      q('cotxet', 'Què gairebé toca la pilota?', 'Un cotxet.', 1, [e('agafar', 'gairebé toca aquell cotxet')]),
      q('banc', 'Per què en Biel no vol jugar darrere del banc?', 'Perquè hi ha un arbre al mig.', 1, [e('banc', 'hi ha l’arbre al mig')]),
      q('font', 'Qui passaria pel mig si juguessin just al costat de la font?', 'La gent que va a beure.', 1, [e('font', 'la gent que va a beure passarà just per allà')]),
      q('final', 'Cap a on decideixen apartar-se per jugar?', 'Cap a una paret, una mica més enllà de la font.', 1, [e('font', 'una mica més enllà, cap a aquella paret'), e('tria', 'Sí, allí hi ha més lloc.')]),
      q('curtes', 'Com volen que siguin les passades al nou lloc?', 'Curtes, per terra o baixetes.', 1, [e('tria', 'fem passades curtes'), e('final', 'passa-me-la baixeta')]),
    ],
  }),
  dailyProposal({
    id: 'el-berenar-ben-pla', code: 'S091', title: 'El berenar ben pla', grade: '3', level: 'easy', genre: 'dialogue',
    image: {"src":"./assets/images/s091-publicacio-v1.jpg","alt":"La Laia i en Biel seuen en un banc del parc i miren una motxilla.","width":768,"height":512},
    seconds: 75, status: 'published', reviewStatus: 'validated',
    audio: './assets/audio/s091-mixed-v1.mp3', tracks: { introduction: './assets/audio/s091-mixed-v1-intro.mp3', body: './assets/audio/s091-mixed-v1-cos.mp3' },
    fragment: { start: 4.0200000000000005, seconds: 70 },
    voices: { Laia: 'Leda', Biel: 'Puck' }, delivery,
    summary: 'En un banc del parc, en Biel obre la motxilla per berenar. L’entrepà hi és, però té un aspecte ben diferent del que recordava.',
    editorialFocus: '3r accessible: una escena breu i divertida, una causa concreta, un petit oferiment i el gest de recollir abans de continuar. Sense salts temporals llargs ni vocabulari tècnic.',
    soundPlan: park, illustrationBrief: 'Laia i Biel asseguts en un banc del parc mirant una motxilla oberta. Un embolcall encara tancat a les mans d’en Biel. No mostrar què hi ha dins, pomes partides o la causa de l’aixafament.',
    transcript: [
      d('Parc tranquil enregistrat, molt baix. Sense sorolls d’embolcall o mossegades afegits.'),
      s('trobar', 'Biel', 'Un moment, que trec el berenar... El tenia aquí. Laia, mira això. Aquest matí el meu entrepà era el doble de gruixut!'),
      s('bossa', 'Laia', 'Però on l’has posat? A sota dels llibres?'),
      s('llibre', 'Biel', 'Sí. Hi havia el de la biblioteca i després hi he ficat la carpeta. Ha quedat tot a sobre. Ara tinc un entrepà que sembla un full.'),
      s('dins', 'Laia', 'De què és?'),
      s('formatge', 'Biel', 'De formatge. El formatge ja era pla, però el pa no tant. Almenys el paper és sencer i no m’ha quedat tot escampat.'),
      d('Somriure dins la veu, sense rialles llegides ni música còmica.'),
      s('poma', 'Laia', 'Jo porto una poma. La podem compartir, si vols. La meva mare l’ha tallada i l’ha posada en aquesta carmanyola.'),
      s('meitat', 'Biel', 'Va, gràcies. I vols mig entrepà? És petit, però encara en queda per a dos.'),
      s('tros', 'Laia', 'Sí, dona’m aquell tros de la punta. Així després ja podem anar als gronxadors. Ara s’han quedat buits.'),
      s('carmanyola', 'Biel', 'Espera, primer acabem, que amb la carmanyola oberta a la falda jo no pujo enlloc. Et passo la tapa?'),
      s('tapa', 'Laia', 'Sí, que la guardo. I el paper de l’entrepà posa’l a la teva bossa, que jo tinc les mans ocupades.'),
      s('final', 'Biel', 'Ja està. A sobre dels llibres, aquesta vegada! Va, ara sí, anem-hi.'),
      d('Acabar la frase i tancar amb una fosa curta del parc. Sense passos o gronxadors com a resposta sonora.'),
    ],
    questions: [
      q('aspecte', 'Què li ha passat a l’entrepà d’en Biel?', 'Ha quedat aixafat o molt pla.', 1, [e('llibre', 'Ara tinc un entrepà que sembla un full.')]),
      q('causa', 'Què havia quedat a sobre de l’entrepà?', 'El llibre de la biblioteca i la carpeta.', 1, [e('llibre', 'Hi havia el de la biblioteca i després hi he ficat la carpeta. Ha quedat tot a sobre.')]),
      q('formatge', 'De què és l’entrepà?', 'De formatge.', 1, [e('formatge', 'De formatge.')]),
      q('oferiment', 'Què ofereix la Laia a en Biel?', 'Compartir la poma que porta tallada.', 1, [e('poma', 'porto una poma. La podem compartir')]),
      q('jugar', 'On volen anar després de berenar?', 'Als gronxadors.', 1, [e('tros', 'després ja podem anar als gronxadors')]),
      q('recollir', 'Quines dues coses recullen abans de marxar del banc?', 'La carmanyola amb la tapa i el paper de l’entrepà.', 2, [e('carmanyola', 'Et passo la tapa?'), e('tapa', 'Sí, que la guardo. I el paper de l’entrepà posa’l a la teva bossa')]),
    ],
  }),
];
