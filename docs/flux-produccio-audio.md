# Producció i validació de l’àudio

Actualitzat el 22/11/2026. La validació del guió, la de les veus i la del muntatge són passos diferents.

1. Preparar guió, preguntes, solucionari i escaleta; superar la revisió independent.
2. El docent valida la proposta abans d’enviar-la a Gemini.
3. Rebre i conservar les preses. Comprovar cobertura, inici, final i separacions sense substituir l’audició.
4. Publicar **només les veus**, disponibles a la fitxa, perquè el docent comprovi clics, artefactes, pronunciació i identitats.
5. Si cal, preparar esmenes agrupades, mostrar original i represa amb «Escolta les esmenes» i tornar a validar les veus. Una prova rebuda continua sense aplicar fins a la decisió corresponent.
6. **Només després de la confirmació docent de les veus**, preparar el muntatge amb música i ambients.
7. El docent escolta el muntatge i demana ajustos o valida la publicació definitiva.

No preparar un muntatge automàticament quan arriba una síntesi. Els remuntatges de versions existents demanats expressament pel docent mantenen l’autorització concreta; canviar la música no resol una pronunciació pendent. En cap fase s’atorga aprovació per haver superat ASR o una comprovació tècnica.

El muntador de preses noves exigeix `voiceApproval` al registre de producció: `status: approved`, `sourceTakeSha256`, `approvedAt` i la confirmació literal del docent. Una empremta d’una altra presa o una part absent bloquegen el muntatge. La recepta antiga amb «Ona curta» per a notícies està retirada; la nova base comuna és la pauta vigent.

## Enviaments i recuperació

Lots compatibles de sis a vuit minuts, d’un en un, amb un màxim de dues veus. No repetir un intent de resultat incert. Les peticions i les preses originals es conserven.

Els nous lots preparats L18/L19 utilitzen l’[execució en segon pla de Gemini](https://aistudio.google.com/docs/background-execution): es desa l’identificador del servidor abans de consultar-ne el resultat. Recuperar una interacció identificada no crea una síntesi nova. Els errors terminals requereixen revisar la causa abans d’un reenviament. Les proves locals comproven que la recuperació no repeteix el POST.

- **L17:** recuperat de l’exportació d’AI Studio facilitada pel docent. Quatre lectures de Ferran comprovades i separades, sense petició addicional.
- **L18:** tres lectures rebudes; manca la presentació locutada de S061. La resposta contenia una capçalera WAV parcial i **35 etiquetes ID3/C2PA intercalades**. La primera recuperació només retirava les metadades de la capçalera i deixava les intercalades interpretades com a mostres: d’aquí els cruixits notificats pel docent a S058 i S062. La revisió v2 retira exclusivament les etiquetes estructuralment verificades i conserva totes les mostres de veu en ordre, sense canviar-ne el ritme. Durada neta del lot: **346,16 s**. Les tres preses v2 substitueixen les v1 a l’escolta; originals, respostes, segments anteriors i rebuts es conserven. El lector ara rebutja metadades C2PA dins el PCM. Cap petició nova. S058 espera una altra audició abans de concretar l’esmena de «trossets»; S061 continua sense títol locutat.
- **L19:** el servidor ha retornat `INTERNAL` sense àudio. Identificador i diagnòstic conservats; cap reenviament automàtic.

L’estat viu és a [la cua de síntesi](lots-sintesi.md) i al [seguiment de producció](seguiment-produccio.md). El recompte de quota vigent es consulta a AI Studio.
