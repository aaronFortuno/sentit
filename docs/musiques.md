# Bases musicals i sintonies

Les narracions s’acompanyen amb una base molt suau, que baixa abans de la veu i només puja quan acaba el relat. Cada composició té un ID propi i les activitats on s’ha utilitzat. El [catàleg de músiques](../content/music-catalogue.js) permet evitar repeticions involuntàries; els manifests documenten la mescla real.

| ID i títol | Activitat assignada | Identitat musical | Origen i llicència | Recepta |
| --- | --- | --- | --- | --- |
| `sentit-fil-per-seguir-v1` · Un fil per seguir | S004 i S004D · El botó de la jaqueta | Piano suau i làmines de fusta, Fa major, 68 pulsacions/min | Composició original de Sentit, MIT; dues versions de la mateixa història amb mescles pròpies | [S004/S004D](../tools/s004-music.cjs) |
| `sentit-foto-arpegi-v1` · Una foto per recordar | S008 i S008R · La foto que faltava | Arpegi en Do amb baix suau; dos arranjaments de la mateixa obra | Composició original de Sentit, MIT; sense mostres externes. Reutilització intencionada entre les dues versions de la mateixa història | [Original, final v3](../tools/finish-s008-tail.cjs) · [Ràdio](../tools/render-radio.cjs) |
| `sentit-records-guardats-v1` · Records guardats | S018 · La clau de l’armari verd | Piano lent, harmonia major càlida i fusta molt espaiada; 72 pulsacions/min | Composició original de Sentit, MIT; sense mostres externes | [S018](../tools/s018-music.cjs) |
| `sentit-tramvia-records-v1` · Rails de memòria | S022 · L’últim trajecte del tramvia | Corda polsada, piano sord i poc pad; Sol major, 60 pulsacions/min | Composició original de Sentit, MIT; sense mostres externes | [S022](../tools/s022-music.cjs) |

La font i el nom de la base es poden consultar a **Fonts i crèdits sonors** dins de cada activitat amb àudio. Les composicions d’aquesta tanda són originals sota MIT, no es presenten com a CC0. Per a recursos externs es prioritzaran fonts CC0 verificades o llicències que en permetin l’ús previst, conservant autor, URL i llicència al registre abans d’incorporar-los.

S004/S004D i S008/S008R reutilitzen expressament el mateix motiu perquè revisen la mateixa història. Aquesta excepció queda registrada; no s’assigna la base a una altra narració independent.

## Recursos recurrents

Una base de narració i una sintonia de programa tenen funcions diferents. La primera varia entre narracions; la segona es pot repetir per identificar el mateix programa.

- **Sintonia general de Sentit:** identificació opcional de l’activitat, una sola vegada per sessió.
- **Petita descoberta:** [proposta d’obertura i tancament de la Mireia](https://sentit.ortogra.fi/proves/sintonies-mireia.html), validada com a recurs i incorporada a S020, amb el muntatge encara pendent d’audició.
- **Històries amb sentit:** S008R ja té entrada, base i sortida pròpies al seu manifest. No s’atribueix aquesta sintonia automàticament a la resta de relats.

La música no ha de desvelar una resposta, suggerir un judici sobre un personatge ni tapar consonants. Els manifests de S018 i S022 conserven el nivell de la base sota la veu, la fosa inicial, la pujada posterior a la narració i la cua de silenci. L’audició docent és el pas final de validació.


## Comparativa de quatre sintonies

[Escolta les quatre parelles](https://sentit.ortogra.fi/proves/sintonies-mireia.html). Totes quatre estan validades com a recursos; les obertures són seleccionables a l’inici de sessió i Petita descoberta també s’ha incorporat a S020. Es conserva «Petita descoberta» i s’hi afegeixen:

| Proposta | Estil sintetitzat | Obertura / tancament | Origen |
| --- | --- | --- | --- |
| Fil de veu | Piano elèctric càlid i notes espaiades | 4,2 s / 3,8 s | Sentit, MIT, síntesi local |
| Pas a pas | Percussió de fusta, contratemps i baix curt | 3,8 s / 3,4 s | Sentit, MIT, síntesi local |
| Ona curta | Sintetitzador lleuger i petit motiu radiofònic | 4,0 s / 3,6 s | Sentit, MIT, síntesi local |

[Recepta de les tres alternatives](../tools/propose-mireia-variants.cjs) · [Índex de manifests](../assets/audio/mireia-sintonies-comparacio.json). Sense veus, mostres externes ni peticions d’API; els WAV crus es conserven localment. Mateix volum objectiu de comparació, marges de silenci i empremtes dels fitxers. La pàgina només deixa reproduir una peça cada vegada.
