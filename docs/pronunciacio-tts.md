# Control de pronunciació i reparacions locals

## Retorn de tradició · 27/11/2026

S142, amb Algenib, presenta «clusca» per *closca*, «bestiari» per *bestiar* en dos torns i «asseptar» per *acceptar*. El docent autoritza provar una altra veu: nova presa íntegra amb Erinome, començant «Aquest mite grec explica que…». Dicció només a les metadades: /ˈklɔskə/, final tònic de *bestiar* sense una i afegida i grup /ks/ a *acceptar*. Cap canvi de grafia al guió ni cap pronunciació donada per resolta abans de l’audició. [Registre exacte i muntatges](veus-i-muntatges-2026-11-27.md).

S131 continua pendent de completar la presentació inicial de L46. L’inventari viu d’esmenes és [pla-esmenes-veu.md](pla-esmenes-veu.md); les seccions datades de sota conserven els retorns i propostes històrics.

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
| S023 | Erinome / Mar (Presentadora) | tancament · suggeriments | suggerements o suggeraments | Repetir la frase curta amb la i tònica correcta |
| S015 | Kore / Nora | llum · condicions de temperatura i humitat | temperatira en lloc de temperatura | Frase curta amb dicció de temperatura i l·l clara |
| S016 | Erinome / Mar | exposicio · Si l’estudi avança, l’equip | Soroll «ffff» en substitució de Si | Preparar reparació local; resta de la peça ben valorada |

**Cap d’aquestes correccions s’ha sintetitzat o aplicat.** Nou frases, set activitats i set veus es reparteixen en **quatre peticions**: R01 (Leda/Puck), R02 (Aoede/Vindemiatrix), R03 (Algenib/Erinome, incloent-hi S023) i R04 (Kore). El límit tècnic de dues veus predefinides per petició impedeix agrupar les set en un sol paquet. Les frases acaben amb dues marques de pausa llarga; es demanen tres segons de marge per tallar localment, però cal comprovar el silenci real retornat.

El registre compta deu peticions del dia de quota 20/11; els quatre lots queden preparats a partir del **21/11/2026, 08:00 UTC**, sense programar-ne l’execució. [Plans per activitat](../content/audio-repairs.json) · [Quatre lots exactes](../content/audio-repair-batches.json).

## Procediment

