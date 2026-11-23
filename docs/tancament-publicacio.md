# Tancament dels materials abans de publicar

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
