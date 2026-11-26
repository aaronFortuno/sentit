# Bases musicals i sintonies

Les narracions s’acompanyen amb una base molt suau, que baixa abans de la veu i només puja quan acaba el relat. Cada composició té un ID propi i les activitats on s’ha utilitzat. El [catàleg de músiques](../content/music-catalogue.js) permet evitar repeticions involuntàries; els manifests documenten la mescla real.

Les notícies de la Mar utilitzen **[Breaking News Background Music](https://pixabay.com/music/percussion-breaking-news-background-music-505617/)**, de **Grand_Project**, sota la [Pixabay Content License](https://pixabay.com/service/license-summary/). El docent n’ha facilitat la descàrrega. Font completa conservada localment, sense distribuir-la sola; al web es publiquen només els muntatges amb veus i els crèdits. Entrada i tancament compartits, base amb foses creuades i compressió controlada per la veu. Revisió del 22/11: S006, S009, S016, S023, S029, S031 i S039. La música mesurada abans de la compressió addicional queda entre 27 i 28 dB per sota de la veu durant els trams parlats.

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
- **Petita descoberta:** [proposta d’obertura i tancament de la Mireia](https://sentit.ortogra.fi/proves/sintonies-mireia.html), validada com a recurs i incorporada a S020, amb el muntatge validat definitivament pel docent.
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


## Bases noves de la tanda del 21/11

Cinc composicions originals distintes, encara pendents d’audició docent. Piano suau i coixí harmònic espaiat, a volum baix sota la narració. Fosa d’entrada, atenuació abans de la veu i pujada després de la darrera frase, dos segons sostinguts i fosa final. No utilitzen mostres externes ni melodies prestades.

| ID · títol | Activitat | Origen i llicència |
| --- | --- | --- |
| sentit-s043-v1 · Una línia a la façana | ca-S043 | Sentit · MIT · [Partitura i recepta](../tools/narration-bed.cjs) |
| sentit-s027-v1 · Tovalles al vent | ca-S027 | Sentit · MIT · [Partitura i recepta](../tools/narration-bed.cjs) |
| sentit-s034-v1 · Entre dues cortines | ca-S034 | Sentit · MIT · [Partitura i recepta](../tools/narration-bed.cjs) |
| sentit-s038-v1 · Un lloc a l’ombra | ca-S038 | Sentit · MIT · [Partitura i recepta](../tools/narration-bed.cjs) |
| sentit-s038d-v1 · Una tarda per explicar | ca-S038D | Sentit · MIT · [Partitura i recepta](../tools/narration-bed.cjs) |

Cada manifest conserva tempo, llavor de partitura, envolupant de volum i empremta del resultat. S038 i S038D utilitzen bases diferents; no es reutilitza una pista sense indicar-ho.

## Repertoris de tradició validats · 26/11/2026

[Faules F1/F4/F5/F6, llegendes L1–L3 i mites M1–M3](musiques-tradicio.md), Kevin MacLeod, CC BY 4.0. Alternança entre produccions d’un univers i mateixa composició entre variants d’un relat. Primera aplicació: S130 amb M1 «Temple of the Manes», pendent d’audició del muntatge; normalització, atenuació sota la veu i foses. Font i empremta al [manifest de S130](../assets/audio/s130-production-manifest.json); originals complets locals. Aquesta regla compartida s’aplica a aquests universos i substitueix aquí el criteri anterior d’una composició diferent per narració.
