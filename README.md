# Sentit

Banc de comprensió oral d’ortogra.fi. El docent busca una activitat, en previsualitza la fitxa i el solucionari i imprimeix el document triat. L’alumnat fa la feina al paper. El QR i l’enllaç imprès obren directament l’àudio.

[Obre Sentit](https://sentit.ortogra.fi/)

## Prepara una fitxa

«El senyal de la ràdio» és una activitat de nivell accessible per a 5è de primària. «Canvi de plans» conserva l’àudio i l’enllaç del pilot.

- Filtres combinables de curs, dificultat, durada i tipus.
- Ajustos de tipografia, mida, espaiat i interlineat, amb codi d’aula opcional.
- Selecció de preguntes i nombre de línies de resposta per pregunta.
- Vista A4 de la fitxa amb QR i del solucionari amb respostes orientatives i transcripció de l’àudio. El diàleg d’impressió permet desar el document seleccionat com a PDF.
- Reproductor docent i vista d’escolta directa. L’àudio comença quan es prem el botó.
- Interfície en català i castellà. Cada fitxa conserva l’idioma propi de l’activitat.

## Desenvolupament

HTML, CSS i JavaScript executats al navegador. GitHub Pages serveix la branca `main` des de l’arrel. No cal compilar.

```sh
node tools/serve.cjs
```

Obre `http://127.0.0.1:4231/`. Per provar l’àudio en local, prem **Obre la vista d’escolta**. El QR imprès i **Copia l’enllaç** fan servir l’adreça pública. L’enllaç d’escolta inclou l’idioma i el codi, com a `?escolta=ca-S001`. Cada parell d’idioma i codi identifica una única activitat.

Les fitxes viuen a `catalogue.js`. Cada activitat declara l’identificador, el codi, l’idioma, el curs, la dificultat, la durada en segons, el tipus, el fitxer d’àudio i les preguntes. Cada pregunta té un identificador estable, un enunciat, una resposta orientativa i un nombre inicial de línies.

Per etiquetar la dificultat, valora conjuntament la densitat de la informació, el ritme de l’àudio i les relacions que l’alumnat ha de fer entre fragments per respondre. La durada té un filtre propi.

La transcripció segueix l’ordre de l’àudio. `introduction` conté la locució inicial, si n’hi ha. Al diàleg o narració, cada bloc té text i, quan hi intervé una veu, pot portar el nom del personatge. Els senyals sonors rellevants per a l’activitat es poden indicar entre claudàtors. Conserva l’identificador i l’àudio associat dels fulls publicats. Una revisió editorial que canviï una resposta necessita un identificador i un codi nous.

Els enregistraments es generen i es mesclen fora del web. El repositori públic conté el fitxer acabat i els seus crèdits. La producció pot reutilitzar la configuració amb Gemini i FFmpeg provada al pilot.

Consulta els [crèdits](CREDITS.md) i la [llicència del codi](LICENSE).
