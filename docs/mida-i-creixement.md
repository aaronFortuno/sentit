# Espai actual i creixement fins a 600 exercicis

Mesura local del **26/11/2026**, sobre el commit base `33ebb80` (v0.1.121), abans d’afegir les nou mostres musicals. Sense consultar el desplegament remot. MB i GB són decimals; MiB i GiB són potències de dos.

## Què ocupa cada cosa

| Abast | Mida | Què compta |
| --- | ---: | --- |
| Fitxers del commit actual, sense `.git` | **742,38 MB · 708,0 MiB** | 1.794 fitxers: codi, contingut, àudios, imatges i proves històriques |
| MP3 de tot l’arbre publicat | **667,00 MB · 636,1 MiB** | 753 MP3, inclosos màsters antics, revisions, comparacions, pistes separades i locucions comunes |
| Un àudio principal vigent per activitat amb veu | **179,43 MB · 171,1 MiB** | 138 pistes: 130 muntatges i 8 audicions de veus encara sense muntar |
| Només els 130 màsters muntats vigents | **170,03 MB · 162,2 MiB** | Mitjana **1,31 MB** per exercici |
| Pistes vigents de títol i cos separats | **169,98 MB · 162,1 MiB** | 260 MP3 per a la sessió pautada dels mateixos 130 exercicis |
| Historial i estructura `.git` | **722,58 MB · 689,1 MiB** | Versions de tots els fitxers conservades per Git; no és mida de la pàgina publicada |
| Carpeta local sencera | **aprox. 1,50 GB · 1,40 GiB** | Arbre de treball + Git + uns 40 MB de fitxers locals no seguits; varia mentre treballem |

Tenim **150 activitats**, **138 amb àudio**; les dotze restants encara són guions. Les variants dialogades es compten per separat. Els originals WAV i respostes del proveïdor de `../output/sentit-primera-tanda/` viuen **fora** del repositori i no estan inclosos en aquesta taula.

Els 179,43 MB no són tot el so que necessita ara l’aplicació: també utilitza les pistes separades, guies comunes i sintonies. Restant pistes principals vigents i títol/cos vigents als 667 MB de MP3, queden **317,58 MB** de preses, comparacions, versions anteriors, efectes i recursos compartits. Aquesta resta no és una llista de fitxers prescindibles: cal comprovar-ne les referències abans de moure res.

La comparativa nova hi afegeix **4,62 MB** de fragments musicals, més uns pocs KB de codi i manifests. No hi afegim les nou pistes originals completes.

## Projecció: 300 en català i 300 en castellà

Estimació basada en els **130 muntatges vigents**, amb una durada declarada mitjana del fragment de **106 segons**, la distribució de durades i la codificació actuals. No és una previsió de durada dels guions futurs ni de consum de Gemini.

| Model de publicació per a 600 exercicis | Només àudio de les activitats |
| --- | ---: |
| Un únic màster per exercici | **aprox. 785 MB · 748 MiB** |
| Màster + títol/cos separats, com ara | **aprox. 1,57 GB · 1,46 GiB** |

A això s’hi sumen il·lustracions, recursos comuns i codi. Conservar també totes les revisions al web faria créixer més el total. Les peces de cicle inicial poden abaixar la mitjana; els àudios més llargs i els canvis de bitrate l’augmenten. La versió en castellà es compta com un altre exercici sonor, no com una traducció gratuïta en espai.

## Implicació per a Pages

La [documentació oficial de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) fixa **1 GB màxim per al lloc publicat** i recomana no superar **1 GB al repositori font**. Són magnituds diferents: l’historial `.git` no es publica al lloc. També indica 100 GB/mes d’amplada de banda com a límit tou. Consultat el 26/11/2026.

**600 exercicis són un objectiu raonable, però no caben a Pages amb totes les còpies actuals.** Proposta d’evolució, encara sense executar:

1. Separar els fitxers de servei vigents de les revisions i els originals de producció. Conservar els arxius històrics, sense servir-los tots al web públic.
2. Revisar si podem servir una sola representació de cada exercici: per exemple, títol i cos com a pistes de servei i muntatge complet compost pel reproductor. Requereix verificar reproducció i navegació; no eliminar màsters ara.
3. Si prioritzem conservar les dues representacions, allotjar l’àudio en un magatzem de fitxers extern amb HTTPS i suport de reproducció parcial, mantenint la web estàtica a Pages. Cal triar-lo i valorar-ne límits i cost quan toqui.
4. Mesurar de nou abans d’apropar-nos al límit. Reduir històricament `.git` seria una altra operació, separada i no necessària ara.

No s’ha esborrat ni recomprimit cap àudio existent, no s’ha reescrit l’historial i no s’ha canviat l’allotjament.

## Repetir l’inventari

`node tools/measure-storage.mjs --output=../output/sentit-storage-AAAA-MM-DD.json`

És una lectura local: compta l’arbre del commit, els fitxers seguits, `.git`, l’àudio principal referenciat al catàleg/registre de veus i les pistes separades. El resultat JSON es desa fora del repositori. La mida de Git i de la carpeta local canvia amb cada commit i amb els fitxers de treball.
