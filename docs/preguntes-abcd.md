# Resposta oberta i ABCD a Sentit

Pla d’adaptació del **25/11/2026**, després de revisar la implementació local de Trama. El pilot S001–S005, amb S004D, ja incorpora doble format al web: 37 alternatives ABCD i una pregunta oberta justificada, revisades independentment i validades pel docent el 25/11/2026. [Seguiment de cobertura](preguntes-abcd-seguiment.md).

**Migració completada (0.1.111):** les 119 peces tenen classificades i revisades les 895 preguntes: 891 alternatives ABCD i 4 obertes amb motiu. El pilot conserva l’aprovació docent; els blocs nous han superat revisió independent i es mostren amb l’avís de validació docent pendent. Aquest avís només afecta el format de preguntes, sense reobrir aprovacions d’àudio. Cada guió nou s’ha de preparar de bon començament amb els dos formats adequats.

## Punt de partida

| Curs | Peces actuals | Preguntes |
| --- | ---: | ---: |
| 3r | 23 | 138 |
| 4t | 23 | 156 |
| 5è | 39 | 305 |
| 6è | 32 | 279 |
| 1r d’ESO | 2 | 17 |
| **Total** | **119** | **895** |

Les vuit variants addicionals compten com a peces pròpies. Les 895 preguntes tenen identificador estable. Hi ha 881 preguntes amb evidències a la transcripció i 14 sense; això no classifica quines es poden convertir. No existeix un camp que separi explícitament opinió, producció i pregunta amb resposta determinada. A més, 53 enunciats contenen més d’un interrogant: és un senyal per revisar tasques compostes, no un diagnòstic automàtic.

Per exemple, S014 combina «Quina part surt primer?» amb «Indica una funció»; S023 combina sovint una dada amb la seva justificació. L’alternativa pot reunir resposta i raó en cada opció quan això manté l’objectiu. Si cal canviar l’objectiu, s’ha d’explicitar en la revisió; no n’hi ha prou amb retirar la segona petició.

## Què prenem de Trama

Referències del projecte germà: `../trama/docs/question-choices.md`, `../trama/question-responses.js`, `../trama/data/question-choices.js`, `../trama/worksheet.js`, `../trama/studio.js` i les comprovacions de preguntes i navegador de `../trama/tools/`.

- Alternativa afegida a la pregunta existent, amb codi exacte, idioma i identificador de pregunta. Cada variant té contingut propi.
- Preferència general «Resposta oberta / ABCD» i excepcions individuals al preview, amb el mateix llenguatge visual de llapis i ABCD.
- Full mixt: les preguntes d’opinió o producció, i les que encara no tenen alternativa revisada, continuen obertes.
- Quatre opcions estables, una resposta correcta, explicació i evidències pròpies quan calgui.
- El solucionari segueix exactament el format imprès i mostra lletra, resposta, explicació i accés a l’evidència.
- Les línies de resposta oberta es conserven en canviar de format. El desat de lectures i col·leccions conserva les preferències.
- Revisió independent de cada alternativa completa i registre de cobertura per pregunta, variant i idioma. Els esborranys no s’importen al catàleg públic.

Trama parteix de resposta oberta per defecte. El pilot de Sentit queda validat pel docent el 25/11/2026. **A partir de 0.1.109, la primera visita a una fitxa demana triar resposta textual o ABCD**, amb dos retalls de la mateixa pregunta imprimible. La preferència es conserva entre sessions i fitxes a `sentit.question-format.v1`. Té prioritat sobre el format general desat a cada lectura o col·lecció, mantenint-ne els ajustos individuals de preguntes, línies, omissions, imatge i tipografia. Abans de triar, els maquetats antics conserven el format obert i els nous parteixen d’ABCD quan hi ha alternatives revisades.

## Criteri editorial adaptat a l’escolta

L’objectiu és reduir l’escriptura simultània a l’escolta i orientar la lectura prèvia de preguntes i opcions. El repte ha de continuar sent entendre l’àudio: unes alternatives llarguíssimes o rebuscades traslladarien la dificultat a la lectura.

