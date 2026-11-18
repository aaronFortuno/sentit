# Sentit

Banc de comprensió oral d’ortogra.fi. El docent busca una activitat, en previsualitza la fitxa i el solucionari i imprimeix el document triat. L’alumnat fa la feina al paper. El QR i l’enllaç imprès obren directament l’àudio.

[Obre Sentit](https://sentit.ortogra.fi/)

El projecte es manté a la sèrie **0.1.x** mentre es revisen les primeres activitats i la interfície. El pas a **0.2** requereix una comprensió oral validada en tots els aspectes —àudio, fitxa i solucionari— i una interfície prou definida.

## Prepara una fitxa

«El senyal de la ràdio» és una activitat de nivell accessible per a 5è de primària, amb Leda per a la Laia i Puck per a en Biel. El fragment dura aproximadament 1 minut i 17 segons; amb la presentació, 1 minut i 22 segons. «Canvi de plans» conserva l’àudio i l’enllaç del pilot, però no apareix al catàleg.

La primera tanda afegeix **S002 · Preparem una capsa de records** (3r, instruccions accessibles, 50 segons i 6 preguntes) i **S008 · La foto que faltava** (4t, narració accessible, 1 minut i 25 segons i 6 preguntes). Totes dues tenen àudio, il·lustració, fitxa i solucionari. S015 de 5è i S023 de 6è tenen els guions, preguntes, respostes, pistes i imatges preparats; es poden revisar i maquetar al catàleg amb la marca «Àudio en preparació», sense reproductor ni QR fins a acabar els MP3. [Guions i registre de la primera tanda](docs/primera-tanda.md).

La [revisió editorial dels cinc prototips](docs/revisio-editorial-prototips.md) concreta per què s’assigna cada curs i dificultat i què s’accepta a les 38 preguntes. Les respostes orientatives admeten paraules pròpies i diferencien la informació necessària dels detalls addicionals. Es mantenen els guions i els àudios; S008 necessita validar el ritme amb alumnat abans de donar-la per accessible de manera definitiva. Les etiquetes són orientatives i no equivalen a nivells oficials.

- Catàleg amb cinc comprensions i targetes amb icona, color suau i il·lustració de context al fons. La dificultat té un punt verd (accessible), dos blaus (intermèdia) o tres rosats (avançada), sempre acompanyats del text. Cerca per títol o codi i filtres combinables, amb l’idioma del text en primer lloc.
- Ajustos de tipografia, mida, espaiat i interlineat, amb codi d’aula opcional.
- Controls de línies de resposta i d’amagar preguntes al costat de cada enunciat, quan s’hi passa el ratolí o s’hi accedeix amb el teclat. En pantalla tàctil, el botó de tres punts obre aquests controls. A **Preguntes amagades** es poden recuperar les preguntes excloses.
- Vista A4 de la fitxa amb QR i del solucionari amb respostes orientatives i transcripció de l’àudio. El diàleg d’impressió permet desar el document seleccionat com a PDF.
- Al solucionari, els enunciats van en negreta i les respostes orientatives dins d’un requadre suau. La transcripció fa servir una mida menor i un interlineat més compacte. Les respostes localitzables porten **Veure la transcripció**, del mateix color que els passatges ressaltats i numerats. **Ressalta les pistes a la transcripció**, activat per defecte, permet obtenir un solucionari sense marques ni indicacions de color. Aquesta preferència es desa amb la fitxa i en cada col·lecció.
- **Imatge de context** permet mostrar o amagar la il·lustració, canviar-ne l’amplada (30–90 mm, 80 mm per defecte) i situar-la a l’esquerra, al centre o a la dreta. A la fitxa s’alinea amb el títol i el text de les instruccions envolta la imatge; al solucionari acompanya el títol i el text de la transcripció. A l’esquerra o a la dreta, el text recupera tota l’amplada quan supera la imatge; al centre es mostra en una fila pròpia. La imatge aporta context sense revelar les respostes i els ajustos es desen amb la fitxa o col·lecció.
- Reproductor docent i vista d’escolta directa. L’àudio comença quan es prem el botó.
- Amb **Sessió pautada**, tria el temps per llegir les preguntes, el nombre d’escoltes i la pausa entre escoltes. Els valors inicials són 60 segons, dues escoltes i 30 segons de pausa. El QR, l’adreça i el resum imprès segueixen aquests ajustos. Amb el mode desactivat, l’enllaç obre el reproductor d’escolta lliure.
- Les locucions inicial i entre escoltes es poden activar independentment. Amb 60 segons de lectura, la locució indica «un minut». Amb una altra durada, remet al compte enrere. Els temps programats s’apliquen també quan es desactiven les locucions.
- El quadre gris d’instruccions al full es pot mostrar o amagar. El text es genera a partir del temps de lectura, el nombre d’escoltes i les pauses efectives; és independent de l’activació de les locucions. La capçalera té la marca i «comprensió oral», el nom i la data apilats i el bloc d’escolta en una mateixa fila; el títol i el codi d’aula van a sota. Els valors inicials de format són Georgia de 12 punts, 7 mm d’espaiat i interlineat d’1,6, amb línies de resposta de 9 mm.
- Interfície en català i castellà. Cada fitxa conserva l’idioma propi de l’activitat.
- Selector d’interfície amb menú propi i navegació per teclat. La capçalera tria una de dotze frases en obrir el web; es pot prémer per descobrir-ne una altra. El canvi d’idioma conserva la mateixa idea traduïda.

`motion.js` centralitza el moviment dels panells, menús, finestres i canvis de vista amb el valor `--motion: 220ms`. El tancament també s’anima; els clics successius cancel·len la transició anterior. Es respecta la preferència de moviment reduït i les animacions no afecten la impressió. `mottos.js` conserva les frases aparellades en català i castellà; `language-menu.js` gestiona el selector.

La preparació té dos passos. Primer es tria una comprensió al catàleg, amb els filtres i les col·leccions a l’esquerra. En obrir una targeta s’accedeix a l’editor, amb el full i el sidebar d’àudio i impressió. La fletxa de retorn conserva els filtres i permet tornar al catàleg. L’accés a la vista d’escolta i el botó per imprimir el document seleccionat queden visibles mentre es consulten els ajustos. En pantalles petites, **Àudio i impressió** desplega els ajustos.

## Col·leccions del docent

Mantén premuda una targeta (o fes-hi clic dret) per obrir les accions: afegir-la a una col·lecció existent, crear-ne una o treure-la de l’actual. Un clic curt continua obrint la fitxa. Amb teclat, **Majúscules + F10** obre el menú i **Escape** el tanca.

Dins d’una col·lecció, arrossega les mateixes targetes per ordenar-les, amb ratolí o pantalla tàctil; **Alt + fletxes** permet moure la targeta enfocada. L’ordre es desa en deixar anar. Les comprensions que amaguen els filtres mantenen la seva posició relativa i un error d’emmagatzematge restaura l’ordre desat. El sidebar permet canviar el nom, afegir-hi comprensions o eliminar la col·lecció.

Per treballar amb diverses comprensions alhora, prem **Selecciona comprensions**, fes clic o prem Espai sobre les targetes (sense caselles), o selecciona tots els resultats filtrats, i desa la selecció en una col·lecció nova o existent. El selector de col·leccions acota el catàleg.

Cada comprensió conserva dins de cada col·lecció el format, el codi d’aula, les preguntes incloses, les línies de resposta, les instruccions impreses i els ajustos de sessió. En crear una col·lecció es copien els ajustos de la selecció d’origen; després cada còpia és independent. Afegir de nou una comprensió que s’havia tret recupera els seus ajustos en aquella col·lecció. Eliminar tota la col·lecció elimina també aquestes còpies.

Les col·leccions es desen automàticament en el navegador i es recuperen en tornar al web. El format es guarda amb la pertinença i l’ordre en una única escriptura a `sentit.collections.v1`. No hi ha compte ni sincronització entre dispositius. Si el navegador no permet desar-hi dades, es mostra un avís.

## Personatges recurrents

La [galeria de personatges](https://sentit.ortogra.fi/personatges.html), accessible des del catàleg i del quadre V4V, presenta Laia, Biel, Aina, Mireia, Nora, Mar, Pau i Ferran. Cada fitxa té referències visuals des de diversos angles, caràcter, interessos, manera de parlar i una veu Gemini associada. Laia–Leda, Biel–Puck i Mireia–Aoede parteixen de veus ja escoltades; les altres cinc assignacions són candidates pendents d’una prova en català.

Els [criteris de continuïtat](docs/personatges.md) fixen noms, identitats i episodis independents, sense ordre obligatori ni coneixement previ per respondre. [content/characters.js](content/characters.js) és el registre editorial que alimenta la galeria; els [models i prompts](assets/characters/README.md) serveixen per generar escenes noves sense confondre personatges.

Les candidates no canvien la producció automàticament: la presa parcial de Nora encara és Aoede i el pla anterior de S023 preveu Aoede per a la presentadora. Abans de produir amb el repartiment nou cal provar les candidates i actualitzar les assignacions de síntesi i els crèdits. Els fitxers antics es conserven i no es barregen dues identitats vocals d’un personatge dins del mateix màster.

La [prova de veus d’«El senyal de la ràdio»](proves/veus-s001.html) permet comparar les dues primeres intervencions amb Aoede–Charon i Leda–Puck. La comprensió completa fa servir les veus juvenils. Cal ajustar-hi l’edat i el context dels personatges dels guions futurs.

La [revisió del prototip S001](content/el-senyal-de-la-radio-revisio.md) recull la durada, els nivells de so, l’ordre dels senyals i la correspondència de cada pregunta amb el que s’escolta. La prova d’audició del docent i la prova amb alumnat completaran la validació.

## Proposta del fons inicial

La [proposta de catàleg](docs/proposta-cataleg.md) planteja 24 activitats de 3r a 6è, amb sis tipologies i un repartiment equilibrat de dificultats. La primera tanda de quatre prototips s’ha autoritzat: S002 i S008 ja es poden escoltar i preparar; S015 i S023 tenen les fitxes accessibles i esperen completar la síntesi. La resta continua com a proposta editorial. La [previsió de cost](docs/cost-produccio.md) calcula escenaris de 100, 200 i 300 activitats, amb marge de repetició i tarifes de 2026 i 2027. No s’ha activat facturació.

## Desenvolupament

HTML, CSS i JavaScript executats al navegador. GitHub Pages serveix la branca `main` des de l’arrel. No cal compilar.

```sh
node tools/serve.cjs
```

La comprovació del model de col·leccions s’executa amb `node tools/check-collections.mjs`: cobreix les còpies independents, l’ordre, la recuperació de maquetacions i els errors d’emmagatzematge. `node tools/check-catalog-gestures.cjs` prova els gestos i la persistència al navegador local (Playwright i Chrome). `catalog-gestures.js` adapta el controlador de Trama i utilitza SortableJS 1.15.7 local, sense dependència d’un CDN.

A les targetes, quatre segments horitzontals comparen la durada del fragment: un fins a 1 minut, dos fins a 2, tres fins a 3 i quatre per sobre de 3. El temps exacte es mostra al costat del rellotge. Per als materials pendents, l’indicador pren el límit superior de l’interval previst; no representa la durada de tota la sessió pautada.

`node tools/check-catalogue.mjs` comprova els identificadors, els fitxers, les preguntes i els límits dels filtres de durada. `node tools/check-audio-plan.cjs` comprova el pla de dues peticions, la recuperació de preses i les aturades de quota, sense xarxa.

`node tools/check-evidence.mjs` comprova que totes les pistes declarades existeixin a la transcripció i valida la conservació del text, la numeració de les preguntes visibles, els solapaments i els talls entre pàgines.

Obre `http://127.0.0.1:4231/`. Per provar l’àudio en local, prem **Obre la vista d’escolta**. El QR imprès i **Copia l’enllaç** fan servir l’adreça pública. L’enllaç d’escolta inclou l’idioma i el codi, com a `?escolta=ca-S001`. Cada parell d’idioma i codi identifica una única activitat.

Els enllaços que inclouen `p`, com `?escolta=ca-S001&p=60-2-30`, programen una sessió. Els tres valors són els segons de lectura (0–300), les escoltes (1–3) i els segons entre escoltes (0–300). Els enllaços sense `p` obren l’escolta lliure. A la sessió pautada, l’àudio i els temps d’espera comparteixen el mateix rellotge, de manera que el botó pot pausar o reprendre tota la seqüència.

Un quart valor opcional dins de `p` desa les locucions activades. `0` les desactiva totes dues, `1` activa la inicial, `2` activa la d’entre escoltes i `3` activa totes dues. Els enllaços de tres valors activen totes dues locucions. El resum imprès mostra també les locucions previstes.

Les fitxes viuen a `catalogue.js`. Cada activitat declara l’identificador, el codi, l’idioma, el curs, la dificultat, la durada en segons, el tipus, el fitxer d’àudio i les preguntes. Cada pregunta té un identificador estable, un enunciat, una resposta orientativa i un nombre inicial de línies.

`catalog.js` gestiona els filtres, la cerca i les col·leccions. Mostra les targetes en blocs de 12 per evitar crear tot el catàleg al DOM. Els idiomes disponibles es deriven de les dades; cada activitat necessita un `id` únic al catàleg complet i un parell `language`/`code` inequívoc. La durada filtrada correspon al fragment escoltat, sense la locució inicial. Els materials en preparació declaren `durationEstimate: { min, max }`: s’hi mostra un interval previst i només entren en els filtres de durada compatibles amb aquest interval. En disposar d’àudio, preval sempre la durada real. `collections.js` desa els identificadors i les còpies de maquetació; `worksheet.js` i `worksheet.css` generen el full. L’adreça docent `#lectura=ca-S001` obre l’editor i distingeix l’idioma; `col` identifica una col·lecció d’aquest navegador. L’`id` intern continua identificant els ajustos i les col·leccions. Els enllaços i QR d’escolta fan servir el mateix parell d’idioma i codi a `escolta`, i `p` per als temps de la sessió.

La il·lustració és opcional a les dades: `image` conté `src`, `alt`, `width` i `height` en píxels. Les dimensions permeten reservar l’espai abans que es descarregui el fitxer i mantenen la paginació estable. Els ajustos locals són `showImage`, `imageWidth` en mil·límetres i `imagePosition`. [Fitxers i prompts de les il·lustracions](assets/images/README.md).

Per etiquetar la dificultat, valora conjuntament la densitat de la informació, el ritme de l’àudio i les relacions que l’alumnat ha de fer entre fragments per respondre. La durada té un filtre propi.

La transcripció segueix l’ordre de l’àudio. `introduction` conté la locució inicial, si n’hi ha. Al diàleg o narració, cada bloc té text i, quan hi intervé una veu, pot portar el nom del personatge. Els senyals sonors rellevants per a l’activitat es poden indicar entre claudàtors. Conserva l’identificador i l’àudio associat dels fulls publicats. Una revisió editorial que canviï una resposta necessita un identificador i un codi nous.

Per vincular una resposta amb la transcripció, dona un `id` estable al bloc i declara a la pregunta un camp `evidence`, per exemple `[{ part: 'cartell', quote: 'es faria a la biblioteca.' }]`. Es poden indicar diversos passatges per pregunta. La cita ha de coincidir exactament amb el text; si es repeteix dins del mateix bloc, `occurrence` selecciona l’aparició comptant des de zero. Les preguntes d’opinió o globals no necessiten aquest camp. Els colors es mantenen per pregunta i els números segueixen la selecció impresa. Si coincideixen pistes de preguntes diferents, el ressalt es divideix en bandes de color. `evidence.js` resol aquestes referències i `showEvidence`, dins dels ajustos de la fitxa, controla si es mostren.

Per habilitar la sessió pautada d’una fitxa, `fragment.start` indica en segons on comença el fragment dins de l’MP3 i `fragment.seconds` n’indica la durada arrodonida per al resum de paper. Afegeix a `session.js` les locucions reutilitzables de cada idioma.

Els enregistraments es generen i es mesclen fora del web. El repositori públic conté el fitxer acabat i els seus crèdits. La producció pot reutilitzar la configuració amb Gemini i FFmpeg provada al pilot.

## Generació i represa dels àudios

El generador és a `tools/generate-prototypes.cjs`. Sense `--generate`, només mostra el pla i no accedeix a la xarxa ni a les credencials:

```sh
node tools/generate-prototypes.cjs --plan
node tools/check-audio-plan.cjs
```

Una activitat nova fa una petició pel fragment complet, amb tots els paràgrafs i torns de veu, i una per la presentació. Les preses antigues no s’eliminen: els màsters complets es conserven i una activitat parcial reutilitza el prefix disponible i agrupa la resta en una sola petició. Per a S015 i S023 queden quatre peticions previstes en total, si no calen reintents.

Després del restabliment de quota, amb Gemini configurat i FFmpeg disponible:

```sh
node tools/generate-prototypes.cjs --generate --only=S015
node tools/generate-prototypes.cjs --generate --only=S023
```

Els WAV, registres i màsters de treball es conserven a `../output/sentit-primera-tanda`, fora del repositori. El generador admet `GEMINI_API_KEY` a l’entorn o el fitxer privat de treball `../.private/comprensio-oral/gemini.env`; aquestes dades no s’envien al web. `FFMPEG_PATH` permet indicar el binari si no és al PATH ni a la instal·lació local coneguda. Cal Node amb `fetch` i `parseEnv`.

`--generate` respecta l’aturada de quota abans de fer cap petició, deixa almenys 22 segons entre inicis i impedeix dues execucions simultànies amb un lock. Guarda un registre de cada intent. Un error 5xx admet un únic reintent; els errors de connexió, autenticació i quota aturen l’execució. El lock no es retira automàticament si queda orfe: cal comprovar-ne el procés abans de reprendre. No s’ha activat facturació.

El guió ha de coincidir amb les empremtes de les preses reutilitzades. En acabar, s’actualitzen la durada, l’offset de presentació, l’estat i el manifest d’àudio; encara cal revisar el màster i els fulls abans de publicar. La [revisió dels quatre materials](docs/revisio-materials.md) documenta les comprovacions editorials, de filtres i de maquetació.

Consulta els [crèdits](CREDITS.md) i la [llicència del codi](LICENSE).
