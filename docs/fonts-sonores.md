# Fonts sonores i muntatges

Registre del que **realment se sent** en els màsters publicats. Les propostes encara no produïdes es distingeixen explícitament. Les fonts també són accessibles al desplegable «Fonts i crèdits sonors» de cada comprensió, fora del PDF.

Les 19 propostes que completen el catàleg base i S023 no tenen àudio nou. Preveuen sons procedurals originals, sense enregistraments externs. El [dossier editorial](lot-editorial-24.md) recull el repartiment proposat i les fonts factuals; cada solucionari mostra l’escaleta concreta. No s’han de confondre aquests recursos previstos amb fonts ja utilitzades en un màster.

## Producció S008R validada

El docent va validar el guió i el muntatge de la versió de ràdio el **19 de novembre de 2026**. El [programa S008R ja es pot escoltar](https://sentit.ortogra.fi/?escolta=ca-S008R): 99,77 segons de fragment i 104,88 amb la presentació. Una única petició a Gemini ha generat les 293 paraules de benvinguda, relat i comiat, amb Aoede. La presentació de S008 s’ha reutilitzat sense cap petició. Consum retornat pel proveïdor: **513 tokens d’entrada, 2.373 de sortida d’àudio, 2.886 en total**.

El muntatge inclou dos segons de separador original abans de la veu, una base instrumental atenuada sota la narradora, un pas de pàgina de mig segon amb petit solapament i dos segons de sortida musical després del comiat. Tot és original procedural, sense gravacions externes, sota la llicència MIT del projecte. La veu crua es conserva completa, sense retallar, accelerar, alentir o esvair. Les marques locals de paraula de Vosk només serveixen per situar el so de pàgina; no s’han fet peticions de verificació al núvol.

[Manifest amb aprovació, empremtes, consum i marques](../assets/audio/s008r-production-manifest.json) · [Síntesi amb topall d’una petició](../tools/produce-radio.cjs) · [Recepta de muntatge local](../tools/render-radio.cjs). El resultat continua en revisió d’audició docent. Les comprovacions tècniques no equivalen a una aprovació perceptiva de cada pronunciació.

## S015 · guió validat i àudio en revisió

El docent ha validat el guió, les veus i l’escaleta el **19 de novembre de 2026**. [S015 ja es pot escoltar](https://sentit.ortogra.fi/?escolta=ca-S015): Puck per a en Biel i el títol, Kore per a la Nora. Una petició, amb 601 tokens d’entrada i 3.349 d’àudio de sortida. Presa crua de 133,96 s; fragment muntat de 134,49 s i màster amb títol de 139,66 s. La presa antiga amb Aoede es conserva localment i no forma part del nou àudio.

El tall del títol és a 4,62 s, dins un silenci comprovat a −50,4 dBFS i amb 600 ms respecte als dos mots adjacents detectats. Es conserven totes dues parts de la veu, sense porta de soroll, esvaïment de la parla ni canvi de ritme. S’hi afegeixen marges exteriors. La sintonia inicial de l’entrevista acaba abans de la primera pregunta; l’ambient de sala desapareix abans de la resposta de la Nora. Només hi ha un paper breu al canvi de tema i una sintonia després de l’última frase. Cap música ni efecte sota llum, temperatura i humitat.

Tots aquests sons són procedurals originals de Sentit, sota MIT, sense gravacions externes. [Recepta de muntatge](../tools/render-interview.cjs) · [manifest de producció](../assets/audio/s015-production-manifest.json). La validació de l’àudio encara està pendent: les comprovacions tècniques no la substitueixen. [Seguiment per fases](seguiment-produccio.md).

La següent proposta és [S023](https://sentit.ortogra.fi/#lectura=ca-S023): Mar amb Erinome i Pau amb Charon, títol i notícia complets en una petició i tall local posterior. El guió i l’escaleta són visibles al solucionari. Encara no s’ha enviat a Gemini.

## Veus

Les veus són síntesi de [Gemini TTS, de Google](https://ai.google.dev/gemini-api/docs/speech-generation), subjecta a les [condicions de Gemini API](https://ai.google.dev/gemini-api/terms). Aquesta referència identifica el proveïdor; no atribueix una llicència CC0 a la seva tecnologia. Els guions són originals de Sentit i consten als fitxers de contingut del repositori. No s’hi han incorporat gravacions de persones reals externes.

| Comprensió | Veus publicades | Música i efectes publicats |
| --- | --- | --- |
| ca-S001 · El senyal de la ràdio | Laia: Leda; Biel: Puck. Presentació: Aoede. | Tocs, silencis significatius i quatre notes de sortida originals, generats amb FFmpeg. |
| ca-S002 · Preparem una capsa de records | Una mestra: Aoede; presentació: Aoede. | Muntatge amb separació entre els blocs de passos. No hi ha enregistraments externs. |
| ca-S003 · El paraigua intercanviat | Laia i presentació: Leda; Biel: Puck. Una petició, amb rialles breus sol·licitades dins la mateixa presa. | Passos de passadís i sortida, fregadís de bossa originals procedurals. Guió validat; àudio pendent d’audició. |
| ca-S012 · Qui arregla els instruments? | Puck: Biel i presentació; Algieba: Elies. Una petició conservada. | Guitarra real de khenshom, Freesound 537084, CC0, a l’obertura. Paper original MIT al canvi de tema i silenci al comiat. Àudio pendent d’audició. |
| ca-S016 · Una troballa al jaciment | Erinome: Mar i presentació. Una petició. | Capçalera, ambient inicial, paper i sortida originals de Sentit, MIT. Àudio pendent d’audició. |
| ca-S010 · La ruta fins al pavelló | Leda: Laia i presentació; Puck: Biel. Una petició. | Passos originals a l’arribada, la pausa del carreró i el comiat. Guió validat amb el canvi docent; àudio pendent d’audició. |
| ca-S018 · La clau de l’armari verd | Aoede: narradora adulta i presentació. Aina i Ferran són personatges narrats, sense veu pròpia. Una petició. | Base original «Records guardats», clau, cartró i paper. Fosa d’entrada, música molt baixa sota la veu i pujada amb fosa de sortida. Àudio pendent d’audició. |
| ca-S022 · L’últim trajecte del tramvia | Algenib: Ferran i presentació. Aina i el pare són personatges del record, sense torn de veu. Una petició. | Base original «Rails de memòria», tramvia, rail i paper procedurals. Fosa d’entrada, música molt baixa sota la veu i pujada amb fosa de sortida. Àudio pendent d’audició. |
| ca-S013 · Com viatja una carta? | Mireia i presentació: Aoede. Una petició. | Paper inicial, transició de paper i dues notes de sortida originals procedurals. Guió validat; àudio pendent d’audició. |
| ca-S008 · La foto que faltava | **Una única narradora: Aoede**, sense nom dins del relat. Aina i Ferran hi són esmentats, però no parlen amb veu pròpia. | Base instrumental original amb atenuació sota la veu, transició de paper procedural i marges de silenci. És una prova de remuntatge; encara no inclou una benvinguda o un comiat de programa. |
| ca-S008R · La foto que faltava · Històries amb sentit | Una narradora: Aoede, també a la benvinguda i al comiat. Presentació reutilitzada de S008. | Separador original, base instrumental atenuada sota la veu, pas de pàgina i sortida musical. Produït; pendent d’audició docent. |
| ca-S015 · Una restauradora ens explica el seu ofici | Puck: Biel i presentació. Kore: Nora. | Sintonia d’entrada i sortida, ambient molt baix i pàgina originals. Produït; àudio pendent de validar. |
| ca-S023 · Reobren el mercat | **Pendent.** Erinome i Charon són les veus proposades. | Capçalera, ambient de sala i passos/paper discrets, sortida original. Proposta pendent de validar; encara no produïda. |

La **sintonia inicial de Sentit**, opcional i activada per defecte, són quatre notes originals. Es reprodueix una sola vegada abans de la presentació, també en una sessió de diverses escoltes; no se superposa a la parla. No és la sintonia de sortida de S001. Les locucions de preparació i repàs són d’Aoede i s’han remasteritzat des de les preses ja conservades.

Les composicions procedurals i el codi de muntatge són originals del projecte, sota la [llicència MIT del repositori](../LICENSE). No s’hi utilitzen mostres de biblioteques musicals. Receptes, marges, mescla i generació de la sintonia: [remaster-audio.cjs](../tools/remaster-audio.cjs). Vegeu les durades exactes, les empremtes dels fitxers i les preses d’origen al [manifest de remasterització](../assets/audio/remaster-v2-manifest.json). Els noms de les preses fan referència a la còpia local de producció; no s’hi inclouen claus ni credencials.

## Pilot conservat: Canvi de plans

No apareix al catàleg docent, però conserva el seu enllaç de prova i les atribucions. Veus Aoede i Charon, amb síntesi Gemini. Fonts externes del muntatge:

| So | Autor | Font | Llicència |
| --- | --- | --- | --- |
| Pluja | ジダネ | [Rain.ogg](https://commons.wikimedia.org/wiki/File:Rain.ogg) | Domini públic, segons la fitxa de la font |
| Passos al passadís | cris | [FootSteps in a Concrete Corridor 1](https://freesound.org/people/cris/sounds/167685/) | CC0, segons la fitxa de la font |
| Porta | dleverett | [Door Opening Creaking](https://freesound.org/people/dleverett/sounds/710510/) | CC0, segons la fitxa de la font |
| Merla | tinga | [Common blackbird singing denoised](https://commons.wikimedia.org/wiki/File:Common_blackbird_singing_denoised.flac) | CC0, segons la fitxa de la font |

La còpia de treball i les atribucions del pilot es conserven al [registre general de crèdits](../CREDITS.md). Aquestes gravacions **no** s’utilitzen a S001, S002 o S008.

## Procés abans de consumir quota

L’esborrany passa primer la [revisió independent de coherència](revisio-coherencia.md), amb preguntes, solucionari i escaleta. La marca provisional no autoritza síntesi: després cal la validació docent següent.

1. Preparar el guió complet, les preguntes i el solucionari. Identificar les veus que parlen, sense confondre-les amb personatges esmentats.
2. Preparar l’escaleta completa: presentació, entrada, ambients, música, possibles solapaments, pauses i comiat. Anotar cada font, autor, llicència i referència. Evitar que un efecte reveli una resposta o emmascari la parla.
3. **Validar amb el docent el guió, les veus i el muntatge abans d’enviar qualsevol petició de síntesi.** No n’hi ha prou amb validar un títol o un resum. La benvinguda i el comiat han de formar part del guió que es generarà.
4. Registrar la validació a `content/production-plans.json`: estat `approved`, data de la confirmació i empremta exacta del conjunt validat. `node tools/generate-prototypes.cjs --plan` mostra l’empremta sense llegir credencials ni fer peticions. No es marca una aprovació per iniciativa de l’agent.
5. Agrupar el text complet en una petició; reutilitzar les preses bones ja existents. Si el títol i el fragment comparteixen les veus, es poden generar junts i separar-los localment dins una pausa comprovada. Només reservar una petició separada per a la presentació quan calgui. El generador bloqueja peticions noves sense validació o si canvia el guió, el repartiment, la direcció de veu o l’escaleta. El control de quota continua vigent després d’aquest bloqueig.
6. Conservar sempre la presa crua. **No retallar automàticament amb una porta de soroll**: consonants sordes, atacs suaus i finals poden quedar per sota del llindar. En el remuntatge actual es conserva tot el WAV, s’afegeixen 250 ms abans i com a mínim 300 ms després, sense esvair la parla. Si el fonema ja falta en la presa crua, el silenci no el reconstrueix: cal anotar-ho i validar una nova presa.
7. Revisar per escolta els inicis, finals, consonants, ritme i balanç música/veu; després fer la prova amb alumnat. Els controls tècnics de nivell i integritat no substitueixen aquesta audició.

Les escaletes i les aprovacions són a [production-plans.json](../content/production-plans.json). **S008R i S015 tenen la proposta validada i el muntatge produït amb una petició cadascuna. L’àudio continua pendent d’audició; S023 espera validar el guió i l’escaleta.**

El material complet es pot revisar al [catàleg, amb el codi ca-S008R](https://sentit.ortogra.fi/#lectura=ca-S008R). El solucionari presenta tot el text parlat i les indicacions dels sons incorporats. La previsió i les preses originals queden conservades al registre de producció; el quadre «Talls per a Gemini» es mostra a les propostes encara pendents. Els muntatges produïts mantenen «Àudio pendent de validar» al PDF i es poden imprimir per revisar. La impressió de S023 continua bloquejada.

### Escaleta de ràdio de S008R, validada

Una única narradora adulta, amb la mateixa veu Aoede. Aina i Ferran continuen sent persones del relat, sense torns de veu propis. Es manté íntegre el text actual i, per tant, les preguntes i les respostes no canvien.

| Moment | Parla i muntatge proposats |
| --- | --- |
| Abans de la sessió | Sintonia de marca opcional, títol i instruccions segons la configuració docent. |
| Entrada del fragment | Separador musical original breu. «Benvingudes i benvinguts a Històries amb sentit. Avui: La foto que faltava.» |
| Narració | Els sis paràgrafs actuals, amb curiositat al descobriment de l’espai buit i alleujament a l’explicació. Base instrumental baixa, atenuada mentre parla. |
| Transició | Un únic pas de pàgina discret entre blocs, compatible amb el fons musical; sense repetir-lo a cada menció d’una fotografia. |
| Comiat | «Gràcies per escoltar Històries amb sentit. Ens retrobem al pròxim programa.» La base puja suaument quan acaba la veu, es fon i deixa una cua de silenci. |

La benvinguda, el relat i el comiat s’han generat junts en una petició, i el títol s’ha reutilitzat. No s’han enviat frases soltes per anar provant ni s’ha allargat digitalment la veu per assolir un temps prefixat. El màster de S008R incorpora aquesta entrada i aquest comiat. El de S008 es conserva amb el seu codi i àudio anteriors.

## Reproducció i QR

### Proposta de sintonia comuna de la Mireia

[Escolta l’obertura i el tancament](https://sentit.ortogra.fi/proves/sintonies-mireia.html). «Petita descoberta» és una composició original de Sentit, sota MIT, amb percussió afinada càlida, piano suau i baix discret. Obertura de 3,8 s i tancament de 3,4 s; sense veus, mostres externes ni peticions d’API. [Recepta](../tools/propose-mireia-jingle.cjs) · [manifest amb nivells i empremtes](../assets/audio/mireia-jingle-proposta-v1.json).

La parella és **pendent de validació separada** i encara no s’ha incorporat a cap programa. S020 té les veus autoritzades i rebudes, però espera aquesta elecció abans del muntatge. La recepció consta a [production-progress.js](../content/production-progress.js); no equival a validar-ne l’àudio final.

### Escenes d’aula amb tres veus

S007, S011 i S017 proposen Mireia/Aoede, Laia/Leda i Biel/Puck. Cada peça preveu dues peticions, ja que [Gemini TTS admet dues veus per petició](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/text-to-speech/overview#multi-speaker-tts): una amb títol i torns de la mestra i una amb els dels alumnes, amb pauses llargues entre intervencions. El muntatge haurà d’intercalar les preses en l’ordre del guió dins silencis comprovats, sense retallar fonemes. El planificador permet inspeccionar els dos paquets; el productor d’una sola presa els rebutja expressament. Abans de produir-les cal la validació docent i preparar l’execució agrupada, sense fer crides per cada frase.

### Produccions S003 i S013

El docent n’ha autoritzat explícitament la producció el 20/11/2026. [Recepta de muntatge](../tools/render-proposal.cjs) i manifests [S003](../assets/audio/s003-production-manifest.json) / [S013](../assets/audio/s013-production-manifest.json). Veus de Gemini, sota les seves condicions; tots els ambients i efectes són originals procedurals amb FFmpeg, sota MIT. No s’utilitzen mostres externes. Preses crues conservades, tall del títol dins un silenci comprovat amb mostres, marges als extrems i cap canvi de velocitat.

La rialla de S003 es demana amb dos `<chuckle>` i una reacció entre barres dins el mateix torn, segons la [guia oficial de Gemini TTS](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/text-to-speech/prompting-guide). No es llegeix «ha, ha» ni l’acotació; el resultat efectiu i la seva naturalitat requereixen l’audició docent. S019 proposa el mateix sistema de reacció simultània per a «Sí, sí», una sola vegada; no està autoritzada ni sintetitzada.

El selector de ritme va de ×0,80 a ×1,20 en passos de 0,05, amb conservació del to mitjançant el reproductor natiu del navegador. Només afecta el títol i el fragment; la sintonia, les instruccions enregistrades i els temporitzadors conserven la durada pròpia. `ritme=0.85` i `jingle=0` permeten fixar aquestes opcions a l’enllaç i al QR. Sense aquests paràmetres s’aplica ×1,00 i sintonia activa. Les pistes separades de presentació i cos acaben naturalment, sense tallar-les amb un temporitzador.


### Produccions S010, S018 i S022

Guions i escaletes validats pel docent el 20/11/2026. Una petició completa per peça, amb títol separat localment dins un silenci comprovat. Fragments de 99,48 s, 177,38 s i 176,195 s, respectivament. Preses crues conservades, sense retallar fonemes ni modificar el ritme. Manifests amb empremtes i nivells: [S010](../assets/audio/s010-production-manifest.json), [S018](../assets/audio/s018-production-manifest.json) i [S022](../assets/audio/s022-production-manifest.json). Els muntatges continuen pendents d’audició docent.

Les bases de S018 i S022 són composicions originals diferents, sota MIT, sense mostres externes. El [registre de músiques](musiques.md) identifica títol, autor, llicència, recepta i usos; els manifests mesuren el balanç amb la veu i els marges de les foses. Les bases de narració no són les sintonies recurrents d’un programa. Les connexions entre històries i programes consten a [l’univers editorial](univers-editorial.md).


### Guitarra real de S012

Font seleccionada per substituir les notes sintètiques: **khenshom · Guitar string snap or breaks - various sounds**, [Freesound 537084](https://freesound.org/people/khenshom/sounds/537084/), [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). L’autor documenta una gravació amb micròfon Sennheiser MKE600 i Zoom H5. Es conserva la còpia pública HQ MP3, no el WAV original. [Registre de la font, empremta i transformacions](../content/sound-sources.js).

Fragment seleccionat: 2,7–5,4 s. Guitarra real només a l’obertura, sense canvi de to o velocitat, deixant-la acabar abans de la parla. No es representa que una corda es trenqui ara ni es demana identificar-ne l’avaria. El tancament queda en silenci per no suggerir una reparació acabada. El paper és original de Sentit (MIT); la guitarra conserva CC0 i no es presenta com un so procedural propi. L’encaix i la naturalitat quedaran pendents d’audició docent del muntatge.


### Muntatges S012 i S016

S012 té un fragment de 112,39 s i un màster amb títol de 116,57 s. La presa completa de 120,04 s es conserva localment. Després de la revisió dels tancaments, s’elimina només la primera part abstracta del darrer torn: retall entre 110,355 i 118,575 s, dins dos silencis comprovats; es conserva «Gràcies, Elies.» íntegre. Cap segona petició, canvi de to ni canvi de velocitat. L’aprovació de la presa original, l’edició i els nivells dels silencis consten al [manifest S012](../assets/audio/s012-production-manifest.json). El pla de treball identifica 0 peticions noves i una presa conservada; el consum històric total és d’una petició.

S016 té un fragment de 135,23 s i un màster amb títol de 140,61 s, amb el tancament concret mostrat i confirmat pel docent. Una petició; tall de títol en silenci comprovat, sense retallar parla, i paper ajustat a la pausa disponible. [Manifest S016](../assets/audio/s016-production-manifest.json). Tots dos muntatges continuen pendents d’audició docent.
