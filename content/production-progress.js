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
    "state": "ready-for-voices",
    "approvedAt": "2026-11-20T12:34:52.567Z",
    "editorialFingerprint": "7c6c647baa9f796d82a24313a34e8a6387a5518f5878d4853b7a7397e1af34cb",
    "plannedNewRequests": 2,
    "reason": "Guió validat i reclassificat a 4t avançada; pendent de produir les dues preses agrupades."
  },
  "ca-S021": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-20T12:41:11.676Z",
    "editorialFingerprint": "b74a57783cdc96f46edae1442d2c49a6142dfc2666b1645482beab8b21b81758",
    "plannedNewRequests": 1,
    "reason": "Guió de recerca validat; preparat per al següent lot dins del topall gratuït de peticions."
  },
  "ca-S006": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-20T12:48:05.488Z",
    "editorialFingerprint": "629dbd8f7a80c495f8604b1c8831d2feecf09928c6aebc8e22f148bed95304fe",
    "plannedNewRequests": 1,
    "reason": "Veus validades, pendents del següent lot dins el límit gratuït. Muntatge pendent de sintonies d’informatiu.",
    "sharedJingle": {
      "status": "awaiting-validation",
      "programme": "informatiu",
      "url": "./proves/sintonies-mireia.html"
    }
  },
  "ca-S010": {
    "state": "audio-corrections-pending",
    "feedbackAt": "2026-11-20",
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
        "heard": "Tillers",
        "status": "pending"
      }
    ],
    "teacherAssessment": "Muntatge validat; pronunciacions pendents. Passos reals nous pendents d’audició.",
    "plannedNewRequests": 1,
    "repairPlan": "content/audio-repairs.json",
    "listeningApproval": false
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
    "listeningApproval": false
  },
  "ca-S022": {
    "state": "audio-corrections-pending",
    "feedbackAt": "2026-11-20",
    "feedback": [
      {
        "part": "dema",
        "word": "rails",
        "heard": "ráils/ralls",
        "status": "pending"
      }
    ],
    "teacherAssessment": "Bon muntatge; rails pendent de corregir. Efectes de tramvia revisats pendents d’audició.",
    "plannedNewRequests": 1,
    "repairPlan": "content/audio-repairs.json",
    "listeningApproval": false
  },
  "ca-S016": {
    "state": "audio-corrections-pending",
    "feedbackAt": "2026-11-20",
    "feedback": [
      {
        "part": "exposicio",
        "word": "Si",
        "phrase": "Si l’estudi avança, l’equip",
        "heard": "ffff l’estudi avança, l’equip",
        "kind": "synthesis-artifact",
        "status": "pending"
      }
    ],
    "teacherAssessment": "La resta de la peça està ben valorada. Artefacte en lloc de «Si» pendent de corregir; reparació local preparada i jingles inicial i final pendents de polir.",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "jingleStatus": "needs-refinement",
    "repairPlan": "content/audio-repairs.json"
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
    "state": "audio-corrections-pending",
    "feedbackAt": "2026-11-20",
    "feedback": [
      {
        "part": "tancament",
        "word": "suggeriments",
        "heard": "suggerements o suggeraments",
        "kind": "synthesis-artifact",
        "status": "pending"
      }
    ],
    "teacherAssessment": "La resta de la locució està ben valorada. Corregir suggeriments; nou muntatge amb Ona curta i mercat real baix sota l’entrevista. Pendent de validar després de l’esmena.",
    "plannedNewRequests": 0,
    "listeningApproval": false,
    "repairPlan": "content/audio-repairs.json",
    "jingleStatus": "approved-pair-remounted-pending-listening",
    "editorialFingerprint": "ded73b9e363961f5bd81ba22686b8d31f05cd5806249aa91e2771005718be2a2"
  },
  "ca-S007": {
    "state": "ready-for-voices",
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
    }
  },
  "ca-S024": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-20T21:21:39.843Z",
    "editorialFingerprint": "18db36638b5c5648682dd6910fa34234852d9d6ff13264f1cce035e3e0ae4678",
    "plannedNewRequests": 1,
    "confirmation": "S024 pot pujar a síntesi de veu, guió validat.",
    "reason": "Guió validat; conversa de Laia i Biel preparada per agrupar amb les altres peces Puck/Leda. Cap síntesi nova el dia 20: deu peticions consumides.",
    "quotaHold": {
      "day": "2026-11-20",
      "countedRequests": 10,
      "dailyLimit": 10,
      "notBefore": "2026-11-21T08:00:00.000Z"
    }
  },
  "ca-S017": {
    "state": "ready-for-voices",
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
    }
  },
  "ca-S014": {
    "state": "ready-for-voices",
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
    }
  },
  "ca-S009": {
    "state": "ready-for-voices",
    "approvedAt": "2026-11-20T21:58:08.267Z",
    "editorialFingerprint": "38014b8e7bff3ce697843ac062788c561d32a4ee41b342e19471419864974df7",
    "plannedNewRequests": 1,
    "confirmation": "S009 queda també validat per síntesi de veus.",
    "reason": "Guió validat; agrupar amb material compatible d’Erinome fins a completar sis a vuit minuts. Cap petició curta aïllada.",
    "quotaHold": {
      "day": "2026-11-20",
      "countedRequests": 10,
      "dailyLimit": 10,
      "notBefore": "2026-11-21T08:00:00.000Z"
    }
  }
};
