import { proposal, direction as d, spoken as s, question as q, evidence as e } from '../proposal.js';

const voices = { Laia: 'Leda', Nora: 'Kore' };
const soundCredits = 'Ambients i accions previstos de mostres enregistrades reals amb llicència lliure, encara pendents de seleccionar, acreditar i retallar. No hi ha àudio nou. Sintonia opcional entre les ja aprovades, sense atribuir una gravació encara inexistent.';
const delivery = 'Laia i Nora, Leda i Kore, en una conversa de descoberta per a la ràdio escolar. Laia pregunta per coses que té al davant i parla amb vocabulari corrent. Nora respon com una adulta propera que mostra un exemple concret; deixa temps per a la reacció de la jove. Salutació i comiat mutu. Cap veu addicional, moralina o narració solemne.';
const soundPlan = 'Entrada de dos segons d’estança enregistrada, sense converses intel·ligibles. Fons molt baix sota les veus. Paper o cartró real només en la pausa prevista, fora de les dades essencials. No fer sonar cap aparell de l’exposició ni afegir pistes que responguin preguntes. En acabar, pujar suaument el fons durant dos segons, fondre’l durant dos segons i conservar 600 ms de silenci. Sintonia opcional comuna de ràdio, amb recurs ja aprovat.';

export const nora = [
  proposal({
    id: 'el-cartellet-que-quedava-amagat', code: 'S051', title: 'El cartellet que quedava amagat', grade: '4', level: 'easy', genre: 'interview', universeIds: ['radio-escola'],
    summary: 'La Nora prepara una mostra d’objectes antics i demana a la Laia que provi de llegir-ne una explicació. Des de l’altra banda de la taula no es veu tan bé com semblava.',
    voices, delivery, soundPlan, soundCredits,
    editorialFocus: '4t accessible: comprendre una prova que es fa des del lloc del visitant, seguir dues correccions concretes i distingir el cartell general del nom d’un objecte. Set preguntes sustentades en el que es diu, sense dades que només apareguin en una imatge.',
    illustrationBrief: 'Laia i Nora a les dues bandes d’una taula de taller amb fulls en blanc. Sense ràdio, posició de cartellets, paraules, colors identificadors ni resposta visible.',
    transcript: [
      d('Estança real durant dos segons. L’ambient baixa abans de la salutació; no s’escolta cap aparell antic.'),
      s('hola', 'Laia', 'Hola, Nora! Avui també porto la gravadora. Veig que ja tens gairebé a punt la mostra de coses antigues. Aquesta ràdio tan grossa, la deixareu damunt de la taula?'),
      s('prova', 'Nora', 'Hola, Laia! Sí, anirà aquí. Estic preparant els cartellets que expliquen cada objecte. Em va bé que hagis vingut. Posa’t a l’altra banda de la taula, com si acabessis d’entrar a la sala, i prova de llegir el que diu el de la ràdio.'),
      s('tapat', 'Laia', 'Des d’aquí només veig les primeres paraules. La resta queda al darrere de la ràdio. Si m’ajupo, encara es veu menys.'),
      s('davant', 'Nora', 'Tens raó. L’he estat llegint des del meu costat mentre el col·locava. El posaré davant de la ràdio, sobre aquest suport baix de cartró. Així el paper quedarà una mica inclinat cap a tu. A veure ara.'),
      s('lletra', 'Laia', 'Ara ja el veig tot. Diu com es diu la ràdio i qui us la va portar. Però les lletres de sota són molt petites. M’he d’acostar força per poder-les llegir.'),
      d('Pausa curta amb paper real mogut suaument. Conservar l’ambient sense canvis de volum que assenyalin una resposta.'),
      s('canvi', 'Nora', 'Faré la lletra més gran. Aquesta frase explica que a casa seva s’asseien al voltant de la ràdio per escoltar els partits. Vull que es pugui llegir des d’on ets tu, sense haver de posar el cap damunt de la taula.'),
      s('pregunta', 'Laia', 'I aquell cartell gran de la paret també parla d’aquesta ràdio? Aquell sí que el llegeixo bé, fins i tot des de la porta.'),
      s('paret', 'Nora', 'El de la paret presenta tota la mostra. Explica que veureu coses de casa que es feien servir abans: una ràdio, una planxa, una capsa per cosir. Després, al costat de cada objecte, hi haurà la seva explicació curta.'),
      s('tornar', 'Laia', 'Doncs quan tinguis la lletra més gran t’ho torno a llegir des d’aquí. Ara ja entenc per què m’has fet canviar de costat! Gràcies per deixar-nos veure com ho prepares.'),
      s('final', 'Nora', 'Gràcies a tu per provar-ho. Deixo el cartellet en aquest suport i vaig a buscar un full nou. Queda’t aquí, que de seguida el tindrem.'),
      d('Final de veu íntegre; pujada de fons de dos segons, fosa de dos segons i 600 ms de silenci. Cap altra conversa.'),
    ],
    questions: [
      q('objecte', 'Quin objecte antic estan preparant al començament?', 'Una ràdio grossa.', 1, [e('hola', 'Aquesta ràdio tan grossa')]),
      q('costat', 'On demana la Nora que es posi la Laia per fer la prova?', 'A l’altra banda de la taula, al lloc des d’on miraria un visitant.', 2, [e('prova', 'Posa’t a l’altra banda de la taula, com si acabessis d’entrar a la sala')]),
      q('tapat', 'Què tapa una part del primer cartellet?', 'La ràdio.', 1, [e('tapat', 'La resta queda al darrere de la ràdio.')]),
      q('suport', 'On posa la Nora el cartellet perquè es vegi sencer?', 'Davant de la ràdio, en un suport baix de cartró que l’inclina cap a la Laia.', 2, [e('davant', 'El posaré davant de la ràdio, sobre aquest suport baix de cartró.')]),
      q('lletres', 'Què canviarà del text després de moure el cartellet?', 'Farà la lletra més gran.', 1, [e('canvi', 'Faré la lletra més gran.')]),
      q('paret', 'Què presenta el cartell gran de la paret?', 'Tota la mostra, amb diferents coses antigues de casa, no només la ràdio.', 2, [e('paret', 'El de la paret presenta tota la mostra.')]),
      q('repetir', 'Quina prova ofereix repetir la Laia quan el text estigui canviat?', 'Tornar-lo a llegir des de l’altra banda de la taula per veure si s’entén i es veu bé.', 2, [e('tornar', 'quan tinguis la lletra més gran t’ho torno a llegir des d’aquí')]),
    ],
  }),
  proposal({
    id: 'la-capsa-que-semblava-un-llibre', code: 'S052', title: 'La capsa que semblava un llibre', grade: '4', level: 'middle', genre: 'interview', universeIds: ['radio-escola'],
    summary: 'La Laia confon una capsa tancada amb un llibre antic. La Nora li mostra com s’obre i què n’ha explicat la família que l’ha portada.',
    voices, delivery, soundPlan, soundCredits,
    editorialFocus: '4t intermèdia: revisar una primera interpretació a partir d’una observació i relacionar forma, ús i informació aportada per una família. Set preguntes, inclosa una comparació breu entre el que Laia pensa al principi i el que descobreix.',
    illustrationBrief: 'Laia amb una gravadora escolta Nora en un taller amb prestatges genèrics al fons. Sense capsa, llibre, cartes, calaixos ni interior visible.',
    transcript: [
      d('Dos segons d’estança real. Fons discret sota totes dues veus; cap so d’obertura abans de presentar l’objecte.'),
      s('hola', 'Laia', 'Bon dia, Nora! He vingut a fer l’altra gravació per a la ràdio. Mira, aquest llibre vermell el podríem posar al costat de les fotos. Té unes lletres daurades molt boniques.'),
      s('capsa', 'Nora', 'Bon dia, Laia! Sembla un llibre, oi? Però és una capsa de fusta. Mira-la per aquest costat: aquí on esperaries trobar els fulls, tot és llis. La tapa es pot obrir com la coberta d’un llibre, però a dins hi ha un espai buit.'),
      s('tocar', 'Laia', 'Ah, jo només l’havia mirat pel davant! La puc obrir o t’has d’encarregar tu?'),
      s('obrir', 'Nora', 'L’obriré jo, que la tapa s’enganxa una mica quan arriba al final. Tu mira des d’aquí. Veus que a dins hi ha dos espais? Un de llarg i estret al costat i un de més ample al mig.'),
      s('us', 'Laia', 'Sí. Al llarg hi cabria un llapis. La feien servir per guardar els llapis?'),
      s('familia', 'Nora', 'La família que ens l’ha portada ens ha explicat que era de la seva besàvia. Hi guardava cartes i una ploma per escriure. Tenia un mànec de fusta i una punta de metall que mullava en tinta. La ploma anava a l’espai estret; les cartes quedaven plegades al més ample.'),
      d('Pausa breu de paper real, sense llegir una carta ni fer sentir el plomí escrivint. La capsa es manté oberta durant el diàleg.'),
      s('cartes', 'Laia', 'Les cartes també les veurem a la mostra? M’agradaria saber què hi deia.'),
      s('copia', 'Nora', 'La família se les ha quedades. Ens ha deixat fotografiar una de les cartes i en farem una còpia per posar al costat de la capsa. Així la gent la podrà llegir i l’original es quedarà a casa seva.'),
      s('llibre', 'Laia', 'Jo m’he acostat pensant que podria llegir aquest llibre i resulta que el que llegirem anirà al costat! Em deixes gravar també la teva explicació de com s’obre?'),
      s('final', 'Nora', 'I tant. Gràcies per venir, Laia. Espera que deixo la tapa a mig obrir, perquè després la pugui tornar a moure sense estirar-la. Quan tinguis la gravadora a punt, m’avises.'),
      d('Deixar la darrera frase sencera. Pujada d’ambient de dos segons, fosa i 600 ms finals; no afegir la segona gravació ni un nou comiat.'),
    ],
    questions: [
      q('principi', 'Què pensa la Laia que és l’objecte vermell al principi?', 'Un llibre.', 1, [e('hola', 'aquest llibre vermell')]),
      q('real', 'Què és en realitat?', 'Una capsa de fusta que té forma de llibre.', 1, [e('capsa', 'Però és una capsa de fusta.')]),
      q('tapa', 'Per què l’obre la Nora en lloc de la Laia?', 'Perquè la tapa s’enganxa una mica quan arriba al final.', 1, [e('obrir', 'L’obriré jo, que la tapa s’enganxa una mica quan arriba al final.')]),
      q('guardar', 'Quines dues coses hi guardava la besàvia?', 'Cartes i una ploma per escriure.', 1, [e('familia', 'Hi guardava cartes i una ploma per escriure.')]),
      q('espais', 'A quin espai anaven les cartes: a l’estret o al més ample?', 'Al més ample, plegades.', 1, [e('familia', 'les cartes quedaven plegades al més ample')]),
      q('mostra', 'Què podrà llegir la gent al costat de la capsa?', 'Una còpia d’una de les cartes que la família ha deixat fotografiar.', 2, [e('copia', 'en farem una còpia per posar al costat de la capsa')]),
      q('original', 'Per què faran servir una còpia a la mostra?', 'Perquè la família es quedi la carta original i els visitants la puguin llegir igualment.', 2, [e('copia', 'Així la gent la podrà llegir i l’original es quedarà a casa seva.')]),
    ],
  }),
];
