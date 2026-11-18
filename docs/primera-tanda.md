# Primera tanda de prototips

18 de novembre de 2026 · v0.1.14 · Pendent d’audició del docent i prova amb alumnat.

## Estat

| Codi | Curs | Títol | Tipus | Dificultat | Fragment | Preguntes | Producció |
| --- | --- | --- | --- | --- | --- | ---: | --- |
| ca-S002 | 3r | Preparem una capsa de records | Instruccions | Accessible | 0:50 | 6 | Àudio complet, disponible al catàleg |
| ca-S008 | 4t | La foto que faltava | Narració | Accessible | 1:25 | 6 | Àudio complet, disponible al catàleg |
| ca-S015 | 5è | Una restauradora ens explica el seu ofici | Entrevista | Intermèdia | Objectiu 2:30–3:00 | 8 | Guió i fitxa preparats; àudio pendent |
| ca-S023 | 6è | Reobren el mercat: què canvia i què falta decidir? | Notícia | Avançada | Objectiu 3:15–4:00 | 10 | Guió i fitxa preparats; àudio pendent |

S002 i S008 tenen fitxa, solucionari, transcripció, ressalts opcionals i il·lustració. S015 conserva localment la primera presa de l’entrevista; falten les altres dues i la presentació. S023 encara no s’ha sintetitzat. Els esborranys sense àudio no es mostren al catàleg.

La quota de Gemini ha retornat HTTP 429 amb una espera fins aproximadament al **19 de novembre de 2026 a les 09:00 CET**. No s’han programat reintents durant aquesta espera. S’ha acordat continuar de moment amb la quota gratuïta. [Estimació de cost de futurs lots](cost-produccio.md).

## Producció i comprovacions

- Gemini 3.8 Flash TTS, català central. Aoede per a les veus adultes femenines i les presentacions; Puck per a l’entrevistador jove; Charon previst per al comerciant.
- La narradora explica els diàlegs infantils sense intentar interpretar-los amb una veu de nena. L’entrevistador de S015 és un jove i la Nora és una professional adulta.
- Preses per escenes, normalitzades al voltant de −19 LUFS, sense alterar velocitat ni altura. Màsters mono, 48 kHz, MP3 de 128 kbit/s.
- S002 té una pausa de tres segons entre els primers passos i el missatge final. S008 incorpora un fregadís de paper breu i suau que se superposa a l’inici de la segona escena. Cap resposta depèn d’aquest so.
- S015 mantindrà els torns de l’entrevista sense efectes; S023 tindrà una sintonia curta que es retirarà en començar la notícia. La notícia és fictícia i així s’anuncia.
- Les transcripcions automàtiques de Gemini i Vosk s’han contrastat amb els guions de S002 i S008. Conserven la seqüència i les dades preguntades, amb errors propis de reconeixement; no substitueixen una audició humana.
- Comprovació local de filtres, dues pàgines de fitxa i dues de solucionari per activitat amb el format inicial, transcripcions completes, ressalts opcionals, tipografia ampliada i absència de desbordaments.
- Els esborranys S015 i S023 també passen la comprovació de transcripció i ressalts: S015 ocupa dues pàgines de fitxa i tres de solucionari; S023, tres i tres. Aquests recomptes encara no inclouen el bloc QR de l’àudio acabat.
- La sessió pautada reprodueix la presentació una vegada i el fragment sencer en cada escolta, amb les pauses configurades. El QR conserva el codi i la configuració.

| Codi | Presentació i pausa | Fragment exacte | Màster complet | LUFS | Pic dBTP |
| --- | ---: | ---: | ---: | ---: | ---: |
| S002 | 4.882 s | 50.100 s | 54.982 s | -19.5 | -3 |
| S008 | 4.174 s | 85.048 s | 89.222 s | -18.9 | -2.7 |

Les empremtes SHA-256 i les escenes són al [manifest d’àudio](../assets/audio/prototips-manifest.json). Les fonts factuals de l’entrevista i els recursos visuals consten als [crèdits](../CREDITS.md).

## Represa local

