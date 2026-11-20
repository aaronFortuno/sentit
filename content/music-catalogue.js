// Background compositions, separate from recurring programme jingles.
// Register a new composition for each narration; never reuse a track silently.
export const musicCatalogue = [
  {
    id: 'sentit-fil-per-seguir-v1', title: 'Un fil per seguir', kind: 'narration-bed',
    author: 'Sentit', license: 'MIT', licenseUrl: 'https://github.com/aaronFortuno/sentit/blob/main/LICENSE',
    origin: 'original-procedural', externalSamples: false,
    source: 'tools/s004-music.cjs', usedBy: ['ca-S004', 'ca-S004D'],
    sharedReason: 'Composició compartida intencionadament entre la narració i la versió dialogada de la mateixa història, amb durades i mescles pròpies.',
    description: 'Piano suau i làmines de fusta espaiades en Fa major, 68 pulsacions per minut; melodia i harmonia pròpies.',
  },
  {
    id: 'sentit-foto-arpegi-v1', title: 'Una foto per recordar', kind: 'narration-bed',
    author: 'Sentit', license: 'MIT', licenseUrl: 'https://github.com/aaronFortuno/sentit/blob/main/LICENSE',
    origin: 'original-procedural', externalSamples: false,
    source: 'tools/render-radio.cjs', usedBy: ['ca-S008', 'ca-S008R'],
    sharedReason: 'Dos arranjaments de la mateixa composició per a les dues versions de la mateixa història.',
    arrangements: [{activity:'ca-S008',source:'tools/finish-s008-tail.cjs'},{activity:'ca-S008R',source:'tools/render-radio.cjs'}],
    description: 'Arpegi original en Do i baix suau. Mateix motiu a l’original i la revisió radiofònica, amb mescles i foses pròpies.',
  },
  {
    id: 'sentit-records-guardats-v1', title: 'Records guardats', kind: 'narration-bed',
    author: 'Sentit', license: 'MIT', licenseUrl: 'https://github.com/aaronFortuno/sentit/blob/main/LICENSE',
    origin: 'original-procedural', externalSamples: false,
    source: 'tools/s018-music.cjs', usedBy: ['ca-S018'],
    description: 'Piano lent, harmonia major càlida i percussió afinada molt espaiada; 72 pulsacions per minut.',
  },
  {
    id: 'sentit-tramvia-records-v1', title: 'Rails de memòria', kind: 'narration-bed',
    author: 'Sentit', license: 'MIT', licenseUrl: 'https://github.com/aaronFortuno/sentit/blob/main/LICENSE',
    origin: 'original-procedural', externalSamples: false,
    source: 'tools/s022-music.cjs', usedBy: ['ca-S022'],
    description: 'Corda polsada, piano sord i poc pad en Sol major; 60 pulsacions per minut i fraseig propi.',
  },
];

export function musicForActivity(entry) {
  const activity=`${entry?.language}-${entry?.code}`;
  const track=musicCatalogue.find(track => track.usedBy.includes(activity));
  if(!track)return null;
  const arrangement=track.arrangements?.find(item=>item.activity===activity);
  return arrangement?{...track,source:arrangement.source}:track;
}