1. Conservar transcripció, PDF, noms i ortografia correctes. No eliminar l·l de manera general ni canviar paraules per ocultar els defectes del model.
2. Preparar frases curtes amb context suficient, amb les mateixes veus. Agrupar segons les veus a content/audio-repair-batches.json, fins a dues per petició. Cap presentació nova.
3. Donar instruccions de dicció fora del text parlat, dins de speech_metadata.style. La [documentació de Gemini TTS](https://ai.google.dev/gemini-api/docs/speech-generation) descriu control de parla per aquestes metadades; això orienta el model, però no garanteix una pronunciació. No es pressuposa un control IPA/SSML equivalent al d'Azure. No s'envien etiquetes phoneme com si aquesta via les interpretés contractualment.
4. Escoltar la prova i comparar-la amb l'original. Si la direcció no funciona, provar una representació fonètica o grafia auxiliar només a l'entrada de síntesi, amb correspondència explícita amb el text real, nova empremta i pressupost. No fer reintents automàtics ni donar per bona una aproximació sense audició.
5. Només després de validar la dicció, identificar els límits de les frases a les dues preses, comprovar silencis i marges de consonants, igualar el nivell i substituir només aquells fragments. No alentir ni canviar el to per dissimular errors. Conservar originals, hashes, marques de tall i aprovació de l'àudio remuntat.

El text publicat conserva **rails**. El [DIEC actual](https://dlc.iec.cat/results.asp?operEntrada=0&txtEntrada=rail) recull «raïl [o rail]». Les dues entrades auxiliars autoritzades per a S022 són «raíls» i «raïls»: no es traslladen automàticament a la transcripció. La guia ra-ÍLS orienta la prova, pendent d’audició.

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

La [proposta de lots mixtos](lots-sintesi.md) redistribueix aquestes frases entre lectures compatibles. És una alternativa encara no implementada; si s’executa, cal consumir les mateixes incidències i evitar tornar a enviar R01–R04.

S023 v2 ja té Ona curta i ambient real de mercat. La correcció de suggeriments al tancament continua pending; no es considera resolta pel canvi de muntatge. Mar i Presentadora són etiquetes de la mateixa veu Erinome: el lot les normalitza sense perdre el nom original de cada fragment.


## Retorn de la tanda del 21/11

- **S011:** el text de la petició i el muntatge assignen bé Biel/Puck i Laia/Leda, però el docent sent «A nosaltres no ens hi entra la mà» amb identitat equivocada i «Doncs jo la deixaria» massa agut. Tres personatges sonen com més timbres. Identitat i estabilitat pendents; no es resolen canviant el to digitalment. Pauses tècniques escurçades sense modificar mostres de parla.
- **S041:** dues locucions long pause al voltant del títol, localitzades també com «l’ong pous» pel reconeixedor, retirades en silencis. Cos intacte. «Quan hagis parlat» sona «Quan hagues/hagas parlat»: esmena pendent.
- **S025:** incidència de prémer al darrer torn i revisió de la frase «tot sol»/«tota sola» a concretar amb el docent abans de preparar el tram final. Clic i cadira retirats del nou pla sonor.
- **S030:** retirats farciment inicial, pauses tècniques, respiració posterior a la parla i passos tardans. Cap canvi de velocitat ni paraula.

Les esmenes de veu esperen un lot compatible prou ple. Prioritzar comprensions completes amb els mateixos personatges i continuïtat de context; no repetir l’estratègia de molts torns desconnectats. No enviar de nou marques de pausa com a text parlat sense comprovar el format del proveïdor. Les preses anteriors i els manifests continuen disponibles.

## Retorns del 22/11

- **S058:** al torn de Biel `avis`, «dos trossets de cinta» sona «dos torsets de cinta». El docent tornarà a escoltar la presa v2 després de retirar les metadades que produïen cruixits; si només queda aquest error, es prepararà una represa del torn, conservant la resta. No hi ha cap regeneració nova enviada.
- **S069:** Ferran diu «Eina» en lloc d’«Aina» i «guix» amb final de tipus «ks». Regravar només el primer torn complet, `encarrec`, amb direcció específica per al diftong del nom Aina i el so final suau de guix, com el de peix. La grafia editorial es conserva. La resta de la presa ha estat validada expressament pel docent; el muntatge espera la correcció. Aplicar aquestes indicacions a aquests mots concrets, sense convertir-les en una regla general per a qualsevol grafia final «ix».
- **S071 / Ferran–Algenib (23/11):** es repeteix «Eina» en lloc d’«Aina» a la primera intervenció, `sobre`. La resta de les veus queda validada. Reprendre el torn inicial complet, amb la mateixa identitat i direcció explícita per al diftong /aj/ d’«Aina», sense canviar-ne la grafia editorial ni enviar les indicacions com a text parlat. Esperar lot compatible de sis a vuit minuts, comparar la represa i escoltar-la abans d’aplicar-la o muntar. L’ASR no certifica aquest contrast vocàlic.
- **S070 / Ferran–Algenib (23/11):** a `esperar`, «s’asseia» sona amb la i tònica. Preparar el torn complet amb indicació de tonicitat a la e, conservant el text canònic i el timbre del personatge. No aplicar accents auxiliars a la transcripció ni llegir les instruccions. Comparar frase/paràgraf abans d’incorporar-lo; la resta de veus no rep aprovació global per aquest retorn. Reservat per a lot compatible de Ferran o d’Aina i Ferran, sense petició curta aïllada.
- **S070 / Ferran–Algenib (23/11):** «la gent s’asseia i els petits...» sona amb la tonicitat de «s’asseia» desplaçada a la i. Preparar el torn `esperar` complet, amb indicació de tònica a la e, sense canviar el text editorial. Reservar-lo per a un lot compatible de Ferran o d’Aina i Ferran; no fer una petició curta aïllada. Comparar frase i paràgraf nou abans de retallar i conservar el timbre del personatge. Incidència pendent; no implica validació global de veus.

- **S022, segona passada:** la represa L13 queda rebutjada perquè continua sonant «ráils». Dues proves màximes, amb `raíls` i `raïls` exclusivament a l’entrada TTS, mantenint Ferran/Algenib i la frase canònica. Pla verificable sense peticions: `node tools/pronunciation-trials.cjs --only=S022`. Esperen un lot compatible de sis a vuit minuts. Si fallen totes dues, el docent proposa «les vies»; encara no s’ha canviat el relat.
- **S010:** «Després ja som a la porta» validat i pendent d’inserir. La represa de «Des de la plaça» queda rebutjada per identitat: parla Laia i ha de parlar Biel/Puck. Repetir només aquesta segona frase.

## Retorns del 23/11

- **S082 / Biel–Puck:** «funda» sona «fona» al torn `mòbil`. El lot L26 ja conté la intervenció sencera per comparar; encara no s’ha aplicat ni validat. Mantenir U tònica i el grup N+D de /ˈfun.də/ en les indicacions no parlades.
- **S081 / Elies–Algieba:** «funda» sona «funa» als torns `telefon` i `final`. Regenerar els dos torns complets amb la mateixa identitat adulta, conservant la naturalitat d’«Espera... així...». Esperen lot compatible; no s’envia una petició curta aïllada. El text editorial continua sent «funda».
- **S061:** la síntesi va ometre la presentació «Comprensió oral. El curt que començava pel final.». Cos de veus validat; reposar el títol abans del muntatge. No repetir el diàleg complet ni atribuir el títol a la presa original.

L’estat viu de cada prova i la seva audició consta al [seguiment de producció](seguiment-produccio.md) i a la [cua de síntesi](lots-sintesi.md).

**Segona tanda del 23/11:** L27 aporta les represes de Biel/Puck de S007 (`invisible`) i S024 (`dubtes`); L28 aporta el torn inicial de Ferran/Algenib de S069 (`encarrec`). S’han mantingut les grafies canòniques «Aina» i «guix», amb les indicacions de dicció fora del text parlat. Les tres proves esperen audició i no s’han incorporat als muntatges. «La duies tu?» de S068D queda assenyalat com a torn molt breu que el reconeixement local no ha pogut confirmar; l’àudio es conserva per comprovar-lo a l’oïda.


## Retorns del 25/11 · esmenes incorporades

- S022: el docent tria la segona prova de L30, amb `raïls` exclusivament a l’entrada de síntesi. Incorporada la frase completa; el text editorial continua sent `rails`. Es conserva la primera prova i la presa L13 rebutjada. Muntatge pendent d’audició final.
- S025 (`prémer`), S059 (`cartró`) i S071 (`Aina`): represes validades incorporades sense canviar to ni ritme. La resta de les mostres de veu és idèntica a l’original.
- S061: presentació del títol validada i afegida; tot el cos aprovat després de la neteja de metadades es conserva intacte.
- S081: les dues proves rebudes continuen dient funa/fona segons el docent; no s’han aplicat. Dos torns complets en espera d’un lot compatible.

[Pla actual de preses pendents](pla-esmenes-veu.md). No s’han fet peticions noves de síntesi per aquests muntatges.


## Retorns del 26/11

- S081: torn telefon de L39 validat; aplicar-lo una sola vegada. El torn final encara diu fona i queda com a única esmena pendent.
- S107: re-presa rebutjada perquè diu carre i fona en lloc de carro i funda. Preparar el torn complet, amb dicció explícita només a les metadades.
- Funda és una incidència recurrent de Gemini: conservar la grafia editorial; comprovar la U tònica i la transició N+D a l’oïda en cada presa. Les indicacions no en garanteixen la correcció i el reconeixement automàtic no la valida.
- S070: l’esmena aïllada de s’asseia enfosqueix la veu; el docent demana una presa completa amb el mateix Ferran/Algenib, conservant les preses anteriors.
- S093, S041 i S085: esmenes validades pel docent; incorporar les proves exactes i presentar el muntatge per a audició.


## Retorn posterior del 26/11

- S107/sortida de L43 encara diu fona/funa: rebutjada, següent intent r3 d’Elies/Algieba preparat, sense enviar. El comiat de S081 amb funda de la mateixa tanda sí que passa l’audició: la pronunciació correcta depèn també del context i s’ha de validar cada vegada.
- S010/pla amb Després continua aprovat. La represa L31 de Biel amb Til·lers torna a fallar: es prepara v3, conservant la selecció bona de Laia.
- S102: primera prova del quadre, final de Mar/L38, rebutjada per Tillers; segona, sentit de la Informadora/L44, aprovada. Aquesta última conserva l’exemple perceptiu correcte de la geminació. No es canvia la grafia editorial ni s’aplica automàticament un empelt de sons entre veus.
- S109: passeig i bassals de L43 aprovats. S088, S081 i S090 també aprovats per muntatge amb les parts rebudes.
- S017: es descarta la represa L40 i s’accepta la veu original amb la neteja anterior, sense més síntesi.
