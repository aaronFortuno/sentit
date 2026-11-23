// Editorial connections, not a required episode order or a new spoken programme title.
// A narrated character can link stories without being a participating voice.
export const universes = [
  {
    id: 'situacions-quotidianes',
    name: { ca: 'Situacions quotidianes', es: 'Situaciones cotidianas' },
    description: { ca: 'Trobades, compres i petites converses del dia a dia, amb persones conegudes o convidats ocasionals.', es: 'Encuentros, compras y pequeñas conversaciones del día a día, con personas conocidas o invitados ocasionales.' },
    activities: [],
  },
  {
    id: 'laia-biel',
    name: { ca: 'Les troballes de la Laia i en Biel', es: 'Los hallazgos de Laia y Biel' },
    description: { ca: 'Descobertes, entrevistes i projectes dels dos joves, junts o per separat.', es: 'Descubrimientos, entrevistas y proyectos de los dos jóvenes, juntos o por separado.' },
    activities: ['ca-S001','ca-S003','ca-S005','ca-S007','ca-S010','ca-S011','ca-S012','ca-S014','ca-S015','ca-S017','ca-S019','ca-S021','ca-S024'],
  },
  {
    id: 'aina-ferran',
    name: { ca: 'Els records de l’avi Ferran', es: 'Los recuerdos del abuelo Ferran' },
    description: { ca: 'Petits misteris, fotografies i records familiars de l’Aina i el seu avi.', es: 'Pequeños misterios, fotografías y recuerdos familiares de Aina y su abuelo.' },
    activities: ['ca-S004','ca-S004D','ca-S008','ca-S008R','ca-S018','ca-S022'],
  },
  {
    id: 'amb-mireia',
    name: { ca: 'A classe amb la Mireia', es: 'En clase con Mireia' },
    description: { ca: 'Explicacions, experiments i projectes guiats per la Mireia.', es: 'Explicaciones, experimentos y proyectos guiados por Mireia.' },
    activities: ['ca-S002','ca-S007','ca-S011','ca-S013','ca-S014','ca-S017','ca-S020','ca-S021'],
  },
  {
    id: 'noticies-mar',
    name: { ca: 'Les notícies de la Mar', es: 'Las noticias de Mar' },
    description: { ca: 'Notícies de ficció del barri presentades per la Mar, amb dades, testimonis i qüestions obertes.', es: 'Noticias de ficción del barrio presentadas por Mar, con datos, testimonios y cuestiones abiertas.' },
    activities: ['ca-S006','ca-S009','ca-S016','ca-S023'],
  },
  {
    id: 'radio-escola',
    name: { ca: 'Ràdio de l’escola', es: 'Radio de la escuela' },
    description: { ca: 'Entrevistes, converses i curiositats de la ràdio escolar, amb un to proper i menys formal que l’informatiu.', es: 'Entrevistas, conversaciones y curiosidades de la radio escolar, con un tono cercano y menos formal que el informativo.' },
    activities: ['ca-S001'],
  },
  {
    id: 'histories-sentit',
    name: { ca: 'Històries amb sentit', es: 'Historias con sentido' },
    description: { ca: 'Relats del programa de narracions: històries independents, amb benvinguda, comiat i ambientació sonora.', es: 'Relatos del programa narrativo: historias independientes, con bienvenida, despedida y ambientación sonora.' },
    activities: ['ca-S008R'],
  },
];

export const universeName = (universe, language = 'ca') => universe.name[language] ?? universe.name.ca;
export const universesForActivity = entry => universes.filter(universe => universe.activities.includes(`${entry?.language}-${entry?.code}`) || entry?.universeIds?.includes(universe.id));
export function matchesUniverse(entry, selected) {
  if (!selected) return true;
  const linked = universesForActivity(entry);
  return selected === 'independent' ? linked.length === 0 : linked.some(universe => universe.id === selected);
}
