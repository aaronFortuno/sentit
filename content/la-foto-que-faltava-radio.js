import { foto } from './la-foto-que-faltava.js';

const direction = text => ({ kind: 'direction', text });

// A separate proposal keeps the published ca-S008 recording and classroom links stable.
export const fotoRadio = {
  id: 'la-foto-que-faltava-radio', code: 'S008R', language: 'ca',
  title: 'La foto que faltava · Històries amb sentit',
  summary: 'Un programa de ràdio amb una narradora, un àlbum i una primera impressió que cal comprovar.',
  grade: '4', level: 'easy', genre: 'story', seconds: 105,
  status: 'published', reviewStatus: 'validated',
  durationEstimate: { min: 110, max: 135 },
  audio: './assets/audio/s008r-la-foto-que-faltava-radio-v1.mp3',
  fragment: { start: 5.11, seconds: 100 },
  tracks: { introduction: './assets/audio/s008-la-foto-que-faltava-v2-intro.mp3', body: './assets/audio/s008r-la-foto-que-faltava-radio-v1-cos.mp3' },
  recordingCues: [
    { before: 'benvinguda', text: '[Sona una breu sintonia del programa, que baixa abans de la veu.]' },
    { before: 'album', text: '[La música acompanya el relat suaument, per sota de la narradora.]' },
    { before: 'mirar', text: '[Se sent passar una pàgina, breument, sobre el fons musical.]' },
    { after: 'comiat', text: '[La música puja quan acaba la veu, es fon i deixa silenci.]' },
  ],
  image: { ...foto.image },
  introduction: 'Comprensió oral. La foto que faltava.',
  generationPlan: {
    note: 'Dues pistes de veu, però només una petició nova prevista: el títol pot reutilitzar la presa d’Aoede de S008. Si es canvien la veu o les paraules del títol, caldrà una petició addicional. La música, els efectes i les pauses es munten localment i no consumeixen peticions de TTS.',
    takes: [
      { id: 'S008R-T01', label: 'Presentació', parts: ['introduction'], requests: 0, reuse: 'published', source: './assets/audio/s008-la-foto-que-faltava-v2-intro.mp3', note: 'Presa existent amb Aoede. S’aprofita si la presentació actual és adequada.' },
      { id: 'S008R-T02', label: 'Programa complet', parts: ['benvinguda', ...foto.transcript.filter(part => part.speaker).map(part => part.id), 'comiat'], requests: 1, note: 'Una sola petició amb la mateixa narradora: benvinguda, els sis paràgrafs del relat i comiat. Les anotacions de muntatge no s’envien com a text parlat.' },
    ],
  },
  productionNotes: [
    'Proposta de revisió. Una única narradora adulta, amb la veu Aoede proposada. L’Aina i l’avi apareixen al relat, però no tenen veus pròpies. La benvinguda i el comiat els diu la mateixa narradora.',
    'Les anotacions de muntatge no es llegeixen en veu alta. La música i els efectes seran originals de Sentit, sense gravacions externes previstes. Cal validar el conjunt abans de sintetitzar.',
  ],
  transcript: [
    direction('Entrada del programa: separador musical original de dos segons. Comença sol i baixa suaument abans de la benvinguda, sense tapar la primera consonant.'),
    { id: 'benvinguda', speaker: 'Narradora', text: 'Benvingudes i benvinguts a Històries amb sentit. Avui: La foto que faltava.' },
    direction('El separador es fon amb una base instrumental càlida i discreta. La música continua sota el relat, clarament per sota de la veu, i s’atenua encara més mentre parla. No hi ha una segona veu ni sons de l’Aina o de l’avi.'),
    ...foto.transcript.slice(0, 3),
    direction('Pausa breu entre blocs. Se sent passar una pàgina durant aproximadament mig segon. El so pot coincidir amb el fons musical i acabar sota l’inici de la frase següent, sense emmascarar-la. És un únic detall d’ambient, no un efecte a cada menció de la fotografia.'),
    ...foto.transcript.slice(3),
    direction('Pausa breu després de l’última frase. La música continua baixa mentre es presenta el comiat.'),
    { id: 'comiat', speaker: 'Narradora', text: 'Gràcies per escoltar Històries amb sentit. Ens retrobem al pròxim programa.' },
    direction('Quan acaba la veu, la base puja suaument durant dos segons i es fon. Es conserva una cua de silenci d’almenys mig segon, sense retallar l’últim so de la narradora.'),
  ],
  questions: structuredClone(foto.questions),
};
