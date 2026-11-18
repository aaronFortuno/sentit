# Sentit

Banc de comprensió oral d’ortogra.fi. El docent busca una activitat, en previsualitza la fitxa i el solucionari i imprimeix el document triat. L’alumnat fa la feina al paper. El QR i l’enllaç imprès obren directament l’àudio.

[Obre Sentit](https://sentit.ortogra.fi/)

El projecte es manté a la sèrie **0.1.x** mentre es revisen les primeres activitats i la interfície. El pas a **0.2** requereix una comprensió oral validada en tots els aspectes —àudio, fitxa i solucionari— i una interfície prou definida.

## Prepara una fitxa

«El senyal de la ràdio» és una activitat de nivell accessible per a 5è de primària, amb Leda per a la Laia i Puck per a en Biel. El fragment dura aproximadament 1 minut i 17 segons; amb la presentació, 1 minut i 22 segons. «Canvi de plans» conserva l’àudio i l’enllaç del pilot.

- Catàleg amb targetes, cerca per títol o codi i filtres combinables de curs, dificultat, durada, tipus i idioma del text.
- Ajustos de tipografia, mida, espaiat i interlineat, amb codi d’aula opcional.
- Controls de línies de resposta i d’amagar preguntes al costat de cada enunciat, quan s’hi passa el ratolí o s’hi accedeix amb el teclat. En pantalla tàctil, el botó de tres punts obre aquests controls. A **Preguntes amagades** es poden recuperar les preguntes excloses.
- Vista A4 de la fitxa amb QR i del solucionari amb respostes orientatives i transcripció de l’àudio. El diàleg d’impressió permet desar el document seleccionat com a PDF.
- Al solucionari, els enunciats van en negreta i les respostes orientatives dins d’un requadre suau. La transcripció fa servir una mida menor i un interlineat més compacte. Les respostes localitzables porten **Veure la transcripció**, del mateix color que els passatges ressaltats i numerats. **Ressalta les pistes a la transcripció**, activat per defecte, permet obtenir un solucionari sense marques ni indicacions de color. Aquesta preferència es desa amb la fitxa i en cada col·lecció.
- **Imatge de context** permet mostrar o amagar la il·lustració, canviar-ne l’amplada (30–90 mm, 45 mm per defecte) i situar-la a l’esquerra, al centre o a la dreta. A la fitxa acompanya les instruccions; al solucionari acompanya la transcripció. La imatge aporta context sense revelar les respostes i els ajustos es desen amb la fitxa o col·lecció.
- Reproductor docent i vista d’escolta directa. L’àudio comença quan es prem el botó.
- Amb **Sessió pautada**, tria el temps per llegir les preguntes, el nombre d’escoltes i la pausa entre escoltes. Els valors inicials són 60 segons, dues escoltes i 30 segons de pausa. El QR, l’adreça i el resum imprès segueixen aquests ajustos. Amb el mode desactivat, l’enllaç obre el reproductor d’escolta lliure.
- Les locucions inicial i entre escoltes es poden activar independentment. Amb 60 segons de lectura, la locució indica «un minut». Amb una altra durada, remet al compte enrere. Els temps programats s’apliquen també quan es desactiven les locucions.
- El quadre gris d’instruccions al full es pot mostrar o amagar. El text es genera a partir del temps de lectura, el nombre d’escoltes i les pauses efectives; és independent de l’activació de les locucions. La capçalera té la marca i «comprensió oral», el nom i la data apilats i el bloc d’escolta en una mateixa fila; el títol i el codi d’aula van a sota. Els valors inicials de format són Georgia de 12 punts, 7 mm d’espaiat i interlineat d’1,6, amb línies de resposta de 9 mm.
- Interfície en català i castellà. Cada fitxa conserva l’idioma propi de l’activitat.

La preparació té dos passos. Primer es tria una comprensió al catàleg, amb els filtres i les col·leccions a l’esquerra. En obrir una targeta s’accedeix a l’editor, amb el full i el sidebar d’àudio i impressió. La fletxa de retorn conserva els filtres i permet tornar al catàleg. L’accés a la vista d’escolta i el botó per imprimir el document seleccionat queden visibles mentre es consulten els ajustos. En pantalles petites, **Àudio i impressió** desplega els ajustos.

## Col·leccions del docent

Prem **Selecciona comprensions**, marca les targetes o tots els resultats filtrats i desa la selecció en una col·lecció nova o afegeix-la a una d’existent. El selector de col·leccions acota el catàleg. **Gestiona la col·lecció** permet canviar-ne el nom, ordenar les comprensions amb les fletxes o arrossegant-les, treure’n alguna i afegir-ne més.

Cada comprensió conserva dins de cada col·lecció el format, el codi d’aula, les preguntes incloses, les línies de resposta, les instruccions impreses i els ajustos de sessió. En crear una col·lecció es copien els ajustos de la selecció d’origen; després cada còpia és independent. Afegir de nou una comprensió que s’havia tret recupera els seus ajustos en aquella col·lecció. Eliminar tota la col·lecció elimina també aquestes còpies.

Les col·leccions es desen automàticament en el navegador i es recuperen en tornar al web. El format es guarda amb la pertinença i l’ordre en una única escriptura a `sentit.collections.v1`. No hi ha compte ni sincronització entre dispositius. Si el navegador no permet desar-hi dades, es mostra un avís.

La [prova de veus d’«El senyal de la ràdio»](proves/veus-s001.html) permet comparar les dues primeres intervencions amb Aoede–Charon i Leda–Puck. La comprensió completa fa servir les veus juvenils. Cal ajustar-hi l’edat i el context dels personatges dels guions futurs.

La [revisió del prototip S001](content/el-senyal-de-la-radio-revisio.md) recull la durada, els nivells de so, l’ordre dels senyals i la correspondència de cada pregunta amb el que s’escolta. La prova d’audició del docent i la prova amb alumnat completaran la validació.

## Desenvolupament

HTML, CSS i JavaScript executats al navegador. GitHub Pages serveix la branca `main` des de l’arrel. No cal compilar.

```sh
node tools/serve.cjs
```

La comprovació del model de col·leccions s’executa amb `node tools/check-collections.mjs`: cobreix les còpies independents, l’ordre, la recuperació de maquetacions i els errors d’emmagatzematge.

`node tools/check-evidence.mjs` comprova que totes les pistes declarades existeixin a la transcripció i valida la conservació del text, la numeració de les preguntes visibles, els solapaments i els talls entre pàgines.

Obre `http://127.0.0.1:4231/`. Per provar l’àudio en local, prem **Obre la vista d’escolta**. El QR imprès i **Copia l’enllaç** fan servir l’adreça pública. L’enllaç d’escolta inclou l’idioma i el codi, com a `?escolta=ca-S001`. Cada parell d’idioma i codi identifica una única activitat.

Els enllaços que inclouen `p`, com `?escolta=ca-S001&p=60-2-30`, programen una sessió. Els tres valors són els segons de lectura (0–300), les escoltes (1–3) i els segons entre escoltes (0–300). Els enllaços sense `p` obren l’escolta lliure. A la sessió pautada, l’àudio i els temps d’espera comparteixen el mateix rellotge, de manera que el botó pot pausar o reprendre tota la seqüència.

Un quart valor opcional dins de `p` desa les locucions activades. `0` les desactiva totes dues, `1` activa la inicial, `2` activa la d’entre escoltes i `3` activa totes dues. Els enllaços de tres valors activen totes dues locucions. El resum imprès mostra també les locucions previstes.

Les fitxes viuen a `catalogue.js`. Cada activitat declara l’identificador, el codi, l’idioma, el curs, la dificultat, la durada en segons, el tipus, el fitxer d’àudio i les preguntes. Cada pregunta té un identificador estable, un enunciat, una resposta orientativa i un nombre inicial de línies.

`catalog.js` gestiona els filtres, la cerca i les col·leccions. Mostra les targetes en blocs de 12 per evitar crear tot el catàleg al DOM. Els idiomes disponibles es deriven de les dades; cada activitat necessita un `id` únic al catàleg complet i un parell `language`/`code` inequívoc. La durada filtrada correspon al fragment escoltat, sense la locució inicial. `collections.js` desa els identificadors i les còpies de maquetació; `worksheet.js` i `worksheet.css` generen el full. L’adreça docent `#lectura=ca-S001` obre l’editor i distingeix l’idioma; `col` identifica una col·lecció d’aquest navegador. L’`id` intern continua identificant els ajustos i les col·leccions. Els enllaços i QR d’escolta fan servir el mateix parell d’idioma i codi a `escolta`, i `p` per als temps de la sessió.

La il·lustració és opcional a les dades: `image` conté `src`, `alt`, `width` i `height` en píxels. Les dimensions permeten reservar l’espai abans que es descarregui el fitxer i mantenen la paginació estable. Els ajustos locals són `showImage`, `imageWidth` en mil·límetres i `imagePosition`. [Fitxers i prompts de les il·lustracions](assets/images/README.md).

Per etiquetar la dificultat, valora conjuntament la densitat de la informació, el ritme de l’àudio i les relacions que l’alumnat ha de fer entre fragments per respondre. La durada té un filtre propi.

La transcripció segueix l’ordre de l’àudio. `introduction` conté la locució inicial, si n’hi ha. Al diàleg o narració, cada bloc té text i, quan hi intervé una veu, pot portar el nom del personatge. Els senyals sonors rellevants per a l’activitat es poden indicar entre claudàtors. Conserva l’identificador i l’àudio associat dels fulls publicats. Una revisió editorial que canviï una resposta necessita un identificador i un codi nous.

Per vincular una resposta amb la transcripció, dona un `id` estable al bloc i declara a la pregunta un camp `evidence`, per exemple `[{ part: 'cartell', quote: 'es faria a la biblioteca.' }]`. Es poden indicar diversos passatges per pregunta. La cita ha de coincidir exactament amb el text; si es repeteix dins del mateix bloc, `occurrence` selecciona l’aparició comptant des de zero. Les preguntes d’opinió o globals no necessiten aquest camp. Els colors es mantenen per pregunta i els números segueixen la selecció impresa. Si coincideixen pistes de preguntes diferents, el ressalt es divideix en bandes de color. `evidence.js` resol aquestes referències i `showEvidence`, dins dels ajustos de la fitxa, controla si es mostren.

Per habilitar la sessió pautada d’una fitxa, `fragment.start` indica en segons on comença el fragment dins de l’MP3 i `fragment.seconds` n’indica la durada arrodonida per al resum de paper. Afegeix a `session.js` les locucions reutilitzables de cada idioma.

Els enregistraments es generen i es mesclen fora del web. El repositori públic conté el fitxer acabat i els seus crèdits. La producció pot reutilitzar la configuració amb Gemini i FFmpeg provada al pilot.

Consulta els [crèdits](CREDITS.md) i la [llicència del codi](LICENSE).
