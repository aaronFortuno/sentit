# Tancament dels materials abans de publicar

## Rutina de neteja en cada publicació definitiva

Després de la validació docent i del tancament de materials i incidències, executar `node tools/prepare-publication.mjs --apply`. És part obligatòria del mateix procés de publicació, no una tasca que hagi de fer el docent a mà:

- Genera les durades i empremtes de títol/relat, amb els MP3 ja existents.
- Selecciona els fitxers que encara necessita el web, incloent revisions pendents d’altres peces i recursos compartits.
- Arxiva el treball retirat amb empremtes, reutilitzant còpies idèntiques entre dies; conserva també els originals al seu lloc de producció.
- Retira de la publicació les proves tancades i els màsters complets equivalents, comprova els materials i actualitza el seguiment.
- Informa de les rutes antigues que encara queden a l’historial de Git.

L’agent afegeix a Git els canvis de la publicació i executa `node tools/prepare-publication.mjs --check` abans de pujar. Aquesta rutina no atorga aprovacions, no genera veus ni fa commits o pushes pel seu compte. Les revisions actives han de constar tancades quan el docent les dona per resoltes; es conserva el registre del que s’ha acceptat o rebutjat.

La retirada del lloc publicat és immediata amb el commit següent. L’eliminació retroactiva de l’historial és un manteniment separat, preparat per l’auditoria i agrupat en lots amb còpia completa i autorització concreta. No es fa un force-push per cada lectura. [Política i recuperació](neteja-audio.md) · [Reproducció modular](audio-modular.md).

## Registre de tancaments

El 23/11/2026, tanda 0.1.92: S007, S013, S024, S029, S045D, S046D, S057, S063, S064, S065, S066, S068, S068D, S069, S069D, S079 i S082 passen a definitives amb aprovació docent explícita. Tretze il·lustracions noves, amb prompts a `assets/images/sXXX-publication.prompts.json`; S045D/S045, S046D/S046, S068/S068D i S069/S069D comparteixen imatge per ser la mateixa història, conservant les aprovacions pròpies de cada àudio. Revisió independent de totes les imatges, alts, preguntes, cites i transcripcions només parlades. Els SHA dels disset MP3 coincideixen amb els aprovats; la prova de timbre de S024 queda validada sense canviar el muntatge.

La validació de l’àudio és l’últim pas docent. Abans de donar una comprensió per definitiva, també s’ha d’acabar la seva presentació. Aquesta comprovació és obligatòria per a les publicacions futures.

1. **Il·lustració pròpia de context.** Consultar els models dels personatges; crear primer la fitxa visual dels que encara no en tinguin. La imatge no pot mostrar dades o pistes que resolguin les preguntes. Registrar prompt, referències i fitxer al repositori.
2. **Card i fitxa.** Enllaçar `image` a l’activitat, comprovar que la card la carrega i que la fitxa la mostra per defecte a la dreta, a 80 mm, al costat de les instruccions i amb text envoltant. La preferència que un docent hagi guardat expressament continua tenint prioritat. Mantenir els controls per amagar-la, moure-la o redimensionar-la.
3. **Solucionari net.** Mostrar les respostes, les proves textuals opcionals i la transcripció de les veus amb la il·lustració al costat. Eliminar de la vista definitiva les acotacions, instruccions de muntatge, marcadors de peticions Gemini, talls locals i notes editorials. Conservar noms de parlants i paraules efectivament locutades, incloent-hi presentació, benvinguda i comiat quan formen part de la peça. S001 i S008 són referències de material net.
4. **Historial conservat.** Les acotacions no s’esborren del guió font: continuen documentant l’àudio aprovat. `review.js` separa la transcripció publicada del guió de treball. Els provisionals mantenen el guió anotat per a la validació docent.
5. **Comprovació local.** Obrir card, fitxa i solucionari; comprovar càrrega d’imatges, paginació, lectura i ressaltats. Verificar els MP3 i les seves empremtes. Si canvien metadades editorials, revisar-les de manera independent i registrar l’empremta nova sense atribuir una nova validació d’àudio al docent.
6. **Seguiment i publicació.** Actualitzar registre de fases, manifests, crèdits i changelog. Pujar a `main` després de les comprovacions locals; la comprovació del desplegament remot la fa l’usuari.

`node tools/check-publication-ui.cjs` exigeix una imatge local i transcripció només parlada per a cada activitat definitiva. Comprova també les set incorporacions il·lustrades d’aquesta tanda al navegador, les cites, la paginació i la prova de sessió. El docent continua validant el resultat pedagògic i perceptiu.

Aplicat el 20/11/2026 a S003, S004, S004D, S012 i S018; també a S019 en retirar la identificació oral de la mostra de cuina, i a S020 amb la confirmació definitiva del docent. Les dues versions de S004 comparteixen una imatge perquè són la mateixa història. No s’han tornat a sintetitzar les veus.

Aplicat el 23/11/2026 a S014, S016, S026, S039, S042, S044, S045 i S048: il·lustracions de context amb prompts i referències a `assets/images/sXXX-publication.prompts.json`, revisió independent de metadades i comprovació de fitxa, solucionari i cites. Les transcripcions publicades només contenen la parla; el guió anotat es conserva. S045 publica directament després de retirar només l’efecte inicial, tal com autoritza el docent; la resta conserva l’àudio validat. Les imatges noves prioritzen accions i entorns recognoscibles sense mostrar respostes.

La prova de sessió del sidebar utilitza el mateix reproductor que l’alumnat. Permet escoltar sintonia, presentació, locucions, fragment al ritme triat i repeticions. Saltar les esperes només modifica la prova local; no altera la configuració del QR.

