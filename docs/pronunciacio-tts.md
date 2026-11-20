# Control de pronunciació i reparacions locals

El docent valida les veus escoltant-les. Una transcripció automàtica pot reconstruir la paraula correcta encara que s'hagi pronunciat malament: no certifica la tonicitat, la geminació o la dicció. La validació del muntatge tampoc dona per corregides les incidències de veu.

## Incidències obertes · 20/11/2026

| Codi | Veu | Passatge | Problema notificat | Proper pas |
| --- | --- | --- | --- | --- |
| S010 | Leda / Laia | pla · Després ja som a la porta | Desprén en lloc de Després | Prova curta amb consonant final clara |
| S010 | Puck / Biel | alternativa · carrer dels Til·lers | LL palatal en lloc de l·l | Prova amb indicació de lateral geminada |
| S013 | Aoede / Mireia | repartiment · bústia concreta | Tònica desplaçada a la I | Prova amb tònica explícita a Ú |
| S013 | Aoede / Mireia | error · endevinar una bústia | Mateixa incidència | Segona frase dins la mateixa petició |
| S022 | Algenib / Ferran | dema · mirant els rails | ráils/ralls, mot poc identificable | Prova amb pronunciació ra-ÍLS, sense canviar la grafia |
| S005 | Vindemiatrix / Joana | comprovar · Aquest matí, per exemple | matà en lloc de matí | Frase curta amb accent a Í |
| S015 | Kore / Nora | llum · condicions de temperatura i humitat | temperatira en lloc de temperatura | Frase curta amb dicció de temperatura i l·l clara |
| S016 | Erinome / Mar | exposicio · Si l’estudi avança, l’equip | Soroll «ffff» en substitució de Si | Preparar reparació local; resta de la peça ben valorada |

**Cap d’aquestes correccions s’ha sintetitzat o aplicat.** Vuit frases, sis activitats i set veus es reparteixen en **quatre peticions**: R01 (Leda/Puck), R02 (Aoede/Vindemiatrix), R03 (Algenib/Erinome) i R04 (Kore). El límit tècnic de dues veus predefinides per petició impedeix agrupar les set en un sol paquet. Les frases acaben amb dues marques de pausa llarga; es demanen tres segons de marge per tallar localment, però cal comprovar el silenci real retornat.

El registre compta deu peticions del dia de quota 20/11; els quatre lots queden preparats a partir del **21/11/2026, 08:00 UTC**, sense programar-ne l’execució. [Plans per activitat](../content/audio-repairs.json) · [Quatre lots exactes](../content/audio-repair-batches.json).

## Procediment

1. Conservar transcripció, PDF, noms i ortografia correctes. No eliminar l·l de manera general ni canviar paraules per ocultar els defectes del model.
2. Preparar frases curtes amb context suficient, amb les mateixes veus. Agrupar segons les veus a content/audio-repair-batches.json, fins a dues per petició. Cap presentació nova.
3. Donar instruccions de dicció fora del text parlat, dins de speech_metadata.style. La [documentació de Gemini TTS](https://ai.google.dev/gemini-api/docs/speech-generation) descriu control de parla per aquestes metadades; això orienta el model, però no garanteix una pronunciació. No es pressuposa un control IPA/SSML equivalent al d'Azure. No s'envien etiquetes phoneme com si aquesta via les interpretés contractualment.
4. Escoltar la prova i comparar-la amb l'original. Si la direcció no funciona, provar una representació fonètica o grafia auxiliar només a l'entrada de síntesi, amb correspondència explícita amb el text real, nova empremta i pressupost. No fer reintents automàtics ni donar per bona una aproximació sense audició.
5. Només després de validar la dicció, identificar els límits de les frases a les dues preses, comprovar silencis i marges de consonants, igualar el nivell i substituir només aquells fragments. No alentir ni canviar el to per dissimular errors. Conservar originals, hashes, marques de tall i aprovació de l'àudio remuntat.

La grafia normativa actual és **rail/rails**: el [dossier de l'IEC de canvis ortogràfics](https://criteria.iec.cat/wp-content/uploads/2017/02/9-4-7_Novetats-de-l-Ortografia-catalana-20170131_Dossier.pdf) recull el pas de raïl a rail. La guia ra-ÍLS orienta aquesta prova de veu i no modifica el catàleg.

## Eina

Planificació local, sense llegir claus ni enviar peticions:

~~~powershell
node tools/audio-repair-batches.cjs --only=R01
node tools/audio-repair-batches.cjs --only=R02
node tools/audio-repair-batches.cjs --only=R03
node tools/audio-repair-batches.cjs --only=R04
~~~

Només després del restabliment, generació explícita d'una correcció autoritzada:

~~~powershell
node tools/audio-repair-batches.cjs --only=R01 --generate --max-requests=1
~~~

L'eina exigeix coincidència de textos, veus, presa d'origen, aprovació i revisió editorial; conserva un lock compartit, no reintenta un intent incert i comprova el registre diari (deu peticions, dia de quota a America/Los_Angeles) abans d'enviar. El resultat és una presa crua per escoltar, mai una substitució automàtica al web. No programa cap tasca ni fa sondeigs de quota.

## Efectes remuntats en aquesta revisió

- S010: gravació de dues persones caminant d'evsecrets, Freesound 334457, CC0. Substitueix els passos procedurals; no canvia cap frase ni la durada.
- S013: eliminada la sintonia de dues notes descartada pel docent. Es conserva el silenci final; identitat sonora definitiva pendent de tria.
- S022: gravació d'un tramvia de migweis, Freesound 713419, CC0, a l'obertura i dins la pausa existent. Substitueix rumor i toc sintètics. És una evocació moderna d'un relat fictici, sense valor d'arxiu històric. Música original conservada.

Les noves variants v2 mantenen disponibles els màsters v1. [Fonts i transformacions](../content/sound-sources.js). Els efectes nous necessiten audició; la veu original encara conté els defectes notificats.

Les cards mostren «Síntesi pendent d’esmena» mentre algun feedback sigui pending. Rebre la prova no resol l’error: només després d’aplicar-la al màster, anotar applied i comprovar el nou muntatge tornen a «Àudio pendent de validar». La publicació definitiva continua requerint el docent.
