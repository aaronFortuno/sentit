# Primera tanda de prototips

18 de novembre de 2026 · v0.1.20 · Pendent d’audició del docent i prova amb alumnat.

**Registre històric de la primera tanda.** Per veure l’estat actual, incloses S008R i la nova entrevista amb Kore, consulteu el [seguiment per fases](seguiment-produccio.md). Les durades i les previsions següents són les de la versió indicada.

## Estat

| Codi | Curs | Títol | Tipus | Dificultat | Fragment | Preguntes | Producció |
| --- | --- | --- | --- | --- | --- | ---: | --- |
| ca-S002 | 3r | Preparem una capsa de records | Instruccions | Accessible | 0:50 | 6 | Àudio complet, disponible al catàleg |
| ca-S008 | 4t | La foto que faltava | Narració | Accessible | 1:25 | 6 | Àudio complet, disponible al catàleg |
| ca-S015 | 5è | Una restauradora ens explica el seu ofici | Entrevista | Intermèdia | Objectiu 2:30–3:00 | 8 | Fitxa disponible; àudio pendent |
| ca-S023 | 6è | Reobren el mercat: què canvia i què falta decidir? | Notícia | Avançada | Objectiu 3:15–4:00 | 10 | Fitxa disponible; àudio pendent |

S002 i S008 tenen fitxa, solucionari, transcripció, ressalts opcionals i il·lustració. S015 conserva localment la primera presa de l’entrevista; falten una presa amb tot el text restant i la presentació. S023 encara no s’ha sintetitzat. S015 i S023 es poden revisar i maquetar al catàleg amb l’estat «Àudio en preparació», sense QR ni reproductor mentre falti el MP3.

La quota de Gemini ha retornat HTTP 429 amb una espera fins aproximadament al **19 de novembre de 2026 a les 09:00 CET**. No s’han programat reintents durant aquesta espera. S’ha acordat continuar de moment amb la quota gratuïta. [Estimació de cost de futurs lots](cost-produccio.md).

## Producció i comprovacions

- Gemini 3.8 Flash TTS, català central. Aoede per a les veus adultes femenines i les presentacions; Puck per a l’entrevistador jove; Charon previst per al comerciant.
- La narradora explica els diàlegs infantils sense intentar interpretar-los amb una veu de nena. L’entrevistador de S015 és un jove i la Nora és una professional adulta.
- Preses per escenes, normalitzades al voltant de −19 LUFS, sense alterar velocitat ni altura. Màsters mono, 48 kHz, MP3 de 128 kbit/s.
- S002 té una pausa de tres segons entre els primers passos i el missatge final. S008 incorpora un fregadís de paper breu i suau que se superposa a l’inici de la segona escena. Cap resposta depèn d’aquest so.
- S015 mantindrà els torns de l’entrevista sense efectes; S023 tindrà una sintonia curta que es retirarà en començar la notícia. La notícia és fictícia i així s’anuncia.
- Les transcripcions automàtiques de Gemini i Vosk s’han contrastat amb els guions de S002 i S008. Conserven la seqüència i les dades preguntades, amb errors propis de reconeixement; no substitueixen una audició humana.
- Comprovació local 0.1.20: S002 ocupa una pàgina de fitxa i dues de solucionari; S008, dues i dues. Transcripcions completes, ressalts opcionals, tipografia ampliada i absència de desbordaments.
- Els esborranys S015 i S023 també passen la comprovació de transcripció i ressalts: S015 ocupa dues pàgines de fitxa i tres de solucionari; S023, tres i tres. Aquests recomptes encara no inclouen el bloc QR de l’àudio acabat.
- La sessió pautada reprodueix la presentació una vegada i el fragment sencer en cada escolta, amb les pauses configurades. El QR conserva el codi i la configuració.

| Codi | Presentació i pausa | Fragment exacte | Màster complet | LUFS | Pic dBTP |
| --- | ---: | ---: | ---: | ---: | ---: |
| S002 | 4.882 s | 50.100 s | 54.982 s | -19.5 | -3 |
| S008 | 4.174 s | 85.048 s | 89.222 s | -18.9 | -2.7 |

Les empremtes SHA-256 i les escenes són al [manifest d’àudio](../assets/audio/prototips-manifest.json). Les fonts factuals de l’entrevista i els recursos visuals consten als [crèdits](../CREDITS.md).

## Represa local

