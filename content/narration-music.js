// Library selection and audition samples. Activity assignments still require a montage record.
const licenseUrl = 'https://creativecommons.org/licenses/by/4.0/';
const approved=new Set(['F1','L1','L2','L3','M1','M2','M3']);
const retired=new Set(['F2','F3']);
const candidate = (id, universe, title, isrc, ca, es) => ({
  id, universe, title, isrc, author: 'Kevin MacLeod',
  status:approved.has(id)?'approved':id==='F2'?'excluded':id==='F3'?'deferred':'candidate',
  active:!retired.has(id),reviewedAt:approved.has(id)||retired.has(id)?'2026-11-26':null,
  license: 'CC BY 4.0', licenseUrl,
  sourceUrl: `https://incompetech.com/music/royalty-free/index.html?isrc=${isrc}`,
  downloadUrl: `https://incompetech.com/music/royalty-free/mp3-royaltyfree/${encodeURIComponent(title)}.mp3`,
  preview: `./assets/audio/music-previews/${id}.mp3`,
  excerpt: { start: 6, seconds: 32 },
  description: { ca, es },
});
export const narrationMusic = [
  candidate('F1', 'faules-mon', 'Easy Lemon', 'USUAN1200076', 'Guitarra i marimba, càlida i tranquil·la. Primera candidata per a relats senzills.', 'Guitarra y marimba, cálida y tranquila. Primera candidata para relatos sencillos.'),
  candidate('F2', 'faules-mon', 'Carefree', 'USUAN1400037', 'Ukelele i percussió lleugera, més alegre i juganera.', 'Ukelele y percusión ligera, más alegre y juguetona.'),
  candidate('F3', 'faules-mon', 'Dreamy Flashback', 'USUAN1100532', 'Arpa, campanes i cordes pinçades; un aire de conte més màgic.', 'Arpa, campanas y cuerdas pulsadas; un aire de cuento más mágico.'),
  candidate('F4', 'faules-mon', 'Windswept', 'USUAN1100757', 'Guitarra i cordes, pausada i càlida. Una alternativa amb aire acústic per acompanyar el relat.', 'Guitarra y cuerdas, pausada y cálida. Una alternativa con aire acústico para acompañar el relato.'),
  candidate('F5', 'faules-mon', 'Fresh Air', 'USUAN1500084', 'Piano sol i tranquil, amb espai entre les frases musicals.', 'Piano solo y tranquilo, con espacio entre las frases musicales.'),
  candidate('F6', 'faules-mon', 'Almost New', 'USUAN1800008', 'Piano i baixos, amb un punt de misteri suau per a relats de descoberta.', 'Piano y bajos, con un punto de misterio suave para relatos de descubrimiento.'),
  candidate('F7', 'faules-mon', 'The Forest and the Trees', 'USUAN1100766', 'Clarinet, flauta i metalls suaus; una textura de conte vinculada a la natura.', 'Clarinete, flauta y metales suaves; una textura de cuento vinculada a la naturaleza.'),
  candidate('L1', 'llegendes-mon', 'Teller of the Tales', 'USUAN1400020', 'Llaüt i guitarra, íntima i continguda. Primera candidata per a llegendes.', 'Laúd y guitarra, íntima y contenida. Primera candidata para leyendas.'),
  candidate('L2', 'llegendes-mon', 'Folk Round', 'USUAN1100357', 'Roda folk amb cordes i flauta; un aire de relat popular.', 'Ronda folk con cuerdas y flauta; un aire de relato popular.'),
  candidate('L3', 'llegendes-mon', 'Angevin', 'USUAN1200110', 'Flauta i llaüt amb un tempo lent; més ombrívola i misteriosa.', 'Flauta y laúd con un tempo lento; más sombría y misteriosa.'),
  candidate('M1', 'mites-antiguitat', 'Temple of the Manes', 'USUAN1100053', 'Arpes, flautes i oboè; una atmosfera antiga. Primera candidata per a S130.', 'Arpas, flautas y oboe; una atmósfera antigua. Primera candidata para S130.'),
  candidate('M2', 'mites-antiguitat', 'Desert City', 'USUAN1100564', 'Dulcimer i percussió, més rítmica i amb sensació de viatge.', 'Dulcémele y percusión, más rítmica y con sensación de viaje.'),
  candidate('M3', 'mites-antiguitat', 'Virtutes Instrumenti', 'USUAN1100801', 'Viola i bordó sostingut, més solemne i pausada.', 'Viola y bordón sostenido, más solemne y pausada.'),
];
export const narrationMusicGroups = [
  { id: 'faules-mon', ca: 'Faules del món', es: 'Fábulas del mundo' },
  { id: 'llegendes-mon', ca: 'Llegendes d’aquí i d’arreu', es: 'Leyendas de aquí y de allá' },
  { id: 'mites-antiguitat', ca: 'Mites de l’antiguitat', es: 'Mitos de la antigüedad' },
];
