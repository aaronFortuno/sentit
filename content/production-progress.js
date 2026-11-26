// Production stages are separate from editorial review and final listening approval.
export const productionProgress = {
  "ca-S020": {
    "state": "published",
    "receivedAt": "2026-11-20T07:50:26.951Z",
    "rawSha256": "015b9300b6d93417c143a5acd87cb3bff35607ec2b02dd170214454a28ab14b9",
    "newSynthesisRequests": 1,
    "model": "gemini-3.8-flash-tts",
    "usage": {
      "total_tokens": 3571,
      "total_input_tokens": 615,
      "input_tokens_by_modality": [
        {
          "modality": "text",
          "tokens": 615
        }
      ],
      "total_cached_tokens": 0,
      "total_output_tokens": 2956,
      "output_tokens_by_modality": [
        {
          "modality": "audio",
          "tokens": 2956
        }
      ],
      "total_tool_use_tokens": 0,
      "total_thought_tokens": 0,
      "initial_input_tokens": 615
    },
    "sharedJingle": {
      "status": "catalogue-approved",
      "url": "./proves/sintonies-mireia.html",
      "approvedAt": "2026-11-20",
      "note": "Petita descoberta i muntatge complet de S020 validats pel docent el 20/11/2026.",
      "selected": "petita-descoberta"
    },
    "editorialFingerprint": "faad25de0b3c3fd17d6e552ab5bb2194358c68019eb6348fc70b5af2ab7c6d3c",
    "montageNewSynthesisRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Guió, veus i muntatge validats pel docent. Màster v1 conservat amb Petita descoberta, sense nova síntesi.",
    "validatedAt": "2026-11-20",
    "validatedBy": "docent",
    "confirmation": "S020 llest per publicació definitiva",
    "audioSha256": "e31909e699b9eda3ebd68850ae928b65f8827183ee334803291ed8b05b1ad78b",
    "publicationMaterials": {
      "illustration": "./assets/images/com-participar-en-el-concurs-de-podcasts-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-20",
      "audioChanged": false
    }
  },
  "ca-S011": {
    "state": "audio-corrections-pending",
    "approvedAt": "2026-11-20T12:34:52.567Z",
    "editorialFingerprint": "7c6c647baa9f796d82a24313a34e8a6387a5518f5878d4853b7a7397e1af34cb",
    "plannedNewRequests": 2,
    "reason": "Guió validat i reclassificat a 4t avançada; pendent de produir les dues preses agrupades.",
    "receivedTakes": {
      "received": [
        "S011-T01",
        "S011-T02"
      ],
      "total": 2,
      "batches": [
        "L10",
        "L02"
      ]
    },
    "voicesReceivedAt": "2026-11-21T10:44:36.680Z",
    "listeningApproval": false,
    "synthesisBatch": "L10+L02",
    "requestHash": "ef97c7456001de385258549f2a355d83acf7942502caa3b39f364da8be1b417f",
    "audioSha256": "de8b13c261e68829a0fa555face36257a4311b79c202229efc6b257bf6e7e2dc",
    "montageNewSynthesisRequests": 0,
    "timingRevision": {
      "baseFile": "s011-mixed-v1.mp3",
      "baseAudioSha256": "2b359a9bf561c04a550d4967ee08187d41e20209ca386a01da3b21e5749981e0",
      "intro": {
        "cuts": [
          {
            "first": 12000,
            "last": 45634,
            "start": 0.25,
            "end": 0.9507083333333334,
            "seconds": 0.7007083333333334,
            "maximumDbFS": -43.46054508275024
          },
          {
            "first": 200858,
            "last": 235436,
            "start": 4.184541666666667,
            "end": 4.904916666666667,
            "seconds": 0.720375,
            "maximumDbFS": -51.7206201849085
          }
        ],
        "removedSeconds": 1.4210833333333333,
        "retainedPcmSha256": "1e3407ad4f6661cc23361478e09852ea202340d9c179afcf06db03be092a2c8b"
      },
      "body": {
        "cuts": [
          {
            "first": 119568,
            "last": 149628,
            "start": 2.491,
            "end": 3.11725,
            "seconds": 0.62625,
            "maximumDbFS": -44.20197131026188
          },
          {
            "first": 802590,
            "last": 850533,
            "start": 16.720625,
            "end": 17.7194375,
            "seconds": 0.9988125,
            "maximumDbFS": -48.3015877968431
          },
          {
            "first": 1945688,
            "last": 1992248,
            "start": 40.53516666666667,
            "end": 41.50516666666667,
            "seconds": 0.97,
            "maximumDbFS": -49.80288139389895
          },
          {
            "first": 2069529,
            "last": 2100248,
            "start": 43.1151875,
            "end": 43.75516666666667,
            "seconds": 0.6399791666666667,
            "maximumDbFS": -55.823481307178575
          },
          {
            "first": 2441049,
            "last": 2475368,
            "start": 50.8551875,
            "end": 51.570166666666665,
            "seconds": 0.7149791666666667,
            "maximumDbFS": -55.50174490930949
          },
          {
            "first": 2824811,
            "last": 2850052,
            "start": 58.850229166666665,
            "end": 59.376083333333334,
            "seconds": 0.5258541666666666,
            "maximumDbFS": -51.7206201849085
          },
          {
            "first": 3566690,
            "last": 3599550,
            "start": 74.30604166666667,
            "end": 74.990625,
            "seconds": 0.6845833333333333,
            "maximumDbFS": -47.831965879852646
          },
          {
            "first": 3702751,
            "last": 3738012,
            "start": 77.14064583333334,
            "end": 77.87525,
            "seconds": 0.7346041666666666,
            "maximumDbFS": -56.32959861247399
          },
          {
            "first": 4227133,
            "last": 4272291,
            "start": 88.06527083333333,
            "end": 89.0060625,
            "seconds": 0.9407916666666667,
            "maximumDbFS": -54.891958466351475
          },
          {
            "first": 4461151,
            "last": 4490210,
            "start": 92.94064583333333,
            "end": 93.54604166666667,
            "seconds": 0.6053958333333334,
            "maximumDbFS": -55.50174490930949
          },
          {
            "first": 5026408,
            "last": 5061864,
            "start": 104.71683333333333,
            "end": 105.4555,
            "seconds": 0.7386666666666667,
            "maximumDbFS": -50.13699526395601
          },
          {
            "first": 5602341,
            "last": 5648180,
            "start": 116.7154375,
            "end": 117.67041666666667,
            "seconds": 0.9549791666666667,
            "maximumDbFS": -57.63962958760263
          },
          {
            "first": 5947221,
            "last": 5980436,
            "start": 123.9004375,
            "end": 124.59241666666667,
            "seconds": 0.6919791666666667,
            "maximumDbFS": -62.35019852575361
          },
          {
            "first": 6076074,
            "last": 6130248,
            "start": 126.584875,
            "end": 127.7135,
            "seconds": 1.128625,
            "maximumDbFS": -48.945281464271126
          }
        ],
        "removedSeconds": 10.955499999999999,
        "retainedPcmSha256": "83eaca837596211df9d481ed57fec43267635d4dc75ab3854d8485d5a6815740"
      },
      "quietThresholdDbFS": -42,
      "allRetainedSamplesIdentical": true,
      "newRequests": 0,
      "originalPreserved": true
    },
    "feedback": [
      {
        "part": "problema",
        "speaker": "Biel",
        "status": "pending",
        "type": "voice-identity",
        "note": "El docent sent la frase «A nosaltres no ens hi entra la mà...» amb veu de Laia. A l’entrada de Gemini és Biel/Puck; els talls són correctes."
      },
      {
        "part": "exposicio",
        "speaker": "Laia",
        "status": "pending",
        "type": "voice-consistency",
        "note": "«Doncs jo la deixaria...» sona molt més agut que la resta de torns de Laia."
      },
      {
        "part": "whole",
        "status": "pending",
        "type": "voice-consistency",
        "note": "El docent percep quatre o cinc timbres tot i haver-hi tres personatges. Revisar estabilitat de les veus abans de donar per bona la síntesi."
      }
    ],
    "confirmation": "Retorn docent del 21/11: identitat i timbre de veus a revisar; pauses tècniques escurçades localment.",
    "timingComparison": "./proves/pauses-s011-s027.html#S011"
  },
  "ca-S021": {
    "state": "published",
    "approvedAt": "2026-11-20T12:41:11.676Z",
    "editorialFingerprint": "1efafdcd8781b775133f97830ee35a54ecf2a982e90c08746e9b87fae3454a3a",
    "plannedNewRequests": 0,
    "reason": "Guió de recerca validat; preparat per al següent lot dins del topall gratuït de peticions.",
    "voicesReceivedAt": "2026-11-21T10:04:43.360Z",
    "synthesisBatch": "L01",
    "requestHash": "0cd61066dabfeb8992968fa3e45c9f95dd07621aa58ca5a919a5e873cee48df7",
    "audioSha256": "a54b1651b9761d9d4919157efcdb1bff413c2c86e4ddaaf7502e975553b3841a",
    "listeningApproval": true,
    "montageNewSynthesisRequests": 0,
    "feedbackAt": "2026-11-23",
    "feedback": [
      {
        "part": "ambient",
        "kind": "ambience",
        "word": "Ambient urbà continu i entrada més suau",
        "status": "applied"
      },
      {
        "part": "final",
        "kind": "tail",
        "word": "Respiració i full després del final",
        "status": "applied"
      }
    ],
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "confirmation": "S021 validat per publicació definitiva",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/per-que-una-ciutat-guarda-la-calor-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S006": {
    "state": "published",
    "approvedAt": "2026-11-20T12:48:05.488Z",
    "editorialFingerprint": "2742d34bbd0e18fc24f139231c3367f93b883db1a78cf7b0bd3dea80b4ef96d7",
    "plannedNewRequests": 0,
    "reason": "Veus validades, pendents del següent lot dins el límit gratuït. Muntatge pendent de sintonies d’informatiu.",
    "sharedJingle": {
      "status": "catalogue-approved",
      "selected": "ona-curta",
      "note": "Recurs ja aprovat; aquest muntatge encara espera audició."
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S006-T01"
      ],
      "total": 1,
      "batches": [
        "L03"
      ]
    },
    "voicesReceivedAt": "2026-11-21T10:58:10.100Z",
    "listeningApproval": true,
    "voicePreview": "./proves/veus-rebudes.html#S006",
    "audioSha256": "3f55fe2548f4e8b1cc9effa4e34b75dfc3c8fc8fdf866eee35f49caa4ea1f853",
    "montageNewSynthesisRequests": 0,
    "voicePreviewFile": "./assets/audio/s006-voices-review-v1.mp3",
    "reviewUpdate": {
      "audio": "./assets/audio/s006-news-common-v2.mp3",
      "at": "2026-11-22",
      "summary": {
        "ca": "Nova base comuna de notícies, amb entrada i sortida; retirats els papers i jingles anteriors. Pendent d’audició.",
        "es": "Nueva base común de noticias, con entrada y salida; retirados los papeles y jingles anteriores. Pendiente de escucha."
      }
    },
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "confirmation": "S006 validat per publicació definitiva amb el nou muntatge",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/sobre-un-nou-cami-al-parc-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S010": {
    "state": "audio-corrections-pending",
    "feedbackAt": "2026-11-22",
    "feedback": [
      {
        "part": "pla",
        "word": "Després",
        "heard": "Desprén",
        "status": "pending"
      },
      {
        "part": "alternativa",
        "word": "Til·lers",
        "heard": "Tillers; falta la geminació",
        "status": "pending"
      }
    ],
    "teacherAssessment": "Només queda pendent alternativa: Tillers; falta la geminació. Les altres proves validades es conserven.",
    "plannedNewRequests": 1,
    "repairPlan": "content/audio-repairs.json",
    "listeningApproval": false,
    "repairComparison": "./proves/correccions-l31.html#S010-alternativa",
    "receivedRepairs": [
      {
        "code": "S010",
        "part": "pla",
        "text": "Després ja som a la porta. És el camí que vam fer l’any passat.",
        "pronunciation": "Pronounce Després faithfully, with its final /s/ before ja, not Desprén. Keep the entire sentence fluent; do not spell it aloud.",
        "status": "approved-awaiting-application",
        "originalFile": "assets/audio/repairs/l01-s010-pla-original.mp3",
        "candidateFile": "assets/audio/repairs/l01-s010-pla-prova.mp3",
        "sourceRawSha256": "5ae1ca4fd12bac21243b7e519981c14bdb2e34319cc06bdc1fbc318f91833fe4",
        "batchRequestHash": "0cd61066dabfeb8992968fa3e45c9f95dd07621aa58ca5a919a5e873cee48df7",
        "applied": false,
        "approvedAt": "2026-11-26",
        "confirmation": "Docent 26/11: esmena S010/pla validada.",
        "candidateSha256": "895d21bf0ce056c3925f69011890ca49c15526418f249abe48e1d51cf421c9b9"
      },
      {
        "code": "S010",
        "part": "alternativa",
        "text": "Des de la plaça anem pel carrer dels Til·lers fins a la farmàcia.",
        "pronunciation": "Til·lers has two consecutive lateral L sounds (l·l), a gently lengthened L, never the palatal LL of lluna. Keep the stressed open E and fluent natural Central Catalan. Do not read the middle dot or say the explanation.",
        "status": "rejected-awaiting-resynthesis",
        "originalFile": "assets/audio/repairs/l31-s010-alternativa-original.mp3",
        "candidateFile": "assets/audio/repairs/l31-s010-alternativa-prova.mp3",
        "sourceRawSha256": "5ae1ca4fd12bac21243b7e519981c14bdb2e34319cc06bdc1fbc318f91833fe4",
        "batchRequestHash": "a60fe358a66004eba2e6b742133d7f9780780baf5a8739a3a428828c3e6fa590",
        "applied": false,
        "rejectedAt": "2026-11-26",
        "rejection": "Tillers; falta la geminació"
      }
    ],
    "gradingDecision": {
      "date": "2026-11-22",
      "grade": "5",
      "level": "middle",
      "source": "Decisió explícita del docent: S010 validada per producció, pujant-la a 5è intermèdia.",
      "spokenTextChanged": false,
      "newSynthesisRequests": 0
    },
    "plannedRepair": {
      "status": "awaiting-compatible-batch",
      "speaker": "Biel",
      "voice": "Puck",
      "part": "alternativa",
      "text": "Des de la plaça anem pel carrer dels Til·lers fins a la farmàcia.",
      "direction": "Use the youthful male Biel/Puck voice throughout this sentence, never Laia/Leda. Keep Til·lers as the two lateral L sounds directed in the frozen plan.",
      "reason": "Tillers; falta la geminació",
      "confirmedAt": "2026-11-26",
      "newRequests": 0,
      "batch": "L31",
      "parts": [
        "alternativa"
      ],
      "attempt": 3
    },
    "approvedRepairSelections": {
      "pla": {
        "part": "pla",
        "text": "Després ja som a la porta. És el camí que vam fer l’any passat.",
        "candidateFile": "assets/audio/repairs/l01-s010-pla-prova.mp3",
        "candidateSha256": "895d21bf0ce056c3925f69011890ca49c15526418f249abe48e1d51cf421c9b9",
        "batchRequestHash": "0cd61066dabfeb8992968fa3e45c9f95dd07621aa58ca5a919a5e873cee48df7",
        "candidateTakeId": "S010-pla",
        "sourceRequestHash": "a8d86c221c91394f80126bb5b2503e6d16173c2e3000f1aff41edfdf79b71fc2",
        "approvedAt": "2026-11-26"
      }
    },
    "voiceApproval": false
  },
  "ca-S013": {
    "state": "published",
    "feedbackAt": "2026-11-20",
    "feedback": [
      {
        "part": "repartiment",
        "word": "bústia",
        "heard": "bustía",
        "status": "applied",
        "appliedAt": "2026-11-23",
        "audio": "./assets/audio/s013-repair-v3.mp3"
      },
      {
        "part": "error",
        "word": "bústia",
        "heard": "bustía",
        "status": "applied",
        "appliedAt": "2026-11-23",
        "audio": "./assets/audio/s013-repair-v3.mp3"
      }
    ],
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "plannedNewRequests": 0,
    "repairPlan": "content/audio-repairs.json",
    "listeningApproval": true,
    "repairComparison": "./proves/correccions-l01.html#S013-error",
    "receivedRepairs": [
      {
        "code": "S013",
        "part": "repartiment",
        "text": "El codi postal ajuda a arribar a una zona, però no diu tot sol quina bústia concreta és la bona.",
        "pronunciation": "Bústia is stressed on the first vowel Ú: BÚS-ti-a, never bus-TÍ-a. This spelling aid is an instruction, not spoken text. Read the sentence fluently and naturally.",
        "status": "applied-validated",
        "originalFile": "assets/audio/repairs/l01-s013-repartiment-original.mp3",
        "candidateFile": "assets/audio/repairs/l01-s013-repartiment-prova.mp3",
        "sourceRawSha256": "37fe6368197b31f9d3d6a8bafedc0c858426c23bd2dd4f6ef6f1278d7cbfb473",
        "batchRequestHash": "0cd61066dabfeb8992968fa3e45c9f95dd07621aa58ca5a919a5e873cee48df7",
        "applied": true,
        "approvedAt": "2026-11-23",
        "confirmation": "S013 esmenes validades pel docent per incorporar-les i passar a muntatge.",
        "candidateSha256": "d530ead23bbf0ef891b0b068ba1dedf0a3988da35faba9d5e5458853b5cd269b",
        "appliedAt": "2026-11-23",
        "appliedAudio": "./assets/audio/s013-repair-v3.mp3",
        "validatedAt": "2026-11-23",
        "validatedAudioSha256": "03807f97cb892ad29c76a0b4e49dfb7dce57e6ea939c9509fb40fc482c320f94"
      },
      {
        "code": "S013",
        "part": "error",
        "text": "No és correcte endevinar una bústia només perquè el nom ens sona.",
        "pronunciation": "Bústia is stressed on Ú in the first syllable, never on I. Respect the written accent without exaggerated pauses or spelling aloud.",
        "status": "applied-validated",
        "originalFile": "assets/audio/repairs/l01-s013-error-original.mp3",
        "candidateFile": "assets/audio/repairs/l01-s013-error-prova.mp3",
        "sourceRawSha256": "37fe6368197b31f9d3d6a8bafedc0c858426c23bd2dd4f6ef6f1278d7cbfb473",
        "batchRequestHash": "0cd61066dabfeb8992968fa3e45c9f95dd07621aa58ca5a919a5e873cee48df7",
        "applied": true,
        "approvedAt": "2026-11-23",
        "confirmation": "S013 esmenes validades pel docent per incorporar-les i passar a muntatge.",
        "candidateSha256": "b1366113dcca0020c72aece80ee0e122007a833168a5c8336a58644c45f4c21b",
        "appliedAt": "2026-11-23",
        "appliedAudio": "./assets/audio/s013-repair-v3.mp3",
        "validatedAt": "2026-11-23",
        "validatedAudioSha256": "03807f97cb892ad29c76a0b4e49dfb7dce57e6ea939c9509fb40fc482c320f94"
      }
    ],
    "repairApplicationApproval": {
      "at": "2026-11-23",
      "scope": "approved-repair",
      "confirmation": "S013 esmenes validades pel docent per incorporar-les i passar a muntatge.",
      "clips": [
        {
          "part": "repartiment",
          "text": "El codi postal ajuda a arribar a una zona, però no diu tot sol quina bústia concreta és la bona.",
          "candidateFile": "assets/audio/repairs/l01-s013-repartiment-prova.mp3",
          "candidateSha256": "d530ead23bbf0ef891b0b068ba1dedf0a3988da35faba9d5e5458853b5cd269b",
          "batchRequestHash": "0cd61066dabfeb8992968fa3e45c9f95dd07621aa58ca5a919a5e873cee48df7"
        },
        {
          "part": "error",
          "text": "No és correcte endevinar una bústia només perquè el nom ens sona.",
          "candidateFile": "assets/audio/repairs/l01-s013-error-prova.mp3",
          "candidateSha256": "b1366113dcca0020c72aece80ee0e122007a833168a5c8336a58644c45f4c21b",
          "batchRequestHash": "0cd61066dabfeb8992968fa3e45c9f95dd07621aa58ca5a919a5e873cee48df7"
        }
      ]
    },
    "audioSha256": "03807f97cb892ad29c76a0b4e49dfb7dce57e6ea939c9509fb40fc482c320f94",
    "montageNewSynthesisRequests": 0,
    "reason": "Dues frases amb «bústia» substituïdes per les represes validades. Presentació i dos efectes breus del muntatge anterior conservats, sense recuperar la sintonia rebutjada. Pendent d’audició del muntatge.",
    "editorialFingerprint": "1ac1d32c5d386ffc07af13f947ecb529f131bb2fa61dc937f82880959f4a04c6",
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "confirmation": "S013 validat per publicació definitiva",
    "publicationMaterials": {
      "illustration": "./assets/images/com-viatja-una-carta-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S022": {
    "state": "published",
    "feedbackAt": "2026-11-22",
    "feedback": [
      {
        "part": "dema",
        "word": "rails",
        "heard": "ráils/ralls",
        "status": "applied",
        "appliedAt": "2026-11-25",
        "appliedAudio": "./assets/audio/s022-repair-v3.mp3",
        "resolution": "Presa validada pel docent incorporada; muntatge complet pendent d’audició."
      }
    ],
    "teacherAssessment": "Veus, esmenes incorporades i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "plannedNewRequests": 0,
    "repairPlan": "content/audio-repairs.json",
    "listeningApproval": true,
    "repairComparison": "./proves/correccions-l30.html#S022-rails-dieresis",
    "receivedRepairs": [
      {
        "code": "S022",
        "part": "dema",
        "text": "Hauria pogut passar el dia mirant els rails i saludant la gent de les parades.",
        "pronunciation": "Rails means the two metal railway tracks. Use a clear Central Catalan pronunciation with separate ra-ÍLS, stress on I, with a final ordinary L followed by S; never a palatal LL as in ralls. This pronunciation guide is instruction only, never spoken. Keep the complete sentence fluent.",
        "status": "rejected-pronunciation",
        "originalFile": "assets/audio/repairs/l13-s022-dema-original.mp3",
        "candidateFile": "assets/audio/repairs/l13-s022-dema-prova.mp3",
        "sourceRawSha256": "7c44d2c01fff3768eb38f6ec5429d388dda661fe91e6580c8d596556e66b7566",
        "batchRequestHash": "ab02e5a56a6807f106885dd5b8e4749ed77c2b2461e93dc71243142194efb2a3",
        "applied": false,
        "reviewedAt": "2026-11-22",
        "rejection": "El docent continua sentint ráils: la indicació de tonicitat no ha millorat la pronunciació."
      },
      {
        "code": "S022",
        "part": "dema",
        "text": "Hauria pogut passar el dia mirant els rails i saludant la gent de les parades.",
        "pronunciation": "Preserve Ferran/Algenib, an older warm narrator. In the auxiliary spelling, pronounce two syllables ra-ÍLS, with stress on I, ordinary lateral L and final S. Read only the sentence, no spelling aloud or instructions.",
        "trialId": "S022-rails-accent",
        "ttsWord": "raíls",
        "ttsText": "Hauria pogut passar el dia mirant els raíls i saludant la gent de les parades.",
        "canonicalTextChanged": false,
        "status": "not-selected",
        "originalFile": "assets/audio/repairs/l30-s022-S022-rails-accent-original.mp3",
        "candidateFile": "assets/audio/repairs/l30-s022-S022-rails-accent-prova.mp3",
        "sourceRawSha256": "7c44d2c01fff3768eb38f6ec5429d388dda661fe91e6580c8d596556e66b7566",
        "batchRequestHash": "e976118d4059a3906fef68d10a896878017b880860e49a669844b0cafb799cb1",
        "applied": false,
        "selectionNote": "El docent prefereix la segona prova; original conservat."
      },
      {
        "code": "S022",
        "part": "dema",
        "text": "Hauria pogut passar el dia mirant els rails i saludant la gent de les parades.",
        "pronunciation": "Preserve Ferran/Algenib, an older warm narrator. In the auxiliary spelling, pronounce two syllables ra-ÍLS, with stress on I, ordinary lateral L and final S. Read only the sentence, no spelling aloud or instructions.",
        "trialId": "S022-rails-dieresis",
        "ttsWord": "raïls",
        "ttsText": "Hauria pogut passar el dia mirant els raïls i saludant la gent de les parades.",
        "canonicalTextChanged": false,
        "status": "applied-validated",
        "originalFile": "assets/audio/repairs/l30-s022-S022-rails-dieresis-original.mp3",
        "candidateFile": "assets/audio/repairs/l30-s022-S022-rails-dieresis-prova.mp3",
        "sourceRawSha256": "7c44d2c01fff3768eb38f6ec5429d388dda661fe91e6580c8d596556e66b7566",
        "batchRequestHash": "e976118d4059a3906fef68d10a896878017b880860e49a669844b0cafb799cb1",
        "applied": true,
        "approvedAt": "2026-11-25",
        "confirmation": "Docent 25/11: de les dues possibilitats de S022, la segona mostrada és molt millor; amb aquesta rectificació pot passar a muntatge.",
        "appliedAt": "2026-11-25",
        "appliedAudio": "./assets/audio/s022-repair-v3.mp3",
        "appliedAudioSha256": "a1799942ca51dafe7a7072302c8dd083485e7f3958a8ebcda5a810b1fcd3c736",
        "validatedAt": "2026-11-25",
        "validatedAudioSha256": "a1799942ca51dafe7a7072302c8dd083485e7f3958a8ebcda5a810b1fcd3c736"
      }
    ],
    "plannedRepair": {
      "status": "applied-validated",
      "speaker": "Ferran",
      "voice": "Algenib",
      "part": "dema",
      "trialIds": [
        "S022-rails-accent",
        "S022-rails-dieresis"
      ],
      "maxNewTrials": 2,
      "source": "Retorn docent 22/11: una o dues oportunitats més abans de recórrer a les vies.",
      "fallback": "les vies",
      "canonicalTextChanged": false,
      "batch": "L30"
    },
    "repairApplicationApproval": {
      "scope": "approved-repair",
      "approvedAt": "2026-11-25",
      "confirmation": "Docent 25/11: de les dues possibilitats de S022, la segona mostrada és molt millor; amb aquesta rectificació pot passar a muntatge.",
      "clips": [
        {
          "part": "dema",
          "trialId": "S022-rails-dieresis",
          "text": "Hauria pogut passar el dia mirant els rails i saludant la gent de les parades.",
          "candidateFile": "assets/audio/repairs/l30-s022-S022-rails-dieresis-prova.mp3",
          "candidateSha256": "f08fc655d43b26f3a9c64f0e0c6bc687fc74f95cfb11b5a0a9ffa602a9ebf7ee",
          "batchRequestHash": "e976118d4059a3906fef68d10a896878017b880860e49a669844b0cafb799cb1"
        }
      ]
    },
    "audioSha256": "a1799942ca51dafe7a7072302c8dd083485e7f3958a8ebcda5a810b1fcd3c736",
    "montageNewSynthesisRequests": 0,
    "editorialFingerprint": "04de5f0434d8120f58e0c1fd7e3f99fb21081f489f7eb7e07d9970941902a4b9",
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "Docent 25/11: S061, S071, S022, S059 i S025 validats per publicació definitiva.",
    "publicationMaterials": {
      "illustration": "./assets/images/s022-publicacio-v1.webp",
      "illustrationSha256": "25d0b0d5726b1fdb9c4250ba21187b9d97ea61ff46e5f4fb486eba7ceb864313",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S016": {
    "state": "published",
    "feedbackAt": "2026-11-20",
    "feedback": [
      {
        "part": "exposicio",
        "word": "Si",
        "phrase": "Si l’estudi avança, l’equip",
        "heard": "ffff l’estudi avança, l’equip",
        "kind": "synthesis-artifact",
        "status": "applied",
        "appliedAt": "2026-11-22"
      }
    ],
    "teacherAssessment": "Inserida la frase validada «Si l’estudi avança», sense l’artefacte inicial. Base comuna de notícies; pendent d’última audició.",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "jingleStatus": "common-news-bed-pending-final-listening",
    "repairPlan": "content/audio-repairs.json",
    "repairComparison": "./proves/correccions-l03.html#S016-exposicio",
    "receivedRepairs": [
      {
        "code": "S016",
        "part": "exposicio",
        "text": "Si l’estudi avança, l’equip voldria preparar una mostra al centre cívic amb fotografies del procés i alguns resultats.",
        "pronunciation": "Start the sentence cleanly with the full word Si: brief /s/ followed by /i/. No breath noise, static, fricative held in place of the word, or added sounds.",
        "status": "applied-awaiting-montage-listening",
        "originalFile": "assets/audio/repairs/l03-s016-exposicio-original.mp3",
        "candidateFile": "assets/audio/repairs/l03-s016-exposicio-prova.mp3",
        "sourceRawSha256": "b91c85a798519ef2c0e7c8fced954bdb56892242aacf02f5cdc467fd95d23481",
        "batchRequestHash": "2dd8d2f2332228b8d700d07edf4dace01afe1ee161060c0ac461952b04ec909f",
        "applied": true,
        "approvedAt": "2026-11-22",
        "confirmation": "S016 quedaria validat amb la veu esmenada. Pots fer remuntatge i comprovem abans de pujar a definitiu",
        "candidateSha256": "a3cfa5ce4d264dda8154588cf346ca2b85ce2f71e04e527ec48c191185271a02",
        "appliedAt": "2026-11-22",
        "appliedAudio": "./assets/audio/s016-news-repair-v3.mp3"
      }
    ],
    "audioSha256": "baf57c1d634be91d9d38759ad236eaec60ed7ef1e74ff8dd2fc425ec6778b508",
    "montageNewSynthesisRequests": 0,
    "reviewUpdate": {
      "audio": "./assets/audio/s016-news-repair-v3.mp3",
      "at": "2026-11-22",
      "summary": {
        "ca": "Inserida la frase validada «Si l’estudi avança», sense l’artefacte inicial. Base comuna de notícies; pendent d’última audició.",
        "es": "Insertada la frase validada «Si l’estudi avança», sin el artefacto inicial. Base común de noticias; pendiente de última escucha."
      }
    },
    "editorialFingerprint": "b6a8cf3a7a6eba437ecdcf784f532f4b389fd376079f228702658fb0bc005f29",
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "confirmation": "S016 validat per publicació definitiva",
    "publicationMaterials": {
      "illustration": "./assets/images/una-troballa-al-jaciment-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S004": {
    "state": "published",
    "validatedAt": "2026-11-20",
    "validatedBy": "docent",
    "confirmation": "S004 es pot publicar definitivament.",
    "audioSha256": "780e096640722d8623d809b0319b76d579c271f1cc12143643ef071b860b15ad",
    "editorialFingerprint": "0980fa81ff2f22d92cd3eaedb50afd1be5ab28c3bf824f74c093aa2825002e76",
    "listeningApproval": true,
    "publicationMaterials": {
      "illustration": "./assets/images/el-boto-de-la-jaqueta-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-20",
      "audioChanged": false
    }
  },
  "ca-S004D": {
    "state": "published",
    "validatedAt": "2026-11-20",
    "validatedBy": "docent",
    "confirmation": "S004D es pot publicar definitivament; música i muntatge validats.",
    "audioSha256": "0678719861a6354cf569771a2be73f5ca561ae1d086907e40a65a317d2e008c4",
    "editorialFingerprint": "1be7f144c88e86d65f69b5609f5c606d35cff4f8e2d74f2e7c2e76006297da8f",
    "listeningApproval": true,
    "publicationMaterials": {
      "illustration": "./assets/images/el-boto-de-la-jaqueta-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-20",
      "audioChanged": false
    }
  },
  "ca-S012": {
    "state": "published",
    "voiceValidation": {
      "approved": true,
      "validatedAt": "2026-11-20",
      "validatedBy": "docent",
      "rawSha256": "80087beb1559c05ba2ed8771b59b258fcf868f3ae8010d7d79bde246e733b7e4",
      "sourceRequestHash": "29dee389b3a66507666baaca9a40d74a6124a3ed31827a57e281cce36ea7e6ff",
      "editorialEdit": {
        "type": "keep-final-suffix",
        "part": "comiat",
        "retainedText": "Gràcies, Elies.",
        "removeStart": 110.355,
        "removeEnd": 118.575,
        "sourceRequestHash": "29dee389b3a66507666baaca9a40d74a6124a3ed31827a57e281cce36ea7e6ff",
        "sourceApprovalFingerprint": "4ef0fb068da5d0e65fdf692b82f1893e8cedcd5e804b29be4db9b42548925c01",
        "reason": "Revisió general de tancaments demanada pel docent: conservar només l’agraïment concret, sense una segona petició de síntesi.",
        "originalText": "Doncs avui torno sense una guitarra nova, però amb una idea nova: primer entendre el problema, després decidir què s’ha de tocar. Gràcies, Elies.",
        "removedSeconds": 8.219999999999999,
        "silenceChecks": [
          {
            "at": 110.355,
            "peakDbFS": -57.4
          },
          {
            "at": 118.575,
            "peakDbFS": -66.8
          }
        ]
      }
    },
    "listeningApproval": true,
    "montageRevision": "v2",
    "teacherAssessment": "Veus i muntatge de guitarra v2 validats pel docent; publicació definitiva.",
    "newSynthesisRequests": 0,
    "validatedAt": "2026-11-20",
    "validatedBy": "docent",
    "confirmation": "S012 validat per publicació definitiva.",
    "audioSha256": "00344e8635392d7cae9b1ab299521bc8544a091d569838d86ad06a7b20ba8b1c",
    "editorialFingerprint": "a9da00b02d5964289cc98025c52bb152aed5f6b8e474e2e3b8cbedb166dabc07",
    "publicationMaterials": {
      "illustration": "./assets/images/qui-arregla-els-instruments-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-20",
      "audioChanged": false
    }
  },
  "ca-S019": {
    "state": "published",
    "voiceValidation": {
      "approved": true,
      "validatedAt": "2026-11-20",
      "validatedBy": "docent",
      "rawSha256": "725ae2c9b9284506445838935bcedba9a9ce433f94adc2fa8e7f702d29c41e2e",
      "sourceRequestHash": "a8924128e778e3dde6202ed8682fc6ea0ffa41cc569060d635aadd677508ecf8"
    },
    "listeningApproval": true,
    "montageRevision": "v2",
    "teacherAssessment": "Muntatge validat amb la condició de retirar la identificació oral del fons. Cinc segons eliminats abans del bucle; resta de la peça i veus conservats.",
    "newSynthesisRequests": 0,
    "editorialFingerprint": "a0a3b10ae3307fd99971ac997f13c74d6a01596d2139b16e567f778b3d481b7f",
    "validatedAt": "2026-11-20",
    "validatedBy": "docent",
    "confirmation": "Si pots modificar aquesta part del muntatge la resta és perfecta i ho validem com a publicació definitiva.",
    "condition": {
      "type": "remove-recording-slate-before-loop",
      "trimSeconds": 5,
      "applied": true
    },
    "audioSha256": "a1942e18c8165e589e2a56ebad412bd8dd2a78da6c337bc3481e51ab37166018",
    "publicationMaterials": {
      "illustration": "./assets/images/una-cuinera-que-no-vol-llencar-menjar-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-20",
      "audioChanged": "Only removal of recording slate before ambience looping; voice preserved"
    }
  },
  "ca-S003": {
    "state": "published",
    "validatedAt": "2026-11-20",
    "validatedBy": "docent",
    "confirmation": "S003 queda validat i es pot publicar.",
    "audioSha256": "a0cadf740e032c69fd50d7fdd33f2fe59290c39dcf0d1e078e3f0145ece8367f",
    "editorialFingerprint": "4cfc02620c695d97c424a2592a16b4837f1cd04f5038cb3e7e35ac97de4fc464",
    "listeningApproval": true,
    "publicationMaterials": {
      "illustration": "./assets/images/el-paraigua-intercanviat-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-20",
      "audioChanged": false
    }
  },
  "ca-S005": {
    "state": "audio-corrections-pending",
    "feedbackAt": "2026-11-20",
    "feedback": [
      {
        "part": "comprovar",
        "word": "matí",
        "heard": "matà",
        "kind": "synthesis-artifact",
        "status": "pending"
      }
    ],
    "teacherAssessment": "La resta de l’entrevista és correcta. Corregir «Aquest matí, per exemple...» i millorar els jingles inicial/final abans de validar definitivament.",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "jingleStatus": "needs-refinement"
  },
  "ca-S015": {
    "state": "audio-corrections-pending",
    "feedbackAt": "2026-11-20",
    "feedback": [
      {
        "part": "llum",
        "word": "temperatura",
        "heard": "temperatira",
        "kind": "synthesis-artifact",
        "status": "pending"
      }
    ],
    "teacherAssessment": "La resta de la peça és correcta. Temperatura pendent de corregir; jingle encara pendent de definir.",
    "plannedNewRequests": 1,
    "repairPlan": "content/audio-repairs.json",
    "listeningApproval": false,
    "jingleStatus": "awaiting-selection"
  },
  "ca-S008": {
    "state": "published",
    "validatedAt": "2026-11-20",
    "validatedBy": "docent",
    "confirmation": "Només falta la pujada musical d’un parell de segons abans de la fosa; resolt això, es pot donar per vàlida i publicar definitivament.",
    "conditionalOnMusicalTail": true,
    "audioSha256": "628116b679215e08f3957c3251e9c4b7657a505e36aa51982f72f02441570c16",
    "editorialFingerprint": "3ce87617ce96e82c39655ecda0a2dc2361e7a54397b5dd12f82d9316a63432ef",
    "listeningApproval": true
  },
  "ca-S018": {
    "state": "published",
    "validatedAt": "2026-11-20",
    "validatedBy": "docent",
    "confirmation": "S018 queda validat per publicació definitiva.",
    "audioSha256": "3e31510ff19626f43fd0b20cccf6a9b9b2ebb38ae4ae175ae399115d535bc2e7",
    "editorialFingerprint": "3600ec0b646cc218e3d5caf2e3bf7f2235b983ad106f100635bf9a4002bfe0a8",
    "listeningApproval": true,
    "publicationMaterials": {
      "illustration": "./assets/images/la-clau-de-l-armari-verd-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-20",
      "audioChanged": false
    }
  },
  "ca-S008R": {
    "state": "published",
    "validatedAt": "2026-11-20",
    "validatedBy": "docent",
    "confirmation": "S008R també validat per publicació definitiva.",
    "audioSha256": "804487e0bfffdc6d64ed15050ae3f9885b1eeb1082dd27ed1c00946a67754837",
    "editorialFingerprint": "a2792c44d38acdb0ccff3c9e4d6b2aeb9b94880c4256697a1f535d1fa66fac69",
    "listeningApproval": true
  },
  "ca-S023": {
    "state": "published",
    "feedbackAt": "2026-11-20",
    "feedback": [
      {
        "part": "tancament",
        "word": "suggeriments",
        "heard": "suggerements o suggeraments",
        "kind": "synthesis-artifact",
        "status": "applied",
        "appliedAt": "2026-11-22"
      }
    ],
    "teacherAssessment": "S023 validat per publicació definitiva; s’accepta la variació de timbre al començament de la frase esmenada per poder avançar.",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "repairPlan": "content/audio-repairs.json",
    "jingleStatus": "common-news-bed-pending-final-listening",
    "editorialFingerprint": "22636665fc727f00d17b0e1349da5b9467ab27a12a049701d4bef3189511f0ad",
    "repairComparison": "./proves/correccions-l03.html#S023-tancament",
    "receivedRepairs": [
      {
        "code": "S023",
        "part": "tancament",
        "text": "D’aquí a un mes, l’associació explicarà què s’ha recollit amb els suggeriments.",
        "pronunciation": "Pronounce suggeriments faithfully, with the vowel I in the stressed sequence -RÍ-ments, never suggerements or suggeraments. Fluent natural Central Catalan; no spelling aloud, no added explanation.",
        "status": "applied-awaiting-montage-listening",
        "originalFile": "assets/audio/repairs/l03-s023-tancament-original.mp3",
        "candidateFile": "assets/audio/repairs/l03-s023-tancament-prova.mp3",
        "sourceRawSha256": "eac80f2575c694144fa2d8ddde29f7bfe58c036b619cb9c97dce39c92f3c0736",
        "batchRequestHash": "2dd8d2f2332228b8d700d07edf4dace01afe1ee161060c0ac461952b04ec909f",
        "applied": true,
        "approvedAt": "2026-11-22",
        "confirmation": "S023 passaria a definitiu amb la frase esmenada; vull sentir el muntatge perquè al principi sona més aguda.",
        "candidateSha256": "8a69e2c30602f8abe56fdd54b9c33ffa59799224d358e6b0498affeab172e4cb",
        "appliedAt": "2026-11-22",
        "appliedAudio": "./assets/audio/s023-news-repair-v3.mp3"
      }
    ],
    "audioSha256": "4bdd9de1339ac05a10e5919dabfb56d30267ce4e12a3882067264e90066190c3",
    "montageNewSynthesisRequests": 0,
    "reviewUpdate": {
      "audio": "./assets/audio/s023-news-repair-v3.mp3",
      "at": "2026-11-22",
      "summary": {
        "ca": "Inserida la frase de suggeriments validada, amb la base comuna de notícies i el mercat conservats. Comprovar la continuïtat del timbre al tancament.",
        "es": "Insertada la frase de sugerencias validada, con la base común de noticias y el mercado conservados. Comprobar la continuidad del timbre al cierre."
      }
    },
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "confirmation": "S023 validat per publicació definitiva; s’accepta la variació de timbre al començament de la frase esmenada per poder avançar.",
    "acceptedLimitations": [
      {
        "part": "tancament",
        "kind": "voice-continuity",
        "acceptedAt": "2026-11-23",
        "note": "A la frase D’aquí a un mes… suggeriments, l’inici de la represa sona amb un timbre diferent; el docent accepta explícitament el resultat. Candidata opcional a revisió futura amb models més estables, sense bloquejar la publicació."
      }
    ],
    "publicationMaterials": {
      "illustration": "./assets/images/reobren-el-mercat-v2.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S007": {
    "state": "published",
    "approvedAt": "2026-11-20T21:20:16.430Z",
    "editorialFingerprint": "f03a087e9d41146d4aa5412dcae0790d65b0c2e46125a3a0cafbe9014081c240",
    "plannedNewRequests": 0,
    "confirmation": "S007 validat per publicació definitiva",
    "reason": "Torn «Llavors podem tenir aigua al voltant sense veure-la?» substituït per Biel. Resta de les veus i pauses netejades conservades; ambient real continu d’aula, sense cadira, paper ni tons finals. Pendent d’audició del muntatge.",
    "quotaHold": {
      "day": "2026-11-20",
      "countedRequests": 10,
      "dailyLimit": 10,
      "notBefore": "2026-11-21T08:00:00.000Z"
    },
    "receivedTakes": {
      "received": [
        "S007-T01",
        "S007-T02"
      ],
      "total": 2,
      "batches": [
        "L10",
        "L02"
      ]
    },
    "voicesReceivedAt": "2026-11-21T10:44:29.283Z",
    "listeningApproval": true,
    "synthesisBatch": "L10+L02",
    "requestHash": "ef97c7456001de385258549f2a355d83acf7942502caa3b39f364da8be1b417f",
    "audioSha256": "4828e5d35d73dec71a4ceb7dbec15047590c2c7dc377cb2fea485624ac434440",
    "montageNewSynthesisRequests": 0,
    "feedbackAt": "2026-11-23",
    "feedback": [
      {
        "part": "montage",
        "kind": "timing-and-effects",
        "word": "Silencis i efectes sobrers",
        "status": "applied"
      },
      {
        "part": "invisible",
        "kind": "voice-identity",
        "word": "Llavors podem tenir aigua al voltant sense veure-la?",
        "heard": "La frase del Biel sona amb la veu de la Laia",
        "status": "applied",
        "appliedAt": "2026-11-23",
        "audio": "./assets/audio/s007-repair-v3.mp3"
      }
    ],
    "voiceApproval": false,
    "plannedRepair": {
      "part": "invisible",
      "speaker": "Biel",
      "text": "Llavors podem tenir aigua al voltant sense veure-la?",
      "status": "applied-validated",
      "sourceTakeSha256": "9135a1b339df1a9f97f5d1701089fb5e62627f4bdb1e20df7534262082370453",
      "voice": "Puck",
      "batch": "L27"
    },
    "repairComparison": "./proves/correccions-l27.html#S007-invisible",
    "receivedRepairs": [
      {
        "code": "S007",
        "part": "invisible",
        "text": "Llavors podem tenir aigua al voltant sense veure-la?",
        "pronunciation": "Use the same youthful male Biel/Puck identity as in the complete recordings, never the female Laia/Leda voice. Read the question naturally. No added breaths or other vocalizations.",
        "status": "applied-validated",
        "originalFile": "assets/audio/repairs/l27-s007-invisible-original.mp3",
        "candidateFile": "assets/audio/repairs/l27-s007-invisible-prova.mp3",
        "sourceRawSha256": "75f355dc0e16071957f1057590e050e668469cc3f22f85afd37fec35c67cee27",
        "sourceTakeId": "S007-T02",
        "sourceTakeSha256": "9135a1b339df1a9f97f5d1701089fb5e62627f4bdb1e20df7534262082370453",
        "batchRequestHash": "a8a1c31ecd69f92c20a41e6a739917e717f6da8007fba6592d62f5d5b553f9c0",
        "applied": true,
        "approvedAt": "2026-11-23",
        "confirmation": "S007 esmenes validades pel docent per incorporar-les i passar a muntatge.",
        "candidateSha256": "26c984c10d536368dadb580403ee8ff8299f341a92d5bf127b9e7b2cad6d6329",
        "appliedAt": "2026-11-23",
        "appliedAudio": "./assets/audio/s007-repair-v3.mp3",
        "validatedAt": "2026-11-23",
        "validatedAudioSha256": "4828e5d35d73dec71a4ceb7dbec15047590c2c7dc377cb2fea485624ac434440"
      }
    ],
    "repairApplicationApproval": {
      "at": "2026-11-23",
      "scope": "approved-repair",
      "confirmation": "S007 esmenes validades pel docent per incorporar-les i passar a muntatge.",
      "clips": [
        {
          "part": "invisible",
          "text": "Llavors podem tenir aigua al voltant sense veure-la?",
          "candidateFile": "assets/audio/repairs/l27-s007-invisible-prova.mp3",
          "candidateSha256": "26c984c10d536368dadb580403ee8ff8299f341a92d5bf127b9e7b2cad6d6329",
          "batchRequestHash": "a8a1c31ecd69f92c20a41e6a739917e717f6da8007fba6592d62f5d5b553f9c0",
          "sourceTakeSha256": "9135a1b339df1a9f97f5d1701089fb5e62627f4bdb1e20df7534262082370453"
        }
      ]
    },
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/on-va-laigua-del-bassal-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S024": {
    "state": "published",
    "approvedAt": "2026-11-20T21:21:39.843Z",
    "editorialFingerprint": "855d05ad6600cb54050b0e927ec7b5ae895132b19d4e590fc609aa6f3a6a1d52",
    "plannedNewRequests": 0,
    "confirmation": "S024 validat per publicació definitiva",
    "reason": "Prova de timbre: últim torn de Biel substituït per la segona versió, més greu. Decisió sobre el timbre pendent d’escoltar-lo dins la conversa; ambient continu d’aula i presentació conservats. Pendent d’audició del muntatge.",
    "quotaHold": {
      "day": "2026-11-20",
      "countedRequests": 10,
      "dailyLimit": 10,
      "notBefore": "2026-11-21T08:00:00.000Z"
    },
    "receivedTakes": {
      "received": [
        "S024-T01"
      ],
      "total": 1,
      "batches": [
        "L02"
      ]
    },
    "voicesReceivedAt": "2026-11-21T10:44:44.638Z",
    "listeningApproval": true,
    "synthesisBatch": "L02",
    "requestHash": "ef2b891a48e5c2823d4527ce9a4c0fc93ae1951ecaad5c7ce07a30ac584a1a66",
    "audioSha256": "dc6a3e1ba9b69ad6715addf156c61889067beb3d316898c3b7374d7b3d524a50",
    "montageNewSynthesisRequests": 0,
    "feedbackAt": "2026-11-22",
    "feedback": [
      {
        "part": "dubtes",
        "word": "I el pas fins a la font",
        "heard": "Veu de Biel excessivament aguda i antinatural al darrer torn",
        "status": "applied",
        "appliedAt": "2026-11-23",
        "audio": "./assets/audio/s024-timbre-trial-v3.mp3"
      }
    ],
    "plannedRepair": {
      "part": "dubtes",
      "speaker": "Biel",
      "text": "I el pas fins a la font! Això ho podem preguntar a la mestra. Després portem el full als altres cursos?",
      "sourceTakeSha256": "1159530cc9e6884898ca2176f65034213df656a40b46ac8933eb6942df5694cf",
      "status": "applied-validated",
      "voice": "Puck",
      "batch": "L27"
    },
    "repairComparison": "./proves/correccions-l27.html#S024-dubtes",
    "receivedRepairs": [
      {
        "code": "S024",
        "part": "dubtes",
        "text": "I el pas fins a la font! Això ho podem preguntar a la mestra. Després portem el full als altres cursos?",
        "pronunciation": "Keep the same natural youthful male Biel/Puck voice throughout. No exaggerated high pitch on I el pas fins a la font. Keep the whole turn conversational, warm and clear.",
        "status": "applied-validated",
        "originalFile": "assets/audio/repairs/l27-s024-dubtes-original.mp3",
        "candidateFile": "assets/audio/repairs/l27-s024-dubtes-prova.mp3",
        "sourceRawSha256": "75f355dc0e16071957f1057590e050e668469cc3f22f85afd37fec35c67cee27",
        "sourceTakeId": "S024-T01",
        "sourceTakeSha256": "1159530cc9e6884898ca2176f65034213df656a40b46ac8933eb6942df5694cf",
        "batchRequestHash": "a8a1c31ecd69f92c20a41e6a739917e717f6da8007fba6592d62f5d5b553f9c0",
        "applied": true,
        "approvedAt": "2026-11-23",
        "confirmation": "El docent prefereix provisionalment la segona versió i demana escoltar-la dins del muntatge complet abans de decidir sobre el timbre.",
        "candidateSha256": "8756e51d4bb0a9a5c23315a6afb7312bcd17d87a14c148f028dbda94b21df9e7",
        "appliedAt": "2026-11-23",
        "appliedAudio": "./assets/audio/s024-timbre-trial-v3.mp3",
        "validatedAt": "2026-11-23",
        "validatedAudioSha256": "dc6a3e1ba9b69ad6715addf156c61889067beb3d316898c3b7374d7b3d524a50"
      }
    ],
    "repairApplicationApproval": {
      "at": "2026-11-23",
      "scope": "provisional-timbre-trial",
      "confirmation": "El docent prefereix provisionalment la segona versió i demana escoltar-la dins del muntatge complet abans de decidir sobre el timbre.",
      "clips": [
        {
          "part": "dubtes",
          "text": "I el pas fins a la font! Això ho podem preguntar a la mestra. Després portem el full als altres cursos?",
          "candidateFile": "assets/audio/repairs/l27-s024-dubtes-prova.mp3",
          "candidateSha256": "8756e51d4bb0a9a5c23315a6afb7312bcd17d87a14c148f028dbda94b21df9e7",
          "batchRequestHash": "a8a1c31ecd69f92c20a41e6a739917e717f6da8007fba6592d62f5d5b553f9c0",
          "sourceTakeSha256": "1159530cc9e6884898ca2176f65034213df656a40b46ac8933eb6942df5694cf"
        }
      ]
    },
    "timbreReview": {
      "status": "approved",
      "trialAudio": "./assets/audio/s024-timbre-trial-v3.mp3",
      "previousAudio": "./assets/audio/s024-classroom-v2.mp3",
      "note": "La segona versió és més greu; el docent vol decidir després d’escoltar-la en context.",
      "validatedAt": "2026-11-23",
      "validatedAudio": "./assets/audio/s024-timbre-trial-v3.mp3",
      "validatedAudioSha256": "dc6a3e1ba9b69ad6715addf156c61889067beb3d316898c3b7374d7b3d524a50",
      "confirmation": "El docent valida definitivament el muntatge complet amb la segona veu del Biel."
    },
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/tres-maneres-de-transformar-el-pati-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S017": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-20T21:35:19.657Z",
    "editorialFingerprint": "fe3ce6ee3d53da22272f4bf6e1dc47ea654ab5a57a6f87bcd3b768caa9e7fa46",
    "plannedNewRequests": 0,
    "confirmation": "S017 també validada per síntesi de veu.",
    "reason": "Guió validat; intervencions de la Mireia i dels alumnes separades per agrupar-les amb les peces que comparteixen les mateixes veus. Cap nova petició fins al restabliment de quota.",
    "quotaHold": {
      "day": "2026-11-20",
      "countedRequests": 10,
      "dailyLimit": 10,
      "notBefore": "2026-11-21T08:00:00.000Z"
    },
    "receivedTakes": {
      "received": [
        "S017-T01",
        "S017-T02"
      ],
      "total": 2,
      "batches": [
        "L05",
        "L02"
      ]
    },
    "voicesReceivedAt": "2026-11-21T10:51:02.684Z",
    "listeningApproval": false,
    "synthesisBatch": "L05+L02",
    "requestHash": "0cd0e1f1a77c62a83d9585980c4d0cdff109eeb42a1712498eee160bb51d70c0",
    "audioSha256": "d32fb1c42ae4db13e44d70696120459ce559545da29b69803f7fa7cb258376ec",
    "montageNewSynthesisRequests": 0,
    "feedbackAt": "2026-11-22",
    "teacherAssessment": "Veus originals acceptades, amb la neteja de respiracions conservada. El muntatge actual passa a audició final.",
    "feedback": [
      {
        "part": "sortida",
        "word": "Respiracions entre 2:28 i 2:41",
        "status": "applied",
        "kind": "nonverbal-padding",
        "removedSeconds": 12.864999999999998
      },
      {
        "part": "coordinacio",
        "word": "Dos últims paràgrafs de Mireia",
        "status": "accepted-original",
        "kind": "voice-identity-and-quality",
        "heard": "Canvi de veu, menys qualitat i crepitar al final.",
        "resolvedAt": "2026-11-26",
        "resolution": "Docent 26/11: S017 validat per muntatge amb la versió original; no aplicar l’esmena rebuda."
      }
    ],
    "plannedRepair": {
      "status": "closed-original-accepted",
      "parts": [],
      "confirmation": "Docent 26/11: S017 validat per muntatge amb la versió original; no aplicar l’esmena rebuda."
    },
    "reviewUpdate": {
      "audio": "./assets/audio/s017-breaths-v2.mp3",
      "at": "2026-11-26",
      "summary": {
        "ca": "Veus originals acceptades; es conserva el muntatge amb les respiracions alienes ja retirades. No s’aplica la represa rebutjada. Pendent d’audició del muntatge.",
        "es": "Voces originales aceptadas; se conserva el montaje con las respiraciones ajenas ya retiradas. No se aplica la retoma rechazada. Pendiente de escuchar el montaje."
      }
    },
    "repairComparison": "./proves/correccions-l40.html#S017-coordinacio",
    "receivedRepairs": [
      {
        "code": "S017",
        "part": "coordinacio",
        "sourceParts": [
          "coordinacio",
          "retorn"
        ],
        "text": "Exacte. L’equip de coordinació confirmarà la sortida de tot el conjunt. Ningú no s’avançarà amb cap caixa.\n\nA cada parada anotaran si falta alguna peça o està malmesa. El registre viatjarà amb les caixes perquè a la parada següent ja coneguin les incidències. Vinga, comencem a escriure i, quan acabeu, Laia, ja podreu pintar, d’acord?",
        "pronunciation": "These two consecutive paragraphs belong to one continuous intervention. Maintain exactly the same mature female voice, natural pitch, clarity and recording quality through both paragraphs. No pause label, breath sounds or change of speaker between them.",
        "status": "rejected-original-preferred",
        "originalFile": "assets/audio/repairs/l40-s017-coordinacio-original.mp3",
        "candidateFile": "assets/audio/repairs/l40-s017-coordinacio-prova.mp3",
        "sourceRawSha256": "b2ca0f5d981a00325ac67d2963f0c278018bf6ef431e1a87219d954159383482",
        "sourceTakeId": "S017-T01",
        "sourceTakeSha256": "042c2641600ef339ec2b25abd546acdb68bff155af377de6933c8aefb3c6a8ea",
        "batchRequestHash": "5808ddd12485a1772a021a21db2f16fa5be9cd4a42ed90c894aaf948ed7a38be",
        "applied": false,
        "rejectedAt": "2026-11-26",
        "rejection": "El docent prefereix conservar les veus originals; la represa no és satisfactòria."
      }
    ],
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-26",
      "scope": "current-cleaned-original-recording",
      "file": "./assets/audio/s017-breaths-v2.mp3",
      "sourceAudioSha256": "d32fb1c42ae4db13e44d70696120459ce559545da29b69803f7fa7cb258376ec",
      "confirmation": "Docent 26/11: S017 validat per muntatge amb la versió original; no aplicar l’esmena rebuda."
    }
  },
  "ca-S014": {
    "state": "published",
    "approvedAt": "2026-11-20T21:41:49.070Z",
    "editorialFingerprint": "5577a01842e59c6384d69ec0c6e55d2f6b7bec8da1c617904b1790887d1af180",
    "plannedNewRequests": 0,
    "confirmation": "S014 validat per publicació definitiva",
    "reason": "Guió validat; preparar un lot compatible de sis a vuit minuts. No enviar una petició curta aïllada.",
    "quotaHold": {
      "day": "2026-11-20",
      "countedRequests": 10,
      "dailyLimit": 10,
      "notBefore": "2026-11-21T08:00:00.000Z"
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S014-T01"
      ],
      "total": 1,
      "batches": [
        "L06"
      ]
    },
    "voicesReceivedAt": "2026-11-21T11:00:39.660Z",
    "listeningApproval": true,
    "synthesisBatch": "L06",
    "requestHash": "a0bcff78c1b77973ff7ddd60722557464823fa57c596f11b98c6ecc64a97223a",
    "audioSha256": "475e05a3be445086651a65e231e257bf6ed17ba662d775740b300a2e21de27c5",
    "montageNewSynthesisRequests": 0,
    "feedbackAt": "2026-11-23",
    "feedback": [
      {
        "part": "final",
        "word": "Respiracions i dos tons finals",
        "status": "applied"
      },
      {
        "part": "pregunta",
        "word": "Efectes inicials i ambient",
        "status": "applied"
      }
    ],
    "reviewUpdate": {
      "audio": "./assets/audio/s014-classroom-v2.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "S’han retirat les respiracions finals, els dos tons i els efectes inicials. Nou fons continu d’aula molt suau; veus i paper conservats. Pendent d’última escolta.",
        "es": "Retiradas las respiraciones finales, los dos tonos y los efectos iniciales. Nuevo fondo continuo de aula muy suave; voces y papel conservados. Pendiente de última escucha."
      }
    },
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/que-passa-dins-duna-llavor-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S009": {
    "state": "published",
    "approvedAt": "2026-11-20T21:58:08.267Z",
    "editorialFingerprint": "0453fed8e5cac1cd63e79e4f017275ccd10b372292204dd46b8cd0dea6a61751",
    "plannedNewRequests": 0,
    "confirmation": "S009 validat per a publicació definitiva",
    "reason": "Guió validat; agrupar amb material compatible d’Erinome fins a completar sis a vuit minuts. Cap petició curta aïllada.",
    "quotaHold": {
      "day": "2026-11-20",
      "countedRequests": 10,
      "dailyLimit": 10,
      "notBefore": "2026-11-21T08:00:00.000Z"
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S009-T01"
      ],
      "total": 1,
      "batches": [
        "L03"
      ]
    },
    "voicesReceivedAt": "2026-11-21T10:58:10.100Z",
    "listeningApproval": true,
    "voicePreview": "./proves/veus-rebudes.html#S009",
    "audioSha256": "9b2c4875e89b8bd10d7281f61ce4228f95723a55baaa697cd03c5441f0b3eda5",
    "montageNewSynthesisRequests": 0,
    "sharedJingle": {
      "status": "catalogue-approved",
      "selected": "ona-curta",
      "note": "Recurs ja aprovat; aquest muntatge encara espera audició."
    },
    "voicePreviewFile": "./assets/audio/s009-voices-review-v1.mp3",
    "reviewUpdate": {
      "audio": "./assets/audio/s009-news-common-v2.mp3",
      "at": "2026-11-22",
      "summary": {
        "ca": "Nova base comuna de notícies, amb entrada i sortida; retirats els papers i jingles anteriors. Pendent d’audició.",
        "es": "Nueva base común de noticias, con entrada y salida; retirados los papeles y jingles anteriores. Pendiente de escucha."
      }
    },
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/la-biblioteca-canvia-d-horari-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S029": {
    "state": "published",
    "approvedAt": "2026-11-21T08:12:38.478Z",
    "editorialFingerprint": "fa74fefaedb636f3748cf77db6196baedbbbda986f210230325f06878aa34e42",
    "plannedNewRequests": 0,
    "confirmation": "S029 validat per publicació definitiva",
    "reason": "Primer paràgraf complet incorporat, inclosa la frase «La plaça del barri acollirà divendres una sessió de cinema a l’aire lliure». Locució inicial actual conservada. Música comuna de notícies molt baixa sota la veu, sense papers ni altres efectes. Pendent d’audició del muntatge.",
    "sharedJingle": {
      "status": "catalogue-approved",
      "selected": "ona-curta",
      "note": "Recurs ja aprovat; aquest muntatge encara espera audició."
    },
    "receivedTakes": {
      "received": [
        "S029-T01"
      ],
      "total": 1,
      "batches": [
        "L10"
      ]
    },
    "voicesReceivedAt": "2026-11-21T10:33:32.469Z",
    "listeningApproval": true,
    "voicePreview": "./proves/veus-rebudes.html#S029",
    "audioSha256": "ba14a5724776db495a87fa23a7b738ea76bf2840d3f32728279dab4bcdd533d1",
    "montageNewSynthesisRequests": 0,
    "voicePreviewFile": "./assets/audio/s029-voices-review-v2.mp3",
    "feedbackAt": "2026-11-23",
    "feedback": [
      {
        "part": "introduction",
        "word": "Notícia de ficció i farciment inicial",
        "status": "applied"
      },
      {
        "part": "anunci",
        "word": "Primera frase omesa pel proveïdor",
        "status": "applied",
        "appliedAt": "2026-11-23",
        "audio": "./assets/audio/s029-repair-v3.mp3"
      }
    ],
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "plannedRepair": {
      "status": "applied-validated",
      "part": "anunci",
      "speaker": "Mar",
      "voice": "Erinome",
      "text": "La plaça del barri acollirà divendres una sessió de cinema a l’aire lliure. L’associació de veïns ha triat una pel·lícula d’aventures per a tots els públics. La projecció començarà quan es faci fosc; per això no tindrà el mateix horari que les activitats de tarda.",
      "scope": "whole-paragraph-for-comparison",
      "approval": "L’afegim al proper lot de la Mar, generant el primer paràgraf sencer i després comparant veu i decidint si tallem només la frase o ens quedem amb tota la síntesi del paràgraf nou",
      "batch": "L25"
    },
    "voiceReviewUpdate": {
      "summary": {
        "ca": "Inici net, sense «Molt bé xic…». La primera frase continua pendent del proper lot de Mar; encara no és una represa nova.",
        "es": "Inicio limpio, sin «Molt bé xic…». La primera frase sigue pendiente del próximo lote de Mar; todavía no es una nueva toma."
      }
    },
    "repairComparison": "./proves/correccions-l25.html#S029-anunci",
    "receivedRepairs": [
      {
        "code": "S029",
        "part": "anunci",
        "text": "La plaça del barri acollirà divendres una sessió de cinema a l’aire lliure. L’associació de veïns ha triat una pel·lícula d’aventures per a tots els públics. La projecció començarà quan es faci fosc; per això no tindrà el mateix horari que les activitats de tarda.",
        "pronunciation": "Preserve the first sentence starting La plaça del barri acollirà. Acollirà has final stressed À. Keep a natural continuous newsreader delivery across the whole paragraph.",
        "status": "applied-validated",
        "originalFile": "assets/audio/repairs/l25-s029-anunci-original.mp3",
        "candidateFile": "assets/audio/repairs/l25-s029-anunci-prova.mp3",
        "sourceRawSha256": "490b279a9670c6bb48737b04668af2d9cf14d0fe56bc165f26dccc2e518beba4",
        "sourceTakeId": "S029-T01",
        "sourceTakeSha256": "8965bab558d63722894ab08f1f5467a11a2e75d3366fc5539b9cb0e055144c2c",
        "batchRequestHash": "4e3ed06c613d1750826947314242be6a728fc3ca9f7dbf20d554f3768035a399",
        "applied": true,
        "approvedAt": "2026-11-23",
        "confirmation": "S029 esmenes validades pel docent per incorporar-les i passar a muntatge.",
        "candidateSha256": "be9559fb934a8c2076d782664354403ed2b7d920d68172d2f290a715bbe04e87",
        "appliedAt": "2026-11-23",
        "appliedAudio": "./assets/audio/s029-repair-v3.mp3",
        "validatedAt": "2026-11-23",
        "validatedAudioSha256": "ba14a5724776db495a87fa23a7b738ea76bf2840d3f32728279dab4bcdd533d1"
      }
    ],
    "repairApplicationApproval": {
      "at": "2026-11-23",
      "scope": "approved-repair",
      "confirmation": "S029 esmenes validades pel docent per incorporar-les i passar a muntatge.",
      "clips": [
        {
          "part": "anunci",
          "text": "La plaça del barri acollirà divendres una sessió de cinema a l’aire lliure. L’associació de veïns ha triat una pel·lícula d’aventures per a tots els públics. La projecció començarà quan es faci fosc; per això no tindrà el mateix horari que les activitats de tarda.",
          "candidateFile": "assets/audio/repairs/l25-s029-anunci-prova.mp3",
          "candidateSha256": "be9559fb934a8c2076d782664354403ed2b7d920d68172d2f290a715bbe04e87",
          "batchRequestHash": "4e3ed06c613d1750826947314242be6a728fc3ca9f7dbf20d554f3768035a399",
          "sourceTakeSha256": "8965bab558d63722894ab08f1f5467a11a2e75d3366fc5539b9cb0e055144c2c"
        }
      ]
    },
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/el-cinema-surt-a-la-placa-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S026": {
    "state": "published",
    "approvedAt": "2026-11-21T08:26:58.368Z",
    "editorialFingerprint": "ce521dfe093a86a1b1b4c1f5e78a52a3b7ba0bb7546911cb5c1831df46cfab3b",
    "plannedNewRequests": 0,
    "confirmation": "S026 validat per publicació definitiva",
    "reason": "Guió validat; presa completa incorporada al lot candidat L06, amb les veus i el text autoritzats. Enviament només després de preparar el payload i completar la finestra de sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S026-T01"
      ],
      "total": 1,
      "batches": [
        "L06"
      ]
    },
    "voicesReceivedAt": "2026-11-21T10:59:26.258Z",
    "listeningApproval": true,
    "synthesisBatch": "L06",
    "requestHash": "a0bcff78c1b77973ff7ddd60722557464823fa57c596f11b98c6ecc64a97223a",
    "audioSha256": "781bcc5bcdec191eeac21566d1feded42b583b764dda9b012bbb4c957d03bc74",
    "montageNewSynthesisRequests": 0,
    "feedbackAt": "2026-11-23",
    "feedback": [
      {
        "part": "introduction",
        "kind": "nonverbal-padding",
        "word": "Respiracions inicials",
        "status": "applied"
      },
      {
        "part": "final",
        "kind": "spoken-directive",
        "word": "long pause",
        "status": "applied"
      },
      {
        "part": "salutacio",
        "kind": "ambience",
        "word": "Volum inicial",
        "status": "applied"
      }
    ],
    "reviewUpdate": {
      "audio": "./assets/audio/s026-clean-v2.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Inici net sense respiracions, ambient d’entrada més suau i retirat el long pause final. La resta de la parla es conserva; pendent d’última escolta.",
        "es": "Inicio limpio sin respiraciones, ambiente de entrada más suave y retirado el long pause final. El resto del habla se conserva; pendiente de última escucha."
      }
    },
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/revisem-les-caixes-de-jocs-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S030": {
    "state": "published",
    "approvedAt": "2026-11-21T09:14:33.051Z",
    "editorialFingerprint": "b24907fceb197acf6e01c59fd2a342ef93fb18282a968a8117ee2004347f244b",
    "plannedNewRequests": 0,
    "confirmation": "S030 validat per publicació definitiva",
    "reason": "Guió validat; presa Biel/Puck i Laia/Leda al lot candidat L08, pendent de material compatible fins a completar sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S030-T01"
      ],
      "total": 1,
      "batches": [
        "L08"
      ]
    },
    "voicesReceivedAt": "2026-11-21T11:03:28.518Z",
    "listeningApproval": true,
    "synthesisBatch": "L08",
    "requestHash": "ac8a3b34fa098dc7a38e788b2cadc9c81d3039b44c7af229a4c9c104184e94cc",
    "audioSha256": "e837429937d4e727b17233c010b2c3b91b2e03e3a50ae895069b318dce71894f",
    "montageNewSynthesisRequests": 0,
    "timingRevision": {
      "baseFile": "s030-mixed-v1.mp3",
      "baseAudioSha256": "5bd573e478044598f579fbbdc9693b5a7bd2404f0bb62949372b81833955d877",
      "intro": {
        "cuts": [
          {
            "first": 12000,
            "last": 321546,
            "start": 0.25,
            "end": 6.698875,
            "seconds": 6.448875,
            "maximumDbFS": -57.84401289123635
          },
          {
            "first": 482848,
            "last": 597734,
            "start": 10.059333333333333,
            "end": 12.452791666666666,
            "seconds": 2.3934583333333332,
            "maximumDbFS": -56.86704154048001
          }
        ],
        "removedSeconds": 8.842333333333332,
        "retainedPcmSha256": "065a60eb74591ed9ade66ab4894c15477b234ae0abb7a08ec9d5ebb922796154"
      },
      "body": {
        "cuts": [
          {
            "first": 119568,
            "last": 238319,
            "start": 2.491,
            "end": 4.964979166666667,
            "seconds": 2.4739791666666666,
            "maximumDbFS": -43.50011640239199
          },
          {
            "first": 2224083,
            "last": 2248559,
            "start": 46.3350625,
            "end": 46.84497916666667,
            "seconds": 0.5099166666666667,
            "maximumDbFS": -56.86704154048001
          },
          {
            "first": 2627072,
            "last": 2650320,
            "start": 54.730666666666664,
            "end": 55.215,
            "seconds": 0.48433333333333334,
            "maximumDbFS": -54.891958466351475
          },
          {
            "first": 3300721,
            "last": 3328560,
            "start": 68.76502083333334,
            "end": 69.345,
            "seconds": 0.5799791666666667,
            "maximumDbFS": -52.46710664538475
          }
        ],
        "removedSeconds": 4.048208333333333,
        "retainedPcmSha256": "8873bf27b50df7af09d7b1e388b88ab340350f90126b10cede727ad151ec9ebe"
      },
      "tailEdit": {
        "start": 74.29502083333334,
        "end": 87.92579166666667,
        "canonicalLastWordEnd": 73.79500000000002,
        "reason": "Unrequested post-speech breath, long padding and delayed closing footsteps",
        "cutPeakDbFS": -58.053321564799646
      },
      "quietThresholdDbFS": -42,
      "allRetainedSamplesIdentical": true,
      "newRequests": 0,
      "originalPreserved": true
    },
    "timingComparison": "./proves/pauses-s011-s027.html#S030",
    "reviewUpdate": {
      "audio": "./assets/audio/s030-corridor-v3.mp3",
      "at": "2026-11-22",
      "summary": {
        "ca": "Retirat el full inicial; ambient continu de passadís. Es conserva el so de despenjar-lo. Pendent d’última audició.",
        "es": "Retirado el papel inicial; ambiente continuo de pasillo. Se conserva el sonido de descolgarlo. Pendiente de última escucha."
      }
    },
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/el-cartell-del-passadis-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S040": {
    "state": "published",
    "approvedAt": "2026-11-21T09:14:33.054Z",
    "editorialFingerprint": "9b473e233db4c7f7f7b9196e420d424d957c6234b8fe9cad6d22cc003968e837",
    "plannedNewRequests": 0,
    "confirmation": "S040 validat per publicació definitiva",
    "reason": "Guió validat; presa Laia/Leda i Nora/Kore al lot candidat L07, pendent de material compatible fins a completar sis a vuit minuts.",
    "sharedJingle": {
      "status": "awaiting-selection",
      "programme": "radio-escola",
      "note": "Capçalera de programa proposada, pendent de seleccionar abans del muntatge; les veus estan autoritzades."
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S040-T01"
      ],
      "total": 1,
      "batches": [
        "L15"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "4ee871db71b9d8181d98a0d29200e0d669c6485a60bb0c89fbcc8800613b78f6",
      "confirmation": "S040 validat per muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T07:54:36.082Z",
    "listeningApproval": true,
    "voicePreview": "./proves/veus-rebudes.html#S040",
    "voicePreviewFile": "./assets/audio/s040-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T12:30:14.021Z",
    "synthesisBatch": "L15",
    "requestHash": "4029137e3ef3992d6500ac463d9bda81a70330519489e94b9b732c48068f744e",
    "audioSha256": "8037444961d61e4df209109e2b4c6cf24991a65b803a0e0ef6121712639a9662",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/una-exposicio-que-es-pugui-escoltar-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S028": {
    "state": "published",
    "approvedAt": "2026-11-21T09:30:54.245Z",
    "editorialFingerprint": "60d237b4aca93b17fd9e1cc8de99be6b29477b994acb1e0d8c544e6d2f28a0ab",
    "plannedNewRequests": 0,
    "confirmation": "S028 validat per publicació definitiva",
    "reason": "Guió validat; presa completa incorporada al lot candidat L09, amb les veus i el text autoritzats. Enviament només després de preparar el payload i completar la finestra de sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S028-T01"
      ],
      "total": 1,
      "batches": [
        "L14"
      ]
    },
    "voicesReceivedAt": "2026-11-22T17:59:05.187Z",
    "listeningApproval": true,
    "voicePreview": "./proves/veus-rebudes.html#S028",
    "voicePreviewFile": "./assets/audio/s028-voices-review-v1.mp3",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "f07de87cfb248b09c2936e6ed21bee71bef4799fa2c5b4bbaf4b0fd282bc08f5",
      "confirmation": "S028 validat per muntatge"
    },
    "mountedAt": "2026-11-23T12:30:04.141Z",
    "synthesisBatch": "L14",
    "requestHash": "3dc116c991de11e684329bf9e8f8214a417a540d0372103bba92af6fd28651bd",
    "audioSha256": "453ab40c3fc67177775ca0aaa22bce17df3a4be3757bcf809af3dbe81df10690",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/una-parada-abans-dobrir-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S032": {
    "state": "published",
    "approvedAt": "2026-11-21T09:30:54.248Z",
    "editorialFingerprint": "f60ed5aafd6bb7bb00a4de7e5c96cbc3f08c2b3a7d9e31f457a41c24f863338b",
    "plannedNewRequests": 1,
    "confirmation": "S032 validada per publicació després de retirar els dos long pause i el silenci inicial.",
    "reason": "Guió validat; presa completa incorporada al lot candidat L01, amb les veus i el text autoritzats. Enviament només després de preparar el payload i completar la finestra de sis a vuit minuts.",
    "voicesReceivedAt": "2026-11-21T10:05:32.024Z",
    "synthesisBatch": "L01",
    "requestHash": "0cd61066dabfeb8992968fa3e45c9f95dd07621aa58ca5a919a5e873cee48df7",
    "audioSha256": "ecd895f83f19979fc3b422bd8abf20dab74dfac7c963c7daf8f0e82f370b60b6",
    "listeningApproval": true,
    "montageNewSynthesisRequests": 0,
    "directiveRevision": {
      "originalFile": "s032-mixed-v1.mp3",
      "originalSha256": "d07403baa3519b44ed0a04f81021f042829a2382569d630dd63f2ccdd9b2cfd2",
      "removed": [
        "long pause",
        "long pause"
      ],
      "recognizedAs": [
        "l'ong",
        "pos",
        "l'opus"
      ],
      "retainedTitleRange": {
        "start": 6.63,
        "end": 10.88
      },
      "canonicalTitleRange": {
        "start": 6.8700000000000045,
        "end": 10.530000000000001
      },
      "retainedTitlePcmSha256": "d456f9dfa31a6e03a4a20eb149aa14f7aa051d07640be94141a0fd74fd8355a9",
      "bodyPcmSha256": "f2ff94238917caf4e40ac0cf8c794a178d9ea0280dc9a7aa218e86edaf802ccd",
      "bodyUnchanged": true,
      "decodedPublishedTracks": true,
      "bodyTrackSha256": "11a30a1e803403893c605d8be74677b4648e80d2aa46125c1f58c8746af780af",
      "voiceRetimed": false,
      "newRequests": 0
    },
    "teacherAssessment": "Dues instruccions long pause i farciment inicial retirats; resta de l’àudio validada pel docent.",
    "feedback": [
      {
        "part": "introduction",
        "status": "applied",
        "type": "spoken-directive",
        "note": "Dues locucions long pause no demanades retallades en silencis; títol canònic conservat."
      }
    ],
    "validatedAt": "2026-11-21",
    "validatedBy": "docent",
    "condition": {
      "spokenDirectivesRemoved": 2,
      "initialPaddingRemoved": true,
      "bodyTrackUnchanged": true,
      "sourceMasterSha256": "d07403baa3519b44ed0a04f81021f042829a2382569d630dd63f2ccdd9b2cfd2"
    },
    "publicationMaterials": {
      "illustration": "./assets/images/una-ruta-amb-pistes-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-21",
      "audioChanged": true,
      "change": "Retall inicial autoritzat, sense alterar la pista del cos."
    }
  },
  "ca-S034": {
    "state": "published",
    "approvedAt": "2026-11-21T09:30:54.248Z",
    "editorialFingerprint": "51f471384e53ef49bb40a84025d12353ab727b0ef1ca2fdf9730630c68cf7041",
    "plannedNewRequests": 0,
    "confirmation": "S034 validat per publicació definitiva",
    "reason": "Guió validat; presa completa incorporada al lot candidat L10, amb les veus i el text autoritzats. Enviament només després de preparar el payload i completar la finestra de sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S034-T01"
      ],
      "total": 1,
      "batches": [
        "L13"
      ]
    },
    "voicesReceivedAt": "2026-11-21T11:06:23.837Z",
    "listeningApproval": true,
    "synthesisBatch": "L13",
    "requestHash": "ab02e5a56a6807f106885dd5b8e4749ed77c2b2461e93dc71243142194efb2a3",
    "audioSha256": "f08591a55b092201f4affc58953249a06d0413217aec26db1e067cce8d730f3c",
    "montageNewSynthesisRequests": 0,
    "ambienceRevision": {
      "originalFile": "s034-mixed-v1.mp3",
      "originalSha256": "32bd2e3f3eb11643c03119096711059b01d172a1b01a4dcb9691ee713c569d81",
      "removedSource": "callmethefoo-744447",
      "voiceInputSha256": "dfa2e571ac60a0cde06a49eb797a78a737a064f739e205436c85803d57557257",
      "musicInputSha256": "4689a77ff452b7dfb0f7af8e7575c8028024989874cc171d5f052731c1da14f6",
      "sameVoiceAndMusicInputs": true,
      "voiceRetimed": false,
      "newRequests": 0,
      "source": "tools/remove-s038-opening-ambience.cjs",
      "chairInputSha256": "3b35dcdd154fa0bf271e1be4224b11ba06b04ef3016f037e10ffa26d5a0299ab",
      "chairTimingUnchanged": true,
      "authorization": "Docent 23/11: retirar l’ambient inicial de cortines/sala; conservar la cadira i la resta del muntatge."
    },
    "feedbackAt": "2026-11-23",
    "feedback": [
      {
        "part": "record",
        "kind": "ambience",
        "word": "Ambient inicial",
        "status": "applied",
        "note": "Retirat el so inicial de sala/cortines; cadira, música i veus conservades."
      }
    ],
    "reviewUpdate": {
      "audio": "./assets/audio/s034-no-ambience-v2.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Retirat l’ambient inicial. Es conserven el so de la cadira, les veus, la música i la durada; pendent d’última escolta.",
        "es": "Retirado el ambiente inicial. Se conservan la silla, las voces, la música y la duración; pendiente de última escucha."
      }
    },
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/lassaig-que-semblava-una-funcio-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S038": {
    "state": "published",
    "approvedAt": "2026-11-21T09:30:54.249Z",
    "editorialFingerprint": "85b48ca59c4fec6ee3244420edddf7c84d4057c81ea499d670b43e0f28c8d7fa",
    "plannedNewRequests": 1,
    "confirmation": "S038 veus validades i publicació definitiva un cop retirat el so inicial de plaça.",
    "reason": "Guió validat; presa completa incorporada al lot candidat L10, amb les veus i el text autoritzats. Enviament només després de preparar el payload i completar la finestra de sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S038-T01"
      ],
      "total": 1,
      "batches": [
        "L13"
      ]
    },
    "voicesReceivedAt": "2026-11-21T11:06:30.499Z",
    "listeningApproval": true,
    "synthesisBatch": "L13",
    "requestHash": "ab02e5a56a6807f106885dd5b8e4749ed77c2b2461e93dc71243142194efb2a3",
    "audioSha256": "dd2ddd2d5536185f6cf5c046819f59ab3eb80d46b7675ffe0e7d4dde5481e13a",
    "montageNewSynthesisRequests": 0,
    "ambienceRevision": {
      "originalFile": "s038-mixed-v1.mp3",
      "originalSha256": "4b3df824ba8c8676e8d7cb9945af093c0956deb97e9e072c06ef67d8468b4e42",
      "removedSource": "hz37-792502",
      "voiceInputSha256": "12c0e10867920f7e25c7ccd2e666139dfebb7ff2ccab76d13a5e00e162e2612a",
      "musicInputSha256": "2a4d87d7b3f2877d5cfdb2d767de41ad7955b377cfbbc0dfe71db9cab59a478c",
      "sameVoiceAndMusicInputs": true,
      "voiceRetimed": false,
      "newRequests": 0,
      "source": "tools/remove-s038-opening-ambience.cjs",
      "authorization": "Docent: S038 veus validades; retirar el so inicial de plaça i publicar definitivament."
    },
    "validatedAt": "2026-11-21",
    "validatedBy": "docent",
    "condition": {
      "openingAmbienceRemoved": true,
      "sameVoiceAndMusicInputs": true,
      "sourceMasterSha256": "4b3df824ba8c8676e8d7cb9945af093c0956deb97e9e072c06ef67d8468b4e42"
    },
    "publicationMaterials": {
      "illustration": "./assets/images/el-banc-que-havien-mogut-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-21",
      "audioChanged": true,
      "change": "Retirada de l’ambient inicial autoritzada expressament pel docent."
    }
  },
  "ca-S042": {
    "state": "published",
    "approvedAt": "2026-11-21T09:30:54.249Z",
    "editorialFingerprint": "bf27ec79e8071b72b5595898d97abfd912a1dd89a23f8659ee14b297da6a2696",
    "plannedNewRequests": 0,
    "confirmation": "S042 validat per publicació definitiva",
    "reason": "Guió validat; presa completa incorporada al lot candidat L05, amb les veus i el text autoritzats. Enviament només després de preparar el payload i completar la finestra de sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S042-T01"
      ],
      "total": 1,
      "batches": [
        "L06"
      ]
    },
    "voicesReceivedAt": "2026-11-21T10:59:41.341Z",
    "listeningApproval": true,
    "synthesisBatch": "L06",
    "requestHash": "a0bcff78c1b77973ff7ddd60722557464823fa57c596f11b98c6ecc64a97223a",
    "audioSha256": "7fc840a4469df4e5d9881d3c482435255013f078ed94a331901c918c545e4f11",
    "montageNewSynthesisRequests": 0,
    "feedbackAt": "2026-11-23",
    "feedback": [
      {
        "part": "introduction",
        "word": "Respiracions i pauses inicials",
        "status": "applied"
      },
      {
        "part": "final",
        "word": "long pause i espera final",
        "status": "applied"
      }
    ],
    "reviewUpdate": {
      "audio": "./assets/audio/s042-timing-v2.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Inici net i directe, retirats el long pause i l’espera final. Full conservat al mateix punt de la conversa; cadira acostada a l’última frase.",
        "es": "Inicio limpio y directo, retirados el long pause y la espera final. Papel conservado en el mismo punto de la conversación; silla acercada a la última frase."
      }
    },
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/dos-camins-amb-la-mateixa-mitjana-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S035": {
    "state": "published",
    "approvedAt": "2026-11-21T09:34:44.906Z",
    "editorialFingerprint": "2fa6ee5433fed66fed795ca61ad1dc6604b87c6756d6827d69dbd2fda2228b23",
    "plannedNewRequests": 0,
    "confirmation": "S035 validat per publicació definitiva",
    "reason": "Guió validat; presa completa incorporada al lot candidat L11, amb les veus i el text autoritzats. Enviament només després de preparar el payload i completar la finestra de sis a vuit minuts.",
    "receivedTakes": {
      "received": [
        "S035-T01"
      ],
      "total": 1,
      "batches": [
        "L05"
      ]
    },
    "voicesReceivedAt": "2026-11-21T10:51:10.846Z",
    "listeningApproval": true,
    "synthesisBatch": "L05",
    "requestHash": "3a86ff8ea619d9fa32f7582a144656f791631478c642722f8e98ef6e5c8a5eb0",
    "audioSha256": "0ba711c71f5fa39b7c85eac84f1f1c5d8ca639f3087c8c3aa8ea285e6dc76699",
    "montageNewSynthesisRequests": 0,
    "feedbackAt": "2026-11-23",
    "feedback": [
      {
        "part": "introduction",
        "word": "Silenci inicial i long pause",
        "kind": "spoken-directive-and-padding",
        "status": "applied"
      },
      {
        "part": "final",
        "kind": "tail",
        "word": "Ambient final massa llarg",
        "status": "applied"
      }
    ],
    "reviewUpdate": {
      "audio": "./assets/audio/s035-tail-v3.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Final més curt: mig segon després de «em deixes la goma?», pujada de l’ambient, dos segons sostinguts i fosa. Veus i paper conservats; pendent d’última escolta.",
        "es": "Final más corto: medio segundo tras la última frase, subida del ambiente, dos segundos sostenidos y fundido. Voces y papel conservados; pendiente de última escucha."
      }
    },
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/una-pregunta-per-al-menjador-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S037": {
    "state": "published",
    "approvedAt": "2026-11-21T09:35:53.798Z",
    "editorialFingerprint": "bdefa531a970256f3dd5a8e5129c3df186dfa753301ebbadbfc33fe374f05d0e",
    "plannedNewRequests": 0,
    "confirmation": "S037 validat per publicació definitiva",
    "reason": "Guió validat; presa completa incorporada al lot candidat L08, amb les veus i el text autoritzats. Enviament només després de preparar el payload i completar la finestra de sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S037-T01"
      ],
      "total": 1,
      "batches": [
        "L08"
      ]
    },
    "voicesReceivedAt": "2026-11-21T11:03:34.205Z",
    "listeningApproval": true,
    "synthesisBatch": "L08",
    "requestHash": "ac8a3b34fa098dc7a38e788b2cadc9c81d3039b44c7af229a4c9c104184e94cc",
    "audioSha256": "7d35cbadf7bcf7983c13c1bc62322a555e32f37585b0040ea50893b2dc79112f",
    "montageNewSynthesisRequests": 0,
    "feedbackAt": "2026-11-23",
    "feedback": [
      {
        "part": "montage",
        "kind": "timing-and-effects",
        "word": "Silencis i efectes sobrers",
        "status": "applied"
      }
    ],
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/quin-avis-es-el-bo-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S025": {
    "state": "published",
    "approvedAt": "2026-11-21T09:36:38.025Z",
    "editorialFingerprint": "6d363e23677c4844086a5e1e6b60de8ff01f1c53df3cd6f312200eb3b7db0405",
    "plannedNewRequests": 0,
    "confirmation": "Docent 25/11: S061, S071, S022, S059 i S025 validats per publicació definitiva.",
    "reason": "Guió validat; presa completa incorporada al lot candidat L08, amb les veus i el text autoritzats. Enviament només després de preparar el payload i completar la finestra de sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S025-T01"
      ],
      "total": 1,
      "batches": [
        "L08"
      ]
    },
    "voicesReceivedAt": "2026-11-21T11:03:22.952Z",
    "listeningApproval": true,
    "synthesisBatch": "L08",
    "requestHash": "ac8a3b34fa098dc7a38e788b2cadc9c81d3039b44c7af229a4c9c104184e94cc",
    "audioSha256": "8374fb7e0d00d6526d249c4931812caf5716a1a45fa9e250d24699c31d5ff805",
    "montageNewSynthesisRequests": 0,
    "timingRevision": {
      "baseFile": "s025-mixed-v1.mp3",
      "baseAudioSha256": "e5769997c7ce12116558b76240833a604be36474cd6f10c7df88b07a3d89751f",
      "intro": {
        "cuts": [],
        "removedSeconds": 0,
        "retainedPcmSha256": "e76556ef4dad3a845b407df52598477aa205a2b21e6f3b7d4f6f64461da23302"
      },
      "body": {
        "cuts": [
          {
            "first": 12000,
            "last": 123854,
            "start": 0.25,
            "end": 2.5802916666666667,
            "seconds": 2.3302916666666667,
            "maximumDbFS": -120
          },
          {
            "first": 2368244,
            "last": 2440192,
            "start": 49.33841666666667,
            "end": 50.83733333333333,
            "seconds": 1.4989166666666667,
            "maximumDbFS": -49.48114499602986
          },
          {
            "first": 2545517,
            "last": 2988030,
            "start": 53.03160416666667,
            "end": 62.250625,
            "seconds": 9.219020833333333,
            "maximumDbFS": -43.1122890523966
          }
        ],
        "removedSeconds": 13.048229166666667,
        "retainedPcmSha256": "54fc56600024e5f29aa1e1f499d3e904c635428ff4c9d7c68f23bb24d0e7cfc4"
      },
      "tailEdit": null,
      "effectsRemoved": [
        "brnck-257357",
        "funkysandwich-871017"
      ],
      "quietThresholdDbFS": -42,
      "allRetainedSamplesIdentical": true,
      "newRequests": 0,
      "originalPreserved": true
    },
    "teacherAssessment": "Veus, esmenes incorporades i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "feedback": [
      {
        "part": "final",
        "type": "pronunciation",
        "status": "applied",
        "note": "El docent sent premre en lloc de prémer. Cap petició nova enviada.",
        "word": "prémer",
        "appliedAt": "2026-11-25",
        "appliedAudio": "./assets/audio/s025-repair-v3.mp3",
        "resolution": "Presa validada pel docent incorporada; muntatge complet pendent d’audició."
      },
      {
        "part": "reaccio",
        "type": "editorial-ambiguity",
        "status": "deferred",
        "note": "Tot sol es refereix a l’altaveu. El docent manté la frase sense regenerar i la tornarà a valorar en la pròxima audició."
      },
      {
        "part": "effects",
        "type": "montage",
        "status": "applied",
        "note": "Eliminats clic inicial i moviment final de cadira; silencis tècnics reduïts."
      }
    ],
    "repairComparison": "./proves/correccions-l31.html#S025-final",
    "receivedRepairs": [
      {
        "code": "S025",
        "part": "final",
        "text": "D’acord. I després la deixem preparada per al grup. Aquesta vegada em toca prémer el botó a mi!",
        "pronunciation": "Keep Laia/Leda youthful and natural. Pronounce prémer fluently with its M before the final ER, never prémre. Read only the supplied complete turn.",
        "status": "applied-validated",
        "originalFile": "assets/audio/repairs/l31-s025-final-original.mp3",
        "candidateFile": "assets/audio/repairs/l31-s025-final-prova.mp3",
        "sourceRawSha256": "56e38fc4c127a624b3e598d3dfb83d3e73a61ee7ab639a0f984c6a91f1b92c24",
        "sourceTakeId": "S025-T01",
        "sourceTakeSha256": "96daab49592b1dcc9c0c965c97b39c9ade39b1ba56d2e44a738f15ebad3a61bc",
        "batchRequestHash": "a60fe358a66004eba2e6b742133d7f9780780baf5a8739a3a428828c3e6fa590",
        "applied": true,
        "approvedAt": "2026-11-25",
        "confirmation": "Docent 25/11: S025 validada amb la frase rectificada, llesta per pujar a muntatge.",
        "appliedAt": "2026-11-25",
        "appliedAudio": "./assets/audio/s025-repair-v3.mp3",
        "appliedAudioSha256": "8374fb7e0d00d6526d249c4931812caf5716a1a45fa9e250d24699c31d5ff805",
        "validatedAt": "2026-11-25",
        "validatedAudioSha256": "8374fb7e0d00d6526d249c4931812caf5716a1a45fa9e250d24699c31d5ff805"
      }
    ],
    "repairApplicationApproval": {
      "scope": "approved-repair",
      "approvedAt": "2026-11-25",
      "confirmation": "Docent 25/11: S025 validada amb la frase rectificada, llesta per pujar a muntatge.",
      "clips": [
        {
          "part": "final",
          "text": "D’acord. I després la deixem preparada per al grup. Aquesta vegada em toca prémer el botó a mi!",
          "candidateFile": "assets/audio/repairs/l31-s025-final-prova.mp3",
          "candidateSha256": "a028c52cfd4285a655db893a8fe025831d0c594c24db55fa03526172f04d5e48",
          "batchRequestHash": "a60fe358a66004eba2e6b742133d7f9780780baf5a8739a3a428828c3e6fa590"
        }
      ]
    },
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/s025-publicacio-v1.webp",
      "illustrationSha256": "7cc4f168f33c565a2476d02ecf21bbb6cfa922c0055c1d8600dcd53b0e9c0e8f",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S033": {
    "state": "published",
    "approvedAt": "2026-11-21T09:39:11.371Z",
    "editorialFingerprint": "78057d818af76f754ac112a9dd21909917ebc33db3849f896953aac443ef1c68",
    "plannedNewRequests": 0,
    "confirmation": "S033 validat per publicació definitiva i recatalogat com a entrevista",
    "reason": "Guió validat; lot candidat L12 amb Biel/Puck i Nora/Kore, pendent de completar sis a vuit minuts amb material compatible.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S033-T01"
      ],
      "total": 1,
      "batches": [
        "L12"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "477f735a0181ccb0c1327bf79b885e5383daed5674b32c55b7114b9913adb7b1",
      "confirmation": "S033 validat per muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T07:56:34.756Z",
    "listeningApproval": true,
    "voicePreview": "./proves/veus-rebudes.html#S033",
    "voicePreviewFile": "./assets/audio/s033-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T12:30:32.411Z",
    "synthesisBatch": "L12",
    "requestHash": "cf4fb54b372f5e1cb7545d9fa0b7d6a0309eedf94004593133ebe93bc0bb6bc6",
    "audioSha256": "1a6797ab4788ad9547dcf0cc93ecee3b446f59f04a6301a870eab3dd75df4505",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/qui-tria-que-es-mostra-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S038D": {
    "state": "published",
    "approvedAt": "2026-11-21T09:48:19.444Z",
    "editorialFingerprint": "d51a4936f657bdd6a1542479be9c8313818d1aa01baab1d8d87ba499263f780d",
    "plannedNewRequests": 1,
    "confirmation": "S038D validada definitivament després de retirar l’ambient inicial.",
    "reason": "Variant dialogada validada per a veus; agrupar Zephyr/Algenib sense tornar a sintetitzar la narració S038.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S038D-T01"
      ],
      "total": 1,
      "batches": [
        "L13"
      ]
    },
    "voicesReceivedAt": "2026-11-21T11:06:39.033Z",
    "listeningApproval": true,
    "synthesisBatch": "L13",
    "requestHash": "ab02e5a56a6807f106885dd5b8e4749ed77c2b2461e93dc71243142194efb2a3",
    "audioSha256": "2d405791fdda6dee489fbb47c0a49b04423376b991fbbc7a0146c8e66c96bca7",
    "montageNewSynthesisRequests": 0,
    "ambienceRevision": {
      "originalFile": "s038d-mixed-v1.mp3",
      "originalSha256": "9ca83ba479f06c8af25b4181ca1c3417d1e829a76c40b5dfa4ad541df1f0ed6b",
      "removedSource": "callmethefoo-744447",
      "voiceInputSha256": "96a5301c44497f97a78546115e1afaaeef7f10a4a0afa0477608b21d8c9030c1",
      "musicInputSha256": "7073ce0364135fee7824d3ca0ed0c5ac2efc0f5ea84ca70d0a6159e45e2e6270",
      "sameVoiceAndMusicInputs": true,
      "voiceRetimed": false,
      "newRequests": 0,
      "source": "tools/remove-s038-opening-ambience.cjs",
      "authorization": "Docent: S038D validada; retirar l’ambient inicial i publicar definitivament."
    },
    "validatedAt": "2026-11-21",
    "validatedBy": "docent",
    "condition": {
      "openingAmbienceRemoved": true,
      "sameVoiceAndMusicInputs": true,
      "sourceMasterSha256": "9ca83ba479f06c8af25b4181ca1c3417d1e829a76c40b5dfa4ad541df1f0ed6b"
    },
    "publicationMaterials": {
      "illustration": "./assets/images/el-banc-que-havien-mogut-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-21",
      "audioChanged": true,
      "change": "Retirada autoritzada de l’ambient inicial."
    }
  },
  "ca-S036": {
    "state": "published",
    "approvedAt": "2026-11-21T09:53:12.331Z",
    "editorialFingerprint": "3cdbdb1c5feff302ecd4467e384319c46ff974e12e9b13e66a0cd6771f2aa27c",
    "plannedNewRequests": 0,
    "confirmation": "S036 validat per publicació definitiva",
    "reason": "Guió validat durant el processament seqüencial; incorporar a un lot compatible pendent, conservant les veus i el text exactes.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S036-T01"
      ],
      "total": 1,
      "batches": [
        "L12"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "db16b468c88444e3e67f2d6b53b65dc8ff6d663a869bdb6afee999839a8be528",
      "confirmation": "S036 validat per muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T07:56:34.756Z",
    "listeningApproval": true,
    "voicePreview": "./proves/veus-rebudes.html#S036",
    "voicePreviewFile": "./assets/audio/s036-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T12:52:54.525Z",
    "synthesisBatch": "L12",
    "requestHash": "cf4fb54b372f5e1cb7545d9fa0b7d6a0309eedf94004593133ebe93bc0bb6bc6",
    "audioSha256": "18dfd2243b7ed9325cb7f96b596d37508d6c2bf1ad57fd322e1b91ef3461b2aa",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/una-capseta-misteriosa-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S041": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-21T09:53:12.333Z",
    "editorialFingerprint": "c3cfa721b7651c654920ac4e13e3dc30d83555ddcfa4fa97d7a415d37621c84b",
    "plannedNewRequests": 0,
    "confirmation": "S041 validat per síntesi de veus",
    "reason": "Guió validat durant el processament seqüencial; incorporar a un lot compatible pendent, conservant les veus i el text exactes.",
    "uncertainTurns": [
      {
        "start": 262.47999999999996,
        "end": 263.17,
        "heard": "i ivaj ara",
        "status": "short-turn-awaiting-listening",
        "originalPreserved": true,
        "block": "S041-T01",
        "part": "llegir",
        "text": "Hi vaig ara?",
        "coverage": 0.3333333333333333
      }
    ],
    "receivedTakes": {
      "received": [
        "S041-T01"
      ],
      "total": 1,
      "batches": [
        "L06"
      ]
    },
    "voicesReceivedAt": "2026-11-21T10:59:35.018Z",
    "listeningApproval": false,
    "synthesisBatch": "L06",
    "requestHash": "a0bcff78c1b77973ff7ddd60722557464823fa57c596f11b98c6ecc64a97223a",
    "audioSha256": "c2c832ce1d045db7b9436ced9135a6d1cefd4fd743102f9975488117493c78c9",
    "montageNewSynthesisRequests": 0,
    "directiveRevision": {
      "originalFile": "s041-mixed-v1.mp3",
      "originalSha256": "644ace07ff499b084ef2f1fdffa3e5ccee0c0c290ebc624d63ffe9c17317d942",
      "removed": [
        "long pause",
        "long pause"
      ],
      "recognizedAs": [
        "l'ong",
        "pous",
        "l'ong",
        "pous"
      ],
      "retainedTitleRange": {
        "start": 2.109,
        "end": 5.679
      },
      "canonicalTitleRange": {
        "start": 2.484000000000009,
        "end": 5.424000000000007
      },
      "retainedTitlePcmSha256": "af8c5722c009470b121d3947aca27f3649dba4cdb4e8eb311779755e8dcfb5a4",
      "bodyPcmSha256": "51f4015c49ad3cd547ed88fd461a0da1f2047798a08d675c577ff5ad796f81bc",
      "bodyUnchanged": true,
      "voiceRetimed": false,
      "newRequests": 0
    },
    "teacherAssessment": "Esmena exacta finalreunio validada incorporada al muntatge local. Intro neta preservada, ambient continu i cadira acreditats; pendent d’audició docent del muntatge.",
    "feedback": [
      {
        "part": "introduction",
        "status": "applied",
        "type": "spoken-directive",
        "note": "Dues locucions long pause no demanades retallades en silencis; títol canònic conservat."
      },
      {
        "part": "finalreunio",
        "status": "applied",
        "type": "pronunciation",
        "note": "Esmena exacta finalreunio del lot L40 validada pel docent i incorporada a s041-repair-v3.mp3; pendent d’audició del muntatge.",
        "word": "hagis",
        "appliedAt": "2026-11-26"
      }
    ],
    "timingComparison": "./proves/pauses-s011-s027.html#S041",
    "repairComparison": "./proves/correccions-l40.html#S041-finalreunio",
    "receivedRepairs": [
      {
        "code": "S041",
        "part": "finalreunio",
        "text": "Quan hagis parlat amb ella, ens expliques què t’ha dit. Va, ara escoltem el grup de les endevinalles.",
        "pronunciation": "Clearly pronounce the canonical Catalan word hagis in Quan hagis parlat, never hagues or hagas. Keep the same adult female Mireia voice and natural rhythm. Read the full turn and do not read these instructions.",
        "status": "applied-awaiting-montage-listening",
        "originalFile": "assets/audio/repairs/l40-s041-finalreunio-original.mp3",
        "candidateFile": "assets/audio/repairs/l40-s041-finalreunio-prova.mp3",
        "sourceRawSha256": "4bcdb6306e09bc40b58de637d9e4c3d8cb63477429a60ccf89bb8602cf05d809",
        "sourceTakeId": "S041-T01",
        "sourceTakeSha256": "67ea4df411eb27fa99e64ff706302a192277746961c0153c0ee7f72a5fc73e9e",
        "batchRequestHash": "5808ddd12485a1772a021a21db2f16fa5be9cd4a42ed90c894aaf948ed7a38be",
        "applied": true,
        "approvedAt": "2026-11-26",
        "confirmation": "Docent 26/11: esmena finalreunio de S041 validada; incorporar la presa exacta.",
        "candidateSha256": "68ba9f5b295afe179685468ad9298522bab0e2d079ff6b73a3be97415cbc2bba",
        "appliedAt": "2026-11-26",
        "appliedFile": "assets/audio/s041-repair-v3.mp3",
        "appliedAudio": "./assets/audio/s041-repair-v3.mp3",
        "appliedAudioSha256": "c2c832ce1d045db7b9436ced9135a6d1cefd4fd743102f9975488117493c78c9"
      }
    ],
    "repairApplicationApproval": {
      "scope": "approved-repair",
      "approvedAt": "2026-11-26",
      "confirmation": "Docent 26/11: esmena finalreunio de S041 validada; incorporar la presa exacta.",
      "clips": [
        {
          "part": "finalreunio",
          "text": "Quan hagis parlat amb ella, ens expliques què t’ha dit. Va, ara escoltem el grup de les endevinalles.",
          "candidateFile": "assets/audio/repairs/l40-s041-finalreunio-prova.mp3",
          "candidateSha256": "68ba9f5b295afe179685468ad9298522bab0e2d079ff6b73a3be97415cbc2bba",
          "batchRequestHash": "5808ddd12485a1772a021a21db2f16fa5be9cd4a42ed90c894aaf948ed7a38be",
          "sourceTakeSha256": "67ea4df411eb27fa99e64ff706302a192277746961c0153c0ee7f72a5fc73e9e",
          "candidateTakeId": "S041-finalreunio",
          "sourceRequestHash": "3d25f087898f538ca6605b0b0393ce7c158881a7dafb013a5d918565aa47b994"
        }
      ]
    },
    "mountedAt": "2026-11-26T07:47:04.120Z",
    "reviewUpdate": {
      "audio": "./assets/audio/s041-repair-v3.mp3",
      "at": "2026-11-26",
      "summary": {
        "ca": "Esmena «Quan hagis parlat» validada incorporada amb ambient continu d’aula i cadira acreditada; intro neta preservada. Pendent d’escolta del muntatge.",
        "es": "Corrección validada de «Quan hagis parlat» incorporada con ambiente continuo de aula y silla acreditada; introducción limpia conservada. Pendiente de escuchar el montaje."
      }
    }
  },
  "ca-S039": {
    "state": "published",
    "approvedAt": "2026-11-21T09:53:12.333Z",
    "editorialFingerprint": "3544383b47d621fdfac4c03a6406994def23680789d2e8dc8a4d6fdb75dd78b6",
    "plannedNewRequests": 0,
    "confirmation": "S039 validat per publicació definitiva",
    "reason": "Guió validat durant el processament seqüencial; incorporar a un lot compatible pendent, conservant les veus i el text exactes.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S039-T01"
      ],
      "total": 1,
      "batches": [
        "L03"
      ]
    },
    "voicesReceivedAt": "2026-11-21T10:58:10.100Z",
    "listeningApproval": true,
    "voicePreview": "./proves/veus-rebudes.html#S039",
    "audioSha256": "02f34e895e50db60f4c41e7b5ede24a6facf91a49ece1ca0b575dfea38507865",
    "montageNewSynthesisRequests": 0,
    "sharedJingle": {
      "status": "catalogue-approved",
      "selected": "ona-curta",
      "note": "Recurs ja aprovat; aquest muntatge encara espera audició."
    },
    "reviewUpdate": {
      "audio": "./assets/audio/s039-news-common-v2.mp3",
      "at": "2026-11-22",
      "summary": {
        "ca": "Nova base comuna de notícies, amb entrada i sortida; retirats els papers i jingles anteriors. Pendent d’audició.",
        "es": "Nueva base común de noticias, con entrada y salida; retirados los papeles y jingles anteriores. Pendiente de escucha."
      }
    },
    "voicePreviewFile": "./assets/audio/s039-voices-review-v1.mp3",
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/una-biblioteca-dobjectes-en-prova-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S031": {
    "state": "published",
    "approvedAt": "2026-11-21T09:53:12.333Z",
    "editorialFingerprint": "f234c178bd18546a243c1e7dcacc0d9ce7b57648cc9fec49dbb46daa1cfb5922",
    "plannedNewRequests": 0,
    "confirmation": "S031 validat també per definitiu amb el muntatge de breaking news nou",
    "reason": "Guió validat durant el processament seqüencial; incorporar a un lot compatible pendent, conservant les veus i el text exactes.",
    "receivedTakes": {
      "received": [
        "S031-T01"
      ],
      "total": 1,
      "batches": [
        "L10"
      ]
    },
    "voicesReceivedAt": "2026-11-21T10:33:32.469Z",
    "listeningApproval": true,
    "voicePreview": "./proves/veus-rebudes.html#S031",
    "audioSha256": "34091eaf295be3000d035617889cc9512c6f361cd184a732b0731959cbac6c82",
    "montageNewSynthesisRequests": 0,
    "sharedJingle": {
      "status": "catalogue-approved",
      "selected": "ona-curta",
      "note": "Recurs ja aprovat; aquest muntatge encara espera audició."
    },
    "voicePreviewFile": "./assets/audio/s031-voices-review-v1.mp3",
    "reviewUpdate": {
      "audio": "./assets/audio/s031-news-common-v2.mp3",
      "at": "2026-11-22",
      "summary": {
        "ca": "Nova base comuna de notícies, amb entrada i sortida; retirats els papers i jingles anteriors. Pendent d’audició.",
        "es": "Nueva base común de noticias, con entrada y salida; retirados los papeles y jingles anteriores. Pendiente de escucha."
      }
    },
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/una-bustia-per-a-propostes-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S044": {
    "state": "published",
    "approvedAt": "2026-11-21T09:59:55.068Z",
    "editorialFingerprint": "75fa5af73c82c6d2644013f31e6f2372e79bcea57cbb6fdc5004a85248376ea4",
    "plannedNewRequests": 0,
    "confirmation": "S044 validat per publicació definitiva",
    "reason": "Guió validat durant el processament seqüencial; incorporar a un lot compatible pendent, conservant les veus i el text exactes.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S044-T01"
      ],
      "total": 1,
      "batches": [
        "L08"
      ]
    },
    "voicesReceivedAt": "2026-11-21T11:03:39.998Z",
    "listeningApproval": true,
    "synthesisBatch": "L08",
    "requestHash": "ac8a3b34fa098dc7a38e788b2cadc9c81d3039b44c7af229a4c9c104184e94cc",
    "audioSha256": "159f628041e9bdce9659c36bccb48a85150660cc4dd14fb8c8b1171844733b1a",
    "montageNewSynthesisRequests": 0,
    "reviewUpdate": {
      "audio": "./assets/audio/s044-hallway-v2.mp3",
      "at": "2026-11-22",
      "summary": {
        "ca": "Retirats els efectes entre títol i diàleg; ambient de passadís esmorteït darrere d’una porta, continu i molt baix. Pendent d’audició.",
        "es": "Retirados los efectos entre título y diálogo; ambiente de pasillo amortiguado tras una puerta, continuo y muy bajo. Pendiente de escucha."
      }
    },
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/el-recompte-del-programa-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S027": {
    "state": "published",
    "approvedAt": "2026-11-21T09:59:55.070Z",
    "editorialFingerprint": "bd52c7909585864e4d85e29cf9416cea54e18e08a0b0e5333122bf02bc900aff",
    "plannedNewRequests": 1,
    "confirmation": "S027 validat per publicació definitiva.",
    "reason": "Guió validat durant el processament seqüencial; incorporar a un lot compatible pendent, conservant les veus i el text exactes.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S027-T01"
      ],
      "total": 1,
      "batches": [
        "L13"
      ]
    },
    "voicesReceivedAt": "2026-11-21T11:06:16.496Z",
    "listeningApproval": true,
    "synthesisBatch": "L13",
    "requestHash": "ab02e5a56a6807f106885dd5b8e4749ed77c2b2461e93dc71243142194efb2a3",
    "audioSha256": "8d75c63a177e6481e79b9027fb6857d1a0ea41ffe33c2a91573dd126e0ff8f59",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-21",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/el-berenar-del-terrat-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-21",
      "audioChanged": false
    },
    "timingComparison": "./proves/pauses-s011-s027.html#S027"
  },
  "ca-S043": {
    "state": "published",
    "approvedAt": "2026-11-21T09:59:55.071Z",
    "editorialFingerprint": "2cf5c51d07f098b92a0d0f55f394b41ca995659fab793adefabf22338ffb3d10",
    "plannedNewRequests": 0,
    "confirmation": "S043 validat per publicació definitiva",
    "reason": "Guió validat durant el processament seqüencial; incorporar a un lot compatible pendent, conservant les veus i el text exactes.",
    "receivedTakes": {
      "received": [
        "S043-T01"
      ],
      "total": 1,
      "batches": [
        "L05"
      ]
    },
    "voicesReceivedAt": "2026-11-21T10:59:18.902Z",
    "listeningApproval": true,
    "synthesisBatch": "L05",
    "requestHash": "3a86ff8ea619d9fa32f7582a144656f791631478c642722f8e98ef6e5c8a5eb0",
    "audioSha256": "e82bf7c789539c90b85f8ba16b34b2145cc45421a6e735ad2032c8e4dd908d57",
    "montageNewSynthesisRequests": 0,
    "feedbackAt": "2026-11-23",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "feedback": [
      {
        "part": "introduction",
        "kind": "sound-effect",
        "word": "Fregament inicial",
        "status": "applied"
      },
      {
        "part": "troballa",
        "kind": "timing",
        "word": "Gir de paper",
        "status": "applied",
        "note": "Comença 0,45 s abans del final de frase; retirat només el segon llarg inserit per a l’efecte."
      }
    ],
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/el-balco-que-nomes-era-al-paper-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S049": {
    "state": "published",
    "approvedAt": "2026-11-22T17:52:11.110Z",
    "editorialFingerprint": "2d5fdedf58a87030150579d5c4d9a88b172fc0c1aa19af753f5a64c063c49889",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S049 validat per publicació definitiva",
    "reason": "Guió, Laia/Leda i Pau/Charon i escaleta validats. Pendent de completar les validacions de P02 i preparar l’entrada del lot compatible de sis a vuit minuts; cap petició nova enviada.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S049-T01"
      ],
      "total": 1,
      "batches": [
        "L14"
      ]
    },
    "voicesReceivedAt": "2026-11-22T17:59:05.187Z",
    "voicePreview": "./proves/veus-rebudes.html#S049",
    "voicePreviewFile": "./assets/audio/s049-voices-review-v1.mp3",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "fa33487137e02a8723393c4eb27b9a6782e321706b8342275524f521cee055ca",
      "confirmation": "S049 validat per muntatge i recatalogat com a diàleg"
    },
    "mountedAt": "2026-11-23T12:30:22.558Z",
    "synthesisBatch": "L14",
    "requestHash": "3dc116c991de11e684329bf9e8f8214a417a540d0372103bba92af6fd28651bd",
    "audioSha256": "22f060b6dda803350fe0cbed5ab030058f1a5a7c5e11613196dc854c9913f565",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/la-parada-es-mou-un-mati-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S048": {
    "state": "published",
    "approvedAt": "2026-11-22T17:52:11.110Z",
    "editorialFingerprint": "9226852d79a6352b1ac4d193aa8836304e4bd64d67487754c8fabd7753b21eb2",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S048 validat per publicació definitiva",
    "reason": "Guió, Laia/Leda i Pau/Charon i escaleta validats. Pendent de completar les validacions de P02 i preparar l’entrada del lot compatible de sis a vuit minuts; cap petició nova enviada.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S048-T01"
      ],
      "total": 1,
      "batches": [
        "L14"
      ]
    },
    "voicesReceivedAt": "2026-11-22T17:59:05.187Z",
    "voicePreview": "./proves/veus-rebudes.html#S048",
    "voicePreviewFile": "./assets/audio/s048-voices-review-v1.mp3",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-22",
      "sourceTakeSha256": "c17478028311d1f2d60031d47002e793f6a7c8164f6d8fd4f8d21d69ea34c228",
      "confirmation": "S048 validat per muntatge, tot molt bé, fons continu de mercat."
    },
    "mountedAt": "2026-11-22T21:45:56.560Z",
    "synthesisBatch": "L14",
    "requestHash": "3dc116c991de11e684329bf9e8f8214a417a540d0372103bba92af6fd28651bd",
    "audioSha256": "1f48c06f07f83c7d3392c1a4bb84ac56e2ccee18acffed5b8cd3069264624444",
    "montageNewSynthesisRequests": 0,
    "reviewUpdate": {
      "audio": "./assets/audio/s048-mixed-v1.mp3",
      "at": "2026-11-22",
      "summary": {
        "ca": "Veus validades; primer muntatge amb ambient real continu de mercat, molt discret. Pendent d’audició del muntatge.",
        "es": "Voces validadas; primer montaje con ambiente real continuo de mercado, muy discreto. Pendiente de escucha del montaje."
      }
    },
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/les-caixes-que-tornen-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S050": {
    "state": "published",
    "approvedAt": "2026-11-22T17:54:15.727Z",
    "editorialFingerprint": "4f9689aac3f595ee436e2cdcd4af4fff59f793cdff48e5fbc4eb2b6784f1e67e",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S050 validat per a publicació definitiva",
    "reason": "Guió, Laia/Leda i Pau/Charon i escaleta validats. P02 completa les quatre validacions; preparar una única petició compatible amb entrada sense marques literals de pausa.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S050-T01"
      ],
      "total": 1,
      "batches": [
        "L14"
      ]
    },
    "voicesReceivedAt": "2026-11-22T17:59:05.187Z",
    "voicePreview": "./proves/veus-rebudes.html#S050",
    "voicePreviewFile": "./assets/audio/s050-voices-review-v1.mp3",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-22",
      "sourceTakeSha256": "b15841c1fd7be80636fe1770c10a1bcc6643920a789505093ff9f4239604184a",
      "confirmation": "S050 veus validades, podem passar a muntatge, amb fons continu de mercat de fons"
    },
    "synthesisBatch": "L14",
    "requestHash": "3dc116c991de11e684329bf9e8f8214a417a540d0372103bba92af6fd28651bd",
    "audioSha256": "0abb932b70edb01f2fb9bcd2edac6a30de6e8b9d0312d552df2827c94dbbb6d2",
    "montageNewSynthesisRequests": 0,
    "mountedAt": "2026-11-22T21:37:29.918Z",
    "reviewUpdate": {
      "audio": "./assets/audio/s050-mixed-v1.mp3",
      "at": "2026-11-22",
      "summary": {
        "ca": "Veus validades pel docent; primer muntatge amb ambient real continu de mercat, molt discret. Pendent d’audició del muntatge.",
        "es": "Voces validadas por el docente; primer montaje con ambiente real continuo de mercado, muy discreto. Pendiente de escucha del montaje."
      }
    },
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/la-balanca-marca-massa-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S052": {
    "state": "published",
    "approvedAt": "2026-11-22T17:55:43.315Z",
    "editorialFingerprint": "5d6e18b1c55269962193e77148bf979b7480011d3d590ff9b395f1070d83747a",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S052 validat per publicació definitiva",
    "reason": "Guió, veus i escaleta validats; P03 encara espera la validació de S051 abans de preparar el lot amb S040.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S052-T01"
      ],
      "total": 1,
      "batches": [
        "L15"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "5e8bdea99d9ce8ab1aec05e35da534948c5ee2a99bc728186d444fcaf1bf7464",
      "confirmation": "S052 validat per pujar a muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T07:54:36.082Z",
    "voicePreview": "./proves/veus-rebudes.html#S052",
    "voicePreviewFile": "./assets/audio/s052-voices-review-v1.mp3",
    "mountedAt": "2026-11-23",
    "synthesisBatch": "L15",
    "requestHash": "4029137e3ef3992d6500ac463d9bda81a70330519489e94b9b732c48068f744e",
    "audioSha256": "1d0b54ea05ebe0a48cbe7df1071b67f211c4534992ddeed8e702e17b7870338c",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/la-capsa-que-semblava-un-llibre-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S051": {
    "state": "published",
    "approvedAt": "2026-11-22T17:57:07.244Z",
    "editorialFingerprint": "7573b3e7ce7027f19e92af1451565dc4054c2c600a58acadf03406b003cd2466",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S051 validat per publicació definitiva",
    "reason": "P03 completa totes tres validacions. Preparar el lot Laia/Leda i Nora/Kore després de comprovar el primer retorn del format nou; cap petició curta aïllada.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S051-T01"
      ],
      "total": 1,
      "batches": [
        "L15"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "ecfe0c7c6a52d5d6eb0be9d65a2f83367d34306fb65997fd6e6e53acc729a617",
      "confirmation": "S051 validat per muntatge; diàleg, dificultat superior."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T07:54:36.082Z",
    "voicePreview": "./proves/veus-rebudes.html#S051",
    "voicePreviewFile": "./assets/audio/s051-voices-review-v1.mp3",
    "gradingReview": {
      "status": "pending-listening",
      "reviewAfter": "mounted-audio",
      "currentGrade": "4",
      "currentLevel": "advanced",
      "candidateGrade": "5",
      "candidateLevels": [
        "easy"
      ],
      "reviewCourse": true,
      "reviewDifficulty": true,
      "note": "Aplicat 4t avançada com a referència entre les opcions docents; confirmar després de l’audició del muntatge."
    },
    "mountedAt": "2026-11-23T12:37:32.607Z",
    "synthesisBatch": "L15",
    "requestHash": "4029137e3ef3992d6500ac463d9bda81a70330519489e94b9b732c48068f744e",
    "audioSha256": "2e52eca2ad087a0231fd5d4aeaa343ca41bda4ebabbdc83f897e878c6fd1b9dc",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/el-cartellet-que-quedava-amagat-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S076": {
    "state": "published",
    "approvedAt": "2026-11-22T18:01:27.247Z",
    "editorialFingerprint": "618b0b24523188fa45a73f55d5466fe9029664c994674c5e26b4d8558cd513bb",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S076: muntatge validat per publicació definitiva al traspàs docent del 25/11/2026; abast de les tretze peces confirmat pel docent en aquesta conversa.",
    "reason": "Veus validades pel docent; muntatge autoritzat, encara pendent de la seva audició.",
    "gradingReview": {
      "status": "pending-listening",
      "currentGrade": "5",
      "candidateGrade": "6",
      "note": "Confirmar la dificultat i valorar el possible pas de 5è a 6è després d’escoltar l’àudio. Ara es mantenen 5è i avançada, amb les mateixes preguntes.",
      "currentLevel": "advanced",
      "reviewDifficulty": true
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S076-T01"
      ],
      "total": 1,
      "batches": [
        "L33"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "f3bf7d90101ac08a75bdf2711bd83b49e1d5b8b73f6bce58ee0ad8b14a10b5a2",
      "confirmation": "Docent: S076 validat per a muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-24T13:54:18.603Z",
    "voicePreview": "./proves/veus-rebudes.html#S076",
    "voicePreviewFile": "./assets/audio/s076-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T07:26:50.318Z",
    "synthesisBatch": "L33",
    "requestHash": "c8516a1b636a26a9ed64fa2c7c6106cf90afe153ae62018e472a7fbda49e8c1a",
    "audioSha256": "21cb3f622b54e2f5fcc981fe646821cc14ee2da84c2b9fb4f7341026506f2155",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "teacherAssessment": "Muntatge validat definitivament pel docent al traspàs confirmat. Àudio conservat sense canvis.",
    "publicationMaterials": {
      "illustration": "./assets/images/s076-publicacio-v1.jpg",
      "illustrationSha256": "0d9a94be5cfc1903d761b07d5349a96ad08e91144a3887c1fec64c662577b10e",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S074": {
    "state": "published",
    "approvedAt": "2026-11-22T18:08:54.593Z",
    "editorialFingerprint": "455121f7226b449779ffef213905ffc0d1d8441e78e93289abd4283fc0ab7b01",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 25/11: S104, S106, S087, S110, S074, S100, S108, S056 i S097 validats tots per publicació definitiva.",
    "reason": "Pendent de completar les validacions del lot Laia/Leda i Ona/Sulafat.",
    "gradingReview": {
      "status": "pending-listening",
      "currentGrade": "5",
      "currentLevel": "middle",
      "candidateGrade": null,
      "reviewDifficulty": true,
      "note": "Confirmar curs i dificultat després d’escoltar l’àudio. Ara es mantenen 5è i intermèdia; encara no hi ha una requalificació decidida."
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S074-T01"
      ],
      "total": 1,
      "batches": [
        "L33"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "b885d00daf944ed7349e98730b127a2987062f3a887faa33fd0666b483e409e5",
      "confirmation": "Docent 25/11: S074 validat per muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-24T13:54:18.603Z",
    "voicePreview": "./proves/veus-rebudes.html#S074",
    "voicePreviewFile": "./assets/audio/s074-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T07:36:55.172Z",
    "synthesisBatch": "L33",
    "requestHash": "c8516a1b636a26a9ed64fa2c7c6106cf90afe153ae62018e472a7fbda49e8c1a",
    "audioSha256": "f0ba39a4ee9d45d8cf53e88e9c7ff73a81dabbdf20cca8047ba0fd94bb82ae3c",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "publicationMaterials": {
      "illustration": "./assets/images/s074-publicacio-v2.webp",
      "illustrationSha256": "7b0beee91d746c0c12d04a611e6e8299c9dd39b2b1259dbd1447d06f1a1ae825",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S062": {
    "state": "published",
    "approvedAt": "2026-11-22T18:21:42.589Z",
    "editorialFingerprint": "55ae4db57e98fb7c67f2856ebaf38501ab46dda736b067b6b1c2515f23754038",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S062 validat per publicació definitiva",
    "reason": "Agrupar lectures completes validades amb el mateix repartiment Laia/Leda i Biel/Puck; comprovar sis a vuit minuts abans d’enviar.",
    "gradingReview": {
      "status": "pending-listening",
      "reviewAfter": "mounted-audio",
      "currentGrade": "6",
      "currentLevel": "advanced",
      "candidateGrade": null,
      "candidateGradeLabel": "1r d’ESO",
      "candidateLevels": [
        "middle",
        "advanced"
      ],
      "reviewDifficulty": true,
      "note": "Valorar 1r d’ESO intermèdia o avançada després d’escoltar l’àudio muntat. Ara es mantenen 6è avançada i nou preguntes, sense cap canvi de qualificació."
    },
    "mixingNotes": [
      "Ambient real continu de jovent conversant en una aula o espai semblant, sense veus massa infantils ni paraules de fons entenedores. Entrada breu i molt tènue sota totes les intervencions de Laia i Biel.",
      "Ometre el moviment puntual de paper si no aporta context. Qualsevol acció conservada pot solapar-se amb la parla sense tapar dades; no afegir-hi una espera exclusiva."
    ],
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S062-T01"
      ],
      "total": 1,
      "batches": [
        "L18"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "676d4c4ceb31e8660214e30cc0a863bb1e3b496e2c7e8d4c57a6cd8b35f80441",
      "confirmation": "S062 validat per muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-22T20:58:09.995Z",
    "voicePreview": "./proves/veus-rebudes.html#S062",
    "voicePreviewFile": "./assets/audio/s062-voices-review-v2.mp3",
    "voiceReviewUpdate": {
      "file": "./assets/audio/s062-voices-review-v2.mp3",
      "at": "2026-11-22",
      "conversion": "removed-35-interleaved-c2pa-id3-tags",
      "summary": {
        "ca": "Metadades retirades; torna a escoltar la presa neta. Sense veus noves ni canvi de ritme.",
        "es": "Metadatos retirados; vuelve a escuchar la toma limpia. Sin voces nuevas ni cambio de ritmo."
      }
    },
    "mountedAt": "2026-11-23T12:55:18.810Z",
    "synthesisBatch": "L18",
    "requestHash": "f1a68c184a8ed0118f14d57dc5a685880f5b7affe7562ae9d14cbc273639f768",
    "audioSha256": "54650118c8e8d32b9829f777b67ed447020f9ad267b3b3ee7c0e0080ad1cb249",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/dos-cartells-per-al-mateix-concert-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S069": {
    "state": "published",
    "approvedAt": "2026-11-22T19:33:51.066Z",
    "editorialFingerprint": "a9e9e02ec48b699ca7ee23c940d58edbb48728df17aac159d1d440b1c80e4a20",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S069 validat per publicació definitiva",
    "reason": "Paràgraf inicial substituït per la represa de Ferran validada, amb «Aina» i «guix». Base «Dos noms a la pissarra» compartida amb S069D, molt baixa sota la veu, amb pujada i fosa final. Pendent d’audició del muntatge.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S069-T01"
      ],
      "total": 1,
      "batches": [
        "L17"
      ]
    },
    "voicesReceivedAt": "2026-11-22T20:49:56.816Z",
    "voicePreview": "./proves/veus-rebudes.html#S069",
    "voicePreviewFile": "./assets/audio/s069-voices-review-v1.mp3",
    "feedbackAt": "2026-11-22",
    "feedback": [
      {
        "part": "encarrec",
        "word": "Aina · guix",
        "heard": "Eina i guiks",
        "status": "applied",
        "appliedAt": "2026-11-23",
        "audio": "./assets/audio/s069-mixed-v1.mp3"
      }
    ],
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "71b6d2ec59727bed87b85c19501f66b47e62d0c573646851bcee971f3a9485e7",
      "baseTakeSha256": "633fd6af92165442628944cb8ad45e889218b2bbbf4d4ceca34f47f390421a14",
      "confirmation": "S069 esmenes validades pel docent per incorporar-les i passar a muntatge.",
      "derivation": "Previously approved remaining speech plus the exact teacher-approved replacement; assembled playback still awaits montage audition.",
      "repairs": [
        {
          "part": "encarrec",
          "text": "Aina, una vegada em van deixar portar el marcador d’un partit del barri. Jo encara era petit per jugar amb els grans, però em van donar una pissarra i un guix. A dalt hi havia escrit el nom dels dos equips: carrer Nou a l’esquerra i carrer Major a la dreta.",
          "candidateFile": "assets/audio/repairs/l28-s069-encarrec-prova.mp3",
          "candidateSha256": "a071b2641426c67697ca847b18b52bbae4cbe760e385df170e9aed40957cf1e8",
          "batchRequestHash": "17cd4683c769da2badcc720d67926da3398a2be69ff54c217a766273869991d4",
          "sourceTakeSha256": "633fd6af92165442628944cb8ad45e889218b2bbbf4d4ceca34f47f390421a14"
        }
      ]
    },
    "plannedRepair": {
      "part": "encarrec",
      "speaker": "Ferran",
      "text": "Aina, una vegada em van deixar portar el marcador d’un partit del barri. Jo encara era petit per jugar amb els grans, però em van donar una pissarra i un guix. A dalt hi havia escrit el nom dels dos equips: carrer Nou a l’esquerra i carrer Major a la dreta.",
      "sourceTakeSha256": "633fd6af92165442628944cb8ad45e889218b2bbbf4d4ceca34f47f390421a14",
      "status": "applied-validated",
      "pronunciation": "Aina: keep the Catalan AI diphthong, not Eina. Guix ends with the soft SH consonant heard in Catalan peix, never a K or KS sound. Keep the I vowel. Read only the supplied sentence, not these instructions.",
      "voice": "Algenib",
      "batch": "L28"
    },
    "repairComparison": "./proves/correccions-l28.html#S069-encarrec",
    "receivedRepairs": [
      {
        "code": "S069",
        "part": "encarrec",
        "text": "Aina, una vegada em van deixar portar el marcador d’un partit del barri. Jo encara era petit per jugar amb els grans, però em van donar una pissarra i un guix. A dalt hi havia escrit el nom dels dos equips: carrer Nou a l’esquerra i carrer Major a la dreta.",
        "pronunciation": "Aina: keep the Catalan AI diphthong, not Eina. Guix ends with the soft SH consonant heard in Catalan peix, never a K or KS sound. Keep the I vowel. Read only the supplied sentence, not these instructions.",
        "status": "applied-validated",
        "originalFile": "assets/audio/repairs/l28-s069-encarrec-original.mp3",
        "candidateFile": "assets/audio/repairs/l28-s069-encarrec-prova.mp3",
        "sourceRawSha256": "43a2e90b48ca2359bb188118537c41567673d998ef51374d5170f00ca0c55937",
        "sourceTakeId": "S069-T01",
        "sourceTakeSha256": "633fd6af92165442628944cb8ad45e889218b2bbbf4d4ceca34f47f390421a14",
        "batchRequestHash": "17cd4683c769da2badcc720d67926da3398a2be69ff54c217a766273869991d4",
        "applied": true,
        "approvedAt": "2026-11-23",
        "confirmation": "S069 esmenes validades pel docent per incorporar-les i passar a muntatge.",
        "candidateSha256": "a071b2641426c67697ca847b18b52bbae4cbe760e385df170e9aed40957cf1e8",
        "appliedAt": "2026-11-23",
        "appliedAudio": "./assets/audio/s069-mixed-v1.mp3",
        "validatedAt": "2026-11-23",
        "validatedAudioSha256": "6529adf8215c90b2d64ef3e9ae8bd0d100c56a7cd76f475622d5416240ce0319"
      }
    ],
    "repairApplicationApproval": {
      "at": "2026-11-23",
      "scope": "approved-repair",
      "confirmation": "S069 esmenes validades pel docent per incorporar-les i passar a muntatge.",
      "clips": [
        {
          "part": "encarrec",
          "text": "Aina, una vegada em van deixar portar el marcador d’un partit del barri. Jo encara era petit per jugar amb els grans, però em van donar una pissarra i un guix. A dalt hi havia escrit el nom dels dos equips: carrer Nou a l’esquerra i carrer Major a la dreta.",
          "candidateFile": "assets/audio/repairs/l28-s069-encarrec-prova.mp3",
          "candidateSha256": "a071b2641426c67697ca847b18b52bbae4cbe760e385df170e9aed40957cf1e8",
          "batchRequestHash": "17cd4683c769da2badcc720d67926da3398a2be69ff54c217a766273869991d4",
          "sourceTakeSha256": "633fd6af92165442628944cb8ad45e889218b2bbbf4d4ceca34f47f390421a14"
        }
      ]
    },
    "mountedAt": "2026-11-23T16:40:45.618Z",
    "synthesisBatch": "L17+L28",
    "requestHash": "ec29b04e980b32a62d4837b44cdb978862d4e2a5517ea730a5d39def3bb1d4cf",
    "audioSha256": "6529adf8215c90b2d64ef3e9ae8bd0d100c56a7cd76f475622d5416240ce0319",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/la-pissarra-del-partit-dialogada-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S075": {
    "state": "published",
    "approvedAt": "2026-11-22T19:33:51.066Z",
    "editorialFingerprint": "18a655dc02cd6d8756986fd69bd0b65575025ca4ea962add00a284a0a3ffb261",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S075 validat per publicació definitiva",
    "reason": "Agrupar lectures completes validades de Laia/Leda i Ona/Sulafat fins a sis a vuit minuts.",
    "mixingNotes": [
      "Ambient continu real de sala de restaurant o bar, com una conversa de barra vinculada al servei. Xerrameca llunyana sense paraules entenedores, sense veus massa infantils, molt baixa sota Laia i Ona. Retorn docent posterior substitueix el fons genèric de cuina.",
      "Preparar ambient continu de sala/bar per a S075, sense pauses addicionals per papers o safates; qualsevol acció puntual conservada pot coincidir amb la conversa."
    ],
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S075-T01"
      ],
      "total": 1,
      "batches": [
        "L16"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "2f8c6df7ca777752be1d310b2ea6c1309840af6d44fab593a7fc3cda9d68122d",
      "confirmation": "S075 validat per pujar a muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T07:55:30.597Z",
    "voicePreview": "./proves/veus-rebudes.html#S075",
    "voicePreviewFile": "./assets/audio/s075-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T12:40:20.084Z",
    "synthesisBatch": "L16",
    "requestHash": "588839376334e915c4952fab7c33def098c4cfa5d066e7c5bbf7ef749940ae59",
    "audioSha256": "fa91b0edd1e7cfacd4932bfbe3ef6928508fad6e471b3d114e883860e7919ee9",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/la-foto-del-plat-de-dema-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S057": {
    "state": "published",
    "approvedAt": "2026-11-22T19:41:58.762Z",
    "editorialFingerprint": "ff4e450079ca2113d9f42ced961f1381ddf5ba0d41594acc0f8e29b0453867f9",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S057 validat per publicació definitiva",
    "reason": "Veus aprovades pel docent i primer muntatge completat localment; pendent d’audició del muntatge.",
    "gradingReview": {
      "status": "pending-listening",
      "reviewAfter": "mounted-audio",
      "currentGrade": "6",
      "currentLevel": "advanced",
      "reviewCourse": false,
      "reviewDifficulty": true,
      "candidateGrade": null,
      "candidateGradeLabel": "Es manté 6è",
      "note": "Confirmar la dificultat després d’escoltar l’àudio muntat. Es mantenen provisionalment 6è avançada i nou preguntes; cap canvi de curs proposat."
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S057-T01"
      ],
      "total": 1,
      "batches": [
        "L25"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "110b133e256a4a48a1d303d264c8651aeb6a21242ecc80d8b8034b83e6159b4a",
      "confirmation": "S057 validat per pujar a muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T12:23:58.849Z",
    "voicePreview": "./proves/veus-rebudes.html#S057",
    "voicePreviewFile": "./assets/audio/s057-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T13:41:59.802Z",
    "synthesisBatch": "L25",
    "requestHash": "4e3ed06c613d1750826947314242be6a728fc3ca9f7dbf20d554f3768035a399",
    "audioSha256": "9648e5bb8fe6591c4a4f1c3cf6c81d50168d255979b7610b7022d3c745b247be",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/la-volta-nova-del-bus-de-dissabte-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S046": {
    "state": "published",
    "approvedAt": "2026-11-22T19:47:42.525Z",
    "editorialFingerprint": "4a26e8f9929af7daf05a5890ae420cb473ee70776fb5b5acd5f31298e8c755f6",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S046 validat per publicació definitiva",
    "reason": "Agrupar records complets validats de Ferran/Algenib fins a sis a vuit minuts. La variant S046D queda pendent de validació pròpia.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S046-T01"
      ],
      "total": 1,
      "batches": [
        "L17"
      ]
    },
    "voicesReceivedAt": "2026-11-22T20:49:56.816Z",
    "voicePreview": "./proves/veus-rebudes.html#S046",
    "voicePreviewFile": "./assets/audio/s046-voices-review-v1.mp3",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "fe1e0f15945813329b08f7e2bbe999316cfc4379195dabe8287c09e4bcb31fad",
      "confirmation": "S046 validat per muntatge"
    },
    "mountedAt": "2026-11-23T12:31:49.929Z",
    "synthesisBatch": "L17",
    "requestHash": "3614318c8fb54c97021a43d7a5ac29a9c5f2642f00894c7d7e5ae616d6adc099",
    "audioSha256": "e06ccebee39a0ac3bd9650e662463c42dfe09dacadcdb29cfe04a47dbfde855b",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/la-clau-del-davantal-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S073": {
    "state": "published",
    "approvedAt": "2026-11-22T19:57:00.644Z",
    "editorialFingerprint": "4125af4fad1ad6ec2e874efe39f194d59a80d14c515852c7d36b2a47b3c211ba",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S073 validat per publicació definitiva",
    "reason": "Agrupar lectures completes validades de Laia/Leda i Ona/Sulafat fins a sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S073-T01"
      ],
      "total": 1,
      "batches": [
        "L16"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "0dbec55d65fb899a2169616a5d5067a12d8d72ded47dd354f8abe374a0e303ff",
      "confirmation": "S073 validat per pujar a muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T07:55:30.597Z",
    "voicePreview": "./proves/veus-rebudes.html#S073",
    "voicePreviewFile": "./assets/audio/s073-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T12:11:26.668Z",
    "synthesisBatch": "L16",
    "requestHash": "588839376334e915c4952fab7c33def098c4cfa5d066e7c5bbf7ef749940ae59",
    "audioSha256": "74c188f351a2947feba8194ea32c2e3800ed9795cfa2f366fe332232c568ea0f",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/el-dinar-que-surt-en-dues-tandes-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S061": {
    "state": "published",
    "approvedAt": "2026-11-22T19:57:00.644Z",
    "editorialFingerprint": "1b2334253da463ed8aa3fc806de6ea256df269b77e69b75f88833bfe16fffad1",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 25/11: S061, S071, S022, S059 i S025 validats per publicació definitiva.",
    "reason": "Cos de veus netes validat; cal reposar només el títol abans del muntatge.",
    "gradingReview": {
      "status": "confirmed-by-teacher",
      "confirmedAt": "2026-11-23",
      "grade": "6",
      "level": "middle",
      "previousGrade": "5",
      "previousLevel": "advanced",
      "note": "Requalificació explícita després d’escoltar les veus: 6è intermèdia."
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S061-T01"
      ],
      "total": 1,
      "batches": [
        "L18"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "4a06dc8d1d90f2c8f4b6a6fe42c35d845cdd14548069c559fe279ff3edc4c193",
      "baseTakeSha256": "f8c2abe90710bcd8f81d4437c03c30b36c5c1be4ac58f2c7a46e63e0aa60cd4b",
      "confirmation": "Docent 25/11: S061 validat per a muntatge amb l’esmena de la frase que faltava.",
      "derivation": "Previously approved complete body, plus the exact teacher-approved opening clips. Full montage still awaits listening.",
      "repairs": [
        {
          "part": "introduction",
          "text": "Comprensió oral. El curt que començava pel final.",
          "candidateFile": "assets/audio/repairs/l31-s061-introduction-prova.mp3",
          "candidateSha256": "f25dcd4aeb9ab9be38fa50b46a5518884fd514a6ca3361a5f020fda834e4f0b6",
          "batchRequestHash": "a60fe358a66004eba2e6b742133d7f9780780baf5a8739a3a428828c3e6fa590"
        }
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-22T20:58:09.995Z",
    "voicePreview": "./proves/veus-rebudes.html#S061",
    "voicePreviewFile": "./assets/audio/s061-voices-review-v2.mp3",
    "voiceReviewUpdate": {
      "file": "./assets/audio/s061-voices-review-v2.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Cos de veus validat. La presentació nova ja és a «Escolta les esmenes», pendent de confirmar abans del muntatge.",
        "es": "Cuerpo de voces validado. La presentación nueva está en «Escucha las correcciones», pendiente de confirmar antes del montaje."
      }
    },
    "bodyVoiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "f8c2abe90710bcd8f81d4437c03c30b36c5c1be4ac58f2c7a46e63e0aa60cd4b",
      "confirmation": "S061: el docent valida expressament les veus després de la neteja de metadades; només falta la locució inicial del títol.",
      "confirmedAfterMetadataCleanup": true,
      "sourcePreviewFile": "./assets/audio/s061-voices-review-v2.mp3",
      "sourcePreviewSha256": "6ce46e740bf242d55d6809664c0f5488a2873049f567a47fba19e312d9163603",
      "previewRevision": 2
    },
    "feedbackAt": "2026-11-23",
    "feedback": [
      {
        "part": "introduction",
        "kind": "omitted-title",
        "status": "applied",
        "detail": "Falta «Comprensió oral. El curt que començava pel final.»; omissió ja registrada al tall de L18.",
        "appliedAt": "2026-11-25",
        "appliedAudio": "./assets/audio/s061-mixed-v1.mp3",
        "resolution": "Presa validada pel docent incorporada; muntatge complet pendent d’audició."
      }
    ],
    "plannedRepair": {
      "part": "introduction",
      "speaker": "Laia",
      "voice": "Leda",
      "text": "Comprensió oral. El curt que començava pel final.",
      "status": "applied-validated",
      "scope": "missing-title",
      "sourceTakeSha256": "f8c2abe90710bcd8f81d4437c03c30b36c5c1be4ac58f2c7a46e63e0aa60cd4b",
      "batch": "L31"
    },
    "teacherAssessment": "Veus, esmenes incorporades i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "repairComparison": "./proves/correccions-l31.html#S061-introduction",
    "receivedRepairs": [
      {
        "code": "S061",
        "part": "introduction",
        "text": "Comprensió oral. El curt que començava pel final.",
        "pronunciation": "Read the exercise introduction and title exactly once in the same youthful Laia/Leda voice. Do not start the dialogue or add a third voice.",
        "status": "applied-validated",
        "missingOriginal": true,
        "candidateFile": "assets/audio/repairs/l31-s061-introduction-prova.mp3",
        "sourceRawSha256": "31d64681f63f83a2ea00ceaae4e856d2c22a5a1c3eaa089c652442b3ecebf497",
        "sourceTakeId": "S061-T01",
        "sourceTakeSha256": "f8c2abe90710bcd8f81d4437c03c30b36c5c1be4ac58f2c7a46e63e0aa60cd4b",
        "batchRequestHash": "a60fe358a66004eba2e6b742133d7f9780780baf5a8739a3a428828c3e6fa590",
        "applied": true,
        "approvedAt": "2026-11-25",
        "confirmation": "Docent 25/11: S061 validat per a muntatge amb l’esmena de la frase que faltava.",
        "appliedAt": "2026-11-25",
        "appliedAudio": "./assets/audio/s061-mixed-v1.mp3",
        "appliedAudioSha256": "aea14978de1b304d38448c4a66a5fe038cfaa2b227d6adc23fb756b8acd24924",
        "validatedAt": "2026-11-25",
        "validatedAudioSha256": "aea14978de1b304d38448c4a66a5fe038cfaa2b227d6adc23fb756b8acd24924"
      }
    ],
    "repairApplicationApproval": {
      "scope": "approved-repair",
      "approvedAt": "2026-11-25",
      "confirmation": "Docent 25/11: S061 validat per a muntatge amb l’esmena de la frase que faltava.",
      "clips": [
        {
          "part": "introduction",
          "text": "Comprensió oral. El curt que començava pel final.",
          "candidateFile": "assets/audio/repairs/l31-s061-introduction-prova.mp3",
          "candidateSha256": "f25dcd4aeb9ab9be38fa50b46a5518884fd514a6ca3361a5f020fda834e4f0b6",
          "batchRequestHash": "a60fe358a66004eba2e6b742133d7f9780780baf5a8739a3a428828c3e6fa590"
        }
      ]
    },
    "mountedAt": "2026-11-25T16:38:37.664Z",
    "synthesisBatch": "L18+L31",
    "requestHash": "dc16a998dd54c016f29aea9ddeb8f96910642e7c54885a3d6631840bd64a2ab5",
    "audioSha256": "aea14978de1b304d38448c4a66a5fe038cfaa2b227d6adc23fb756b8acd24924",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/s061-publicacio-v1.webp",
      "illustrationSha256": "feed04db2e819248589caa1eec0c2d6d9a190baf135930cdd9c243067772e1e6",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S082": {
    "state": "published",
    "approvedAt": "2026-11-22T19:59:16.594Z",
    "editorialFingerprint": "2fcaeaff27e3c73f89db693b2efc4df6b29222017b9d72c7fd552647f650a3b6",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S082 validat per publicació definitiva",
    "reason": "Torn de Biel amb «funda» substituït per la represa validada. Ambient real continu d’estança tranquil·la, molt discret sota les veus; sense efectes puntuals afegits. Pendent d’audició del muntatge.",
    "gradingReview": {
      "status": "pending-listening",
      "reviewAfter": "mounted-audio",
      "currentGrade": "6",
      "currentLevel": "advanced",
      "candidateGrade": null,
      "candidateGradeLabel": "1r d’ESO",
      "reviewCourse": true,
      "reviewDifficulty": false,
      "note": "Valorar el possible pas a 1r d’ESO després d’escoltar l’àudio muntat. Ara es mantenen 6è avançada i nou preguntes. Encara no s’ha decidit una qualificació de dificultat per a l’ESO."
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S082-T01"
      ],
      "total": 1,
      "batches": [
        "L20"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "aeca6f6603e65effa772d82806b2925b44d78ce4e7419f51f8c1baea91bbc50d",
      "baseTakeSha256": "dcc33675ef85560b46ae2c2d1a217a5b592101687316ff0907c07ebcb4776bf9",
      "confirmation": "S082 esmenes validades pel docent per incorporar-les i passar a muntatge.",
      "derivation": "Previously approved remaining speech plus the exact teacher-approved replacement; assembled playback still awaits montage audition.",
      "repairs": [
        {
          "part": "mòbil",
          "text": "La gravació del meu mòbil! La vaig fer quan vaig portar-la el primer dia. Hi ha una estona que toco i, després, em poso a parlar de la funda. Potser podria agafar només el tros on sona aquell cop.",
          "candidateFile": "assets/audio/repairs/l26-s082-mòbil-prova.mp3",
          "candidateSha256": "aebc5e627e9c725b15cf5ff8e894c7d9b0d1120b8f55dd5d7ac854f5ee56afdb",
          "batchRequestHash": "528f65283474a1f42bc1be0b2920865817daec53fc0f6634f693552abc5401f1",
          "sourceTakeSha256": "dcc33675ef85560b46ae2c2d1a217a5b592101687316ff0907c07ebcb4776bf9"
        }
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T07:57:54.800Z",
    "voicePreview": "./proves/veus-rebudes.html#S082",
    "voicePreviewFile": "./assets/audio/s082-voices-review-v1.mp3",
    "feedbackAt": "2026-11-23",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "feedback": [
      {
        "part": "mòbil",
        "speaker": "Biel",
        "kind": "pronunciation",
        "word": "funda",
        "heard": "fona",
        "status": "applied",
        "appliedAt": "2026-11-23",
        "audio": "./assets/audio/s082-mixed-v1.mp3"
      }
    ],
    "plannedRepair": {
      "part": "mòbil",
      "speaker": "Biel",
      "text": "La gravació del meu mòbil! La vaig fer quan vaig portar-la el primer dia. Hi ha una estona que toco i, després, em poso a parlar de la funda. Potser podria agafar només el tros on sona aquell cop.",
      "sourceTakeSha256": "dcc33675ef85560b46ae2c2d1a217a5b592101687316ff0907c07ebcb4776bf9",
      "status": "applied-validated",
      "batch": "L26",
      "voice": "Puck"
    },
    "repairComparison": "./proves/correccions-l26.html#S082-mòbil",
    "receivedRepairs": [
      {
        "code": "S082",
        "part": "mòbil",
        "text": "La gravació del meu mòbil! La vaig fer quan vaig portar-la el primer dia. Hi ha una estona que toco i, després, em poso a parlar de la funda. Potser podria agafar només el tros on sona aquell cop.",
        "pronunciation": "Pronounce funda accurately as FUN-da, Central Catalan /ˈfun.də/: stressed U, clear N followed by D. Never fona. Do not spell the word or read this pronunciation instruction.",
        "status": "applied-validated",
        "originalFile": "assets/audio/repairs/l26-s082-mòbil-original.mp3",
        "candidateFile": "assets/audio/repairs/l26-s082-mòbil-prova.mp3",
        "sourceRawSha256": "6b4382326bc34f447e016e085b7ff82937c642a245eeb59de1fc3cf7f531076a",
        "sourceTakeId": "S082-T01",
        "sourceTakeSha256": "dcc33675ef85560b46ae2c2d1a217a5b592101687316ff0907c07ebcb4776bf9",
        "batchRequestHash": "528f65283474a1f42bc1be0b2920865817daec53fc0f6634f693552abc5401f1",
        "applied": true,
        "approvedAt": "2026-11-23",
        "confirmation": "S082 esmenes validades pel docent per incorporar-les i passar a muntatge.",
        "candidateSha256": "aebc5e627e9c725b15cf5ff8e894c7d9b0d1120b8f55dd5d7ac854f5ee56afdb",
        "appliedAt": "2026-11-23",
        "appliedAudio": "./assets/audio/s082-mixed-v1.mp3",
        "validatedAt": "2026-11-23",
        "validatedAudioSha256": "d3a961182ed8891ca400effc42680313a82570533fa233ee0a1698988bd89559"
      }
    ],
    "repairApplicationApproval": {
      "at": "2026-11-23",
      "scope": "approved-repair",
      "confirmation": "S082 esmenes validades pel docent per incorporar-les i passar a muntatge.",
      "clips": [
        {
          "part": "mòbil",
          "text": "La gravació del meu mòbil! La vaig fer quan vaig portar-la el primer dia. Hi ha una estona que toco i, després, em poso a parlar de la funda. Potser podria agafar només el tros on sona aquell cop.",
          "candidateFile": "assets/audio/repairs/l26-s082-mòbil-prova.mp3",
          "candidateSha256": "aebc5e627e9c725b15cf5ff8e894c7d9b0d1120b8f55dd5d7ac854f5ee56afdb",
          "batchRequestHash": "528f65283474a1f42bc1be0b2920865817daec53fc0f6634f693552abc5401f1",
          "sourceTakeSha256": "dcc33675ef85560b46ae2c2d1a217a5b592101687316ff0907c07ebcb4776bf9"
        }
      ]
    },
    "mountedAt": "2026-11-23T16:40:55.743Z",
    "synthesisBatch": "L20+L26",
    "requestHash": "4f9884fd45df9fce2774bff1e4e6b8cfcd231dc72144dc1671285f141c9bcaca",
    "audioSha256": "d3a961182ed8891ca400effc42680313a82570533fa233ee0a1698988bd89559",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/el-so-que-voliem-gravar-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S077": {
    "state": "published",
    "approvedAt": "2026-11-22T20:05:09.021Z",
    "editorialFingerprint": "24723a7df5eb73cc68bcc00a78a7d2e53e4660a4123c8225562461847c4184ae",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S077 validat per publicació definitiva",
    "reason": "Repartiment Laia/Leda i Ona/Sulafat complet: recalcular agrupacions amb text pla abans de congelar lots de sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S077-T01"
      ],
      "total": 1,
      "batches": [
        "L16"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "585f3e0362e18519b68b896adac013785cdaa6f0168bbb8ddab5675f8fdcbda6",
      "confirmation": "S077 validat per pujar a muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T07:55:30.597Z",
    "voicePreview": "./proves/veus-rebudes.html#S077",
    "voicePreviewFile": "./assets/audio/s077-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T12:11:36.266Z",
    "synthesisBatch": "L16",
    "requestHash": "588839376334e915c4952fab7c33def098c4cfa5d066e7c5bbf7ef749940ae59",
    "audioSha256": "17dcc6ee55bcbc926846d2cd20fd30d940d7c62ff2a1c8ac1d712ec99de27d03",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/el-sopar-que-havia-de-viatjar-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S045": {
    "state": "published",
    "approvedAt": "2026-11-22T20:05:09.021Z",
    "editorialFingerprint": "9c2f38c179fcb9f624fd924f847ecd44c4dc18bc2cf934425d6a84062c7fa10e",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S045 resta del muntatge validada per publicació definitiva després de retirar només el so inicial, sense nova revisió docent",
    "reason": "Agrupar records complets validats de Ferran/Algenib fins a sis a vuit minuts. S045D tindrà validació pròpia.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S045-T01"
      ],
      "total": 1,
      "batches": [
        "L17"
      ]
    },
    "voicesReceivedAt": "2026-11-22T20:49:56.816Z",
    "voicePreview": "./proves/veus-rebudes.html#S045",
    "voicePreviewFile": "./assets/audio/s045-voices-review-v1.mp3",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-22",
      "sourceTakeSha256": "b719993201db3333152ee5743152082a1634adeac5dfa2bb578c117988fbf353",
      "confirmation": "S045 també directe a muntatge, molt bé tot, fins i tot el moment natural en què empassa saliva."
    },
    "mountedAt": "2026-11-22T21:59:06.491Z",
    "synthesisBatch": "L17",
    "requestHash": "3614318c8fb54c97021a43d7a5ac29a9c5f2642f00894c7d7e5ae616d6adc099",
    "audioSha256": "ba3411eafb7d242c7979eb87e06b7a44500ad160433fc81c685d2d458b95c4ec",
    "montageNewSynthesisRequests": 0,
    "reviewUpdate": {
      "audio": "./assets/audio/s045-no-opening-v2.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Retirat només l’efecte inicial. Veu, música, cadira intermèdia i durada conservades; publicació autoritzada pel docent amb aquesta esmena.",
        "es": "Retirado solo el efecto inicial. Voz, música, silla intermedia y duración conservadas; publicación autorizada por el docente con esta corrección."
      }
    },
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/les-cadires-del-cinema-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": true
    }
  },
  "ca-S078": {
    "state": "published",
    "approvedAt": "2026-11-22T20:08:51.941Z",
    "editorialFingerprint": "8c331ffda115e7eefa3f9d73dc20e8b7a1bda73500768455a469aa15886d35b7",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S078 validat per publicació definitiva",
    "gradingAssessment": "El docent considera ben calibrada la qualificació actual de 5è accessible.",
    "reason": "Veus aprovades pel docent i primer muntatge completat localment; pendent d’audició del muntatge.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S078-T01"
      ],
      "total": 1,
      "batches": [
        "L26"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "178b468baa695209c42fb464826273ac8d803632034bfb708b40f25648de4d57",
      "confirmation": "S078 validat per pujar a muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T12:30:54.324Z",
    "voicePreview": "./proves/veus-rebudes.html#S078",
    "voicePreviewFile": "./assets/audio/s078-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T13:40:20.934Z",
    "synthesisBatch": "L26",
    "requestHash": "528f65283474a1f42bc1be0b2920865817daec53fc0f6634f693552abc5401f1",
    "audioSha256": "e7e612a81ca956d6cf5c9aa07290aa6d9b962aca8a630f06f7fc51b5396830bc",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/el-soroll-que-seguia-la-cadira-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S047": {
    "state": "published",
    "approvedAt": "2026-11-22T20:16:52.042Z",
    "editorialFingerprint": "04a7b0b557036661dc4b8237e1af4c9f934b9b912bc14c80774142a57625c34f",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S047 validat per publicació definitiva",
    "reason": "P01 complet amb S045,S046,S047,S069; preparar un lot Ferran/Algenib de sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S047-T01"
      ],
      "total": 1,
      "batches": [
        "L17"
      ]
    },
    "voicesReceivedAt": "2026-11-22T20:49:56.816Z",
    "voicePreview": "./proves/veus-rebudes.html#S047",
    "voicePreviewFile": "./assets/audio/s047-voices-review-v1.mp3",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-22",
      "sourceTakeSha256": "0a299ff99e309f1bea98b95ba32d268402c74c586195144b92aac4a456f18907",
      "confirmation": "S047 validat per muntatge, molt bé les inflexions del personatge"
    },
    "mountedAt": "2026-11-22T21:58:59.637Z",
    "synthesisBatch": "L17",
    "requestHash": "3614318c8fb54c97021a43d7a5ac29a9c5f2642f00894c7d7e5ae616d6adc099",
    "audioSha256": "344f1409128aeee01d9a3c18abee26dceb89fe4779044c210fb2e830fb2cc408",
    "montageNewSynthesisRequests": 0,
    "feedbackAt": "2026-11-23",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "feedback": [
      {
        "part": "tren",
        "kind": "ambience",
        "word": "Entrada del tren",
        "status": "applied"
      },
      {
        "part": "por",
        "kind": "transition",
        "word": "Arribada amb frens",
        "status": "applied"
      }
    ],
    "reviewUpdate": {
      "audio": "./assets/audio/s047-train-v3.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Tren després del primer paràgraf: un segon amb presència i després molt baix sota el trajecte. Pujada i frens reals abans de casa, amb una pausa de 2,4 s. Veus conservades; pendent d’última escolta.",
        "es": "Tren tras el primer párrafo: un segundo con presencia y después muy bajo durante el viaje. Subida y frenos reales antes de casa, con una pausa de 2,4 s. Voces conservadas; pendiente de última escucha."
      }
    },
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/la-maleta-que-feia-soroll-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S058": {
    "state": "published",
    "approvedAt": "2026-11-22T20:16:52.042Z",
    "editorialFingerprint": "d23504df787869cb72ff7281e4d9da4e76067b9dda4c09b16bd219e408b8a8a1",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 25/11: S058 validat per publicació definitiva.",
    "reason": "P06 complet amb S058,S061,S062; preparar un lot Laia/Leda i Biel/Puck de sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S058-T01"
      ],
      "total": 1,
      "batches": [
        "L18"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "41b9054c90bc68390aade806e98599e2fe8038e9e5c790219c2d5ec465253b78",
      "confirmation": "Docent 25/11: S058 validat per muntatge.",
      "confirmedAfterMetadataCleanup": true
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-22T20:58:09.995Z",
    "voicePreview": "./proves/veus-rebudes.html#S058",
    "voicePreviewFile": "./assets/audio/s058-voices-review-v2.mp3",
    "voiceReviewUpdate": {
      "file": "./assets/audio/s058-voices-review-v2.mp3",
      "at": "2026-11-22",
      "conversion": "removed-35-interleaved-c2pa-id3-tags",
      "summary": {
        "ca": "Cruixits de metadades retirats. Torna a escoltar la presa neta; «trossets» continua pendent de comprovar i corregir.",
        "es": "Crujidos de metadatos retirados. Vuelve a escuchar la toma limpia; «trossets» sigue pendiente de comprobar y corregir."
      }
    },
    "feedbackAt": "2026-11-22",
    "feedback": [
      {
        "part": "conversion",
        "word": "Cruixits repetits",
        "status": "applied",
        "resolution": "35 etiquetes ID3/C2PA retirades del lot, mostres de veu conservades"
      },
      {
        "part": "avis",
        "word": "trossets",
        "heard": "torsets",
        "status": "resolved-by-teacher",
        "resolvedAt": "2026-11-25",
        "resolution": "Presa neta validada per muntatge; no cal regenerar trossets."
      }
    ],
    "plannedRepair": {
      "part": "avis",
      "text": "I el número el deixem al descobert. Mira, agafo dos trossets de cinta i ho provem abans d’enganxar-ho tot. Aguanta tu, que ara vull mirar-ho des de fora.",
      "speaker": "Biel",
      "sourceTakeSha256": "41b9054c90bc68390aade806e98599e2fe8038e9e5c790219c2d5ec465253b78",
      "status": "not-needed-after-teacher-listening"
    },
    "teacherAssessment": "Veus, esmenes incorporades i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "mountedAt": "2026-11-25T17:11:13.508Z",
    "synthesisBatch": "L18",
    "requestHash": "f1a68c184a8ed0118f14d57dc5a685880f5b7affe7562ae9d14cbc273639f768",
    "audioSha256": "f692e7ee26901e76187b63003059719cfa7cd0b28f41b8f586da396025c8ef32",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/s058-publicacio-v1.webp",
      "illustrationSha256": "69cbe395870264ecf4f49d2e7d591ff3aa2c5abb3df8942fd06f799432e1a300",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S081": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-22T20:22:58.661Z",
    "editorialFingerprint": "2a784ecc42769c082794208ddcddb9a8c38dcaa50efa60baa1eee066bc814cf4",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "S081 validada per síntesi amb el tancament esmenat",
    "reason": "P15 complet amb S081 i S082; preparar lot Biel/Puck i Elies/Algieba de sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S081-T01"
      ],
      "total": 1,
      "batches": [
        "L20"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-26",
      "sourceTakeSha256": "4cd47508a7eab16e8c7dce05299780125afd9369b66eace81836b6dee42af3c3",
      "baseTakeSha256": "c0d440ba68229efe4457f53243bf0683e8f7241768c39b72b716cd7fa18bc35a",
      "confirmation": "Docent 26/11: S081 validat per muntatge amb les esmenes rebudes final.",
      "derivation": "Previously approved remaining speech plus the exact teacher-approved replacement; assembled playback still awaits montage audition.",
      "repairs": [
        {
          "part": "final",
          "text": "De res, Biel. Espera, que t’aguanto la funda mentre hi poses el full... així... Fins dijous, i ja m’explicaràs com va l’assaig.",
          "candidateFile": "assets/audio/repairs/l43-s081-final-prova.mp3",
          "candidateSha256": "666c04857ccd3c078c21ed1230127c286204654a617c122e8b901224c9ec4c8c",
          "batchRequestHash": "9960a95b4a6a51078cec246c7fc38c6fb297a46045a22136e5b69ded99107088",
          "sourceTakeSha256": "c0d440ba68229efe4457f53243bf0683e8f7241768c39b72b716cd7fa18bc35a",
          "candidateTakeId": "S081-final-r4",
          "sourceRequestHash": "40b985582496b2996c4c2fec3ae2c6e288afd02b2f9b8ed3032bc1e3086bed38"
        }
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T07:57:54.800Z",
    "voicePreview": "./proves/veus-rebudes.html#S081",
    "voicePreviewFile": "./assets/audio/s081-voices-review-v2.mp3",
    "feedbackAt": "2026-11-25",
    "teacherAssessment": "Veus i esmenes aprovades incorporades al muntatge. Pendent de l’audició final del docent.",
    "feedback": [
      {
        "part": "telefon",
        "speaker": "Elies",
        "kind": "pronunciation",
        "word": "funda",
        "heard": "funa",
        "status": "applied",
        "appliedAt": "2026-11-26"
      },
      {
        "part": "final",
        "speaker": "Elies",
        "kind": "pronunciation",
        "word": "funda",
        "heard": "fona en lloc de funda",
        "status": "applied",
        "appliedAt": "2026-11-26"
      }
    ],
    "plannedRepair": {
      "parts": [],
      "speaker": "Elies",
      "voice": "Algieba",
      "sourceTakeSha256": "abda1d2cdb2f1727886fb57d1c539a7df87595eeba6fae9f2d43c4885f9fa0bd",
      "status": "applied-awaiting-montage-listening",
      "attempt": 4,
      "batch": "L43",
      "part": "final"
    },
    "repairComparison": "./proves/correccions-l43.html#S081-final",
    "receivedRepairs": [
      {
        "code": "S081",
        "part": "telefon",
        "text": "Sí, truca abans de venir. T’ho explicaré per telèfon. Aquest matí ja he comprovat la guitarra de préstec i només falta que la guardem a la funda.",
        "pronunciation": "Pronounce funda /ˈfun.də/ with stressed U and audible N followed by D: FUN-da, never funa or fona. Keep the adult male Elies voice; do not read this instruction. Prior renderings omitted D or changed U to O. Give the N-D transition enough articulation to hear both consonants, without adding a vowel or spelling letters aloud.",
        "status": "applied-validated-partial",
        "originalFile": "assets/audio/repairs/l39-s081-telefon-original.mp3",
        "candidateFile": "assets/audio/repairs/l39-s081-telefon-prova.mp3",
        "sourceRawSha256": "6b4382326bc34f447e016e085b7ff82937c642a245eeb59de1fc3cf7f531076a",
        "sourceTakeId": "S081-T01",
        "sourceTakeSha256": "abda1d2cdb2f1727886fb57d1c539a7df87595eeba6fae9f2d43c4885f9fa0bd",
        "batchRequestHash": "507a423d7bc8bf6247c3ff6b5ca198711696b71edabb32edb9158ce33eb4eb40",
        "applied": true,
        "approvedAt": "2026-11-26",
        "confirmation": "Docent 26/11: esmena telefon de S081 validada; incorporar la presa exacta.",
        "candidateSha256": "fb382bbd9dc74b27dac12bb0fe3ed893c7f8e4c4a3eef5812b4b44bededb242a",
        "appliedAt": "2026-11-26",
        "appliedFile": "assets/audio/s081-voices-review-v2.mp3",
        "appliedAudio": "./assets/audio/s081-voices-review-v2.mp3",
        "appliedAudioSha256": "f0e01801bddb1049a9f14e78cd87596d7a8537437ddd343947b01b35af349ec3"
      },
      {
        "code": "S081",
        "part": "final",
        "text": "De res, Biel. Espera, que t’aguanto la funda mentre hi poses el full... així... Fins dijous, i ja m’explicaràs com va l’assaig.",
        "pronunciation": "Pronounce funda /ˈfun.də/ with stressed U and audible N followed by D: FUN-da, never funa or fona. Keep the adult male Elies voice; do not read this instruction. Prior renderings omitted D or changed U to O. Give the N-D transition enough articulation to hear both consonants, without adding a vowel or spelling letters aloud.",
        "status": "applied-awaiting-montage-listening",
        "originalFile": "assets/audio/repairs/l43-s081-final-original.mp3",
        "candidateFile": "assets/audio/repairs/l43-s081-final-prova.mp3",
        "sourceRawSha256": "c0d440ba68229efe4457f53243bf0683e8f7241768c39b72b716cd7fa18bc35a",
        "sourceTakeId": "S081-PARTIAL-TELEFON-V1",
        "sourceTakeSha256": "c0d440ba68229efe4457f53243bf0683e8f7241768c39b72b716cd7fa18bc35a",
        "batchRequestHash": "9960a95b4a6a51078cec246c7fc38c6fb297a46045a22136e5b69ded99107088",
        "applied": true,
        "approvedAt": "2026-11-26",
        "confirmation": "Docent 26/11: esmena S081/final validada.",
        "candidateSha256": "666c04857ccd3c078c21ed1230127c286204654a617c122e8b901224c9ec4c8c",
        "appliedAt": "2026-11-26",
        "appliedAudio": "./assets/audio/s081-mixed-v1.mp3",
        "appliedAudioSha256": "aa6363a4bb2b44510e323de8cda53bd4317ded3441d41fc029c1fbee5a02973f"
      }
    ],
    "repairApplicationApproval": {
      "scope": "approved-repair",
      "approvedAt": "2026-11-26",
      "confirmation": "Docent 26/11: S081 validat per muntatge amb les esmenes rebudes final.",
      "sourceTakeSha256": "c0d440ba68229efe4457f53243bf0683e8f7241768c39b72b716cd7fa18bc35a",
      "clips": [
        {
          "part": "final",
          "text": "De res, Biel. Espera, que t’aguanto la funda mentre hi poses el full... així... Fins dijous, i ja m’explicaràs com va l’assaig.",
          "candidateFile": "assets/audio/repairs/l43-s081-final-prova.mp3",
          "candidateSha256": "666c04857ccd3c078c21ed1230127c286204654a617c122e8b901224c9ec4c8c",
          "batchRequestHash": "9960a95b4a6a51078cec246c7fc38c6fb297a46045a22136e5b69ded99107088",
          "sourceTakeSha256": "c0d440ba68229efe4457f53243bf0683e8f7241768c39b72b716cd7fa18bc35a",
          "candidateTakeId": "S081-final-r4",
          "sourceRequestHash": "40b985582496b2996c4c2fec3ae2c6e288afd02b2f9b8ed3032bc1e3086bed38"
        }
      ]
    },
    "voiceReviewUpdate": {
      "audio": "./assets/audio/s081-voices-review-v2.mp3",
      "at": "2026-11-26",
      "summary": {
        "ca": "Primera esmena de funda incorporada. Només queda pendent la frase final de l’Elies, que encara diu fona.",
        "es": "Primera corrección de funda incorporada. Solo queda pendiente la frase final de Elies, que aún dice fona."
      }
    },
    "appliedPartialVoiceRepair": {
      "takeId": "S081-PARTIAL-TELEFON-V1",
      "sourceTakeSha256": "c0d440ba68229efe4457f53243bf0683e8f7241768c39b72b716cd7fa18bc35a",
      "part": "telefon",
      "approvedAt": "2026-11-26",
      "originalTakeId": "S081-T01"
    },
    "repairApplicationHistory": [
      {
        "scope": "approved-partial-repair",
        "approvedAt": "2026-11-26",
        "confirmation": "Docent 26/11: esmena telefon de S081 validada; incorporar la presa exacta.",
        "clips": [
          {
            "part": "telefon",
            "text": "Sí, truca abans de venir. T’ho explicaré per telèfon. Aquest matí ja he comprovat la guitarra de préstec i només falta que la guardem a la funda.",
            "candidateFile": "assets/audio/repairs/l39-s081-telefon-prova.mp3",
            "candidateSha256": "fb382bbd9dc74b27dac12bb0fe3ed893c7f8e4c4a3eef5812b4b44bededb242a",
            "batchRequestHash": "507a423d7bc8bf6247c3ff6b5ca198711696b71edabb32edb9158ce33eb4eb40",
            "sourceTakeSha256": "abda1d2cdb2f1727886fb57d1c539a7df87595eeba6fae9f2d43c4885f9fa0bd",
            "candidateTakeId": "S081-telefon-r3",
            "sourceRequestHash": "f3e56f7df16200e33d65e2806d7d8abbdedca38e9f5b17af7bc5e3579cc5621a"
          }
        ]
      }
    ],
    "bodyVoiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-26",
      "sourceTakeSha256": "c0d440ba68229efe4457f53243bf0683e8f7241768c39b72b716cd7fa18bc35a",
      "confirmation": "Docent 26/11: S081 validat per muntatge amb les esmenes rebudes final."
    },
    "mountedAt": "2026-11-26T09:10:33.568Z",
    "synthesisBatch": "L20+L39+L43",
    "requestHash": "22a4f2afc9eb1656b70dcb9ef2c841a1246fb6ac3466d93c71899531dcdd8690",
    "audioSha256": "aa6363a4bb2b44510e323de8cda53bd4317ded3441d41fc029c1fbee5a02973f",
    "montageNewSynthesisRequests": 0,
    "reviewUpdate": {
      "audio": "./assets/audio/s081-mixed-v1.mp3",
      "at": "2026-11-26",
      "summary": {
        "ca": "Esmenes validades incorporades. Ambient enregistrat continu i suau, sense pauses d’efectes. Pendent d’escoltar el muntatge.",
        "es": "Correcciones validadas incorporadas. Ambiente grabado continuo y suave, sin pausas de efectos. Pendiente de escuchar el montaje."
      }
    }
  },
  "ca-S079": {
    "state": "published",
    "approvedAt": "2026-11-22T20:27:37.701Z",
    "editorialFingerprint": "ef791b386968c409f043f6b46df29808baade66f2441be1e976c727339ad66d5",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S079 validat per publicació definitiva",
    "reason": "Veus aprovades pel docent i primer muntatge completat localment; pendent d’audició del muntatge.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S079-T01"
      ],
      "total": 1,
      "batches": [
        "L26"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "b605ca16933b2dddc6483ad87b1150209542ab742cee513769b516ac146bb146",
      "confirmation": "S079 validat per pujar a muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T12:30:54.324Z",
    "voicePreview": "./proves/veus-rebudes.html#S079",
    "voicePreviewFile": "./assets/audio/s079-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T13:32:03.379Z",
    "synthesisBatch": "L26",
    "requestHash": "528f65283474a1f42bc1be0b2920865817daec53fc0f6634f693552abc5401f1",
    "audioSha256": "1d33cac40b7aa5c4bee8c780f2498389901da26f4dad39ae9941a6ec55826958",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/una-funda-que-no-tanca-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S067": {
    "state": "published",
    "approvedAt": "2026-11-22T20:38:27.980Z",
    "editorialFingerprint": "c231f7eedf8207fe7c6c325c14000eeb8100f19a8912543c49ec1828f23e2408",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S067 validat per publicació definitiva",
    "gradingDecision": {
      "date": "2026-11-22",
      "grade": "eso1",
      "level": "middle",
      "previousGrade": "6",
      "previousLevel": "advanced",
      "source": "Decisió explícita del docent: càrrega d’informació i discriminació més pertinent per a 1r d’ESO.",
      "spokenTextChanged": false
    },
    "reason": "Veus aprovades pel docent i primer muntatge completat localment; pendent d’audició del muntatge.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S067-T01"
      ],
      "total": 1,
      "batches": [
        "L21"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "3f8ecfc84ece935d9733e6ab08aef8f1b5f7d5ce0cf95c55c1512b331df416f8",
      "confirmation": "S067 validat per muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T12:20:14.416Z",
    "voicePreview": "./proves/veus-rebudes.html#S067",
    "voicePreviewFile": "./assets/audio/s067-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T13:54:18.351Z",
    "synthesisBatch": "L21",
    "requestHash": "a8c5196dba3b7699202dbef8681a9fefe519de2d560579efeb91b7f4d561197b",
    "audioSha256": "7efc542bbd91286c086e017e683bb719299840fdca3b701569782746d7db399c",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/la-mateixa-pregunta-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S063": {
    "state": "published",
    "approvedAt": "2026-11-23T09:49:01.701Z",
    "editorialFingerprint": "fb10bea15bb4237737a95f58165ee3e3b8a7604b279106cfad8690805e9e4b80",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S063 validat per publicació definitiva",
    "reason": "Veus aprovades pel docent i primer muntatge completat localment; pendent d’audició del muntatge.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S063-T01"
      ],
      "total": 1,
      "batches": [
        "L27"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "e66559d86d4e0bf1429ef79a52e0f853b75421c7f4857958c75fe5e81fc95a26",
      "confirmation": "S063 validat per muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T13:19:33.550Z",
    "voicePreview": "./proves/veus-rebudes.html#S063",
    "voicePreviewFile": "./assets/audio/s063-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T16:12:15.380Z",
    "synthesisBatch": "L27",
    "requestHash": "a8a1c31ecd69f92c20a41e6a739917e717f6da8007fba6592d62f5d5b553f9c0",
    "audioSha256": "622468f337ece93d58b741fba78dc5d8ed0c8f742f4bcf1dade1d3c1787cd37b",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/el-pont-de-paper-es-doblega-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S070": {
    "state": "voices-received",
    "approvedAt": "2026-11-23T09:49:01.707Z",
    "editorialFingerprint": "c329111785d5c98723a68257817238bd4792b6d1e4aa29db52169070f355f2dd",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S070 validat per pujar a síntesi de veus",
    "reason": "S’asseia sona amb accent a la i. Esmena del torn esperar en cua per a un lot compatible; muntatge pendent de validació de veus.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S070-T02"
      ],
      "total": 1,
      "batches": [
        "L41"
      ]
    },
    "voiceApproval": false,
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-26T07:48:14.206Z",
    "voicePreview": "./proves/veus-rebudes.html#S070",
    "voicePreviewFile": "./assets/audio/s070-voices-review-v2.mp3",
    "feedbackAt": "2026-11-23",
    "teacherAssessment": "Regeneració íntegra validada: les esmenes parcials enfosqueixen el timbre de Ferran. Conservar original i esperar una presa homogènia.",
    "feedback": [
      {
        "part": "esperar",
        "speaker": "Ferran",
        "kind": "pronunciation",
        "word": "s’asseia",
        "heard": "s’assaía, amb tonicitat a la i",
        "status": "pending"
      }
    ],
    "plannedRepair": {
      "scope": "whole-recording",
      "part": "whole",
      "takeId": "S070-T02",
      "status": "received-awaiting-listening",
      "sourceTakeId": "S070-T01",
      "sourceTakeSha256": "760143315f68bf9b649e208ed3e37c6ad3e325488f8b73198d1a1b8099367da3",
      "parts": [
        "introduction",
        "festa",
        "llum",
        "esperar",
        "comencar",
        "tornar",
        "despres"
      ],
      "planFile": "content/full-voice-retakes.json",
      "approvedRequestHash": "7b04358057b0407a6902450302d6c6bc8f58ca3f687f64fe4fe5206347e06782"
    },
    "repairComparison": "./proves/correccions-l30.html#S070-esperar",
    "receivedRepairs": [
      {
        "code": "S070",
        "part": "esperar",
        "text": "Els grans anaven d’un costat a l’altre per saber què havia passat. Mentrestant, la gent s’asseia i els petits corríem entre les cadires. El pare va anar a buscar l’acordió, que havia deixat a casa d’aquell veí, a la planta baixa, perquè no li fes nosa.",
        "pronunciation": "In s’asseia, place the stress on the E syllable: as-SE-ia, not on I. Keep the following i els petits as the separate conjunction and phrase, fluently linked without changing any words. Preserve the warm older male Ferran/Algenib character. Pronunciation directions are not spoken.",
        "status": "superseded-by-whole-retake",
        "originalFile": "assets/audio/repairs/l30-s070-esperar-original.mp3",
        "candidateFile": "assets/audio/repairs/l30-s070-esperar-prova.mp3",
        "sourceRawSha256": "f59f33398e753916473bd88dc78345ff02faeedc4f4bb046275f9d453bc4b561",
        "sourceTakeId": "S070-T01",
        "sourceTakeSha256": "760143315f68bf9b649e208ed3e37c6ad3e325488f8b73198d1a1b8099367da3",
        "batchRequestHash": "e976118d4059a3906fef68d10a896878017b880860e49a669844b0cafb799cb1",
        "applied": false,
        "supersededAt": "2026-11-26"
      }
    ],
    "localRepairTrial": {
      "status": "requested",
      "at": "2026-11-25",
      "preserveOriginalSentence": "Els grans anaven d’un costat a l’altre per saber què havia passat.",
      "replaceFrom": "Mentrestant, la gent s’asseia",
      "candidateFile": "assets/audio/repairs/l30-s070-esperar-prova.mp3",
      "candidateSha256": "3e25308e931435fec6a88f95df01489ee8ea5419648a979f634a1fa60591d5b8",
      "voiceApproval": false
    },
    "fullRetakeReceived": {
      "takeId": "S070-T02",
      "approvedAt": "2026-11-26",
      "approvalSource": "Docent 26/11: tornar a generar l’àudio sencer de S070 perquè l’esmena enfosqueix la veu i no resol el problema.",
      "approvedRequestHash": "7b04358057b0407a6902450302d6c6bc8f58ca3f687f64fe4fe5206347e06782",
      "sourceTakeId": "S070-T01",
      "sourceTakeSha256": "760143315f68bf9b649e208ed3e37c6ad3e325488f8b73198d1a1b8099367da3",
      "sourceRequestHash": "4a2634e49163d602016cbc69c25809b31754d5e940e3283e0c938522deada250",
      "sourceRawSha256": "f59f33398e753916473bd88dc78345ff02faeedc4f4bb046275f9d453bc4b561",
      "sourceEditorialFingerprint": "c329111785d5c98723a68257817238bd4792b6d1e4aa29db52169070f355f2dd",
      "preservesOriginals": true,
      "montageAllowed": false,
      "voiceApproval": false
    }
  },
  "ca-S072": {
    "state": "published",
    "approvedAt": "2026-11-23T09:49:01.707Z",
    "editorialFingerprint": "050e3758c3de2cfb00935b59cc206fca0e8a77c848c86aca3c8c216f3572c801",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 25/11: S094, S111, S099, S072 i S089 validats per publicació definitiva.",
    "reason": "Validació docent explícita del guió, veus i escaleta. Preparar en un lot compatible abans de qualsevol enviament.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S072-T01"
      ],
      "total": 1,
      "batches": [
        "L30"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "5aa75156effa480df7748d3d5b6005f7d337835683197c5386efd3be84e29533",
      "confirmation": "Docent 25/11: S072 validat per muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T21:49:32.020Z",
    "voicePreview": "./proves/veus-rebudes.html#S072",
    "voicePreviewFile": "./assets/audio/s072-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T13:49:05.001Z",
    "synthesisBatch": "L30",
    "requestHash": "e976118d4059a3906fef68d10a896878017b880860e49a669844b0cafb799cb1",
    "audioSha256": "a0a4311c71323043f0277f9997f7f50b7d072cf21b4332ec65793dd4d108b96f",
    "montageNewSynthesisRequests": 0,
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/s072-publicacio-v1.webp",
      "illustrationSha256": "d9be910b839271cbd831537d40742797ca9288e39803064d1fdc3b964d87da61",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S069D": {
    "state": "published",
    "approvedAt": "2026-11-23T09:49:01.707Z",
    "editorialFingerprint": "bf16fa6e87da8dba91bbeb76010c0a042f429ae954a8e48d29735a83065cee14",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S069D validat per publicació definitiva",
    "reason": "Veus aprovades pel docent i primer muntatge completat localment; pendent d’audició del muntatge.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S069D-T01"
      ],
      "total": 1,
      "batches": [
        "L23"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "735afffe53cc9d8200db48b94f7db1e6fca4943cbb9759344545fdfcf7be0c80",
      "confirmation": "S069D validat per muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T12:14:25.276Z",
    "voicePreview": "./proves/veus-rebudes.html#S069D",
    "voicePreviewFile": "./assets/audio/s069d-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T13:53:10.632Z",
    "synthesisBatch": "L23",
    "requestHash": "756f855e4c2be092cf27a2e4508782dc064c45b5cef6d6697850ea86088fd55e",
    "audioSha256": "2dd65c1de179927e768e4e45334e60a3955d4185e7a5a38f45a0f77072f31056",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/la-pissarra-del-partit-dialogada-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S046D": {
    "state": "published",
    "approvedAt": "2026-11-23T09:49:01.708Z",
    "editorialFingerprint": "ae547cddb1b01e9922676a15eb091070fe893f45069e85b2008f07c7d0cd5943",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S046D validat per publicació definitiva",
    "reason": "Veus aprovades pel docent i primer muntatge completat localment; pendent d’audició del muntatge.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S046D-T01"
      ],
      "total": 1,
      "batches": [
        "L23"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "715d0f04f936e233fd808beef3a1b074820f3a8b52d1a27f26c8b8e6e9793771",
      "confirmation": "S046D validat per pujar a muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T12:14:25.276Z",
    "voicePreview": "./proves/veus-rebudes.html#S046D",
    "voicePreviewFile": "./assets/audio/s046d-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T13:40:38.026Z",
    "synthesisBatch": "L23",
    "requestHash": "756f855e4c2be092cf27a2e4508782dc064c45b5cef6d6697850ea86088fd55e",
    "audioSha256": "62aadfc67667d04dfdeae0b3c7fa93b409a35b42aed6d7f87af0780284c98b41",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/la-clau-del-davantal-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S060": {
    "editorialFingerprint": "820aeb028c55194b422957bca89655931f49cdd925c569dd9a366926e5e230bd",
    "state": "published",
    "approvedAt": "2026-11-23T09:53:37.288Z",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S060: muntatge validat per publicació definitiva al traspàs docent del 25/11/2026; abast de les tretze peces confirmat pel docent en aquesta conversa.",
    "reason": "Guió validat pel docent amb metadades i escaleta requalificades; pendent de lot compatible.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S060-T01"
      ],
      "total": 1,
      "batches": [
        "L31"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "b2bacd58b13e5bb9d8283c5add76857fc72cbe15d000eec603858f05d0462229",
      "confirmation": "Docent 25/11: S060 validat per muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T21:51:41.247Z",
    "voicePreview": "./proves/veus-rebudes.html#S060",
    "voicePreviewFile": "./assets/audio/s060-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T07:31:45.905Z",
    "synthesisBatch": "L31",
    "requestHash": "a60fe358a66004eba2e6b742133d7f9780780baf5a8739a3a428828c3e6fa590",
    "audioSha256": "dde3cd998bb713db155613d7d24c664c1601c2d71ce4a9230b52f4a72f0b3185",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "teacherAssessment": "Muntatge validat definitivament pel docent al traspàs confirmat. Àudio conservat sense canvis.",
    "publicationMaterials": {
      "illustration": "./assets/images/s060-publicacio-v1.jpg",
      "illustrationSha256": "e7ea7998beaa871a8f4e928304818b2592221e73b6fbb774b638fb189b7f5ccf",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S066": {
    "editorialFingerprint": "9faf67197254fd1dad8710cf27c885f88bd0a7f1bbe7b969f2090298fed209fe",
    "state": "published",
    "approvedAt": "2026-11-23T09:53:37.290Z",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S066 validat per publicació definitiva",
    "reason": "Veus aprovades pel docent i primer muntatge completat localment; pendent d’audició del muntatge.",
    "gradingReview": {
      "status": "pending-listening",
      "reviewCourse": true,
      "reviewDifficulty": true,
      "candidateGrade": "6",
      "candidateGradeLabel": "6è de primària · intermèdia",
      "note": "S’ha aplicat 6è intermèdia per retorn docent, amb qualificació per confirmar després d’escoltar el muntatge."
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S066-T01"
      ],
      "total": 1,
      "batches": [
        "L21"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "7da804a72aa091587124aba4e5065682b328de2bbe521f8805a3792c4753db11",
      "confirmation": "S066 validat per muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T12:20:14.416Z",
    "voicePreview": "./proves/veus-rebudes.html#S066",
    "voicePreviewFile": "./assets/audio/s066-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T13:55:15.508Z",
    "synthesisBatch": "L21",
    "requestHash": "a8c5196dba3b7699202dbef8681a9fefe519de2d560579efeb91b7f4d561197b",
    "audioSha256": "02da496143542ca2a1136c18b720e92785ec6866d52db86785dff05af164ecdb",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/el-mapa-de-sons-del-passadis-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S059": {
    "state": "published",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "1a454cb2afcd9a58c64dee952a445e5655045242a593d79b79f8a5d36a766c65",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 25/11: S061, S071, S022, S059 i S025 validats per publicació definitiva.",
    "reason": "Validació docent explícita de guió, veus i escaleta. Agrupar lectures completes del mateix repartiment en sis a vuit minuts abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S059-T01"
      ],
      "total": 1,
      "batches": [
        "L31"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "52e4660fd16743fe694ffc6ea255ac44865fff0e6a1fb69f421b7d0316d4e64b",
      "baseTakeSha256": "8cb4bfbb0afa9e182b91982c960106d706969905499b4cffa78c98bd85800689",
      "confirmation": "Docent 25/11: S059 validat amb les esmenes rebudes.",
      "derivation": "Previously approved remaining speech plus the exact teacher-approved replacement; assembled playback still awaits montage audition.",
      "repairs": [
        {
          "part": "arbre",
          "text": "A aquesta sí. A les del final... Ai, he fet caure l’arbre de cartró! Sempre em queda al mig. És bonic, però el podríem posar dret al costat de la capsa, a la cadira.",
          "candidateFile": "assets/audio/repairs/l36-s059-arbre-prova.mp3",
          "candidateSha256": "063c3ecbf61d4873ad65526d26584f39d88e8e8a3ca73d156473a32565f75be6",
          "batchRequestHash": "8176fbf46265f9e3a131fc1725426c5d108483d7613cc38bbddfc69c9e425901"
        }
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T21:51:41.247Z",
    "voicePreview": "./proves/veus-rebudes.html#S059",
    "voicePreviewFile": "./assets/audio/s059-voices-review-v1.mp3",
    "feedback": [
      {
        "part": "arbre",
        "speaker": "Biel",
        "kind": "pronunciation",
        "word": "cartró",
        "heard": "cartron",
        "status": "applied",
        "appliedAt": "2026-11-25",
        "appliedAudio": "./assets/audio/s059-mixed-v1.mp3",
        "resolution": "Presa validada pel docent incorporada; muntatge complet pendent d’audició."
      }
    ],
    "plannedRepair": {
      "status": "applied-validated",
      "parts": [
        "arbre"
      ],
      "speaker": "Biel",
      "voice": "Puck",
      "sourceTakeSha256": "8cb4bfbb0afa9e182b91982c960106d706969905499b4cffa78c98bd85800689"
    },
    "approvedUnchangedSpeech": {
      "status": "approved-except-listed-parts",
      "at": "2026-11-25",
      "sourceTakeSha256": "8cb4bfbb0afa9e182b91982c960106d706969905499b4cffa78c98bd85800689",
      "exceptParts": [
        "arbre"
      ],
      "confirmation": "Docent 25/11: corregir cartron en lloc de cartró; resta de la locució correcta."
    },
    "repairComparison": "./proves/correccions-l36.html#S059-arbre",
    "receivedRepairs": [
      {
        "code": "S059",
        "part": "arbre",
        "text": "A aquesta sí. A les del final... Ai, he fet caure l’arbre de cartró! Sempre em queda al mig. És bonic, però el podríem posar dret al costat de la capsa, a la cadira.",
        "pronunciation": "Keep youthful male Biel/Puck. Catalan cartró ends with stressed O, /kərˈtɾo/, with no final N. Say cartró, never cartron. Keep the spontaneous surprise and all other words.",
        "status": "applied-validated",
        "originalFile": "assets/audio/repairs/l36-s059-arbre-original.mp3",
        "candidateFile": "assets/audio/repairs/l36-s059-arbre-prova.mp3",
        "sourceRawSha256": "bd17485cca82d19a097a226a1f1287a035db454d787194c9e781fa088a9d8555",
        "sourceTakeId": "S059-T01",
        "sourceTakeSha256": "8cb4bfbb0afa9e182b91982c960106d706969905499b4cffa78c98bd85800689",
        "batchRequestHash": "8176fbf46265f9e3a131fc1725426c5d108483d7613cc38bbddfc69c9e425901",
        "applied": true,
        "approvedAt": "2026-11-25",
        "confirmation": "Docent 25/11: S059 validat amb les esmenes rebudes.",
        "appliedAt": "2026-11-25",
        "appliedAudio": "./assets/audio/s059-mixed-v1.mp3",
        "appliedAudioSha256": "1174333b393519753812891a6e28dab74c4eb8a815df6283ed6e6f025f6faba7",
        "validatedAt": "2026-11-25",
        "validatedAudioSha256": "1174333b393519753812891a6e28dab74c4eb8a815df6283ed6e6f025f6faba7"
      }
    ],
    "repairApplicationApproval": {
      "scope": "approved-repair",
      "approvedAt": "2026-11-25",
      "confirmation": "Docent 25/11: S059 validat amb les esmenes rebudes.",
      "clips": [
        {
          "part": "arbre",
          "text": "A aquesta sí. A les del final... Ai, he fet caure l’arbre de cartró! Sempre em queda al mig. És bonic, però el podríem posar dret al costat de la capsa, a la cadira.",
          "candidateFile": "assets/audio/repairs/l36-s059-arbre-prova.mp3",
          "candidateSha256": "063c3ecbf61d4873ad65526d26584f39d88e8e8a3ca73d156473a32565f75be6",
          "batchRequestHash": "8176fbf46265f9e3a131fc1725426c5d108483d7613cc38bbddfc69c9e425901"
        }
      ]
    },
    "teacherAssessment": "Veus, esmenes incorporades i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "mountedAt": "2026-11-25T16:38:10.528Z",
    "synthesisBatch": "L31+L36",
    "requestHash": "d19fa8c15f905cd107994f58adda34c33df085401b865bb99b831e5fd527bbfb",
    "audioSha256": "1174333b393519753812891a6e28dab74c4eb8a815df6283ed6e6f025f6faba7",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/s059-publicacio-v1.webp",
      "illustrationSha256": "a197bd571edcea935d3ed4499331e3058da46f0e8175b6c6500e9993529116a5",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S065": {
    "state": "published",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "42a3739a93fc94cc5a62907995cc1ba721bebdfa282d98c7786735e11172ffeb",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S065 validat per publicació definitiva",
    "reason": "Veus aprovades pel docent i primer muntatge completat localment; pendent d’audició del muntatge.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S065-T01"
      ],
      "total": 1,
      "batches": [
        "L27"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "597ba92b862eef28fa7b8fcb582fad3b9f5f989d7608b408d9ee8278ee6409ae",
      "confirmation": "S065 validat per muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T13:19:33.550Z",
    "voicePreview": "./proves/veus-rebudes.html#S065",
    "voicePreviewFile": "./assets/audio/s065-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T16:14:41.246Z",
    "synthesisBatch": "L27",
    "requestHash": "a8a1c31ecd69f92c20a41e6a739917e717f6da8007fba6592d62f5d5b553f9c0",
    "audioSha256": "d90252421be37066debedc75bb85b0ff122012542675e7335c4e4bbe75daf5d8",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/la-mesura-que-canviava-de-lloc-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S068": {
    "state": "published",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "f26e6a27baa43083cc7eaa4d048902a2ceaf68c6fcfa6c8336df871e4e3a7b0e",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S068 validat per publicació definitiva",
    "reason": "Veus aprovades pel docent i primer muntatge completat localment; pendent d’audició del muntatge.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S068-T01"
      ],
      "total": 1,
      "batches": [
        "L22"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "5bb0a7abe9cd21bde670d47ce5e9d6857dcefc3f702a8be17da6df68141d6440",
      "confirmation": "S068 validat per muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T12:09:15.400Z",
    "voicePreview": "./proves/veus-rebudes.html#S068",
    "voicePreviewFile": "./assets/audio/s068-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T13:53:29.350Z",
    "synthesisBatch": "L22",
    "requestHash": "4a2634e49163d602016cbc69c25809b31754d5e940e3283e0c938522deada250",
    "audioSha256": "225cc3e97118aab74e6bfcd95880ca77efd10382e88c461b17dc49580731ed4c",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/el-dinar-al-banc-de-lestacio-dialogada-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S071": {
    "state": "published",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "6fbc947267ad876bc565d16a230bf45ca510ffcb237cd3a96e42d92a0d357ede",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 25/11: S061, S071, S022, S059 i S025 validats per publicació definitiva.",
    "reason": "Aina sona Eina a l’inici. Resta de les veus validada; esmena en espera de lot compatible de Ferran/Algenib abans de muntar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S071-T01"
      ],
      "total": 1,
      "batches": [
        "L22"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "de87f5bc7839af57cca5a7ddffb7d73694382a5bd7667472a1b5e28556606017",
      "baseTakeSha256": "be81a7fabf103859d65f69972f783d0fa1b9777fd8c943f8c4676659fedd0ba3",
      "confirmation": "Docent 25/11: S071 validat amb les esmenes del paràgraf que estava malament, pot passar a muntatge.",
      "derivation": "Previously approved remaining speech plus the exact teacher-approved replacement; assembled playback still awaits montage audition.",
      "repairs": [
        {
          "part": "sobre",
          "text": "Aina, en aquest sobre hi guardo quatre entrades. Són del mateix teatre i tenen el mateix color blau, però dues són d’un diumenge i dues, del dissabte següent. Si les mires de pressa semblen iguals. A mi em van fer passar una bona vergonya.",
          "candidateFile": "assets/audio/repairs/l30-s071-sobre-prova.mp3",
          "candidateSha256": "e8b906466ff00dee312c09f7a933353324061a24bab6bfb2ebc83339bac1c972",
          "batchRequestHash": "e976118d4059a3906fef68d10a896878017b880860e49a669844b0cafb799cb1"
        }
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T12:09:15.400Z",
    "voicePreview": "./proves/veus-rebudes.html#S071",
    "voicePreviewFile": "./assets/audio/s071-voices-review-v1.mp3",
    "feedbackAt": "2026-11-23",
    "teacherAssessment": "Veus, esmenes incorporades i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "feedback": [
      {
        "part": "sobre",
        "speaker": "Ferran",
        "kind": "pronunciation",
        "word": "Aina",
        "heard": "Eina",
        "status": "applied",
        "appliedAt": "2026-11-25",
        "appliedAudio": "./assets/audio/s071-mixed-v1.mp3",
        "resolution": "Presa validada pel docent incorporada; muntatge complet pendent d’audició."
      }
    ],
    "plannedRepair": {
      "part": "sobre",
      "speaker": "Ferran",
      "voice": "Algenib",
      "text": "Aina, en aquest sobre hi guardo quatre entrades. Són del mateix teatre i tenen el mateix color blau, però dues són d’un diumenge i dues, del dissabte següent. Si les mires de pressa semblen iguals. A mi em van fer passar una bona vergonya.",
      "sourceTakeSha256": "be81a7fabf103859d65f69972f783d0fa1b9777fd8c943f8c4676659fedd0ba3",
      "status": "applied-validated",
      "pronunciation": "Aina is the Catalan name /ˈaj.nə/: start clearly with an open A and the AI diphthong, as in the beginning of Catalan aire, never EI or Eina. Keep the warm older male Ferran/Algenib identity and a fluent natural sentence. Do not spell the name, add a lead-in, or read these directions.",
      "batch": "L30"
    },
    "repairComparison": "./proves/correccions-l30.html#S071-sobre",
    "receivedRepairs": [
      {
        "code": "S071",
        "part": "sobre",
        "text": "Aina, en aquest sobre hi guardo quatre entrades. Són del mateix teatre i tenen el mateix color blau, però dues són d’un diumenge i dues, del dissabte següent. Si les mires de pressa semblen iguals. A mi em van fer passar una bona vergonya.",
        "pronunciation": "Aina is the Catalan name /ˈaj.nə/: start clearly with an open A and the AI diphthong, as in the beginning of Catalan aire, never EI or Eina. Keep the warm older male Ferran/Algenib identity and a fluent natural sentence. Do not spell the name, add a lead-in, or read these directions.",
        "status": "applied-validated",
        "originalFile": "assets/audio/repairs/l30-s071-sobre-original.mp3",
        "candidateFile": "assets/audio/repairs/l30-s071-sobre-prova.mp3",
        "sourceRawSha256": "f59f33398e753916473bd88dc78345ff02faeedc4f4bb046275f9d453bc4b561",
        "sourceTakeId": "S071-T01",
        "sourceTakeSha256": "be81a7fabf103859d65f69972f783d0fa1b9777fd8c943f8c4676659fedd0ba3",
        "batchRequestHash": "e976118d4059a3906fef68d10a896878017b880860e49a669844b0cafb799cb1",
        "applied": true,
        "approvedAt": "2026-11-25",
        "confirmation": "Docent 25/11: S071 validat amb les esmenes del paràgraf que estava malament, pot passar a muntatge.",
        "appliedAt": "2026-11-25",
        "appliedAudio": "./assets/audio/s071-mixed-v1.mp3",
        "appliedAudioSha256": "6c60ab1deb9f3499213b121e2cece26352d131f0a66cff6d96f46869e32c3d06",
        "validatedAt": "2026-11-25",
        "validatedAudioSha256": "6c60ab1deb9f3499213b121e2cece26352d131f0a66cff6d96f46869e32c3d06"
      }
    ],
    "repairApplicationApproval": {
      "scope": "approved-repair",
      "approvedAt": "2026-11-25",
      "confirmation": "Docent 25/11: S071 validat amb les esmenes del paràgraf que estava malament, pot passar a muntatge.",
      "clips": [
        {
          "part": "sobre",
          "text": "Aina, en aquest sobre hi guardo quatre entrades. Són del mateix teatre i tenen el mateix color blau, però dues són d’un diumenge i dues, del dissabte següent. Si les mires de pressa semblen iguals. A mi em van fer passar una bona vergonya.",
          "candidateFile": "assets/audio/repairs/l30-s071-sobre-prova.mp3",
          "candidateSha256": "e8b906466ff00dee312c09f7a933353324061a24bab6bfb2ebc83339bac1c972",
          "batchRequestHash": "e976118d4059a3906fef68d10a896878017b880860e49a669844b0cafb799cb1"
        }
      ]
    },
    "mountedAt": "2026-11-25T16:38:51.449Z",
    "synthesisBatch": "L22+L30",
    "requestHash": "6a2abf512eae17230106b5c42ce211e324dd6d0a46e53076009c391727dda8db",
    "audioSha256": "6c60ab1deb9f3499213b121e2cece26352d131f0a66cff6d96f46869e32c3d06",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "publicationMaterials": {
      "illustration": "./assets/images/les-dues-entrades-blaves-dialogada-v1.webp",
      "illustrationSha256": "8d891c42a7419e3e5ccd38492f9da54e9b49de35f013827d672717703c88cc9f",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S054": {
    "state": "published",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "2fb1668473d2f3b4c4f30d81e19cc0c9c520f28c61ebce6a9e5132362e9da01a",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S054 validat per publicació definitiva",
    "reason": "Veus aprovades pel docent i primer muntatge completat localment; pendent d’audició del muntatge.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S054-T01"
      ],
      "total": 1,
      "batches": [
        "L25"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "29f1e3a82ed244d4c590bcc5bd7120f193652676e4239cd1ab60ac0eff4d0a37",
      "confirmation": "S054 validat per muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T12:23:58.849Z",
    "voicePreview": "./proves/veus-rebudes.html#S054",
    "voicePreviewFile": "./assets/audio/s054-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T13:56:33.062Z",
    "synthesisBatch": "L25",
    "requestHash": "4e3ed06c613d1750826947314242be6a728fc3ca9f7dbf20d554f3768035a399",
    "audioSha256": "73ae9b27be296b0023ca96ee392c883584e9906896293df84af54b3e7cfb0425",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/una-finestra-per-recollir-els-encarrecs-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S056": {
    "state": "published",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "a5e8e14658cb1a0d6e85edf594d54b33a77232a8b6172235bfaf558f4bca518c",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 25/11: S104, S106, S087, S110, S074, S100, S108, S056 i S097 validats tots per publicació definitiva.",
    "reason": "Validació docent explícita de guió, veus i escaleta. Agrupar lectures completes del mateix repartiment en sis a vuit minuts abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S056-T01"
      ],
      "total": 1,
      "batches": [
        "L29"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "198a1652fc0ff39a8d539cb03fa137c8c1a60235c05b664e75f0e2d13bd51ac3",
      "baseTakeSha256": "fafe5e399b5421f0e177d5a8602c74da49992434fe756e18fbe6ff13e1e31552",
      "confirmation": "Docent 25/11: les esmenes de S056 passen validació i pot anar a muntatge.",
      "derivation": "Previously approved complete body, plus the two exact teacher-approved opening clips. Full montage still awaits listening.",
      "repairs": [
        {
          "part": "introduction",
          "text": "Comprensió oral. El taller canvia de casa. Notícia de ficció.",
          "candidateFile": "assets/audio/repairs/l32-s056-introduction-prova.mp3",
          "candidateSha256": "5584221a0607f9f304cf2d81f8bff93e7a7f4b3bf6c50d3f7137c845f35574f0",
          "batchRequestHash": "a38715e579b55a270d1e2b0f493b471ebe0f7ed700681aceec1aadfd202a5f75"
        },
        {
          "part": "trasllat",
          "text": "Bon dia.",
          "candidateFile": "assets/audio/repairs/l32-s056-trasllat-prova.mp3",
          "candidateSha256": "d5d8e89087cfc5f8666a11404b45ed76dd65c4630962d472f1d81f28906d9149",
          "batchRequestHash": "a38715e579b55a270d1e2b0f493b471ebe0f7ed700681aceec1aadfd202a5f75"
        }
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T19:47:41.102Z",
    "voicePreview": "./proves/veus-rebudes.html#S056",
    "voicePreviewFile": "./assets/audio/s056-voices-review-v1.mp3",
    "voiceReviewUpdate": {
      "file": "./assets/audio/s056-voices-review-v1.mp3",
      "at": "2026-11-24",
      "summary": {
        "ca": "La resta de la locució està validada. Ja pots sentir a «Escolta les esmenes» el títol amb «Notícia de ficció» i el «Bon dia» que faltaven, abans d’incorporar-los al muntatge.",
        "es": "El resto de la locución está validado. En «Escucha las correcciones» ya están el título con el aviso de ficción y el saludo inicial que faltaban, antes de incorporarlos al montaje."
      }
    },
    "plannedRepair": {
      "status": "applied-validated",
      "scope": "missing-opening",
      "speaker": "Mar",
      "voice": "Erinome",
      "part": "introduction-and-greeting",
      "text": "Comprensió oral. El taller canvia de casa. Notícia de ficció. Bon dia.",
      "parts": [
        {
          "part": "introduction",
          "text": "Comprensió oral. El taller canvia de casa. Notícia de ficció."
        },
        {
          "part": "opening-greeting",
          "text": "Bon dia."
        }
      ],
      "sourceTakeId": "S056-T01",
      "note": "Docent confirma tres omissions: títol, Notícia de ficció i salutació inicial. La resta de veu està aprovada. Preparar la reposició exacta dins un lot compatible, comparar abans de muntar.",
      "batch": "L32",
      "receivedParts": [
        "introduction",
        "trasllat"
      ],
      "appliedAudio": "./assets/audio/s056-mixed-v1.mp3",
      "appliedAt": "2026-11-25"
    },
    "bodyVoiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "fafe5e399b5421f0e177d5a8602c74da49992434fe756e18fbe6ff13e1e31552",
      "sourcePreviewFile": "./assets/audio/s056-voices-review-v1.mp3",
      "sourcePreviewSha256": "08d7d2410e7ecd7bfa44b859cfb9559daf2903e4b2732c17a12e819dc4ccec2e",
      "scope": "received-body-only; introduction-and-opening-greeting-missing",
      "confirmation": "Docent confirma la resta de la locució, pendent de reposar títol, Notícia de ficció i el Bon dia inicial."
    },
    "repairComparison": "./proves/correccions-l32.html#S056-trasllat",
    "receivedRepairs": [
      {
        "code": "S056",
        "part": "introduction",
        "text": "Comprensió oral. El taller canvia de casa. Notícia de ficció.",
        "pronunciation": "Say the complete exercise introduction, title and Notícia de ficció. Do not omit any sentence. Keep initial and final consonants.",
        "status": "applied-validated",
        "missingOriginal": true,
        "candidateFile": "assets/audio/repairs/l32-s056-introduction-prova.mp3",
        "sourceRawSha256": "20d716f9a5513b380c1885e64229e4d4f31e4951d03b0c5e3e53b542a7913fcd",
        "sourceTakeId": "S056-T01",
        "sourceTakeSha256": "fafe5e399b5421f0e177d5a8602c74da49992434fe756e18fbe6ff13e1e31552",
        "batchRequestHash": "a38715e579b55a270d1e2b0f493b471ebe0f7ed700681aceec1aadfd202a5f75",
        "applied": true,
        "candidateSha256": "5584221a0607f9f304cf2d81f8bff93e7a7f4b3bf6c50d3f7137c845f35574f0",
        "approvedAt": "2026-11-25",
        "approvedBy": "docent",
        "confirmation": "Docent 25/11: les esmenes de S056 passen validació i pot anar a muntatge.",
        "appliedAt": "2026-11-25",
        "appliedAudio": "./assets/audio/s056-mixed-v1.mp3",
        "validatedAt": "2026-11-25",
        "validatedAudioSha256": "e5d616bfc5b37c2b88aa397d8afbd9f96120f9ae3ad2d014a295859f718c7914"
      },
      {
        "code": "S056",
        "part": "trasllat",
        "missingPart": "opening-greeting",
        "text": "Bon dia.",
        "pronunciation": "Say the complete greeting Bon dia, once, in the same adult Mar/Erinome voice. Both words are missing from the original; this is an insertion for audition, without an original greeting clip.",
        "status": "applied-validated",
        "missingOriginal": true,
        "candidateFile": "assets/audio/repairs/l32-s056-trasllat-prova.mp3",
        "sourceRawSha256": "20d716f9a5513b380c1885e64229e4d4f31e4951d03b0c5e3e53b542a7913fcd",
        "sourceTakeId": "S056-T01",
        "sourceTakeSha256": "fafe5e399b5421f0e177d5a8602c74da49992434fe756e18fbe6ff13e1e31552",
        "batchRequestHash": "a38715e579b55a270d1e2b0f493b471ebe0f7ed700681aceec1aadfd202a5f75",
        "applied": true,
        "candidateSha256": "d5d8e89087cfc5f8666a11404b45ed76dd65c4630962d472f1d81f28906d9149",
        "approvedAt": "2026-11-25",
        "approvedBy": "docent",
        "confirmation": "Docent 25/11: les esmenes de S056 passen validació i pot anar a muntatge.",
        "appliedAt": "2026-11-25",
        "appliedAudio": "./assets/audio/s056-mixed-v1.mp3",
        "validatedAt": "2026-11-25",
        "validatedAudioSha256": "e5d616bfc5b37c2b88aa397d8afbd9f96120f9ae3ad2d014a295859f718c7914"
      }
    ],
    "missingVoiceDetails": [],
    "repairApplicationApproval": {
      "scope": "approved-repair",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "fafe5e399b5421f0e177d5a8602c74da49992434fe756e18fbe6ff13e1e31552",
      "confirmation": "Docent 25/11: les esmenes de S056 passen validació i pot anar a muntatge.",
      "clips": [
        {
          "part": "introduction",
          "text": "Comprensió oral. El taller canvia de casa. Notícia de ficció.",
          "candidateFile": "assets/audio/repairs/l32-s056-introduction-prova.mp3",
          "candidateSha256": "5584221a0607f9f304cf2d81f8bff93e7a7f4b3bf6c50d3f7137c845f35574f0",
          "batchRequestHash": "a38715e579b55a270d1e2b0f493b471ebe0f7ed700681aceec1aadfd202a5f75"
        },
        {
          "part": "trasllat",
          "text": "Bon dia.",
          "candidateFile": "assets/audio/repairs/l32-s056-trasllat-prova.mp3",
          "candidateSha256": "d5d8e89087cfc5f8666a11404b45ed76dd65c4630962d472f1d81f28906d9149",
          "batchRequestHash": "a38715e579b55a270d1e2b0f493b471ebe0f7ed700681aceec1aadfd202a5f75"
        }
      ]
    },
    "mountedAt": "2026-11-25T12:10:58.578Z",
    "synthesisBatch": "L29+L32",
    "requestHash": "883e30ffbd8bad78e67e2f6932b1dece73f71005b7c72e0be6b9504ab50ab761",
    "audioSha256": "e5d616bfc5b37c2b88aa397d8afbd9f96120f9ae3ad2d014a295859f718c7914",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "publicationMaterials": {
      "illustration": "./assets/images/s056-publicacio-v1.webp",
      "illustrationSha256": "46d008bc2d5e13a7d7249d10e079d2a966141913c993b9bf167849478fb9b956",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S045D": {
    "state": "published",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "8498c716a36a8cdd5ff68c8dec9bc7a376d9fb208f65664931242cd0572bb944",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S045D validat per publicació definitiva",
    "reason": "Veus aprovades pel docent i primer muntatge completat localment; pendent d’audició del muntatge.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S045D-T01"
      ],
      "total": 1,
      "batches": [
        "L23"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "453e13fbf8dcee801cc2af4612356f842d0f6e230bed301427dcada4de6720be",
      "confirmation": "S045D validat per muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T12:14:25.276Z",
    "voicePreview": "./proves/veus-rebudes.html#S045D",
    "voicePreviewFile": "./assets/audio/s045d-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T16:05:33.134Z",
    "synthesisBatch": "L23",
    "requestHash": "756f855e4c2be092cf27a2e4508782dc064c45b5cef6d6697850ea86088fd55e",
    "audioSha256": "5f420861750b09b1c557e2d263219ed1e0d1380fc950d77c1c126d1c61f2c177",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/les-cadires-del-cinema-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S080": {
    "state": "published",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "82d69704ab0459c064adaa728afeae727a307da3be219f7d02e228642e529e45",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S080 validat per publicació definitiva",
    "reason": "Veus aprovades pel docent i primer muntatge completat localment; pendent d’audició del muntatge.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S080-T01"
      ],
      "total": 1,
      "batches": [
        "L26"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "abdef7724b67d273448f0047fc3d1f5dbeb1a060bfb742e6e260b661fbb9bd03",
      "confirmation": "S080 validat per pujar a muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T12:30:54.324Z",
    "voicePreview": "./proves/veus-rebudes.html#S080",
    "voicePreviewFile": "./assets/audio/s080-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T13:40:29.868Z",
    "synthesisBatch": "L26",
    "requestHash": "528f65283474a1f42bc1be0b2920865817daec53fc0f6634f693552abc5401f1",
    "audioSha256": "3bbceadf92036782c95a55fe72287b9380d83f2d6153ef26d9eb6e6fe1f1aa4f",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/el-segon-assaig-sona-lluny-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S055": {
    "state": "published",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "77e0ed4509cfbb1a77304f56987df28e4bec412fd53e15dfc2eb8a3b0ed04b16",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S055: muntatge validat per publicació definitiva al traspàs docent del 25/11/2026; abast de les tretze peces confirmat pel docent en aquesta conversa.",
    "reason": "Veus aprovades pel docent; pendent de muntatge amb el fons adequat.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S055-T01"
      ],
      "total": 1,
      "batches": [
        "L29"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "57ba3ed3f69b95b77d0900be5900c6df512cfcabfcefb1b96b6a100c4de4b80a",
      "confirmation": "Docent: veus validades per pujar a muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T19:47:41.102Z",
    "voicePreview": "./proves/veus-rebudes.html#S055",
    "voicePreviewFile": "./assets/audio/s055-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T22:02:48.117Z",
    "synthesisBatch": "L29",
    "requestHash": "b0a730b180a626cc040f5673c2e59704c01d046548a2b4090c0538b629495e23",
    "audioSha256": "b1795b65689244310e984442b898d8186a4fc2634d7941a6502c6b9d4ae3841a",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "teacherAssessment": "Muntatge validat definitivament pel docent al traspàs confirmat. Àudio conservat sense canvis.",
    "publicationMaterials": {
      "illustration": "./assets/images/s055-publicacio-v1.jpg",
      "illustrationSha256": "d1087ad50725a1a785c90cc5785ca27ca98b5bba4115a2e74577c3eb375249a7",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S071D": {
    "state": "published",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "e5a78cab5c4aa827a277cfc5139353ef562f1a59f71b88da522d81397207372e",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S071D validat per publicació definitiva",
    "reason": "Veus de la variant dialogada validades pel docent i primer muntatge pendent d’audició. S071 narrada conserva la seva esmena independent.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S071D-T01"
      ],
      "total": 1,
      "batches": [
        "L28"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "10473f9616263ae3be2d1295c367c42158a54e5cc59ab8278273789ec47c01f0",
      "confirmation": "S071D validat per muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T13:21:28.972Z",
    "voicePreview": "./proves/veus-rebudes.html#S071D",
    "voicePreviewFile": "./assets/audio/s071d-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T16:23:06.698Z",
    "synthesisBatch": "L28",
    "requestHash": "17cd4683c769da2badcc720d67926da3398a2be69ff54c217a766273869991d4",
    "audioSha256": "ea2ab416baf80c08ceca1e5041438ea1dc89c116f9e3db2ec55197eae2ead380",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/les-dues-entrades-blaves-dialogada-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S053": {
    "state": "published",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "b50999be68a31b08b9a829135e9832e5b243a0ba9d722001bd00671edea88fe3",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S053 validat per publicació definitiva",
    "reason": "Veus aprovades pel docent i primer muntatge completat localment; pendent d’audició del muntatge.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S053-T01"
      ],
      "total": 1,
      "batches": [
        "L25"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "4328f5d160cbeb7f6cb2ef309e232bc8579e39f50505e366b5dbc6a5c8791107",
      "confirmation": "S053 validat per muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T12:23:58.849Z",
    "voicePreview": "./proves/veus-rebudes.html#S053",
    "voicePreviewFile": "./assets/audio/s053-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T13:57:24.135Z",
    "synthesisBatch": "L25",
    "requestHash": "4e3ed06c613d1750826947314242be6a728fc3ca9f7dbf20d554f3768035a399",
    "audioSha256": "ebd4efd32f48bc676ef36bdee669f2a34a6f252f276a8dceee923e6235af6b82",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/la-pista-torna-a-obrir-al-vespre-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S064": {
    "state": "published",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "83857903e2087af52730c626c68c63cea15deeb79601b5b78f593b19904ee552",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S064 validat per publicació definitiva",
    "reason": "Veus aprovades pel docent i primer muntatge completat localment; pendent d’audició del muntatge.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S064-T01"
      ],
      "total": 1,
      "batches": [
        "L27"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "92f44632ac61d5a59a77d774e7b26e9e50ff718a9d7db92846d8cfb016d79f2b",
      "confirmation": "S064 validat per muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T13:19:33.550Z",
    "voicePreview": "./proves/veus-rebudes.html#S064",
    "voicePreviewFile": "./assets/audio/s064-voices-review-v1.mp3",
    "mountedAt": "2026-11-23T16:07:23.082Z",
    "synthesisBatch": "L27",
    "requestHash": "a8a1c31ecd69f92c20a41e6a739917e717f6da8007fba6592d62f5d5b553f9c0",
    "audioSha256": "fef04ecbf7c7ebec0089675053c5e609f591e73576d3f6b4390031b455f2e651",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/un-anunci-que-va-massa-de-pressa-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S068D": {
    "state": "published",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "faf5b6b2ccb879a85be7550fff32847881b9821d73ae811f867b136ea6e6f5a7",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "S068D validat per publicació definitiva",
    "reason": "Presa completa de veus validada pel docent, incloent el torn curt conservat que el reconeixement local no havia confirmat; primer muntatge pendent d’audició.",
    "uncertainTurns": [
      {
        "start": 21.490000000000002,
        "end": 23.26,
        "heard": "la dui esto ser",
        "status": "short-turn-awaiting-listening",
        "originalPreserved": true,
        "block": "S068D-T01",
        "part": "portar",
        "text": "La duies tu?",
        "coverage": 0.3333333333333333
      }
    ],
    "receivedTakes": {
      "received": [
        "S068D-T01"
      ],
      "total": 1,
      "batches": [
        "L28"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "ea89c6739cb6262df17eb212f3e4a2b6edda5e979f419a020b36f0df2ab4c9bc",
      "confirmation": "S068D validat per muntatge"
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T13:21:28.972Z",
    "voicePreview": "./proves/veus-rebudes.html#S068D",
    "voicePreviewFile": "./assets/audio/s068d-voices-review-v1.mp3",
    "voiceReviewUpdate": {
      "file": "./assets/audio/s068d-voices-review-v1.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Veus noves per revisar. Comprova especialment «La duies tu?», cap al segon 21: és un torn curt conservat que el reconeixement local no ha pogut confirmar. Encara no hi ha muntatge.",
        "es": "Voces nuevas para revisar. Comprueba especialmente «La duies tu?», hacia el segundo 21: es un turno breve conservado que el reconocimiento local no ha podido confirmar. Todavía no hay montaje."
      }
    },
    "mountedAt": "2026-11-23T16:17:28.792Z",
    "synthesisBatch": "L28",
    "requestHash": "17cd4683c769da2badcc720d67926da3398a2be69ff54c217a766273869991d4",
    "audioSha256": "e5982c3d20dbe9ae142c0fd8435d858a136de67ec501451ae182e90ece88e93f",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-23",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent.",
    "publicationMaterials": {
      "illustration": "./assets/images/el-dinar-al-banc-de-lestacio-dialogada-v1.webp",
      "transcript": "speech-only",
      "checkedAt": "2026-11-23",
      "audioChanged": false
    }
  },
  "ca-S083": {
    "state": "published",
    "editorialFingerprint": "0293de87c1c12e12152a0ab9a04878911cce14a1eaf32909daa0a26da3172dbf",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Muntatge validat definitivament pel docent al traspàs confirmat. Àudio conservat sense canvis.",
    "scriptApprovedAt": "2026-11-23",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "03bf3de27f15b5aba9ff14a132aa8107e429f63fdf0fa74f925c2ee25ef44cc3",
      "confirmation": "Docent: veus validades per pujar a muntatge."
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S083-T01"
      ],
      "total": 1,
      "batches": [
        "L29"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T19:47:41.102Z",
    "voicePreview": "./proves/veus-rebudes.html#S083",
    "voicePreviewFile": "./assets/audio/s083-voices-review-v1.mp3",
    "reason": "Veus aprovades pel docent; pendent de muntatge amb el fons adequat.",
    "mountedAt": "2026-11-23T22:02:55.046Z",
    "synthesisBatch": "L29",
    "requestHash": "b0a730b180a626cc040f5673c2e59704c01d046548a2b4090c0538b629495e23",
    "audioSha256": "2d1e3ce79bbfd9caf13b87302e69d1f782efc39233790e0d7943b3cd0c72cd56",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "S083: muntatge validat per publicació definitiva al traspàs docent del 25/11/2026; abast de les tretze peces confirmat pel docent en aquesta conversa.",
    "publicationMaterials": {
      "illustration": "./assets/images/s083-publicacio-v1.jpg",
      "illustrationSha256": "3517a1115209630dcfc95c0664a7e8886aae6c62b4f3e2da7f53e875054c6ae4",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S084": {
    "state": "published",
    "editorialFingerprint": "ee3de8c8c0bb2703d332dd7e2b09224855f9467421ece0220ba0a260a787d5e9",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Muntatge validat definitivament pel docent al traspàs confirmat. Àudio conservat sense canvis.",
    "scriptApprovedAt": "2026-11-23",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "5717df20f90207c5c7e6ed7ca7dc1725dc22a3b3fc8e2eb159b4a40b92654dd2",
      "confirmation": "Docent: veus validades per pujar a muntatge."
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S084-T01"
      ],
      "total": 1,
      "batches": [
        "L29"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T19:47:41.102Z",
    "voicePreview": "./proves/veus-rebudes.html#S084",
    "voicePreviewFile": "./assets/audio/s084-voices-review-v1.mp3",
    "reason": "Veus aprovades pel docent; pendent de muntatge amb el fons adequat.",
    "mountedAt": "2026-11-23T22:03:00.761Z",
    "synthesisBatch": "L29",
    "requestHash": "b0a730b180a626cc040f5673c2e59704c01d046548a2b4090c0538b629495e23",
    "audioSha256": "1aed42a43867c9d73ac9968da3670084d9941699f41d33acdfb95dc693de9426",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "S084: muntatge validat per publicació definitiva al traspàs docent del 25/11/2026; abast de les tretze peces confirmat pel docent en aquesta conversa.",
    "publicationMaterials": {
      "illustration": "./assets/images/s084-publicacio-v1.jpg",
      "illustrationSha256": "ecf458b102a53086e5ac9afaadeb459107ec329f59c748b0398bbf11d2ebc187",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S085": {
    "state": "montage-awaiting-listening",
    "editorialFingerprint": "d8c9e51360ea23371b66173a88a30d738f8d474119ef3a14d6eadcb00de91ca5",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "teacherAssessment": "Veus validades i esmena exacta aplicada; falta audició del muntatge.",
    "scriptApprovedAt": "2026-11-23",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-26",
      "sourceTakeSha256": "8238454ff0658ab5d21731ac969cd72317e3c8ae620223c7c43d09da512fef85",
      "baseTakeSha256": "76fa131296115bbdcad2ab187b5b2a9c2313d18170930f1d2c1d15e136c65242",
      "confirmation": "Docent 26/11: esmena comiat de S085 validada; incorporar la presa exacta.",
      "derivation": "Previously approved remaining speech plus the exact teacher-approved replacement; assembled playback still awaits montage audition.",
      "repairs": [
        {
          "part": "comiat",
          "text": "Doncs pugem juntes. Entro un moment les bosses i et vinc a ajudar. Els tomàquets ja han viatjat prou per avui.",
          "candidateFile": "assets/audio/repairs/l38-s085-comiat-prova.mp3",
          "candidateSha256": "855125a3cff01c45f609fed1bf5a7e94474a79653bc97cbc78e1aecf42f86773",
          "batchRequestHash": "5451b4cea3e920f9aa007be12efb850987a7a6376108afb4dff422c3b91341ac",
          "sourceTakeSha256": "76fa131296115bbdcad2ab187b5b2a9c2313d18170930f1d2c1d15e136c65242",
          "candidateTakeId": "S085-comiat",
          "sourceRequestHash": "f842c1cba0a886280361f843b5b49d32e29f60207eb741b12952a259987ee00f"
        }
      ]
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S085-T01"
      ],
      "total": 1,
      "batches": [
        "L35"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-24T14:01:08.329Z",
    "voicePreview": "./proves/veus-rebudes.html#S085",
    "voicePreviewFile": "./assets/audio/s085-voices-review-v1.mp3",
    "feedback": [
      {
        "part": "comiat",
        "speaker": "Mar",
        "kind": "voice-identity",
        "word": "Doncs pugem juntes",
        "heard": "veu massa greu a l’inici del torn",
        "status": "applied",
        "appliedAt": "2026-11-26"
      }
    ],
    "plannedRepair": {
      "status": "awaiting-compatible-batch",
      "parts": [
        "comiat"
      ],
      "speaker": "Mar",
      "voice": "Erinome",
      "sourceTakeSha256": "76fa131296115bbdcad2ab187b5b2a9c2313d18170930f1d2c1d15e136c65242"
    },
    "approvedUnchangedSpeech": {
      "status": "approved-except-listed-parts",
      "at": "2026-11-25",
      "sourceTakeSha256": "76fa131296115bbdcad2ab187b5b2a9c2313d18170930f1d2c1d15e136c65242",
      "exceptParts": [
        "comiat"
      ],
      "confirmation": "Docent 25/11: repetir l’últim torn de Mar, Doncs pugem juntes, per un canvi de timbre extremadament greu. Resta correcta."
    },
    "repairComparison": "./proves/correccions-l38.html#S085-comiat",
    "receivedRepairs": [
      {
        "code": "S085",
        "part": "comiat",
        "text": "Doncs pugem juntes. Entro un moment les bosses i et vinc a ajudar. Els tomàquets ja han viatjat prou per avui.",
        "pronunciation": "Keep adult female Mar/Erinome, in her warm everyday conversational register. Stable natural female tone from the first words Doncs pugem juntes; no sudden deep baritone or change of speaker.",
        "status": "applied-awaiting-montage-listening",
        "originalFile": "assets/audio/repairs/l38-s085-comiat-original.mp3",
        "candidateFile": "assets/audio/repairs/l38-s085-comiat-prova.mp3",
        "sourceRawSha256": "d57bbc3b3b2098192643be92fb576b7712479884661730de76a9bd6452161333",
        "sourceTakeId": "S085-T01",
        "sourceTakeSha256": "76fa131296115bbdcad2ab187b5b2a9c2313d18170930f1d2c1d15e136c65242",
        "batchRequestHash": "5451b4cea3e920f9aa007be12efb850987a7a6376108afb4dff422c3b91341ac",
        "applied": true,
        "approvedAt": "2026-11-26",
        "confirmation": "Docent 26/11: esmena comiat de S085 validada; incorporar la presa exacta.",
        "candidateSha256": "855125a3cff01c45f609fed1bf5a7e94474a79653bc97cbc78e1aecf42f86773",
        "appliedAt": "2026-11-26",
        "appliedFile": "assets/audio/s085-mixed-v1.mp3",
        "appliedAudio": "./assets/audio/s085-mixed-v1.mp3",
        "appliedAudioSha256": "5edb6420f02f3e1da0b488b5416f23fa8cd19f2c71752788511f664e862736f3"
      }
    ],
    "repairApplicationApproval": {
      "scope": "approved-repair",
      "approvedAt": "2026-11-26",
      "confirmation": "Docent 26/11: esmena comiat de S085 validada; incorporar la presa exacta.",
      "clips": [
        {
          "part": "comiat",
          "text": "Doncs pugem juntes. Entro un moment les bosses i et vinc a ajudar. Els tomàquets ja han viatjat prou per avui.",
          "candidateFile": "assets/audio/repairs/l38-s085-comiat-prova.mp3",
          "candidateSha256": "855125a3cff01c45f609fed1bf5a7e94474a79653bc97cbc78e1aecf42f86773",
          "batchRequestHash": "5451b4cea3e920f9aa007be12efb850987a7a6376108afb4dff422c3b91341ac",
          "sourceTakeSha256": "76fa131296115bbdcad2ab187b5b2a9c2313d18170930f1d2c1d15e136c65242",
          "candidateTakeId": "S085-comiat",
          "sourceRequestHash": "f842c1cba0a886280361f843b5b49d32e29f60207eb741b12952a259987ee00f"
        }
      ]
    },
    "mountedAt": "2026-11-26T07:35:06.396Z",
    "synthesisBatch": "L35+L38",
    "requestHash": "5cdbd8c6d0e0758808df27f758e8db26f4c21069a67dba8736fc613da86cf3f2",
    "audioSha256": "5edb6420f02f3e1da0b488b5416f23fa8cd19f2c71752788511f664e862736f3",
    "montageNewSynthesisRequests": 0,
    "reviewUpdate": {
      "audio": "./assets/audio/s085-mixed-v1.mp3",
      "at": "2026-11-26",
      "summary": {
        "ca": "Esmena de veu validada incorporada al muntatge amb ambient continu suau. Pendent d’escolta del muntatge.",
        "es": "Corrección de voz validada incorporada al montaje con ambiente continuo suave. Pendiente de escuchar el montaje."
      }
    }
  },
  "ca-S086": {
    "state": "published",
    "editorialFingerprint": "79f17c46e76b0e72df66da9857a25b43af16337d5029fd47b57830760e95fa67",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Muntatge validat definitivament pel docent al traspàs confirmat. Àudio conservat sense canvis.",
    "scriptApprovedAt": "2026-11-23",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "7748621cf58a3582ad44e1070db17fad0021c254babd4aa656af48c556b0419d",
      "confirmation": "Docent: S086 validat per a muntatge."
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S086-T01"
      ],
      "total": 1,
      "batches": [
        "L35"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-24T14:01:08.329Z",
    "voicePreview": "./proves/veus-rebudes.html#S086",
    "voicePreviewFile": "./assets/audio/s086-voices-review-v1.mp3",
    "reason": "Veus validades pel docent; muntatge autoritzat, encara pendent de la seva audició.",
    "mountedAt": "2026-11-25T07:26:14.355Z",
    "synthesisBatch": "L35",
    "requestHash": "2e429c977e701ef1f63c2570d8f4ce02143fc47e4241bb11ee74e0760f029f2e",
    "audioSha256": "a77516edc14105890484c21e0a4dbb06ff182396966232841f9c12229367b900",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "S086: muntatge validat per publicació definitiva al traspàs docent del 25/11/2026; abast de les tretze peces confirmat pel docent en aquesta conversa.",
    "publicationMaterials": {
      "illustration": "./assets/images/s086-publicacio-v1.jpg",
      "illustrationSha256": "c0defcc6b1920c927ec234c2deea0f2035cba5e8a6cae6031f473864236f1165",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S087": {
    "state": "published",
    "editorialFingerprint": "71d4fad64c76c537bb974a66701e7a3f0cd82a6f57e13779c1429d2824edbbaf",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "scriptApprovedAt": "2026-11-23",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "9f22c47a377b87242dc674ad418811437b3fab4a9df86d9b42c78e6951aec8b2",
      "confirmation": "Docent 25/11: S087 validat per muntatge."
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S087-T01"
      ],
      "total": 1,
      "batches": [
        "L30"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T21:49:32.020Z",
    "voicePreview": "./proves/veus-rebudes.html#S087",
    "voicePreviewFile": "./assets/audio/s087-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T12:12:58.617Z",
    "synthesisBatch": "L30",
    "requestHash": "e976118d4059a3906fef68d10a896878017b880860e49a669844b0cafb799cb1",
    "audioSha256": "d6c4e7d9558af223cf99f2b7f279cd5bb56d5e11324158b7ac18364943e8c47a",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "Docent 25/11: S104, S106, S087, S110, S074, S100, S108, S056 i S097 validats tots per publicació definitiva.",
    "publicationMaterials": {
      "illustration": "./assets/images/s087-publicacio-v1.webp",
      "illustrationSha256": "897c04118b3bfe97f470499350b4e431988a3fc8d1856d2e3184a05e6097d664",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S088": {
    "state": "montage-awaiting-listening",
    "editorialFingerprint": "d6d6b7eac6f6884693be38cad9f133073eef5c6a1a07befdbaec7984a964225e",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "teacherAssessment": "Veus i esmenes aprovades incorporades al muntatge. Pendent de l’audició final del docent.",
    "scriptApprovedAt": "2026-11-23",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-26",
      "sourceTakeSha256": "dc3c44955ab0b8223cf113085e722f49d52ff121fdfc2e82fb07690f03144266",
      "baseTakeSha256": "bc242d90a2e17f16242d9bd8f2d3af8281b2d18548f4172539851e7fa4bd7888",
      "confirmation": "Docent 26/11: S088 validat per muntatge amb les esmenes rebudes hola.",
      "derivation": "Previously approved remaining speech plus the exact teacher-approved replacement; assembled playback still awaits montage audition.",
      "repairs": [
        {
          "part": "hola",
          "text": "Bon dia. Vinc a tornar la novel·la que em vaig endur. Em falta llegir l’últim capítol, però em sembla que l’havia de tornar avui. Em podríeu deixar uns dies més?",
          "candidateFile": "assets/audio/repairs/l43-s088-hola-prova.mp3",
          "candidateSha256": "05e9b69243685065401fd804400ca05bcbf07e0bba45e62589167421ded46543",
          "batchRequestHash": "9960a95b4a6a51078cec246c7fc38c6fb297a46045a22136e5b69ded99107088",
          "sourceTakeSha256": "bc242d90a2e17f16242d9bd8f2d3af8281b2d18548f4172539851e7fa4bd7888",
          "candidateTakeId": "S088-hola",
          "sourceRequestHash": "e2075224c586efb6ff249dbcf23b3a286eff4556a72ee4599c38d09d8e4c8977"
        }
      ]
    },
    "uncertainTurns": [
      {
        "start": 235.54,
        "end": 240.19,
        "heard": "bon dia a la novel la que em vaig endur em podrieu deixar uns dies mes",
        "status": "confirmed-omission-awaiting-synthesis",
        "originalPreserved": true,
        "coverageApproved": false,
        "block": "S088-T01",
        "part": "hola",
        "text": "Bon dia. Vinc a tornar la novel·la que em vaig endur. Em falta llegir l’últim capítol, però em sembla que l’havia de tornar avui. Em podríeu deixar uns dies més?",
        "coverage": 0.48484848484848486,
        "confirmedAt": "2026-11-25",
        "confirmedBy": "docent"
      }
    ],
    "receivedTakes": {
      "received": [
        "S088-T01"
      ],
      "total": 1,
      "batches": [
        "L30"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T21:49:32.020Z",
    "voicePreview": "./proves/veus-rebudes.html#S088",
    "voicePreviewFile": "./assets/audio/s088-voices-review-v1.mp3",
    "voiceReviewNote": {
      "ca": "Omissió confirmada al primer torn de Ferran: falta l’explicació sobre l’últim capítol i la data de devolució. Es regenerarà el torn complet en un lot compatible; la presa actual es conserva.",
      "es": "Omisión confirmada en el primer turno de Ferran. Se regenerará completo en un lote compatible; la toma actual se conserva."
    },
    "voiceReviewUpdate": {
      "file": "./assets/audio/s088-voices-review-v1.mp3",
      "at": "2026-11-26",
      "summary": {
        "ca": "Els fragments nous ja són a «Escolta les esmenes». Cal escoltar-los juntament amb la resta de la locució abans de muntar.",
        "es": "Los fragmentos nuevos están en «Escucha las correcciones». Hay que escucharlos junto al resto de la locución antes del montaje."
      }
    },
    "plannedRepair": {
      "status": "applied-awaiting-montage-listening",
      "parts": [],
      "voices": {
        "Ferran": "Algenib"
      },
      "sourceTakeSha256": "bc242d90a2e17f16242d9bd8f2d3af8281b2d18548f4172539851e7fa4bd7888",
      "confirmation": "Docent 25/11: confirmades les omissions de text detectades a S088 i S090; s’hauran de generar en properes peticions."
    },
    "feedback": [
      {
        "part": "hola",
        "speaker": "Ferran",
        "kind": "omitted-speech",
        "word": "primer torn incomplet",
        "missingText": "Em falta llegir l’últim capítol, però em sembla que l’havia de tornar avui.",
        "status": "applied",
        "confirmedAt": "2026-11-25",
        "appliedAt": "2026-11-26"
      }
    ],
    "repairComparison": "./proves/correccions-l43.html#S088-hola",
    "receivedRepairs": [
      {
        "code": "S088",
        "part": "hola",
        "text": "Bon dia. Vinc a tornar la novel·la que em vaig endur. Em falta llegir l’últim capítol, però em sembla que l’havia de tornar avui. Em podríeu deixar uns dies més?",
        "pronunciation": "Read the complete first Ferran turn, including Em falta llegir l’últim capítol, però em sembla que l’havia de tornar avui. Keep warm older male Ferran/Algenib throughout. Do not skip any sentence or read this direction.",
        "status": "applied-awaiting-montage-listening",
        "missingOriginal": true,
        "candidateFile": "assets/audio/repairs/l43-s088-hola-prova.mp3",
        "sourceRawSha256": "04afb60c95adf853ada0d0585d59cf29947e8f0ea242907727c74bdce86491cf",
        "sourceTakeId": "S088-T01",
        "sourceTakeSha256": "bc242d90a2e17f16242d9bd8f2d3af8281b2d18548f4172539851e7fa4bd7888",
        "batchRequestHash": "9960a95b4a6a51078cec246c7fc38c6fb297a46045a22136e5b69ded99107088",
        "applied": true,
        "approvedAt": "2026-11-26",
        "confirmation": "Docent 26/11: esmena S088/hola validada.",
        "candidateSha256": "05e9b69243685065401fd804400ca05bcbf07e0bba45e62589167421ded46543",
        "appliedAt": "2026-11-26",
        "appliedAudio": "./assets/audio/s088-mixed-v1.mp3",
        "appliedAudioSha256": "9c104980714d1e802579179ea9ffd398b85d05a095c19922fe077ba184621955"
      }
    ],
    "repairApplicationApproval": {
      "scope": "approved-repair",
      "approvedAt": "2026-11-26",
      "confirmation": "Docent 26/11: S088 validat per muntatge amb les esmenes rebudes hola.",
      "sourceTakeSha256": "bc242d90a2e17f16242d9bd8f2d3af8281b2d18548f4172539851e7fa4bd7888",
      "clips": [
        {
          "part": "hola",
          "text": "Bon dia. Vinc a tornar la novel·la que em vaig endur. Em falta llegir l’últim capítol, però em sembla que l’havia de tornar avui. Em podríeu deixar uns dies més?",
          "candidateFile": "assets/audio/repairs/l43-s088-hola-prova.mp3",
          "candidateSha256": "05e9b69243685065401fd804400ca05bcbf07e0bba45e62589167421ded46543",
          "batchRequestHash": "9960a95b4a6a51078cec246c7fc38c6fb297a46045a22136e5b69ded99107088",
          "sourceTakeSha256": "bc242d90a2e17f16242d9bd8f2d3af8281b2d18548f4172539851e7fa4bd7888",
          "candidateTakeId": "S088-hola",
          "sourceRequestHash": "e2075224c586efb6ff249dbcf23b3a286eff4556a72ee4599c38d09d8e4c8977"
        }
      ]
    },
    "bodyVoiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-26",
      "sourceTakeSha256": "bc242d90a2e17f16242d9bd8f2d3af8281b2d18548f4172539851e7fa4bd7888",
      "confirmation": "Docent 26/11: S088 validat per muntatge amb les esmenes rebudes hola."
    },
    "mountedAt": "2026-11-26T09:10:22.675Z",
    "synthesisBatch": "L30+L43",
    "requestHash": "5ed59232b69faa60d8941f58707e2257e023d90a4ae4a53f0fcb54d6435c3fd6",
    "audioSha256": "9c104980714d1e802579179ea9ffd398b85d05a095c19922fe077ba184621955",
    "montageNewSynthesisRequests": 0,
    "reviewUpdate": {
      "audio": "./assets/audio/s088-mixed-v1.mp3",
      "at": "2026-11-26",
      "summary": {
        "ca": "Esmenes validades incorporades. Ambient enregistrat continu i suau, sense pauses d’efectes. Pendent d’escoltar el muntatge.",
        "es": "Correcciones validadas incorporadas. Ambiente grabado continuo y suave, sin pausas de efectos. Pendiente de escuchar el montaje."
      }
    }
  },
  "ca-S089": {
    "state": "published",
    "editorialFingerprint": "11a1464e406a74a9317bfaf5dab94dc03cffddacf88cdc2e8ff2ad54df312db6",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "scriptApprovedAt": "2026-11-23",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "ed7a98b7ba253d19f5ac89d2b12bc2f476ddba0e18111f57d341456168810a25",
      "confirmation": "Docent 25/11: S089 validat per muntatge."
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S089-T01"
      ],
      "total": 1,
      "batches": [
        "L34"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-24T13:59:03.085Z",
    "voicePreview": "./proves/veus-rebudes.html#S089",
    "voicePreviewFile": "./assets/audio/s089-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T13:50:28.370Z",
    "synthesisBatch": "L34",
    "requestHash": "aef37a3e56d6a4126206a0905030aad2bc53160804678de652431febf809e7e6",
    "audioSha256": "6e1e56fcbd6d6359645550e1b9dec53dc8b06c44b3bb58e6df5c0625818c4e2a",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "Docent 25/11: S094, S111, S099, S072 i S089 validats per publicació definitiva.",
    "publicationMaterials": {
      "illustration": "./assets/images/s089-publicacio-v1.webp",
      "illustrationSha256": "67dd17fa3dc88c0e87c30069ce7b676190671b3cc2f1a17e74ffb7cf84297bf7",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S090": {
    "state": "montage-awaiting-listening",
    "editorialFingerprint": "3945774f4fa3767f1b6bb711464d0fc65da830b6ae0d1b9679ab3d0ef7ab95c7",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "teacherAssessment": "Veus i esmenes aprovades incorporades al muntatge. Pendent de l’audició final del docent.",
    "scriptApprovedAt": "2026-11-23",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-26",
      "sourceTakeSha256": "4b07e8697e0448aeac95cd52843a0fd25fe3939284adf28849cb7362c8f6b3cd",
      "baseTakeSha256": "8f7f465eadc453b44bfc28b97cd2e956afd4c4950741c66cd88576c076e234b5",
      "confirmation": "Docent 26/11: S090 validat per muntatge amb les esmenes rebudes introduction, pilota.",
      "derivation": "Previously approved complete body, plus the exact teacher-approved opening clips. Full montage still awaits listening.",
      "repairs": [
        {
          "part": "introduction",
          "text": "Comprensió oral. Ens falta espai per jugar.",
          "candidateFile": "assets/audio/repairs/l42-s090-introduction-prova.mp3",
          "candidateSha256": "960e48900746141d0ebf9e554462269a24e75147bc5da33699386ba01e2a956a",
          "batchRequestHash": "8c88a52f86f88e6e32937a960ccaad2dbd0c0d7033a3ee64b278fb2175c7f25e",
          "sourceTakeSha256": "8f7f465eadc453b44bfc28b97cd2e956afd4c4950741c66cd88576c076e234b5",
          "candidateTakeId": "S090-introduction",
          "sourceRequestHash": "ec493323fe29d5e206c967e4db3450dee7af041004ff0e86e6b79455d893b902"
        },
        {
          "part": "pilota",
          "text": "Biel, la pilota! Agafa-la, que va cap al camí!",
          "candidateFile": "assets/audio/repairs/l42-s090-pilota-prova.mp3",
          "candidateSha256": "06304fc9c2633c2ea627c05b33fc4bd4d7aa96bf6bf1666baecfdb48866c6e76",
          "batchRequestHash": "8c88a52f86f88e6e32937a960ccaad2dbd0c0d7033a3ee64b278fb2175c7f25e",
          "sourceTakeSha256": "8f7f465eadc453b44bfc28b97cd2e956afd4c4950741c66cd88576c076e234b5",
          "candidateTakeId": "S090-pilota",
          "sourceRequestHash": "ec493323fe29d5e206c967e4db3450dee7af041004ff0e86e6b79455d893b902"
        }
      ]
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S090-T01"
      ],
      "total": 1,
      "batches": [
        "L31"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T21:51:41.247Z",
    "voicePreview": "./proves/veus-rebudes.html#S090",
    "voicePreviewFile": "./assets/audio/s090-voices-review-v1.mp3",
    "voiceReviewUpdate": {
      "file": "./assets/audio/s090-voices-review-v1.mp3",
      "at": "2026-11-26",
      "summary": {
        "ca": "Els fragments nous ja són a «Escolta les esmenes». Cal escoltar-los juntament amb la resta de la locució abans de muntar.",
        "es": "Los fragmentos nuevos están en «Escucha las correcciones». Hay que escucharlos junto al resto de la locución antes del montaje."
      }
    },
    "plannedRepair": {
      "status": "applied-awaiting-montage-listening",
      "parts": [],
      "voices": {
        "Laia": "Leda"
      },
      "sourceTakeSha256": "8f7f465eadc453b44bfc28b97cd2e956afd4c4950741c66cd88576c076e234b5",
      "confirmation": "Docent 25/11: confirmades les omissions de text detectades a S088 i S090; s’hauran de generar en properes peticions."
    },
    "feedback": [
      {
        "part": "introduction",
        "speaker": "Laia",
        "kind": "omitted-speech",
        "word": "presentació",
        "missingText": "Comprensió oral. Ens falta espai per jugar.",
        "status": "applied",
        "confirmedAt": "2026-11-25",
        "appliedAt": "2026-11-26"
      },
      {
        "part": "pilota",
        "speaker": "Laia",
        "kind": "omitted-speech",
        "word": "primer torn omès",
        "missingText": "Biel, la pilota! Agafa-la, que va cap al camí!",
        "status": "applied",
        "confirmedAt": "2026-11-25",
        "appliedAt": "2026-11-26"
      }
    ],
    "voiceReviewNote": {
      "ca": "Omissions confirmades: falten la presentació i la primera crida de Laia («Biel, la pilota! Agafa-la, que va cap al camí!»). En cua per a un lot compatible; la presa actual es conserva.",
      "es": "Omisiones confirmadas: faltan la presentación y la primera llamada de Laia sobre la pelota. En cola para un lote compatible; la toma actual se conserva."
    },
    "repairComparison": "./proves/correccions-l42.html#S090-pilota",
    "receivedRepairs": [
      {
        "code": "S090",
        "part": "introduction",
        "text": "Comprensió oral. Ens falta espai per jugar.",
        "pronunciation": "Read the complete exercise introduction and title once, with the same youthful female Laia/Leda identity; no omitted beginning or added words.",
        "status": "applied-awaiting-montage-listening",
        "missingOriginal": true,
        "candidateFile": "assets/audio/repairs/l42-s090-introduction-prova.mp3",
        "sourceRawSha256": "bd17485cca82d19a097a226a1f1287a035db454d787194c9e781fa088a9d8555",
        "sourceTakeId": "S090-T01",
        "sourceTakeSha256": "8f7f465eadc453b44bfc28b97cd2e956afd4c4950741c66cd88576c076e234b5",
        "batchRequestHash": "8c88a52f86f88e6e32937a960ccaad2dbd0c0d7033a3ee64b278fb2175c7f25e",
        "applied": true,
        "approvedAt": "2026-11-26",
        "confirmation": "Docent 26/11: esmena S090/introduction validada.",
        "candidateSha256": "960e48900746141d0ebf9e554462269a24e75147bc5da33699386ba01e2a956a",
        "appliedAt": "2026-11-26",
        "appliedAudio": "./assets/audio/s090-mixed-v1.mp3",
        "appliedAudioSha256": "ae0ff134a6f47704490c5f151afb10335488b37724cc092a9c332bc1ca25041b"
      },
      {
        "code": "S090",
        "part": "pilota",
        "text": "Biel, la pilota! Agafa-la, que va cap al camí!",
        "pronunciation": "Read the entire brief Laia line clearly in a youthful female Laia/Leda voice, alert but not shrieking. Both sentences were omitted; do not skip either. Do not read this direction.",
        "status": "applied-awaiting-montage-listening",
        "missingOriginal": true,
        "candidateFile": "assets/audio/repairs/l42-s090-pilota-prova.mp3",
        "sourceRawSha256": "bd17485cca82d19a097a226a1f1287a035db454d787194c9e781fa088a9d8555",
        "sourceTakeId": "S090-T01",
        "sourceTakeSha256": "8f7f465eadc453b44bfc28b97cd2e956afd4c4950741c66cd88576c076e234b5",
        "batchRequestHash": "8c88a52f86f88e6e32937a960ccaad2dbd0c0d7033a3ee64b278fb2175c7f25e",
        "applied": true,
        "approvedAt": "2026-11-26",
        "confirmation": "Docent 26/11: esmena S090/pilota validada.",
        "candidateSha256": "06304fc9c2633c2ea627c05b33fc4bd4d7aa96bf6bf1666baecfdb48866c6e76",
        "appliedAt": "2026-11-26",
        "appliedAudio": "./assets/audio/s090-mixed-v1.mp3",
        "appliedAudioSha256": "ae0ff134a6f47704490c5f151afb10335488b37724cc092a9c332bc1ca25041b"
      }
    ],
    "repairApplicationApproval": {
      "scope": "approved-repair",
      "approvedAt": "2026-11-26",
      "confirmation": "Docent 26/11: S090 validat per muntatge amb les esmenes rebudes introduction, pilota.",
      "sourceTakeSha256": "8f7f465eadc453b44bfc28b97cd2e956afd4c4950741c66cd88576c076e234b5",
      "clips": [
        {
          "part": "introduction",
          "text": "Comprensió oral. Ens falta espai per jugar.",
          "candidateFile": "assets/audio/repairs/l42-s090-introduction-prova.mp3",
          "candidateSha256": "960e48900746141d0ebf9e554462269a24e75147bc5da33699386ba01e2a956a",
          "batchRequestHash": "8c88a52f86f88e6e32937a960ccaad2dbd0c0d7033a3ee64b278fb2175c7f25e",
          "sourceTakeSha256": "8f7f465eadc453b44bfc28b97cd2e956afd4c4950741c66cd88576c076e234b5",
          "candidateTakeId": "S090-introduction",
          "sourceRequestHash": "ec493323fe29d5e206c967e4db3450dee7af041004ff0e86e6b79455d893b902"
        },
        {
          "part": "pilota",
          "text": "Biel, la pilota! Agafa-la, que va cap al camí!",
          "candidateFile": "assets/audio/repairs/l42-s090-pilota-prova.mp3",
          "candidateSha256": "06304fc9c2633c2ea627c05b33fc4bd4d7aa96bf6bf1666baecfdb48866c6e76",
          "batchRequestHash": "8c88a52f86f88e6e32937a960ccaad2dbd0c0d7033a3ee64b278fb2175c7f25e",
          "sourceTakeSha256": "8f7f465eadc453b44bfc28b97cd2e956afd4c4950741c66cd88576c076e234b5",
          "candidateTakeId": "S090-pilota",
          "sourceRequestHash": "ec493323fe29d5e206c967e4db3450dee7af041004ff0e86e6b79455d893b902"
        }
      ]
    },
    "bodyVoiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-26",
      "sourceTakeSha256": "8f7f465eadc453b44bfc28b97cd2e956afd4c4950741c66cd88576c076e234b5",
      "confirmation": "Docent 26/11: S090 validat per muntatge amb les esmenes rebudes introduction, pilota."
    },
    "mountedAt": "2026-11-26T09:10:41.327Z",
    "synthesisBatch": "L31+L42",
    "requestHash": "78eef507cf1dac74e4a5837413f1484c38828de6fa834fe9aedfcfd3c1de330c",
    "audioSha256": "ae0ff134a6f47704490c5f151afb10335488b37724cc092a9c332bc1ca25041b",
    "montageNewSynthesisRequests": 0,
    "reviewUpdate": {
      "audio": "./assets/audio/s090-mixed-v1.mp3",
      "at": "2026-11-26",
      "summary": {
        "ca": "Esmenes validades incorporades. Ambient enregistrat continu i suau, sense pauses d’efectes. Pendent d’escoltar el muntatge.",
        "es": "Correcciones validadas incorporadas. Ambiente grabado continuo y suave, sin pausas de efectos. Pendiente de escuchar el montaje."
      }
    }
  },
  "ca-S091": {
    "state": "published",
    "editorialFingerprint": "ca43f9ee5ce043395b4735f5ec163374ced1628b3981d35843a7113398ae7d76",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Muntatge validat definitivament pel docent al traspàs confirmat. Àudio conservat sense canvis.",
    "scriptApprovedAt": "2026-11-23",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "4f95c91b9540fdadcb9d2a17c3f24677040ccce2070f42ac66075bfa4ccfd04f",
      "confirmation": "Docent 25/11: S091 validat per muntatge."
    },
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S091-T01"
      ],
      "total": 1,
      "batches": [
        "L31"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T21:51:41.247Z",
    "voicePreview": "./proves/veus-rebudes.html#S091",
    "voicePreviewFile": "./assets/audio/s091-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T07:44:13.581Z",
    "synthesisBatch": "L31",
    "requestHash": "a60fe358a66004eba2e6b742133d7f9780780baf5a8739a3a428828c3e6fa590",
    "audioSha256": "8b3c96aaa58f393482a14a2824d21d6f31aaed049d8c031d1ff63e34ae92df87",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "S091: muntatge validat per publicació definitiva al traspàs docent del 25/11/2026; abast de les tretze peces confirmat pel docent en aquesta conversa.",
    "publicationMaterials": {
      "illustration": "./assets/images/s091-publicacio-v1.jpg",
      "illustrationSha256": "48e0fd9abffbae8862dff0f16145a1c61569edd4f070591dfd079cfe92c78d4d",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S092": {
    "state": "published",
    "editorialFingerprint": "84d6f3b9df031f340ed262324879778cb46a051137a6263482a677f907dc1f3c",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Muntatge validat definitivament pel docent al traspàs confirmat. Àudio conservat sense canvis.",
    "scriptApprovedAt": "2026-11-24",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "a7526542d23262cf97f442317d236e93f8e981f710bb6cd39b17fd458e9da3ba",
      "confirmation": "Docent 25/11: S092 validat per muntatge."
    },
    "scriptApprovalSource": "Docent 24/11: S092, S093, S095 validats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S092-T01"
      ],
      "total": 1,
      "batches": [
        "L35"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-24T14:01:08.329Z",
    "voicePreview": "./proves/veus-rebudes.html#S092",
    "voicePreviewFile": "./assets/audio/s092-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T07:28:39.462Z",
    "synthesisBatch": "L35",
    "requestHash": "2e429c977e701ef1f63c2570d8f4ce02143fc47e4241bb11ee74e0760f029f2e",
    "audioSha256": "4c3a936d601dca61ac3b36de520dec51842a55df1bc524ba87555534034b720f",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "S092: muntatge validat per publicació definitiva al traspàs docent del 25/11/2026; abast de les tretze peces confirmat pel docent en aquesta conversa.",
    "publicationMaterials": {
      "illustration": "./assets/images/s092-publicacio-v1.jpg",
      "illustrationSha256": "139a1f901bf177f411a7d9941b4ae5c05eb47d23fa5fa208918b85a183219696",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S093": {
    "state": "montage-awaiting-listening",
    "editorialFingerprint": "eaf0239e622c8d5e8478bef8386126d6842f83336ed8df4d737a074b8d438c88",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "teacherAssessment": "Veus validades i esmena exacta aplicada; falta audició del muntatge.",
    "scriptApprovedAt": "2026-11-24",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-26",
      "sourceTakeSha256": "5728382eded2a849dc50cf639c9c471961123fea65180df1e181df456b5f5b6f",
      "baseTakeSha256": "66c820836d9636dbfa46fb630f811ba63cec30d373a17db35f83f4691b56fbc8",
      "confirmation": "Docent 26/11: esmena confirmar de S093 validada; incorporar la presa exacta.",
      "derivation": "Previously approved remaining speech plus the exact teacher-approved replacement; assembled playback still awaits montage audition.",
      "repairs": [
        {
          "part": "confirmar",
          "text": "Ah! Doncs el directe, el de les deu i vint-i-cinc. Jo m’havia fixat només en l’hora de sortir. La meva amiga ja ve expressament a buscar-me i no la vull fer esperar.",
          "candidateFile": "assets/audio/repairs/l38-s093-confirmar-prova.mp3",
          "candidateSha256": "21be79cdc3e31b9d182ed13c43c3d80e1622961ea8ef7171cf2a6b6c1b465b93",
          "batchRequestHash": "5451b4cea3e920f9aa007be12efb850987a7a6376108afb4dff422c3b91341ac",
          "sourceTakeSha256": "66c820836d9636dbfa46fb630f811ba63cec30d373a17db35f83f4691b56fbc8",
          "candidateTakeId": "S093-confirmar",
          "sourceRequestHash": "de6c03afbce9dd817671644e29f30aa9f88947641327ac61d36e8cb15a3956a2"
        }
      ]
    },
    "scriptApprovalSource": "Docent 24/11: S092, S093, S095 validats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S093-T01"
      ],
      "total": 1,
      "batches": [
        "L35"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-24T14:01:08.329Z",
    "voicePreview": "./proves/veus-rebudes.html#S093",
    "voicePreviewFile": "./assets/audio/s093-voices-review-v1.mp3",
    "feedback": [
      {
        "part": "confirmar",
        "speaker": "Mar",
        "kind": "pronunciation",
        "word": "deu i vint-i-cinc",
        "heard": "deu i vint-cinc",
        "status": "applied",
        "appliedAt": "2026-11-26"
      }
    ],
    "plannedRepair": {
      "status": "awaiting-compatible-batch",
      "parts": [
        "confirmar"
      ],
      "speaker": "Mar",
      "voice": "Erinome",
      "sourceTakeSha256": "66c820836d9636dbfa46fb630f811ba63cec30d373a17db35f83f4691b56fbc8"
    },
    "approvedUnchangedSpeech": {
      "status": "approved-except-listed-parts",
      "at": "2026-11-25",
      "sourceTakeSha256": "66c820836d9636dbfa46fb630f811ba63cec30d373a17db35f83f4691b56fbc8",
      "exceptParts": [
        "confirmar"
      ],
      "confirmation": "Docent 25/11: la Mar omet la i de vint-i-cinc a Ah! Doncs el directe, el de les deu i vint-i-cinc. Regenerar aquest torn; resta correcta."
    },
    "repairComparison": "./proves/correccions-l38.html#S093-confirmar",
    "receivedRepairs": [
      {
        "code": "S093",
        "part": "confirmar",
        "text": "Ah! Doncs el directe, el de les deu i vint-i-cinc. Jo m’havia fixat només en l’hora de sortir. La meva amiga ja ve expressament a buscar-me i no la vull fer esperar.",
        "pronunciation": "In deu i vint-i-cinc, pronounce both written I sounds. Vint-i-cinc must include the I between vint and cinc, never vint-cinc. Say the full number fluently, not by spelling it or reading this instruction. Keep the same adult female Mar voice throughout.",
        "status": "applied-awaiting-montage-listening",
        "originalFile": "assets/audio/repairs/l38-s093-confirmar-original.mp3",
        "candidateFile": "assets/audio/repairs/l38-s093-confirmar-prova.mp3",
        "sourceRawSha256": "d57bbc3b3b2098192643be92fb576b7712479884661730de76a9bd6452161333",
        "sourceTakeId": "S093-T01",
        "sourceTakeSha256": "66c820836d9636dbfa46fb630f811ba63cec30d373a17db35f83f4691b56fbc8",
        "batchRequestHash": "5451b4cea3e920f9aa007be12efb850987a7a6376108afb4dff422c3b91341ac",
        "applied": true,
        "approvedAt": "2026-11-26",
        "confirmation": "Docent 26/11: esmena confirmar de S093 validada; incorporar la presa exacta.",
        "candidateSha256": "21be79cdc3e31b9d182ed13c43c3d80e1622961ea8ef7171cf2a6b6c1b465b93",
        "appliedAt": "2026-11-26",
        "appliedFile": "assets/audio/s093-mixed-v1.mp3",
        "appliedAudio": "./assets/audio/s093-mixed-v1.mp3",
        "appliedAudioSha256": "11cbdbedd65133ee4b26dd7a6cbd6680b601a026b9e5d26391fd77eaf98a31b2"
      }
    ],
    "repairApplicationApproval": {
      "scope": "approved-repair",
      "approvedAt": "2026-11-26",
      "confirmation": "Docent 26/11: esmena confirmar de S093 validada; incorporar la presa exacta.",
      "clips": [
        {
          "part": "confirmar",
          "text": "Ah! Doncs el directe, el de les deu i vint-i-cinc. Jo m’havia fixat només en l’hora de sortir. La meva amiga ja ve expressament a buscar-me i no la vull fer esperar.",
          "candidateFile": "assets/audio/repairs/l38-s093-confirmar-prova.mp3",
          "candidateSha256": "21be79cdc3e31b9d182ed13c43c3d80e1622961ea8ef7171cf2a6b6c1b465b93",
          "batchRequestHash": "5451b4cea3e920f9aa007be12efb850987a7a6376108afb4dff422c3b91341ac",
          "sourceTakeSha256": "66c820836d9636dbfa46fb630f811ba63cec30d373a17db35f83f4691b56fbc8",
          "candidateTakeId": "S093-confirmar",
          "sourceRequestHash": "de6c03afbce9dd817671644e29f30aa9f88947641327ac61d36e8cb15a3956a2"
        }
      ]
    },
    "mountedAt": "2026-11-26T07:35:14.303Z",
    "synthesisBatch": "L35+L38",
    "requestHash": "5cdbd8c6d0e0758808df27f758e8db26f4c21069a67dba8736fc613da86cf3f2",
    "audioSha256": "11cbdbedd65133ee4b26dd7a6cbd6680b601a026b9e5d26391fd77eaf98a31b2",
    "montageNewSynthesisRequests": 0,
    "reviewUpdate": {
      "audio": "./assets/audio/s093-mixed-v1.mp3",
      "at": "2026-11-26",
      "summary": {
        "ca": "Esmena de veu validada incorporada al muntatge amb ambient continu suau. Pendent d’escolta del muntatge.",
        "es": "Corrección de voz validada incorporada al montaje con ambiente continuo suave. Pendiente de escuchar el montaje."
      }
    }
  },
  "ca-S094": {
    "state": "published",
    "editorialFingerprint": "2b23227c9a7c4600b9ef3cdb1c9352b174c59ee703f7aeda63790fefa50a6ef9",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "scriptApprovedAt": "2026-11-24",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "abe8fec0666c5e05c074ddb4e5bdb4ed9728931294a290c1d93f8f89a3a3b24c",
      "confirmation": "Docent 25/11: S094 validat per muntatge."
    },
    "scriptApprovalSource": "Docent 24/11: S094, S098, S103, S097 validats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S094-T01"
      ],
      "total": 1,
      "batches": [
        "L35"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-24T14:01:08.329Z",
    "voicePreview": "./proves/veus-rebudes.html#S094",
    "voicePreviewFile": "./assets/audio/s094-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T13:48:09.279Z",
    "synthesisBatch": "L35",
    "requestHash": "2e429c977e701ef1f63c2570d8f4ce02143fc47e4241bb11ee74e0760f029f2e",
    "audioSha256": "95aabaae7e23079442e072e5328db8578536791f5918d1f93d670ca8026b1144",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "Docent 25/11: S094, S111, S099, S072 i S089 validats per publicació definitiva.",
    "publicationMaterials": {
      "illustration": "./assets/images/s094-publicacio-v1.webp",
      "illustrationSha256": "544c9b2a7d2c500dd4635850f1fbc4b044335b4a896d1b5a9507d55cd52620d1",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S095": {
    "state": "audio-corrections-pending",
    "editorialFingerprint": "7ed0378eef4a769903b2c525ca116fda8179722e7f2c2dab256cbbbcb2a5eb3d",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "teacherAssessment": "Guió, veus i escaleta validats pel docent; preparar un lot compatible de síntesi.",
    "scriptApprovedAt": "2026-11-24",
    "voiceApproval": false,
    "scriptApprovalSource": "Docent 24/11: S092, S093, S095 validats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S095-T01"
      ],
      "total": 1,
      "batches": [
        "L34"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-24T13:59:03.085Z",
    "voicePreview": "./proves/veus-rebudes.html#S095",
    "voicePreviewFile": "./assets/audio/s095-voices-review-v1.mp3",
    "feedback": [
      {
        "part": "mida",
        "speaker": "Empleada",
        "kind": "voice-identity",
        "word": "veu de l’empleada",
        "heard": "veu inicial massa greu; canvia a La primera recollida",
        "status": "pending"
      },
      {
        "part": "recollida",
        "speaker": "Empleada",
        "kind": "voice-identity",
        "word": "veu de l’empleada",
        "heard": "veu inicial massa greu; canvia a La primera recollida",
        "status": "pending"
      }
    ],
    "plannedRepair": {
      "status": "awaiting-compatible-batch",
      "parts": [
        "mida",
        "recollida"
      ],
      "speaker": "Empleada",
      "voice": "Gacrux",
      "sourceTakeSha256": "b4ee57151a66ed8c7e4c63e8e030dd453bd1d02e2ccbb7601212fb3a21844712",
      "note": "Repetir només els dos torns inicials de l’empleada, abans de franja, amb una identitat femenina estable."
    },
    "repairComparison": "./proves/correccions-l44.html#S095-recollida",
    "receivedRepairs": [
      {
        "code": "S095",
        "part": "mida",
        "text": "Bon dia. El mesurem? Fa vuitanta-cinc centímetres. El servei que recollim aquí admet paquets de fins a vuitanta. Per a aquest tub hem de mirar la modalitat de paquets grans.",
        "pronunciation": "Keep the same adult female Gacrux voice across the complete intervention; natural tone and stable identity, not a male or very deep voice. Read only the supplied words.",
        "status": "received-awaiting-listening",
        "originalFile": "assets/audio/repairs/l44-s095-mida-original.mp3",
        "candidateFile": "assets/audio/repairs/l44-s095-mida-prova.mp3",
        "sourceRawSha256": "e745dbb235852711298ebf545af5ec836adc9e26531e6290cf3c4e457a4ecadd",
        "sourceTakeId": "S095-T01",
        "sourceTakeSha256": "b4ee57151a66ed8c7e4c63e8e030dd453bd1d02e2ccbb7601212fb3a21844712",
        "batchRequestHash": "9248c489c64e875fe1064129ec8b89af997b81a15790709c61813ac08f3d23e0",
        "applied": false
      },
      {
        "code": "S095",
        "part": "recollida",
        "text": "Sí. El podem preparar des d’aquest taulell, però el transportista recull el paquet al domicili. Aquí tenim poc espai i els tubs grans els van a buscar directament.",
        "pronunciation": "Keep the same adult female Gacrux voice across the complete intervention; natural tone and stable identity, not a male or very deep voice. Read only the supplied words.",
        "status": "received-awaiting-listening",
        "originalFile": "assets/audio/repairs/l44-s095-recollida-original.mp3",
        "candidateFile": "assets/audio/repairs/l44-s095-recollida-prova.mp3",
        "sourceRawSha256": "e745dbb235852711298ebf545af5ec836adc9e26531e6290cf3c4e457a4ecadd",
        "sourceTakeId": "S095-T01",
        "sourceTakeSha256": "b4ee57151a66ed8c7e4c63e8e030dd453bd1d02e2ccbb7601212fb3a21844712",
        "batchRequestHash": "9248c489c64e875fe1064129ec8b89af997b81a15790709c61813ac08f3d23e0",
        "applied": false
      }
    ]
  },
  "ca-S096": {
    "state": "published",
    "editorialFingerprint": "aff0cd6efccee69c7c2024d4c5bbe031b8b3b92b96ff80f1a429066bfe72dad9",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Muntatge validat definitivament pel docent al traspàs confirmat. Àudio conservat sense canvis.",
    "scriptApprovedAt": "2026-11-24",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "d9b28f037fc6c32b70dab1b7195e16e5619315a8bf118cad4d39ae6c69166c07",
      "confirmation": "Docent 25/11: S096 validat per muntatge."
    },
    "scriptApprovalSource": "Docent 24/11: S099, S096 validats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S096-T01"
      ],
      "total": 1,
      "batches": [
        "L34"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-24T13:59:03.085Z",
    "voicePreview": "./proves/veus-rebudes.html#S096",
    "voicePreviewFile": "./assets/audio/s096-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T07:39:53.270Z",
    "synthesisBatch": "L34",
    "requestHash": "aef37a3e56d6a4126206a0905030aad2bc53160804678de652431febf809e7e6",
    "audioSha256": "c3243edc78fb5c229c855e4f6d653a2cb90ef04f38f291430c59d950b17f3382",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "S096: muntatge validat per publicació definitiva al traspàs docent del 25/11/2026; abast de les tretze peces confirmat pel docent en aquesta conversa.",
    "publicationMaterials": {
      "illustration": "./assets/images/s096-publicacio-v1.jpg",
      "illustrationSha256": "724cd2d25115a848161b49176d6b7290d8f79cc3d01451f4b0435c8387953d08",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S097": {
    "state": "published",
    "editorialFingerprint": "e6fbfc105080ad31f3568d2a7b102c2c99e6e2effec7bcede065031d7661ed81",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "scriptApprovedAt": "2026-11-24",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "d202e044a4ceb9d8249262beb25599aadf20a0c65f84c0cf5e7f57f51e3911a8",
      "baseTakeSha256": "bc2141f6960d93c4870fda81394c97c9c72c05446b6cf414342f08ba78b4b2f3",
      "confirmation": "Docent 25/11: S097 queda validat amb les dues esmenes que havíem demanat; passar a muntatge.",
      "derivation": "Previously approved complete body, plus the two exact teacher-approved opening clips. Full montage still awaits listening.",
      "repairs": [
        {
          "part": "introduction",
          "text": "Comprensió oral. Quina parada em queda més a prop?",
          "candidateFile": "assets/audio/repairs/l37-s097-introduction-prova.mp3",
          "candidateSha256": "28283524604e44dde198d9b4fd9e1e7b0011d20604ed3ccc0acf013bafe26918",
          "batchRequestHash": "f8f95587af9933a81a7732a732045a0094ec864fc0d9d79fb70e2daac13764d9"
        },
        {
          "part": "hola",
          "text": "Bon dia. Voldria un bitllet per anar a Portell de Mar aquesta tarda. M’han deixat una habitació prop del passeig de la Marina, però aquí no em conec gens les parades.",
          "candidateFile": "assets/audio/repairs/l37-s097-hola-prova.mp3",
          "candidateSha256": "713a61be5f56283635dbcec1cec7a0ecd2d04a8b7488fcadefed577a82684f36",
          "batchRequestHash": "f8f95587af9933a81a7732a732045a0094ec864fc0d9d79fb70e2daac13764d9"
        }
      ]
    },
    "scriptApprovalSource": "Docent 24/11: S094, S098, S103, S097 validats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S097-T01"
      ],
      "total": 1,
      "batches": [
        "L34"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-24T13:59:03.085Z",
    "voicePreview": "./proves/veus-rebudes.html#S097",
    "voicePreviewFile": "./assets/audio/s097-voices-review-v1.mp3",
    "voiceReviewUpdate": {
      "file": "./assets/audio/s097-voices-review-v1.mp3",
      "at": "2026-11-25",
      "summary": {
        "ca": "Els fragments nous ja són a «Escolta les esmenes». Cal escoltar-los juntament amb la resta de la locució abans de muntar.",
        "es": "Los fragmentos nuevos están en «Escucha las correcciones». Hay que escucharlos junto al resto de la locución antes del montaje."
      }
    },
    "plannedRepair": {
      "status": "applied-validated",
      "scope": "missing-opening",
      "parts": [
        {
          "part": "introduction",
          "text": "Comprensió oral. Quina parada em queda més a prop?"
        },
        {
          "part": "hola",
          "text": "Bon dia. Voldria un bitllet per anar a Portell de Mar aquesta tarda. M’han deixat una habitació prop del passeig de la Marina, però aquí no em conec gens les parades."
        }
      ],
      "speaker": "Ferran",
      "voice": "Algenib",
      "sourceTakeId": "S097-T01",
      "note": "Inici omès al retorn de L34, detectat a la comprovació local. Conservar la presa i mostrar l’avís. No s’ha repetit cap síntesi.",
      "appliedAudio": "./assets/audio/s097-mixed-v1.mp3",
      "appliedAt": "2026-11-25"
    },
    "repairComparison": "./proves/correccions-l37.html#S097-hola",
    "receivedRepairs": [
      {
        "code": "S097",
        "part": "introduction",
        "text": "Comprensió oral. Quina parada em queda més a prop?",
        "pronunciation": "Read the complete exercise introduction and title exactly once in the warm older male Ferran/Algenib voice.",
        "status": "applied-validated",
        "missingOriginal": true,
        "candidateFile": "assets/audio/repairs/l37-s097-introduction-prova.mp3",
        "sourceRawSha256": "e745dbb235852711298ebf545af5ec836adc9e26531e6290cf3c4e457a4ecadd",
        "sourceTakeId": "S097-T01",
        "sourceTakeSha256": "bc2141f6960d93c4870fda81394c97c9c72c05446b6cf414342f08ba78b4b2f3",
        "batchRequestHash": "f8f95587af9933a81a7732a732045a0094ec864fc0d9d79fb70e2daac13764d9",
        "applied": true,
        "candidateSha256": "28283524604e44dde198d9b4fd9e1e7b0011d20604ed3ccc0acf013bafe26918",
        "approvedAt": "2026-11-25",
        "approvedBy": "docent",
        "confirmation": "Docent 25/11: S097 queda validat amb les dues esmenes que havíem demanat; passar a muntatge.",
        "appliedAt": "2026-11-25",
        "appliedAudio": "./assets/audio/s097-mixed-v1.mp3",
        "validatedAt": "2026-11-25",
        "validatedAudioSha256": "8bda965862ac582419d8b518cd91f1677ddf2e0071f955327570e888a5b0fec2"
      },
      {
        "code": "S097",
        "part": "hola",
        "text": "Bon dia. Voldria un bitllet per anar a Portell de Mar aquesta tarda. M’han deixat una habitació prop del passeig de la Marina, però aquí no em conec gens les parades.",
        "pronunciation": "Read the complete opening Bon dia and all the following sentences in the warm older male Ferran/Algenib voice. This whole opening turn was omitted previously; do not skip it.",
        "status": "applied-validated",
        "missingOriginal": true,
        "candidateFile": "assets/audio/repairs/l37-s097-hola-prova.mp3",
        "sourceRawSha256": "e745dbb235852711298ebf545af5ec836adc9e26531e6290cf3c4e457a4ecadd",
        "sourceTakeId": "S097-T01",
        "sourceTakeSha256": "bc2141f6960d93c4870fda81394c97c9c72c05446b6cf414342f08ba78b4b2f3",
        "batchRequestHash": "f8f95587af9933a81a7732a732045a0094ec864fc0d9d79fb70e2daac13764d9",
        "applied": true,
        "candidateSha256": "713a61be5f56283635dbcec1cec7a0ecd2d04a8b7488fcadefed577a82684f36",
        "approvedAt": "2026-11-25",
        "approvedBy": "docent",
        "confirmation": "Docent 25/11: S097 queda validat amb les dues esmenes que havíem demanat; passar a muntatge.",
        "appliedAt": "2026-11-25",
        "appliedAudio": "./assets/audio/s097-mixed-v1.mp3",
        "validatedAt": "2026-11-25",
        "validatedAudioSha256": "8bda965862ac582419d8b518cd91f1677ddf2e0071f955327570e888a5b0fec2"
      }
    ],
    "bodyVoiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "bc2141f6960d93c4870fda81394c97c9c72c05446b6cf414342f08ba78b4b2f3",
      "scope": "received-body-with-two-approved-opening-insertions",
      "confirmation": "Docent 25/11: S097 queda validat amb les dues esmenes que havíem demanat; passar a muntatge."
    },
    "repairApplicationApproval": {
      "scope": "approved-repair",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "bc2141f6960d93c4870fda81394c97c9c72c05446b6cf414342f08ba78b4b2f3",
      "confirmation": "Docent 25/11: S097 queda validat amb les dues esmenes que havíem demanat; passar a muntatge.",
      "clips": [
        {
          "part": "introduction",
          "text": "Comprensió oral. Quina parada em queda més a prop?",
          "candidateFile": "assets/audio/repairs/l37-s097-introduction-prova.mp3",
          "candidateSha256": "28283524604e44dde198d9b4fd9e1e7b0011d20604ed3ccc0acf013bafe26918",
          "batchRequestHash": "f8f95587af9933a81a7732a732045a0094ec864fc0d9d79fb70e2daac13764d9"
        },
        {
          "part": "hola",
          "text": "Bon dia. Voldria un bitllet per anar a Portell de Mar aquesta tarda. M’han deixat una habitació prop del passeig de la Marina, però aquí no em conec gens les parades.",
          "candidateFile": "assets/audio/repairs/l37-s097-hola-prova.mp3",
          "candidateSha256": "713a61be5f56283635dbcec1cec7a0ecd2d04a8b7488fcadefed577a82684f36",
          "batchRequestHash": "f8f95587af9933a81a7732a732045a0094ec864fc0d9d79fb70e2daac13764d9"
        }
      ]
    },
    "mountedAt": "2026-11-25T12:14:41.959Z",
    "synthesisBatch": "L34+L37",
    "requestHash": "364cfefbc968c52d0192d4ab1ea090e6d3d1bbb2b92848f53d2301657702f783",
    "audioSha256": "8bda965862ac582419d8b518cd91f1677ddf2e0071f955327570e888a5b0fec2",
    "montageNewSynthesisRequests": 0,
    "missingVoiceDetails": [],
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "Docent 25/11: S104, S106, S087, S110, S074, S100, S108, S056 i S097 validats tots per publicació definitiva.",
    "publicationMaterials": {
      "illustration": "./assets/images/s097-publicacio-v1.webp",
      "illustrationSha256": "6df0b50d7b31688e47ea46468520664ea04b60cbd0d33bb61f471fad9983275c",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S098": {
    "state": "published",
    "editorialFingerprint": "ced0567852428f0bdd1455e53d176112bdac0eb02b3e14eb1cb8a2fc50459f66",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Muntatge validat definitivament pel docent al traspàs confirmat. Àudio conservat sense canvis.",
    "scriptApprovedAt": "2026-11-24",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "a2c6a912ba914729c9366a11a23ede254fe589246b836f225962a15e74de81e9",
      "confirmation": "Docent 25/11: S098 validat per muntatge."
    },
    "scriptApprovalSource": "Docent 24/11: S094, S098, S103, S097 validats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S098-T01"
      ],
      "total": 1,
      "batches": [
        "L33"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-24T13:54:18.603Z",
    "voicePreview": "./proves/veus-rebudes.html#S098",
    "voicePreviewFile": "./assets/audio/s098-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T07:28:50.269Z",
    "synthesisBatch": "L33",
    "requestHash": "c8516a1b636a26a9ed64fa2c7c6106cf90afe153ae62018e472a7fbda49e8c1a",
    "audioSha256": "cfd08c1dcb75297a5ff2a3e8199fb43f1aec75b38a133655384ec38b43e7f8b1",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "S098: muntatge validat per publicació definitiva al traspàs docent del 25/11/2026; abast de les tretze peces confirmat pel docent en aquesta conversa.",
    "publicationMaterials": {
      "illustration": "./assets/images/s098-publicacio-v1.jpg",
      "illustrationSha256": "fd512866881d51ff2beabaac2a7344485430becb6d1ecb8fd23040ff405a21ad",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S099": {
    "state": "published",
    "editorialFingerprint": "7d523b30ba49a0f3b46a59280055bd8481b983af011319dfda5ec94c51102c65",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "scriptApprovedAt": "2026-11-24",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "19e10426343a2d05c4744c3b283a1cd1ebdb2b6b1b688a7215a3ec839ac01a47",
      "confirmation": "Docent 25/11: S099 validat per muntatge."
    },
    "scriptApprovalSource": "Docent 24/11: S099, S096 validats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S099-T01"
      ],
      "total": 1,
      "batches": [
        "L32"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-24T13:47:08.519Z",
    "voicePreview": "./proves/veus-rebudes.html#S099",
    "voicePreviewFile": "./assets/audio/s099-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T13:41:15.566Z",
    "synthesisBatch": "L32",
    "requestHash": "a38715e579b55a270d1e2b0f493b471ebe0f7ed700681aceec1aadfd202a5f75",
    "audioSha256": "f0ca5ee2bfcc4b4d2ae539fe7389d29208e59f51d2e1374f2c10acb47e6d4149",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "Docent 25/11: S094, S111, S099, S072 i S089 validats per publicació definitiva.",
    "publicationMaterials": {
      "illustration": "./assets/images/s099-publicacio-v1.webp",
      "illustrationSha256": "7e3619bac21893bdd8f4aa1f0965d97233719b11226cd06d7c4389bf75e29dd5",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S100": {
    "state": "published",
    "editorialFingerprint": "4dff90bac370d9fc26b7e2718881d0018459080b762c6c0c32da68ba75f3939d",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "scriptApprovedAt": "2026-11-24",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "975d588a565c7533b27058efecdbaeccd43c77629312b27d87b32b61ea2a2aec",
      "confirmation": "Docent 25/11: S100 validat per muntatge."
    },
    "scriptApprovalSource": "Docent 24/11: S104, S100 i S108 validats per síntesi de veus; S109, S102 i S105 també preparats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S100-T01"
      ],
      "total": 1,
      "batches": [
        "L32"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-24T13:47:08.519Z",
    "voicePreview": "./proves/veus-rebudes.html#S100",
    "voicePreviewFile": "./assets/audio/s100-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T12:11:54.566Z",
    "synthesisBatch": "L32",
    "requestHash": "a38715e579b55a270d1e2b0f493b471ebe0f7ed700681aceec1aadfd202a5f75",
    "audioSha256": "a5a7d7d3a07c60f48896ddbd44d42b5c4511c58402536f39b0b7a71afe571683",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "Docent 25/11: S104, S106, S087, S110, S074, S100, S108, S056 i S097 validats tots per publicació definitiva.",
    "publicationMaterials": {
      "illustration": "./assets/images/s100-publicacio-v1.webp",
      "illustrationSha256": "049026915cb6431e7149b257d5e4720a97b619a17d1609747141b722bbd87d55",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S101": {
    "state": "published",
    "editorialFingerprint": "cdf204ed1c0182c8af94100baf82f2538d0eaa054ded80b9681aa0ae9a9186cd",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Muntatge validat definitivament pel docent al traspàs confirmat. Àudio conservat sense canvis.",
    "scriptApprovedAt": "2026-11-24",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "d645ae1f783750952d1da9ca090580180c8c351a7981862c96cbbd4fb677dd5e",
      "confirmation": "Docent 25/11: S101 validat per muntatge."
    },
    "scriptApprovalSource": "Docent 24/11: S101, S094 validats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S101-T01"
      ],
      "total": 1,
      "batches": [
        "L32"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-24T13:47:08.519Z",
    "voicePreview": "./proves/veus-rebudes.html#S101",
    "voicePreviewFile": "./assets/audio/s101-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T07:37:57.251Z",
    "synthesisBatch": "L32",
    "requestHash": "a38715e579b55a270d1e2b0f493b471ebe0f7ed700681aceec1aadfd202a5f75",
    "audioSha256": "b1638ccdb7f41995f5621fb3989d4a214cd23416e2841e7d55fc6af52312491b",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "S101: muntatge validat per publicació definitiva al traspàs docent del 25/11/2026; abast de les tretze peces confirmat pel docent en aquesta conversa.",
    "publicationMaterials": {
      "illustration": "./assets/images/s101-publicacio-v1.jpg",
      "illustrationSha256": "70103b4ba0ef40d53d7b780ea60cf7843020107758721e5b5802429ab639d95b",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S102": {
    "state": "audio-corrections-pending",
    "editorialFingerprint": "4dd156b4c265063cd61702d5277774bec616590d1650d41831cc1e51e36696b7",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "teacherAssessment": "Només queda pendent final: Tillers; falta la geminació. Les altres proves validades es conserven.",
    "scriptApprovedAt": "2026-11-24",
    "voiceApproval": false,
    "scriptApprovalSource": "Docent 24/11: S104, S100 i S108 validats per síntesi de veus; S109, S102 i S105 també preparats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S102-T01"
      ],
      "total": 1,
      "batches": [
        "L32"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-24T13:47:08.519Z",
    "voicePreview": "./proves/veus-rebudes.html#S102",
    "voicePreviewFile": "./assets/audio/s102-voices-review-v1.mp3",
    "feedback": [
      {
        "part": "sentit",
        "speaker": "Informadora",
        "kind": "pronunciation",
        "word": "Til·lers",
        "heard": "Tillers; falta la geminació",
        "status": "pending"
      },
      {
        "part": "final",
        "speaker": "Mar",
        "kind": "pronunciation",
        "word": "Til·lers",
        "heard": "Tillers; falta la geminació",
        "status": "pending"
      }
    ],
    "plannedRepair": {
      "status": "awaiting-compatible-batch",
      "parts": [
        "final"
      ],
      "voices": {
        "Mar": "Erinome",
        "Informadora": "Callirrhoe"
      },
      "sourceTakeSha256": "cf45c4b06820ebd43f8fc0a5032b49fc26f87c08b7786d13a8b867f689356ad5",
      "preserveParts": [
        "linia"
      ],
      "confirmation": "Docent 25/11: esmenar Til·lers al torn sentit de la Informadora i al torn final de Mar. Conservar linia de Mar, amb pronunciació correcta.",
      "part": "final",
      "reason": "Tillers; falta la geminació",
      "confirmedAt": "2026-11-26",
      "attempt": 2
    },
    "repairComparison": "./proves/correccions-l44.html#S102-sentit",
    "receivedRepairs": [
      {
        "code": "S102",
        "part": "final",
        "text": "Sí, està bé: plaça dels Til·lers, cap al centre. Gràcies per atendre’m. Adeu.",
        "pronunciation": "In Til·lers, pronounce the L gemination clearly: an audible sustained double L /lː/ across the syllable boundary, never the palatal LL sound. Keep the natural Catalan word and the exact assigned adult female voice. Read the entire supplied turn once. Do not read this instruction.",
        "status": "rejected-awaiting-resynthesis",
        "originalFile": "assets/audio/repairs/l38-s102-final-original.mp3",
        "candidateFile": "assets/audio/repairs/l38-s102-final-prova.mp3",
        "sourceRawSha256": "dbfe51e338dfe13edbea6f589e2b50227add83c034010620624ca265411144bf",
        "sourceTakeId": "S102-T01",
        "sourceTakeSha256": "cf45c4b06820ebd43f8fc0a5032b49fc26f87c08b7786d13a8b867f689356ad5",
        "batchRequestHash": "5451b4cea3e920f9aa007be12efb850987a7a6376108afb4dff422c3b91341ac",
        "applied": false,
        "rejectedAt": "2026-11-26",
        "rejection": "Tillers; falta la geminació"
      },
      {
        "code": "S102",
        "part": "sentit",
        "text": "Plaça dels Til·lers, línia sis, cap al centre, ahir a les cinc i vint. T’ho repeteixo perquè a l’altra banda de la plaça hi ha la parada del sentit contrari.",
        "pronunciation": "In Til·lers, pronounce the L gemination clearly: an audible sustained double L /lː/ across the syllable boundary, never the palatal LL sound. Keep the natural Catalan word and the exact assigned adult female voice. Read the entire supplied turn once. Do not read this instruction.",
        "status": "approved-awaiting-application",
        "originalFile": "assets/audio/repairs/l44-s102-sentit-original.mp3",
        "candidateFile": "assets/audio/repairs/l44-s102-sentit-prova.mp3",
        "sourceRawSha256": "dbfe51e338dfe13edbea6f589e2b50227add83c034010620624ca265411144bf",
        "sourceTakeId": "S102-T01",
        "sourceTakeSha256": "cf45c4b06820ebd43f8fc0a5032b49fc26f87c08b7786d13a8b867f689356ad5",
        "batchRequestHash": "9248c489c64e875fe1064129ec8b89af997b81a15790709c61813ac08f3d23e0",
        "applied": false,
        "approvedAt": "2026-11-26",
        "confirmation": "Docent 26/11: esmena S102/sentit validada.",
        "candidateSha256": "1f9ced9f49556b52a787935cb727fe5312a4c5e98ed945fc26bafafdab1f1547"
      }
    ],
    "approvedRepairSelections": {
      "sentit": {
        "part": "sentit",
        "text": "Plaça dels Til·lers, línia sis, cap al centre, ahir a les cinc i vint. T’ho repeteixo perquè a l’altra banda de la plaça hi ha la parada del sentit contrari.",
        "candidateFile": "assets/audio/repairs/l44-s102-sentit-prova.mp3",
        "candidateSha256": "1f9ced9f49556b52a787935cb727fe5312a4c5e98ed945fc26bafafdab1f1547",
        "batchRequestHash": "9248c489c64e875fe1064129ec8b89af997b81a15790709c61813ac08f3d23e0",
        "sourceTakeSha256": "cf45c4b06820ebd43f8fc0a5032b49fc26f87c08b7786d13a8b867f689356ad5",
        "candidateTakeId": "S102-sentit",
        "sourceRequestHash": "22a19c67d1ea29be233549e657f9ba6b3e36ec501e2d2f89419b8d39046766c7",
        "approvedAt": "2026-11-26"
      }
    },
    "repairOrderConfirmation": {
      "at": "2026-11-26",
      "uiOrder": [
        "final",
        "sentit"
      ],
      "rejected": "final",
      "approved": "sentit",
      "basis": "Primer comiat de Mar de L38; segon torn de la Informadora de L44, segons l’ordre del quadre de comparacions."
    }
  },
  "ca-S103": {
    "state": "published",
    "editorialFingerprint": "6738f1d698a1472ae29b51a295f4eac043937fdf73ca3a93cf6c6fa2b618737b",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Muntatge validat definitivament pel docent al traspàs confirmat. Àudio conservat sense canvis.",
    "scriptApprovedAt": "2026-11-24",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "b484be2ea5735dd3f7042374c8ac35b73828c6e58388fab6d14c602df72131e1",
      "confirmation": "Docent 25/11: S103 validat per muntatge."
    },
    "scriptApprovalSource": "Docent 24/11: S094, S098, S103, S097 validats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S103-T01"
      ],
      "total": 1,
      "batches": [
        "L33"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-24T13:54:18.603Z",
    "voicePreview": "./proves/veus-rebudes.html#S103",
    "voicePreviewFile": "./assets/audio/s103-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T07:37:11.556Z",
    "synthesisBatch": "L33",
    "requestHash": "c8516a1b636a26a9ed64fa2c7c6106cf90afe153ae62018e472a7fbda49e8c1a",
    "audioSha256": "116ef06febb8f9f2c70a34be15c5eb6f194f20f5175ed5bdbaa0109fc12921b2",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "S103: muntatge validat per publicació definitiva al traspàs docent del 25/11/2026; abast de les tretze peces confirmat pel docent en aquesta conversa.",
    "publicationMaterials": {
      "illustration": "./assets/images/s103-publicacio-v1.jpg",
      "illustrationSha256": "3765d18aeb82bf3d2194fc88d5e96e9fa8903a892377cc6132e6d3a0864888d5",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S104": {
    "state": "published",
    "editorialFingerprint": "2f5fb7f0ab5a825e1caa88f29482415ac7d5212803f6d5a3046ed161ecc2b28e",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "scriptApprovedAt": "2026-11-24",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "79873a1aa0366bce3ef3609304451fd79c3d42d046abac0d9d3a446701103445",
      "confirmation": "Docent 25/11: S104 validat per muntatge."
    },
    "scriptApprovalSource": "Docent 24/11: S104, S100 i S108 validats per síntesi de veus; S109, S102 i S105 també preparats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S104-T01"
      ],
      "total": 1,
      "batches": [
        "L36"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T07:23:59.464Z",
    "voicePreview": "./proves/veus-rebudes.html#S104",
    "voicePreviewFile": "./assets/audio/s104-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T12:07:10.395Z",
    "synthesisBatch": "L36",
    "requestHash": "8176fbf46265f9e3a131fc1725426c5d108483d7613cc38bbddfc69c9e425901",
    "audioSha256": "0b06376cb48f7356a97eb9056bd787e6f021250f13056f263572030d221e5146",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "Docent 25/11: S104, S106, S087, S110, S074, S100, S108, S056 i S097 validats tots per publicació definitiva.",
    "publicationMaterials": {
      "illustration": "./assets/images/s104-publicacio-v1.webp",
      "illustrationSha256": "f902116973c2f12af0f4227819e2c94f4d16659aba9aa3cdc835ed5c52ab742f",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S105": {
    "state": "published",
    "editorialFingerprint": "0fdf8c01aee77f5c69430cf0657f2e03223506571db73379133d291b6b128a67",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Muntatge validat definitivament pel docent al traspàs confirmat. Àudio conservat sense canvis.",
    "scriptApprovedAt": "2026-11-24",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "3e6f365795d6efe3af6c3ac58aafed4e91f794ec3554bc5a5dcd1e20a4b4b5cf",
      "confirmation": "Docent 25/11: S105 validat per fer muntatge."
    },
    "scriptApprovalSource": "Docent 24/11: S104, S100 i S108 validats per síntesi de veus; S109, S102 i S105 també preparats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S105-T01"
      ],
      "total": 1,
      "batches": [
        "L36"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T07:23:59.464Z",
    "voicePreview": "./proves/veus-rebudes.html#S105",
    "voicePreviewFile": "./assets/audio/s105-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T11:38:19.005Z",
    "synthesisBatch": "L36",
    "requestHash": "8176fbf46265f9e3a131fc1725426c5d108483d7613cc38bbddfc69c9e425901",
    "audioSha256": "cabff8502cf492c1be171e241d5dbf8f388d24efcdbc6bea0095d55e7ead946e",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "S105: muntatge validat per publicació definitiva al traspàs docent del 25/11/2026; abast de les tretze peces confirmat pel docent en aquesta conversa.",
    "publicationMaterials": {
      "illustration": "./assets/images/s105-publicacio-v1.jpg",
      "illustrationSha256": "9666399f39742d8b2a8924a32058bcd0124b3b19e0ec0347471de1cf847d533c",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S106": {
    "state": "published",
    "editorialFingerprint": "8522a7e9b60c08723ec7a6d07b13c9d2959249d1519a11be98ae7c5154f844f3",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "scriptApprovedAt": "2026-11-25",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "edc558bb6c6820bf08d44f3a70acbcb25ec59f5b278f973233a8c6efafed3475",
      "confirmation": "Docent 25/11: S106 validat per muntatge."
    },
    "scriptApprovalSource": "Docent 25/11: S106, S111, S107, S110 validats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S106-T01"
      ],
      "total": 1,
      "batches": [
        "L36"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T07:23:59.464Z",
    "voicePreview": "./proves/veus-rebudes.html#S106",
    "voicePreviewFile": "./assets/audio/s106-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T12:09:28.840Z",
    "synthesisBatch": "L36",
    "requestHash": "8176fbf46265f9e3a131fc1725426c5d108483d7613cc38bbddfc69c9e425901",
    "audioSha256": "9807c1125d809e97f0675b73f25f5524edf68a32bea7b86b52bb92d33ddc1059",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "Docent 25/11: S104, S106, S087, S110, S074, S100, S108, S056 i S097 validats tots per publicació definitiva.",
    "publicationMaterials": {
      "illustration": "./assets/images/s106-publicacio-v1.webp",
      "illustrationSha256": "def5281be41a9d9a41567ab37511eb17dc43e78703f38a52d9ab59810c72ae72",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S107": {
    "state": "audio-corrections-pending",
    "editorialFingerprint": "f53c7d88670bbcf0b1fda9c16010078ab99a255af85b66ffa864c5fcb89994c0",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "teacherAssessment": "Només queda pendent sortida: fona o funa en lloc de funda. Les altres proves validades es conserven.",
    "scriptApprovedAt": "2026-11-25",
    "voiceApproval": false,
    "scriptApprovalSource": "Docent 25/11: S106, S111, S107, S110 validats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S107-T01"
      ],
      "total": 1,
      "batches": [
        "L36"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T07:23:59.464Z",
    "voicePreview": "./proves/veus-rebudes.html#S107",
    "voicePreviewFile": "./assets/audio/s107-voices-review-v1.mp3",
    "feedback": [
      {
        "part": "sortida",
        "speaker": "Elies",
        "kind": "pronunciation",
        "word": "funda",
        "heard": "fona o funa en lloc de funda",
        "status": "pending"
      }
    ],
    "plannedRepair": {
      "status": "awaiting-compatible-batch",
      "parts": [
        "sortida"
      ],
      "speaker": "Elies",
      "voice": "Algieba",
      "sourceTakeSha256": "525ff41226cc378f4ebbe5371647df5394eeef5eadedde5cc9695ed1b5334dbd",
      "confirmation": "Docent 25/11: l’Elies diu funa en lloc de funda al seu últim torn de S107. Regenerar aquest torn amb la mateixa veu.",
      "batch": "L43",
      "part": "sortida",
      "attempt": 3,
      "reason": "fona o funa en lloc de funda",
      "confirmedAt": "2026-11-26"
    },
    "repairComparison": "./proves/correccions-l43.html#S107-sortida",
    "receivedRepairs": [
      {
        "code": "S107",
        "part": "sortida",
        "text": "Aquí tens el carro, amb una nansa a cada extrem. La bossa ja és dins d’aquesta funda. Obro la porta: prova’l.",
        "pronunciation": "Pronounce funda /ˈfun.də/ with stressed U and audible N followed by D: FUN-da, never funa or fona. Keep the adult male Elies/Algieba voice throughout the whole turn. Do not read this instruction.",
        "status": "rejected-awaiting-resynthesis",
        "originalFile": "assets/audio/repairs/l43-s107-sortida-original.mp3",
        "candidateFile": "assets/audio/repairs/l43-s107-sortida-prova.mp3",
        "sourceRawSha256": "815d6171203b9b51d2d614e8bc5127851f4857c64e348631ae75cc09bd47d65f",
        "sourceTakeId": "S107-T01",
        "sourceTakeSha256": "525ff41226cc378f4ebbe5371647df5394eeef5eadedde5cc9695ed1b5334dbd",
        "batchRequestHash": "9960a95b4a6a51078cec246c7fc38c6fb297a46045a22136e5b69ded99107088",
        "applied": false,
        "rejectedAt": "2026-11-26",
        "rejection": "fona o funa en lloc de funda"
      }
    ]
  },
  "ca-S108": {
    "state": "published",
    "editorialFingerprint": "393f58bd9fb7c0e997964c2f6413bcf5ef39e3adff7fe7183510af9899e4f3d9",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "scriptApprovedAt": "2026-11-24",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "42c92651d7b9595cfc520249c9d9a818f1d6519e2f696555ec73f7ca427e7cfc",
      "confirmation": "Docent 25/11: S108 validat per muntatge."
    },
    "scriptApprovalSource": "Docent 24/11: S104, S100 i S108 validats per síntesi de veus; S109, S102 i S105 també preparats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S108-T01"
      ],
      "total": 1,
      "batches": [
        "L37"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T07:27:33.506Z",
    "voicePreview": "./proves/veus-rebudes.html#S108",
    "voicePreviewFile": "./assets/audio/s108-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T12:04:44.042Z",
    "synthesisBatch": "L37",
    "requestHash": "f8f95587af9933a81a7732a732045a0094ec864fc0d9d79fb70e2daac13764d9",
    "audioSha256": "496d2d8ea9b0dc357af8736908d399188f09090dd0337203d47d1877cb68cf87",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "Docent 25/11: S104, S106, S087, S110, S074, S100, S108, S056 i S097 validats tots per publicació definitiva.",
    "publicationMaterials": {
      "illustration": "./assets/images/s108-publicacio-v1.webp",
      "illustrationSha256": "bf01257addd17865a094fbd1d21949be64e8cbef4c69dde2c90d2b805aab6027",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S109": {
    "state": "montage-awaiting-listening",
    "editorialFingerprint": "49f5f4af5c5bed3c90b0ea7350c5bb1af5d3e73e71b4815a470036fdb9293689",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "teacherAssessment": "Veus i esmenes aprovades incorporades al muntatge. Pendent de l’audició final del docent.",
    "scriptApprovedAt": "2026-11-24",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-26",
      "sourceTakeSha256": "addbed3f9f7678fefb2bd607081c6bdd3b8dca309bdfee06a3703dcf91a64a24",
      "baseTakeSha256": "19d485fc7d429f225f848b1ff866fd34ae162b265aca0341a9479f218159ea24",
      "confirmation": "Docent 26/11: S109 validat per muntatge amb les esmenes rebudes temps, final.",
      "derivation": "Previously approved remaining speech plus the exact teacher-approved replacement; assembled playback still awaits montage audition.",
      "repairs": [
        {
          "part": "temps",
          "text": "Pel passeig en trigaríem uns vint. Ara són les quatre i tenim fins a les cinc per tornar a casa. La mare ens vindrà a buscar llavors.",
          "candidateFile": "assets/audio/repairs/l43-s109-temps-prova.mp3",
          "candidateSha256": "08c27bed1ad498109c99b60bfab87c95d92dadf527760f18f54fb3f97a0ea649",
          "batchRequestHash": "9960a95b4a6a51078cec246c7fc38c6fb297a46045a22136e5b69ded99107088",
          "sourceTakeSha256": "19d485fc7d429f225f848b1ff866fd34ae162b265aca0341a9479f218159ea24",
          "candidateTakeId": "S109-temps",
          "sourceRequestHash": "b97377a8effc1d8cf8115b7a2d32e6364be7fce48193ec50e22a05caee690968"
        },
        {
          "part": "final",
          "text": "Tracte fet. I el pròxim cop posa’m les botes al costat de la porta, que avui he sortit ben mudat per anar a trepitjar bassals.",
          "candidateFile": "assets/audio/repairs/l43-s109-final-prova.mp3",
          "candidateSha256": "af4e0763545b3baa2a65af067a0ef7af609d04d0d9583c460090ec33f36089ed",
          "batchRequestHash": "9960a95b4a6a51078cec246c7fc38c6fb297a46045a22136e5b69ded99107088",
          "sourceTakeSha256": "19d485fc7d429f225f848b1ff866fd34ae162b265aca0341a9479f218159ea24",
          "candidateTakeId": "S109-final",
          "sourceRequestHash": "b97377a8effc1d8cf8115b7a2d32e6364be7fce48193ec50e22a05caee690968"
        }
      ]
    },
    "scriptApprovalSource": "Docent 24/11: S104, S100 i S108 validats per síntesi de veus; S109, S102 i S105 també preparats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S109-T01"
      ],
      "total": 1,
      "batches": [
        "L37"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T07:27:33.506Z",
    "voicePreview": "./proves/veus-rebudes.html#S109",
    "voicePreviewFile": "./assets/audio/s109-voices-review-v1.mp3",
    "feedback": [
      {
        "part": "temps",
        "speaker": "Ferran",
        "kind": "pronunciation",
        "word": "passeig",
        "heard": "passaig",
        "status": "applied",
        "appliedAt": "2026-11-26"
      },
      {
        "part": "final",
        "speaker": "Ferran",
        "kind": "pronunciation",
        "word": "bassals",
        "heard": "basalls",
        "status": "applied",
        "appliedAt": "2026-11-26"
      }
    ],
    "plannedRepair": {
      "status": "applied-awaiting-montage-listening",
      "parts": [],
      "speaker": "Ferran",
      "voice": "Algenib",
      "sourceTakeSha256": "19d485fc7d429f225f848b1ff866fd34ae162b265aca0341a9479f218159ea24",
      "confirmation": "Docent 25/11: Ferran diu passaig a Pel passeig en trigaríem uns vint i basalls al darrer torn amb trepitjar bassals. Esmenar els dos torns."
    },
    "repairComparison": "./proves/correccions-l43.html#S109-final",
    "receivedRepairs": [
      {
        "code": "S109",
        "part": "temps",
        "text": "Pel passeig en trigaríem uns vint. Ara són les quatre i tenim fins a les cinc per tornar a casa. La mare ens vindrà a buscar llavors.",
        "pronunciation": "Pronounce the Catalan word passeig clearly, preserving the written E vowel; never say passaig. Keep the natural Catalan stress and final consonant, and the warm older male Ferran/Algenib identity. Read the entire supplied turn once; do not read this instruction.",
        "status": "applied-awaiting-montage-listening",
        "originalFile": "assets/audio/repairs/l43-s109-temps-original.mp3",
        "candidateFile": "assets/audio/repairs/l43-s109-temps-prova.mp3",
        "sourceRawSha256": "b99990632ae375e147c0dbf518405868ce02ecf1fe1f18a401a94d3353feb027",
        "sourceTakeId": "S109-T01",
        "sourceTakeSha256": "19d485fc7d429f225f848b1ff866fd34ae162b265aca0341a9479f218159ea24",
        "batchRequestHash": "9960a95b4a6a51078cec246c7fc38c6fb297a46045a22136e5b69ded99107088",
        "applied": true,
        "approvedAt": "2026-11-26",
        "confirmation": "Docent 26/11: esmena S109/temps validada.",
        "candidateSha256": "08c27bed1ad498109c99b60bfab87c95d92dadf527760f18f54fb3f97a0ea649",
        "appliedAt": "2026-11-26",
        "appliedAudio": "./assets/audio/s109-mixed-v1.mp3",
        "appliedAudioSha256": "9232b5dbadf553883507825087aa3eb4915001067f643bdd4dead78d801f654a"
      },
      {
        "code": "S109",
        "part": "final",
        "text": "Tracte fet. I el pròxim cop posa’m les botes al costat de la porta, que avui he sortit ben mudat per anar a trepitjar bassals.",
        "pronunciation": "Pronounce bassals clearly: ba-SALS, stressed on the final syllable, with unvoiced SS and a plain final L plus S. Never change the ending into palatal LL or say basalls. Keep the warm older male Ferran/Algenib identity. Read the entire supplied turn once; do not read this instruction.",
        "status": "applied-awaiting-montage-listening",
        "originalFile": "assets/audio/repairs/l43-s109-final-original.mp3",
        "candidateFile": "assets/audio/repairs/l43-s109-final-prova.mp3",
        "sourceRawSha256": "b99990632ae375e147c0dbf518405868ce02ecf1fe1f18a401a94d3353feb027",
        "sourceTakeId": "S109-T01",
        "sourceTakeSha256": "19d485fc7d429f225f848b1ff866fd34ae162b265aca0341a9479f218159ea24",
        "batchRequestHash": "9960a95b4a6a51078cec246c7fc38c6fb297a46045a22136e5b69ded99107088",
        "applied": true,
        "approvedAt": "2026-11-26",
        "confirmation": "Docent 26/11: esmena S109/final validada.",
        "candidateSha256": "af4e0763545b3baa2a65af067a0ef7af609d04d0d9583c460090ec33f36089ed",
        "appliedAt": "2026-11-26",
        "appliedAudio": "./assets/audio/s109-mixed-v1.mp3",
        "appliedAudioSha256": "9232b5dbadf553883507825087aa3eb4915001067f643bdd4dead78d801f654a"
      }
    ],
    "repairApplicationApproval": {
      "scope": "approved-repair",
      "approvedAt": "2026-11-26",
      "confirmation": "Docent 26/11: S109 validat per muntatge amb les esmenes rebudes temps, final.",
      "sourceTakeSha256": "19d485fc7d429f225f848b1ff866fd34ae162b265aca0341a9479f218159ea24",
      "clips": [
        {
          "part": "temps",
          "text": "Pel passeig en trigaríem uns vint. Ara són les quatre i tenim fins a les cinc per tornar a casa. La mare ens vindrà a buscar llavors.",
          "candidateFile": "assets/audio/repairs/l43-s109-temps-prova.mp3",
          "candidateSha256": "08c27bed1ad498109c99b60bfab87c95d92dadf527760f18f54fb3f97a0ea649",
          "batchRequestHash": "9960a95b4a6a51078cec246c7fc38c6fb297a46045a22136e5b69ded99107088",
          "sourceTakeSha256": "19d485fc7d429f225f848b1ff866fd34ae162b265aca0341a9479f218159ea24",
          "candidateTakeId": "S109-temps",
          "sourceRequestHash": "b97377a8effc1d8cf8115b7a2d32e6364be7fce48193ec50e22a05caee690968"
        },
        {
          "part": "final",
          "text": "Tracte fet. I el pròxim cop posa’m les botes al costat de la porta, que avui he sortit ben mudat per anar a trepitjar bassals.",
          "candidateFile": "assets/audio/repairs/l43-s109-final-prova.mp3",
          "candidateSha256": "af4e0763545b3baa2a65af067a0ef7af609d04d0d9583c460090ec33f36089ed",
          "batchRequestHash": "9960a95b4a6a51078cec246c7fc38c6fb297a46045a22136e5b69ded99107088",
          "sourceTakeSha256": "19d485fc7d429f225f848b1ff866fd34ae162b265aca0341a9479f218159ea24",
          "candidateTakeId": "S109-final",
          "sourceRequestHash": "b97377a8effc1d8cf8115b7a2d32e6364be7fce48193ec50e22a05caee690968"
        }
      ]
    },
    "bodyVoiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-26",
      "sourceTakeSha256": "19d485fc7d429f225f848b1ff866fd34ae162b265aca0341a9479f218159ea24",
      "confirmation": "Docent 26/11: S109 validat per muntatge amb les esmenes rebudes temps, final."
    },
    "mountedAt": "2026-11-26T09:10:15.452Z",
    "synthesisBatch": "L37+L43+L43",
    "requestHash": "ba773b2cf9c2af564a3b4231cc6d58e10968db6dfcb700f6952424200e209fd7",
    "audioSha256": "9232b5dbadf553883507825087aa3eb4915001067f643bdd4dead78d801f654a",
    "montageNewSynthesisRequests": 0,
    "reviewUpdate": {
      "audio": "./assets/audio/s109-mixed-v1.mp3",
      "at": "2026-11-26",
      "summary": {
        "ca": "Esmenes validades incorporades. Ambient enregistrat continu i suau, sense pauses d’efectes. Pendent d’escoltar el muntatge.",
        "es": "Correcciones validadas incorporadas. Ambiente grabado continuo y suave, sin pausas de efectos. Pendiente de escuchar el montaje."
      }
    }
  },
  "ca-S110": {
    "state": "published",
    "editorialFingerprint": "3b377041184cba78af49198bdff68d1a4b35896019fe1cbf4ca38a840f1029f6",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "scriptApprovedAt": "2026-11-25",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "0dad195ecd8aa696db0863e3a7f25a34ab78b7634e2c9cded1b55dbc2d61b800",
      "confirmation": "Docent 25/11: S110 validat per muntatge."
    },
    "scriptApprovalSource": "Docent 25/11: S106, S111, S107, S110 validats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S110-T01"
      ],
      "total": 1,
      "batches": [
        "L37"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T07:27:33.506Z",
    "voicePreview": "./proves/veus-rebudes.html#S110",
    "voicePreviewFile": "./assets/audio/s110-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T12:07:39.154Z",
    "synthesisBatch": "L37",
    "requestHash": "f8f95587af9933a81a7732a732045a0094ec864fc0d9d79fb70e2daac13764d9",
    "audioSha256": "344ee8235ac97149500ee811cee084ea800a5639d140259c9b42de577fd36622",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "Docent 25/11: S104, S106, S087, S110, S074, S100, S108, S056 i S097 validats tots per publicació definitiva.",
    "publicationMaterials": {
      "illustration": "./assets/images/s110-publicacio-v1.webp",
      "illustrationSha256": "b313cdff1cc8069902348586bc20b5f098c47da5bad74a7964d8b2a839a383a0",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S111": {
    "state": "published",
    "editorialFingerprint": "7a80ff9ded56c7571a4dbdbbf4429b2603181a0b30b985f6e67451a2a68153a5",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "scriptApprovedAt": "2026-11-25",
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "9f5231d3a27f0a01d3d1bb43cc008847f0d9c1f8b53ca45747740f4435a6e556",
      "confirmation": "Docent 25/11: S111 validat per muntatge."
    },
    "scriptApprovalSource": "Docent 25/11: S106, S111, S107, S110 validats per síntesi de veus. Guions, veus i escaletes aprovats; esperar un lot compatible i comprovar-ne la mida abans d’enviar.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S111-T01"
      ],
      "total": 1,
      "batches": [
        "L37"
      ]
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T07:27:33.506Z",
    "voicePreview": "./proves/veus-rebudes.html#S111",
    "voicePreviewFile": "./assets/audio/s111-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T13:47:22.095Z",
    "synthesisBatch": "L37",
    "requestHash": "f8f95587af9933a81a7732a732045a0094ec864fc0d9d79fb70e2daac13764d9",
    "audioSha256": "e28964a1d9a44ffe028ac204dac5bf61ef982718b68bad1727fae4a37b8b1e14",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "confirmation": "Docent 25/11: S094, S111, S099, S072 i S089 validats per publicació definitiva.",
    "publicationMaterials": {
      "illustration": "./assets/images/s111-publicacio-v1.webp",
      "illustrationSha256": "1764f641c5c28aeb2265336ff0321b6fa443016bfd2ed7b6f196ffb0235a86ac",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S113": {
    "state": "published",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "6baa969e056fc43fc3809b0d84352ba0c1391ab46225c6c041260c6f149456b9",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 25/11: S127, S119, S121, S117, S115, S112 i S113 validats per publicació definitiva.",
    "scriptApprovalSource": "Docent 25/11: S113 també puja a síntesi.",
    "reason": "Guió i escaleta validats. Pendent de completar i congelar un lot compatible de sis a vuit minuts; cap síntesi nova enviada.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S113-T01"
      ],
      "total": 1,
      "batches": [
        "L38"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "ee83184fc1b51c08598c06c0db87851043e65fe0d1796507f8e8c247d8494445",
      "sourceBatch": "L38",
      "confirmation": "Docent 25/11: S119, S117, S115, S113, S112, S121 i S127 validats per pujar a muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T20:03:33.548Z",
    "voicePreview": "./proves/veus-rebudes.html#S113",
    "voicePreviewFile": "./assets/audio/s113-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T21:07:40.876Z",
    "synthesisBatch": "L38",
    "requestHash": "5451b4cea3e920f9aa007be12efb850987a7a6376108afb4dff422c3b91341ac",
    "audioSha256": "08f9b5796fbf412e8a0d38975d79bd8726324dcf64ead0dc6bd119b23f0489c4",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "publicationMaterials": {
      "illustration": "./assets/images/s113-publicacio-v1.webp",
      "illustrationSha256": "5d75c47c43fb394b79c7960e639a0065f94cc104e6301a1e21417e5e073bca58",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S114": {
    "state": "published",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "dede002a48c6662d55771332fcfa2b8684738c07befc28bd734f83047f172e53",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 26/11: S124, S126, S120, S114, S123, S116 i S125 validats per publicació definitiva.",
    "scriptApprovalSource": "Docent 25/11: S114 és vàlid per pujar a síntesi.",
    "reason": "Guió i escaleta validats. Pendent de completar i congelar un lot compatible de sis a vuit minuts; cap síntesi nova enviada.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S114-T01"
      ],
      "total": 1,
      "batches": [
        "L38"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "929ec2855805b0f1b4156ec8ba06abbe43d387105d19726b8005b25ab4c6d44c",
      "sourceBatch": "L38",
      "confirmation": "Docent 25/11: S123, S114, S125, S120, S126, S116, S113 i S124 validats per passar a muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T20:03:33.548Z",
    "voicePreview": "./proves/veus-rebudes.html#S114",
    "voicePreviewFile": "./assets/audio/s114-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T21:18:52.604Z",
    "synthesisBatch": "L38",
    "requestHash": "5451b4cea3e920f9aa007be12efb850987a7a6376108afb4dff422c3b91341ac",
    "audioSha256": "27edf060b31d01eed155cea8ca693575043f7d1d478508b1035aa8040f2dc7fb",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-26",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "publicationMaterials": {
      "illustration": "./assets/images/s114-publicacio-v1.webp",
      "illustrationSha256": "fe2670ed7b2f46962137abf4c258ad408436dbe43d140d7bdb947074d35d5a56",
      "transcript": "speech-only",
      "checkedAt": "2026-11-26",
      "audioChanged": false
    }
  },
  "ca-S116": {
    "state": "published",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "d99e80b07b124da9debd3a46a9439c881a110c555387deda5abf9edf69219937",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 26/11: S124, S126, S120, S114, S123, S116 i S125 validats per publicació definitiva.",
    "scriptApprovalSource": "Docent 25/11: S116 i S127 també pugen a síntesi de veus.",
    "reason": "Guió i escaleta validats. Pendent de completar i congelar un lot compatible de sis a vuit minuts; cap síntesi nova enviada.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S116-T01"
      ],
      "total": 1,
      "batches": [
        "L38"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "793a004b326e97f25ceef5c847e60afd7a6530ad2eb9c54ada2b8f884fec5a37",
      "sourceBatch": "L38",
      "confirmation": "Docent 25/11: S123, S114, S125, S120, S126, S116, S113 i S124 validats per passar a muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T20:03:33.548Z",
    "voicePreview": "./proves/veus-rebudes.html#S116",
    "voicePreviewFile": "./assets/audio/s116-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T21:19:02.685Z",
    "synthesisBatch": "L38",
    "requestHash": "5451b4cea3e920f9aa007be12efb850987a7a6376108afb4dff422c3b91341ac",
    "audioSha256": "2b60ca8568781b005ebde0b473d507ce3fd58a47ca59ace4c224c0b5fcec4881",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-26",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "publicationMaterials": {
      "illustration": "./assets/images/s116-publicacio-v1.webp",
      "illustrationSha256": "99f938249fd787bcdb7dd0c6de18af4170a35cd98971d9e83d6918f59445cb44",
      "transcript": "speech-only",
      "checkedAt": "2026-11-26",
      "audioChanged": false
    }
  },
  "ca-S119": {
    "state": "published",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "7eedb606d7b68b5e7ece9d780775dd9be91284cc03cda910cd69d05d8747fc85",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 25/11: S127, S119, S121, S117, S115, S112 i S113 validats per publicació definitiva.",
    "scriptApprovalSource": "Docent 25/11: S119 també puja a síntesi de veus.",
    "reason": "Guió i escaleta validats. Pendent de completar i congelar un lot compatible de sis a vuit minuts; cap síntesi nova enviada.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S119-T01"
      ],
      "total": 1,
      "batches": [
        "L38"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "31616a5b1381188dcb4eb5889e408ff072b99d44238ef51db3c8a892dfc67eaf",
      "sourceBatch": "L38",
      "confirmation": "Docent 25/11: S119, S117, S115, S113, S112, S121 i S127 validats per pujar a muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T20:03:33.548Z",
    "voicePreview": "./proves/veus-rebudes.html#S119",
    "voicePreviewFile": "./assets/audio/s119-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T21:08:05.539Z",
    "synthesisBatch": "L38",
    "requestHash": "5451b4cea3e920f9aa007be12efb850987a7a6376108afb4dff422c3b91341ac",
    "audioSha256": "cf1711ea26a0773ba61cca3fd63a1ea88b338542c14a18218aed7fab7ec42f60",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "publicationMaterials": {
      "illustration": "./assets/images/s119-publicacio-v1.webp",
      "illustrationSha256": "cb33b82b89860f6a095e60a75b88e3d1777831988cbc96e1bd26db5c73d0b072",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S123": {
    "state": "published",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "bfae01665d46cab690972e1bfb8e095d98f6f98c9ed789d05105e031ad562de7",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 26/11: S124, S126, S120, S114, S123, S116 i S125 validats per publicació definitiva.",
    "scriptApprovalSource": "Docent 25/11: S123 també puja a síntesi.",
    "reason": "Guió i escaleta validats. Pendent de completar i congelar un lot compatible de sis a vuit minuts; cap síntesi nova enviada.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S123-T01"
      ],
      "total": 1,
      "batches": [
        "L40"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "e84e858a2da483c7d06ee99464fe96ad17483d71632022c4bd7a56d91dab5cfc",
      "sourceBatch": "L40",
      "confirmation": "Docent 25/11: S123, S114, S125, S120, S126, S116, S113 i S124 validats per passar a muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T20:26:15.166Z",
    "voicePreview": "./proves/veus-rebudes.html#S123",
    "voicePreviewFile": "./assets/audio/s123-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T21:24:54.780Z",
    "synthesisBatch": "L40",
    "requestHash": "5808ddd12485a1772a021a21db2f16fa5be9cd4a42ed90c894aaf948ed7a38be",
    "audioSha256": "22234b223a78ba93e15e3bf97d127eef8b33c8db0f73196f508b9543d360c98d",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-26",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "publicationMaterials": {
      "illustration": "./assets/images/s123-publicacio-v1.webp",
      "illustrationSha256": "7d13cefcfbe31c9d1928c1291c11049b1a7b0b465263c0129c5516b089dee395",
      "transcript": "speech-only",
      "checkedAt": "2026-11-26",
      "audioChanged": false
    }
  },
  "ca-S125": {
    "state": "published",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "256ef3ea2ab5cfdf42130be7fe36f5493cd3ab27c779576a970d8922533398e1",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 26/11: S124, S126, S120, S114, S123, S116 i S125 validats per publicació definitiva.",
    "scriptApprovalSource": "Docent 25/11: S125 queda validat amb «Per tocar» i «Gastades» com a rètols literals. Ajust aplicat i revalidat independentment.",
    "reason": "Guió i escaleta validats. Pendent de completar i congelar un lot compatible de sis a vuit minuts; cap síntesi nova enviada.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S125-T01"
      ],
      "total": 1,
      "batches": [
        "L39"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "7fe0c7ad2de954ab1f3585afd78e6246bb28c12af21979debafd6e6e2c6de962",
      "sourceBatch": "L39",
      "confirmation": "Docent 25/11: S123, S114, S125, S120, S126, S116, S113 i S124 validats per passar a muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T20:20:56.138Z",
    "voicePreview": "./proves/veus-rebudes.html#S125",
    "voicePreviewFile": "./assets/audio/s125-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T21:25:09.453Z",
    "synthesisBatch": "L39",
    "requestHash": "507a423d7bc8bf6247c3ff6b5ca198711696b71edabb32edb9158ce33eb4eb40",
    "audioSha256": "dd79d7b2a52345be57cbc305baf7eebe065f1f19ab52c47834c41f94a249675e",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-26",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "publicationMaterials": {
      "illustration": "./assets/images/s125-publicacio-v1.webp",
      "illustrationSha256": "125c80de8c750deeec7cd3c7f632a638ae2e50cc9ed3a447e0867a22c776ba33",
      "transcript": "speech-only",
      "checkedAt": "2026-11-26",
      "audioChanged": false
    }
  },
  "ca-S127": {
    "state": "published",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "fe0f5bc96e5e5ba77d3fe597a80bc28fd193d25733f78be547b1735e1054c8d4",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 25/11: S127, S119, S121, S117, S115, S112 i S113 validats per publicació definitiva.",
    "scriptApprovalSource": "Docent 25/11: S116 i S127 també pugen a síntesi de veus.",
    "reason": "Guió i escaleta validats. Pendent de completar i congelar un lot compatible de sis a vuit minuts; cap síntesi nova enviada.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S127-T01"
      ],
      "total": 1,
      "batches": [
        "L39"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "b31d7719b5aa4b6b3eb6b6c7496c23117c80db4630609852e1827beb2e706e8e",
      "sourceBatch": "L39",
      "confirmation": "Docent 25/11: S119, S117, S115, S113, S112, S121 i S127 validats per pujar a muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T20:20:56.138Z",
    "voicePreview": "./proves/veus-rebudes.html#S127",
    "voicePreviewFile": "./assets/audio/s127-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T21:08:19.190Z",
    "synthesisBatch": "L39",
    "requestHash": "507a423d7bc8bf6247c3ff6b5ca198711696b71edabb32edb9158ce33eb4eb40",
    "audioSha256": "7aae0faa9f808f99558ced65ed9b808466516548d1a93dd576a1c20613f55ab5",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "publicationMaterials": {
      "illustration": "./assets/images/s127-publicacio-v1.webp",
      "illustrationSha256": "4efabe4d171ecbcdfffbc63d29a8e9f6b47c9b73a639c04cd08540f0db08b6c0",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S115": {
    "state": "published",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "8ade4c7777af978abf57f0db1313dd9b467f75b346cab99aac1744b6769385e5",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 25/11: S127, S119, S121, S117, S115, S112 i S113 validats per publicació definitiva.",
    "scriptApprovalSource": "Docent 25/11: S115, S120 i S116 validats per síntesi.",
    "reason": "Guió i escaleta validats. Pendent de completar i congelar un lot compatible de sis a vuit minuts; cap síntesi nova enviada.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S115-T01"
      ],
      "total": 1,
      "batches": [
        "L38"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "ca1db70a2029336d8400350e38b8b6e5bd99e747e4e6460cdeab3c857ac5496b",
      "sourceBatch": "L38",
      "confirmation": "Docent 25/11: S119, S117, S115, S113, S112, S121 i S127 validats per pujar a muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T20:03:33.548Z",
    "voicePreview": "./proves/veus-rebudes.html#S115",
    "voicePreviewFile": "./assets/audio/s115-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T21:07:49.527Z",
    "synthesisBatch": "L38",
    "requestHash": "5451b4cea3e920f9aa007be12efb850987a7a6376108afb4dff422c3b91341ac",
    "audioSha256": "9d0d24ca945029a451ba0bdbf416b7f45772de44d62a31e6aec28f82035744e5",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "publicationMaterials": {
      "illustration": "./assets/images/s115-publicacio-v1.webp",
      "illustrationSha256": "fcd98c79be1b3401c679291310bd90cea20769485f7a6a988db0db7395c96d07",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S120": {
    "state": "published",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "b25a327a945cd73978fe4a2273c8951d9e425f34e5581dda04a5158ec67faf93",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 26/11: S124, S126, S120, S114, S123, S116 i S125 validats per publicació definitiva.",
    "scriptApprovalSource": "Docent 25/11: S115, S120 i S116 validats per síntesi.",
    "reason": "Guió i escaleta validats. Pendent de completar i congelar un lot compatible de sis a vuit minuts; cap síntesi nova enviada.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S120-T01"
      ],
      "total": 1,
      "batches": [
        "L40"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "999f95f62822bfcc86cff4ea43abcffe45ba93bbbb760713a72e1cd547df0517",
      "sourceBatch": "L40",
      "confirmation": "Docent 25/11: S123, S114, S125, S120, S126, S116, S113 i S124 validats per passar a muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T20:26:15.166Z",
    "voicePreview": "./proves/veus-rebudes.html#S120",
    "voicePreviewFile": "./assets/audio/s120-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T21:24:47.961Z",
    "synthesisBatch": "L40",
    "requestHash": "5808ddd12485a1772a021a21db2f16fa5be9cd4a42ed90c894aaf948ed7a38be",
    "audioSha256": "b92e1bfd09c4047a898b19d609037bc69cdb139ac4fc0cf7decf65d919f1e1c7",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-26",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "publicationMaterials": {
      "illustration": "./assets/images/s120-publicacio-v1.webp",
      "illustrationSha256": "429a33304cd014e7f159fc7d11cfb5040b5acb3adb47a348f4b51a79e40d43fb",
      "transcript": "speech-only",
      "checkedAt": "2026-11-26",
      "audioChanged": false
    }
  },
  "ca-S112": {
    "state": "published",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "39e9b91eca5e1d05efec61f7f9db9d803a74f554392121e0e41e1b71649a13fb",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 25/11: S127, S119, S121, S117, S115, S112 i S113 validats per publicació definitiva.",
    "scriptApprovalSource": "Docent 25/11: S112 també validat per síntesi.",
    "reason": "Guió i escaleta validats. Pendent de completar i congelar un lot compatible de sis a vuit minuts; cap síntesi nova enviada.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S112-T01"
      ],
      "total": 1,
      "batches": [
        "L38"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "6940a44b44c6feb47f12a63475119e77d6d77b44545b1cafa5b022f3d7d5925e",
      "sourceBatch": "L38",
      "confirmation": "Docent 25/11: S119, S117, S115, S113, S112, S121 i S127 validats per pujar a muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T20:03:33.548Z",
    "voicePreview": "./proves/veus-rebudes.html#S112",
    "voicePreviewFile": "./assets/audio/s112-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T21:07:32.993Z",
    "synthesisBatch": "L38",
    "requestHash": "5451b4cea3e920f9aa007be12efb850987a7a6376108afb4dff422c3b91341ac",
    "audioSha256": "9c5582e2e4eed2700a737ca5ff8a1ead13787ae89e9f88eb743b19296fbf136b",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "publicationMaterials": {
      "illustration": "./assets/images/s112-publicacio-v1.webp",
      "illustrationSha256": "3aab70a0e2b91f3e9f727e597e8c58c4846e5f43eca39e92e40019c6b88fc8eb",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S117": {
    "state": "published",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "686877f937d10afedf5639446fd588baac8e02eb2ecefc40e5c99bb2d6e13488",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 25/11: S127, S119, S121, S117, S115, S112 i S113 validats per publicació definitiva.",
    "scriptApprovalSource": "Docent 25/11: S117 validat, i S118 també, per a síntesi.",
    "reason": "Guió i escaleta validats. Pendent de congelar un lot compatible de sis a vuit minuts; cap síntesi nova enviada.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S117-T01"
      ],
      "total": 1,
      "batches": [
        "L38"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "1780b867858cad0e340e407b62ce91dad1a5bb7f7a9226cfecfc04e90565b481",
      "sourceBatch": "L38",
      "confirmation": "Docent 25/11: S119, S117, S115, S113, S112, S121 i S127 validats per pujar a muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T20:03:33.548Z",
    "voicePreview": "./proves/veus-rebudes.html#S117",
    "voicePreviewFile": "./assets/audio/s117-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T21:07:57.657Z",
    "synthesisBatch": "L38",
    "requestHash": "5451b4cea3e920f9aa007be12efb850987a7a6376108afb4dff422c3b91341ac",
    "audioSha256": "0a0ff273a3c12aeff73e7d0b4d89f7b0e7b61d86439630e4aad9219a829f0a21",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "publicationMaterials": {
      "illustration": "./assets/images/s117-publicacio-v1.webp",
      "illustrationSha256": "2f74697881d54e4224950cacfd58b3b82b5c522a119845d9df6547fb26b9fda1",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S118": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "0152946eacecfdbc430710e8fa8c09da340594e366be305b20294674f332224f",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "Docent 25/11: S117 validat, i S118 també, per a síntesi.",
    "scriptApprovalSource": "Docent 25/11: S117 validat, i S118 també, per a síntesi.",
    "reason": "Guió i escaleta validats. Pendent de congelar un lot compatible de sis a vuit minuts; cap síntesi nova enviada.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S118-T01"
      ],
      "total": 1,
      "batches": [
        "L38"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-26",
      "sourceTakeSha256": "267a0d244a52dc094d9e6b053b89092d7dad5ec039e7f60e697bc9fcbdcb6e83",
      "sourceBatch": "L38",
      "confirmation": "Docent 26/11: S118 validat per muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T20:03:33.548Z",
    "voicePreview": "./proves/veus-rebudes.html#S118",
    "voicePreviewFile": "./assets/audio/s118-voices-review-v1.mp3",
    "mountedAt": "2026-11-26T07:14:32.789Z",
    "synthesisBatch": "L38",
    "requestHash": "5451b4cea3e920f9aa007be12efb850987a7a6376108afb4dff422c3b91341ac",
    "audioSha256": "a14f3642ad76c6ffcac4600053a4a4c71aca853a835a2bd4c902b1935093db69",
    "montageNewSynthesisRequests": 0,
    "teacherAssessment": "Veus validades; muntatge de noticiari amb base contínua comuna pendent d’audició docent."
  },
  "ca-S121": {
    "state": "published",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "cfe3583abdc32128eb9d4d9e02e58de6d6aa3d7f5dbf23e152771867a38e8a3d",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 25/11: S127, S119, S121, S117, S115, S112 i S113 validats per publicació definitiva.",
    "scriptApprovalSource": "Docent 25/11: tots els guions validats; preparar i enviar els lots compatibles seqüencialment.",
    "reason": "Guió i escaleta validats; pendent d’un lot compatible de sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S121-T01"
      ],
      "total": 1,
      "batches": [
        "L40"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "42323a8975d4497fdbac89075c0f4c46fc4ea128fb3e59a6035414f48858b789",
      "sourceBatch": "L40",
      "confirmation": "Docent 25/11: S119, S117, S115, S113, S112, S121 i S127 validats per pujar a muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T20:26:15.166Z",
    "voicePreview": "./proves/veus-rebudes.html#S121",
    "voicePreviewFile": "./assets/audio/s121-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T21:08:11.074Z",
    "synthesisBatch": "L40",
    "requestHash": "5808ddd12485a1772a021a21db2f16fa5be9cd4a42ed90c894aaf948ed7a38be",
    "audioSha256": "bc77e862e73ef1fcadc1ba2b9e036642498cbf5f64f246bf830edd3a9e3dc91d",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-25",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "publicationMaterials": {
      "illustration": "./assets/images/s121-publicacio-v1.webp",
      "illustrationSha256": "38c1dc50c11dfe47bc510f556883286f05a3f18115aa0c2cf07f35d4744eb721",
      "transcript": "speech-only",
      "checkedAt": "2026-11-25",
      "audioChanged": false
    }
  },
  "ca-S122": {
    "state": "voices-received",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "87985c1ebba5cf32cb53707c0bdfa300804684982d64458006185eb243e0012d",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "Docent 25/11: tots els guions validats; preparar i enviar els lots compatibles seqüencialment.",
    "scriptApprovalSource": "Docent 25/11: tots els guions validats; preparar i enviar els lots compatibles seqüencialment.",
    "reason": "Nova presa completa pendent d’un lot compatible Mireia/Aoede + Laia/Leda de sis a vuit minuts. Cap muntatge amb la presa rebutjada.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S122-T02"
      ],
      "total": 1,
      "batches": [
        "L42"
      ]
    },
    "voiceApproval": false,
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-26T07:48:53.961Z",
    "voicePreview": "./proves/veus-rebudes.html#S122",
    "voicePreviewFile": "./assets/audio/s122-voices-review-v2.mp3",
    "feedbackAt": "2026-11-25",
    "teacherAssessment": "Regenerar el diàleg complet: Mireia passa a una veu masculina al torn de la bossa i es perd l’inici d’ampolla en dos torns.",
    "feedback": [
      {
        "part": "bossa",
        "word": "Veu de Mireia",
        "heard": "Una altra veu masculina",
        "status": "pending"
      },
      {
        "part": "freda",
        "word": "ampolla (Mireia)",
        "heard": "La bolla",
        "status": "pending"
      },
      {
        "part": "comparar",
        "word": "ampolla (Laia)",
        "heard": "una bolla",
        "status": "pending"
      }
    ],
    "plannedRepair": {
      "scope": "whole-recording",
      "part": "whole",
      "takeId": "S122-T02",
      "status": "received-awaiting-listening",
      "sourceTakeId": "S122-T01",
      "sourceTakeSha256": "305bd2b4519c45ea7a36988f194240774eb7b6f5535350ad2257a3e80ae018fe",
      "parts": [
        "introduction",
        "ampolles",
        "bossa",
        "endoll",
        "freda",
        "obrir",
        "tancar",
        "comparar",
        "igual",
        "final"
      ],
      "planFile": "content/full-voice-retakes.json",
      "approvedRequestHash": "12daae52bce00c68bd63eccb91c1f75cf1d189a893d6dbe80c9f5f80250ce45c"
    },
    "fullRetakeReceived": {
      "takeId": "S122-T02",
      "approvedAt": "2026-11-25",
      "approvalSource": "Docent: refer S122 pràcticament sencera per una veu masculina en lloc de Mireia i dues omissions a ampolla. Guió i repartiment canònics conservats.",
      "approvedRequestHash": "12daae52bce00c68bd63eccb91c1f75cf1d189a893d6dbe80c9f5f80250ce45c",
      "sourceTakeId": "S122-T01",
      "sourceTakeSha256": "305bd2b4519c45ea7a36988f194240774eb7b6f5535350ad2257a3e80ae018fe",
      "sourceRequestHash": "5808ddd12485a1772a021a21db2f16fa5be9cd4a42ed90c894aaf948ed7a38be",
      "sourceRawSha256": "580030ad367459bf30851f7d6d2f2126b2a58bd88b03e9dc2cf92e2796491a98",
      "sourceEditorialFingerprint": "87985c1ebba5cf32cb53707c0bdfa300804684982d64458006185eb243e0012d",
      "preservesOriginals": true,
      "montageAllowed": false,
      "voiceApproval": false
    }
  },
  "ca-S124": {
    "state": "published",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "e6199a2c2f7fc348c323526e2666691c0efbdf26f990c433ed8d3b2bf2ebc307",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 26/11: S124, S126, S120, S114, S123, S116 i S125 validats per publicació definitiva.",
    "scriptApprovalSource": "Docent 25/11: tots els guions validats; preparar i enviar els lots compatibles seqüencialment.",
    "reason": "Guió i escaleta validats; pendent d’un lot compatible de sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S124-T01"
      ],
      "total": 1,
      "batches": [
        "L39"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "d30ec9a0a41ae23e713ae99dfdab74cd28c65df946fbab29d0923030f763a327",
      "sourceBatch": "L39",
      "confirmation": "Docent 25/11: S123, S114, S125, S120, S126, S116, S113 i S124 validats per passar a muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T20:20:56.138Z",
    "voicePreview": "./proves/veus-rebudes.html#S124",
    "voicePreviewFile": "./assets/audio/s124-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T21:25:01.830Z",
    "synthesisBatch": "L39",
    "requestHash": "507a423d7bc8bf6247c3ff6b5ca198711696b71edabb32edb9158ce33eb4eb40",
    "audioSha256": "10947b2e8b284cb84ebd4386239d32b8026c499d0cc6eb9443d578f62e2675ed",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-26",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "publicationMaterials": {
      "illustration": "./assets/images/s124-publicacio-v2.webp",
      "illustrationSha256": "78471751b8501324f71b8b9cef68ce4acd12629a36e1baa145be029f691f6d4d",
      "transcript": "speech-only",
      "checkedAt": "2026-11-26",
      "audioChanged": false,
      "illustrationRevision": {
        "at": "2026-11-26",
        "scope": "illustration-only",
        "reason": "Peticio docent: corregir la forma i l’escala dels estoigs perquè es reconeguin com a estoigs de guitarra.",
        "previous": {
          "file": "./assets/images/s124-publicacio-v1.webp",
          "sha256": "f3faebc6a9b895a1689519d9fdce1b7f0b0e507ec16888becaa11bebbcc61084",
          "editorialFingerprint": "f28bb613c47a4ead2c7dbfce472c308a7e65ddd43764135e99d723f0ca724134"
        },
        "review": "docs/s124-illustration-v2.review.json",
        "editorialFingerprint": "e6199a2c2f7fc348c323526e2666691c0efbdf26f990c433ed8d3b2bf2ebc307",
        "audioChanged": false
      }
    }
  },
  "ca-S126": {
    "state": "published",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "290981379b8808df05188bc000c074f7fd868c9bb10d5b73ffa5b8f6aa360311",
    "plannedNewRequests": 0,
    "listeningApproval": true,
    "confirmation": "Docent 26/11: S124, S126, S120, S114, S123, S116 i S125 validats per publicació definitiva.",
    "scriptApprovalSource": "Docent 25/11: tots els guions validats; preparar i enviar els lots compatibles seqüencialment.",
    "reason": "Guió i escaleta validats; pendent d’un lot compatible de sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S126-T01"
      ],
      "total": 1,
      "batches": [
        "L39"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-25",
      "sourceTakeSha256": "3651654d3aa77dec46d1c331fd266979f4fc51bc51adfa28a014f0cf298aa683",
      "sourceBatch": "L39",
      "confirmation": "Docent 25/11: S123, S114, S125, S120, S126, S116, S113 i S124 validats per passar a muntatge."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-25T20:20:56.138Z",
    "voicePreview": "./proves/veus-rebudes.html#S126",
    "voicePreviewFile": "./assets/audio/s126-voices-review-v1.mp3",
    "mountedAt": "2026-11-25T21:25:17.711Z",
    "synthesisBatch": "L39",
    "requestHash": "507a423d7bc8bf6247c3ff6b5ca198711696b71edabb32edb9158ce33eb4eb40",
    "audioSha256": "8986ca354b2f91dbf775d1db3e5855c5e4114fa57324a6f7078a06cb9c4006e8",
    "montageNewSynthesisRequests": 0,
    "validatedAt": "2026-11-26",
    "validatedBy": "docent",
    "teacherAssessment": "Veus i muntatge validats definitivament pel docent. Màster aprovat conservat intacte.",
    "publicationMaterials": {
      "illustration": "./assets/images/s126-publicacio-v1.webp",
      "illustrationSha256": "5482f91e07a5e736efb6b048a7ad33cc58ce1e14f9714ea8a43612f33dd66bbc",
      "transcript": "speech-only",
      "checkedAt": "2026-11-26",
      "audioChanged": false
    }
  },
  "ca-S128": {
    "state": "voices-received",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "99615c0422a803e949373b3c19c0aaa8f9eba44110ee6355cf73b4ad6a1add3a",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "Docent 25/11: tots els guions validats; preparar i enviar els lots compatibles seqüencialment.",
    "scriptApprovalSource": "Docent 25/11: tots els guions validats; preparar i enviar els lots compatibles seqüencialment.",
    "reason": "Guió i escaleta validats; pendent d’un lot compatible de sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S128-T01"
      ],
      "total": 1,
      "batches": [
        "L41"
      ]
    },
    "voiceApproval": false,
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-26T07:48:14.206Z",
    "voicePreview": "./proves/veus-rebudes.html#S128",
    "voicePreviewFile": "./assets/audio/s128-voices-review-v2.mp3"
  },
  "ca-S129": {
    "state": "voices-received",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "7d58aeacae24b658ddc6f46929c09da13c598f19a51447b99ced666d914bedef",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "Docent 25/11: tots els guions validats; preparar i enviar els lots compatibles seqüencialment.",
    "scriptApprovalSource": "Docent 25/11: tots els guions validats; preparar i enviar els lots compatibles seqüencialment.",
    "reason": "Guió i escaleta validats; pendent d’un lot compatible de sis a vuit minuts.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S129-T01"
      ],
      "total": 1,
      "batches": [
        "L41"
      ]
    },
    "voiceApproval": false,
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-26T07:48:14.206Z",
    "voicePreview": "./proves/veus-rebudes.html#S129",
    "voicePreviewFile": "./assets/audio/s129-voices-review-v2.mp3"
  },
  "ca-S130": {
    "state": "voices-received",
    "approvedAt": "2026-11-25",
    "scriptApprovedAt": "2026-11-25",
    "editorialFingerprint": "937eeb6988810383653f82c41d8cb02f9b33361a2a4087ff51003e4ce42af6a3",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "Docent 25/11: tots els guions validats; preparar i enviar els lots compatibles seqüencialment.",
    "scriptApprovalSource": "Docent 25/11: tots els guions validats; preparar i enviar els lots compatibles seqüencialment.",
    "reason": "Veus validades. Muntatge aturat fins a la tria docent de música de fons per a mites.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S130-T01"
      ],
      "total": 1,
      "batches": [
        "L41"
      ]
    },
    "voiceApproval": {
      "status": "approved",
      "approvedAt": "2026-11-26",
      "sourceTakeSha256": "de7def44287bd5ae73ee7d493c900bd0e86b2e735ec0d78148a8266790a12fc4",
      "sourceBatch": "L41",
      "confirmation": "Docent 26/11: S130 llest per muntatge. Abans de muntar, comparar i triar músiques de biblioteca per a faules, llegendes i mites."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-26T07:48:14.206Z",
    "voicePreview": "./proves/veus-rebudes.html#S130",
    "voicePreviewFile": "./assets/audio/s130-voices-review-v2.mp3",
    "montageHold": {
      "reason": "awaiting-music-selection",
      "since": "2026-11-26",
      "summary": {
        "ca": "Veus validades. Abans de muntar S130, cal triar la música de fons. Les propostes són a «Músiques de narració», al peu d’aquest panell.",
        "es": "Voces validadas. Antes de montar S130, hay que elegir la música de fondo. Las propuestas están en «Músicas de narración», al pie de este panel."
      },
      "comparison": "https://sentit.ortogra.fi/?musiques=mites-antiguitat",
      "candidateIds": [
        "M1",
        "M2",
        "M3"
      ]
    }
  }
};
