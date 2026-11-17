# Sentit

Banc de comprensió oral d’ortogra.fi. El docent busca una activitat, en previsualitza la fitxa i el solucionari i imprimeix el document triat. L’alumnat fa la feina al paper. El QR i l’enllaç imprès obren directament l’àudio.

[Obre Sentit](https://sentit.ortogra.fi/)

El projecte es manté a la sèrie **0.1.x** mentre es revisen les primeres activitats i la interfície. El pas a **0.2** requereix una comprensió oral validada en tots els aspectes —àudio, fitxa i solucionari— i una interfície prou definida.

## Prepara una fitxa

«El senyal de la ràdio» és una activitat de nivell accessible per a 5è de primària. «Canvi de plans» conserva l’àudio i l’enllaç del pilot.

- Filtres combinables de curs, dificultat, durada i tipus.
- Ajustos de tipografia, mida, espaiat i interlineat, amb codi d’aula opcional.
- Controls de línies de resposta i d’amagar preguntes al costat de cada enunciat, quan s’hi passa el ratolí o s’hi accedeix amb el teclat. En pantalla tàctil, el botó de tres punts obre aquests controls. A **Preguntes amagades** es poden recuperar les preguntes excloses.
- Vista A4 de la fitxa amb QR i del solucionari amb respostes orientatives i transcripció de l’àudio. El diàleg d’impressió permet desar el document seleccionat com a PDF.
- Reproductor docent i vista d’escolta directa. L’àudio comença quan es prem el botó.
- Amb **Sessió pautada**, tria el temps per llegir les preguntes, el nombre d’escoltes i la pausa entre escoltes. Els valors inicials són 60 segons, dues escoltes i 30 segons de pausa. El QR, l’adreça i el resum imprès segueixen aquests ajustos. Amb el mode desactivat, l’enllaç obre el reproductor d’escolta lliure.
- Interfície en català i castellà. Cada fitxa conserva l’idioma propi de l’activitat.

Els filtres de l’esquerra acoten el selector d’activitat situat sobre el full. El sidebar dret agrupa l’àudio i el format d’impressió. L’accés a la vista d’escolta i el botó per imprimir el document seleccionat queden visibles mentre es consulten els ajustos. En pantalles petites, **Àudio i impressió** desplega els ajustos.

## Desenvolupament

HTML, CSS i JavaScript executats al navegador. GitHub Pages serveix la branca `main` des de l’arrel. No cal compilar.

```sh
node tools/serve.cjs
```

Obre `http://127.0.0.1:4231/`. Per provar l’àudio en local, prem **Obre la vista d’escolta**. El QR imprès i **Copia l’enllaç** fan servir l’adreça pública. L’enllaç d’escolta inclou l’idioma i el codi, com a `?escolta=ca-S001`. Cada parell d’idioma i codi identifica una única activitat.

Els enllaços que inclouen `p`, com `?escolta=ca-S001&p=60-2-30`, programen una sessió. Els tres valors són els segons de lectura (0–300), les escoltes (1–3) i els segons entre escoltes (0–300). Els enllaços sense `p` obren l’escolta lliure. A la sessió pautada, l’àudio i els temps d’espera comparteixen el mateix rellotge, de manera que el botó pot pausar o reprendre tota la seqüència.

Les fitxes viuen a `catalogue.js`. Cada activitat declara l’identificador, el codi, l’idioma, el curs, la dificultat, la durada en segons, el tipus, el fitxer d’àudio i les preguntes. Cada pregunta té un identificador estable, un enunciat, una resposta orientativa i un nombre inicial de línies.

Per etiquetar la dificultat, valora conjuntament la densitat de la informació, el ritme de l’àudio i les relacions que l’alumnat ha de fer entre fragments per respondre. La durada té un filtre propi.

La transcripció segueix l’ordre de l’àudio. `introduction` conté la locució inicial, si n’hi ha. Al diàleg o narració, cada bloc té text i, quan hi intervé una veu, pot portar el nom del personatge. Els senyals sonors rellevants per a l’activitat es poden indicar entre claudàtors. Conserva l’identificador i l’àudio associat dels fulls publicats. Una revisió editorial que canviï una resposta necessita un identificador i un codi nous.

Per habilitar la sessió pautada d’una fitxa, `fragment.start` indica en segons on comença el fragment dins de l’MP3 i `fragment.seconds` n’indica la durada arrodonida per al resum de paper. Afegeix a `session.js` les locucions reutilitzables de cada idioma.

Els enregistraments es generen i es mesclen fora del web. El repositori públic conté el fitxer acabat i els seus crèdits. La producció pot reutilitzar la configuració amb Gemini i FFmpeg provada al pilot.

Consulta els [crèdits](CREDITS.md) i la [llicència del codi](LICENSE).
