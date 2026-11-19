# Estadístiques i avisos d’error

Sentit utilitza la mateixa instància pròpia d’Umami que els altres projectes d’ortogra.fi, accessible pel Funnel de Tailscale. L’identificador públic de Sentit és `6acf2cae-4b28-4d71-98dd-550d2d086dcc`. El navegador només carrega el script en HTTPS a `sentit.ortogra.fi`; les proves locals no envien estadístiques.

## Dades que es recullen

| Esdeveniment | Finalitat | Dades permeses |
| --- | --- | --- |
| Visita | Comptar l’ús del web | Adreça `/` i títol genèric `Sentit` |
| `obre_comprensio` | Materials més consultats | Codi públic, idioma, curs, dificultat, tipologia; si ve d’una col·lecció i té maquetació desada |
| `aplica_filtre`, `neteja_filtres` | Filtres més útils | Filtre i opció coneguda: idioma, curs, dificultat, durada, tipus o personatges |
| `cerca_cataleg` | Ús de la cerca | Si sembla una cerca per codi o per text i rang del nombre de resultats; **mai la cerca escrita** |
| `colleccio` | Ús de la biblioteca docent | Crear, afegir, seleccionar, reordenar, retirar, canviar nom o eliminar; nombre agrupat |
| `maqueta_fitxa` | Ajustos més utilitzats | Bloc modificat, acció i família tipogràfica coneguda; **mai el codi d’aula** |
| `canvia_vista` | Consulta del solucionari | Codi públic i vista triada |
| `obre_impressio` | Intenció d’imprimir | Fitxa o solucionari, codi públic i ús de col·lecció |
| `configura_audio` | Configuració docent | Repeticions, ritme, temps de lectura i pausa, sintonia i sessió pautada |
| `obre_vista_escolta`, `copia_enllac` | Accés als àudios | Codi públic; **mai l’enllaç complet** |
| `escolta_audio` | Ús de l’escolta | Iniciar, pausar, reprendre, acabar, reiniciar o previsualitzar; codi públic |
| `obre_personatges`, `consulta_fonts`, `consulta_canvis` | Consultes complementàries | Acció i, quan cal, codi públic |
| `obre_v4v`, `obre_portafoli`, `copia_lightning` | Ús del quadre de suport | Nom de l’acció; cap text copiat |
| `canvia_tema`, `canvia_idioma` | Preferències de la interfície | Opció coneguda |
| `notifica_error` | Detectar incidències del material | Codi, llengua, part, element públic opcional i motiu predefinit |
| `prova_connexio` | Comprovació manual autoritzada | Origen fix `configuracio_sentit` |

`obre_impressio` compta l’obertura del diàleg. El navegador no permet confirmar si finalment s’ha imprès o s’ha cancel·lat. Els rangs de quantitat són `0`, `1`, `2-5`, `6-15` i `16+`. El seguiment cobreix els controls existents; els noms i identificadors privats de les col·leccions no s’envien.

## Privadesa

- `analytics.js` comprova una llista tancada d’esdeveniments i valors, també abans de qualsevol enviament del tracker. Els noms de persones, respostes, codis d’aula, noms de col·leccions i textos introduïts no formen part del registre.
- Les pàgines s’envien amb URL `/`, sense paràmetres, fragment ni referent. El títol és sempre `Sentit`.
- Es respecten Do Not Track i Global Privacy Control. A baix de V4V hi ha la informació i l’opció d’excloure el navegador; es desa com a preferència local i funciona també durant la sessió si l’emmagatzematge està bloquejat.
- L’exclusió bloqueja estadístiques i avisos d’error. El web i els materials continuen funcionant. El formulari explica el motiu si no pot enviar, i només ofereix reactivar les estadístiques quan l’exclusió ha estat una tria local, sense anul·lar DNT o GPC.

## Bandera d’errors

La bandera del preview permet indicar àudio, guió, imatge, pregunta o solucionari. La bandera de cada pregunta preselecciona l’element afectat. A la vista d’escolta, la bandera només ofereix incidències d’àudio i posa en pausa la sessió; no mostra el guió ni les respostes.

No hi ha nom, correu ni camp de comentari lliure. L’avís es transmet pel receptor d’Umami i només es dona per enviat quan retorna una confirmació vàlida. Els errors de connexió, bloqueig o resposta es mostren com a errors; es pot reintentar. Els duplicats confirmats de la mateixa sessió no es tornen a enviar.

La implementació pren Trama com a referència, adaptant els tipus d’error a la comprensió oral. No necessita un servidor de formularis ni autenticació addicional.

## Comprovacions

`node tools/check-analytics.mjs` valida l’esquema i el filtratge de dades. `node tools/check-analytics-ui.cjs` prova el tracker, l’exclusió, DNT/GPC, els avisos amb confirmació i sense, les banderes i la pausa de l’àudio amb un receptor simulat. Aquestes proves no afegeixen visites al receptor real.

El 19 de novembre de 2026 es va enviar, per instrucció de l’usuari, `prova_connexio` amb origen `configuracio_sentit`. El receptor real va retornar HTTP 200 i confirmació. No es fa cap comprovació remota del desplegament de GitHub Pages.