1. **Una sola resposta defensable segons l’enunciat i l’àudio.** El revisor ha d’intentar justificar cadascun dels tres distractors amb el que se sent. Si n’hi ha un altre de defensable, es refà la pregunta o es manté oberta.
2. Distractors basats en confusions plausibles: qui fa què, ordre, moment, causa, informació parcial, dades d’un altre passatge o una condició aplicada fora de lloc. Cap alternativa absurda només per arribar a quatre.
3. Opcions amb longitud, estructura, registre i precisió comparables. Sense pistes de concordança, còpia literal exclusiva de la correcta ni una resposta sistemàticament més completa. Evitar «totes les anteriors», «cap de les anteriors» i negacions innecessàries.
4. A 3r, frases breus i distincions concretes. A 4t–5è, alternatives plausibles que demanin relacionar dades o una causa. A 6è–ESO, matisos, condicions, abast i inferències amb suport clar, mantenint una càrrega de lectura raonable.
5. La dificultat es gradua dins del curs. Afegir ABCD redueix producció escrita; no requalifica automàticament l’activitat ni simplifica el seu contingut oral.
6. Conservar l’ordre de les preguntes i, quan sigui possible, la progressió de l’àudio, especialment en les dades explícites. Les preguntes globals o d’inferència poden exigir relacionar passatges. Revisar que una pregunta no reveli la resposta d’una altra.
7. Les opinions personals i la creació mantenen resposta oberta. Escollir un titular correcte avalua reconeixement; redactar-ne un avalua producció. Una adaptació d’aquest tipus ha d’explicitar el canvi d’objectiu, ambdues versions conservades, i passar revisió.
8. Els ítems compostos es revisen individualment. Opcions amb «resposta + raó» poden conservar la tasca; dividir en dos ítems o afegir seguiments oberts implica gestionar noves identitats, numeració i maquetats. No automatitzar aquesta divisió.
9. Ordre A–D estable, amb posicions correctes variades i sense patrons repetits evidents. Una reimpressió ha de correspondre al mateix solucionari; no barrejar opcions a cada càrrega.

## Model de dades i aprovacions

Afegir una capa separada, previsiblement `content/question-choices/`, amb registres per `idioma-codi` i ID de pregunta. Mantindrà enunciat alternatiu, quatre opcions amb ID estable, ID correcte, explicació i evidències; el registre editorial pot incorporar també el motiu de cada distractor.

Un resolutor com el de Trama retornarà la pregunta oberta o una còpia amb el format ABCD. No modificarà en memòria les preguntes originals del catàleg. La preferència general `questionMode` i les excepcions `questionModes` poden coexistir amb l’actual `settings.questions[id]`, que conserva inclusió i línies.

La revisió ABCD tindrà una empremta pròpia: codi, idioma, curs, nivell, transcripció de referència, pregunta/resposta obertes, evidències i alternativa completa. Un canvi de text, opcions, clau, explicació o evidències exigeix revalidació; un canvi de curs o nivell també obliga a comprovar el calibratge. Autoria i revisor independent seran diferents.

La capa nova preserva les aprovacions actuals de guió, veus i muntatge. Introduir les alternatives directament a `entry.questions` canviaria l’empremta editorial existent i podria fer aparèixer publicacions com a pendents: el resolutor només s’aplicarà en presentar les preguntes. El nou control editorial no és una aprovació retrospectiva dels dos prototips històrics ni autoritza TTS.

Les alternatives sense revisió vigent no es poden utilitzar com a ABCD públic; es torna a l’oberta i es mostra la cobertura real al docent. Els esborranys i el pilot de revisió han de tenir identificació pròpia, sense alterar l’estat d’audició de l’àudio existent.

## Interfície i imprimibles

**Sidebar dret, primer bloc independent:** un control de dos formats aplicable a totes les compatibles i un recompte clar, per exemple «6 ABCD · 1 oberta». Continua disponible encara que totes les preguntes siguin amagades o que la secció Preguntes estigui plegada. Canviar-lo actualitza també la preferència del navegador; l’aplicació explícita a tota la fitxa elimina només les excepcions individuals de format de la fitxa actual, mantenint línies i preguntes ocultes. La tria inicial al popup conserva aquestes excepcions. Una pregunta sense alternativa manté resposta textual. «Tria de nou» esborra només la preferència global i obre de nou els exemples; no elimina col·leccions ni maquetats. Tancar el popup sense triar no desa cap preferència ni el torna a mostrar a cada fitxa de la mateixa sessió. La vista d’escolta de l’alumnat no mostra aquest popup.

