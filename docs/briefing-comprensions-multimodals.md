# Briefing per a un projecte de comprensions multimodals

Document de traspàs a un altre agent · 23 de novembre de 2026.

## Encàrrec i intenció

Explorar un projecte educatiu sota el paraigua d’[ortogra.fi](https://ortogra.fi/) que combini **àudio i documents impresos amb informació pròpia**: mapes, plànols, horaris, cartells, taules, esquemes, instruccions o textos breus. L’alumnat ha de relacionar allò que escolta amb allò que interpreta al paper.

No es tracta d’afegir una il·lustració decorativa a una comprensió oral. Una part de les preguntes ha de necessitar realment les dues fonts. Per exemple, un diàleg explica una incidència en un trajecte de bus, mentre un plànol imprès aporta parades, correspondències i punts d’interès necessaris per trobar una alternativa.

La idea va sorgir revisant S057 de Sentit. La nota original és [activitats-hibrides.md](activitats-hibrides.md). Aquest encàrrec prepara una línia de treball pròpia: **no modificar S057, Sentit ni Trama per convertir-los en el nou projecte**. El nom, el repositori, el subdomini i l’encaix definitiu encara s’han de decidir. «Global» i «Móns» havien aparegut com a idees, sense cap tria feta.

## Principis pedagògics

- Repositori curat de materials **multinivell, filtrables, multiidioma i autocorrectius**. Cada eina resol una necessitat concreta; evitar convertir-la en una plataforma generalista.
- **Paper com a espai de treball.** El dispositiu serveix principalment per reproduir l’àudio. L’alumne consulta el document i respon al full, no passa la sessió navegant per una pantalla.
- **Autonomia:** el docent prepara i imprimeix; l’alumne accedeix a una sessió amb QR o codi, escolta amb els suports establerts i després es pot autocorregir amb un solucionari comprensible.
- **DUA:** separar els suports d’accés de la dificultat cognitiva. Tipografia, contrast, mida del mapa, pauses o formes de respondre són suports; densitat d’informació, referents, inferències i relacions entre fonts determinen també la dificultat. Alentir una locució no transforma per si sol una activitat difícil en una d’accessible.
- Conservar context, interès i naturalitat en les variants. No presentar-les a l’alumnat com una classificació de capacitats. El docent tria la versió i els suports.
- La qualificació de curs i dificultat és orientativa i es confirma amb l’activitat completa, escoltada i resolta, no només llegint-ne el guió.

Una resposta pot ser una dada, una justificació breu, un recorregut marcat, una selecció o una anotació al document. No cal exigir molta escriptura per comprovar que l’alumne ha entès una relació espacial o temporal.

## Referents existents: què aporta cadascun

| Projecte | Funció | Elements que interessa estudiar |
| --- | --- | --- |
| [Sentit](https://sentit.ortogra.fi/) | Comprensions orals amb preguntes impreses | Àudios preparats, sessió pautada, QR amb configuració, vista d’escolta mínima, transcripció, evidències i seguiment editorial |
| [Trama](https://trama.ortogra.fi/) | Comprensions lectores imprimibles | Catàleg, filtres, famílies i variants, col·leccions docents, plantilles, maquetació, exportació i evidències al solucionari |
| [Plec](https://plec.ortogra.fi/) | Dictats, paper plegat i escolta autònoma | Ús mínim de pantalla, enllaços inequívocs, identitat de l’activitat i coherència entre paper i reproducció |
| [ortogra.fi](https://ortogra.fi/) | Paraigua de projectes i utilitats educatives | Identitat compartida, presentació sòbria i vinculació entre projectes independents |

**No tots els controls de Trama estan implementats de la mateixa manera a Sentit.** Són referències complementàries: mirar el comportament actual, no copiar una captura ni suposar que totes dues aplicacions comparteixen una biblioteca interna.

## Infraestructura i carpetes de referència

Espai de treball local: `C:/Users/afortun8/Desktop/Projects/Escola/`.

- `sentit/`: HTML, CSS i mòduls JavaScript estàtics. `catalogue.js` i `content/` organitzen les comprensions; `worksheet.js` i `review.js`, el material imprimible i les vistes de revisió; `session.js`, la sessió d’escolta; `collections.js`, les col·leccions; `analytics.js`, els esdeveniments. `assets/` conté els recursos públics i `tools/` els processos locals de producció i comprovació.
- `trama/`: entrada `app.js`; catàleg `catalog.js` i `data/readings.js`; editor `studio.js`; maquetació `worksheet.js`, `worksheet-code.js` i `worksheet-layouts.js`; plantilles `template-library.js` i `worksheet-templates.js`; famílies `reading-families.js` i `data/families.js`; col·leccions `collections.js`; evidències `answer-evidence.js`; idiomes `i18n.js` i `locales/`; exportació `worksheet-pdf.js`, `worksheet-zip.js` i `batch-download.js`. El seu `package.json` declara mòduls ES i un servidor local de desenvolupament, no un backend públic.
- `ortogra-fi/`: landing del paraigua. Consultar també els seus recursos de marca quan es triï el nom nou.

Llegir els `AGENTS.md` i README corresponents abans d’intervenir. No donar per fet que existeix un skill instal·lat anomenat «aaron-web»: les referències verificables són els projectes i les seves instruccions locals.

El nou web ha de funcionar **al navegador i allotjat en estàtic a GitHub Pages**, amb un subdomini futur d’ortogra.fi. No necessita comptes, base de dades, servidor de renderització ni claus de TTS al client. Preferir HTML/CSS i mòduls JavaScript senzills, amb dependències petites i justificades.

## Dos espais d’ús diferenciats

### Preparació docent

1. Catàleg amb filtres i cards; la cerca i els filtres descarten resultats immediatament.
2. En entrar en una activitat: documents, preguntes, solucionari, previsualització i configuració de l’àudio.
3. Configuració guardada localment; imprimir o desar PDF, copiar l’enllaç o preparar una col·lecció.

Filtres previstos: llengua del contingut en primer lloc, curs, dificultat, durada, tipologia oral, tipus de document i habilitat principal. Famílies, universos o personatges només quan aportin una agrupació útil. Els recomptes s’actualitzen amb els altres filtres actius; separar llengua de la interfície i llengua del material.

Les col·leccions són biblioteques curades del docent: crear, afegir activitats, reordenar amb arrossegament, conservar el maquetat de cadascuna i recuperar-les en tornar. Prendre com a referència els gestos de Trama, inclòs el clic llarg per obrir accions, sense omplir permanentment les cards de checkboxes. Persistència en `localStorage` amb versions d’esquema; preveure exportació/importació de còpies de seguretat. Les dades locals no se sincronitzen entre dispositius ni han de desaparèixer per una actualització del catàleg.

### Realització autònoma de l’alumne

Entrada directa amb QR/enllaç o introduint un codi. Vista neta amb marca petita, títol, instruccions essencials i controls d’àudio amplis. Sense catàleg docent, footer, solucionari o controls de maquetació durant l’escolta. Tema clar/fosc; pantalla completa opcional quan el navegador ho permeti, sense prometre un bloqueig de pestanyes.

La sessió pot combinar locució inicial, temps per mirar el document i les preguntes, una o diverses escoltes, pausa intermèdia i locució de repàs. El docent configura temps, repeticions, ritme i avisos; l’enllaç conserva la configuració. El reproductor ha de gestionar pausa, represa, errors i sortida sense deixar pistes simultànies sonant.

## Identitat del material i dades

Cada activitat necessita un codi estable, llengua i versió. Títols i noms de fitxers humans no substitueixen aquesta identitat. Separar:

- Família o situació comuna.
- Variant lingüística i de dificultat.
- Document necessari i la seva versió.
- Guió, àudio publicat i configuració de sessió.
- Preguntes amb identificadors permanents, respostes i evidències.
- Estat editorial, aprovacions i fonts/llicències.

Una fitxa impresa no pot acabar obrint una versió incompatible del mapa o de l’àudio. El QR ha d’identificar inequívocament llengua, activitat, versió i configuració de sessió. Mostrar també una URL petita llegible i el codi com a alternativa. La configuració d’escolta no autoritza el client a modificar el contingut publicat.

Proposar un esquema de dades abans d’acumular material. Les variants poden compartir escenari i recursos, però cadascuna necessita preguntes, evidències i validació pròpies.

## Imprimibles i autocorrecció

Reaprofitar els criteris de maquetació de Trama: tipografia, mida, interlineat, espaiats, marges, línies de resposta i possibilitat d’amagar o recuperar preguntes. Distingir aquests ajustos de les modificacions que canvien el contingut de l’activitat.

Encapçalament compacte amb marca, tipus d’activitat, nom/data, codi d’aula opcional, QR i URL petita. Al costat del QR, resum de les condicions d’escolta quan sigui una sessió pautada. Previsualització A4, controls sobre les preguntes, zoom amb Ctrl+roda i botons. En tema fosc, paper crema suau al visor; la impressió continua amb el tractament adequat per al paper.

**El document imprescindible no és una il·lustració opcional.** No es pot ocultar o reduir fins a fer irresoluble l’activitat. Les il·lustracions de context sí que poden ser desactivables. Mapes i esquemes han de ser llegibles en blanc i negre, amb llegenda i símbols que no depenguin només del color. Preferir SVG o dibuix vectorial determinista per als documents que exigeixen precisió.

El solucionari inclou resposta orientativa, transcripció de la parla i evidències de cada font. Distingir preguntes d’àudio, de document i d’integració. Una resposta integrada ha de mostrar les dues pistes que cal relacionar. Prendre de Trama/Sentit els ressaltats de colors amb números de pregunta, activats per defecte però desactivables. Al document es poden marcar parades, caselles o regions; a la transcripció, fragments exactes. Referenciar elements estables del document, no només una coordenada de pantalla que es perdi en remaquetar.

L’autocorrecció pot fer-se en paper amb el solucionari: no exigeix respostes digitals ni puntuació automàtica. Integracions amb Classroom o retorn de notes serien una fase posterior.

## Convencions visuals d’ortogra.fi

- Estil sobri, amable i funcional: verd profund, crema, superfícies càlides, vores fines i accent terracota. Com a punt de partida, Sentit utilitza `#234d43`, `#f7f5ee`, `#fffefa` i `#a44631`; són tokens de referència, no una obligació de duplicar tot el CSS.
- Interfície amb sans llegible; títols/editorial amb serif. Trama usa Segoe UI/system i Georgia; Sentit incorpora Instrument Sans i Georgia. Evitar fer el text minúscul per encabir més controls.
- Header fix, discret: logo propi + nom + frase suggeridora; cerca quan tingui sentit; a la dreta selector de llengua amb icona de traducció i commutador clar/fosc amb icona.
- Footer fix: lema discret, centre «Un projecte d’[logo] ortogra.fi» i, a la dreta, llicència, versió clicable i V4V. El footer no desapareix fora de pantalla quan un sidebar no hi cap.
- Zona central amb scrolls interns deliberats. Al catàleg, filtres a l’esquerra i resultats; a l’activitat, seccions d’àudio, preview i impressió. Sidebars equilibrats, agrupats semànticament; en pantalles estretes, desplegables/col·lapsables o drawers, sense apilar-los de manera que expulsin el footer.
- Icones Lucide, botons amb nom accessible i focus de teclat. Desplegables personalitzats, amb funcionament de teclat, focus i estat seleccionat; no limitar-se a decorar un select inaccessible.
- Animacions i transicions homogènies de **220 ms**. Observar `motion.js` i els dialogs existents; mantenir també les preferències d’accessibilitat del projecte.
- Scrollbars discrets, sense fletxes, amb colors coherents i espai respecte del contingut. Evitar scrolls imbricats si no tenen una funció clara.
- Popups coherents, creu de tancar, Escape, clic exterior quan pertoqui, focus gestionat i retorn al control que els ha obert. Instruccions breus i ajuda contextual; no blocs llargs de text redundant.
- Quadre V4V ample, amb scroll propi: V4V dalt esquerra, autor dalt dreta, privadesa/estadístiques baix esquerra i codi obert/fonts/llibreries baix dreta. Consultar els actius i continguts aprovats existents, sense inventar dades personals o adreces de donació.
- Changelog en popup: versió actual al footer, canvis recents primer, dates, text compacte, scroll propi i enllaç al document complet del repositori. Començar en `0.1.x` mentre es valida el primer material complet.

## Àudio, producció i qualitat editorial

Sentit produeix pistes abans de publicar-les; el web reprodueix aquests recursos i orquestra locucions, pauses i repeticions al navegador. No s’hi fan peticions de TTS en temps real. Gemini TTS s’ha triat per la naturalitat dels diàlegs; Plec és un antecedent diferent, amb Azure per a mots aïllats.

El nou agent ha de conservar el procés après:

1. Dissenyar conjuntament document, guió, preguntes, respostes, evidències i escaleta sonora.
2. Revisió independent adversària de lògica, naturalitat i coherència entre fonts.
3. Validació docent abans de sintetitzar.
4. Síntesi i audició docent de les veus netes, **abans del muntatge**.
5. Esmenes de pronunciació/artefactes quan calgui; conservar originals i validar les represes.
6. Muntatge, audició final i tancament dels imprimibles abans de publicació definitiva.

No enviar instruccions de pausa com a paraules que el model pugui llegir. Agrupar textos compatibles pel mateix repartiment i seguir la política de quota vigent; durant el creixement de Sentit s’ha fixat una finestra de 6–8 minuts estimats. No repetir síntesis per solucionar errors locals de format. Les claus són exclusivament locals i fora de Git. Fonts, permisos d’ús, música, mostres i tractaments han de quedar acreditats.

La pauta independent és a `sentit/skills/revisio-coherencia-didactica/SKILL.md`, amb criteris a `sentit/docs/criteris-editorials.md`. Vigilar especialment moralines afegides, aclariments preventius d’obvietats, infants parlant com especialistes i aules que semblen comissions administratives. En el projecte multimodal afegir una passada específica: orientar-se al mapa, comprovar noms/temps/recorreguts, detectar contradiccions entre fonts i demostrar que les preguntes integrades necessiten totes dues.

## Estadístiques, incidències i privadesa

Els projectes fan servir Umami autoallotjat a Umbrel. L’endpoint públic actual verificat als dos codis és `https://maquestria.tail72bc84.ts.net:8443/script.js`; el web nou necessita **un ID propi**, encara pendent de crear. No reutilitzar l’ID de Sentit o Trama. El quadre de comandament no s’ha de publicar amb el web ni amb les rutes públiques de recollida.

Seguir els wrappers i llistes de valors admesos d’`analytics.js`: filtres, obertura d’activitats, configuració, col·leccions/famílies, impressió de fitxa/solucionari, escolta, V4V i enllaços útils. No enviar respostes d’alumnes, cerques lliures, noms de col·leccions, fitxers, claus o altres dades personals dins dels esdeveniments.

La bandera d’incidències pot aprofitar esdeveniments de categories tancades associades al codi/versió del material. Prendre el format elegant de Trama i Sentit; no obrir un formulari lliure sense control ni obligar a fer PR. Si GPC o la preferència de privadesa impedeixen enviar estadístiques, l’ajuda i el formulari es poden consultar i s’explica l’enviament deshabilitat. Mostrar l’avís i els controls pertinents a la zona inferior del V4V.

## Primer pilot proposat, pendent de validació

**Situació:** «Arribem a la biblioteca». Un plànol fictici de bus/barri i una conversa quotidiana que obliga a relacionar parades, destinació i un canvi concret. No adaptar automàticament el guió de S057.

Preparar primer una versió manejable de cicle mitjà; després una variant amb una relació o inferència addicional, mantenint el mateix nucli. La proposta de curs s’ha de contrastar amb el docent.

Lliurament esperat abans de sintetitzar: plànol original amb llegenda, fitxa A4, guió oral i escaleta, preguntes dels tres tipus, solucionari amb evidències creuades i una taula breu de diferències entre variants. Cap dada necessària pot quedar amagada en una il·lustració que el docent pugui treure.

Criteris per validar el pilot: es resol només amb el paper i l’àudio; les integrades necessiten les dues fonts; no hi ha ambigüitats de ruta o referents; el document continua llegible en blanc i negre; la sessió i el QR recuperen la versió correcta; l’autocorrecció permet entendre d’on surt cada resposta.

## Per on començar l’agent

1. Llegir aquest briefing i inspeccionar els dos repositoris en local. Resumir què es reutilitza i què necessita una estructura pròpia.
2. Proposar esquema de dades i primer pilot complet, encara sense TTS ni publicació d’un repositori nou.
3. Acordar nom, subdomini i abast del prototip amb el docent abans d’activar dominis o canviar enllaços.
4. Construir l’scaffold estàtic i el primer material, verificar-lo localment i seguir les portes de validació.
5. Documentar decisions, fonts, dades i comprovacions. Una vegada autoritzat el repositori, pujar els canvis comprovats a GitHub Pages; **la comprovació remota la fa l’usuari**, tal com indiquen les instruccions del seu espai de treball.

El primer lliurament és la proposta de la nova línia. Els guions, àudios, nom i domini queden pendents de les decisions i validacions corresponents; les activitats existents es conserven.
