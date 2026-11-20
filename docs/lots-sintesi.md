# Lots de síntesi per aprofitar les peticions

Proposta de planificació · **20/11/2026**. **Cap petició nova enviada.** Els guions i les esmenes referenciats tenen aprovació; falta construir, verificar i congelar els payloads dels lots, adaptar-ne la recepció i preparar una primera prova. Aquesta taula no és un generador executable ni una aprovació retrospectiva de cap àudio.

## Resum per consultar ràpidament

- El límit de peticions i el de tokens són independents: podem gastar deu peticions encara que hi enviem molt poc text.
- Per petició: màxim 8.192 tokens de text d’entrada i 16.384 tokens d’àudio de sortida. Els 10.000 tokens/minut del projecte no són una bossa acumulable per fer una petició més gran.
- L’àudio es compta a 25 tokens/segon; el sostre de sortida equival aproximadament a 10:55 incloent-hi silencis.
- Objectiu inicial: **6–8 minuts totals**, una o dues veus predefinides, amb diverses lectures i esmenes compatibles. Per exemple, tres lectures de dos minuts poden compartir una petició; cinc de tres minuts no hi caben.
- La cua aprovada actual són vuit comprensions i nou frases d’esmena: sis lots candidats en comptes de quinze peticions separades. **Només L01 i L02 arriben ara a la finestra de mida. Els altres esperen més material compatible.** No s’han enviat ni es poden executar automàticament des d’aquesta taula.

## Límits i criteri de mida

