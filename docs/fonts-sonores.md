# Fonts sonores i muntatges

Registre del que **realment se sent** en els màsters publicats. Les propostes encara no produïdes es distingeixen explícitament. Les fonts també són accessibles al desplegable «Fonts i crèdits sonors» de cada comprensió, fora del PDF.

## Producció S008R validada

El docent va validar el guió i el muntatge de la versió de ràdio el **19 de novembre de 2026**. El [programa S008R ja es pot escoltar](https://sentit.ortogra.fi/?escolta=ca-S008R): 99,77 segons de fragment i 104,88 amb la presentació. Una única petició a Gemini ha generat les 293 paraules de benvinguda, relat i comiat, amb Aoede. La presentació de S008 s’ha reutilitzat sense cap petició. Consum retornat pel proveïdor: **513 tokens d’entrada, 2.373 de sortida d’àudio, 2.886 en total**.

El muntatge inclou dos segons de separador original abans de la veu, una base instrumental atenuada sota la narradora, un pas de pàgina de mig segon amb petit solapament i dos segons de sortida musical després del comiat. Tot és original procedural, sense gravacions externes, sota la llicència MIT del projecte. La veu crua es conserva completa, sense retallar, accelerar, alentir o esvair. Les marques locals de paraula de Vosk només serveixen per situar el so de pàgina; no s’han fet peticions de verificació al núvol.

[Manifest amb aprovació, empremtes, consum i marques](../assets/audio/s008r-production-manifest.json) · [Síntesi amb topall d’una petició](../tools/produce-radio.cjs) · [Recepta de muntatge local](../tools/render-radio.cjs). El resultat continua en revisió d’audició docent. Les comprovacions tècniques no equivalen a una aprovació perceptiva de cada pronunciació.

La següent proposta és [S015](https://sentit.ortogra.fi/#lectura=ca-S015): una petició amb Puck i Kore per al títol i tota l’entrevista, amb un tall local posterior. El guió, el repartiment i l’escaleta encara s’han de validar. La presa antiga d’Aoede es conserva, però no es barreja amb la nova proposta de Nora.

## Veus

Les veus són síntesi de [Gemini TTS, de Google](https://ai.google.dev/gemini-api/docs/speech-generation), subjecta a les [condicions de Gemini API](https://ai.google.dev/gemini-api/terms). Aquesta referència identifica el proveïdor; no atribueix una llicència CC0 a la seva tecnologia. Els guions són originals de Sentit i consten als fitxers de contingut del repositori. No s’hi han incorporat gravacions de persones reals externes.

| Comprensió | Veus publicades | Música i efectes publicats |
| --- | --- | --- |
| ca-S001 · El senyal de la ràdio | Laia: Leda; Biel: Puck. Presentació: Aoede. | Tocs, silencis significatius i quatre notes de sortida originals, generats amb FFmpeg. |
| ca-S002 · Preparem una capsa de records | Una mestra: Aoede; presentació: Aoede. | Muntatge amb separació entre els blocs de passos. No hi ha enregistraments externs. |
| ca-S008 · La foto que faltava | **Una única narradora: Aoede**, sense nom dins del relat. Aina i Ferran hi són esmentats, però no parlen amb veu pròpia. | Base instrumental original amb atenuació sota la veu, transició de paper procedural i marges de silenci. És una prova de remuntatge; encara no inclou una benvinguda o un comiat de programa. |
| ca-S008R · La foto que faltava · Històries amb sentit | Una narradora: Aoede, també a la benvinguda i al comiat. Presentació reutilitzada de S008. | Separador original, base instrumental atenuada sota la veu, pas de pàgina i sortida musical. Produït; pendent d’audició docent. |
| ca-S015 · Una restauradora ens explica el seu ofici | **Pendent.** Hi ha una presa parcial local amb Puck i Aoede, sense màster publicat. | Escaleta proposada, pendent de validació. |
| ca-S023 · Reobren el mercat | **Pendent.** Aoede i Charon són la proposta del generador actual. | Escaleta proposada, pendent de validació. |

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

1. Preparar el guió complet, les preguntes i el solucionari. Identificar les veus que parlen, sense confondre-les amb personatges esmentats.
2. Preparar l’escaleta completa: presentació, entrada, ambients, música, possibles solapaments, pauses i comiat. Anotar cada font, autor, llicència i referència. Evitar que un efecte reveli una resposta o emmascari la parla.
3. **Validar amb el docent el guió, les veus i el muntatge abans d’enviar qualsevol petició de síntesi.** No n’hi ha prou amb validar un títol o un resum. La benvinguda i el comiat han de formar part del guió que es generarà.
4. Registrar la validació a `content/production-plans.json`: estat `approved`, data de la confirmació i empremta exacta del conjunt validat. `node tools/generate-prototypes.cjs --plan` mostra l’empremta sense llegir credencials ni fer peticions. No es marca una aprovació per iniciativa de l’agent.
5. Agrupar el text complet en una petició; reutilitzar les preses bones ja existents. Si el títol i el fragment comparteixen les veus, es poden generar junts i separar-los localment dins una pausa comprovada. Només reservar una petició separada per a la presentació quan calgui. El generador bloqueja peticions noves sense validació o si canvia el guió, el repartiment, la direcció de veu o l’escaleta. El control de quota continua vigent després d’aquest bloqueig.
6. Conservar sempre la presa crua. **No retallar automàticament amb una porta de soroll**: consonants sordes, atacs suaus i finals poden quedar per sota del llindar. En el remuntatge actual es conserva tot el WAV, s’afegeixen 250 ms abans i com a mínim 300 ms després, sense esvair la parla. Si el fonema ja falta en la presa crua, el silenci no el reconstrueix: cal anotar-ho i validar una nova presa.
7. Revisar per escolta els inicis, finals, consonants, ritme i balanç música/veu; després fer la prova amb alumnat. Els controls tècnics de nivell i integritat no substitueixen aquesta audició.

La proposta concreta de ràdio per a S008 i les escaletes dels altres prototips són a [production-plans.json](../content/production-plans.json). **S008R ja té validació de guió i muntatge, i s’ha produït amb una petició. S015 i S023 continuen pendents de validar.**

El material complet es pot revisar al [catàleg, amb el codi ca-S008R](https://sentit.ortogra.fi/#lectura=ca-S008R). El solucionari presenta tot el text parlat i les indicacions dels sons incorporats. La previsió i les preses originals queden conservades al registre de producció; el quadre «Talls per a Gemini» només es mostra als materials pendents, com S015 i S023. Aquests materials mantenen la marca d’aigua i la impressió bloquejada.

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

El selector de ritme va de ×0,80 a ×1,20 en passos de 0,05, amb conservació del to mitjançant el reproductor natiu del navegador. Només afecta el títol i el fragment; la sintonia, les instruccions enregistrades i els temporitzadors conserven la durada pròpia. `ritme=0.85` i `jingle=0` permeten fixar aquestes opcions a l’enllaç i al QR. Sense aquests paràmetres s’aplica ×1,00 i sintonia activa. Les pistes separades de presentació i cos acaben naturalment, sense tallar-les amb un temporitzador.
