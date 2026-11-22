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
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-20T12:41:11.676Z",
    "editorialFingerprint": "b74a57783cdc96f46edae1442d2c49a6142dfc2666b1645482beab8b21b81758",
    "plannedNewRequests": 1,
    "reason": "Guió de recerca validat; preparat per al següent lot dins del topall gratuït de peticions.",
    "voicesReceivedAt": "2026-11-21T10:04:43.360Z",
    "synthesisBatch": "L01",
    "requestHash": "0cd61066dabfeb8992968fa3e45c9f95dd07621aa58ca5a919a5e873cee48df7",
    "audioSha256": "144f740a266b7a63efc718565886c2c6e099f10888ed884b6329a16598a42d45",
    "listeningApproval": false,
    "montageNewSynthesisRequests": 0
  },
  "ca-S006": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-20T12:48:05.488Z",
    "editorialFingerprint": "f5d65ce7c8c1510f490953a72b09c81a74b597993b35700e2a798aae6f137ce2",
    "plannedNewRequests": 1,
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
    "listeningApproval": false,
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
    "state": "audio-corrections-pending",
    "feedbackAt": "2026-11-20",
    "feedback": [
      {
        "part": "repartiment",
        "word": "bústia",
        "heard": "bustía",
        "status": "pending"
      },
      {
        "part": "error",
        "word": "bústia",
        "heard": "bustía",
        "status": "pending"
      }
    ],
    "teacherAssessment": "Valoració positiva; bústia pendent de corregir. Sintonia rebutjada, retirada; alternativa pendent.",
    "plannedNewRequests": 1,
    "repairPlan": "content/audio-repairs.json",
    "listeningApproval": false,
    "repairComparison": "./proves/correccions-l01.html#S013-error",
    "receivedRepairs": [
      {
        "code": "S013",
        "part": "repartiment",
        "text": "El codi postal ajuda a arribar a una zona, però no diu tot sol quina bústia concreta és la bona.",
        "pronunciation": "Bústia is stressed on the first vowel Ú: BÚS-ti-a, never bus-TÍ-a. This spelling aid is an instruction, not spoken text. Read the sentence fluently and naturally.",
        "status": "received-awaiting-listening",
        "originalFile": "assets/audio/repairs/l01-s013-repartiment-original.mp3",
        "candidateFile": "assets/audio/repairs/l01-s013-repartiment-prova.mp3",
        "sourceRawSha256": "37fe6368197b31f9d3d6a8bafedc0c858426c23bd2dd4f6ef6f1278d7cbfb473",
        "batchRequestHash": "0cd61066dabfeb8992968fa3e45c9f95dd07621aa58ca5a919a5e873cee48df7",
        "applied": false
      },
      {
        "code": "S013",
        "part": "error",
        "text": "No és correcte endevinar una bústia només perquè el nom ens sona.",
        "pronunciation": "Bústia is stressed on Ú in the first syllable, never on I. Respect the written accent without exaggerated pauses or spelling aloud.",
        "status": "received-awaiting-listening",
        "originalFile": "assets/audio/repairs/l01-s013-error-original.mp3",
        "candidateFile": "assets/audio/repairs/l01-s013-error-prova.mp3",
        "sourceRawSha256": "37fe6368197b31f9d3d6a8bafedc0c858426c23bd2dd4f6ef6f1278d7cbfb473",
        "batchRequestHash": "0cd61066dabfeb8992968fa3e45c9f95dd07621aa58ca5a919a5e873cee48df7",
        "applied": false
      }
    ]
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
    "state": "montage-awaiting-listening",
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
    "listeningApproval": false,
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
    "editorialFingerprint": "d998b702f5638edf71b3bfe620930f9ee44abd02c59164b8242f75b105c46f4d"
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
    "state": "montage-awaiting-listening",
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
    "teacherAssessment": "Inserida la frase de suggeriments validada, amb la base comuna de notícies i el mercat conservats. Comprovar la continuïtat del timbre al tancament.",
    "plannedNewRequests": 0,
    "listeningApproval": false,
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
    }
  },
  "ca-S007": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-20T21:20:16.430Z",
    "editorialFingerprint": "d5d256839f998b098ac3c8f0f2ddac475bc6f47e8f6ccfebac8e6c04e5c3685f",
    "plannedNewRequests": 2,
    "confirmation": "S007 es pot pujar a síntesi de veus, guió validat.",
    "reason": "Guió validat; dues preses agrupades, amb pauses per intercalar les tres veus en local. Cap síntesi nova el dia 20: deu peticions consumides.",
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
    "audioSha256": "da6303d8252044259508d70b30b70763c0b90a7f9c805a31df821a6a9c95366c",
    "montageNewSynthesisRequests": 0
  },
  "ca-S024": {
    "state": "audio-corrections-pending",
    "approvedAt": "2026-11-20T21:21:39.843Z",
    "editorialFingerprint": "ce9615248b452c5b07530de2d0f424174c4f313494bb1bbecf5c98aef2d81cf2",
    "plannedNewRequests": 1,
    "confirmation": "S024 pot pujar a síntesi de veu, guió validat.",
    "reason": "Guió validat; conversa de Laia i Biel preparada per agrupar amb les altres peces Puck/Leda. Cap síntesi nova el dia 20: deu peticions consumides.",
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
    "audioSha256": "79c941202ad398a33e2681b6bc2183f23c82ce1084cdfd83013e335ea36b720a",
    "montageNewSynthesisRequests": 0,
    "feedbackAt": "2026-11-22",
    "feedback": [
      {
        "part": "dubtes",
        "word": "I el pas fins a la font",
        "heard": "Veu de Biel excessivament aguda i antinatural al darrer torn",
        "status": "pending"
      }
    ],
    "plannedRepair": {
      "part": "dubtes",
      "speaker": "Biel",
      "text": "I el pas fins a la font! Això ho podem preguntar a la mestra. Després portem el full als altres cursos?",
      "sourceTakeSha256": "1159530cc9e6884898ca2176f65034213df656a40b46ac8933eb6942df5694cf",
      "status": "awaiting-compatible-batch"
    },
    "reviewUpdate": {
      "audio": "./assets/audio/s024-classroom-v2.mp3",
      "at": "2026-11-22",
      "summary": {
        "ca": "Retirats els bufecs previs i les notes finals; ambient continu d’aula. Últim torn de Biel pendent d’esmena de veu.",
        "es": "Retirados los soplidos iniciales y las notas finales; ambiente continuo de aula. Último turno de Biel pendiente de corrección de voz."
      }
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
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-20T21:41:49.070Z",
    "editorialFingerprint": "6aec80a53248aa7f3e9865841e69b4885c8019115d4fe2e45942a24b70933771",
    "plannedNewRequests": 1,
    "confirmation": "S014 validat, llest per pujar a síntesi de veus.",
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
    "listeningApproval": false,
    "synthesisBatch": "L06",
    "requestHash": "a0bcff78c1b77973ff7ddd60722557464823fa57c596f11b98c6ecc64a97223a",
    "audioSha256": "a4a8fc91085cedfee08da9f79581ec98fe21070fc6f3f1da9d4936fb3a1445e0",
    "montageNewSynthesisRequests": 0
  },
  "ca-S009": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-20T21:58:08.267Z",
    "editorialFingerprint": "63dc0ab59071bd124c63f9332575d4d756ba291f6e7e8e0265c3a5195f3e3043",
    "plannedNewRequests": 1,
    "confirmation": "S009 queda també validat per síntesi de veus.",
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
    "listeningApproval": false,
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
    }
  },
  "ca-S029": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-21T08:12:38.478Z",
    "editorialFingerprint": "eb65b562fb2c3b738b693fa41397b8a0dc6e8c4f8134d41ffc48f6434c8ac603",
    "plannedNewRequests": 1,
    "confirmation": "Fent aquests canvis que et dic el text quedaria validat per síntesi de veus.",
    "reason": "Guió validat amb l’avís de divendres a les quatre de la tarda. Incorporar la presa Mar/Erinome al lot L03; cap petició curta aïllada.",
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
    "audioSha256": "bc4a146f94be2d3a5751c221ee9d10daf7080389ecf794f6605498157e0d1055",
    "montageNewSynthesisRequests": 0,
    "voicePreviewFile": "./assets/audio/s029-voices-review-v1.mp3",
    "reviewUpdate": {
      "audio": "./assets/audio/s029-news-common-v2.mp3",
      "at": "2026-11-22",
      "summary": {
        "ca": "Nova base comuna de notícies, amb entrada i sortida; retirats els papers i jingles anteriors. Pendent d’audició.",
        "es": "Nueva base común de noticias, con entrada y salida; retirados los papeles y jingles anteriores. Pendiente de escucha."
      }
    }
  },
  "ca-S026": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-21T08:26:58.368Z",
    "editorialFingerprint": "cf11d87e14bd9d3686135ec4f159d00ab2631ffe89687ef0c08729bc8cb51a03",
    "plannedNewRequests": 1,
    "confirmation": "S026 validat per producció de veus, incorpora sons d’aula de fons, perquè és clarament situació d’aula.",
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
    "listeningApproval": false,
    "synthesisBatch": "L06",
    "requestHash": "a0bcff78c1b77973ff7ddd60722557464823fa57c596f11b98c6ecc64a97223a",
    "audioSha256": "49a6a9572fe7d6c07dc01ae6fe609508102eb6089b1f78491cb616470b75b1e2",
    "montageNewSynthesisRequests": 0
  },
  "ca-S030": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-21T09:14:33.051Z",
    "editorialFingerprint": "e118368fb5bb4a2127071986eda7c6e3a9e1d27f7db6c6dc0fc33fcfae5d27de",
    "plannedNewRequests": 1,
    "confirmation": "S030 llest per síntesi de veus",
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
    "listeningApproval": false,
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
    }
  },
  "ca-S040": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-21T09:14:33.054Z",
    "editorialFingerprint": "b911a99d5368d730040877b6b5f6fe8b6afa29df524952cde9b52e1870da0f50",
    "plannedNewRequests": 1,
    "confirmation": "S040 llest per síntesi de veus",
    "reason": "Guió validat; presa Laia/Leda i Nora/Kore al lot candidat L07, pendent de material compatible fins a completar sis a vuit minuts.",
    "sharedJingle": {
      "status": "awaiting-selection",
      "programme": "radio-escola",
      "note": "Capçalera de programa proposada, pendent de seleccionar abans del muntatge; les veus estan autoritzades."
    }
  },
  "ca-S028": {
    "state": "voices-received",
    "approvedAt": "2026-11-21T09:30:54.245Z",
    "editorialFingerprint": "b183bcc99d9f13ca71207052609411aa6e9a927a793906b58223587a3bb27a25",
    "plannedNewRequests": 1,
    "confirmation": "S028 validat per síntesi de veus",
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
    "listeningApproval": false,
    "voicePreview": "./proves/veus-rebudes.html#S028",
    "voicePreviewFile": "./assets/audio/s028-voices-review-v1.mp3"
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
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-21T09:30:54.248Z",
    "editorialFingerprint": "0b665a370e7930190eea0b1ba4d827d50e020ac5eb8a3901b5b7b4eb5074a825",
    "plannedNewRequests": 1,
    "confirmation": "S034 validat per síntesi de veus",
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
    "listeningApproval": false,
    "synthesisBatch": "L13",
    "requestHash": "ab02e5a56a6807f106885dd5b8e4749ed77c2b2461e93dc71243142194efb2a3",
    "audioSha256": "32bd2e3f3eb11643c03119096711059b01d172a1b01a4dcb9691ee713c569d81",
    "montageNewSynthesisRequests": 0
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
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-21T09:30:54.249Z",
    "editorialFingerprint": "36d170f98fd35d2e96e62a2160f8beb530b41102b36346dd6d140fe22cca6566",
    "plannedNewRequests": 1,
    "confirmation": "S042 validat per pujar a síntesi de veus",
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
    "listeningApproval": false,
    "synthesisBatch": "L06",
    "requestHash": "a0bcff78c1b77973ff7ddd60722557464823fa57c596f11b98c6ecc64a97223a",
    "audioSha256": "5281338f5ab4c291877fa486c70ca9d4e9fd7a2bd3b858bdb34559414aa01c20",
    "montageNewSynthesisRequests": 0
  },
  "ca-S035": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-21T09:34:44.906Z",
    "editorialFingerprint": "b4fa4a104b6161791a96448431dd14a198f020ac8f3592272436cd804da7ac76",
    "plannedNewRequests": 1,
    "confirmation": "Rectifica aquesta frase i queda validat per pujar a síntesi de veus.",
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
    "listeningApproval": false,
    "synthesisBatch": "L05",
    "requestHash": "3a86ff8ea619d9fa32f7582a144656f791631478c642722f8e98ef6e5c8a5eb0",
    "audioSha256": "86398c0938ba8be1cbdb7c4b3b769708f9ab3afd4dfdf251d48c20fa36c8cf49",
    "montageNewSynthesisRequests": 0
  },
  "ca-S037": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-21T09:35:53.798Z",
    "editorialFingerprint": "124ce39086cf4a52857e7e76743fc5a6a0d4885c635e8de27db2d05d28b097c6",
    "plannedNewRequests": 1,
    "confirmation": "S037 validat per síntesi de veus",
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
    "listeningApproval": false,
    "synthesisBatch": "L08",
    "requestHash": "ac8a3b34fa098dc7a38e788b2cadc9c81d3039b44c7af229a4c9c104184e94cc",
    "audioSha256": "e0d4df64b7ec71545e1b135035c1c7f6445f26f4557dd8cd5081253368d7f326",
    "montageNewSynthesisRequests": 0
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
    "state": "ready-for-voices",
    "approvedAt": "2026-11-21T09:39:11.371Z",
    "editorialFingerprint": "dab708a0277ce88435754b47786e9c49e4765cf4e4bda4708cd8e8476e43caf2",
    "plannedNewRequests": 1,
    "confirmation": "S033 validat per síntesi de veus",
    "reason": "Guió validat; lot candidat L12 amb Biel/Puck i Nora/Kore, pendent de completar sis a vuit minuts amb material compatible."
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
    "state": "ready-for-voices",
    "approvedAt": "2026-11-21T09:53:12.331Z",
    "editorialFingerprint": "58f26bfbd9f7e9dcdd1b730ee8da87af1b18a8f15f3ecd44d9979b3505a4f674",
    "plannedNewRequests": 1,
    "confirmation": "S036 validat per síntesi de veus",
    "reason": "Guió validat durant el processament seqüencial; incorporar a un lot compatible pendent, conservant les veus i el text exactes."
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
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-21T09:53:12.333Z",
    "editorialFingerprint": "3f247f2be02ee158c2446438e9584153850f77194661c33118452d9fd21739dc",
    "plannedNewRequests": 1,
    "confirmation": "S039 validat per síntesi de veus",
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
    "listeningApproval": false,
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
    "voicePreviewFile": "./assets/audio/s039-voices-review-v1.mp3"
  },
  "ca-S031": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-21T09:53:12.333Z",
    "editorialFingerprint": "b214470b2ac404b3500255f4cbdcaf204257782b19916141752c4d32a975f582",
    "plannedNewRequests": 1,
    "confirmation": "S031 validat per síntesi de veus",
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
    "listeningApproval": false,
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
    }
  },
  "ca-S044": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-21T09:59:55.068Z",
    "editorialFingerprint": "cc6b5ab7142aad507fe918c58e9cb6edfed125867cfd3498ab559d13266efe8c",
    "plannedNewRequests": 1,
    "confirmation": "S044 validat per síntesi de veus",
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
    "listeningApproval": false,
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
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-21T09:59:55.071Z",
    "editorialFingerprint": "b0a2b65180359b18dd9a1fdaf779f0ab79036daf7a4c293fd8b8814a4c1596b9",
    "plannedNewRequests": 1,
    "confirmation": "S043 validat per síntesi de veus",
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
    "listeningApproval": false,
    "synthesisBatch": "L05",
    "requestHash": "3a86ff8ea619d9fa32f7582a144656f791631478c642722f8e98ef6e5c8a5eb0",
    "audioSha256": "6a4ea0b52dcf932b3684b4e288642c007bec1d52a9588ffabba0dc030718023d",
    "montageNewSynthesisRequests": 0
  },
  "ca-S049": {
    "state": "voices-received",
    "approvedAt": "2026-11-22T17:52:11.110Z",
    "editorialFingerprint": "50db317831e7d6bbda48df59d3b674c5aa91de945c5f4a5c8d8b7ea66cd767f0",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S049 validada per síntesi de veus",
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
    "voicePreviewFile": "./assets/audio/s049-voices-review-v1.mp3"
  },
  "ca-S048": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-22T17:52:11.110Z",
    "editorialFingerprint": "2b675b1e99ea423b75aee675f7104379ae8ca1deba3d641334b6ff56992cddd0",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S048 validada per síntesi de veus",
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
    }
  },
  "ca-S050": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-22T17:54:15.727Z",
    "editorialFingerprint": "cbf57c492b3f830ab7bb51262823c84840c4703b8ef3eaa0947ef5db02adca47",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S050 validada per síntesi de veus",
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
    }
  },
  "ca-S052": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-22T17:55:43.315Z",
    "editorialFingerprint": "6795a7f1e2c0d0371d878125ceff16c9c1fd8828d953e09d6722cef5e6748929",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S052 validada per síntesi de veus",
    "reason": "Guió, veus i escaleta validats; P03 encara espera la validació de S051 abans de preparar el lot amb S040."
  },
  "ca-S051": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-22T17:57:07.244Z",
    "editorialFingerprint": "19d3a1cc1a536975b6d5a5d72236fb7854b86661b4ab040a057b5c61205fc0e5",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S051 validada per síntesi de veus",
    "reason": "P03 completa totes tres validacions. Preparar el lot Laia/Leda i Nora/Kore després de comprovar el primer retorn del format nou; cap petició curta aïllada."
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
    "state": "voices-received",
    "approvedAt": "2026-11-22T18:21:42.589Z",
    "editorialFingerprint": "06c5723fb0f3f30013e47ef64df68badced5d0d585c4b691787449305163085d",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S062 validada per síntesi de veus",
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
    "voiceApproval": false,
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
    }
  },
  "ca-S069": {
    "state": "audio-corrections-pending",
    "approvedAt": "2026-11-22T19:33:51.066Z",
    "editorialFingerprint": "98d513f391e4b49069dd87e6ec6e7ea9308a37147a327cd2f068e6a1e43783c1",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S069 validada per síntesi de veus",
    "reason": "Agrupar records complets validats de Ferran/Algenib fins a sis a vuit minuts. S069D té validació pròpia pendent.",
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
        "status": "pending"
      }
    ],
    "voiceApproval": {
      "status": "partial",
      "approvedAt": "2026-11-22",
      "sourceTakeSha256": "633fd6af92165442628944cb8ad45e889218b2bbbf4d4ceca34f47f390421a14",
      "approvedParts": [
        "introduction",
        "primer",
        "canvi",
        "error",
        "parar",
        "arreglar",
        "final"
      ],
      "excludedParts": [
        "encarrec"
      ],
      "confirmation": "Primera intervenció pendent de represa; la resta correcta i vàlida per muntatge."
    },
    "plannedRepair": {
      "part": "encarrec",
      "speaker": "Ferran",
      "text": "Aina, una vegada em van deixar portar el marcador d’un partit del barri. Jo encara era petit per jugar amb els grans, però em van donar una pissarra i un guix. A dalt hi havia escrit el nom dels dos equips: carrer Nou a l’esquerra i carrer Major a la dreta.",
      "sourceTakeSha256": "633fd6af92165442628944cb8ad45e889218b2bbbf4d4ceca34f47f390421a14",
      "status": "approved-awaiting-compatible-batch",
      "pronunciation": "Aina: keep the Catalan AI diphthong, not Eina. Guix ends with the soft SH consonant heard in Catalan peix, never a K or KS sound. Keep the I vowel. Read only the supplied sentence, not these instructions."
    }
  },
  "ca-S075": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-22T19:33:51.066Z",
    "editorialFingerprint": "94294ae5942a54af2a877d673e5e56496328defcd68bdacb2b2114d65dd1bf92",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S075 validada per síntesi de veus",
    "reason": "Agrupar lectures completes validades de Laia/Leda i Ona/Sulafat fins a sis a vuit minuts.",
    "mixingNotes": [
      "Ambient continu real de sala de restaurant o bar, com una conversa de barra vinculada al servei. Xerrameca llunyana sense paraules entenedores, sense veus massa infantils, molt baixa sota Laia i Ona. Retorn docent posterior substitueix el fons genèric de cuina.",
      "Preparar ambient continu de sala/bar per a S075, sense pauses addicionals per papers o safates; qualsevol acció puntual conservada pot coincidir amb la conversa."
    ]
  },
  "ca-S057": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-22T19:41:58.762Z",
    "editorialFingerprint": "03aef36d86408dd60a008261d91e64f1996e260e991def08a1f230f85cf4a129",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S057 validada per síntesi de veus",
    "reason": "Agrupar notícies completes validades de Mar/Erinome fins a sis a vuit minuts. Confirmar dificultat amb l’àudio muntat.",
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
    }
  },
  "ca-S046": {
    "state": "voices-received",
    "approvedAt": "2026-11-22T19:47:42.525Z",
    "editorialFingerprint": "6dec967b93b54be0c0e7d1b976141867e7689b79a650a12f85990f370e75bdc7",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S046 validada per síntesi de veus",
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
    "voicePreviewFile": "./assets/audio/s046-voices-review-v1.mp3"
  },
  "ca-S073": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-22T19:57:00.644Z",
    "editorialFingerprint": "072b5aceaffba4c101b890ece9f7bd1523f2bd168cedc2eaf8d9c435c2d2d406",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S073 validada per síntesi de veus",
    "reason": "Agrupar lectures completes validades de Laia/Leda i Ona/Sulafat fins a sis a vuit minuts."
  },
  "ca-S061": {
    "state": "voices-received",
    "approvedAt": "2026-11-22T19:57:00.644Z",
    "editorialFingerprint": "ac40b599a24fbc8cd411d7fda81b5e0eff7085933ee751da5542974614ab6de2",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S061 validada per síntesi de veus",
    "reason": "Agrupar lectures completes validades de Laia/Leda i Biel/Puck fins a sis a vuit minuts. Confirmar curs i dificultat escoltant el muntatge.",
    "gradingReview": {
      "status": "pending-listening",
      "reviewAfter": "mounted-audio",
      "currentGrade": "5",
      "currentLevel": "advanced",
      "candidateGrade": "6",
      "candidateLevels": [
        "middle",
        "advanced"
      ],
      "reviewCourse": true,
      "reviewDifficulty": true,
      "note": "Valorar el pas a 6è intermèdia o avançada després d’escoltar l’àudio muntat. Ara es mantenen 5è avançada i vuit preguntes, sense requalificació aplicada."
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
        "ca": "Metadades retirades; torna a escoltar la presa neta. El títol locutat continua pendent.",
        "es": "Metadatos retirados; vuelve a escuchar la toma limpia. El título locutado sigue pendiente."
      }
    }
  },
  "ca-S082": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-22T19:59:16.594Z",
    "editorialFingerprint": "b240a4b113ef94d395926ce05c3897d6c219c180c2f29a66fe202e5a857e4389",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S082 validada per síntesi de veus",
    "reason": "Agrupar lectures completes validades de Biel/Puck i Elies/Algieba fins a sis a vuit minuts. Valorar curs després de l’àudio muntat.",
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
    "synthesisIssue": {
      "batch": "L19",
      "code": "INTERNAL",
      "at": "2026-11-22",
      "resubmitted": false
    }
  },
  "ca-S077": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-22T20:05:09.021Z",
    "editorialFingerprint": "f60abdad44b48622c89a07da88c3d5e99885a217bffe0582a594143ee58a5986",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S077 validada per síntesi de veus",
    "reason": "Repartiment Laia/Leda i Ona/Sulafat complet: recalcular agrupacions amb text pla abans de congelar lots de sis a vuit minuts."
  },
  "ca-S045": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-22T20:05:09.021Z",
    "editorialFingerprint": "3d98db6a2f8355d4a34b79c00c88d556fea012be6d4acbcc420877c0b16313b8",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "S045 validada per síntesi de veus",
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
    "audioSha256": "3226874f0b1d60cda05edea234fd6c05716d3e49bf1a8e78f2879e282d7511fe",
    "montageNewSynthesisRequests": 0
  },
  "ca-S078": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-22T20:08:51.941Z",
    "editorialFingerprint": "be8e59b618a10c208d89b73a654ceceea69057bab0ed2d1b7a68b8012554d653",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S078 validada per síntesi de veus",
    "gradingAssessment": "El docent considera ben calibrada la qualificació actual de 5è accessible.",
    "reason": "Agrupar lectures completes validades de Biel/Puck i Elies/Algieba fins a sis a vuit minuts."
  },
  "ca-S047": {
    "state": "montage-awaiting-listening",
    "approvedAt": "2026-11-22T20:16:52.042Z",
    "editorialFingerprint": "58218f31124c56a9a90d9543c3d215cd963f253a625a8958cb9195a5e3e6772e",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "confirmation": "S047 validada per síntesi de veus",
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
    "audioSha256": "977e41ad44ec32e59664987d2e42a154414b01578a2a478c092ade9a502600e3",
    "montageNewSynthesisRequests": 0
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
    "state": "ready-for-voices",
    "approvedAt": "2026-11-22T20:22:58.661Z",
    "editorialFingerprint": "2a784ecc42769c082794208ddcddb9a8c38dcaa50efa60baa1eee066bc814cf4",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S081 validada per síntesi amb el tancament esmenat",
    "reason": "P15 complet amb S081 i S082; preparar lot Biel/Puck i Elies/Algieba de sis a vuit minuts.",
    "synthesisIssue": {
      "batch": "L19",
      "code": "INTERNAL",
      "at": "2026-11-22",
      "resubmitted": false
    }
  },
  "ca-S079": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-22T20:27:37.701Z",
    "editorialFingerprint": "e8fc2f46e2fdf6e472f9795de04c9fb32ad91cb0bd645540880ffb77f30805a9",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S079 validada per síntesi amb comiat més natural",
    "reason": "Completar el lot Biel/Puck i Elies/Algieba amb S078 i S080; falta validar S080."
  },
  "ca-S067": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-22T20:38:27.980Z",
    "editorialFingerprint": "8132e24978437a26f3f22286de786329d6e717ed9c2c6cc7cca4541d91d65610",
    "plannedNewRequests": 1,
    "listeningApproval": false,
    "confirmation": "S067 validada per síntesi i requalificada a 1r d’ESO intermèdia",
    "gradingDecision": {
      "date": "2026-11-22",
      "grade": "eso1",
      "level": "middle",
      "previousGrade": "6",
      "previousLevel": "advanced",
      "source": "Decisió explícita del docent: càrrega d’informació i discriminació més pertinent per a 1r d’ESO.",
      "spokenTextChanged": false
    },
    "reason": "Completar el lot Mireia/Aoede i Biel/Puck amb S066, encara pendent de validar."
  }
};
