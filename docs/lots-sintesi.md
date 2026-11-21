# Lots de síntesi

Execució seqüencial autoritzada · **21/11/2026**. **8 peticions completades, 45:49,6 d’àudio cru**, 13.113 tokens d’entrada. Cap reintent de síntesi. Queden dues peticions de marge segons el topall local de deu; no s’envien lots petits per omplir-les.

## Ajust després de l’audició docent

El pilot ha revelat canvis d’identitat/timbre a S011 i instruccions de pausa llegides a S041. La bona cobertura textual no els detectava. Per als lots següents es prioritzen **dues o tres comprensions completes del mateix repartiment**, sense alternar torns aïllats de moltes escenes. La finestra de sis a vuit minuts continua vigent. Les escenes de tres veus requereixen dues preses i més control d’audició; no es considera validada aquesta estratègia de producció.

Abans d’enviar un lot nou cal preparar l’entrada sense marques de pausa llegibles i revisar el format acceptat. El generador actual i els candidats històrics no són una autorització per repetir el mateix format. Les dues peticions de marge es conserven mentre es preparen esmenes compatibles. Retalls locals, efectes retirats i canvis d’estat a [seguiment](seguiment-produccio.md) i [incidències](pronunciacio-tts.md).

## Tanda executada

| Lot · rebut | Preses i esmenes | Durada real | Tokens d’entrada | Tokens d’àudio |
| --- | --- | ---: | ---: | ---: |
| [L01](../assets/audio/synthesis-batches/l01.json) | S021-T01, S032-T01, S013-repartiment, S013-error, S010-pla | 4:22 | 1171 | 6541 |
| [L02](../assets/audio/synthesis-batches/l02.json) | S011-T02, S010-alternativa, S007-T02, S024-T01, S017-T02 | 4:59 | 1250 | 7466 |
| [L10](../assets/audio/synthesis-batches/l10.json) | S007-T01, S011-T01, S029-T01, S031-T01 | 6:05 | 1818 | 9137 |
| [L05](../assets/audio/synthesis-batches/l05.json) | S017-T01, S035-T01, S043-T01 | 5:59 | 1673 | 8963 |
| [L06](../assets/audio/synthesis-batches/l06.json) | S014-T01, S026-T01, S041-T01, S042-T01 | 6:31 | 1834 | 9781 |
| [L03](../assets/audio/synthesis-batches/l03.json) | S006-T01, S009-T01, S039-T01, S016-exposicio, S023-tancament | 5:11 | 1648 | 7777 |
| [L08](../assets/audio/synthesis-batches/l08.json) | S025-T01, S030-T01, S037-T01, S044-T01 | 5:58 | 1622 | 8952 |
| [L13](../assets/audio/synthesis-batches/l13.json) | S027-T01, S034-T01, S038-T01, S038D-T01, S022-dema | 6:45 | 2097 | 10124 |

Les peticions exactes i les empremtes són públiques al costat de cada rebut. Respostes completes, WAV crus i reconeixements es conserven localment; les respostes grans es comprimeixen sense pèrdua després de comprovar-ne la integritat. Els màsters aprovats no es modifiquen.

### Resultat i revisió pendent

