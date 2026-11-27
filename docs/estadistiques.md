# Seguiment d’ús de Sentit

Actualitzat el **27/11/2026**, a partir de **v0.1.130**. Umami continua a la instància pròpia de Maquestria; no s’ha canviat de servei ni de web registrat. Aquesta guia defineix què mesurem i com interpretar-ho. No conté dades reals del tauler.

## Què consultar a Umami

Selecciona **Sentit**, tria el període i obre **Esdeveniments / Events**. Les propietats dels esdeveniments són a **Propietats / Properties**; la ubicació pot variar entre les versions d’Umami. Selecciona l’esdeveniment i filtra les propietats indicades abans de comparar valors.

| Pregunta | Esdeveniment i filtre | Propietat per comparar |
| --- | --- | --- |
| Quines lectures interessa consultar? | `obre_comprensio`, `estat=publicada` | `titol` o `lectura` |
| Quines fitxes es volen imprimir? | `obre_impressio`, `contingut=fitxa`, `estat=publicada` | `titol` o `lectura` |
| Quins solucionaris es consulten o imprimeixen? | `canvia_vista`, `vista=solucionari`; o `obre_impressio`, `contingut=solucionari` | `lectura` |
| Quines peces es guarden en col·leccions? | `afegeix_colleccio`, `estat=publicada` | `titol` o `lectura` |
| Quins enllaços d’escolta es preparen? | `copia_enllac`, `estat=publicada` | `lectura` |
| Quines peces arriben a la vista d’escolta? | `entra_escolta`, `estat=publicada` | `lectura` |
| Quines sessions d’escolta s’inicien? | `escolta_audio`, `accio=inicia` i, per separat, `accio=reinicia` | `lectura` |
| Quines sessions arriben al final? | `escolta_audio`, `accio=finalitza` | `lectura` |
| Quins universos tenen més ús? | `us_univers`, `estat=publicada`, amb una acció concreta de la taula següent | `nom_univers`; `univers` és l’ID estable |
| Quins cursos, nivells i tipologies es fan servir? | Un dels esdeveniments d’ús anteriors | `curs`, `dificultat`, `tipus` |
| Quins filtres s’utilitzen? | `aplica_filtre` | `filtre` i `valor` |
| On es detecten problemes? | `notifica_error` | `codi`, `part` i `motiu` |

Per començar, prioritzar **intenció d’imprimir la fitxa**, **inici/finalització d’escoltes** i **desament a col·leccions**. Una obertura sola és un senyal més lleuger. `obre_impressio` significa que s’ha obert el diàleg d’impressió: el navegador no confirma si després s’ha imprès o desat un PDF.

## Universos i lectures

Cada acció vinculada a una lectura porta el seu codi, idioma, títol, curs, dificultat, tipologia, universos i estat públic/provisional. `lectura`, com `ca-S008R`, és la clau per distingir idiomes i variants; `codi` es conserva per compatibilitat amb l’històric.

`us_univers` té una fila d’esdeveniment per cada univers de la lectura, amb aquestes accions:

| `accio` | Significat |
| --- | --- |
| `obre` | Obertura de la fitxa docent |
| `impressio_fitxa` | Obertura del diàleg per imprimir la fitxa |
| `impressio_solucionari` | Obertura del diàleg per imprimir el solucionari |
| `inicia_escolta` | Inici o reinici d’una sessió a la vista d’escolta |
| `completa_escolta` | Final de tota la sessió configurada, amb les repeticions |
| `afegeix_colleccio` | Addició d’una lectura que encara no era a la col·lecció |
| `copia_enllac` | Còpia de l’enllaç configurat |

Algunes peces pertanyen a dos universos: compten una vegada en cadascun. Per això els totals per univers **no s’han de sumar per obtenir lectures o persones**. Filtrar sempre una acció; sumar obertura, impressió i escolta barreja coses diferents. `universos` als altres esdeveniments conserva el conjunt d’IDs; per classificar cada univers per separat cal utilitzar `us_univers`.

**Simplificació de v0.1.133 (27/11/2026):** els esdeveniments nous agrupen `a-peu-de-cami` a `situacions-quotidianes` i `histories-sentit` a `aina-ferran`. S008R ja pertanyia a Ferran: ara emet un sol `us_univers` per acció. L’històric no es reescriu. Per comparar períodes, prioritzar els codis de lectura o el període posterior al canvi; sumar les dues etiquetes antigues de S008R duplicaria accions.

`entorn=docent` o `entorn=escolta` indica la interfície utilitzada. No identifica si la persona és docent o alumne. Les previsualitzacions del docent continuen a `escolta_audio` amb `accio=previsualitza`; no són inicis d’una sessió a la vista d’escolta. El pas del títol al relat no crea una segona previsualització. Les escoltes de veus crues per revisar no es barregen amb aquestes sessions.

## Comparar la difusió

Enllaços preparats per publicar quan es decideixi fer l’anunci:

- Nus: **https://sentit.ortogra.fi/?via=nus**
- Grup de vivecoding educatiu: **https://sentit.ortogra.fi/?via=vivecoding**
- Ortogra.fi: el referent conegut s’identifica automàticament; es pot utilitzar **https://sentit.ortogra.fi/?via=ortografi** quan calgui una etiqueta explícita.

La propietat `canal` només pot ser `nus`, `vivecoding`, `ortografi`, `altres` o `directe`. La tria es conserva durant la sessió de la pestanya perquè la navegació posterior mantingui el context d’arribada. No garanteix atribució entre pestanyes noves, dispositius ni dies; un QR o enllaç sense etiqueta pot comptar com a directe. Si algú copia un enllaç etiquetat a un altre lloc, l’etiqueta viatja amb l’enllaç. No afegim etiquetes de difusió als QR imprimibles.

