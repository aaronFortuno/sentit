# Àudio de servei i arxiu de producció

Decisió docent del **26/11/2026**: mantenir l’allotjament a GitHub Pages i optimitzar el repositori. Publicar els muntatges vigents, efectes, músiques, sintonies i locucions reutilitzables. Les preses i proves antigues es conserven en local.

**Segona fase:** [reproducció modular](audio-modular.md). Es conserven al web títol i relat; els 130 màsters complets equivalents passen també a l’arxiu local. Estalvi addicional de 170 MB i arbre publicable d’uns 298 MB. Les xifres següents documenten la primera neteja i no inclouen aquesta segona reducció.

**Dues fases completades el 26/11/2026.** Les pujades protegides a `main` han estat acceptades i aquesta còpia local ja està sincronitzada. Resultat actual: **288,96 MB d’historial net** i **298,27 MB d’arbre publicable**. Títol/relat i recursos reutilitzables al web, màsters complets en local. Els apartats següents detallen la primera neteja; el [registre modular](audio-modular.md) documenta la segona purga i la seva còpia de recuperació.

## Neteja actual, sense reescriure l’historial

Base: `b9241df` · 150 activitats, 138 amb àudio. Inventari semàntic dels àudios que utilitzen el catàleg, el reproductor, les guies, les comparacions pendents i el registre de fonts.

| Resultat | Fitxers | Espai |
| --- | ---: | ---: |
| Àudio publicat abans | 762 | 671,62 MB |
| Àudio vigent i reutilitzable conservat | 459 | 392,69 MB |
| MP3 antics que deixen de publicar-se | **303** | **278,93 MB** |

L’arbre publicable baixa d’uns **747 a 468 MB**, aproximadament un **37%**. No és encara el 70–80%: es conserven els 130 muntatges, les seves 260 pistes de títol/cos i els recursos compartits. No es perd qualitat ni es recomprimeixen enregistraments.

També es conserven temporalment les veus i esmenes que encara es poden escoltar als controls de revisió, i els muntatges pendents d’audició. Això permet continuar les validacions al web. Quan es tanquen, les còpies de revisió passen a locals amb la mateixa eina.

Els WAV crus de Gemini **ja eren fora de Git**, a `../output/sentit-primera-tanda/`. No són la causa d’aquests 279 MB: són MP3 de revisió, comparacions i versions substituïdes. Les pàgines històriques de proves indiquen que les preses arxivades ja no es reprodueixen públicament i enllacen al material vigent.

## Còpies i recuperació

Abans de la neteja s’ha creat i verificat un **Git bundle amb tot l’historial**, amb les tres referències locals del commit base:

`../output/sentit-cleanup-20261126/before-cleanup.bundle`

Abans d’aplicar la purga autoritzada s’ha creat i verificat una còpia completa més recent, que inclou els commits de neteja i l’informe de l’assaig:

`../output/sentit-cleanup-20261126/authorized-before-purge.bundle`

Aquesta última és la còpia de recuperació preferent. Es conserva fora del repositori i no es publica a Pages.

Els 303 MP3 tenen una còpia addicional, comprovada individualment amb SHA-256, i un manifest a:

`../output/sentit-production-archive/2026-11-26/manifest.json`

Es mantenen també a les seves ubicacions de treball originals, ara ignorades per Git, perquè els generadors i remuntatges locals continuïn funcionant. `git rm --cached` els treu del proper commit sense esborrar-los del disc. Un clon nou contindrà només els fitxers de servei; per produir o refer àudios caldrà també recuperar l’arxiu local de producció.

## Evitar que torni a créixer el web amb proves velles

1. `node tools/public-audio.mjs`: veure què s’ha de conservar i què es pot arxivar.
2. `node tools/public-audio.mjs --apply`: copiar i verificar les preses antigues fora del repo, actualitzar `assets/audio/.gitignore` i el manifest `content/public-audio.json`, retirar només el seguiment de Git i substituir reproductors històrics que apuntarien a arxius locals.
3. Afegir els fitxers vigents a Git i comprovar `node tools/public-audio.mjs --check`.
4. Fer les proves en una còpia neta dels fitxers seguits: una prova només a l’arbre local podria trobar accidentalment un MP3 que ja no es publica.

La selecció conserva fitxers concrets, no l’arbre complet de metadades històriques. Només publica les comparacions d’esmena encara actives; un `previousAudio`, una esmena rebutjada o una anotació de procedència no obliga a continuar publicant aquell àudio.

## Historial de Git: segon pas separat

