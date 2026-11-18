# Repartiment recurrent de Sentit

18 de novembre de 2026 · Primera proposta de continuïtat, v0.1.21.

[Consulta les vuit fitxes al web](https://sentit.ortogra.fi/personatges.html). Cada fitxa inclou vistes de davant, perfil, darrere i tres quarts, i estudis de cara: és una **fitxa de personatge o model sheet**, amb el seu turnaround. Els PNG són referències per generar noves escenes, no imatges per incorporar senceres a les fitxes de comprensió.

## Identitat, veu i nom

| Personatge | Veu de referència Gemini | Estat de la veu en aquest paper | Punt de partida |
| --- | --- | --- | --- |
| Laia | Leda | Escoltada en S001 | Curiosa i expressiva; sons, històries i descoberta. |
| Biel | Puck | Escoltada en S001 i en una presa de S015 | Enginyós i sociable; música, proves i projectes compartits. |
| Aina | Zephyr | Proposta pendent de prova | Observadora; fotografies, enigmes i memòria familiar. |
| Mireia | Aoede | Escoltada com a mestra de S002 i narradora de S008 | Adulta acollidora; acompanyar, preguntar i explicar relats. |
| Nora | Kore | Proposta pendent de prova | Restauradora pacient; materials, patrimoni i decisions justificades. |
| Mar | Erinome | Proposta pendent de prova | Periodista atenta; informació, entrevistes i vida del barri. |
| Pau | Charon | Proposta prevista, sense presa d’aquest personatge | Comerciant proper; experiència quotidiana i iniciatives veïnals. |
| Ferran | Algenib | Proposta pendent de prova | Avi de l’Aina; records, passejades i humor tranquil. |

Les candidates parteixen del [catàleg de veus de Google](https://ai.google.dev/gemini-api/docs/speech-generation). Les descripcions de timbre orienten la tria, però no garanteixen edat percebuda, pronunciació catalana o adequació interpretativa. Una veu només passarà d’assignació proposada a escoltada després de provar-la en català en el seu paper. No s’ha fet cap petició nova de TTS per preparar aquestes fitxes.

La veu de presentació i de les instruccions continua sent Aoede. Es pot entendre com l’acompanyament de la Mireia; no obliga que aparegui físicament a cada història. Una narradora pot explicar el que fa un personatge sense que aquella sigui la veu pròpia del personatge: Aina i Ferran, a S008, encara no tenen diàleg directe sintetitzat.

## Regles de continuïtat

1. **El mateix nom identifica el mateix personatge.** Laia continua sent Laia i Biel continua sent Biel. No es reassignen aquells rostres a persones diferents. El noi que entrevista la Nora a S015 s’identifica editorialment com en Biel; el guió existent l’anomena «Entrevistador» i no cal alterar les paraules ja locutades.
2. **Trets recognoscibles, no un uniforme immutable.** Laia conserva cabells arrissats, pigues i trets; Biel, els seus cabells i rostre. La roba base ajuda a reconèixer-los, però podrà canviar quan la situació ho justifiqui. L’Aina té cabells llisos curts i ulleres; les adultes tenen rostres i edats diferenciats.
3. **Un repertori d’interessos, no una funció fixa.** Laia també pot fer una prova tècnica; Biel pot dubtar o explicar un record. Els adults admeten incerteses. Ningú no és sempre qui s’equivoca ni qui té totes les respostes.
4. **Episodis independents.** Cada guió presenta prou context, els noms necessaris i qualsevol dada imprescindible per respondre. Retrobar una afició o una relació és un detall de continuïtat, mai un requisit per resoldre les preguntes.
5. **Sense ordre obligatori.** Curs, dificultat i tipologia governen la tria del docent; no una cronologia de capítols. Un mateix personatge pot aparèixer en activitats de cursos diferents. L’edat del personatge no determina el curs destinatari.
6. **Identitat estable entre idiomes i varietats.** Es conserva l’identificador del personatge. Si cal una veu diferent en una altra llengua, s’enregistrarà aquella assignació per idioma i varietat, sense donar per fet que una veu actual serveixi igual arreu.

## Com crear la imatge següent

- Consultar la fitxa escrita a [characters.js](../content/characters.js) i adjuntar el model sheet de cada personatge que hi aparegui. Adjuntar una escena només com a referència d’estil no és suficient per preservar identitats.
- Indicar què es manté: rostre, edat aparent, cabells, ulleres i altres trets; què pot canviar: posició, expressió, roba contextual i entorn.
- Conservar tinta fina, aquarel·la suau, fons blanc i colors discrets, amb lectura clara en grisos. La il·lustració contextualitza; no mostra la resposta ni una dada que s’hagi d’extreure de l’àudio.
- Revisar el resultat al costat del model abans de donar-lo per bo. Una fitxa de referència redueix variacions, però no garanteix per si sola una coincidència perfecta.
- Desar una versió nova de la imatge si canvia una escena publicada. Els [prompts originals de les fitxes](../assets/characters/prompts-v1.json) es conserven per repetir el procés.

## Migració dels prototips

S’han mantingut les cares de Laia i Biel de S001 i la del Ferran de la primera imatge de S008. Les escenes de S002, S008, S015 i S023 s’adapten a les identitats diferenciades dels models. Els dibuixos originals es conserven com a primera versió.

**S015:** la presa parcial existent de la Nora utilitza Aoede, abans de decidir el repartiment. No s’ha esborrat ni s’ha presentat com si fos Kore. Abans de produir el màster definitiu cal escoltar Kore i decidir la veu. Si s’adopta, no es podran barrejar torns antics d’Aoede i nous de Kore: caldrà sintetitzar de nou el fragment complet amb una sola identitat per personatge.

**S023:** el pla tècnic anterior preveu Aoede per a la presentadora. Mar–Erinome i Pau–Charon són l’assignació editorial a provar abans del lot definitiu. El generador conserva de moment el pla anterior; aquesta taula de candidates no en canvia les veus silenciosament.

El registre separa sempre assignació editorial, veu real de cada presa i àudio publicat. Quan es confirmi una candidata, s’actualitzaran conjuntament registre, instruccions de síntesi, metadades i crèdits. Els fitxers anteriors continuaran disponibles per comparar, i la quota gratuïta es respectarà.

## Font dels perfils

[content/characters.js](../content/characters.js) conserva identificadors estables, nom, aparença, manera de ser, interessos, interpretació vocal, estat de la veu i aparicions. La pàgina de personatges es genera a partir d’aquest registre. La personalitat és una guia per escriure; les fitxes de comprensió i les respostes es mantenen als seus guions.
