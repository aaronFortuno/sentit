# Cua de síntesi

Actualitzat: **22/11/2026**. Aquest document mostra només la feina pendent d’enviar o de revisar. Els lots ja rebuts consten a l’[històric de síntesi](historic-sintesi.md); no s’han de tornar a enviar.

## Lots pendents

| Lot | Material pendent | Veus | Previsió orientativa | Què falta |
| --- | --- | --- | ---: | --- |
| L04 | S005: Aquest matí, per exemple, he apartat un sobre per revisar-lo abans de sortir.; S015: Per això es controla la il·luminació i també les condicions de temperatura i humitat. | Vindemiatrix + Kore | 0:22 | Completar amb material del mateix repartiment; S015: conciliar el registre editorial històric abans de preparar l’esmena |
| L07 | S040 | Leda + Kore | 2:21 | Completar amb material del mateix repartiment |
| L09 | S028 | Leda + Charon | 1:23 | Completar amb material del mateix repartiment |
| L12 | S033; S036 | Puck + Kore | 3:37 | Completar amb material del mateix repartiment |

Les previsions provenen dels guions i del calibratge local; cal recalcular-les amb el format definitiu abans d’enviar. Una mateixa veu en dos guions no implica el mateix personatge. No es canvien repartiments ni s’allarguen guions per omplir un lot.

## Esmenes de veu

| Peça | Prova rebuda | Comparació |
| --- | --- | --- |
| S013 | El codi postal ajuda a arribar a una zona, però no diu tot sol quina bústia concreta és la bona. | [L01](../proves/correccions-l01.html) |
| S013 | No és correcte endevinar una bústia només perquè el nom ens sona. | [L01](../proves/correccions-l01.html) |
| S010 | Després ja som a la porta. És el camí que vam fer l’any passat. | [L01](../proves/correccions-l01.html) |
| S010 | Des de la plaça anem pel carrer dels Til·lers fins a la farmàcia. | [L02](../proves/correccions-l02.html) |
| S016 | Si l’estudi avança, l’equip voldria preparar una mostra al centre cívic amb fotografies del procés i alguns resultats. | [L03](../proves/correccions-l03.html) |
| S023 | D’aquí a un mes, l’associació explicarà què s’ha recollit amb els suggeriments. | [L03](../proves/correccions-l03.html) |
| S022 | Hauria pogut passar el dia mirant els rails i saludant la gent de les parades. | [L13](../proves/correccions-l13.html) |

Aquestes preses són proves per comparar amb l’original; el [registre de pendents](seguiment-produccio.md#esmenes-obertes) indica què continua obert. La recepció no n’autoritza l’aplicació ni valida el muntatge final.

S011, S025 i S041 tenen retorns posteriors a aquests lots: cal preparar les esmenes d’identitat o pronunciació que descriu el [registre de producció](../content/production-progress.js). Els antics R01–R04 són agrupacions alternatives, no peticions addicionals: part del seu material ja és als lots rebuts.

## Criteris per al proper enviament

1. Guió, veus i escaleta validats pel docent, amb aprovació i empremta vigents. Les propostes noves esperen aquesta confirmació encara que la quota s’hagi restablert.
2. **6–8 minuts estimats**, com a màxim dues veus. Prioritzar dues o tres comprensions completes amb el mateix repartiment. Els lots petits esperen; una excepció requereix explicar-ne la mida al docent i acordar-la explícitament.
3. Preparar una entrada sense instruccions literals de pausa dins del text parlat. El format antic va produir locucions «long pause» i s’ha de revisar abans del proper enviament. Conservar les paraules editorials i les identitats aprovades.
4. Un únic enviament en curs, almenys 65 segons entre inicis. Comprovar aprovacions, duplicats, mida, espai en disc i límits abans de reservar quota o llegir claus. No repetir automàticament intents incerts.
5. Conservar resposta i preses crues. Comprovar cobertura, identitats, inici, unions i final; retallar només farciment localitzat amb marges de consonants. El reconeixement automàtic no certifica pronunciació ni timbre.
6. Muntar i escoltar abans de publicar definitivament. Actualitzar el seguiment després de cada canvi de fase.

## Quota i fonts de dades

Aquest document no mostra crèdits ni peticions restants. El recompte vigent es consulta a AI Studio; el registre local ajuda a evitar duplicats i limita enviaments, però no és el comptador del proveïdor. No es conserva aquí una previsió de restabliment que quedi caducada.

- [Manifest de lots](../content/synthesis-batches.json): composició i estat de cada lot.
- [Aprovacions de guió](../content/production-plans.json) · [Plans exactes d’esmena](../content/audio-repairs.json).
- [Rebuts d’enviaments](../assets/audio/synthesis-batches) · [Històric llegible](historic-sintesi.md) · [Feina pendent](seguiment-produccio.md).

Regeneració local: `node tools/update-production-table.mjs --date=AAAA-MM-DD`. Llegeix catàleg, aprovacions, incidències i rebuts; no envia peticions ni modifica validacions.
