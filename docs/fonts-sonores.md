# Fonts sonores i muntatges

Actualitzat: **23/11/2026**. Registre de les fonts realment utilitzades als fitxers disponibles. Les fonts i els manifests es poden consultar també al desplegable «Fonts i crèdits sonors» de cada comprensió, fora del PDF. [Seguiment per fases](seguiment-produccio.md) · [Reparacions de pronunciació](pronunciacio-tts.md).

## Quatre peticions del 23/11/2026 · audició de veus

Les validacions i revisions posteriors d’aquest mateix dia consten al final d’aquest document; no han consumit peticions addicionals de síntesi.

| Lot | Comprensions | Repartiment | Presa rebuda |
| --- | --- | --- | ---: |
| [L15](../assets/audio/synthesis-batches/l15.json) | S040, S051, S052 | Laia/Leda i Nora/Kore | 5:37 |
| [L16](../assets/audio/synthesis-batches/l16.json) | S073, S075, S077 | Laia/Leda i Ona/Sulafat | 5:50 |
| [L12](../assets/audio/synthesis-batches/l12.json) | S033, S036 | Biel/Puck i Nora/Kore | 3:14 |
| [L20](../assets/audio/synthesis-batches/l20.json) | S081, S082 | Biel/Puck i Elies/Algieba | 4:59 |

Quatre peticions noves, seqüencials i separades almenys 65 segons, amb 19:41 de preses i 6.180 tokens d’entrada retornats pel proveïdor. L12 s’envia amb l’excepció explícita del docent per aprofitar la quota encara amb lots mig buits: queda vinculada a la petició exacta i caduca al cap de sis hores. La finestra general de sis a vuit minuts estimats continua activa. L20 és un únic intent nou després de comprovar l’error intern terminal de L19, que no havia retornat àudio; l’intent anterior es conserva.

Els quatre resultats contenien una capçalera WAV seguida de PCM i metadades ID3/C2PA intercalades. S’han retirat només les 117 etiquetes verificades i s’han preservat totes les mostres de veu; resposta original, WAV del proveïdor, WAV recuperat i empremtes es conserven localment. La recuperació no ha consumit cap petició addicional.

Cobertura local comprovada i separació entre comprensions dins de silencis. Els MP3 disponibles a les fitxes i a [Veus rebudes](../proves/veus-rebudes.html) són només per escoltar veus, sense música ni efectes. La cobertura no confirma pronunciació, timbre ni absència d’artefactes: falta l’audició docent abans de començar el muntatge. No s’ha canviat cap guió, pregunta, curs ni validació d’àudio.

## Criteri dels propers muntatges i revisions · 22/11/2026

- [Pauta d’ambients d’aula, mercat i identitat musical de les notícies](ambient-i-noticiari.md): fons continu, atenuació sota la veu, simultaneïtat i comparació abans de substituir muntatges existents. Inclou el candidat de Pixabay i el seu estat real d’incorporació.
- **Parades de mercat:** un enregistrament real continu de mercat, botigues i paradetes situa la conversa; mantenir-lo molt tènue sota les veus, amb entrada i sortida naturals. Registrar font, llicència i fragment utilitzat, i retirar qualsevol identificació oral de la mostra.
- **Efectes puntuals:** seleccionar només els que ajudin a entendre l’acció. Papers, safates i petits cops que sonin artificials o afegeixin esperes innecessàries es poden ometre.
- **Simultaneïtat:** valorar cada escena i superposar el so a una frase quan sigui natural, com caminar mentre es conversa al pilot del passadís. Un efecte no necessita sempre un torn propi de silenci; preservar les pauses de la situació i comprovar que les dades i les consonants continuen sent clares.

## Per comprensió