Aplicat també el 23/11/2026 a S006, S034, S035 i S047, amb validacions definitives explícites del docent. Les quatre il·lustracions contextuals disposen de prompts i referències a `assets/images/sXXX-publication.prompts.json`; els màsters aprovats i les seves empremtes es conserven. Fitxes, transcripcions netes, cites i paginació comprovades en local, amb revisió independent de tancament.

Aplicat igualment a S021, S037 i S043, validades definitivament el 23/11/2026. Il·lustracions contextuals creades amb el generador integrat, a partir dels models canònics de Mireia/Laia, Laia/Biel i Aina/Ferran, respectivament. Prompts i referències a `assets/images/s021-publication.prompts.json`, `s037-publication.prompts.json` i `s043-publication.prompts.json`. Es conserven exactament els muntatges aprovats; fitxes i solucionaris sense anotacions de producció, amb imatge opcional i proves textuals revisades.

Tancament aplicat també el 23/11/2026 a S028, S033, S036, S040, S046, S049, S051, S052, S062, S073, S075 i S077. Les dotze imatges, creades amb el generador integrat i els models canònics, mostren accions i contextos concrets sense donar respostes; prompts i referències a `assets/images/sXXX-publication.prompts.json`. Revisió independent final sobre imatges, alts, preguntes, cites i transcripcions netes. Els SHA dels màsters coincideixen amb els aprovats pel docent; no s’han modificat àudios per publicar els materials. S033 conserva la tipologia entrevista. Les qualificacions que el docent vol acabar de confirmar es mantenen anotades al seguiment.

Tancament del 23/11/2026 aplicat també a S053, S054, S067, S071D, S078 i S080: il·lustracions contextuals amb models recurrents, prompts i referències a `assets/images/sXXX-publication.prompts.json`; revisió independent de contingut, imatges i cites. Es conserven exactament els MP3 aprovats. La publicació mostra transcripció només parlada; la informació de producció es conserva als fitxers font. S067 manté 1r d’ESO intermèdia i S071D es valida com a variant independent.


Aplicat el 25/11/2026 a S055, S060, S076, S083, S084, S086, S091, S092, S096, S098, S101, S103 i S105 després del traspàs i de la confirmació explícita de l’abast de tretze peces. Il·lustracions JPG de 768 × 512 integrades amb prompts i models canònics, revisió independent de les imatges i 95 preguntes amb 120 cites. S076 és diàleg. Màsters exactes conservats, fitxes il·lustrades i solucionaris només parlats, comprovats en local. La prova del navegador valida les dimensions declarades de cada imatge, tant les noves com les anteriors. Detall a [la publicació del 25/11](publicacio-2026-11-25.md).


Tancament del 25/11/2026, segona tanda: S104, S106, S087, S110, S074, S100, S108, S056 i S097, totes amb validació definitiva explícita del docent. Nou il·lustracions individuals generades amb el generador integrat i models canònics; WebP de 1536 × 1024, prompts i referències a `assets/images/sXXX-publication.prompts.json`. Revisió independent de les imatges, 65 preguntes i 77 cites; S074 és diàleg i la coberta negra s’ha ajustat a l’àudio. Màsters intactes, esmenes de S056/S097 validades en context i comparacions tancades. Fitxes, solucionaris nets, ressaltats i paginació comprovats en local. Detall i fitxers a [la segona publicació del 25/11](publicacio-2026-11-25-segona-tanda.md).


Tancament del 25/11/2026, tercera tanda: S094, S111, S099, S072 i S089, amb validació definitiva explícita del docent. Cinc il·lustracions creades amb el generador integrat i models canònics, amb prompts i edicions a `assets/images/sXXX-publication.prompts.json`. Revisió independent d’imatges, alts i 39 preguntes amb cites; S094 evita suggerir el color del paraigua de recanvi. Màsters intactes, fitxes i solucionaris només parlats comprovats en local. Detall a [la tercera publicació del 25/11](publicacio-2026-11-25-tercera-tanda.md).


Quarta tanda del 25/11/2026: S061, S071, S022, S059 i S025 passen a definitives. Quatre il·lustracions noves amb models canònics i prompts conservats; S071 comparteix la imatge de S071D amb alt propi. Revisió independent de 39 preguntes, 48 cites, 53 intervencions i les cinc imatges, sense respostes revelades. Màsters aprovats intactes i esmenes tancades. Fitxes i solucionaris nets comprovats en local. [Detall i fitxers](publicacio-2026-11-25-quarta-tanda.md).


S058 tancada el 25/11/2026 amb aprovació definitiva del docent. Il·lustració contextual nova amb models canònics, revisió independent de 8 preguntes, 10 cites i 11 torns, fitxa i solucionari nets comprovats en local. Màster aprovat conservat exactament; cap síntesi. [Detall i procedència](publicacio-s058-2026-11-25.md).


Tancament del 25/11/2026 aplicat a S112, S113, S115, S117, S119, S121 i S127: set il·lustracions amb models canònics, prompts conservats, revisió independent de 37 preguntes i 41 cites, transcripcions només parlades i màsters aprovats intactes. [Detall i procedència](publicacio-equilibri-2026-11-25.md).

Tancament del 26/11/2026 aplicat a S088, S041, S085, S090, S093, S118, S109, S017 i S081, amb aprovació definitiva explícita. Nou il·lustracions contextuals, revisió independent de 63 preguntes obertes/ABCD i cites, transcripcions netes i àudios aprovats intactes. Comparacions tancades i treball retirat conservat en local. [Detall, imatges i prompts](publicacio-2026-11-26-nou.md).
