// Editorial connections, not a required episode order or a new spoken programme title.
// A narrated character can link stories without being a participating voice.
export const universes = [
  {
    id: 'laia-biel',
    name: { ca: 'Laia i Biel', es: 'Laia y Biel' },
    description: { ca: 'Descobertes, entrevistes i projectes dels dos joves, junts o per separat.', es: 'Descubrimientos, entrevistas y proyectos de los dos jóvenes, juntos o por separado.' },
    activities: ['ca-S001','ca-S003','ca-S005','ca-S007','ca-S010','ca-S011','ca-S012','ca-S014','ca-S015','ca-S017','ca-S019','ca-S021','ca-S024'],
  },
  {
    id: 'aina-ferran',
    name: { ca: 'L’Aina i l’avi Ferran', es: 'Aina y el abuelo Ferran' },
    description: { ca: 'Petits misteris, fotografies i records familiars de l’Aina i el seu avi.', es: 'Pequeños misterios, fotografías y recuerdos familiares de Aina y su abuelo.' },
    activities: ['ca-S004','ca-S004D','ca-S008','ca-S008R','ca-S018','ca-S022'],
  },
  {
    id: 'amb-mireia',
    name: { ca: 'Amb la Mireia', es: 'Con Mireia' },
    description: { ca: 'Explicacions, experiments i projectes guiats per la Mireia.', es: 'Explicaciones, experimentos y proyectos guiados por Mireia.' },
    activities: ['ca-S002','ca-S007','ca-S011','ca-S013','ca-S014','ca-S017','ca-S020','ca-S021'],
  },
  {
    id: 'noticies-mar',
    name: { ca: 'Les notícies de la Mar', es: 'Las noticias de Mar' },
    description: { ca: 'Notícies de ficció del barri presentades per la Mar, amb dades, testimonis i qüestions obertes.', es: 'Noticias de ficción del barrio presentadas por Mar, con datos, testimonios y cuestiones abiertas.' },
    activities: ['ca-S006','ca-S009','ca-S016','ca-S023'],
  },
];

export const universeName = (universe, language = 'ca') => universe.name[language] ?? universe.name.ca;
export const universesForActivity = entry => universes.filter(universe => universe.activities.includes(`${entry?.language}-${entry?.code}`));
export function matchesUniverse(entry, selected) {
  if (!selected) return true;
  const linked = universesForActivity(entry);
  return selected === 'independent' ? linked.length === 0 : linked.some(universe => universe.id === selected);
}
