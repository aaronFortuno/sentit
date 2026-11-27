# Universos editorials de Sentit

Les comprensions comparteixen personatges, entorns o una veu periodística identificada. Cada peça continua sent autònoma: no hi ha ordre obligatori ni informació imprescindible en altres episodis. Una activitat pot pertànyer a més d’un fil.

## Universos del catàleg

| Univers | Connexió | Comprensions |
| --- | --- | --- |
| Faules del món | Faules tradicionals adaptades amb animals, decisions i conseqüències. | [Pilots](pilots-tradicio.md) · [Ampliació](ampliacio-tradicio-2026-11-26.md) |
| Llegendes d’aquí i d’arreu | Relats tradicionals vinculats a llocs i costums, amb fonts identificades. | [Pilots](pilots-tradicio.md) · [Ampliació](ampliacio-tradicio-2026-11-26.md) |
| Mites de l’antiguitat | Episodis grecs i romans, amb context i fonts de referència. | [Pilots](pilots-tradicio.md) · [Ampliació](ampliacio-tradicio-2026-11-26.md) |
| Mans a l’obra | Petits projectes i reparacions amb proves i ajustos mentre treballen. | [S104–S107: primera tanda](lot-mans-i-cami.md) |
| Situacions quotidianes | Trobades, gestions i passejades en serveis, carrer, botigues o casa. | [Primera tanda](lot-situacions-quotidianes.md) · [Serveis i gestions](lot-situacions-quotidianes-avancades.md) · [Passejades S108–S111](lot-mans-i-cami.md) |
| Les troballes de la Laia i en Biel | Descobertes, entrevistes i projectes dels dos joves, junts o per separat. | [S001](https://sentit.ortogra.fi/#lectura=ca-S001), [S003](https://sentit.ortogra.fi/#lectura=ca-S003), [S005](https://sentit.ortogra.fi/#lectura=ca-S005), [S007](https://sentit.ortogra.fi/#lectura=ca-S007), [S010](https://sentit.ortogra.fi/#lectura=ca-S010), [S011](https://sentit.ortogra.fi/#lectura=ca-S011), [S012](https://sentit.ortogra.fi/#lectura=ca-S012), [S014](https://sentit.ortogra.fi/#lectura=ca-S014), [S015](https://sentit.ortogra.fi/#lectura=ca-S015), [S017](https://sentit.ortogra.fi/#lectura=ca-S017), [S019](https://sentit.ortogra.fi/#lectura=ca-S019), [S021](https://sentit.ortogra.fi/#lectura=ca-S021), [S024](https://sentit.ortogra.fi/#lectura=ca-S024) |
| Els records de l’avi Ferran | Petits misteris, fotografies i records familiars de l’Aina i el seu avi. | [S004](https://sentit.ortogra.fi/#lectura=ca-S004), [S004D](https://sentit.ortogra.fi/#lectura=ca-S004D), [S008](https://sentit.ortogra.fi/#lectura=ca-S008), [S008R](https://sentit.ortogra.fi/#lectura=ca-S008R), [S018](https://sentit.ortogra.fi/#lectura=ca-S018), [S022](https://sentit.ortogra.fi/#lectura=ca-S022) |
| A classe amb la Mireia | Explicacions, experiments i projectes guiats per la Mireia. | [S002](https://sentit.ortogra.fi/#lectura=ca-S002), [S007](https://sentit.ortogra.fi/#lectura=ca-S007), [S011](https://sentit.ortogra.fi/#lectura=ca-S011), [S013](https://sentit.ortogra.fi/#lectura=ca-S013), [S014](https://sentit.ortogra.fi/#lectura=ca-S014), [S017](https://sentit.ortogra.fi/#lectura=ca-S017), [S020](https://sentit.ortogra.fi/#lectura=ca-S020), [S021](https://sentit.ortogra.fi/#lectura=ca-S021) |
| Les notícies de la Mar | Notícies de ficció del barri presentades per la Mar, amb dades, testimonis i qüestions obertes. | [S006](https://sentit.ortogra.fi/#lectura=ca-S006), [S009](https://sentit.ortogra.fi/#lectura=ca-S009), [S016](https://sentit.ortogra.fi/#lectura=ca-S016), [S023](https://sentit.ortogra.fi/#lectura=ca-S023) |
| Ràdio de l’escola | Entrevistes, converses i curiositats amb un to proper. | [S001](https://sentit.ortogra.fi/#lectura=ca-S001) i converses del catàleg |

Les assignacions i els IDs estables consten a [content/universes.js](../content/universes.js), amb noms i descripcions en català i castellà. El selector **Univers** es combina amb curs, nivell, durada, idioma, tipus, personatges, cerca i col·lecció. Les cards i les dades de la fitxa n’indiquen els vincles.

**[Sense univers]** només apareix quan hi ha peces sense connexió editorial que compleixin els altres filtres. Ara totes les peces tenen un vincle justificat i l’opció no es mostra. Els universos amb recompte zero també s’oculten: el menú ofereix material disponible a la vista actual, publicada o provisional. Si el docent ja ha seleccionat un univers i després un altre filtre en deixa el recompte a zero, la selecció es conserva i es pot netejar; no es canvia silenciosament.

### Simplificació del filtre · 27/11/2026

- **A peu de camí → Situacions quotidianes.** Les quatre passejades S108–S111 comparteixen el marc de converses quotidianes. No necessiten una categoria addicional per poder-les localitzar.
- **Històries amb sentit → Els records de l’avi Ferran.** S008R i S043 expliquen històries de l’Aina i el seu avi. S008R ja constava en aquest fil: s’hi compta una sola vegada. «Històries amb sentit» continua sent el nom del programa anunciat a S008R, sense un filtre propi.

De dotze universos a deu. Set tenen material definitiu i els altres tres —faules, llegendes i mites— apareixen a la vista de provisionals fins que es validin els muntatges. Es mantenen diferenciats pel seu valor de cerca i treball cultural; una categoria amb poc material no implica per si sola que s’hagi d’eliminar.

Els IDs antics dels guions i plans de producció es conserven. `universeAliases` resol `a-peu-de-cami` com `situacions-quotidianes` i `histories-sentit` com `aina-ferran` a la classificació, als filtres i als esdeveniments nous. No s’alteren textos, veus, aprovacions ni col·leccions. L’històric d’estadístiques manté les etiquetes originals; vegeu [la guia d’Umami](estadistiques.md).

No cal forçar tots els textos futurs dins d’un fil. Els actuals ja tenen almenys una connexió justificada; cada peça nova pot indicar un univers principal i, només si aporta valor, un segon. El registre `universeIds` de les noves propostes evita haver de mantenir una segona llista manual de codis.

**Mans a l’obra** i les passejades ara agrupades a **Situacions quotidianes** van començar amb quatre propostes cadascun, de 3r a 6è. Totes les pistes necessàries es diuen en veu alta. Els projectes que exigeixin interpretar mapes o altres documents visuals es treballaran a Mirada. En Biel i l’Elies comparteixen les escenes de taller; l’Aina i en Ferran, les passejades. La simplificació del filtre no altera aquests contextos ni el repartiment.

## Proposta inicial d’ampliació: faules, llegendes i mites · 25/11/2026

La secció següent conserva el plantejament editorial inicial. L’estat de les veus i muntatges es consulta al [seguiment de producció](seguiment-produccio.md); no és una cua de síntesi actual.

Nova línia proposada pel docent per ampliar el bagatge cultural a través de l’escolta. Tres universos diferenciats permeten reconèixer el tipus de relat i trobar adaptacions adequades per a edats diferents. Ja tenen un pilot cadascun: [S128, S129 i S130](pilots-tradicio.md), amb revisió independent superada i guions validats pel docent. Esperen completar un lot narrat abans de sintetitzar. Els universos s’activen amb aquestes peces als filtres; no hi ha encara àudios nous.

| Univers proposat | Què hi trobaríem | Primera orientació de cursos | Objectius d’escolta |
| --- | --- | --- | --- |
| **Faules del món** | Faules tradicionals i adaptacions d’Isop, La Fontaine i altres tradicions documentades. | 1r–4t, amb versions més exigents possibles | Accions, ordre dels fets, intencions, enganys i conseqüències. |
| **Llegendes d’aquí i d’arreu** | Relats tradicionals vinculats a llocs, personatges o costums, amb procedència identificada. | 3r–6è, ampliable a ESO | Relació entre lloc i relat, motivacions, elements meravellosos i versions de la tradició. |
| **Mites de l’antiguitat** | Episodis de les tradicions grega i romana, amb cada tradició i versió ben situades. | 4t–6è i ESO, segons la càrrega del relat | Relacions causals, decisions, proves i interpretació de símbols amb suport en el text. |

Les franges són una hipòtesi de treball, no qualificacions ja validades. La dificultat dependrà dels referents que cal retenir, els noms propis, els salts temporals, les inferències i les preguntes, a més de la durada. L’entrada a 1r–2n necessita els pilots i l’adaptació de fitxa previstos al [pla de prioritats](prioritats-cataleg.md).

### Selecció inicial per preparar més endavant

- **Faules:** *El lleó i el ratolí*, *La llebre i la tortuga* i *El corb i la guineu*. Candidats a una primera tanda breu i accessible; ampliar després amb tradicions d’altres procedències perquè el nom «del món» es tradueixi en diversitat real.
- **Llegendes:** una versió documentada de *Sant Jordi i el drac*, una llegenda local vinculada a un lloc concret i una d’una altra tradició. Primer s’escull i identifica la font; després es determina què s’adapta.
- **Mites:** *Ariadna i el fil del laberint*, *Dèdal i Ícar* i *Demèter i Persèfone*. Són candidats, no un encàrrec de síntesi: cal triar un episodi comprensible per si sol i validar-ne l’adaptació a l’edat.

Començar amb un pilot per univers, en lloc d’obrir de cop una altra tanda extensa mentre es validen S112–S127. Les peces continuaran sent autònomes, encara que després permetin comparar versions o treballar-les en una col·lecció docent.

### Adaptació i revisió

1. **Font i versió identificades.** Registrar títol, autor o atribució tradicional, procedència, edició o testimoni consultat, enllaç i canvis principals de l’adaptació. Comprovar les condicions de reutilització de la versió concreta; redactar una adaptació pròpia a partir de fonts que ho permetin. «Tradicional» no descriu automàticament les condicions d’una traducció o adaptació moderna.
2. **Bagatge cultural sense coneixements previs obligatoris.** Introduir lloc, protagonistes i relacions dins l’àudio. Limitar els noms nous i repetir els importants de manera natural. Totes les respostes s’han de poder obtenir escoltant aquesta peça; l’alumne no necessita conèixer abans el mite ni consultar la il·lustració.
3. **Tradició explícita.** Situar el relat amb una entrada breu pròpia del gènere («Una llegenda explica…», «Segons aquest mite grec…»). Distingir el relat tradicional d’una explicació històrica o científica. Mantenir coherents els noms i les relacions de la versió grega o romana escollida; explicar els contrastos entre versions només quan siguin l’objectiu de l’activitat.
4. **Moral pròpia del gènere.** Les faules poden contenir una moral documentada de la versió adaptada. Decidir expressament si es locuta o es deixa inferir i registrar-ho a l’escaleta. El criteri habitual contra les moralines afegides es manté: no inventar una lliçó final aliena al relat. Una reflexió personal continua oberta; un ítem ABCD sobre una inferència ha de tenir una sola resposta defensable amb el text.
5. **Adequació i fidelitat.** Seleccionar i adaptar violència, por, tractament dels personatges i finals d’acord amb l’edat. Fer constar les simplificacions rellevants, conservar la lògica del relat i respectar les diferències entre tradicions. No presentar totes les variants com una única versió autèntica.
6. **Dos formats i revisió independent des de l’esborrany.** Preguntes obertes i ABCD allà on sigui adequat, amb evidències, clau i distractors graduats. El revisor comprova també la font, la coherència de l’adaptació, la càrrega de memòria oral i que el context imprès o la imatge no anticipin respostes. El docent valida guió i muntatge previst abans d’enviar cap veu a sintetitzar.

La [BnF descriu les fonts antigues de les faules de La Fontaine](https://gallica.bnf.fr/accueil/fr/html/les-sources-antiques-des-fables-de-la-fontaine): convé distingir el relat tradicional de la reelaboració concreta que ens serveix de base. És una referència inicial de selecció, no la fitxa de font de totes les futures adaptacions.

### Veus, muntatge i encaix amb les esmenes

Una veu narradora estable per tanda, amb una segona veu només quan aporti valor. Els protagonistes de faules i mites són personatges de la peça, no noves fitxes recurrents de «Coneix els personatges». Compartir la veu Algenib no converteix automàticament el narrador en l’avi Ferran. Si Ferran explica una faula a l’Aina, el guió ho situa com un relat que explica, amb un marc breu i natural.

Una tanda narrada amb Algenib podria ajudar a completar les esmenes delimitades de Ferran, si la direcció i el repartiment són compatibles. Les faules molt curtes poden requerir més peces per arribar als sis a vuit minuts: calcular el lot amb els textos validats, sense afegir farciment. Preservar les identitats i separar clarament cada relat; no parlar en vers si la dificultat lingüística no ho justifica.

Preveure una base musical molt discreta i efectes puntuals amb funció narrativa, mantenint totes les dades comprensibles només amb les veus. Fonts i llicències sonores registrades com a la resta del catàleg. La prioritat immediata continua sent validar la tanda existent i tancar esmenes; aquests universos guien la pròxima selecció.

## Personatges narrats i veus

S004/S004D, S008/S008R, S018 i S022 comparteixen el fil de l’Aina i l’avi Ferran encara que algunes peces només tinguin una narradora anònima. El filtre de personatges que parlen és diferent del filtre d’universos. S004D i S008R són versions de peces existents, no nous episodis en una cronologia.

Compartir la veu Aoede no converteix totes les narradores en la Mireia. S004/S008/S008R/S018 no s’atribueixen a la mestra sense identificar-la al relat. La generació d’aparicions noves comprova el nom del speaker; els rols Entrevistador/Biel de S015 i Presentadora/Mar de S023 mantenen la correspondència explícita del registre. No s’han canviat guions, àudios ni preguntes per crear els universos.

## Univers, programa i col·lecció

Els noms d’univers són organitzadors editorials; no són necessàriament noms locutats de programa. **Històries amb sentit** és el programa anunciat a S008R, dins del fil de l’Aina i l’avi Ferran, i ja no és un filtre separat. No es presenta S018 o S022 com a episodis d’aquell programa sense un muntatge que ho estableixi.

**Les notícies de la Mar** agrupa les notícies de la mateixa periodista; no afegeix un butlletí nou als àudios. La proposta sonora d’informatiu i magazín continua pendent de tria de noms i sintonies. S006 té les veus autoritzades i espera aquesta tria abans del muntatge. [Comparativa de sintonies](https://sentit.ortogra.fi/proves/sintonies-mireia.html).

Les col·leccions són biblioteques personals del docent, desades al navegador: poden barrejar universos i conservar l’ordre i la maquetació propis. Filtrar o amagar provisionals no elimina cap lectura de les col·leccions.

## Visibilitat dels provisionals

El control **Només provisionals**, activat, mostra exclusivament els guions en revisió i els àudios pendents de validar. Desactivat, mostra només els materials disponibles. Per defecte està desactivat als navegadors nous; cada navegador conserva la preferència a `sentit.catalogue.show-provisional.v1`. Netejar filtres no canvia aquesta preferència. El selector d’universos i els recomptes segueixen la vista escollida.

## Seguiment visual de producció

La vista de provisionals incorpora una barra de sis segments i el número de fase, a més del cartell existent. La fase es deriva de [production-stage.js](../production-stage.js) i dels registres de revisió i producció, sense afegir una font manual paral·lela ni alterar aprovacions.

| Fase | Què hi ha pendent | Evidència utilitzada |
| --- | --- | --- |
| 1 · Guió | Revisar o validar guió i escaleta | Proposta pendent, sense una aprovació vigent de producció |
| 2 · Síntesi | Produir les veus | Guió aprovat per al contingut exacte, veus encara pendents |
| 3 · Revisió de veus | Revisar les preses rebudes i preparar el muntatge | Veus rebudes i empremta editorial vigent, sense àudio muntat |
| 4 · Esmenes | Corregir defectes detectats a les veus | Feedback de síntesi amb incidències pendents |
| 5 · Muntatge | Escoltar i validar l’àudio complet | Muntatge disponible, sense esmenes de veu obertes |
| 6 · Publicada | Procés completat | Validació definitiva i registre de publicació; ja no apareix entre els provisionals |

Les esmenes són opcionals i poden repetir-se. Marcar-les aplicades retorna la peça a la revisió de muntatge; no la publica. La barra representa una posició dins del procés, **no un percentatge de temps o feina acabada**. Els prototips històrics sense aprovació formal no reben una fase de publicació retrospectiva.

El filtre de fase està ancorat sobre la zona de cards. Els recomptes reflecteixen la cerca, el curs, la dificultat, la tipologia, la durada, els personatges, l’univers i la col·lecció actuals, abans d’aplicar la fase seleccionada. Així es poden comparar les altres fases sense haver d’esborrar-la. Una fase buida mostra zero i continua sent seleccionable.

La fase seleccionada es conserva en obrir una lectura i tornar al catàleg, i en alternar temporalment amb els materials disponibles. Netejar filtres, prémer «Totes» o canviar de col·lecció la restableix. No es modifica l’ordre ni el contingut d’una col·lecció. En desactivar els provisionals, la franja i els indicadors desapareixen. Transicions de 220 ms; número i text permeten interpretar l’estat sense dependre només del color.

La capçalera compta només els materials amb àudio i sense marca de revisió pendent. La xifra es deriva del catàleg, és global i no es confon amb resultats seleccionats o amb el botó de netejar. No modifica retrospectivament el registre formal de validació dels prototips. Els enllaços directes continuen funcionant; aquest control és una preferència de descoberta, no una restricció d’accés.