**Preview:** llapis/ABCD a les eines de cada pregunta, com a Trama; ocultar els controls de línies quan sigui ABCD i recuperar-los en tornar a oberta. Es conserva l’acció d’eliminar i recuperar preguntes. Controls amb focus de teclat coherent i animacions de 220 ms.

**Fitxa:** quatre opcions amb casella, inicialment en una columna, amb espai per marcar-les. No mostrar la correcta ni pistes de correcció. Mantenir enunciat i opcions junts si caben en una pàgina; si cal partir un ítem molt llarg, fer-ho entre opcions, amb continuació identificada, sense tallar una opció o deixar la pregunta despenjada.

**Solucionari:** mateix enunciat i opcions, correcta indicada també en blanc i negre, lletra + resposta + explicació. Reutilitzar els ressaltats i «Veure la transcripció» sobre les evidències efectives de la versió ABCD, conservant colors i numeració quan hi ha preguntes ocultes.

**Instruccions:** adaptar el text imprès a full obert, ABCD o mixt («llegeix les preguntes i les opcions», «marca una resposta», «respon les preguntes obertes»). Les locucions de preparació actuals que conviden a llegir les preguntes continuen sent utilitzables: aquest canvi no requereix generar àudios nous.

**Desat i col·leccions:** integrar la preferència i les excepcions en les instantànies actuals de cada lectura i col·lecció. Respectar les omissions, línies i maquetats antics. No donar per existents a Sentit els codis extensos de maquetat, les còpies de seguretat o la impressió en lot de Trama: quan s’implementin, reutilitzaran aquest mateix estat i resolutor.

**QR i vista d’escolta:** el format de resposta és una decisió del full; no necessita incloure opcions ni solucions a l’URL de l’àudio. Es mantenen el codi de lectura, les condicions de sessió i la pantalla mínima d’escolta.

**Notificació i estadístiques:** la bandera ha d’identificar si l’error afecta la pregunta oberta o l’ABCD. Ampliar les validacions d’Umami amb valors tancats com `oberta/abcd`, sense enviar opcions, respostes d’alumnes o text lliure. El tracking respecta les exclusions i la notificació manté el comportament de privadesa actual.

## Desplegament proposat

| Pas | Resultat verificable |
| --- | --- |
| 1. Inventari | Les 119 peces i les 895 preguntes identificades. Cada pregunta es classifica com a candidata ABCD, oberta amb motiu o pendent de decisió; sense inferir-ho només per evidències o paraules clau. |
| 2. Base tècnica i pilot | Preferència general, excepcions, persistència, fitxa, solucionari, evidències i bandera; cinc peces representatives amb alternatives revisades independentment. |
| 3. Validació del pilot | El docent comprova llegibilitat, càrrega de lectura, plausibilitat i unicitat de les respostes, i confirma el valor per defecte. |
| 4. Migració per lots | Completar totes les peces actuals en rangs de codis, amb les variants existents incloses i revisades individualment. Publicar cada lot revisat i mantenir cobertura explícita. |
| 5. Tancament | Cada pregunta té alternativa revisada o una decisió justificada de mantenir-la oberta; cap expedient sense classificar. QA de fitxes i solucionaris, després reprendre l’ampliació del catàleg. |

### Pilot seqüencial: S001–S005 i S004D, 38 preguntes originals

| Codi | Curs · dificultat | Què comprova |
| --- | --- | --- |
| S001 · El senyal de la ràdio | 5è · accessible | Set alternatives, tasques compostes i una pregunta d’aplicació oberta. |
| S002 · Preparem una capsa de records | 3r · accessible | Sis alternatives: ordre d’instruccions, dades i finalitat. |
| S003 · El paraigua intercanviat | 3r · accessible | Sis alternatives: dades explícites i seqüència de diàleg. |
| S004 · El botó de la jaqueta | 3r · intermèdia | Sis alternatives: pistes i inferència amb causa. |
| S004D · El botó de la jaqueta · versió dialogada | 3r · intermèdia | Sis alternatives amb revisió i evidències pròpies de la variant. |
| S005 · La feina d’una cartera | 3r · intermèdia | Sis alternatives: processos, imprevistos i resum amb exemple. |

