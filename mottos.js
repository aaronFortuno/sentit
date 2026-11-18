export const mottos = {
  ca: [
    'Escoltar és seguir el fil.',
    'Escoltar és donar sentit a les paraules.',
    'Escoltar és descobrir què no s’ha dit.',
    'Escoltar és parar l’orella als detalls.',
    'Escoltar és fer lloc a una altra veu.',
    'Escoltar és deixar que una història arribi.',
    'Escoltar és entendre abans de respondre.',
    'Escoltar és lligar caps amb les orelles.',
    'Escoltar és seguir una pista invisible.',
    'Escoltar és canviar d’idea a mitja frase.',
    'Escoltar és trobar una pregunta nova.',
    'Escoltar és sentir-hi una mica més.',
  ],
  es: [
    'Escuchar es seguir el hilo.',
    'Escuchar es dar sentido a las palabras.',
    'Escuchar es descubrir lo que no se ha dicho.',
    'Escuchar es prestar atención a los detalles.',
    'Escuchar es hacer sitio a otra voz.',
    'Escuchar es dejar que llegue una historia.',
    'Escuchar es entender antes de responder.',
    'Escuchar es atar cabos con los oídos.',
    'Escuchar es seguir una pista invisible.',
    'Escuchar es cambiar de idea a mitad de frase.',
    'Escuchar es encontrar una pregunta nueva.',
    'Escuchar es oír un poco más.',
  ],
};

export function nextMotto(previous = -1, random = Math.random) {
  const count = mottos.ca.length;
  return previous < 0 ? Math.floor(random() * count) : (previous + 1 + Math.floor(random() * (count - 1))) % count;
}