Els materials de producció són a `output/sentit-primera-tanda`, a la carpeta de projectes Escola, fora del repositori. `production.cjs` reutilitza les preses completes amb la mateixa empremta de petició i guarda els errors sense credencials. Comprova `last-api-error.json` abans de fer cap petició: el generador respecta la data `retryNotBefore`.

Des de la carpeta Escola, després de recuperar quota:

```sh
node output/sentit-primera-tanda/production.cjs --generate --only=una-restauradora-ens-explica-el-seu-ofici
node output/sentit-primera-tanda/production.cjs --generate --only=reobren-el-mercat
```

En completar cada activitat: contrastar l’àudio amb el guió, verificar nivells i durada, incorporar-la a `catalogue.js`, actualitzar el manifest i aquest document, comprovar fitxa, solucionari i sessió, i publicar. No posar en servei cap URL de catàleg amb un MP3 absent. No regenerar S002 o S008 per reprendre les activitats pendents.

## Guions, preguntes i respostes de revisió

### ca-S002 · Preparem una capsa de records

3r · Accessible · Instruccions · 6 preguntes

[Obre la fitxa i el solucionari](https://sentit.ortogra.fi/#lectura=ca-S002) · [Escolta l’àudio](https://sentit.ortogra.fi/?escolta=ca-S002)

Presentació: «Comprensió oral. Preparem una capsa de records.»

**Mestra.** Avui prepararem una capsa de records. Busqueu una capsa buida que es pugui tancar. No cal que sigui nova.

**Mestra.** Primer, poseu al fons un dibuix d’un dia que vulgueu recordar. Pot ser un dia que hàgiu passat amb algú que estimeu.

**Mestra.** Després, afegiu una còpia d’una fotografia. Guardarem l’original fora de la capsa perquè no es faci malbé.

**Mestra.** Finalment, escriviu un missatge per al vostre jo del futur. Pot explicar una cosa que us agrada fer. Doblegueu-lo i poseu-lo al damunt de tot.

**Mestra.** Abans de tancar, escriviu el vostre nom a la tapa. Així sabrem de qui és la capsa sense remenar el contingut.

**Mestra.** La guardarem a classe i l’obrirem a final de curs. Avui no cal portar cap record valuós. Un record petit també pot explicar una gran història.

**1. Què prepararem? Com ha de ser la capsa?**

Resposta orientativa: Una capsa de records. Ha d’estar buida i s’ha de poder tancar; no cal que sigui nova.

Pistes: «prepararem una capsa de records. Busqueu una capsa buida que es pugui tancar.»

**2. Què hem de posar primer al fons?**

Resposta orientativa: Un dibuix d’un dia que vulguem recordar.

Pistes: «poseu al fons un dibuix d’un dia que vulgueu recordar.»

**3. Hi posarem una fotografia original o una còpia? Per què?**

Resposta orientativa: Una còpia, per evitar que l’original es faci malbé.

Pistes: «afegiu una còpia d’una fotografia. Guardarem l’original fora de la capsa perquè no es faci malbé.»

**4. On posarem el missatge, després de doblegar-lo?**

Resposta orientativa: Al damunt de tot, dins de la capsa.

Pistes: «Doblegueu-lo i poseu-lo al damunt de tot.»

**5. On escriurem el nom? Per a què servirà?**

Resposta orientativa: A la tapa. Permetrà identificar la capsa sense remenar-ne el contingut.

Pistes: «escriviu el vostre nom a la tapa. Així sabrem de qui és la capsa sense remenar el contingut.»

**6. Quan tornarem a obrir la capsa?**

Resposta orientativa: A final de curs.

Pistes: «l’obrirem a final de curs.»

### ca-S008 · La foto que faltava

4t · Accessible · Narració · 6 preguntes

[Obre la fitxa i el solucionari](https://sentit.ortogra.fi/#lectura=ca-S008) · [Escolta l’àudio](https://sentit.ortogra.fi/?escolta=ca-S008)

Presentació: «Comprensió oral. La foto que faltava.»

**Narradora.** Dissabte al matí, l’Aina va obrir l’àlbum de fotos de l’avi per preparar un treball de l’escola. Volia explicar com havia canviat el poble. Recordava una fotografia de la plaça, amb un arbre enorme al mig i una font al costat.

**Narradora.** Va passar les pàgines fins a trobar el lloc. Però allà només hi havia quatre cantoneres de paper i un rectangle més clar. La foto no hi era. L’Aina va mirar a terra i sota la taula. Després va pensar que el seu germà petit l’havia agafada per jugar.

**Narradora.** Abans d’anar-lo a buscar, però, va preguntar a l’avi si sabia on era. Ell va somriure i li va assenyalar un sobre damunt de la prestatgeria. No s’havia perdut res. L’avi havia tret la fotografia de l’àlbum per portar-la a copiar. Volia donar-ne una còpia a la biblioteca.

**Narradora.** L’Aina va obrir el sobre amb cura. A la fotografia, la plaça semblava més petita que ara. L’avi li va explicar que això era perquè el fotògraf l’havia retratada des d’un racó. La plaça no havia canviat de mida.

**Narradora.** En canvi, l’arbre sí que havia desaparegut. Una tempesta l’havia fet caure anys enrere. Ara, al seu lloc, hi havia un banc llarg. L’Aina va apuntar la diferència al quadern i va descartar el que havia pensat sobre la mida.

**Narradora.** Quan va tornar a guardar la foto, va dir a l’avi que primer havia sospitat del seu germà. L’avi li va respondre que preguntar sovint estalvia una bona estona de buscar. L’Aina va tancar l’àlbum. Ja tenia una història per explicar, i també sabia que una primera impressió no sempre és la bona.

**1. Per a què busca fotografies, l’Aina?**

Resposta orientativa: Per preparar un treball de l’escola sobre com havia canviat el poble.

Pistes: «per preparar un treball de l’escola. Volia explicar com havia canviat el poble.»

**2. De qui sospita al principi? Què fa abans d’anar-lo a buscar?**

Resposta orientativa: Sospita del seu germà petit. Abans de buscar-lo, pregunta a l’avi si sap on és la fotografia.

Pistes: «va pensar que el seu germà petit l’havia agafada per jugar.» · «va preguntar a l’avi si sabia on era.»

**3. On era la fotografia i per què l’avi l’havia tret de l’àlbum?**

Resposta orientativa: En un sobre damunt de la prestatgeria. L’avi volia portar-la a copiar per donar-ne una còpia a la biblioteca.

Pistes: «un sobre damunt de la prestatgeria.» · «L’avi havia tret la fotografia de l’àlbum per portar-la a copiar. Volia donar-ne una còpia a la biblioteca.»

**4. La plaça havia canviat de mida? Per què ho semblava?**

Resposta orientativa: No. Ho semblava perquè el fotògraf havia fet la foto des d’un racó.

Pistes: «el fotògraf l’havia retratada des d’un racó. La plaça no havia canviat de mida.»

**5. Quin canvi de la plaça sí que era real?**

Resposta orientativa: L’arbre havia caigut durant una tempesta i ara hi havia un banc llarg al seu lloc.

Pistes: «Una tempesta l’havia fet caure anys enrere. Ara, al seu lloc, hi havia un banc llarg.»

**6. Què ha après l’Aina sobre les primeres impressions? Explica-ho amb una cosa que li hagi passat.**

Resposta orientativa: Que cal comprovar-les abans de donar-les per bones. Pot explicar que el germà no havia agafat la foto o que la plaça semblava més petita sense haver canviat de mida. Cal relacionar l’aprenentatge amb un exemple del relat.

### ca-S015 · Una restauradora ens explica el seu ofici

5è · Intermèdia · Entrevista · 8 preguntes

Presentació: «Comprensió oral. Una restauradora ens explica el seu ofici.»

**Entrevistador.** Avui visitem el taller de la Nora, que treballa restaurant obres d’art. A la taula hi té una pintura antiga. Jo m’imaginava que una restauradora començava de seguida amb els pinzells. Nora, què és el primer que fas quan t’arriba una obra?

**Nora.** El primer és observar-la. Miro com està feta i quins problemes té. També faig fotografies i ho anoto tot. Abans de tocar-la necessito entendre què li ha passat. De vegades treballo amb altres especialistes, perquè una sola persona no pot saber-ho tot.

**Entrevistador.** I després repintes les parts que han perdut el color? Suposo que l’objectiu és que torni a semblar acabada de fer.

**Nora.** No exactament. No volem esborrar la història de l’obra. Procurem conservar-la i intervenir només on cal. En aquesta pintura hi ha una petita zona sense color, però no sabem amb seguretat què hi havia dibuixat. Si m’ho inventés perquè quedés bonic, estaria afegint una informació que no tenim.

**Entrevistador.** Ara ho entenc. Però, si una pintura està bruta, no n’hi ha prou de netejar-la amb aigua, com fem amb una taula?

**Nora.** No. Cada obra està feta amb materials diferents i una neteja inadequada la pot fer malbé. Primer cal estudiar els materials i fer proves molt controlades. I després documentem què hem fet, amb quins materials i per què. Així, si una altra persona hi treballa d’aquí a uns anys, no haurà de començar de zero.

**Entrevistador.** A la sala del museu em va sorprendre que hi hagués poca llum. Jo pensava que així no es podien veure bé les pintures. Té alguna relació amb la vostra feina?

**Nora.** Sí. Conservar també vol dir evitar danys abans que apareguin. Algunes obres són sensibles a la llum, que pot alterar-ne els colors. Per això es controla la il·luminació i també les condicions de temperatura i humitat. No sempre es conserva millor una obra fent-hi més coses. A vegades, el més útil és protegir-la bé.

**Entrevistador.** Per tant, no pots prometre que acabaràs totes les obres en el mateix nombre de dies.

**Nora.** Exacte. Cal donar a cada cas el temps que necessita. La pressa pot portar a prendre decisions sense prou informació. Per això, quan explico el meu ofici, dic que treballo amb les mans, però també amb els ulls, amb preguntes i amb molta paciència.

**1. Què fa la Nora abans de tocar una obra? Escriu dues accions.**

Resposta orientativa: L’observa, mira com està feta i els problemes que té, fa fotografies i anota la informació. S’accepten dues d’aquestes accions.

Pistes: «El primer és observar-la. Miro com està feta i quins problemes té. També faig fotografies i ho anoto tot.»

**2. Quina idea equivocada sobre restaurar tenia l’entrevistador?**

Resposta orientativa: Que calia repintar les parts que havien perdut el color i fer que l’obra semblés acabada de fer.

Pistes: «repintes les parts que han perdut el color? Suposo que l’objectiu és que torni a semblar acabada de fer.»

**3. Per què la Nora no s’inventa el dibuix que falta en aquesta pintura?**

Resposta orientativa: Perquè no saben amb seguretat què hi havia. Inventar-lo afegiria informació sense proves i podria esborrar o alterar la història de l’obra.

Pistes: «no sabem amb seguretat què hi havia dibuixat. Si m’ho inventés perquè quedés bonic, estaria afegint una informació que no tenim.»

**4. Per què no es pot netejar qualsevol obra com es neteja una taula?**

Resposta orientativa: Perquè les obres tenen materials diferents i una neteja inadequada les pot fer malbé. Cal estudiar els materials i fer proves controlades.

Pistes: «Cada obra està feta amb materials diferents i una neteja inadequada la pot fer malbé. Primer cal estudiar els materials i fer proves molt controlades.»

**5. A qui ajudarà deixar escrit què s’ha fet a l’obra? De quina manera?**

Resposta orientativa: A la persona que hi treballi en el futur: sabrà què s’ha fet, amb quins materials i per què, i no haurà de començar l’estudi de zero.

Pistes: «documentem què hem fet, amb quins materials i per què. Així, si una altra persona hi treballa d’aquí a uns anys, no haurà de començar de zero.»

**6. Quina finalitat té controlar la llum de les sales? Indica una altra condició que també es controla.**

Resposta orientativa: Evitar que la llum alteri els colors de les obres sensibles. També es controla la temperatura o la humitat.

Pistes: «Algunes obres són sensibles a la llum, que pot alterar-ne els colors. Per això es controla la il·luminació i també les condicions de temperatura i humitat.»

**7. Quin risc té voler acabar una restauració massa de pressa?**

Resposta orientativa: Prendre decisions sense prou informació.

Pistes: «La pressa pot portar a prendre decisions sense prou informació.»

**8. Per què diu que treballa també amb els ulls i amb preguntes? Explica-ho amb un exemple de l’entrevista.**

Resposta orientativa: Perquè observar, investigar i comprovar és necessari abans d’intervenir. Pot posar com a exemple estudiar els materials, esbrinar què falta al dibuix o comprovar com netejar sense fer malbé. Cal una explicació i un exemple coherent.

### ca-S023 · Reobren el mercat: què canvia i què falta decidir?

6è · Avançada · Notícia · 10 preguntes

Presentació: «Comprensió oral. Reobren el mercat: què canvia i què falta decidir. Notícia de ficció.»

**Presentadora.** Bon dia. El mercat del barri tornarà a obrir dilluns, després de quatre mesos d’obres. És la informació principal del comunicat que ha publicat avui l’ajuntament. Les parades que fins ara treballaven en una carpa al costat del poliesportiu tornaran a l’edifici habitual. Però la reobertura no vol dir que totes les decisions estiguin preses. Avui separem els canvis confirmats de les propostes que encara s’estan estudiant.

**Presentadora.** Comencem pels accessos. Dilluns, l’entrada del carrer Major serà l’única oberta al públic. La porta de la plaça continuarà tancada perquè encara s’hi està acabant la rampa. El comunicat no fixa el dia que s’obrirà aquesta segona entrada. A dins, els passadissos seran més amples i hi haurà un punt d’informació al costat de l’entrada principal. Aquests canvis ja s’han completat.

**Presentadora.** L’horari també està confirmat. El mercat obrirà de dilluns a dissabte, de vuit del matí a dues del migdia. Obrir una tarda a la setmana és, de moment, una proposta de l’associació de comerciants. Encara no s’ha aprovat ni s’ha triat quin dia seria. L’associació ha demanat que primer s’escolti l’opinió de les persones que hi compren habitualment.

**Presentadora.** Hem parlat amb en Pau, que té una parada de fruita. Primer li hem preguntat què valora de les obres i després, què espera de la reobertura.

**Pau.** A la carpa teníem poc espai per descarregar. Jo crec que els passadissos nous ens ajudaran a treballar millor. També espero que torni gent que durant les obres ha anat a comprar a altres llocs. Ara bé, no puc dir que vendrem més només perquè l’edifici sigui més còmode. Això ho veurem quan portem unes setmanes oberts. A mi m’agradaria obrir els divendres a la tarda, però sé que altres companys prefereixen un altre dia.

**Presentadora.** Per tant, la possible millora de les vendes és una expectativa del comerciant, i el divendres a la tarda és la seva preferència. Cap de les dues coses no apareix com una decisió confirmada al comunicat. El que sí que s’hi indica és que es recolliran suggeriments al punt d’informació durant les dues primeres setmanes. També s’hi podran deixar opinions per escrit, de manera que no caldrà trobar la persona responsable just en aquell moment.

**Presentadora.** Una altra iniciativa és reduir els envasos d’un sol ús. Algunes parades acceptaran recipients reutilitzables de la clientela. Però no serà una obligació general ni s’aplicarà de la mateixa manera a tots els productes. Cada parada explicarà quins recipients pot acceptar i en quines condicions. El punt d’informació orientarà les persones que hi tinguin dubtes. Per això, un anunci que digués que des de dilluns tothom haurà de portar una carmanyola no descriuria bé la iniciativa.

**Presentadora.** Abans d’acabar, un detall sobre la informació que circula pel barri. En alguns aparadors encara es pot veure un cartell antic que anuncia la reobertura per dimarts. És el dia que es va preveure durant les obres, però el comunicat d’avui el rectifica. Per planificar la primera visita cal seguir la informació més recent i comprovar-ne la data, no quedar-se només amb el primer cartell que trobem.

**Presentadora.** En resum: dilluns es podrà tornar al mercat, entrant pel carrer Major i en horari de matí. Continuen pendents l’obertura de la porta de la plaça i la proposta d’obrir una tarda. D’aquí a un mes, l’associació explicarà què s’ha recollit amb els suggeriments. Aquest seguiment permetrà saber quines demandes es repeteixen abans de prendre noves decisions.

**1. Quina és la notícia principal? Què feien les parades durant les obres?**

Resposta orientativa: El mercat reobre dilluns després de quatre mesos d’obres. Durant les obres les parades treballaven en una carpa al costat del poliesportiu.

Pistes: «El mercat del barri tornarà a obrir dilluns, després de quatre mesos d’obres.» · «Les parades que fins ara treballaven en una carpa al costat del poliesportiu tornaran a l’edifici habitual.»

**2. Per quina entrada s’hi podrà accedir dilluns? Per què l’altra porta continuarà tancada?**

Resposta orientativa: Pel carrer Major. La porta de la plaça continuarà tancada perquè encara s’hi està acabant la rampa.

Pistes: «l’entrada del carrer Major serà l’única oberta al públic. La porta de la plaça continuarà tancada perquè encara s’hi està acabant la rampa.»

**3. Es coneix la data d’obertura de la porta de la plaça? Com ho saps?**

Resposta orientativa: No. La presentadora diu que el comunicat no fixa el dia que s’obrirà.

Pistes: «El comunicat no fixa el dia que s’obrirà aquesta segona entrada.»

**4. Es pot afirmar que el mercat obrirà els divendres a la tarda? Diferencia el que està aprovat del que vol en Pau.**

Resposta orientativa: No. Només està confirmat l’horari de matí, de dilluns a dissabte. Obrir una tarda és una proposta encara no aprovada i divendres és la preferència d’en Pau.

Pistes: «Obrir una tarda a la setmana és, de moment, una proposta de l’associació de comerciants. Encara no s’ha aprovat ni s’ha triat quin dia seria.» · «A mi m’agradaria obrir els divendres a la tarda, però sé que altres companys prefereixen un altre dia.»

**5. L’augment de vendes és una dada comprovada o una expectativa? Justifica-ho amb el que diu el comerciant.**

Resposta orientativa: És una expectativa. En Pau espera que torni clientela, però reconeix que no pot assegurar que vendran més i que caldrà esperar unes setmanes.

Pistes: «no puc dir que vendrem més només perquè l’edifici sigui més còmode. Això ho veurem quan portem unes setmanes oberts.»

**6. On i durant quant de temps es recolliran suggeriments? Quin avantatge té poder-los deixar per escrit?**

Resposta orientativa: Al punt d’informació, durant les dues primeres setmanes. Escriure’ls permet fer arribar l’opinió encara que la persona responsable no hi sigui en aquell moment.

Pistes: «es recolliran suggeriments al punt d’informació durant les dues primeres setmanes. També s’hi podran deixar opinions per escrit, de manera que no caldrà trobar la persona responsable just en aquell moment.»

**7. Per què seria inexacte anunciar que tothom haurà de portar una carmanyola?**

Resposta orientativa: Perquè acceptar recipients reutilitzables és una iniciativa d’algunes parades, no una obligació general, i les condicions depenen del producte i de cada parada.

Pistes: «Algunes parades acceptaran recipients reutilitzables de la clientela. Però no serà una obligació general ni s’aplicarà de la mateixa manera a tots els productes.»

**8. Un cartell diu dimarts i el comunicat d’avui diu dilluns. Quina informació has de seguir i per què?**

Resposta orientativa: La del comunicat d’avui: és la més recent i rectifica la previsió antiga dels cartells. Cal comprovar la data i la font.

Pistes: «És el dia que es va preveure durant les obres, però el comunicat d’avui el rectifica.»

**9. Per a què servirà revisar els suggeriments al cap d’un mes?**

Resposta orientativa: Per identificar quines demandes es repeteixen i tenir informació abans de prendre noves decisions.

Pistes: «Aquest seguiment permetrà saber quines demandes es repeteixen abans de prendre noves decisions.»

**10. Proposa un titular fidel a la notícia. Ha d’incloure un fet confirmat i evitar presentar una proposta com si ja estigués aprovada.**

Resposta orientativa: Per exemple: «El mercat reobre dilluns al matí i recollirà suggeriments». S’accepten altres titulars clars que recullin informació confirmada i no anunciïn l’obertura de tardes com un fet.