Els paràmetres desconeguts, les cerques, els codis d’aula i els noms locals no s’envien. L’URL registrada es manté a `/`; només es conserva com a referent la portada pública coneguda d’ortogra.fi. Els altres referents s’agrupen sense enviar-ne l’adreça.

## Evitar conclusions precipitades

1. Compara el mateix període i filtra `estat=publicada`. Les validacions de provisionals no haurien de decidir el pla de contingut.
2. A **V4V → Privadesa i estadístiques**, activa «Exclou aquest navegador» als dispositius de treball si no vols comptar les teves visites. També deixa d’enviar avisos d’error des d’aquell navegador, tal com explica el quadre. La preferència és local: els altres navegadors no s’exclouen automàticament.
3. La mateixa persona pot obrir o imprimir diverses vegades. Els comptadors d’accions no són persones, alumnes ni grups classe. Arribar al final de l’àudio tampoc certifica comprensió o atenció.
4. Un univers amb moltes peces disponibles té més oportunitats d’ús. Revisa la distribució per lectura i la quantitat de material abans de prioritzar només pel total d’un univers.
5. Amb una desena de visites diàries, observar almenys una o dues setmanes després de la difusió abans de reorientar el catàleg.
6. Les propietats noves s’afegeixen des de v0.1.130. `mesura=2` distingeix el registre ampliat. L’històric per codi continua disponible; no s’ha modificat cap dada passada ni la base de dades.

## Privadesa i comprovació

Es mantenen l’allowlist d’esdeveniments i opcions, l’exclusió local i el respecte de DNT/GPC. Títols i universos provenen del catàleg públic; no s’accepten els que enviï un camp escrit per l’usuari. No s’envien noms de col·leccions, noms d’alumnes, respostes ni text de cerca. No es grava àudio ni es creen identificadors propis d’alumnat.

El navegador només carrega el tracker en HTTPS a `sentit.ortogra.fi`. La web registrada conserva l’identificador públic `6acf2cae-4b28-4d71-98dd-550d2d086dcc` i el receptor propi publicat amb Tailscale Funnel. Les proves locals no envien estadístiques.

### Altres accions que es mantenen

| Esdeveniment | Dades permeses |
| --- | --- |
| `cerca_cataleg` | Cerca per codi/text i rang del nombre de resultats; mai la cerca escrita |
| `colleccio` | Crear, seleccionar, reordenar, retirar, canviar nom o eliminar; quantitat agrupada, sense nom ni identificador privat |
| `maqueta_fitxa` | Bloc modificat, acció i opcions conegudes; mai el codi d’aula |
| `configura_audio` | Repeticions, ritme, temps de lectura/pausa, sintonia i sessió pautada |
| `obre_personatges`, `consulta_fonts`, `consulta_canvis` | Acció i codi públic quan correspon |
| `obre_v4v`, `obre_portafoli`, `copia_lightning` | Acció, sense el text copiat |
| `canvia_tema`, `canvia_idioma`, `canvia_provisionals` | Opció coneguda |
| `prova_connexio` | Senyal manual autoritzat amb origen fix `configuracio_sentit` |

Els rangs de quantitat són `0`, `1`, `2-5`, `6-15` i `16+`.

### Bandera d’errors

La bandera del preview permet indicar àudio, guió, imatge, pregunta o solucionari. La bandera de cada pregunta preselecciona l’element afectat. A la vista d’escolta, la bandera només ofereix incidències d’àudio i posa en pausa la sessió; no mostra el guió ni les respostes.

No hi ha nom, correu ni camp de comentari lliure. L’avís es transmet pel receptor d’Umami i només es dona per enviat quan retorna una confirmació vàlida. Els errors de connexió, bloqueig o resposta es mostren com a errors i es pot reintentar. Els duplicats confirmats de la mateixa sessió no es tornen a enviar. La implementació segueix la referència de Trama; no necessita un servidor de formularis ni autenticació addicional.

Des de **v0.1.131**, a **Guió o transcripció** també hi ha «Text massa fàcil per al nivell indicat» i «Text massa difícil per al nivell indicat», com a Trama. Aquests avisos de `notifica_error` tenen `part=text` i `motiu=too_easy` o `too_difficult`, amb `curs` i `dificultat` copiats del material públic. Es pot indicar tot el fragment o un dels blocs existents. No es demana el curs real de cap alumne ni informació sobre el grup; els avisos serveixen per a la revisió docent i no requalifiquen automàticament les peces. A la vista mínima d’escolta es mantenen només les incidències d’àudio.

Les comprovacions locals simulen tant el web públic com el receptor d’Umami i validen la cua de càrrega, els universos múltiples, la vista d’escolta, la impressió i les preferències de privadesa. No generen visites reals ni consulten el desplegament remot. La comprovació al tauler la fa el responsable del projecte.

Comandes: `node tools/check-analytics.mjs`, `node tools/check-analytics-usage.cjs` i `node tools/check-analytics-ui.cjs`. A l’històric consta un `prova_connexio` autoritzat el 19/11/2026 amb resposta HTTP 200 i confirmació del receptor real; no és una comprovació del desplegament actual.

Documentació primària d’Umami: [dades i propietats dels esdeveniments](https://docs.umami.is/docs/event-data), [filtres](https://docs.umami.is/docs/filters) i [configuració del tracker](https://docs.umami.is/docs/tracker-configuration).
