# Música per a faules, llegendes i mites

Proposta del **26/11/2026**. [Comparador al web](https://sentit.ortogra.fi/?musiques=faules-mon), també accessible amb «Músiques de narració · propostes» al peu del panell d’àudio d’una comprensió. Cada univers té tres fragments de 32 segons, amb volum comparable, reproductor i font original. Els codis F1–M3 permeten indicar la tria sense ambigüitat.

## Candidats

| Univers | Codi | Composició | Instrumentació publicada per l’autor | Caràcter proposat |
| --- | --- | --- | --- | --- |
| Faules del món | F1 | [Easy Lemon](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1200076) | Guitarra, baix, bateria, celesta, marimba | Tranquil i càlid |
| Faules del món | F2 | [Carefree](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1400037) | Ukelele, guitarra, marimba, glockenspiel, percussió | Alegre i juganer |
| Faules del món | F3 | [Dreamy Flashback](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100532) | Arpa, campanes, cordes pizzicato | Conte i fantasia |
| Llegendes d’aquí i d’arreu | L1 | [Teller of the Tales](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1400020) | Llaüt i guitarra | Íntim i contingut |
| Llegendes d’aquí i d’arreu | L2 | [Folk Round](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100357) | Guitarra, violí, flautes, percussió, acordió | Tradició popular |
| Llegendes d’aquí i d’arreu | L3 | [Angevin](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1200110) | Flauta, llaüt, cor, percussió | Lent i misteriós |
| Mites de l’antiguitat | M1 | [Temple of the Manes](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100053) | Arpes, flautes, oboè, percussió | Antic i atmosfèric |
| Mites de l’antiguitat | M2 | [Desert City](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100564) | Percussió i dulcimer | Viatge i ritme |
| Mites de l’antiguitat | M3 | [Virtutes Instrumenti](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100801) | Viola i bordó | Solemne i pausat |

## Retorn docent del 26/11

| Univers | Acceptades per al repertori | Altres mostres |
| --- | --- | --- |
| Faules | **F1** | F2 fora del repertori actual pel caràcter massa divertit; F3 pendent de decidir |
| Llegendes | **L1, L2 i L3** | — |
| Mites | **M1, M2 i M3** | — |

Aquest retorn valida les set pistes com a recursos possibles, no un muntatge concret. F2 i F3 es conserven al comparador per referència; F3 no s’utilitza mentre hi hagi dubtes. Encara no s’ha assignat música a cap activitat.

### Criteri de treball proposat

Mantenir un repertori petit per univers i triar segons el caràcter del relat. Quan diverses opcions encaixin, afavorir una de les menys utilitzades recentment, sense imposar una roda fixa. Per orientar la tria: L1 per a relats més íntims, L2 per a un aire popular i L3 per a misteri; M1 com a punt de partida atmosfèric, M2 per a viatge o moviment i M3 per a un to més solemne. Són orientacions de selecció, pendents de comprovar amb la veu al muntatge.

Conservar la mateixa composició entre variants d’un mateix relat, encara que canviï el nivell o el repartiment. La base molt baixa i les foses són més importants per a la comprensió que augmentar contínuament el nombre de pistes. Per a les faules, començar amb F1; una sola base funciona mentre el repertori encara és petit. Per a S130, la primera candidata continua sent M1.

Registrar la composició real utilitzada a cada muntatge. Aquesta línia de treball manté la petició de disposar de dues o tres pistes compartides per univers i substitueix aquí l’antic criteri d’una composició diferent per narració; no modifica muntatges ja validats. La valoració del docent sobre l’alternança és encara exploratòria: aquest apartat és una proposta editorial, no una nova selecció automàtica.

## Origen i llicència

Les nou composicions són de **Kevin MacLeod (incompetech.com)**, publicades sota **[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)**. Són pistes musicals de biblioteca ja produïdes, descarregades del web oficial; no són música generada per Sentit ni una petició nova de síntesi. L’autor identifica els instruments, però això **no acredita una interpretació acústica íntegra en directe**: les produccions de biblioteca poden utilitzar instruments mostrejats. No les presentem com a gravacions de camp o interpretacions acústiques verificades.

La [llicència del proveïdor](https://incompetech.com/music/royalty-free/licenses/) permet l’ús gratuït amb atribució. Cada mostra mostra autoria, llicència i font, també presents al seu MP3 i al [manifest](../assets/audio/music-previews/manifest.json). Les pistes externes conserven la seva llicència; no passen a ser MIT pel fet d’incloure-les al repositori.

Modificacions dels fragments: segons 6–38 de cada original, ajust de sonoritat a −23 LUFS de referència, foses de 0,7 s i 2 s, MP3 estèreo a 128 kb/s. Les mostres pesen **4,62 MB en conjunt**. No són un muntatge de les comprensions. Els originals complets i les fitxes oficials es conserven fora del repositori a `../output/sentit-music-tradicio/`, amb empremtes al manifest. Reproducció tècnica: `node tools/prepare-narration-music.mjs`; només `--download` permet descarregar originals absents.

## Aplicació després de la tria

1. Registrar els codis aprovats i associar la pista concreta a cada comprensió al catàleg musical i al manifest del muntatge.
2. Entrada discreta; música contínua molt baixa sota la narració, sense tapar consonants ni dades. Comprovar el fragment més dens i qualsevol canvi d’intensitat de la pista completa.
3. Ajustar durada amb talls musicals i foses creuades, sense inserir esperes a la locució ni modificar-ne el to.
4. Després de l’última paraula, deixar respirar el relat, pujar la música aproximadament dos segons i fer la fosa final.
5. Presentar el muntatge al docent. Una tria musical no és la validació perceptiva del muntatge final.

**S130 · El fil d’Ariadna:** veus de L41 validades pel docent el 26/11. Presa `S130-T01`, SHA-256 `de7def44287bd5ae73ee7d493c900bd0e86b2e735ec0d78148a8266790a12fc4`. Falta la tria musical M1/M2/M3 abans de començar a muntar. Sense peticions noves a Gemini i sense alterar la transcripció, les preguntes ni l’aprovació del guió.
