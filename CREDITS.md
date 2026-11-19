# Crèdits

Les locucions inicials i les guies de la sessió pautada en català s’han generat amb la veu Aoede de [Gemini TTS](https://ai.google.dev/gemini-api/docs/speech-generation).

## «El senyal de la ràdio»

Guió, preguntes i senyals de so originals de Sentit. La versió actual fa servir Leda per a la Laia i Puck per a en Biel, sintetitzades amb Gemini 3.8 Flash TTS. La presentació i les instruccions reutilitzables fan servir Aoede. Els tocs del senyal i la sintonia final s’han generat amb FFmpeg. [Fitxa i transcripció](content/el-senyal-de-la-radio.js)

La [comparativa de veus](proves/veus-s001.html) conserva un extracte de l’enregistrament original amb Aoede i Charon i la prova curta amb Leda i Puck. Les dues mostres tenen el volum normalitzat per comparar-les.

El nou fragment dura 76,725 segons i la versió amb presentació, 81,825 segons. La mescla conserva les pauses i els senyals originals i normalitza els nivells sense canviar la velocitat de les veus.

## «Canvi de plans»

Guió original en català. Veus sintetitzades amb Gemini TTS (Aoede i Charon). Els efectes s’han retallat i mesclat amb les veus.

- Pluja d’enregistrament de ジダネ, de domini públic. [Rain.ogg](https://commons.wikimedia.org/wiki/File:Rain.ogg)
- Passes pel passadís de cris, CC0. [FootSteps in a Concrete Corridor 1](https://freesound.org/people/cris/sounds/167685/)
- Obertura de porta de dleverett, CC0. [Door Opening Creaking](https://freesound.org/people/dleverett/sounds/710510/)
- Cant de merla de tinga, CC0. [Common blackbird singing denoised](https://commons.wikimedia.org/wiki/File:Common_blackbird_singing_denoised.flac)

## Primera tanda: S002, S008, S015 i S023

Guions, preguntes, respostes orientatives i transcripcions originals de Sentit. S002 i S008 fan servir Aoede de Gemini 3.8 Flash TTS per a la mestra, la narradora i les presentacions. El nou muntatge de S015 utilitza Puck per a en Biel i el títol i Kore per a la Nora, en una petició i amb separació local dins un silenci comprovat. La presa parcial antiga amb Aoede es conserva com a arxiu i no s’hi barreja. S023 preveu Erinome per a la Mar i Charon per al comerciant Pau; encara no s’ha sintetitzat.

El fregadís de paper de S008 és un so procedimental generat amb FFmpeg. Per a S023 s’ha preparat la recepta d’una sintonia procedimental. No s’hi han afegit enregistraments externs. Els efectes són decoratius i no cal reconèixer-los per respondre. La notícia S023 és fictícia, tal com s’indica al guió de presentació i a la descripció.

L’entrevista fictícia S015 pren com a base els criteris de mínima intervenció, estudi i documentació del [Centre de Restauració de Béns Mobles de Catalunya](https://centrederestauracio.gencat.cat/ca/que_fem/que_restaurem/criteris/). La conservació preventiva es contrasta amb les explicacions del Museu Nacional sobre [llum i condicions de les sales](https://www.museunacional.cat/ca/que-hi-ha-poca-llum-i-fa-fred-en-algunes-sales-del-museu) i [conservació-restauració](https://www.museunacional.cat/ca/conservacio-restauracio-0). El guió és una adaptació original per a primària; no reprodueix una entrevista real.

[Registre de producció i revisió](docs/primera-tanda.md).

S015 incorpora sintonies d’entrada i sortida, ambient de sala molt baix i un moviment de pàgina originals procedurals de Sentit, sota MIT, generats localment amb FFmpeg. No s’han emprat gravacions externes. [Recepta](tools/render-interview.cjs) · [manifest](assets/audio/s015-production-manifest.json) · [estat actual per fases](docs/seguiment-produccio.md). La proposta està validada; l’àudio muntat encara no.

## Web

Les sis il·lustracions de context s’han generat per a Sentit amb l’eina integrada de generació d’imatges i s’han convertit a WebP, sense canviar-ne la composició. [Fitxers i prompts](assets/images/README.md).

El repartiment recurrent té vuit [fitxes de personatge](assets/characters/README.md), generades amb l’eina integrada a partir de les referències del projecte. Les escenes revisades utilitzen aquests models per preservar identitats. Els PNG originals, les previsualitzacions WebP i els prompts es conserven al repositori. [Galeria i perfils](https://sentit.ortogra.fi/personatges.html) · [Criteris de continuïtat i veus](docs/personatges.md).

Els vuit retrats de presentació parteixen dels mateixos models i s’han generat amb l’eina integrada. [Prompts i fitxers](assets/characters/README.md#retrats-de-presentació--0122). Les presentacions de veu encara no s’han sintetitzat.

- Generador de codis QR de Kazuhiko Arase. [Llicència MIT](assets/vendor/qrcode.LICENSE)
- Icones derivades de Lucide. [Avisos ISC i MIT](assets/vendor/lucide.LICENSE)
- Reordenació amb SortableJS 1.15.7, servit localment. [Llicència MIT](assets/vendor/sortable/LICENSE)
- Marca d’ortogra.fi, fotografia d’Aarón Fortuño i QR del V4V. [Projecte ortogra.fi](https://github.com/aaronFortuno/ortogra-fi)

## Registre sonor per comprensió

[Fonts, llicències, muntatges i procés de validació](docs/fonts-sonores.md). La revisió 0.1.23 conserva els WAV crus, elimina el retall automàtic i afegeix marges de seguretat; no s’han fet peticions TTS noves. La base instrumental de S008 i la sintonia inicial són originals procedurals de Sentit, sota la llicència MIT del projecte.

## S008R · Històries amb sentit

Guió i muntatge validats el 19 de novembre de 2026. Narradora Aoede, Gemini TTS, una petició per al programa complet; presentació reutilitzada de S008. Sintonia de programa, base instrumental i pas de pàgina originals procedurals, generats amb FFmpeg, sota la llicència MIT del projecte. [Recepta del muntatge](tools/render-radio.cjs) i [manifest amb consum, marques i empremtes](assets/audio/s008r-production-manifest.json). Comprovació de marques de paraula amb Vosk de català local, sense generar gravacions ni fer crides de revisió al núvol.

El seguiment i els avisos utilitzen [Umami](https://github.com/umami-software/umami), allotjat en una instància pròpia. [Dades i controls de privadesa](docs/estadistiques.md).