El projecte observa 10 peticions diàries, 3 per minut i 10.000 tokens d’entrada per minut, segons la lectura d’AI Studio del docent. Són límits del seu projecte, no una quota universal garantida. [Funcionament de les quotes](https://ai.google.dev/gemini-api/docs/rate-limits): per projecte, amb restabliment diari a mitjanit del Pacífic.

Per al model actual gemini-3.8-flash-tts, la [fitxa oficial](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-tts) indica **8.192 tokens d’entrada i 16.384 de sortida per petició**. La [documentació del còmput d’àudio](https://ai.google.dev/gemini-api/docs/pricing#gemini-3.8-flash-tts) estableix **25 tokens per segon**. Les catorze preses de producció amb durada crua i ús disponibles al manifest confirmen exactament aquesta relació. Les pauses generades també ocupen durada de sortida.

16.384 / 25 = 655,36 segons, aproximadament **10 min 55 s**: és una equivalència del límit de sortida, no una durada promesa. Començar amb **6–8 minuts previstos** per lot, comptant presentacions, silencis i correccions. Vuit minuts equivalen a uns 12.000 tokens de sortida i deixen marge. Comprovar també el text i les instruccions d’entrada; 10.000 TPM no permeten superar els 8.192 d’una petició.

Exemples: quatre peces de dos minuts sumen vuit minuts abans d’afegir marges; cinc de tres minuts sumen quinze i no hi caben. El nombre de peces útils dependrà de la durada i els artefactes: 30–40 finals al dia és una hipòtesi a mesurar, no un compromís.

## Cua candidata amb el material aprovat actual

**Norma acordada:** durant el creixement no s’envia cap petició de menys de sis minuts ni de més de vuit minuts estimats, comptant les pauses. Un lot petit queda a l’espera encara que no hi hagi altra feina. Si el docent en demana l’enviament, cal recordar-li abans la mida i el poc aprofitament; no s’interpreta com una excepció conscient. No allargar guions ni alterar repartiments per omplir-los. El control `tools/audio-batch-policy.cjs` ho comprova abans de llegir claus, reservar quota o enviar una petició. La política es podrà revisar explícitament quan el catàleg estigui consolidat.

| Lot | Veus predefinides | Blocs | Mots parlats | Previsió amb marges | Tokens d’àudio estimats | Estat de mida |
| --- | --- | --- | ---: | ---: | ---: | --- |
| L01 | Aoede + Leda | S021-T01; S011-T01; S013 · repartiment; S013 · error; S010 · pla | 711 | 6:49 | 10225 | Finestra completa; payload pendent |
| L02 | Puck + Leda | S011-T02; S010 · alternativa; S007-T02; S024-T01; S017-T02 | 700 | 7:16 | 10900 | Finestra completa; payload pendent |
| L03 | Erinome + Algenib | S006-T01; S009-T01; S016 · exposicio; S022 · dema; S023 · tancament | 596 | 5:24 | 8100 | Espera més material |
| L04 | Vindemiatrix + Kore | S005 · comprovar; S015 · llum | 27 | 0:22 | 550 | Espera més material |
| L05 | Aoede | S007-T01; S017-T01 | 523 | 5:24 | 8100 | Espera més material |
| L06 | Aoede + Puck | S014-T01 | 365 | 3:10 | 4750 | Espera més material |

La previsió utilitza 120 mots/minut, tres segons per cada marca de pausa llarga existent i quatre segons addicionals per bloc. És una estimació de planificació, amb tokens d’entrada encara pendents de mesurar. L02 és el candidat més llarg; L01 pot servir per calibrar el format. L03–L06 **no s’envien** fins a completar la finestra amb futurs guions validats i veus compatibles. L05 conserva la Mireia de S007 i S017 a part per no portar L01 per sobre de vuit minuts. S014 no s’hi afegeix sencera perquè el superaria. No generar contingut de farciment ni deformar repartiments per omplir un lot.

L01 combina **S021 completa**, la presa de **Mireia de S011** i tres correccions. **L02 completa S011** amb Laia i Biel, i afegeix l’esmena dels Til·lers. L02 també inclou S024 completa i els alumnes de S007 i S017; L05 conté la Mireia i els títols de S007 i S017. L03 agrupa S006 amb les esmenes de Si, rails i suggeriments; L04, matí i temperatura. S007, S011 i S017 continuen necessitant intercalar dues preses al muntatge: tenen tres veus i no es converteixen en lectures completes de dues veus.

En total: vuit comprensions noves (onze preses) i nou frases de correcció. Enviades individualment serien onze peticions de lectures i quatre de correccions; aquesta proposta les distribueix en sis candidats, **quatre encara incomplets**. S009 s’afegeix a L03 i S014 espera a L06. Els R01–R04 existents són una via alternativa: **no executar-los també si les seves esmenes ja s’han rebut en aquests lots**, i tampoc enviar-los curts durant aquesta fase de creixement.

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
| L02 | S007 | S007-T02 | `3cac570afbf056efc1591679d6c521985c5dfdf1323d6b58164414cf2f1711d7` |
| L02 | S024 | S024-T01 | `5752318d7e7b57d76f9688b37c14a9b8ee096bc9984675df52fe45801ca66cac` |
| L02 | S017 | S017-T02 | `70980d5f02ea87c3af8e0553fcce309c9bca67967da3f461ae13c9f323807840` |
| L05 | S017 | S017-T01 | `135c400446473f483be82619fe8b0844864624712631f819299dd73a8c1700a6` |
| L05 | S007 | S007-T01 | `dddc6efb4140928f576a414dda65bc08d99b312dda58f648336e16121dd8a77d` |
| L03 | S006 | S006-T01 | `7e285d58bf7f8bb6dd2061ad42a14861f673202966a83b5935b9bfc1924a373a` |
| L03 | S009 | S009-T01 | `c600345647bed0d1d09ca7b26cd5460240f4d266e72e69d5196230173c43fd74` |
| L06 | S014 | S014-T01 | `2bcf21f0ba387c2047611627b76dd20a3d0ca658874913530cb453c22c35d5aa` |
| L03 | S016 | exposicio | `d43335d6ca50e24dfe0d17b43f31e2ad67f7040083b26a3628ebd936896b4df7` |
| L03 | S022 | dema | `dc75acf7a5f1dae1c4d229ce80f07a0257da22db6d95d0f7235b45a125f75f1f` |
| L03 | S023 | tancament | `5381bc85a25a80e20c3d2a43e0df955e8f64a4dc7ea5256b52ccd90daf8feb9a` |
| L04 | S005 | comprovar | `199df0ca13eadc5ebf99ceac4355e01698cb40f2051f92c6557160134a84459a` |
| L04 | S015 | llum | `ed0588aeb64811b62fd7932e8f58d35dace263a9d77d283e393ed8f6f00fe91e` |

[Plans dels guions](../content/production-plans.json) · [Correccions exactes i aprovacions](../content/audio-repairs.json) · [Seguiment](seguiment-produccio.md).

Quan dues etiquetes designen la mateixa veu (Mar i Presentadora, Erinome), el payload agrupat utilitza una sola etiqueta i el manifest conserva el nom de parlant original per fragment. No es confon aquesta normalització tècnica amb canviar de personatge o de veu.