| Codi | Veus i estat | Música, efectes i fonts | Manifest |
| --- | --- | --- | --- |
| ca-S001 · El senyal de la ràdio | Leda (Laia), Puck (Biel); Aoede (presentació). | Tocs de ràdio i sintonia final originals. Sintonia inicial opcional de Sentit. | [Dades](../assets/audio/remaster-v2-manifest.json) |
| ca-S002 · Preparem una capsa de records | Aoede (mestra i presentació). | Separacions entre passos i sintonia inicial opcional de Sentit. | [Dades](../assets/audio/remaster-v2-manifest.json) |
| ca-S003 · El paraigua intercanviat | Leda: Laia i presentació. Puck: Biel. Una petició per al títol i tot el diàleg; rialles breus de totes dues veus dins la mateixa presa. Àudio i muntatge validats pel docent; publicació definitiva de S003. | Passos originals al passadís durant el canvi de classe, un fregadís de bossa abans de la descoberta i passos que s’allunyen al final. Ambient molt baix sota la crida inicial i veu neta a les pistes. Sense gravacions externes. | [Dades](../assets/audio/s003-production-manifest.json) |
| ca-S004 · El botó de la jaqueta | Aoede: una narradora adulta i presentació. Aina i Ferran són personatges narrats, sense veus pròpies en aquesta versió. Una petició completa; àudio i muntatge validats pel docent. Publicació definitiva de S004. | Base original «Un fil per seguir», molt baixa durant el relat, amb fosa d’entrada i pujada seguida de fosa després de la veu. Fregadís de roba dins una pausa, sense anticipar el botó ni subratllar les pistes. | [Dades](../assets/audio/s004-production-manifest.json) |
| ca-S004D · El botó de la jaqueta · versió dialogada | Zephyr: Aina, narració en primera persona i presentació. Algenib: avi Ferran. Una petició amb totes les intervencions; àudio, música i muntatge validats pel docent. Publicació definitiva de S004D. | La mateixa composició original de S004, perquè és una versió de la mateixa història, amb mescla pròpia. Música molt baixa, fregadís de roba abans de la recerca i foses fora de la parla. Sense efectes de descoberta ni veus addicionals. | [Dades](../assets/audio/s004d-production-manifest.json) |
| ca-S005 · La feina d’una cartera | Puck: Biel i presentació. Vindemiatrix: Joana, cartera. Una petició amb tota l’entrevista, salutacions i comiat mutu. La resta està ben valorada; esmena pendent de «matí», que sona «matà», i jingles inicial/final pendents de millorar. | Sintonia i sobres originals a l’entrada, passes discretes al canvi de tema i sintonia després del comiat. Veu neta a les adreces i les explicacions. Sense enregistraments externs. | [Dades](../assets/audio/s005-production-manifest.json) |
| ca-S008 · La foto que faltava | Aoede (una única narradora, sense nom en el relat; també la presentació). L’Aina i l’avi són personatges narrats, sense veu pròpia. Àudio validat pel docent amb el final musical esmenat; publicació definitiva de S008. | Base instrumental original suau: en acabar la veu, pujada progressiva, dos segons sostinguts i fosa de dos segons. Transició de paper i sintonia inicial opcional de Sentit. La versió de programa de ràdio amb benvinguda i comiat està disponible amb el codi ca-S008R, publicada definitivament amb aprovació pròpia. | [Dades](../assets/audio/s008-production-manifest.json) |
| ca-S008R · La foto que faltava · Històries amb sentit | Aoede: una única narradora adulta, sense nom al relat. Presentació reutilitzada de S008. Una petició nova per a tot el programa; àudio i muntatge validats pel docent. Publicació definitiva de S008R. | Separador de ràdio original de dos segons, base instrumental amb atenuació sota la veu, pas de pàgina i comiat musical. Síntesi i muntatge locals amb FFmpeg, sense gravacions externes. | [Dades](../assets/audio/s008r-production-manifest.json) |
| ca-S010 · La ruta fins al pavelló | Leda: Laia i presentació. Puck: Biel. Diàleg complet i títol en una petició. Muntatge validat pel docent; «Després» i «Til·lers» pendents de correcció. Aquest remuntatge conserva íntegra la veu, encara sense aplicar-hi les correccions. | Passos reals d’evsecrets (CC0) a l’arribada, a la pausa del carreró i al comiat. Els nous fragments esperen audició; les pistes del trajecte es mantenen amb veu neta. | [Dades](../assets/audio/s010-production-manifest.json) |
| ca-S012 · Qui arregla els instruments? | Puck: Biel i presentació. Algieba: Elies, lutier. Una petició per al títol i l’entrevista completa, amb salutacions. Veus i muntatge de guitarra v2 validats pel docent; publicació definitiva de S012. | Guitarra real de khenshom: quatre proves irregulars més audibles a l’entrada, molt fluixes quan comença en Biel; tres proves amb petits canvis de to al comiat, com un intent d’afinació. Paper original al canvi de tema. Cap so nou de guitarra sintetitzat i cap demostració de reparació reeixida. | [Dades](../assets/audio/s012-production-manifest.json) |
| ca-S013 · Com viatja una carta? | Aoede: Mireia, narració i presentació. Una petició per al títol i tota l’explicació. El docent valora positivament la peça, amb dues ocurrències de «bústia» pendents de correcció de tonicitat. | Paper d’un sobre a l’entrada i transició entre classificació i repartiment. Retirada la sintonia final de dues notes, descartada pel docent. Nova identitat sonora pendent de tria. Sense màquines sota les dades. | [Dades](../assets/audio/s013-production-manifest.json) |
| ca-S015 · Una restauradora ens explica el seu ofici | Puck: Biel, entrevistador i presentació. Kore: Nora, restauradora. Una única petició per al títol i tot el diàleg, amb separació local dins un silenci comprovat. La resta és correcta; «temperatura» sona «temperatira» i espera esmena local. Jingle pendent de definir. | Sintonia breu a l’entrada i a la sortida, ambient de sala molt baix al primer torn i un moviment discret de pàgina. Veu neta a les explicacions tècniques. Tots els sons són originals procedurals, sense gravacions externes. | [Dades](../assets/audio/s015-production-manifest.json) |
| ca-S016 · Una troballa al jaciment | Erinome: Mar, periodista i presentació. Una petició per al títol i tota la notícia amb el tancament pràctic validat. La resta de la peça està ben valorada pel docent; un artefacte substitueix «Si» a «Si l’estudi avança, l’equip». Correcció local pendent. | Capçalera informativa, ambient inicial molt baix, paper al canvi de font i sortida originals de Sentit. Jingles inicial i final pendents de polir segons el feedback docent. Les dades, les hipòtesis i el rumor es mantenen amb veu neta. Sense gravacions externes. | [Dades](../assets/audio/s016-production-manifest.json) |
| ca-S018 · La clau de l’armari verd | Aoede: una narradora adulta i presentació. Aina i Ferran són personatges narrats, sense veus pròpies en aquest relat. Una petició per al títol i tota la narració; àudio i muntatge validats pel docent. Publicació definitiva de S018. | Base musical original molt suau, amb fosa d’entrada, nivell baix durant la narració i pujada seguida de fosa després de la veu. Clau, cartró i paper discrets dins les pauses, sense gravacions externes. | [Dades](../assets/audio/s018-production-manifest.json) |
| ca-S019 · Una cuinera contra el malbaratament | Leda: Laia i presentació. Sulafat: Ona, cuinera. Una petició completa amb les confirmacions breus i el «Sí, sí» dins la mateixa presa. Veus validades pel docent; nou muntatge d’ambient pendent d’audició. | Ambient real de cuina de restaurant de SoundtasticPro, CC0: entrada amb fosa, molt baix sota el diàleg i pujada al final durant dos o tres segons abans de la fosa. Sense sons de cuina procedurals ni sintonia final. | [Dades](../assets/audio/s019-production-manifest.json) |
| ca-S020 · Com participar en el concurs de pòdcasts | Aoede: Mireia i presentació. Presa completa ja rebuda, conservada sense canvis de ritme ni retalls de fonemes. Veus i muntatge validats pel docent; publicació definitiva de S020, amb el màster v1 conservat. | Petita descoberta, original de Sentit sota MIT: obertura de 3,8 s i tancament de 3,4 s, fora de la parla. Un clic molt curt dins la pausa anterior a la comprovació de l’arxiu; veu neta durant les bases, requisits i horaris. Cap enregistrament extern ni síntesi nova. | [Dades](../assets/audio/s020-production-manifest.json) |
| ca-S022 · L’últim trajecte del tramvia | Algenib: Ferran recorda en primera persona; també llegeix la presentació. Aina i el pare són personatges del record, sense veus pròpies. Una petició per al títol i tot el relat. Muntatge valorat positivament pel docent; pronunciació de «rails» pendent de corregir. | Base original pròpia de corda polsada i piano sord, molt suau durant el relat. Fosa d’obertura i pujada seguida de fosa després de la veu. Fragments reals d’un tramvia modern de migweis (CC0) abans de començar i dins la pausa del retorn al present, més paper original. Substitueixen el toc sintètic descartat. Evocació sonora, sense pretendre ser un arxiu històric; nous efectes pendents d’audició. | [Dades](../assets/audio/s022-production-manifest.json) |
| ca-S023 · Reobren el mercat: què canvia i què falta decidir? | Erinome: Mar, periodista, i presentació. Charon: Pau, comerciant. Títol i notícia sencers en una sola petició; guió i escaleta validats. Àudio pendent d’audició docent. | Capçalera i sortida originals, ambient de sala, passos i paper molt discrets abans del testimoni. Veu neta als accessos, horaris, opinions i decisions pendents. Sense clientela gravada ni mostres externes. | [Dades](../assets/audio/s023-production-manifest.json) |

