# Il·lustracions de context

## Tancament de publicació · 20/11/2026

Generades amb l’eina integrada `image_gen`, amb les fitxes dels personatges com a referències d’identitat. Escenes de 1536 × 1024, convertides a WebP qualitat 88, sense retall ni canvi de composició. [Prompts exactes i referències](publication-scenes-v1.prompts.json).

- S003: [El paraigua intercanviat](el-paraigua-intercanviat-v1.webp), Laia i Biel al passadís; cap cinta ni mànec identificable.
- S004 i S004D: [El botó de la jaqueta](el-boto-de-la-jaqueta-v1.webp), Aina i Ferran a casa; jaqueta plegada, sense pistes de la recerca.
- S012: [Qui arregla els instruments?](qui-arregla-els-instruments-v1.webp), Biel i Elies al taller; guitarra en repòs sense avaria visible.
- S018: [La clau de l’armari verd](la-clau-de-l-armari-verd-v1.webp), Aina i Ferran al costat de l’armari tancat; sense clau ni contingut privat.
- S019: [Una cuinera que no vol llençar menjar](una-cuinera-que-no-vol-llencar-menjar-v1.webp), Laia i Ona conversant a la cuina; sense menús, quantitats ni solucions.

- S020: [Com participar en el concurs de pòdcasts](com-participar-en-el-concurs-de-podcasts-v1.webp), Mireia a l’estudi escolar, sense bases ni dades de l’activitat visibles. [Prompt exacte i model](s020-publication-v1.prompt.json). Generació integrada image_gen, 1536 × 1024, WebP qualitat 88.

Les imatges es comparteixen entre card, fitxa i solucionari. [Comprovació obligatòria de tancament](../../docs/tancament-publicacio.md).

Generades per a Sentit el 18 de novembre de 2026 amb l’eina integrada `image_gen`, sense API ni claus addicionals. Fitxers WebP de 1536 × 1024 píxels, convertits dels PNG originals amb qualitat 88 i sense canviar-ne la composició ni la mida.

- [El senyal de la ràdio](el-senyal-de-la-radio.webp): dos joves conversen en una ràdio escolar.
- [Canvi de plans](canvi-de-plans.webp): dos joves conversen en un passadís escolar.
- [Preparem una capsa de records](preparem-una-capsa-de-records-v2.webp): la Mireia i una capsa tancada.
- [La foto que faltava](la-foto-que-faltava-v2.webp): l’Aina i el Ferran amb un àlbum tancat.
- [Una restauradora ens explica el seu ofici](una-restauradora-ens-explica-el-seu-ofici-v2.webp): en Biel entrevista la Nora al taller.
- [Reobren el mercat](reobren-el-mercat-v2.webp): la Mar davant d’un mercat de barri.

Les imatges donen context sense representar les dades que es demanen a les preguntes. Les cinc darreres originals es van generar amb la primera com a referència d’estil; aquella estratègia no va diferenciar prou algunes identitats.

## Versions amb identitats recurrents · 0.1.21

Les quatre imatges `-v2.webp` parteixen de l’escena original i de la [fitxa del personatge](../characters/README.md) com a referència d’identitat. Es conserven Laia i Biel a S001 i la cara del Ferran a S008. Aina, Mireia, Nora i Mar tenen ara trets propis. Les escenes originals continuen disponibles sense el sufix `-v2`.

Les versions noves s’han generat amb l’eina integrada i s’han convertit a WebP amb FFmpeg, qualitat 88 i les mateixes dimensions, sense retallar ni remaquetar. [Prompts exactes i referències](characters-scenes-v2.json) · [Regles de continuïtat](../../docs/personatges.md).

Els prompts següents documenten la primera versió, anterior a les fitxes de personatge.

## Prompt d’«El senyal de la ràdio»

```text
Use case: illustration-story. Create one refined editorial illustration for a printable Catalan school listening-comprehension worksheet titled El senyal de la ràdio. A friendly young girl and boy, around 12 years old, sitting at a small school radio desk, talking naturally into a simple desk microphone with headphones nearby. Context only: it is a school radio conversation. Do not reveal any answers to the exercise: no comics, no clocks, no building signage, no hand signals, no speech bubbles, no onomatopoeia, no lettering or numbers anywhere. Quiet uncluttered composition, three-quarter view, medium shot, landscape 3:2 composition. Elegant hand-drawn ink and soft watercolor editorial style, fine clean lines, warm white paper, very restrained sage green and charcoal palette matching #234d43. Plenty of calm white negative space at the edges, simple background fading to white, not a heavy colored rectangle. Clear and attractive at a small printed width of 4–6 cm and legible when printed in grayscale. No text, no logo, no watermark.
```

## Prompt de «Canvi de plans»

```text
Create a second, entirely new illustration in the same refined hand-drawn ink and soft watercolor editorial style as the reference, with the same warm white background, very restrained sage green and charcoal palette, and calm printable 3:2 landscape composition. This is a context illustration for a different Catalan listening activity, Canvi de plans. Show two young students around 12 years old having a friendly conversation in a simple school corridor, with school backpacks and a few softly suggested architectural lines. They are different characters from the radio scene. Keep the scene generic so it does not reveal answers: no clocks, no numbered doors, no blue door markings, no signs or lettering, no birds, no visible rain or weather clues, no speech bubbles. Medium shot, uncluttered composition, background fades to white at the edges, readable at 4–6 cm print width and in grayscale. No text, no logo, no watermark. Use the supplied image only as a style reference, not as content to edit.
```

## Prompts de la primera tanda de quatre prototips

Base comuna, seguida del context de cada activitat:

```text
Use the supplied reference only for style. Create a new landscape 3:2 printable educational editorial illustration, soft ink and watercolor on white, very restrained sage green and charcoal, clean edges fading to white, clear at 5–8 cm width and in grayscale. No text, letters, numbers, speech bubbles, logos or watermark. Avoid showing the answers or specific details tested by the exercise.
```

**S002**

```text
Context: a warm adult teacher at a classroom table with one plain CLOSED cardboard keepsake box. Hands resting naturally beside it. The box is the sole central prop; do not show any contents, labels, drawings, photographs or a sequence of steps. Medium shot, calm encouraging expression, uncluttered background.
```

**S008**

```text
Context: a school-aged girl and her grandfather looking thoughtfully at a CLOSED family photograph album on a table at home. Do not show an open album, a missing slot, any photo, envelope, outdoor square, tree or bench. Convey gentle curiosity and a warm family setting without story solutions.
```

**S015**

```text
Context: an adult woman art conservator giving a friendly interview to a teenage boy holding a small microphone. Quiet museum workshop, one indistinct abstract framed painting in the background. No visible damage, missing paint, cleaning actions, water, tools or technical demonstrations. Two clearly different ages, attentive conversation.
```

**S023**

```text
Context: an adult female local radio journalist with a handheld microphone, standing outside a small generic neighborhood market building. A calm modest facade and barely suggested people in the distant background. No signs, dates, opening hours, maps, ramps, doors identified by colors, food containers, graphs or information boards. A general news-reporting scene without specific story clues.
```
