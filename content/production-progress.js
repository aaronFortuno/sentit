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
        "heard": "La represa té la veu de Laia; correspon a Biel/Puck",
        "status": "pending"
      }
    ],
    "teacherAssessment": "Després validat, pendent d’incorporar. Des de la plaça rebutjat per veu equivocada: refer només amb Biel/Puck. No tornar a validar la primera frase.",
    "plannedNewRequests": 1,
    "repairPlan": "content/audio-repairs.json",
    "listeningApproval": false,
    "repairComparison": "./proves/correccions-l02.html#S010-alternativa",
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
        "approvedAt": "2026-11-22",
        "confirmation": "El Després ja som a la porta és correcte."
      },
      {
        "code": "S010",
        "part": "alternativa",
        "text": "Des de la plaça anem pel carrer dels Til·lers fins a la farmàcia.",
        "pronunciation": "Til·lers has two consecutive lateral L sounds (l·l), a gently lengthened L, never the palatal LL of lluna. Keep the stressed open E and fluent natural Central Catalan. Do not read the middle dot or say the explanation.",
        "status": "rejected-wrong-voice",
        "originalFile": "assets/audio/repairs/l02-s010-alternativa-original.mp3",
        "candidateFile": "assets/audio/repairs/l02-s010-alternativa-prova.mp3",
        "sourceRawSha256": "5ae1ca4fd12bac21243b7e519981c14bdb2e34319cc06bdc1fbc318f91833fe4",
        "batchRequestHash": "ef2b891a48e5c2823d4527ce9a4c0fc93ae1951ecaad5c7ce07a30ac584a1a66",
        "applied": false,
        "reviewedAt": "2026-11-22",
        "rejection": "El docent identifica la veu de Laia en una frase de Biel. Cal repetir amb Biel/Puck."
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
      "reason": "La represa rebuda és de Laia; el docent demana repetir amb Biel/Puck. Després ja està validat.",
      "confirmedAt": "2026-11-22",
      "newRequests": 0
    }
  },
  "ca-S013": {
    "state": "montage-awaiting-listening",
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
    "teacherAssessment": "Valoració positiva; bústia pendent de corregir. Sintonia rebutjada, retirada; alternativa pendent.",
    "plannedNewRequests": 0,
    "repairPlan": "content/audio-repairs.json",
    "listeningApproval": false,
    "repairComparison": "./proves/correccions-l01.html#S013-error",
    "receivedRepairs": [
      {
        "code": "S013",
        "part": "repartiment",
        "text": "El codi postal ajuda a arribar a una zona, però no diu tot sol quina bústia concreta és la bona.",
        "pronunciation": "Bústia is stressed on the first vowel Ú: BÚS-ti-a, never bus-TÍ-a. This spelling aid is an instruction, not spoken text. Read the sentence fluently and naturally.",
        "status": "applied-awaiting-montage-listening",
        "originalFile": "assets/audio/repairs/l01-s013-repartiment-original.mp3",
        "candidateFile": "assets/audio/repairs/l01-s013-repartiment-prova.mp3",
        "sourceRawSha256": "37fe6368197b31f9d3d6a8bafedc0c858426c23bd2dd4f6ef6f1278d7cbfb473",
        "batchRequestHash": "0cd61066dabfeb8992968fa3e45c9f95dd07621aa58ca5a919a5e873cee48df7",
        "applied": true,
        "approvedAt": "2026-11-23",
        "confirmation": "S013 esmenes validades pel docent per incorporar-les i passar a muntatge.",
        "candidateSha256": "d530ead23bbf0ef891b0b068ba1dedf0a3988da35faba9d5e5458853b5cd269b",
        "appliedAt": "2026-11-23",
        "appliedAudio": "./assets/audio/s013-repair-v3.mp3"
      },
      {
        "code": "S013",
        "part": "error",
        "text": "No és correcte endevinar una bústia només perquè el nom ens sona.",
        "pronunciation": "Bústia is stressed on Ú in the first syllable, never on I. Respect the written accent without exaggerated pauses or spelling aloud.",
        "status": "applied-awaiting-montage-listening",
        "originalFile": "assets/audio/repairs/l01-s013-error-original.mp3",
        "candidateFile": "assets/audio/repairs/l01-s013-error-prova.mp3",
        "sourceRawSha256": "37fe6368197b31f9d3d6a8bafedc0c858426c23bd2dd4f6ef6f1278d7cbfb473",
        "batchRequestHash": "0cd61066dabfeb8992968fa3e45c9f95dd07621aa58ca5a919a5e873cee48df7",
        "applied": true,
        "approvedAt": "2026-11-23",
        "confirmation": "S013 esmenes validades pel docent per incorporar-les i passar a muntatge.",
        "candidateSha256": "b1366113dcca0020c72aece80ee0e122007a833168a5c8336a58644c45f4c21b",
        "appliedAt": "2026-11-23",
        "appliedAudio": "./assets/audio/s013-repair-v3.mp3"
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
    "reviewUpdate": {
      "audio": "./assets/audio/s013-repair-v3.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Dues frases amb «bústia» substituïdes per les represes validades. Presentació i dos efectes breus del muntatge anterior conservats, sense recuperar la sintonia rebutjada. Pendent d’audició del muntatge.",
        "es": "Correcciones de voz validadas e incorporadas al montaje completo. Pendiente de escucha final."
      }
    },
    "editorialFingerprint": "ced07fdae0cf82ca60322c39549552371917bce95f1b78682d5cb491a585bdc2"
  },
  "ca-S022": {
    "state": "audio-corrections-pending",
    "feedbackAt": "2026-11-22",
    "feedback": [
      {
        "part": "dema",
        "word": "rails",
        "heard": "ráils/ralls",
        "status": "pending"
      }
    ],
    "teacherAssessment": "Represa de rails rebutjada. Preparar dues proves amb grafies auxiliars raíls i raïls només al TTS; si cap funciona, el docent proposa substituir-ho per les vies. Text editorial encara intacte.",
    "plannedNewRequests": 1,
    "repairPlan": "content/audio-repairs.json",
    "listeningApproval": false,
    "repairComparison": "./proves/correccions-l13.html#S022-dema",
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
      }
    ],
    "plannedRepair": {
      "status": "awaiting-compatible-batch",
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
      "canonicalTextChanged": false
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
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-20T21:20:16.430Z",
    "editorialFingerprint": "ae55a38bbe904e3145161e030fdea4d671bc90235a79b0e0369b4e2b61aad5aa",
    "plannedNewRequests": 0,
    "confirmation": "S007 es pot pujar a síntesi de veus, guió validat.",
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
    "listeningApproval": false,
    "synthesisBatch": "L10+L02",
    "requestHash": "ef97c7456001de385258549f2a355d83acf7942502caa3b39f364da8be1b417f",
    "audioSha256": "4828e5d35d73dec71a4ceb7dbec15047590c2c7dc377cb2fea485624ac434440",
    "montageNewSynthesisRequests": 0,
    "feedbackAt": "2026-11-23",
    "reviewUpdate": {
      "audio": "./assets/audio/s007-repair-v3.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Torn «Llavors podem tenir aigua al voltant sense veure-la?» substituït per Biel. Resta de les veus i pauses netejades conservades; ambient real continu d’aula, sense cadira, paper ni tons finals. Pendent d’audició del muntatge.",
        "es": "Correcciones de voz validadas e incorporadas al montaje completo. Pendiente de escucha final."
      }
    },
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
      "status": "applied-awaiting-montage-listening",
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
        "status": "applied-awaiting-montage-listening",
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
        "appliedAudio": "./assets/audio/s007-repair-v3.mp3"
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
    }
  },
  "ca-S024": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-20T21:21:39.843Z",
    "editorialFingerprint": "8ad4c1ba4b7b959e4a5c1949356d033c1b5a069e83b71fcdaccae8ba0c2193e7",
    "plannedNewRequests": 0,
    "confirmation": "S024 pot pujar a síntesi de veu, guió validat.",
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
    "listeningApproval": false,
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
      "status": "applied-awaiting-montage-listening",
      "voice": "Puck",
      "batch": "L27"
    },
    "reviewUpdate": {
      "audio": "./assets/audio/s024-timbre-trial-v3.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Prova de timbre: últim torn de Biel substituït per la segona versió, més greu. Decisió sobre el timbre pendent d’escoltar-lo dins la conversa; ambient continu d’aula i presentació conservats. Pendent d’audició del muntatge.",
        "es": "Prueba con la segunda voz de Biel integrada en la conversación; decisión sobre el timbre pendiente."
      }
    },
    "repairComparison": "./proves/correccions-l27.html#S024-dubtes",
    "receivedRepairs": [
      {
        "code": "S024",
        "part": "dubtes",
        "text": "I el pas fins a la font! Això ho podem preguntar a la mestra. Després portem el full als altres cursos?",
        "pronunciation": "Keep the same natural youthful male Biel/Puck voice throughout. No exaggerated high pitch on I el pas fins a la font. Keep the whole turn conversational, warm and clear.",
        "status": "trial-applied-awaiting-timbre-decision",
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
        "appliedAudio": "./assets/audio/s024-timbre-trial-v3.mp3"
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
      "status": "pending-listening",
      "trialAudio": "./assets/audio/s024-timbre-trial-v3.mp3",
      "previousAudio": "./assets/audio/s024-classroom-v2.mp3",
      "note": "La segona versió és més greu; el docent vol decidir després d’escoltar-la en context."
    }
  },
  "ca-S017": {
    "state": "audio-corrections-pending",
    "approvedAt": "2026-11-20T21:35:19.657Z",
    "editorialFingerprint": "fe3ce6ee3d53da22272f4bf6e1dc47ea654ab5a57a6f87bcd3b768caa9e7fa46",
    "plannedNewRequests": 2,
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
    "teacherAssessment": "Resta de veus i balanç d’aula ben valorats. Retirat el tram de respiracions; dos últims paràgrafs de Mireia pendents de síntesi conjunta per canvi de timbre i crepitar.",
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
        "status": "pending",
        "kind": "voice-identity-and-quality",
        "heard": "Canvi de veu, menys qualitat i crepitar al final."
      }
    ],
    "plannedRepair": {
      "status": "awaiting-compatible-batch",
      "speaker": "Mireia",
      "voice": "Aoede",
      "parts": [
        "coordinacio",
        "retorn"
      ],
      "text": "Exacte. L’equip de coordinació confirmarà la sortida de tot el conjunt. Ningú no s’avançarà amb cap caixa.\n\nA cada parada anotaran si falta alguna peça o està malmesa. El registre viatjarà amb les caixes perquè a la parada següent ja coneguin les incidències. Vinga, comencem a escriure i, quan acabeu, Laia, ja podreu pintar, d’acord?",
      "direction": "Record these two consecutive paragraphs as one continuous take, in the same warm adult teacher Mireia/Aoede identity throughout. Natural Central Catalan; clear dry voice, no added breaths, crackling or voice changes. Read only the canonical text.",
      "confirmedAt": "2026-11-22",
      "newRequests": 0
    },
    "reviewUpdate": {
      "audio": "./assets/audio/s017-breaths-v2.mp3",
      "at": "2026-11-22",
      "summary": {
        "ca": "Retirat el tram de respiracions entre 2:28 i 2:41; fons d’aula conservat. Els dos últims paràgrafs de la Mireia encara esperen una nova presa conjunta.",
        "es": "Retirado el tramo de respiraciones entre 2:28 y 2:41; fondo de aula conservado. Los dos últimos párrafos de Mireia aún esperan una nueva toma conjunta."
      }
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
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-21T08:12:38.478Z",
    "editorialFingerprint": "a665998ade8ac831d5e347768e31d932aa670f758f877dbd1e8de9e60a3cd319",
    "plannedNewRequests": 0,
    "confirmation": "Fent aquests canvis que et dic el text quedaria validat per síntesi de veus.",
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
    "listeningApproval": false,
    "voicePreview": "./proves/veus-rebudes.html#S029",
    "audioSha256": "ba14a5724776db495a87fa23a7b738ea76bf2840d3f32728279dab4bcdd533d1",
    "montageNewSynthesisRequests": 0,
    "voicePreviewFile": "./assets/audio/s029-voices-review-v2.mp3",
    "reviewUpdate": {
      "audio": "./assets/audio/s029-repair-v3.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Primer paràgraf complet incorporat, inclosa la frase «La plaça del barri acollirà divendres una sessió de cinema a l’aire lliure». Locució inicial actual conservada. Música comuna de notícies molt baixa sota la veu, sense papers ni altres efectes. Pendent d’audició del muntatge.",
        "es": "Correcciones de voz validadas e incorporadas al montaje completo. Pendiente de escucha final."
      }
    },
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
    "teacherAssessment": "Presentació completa recuperada i inici de les veus netejat. La primera frase no existeix a la presa crua. El docent demana el primer paràgraf complet al proper lot de Mar, comparar el timbre i decidir després si s’incorpora tot o només la frase.",
    "plannedRepair": {
      "status": "applied-awaiting-montage-listening",
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
        "status": "applied-awaiting-montage-listening",
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
        "appliedAudio": "./assets/audio/s029-repair-v3.mp3"
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
    "state": "audio-corrections-pending",
    "approvedAt": "2026-11-21T09:36:38.025Z",
    "editorialFingerprint": "464d5002ad52e9784973952ec6d86789ec3bc4951b006b2beabc6d7acc03aced",
    "plannedNewRequests": 1,
    "confirmation": "S025 validat per síntesi de veus",
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
    "listeningApproval": false,
    "synthesisBatch": "L08",
    "requestHash": "ac8a3b34fa098dc7a38e788b2cadc9c81d3039b44c7af229a4c9c104184e94cc",
    "audioSha256": "3815d49a588ab076c04541100c4c8825d641c858c91b3a72c222dcf06c7d851b",
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
    "teacherAssessment": "Clic i cadira retirats, pauses tècniques escurçades. El text tot sol es manté per decisió docent; prémer pendent d’esmena.",
    "feedback": [
      {
        "part": "final",
        "type": "pronunciation",
        "status": "pending",
        "note": "El docent sent premre en lloc de prémer. Cap petició nova enviada.",
        "word": "prémer"
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
    ]
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
    "state": "audio-corrections-pending",
    "approvedAt": "2026-11-21T09:53:12.333Z",
    "editorialFingerprint": "c3cfa721b7651c654920ac4e13e3dc30d83555ddcfa4fa97d7a415d37621c84b",
    "plannedNewRequests": 1,
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
    "audioSha256": "b277087c3deafb2966f82d624ee47ed02feecd68b756ea4e7ab68a28243b61e3",
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
    "teacherAssessment": "Instruccions long pause llegides al títol eliminades localment. Artefacte de «Quan hagis parlat» pendent d’esmena.",
    "feedback": [
      {
        "part": "introduction",
        "status": "applied",
        "type": "spoken-directive",
        "note": "Dues locucions long pause no demanades retallades en silencis; títol canònic conservat."
      },
      {
        "part": "finalreunio",
        "status": "pending",
        "type": "pronunciation",
        "note": "El docent sent «Quan hagues/hagas parlat» en lloc de «Quan hagis parlat». Encara no s’ha sintetitzat cap correcció.",
        "word": "hagis"
      }
    ],
    "timingComparison": "./proves/pauses-s011-s027.html#S041"
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
    "state": "ready-for-voices",
    "approvedAt": "2026-11-22T18:01:27.247Z",
    "editorialFingerprint": "f2370f29f20a57c3644fe7e9852f213e6c97158b3afc5b93e3a4fa3178acc803",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S076 validada per síntesi de veus",
    "reason": "Pendent de completar validacions del lot Laia/Leda i Ona/Sulafat i verificar sis a vuit minuts abans d’enviar.",
    "gradingReview": {
      "status": "pending-listening",
      "currentGrade": "5",
      "candidateGrade": "6",
      "note": "Confirmar la dificultat i valorar el possible pas de 5è a 6è després d’escoltar l’àudio. Ara es mantenen 5è i avançada, amb les mateixes preguntes.",
      "currentLevel": "advanced",
      "reviewDifficulty": true
    }
  },
  "ca-S074": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-22T18:08:54.593Z",
    "editorialFingerprint": "a6a24886eb9e42ad0e78c8e568172582ed50b3c2becf8531b55fb6fa670f864c",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S074 validada per síntesi de veus",
    "reason": "Pendent de completar les validacions del lot Laia/Leda i Ona/Sulafat.",
    "gradingReview": {
      "status": "pending-listening",
      "currentGrade": "5",
      "currentLevel": "middle",
      "candidateGrade": null,
      "reviewDifficulty": true,
      "note": "Confirmar curs i dificultat després d’escoltar l’àudio. Ara es mantenen 5è i intermèdia; encara no hi ha una requalificació decidida."
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
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-22T19:33:51.066Z",
    "editorialFingerprint": "bcae83ca2e51411b9e4ae67f41c886e19ce0c4029349572d9c841a4bd48c888e",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "S069 validada per síntesi de veus",
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
      "status": "applied-awaiting-montage-listening",
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
        "status": "applied-awaiting-montage-listening",
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
        "appliedAudio": "./assets/audio/s069-mixed-v1.mp3"
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
    "reviewUpdate": {
      "audio": "./assets/audio/s069-mixed-v1.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Paràgraf inicial substituït per la represa de Ferran validada, amb «Aina» i «guix». Base «Dos noms a la pissarra» compartida amb S069D, molt baixa sota la veu, amb pujada i fosa final. Pendent d’audició del muntatge.",
        "es": "Correcciones de voz validadas e incorporadas al montaje completo. Pendiente de escucha final."
      }
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
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-22T19:41:58.762Z",
    "editorialFingerprint": "db0f2ca6714e156c11f3848722e1c8558449c91a1e99560e78161ca32def07f8",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "S057 validada per síntesi de veus",
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
    "reviewUpdate": {
      "audio": "./assets/audio/s057-mixed-v1.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Primer muntatge: Identitat comuna de les notícies de la Mar: «Breaking News Background Music», amb entrada, base contínua molt atenuada sota la veu i sortida completa. Sense papers ni altres efectes afegits. Pendent d’audició.",
        "es": "Primer montaje con las voces aprobadas, fondo continuo discreto y fundidos. Pendiente de escucha."
      }
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
    "state": "audio-corrections-pending",
    "approvedAt": "2026-11-22T19:57:00.644Z",
    "editorialFingerprint": "e88eb349d6eff83efc20de15f643e8f34938f8b306f4f0523d386403ef403c88",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S061 validada per síntesi de veus",
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
    "voiceApproval": false,
    "missingVoiceParts": [
      "introduction"
    ],
    "voicesReceivedAt": "2026-11-22T20:58:09.995Z",
    "voicePreview": "./proves/veus-rebudes.html#S061",
    "voicePreviewFile": "./assets/audio/s061-voices-review-v2.mp3",
    "voiceReviewUpdate": {
      "file": "./assets/audio/s061-voices-review-v2.mp3",
      "at": "2026-11-22",
      "conversion": "removed-35-interleaved-c2pa-id3-tags",
      "summary": {
        "ca": "Veus netes validades pel docent; només falta la locució inicial del títol.",
        "es": "Voces limpias validadas por el docente; solo falta la locución inicial del título."
      },
      "reviewedAt": "2026-11-23"
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
        "status": "pending",
        "detail": "Falta «Comprensió oral. El curt que començava pel final.»; omissió ja registrada al tall de L18."
      }
    ],
    "plannedRepair": {
      "part": "introduction",
      "speaker": "Laia",
      "voice": "Leda",
      "text": "Comprensió oral. El curt que començava pel final.",
      "status": "awaiting-compatible-batch",
      "scope": "missing-title",
      "sourceTakeSha256": "f8c2abe90710bcd8f81d4437c03c30b36c5c1be4ac58f2c7a46e63e0aa60cd4b"
    },
    "teacherAssessment": "Veus del cos validades després de la neteja. Presentació inicial pendent; sense validació global ni muntatge encara."
  },
  "ca-S082": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-22T19:59:16.594Z",
    "editorialFingerprint": "211a7ed596bb89d7e04325f64db361d9dbabff727f878fc78309835db06d37ff",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "S082 validada per síntesi de veus",
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
    "teacherAssessment": "La resta de la síntesi és correcta; «funda» sona «fona» al torn del Biel. Esperar l’esmena abans de validar veus i muntar.",
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
      "status": "applied-awaiting-montage-listening",
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
        "status": "applied-awaiting-montage-listening",
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
        "appliedAudio": "./assets/audio/s082-mixed-v1.mp3"
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
    "reviewUpdate": {
      "audio": "./assets/audio/s082-mixed-v1.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Torn de Biel amb «funda» substituït per la represa validada. Ambient real continu d’estança tranquil·la, molt discret sota les veus; sense efectes puntuals afegits. Pendent d’audició del muntatge.",
        "es": "Correcciones de voz validadas e incorporadas al montaje completo. Pendiente de escucha final."
      }
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
    "state": "audio-corrections-pending",
    "approvedAt": "2026-11-22T20:16:52.042Z",
    "editorialFingerprint": "56df8abc8b9aef92135f8a89300a7c5fe779f8015e30a91c1f13aade6b97b869",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S058 validada per síntesi de veus",
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
    "voiceApproval": false,
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
        "status": "pending"
      }
    ],
    "plannedRepair": {
      "part": "avis",
      "text": "I el número el deixem al descobert. Mira, agafo dos trossets de cinta i ho provem abans d’enganxar-ho tot. Aguanta tu, que ara vull mirar-ho des de fora.",
      "speaker": "Biel",
      "sourceTakeSha256": "41b9054c90bc68390aade806e98599e2fe8038e9e5c790219c2d5ec465253b78",
      "status": "awaiting-teacher-recheck-of-clean-audio"
    }
  },
  "ca-S081": {
    "state": "audio-corrections-pending",
    "approvedAt": "2026-11-22T20:22:58.661Z",
    "editorialFingerprint": "2a784ecc42769c082794208ddcddb9a8c38dcaa50efa60baa1eee066bc814cf4",
    "plannedNewRequests": 1,
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
    "voiceApproval": false,
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T07:57:54.800Z",
    "voicePreview": "./proves/veus-rebudes.html#S081",
    "voicePreviewFile": "./assets/audio/s081-voices-review-v1.mp3",
    "feedbackAt": "2026-11-23",
    "teacherAssessment": "Resta de les veus correcta. «Funda» sona «funa» als dos últims torns d’Elies; regenerar-los complets amb Algieba i validar-los abans del muntatge.",
    "feedback": [
      {
        "part": "telefon",
        "speaker": "Elies",
        "kind": "pronunciation",
        "word": "funda",
        "heard": "funa",
        "status": "pending"
      },
      {
        "part": "final",
        "speaker": "Elies",
        "kind": "pronunciation",
        "word": "funda",
        "heard": "funa",
        "status": "pending"
      }
    ],
    "plannedRepair": {
      "parts": [
        "telefon",
        "final"
      ],
      "speaker": "Elies",
      "voice": "Algieba",
      "sourceTakeSha256": "abda1d2cdb2f1727886fb57d1c539a7df87595eeba6fae9f2d43c4885f9fa0bd",
      "status": "awaiting-compatible-batch"
    }
  },
  "ca-S079": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-22T20:27:37.701Z",
    "editorialFingerprint": "0d38222f7e2416ab65c87380f5ad46f4f3056d9debc0be18876f7479632943e7",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "S079 validada per síntesi amb comiat més natural",
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
    "reviewUpdate": {
      "audio": "./assets/audio/s079-mixed-v1.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Primer muntatge: Ambient real continu d’estança tranquil·la, molt baix sota les veus. Entrada suau i pujada breu seguida de fosa al final; sense eines, funda ni papers afegits. Pendent d’audició.",
        "es": "Primer montaje con las voces aprobadas, fondo continuo discreto y fundidos. Pendiente de escucha."
      }
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
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-23T09:49:01.701Z",
    "editorialFingerprint": "94c0a4b2ad03f708674a1467b24f8ffb3d359e1a7592623fc8d4698342801edd",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "S063 validat per pujar a síntesi de veus",
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
    "reviewUpdate": {
      "audio": "./assets/audio/s063-mixed-v1.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Primer muntatge: Ambient real continu d’aula amb jovent, molt discret sota Mireia i Biel, amb entrada suau. Sense papers, cadires ni altres efectes puntuals afegits. Pendent d’audició.",
        "es": "Primer montaje con ambiente real continuo de aula, muy discreto durante las dos voces, entrada suave, subida y fundido final. Sin efectos puntuales añadidos. Pendiente de escucha."
      }
    }
  },
  "ca-S070": {
    "state": "audio-corrections-pending",
    "approvedAt": "2026-11-23T09:49:01.707Z",
    "editorialFingerprint": "c329111785d5c98723a68257817238bd4792b6d1e4aa29db52169070f355f2dd",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S070 validat per pujar a síntesi de veus",
    "reason": "S’asseia sona amb accent a la i. Esmena del torn esperar en cua per a un lot compatible; muntatge pendent de validació de veus.",
    "uncertainTurns": [],
    "receivedTakes": {
      "received": [
        "S070-T01"
      ],
      "total": 1,
      "batches": [
        "L22"
      ]
    },
    "voiceApproval": false,
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T12:09:15.400Z",
    "voicePreview": "./proves/veus-rebudes.html#S070",
    "voicePreviewFile": "./assets/audio/s070-voices-review-v1.mp3",
    "feedbackAt": "2026-11-23",
    "teacherAssessment": "El docent demana esmenar la tonicitat de s’asseia si es pot agrupar amb material compatible; no s’ha donat aprovació global de veus ni de muntatge.",
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
      "part": "esperar",
      "speaker": "Ferran",
      "voice": "Algenib",
      "text": "Els grans anaven d’un costat a l’altre per saber què havia passat. Mentrestant, la gent s’asseia i els petits corríem entre les cadires. El pare va anar a buscar l’acordió, que havia deixat a casa d’aquell veí, a la planta baixa, perquè no li fes nosa.",
      "sourceTakeSha256": "760143315f68bf9b649e208ed3e37c6ad3e325488f8b73198d1a1b8099367da3",
      "status": "awaiting-compatible-batch",
      "pronunciation": "In s’asseia, place the stress on the E syllable: as-SE-ia, not on I. Keep the following i els petits as the separate conjunction and phrase, fluently linked without changing any words. Preserve the warm older male Ferran/Algenib character. Pronunciation directions are not spoken."
    }
  },
  "ca-S072": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-23T09:49:01.707Z",
    "editorialFingerprint": "b7efd9ded637df90aa55d3793d959d447a76ec667d03cd13e19ad338560c60a6",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S072 validat per pujar a síntesi de veus",
    "reason": "Validació docent explícita del guió, veus i escaleta. Preparar en un lot compatible abans de qualsevol enviament."
  },
  "ca-S069D": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-23T09:49:01.707Z",
    "editorialFingerprint": "8c39b22cb4a7c6c28ada224bc43d89591ae7e02ab09502907ec2a56359e24abd",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "S069D validat per pujar a síntesi de veus",
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
    "reviewUpdate": {
      "audio": "./assets/audio/s069d-mixed-v1.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Primer muntatge: Base original «Dos noms a la pissarra», prevista també per a la versió narrada de la mateixa història, amb mescla pròpia per a Aina i Ferran. Molt baixa sota les veus; sense partit, guix, gols ni pauses afegides. Pendent d’audició.",
        "es": "Primer montaje con las voces aprobadas, fondo continuo discreto y fundidos. Pendiente de escucha."
      }
    }
  },
  "ca-S046D": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-23T09:49:01.708Z",
    "editorialFingerprint": "9ecc360c661b85af6e68a88e47532f28bee001bedda2718d19482a2a1dcaed6e",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "S046D validat per pujar a síntesi de veus",
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
    "reviewUpdate": {
      "audio": "./assets/audio/s046d-mixed-v1.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Primer muntatge: Base original «Una butxaca amb farina», compartida amb la versió narrada S046 i amb mescla pròpia. Molt suau sota Aina i Ferran, sense representar amb efectes les accions del record. Pendent d’audició.",
        "es": "Primer montaje con las voces aprobadas, fondo continuo discreto y fundidos. Pendiente de escucha."
      }
    }
  },
  "ca-S060": {
    "editorialFingerprint": "93c4356933cf3407225b79f23a9b40ac40d78185ac177c5dd6a77c3c1c6bfccb",
    "state": "ready-for-voices",
    "approvedAt": "2026-11-23T09:53:37.288Z",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "Diàleg S060 validat per síntesi de veu, dificultat intermèdia i passadís atenuat de fons",
    "reason": "Guió validat pel docent amb metadades i escaleta requalificades; pendent de lot compatible."
  },
  "ca-S066": {
    "editorialFingerprint": "d89ec7e85ddc2fbb0e237185eb3403215eb8f0759796ec80ba701f1ace4cf66b",
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-23T09:53:37.290Z",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "S066 validat per síntesi de veu i requalificat a 6è intermèdia, per confirmar amb l’audició",
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
    "reviewUpdate": {
      "audio": "./assets/audio/s066-mixed-v1.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Primer muntatge: Ambient real continu d’aula amb jovent, molt discret sota les dues veus, amb entrada suau. Sense papers, cadires ni altres efectes puntuals afegits. Pendent d’audició.",
        "es": "Primer montaje con las voces aprobadas, fondo continuo discreto y fundidos. Pendiente de escucha."
      }
    }
  },
  "ca-S059": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "90553a1f4742942d52958320c3210f077f94a7d091ba4b3fdd6332d08d713d1e",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S059 validat per síntesi de veus",
    "reason": "Validació docent explícita de guió, veus i escaleta. Agrupar lectures completes del mateix repartiment en sis a vuit minuts abans d’enviar."
  },
  "ca-S065": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "184ca0f6f7fb80c23c09bef185079669bab1be329a8d2420c3d533c10ff6e6de",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "S065 validat per síntesi de veus",
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
    "reviewUpdate": {
      "audio": "./assets/audio/s065-mixed-v1.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Primer muntatge: Ambient real continu d’aula amb jovent, molt discret sota Mireia i Biel, amb entrada suau. Sense papers, cadires ni altres efectes puntuals afegits. Pendent d’audició.",
        "es": "Primer montaje con ambiente real continuo de aula, muy discreto durante las dos voces, entrada suave, subida y fundido final. Sin efectos puntuales añadidos. Pendiente de escucha."
      }
    }
  },
  "ca-S068": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "90679cbf8db996cb31d41be22181d3e0c85a0f4668a624fea946702dfccf9854",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "S068 validat per síntesi de veus",
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
    "reviewUpdate": {
      "audio": "./assets/audio/s068-mixed-v1.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Primer muntatge: Base original «Un dinar entre vies», molt suau sota Ferran. S’ometen els efectes puntuals d’estació i d’embolcall per mantenir el record seguit i sense pauses afegides. Pendent d’audició.",
        "es": "Primer montaje con las voces aprobadas, fondo continuo discreto y fundidos. Pendiente de escucha."
      }
    }
  },
  "ca-S071": {
    "state": "audio-corrections-pending",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "63e0c902e8ff63f6421a4a62d95bc541eff9d7af6e10d05d7599790aaadb102f",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S071 validat per síntesi de veus",
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
      "status": "partial",
      "approvedAt": "2026-11-23",
      "sourceTakeSha256": "be81a7fabf103859d65f69972f783d0fa1b9777fd8c943f8c4676659fedd0ba3",
      "approvedParts": [
        "introduction",
        "primer",
        "noves",
        "sortir",
        "porta",
        "tornar",
        "cuina",
        "arribar",
        "final"
      ],
      "excludedParts": [
        "sobre"
      ],
      "confirmation": "El docent valida la resta de les veus; primera intervenció pendent d’esmena d’Aina."
    },
    "missingVoiceParts": [],
    "voicesReceivedAt": "2026-11-23T12:09:15.400Z",
    "voicePreview": "./proves/veus-rebudes.html#S071",
    "voicePreviewFile": "./assets/audio/s071-voices-review-v1.mp3",
    "feedbackAt": "2026-11-23",
    "teacherAssessment": "Resta de les veus impecable segons el docent. Regenerar la primera intervenció perquè digui clarament Aina, escoltar la represa i després muntar.",
    "feedback": [
      {
        "part": "sobre",
        "speaker": "Ferran",
        "kind": "pronunciation",
        "word": "Aina",
        "heard": "Eina",
        "status": "pending"
      }
    ],
    "plannedRepair": {
      "part": "sobre",
      "speaker": "Ferran",
      "voice": "Algenib",
      "text": "Aina, en aquest sobre hi guardo quatre entrades. Són del mateix teatre i tenen el mateix color blau, però dues són d’un diumenge i dues, del dissabte següent. Si les mires de pressa semblen iguals. A mi em van fer passar una bona vergonya.",
      "sourceTakeSha256": "be81a7fabf103859d65f69972f783d0fa1b9777fd8c943f8c4676659fedd0ba3",
      "status": "awaiting-compatible-batch",
      "pronunciation": "Aina is the Catalan name /ˈaj.nə/: start clearly with an open A and the AI diphthong, as in the beginning of Catalan aire, never EI or Eina. Keep the warm older male Ferran/Algenib identity and a fluent natural sentence. Do not spell the name, add a lead-in, or read these directions."
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
    "state": "ready-for-voices",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "39766217bff33bd79a3463e0a5e3746bce91308c4561475d3eeab0d524e145eb",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S056 validat per síntesi de veus",
    "reason": "Validació docent explícita de guió, veus i escaleta. Agrupar lectures completes del mateix repartiment en sis a vuit minuts abans d’enviar."
  },
  "ca-S045D": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "a10d9b11d1c046f68f91f7bf5cf08fec8f863b52b482fadc3fba942172df8358",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "S045D validat per síntesi de veus",
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
    "reviewUpdate": {
      "audio": "./assets/audio/s045d-mixed-v1.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Primer muntatge: Base original «Cadires sota les estrelles», compartida amb la narració S045, amb mescla pròpia molt suau sota Aina i Ferran. Sense plaça, pel·lícula, cadires ni pauses afegides per a efectes. Pendent d’audició.",
        "es": "Primer montaje con la base original «Cadires sota les estrelles», compartida con S045 y mezclada muy suave durante las dos voces, con subida y fundido final. Sin efectos añadidos. Pendiente de escucha."
      }
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
    "state": "ready-for-voices",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "7ba953cb5e8e224a14843def2f977ad3519ed4031a355c3b6d9a108eba7e27ed",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S055 validat per síntesi de veus",
    "reason": "Validació docent explícita de guió, veus i escaleta. Agrupar lectures completes del mateix repartiment en sis a vuit minuts abans d’enviar."
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
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "50b721865bd7865ed18420348e604efde67cd871b9e5764992744e8ae87826d3",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "S064 validat per síntesi de veus",
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
    "reviewUpdate": {
      "audio": "./assets/audio/s064-mixed-v1.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Primer muntatge: Ambient real continu d’aula amb jovent, molt discret sota Mireia i Biel, amb entrada suau. Sense papers, cadires ni altres efectes puntuals afegits. Pendent d’audició.",
        "es": "Primer montaje con ambiente real continuo de aula, muy discreto durante las dos voces, entrada suave, subida y fundido final. Sin efectos puntuales añadidos. Pendiente de escucha."
      }
    }
  },
  "ca-S068D": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-23",
    "editorialFingerprint": "c64ed161061a9e7c35c0f3ea11dd829829f982ce7f10539ee33b5dfde5d7ea06",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "S068D validat per síntesi de veus",
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
    "reviewUpdate": {
      "audio": "./assets/audio/s068d-mixed-v1.mp3",
      "at": "2026-11-23",
      "summary": {
        "ca": "Primer muntatge: Base original «Un dinar entre vies», compartida amb S068, amb mescla pròpia molt suau sota Aina i Ferran. Conversen a casa en el present; sense estació, tren, papers ni altres efectes del record. Pendent d’audició.",
        "es": "Primer montaje con la base original «Un dinar entre vies», compartida con S068 y mezclada muy suave durante las dos voces, con subida y fundido final. Sin efectos del recuerdo. Pendiente de escucha."
      }
    }
  }
};
