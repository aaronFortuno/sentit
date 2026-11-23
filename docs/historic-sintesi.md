# Històric de lots de síntesi

Actualitzat: **23/11/2026**. Registre dels **15 lots ja rebuts**, amb 83:21 d’àudio cru i 25.105 tokens d’entrada. No és una cua executable ni un comptador de quota. [Tornar als pendents](lots-sintesi.md).

Aquests enviaments van aportar veus per a **46 comprensions** i **7 frases d’esmena**. És l’abast d’aquests lots, no el nombre total de comprensions del catàleg ni el nombre de peces pendents avui. L’estat actual de cada activitat consta al [seguiment](seguiment-produccio.md).

| Lot | Data d’enviament · UTC | Preses i esmenes | Àudio cru | Tokens d’entrada | Tokens d’àudio |
| --- | --- | --- | ---: | ---: | ---: |
| [L01](../assets/audio/synthesis-batches/l01.json) | 2026-11-21 | S021-T01, S032-T01, S013-repartiment, S013-error, S010-pla | 4:22 | 1171 | 6541 |
| [L02](../assets/audio/synthesis-batches/l02.json) | 2026-11-21 | S011-T02, S010-alternativa, S007-T02, S024-T01, S017-T02 | 4:59 | 1250 | 7466 |
| [L10](../assets/audio/synthesis-batches/l10.json) | 2026-11-21 | S007-T01, S011-T01, S029-T01, S031-T01 | 6:05 | 1818 | 9137 |
| [L05](../assets/audio/synthesis-batches/l05.json) | 2026-11-21 | S017-T01, S035-T01, S043-T01 | 5:59 | 1673 | 8963 |
| [L06](../assets/audio/synthesis-batches/l06.json) | 2026-11-21 | S014-T01, S026-T01, S041-T01, S042-T01 | 6:31 | 1834 | 9781 |
| [L03](../assets/audio/synthesis-batches/l03.json) | 2026-11-21 | S006-T01, S009-T01, S039-T01, S016-exposicio, S023-tancament | 5:11 | 1648 | 7777 |
| [L08](../assets/audio/synthesis-batches/l08.json) | 2026-11-21 | S025-T01, S030-T01, S037-T01, S044-T01 | 5:58 | 1622 | 8952 |
| [L13](../assets/audio/synthesis-batches/l13.json) | 2026-11-21 | S027-T01, S034-T01, S038-T01, S038D-T01, S022-dema | 6:45 | 2097 | 10124 |
| [L14](../assets/audio/synthesis-batches/l14.json) | 2026-11-22 | S028-T01, S048-T01, S049-T01, S050-T01 | 5:22 | 1685 | 8050 |
| [L17](../assets/audio/synthesis-batches/l17.json) | 2026-11-22 | S045-T01, S046-T01, S047-T01, S069-T01 | 6:43 | 2196 | 10077 |
| [L18](../assets/audio/synthesis-batches/l18.json) | 2026-11-22 | S058-T01, S061-T01, S062-T01 | 5:46 | 1931 | 8654 |
| [L15](../assets/audio/synthesis-batches/l15.json) | 2026-11-23 | S040-T01, S051-T01, S052-T01 | 5:37 | 1694 | 8420 |
| [L16](../assets/audio/synthesis-batches/l16.json) | 2026-11-23 | S073-T01, S075-T01, S077-T01 | 5:50 | 1881 | 8748 |
| [L12](../assets/audio/synthesis-batches/l12.json) | 2026-11-23 | S033-T01, S036-T01 | 3:14 | 976 | 4862 |
| [L20](../assets/audio/synthesis-batches/l20.json) | 2026-11-23 | S081-T01, S082-T01 | 4:59 | 1629 | 7486 |

Cada rebut apunta a la petició exacta i a les empremtes d’origen; les respostes completes, les preses crues i els mapes de tall es conserven localment. No es repeteix una presa perquè encara falti revisar-la o muntar-la. Les planificacions anteriors, superades pels rebuts, es conserven a l’historial de Git.

Les escenes de tres veus S007, S011 i S017 es van construir a partir de dues preses. S011 va presentar inestabilitat de veus; S032 i S041 van incloure instruccions de pausa llegides. Aquests resultats motiven els [criteris del proper enviament](lots-sintesi.md#criteris-per-al-proper-enviament); la cobertura de text no equival a una validació perceptiva.

Regeneració local: `node tools/update-production-table.mjs --date=AAAA-MM-DD`. Llegeix catàleg, aprovacions, incidències i rebuts; no envia peticions ni modifica validacions.