El generador publicat és `tools/generate-prototypes.cjs`. Les preses i els registres continuen a `../output/sentit-primera-tanda`, fora del repositori. L’antic `production.cjs` redirigeix al generador nou. No es duplica cap màster complet ni es refan les preses existents.

Des de la carpeta del repositori:

```sh
node tools/generate-prototypes.cjs --plan
```

El pla es pot consultar sense xarxa. S002 i S008 necessiten zero peticions. S015 conserva la primera escena i necessita una presa amb tot el text restant més la presentació. S023 necessita una presa pel text complet més la presentació. En total, quatre peticions previstes sense reintents. Per a noves activitats, l’estratègia per defecte és fragment sencer + presentació.

Després de recuperar quota:

```sh
node tools/generate-prototypes.cjs --generate --only=S015
node tools/generate-prototypes.cjs --generate --only=S023
```

La data `retryNotBefore` de `last-api-error.json` impedeix avançar peticions. El generador espaia els intents, conserva el registre i s’atura davant de la quota. No s’ha deixat cap procés de síntesi en espera ni s’ha activat facturació.

En completar cada activitat: contrastar l’àudio amb el guió, verificar nivells i durada, comprovar el manifest i aquest document, revisar fitxa, solucionari i sessió, i publicar. Els accessos d’escolta s’habiliten quan l’activitat té un MP3 acabat. [Revisió editorial i tècnica](revisio-materials.md).

## Guions, preguntes i respostes de revisió

Enunciats i respostes sincronitzats amb les fitxes 0.1.20. La [revisió editorial](revisio-editorial-prototips.md) inclou també S001 i concreta els criteris de curs, dificultat i correcció.

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

**1. Com ha de ser la capsa? Digues dues característiques.**

Resposta orientativa: Ha d’estar buida i s’ha de poder tancar. També és vàlid dir que no cal que sigui nova. S’accepten dues d’aquestes tres informacions.

Pistes: «Busqueu una capsa buida que es pugui tancar. No cal que sigui nova.»

**2. Què hem de posar primer al fons de la capsa?**

Resposta orientativa: Un dibuix. No cal explicar quin dia representa.

Pistes: «poseu al fons un dibuix d’un dia que vulgueu recordar.»

**3. Hi posarem una fotografia original o una còpia? Per què?**

Resposta orientativa: Una còpia, per evitar que l’original es faci malbé.

Pistes: «afegiu una còpia d’una fotografia. Guardarem l’original fora de la capsa perquè no es faci malbé.»

**4. On posarem el missatge, després de doblegar-lo?**

Resposta orientativa: Al damunt de tot, dins de la capsa.

Pistes: «Doblegueu-lo i poseu-lo al damunt de tot.»

**5. Per què escriurem el nom a la tapa de la capsa?**

Resposta orientativa: Per saber de qui és. També es pot explicar que així no cal obrir-la o remenar-ne el contingut.

Pistes: «Així sabrem de qui és la capsa sense remenar el contingut.»

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

**1. Per a què busca la fotografia, l’Aina?**

Resposta orientativa: Per preparar un treball de l’escola. Explicar com havia canviat el poble concreta el tema, però no és imprescindible per respondre la finalitat.

Pistes: «per preparar un treball de l’escola. Volia explicar com havia canviat el poble.»

**2. De qui sospita al principi? Què fa abans d’anar-lo a buscar?**

Resposta orientativa: Sospita del seu germà petit. Abans de buscar-lo, pregunta a l’avi si sap on és la fotografia.

Pistes: «va pensar que el seu germà petit l’havia agafada per jugar.» · «va preguntar a l’avi si sabia on era.»

**3. On era la fotografia? Per què l’avi l’havia tret de l’àlbum?**

Resposta orientativa: En un sobre damunt de la prestatgeria, perquè volia fer-ne una còpia. Dir «en un sobre» és suficient per al lloc; explicar que la còpia era per a la biblioteca és una ampliació.

Pistes: «un sobre damunt de la prestatgeria.» · «L’avi havia tret la fotografia de l’àlbum per portar-la a copiar. Volia donar-ne una còpia a la biblioteca.»

**4. Per què la plaça sembla més petita a la fotografia?**

Resposta orientativa: Perquè el fotògraf l’havia fotografiada des d’un racó. També s’accepta explicar-ho amb el punt de vista o l’angle de la foto. No n’hi ha prou amb dir que és una foto antiga.

