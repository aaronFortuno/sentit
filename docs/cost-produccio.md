# Cost de producció dels àudios

Estimació del 18 de novembre de 2026. No s’ha activat facturació. El projecte continua amb la quota gratuïta i la síntesi s’ha aturat en rebre el límit de Gemini.

## Què es paga

Els MP3 es generen una vegada i es publiquen com a fitxers estàtics. Escoltar-los, repetir-los o obrir un QR no fa cap petició de síntesi. Les pauses, els efectes procedimentals i les repeticions de la sessió es munten localment i no generen cost de TTS.

La [tarifa oficial de Gemini 3.8 Flash TTS](https://aistudio.google.com/docs/pricing#gemini-3.8-flash-tts), modalitat Standard, indica:

| Concepte | Fins al 31/12/2026 | Des de l’1/1/2027 |
| --- | ---: | ---: |
| Text d’entrada, per milió de tokens | 0,50 USD | 1,00 USD |
| Àudio de sortida, per milió de tokens | 9,00 USD | 18,00 USD |
| Àudio de sortida, per minut | 0,0135 USD | 0,0270 USD |

La conversió és de 25 tokens d’àudio per segon. Els imports següents són càlculs de Sentit a partir d’aquesta tarifa, no un pressupost de Google ni una factura.

## Escenari de planificació

Hipòtesi: **3 minuts de fragment + 10 segons de presentació per activitat**, dues generacions completes equivalents per tenir marge de repetició i uns 3.000 tokens de text i instruccions per generació. Es compta tot el material sintetitzat, també les preses descartades; no només la durada del màster publicat.

| Activitats | Àudio total generat | Estimació 2026 | Estimació 2027 |
| --- | ---: | ---: | ---: |
| 100 | 633 minuts | 8,85 USD | 17,70 USD |
| 200 | 1.267 minuts | 17,70 USD | 35,40 USD |
| 300 | 1.900 minuts | 26,55 USD | 53,10 USD |

Fórmula: `activitats × 2 × (190 segons × 25 × preu_sortida / 1.000.000 + 3.000 tokens × preu_entrada / 1.000.000)`.

Si la durada mitjana fos de 4 minuts, l’àudio costaria aproximadament un terç més. Cada idioma, varietat o repartiment de veus addicional requereix noves preses. Aquest càlcul no inclou impostos, canvi de moneda, imatges, redacció dels guions, comprovacions automàtiques ni síntesi d’altres projectes. Cal mesurar els tokens reals de les respostes abans d’encarregar un lot gran i tornar a consultar les tarifes vigents.

## Si més endavant activem pagament

La [documentació de facturació de Google](https://aistudio.google.com/docs/billing) descriu el prepagament i els topalls mensuals per projecte. La disponibilitat concreta depèn del compte. El saldo i els topalls poden tenir un retard d’uns deu minuts; no s’han de tractar com un tall instantani exacte.

Per fer una prova controlada: projecte separat, saldo petit sense recàrrega automàtica, topall mensual i un límit addicional dins del generador. Aquest últim hauria de reservar el cost màxim abans de cada petició, guardar-ne l’ús real i aturar-se davant d’un límit, sense reintents il·limitats. Les claus continuen fora del repositori.

El generador actual conserva les preses per l’empremta de la petició i s’atura amb errors de quota. Per passar a pagament caldrà afegir el registre de consum i el topall local abans del primer lot facturat. No s’ha fet cap d’aquests canvis al compte.

Es pot consultar l’ús a [Google AI Studio · Usage](https://aistudio.google.com/usage) i els límits a [Rate limits](https://aistudio.google.com/rate-limit).