Eliminar un fitxer del commit actual allibera el lloc publicat, però **Git encara en conserva les versions antigues**. Per reduir també la descàrrega del repositori cal reescriure l’historial, per exemple amb [git-filter-repo](https://github.com/newren/git-filter-repo), conservant el codi i només les rutes d’àudio que continuen en servei.

Procediment preparable en una còpia local independent:

1. Partir d’un clon local complet amb còpia de seguretat verificada.
2. Retirar de tots els commits les rutes d’àudio que no formen part de la llista de servei actual. No esborrar el codi, les aprovacions, els manifests ni els crèdits.
3. Comprovar la integritat de Git, la igualtat del contingut actual, els controls de reproducció i les mides abans/després.
4. Amb aprovació explícita, substituir únicament `main` remot protegint-se contra canvis nous amb `--force-with-lease` i el SHA remot esperat. No fer un `--mirror` indiscriminat.
5. Sincronitzar la còpia de treball i qualsevol altre agent o clon perquè no tornin a introduir l’historial antic.

Els identificadors dels commits afectats canvien. Les còpies externes, forquilles i referències internes de GitHub poden continuar conservant objectes antics; la recollida d’objectes del servidor no és immediata ni controlable des d’aquí. **No prometem un esborrament immediat de totes les còpies a GitHub.** [Explicació oficial dels efectes de reescriure l’historial](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository).

No hi ha una urgència per un tall rígid del repositori a 1 GB: és una mida recomanada per a Pages. El límit de **1 GB del lloc publicat** sí que és diferent. [Límits de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) · [Mides recomanades de repositori](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github).

### Assaig local completat

S’ha executat git-filter-repo 2.47.0 **només en una còpia local independent**, després de guardar el bundle. Resultat sobre el commit de neteja `7354608`:

| Mesura de l’historial | Abans | Després, a la còpia de prova |
| --- | ---: | ---: |
| Fitxers interns de Git | **727,73 MB** | **455,95 MB** |
| Commits de `main` | 148 | 148 |
| Rutes d’àudio antigues presents a l’historial | 303 | 0 |

L’arbre actual conserva exactament el mateix identificador de contingut `c41f9f6691db5afe3b898a47935b6213b4369289`: **tots els fitxers actuals són idèntics**, inclosos màsters, aprovacions, fonts i codi. La comprovació `git fsck --full --no-reflogs` ha passat. Els 459 àudios de servei també s’han comparat byte a byte en una exportació neta i s’han provat controls de muntatge, esmenes pendents i música al navegador local, sense els 303 MP3 arxivats.

L’assaig, llistes i mesures són a `../output/sentit-cleanup-20261126/`; la còpia inicial és `filtered.git`. Durant aquell assaig no es va publicar cap reescriptura. Per aplicar l’autorització posterior s’ha preparat una còpia nova amb tots els commits més recents, descrita a continuació.

### Aplicació autoritzada completada

El docent ha autoritzat explícitament la purga de l’historial remot. S’ha repetit la preparació sobre l’estat vigent `0e3688415ac7d1a1a0aa8b1a9cbae7a2ffc3dcee`, amb còpia completa de seguretat, abans de publicar el nou historial `bb15754ef148663273dc5abc7a645c84bb5f1180`.

- **149 commits abans i després de la purga.** Es conserva la història del codi; canvien els identificadors dels commits afectats.
- **303 rutes de proves d’àudio retirades de tot l’historial de servei.** Les còpies locals i els bundles anteriors es conserven.
- **Contingut actual idèntic byte a byte:** arbre `51632c75783738ad483f5369a2964167d8a48ea1`. Els 459 àudios vigents es mantenen.
- `git fsck --full --no-reflogs` correcte a la còpia filtrada i, després, al repositori de treball; comprovació de publicació d’àudio i revisions editorials correcta.
- `main` remot substituït amb `--force-with-lease` sobre el SHA exacte esperat; GitHub n’ha confirmat l’acceptació. No s’han sobreescrit altres branques o etiquetes.
- Aquesta còpia local s’ha sincronitzat mitjançant canvi atòmic de referència, amb el mateix arbre, sense restablir ni esborrar fitxers de treball. S’han retirat les referències i els objectes antics locals de Git després de verificar la còpia de seguretat.
- Historial local: **727,74 → 456,06 MB**, uns **272 MB alliberats**. La mida que mostra GitHub pot trigar a reflectir la seva recollida d’objectes; aquesta operació no comprova el desplegament de Pages.

Resultats complets i empremtes a `authorized-history-result.json`, `purge-applied.json` i `size-after-authorized-purge.json`, dins `../output/sentit-cleanup-20261126/`. Els commits nous de documentació posteriors continuen normalment sobre aquest historial net.

**Altres clons o agents:** la carpeta de treball d’aquesta conversa ja està actualitzada. Si apareix un altre clon amb l’historial anterior, guardar primer qualsevol feina pròpia i tornar-lo a clonar o traslladar els canvis concrets a la història nova. No fusionar l’historial antic amb el nou, perquè tornaria a introduir l’àudio purgat. Els bundles de recuperació són arxiu, no una branca de publicació.

**Crus i remuntatges:** continuen a l’arxiu local de producció. No cal crear ara un altre repositori amb els WAV i les proves: el bundle i l’arxiu amb empremtes cobreixen la recuperació. Es pot conservar una còpia d’aquest arxiu en un altre disc si es vol redundància. La política de servei manté separats aquest material i els fitxers que necessita la web.

## Objectiu de 600 exercicis

La neteja de proves redueix l’excés actual, però no resol per si sola la duplicació de màster i pistes separades: aquestes dues representacions sumarien uns **1,57 GB** per a 600 exercicis amb la mitjana actual. La següent optimització és servir **una sola representació sonora** i adaptar-ne el reproductor, conservant totes les funcions i els marges de consonants. Un màster per exercici serien uns **785 MB**, més imatges i recursos comuns; caldrà deixar marge i mesurar de nou.

L’adaptació posterior conserva les pistes separades i retira de la publicació el màster complet equivalent; [detalls i proves](audio-modular.md). La sessió pautada conserva el seu funcionament i l’escolta seguida encadena el títol i el relat.
