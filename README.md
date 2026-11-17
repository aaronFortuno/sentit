# Sentit

Banc de comprensió oral d’ortogra.fi. El docent busca una activitat, en previsualitza la fitxa i el solucionari i imprimeix el document triat. L’alumnat fa la feina al paper. El QR i l’enllaç imprès obren directament l’àudio.

[Obre Sentit](https://sentit.ortogra.fi/)

## Primera versió

«Canvi de plans» és una mostra de maquetació amb l’àudio pilot ja revisat. La primera activitat editorial completa es prepararà després de revisar aquesta base.

- Filtres combinables de curs, dificultat, durada i tipus.
- Vista A4 per a l’alumnat i solucionari separat. El diàleg d’impressió permet desar-los com a PDF.
- Reproductor docent i vista d’escolta directa. L’àudio comença quan es prem el botó.
- Interfície en català i castellà. Cada fitxa conserva l’idioma propi de l’activitat.

## Desenvolupament

HTML, CSS i JavaScript executats al navegador. GitHub Pages serveix la branca `main` des de l’arrel. No cal compilar.

```sh
node tools/serve.cjs
```

Obre `http://127.0.0.1:4231/`. La vista d’escolta de la mostra és `?escolta=mostra`. Els QR i els enllaços que es copien fan servir l’adreça pública.

Les fitxes viuen a `catalogue.js`. Cada activitat declara l’identificador, el codi, l’idioma, el curs, la dificultat, la durada en segons, el tipus, el fitxer d’àudio i les parelles de pregunta i resposta. Conserva l’identificador i l’àudio associat dels fulls publicats. Una revisió editorial que canviï una resposta necessita un identificador nou.

Els enregistraments es generen i es mesclen fora del web. El repositori públic conté el fitxer acabat i els seus crèdits. La producció pot reutilitzar la configuració amb Gemini i FFmpeg provada al pilot.

Consulta els [crèdits](CREDITS.md) i la [llicència del codi](LICENSE).
