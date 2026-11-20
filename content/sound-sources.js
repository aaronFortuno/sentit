// External recordings retain their own licence; the project's MIT does not replace it.
export const soundSources = [{
  id: 'khenshom-guitar-537084',
  title: 'Guitar string snap or breaks - various sounds',
  author: 'khenshom',
  url: 'https://freesound.org/people/khenshom/sounds/537084/',
  license: 'CC0 1.0',
  licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
  origin: 'external-recording',
  description: 'Gravació real de cordes de guitarra que es destensen, amb micròfon Sennheiser MKE600 i Zoom H5, segons l’autor.',
  file: 'assets/audio/sources/khenshom-537084-guitar.mp3',
  rendition: 'Còpia pública HQ en MP3 de Freesound; no és el WAV original.',
  downloadUrl: 'https://cdn.freesound.org/previews/537/537084_6652872-hq.mp3',
  retrievedAt: '2026-11-20',
  sha256: 'b27703e3f933ea2588d9b6384148fcf278097247800391b236291a359950f252',
  usedBy: ['ca-S012'],
  excerpt: { start: 2.7, end: 5.4 },
  treatment: 'Fragment breu de context abans de la parla; ajust de nivell i conversió a mono. Sense canvi de to ni velocitat, sense síntesi i sense comparació abans/després.',
}];

export function soundSourcesForActivity(entry) {
  return soundSources.filter(source => source.usedBy.includes(`${entry?.language}-${entry?.code}`));
}