Pistes: «el fotògraf l’havia retratada des d’un racó. La plaça no havia canviat de mida.»

**5. Quin canvi de la plaça sí que era real?**

Resposta orientativa: Ara hi ha un banc on abans hi havia l’arbre. També s’accepta dir que l’arbre ja no hi és. No cal recordar la tempesta ni descriure la mida del banc.

Pistes: «l’arbre sí que havia desaparegut. Una tempesta l’havia fet caure anys enrere. Ara, al seu lloc, hi havia un banc llarg.»

**6. Què ha après l’Aina sobre les primeres impressions? Explica-ho amb un exemple de la història.**

Resposta orientativa: Cal comprovar-les abans de donar-les per bones, o preguntar abans d’acusar. Per exemple, la foto la tenia l’avi i no l’havia agafada el germà; també pot explicar que la plaça semblava més petita sense haver canviat de mida. Cal una idea i un exemple del relat, amb paraules pròpies.

### ca-S015 · Una restauradora ens explica el seu ofici

5è · Intermèdia · Entrevista · 8 preguntes

[Obre la fitxa i el solucionari](https://sentit.ortogra.fi/#lectura=ca-S015)

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

Resposta orientativa: Dues accions diferents entre observar com està feta i els problemes que té, fer fotografies i anotar la informació. No cal copiar les paraules exactes del guió.

Pistes: «El primer és observar-la. Miro com està feta i quins problemes té. També faig fotografies i ho anoto tot.»

**2. Quina idea equivocada sobre restaurar tenia l’entrevistador?**

Resposta orientativa: Pensava que restaurar volia dir deixar l’obra com nova. Repintar les parts sense color és l’exemple que ell proposa, però no cal esmentar-lo si la idea de «fer-la semblar nova» queda clara.

Pistes: «repintes les parts que han perdut el color? Suposo que l’objectiu és que torni a semblar acabada de fer.»

**3. Per què la Nora no s’inventa el dibuix que falta en aquesta pintura?**

Resposta orientativa: Perquè no sap amb seguretat què hi havia dibuixat i afegiria informació sense proves. També s’accepta «perquè no sap com era el dibuix».

Pistes: «no sabem amb seguretat què hi havia dibuixat. Si m’ho inventés perquè quedés bonic, estaria afegint una informació que no tenim.»

**4. Per què no es pot netejar qualsevol obra com es neteja una taula?**

Resposta orientativa: Perquè les obres tenen materials diferents i una neteja inadequada les pot fer malbé. Cal estudiar els materials i fer proves controlades.

Pistes: «Cada obra està feta amb materials diferents i una neteja inadequada la pot fer malbé. Primer cal estudiar els materials i fer proves molt controlades.»

**5. A qui ajudarà deixar escrit què s’ha fet a l’obra? De quina manera?**

Resposta orientativa: A qui la restauri o l’estudiï en el futur: podrà saber què s’hi ha fet i no començarà de zero. No cal enumerar alhora els tractaments, els materials i els motius.

Pistes: «documentem què hem fet, amb quins materials i per què. Així, si una altra persona hi treballa d’aquí a uns anys, no haurà de començar de zero.»

**6. Quina finalitat té controlar la llum de les sales? Indica una altra condició que també es controla.**

Resposta orientativa: Evitar que la llum alteri els colors de les obres sensibles. També es controla la temperatura o la humitat.

Pistes: «Algunes obres són sensibles a la llum, que pot alterar-ne els colors. Per això es controla la il·luminació i també les condicions de temperatura i humitat.»

**7. Quin risc té voler acabar una restauració massa de pressa?**

Resposta orientativa: Prendre decisions sense prou informació.

Pistes: «La pressa pot portar a prendre decisions sense prou informació.»

**8. La Nora diu que treballa també «amb els ulls» i «amb preguntes». Què vol dir? Explica-ho amb un exemple de l’entrevista.**

Resposta orientativa: Vol dir que ha d’observar, investigar i entendre l’obra abans d’intervenir-hi. Per exemple, estudia els materials abans de decidir com netejar-la, o comprova si se sap què hi havia al dibuix. Cal explicar la idea i relacionar-hi un exemple; no cal definir cap terme tècnic.

### ca-S023 · Reobren el mercat: què canvia i què falta decidir?

6è · Avançada · Notícia · 10 preguntes

[Obre la fitxa i el solucionari](https://sentit.ortogra.fi/#lectura=ca-S023)

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

**1. Quina és la notícia principal? On treballaven les parades durant les obres?**

Resposta orientativa: El mercat reobre dilluns després de les obres. Durant les obres, les parades treballaven en una carpa.

Pistes: «El mercat del barri tornarà a obrir dilluns, després de quatre mesos d’obres.» · «Les parades que fins ara treballaven en una carpa al costat del poliesportiu tornaran a l’edifici habitual.»

**2. Per quina entrada s’hi podrà accedir dilluns? Per què l’altra porta continuarà tancada?**

Resposta orientativa: Pel carrer Major. La porta de la plaça continuarà tancada perquè encara s’hi està acabant la rampa.

Pistes: «l’entrada del carrer Major serà l’única oberta al públic. La porta de la plaça continuarà tancada perquè encara s’hi està acabant la rampa.»

**3. Es coneix la data d’obertura de la porta de la plaça? Com ho saps?**

Resposta orientativa: No. La presentadora diu que el comunicat no fixa el dia que s’obrirà.

Pistes: «El comunicat no fixa el dia que s’obrirà aquesta segona entrada.»

**4. Es pot afirmar que el mercat obrirà els divendres a la tarda? Diferencia el que està aprovat del que vol en Pau.**

Resposta orientativa: No. Està confirmada l’obertura al matí. Obrir una tarda encara és una proposta, i divendres és la preferència d’en Pau.

Pistes: «L’horari també està confirmat. El mercat obrirà de dilluns a dissabte, de vuit del matí a dues del migdia.» · «Obrir una tarda a la setmana és, de moment, una proposta de l’associació de comerciants. Encara no s’ha aprovat ni s’ha triat quin dia seria.» · «A mi m’agradaria obrir els divendres a la tarda, però sé que altres companys prefereixen un altre dia.»

**5. L’augment de vendes és una dada comprovada o una expectativa? Justifica-ho amb el que diu el comerciant.**

Resposta orientativa: És una expectativa. En Pau espera que torni clientela, però reconeix que no pot assegurar que vendran més i que caldrà esperar unes setmanes.

Pistes: «no puc dir que vendrem més només perquè l’edifici sigui més còmode. Això ho veurem quan portem unes setmanes oberts.»

**6. On i durant quant de temps es recolliran suggeriments? Quin avantatge té poder-los deixar per escrit?**

Resposta orientativa: Al punt d’informació, durant les dues primeres setmanes. Escriure’ls permet fer arribar l’opinió encara que la persona responsable no hi sigui en aquell moment.

Pistes: «es recolliran suggeriments al punt d’informació durant les dues primeres setmanes. També s’hi podran deixar opinions per escrit, de manera que no caldrà trobar la persona responsable just en aquell moment.»

**7. Per què seria inexacte anunciar que tothom haurà de portar una carmanyola?**

Resposta orientativa: Perquè és una opció d’algunes parades, no una obligació per a tothom. No cal enumerar les condicions de cada producte.

Pistes: «Algunes parades acceptaran recipients reutilitzables de la clientela. Però no serà una obligació general ni s’aplicarà de la mateixa manera a tots els productes.»

**8. Un cartell diu dimarts i el comunicat d’avui diu dilluns. Quina informació has de seguir i per què?**

Resposta orientativa: La del comunicat de l’ajuntament, que anuncia dilluns i rectifica el cartell antic. La raó és aquesta actualització expressa, no només que sigui un missatge més nou.

Pistes: «És la informació principal del comunicat que ha publicat avui l’ajuntament.» · «És el dia que es va preveure durant les obres, però el comunicat d’avui el rectifica.»

**9. Per a què servirà revisar els suggeriments al cap d’un mes?**

Resposta orientativa: Per identificar quines demandes es repeteixen i tenir informació abans de prendre noves decisions.

Pistes: «Aquest seguiment permetrà saber quines demandes es repeteixen abans de prendre noves decisions.»

**10. Proposa un titular fidel a la notícia. Ha d’incloure un fet confirmat i evitar presentar una proposta com si ja estigués aprovada.**

Resposta orientativa: Per exemple: «El mercat reobre dilluns al matí i recollirà suggeriments». S’accepten altres titulars clars que recullin informació confirmada i no anunciïn l’obertura de tardes com un fet.