## Veus i drets

Veus generades amb [Gemini TTS, de Google](https://ai.google.dev/gemini-api/docs/speech-generation), subjectes a les [condicions de Gemini API](https://ai.google.dev/gemini-api/terms). Guions originals de Sentit. Les composicions i efectes procedurals originals són MIT; això no atribueix CC0 al proveïdor ni substitueix les llicències de gravacions externes. [Catàleg de bases musicals](../content/music-catalogue.js) · [Gravacions i empremtes](../content/sound-sources.js).

## Últims remuntatges locals

- **S012 v2:** «Guitar string snap or breaks - various sounds», khenshom, [Freesound 537084](https://freesound.org/people/khenshom/sounds/537084/), [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Còpia pública HQ MP3, fragment 2,7–5,4 s. Quatre proves irregulars inicials, augment de nivell i atenuació abans de parlar; tres proves finals amb petits canvis de to (−1,2, −0,5 i +0,1 semitons), amb durada compensada. Només es modifica l’efecte de guitarra, mai la veu. Paper original MIT. Fragment de 119,09 s, màster de 123,27 s. Veus i muntatge validats; publicació definitiva el 20/11/2026.
- **S019 v3:** «Ambiente kitchen Cocina Spain España», SoundtasticPro, [Freesound 484572](https://freesound.org/people/SoundtasticPro/sounds/484572/), [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Còpia HQ MP3 de 72,096 s. Retirats els cinc primers segons d’identificació oral **abans** de fer les dues passades amb fosa d’un segon. Conservades foses d’entrada, atenuació sota la conversa, pujada i dos segons sostinguts al final. Marge mesurat de 28,3 dB sota la veu. Fragment 112,89 s, màster 117,39 s. Publicació definitiva autoritzada pel docent condicionada a aquest retall, ja aplicat. Veus íntegres i v1/v2 conservades.
- **S008 v3:** mateixa veu seca, presentació, paper i arpegi de v2. Pujada musical de 0,5 s després de la veu, dos segons sostinguts, fosa de dos segons i silenci final de 0,65 s. Pujada mesurada de 7,9 dB. Fragment de 92,57 s, màster de 97,68 s. Publicada amb la confirmació docent condicionada a aquest canvi. [Recepta](../tools/finish-s008-tail.cjs).
- **S020 v1:** presa Aoede rebuda prèviament, títol separat a 4,01 s dins silenci de −58,1 dBFS. «Petita descoberta»: obertura de 3,8 s abans de la veu, tancament de 3,4 s després i cua de silenci. Un clic procedural breu abans de comprovar l’arxiu, dins la pausa. Fragment de 123,03 s, màster de 127,59 s. Publicació definitiva validada pel docent el 20/11/2026; màster v1 conservat.

Els muntatges no han fet peticions de síntesi. Es conserven els màsters anteriors i les empremtes de les preses crues. [Mescla de guitarra i cuina](../tools/recorded-scenes.cjs) · [Productor local](../tools/render-proposal.cjs).

## Sessió, sintonies i QR

El MP3 de cada història conté les veus i el seu muntatge. Al navegador, guided-player.js encadena la sintonia inicial, la presentació, les locucions opcionals, els temps d’espera i les escoltes. No crea ni exporta un MP3 nou de la sessió. El ritme ajusta la parla conservant el to; les pauses són segons reals.

Les quatre parelles **Petita descoberta, Fil de veu, Pas a pas i Ona curta** estan aprovades pel docent el 20/11. [Comparativa](https://sentit.ortogra.fi/proves/sintonies-mireia.html), accessible des del catàleg i el configurador. Són composicions locals MIT sense mostres externes, veus ni peticions d’API. Les obertures són seleccionables per a l’inici de sessió; Petita descoberta és la predeterminada. Les parelles es poden usar als muntatges de programa, com S020, sense que això validi automàticament el màster.

El QR guarda l’activitat inequívoca per idioma/codi, la pauta, el ritme i l’identificador sintonia. Els enllaços sense identificador conserven la pista antiga de quatre notes. No s’admeten URL de sintonies externes ni pujades personals. Les músiques internes de cada història formen part del màster i són independents del selector inicial.

## Procés abans de consumir quota

1. Preparar guió, preguntes, respostes, veus i escaleta amb fonts, música, efectes, pauses, possibles solapaments i comiat.
2. Revisió independent de coherència; corregir i registrar l’empremta final abans de mostrar una proposta com a provisional.
3. Validació explícita del docent abans de qualsevol petició. Una quota restablerta no autoritza material nou. Aprovació exacta a content/production-plans.json, comprovada pel generador.
4. Agrupar text complet en una petició quan hi hagi fins a dues veus; les escenes de tres veus preveuen dues peticions. Reutilitzar títols i preses bons. Les anotacions no es llegeixen.
5. Conservar WAV crua i marges de consonants; tallar només en pauses comprovades, mai amb una porta de soroll. No alentir o canviar el to per dissimular errors de dicció.
6. Mesurar nivells, durades, integritat i cues de silenci. Després, audició docent per validar pronunciació i muntatge abans de la publicació definitiva.

Tanda del 21/11: 25 comprensions amb les veus rebudes, vint muntatges pendents d’audició i set frases d’esmena rebudes. Les dues esmenes petites restants i quatre comprensions esperen lots prou plens. El registre local de peticions no és un comptador de quota restant del proveïdor. [Plans de reparació](../content/audio-repair-batches.json).

## Pilot conservat: Canvi de plans

Fora del catàleg docent. Veus Aoede i Charon amb Gemini. Fonts: pluja de ジダネ, [Rain.ogg](https://commons.wikimedia.org/wiki/File:Rain.ogg), domini públic segons la fitxa; passos de cris, [Freesound 167685](https://freesound.org/people/cris/sounds/167685/), CC0; porta de dleverett, [Freesound 710510](https://freesound.org/people/dleverett/sounds/710510/), CC0. Les referències del pilot no atribueixen aquests efectes als altres màsters.

## Mercat enregistrat de S023 v2

«Oxford covered market ambience», **jmdh**, [Freesound 388315](https://freesound.org/people/jmdh/sounds/388315/), [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). Còpia pública HQ MP3 de 92,513 s; enregistrament de mercat cobert amb persones i moviment, no una síntesi ni una garantia de sons HVAC concrets. Fragment 12–51,1 s sota la presentació d’en Pau, el testimoni i el comiat. Marge de 20,2 dB respecte de la veu; pic del fons −26,9 dBFS. Ona curta (MIT), 4 s d’obertura i 3,6 s de tancament fora de la veu, substitueix l’avís antic. Fragment 196,305 s, màster 203,11 s. Cap síntesi nova; esmena de suggeriments pendent.

Als muntatges nous i revisions, paper, bolígraf, claus i passos han de ser enregistraments acreditats i tenir prou presència per sonar intencionats, sense tapar la parla. Comprovar que cap identificació oral del sample entri al muntatge o al bucle. [Tancament dels materials impresos](tancament-publicacio.md).


## Primer lot mixt · 21/11/2026

L01 produeix en una sola petició Gemini les veus de S021 i S032 i tres esmenes de S010/S013. Veus i originals conservats; muntatges i proves pendents d’audició. [Rebut](../assets/audio/synthesis-batches/l01.json) disponible al repositori. Els recursos externs retenen la seva llicència pròpia.

- [Page turned](https://freesound.org/people/Beussa/sounds/749880/) · Beussa · CC0 1.0: paper a S021 i S032.
- [School classroom ambience](https://freesound.org/people/Elenalostale/sounds/648659/) · Elenalostale · CC0 1.0: fragment des del segon 20, només abans de la parla de S032.
- [City ambience quiet neighborhood](https://freesound.org/people/soaress/sounds/546234/) · soaress · CC0 1.0: fragment des del segon 40 a l’obertura de S021.
- Passos d’evsecrets, Freesound 334457, CC0 1.0, ja documentats: fragment breu durant el desplaçament de S021.

Fonts, còpies HQ, empremtes i tractament exactes a `content/sound-sources.js` i als manifests S021/S032. Cap imitació procedural dels efectes ni canvi de ritme de les veus.


## Muntatges mixtos · 21/11/2026

Vint muntatges pendents d’audició. Preses completes conservades, tres escenes de tres veus reconstruïdes localment i cap canvi de ritme. Cinc bases musicals originals noves sota MIT; la resta dels efectes nous són enregistraments reals amb llicència CC0 verificada. Les cinc notícies amb veus rebudes disposen d’una previsualització sense efectes ni sintonia; el muntatge queda pendent.

| Font enregistrada | Autor · llicència | Activitats on realment s’utilitza |
| --- | --- | --- |
| [Two people's footsteps walking on a wet cement sidewalk ](https://freesound.org/people/evsecrets/sounds/334457/) | evsecrets · CC0 1.0 | ca-S010, ca-S021, ca-S030, ca-S037 |
| [Page turned ](https://freesound.org/people/Beussa/sounds/749880/) | Beussa · CC0 1.0 | ca-S021, ca-S032, ca-S007, ca-S014, ca-S017, ca-S024, ca-S030, ca-S035, ca-S037, ca-S042, ca-S043, ca-S044 |
| [SCHOOL CLASSROOM AMBIENCE ](https://freesound.org/people/Elenalostale/sounds/648659/) | Elenalostale · CC0 1.0 | ca-S032, ca-S007, ca-S011, ca-S014, ca-S030, ca-S037, ca-S042 |
| [City Ambience Quiet Neighborhood ](https://freesound.org/people/soaress/sounds/546234/) | soaress · CC0 1.0 | ca-S021 |
| [Dragging chair on concrete floor ](https://freesound.org/people/funkysandwich/sounds/871017/) | funkysandwich · CC0 1.0 | ca-S007, ca-S017, ca-S025, ca-S041, ca-S042, ca-S034 |
| [Moving and Handling Cardboard ](https://freesound.org/people/Breezy2000uk/sounds/578712/) | Breezy2000uk · CC0 1.0 | ca-S011, ca-S026 |
| [seeds (cristal jar)4.wav ](https://freesound.org/people/Godowan/sounds/235278/) | Godowan · CC0 1.0 | ca-S014 |
| [Classroom Ambience ](https://freesound.org/people/Tallis0410/sounds/707510/) | Tallis0410 · CC0 1.0 | ca-S017, ca-S026, ca-S035, ca-S041 |
| [German Schoolyard Ambience ](https://freesound.org/people/McConnell_Audioprojekte/sounds/731979/) | McConnell_Audioprojekte · CC0 1.0 | ca-S024 |
| [Button click ](https://freesound.org/people/brnck/sounds/257357/) | brnck · CC0 1.0 | ca-S025, ca-S044 |
| [Dutch night ambience in small city ](https://freesound.org/people/hz37/sounds/792502/) | hz37 · CC0 1.0 | ca-S043, ca-S038 |
| [Gentle wind ](https://freesound.org/people/fthgurdy/sounds/528944/) | fthgurdy · CC0 1.0 | ca-S027 |
| [Soft Fabric Rustle ](https://freesound.org/people/IENBA/sounds/850705/) | IENBA · CC0 1.0 | ca-S027 |
| [Soft Room Tone ](https://freesound.org/people/callmethefoo/sounds/744447/) | callmethefoo · CC0 1.0 | ca-S034, ca-S038D |

Fragments, dates, còpies, llicències i SHA-256 al [registre de fonts](../content/sound-sources.js); mescles i temps als manifests de cada codi a assets/audio. No s’atribueix l’enregistrament a la ubicació real de la història. Les sales es mesclen molt baix, sense diàlegs nous intel·ligibles que aportin respostes; els detalls puntuals van dins pauses. S043 evita sons d’obres i S038D no representa sonorament el record de Ferran. El torn curt de S041 «Hi vaig ara?» es conserva pendent d’audició perquè el reconeixedor no el confirma; cap rectificació de text forçada.


## Notícies amb muntatge · 21/11/2026

S006, S009, S029, S031 i S039 utilitzen Ona curta (Sentit, MIT), recurs ja aprovat amb obertura i tancament fora de la parla. Tots cinc muntatges encara requereixen audició docent. No s’han sintetitzat veus noves.

- S006 i S029: [Soft City Park Ambience](https://freesound.org/people/simgo/sounds/380687/) de simgo, CC0 1.0, dos segons d’ambient a l’obertura. Còpia HQ i empremta al registre de fonts.
- S009: paper real de Beussa abans de la veu; sense efectes sota els horaris.
- S031: ambient interior real de callmethefoo i paper en una pausa segura.
- S039: ambient interior molt baix sota els torns de Pau, no sota les dades de Mar. S’omet el paper previst perquè no hi ha un interval segur per posar-lo; no es talla la parla per forçar un efecte.

La recepta és tools/render-news-batch.cjs i l’autorització de proposta de muntatge és independent de la validació final. Es conserven les preses de veu anteriors. Titulars nets de parla sobrera i farciment, extrems retallats en silenci i pauses internes compactades només en zones silencioses entre blocs verificats.

## Revisions del 23/11/2026

S047 utilitza [Inside Old Train de kokoreli777](https://pixabay.com/sound-effects/film-special-effects-inside-old-train-169418/), sota [Pixabay Content License](https://pixabay.com/service/license-summary/). El fitxer original facilitat pel docent es conserva localment; només es publica integrat sota la veu i la música. Tren continu fins al final del viatge, fosa abans de casa de la tieta, sense bucle ni canvi de to o velocitat. La gravació anterior es conserva a la versió v1 i ja no figura entre les fonts del màster vigent.

S014 i S026: fons enregistrat d’aula Tallis0410, CC0, molt baix sota la parla; retirades vocalitzacions fora de guió. S034 conserva la cadira i elimina l’ambient inicial. S035 conserva íntegra la pista del contingut. S042 conserva el full i acosta la cadira al final, retirant el farciment i la instrucció long pause. Les revisions continuen pendents d’audició.

S023 es publica amb la variació inicial de timbre de la represa acceptada explícitament pel docent. Queda al registre de limitacions acceptades per a una possible revisió futura, sense bloquejar la publicació ni generar noves peticions.

## Validacions i revisions posteriors · 23/11/2026

- **Definitives:** S014, S016, S026, S039, S042, S044, S045 i S048. Materials il·lustrats, revisats independentment i transcripcions netes. S045 retira només simgo-380687 de l’inici; la cadira intermèdia, veu, música i durada es conserven. La resta publica els màsters ja validats.
- **S035 · 104,61 s:** final retallat 3,49 s. Mig segon després de Laia, pujada de 0,35 s, dos segons sostinguts i fosa de 0,9 s. Veu i ambient iguals fins al punt protegit; paper i introducció intactes. Pendent d’última audició.
- **S043 · 145,03 s:** sense fregament inicial; paper original 0,45 s abans del final de troballa. Retirat només el silenci digital afegit d’1,05 s i enllaç musical amb fosa creuada de 60 ms. Cap mostra parlada eliminada. Pendent d’última audició.
- **S047 · 112,83 s:** primer paràgraf sense tren. Inside Old Train entra entre el primer i el segon, amb un segon de presència i atenuació sota el trajecte. A l’arribada, pujada i [cubo 7, de Tururt](https://pixabay.com/sound-effects/film-special-effects-cubo-7-208790/), fragment 1,65–3,55 s sota [Pixabay Content License](https://pixabay.com/service/license-summary/). Pausa total de 2,4 s abans de casa; s’hi afegeixen 1,26 s de silenci, conservant tota la veu. La mostra completa de frens només es guarda localment; el repositori publica el muntatge. Pendent d’última audició.
- **S029 · 80,39 s:** recuperada la presentació íntegra del cru entre 1,5 i 5,8 s, incloent Notícia de ficció; fora el farciment Molt bé xic… també de la còpia de revisió de veus v2. Cos PCM i MP3 conservats. La primera frase no va ser sintetitzada pel proveïdor; el docent autoritza el primer paràgraf complet per al proper lot de Mar. Primer caldrà comparar el timbre i decidir si s’incorpora tot o només la frase absent. No s’ha enviat cap petició curta ni aplicat una veu nova.

S060, S063, S066, S070, S072, S046D i S069D tenen guió i escaleta validats per a futurs lots. S060 incorpora passadís atenuat; S066 passa a 6è intermèdia, per confirmar amb l’audició. L21 prepara S066/S067, sense enviar-lo. Les futures entrades d’aula seran més suaus i s’alternaran fonts verificades; S026 conserva el màster validat.


## 26/11/2026 · recepció i muntatges locals

[L41–L44](lots-2026-11-26.md): quatre peticions, cinc preses completes i deu esmenes per escoltar, sense muntatge automàtic. Recuperació local íntegra del PCM. S041, S085, S093 i S118 disposen de muntatge pendent d’audició: respectivament ambient d’aula Tallis0410 CC0, interior urbà soaress CC0 filtrat, passadís interior BexhillCollege CC0 atenuat i base comuna de notícies amb llicència Pixabay. Identitats i SHA verificats als manifests; fonts i crèdits derivats dels recursos realment inclosos. Set publicacions noves conserven exactament els màsters aprovats.


### Muntatges amb esmenes aprovades · 26/11

[S109, S088, S081 i S090](muntatges-esmenes-2026-11-26.md) incorporen les seleccions exactes validades pel docent, amb ambient real continu molt baix i sense efectes puntuals. Respectivament soaress-546234, bexhillcollege-274213, callmethefoo-744447 i soaress-546234; tots CC0 1.0, amb origen i SHA al registre de fonts. S017 conserva exactament el màster net de respiracions amb les veus originals, ara acceptades. Cap síntesi nova ni canvi d’estat a publicació definitiva.

### S130 · El fil d’Ariadna · 26/11

Veu anònima Algenib de L41, presa S130-T01 validada pel docent. Primer muntatge amb [Temple of the Manes](https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100053), Kevin MacLeod (incompetech.com), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), codi musical M1. Fragment des del segon 6, normalització, base contínua molt baixa sota la narració i pujada de dos segons abans de la fosa. Sense efectes addicionals, canvis de ritme o síntesi nova. Pistes modulars al web; màster complet i original de música locals. [Manifest](../assets/audio/s130-production-manifest.json). Pendent d’audició del muntatge.

## Noves veus i muntatges de cultura · 26/11

L45/L46 rebuts per audició, sense muntatge automàtic. S128 amb Easy Lemon (F1) i S129 amb Teller of the Tales (L1), Kevin MacLeod, CC BY 4.0: normalització, atenuació sota la veu i foses, originals locals. S070 amb base original «Un disc que es feia esperar», Sentit, MIT; S122 amb ambient real d’aula kyles-450728, CC0; S095 amb interior BexhillCollege-274213, CC0. Fonts, empremtes i usos reals als manifests i catàlegs. [Muntatges, síntesi i incidències](muntatges-2026-11-26-cultura.md).
