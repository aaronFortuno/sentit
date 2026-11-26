# Reproducció modular sense duplicar el muntatge

Canvi autoritzat pel docent el **26/11/2026**: publicar només el títol i el relat separats, amb el muntatge complet conservat en local. El relat ja incorpora les veus, la música i els efectes del muntatge vigent. No és una gravació de veu seca ni una reducció de qualitat.

## Canvi de publicació

| Representació dels 130 exercicis muntats | Fitxers | Espai | Destinació |
| --- | ---: | ---: | --- |
| Títol + relat separats | 260 | **169,98 MB** | Web i producció local |
| Muntatge complet equivalent | 130 | **170,03 MB** | Arxiu local |

Els efectes, músiques, sintonies, instruccions comunes i comparacions pendents continuen al web. La mostra tècnica antiga sense pistes separades manté el seu únic fitxer, per compatibilitat. Cap petició a Gemini ni cap transcodificació dels MP3 existents.

## Què sent l’usuari

- **Escolta la comprensió:** un únic botó i una sola barra de temps. Encadena el títol i el relat i permet avançar, retrocedir, reprendre i tornar a començar entre tots dos.
- **Sessió pautada:** conserva el títol inicial, les locucions opcionals, els temps configurats, les repeticions del relat, la sintonia i el ritme.
- **Enllaç directe sense sessió pautada:** també encadena les dues pistes; no necessita el màster complet.
- **Prova de la sessió completa:** conserva les mateixes pistes i configuració, ometent les esperes com abans.

Els enllaços i QR ja impresos conserven idioma, codi i configuració. No depenen del nom d’un MP3 concret.

La durada coneguda de cada pista permet situar la barra abans de començar. Cada fragment arriba al seu final natural: no es talla una frase amb un temporitzador. La reproducció continua al reproductor natiu del navegador, amb preservació del to quan el docent canvia la velocitat.

Descarregar una sessió composta seria una funcionalitat possible més endavant, però no és necessària per a aquesta reproducció i no s’implementa en aquest canvi.

## Dades i traçabilitat

- `entry.audio`: identificador del màster de referència, disponible a l’arxiu local. Es conserva perquè les aprovacions, eines i registres de producció continuïn identificant exactament el muntatge.
- `entry.tracks.introduction` i `entry.tracks.body`: MP3 publicats.
- `content/modular-audio.js`: durades i SHA-256 de les pistes, més el camí i SHA-256 del màster local.
- `activity-audio.js`: selecció de pistes de servei, amb compatibilitat per al pilot històric d’un sol fitxer.
- `track-player.js`: línia temporal única per a l’escolta del docent; controla canvis de pista, salts, pauses, final, errors i reintents.
- `guided-player.js`: composició de la sessió per al QR i la prova docent. Tant el mode pautat com el simple utilitzen les pistes separades.

No es modifiquen el guió, les preguntes, les aprovacions ni les veus. El nou registre no substitueix les aprovacions perceptives: documenta la representació de servei del mateix àudio.

## Arxiu i manteniment

El tancament de cada lectura utilitza `node tools/prepare-publication.mjs --apply` i, després de preparar el commit, `--check`. La neteja de fitxers de servei, les comprovacions, el seguiment i l’informe de l’historial formen part d’aquest mateix pas, sense aprovacions o síntesi automàtiques.

`node tools/public-audio.mjs --apply` genera o actualitza les durades i empremtes, arxiva còpies verificades dels fitxers de producció i retira de Git només els que no necessita la web. Conserva els originals a les seves ubicacions de treball, ara ignorades, i còpies amb manifest a `../output/sentit-production-archive/2026-11-26/`.

Els generadors poden continuar produint el màster complet en local per a futures rectificacions. No s’ha de tornar a afegir al web si ja hi ha títol i relat. Després d’un render nou, actualitzar el registre amb l’eina de publicació abans de pujar. Un clon net pot comprovar o servir el catàleg amb les pistes publicades; per refer un muntatge cal recuperar el material local de producció.

L’arxiu reutilitza còpies idèntiques entre dates a partir de les empremtes; cada dia pot tenir el seu manifest sense tornar a copiar tots els MP3. Les revisions de contingut noves es preserven per separat.

## Comprovacions

- `node tools/check-modular-audio.mjs`: totes les pistes, durades, rutes i empremtes; compara també el màster local quan hi és.
- `node tools/check-modular-player.mjs`: transicions naturals, salts entre pistes, pausa, represa, inici de nou, velocitat, canvi d’activitat i reintent després d’un error.
- `node tools/check-sound.cjs`: temps reals de les pauses, locucions, repeticions, sintonia, preservació de to i mode simple amb pistes separades.
- `node tools/check-modular-audio-ui.cjs`: navegador local amb tres pistes reals de tipologies diferents, barra conjunta, canvis de pista, velocitat, sessió docent i QR simple i repetit. Comprova que no es demana cap dels màsters complets.
- `node tools/public-audio.mjs --check`: només fitxers de servei seguits per Git, amb empremtes correctes i sense reproductors de proves apuntant a còpies locals.

Les proves de publicació es repeteixen des d’una exportació neta, perquè l’arbre de treball encara conté els màsters locals i podria amagar una dependència incorrecta.

## Espai i historial

L’arbre publicable passa d’uns **468 a 298 MB**, amb un estalvi addicional de **170 MB**. Eliminar només del commit actual no allibera l’historial anterior: la neteja es completa amb el mateix procediment autoritzat de còpia completa, filtratge en còpia independent, verificació d’arbre idèntic i pujada protegida, segons `docs/neteja-audio.md`.

**Neteja completada:** s’han retirat les 130 rutes també de l’historial, amb acceptació de la pujada protegida i sincronització local. Els 151 commits previs a aquest registre es conserven; l’arbre actual del canvi és idèntic abans/després del filtratge (`26ddd9d35bac3d5f7da8c855a890e845dcbf66b2`). `git fsck` correcte i comprovació de publicació superada.

Resultat mesurat: **298,27 MB de fitxers publicables** i **288,96 MB de Git local net**, davant dels 468,22 MB i 456,06 MB de la primera neteja. La recollida d’objectes del servidor de GitHub pot trigar a reflectir-se al seu comptador; no s’ha comprovat el desplegament remot.

Abans d’aplicar el filtratge s’ha creat i verificat `../output/sentit-modular-20261126/before-history-purge.bundle`, que conserva l’historial complet anterior amb els muntatges. Plans, empremtes, resultats i mesures són a la mateixa carpeta: `history-plan.json`, `history-result.json`, `purge-applied.json` i `storage-final.json`. Els 130 màsters també es mantenen als seus camins de producció originals i a l’arxiu local amb manifest.

Per a 600 exercicis amb la mitjana actual, títol i relat sumarien uns **785 MB**, més il·lustracions i recursos comuns. Aquesta estimació ja compta una sola representació de cada exercici.
