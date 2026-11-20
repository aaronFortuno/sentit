# Lots de síntesi per aprofitar les peticions

Proposta de planificació · **20/11/2026**. **Cap petició nova enviada.** Els guions i les esmenes referenciats tenen aprovació; falta construir, verificar i congelar els payloads dels lots, adaptar-ne la recepció i preparar una primera prova. Aquesta taula no és un generador executable ni una aprovació retrospectiva de cap àudio.

## Límits i criteri de mida

El projecte observa 10 peticions diàries, 3 per minut i 10.000 tokens d’entrada per minut, segons la lectura d’AI Studio del docent. Són límits del seu projecte, no una quota universal garantida. [Funcionament de les quotes](https://ai.google.dev/gemini-api/docs/rate-limits): per projecte, amb restabliment diari a mitjanit del Pacífic.

Per al model actual gemini-3.8-flash-tts, la [fitxa oficial](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-tts) indica **8.192 tokens d’entrada i 16.384 de sortida per petició**. La [documentació del còmput d’àudio](https://ai.google.dev/gemini-api/docs/pricing#gemini-3.8-flash-tts) estableix **25 tokens per segon**. Les catorze preses de producció amb durada crua i ús disponibles al manifest confirmen exactament aquesta relació. Les pauses generades també ocupen durada de sortida.

16.384 / 25 = 655,36 segons, aproximadament **10 min 55 s**: és una equivalència del límit de sortida, no una durada promesa. Començar amb **6–8 minuts previstos** per lot, comptant presentacions, silencis i correccions. Vuit minuts equivalen a uns 12.000 tokens de sortida i deixen marge. Comprovar també el text i les instruccions d’entrada; 10.000 TPM no permeten superar els 8.192 d’una petició.

Exemples: quatre peces de dos minuts sumen vuit minuts abans d’afegir marges; cinc de tres minuts sumen quinze i no hi caben. El nombre de peces útils dependrà de la durada i els artefactes: 30–40 finals al dia és una hipòtesi a mesurar, no un compromís.

## Cua candidata amb el material aprovat actual

| Lot | Veus predefinides | Blocs | Mots parlats | Previsió amb marges | Tokens d’àudio estimats |
| --- | --- | --- | ---: | ---: | ---: |
| L01 | Aoede + Leda | S021-T01; S011-T01; S013 · repartiment; S013 · error; S010 · pla | 711 | 6:49 | 10225 |
| L02 | Puck + Leda | S011-T02; S010 · alternativa | 82 | 1:07 | 1675 |
| L03 | Erinome + Algenib | S006-T01; S016 · exposicio; S022 · dema; S023 · tancament | 308 | 2:53 | 4325 |
| L04 | Vindemiatrix + Kore | S005 · comprovar; S015 · llum | 27 | 0:22 | 550 |

La previsió utilitza 120 mots/minut, tres segons per cada marca de pausa llarga existent i quatre segons addicionals per bloc. És una estimació de planificació, amb tokens d’entrada encara pendents de mesurar. L01 és el candidat més llarg i serveix per calibrar el format; els altres tenen espai per afegir futurs guions validats amb les mateixes veus. No generar contingut de farciment ni deformar repartiments per omplir un lot.

L01 combina **S021 completa**, la presa de **Mireia de S011** i tres correccions. **L02 completa S011** amb Laia i Biel, i afegeix l’esmena dels Til·lers. L03 agrupa S006 amb les esmenes de Si, rails i suggeriments; L04, matí i temperatura. S011 continua necessitant intercalar les dues preses al muntatge: té tres veus i no es converteix en una lectura completa de dues veus.

En total: tres comprensions noves (quatre preses) i nou frases de correcció. Enviades com ara serien quatre peticions de lectures i quatre de correccions; aquesta proposta les agrupa en quatre. Els R01–R04 existents són una via alternativa: **no executar-los també si les seves esmenes ja s’han rebut en aquests lots**.

## Preparació del pilot

1. Agrupar blocs complets per una o dues veus ja validades. Conservar els torns i la direcció de cada peça, amb metadades de veu per fragment. Els noms de personatge no es dedueixen només de compartir una veu.
2. Cada bloc necessita identificador local, codi/idioma, text exacte, veu, aprovació i empremta. Distingir presentació, lectura, torn separat i esmena. Els codis no es llegeixen: van al manifest local.
3. Afegir pauses llargues entre blocs; comprovar després les pauses reals. Els títols i les fronteres dels textos serveixen d’ancoratge per al reconeixement local. No tallar a offsets calculats només per la durada esperada.
4. Preparar el payload final i congelar-ne l’empremta, revisar cobertura sense duplicacions, mida d’entrada i previsió de sortida. Excloure preses en memòria cau i peces definitivament publicades. La validació del guió/escaleta continua sent obligatòria.
5. Abans d’enviar, adaptar el receptor actual: ara té un timeout de 180 s i conserva l’últim bloc d’àudio retornat. Un lot llarg requereix timeout adequat, comprovació de l’estat final i conservació de tots els blocs retornats amb els seus formats. No concatenar capçaleres WAV com si fossin PCM. Cap canvi de receptor s’ha aplicat en aquesta planificació.
6. Fer una prova de lot abans d’omplir totes deu peticions. Desar resposta crua, ús real, finalització i mapa de blocs. Un fitxer WAV vàlid, per si sol, no prova que contingui tot el text.
7. Verificar cobertura i marges amb alineació i ona; detectar respostes truncades. Conservar qualsevol fragment bo i tornar a la cua només el que falta. Igualar nivells i tallar en silencis; cap retall de consonants, canvi de to o alentiment per ocultar defectes.
8. Muntar cada activitat amb les seves músiques i efectes i mantenir l’audició docent abans de publicar. El reconeixement pot reconstruir paraules mal pronunciades i no valida dicció.

## Ritme d’execució i traçabilitat

Execució seqüencial, amb com a mínim 65 segons entre inicis de petició i comprovació dels límits vigents. Lock i registre compartits per a tots els generadors. El restabliment previst del següent dia de quota és el **21/11 a les 09:00, hora de Berlín**, sempre subjecte a l’estat real del proveïdor. No s’ha programat cap execució. No repetir automàticament una petició interrompuda o de resultat incert; revisar primer la resposta o els fragments conservats.

Cada lot registrarà empremta del payload, veus, blocs i aprovacions, tokens d’entrada estimats/reals, durada prevista/real, tokens de sortida, temps de generació i talls aplicats. Això permetrà calcular lectures útils per petició i taxa d’artefactes, i decidir si augmentar de sis a vuit minuts o reduir la mida.

## Referències exactes de les fonts

Empremtes de les peticions individuals aprovades, abans d’afegir les fronteres del lot. **No són l’empremta del futur payload agrupat.**

| Lot | Codi | Presa o fragment | SHA-256 de la petició d’origen |
| --- | --- | --- | --- |
| L01 | S021 | S021-T01 | `0e98dd5b9fcd4c84c51e5f4b99dc54f4e9a40a679f7ccb1b76dcb77a6faefa80` |
| L01 | S011 | S011-T01 | `73e1ff5fdf235f1cd8e1880c1f74cbfe828cb379adde5be3b7f7cd37daf1f03a` |
| L01 | S013 | repartiment | `562c765dc3c76a72be7873782f3ddecc573f1f10f4f8f0f55c20eb71956c640e` |
| L01 | S013 | error | `562c765dc3c76a72be7873782f3ddecc573f1f10f4f8f0f55c20eb71956c640e` |
| L01 | S010 | pla | `a8d86c221c91394f80126bb5b2503e6d16173c2e3000f1aff41edfdf79b71fc2` |
| L02 | S011 | S011-T02 | `f10cd7920ff62cc59497e1fcea677477d93a5bbd5ae017cd9f3bc08e37bfce39` |
| L02 | S010 | alternativa | `a8d86c221c91394f80126bb5b2503e6d16173c2e3000f1aff41edfdf79b71fc2` |
| L03 | S006 | S006-T01 | `7e285d58bf7f8bb6dd2061ad42a14861f673202966a83b5935b9bfc1924a373a` |
| L03 | S016 | exposicio | `d43335d6ca50e24dfe0d17b43f31e2ad67f7040083b26a3628ebd936896b4df7` |
| L03 | S022 | dema | `dc75acf7a5f1dae1c4d229ce80f07a0257da22db6d95d0f7235b45a125f75f1f` |
| L03 | S023 | tancament | `5381bc85a25a80e20c3d2a43e0df955e8f64a4dc7ea5256b52ccd90daf8feb9a` |
| L04 | S005 | comprovar | `199df0ca13eadc5ebf99ceac4355e01698cb40f2051f92c6557160134a84459a` |
| L04 | S015 | llum | `ed0588aeb64811b62fd7932e8f58d35dace263a9d77d283e393ed8f6f00fe91e` |

[Plans dels guions](../content/production-plans.json) · [Correccions exactes i aprovacions](../content/audio-repairs.json) · [Seguiment](seguiment-produccio.md).

Quan dues etiquetes designen la mateixa veu (Mar i Presentadora, Erinome), el payload agrupat utilitza una sola etiqueta i el manifest conserva el nom de parlant original per fragment. No es confon aquesta normalització tècnica amb canviar de personatge o de veu.