- **25 comprensions noves amb totes les veus rebudes**, incloses les tres escenes d’aula reconstruïdes a partir de dues preses: S007, S011 i S017.
- **25 muntatges produïts**, amb fonts i crèdits per activitat; S027, S032, S038 i S038D ja són definitius amb les condicions aplicades. Les cinc notícies S006, S009, S029, S031 i S039 tenen muntatge amb Ona curta pendent d’audició. Les [preses originals](https://sentit.ortogra.fi/proves/veus-rebudes.html) es conserven com a arxiu. S011, S025 i S041 esperen esmenes de veu identificades pel docent.
- **Set frases d’esmena rebudes**: [L01 · bústia i Després](https://sentit.ortogra.fi/proves/correccions-l01.html), [L02 · Til·lers](https://sentit.ortogra.fi/proves/correccions-l02.html), [L03 · Si i suggeriments](https://sentit.ortogra.fi/proves/correccions-l03.html), [L13 · rails](https://sentit.ortogra.fi/proves/correccions-l13.html). Originals i proves per comparar; cap substitució aplicada automàticament.
- El reconeixedor no confirma prou el torn de S041 «Hi vaig ara?». Una segona passada local sense vocabulari forçat sent «i ivaj ara». Es conserva íntegre i explícitament pendent d’audició, entre dos torns ben localitzats; no es compta com a pronunciació validada. L’avís consta al rebut L06, al manifest i a les fonts de la lectura. No s’accepten per aquesta via torns llargs, absents o fronteres entre peces.

### Material que espera

| Candidat | Material | Previsió actual | Motiu |
| --- | --- | ---: | --- |
| L07 | S040 | 2:21 | No arriba als sis minuts |
| L09 | S028 | 1:23 | No arriba als sis minuts |
| L12 | S033 i S036 | 3:37 | No arriba als sis minuts |
| L04 | Esmenes de matí (S005) i temperatura (S015) | Molt curt | Espera material compatible; S015 també requereix resoldre la compatibilitat del registre editorial històric, sense afluixar les aprovacions |

### Calibratge i ús dels límits

La finestra de **6–8 minuts estimats** es manté. Després dels dos primers pilots s’estimen 170 mots/minut, dos segons per marca llarga i 0,35 per marca curta; són previsions, mai un canvi de velocitat sobre les preses. La realització de cada pausa la decideix el model. L01 havia previst 6:29 i va retornar 4:21,6; la calibració millora els lots posteriors, que retornen entre 5:11 i 6:45. L13 utilitza una marca llarga entre blocs, amb talls posteriors comprovats en silencis reals.

Una petició admet com a màxim dues veus. El màxim de tokens per minut és un límit de ritme, no una bossa acumulable; s’han mantingut almenys 65 segons entre inicis i un únic enviament en curs. No s’han canviat guions ni repartiments per omplir un lot. El generador comprova pressupost, espai en disc, aprovació i duplicats abans de llegir la clau o reservar quota. El reconeixement guia els talls i detecta possibles omissions; l’audició docent decideix si la dicció i el muntatge són bons.

## Històric anterior al primer pilot

La planificació següent es conserva per traçabilitat; **els seus repartiments i durades no són la cua executable actual**. El manifest vigent és [synthesis-batches.json](../content/synthesis-batches.json).

### Proposta inicial

- El límit de peticions i el de tokens són independents: podem gastar deu peticions encara que hi enviem molt poc text.
- Per petició: màxim 8.192 tokens de text d’entrada i 16.384 tokens d’àudio de sortida. Els 10.000 tokens/minut del projecte no són una bossa acumulable per fer una petició més gran.
- L’àudio es compta a 25 tokens/segon; el sostre de sortida equival aproximadament a 10:55 incloent-hi silencis.
- Objectiu inicial: **6–8 minuts totals**, una o dues veus predefinides, amb diverses lectures i esmenes compatibles. Per exemple, tres lectures de dos minuts poden compartir una petició; cinc de tres minuts no hi caben.
- Abans de les últimes validacions, la cua aprovada eren 21 comprensions i nou frases d’esmena: 12 lots candidats en comptes de 28 peticions separades. **L01, L02, L03, L05, L06, L08, L10 arriben ara a la finestra de mida. L04, L07, L09, L11, L12 esperen més material compatible.** L01 s’ha executat; la taula no activa cap altre candidat automàticament.

## Límits i criteri de mida

El projecte observa 10 peticions diàries, 3 per minut i 10.000 tokens d’entrada per minut, segons la lectura d’AI Studio del docent. Són límits del seu projecte, no una quota universal garantida. [Funcionament de les quotes](https://ai.google.dev/gemini-api/docs/rate-limits): per projecte, amb restabliment diari a mitjanit del Pacífic.

Per al model actual gemini-3.8-flash-tts, la [fitxa oficial](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-tts) indica **8.192 tokens d’entrada i 16.384 de sortida per petició**. La [documentació del còmput d’àudio](https://ai.google.dev/gemini-api/docs/pricing#gemini-3.8-flash-tts) estableix **25 tokens per segon**. Les catorze preses de producció amb durada crua i ús disponibles al manifest confirmen exactament aquesta relació. Les pauses generades també ocupen durada de sortida.

16.384 / 25 = 655,36 segons, aproximadament **10 min 55 s**: és una equivalència del límit de sortida, no una durada promesa. Començar amb **6–8 minuts previstos** per lot, comptant presentacions, silencis i correccions. Vuit minuts equivalen a uns 12.000 tokens de sortida i deixen marge. Comprovar també el text i les instruccions d’entrada; 10.000 TPM no permeten superar els 8.192 d’una petició.

Exemples: quatre peces de dos minuts sumen vuit minuts abans d’afegir marges; cinc de tres minuts sumen quinze i no hi caben. El nombre de peces útils dependrà de la durada i els artefactes: 30–40 finals al dia és una hipòtesi a mesurar, no un compromís.

## Cua candidata amb el material aprovat actual

**Norma acordada:** durant el creixement no s’envia cap petició de menys de sis minuts ni de més de vuit minuts estimats, comptant les pauses. Un lot petit queda a l’espera encara que no hi hagi altra feina. Si el docent en demana l’enviament, cal recordar-li abans la mida i el poc aprofitament; no s’interpreta com una excepció conscient. No allargar guions ni alterar repartiments per omplir-los. El control `tools/audio-batch-policy.cjs` ho comprova abans de llegir claus, reservar quota o enviar una petició. La política es podrà revisar explícitament quan el catàleg estigui consolidat.

| Lot | Veus predefinides | Blocs | Mots parlats | Previsió amb marges | Tokens d’àudio estimats | Estat de mida |
| --- | --- | --- | ---: | ---: | ---: | --- |
| L01 | Aoede + Leda | S021-T01; S032-T01; S013 · repartiment; S013 · error; S010 · pla | 697 | 6:15 | 9375 | Rebut: 4:21,6 reals |
| L02 | Puck + Leda | S011-T02; S010 · alternativa; S007-T02; S024-T01; S017-T02 | 700 | 7:16 | 10900 | Finestra completa; payload pendent |
| L03 | Erinome | S006-T01; S009-T01; S029-T01 | 800 | 7:01 | 10525 | Finestra completa; payload pendent |
| L04 | Vindemiatrix + Kore | S005 · comprovar; S015 · llum | 27 | 0:22 | 550 | Espera més material |
| L05 | Aoede + Puck | S007-T01; S017-T01; S042-T01 | 777 | 7:38 | 11450 | Finestra completa; payload pendent |
| L06 | Aoede + Puck | S014-T01; S011-T01; S026-T01 | 795 | 7:26 | 11150 | Finestra completa; payload pendent |
| L07 | Leda + Kore | S040-T01 | 371 | 3:13 | 4825 | Espera més material |
| L08 | Puck + Leda | S030-T01; S037-T01; S025-T01 | 679 | 6:01 | 9025 | Finestra completa; payload pendent |
| L09 | Leda + Charon | S028-T01 | 206 | 1:50 | 2750 | Espera més material |
| L10 | Algenib + Erinome | S034-T01; S038-T01; S016 · exposicio; S022 · dema; S023 · tancament | 677 | 6:05 | 9125 | Finestra completa; payload pendent |
| L11 | Aoede + Leda | S035-T01 | 263 | 2:19 | 3475 | Espera més material |
| L12 | Puck + Kore | S033-T01 | 292 | 2:33 | 3825 | Espera més material |

La previsió utilitza 120 mots/minut, tres segons per cada marca de pausa llarga existent i quatre segons addicionals per bloc. És una estimació de planificació, amb tokens d’entrada encara pendents de mesurar. Els lots L04, L07, L09, L11, L12 **no s’envien** fins a completar la finestra amb futurs guions validats i veus compatibles. No generar farciment ni canviar repartiments per omplir un lot.

Reorganització amb les validacions del 21/11: L01 combina S021 i S032 amb les correccions Aoede/Leda. S011-T01 passa a L06 amb S014 i S026. L05 conserva la Mireia de S007 i S017 i afegeix S042 completa. L02 conté els alumnes de S007, S011 i S017, S024 i la correcció dels Til·lers. Les tres escenes amb tres veus continuen requerint intercalar dues preses en local.

L03 agrupa les tres lectures d’Erinome: S006, S009 i S029. L10 combina les narracions S034 i S038, amb les esmenes de Si, rails i suggeriments; totes caben en Erinome/Algenib. L08 arriba a la finestra en combinar S030, S037 i S025 amb Puck/Leda. S028 espera a L09 amb Leda/Charon; S035, a L11 amb Aoede/Leda; S040, a L07 amb Leda/Kore. L04 conserva matí i temperatura. S033 espera a L12 amb Puck/Kore. S038D queda fora de la cua: és una proposta nova pendent de validació docent, independent de S038.

En total: **21 comprensions noves (24 preses)** i nou frases de correcció. Enviades individualment serien 24 peticions de lectures i quatre de correccions; aquesta proposta les distribueix en **12 candidats, 7 amb mida completa i 5 encara incomplets**. Les empremtes d’origen es conserven en moure un bloc entre lots. Els R01–R04 són una via alternativa: **no executar-los també si les seves esmenes ja s’han rebut en aquests lots**, i tampoc enviar-los curts durant aquesta fase de creixement.

## Preparació del pilot

1. Agrupar blocs complets per una o dues veus ja validades. Conservar els torns i la direcció de cada peça, amb metadades de veu per fragment. Els noms de personatge no es dedueixen només de compartir una veu.
2. Cada bloc necessita identificador local, codi/idioma, text exacte, veu, aprovació i empremta. Distingir presentació, lectura, torn separat i esmena. Els codis no es llegeixen: van al manifest local.
3. Afegir pauses llargues entre blocs; comprovar després les pauses reals. Els títols i les fronteres dels textos serveixen d’ancoratge per al reconeixement local. No tallar a offsets calculats només per la durada esperada.
4. Preparar el payload final i congelar-ne l’empremta, revisar cobertura sense duplicacions, mida d’entrada i previsió de sortida. Excloure preses en memòria cau i peces definitivament publicades. La validació del guió/escaleta continua sent obligatòria.
5. Abans d’enviar, adaptar el receptor actual: ara té un timeout de 180 s i conserva l’últim bloc d’àudio retornat. Un lot llarg requereix timeout adequat, comprovació de l’estat final i conservació de tots els blocs retornats amb els seus formats. No concatenar capçaleres WAV com si fossin PCM. El receptor ja admet un marge de vint minuts, conserva la resposta sencera i comprova tots els contenidors WAV abans d’extreure’n el PCM.
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
| L01 | S032 | S032-T01 | `b74fd871154ad94fa2dc3b3a54b32ccec03dbb4280f5a9e778b6993c64ada060` |
| L01 | S013 | repartiment | `562c765dc3c76a72be7873782f3ddecc573f1f10f4f8f0f55c20eb71956c640e` |
| L01 | S013 | error | `562c765dc3c76a72be7873782f3ddecc573f1f10f4f8f0f55c20eb71956c640e` |
| L01 | S010 | pla | `a8d86c221c91394f80126bb5b2503e6d16173c2e3000f1aff41edfdf79b71fc2` |
| L02 | S011 | S011-T02 | `f10cd7920ff62cc59497e1fcea677477d93a5bbd5ae017cd9f3bc08e37bfce39` |
| L02 | S010 | alternativa | `a8d86c221c91394f80126bb5b2503e6d16173c2e3000f1aff41edfdf79b71fc2` |
| L02 | S007 | S007-T02 | `3cac570afbf056efc1591679d6c521985c5dfdf1323d6b58164414cf2f1711d7` |
| L02 | S024 | S024-T01 | `5752318d7e7b57d76f9688b37c14a9b8ee096bc9984675df52fe45801ca66cac` |
| L02 | S017 | S017-T02 | `70980d5f02ea87c3af8e0553fcce309c9bca67967da3f461ae13c9f323807840` |
| L03 | S006 | S006-T01 | `7e285d58bf7f8bb6dd2061ad42a14861f673202966a83b5935b9bfc1924a373a` |
| L03 | S009 | S009-T01 | `c600345647bed0d1d09ca7b26cd5460240f4d266e72e69d5196230173c43fd74` |
| L03 | S029 | S029-T01 | `236ae133fc4cee095f688b938ab791a42442874a19663173fd26301611e03ad0` |
| L04 | S005 | comprovar | `199df0ca13eadc5ebf99ceac4355e01698cb40f2051f92c6557160134a84459a` |
| L04 | S015 | llum | `ed0588aeb64811b62fd7932e8f58d35dace263a9d77d283e393ed8f6f00fe91e` |
| L05 | S007 | S007-T01 | `dddc6efb4140928f576a414dda65bc08d99b312dda58f648336e16121dd8a77d` |
| L05 | S017 | S017-T01 | `135c400446473f483be82619fe8b0844864624712631f819299dd73a8c1700a6` |
| L05 | S042 | S042-T01 | `707a1abd4099383f028eec9b0f81cd780694f57bc428f9c16dd98cdb303ac866` |
| L06 | S014 | S014-T01 | `2bcf21f0ba387c2047611627b76dd20a3d0ca658874913530cb453c22c35d5aa` |
| L06 | S011 | S011-T01 | `73e1ff5fdf235f1cd8e1880c1f74cbfe828cb379adde5be3b7f7cd37daf1f03a` |
| L06 | S026 | S026-T01 | `bb78180d8c2948808cfd5f0c8824f2177ec440e13e5dee3a51ff7b860b4a5204` |
| L07 | S040 | S040-T01 | `2c272761f294618a282bd9a412a3608d22fdd29fe980d481438a77c3886208f8` |
| L08 | S030 | S030-T01 | `45bb28cee99efe23b0263d0bc2a912f1eb1b6d1dca50e49c8c12f4c6d164d2ca` |
| L08 | S037 | S037-T01 | `71f36ff64975b96955626eee9c604f6a5de1b4fc8eb1ffba7fd559c20389b4d8` |
| L08 | S025 | S025-T01 | `66b84a43c74e66237c4049b0453309d1724120d30fe4eabea97f38667d75e48b` |
| L09 | S028 | S028-T01 | `abf704b22ce5bf7f23ee2702bf07ff76e633d948563944f47fe33388cba1cb99` |
| L10 | S034 | S034-T01 | `6332c96b6359dc458160ecfe98b54e0dcc2ab5cc147847cfff06f571324d68ea` |
| L10 | S038 | S038-T01 | `5edc1a4ddd2b4417f502e35c44b1724879b9a23aa699fe3e9d705aec3cda3085` |
| L10 | S016 | exposicio | `d43335d6ca50e24dfe0d17b43f31e2ad67f7040083b26a3628ebd936896b4df7` |
| L10 | S022 | dema | `dc75acf7a5f1dae1c4d229ce80f07a0257da22db6d95d0f7235b45a125f75f1f` |
| L10 | S023 | tancament | `5381bc85a25a80e20c3d2a43e0df955e8f64a4dc7ea5256b52ccd90daf8feb9a` |
| L11 | S035 | S035-T01 | `dd5c2f8d437d8badc54b86d04606388f9779377732870cfa0d185b86e19cc8ed` |
| L12 | S033 | S033-T01 | `721c65640ec567a0a597ef0dd92ea3aa0bf5108bb484c8769b7e1dae14a6dcb5` |

[Plans dels guions](../content/production-plans.json) · [Correccions exactes i aprovacions](../content/audio-repairs.json) · [Seguiment](seguiment-produccio.md).

Quan dues etiquetes designen la mateixa veu (Mar i Presentadora, Erinome), el payload agrupat utilitza una sola etiqueta i el manifest conserva el nom de parlant original per fragment. No es confon aquesta normalització tècnica amb canviar de personatge o de veu.