El docent ha triat explícitament l’ordre S001–S005 per facilitar el seguiment. S004D completa el rang amb revisió pròpia. S001/repetir-lloc conserva la generació oberta d’un exemple; les altres 37 tenen alternativa revisada. Aquesta classificació no canvia cap aprovació d’àudio. La cobertura dels cursos superiors s’ampliarà després amb els rangs successius.

Després del pilot, recórrer els codis base en ordre i incloure les variants del rang. El registre farà visibles els codis ja coberts pel pilot per evitar duplicacions. Un ritme inicial de cinc a deu peces per lot permet revisar i publicar resultats sense esperar el catàleg sencer; la mida s’ajustarà a la complexitat de les preguntes.

## Comprovacions necessàries

- Quatre opcions diferents, IDs vàlids, una única clau, explicació i evidències existents; cap registre sense codi/pregunta real o duplicat. Aquestes proves estructurals no demostren unicitat semàntica: la revisió independent l’ha de comprovar.
- Empremtes exactes de les alternatives revisades, tant per idioma com per variant. Opinió i producció obertes amb motiu documentat; cap pèrdua de cobertura amagada sota una xifra de lectures.
- Canvi general i individual, full mixt, línies recuperades, preguntes amagades/restaurades, recàrrega i col·leccions. Migració de maquetats antics sense canvis visibles inesperats.
- Solucionari amb les mateixes lletres i opcions del full; ressaltats correctes després d’exclusions i reformulacions. Cap resposta revelada al full de l’alumne.
- PDF i preview amb opcions llargues, diferents tipografies i mides, il·lustració, temes clar/fosc i paginació. Controls interactius absents en imprimir.
- Guions i àudios originals intactes, aprovacions existents conservades i QR/sessió sense regressions. Cap petició de síntesi.
- Bandera i Umami amb format identificat, valors admesos i exclusions de privadesa. Comprovar localment i publicar al repositori; el docent revisa el desplegament.

La cobertura tindrà un seguiment propi de preguntes, separat del [seguiment de producció d’àudio](seguiment-produccio.md). Rebre una veu, validar un muntatge i revisar les opcions ABCD són processos diferents.


### Retalls impresos del selector · 0.1.110

Els exemples són captures de la primera pregunta de S001, generades amb `renderWorksheet`, tipografia i escala A4 reals. Es captura el full sencer i es retalla la pregunta amb les dues línies o les quatre opcions sense marcar; el popup en mostra només l’inici i aplica un degradat cap a transparent a la dreta, sense reduir ni remaquetar el text. El canvi visual conserva el desat de la preferència. Les imatges tenen descripció alternativa en català i castellà.

Regeneració local: `node tools/capture-question-format-samples.cjs`. Fitxers i procedència a `assets/images/question-format-{open,choice}-print-v1.webp` i `question-format-print-samples.json`. Les captures es conserven en escala doble per a pantalles d’alta densitat, amb la composició i tipografia del full.


### Doble format des del primer guió

Preparar conjuntament les versions oberta i ABCD de cada ítem convertible, amb quatre opcions, clau, explicació i cites. Conservar l’objectiu i les parts de les preguntes compostes. Opinió, creació i justificació personal continuen obertes amb motiu específic. Un agent diferent de l’autor revisa totes les opcions, intenta defensar els distractors i comprova una única clau, càrrega de lectura i calibratge. Una modificació invalida la revisió exacta d’aquell ítem.

Registrar els lots a `content/question-choices/index.js` i la revisió amb `node tools/record-question-choice-review.mjs --file=informe-independent.json`. `node tools/check-choice-catalogue.mjs --complete` exigeix cobertura total; `node tools/check-editorial-review.mjs` impedeix presentar provisionals nous sense doble format revisat o motius d’obertura. Les aprovacions del docent de preguntes i àudio són independents.
