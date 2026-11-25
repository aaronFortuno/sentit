// Authored alternatives; exact independent review is required before use.
// Option order fixed once during editing; never shuffled when loading a worksheet.
export const batch003Choices = {
  "ca-S043": {
    "questions": {
      "edifici": {
        "prompt": "Quin ús tenia l’edifici abans i quin té ara?",
        "options": [
          "Biblioteca abans; centre cívic ara.",
          "Escola abans; biblioteca ara.",
          "Escola abans; centre cívic ara.",
          "Centre cívic abans; escola ara."
        ],
        "correct": "c",
        "explanation": "Era l’escola d’en Ferran i ara és un centre cívic."
      },
      "hipotesi": {
        "prompt": "Quina primera explicació imagina l’Aina sobre el balcó?",
        "options": [
          "Que el dibuix correspon a una altra escola.",
          "Que el van treure durant una reforma.",
          "Que el balcó es va afegir després de fer el dibuix.",
          "Que el dibuix mostra l’altra façana de l’edifici."
        ],
        "correct": "b",
        "explanation": "Primer pensa que el balcó havia desaparegut durant unes obres."
      },
      "sortir": {
        "prompt": "Per què surt a mirar la façana des de la plaça?",
        "options": [
          "Per dibuixar les finestres de baix.",
          "Per esperar que arribi l’avi de l’escola.",
          "Per trobar la data de construcció.",
          "Per comprovar si queden marques del balcó."
        ],
        "correct": "d",
        "explanation": "Busca alguna marca que permeti comprovar la seva hipòtesi."
      },
      "record": {
        "prompt": "Què recorda l’avi sobre el balcó?",
        "options": [
          "Que es va afegir després de les obres interiors.",
          "Que s’hi esperaven abans de classe.",
          "Que, havent estudiat allà, no en recorda cap.",
          "Que el van treure quan ell estudiava."
        ],
        "correct": "c",
        "explanation": "L’avi havia anat a aquella escola i no recorda cap balcó sobre la porta."
      },
      "vora": {
        "prompt": "Quina paraula troben a la vora doblegada del full?",
        "options": [
          "Proposta.",
          "Façana.",
          "Reforma.",
          "Escola."
        ],
        "correct": "a",
        "explanation": "A la vora hi diu «proposta», escrit a llapis."
      },
      "proposta": {
        "prompt": "Què aclareix el resum de la reunió que el dibuix sol no permetia saber?",
        "options": [
          "Que el balcó es va descartar i només es reformaria l’interior.",
          "Que el balcó es va construir abans de reformar l’interior.",
          "Que el balcó es va retirar per convertir l’escola en centre cívic.",
          "Que les obres interiors es van descartar per construir el balcó."
        ],
        "correct": "a",
        "explanation": "El resum recull la decisió de descartar el balcó i fer només canvis interiors."
      },
      "decisio": {
        "prompt": "Quin document concreta la decisió sobre el balcó?",
        "options": [
          "El full nou amb els records d’en Ferran.",
          "El dibuix de la façana amb la data.",
          "El resum de la reunió sobre les obres.",
          "La fotografia feta des de la plaça."
        ],
        "correct": "c",
        "explanation": "La decisió de descartar el balcó figura al resum de la reunió."
      },
      "peu": {
        "prompt": "Com canvia l’explicació escrita per l’Aina?",
        "options": [
          "Descriu una proposta no construïda i anota la font.",
          "Descriu un balcó construït i hi afegeix el record de l’avi.",
          "Descriu un balcó desaparegut i anota la data de les obres.",
          "Descriu una reforma de la porta i hi afegeix una fotografia."
        ],
        "correct": "a",
        "explanation": "Substitueix la hipòtesi del balcó desaparegut per la proposta no construïda, indicant d’on surt l’explicació.",
        "evidence": [
          {
            "part": "canvi",
            "quote": "Ja no hi posaria el balcó desaparegut, sinó una proposta que no es va construir. Va deixar anotat d’on sortia aquella explicació"
          }
        ]
      },
      "diferent": {
        "prompt": "Quina informació nova vol apuntar l’Aina al final?",
        "options": [
          "El nom de qui havia dibuixat el balcó.",
          "Les mides de la porta que ha fotografiat.",
          "Un record de l’avi esperant el timbre a la porta.",
          "La data de les obres a l’interior."
        ],
        "correct": "c",
        "explanation": "Vol conservar un record personal de l’avi que no apareix al plànol."
      }
    },
    "openOnly": {}
  },
  "ca-S044": {
    "questions": {
      "cent": {
        "prompt": "Què compta la xifra de cent de la pantalla?",
        "options": [
          "Les persones que han enviat comentaris.",
          "Les persones que han escoltat el programa.",
          "Les reproduccions que han arribat al final.",
          "Les reproduccions que s’han iniciat."
        ],
        "correct": "d",
        "explanation": "A la pantalla hi diu «cent reproduccions iniciades»."
      },
      "exemple": {
        "prompt": "Quin exemple fa servir en Biel per qüestionar el primer titular?",
        "options": [
          "Ha escoltat tres programes amb la Nora.",
          "Ha posat el programa tres vegades per comprovar el principi.",
          "Ha rebut tres comentaris de la mateixa persona.",
          "Ha gravat tres vegades la mateixa conversa."
        ],
        "correct": "b",
        "explanation": "Ell mateix ha iniciat diverses reproduccions."
      },
      "nota": {
        "prompt": "Què aclareix la nota de la Mireia?",
        "options": [
          "Una persona pot iniciar diverses reproduccions.",
          "Cada persona només pot iniciar una reproducció.",
          "Cada comentari compta com una reproducció.",
          "Només es compten les escoltes completes."
        ],
        "correct": "a",
        "explanation": "La nota diu que cada inici pot comptar, encara que sigui de la mateixa persona."
      },
      "seixanta": {
        "prompt": "Què poden afirmar sobre les seixanta reproduccions completes?",
        "options": [
          "Que són seixanta persones, perquè en Biel només va provar el principi.",
          "Que són seixanta persones, perquè els inicis repetits s’eliminen.",
          "Que poden repetir oients, perquè en Biel també l’ha acabat més d’un cop.",
          "Que corresponen a seixanta persones, perquè han arribat al final."
        ],
        "correct": "c",
        "explanation": "Les reproduccions completes tampoc no equivalen a persones diferents; en Biel n’és un exemple."
      },
      "comentaris": {
        "prompt": "De qui són els sis comentaris rebuts?",
        "options": [
          "D’alumnes de la classe del costat que l’acaben de sentir.",
          "De sis persones triades entre totes les reproduccions.",
          "De companys del grup que van ajudar a provar el micròfon.",
          "De familiars de la Nora que coneixen la conversa."
        ],
        "correct": "c",
        "explanation": "Els sis comentaristes són del grup i havien ajudat a fer la prova."
      },
      "tothom": {
        "prompt": "Per què volen oients de la classe del costat?",
        "options": [
          "Perquè necessiten arribar a seixanta escoltes completes.",
          "Per saber si s’entén sense conèixer la conversa prèviament.",
          "Perquè aquests ja havien provat el micròfon.",
          "Per comprovar qui ha repetit més vegades el programa."
        ],
        "correct": "b",
        "explanation": "Ells ja se saben la conversa i volen el retorn d’algú que no la conegui."
      },
      "preguntes": {
        "prompt": "Quina parella d’aspectes volen preguntar als nous oients?",
        "options": [
          "Quin micròfon prefereixen i qui el va preparar.",
          "Si se sent bé i quina part es fa llarga.",
          "Quants cops l’han posat i amb quin aparell.",
          "Si coneixen la Nora i qui els va enviar l’arxiu."
        ],
        "correct": "b",
        "explanation": "Volen saber si se sent bé, quina part es fa llarga i què no s’ha entès."
      },
      "presentacio": {
        "prompt": "Quin canvi essencial fa la Laia a la presentació?",
        "options": [
          "Passa de cent persones a cent reproduccions iniciades.",
          "Passa de cent inicis a cent escoltes completes.",
          "Passa de sis comentaris a seixanta comentaris.",
          "Passa de cent persones a seixanta persones."
        ],
        "correct": "a",
        "explanation": "Ratlla la referència a persones i utilitza la dada que realment tenen."
      },
      "gravat": {
        "prompt": "En quin punt és la nova presentació al final?",
        "options": [
          "Ja l’han gravada i esperen els comentaris del costat.",
          "Encara han d’entrevistar la Nora abans d’escriure-la.",
          "Encara l’han de llegir en veu alta i preparar el micròfon.",
          "Ja l’han publicada i la Mireia n’ha fet el recompte."
        ],
        "correct": "c",
        "explanation": "Queden la lectura en veu alta, els retocs i la preparació del micròfon."
      }
    },
    "openOnly": {}
  },
  "ca-S045": {
    "questions": {
      "lloc": {
        "prompt": "On feien aquell cinema a l’estiu?",
        "options": [
          "Al jardí de casa.",
          "Dins del centre cívic.",
          "Al pati de l’escola.",
          "A la plaça."
        ],
        "correct": "d",
        "explanation": "A l’estiu posaven una pantalla a la plaça."
      },
      "portar": {
        "prompt": "Què havia de portar cadascú de casa?",
        "options": [
          "Una pantalla.",
          "Una cinta.",
          "Un coixí.",
          "Una cadira."
        ],
        "correct": "d",
        "explanation": "Cadascú portava la seva cadira."
      },
      "marca": {
        "prompt": "Per què el pare lliga una cinta a la cadira?",
        "options": [
          "Per portar-la sense cansar-se.",
          "Per lligar-la a la del costat.",
          "Per reconèixer-la entre les altres.",
          "Per indicar on s’hauran d’asseure."
        ],
        "correct": "c",
        "explanation": "La cinta permet distingir-la de les cadires semblants."
      },
      "paret": {
        "prompt": "Per què en Ferran tria primer un lloc al costat de la paret?",
        "options": [
          "Perquè s’hi pot recolzar.",
          "Perquè allà hi ha més claror.",
          "Per guardar millor les tres cadires.",
          "Per quedar més a prop del pare."
        ],
        "correct": "a",
        "explanation": "En Ferran diu que es podia recolzar a la paret."
      },
      "problema": {
        "prompt": "Què els impedeix veure bé la pel·lícula?",
        "options": [
          "Les cadires que porten de casa.",
          "La claror que encara hi ha.",
          "La paret que els queda al costat.",
          "Un home alt assegut al davant."
        ],
        "correct": "d",
        "explanation": "El cap de l’home alt els tapa part de la pantalla."
      },
      "solucio": {
        "prompt": "Com aconsegueixen veure la pantalla sencera?",
        "options": [
          "Posen les cadires darrere del pare.",
          "Mouen les cadires cap a un espai lateral buit.",
          "Esperen que l’home canviï de lloc.",
          "S’asseuen més a prop de la paret."
        ],
        "correct": "b",
        "explanation": "Es traslladen a un costat, on hi ha un espai buit."
      },
      "tornada": {
        "prompt": "Quina ajuda ofereix la cosina a la tornada?",
        "options": [
          "Lligar una cinta nova al respatller.",
          "Guardar les cadires mentre ell saluda.",
          "Portar la cadira d’en Ferran una estona.",
          "Anar a buscar la cadira del pare."
        ],
        "correct": "c",
        "explanation": "La cosina insisteix a portar-li la cadira una estona."
      }
    },
    "openOnly": {}
  },
  "ca-S045D": {
    "questions": {
      "lloc": {
        "prompt": "On feien aquell cinema a l’estiu?",
        "options": [
          "Dins del centre cívic.",
          "Al pati de l’escola.",
          "A la plaça.",
          "Al jardí de casa."
        ],
        "correct": "c",
        "explanation": "A l’estiu posaven una pantalla a la plaça."
      },
      "portar": {
        "prompt": "Què havia de portar cadascú de casa?",
        "options": [
          "Un coixí.",
          "Una pantalla.",
          "Una cadira.",
          "Una cinta."
        ],
        "correct": "c",
        "explanation": "Cadascú portava la seva cadira."
      },
      "marca": {
        "prompt": "Per què el pare lliga una cinta a la cadira?",
        "options": [
          "Per indicar on s’hauran d’asseure.",
          "Per lligar-la a la del costat.",
          "Per reconèixer-la entre les altres.",
          "Per portar-la sense cansar-se."
        ],
        "correct": "c",
        "explanation": "La cinta permet distingir-la de les cadires semblants."
      },
      "paret": {
        "prompt": "Per què en Ferran tria primer un lloc al costat de la paret?",
        "options": [
          "Perquè allà hi ha més claror.",
          "Per quedar més a prop del pare.",
          "Perquè s’hi pot recolzar.",
          "Per guardar millor les tres cadires."
        ],
        "correct": "c",
        "explanation": "En Ferran diu que es podia recolzar a la paret."
      },
      "problema": {
        "prompt": "Què els impedeix veure bé la pel·lícula?",
        "options": [
          "Un home alt assegut al davant.",
          "La paret que els queda al costat.",
          "La claror que encara hi ha.",
          "Les cadires que porten de casa."
        ],
        "correct": "a",
        "explanation": "El cap de l’home alt els tapa part de la pantalla."
      },
      "solucio": {
        "prompt": "Com aconsegueixen veure la pantalla sencera?",
        "options": [
          "Posen les cadires darrere del pare.",
          "Esperen que l’home canviï de lloc.",
          "Mouen les cadires cap a un espai lateral buit.",
          "S’asseuen més a prop de la paret."
        ],
        "correct": "c",
        "explanation": "Es traslladen a un costat, on hi ha un espai buit."
      },
      "tornada": {
        "prompt": "Quina ajuda ofereix la cosina a la tornada?",
        "options": [
          "Anar a buscar la cadira del pare.",
          "Portar la cadira d’en Ferran una estona.",
          "Lligar una cinta nova al respatller.",
          "Guardar les cadires mentre ell saluda."
        ],
        "correct": "b",
        "explanation": "La cosina insisteix a portar-li la cadira una estona."
      }
    },
    "openOnly": {}
  },
  "ca-S046": {
    "questions": {
      "regadora": {
        "prompt": "Què vol treure en Ferran del cobert?",
        "options": [
          "Un bol de farina.",
          "La regadora verda.",
          "Una eina de l’hort.",
          "Una escombra."
        ],
        "correct": "b",
        "explanation": "Vol regar i necessita la regadora verda."
      },
      "habitual": {
        "prompt": "On guarden habitualment la clau?",
        "options": [
          "En un ganxo al costat del calendari.",
          "Darrere de la porta del cobert.",
          "Sota la taula de la cuina.",
          "En una butxaca del vestit de l’àvia."
        ],
        "correct": "a",
        "explanation": "La clau penja d’un ganxo de la cuina, al costat del calendari."
      },
      "obrir": {
        "prompt": "Per què l’àvia havia obert el cobert aquell matí?",
        "options": [
          "Per agafar la regadora.",
          "Per treure’n una escombra.",
          "Per guardar-hi la farina.",
          "Per deixar-hi el davantal."
        ],
        "correct": "b",
        "explanation": "L’àvia recorda que havia anat a buscar una escombra."
      },
      "pany": {
        "prompt": "Què comproven quan van a la porta del cobert?",
        "options": [
          "Que és tancada i la clau és al pany.",
          "Que és oberta i la clau és al pany.",
          "Que és tancada i la clau no és al pany.",
          "Que és oberta i la clau és a terra."
        ],
        "correct": "c",
        "explanation": "Troben la porta tancada i la clau tampoc no s’ha quedat al pany."
      },
      "on": {
        "prompt": "On troben finalment la clau?",
        "options": [
          "Darrere del calendari de la cuina.",
          "A la butxaca del davantal de darrere la porta.",
          "Sota el bol de farina de la taula.",
          "A la butxaca del vestit de l’àvia."
        ],
        "correct": "b",
        "explanation": "L’àvia treu la clau de la butxaca del davantal."
      },
      "buit": {
        "prompt": "Per què les butxaques del vestit són buides tot i que l’àvia havia guardat la clau?",
        "options": [
          "Perquè l’havia guardada al davantal i se l’havia tret.",
          "Perquè se l’havia deixada dins del cobert.",
          "Perquè en Ferran ja l’havia tornada al ganxo.",
          "Perquè havia canviat de vestit després d’escombrar."
        ],
        "correct": "a",
        "explanation": "La clau era al davantal, una peça que l’àvia s’havia tret."
      },
      "pes": {
        "prompt": "Per què en Ferran omple la regadora només fins a la meitat?",
        "options": [
          "Perquè la regadora té una esquerda.",
          "Per deixar aigua per a les coques.",
          "Perquè plena del tot pesa massa.",
          "Perquè l’hort ja està tot regat."
        ],
        "correct": "c",
        "explanation": "Explica que plena del tot li pesava massa."
      }
    },
    "openOnly": {}
  },
  "ca-S046D": {
    "questions": {
      "regadora": {
        "prompt": "Què vol treure en Ferran del cobert?",
        "options": [
          "Una eina de l’hort.",
          "La regadora verda.",
          "Una escombra.",
          "Un bol de farina."
        ],
        "correct": "b",
        "explanation": "Vol regar i necessita la regadora verda."
      },
      "habitual": {
        "prompt": "On guarden habitualment la clau?",
        "options": [
          "En una butxaca del vestit de l’àvia.",
          "Sota la taula de la cuina.",
          "En un ganxo al costat del calendari.",
          "Darrere de la porta del cobert."
        ],
        "correct": "c",
        "explanation": "La clau penja d’un ganxo de la cuina, al costat del calendari."
      },
      "obrir": {
        "prompt": "Per què l’àvia havia obert el cobert aquell matí?",
        "options": [
          "Per treure’n una escombra.",
          "Per agafar la regadora.",
          "Per guardar-hi la farina.",
          "Per deixar-hi el davantal."
        ],
        "correct": "a",
        "explanation": "L’àvia recorda que havia anat a buscar una escombra."
      },
      "pany": {
        "prompt": "Què comproven quan van a la porta del cobert?",
        "options": [
          "Que és oberta i la clau és al pany.",
          "Que és tancada i la clau és al pany.",
          "Que és oberta i la clau és a terra.",
          "Que és tancada i la clau no és al pany."
        ],
        "correct": "d",
        "explanation": "Troben la porta tancada i la clau tampoc no s’ha quedat al pany."
      },
      "on": {
        "prompt": "On troben finalment la clau?",
        "options": [
          "Sota el bol de farina de la taula.",
          "A la butxaca del davantal de darrere la porta.",
          "Darrere del calendari de la cuina.",
          "A la butxaca del vestit de l’àvia."
        ],
        "correct": "b",
        "explanation": "L’àvia treu la clau de la butxaca del davantal."
      },
      "buit": {
        "prompt": "Per què les butxaques del vestit són buides tot i que l’àvia havia guardat la clau?",
        "options": [
          "Perquè se l’havia deixada dins del cobert.",
          "Perquè l’havia guardada al davantal i se l’havia tret.",
          "Perquè en Ferran ja l’havia tornada al ganxo.",
          "Perquè havia canviat de vestit després d’escombrar."
        ],
        "correct": "b",
        "explanation": "La clau era al davantal, una peça que l’àvia s’havia tret."
      },
      "pes": {
        "prompt": "Per què en Ferran omple la regadora només fins a la meitat?",
        "options": [
          "Perquè la regadora té una esquerda.",
          "Perquè l’hort ja està tot regat.",
          "Perquè plena del tot pesa massa.",
          "Per deixar aigua per a les coques."
        ],
        "correct": "c",
        "explanation": "Explica que plena del tot li pesava massa."
      }
    },
    "openOnly": {}
  },
  "ca-S047": {
    "questions": {
      "destinacio": {
        "prompt": "A qui van a veure en Ferran i el pare?",
        "options": [
          "La tieta.",
          "La mare.",
          "L’àvia.",
          "La cosina."
        ],
        "correct": "a",
        "explanation": "Viatgen per anar a casa de la tieta."
      },
      "capsa": {
        "prompt": "Qui havia posat la capsa a la maleta?",
        "options": [
          "El pare d’en Ferran.",
          "La mare d’en Ferran.",
          "En Ferran mateix.",
          "La tieta d’en Ferran."
        ],
        "correct": "b",
        "explanation": "La mare l’afegeix abans de tancar la maleta."
      },
      "imagina": {
        "prompt": "Què imagina en Ferran que s’ha trencat dins la capsa?",
        "options": [
          "Galetes.",
          "Botons.",
          "Una nina.",
          "La sivella."
        ],
        "correct": "a",
        "explanation": "Es passa el viatge imaginant galetes fetes miques."
      },
      "esperar": {
        "prompt": "Per què esperen a casa de la tieta per obrir la maleta?",
        "options": [
          "Perquè la maleta és al vagó del costat.",
          "Perquè el pare s’ha deixat la clau.",
          "Perquè la capsa costa de destapar.",
          "Perquè el passadís del tren és ple de gent."
        ],
        "correct": "d",
        "explanation": "Treuen la maleta de sota el seient però decideixen esperar pel passadís ple."
      },
      "so": {
        "prompt": "Què produeix realment el soroll?",
        "options": [
          "Els botons picant contra la llauna.",
          "El llibre fregant la tapa de la maleta.",
          "La sivella picant contra el seient.",
          "Les galetes trencades dins de la capsa."
        ],
        "correct": "a",
        "explanation": "Quan la capsa es mou, els botons piquen contra la llauna."
      },
      "ofici": {
        "prompt": "Per què la mare ha guardat els botons per a la tieta?",
        "options": [
          "Perquè els aprofiti cosint roba per a nines.",
          "Perquè els classifiqui abans de llençar-los.",
          "Perquè els canviï per un llibre de contes.",
          "Perquè arregli la sivella de la maleta."
        ],
        "correct": "a",
        "explanation": "La tieta cus roba per a nines i pot aprofitar els botons."
      },
      "blau": {
        "prompt": "Per què acaben triant dos botons blaus?",
        "options": [
          "Perquè el vestit en necessita dos i només hi ha un vermell.",
          "Perquè els dos vermells són massa grans per al vestit.",
          "Perquè la tieta havia reservat el vermell per a la maleta.",
          "Perquè el vestit necessita un botó i en sobren dos de blaus."
        ],
        "correct": "a",
        "explanation": "Només queda un botó vermell; el vestit en necessita dos i troben dos blaus iguals."
      }
    },
    "openOnly": {}
  },
  "ca-S048": {
    "questions": {
      "retorn": {
        "prompt": "A qui tornarà les caixes blaves en Pau?",
        "options": [
          "Als compradors.",
          "A la Laia.",
          "Al repartidor.",
          "A la Mireia."
        ],
        "correct": "c",
        "explanation": "El repartidor les recollirà amb la furgoneta."
      },
      "us": {
        "prompt": "Per a què tornaran a servir les caixes blaves?",
        "options": [
          "Per portar més fruita.",
          "Per guardar papers de la ràdio.",
          "Per recollir el cartró plegat.",
          "Per separar la fruita feta malbé."
        ],
        "correct": "a",
        "explanation": "El repartidor les farà servir per portar més fruita."
      },
      "pas": {
        "prompt": "Per què posa les caixes al carretó?",
        "options": [
          "Per deixar lliure el pas quan hi hagi compradors.",
          "Per tenir-les al costat de la fruita que ven.",
          "Per plegar-les abans de posar-les al contenidor.",
          "Perquè el repartidor també s’endugui el carretó."
        ],
        "correct": "a",
        "explanation": "Al costat del taulell quedarien al mig del pas quan atengués els compradors."
      },
      "primer": {
        "prompt": "Què fa abans de plegar una caixa de cartró?",
        "options": [
          "La buida i comprova que no hi queda res.",
          "La deixa sota el taulell.",
          "La posa al costat de les blaves.",
          "La carrega a la furgoneta."
        ],
        "correct": "a",
        "explanation": "Primer la buida del tot, perquè hi poden quedar papers o fruita."
      },
      "espai": {
        "prompt": "Per què plega les caixes de cartró?",
        "options": [
          "Per comprovar-ne les nanses.",
          "Perquè ocupin menys espai.",
          "Per portar-hi més fruita.",
          "Per distingir-les de les blaves."
        ],
        "correct": "b",
        "explanation": "Planes ocupen molt menys espai."
      },
      "nansa": {
        "prompt": "Per què deixa separada l’última caixa blava?",
        "options": [
          "Perquè encara té fruita petita al fons i l’ha de buidar.",
          "Perquè la Laia se l’endugui després de gravar l’entrevista.",
          "Per revisar amb el repartidor l’esquerda abans de carregar-la.",
          "Per plegar-la amb les de cartró abans de llençar-la."
        ],
        "correct": "c",
        "explanation": "Vol ensenyar al repartidor la possible esquerda de la nansa abans de posar-hi pes.",
        "evidence": [
          {
            "part": "nansa",
            "quote": "sembla una esquerda"
          },
          {
            "part": "apartada",
            "quote": "Deixa-la aquí, que la mirarem amb el repartidor. Si està trencada, quan hi posin pes es pot acabar d’obrir."
          }
        ]
      }
    },
    "openOnly": {}
  },
  "ca-S049": {
    "questions": {
      "habitual": {
        "prompt": "Al costat de quin establiment és normalment la parada?",
        "options": [
          "De la biblioteca.",
          "Del forn.",
          "De la botiga de bicicletes.",
          "Del centre cívic."
        ],
        "correct": "b",
        "explanation": "La Laia la busca al costat del forn, el lloc habitual."
      },
      "avui": {
        "prompt": "On ha posat avui la parada en Pau?",
        "options": [
          "Dins de la porta del pati.",
          "Al costat del forn.",
          "Davant de la porta del pati.",
          "Darrere de la furgoneta."
        ],
        "correct": "c",
        "explanation": "Avui és davant de la porta del pati."
      },
      "motiu": {
        "prompt": "Per què ha canviat de lloc?",
        "options": [
          "Perquè el repartidor ha canviat de ruta.",
          "Perquè el forn necessita posar-hi caixes.",
          "Perquè reparen unes rajoles que es movien.",
          "Perquè avui necessita una taula més gran."
        ],
        "correct": "c",
        "explanation": "Han de deixar buit aquell tros mentre arreglen les rajoles."
      },
      "quan": {
        "prompt": "Quan tornarà al lloc de sempre?",
        "options": [
          "La setmana que ve.",
          "Demà.",
          "Aquest migdia.",
          "Avui al vespre."
        ],
        "correct": "b",
        "explanation": "La taula és només per avui; demà torna al costat del forn."
      },
      "ajuda": {
        "prompt": "Quines dues ajudes té la gent per trobar-lo?",
        "options": [
          "El calendari del forn i les caixes del carretó.",
          "El cartell del lloc habitual i la gent del forn.",
          "El repartidor i un anunci dins de la ràdio.",
          "La cinta de les obres i les etiquetes de la fruita."
        ],
        "correct": "b",
        "explanation": "Hi ha un cartell amb la ubicació i una fletxa, i la gent del forn també ho sap."
      },
      "sota": {
        "prompt": "On guarda la fruita que no cap a la taula?",
        "options": [
          "A la furgoneta.",
          "Al taulell del forn.",
          "Darrere de la cinta.",
          "A les caixes de sota."
        ],
        "correct": "d",
        "explanation": "Reomple els espais amb la fruita de les caixes de sota."
      }
    },
    "openOnly": {}
  },
  "ca-S050": {
    "questions": {
      "encarrec": {
        "prompt": "Quina fruita ha anat a buscar la Laia?",
        "options": [
          "Taronges.",
          "Prunes.",
          "Peres.",
          "Pomes."
        ],
        "correct": "d",
        "explanation": "Porta l’encàrrec de pomes de la mare."
      },
      "safata": {
        "prompt": "Per què posa una safata a la balança en Pau?",
        "options": [
          "Per poder agafar les pomes amb una mà.",
          "Perquè la bossa es quedi a la parada.",
          "Perquè les pomes no rodolin.",
          "Per separar les pomes de cada encàrrec."
        ],
        "correct": "c",
        "explanation": "La safata evita que les pomes rodolin."
      },
      "numero": {
        "prompt": "Per què surt un número abans de posar-hi les pomes?",
        "options": [
          "Perquè en Pau hi ha deixat la bossa de roba.",
          "Perquè la balança compta les peces de fruita.",
          "Perquè la safata buida també pesa.",
          "Perquè hi queda el pes de l’última compra."
        ],
        "correct": "c",
        "explanation": "En treure la safata, la pantalla torna a zero: el número era el seu pes."
      },
      "boto": {
        "prompt": "Què fa la pantalla en prémer el botó amb la safata buida al damunt?",
        "options": [
          "Torna a zero.",
          "Suma el pes de la safata.",
          "Marca el pes de les pomes.",
          "Conserva el número anterior."
        ],
        "correct": "a",
        "explanation": "El botó posa a zero la balança amb la safata a sobre."
      },
      "ordre": {
        "prompt": "Què posa en Pau a la balança abans de prémer el botó?",
        "options": [
          "Una poma tota sola.",
          "Les pomes totes juntes.",
          "La safata buida.",
          "La bossa de roba."
        ],
        "correct": "c",
        "explanation": "L’ordre és safata buida, botó i fruita."
      },
      "final": {
        "prompt": "En quin recipient s’endú les pomes la Laia?",
        "options": [
          "En la safata de pesar.",
          "En una bossa del forn.",
          "En una caixa blava.",
          "En la seva bossa de roba."
        ],
        "correct": "d",
        "explanation": "La safata es queda a la parada i les pomes passen a la bossa de roba."
      }
    },
    "openOnly": {}
  },
  "ca-S051": {
    "questions": {
      "objecte": {
        "prompt": "Quin objecte antic preparen al començament?",
        "options": [
          "Una ràdio grossa.",
          "Un cartell de cinema.",
          "Una capsa per cosir.",
          "Una planxa petita."
        ],
        "correct": "a",
        "explanation": "Estan col·locant una ràdio grossa i el seu cartellet."
      },
      "costat": {
        "prompt": "On demana la Nora que es posi la Laia per fer la prova?",
        "options": [
          "A l’altra banda de la taula, com un visitant.",
          "Al costat de la Nora, darrere de la ràdio.",
          "A la porta, al costat del cartell gran.",
          "Ajupida, al mateix costat de la taula que la Nora."
        ],
        "correct": "a",
        "explanation": "Vol comprovar la lectura des de la posició del visitant."
      },
      "tapat": {
        "prompt": "Què tapa una part del primer cartellet?",
        "options": [
          "La ràdio.",
          "El full nou.",
          "El suport de cartró.",
          "El cartell de la paret."
        ],
        "correct": "a",
        "explanation": "Una part queda darrere de la ràdio."
      },
      "suport": {
        "prompt": "On posa la Nora el cartellet perquè es vegi sencer?",
        "options": [
          "A l’entrada, estirat a la mateixa taula.",
          "A la paret, al costat del cartell general.",
          "Davant de la ràdio, amb un suport baix inclinat.",
          "Darrere de la ràdio, amb un suport alt."
        ],
        "correct": "c",
        "explanation": "El suport baix de cartró el deixa inclinat cap a la Laia.",
        "evidence": [
          {
            "part": "davant",
            "quote": "El posaré davant de la ràdio, sobre aquest suport baix de cartró. Així el paper quedarà una mica inclinat cap a tu."
          }
        ]
      },
      "lletres": {
        "prompt": "Què canviarà del text després de moure el cartellet?",
        "options": [
          "Farà la lletra més gran.",
          "Hi substituirà la història per una fotografia.",
          "Hi traurà el nom de la ràdio.",
          "Hi afegirà tots els objectes de la mostra."
        ],
        "correct": "a",
        "explanation": "La Laia encara s’ha d’acostar per llegir les lletres de sota."
      },
      "paret": {
        "prompt": "Què presenta el cartell gran de la paret?",
        "options": [
          "La història de la família que va donar la ràdio.",
          "Només la ràdio i els partits que s’hi escoltaven.",
          "Tota la mostra de coses antigues de casa.",
          "Les instruccions per fer els suports de cartró."
        ],
        "correct": "c",
        "explanation": "És la presentació general, amb ràdio, planxa i capsa per cosir."
      },
      "repetir": {
        "prompt": "Quina prova ofereix repetir la Laia quan canviïn el text?",
        "options": [
          "Ajupir-se per veure si el suport aguanta.",
          "Posar-se darrere la ràdio per comparar-lo.",
          "Llegir-lo des de l’altra banda de la taula.",
          "Gravar el cartell des de la porta."
        ],
        "correct": "c",
        "explanation": "Tornarà a llegir-lo des de la posició del visitant."
      }
    },
    "openOnly": {}
  },
  "ca-S052": {
    "questions": {
      "principi": {
        "prompt": "Què pensa la Laia que és l’objecte vermell al principi?",
        "options": [
          "Una capsa per cosir.",
          "Un àlbum de fotografies.",
          "Un llibre.",
          "Una carpeta de cartes."
        ],
        "correct": "c",
        "explanation": "S’hi acosta pensant que és un llibre amb lletres daurades."
      },
      "real": {
        "prompt": "Què és en realitat l’objecte vermell?",
        "options": [
          "Un estoig de cartró amb fulls a dins.",
          "Un llibre de fotografies de la família.",
          "Una llibreta amb cobertes de fusta.",
          "Una capsa de fusta en forma de llibre."
        ],
        "correct": "d",
        "explanation": "Per on hi hauria els fulls és llis, i a dins hi ha un espai buit."
      },
      "tapa": {
        "prompt": "Per què l’obre la Nora en lloc de la Laia?",
        "options": [
          "Perquè la tapa s’enganxa una mica al final.",
          "Perquè la família li ha donat una clau.",
          "Perquè vol amagar les cartes de dins.",
          "Perquè la gravadora ja està enregistrant."
        ],
        "correct": "a",
        "explanation": "La Nora l’obre amb cura perquè la tapa s’enganxa."
      },
      "guardar": {
        "prompt": "Quines dues coses hi guardava la besàvia?",
        "options": [
          "Botons i una agulla per cosir.",
          "Llibres i un pot de tinta.",
          "Cartes i una ploma per escriure.",
          "Fotografies i un llapis."
        ],
        "correct": "c",
        "explanation": "La família explica que hi guardava cartes i una ploma."
      },
      "espais": {
        "prompt": "On anaven les cartes dins la capsa?",
        "options": [
          "Plegades a l’espai més ample.",
          "Estirades a l’espai estret.",
          "Enrotllades al costat de la ploma.",
          "Sota la tapa, enganxades."
        ],
        "correct": "a",
        "explanation": "L’espai estret era per a la ploma; les cartes anaven plegades al més ample."
      },
      "mostra": {
        "prompt": "Què podrà llegir la gent al costat de la capsa?",
        "options": [
          "Una còpia d’una carta fotografiada.",
          "Una carta nova escrita per la Nora.",
          "El llibre vermell que ha vist la Laia.",
          "L’original de totes les cartes de la capsa."
        ],
        "correct": "a",
        "explanation": "La família ha deixat fotografiar una carta per fer-ne una còpia."
      },
      "original": {
        "prompt": "Per què faran servir una còpia a la mostra?",
        "options": [
          "Perquè l’original és massa petit per llegir-lo.",
          "Perquè l’original es quedi a casa i la gent pugui llegir la carta.",
          "Perquè la família ha perdut la carta original.",
          "Perquè la capsa s’ha de poder tancar del tot."
        ],
        "correct": "b",
        "explanation": "La còpia permet mostrar el contingut mentre la família conserva l’original."
      }
    },
    "openOnly": {}
  },
  "ca-S053": {
    "questions": {
      "problema": {
        "prompt": "Per què la pista havia deixat d’obrir al vespre?",
        "options": [
          "Per una trobada diària dels equips del barri.",
          "Perquè els equips entrenaven fins a les nou.",
          "Perquè faltaven pilotes al taulell de l’entrada.",
          "Per una avaria que deixava part del terreny sense llum."
        ],
        "correct": "d",
        "explanation": "L’avaria havia deixat sense llum una part de la pista."
      },
      "dia": {
        "prompt": "A partir de quin dia tornarà a obrir al vespre?",
        "options": [
          "Dissabte.",
          "Dilluns.",
          "Divendres.",
          "Diumenge."
        ],
        "correct": "b",
        "explanation": "La reobertura del vespre comença dilluns."
      },
      "reserva": {
        "prompt": "Qui farà servir la pista de cinc a set entre setmana?",
        "options": [
          "Els ciclistes que entrin per la porta del parc.",
          "Els dos equips que hi tenen els entrenaments reservats.",
          "Les famílies que vagin a veure els partits del matí.",
          "Els grups que demanin primer una pilota al taulell."
        ],
        "correct": "b",
        "explanation": "La franja de cinc a set continua reservada als dos equips."
      },
      "lliure": {
        "prompt": "A quina hora comença l’ús lliure entre setmana?",
        "options": [
          "A les cinc.",
          "A les set.",
          "A les nou.",
          "A les quatre."
        ],
        "correct": "b",
        "explanation": "L’ús lliure és de set a nou entre setmana."
      },
      "coincidir": {
        "prompt": "Qui ajuda dos grups que volen ocupar tota la pista alhora?",
        "options": [
          "Les famílies dels bancs de fora.",
          "Els entrenadors dels dos equips.",
          "La gent que arregla la tanca.",
          "La persona encarregada."
        ],
        "correct": "d",
        "explanation": "La persona encarregada els ajuda a repartir-se el temps."
      },
      "acces": {
        "prompt": "Per on s’ha d’entrar i per què és tancada l’altra porta?",
        "options": [
          "Pel parc; al carrer de baix falta subjectar un tros de tanca.",
          "Pel carrer de baix; al parc reparen els llums.",
          "Pel carrer de baix; al parc hi aparquen les bicicletes.",
          "Pel parc; al carrer de baix continuen reparant els llums."
        ],
        "correct": "a",
        "explanation": "L’accés habitual serà pel parc mentre s’acaba de subjectar la tanca de l’altra porta."
      },
      "pilotes": {
        "prompt": "Què cal fer amb la pilota demanada al taulell abans de marxar?",
        "options": [
          "Tornar-la.",
          "Deixar-la als bancs.",
          "Guardar-la fins dilluns.",
          "Passar-la al grup següent."
        ],
        "correct": "a",
        "explanation": "Les pilotes prestades s’han de tornar abans de marxar."
      },
      "dissabte": {
        "prompt": "Quan podrà jugar lliurement dissabte un grup que volia anar-hi al matí?",
        "options": [
          "De quatre a vuit de la tarda, després de la trobada.",
          "De nou a dotze, abans de la trobada.",
          "De cinc a set, entre els entrenaments.",
          "De set a nou, quan acabin els partits."
        ],
        "correct": "a",
        "explanation": "Dissabte al matí hi ha equips; l’ús lliure serà de quatre a vuit de la tarda."
      }
    },
    "openOnly": {}
  },
  "ca-S054": {
    "questions": {
      "motiu": {
        "prompt": "Quin problema vol resoldre la finestra del forn?",
        "options": [
          "Que la gent deixi d’entrar per la porta principal.",
          "Que no hi hagi prou espai per preparar les bosses.",
          "Que les comandes per telèfon arribin massa tard.",
          "Que qui només recull faci cua amb qui encara ha de triar."
        ],
        "correct": "d",
        "explanation": "Vol separar la recollida ràpida de les compres que encara s’han de triar."
      },
      "qui": {
        "prompt": "Qui podrà anar directament a la finestra?",
        "options": [
          "Qui vulgui afegir pa a una compra.",
          "Qui hagi encarregat la compra el dia abans.",
          "Qui arribi quan el taulell ja sigui tancat.",
          "Qui encara hagi de triar els pastissos."
        ],
        "correct": "b",
        "explanation": "La finestra és per recollir els encàrrecs del dia abans."
      },
      "confusio": {
        "prompt": "Què va causar la confusió entre dues bosses?",
        "options": [
          "Dues clientes havien demanat exactament els mateixos pastissos.",
          "Una treballadora havia canviat els noms per cognoms.",
          "Dues clientes es deien Teresa i hi figurava el mateix nom.",
          "Les bosses s’havien deixat al taulell en lloc de la finestra."
        ],
        "correct": "c",
        "explanation": "Les bosses de dues persones anomenades Teresa portaven el mateix nom."
      },
      "canvi": {
        "prompt": "Quina dada afegiran en apuntar un encàrrec?",
        "options": [
          "El número de bossa.",
          "L’hora de tancament.",
          "El primer cognom.",
          "El dia de la prova."
        ],
        "correct": "c",
        "explanation": "Afegiran el primer cognom per distingir les persones amb el mateix nom."
      },
      "afegir": {
        "prompt": "Per on entrarà qui vulgui afegir alguna cosa a la compra?",
        "options": [
          "Per la porta del pati.",
          "Per la sortida del forn.",
          "Per la finestra lateral.",
          "Per la porta principal."
        ],
        "correct": "d",
        "explanation": "Les compres amb afegits es fan al taulell de sempre."
      },
      "espai": {
        "prompt": "Com es relaciona la mida de la finestra amb el servei?",
        "options": [
          "Permet exposar el pa perquè cadascú triï la compra.",
          "Només hi cap una bossa i serveix per cobrar totes les compres.",
          "Només hi cap una bossa i serveix per lliurar compres preparades.",
          "Permet guardar totes les bosses i preparar-hi encàrrecs nous."
        ],
        "correct": "c",
        "explanation": "L’espai petit s’ha pensat per a entregues ràpides de bosses preparades."
      },
      "prova": {
        "prompt": "Per què volen observar tres dissabtes més abans de valorar el canvi?",
        "options": [
          "Perquè el primer dissabte tots van recollir al mateix moment.",
          "Perquè l’espera va variar i volen saber quan s’acumula gent.",
          "Perquè la primera prova es va cancel·lar abans de començar.",
          "Perquè encara han de comprovar si la finestra es pot obrir."
        ],
        "correct": "b",
        "explanation": "La cua es va escurçar al principi, però més tard es va tornar a acumular gent."
      },
      "tard": {
        "prompt": "On es recollirà un encàrrec després de les dotze?",
        "options": [
          "A la finestra fins al tancament.",
          "Al taulell fins al tancament.",
          "A la finestra el dissabte següent.",
          "A la plaça davant del forn."
        ],
        "correct": "b",
        "explanation": "Després de les dotze, els encàrrecs pendents es recullen al taulell."
      }
    },
    "openOnly": {}
  },
  "ca-S055": {
    "questions": {
      "origen": {
        "prompt": "Quina troballa va originar la mostra?",
        "options": [
          "Uns programes de mà penjats en un menjador.",
          "Unes fotografies de sales dins de carpetes.",
          "Un tub amb cartells de pel·lícules damunt d’un armari.",
          "Uns cartells nous en una taula del centre cívic."
        ],
        "correct": "c",
        "explanation": "La família troba el tub de cartró amb els cartells de l’avi."
      },
      "guardar": {
        "prompt": "Per què l’avi d’aquella família havia pogut guardar els cartells?",
        "options": [
          "Perquè havia treballat en un dels cinemes.",
          "Perquè organitzava la mostra del centre cívic.",
          "Perquè els havia comprat a les altres famílies.",
          "Perquè els havia fotografiat a casa d’un veí."
        ],
        "correct": "a",
        "explanation": "Els havia guardat quan treballava en un cinema."
      },
      "despres": {
        "prompt": "Què passarà amb els originals prestats en acabar la mostra?",
        "options": [
          "Tornaran a les famílies que els han deixat.",
          "Es repartiran entre els visitants de dissabte.",
          "Aniran a casa del veí de la col·lecció.",
          "Es quedaran penjats al centre cívic."
        ],
        "correct": "a",
        "explanation": "Els originals són préstecs i es retornaran."
      },
      "copies": {
        "prompt": "Per què una paret mostrarà fotografies dels cartells?",
        "options": [
          "Perquè aquells originals s’han perdut.",
          "Perquè la família només va guardar els tubs.",
          "Perquè els cartells encara s’han de trobar.",
          "Perquè el veí vol conservar els originals a casa."
        ],
        "correct": "d",
        "explanation": "El veí ha permès fotografiar-los però prefereix que continuïn a casa seva."
      },
      "etiqueta": {
        "prompt": "Què indicarà el text al costat de cada fotografia?",
        "options": [
          "El preu del cartell i el nom del cinema actual.",
          "Que és una còpia i qui ha facilitat la fotografia.",
          "La data de la sessió i el nom de qui visitarà la mostra.",
          "Que és un original i qui el tornarà a emmarcar."
        ],
        "correct": "b",
        "explanation": "S’identificaran les còpies i la persona que ha facilitat la fotografia."
      },
      "programes": {
        "prompt": "Què eren els programes de mà?",
        "options": [
          "Entrades amb el seient de cada espectador.",
          "Cartells grossos penjats a les façanes.",
          "Carpetes amb fotografies de les sales.",
          "Fulls petits amb les pel·lícules de la setmana."
        ],
        "correct": "d",
        "explanation": "Eren fulls petits que anunciaven les pel·lícules setmanals."
      },
      "dates": {
        "prompt": "Com ajuden els programes de mà a situar un cartell?",
        "options": [
          "Permeten saber qui va guardar cada cartell a casa.",
          "Indiquen qui explicarà records a la sessió de dissabte.",
          "Permeten relacionar una data amb el títol del cartell.",
          "Indiquen quan es va fotografiar la col·lecció del veí."
        ],
        "correct": "c",
        "explanation": "Alguns programes porten data, que es pot relacionar amb els cartells que només tenen títol."
      },
      "versions": {
        "prompt": "Què farà l’equip davant dos records diferents del mateix detall?",
        "options": [
          "Els publicarà sense buscar cap altre document.",
          "Demanarà a les famílies que en votin un.",
          "Triarà el de qui havia anat més vegades al cinema.",
          "Escoltarà tots dos i buscarà fotografies o programes."
        ],
        "correct": "d",
        "explanation": "Vol contrastar els dos records amb documents que ajudin a aclarir el detall."
      },
      "participar": {
        "prompt": "Per què es demana hora per a la sessió de dissabte?",
        "options": [
          "Per repartir els originals abans d’obrir la mostra.",
          "Per escoltar cada participant amb calma.",
          "Per reservar els cartells que cadascú s’endurà.",
          "Per saber quines pel·lícules prefereix la gent."
        ],
        "correct": "b",
        "explanation": "L’organització vol donar temps a cada participant."
      }
    },
    "openOnly": {}
  },
  "ca-S056": {
    "questions": {
      "abans": {
        "prompt": "Quina dificultat tenien a la sala compartida?",
        "options": [
          "La botiga del costat n’ocupava totes les taules.",
          "Les famílies no podien explicar què havien provat.",
          "Havien de recollir-ho tot en acabar cada sessió.",
          "Les eines grans no hi passaven per la porta."
        ],
        "correct": "c",
        "explanation": "Havien de tornar les taules al lloc i guardar les eines, sense deixar feina preparada."
      },
      "taula": {
        "prompt": "Com han resolt que una taula no passi per la porta?",
        "options": [
          "Deixen les potes muntades i entren la taula per la botiga.",
          "Desmunten les potes i lliguen a la taula una bossa amb els cargols.",
          "Desmunten les potes i les deixen a la sala compartida.",
          "Porten una altra taula i guarden els cargols al centre cívic."
        ],
        "correct": "b",
        "explanation": "Les potes s’han desmuntat i els cargols viatgen lligats a la mateixa taula."
      },
      "conversa": {
        "prompt": "Què cal explicar abans de començar a revisar un objecte?",
        "options": [
          "Qui el farà servir i quin color prefereix.",
          "Quan es vol recollir i a qui es vol regalar.",
          "Quant va costar i on es va comprar.",
          "Què li ha passat i què ja s’ha provat de fer."
        ],
        "correct": "d",
        "explanation": "La conversa inicial aporta el problema i els intents previs de reparació."
      },
      "joguina": {
        "prompt": "Per què cal dir que la joguina falla després d’una estona?",
        "options": [
          "Perquè una prova curta pot amagar el problema.",
          "Perquè hauran de reservar-li dues tardes.",
          "Perquè només es revisen joguines que funcionen.",
          "Perquè la família ha de portar-ne una fotografia."
        ],
        "correct": "a",
        "explanation": "Quan la van provar un moment semblava que anava bé."
      },
      "franja": {
        "prompt": "Per què cal reservar una franja?",
        "options": [
          "Per repartir les eines entre els dos locals.",
          "Per evitar que tothom arribi alhora a les dues taules.",
          "Per acabar el trasllat abans de portar les caixes.",
          "Per donar prioritat als objectes més grossos."
        ],
        "correct": "b",
        "explanation": "Només hi ha dues taules i volen distribuir les arribades."
      },
      "grans": {
        "prompt": "Per què algunes eines grans es queden al centre cívic?",
        "options": [
          "Perquè encara falta muntar prestatgeries on ordenar-les.",
          "Perquè les persones apuntades ja les han reservat allà.",
          "Perquè cap taula no passa per la porta del local nou.",
          "Perquè són les eines triades per a la primera trobada."
        ],
        "correct": "a",
        "explanation": "La cambra del local nou encara no té l’espai de magatzem preparat."
      },
      "dues": {
        "prompt": "Què falta per obrir dues tardes al mes?",
        "options": [
          "Disposar de més taules i fixar dues tardes amb els voluntaris.",
          "Acabar el trasllat i concretar la capacitat i els voluntaris.",
          "Traslladar les caixes petites i anunciar de nou la primera sessió.",
          "Obrir les inscripcions i fixar el preu dels objectes."
        ],
        "correct": "b",
        "explanation": "Han d’acabar el trasllat i veure quantes persones poden atendre i quins voluntaris hi seran."
      },
      "inscripcio": {
        "prompt": "On es reserva lloc per a la primera trobada?",
        "options": [
          "A la cambra del local nou.",
          "A la botiga de bicicletes.",
          "A les dues taules de revisió.",
          "Al taulell del centre cívic."
        ],
        "correct": "d",
        "explanation": "La reserva es fa al taulell del centre cívic."
      }
    },
    "openOnly": {}
  },
  "ca-S057": {
    "questions": {
      "motiu": {
        "prompt": "Per què s’havia demanat acostar el bus al mercat?",
        "options": [
          "Per reduir el temps que el bus espera al mercat.",
          "Per portar els passatgers directament fins a l’estació.",
          "Per evitar caminar fins a la plaça carregant la compra.",
          "Per deixar lliure el carrer Major durant tota la setmana."
        ],
        "correct": "c",
        "explanation": "Les peticions venien de persones que feien el camí del mercat a la plaça amb bosses o carretó."
      },
      "dies": {
        "prompt": "Quan es prova el recorregut nou?",
        "options": [
          "Els dies feiners al matí.",
          "Cada dia mentre el mercat és obert.",
          "Els dissabtes al vespre.",
          "Els dissabtes al matí."
        ],
        "correct": "d",
        "explanation": "Els dies feiners es manté el recorregut directe pel carrer Major."
      },
      "parada": {
        "prompt": "On és la nova parada?",
        "options": [
          "Davant de l’associació de veïns.",
          "Davant de l’entrada coberta del mercat.",
          "A la sortida de l’estació de tren.",
          "A l’entrada del carrer de la Riera."
        ],
        "correct": "b",
        "explanation": "L’espai preparat per pujar i baixar és davant de l’entrada coberta del mercat."
      },
      "retard": {
        "prompt": "Què va allargar l’aturada de la primera prova?",
        "options": [
          "Descarregar la compra i buscar els horaris de l’estació.",
          "Explicar el desviament i repartir els fulls nous.",
          "Esperar els viatgers que pujaven al carrer de la Riera.",
          "Col·locar-se els passatgers i plegar dos carretons per deixar pas."
        ],
        "correct": "d",
        "explanation": "El conductor va esperar que tothom es col·loqués; dues persones van plegar els carretons."
      },
      "ajust": {
        "prompt": "Quin canvi faran per mantenir l’arribada a la plaça?",
        "options": [
          "Sortir del barri de Dalt cinc minuts abans.",
          "Sortir del mercat cinc minuts després.",
          "Retardar cinc minuts l’obertura del mercat.",
          "Fer esperar cinc minuts el bus de l’estació."
        ],
        "correct": "a",
        "explanation": "Avançaran cinc minuts la sortida del barri de Dalt."
      },
      "enllac": {
        "prompt": "Per què l’hora d’arribada és especialment important per a alguns viatgers?",
        "options": [
          "Perquè el mercat tanca abans que arribi l’autobús.",
          "Perquè volen trobar obert el punt d’informació.",
          "Perquè han de plegar els carretons abans de baixar.",
          "Perquè han d’agafar un altre bus cap a l’estació."
        ],
        "correct": "d",
        "explanation": "Alguns passatgers fan un enllaç a la plaça per continuar cap a l’estació."
      },
      "dos": {
        "prompt": "Quina parella recull un avantatge i un problema observats?",
        "options": [
          "Menys espera al mercat; més camí amb el carretó.",
          "Arribar abans a la plaça; trobar tancada l’estació.",
          "Pujar al carrer de la Riera; quedar-se sense lloc per a les bosses.",
          "Pujar al costat del mercat; perdre un enllaç pel retard."
        ],
        "correct": "d",
        "explanation": "Una veïna evita arrossegar el carretó fins a la plaça; un altre passatger perd l’enllaç."
      },
      "error": {
        "prompt": "Per què una persona va esperar al carrer de la Riera?",
        "options": [
          "Perquè havia vist passar el bus en una prova i va creure que s’hi aturaria.",
          "Perquè el cartell de la parada hi anunciava el nou horari.",
          "Perquè el conductor li havia dit que hi pujaria.",
          "Perquè els fulls indicaven que el mercat ja era tancat."
        ],
        "correct": "a",
        "explanation": "Havia vist el bus passant per aquell carrer durant una prova sense passatgers."
      },
      "full": {
        "prompt": "Quina informació del full distingirà els dos tipus de viatges?",
        "options": [
          "Quins passen pel mercat i quins van directament a la plaça.",
          "Quants carretons hi caben i quantes bosses porta cada persona.",
          "Quins conductors coneixen el barri i quins coneixen l’estació.",
          "Quants minuts triga cada passatger a arribar al mercat."
        ],
        "correct": "a",
        "explanation": "Hi constaran els viatges de dissabte que fan la volta i els directes quan el mercat és tancat."
      }
    },
    "openOnly": {}
  },
  "ca-S058": {
    "questions": {
      "acte": {
        "prompt": "Per a quina activitat preparen la pancarta?",
        "options": [
          "Per al concert de divendres.",
          "Per a una festa de la biblioteca.",
          "Per a la mostra de treballs de cinquè.",
          "Per al taller de titelles."
        ],
        "correct": "c",
        "explanation": "La pancarta diu «Mostra de cinquè» i exposaran els treballs de classe."
      },
      "mirar": {
        "prompt": "Per què la Laia surt al passadís?",
        "options": [
          "Per comprovar si la porta és prou ampla.",
          "Per veure com queda la pancarta des de fora.",
          "Per buscar la invitació d’una altra classe.",
          "Per portar els dibuixos a l’aula del costat."
        ],
        "correct": "b",
        "explanation": "Vol mirar-la de lluny i mentre s’acosta a l’aula."
      },
      "numero": {
        "prompt": "Què tapa la primera col·locació de la pancarta?",
        "options": [
          "La fletxa del passadís.",
          "El número de l’aula.",
          "Les lletres del mig.",
          "El títol de la mostra."
        ],
        "correct": "b",
        "explanation": "El paper cobreix el número de l’aula."
      },
      "invitacio": {
        "prompt": "Per què cal que es vegi el número?",
        "options": [
          "Perquè indica quants treballs exposarà cada classe.",
          "Perquè en Biel ha de saber on penjar els dibuixos.",
          "Perquè la invitació diu que cal buscar l’aula set.",
          "Perquè indica a quina hora comença la mostra."
        ],
        "correct": "c",
        "explanation": "La gent d’altres classes buscarà el número que han escrit a la invitació."
      },
      "porta": {
        "prompt": "Quin inconvenient tindria posar-la a mitja porta?",
        "options": [
          "Quedaria massa alta per llegir-la des de fora.",
          "Taparia tota la paret buida del costat.",
          "No es podrien retallar les puntes sobrants.",
          "Es mouria en obrir i es podria veure només pel darrere."
        ],
        "correct": "d",
        "explanation": "La pancarta marxaria amb la porta quan entrés gent."
      },
      "paret": {
        "prompt": "Quin lloc proposa en Biel després?",
        "options": [
          "La paret buida al costat, abans de la porta.",
          "El passadís davant de la biblioteca.",
          "El fons de l’aula, damunt de les taules.",
          "La part interior de la porta d’entrada."
        ],
        "correct": "a",
        "explanation": "Proposa el tros de paret buit que hi ha abans de la porta."
      },
      "abans": {
        "prompt": "Què faran abans de retallar el paper?",
        "options": [
          "Penjar tots els dibuixos.",
          "Mesurar-lo amb la paret.",
          "Enganxar-hi la fletxa petita.",
          "Escriure-hi el número de l’aula."
        ],
        "correct": "b",
        "explanation": "Volen comprovar que hi càpiga abans de retallar les puntes."
      },
      "prova": {
        "prompt": "Com provaran la nova posició abans d’enganxar-ho tot?",
        "options": [
          "Deixant-la sobre la taula i mirant-la des de l’aula.",
          "Enganxant-la primer del tot i mirant-la després des de fora.",
          "Amb dos trossets de cinta i mirant-ho des de fora.",
          "Amb una tira llarga de cinta i mirant-ho només des de dins."
        ],
        "correct": "c",
        "explanation": "En Biel agafa dos trossets de cinta i vol sortir a mirar la prova."
      }
    },
    "openOnly": {}
  },
  "ca-S059": {
    "questions": {
      "motiu": {
        "prompt": "Per què fan una partida abans de la festa?",
        "options": [
          "Per triar un premi entre tots els jugadors.",
          "Per provar el joc i recordar com funciona.",
          "Per decidir qui durà les taules a terra.",
          "Per ensenyar les respostes als convidats."
        ],
        "correct": "b",
        "explanation": "Volen comprovar el joc que han inventat abans de la festa."
      },
      "cartes": {
        "prompt": "Per què separen les cartes noves de les utilitzades?",
        "options": [
          "Per evitar repetir una pregunta.",
          "Per deixar lloc a l’arbre de cartró.",
          "Per repartir-les segons el color del tauler.",
          "Perquè cada jugador en porti una pila."
        ],
        "correct": "a",
        "explanation": "Si les amunteguen, poden agafar la mateixa dues vegades."
      },
      "espai": {
        "prompt": "Quin problema veu en Biel per a quatre jugadors?",
        "options": [
          "Falta lloc per a les mans i costa arribar a les files.",
          "La capsa es tanca abans d’acabar la partida.",
          "Les cartes tenen les preguntes massa petites.",
          "L’arbre tapa totes les respostes de les cartes."
        ],
        "correct": "a",
        "explanation": "Ell ja ocupa una fila amb el colze i els de l’altra banda hauran d’estirar molt el braç."
      },
      "terra": {
        "prompt": "Per què la Laia descarta jugar a terra durant la festa?",
        "options": [
          "Les cartes quedarien massa lluny dels jugadors i costaria llegir-les.",
          "El tauler no quedaria prou pla i les fitxes caurien al costat.",
          "No podrien separar les cartes noves de les que ja han fet servir.",
          "Farien nosa a qui passa i les cartes petites s’escamparien."
        ],
        "correct": "d",
        "explanation": "A la festa hi haurà gent passant i les cartes petites s’escampen fàcilment."
      },
      "solucio": {
        "prompt": "Quin canvi fan amb les taules?",
        "options": [
          "N’ajunten dues d’iguals amb el tauler al mig.",
          "N’afegeixen una al costat per deixar-hi només les cartes.",
          "N’aparten una per seure tots a terra.",
          "Les separen i posen cartes a cadascuna."
        ],
        "correct": "a",
        "explanation": "Col·loquen les dues taules una al costat de l’altra."
      },
      "arbre": {
        "prompt": "Per què poden retirar l’arbre sense canviar el joc?",
        "options": [
          "Perquè només decora i les caselles són al tauler.",
          "Perquè només serveix per a la primera partida.",
          "Perquè ja no han de fer servir cartes.",
          "Perquè cada jugador en portarà un altre."
        ],
        "correct": "a",
        "explanation": "L’arbre és decoratiu; les caselles ja estan dibuixades."
      },
      "finestra": {
        "prompt": "Per què prefereixen deixar l’arbre a la finestra?",
        "options": [
          "Perquè així els jugadors no veuen les respostes.",
          "Perquè s’hi llegeixen millor les preguntes.",
          "Perquè a la cadira hi ha el tauler nou.",
          "Perquè a la cadira el podrien aixafar."
        ],
        "correct": "d",
        "explanation": "La Laia tem que acabin aixafant l’arbre si el deixen a la cadira."
      },
      "mes": {
        "prompt": "Què falta provar després de jugar tots dos?",
        "options": [
          "El joc a terra amb les cartes noves.",
          "La mateixa banda amb una sola taula.",
          "La banda buida amb dos jugadors més.",
          "L’arbre dret al costat de la capsa."
        ],
        "correct": "c",
        "explanation": "Volen quatre jugadors per comprovar com es juga des de l’altra banda."
      }
    },
    "openOnly": {}
  },
  "ca-S060": {
    "questions": {
      "problema": {
        "prompt": "Què detecta la Laia en escoltar la gravació?",
        "options": [
          "Un tros de silenci al començament.",
          "Un soroll que tapa el final d’una resposta.",
          "Una veu que sona massa lluny tota l’estona.",
          "Una pregunta repetida dues vegades."
        ],
        "correct": "b",
        "explanation": "El soroll gairebé no deixa sentir l’última paraula."
      },
      "causa": {
        "prompt": "Quin objecte creuen que causa el soroll?",
        "options": [
          "La carpeta de plàstic d’en Biel.",
          "La cadira de la Laia.",
          "El botó de la gravadora.",
          "La bossa de la senyora entrevistada."
        ],
        "correct": "a",
        "explanation": "El fregadís coincideix amb la carpeta on en Biel guarda els fulls."
      },
      "prop": {
        "prompt": "Per què el fregadís quedava tan marcat?",
        "options": [
          "Perquè la senyora parlava sempre molt fluix.",
          "Perquè la carpeta era enganxada a la gravadora.",
          "Perquè repetien cada pregunta més d’un cop.",
          "Perquè la carpeta era darrere la cadira."
        ],
        "correct": "b",
        "explanation": "La carpeta estava molt a prop del micròfon de la gravadora."
      },
      "moment": {
        "prompt": "Quan apareixia sobretot el soroll?",
        "options": [
          "Quan la senyora explicava la història de la botiga.",
          "Quan la Laia començava la seva part de l’entrevista.",
          "Quan tots tres esperaven abans de començar a gravar.",
          "Quan en Biel movia fulls per preparar la pregunta següent."
        ],
        "correct": "d",
        "explanation": "De vegades en Biel preparava el full següent abans que acabés la resposta."
      },
      "comprovar": {
        "prompt": "Com comproven l’abast del problema?",
        "options": [
          "Demanen a l’entrevistada quines paraules faltaven.",
          "Escolten fragments per localitzar on hi ha soroll.",
          "Tornen a fer sencera la conversa sense carpeta.",
          "Comparen el text escrit amb les preguntes noves."
        ],
        "correct": "b",
        "explanation": "Van passant trossets i comparen passatges amb soroll i sense."
      },
      "quant": {
        "prompt": "Quantes respostes volen tornar a gravar?",
        "options": [
          "Una.",
          "Dues.",
          "Tres.",
          "Quatre."
        ],
        "correct": "b",
        "explanation": "Hi ha dues respostes on es perd una paraula important."
      },
      "pregunta": {
        "prompt": "Per què tornaran a dir també la pregunta?",
        "options": [
          "Per comprovar si en Biel encara recorda el text.",
          "Per donar context a la persona entrevistada.",
          "Per substituir totes les preguntes de l’entrevista.",
          "Per evitar haver de deixar silenci al voltant."
        ],
        "correct": "b",
        "explanation": "Així la senyora sabrà de què parlaven en aquella resposta."
      },
      "silenci": {
        "prompt": "Per què deixaran silenci abans i després de les respostes noves?",
        "options": [
          "Per escoltar si encara queda gent a la botiga.",
          "Perquè la gravadora es pugui apagar sola.",
          "Perquè en Biel escrigui les respostes a la carpeta.",
          "Per tenir marge per ajuntar els fragments."
        ],
        "correct": "d",
        "explanation": "El marge de silenci facilitarà posar els fragments al muntatge."
      },
      "evitar": {
        "prompt": "Quins canvis farà en Biel per evitar el fregadís?",
        "options": [
          "Deixarà la gravadora a la cadira i guardarà els fulls després de cada pregunta.",
          "Posarà els fulls a la cadira i els girarà quan acabin de parlar.",
          "Posarà la carpeta davant del micro i traurà els fulls més lentament.",
          "Deixarà els fulls a la taula i els girarà durant les respostes."
        ],
        "correct": "b",
        "explanation": "Allunya els fulls i n’ajorna el moviment fins que s’acabi la parla."
      }
    },
    "openOnly": {}
  },
  "ca-S061": {
    "questions": {
      "inici": {
        "prompt": "Amb quina escena començava el primer muntatge?",
        "options": [
          "La Laia ensenyant les gotes de la sabata al portal.",
          "La Laia caminant pel carrer amb una compra.",
          "La Laia entrant de puntetes i deixant una sabata al diari.",
          "La Laia ficant el peu dins del bassal."
        ],
        "correct": "c",
        "explanation": "En Biel havia començat amb l’escena del menjador."
      },
      "confusio": {
        "prompt": "Què podria pensar qui no ha vist la gravació del bassal?",
        "options": [
          "Que la sabata és al menjador perquè és nova.",
          "Que la Laia encara ha de sortir a comprar.",
          "Que la sabata és trencada, perquè encara no sap què ha passat.",
          "Que en Biel ha posat massa estona l’escena del carrer."
        ],
        "correct": "c",
        "explanation": "Sense la causa prèvia, l’espectador podria atribuir la sabata fora del peu a un altre problema."
      },
      "salt": {
        "prompt": "Què fa estrany l’ordre del primer muntatge?",
        "options": [
          "Passa del bassal al portal, tot i que les gotes es veuen més tard.",
          "Passa del portal al menjador mantenint la mateixa sabata mullada.",
          "Passa del carrer al menjador després d’haver-se tret una sabata.",
          "Passa del menjador al carrer amb dues sabates, tot i que el bassal era anterior."
        ],
        "correct": "d",
        "explanation": "El muntatge posa després un fet anterior sense fer clar el salt temporal."
      },
      "portal": {
        "prompt": "Quina pista aporta l’escena del portal?",
        "options": [
          "La sabata deixa gotes i mostra que hi ha entrat aigua.",
          "La moto esquitxa la Laia amb l’aigua del bassal.",
          "El diari ja és a terra per assecar la sabata.",
          "La Laia porta una compra que s’ha mullat."
        ],
        "correct": "a",
        "explanation": "Les gotes permeten entendre millor per què després es treu la sabata."
      },
      "descart": {
        "prompt": "Per què en Biel havia tret inicialment l’escena del portal?",
        "options": [
          "Perquè al portal encara duia dues sabates seques.",
          "Perquè la cara de la Laia quedava massa lluny.",
          "Perquè la Laia explicava massa coses.",
          "Perquè s’hi sentia una moto molt forta."
        ],
        "correct": "d",
        "explanation": "El soroll de la moto era el motiu del descart."
      },
      "so": {
        "prompt": "Com proposa la Laia conservar les imatges del portal?",
        "options": [
          "Deixant la moto i augmentant el volum de la seva veu.",
          "Repetint la frase del principi per sobre de la moto.",
          "Traient la moto i posant-hi el fons de carrer més baix ja gravat.",
          "Tallant les gotes i deixant només la cara."
        ],
        "correct": "c",
        "explanation": "Ella no hi parla i poden substituir aquell so pel fons de carrer que ja tenen."
      },
      "ordre": {
        "prompt": "Quin ordre volen donar a les quatre escenes?",
        "options": [
          "Sabata al portal, peu a l’aigua, camí al bassal, menjador.",
          "Camí al bassal, menjador, peu a l’aigua, sabata al portal.",
          "Menjador, camí al bassal, sabata al portal, peu a l’aigua.",
          "Camí al bassal, peu a l’aigua, sabata al portal, menjador."
        ],
        "correct": "d",
        "explanation": "El nou ordre segueix la causa i les conseqüències del que ha passat."
      },
      "espectador": {
        "prompt": "Com comprovaran si s’entén el muntatge nou?",
        "options": [
          "L’explicaran mentre algú de classe el mira.",
          "Ensenyaran el bassal i explicaran després què falta.",
          "El mostraran a algú nou en silenci i li preguntaran per la sabata.",
          "El miraran tots dos i repetiran les quatre escenes."
        ],
        "correct": "c",
        "explanation": "Volen un espectador que no l’hagi vist i una resposta sense explicacions simultànies."
      }
    },
    "openOnly": {}
  },
  "ca-S062": {
    "questions": {
      "dubte": {
        "prompt": "Què fa dubtar la Laia de l’hora del concert?",
        "options": [
          "Una foto diu les sis i ella tenia apuntat dos quarts de set.",
          "El grup de dansa li diu que divendres no hi haurà sala.",
          "La Mireia li canvia l’hora mentre en Biel recull cables.",
          "El cartell nou diu un quart de set i el vell diu dos quarts."
        ],
        "correct": "a",
        "explanation": "La foto contradiu l’hora que ella i en Biel tenien apuntada."
      },
      "canvi": {
        "prompt": "Per què van retardar el concert?",
        "options": [
          "Perquè la sala encara estaria ocupada per l’assaig de dansa.",
          "Perquè volien esperar la gent de la biblioteca.",
          "Perquè calia imprimir els nous cartells.",
          "Perquè faltaven cadires per a les famílies."
        ],
        "correct": "a",
        "explanation": "Van adaptar l’hora a l’assaig del grup de dansa."
      },
      "pista": {
        "prompt": "Quin detall situa el cartell vell de la foto?",
        "options": [
          "El nom nou del grup de dansa.",
          "El número de l’aula de la Mireia.",
          "La carpeta que surt al costat del cartell.",
          "La porta verda del passadís de la biblioteca."
        ],
        "correct": "d",
        "explanation": "En Biel reconeix el passadís de la biblioteca per la porta verda."
      },
      "nou": {
        "prompt": "A més de l’hora, què han afegit al cartell nou?",
        "options": [
          "La fotografia de la porta verda.",
          "El nom de qui ha fet la captura.",
          "El nom del grup de dansa.",
          "L’hora confirmada d’obrir portes."
        ],
        "correct": "c",
        "explanation": "Han convidat el grup de dansa a quedar-se i hi han afegit el nom."
      },
      "rebut": {
        "prompt": "Com poden acabar de rebre una foto amb l’hora antiga?",
        "options": [
          "Perquè el concert ha tornat a canviar d’hora aquest matí.",
          "Perquè en Biel ha guardat l’hora d’obrir en lloc de la del concert.",
          "Perquè el missatge és recent però mostra un cartell anterior al canvi.",
          "Perquè la foto és borrosa i han llegit malament l’hora."
        ],
        "correct": "c",
        "explanation": "El cartell de dilluns pot continuar penjat i circular en un missatge rebut ara."
      },
      "dues": {
        "prompt": "Quines dues hores volen distingir al missatge?",
        "options": [
          "L’hora d’entrada del públic i la de començar el concert.",
          "L’hora de classe de la Mireia i la de recollir cables.",
          "L’hora d’enviar el cartell i la de retirar el vell.",
          "L’hora d’assaig de dansa i la d’assaig del concert."
        ],
        "correct": "a",
        "explanation": "Volen informar separadament de l’obertura de portes i de l’inici del concert."
      },
      "confirmar": {
        "prompt": "Per què en Biel vol confirmar l’hora d’obrir portes?",
        "options": [
          "Perquè la foto de la porta verda es veu massa borrosa.",
          "Perquè el grup de dansa ha demanat arribar més tard.",
          "Perquè ho van parlar de pressa mentre recollia cables.",
          "Perquè al cartell vell hi consten dues hores diferents."
        ],
        "correct": "c",
        "explanation": "No va escoltar aquella dada amb tanta seguretat com la del començament del concert."
      },
      "cadena": {
        "prompt": "Què demana la Laia a qui li ha enviat la foto?",
        "options": [
          "Que passi el cartell nou a qui li havia enviat la foto vella.",
          "Que confirmi amb la Mireia l’hora del concert.",
          "Que torni a fotografiar el cartell vell amb més llum.",
          "Que demani als de dansa que canviïn l’assaig."
        ],
        "correct": "a",
        "explanation": "Vol fer arribar la correcció per la mateixa cadena de missatges."
      },
      "paper": {
        "prompt": "Per què també han de canviar el cartell de paper?",
        "options": [
          "Perquè el nou missatge només es pot enviar amb una foto.",
          "Perquè el vell continuaria donant una hora equivocada.",
          "Perquè necessiten una còpia per a la carpeta d’en Biel.",
          "Perquè el cartell vell té les lletres més borroses."
        ],
        "correct": "b",
        "explanation": "Mentre continuï penjat, el cartell antic pot tornar a generar la mateixa confusió."
      }
    },
    "openOnly": {}
  },
  "ca-S063": {
    "questions": {
      "primer": {
        "prompt": "Amb quina moneda s’enfonsa el primer pont?",
        "options": [
          "Amb la cinquena.",
          "Amb la segona.",
          "Amb la primera.",
          "Amb la tercera."
        ],
        "correct": "d",
        "explanation": "Aguantava dues monedes i s’enfonsa quan hi afegeixen la tercera."
      },
      "moure": {
        "prompt": "Per què en Biel havia separat els llibres?",
        "options": [
          "Per provar un full més llarg i més ample.",
          "Per guardar les monedes sota els llibres.",
          "Per fer lloc a la parella de l’altra taula.",
          "Per passar-hi la mà i recuperar la moneda."
        ],
        "correct": "d",
        "explanation": "Els ha mogut mentre buscava la moneda que havia caigut."
      },
      "ratlles": {
        "prompt": "Què permet tornar els llibres a la posició inicial?",
        "options": [
          "Els plecs nous del paper en acordió.",
          "Les ratlles dibuixades al full de sota.",
          "La vora de la taula on treballen.",
          "El plat on en Biel guarda les monedes."
        ],
        "correct": "b",
        "explanation": "Les marques indiquen on començava cada llibre."
      },
      "canvi": {
        "prompt": "Què canvien del paper a la segona prova?",
        "options": [
          "El retallen per fer-lo més curt.",
          "El mullen una mica abans de posar-lo.",
          "L’enganxen a les tapes dels llibres.",
          "El pleguen com un acordió."
        ],
        "correct": "d",
        "explanation": "Utilitzen un altre full igual, però plegat en acordió."
      },
      "igual": {
        "prompt": "Quina parella de coses mantenen igual entre les proves?",
        "options": [
          "L’amplada del paper i el nombre final de monedes.",
          "La posició de la cadira i les monedes que cauen.",
          "Els plecs del full i la separació dels llibres.",
          "La posició dels llibres i les monedes utilitzades."
        ],
        "correct": "d",
        "explanation": "Tornen els llibres a les ratlles i utilitzen les mateixes monedes."
      },
      "ordre": {
        "prompt": "Per què afegeixen les monedes d’una en una?",
        "options": [
          "Per evitar haver de tornar a plegar el full.",
          "Per veure en quin moment el paper comença a baixar.",
          "Per comparar el color de cadascuna amb el plat.",
          "Per repartir-les entre els dos llibres del pont."
        ],
        "correct": "b",
        "explanation": "Afegir-les gradualment permet observar quan comença a cedir el pont."
      },
      "cinquena": {
        "prompt": "Què passa amb la cinquena moneda de la segona prova?",
        "options": [
          "El pont queda més alt i en Biel mou els llibres.",
          "El full cau i les monedes roden a l’altra taula.",
          "El full aguanta igual i hi afegeixen totes les altres.",
          "El paper baixa una mica i torna dret en retirar-la."
        ],
        "correct": "d",
        "explanation": "En Biel retira la cinquena moneda i el pont recupera la posició."
      },
      "comparar": {
        "prompt": "Quina observació mostra que el pont plegat aguanta més?",
        "options": [
          "El primer s’enfonsa amb tres i el plegat encara aguanta quatre.",
          "El primer té llibres més junts i el plegat té monedes més lleugeres.",
          "El primer té el full llis i el plegat queda més estret.",
          "El primer aguanta quatre monedes i el plegat s’enfonsa amb tres."
        ],
        "correct": "a",
        "explanation": "La comparació de monedes sostingudes mostra que el segon aguanta més pes."
      }
    },
    "openOnly": {}
  },
  "ca-S064": {
    "questions": {
      "public": {
        "prompt": "A qui va adreçat l’anunci?",
        "options": [
          "Als visitants de la mostra de cartells.",
          "Als alumnes que assagen dansa.",
          "A les famílies de l’escola.",
          "Als voluntaris del taller del barri."
        ],
        "correct": "c",
        "explanation": "El penjaran al web perquè les famílies sàpiguen quan poden venir."
      },
      "taller": {
        "prompt": "Quin taller anuncien?",
        "options": [
          "Un taller de dibuix.",
          "Un taller de titelles.",
          "Un taller de ràdio.",
          "Un taller de costura."
        ],
        "correct": "b",
        "explanation": "En Biel anuncia un taller de titelles a la sala gran."
      },
      "problema": {
        "prompt": "Què li passa a en Biel a la primera lectura?",
        "options": [
          "S’atura perquè no troba l’hora al text.",
          "Oblida explicar els materials que cal portar.",
          "Llegeix massa dades en una frase i es queda sense aire.",
          "Barreja el taller amb l’assaig de dansa."
        ],
        "correct": "c",
        "explanation": "Ho havia escrit tot en una sola frase i acaba sense aire."
      },
      "pregunta": {
        "prompt": "Quina dada no ha retingut la Mireia?",
        "options": [
          "L’hora del taller.",
          "El nom de l’activitat.",
          "El material del mitjó.",
          "El dia de la setmana."
        ],
        "correct": "a",
        "explanation": "Demana quina hora ha dit; en Biel respon que a les onze."
      },
      "entrada": {
        "prompt": "Per què és important explicar per on s’entra?",
        "options": [
          "Perquè el pati és ocupat i haurien de tornar a sortir i fer la volta.",
          "Perquè el taller es farà fora de l’escola.",
          "Perquè totes les famílies portaran una cadira.",
          "Perquè l’entrada principal queda massa lluny de la sala gran."
        ],
        "correct": "a",
        "explanation": "Si van al pati, hauran de recular i arribar fins a l’entrada correcta."
      },
      "materials": {
        "prompt": "Quins dos materials cal portar?",
        "options": [
          "Un full gran i una capsa petita.",
          "Un mitjó vell i un tros de roba.",
          "Un tros de roba i una agulla.",
          "Un mitjó vell i un pot de cola."
        ],
        "correct": "b",
        "explanation": "A la versió final demana un mitjó vell i un tros de roba."
      },
      "pauses": {
        "prompt": "Què comprova la Mireia deixant el paper de cara avall?",
        "options": [
          "Si l’anunci s’entén i es recorda només escoltant.",
          "Si en Biel pot llegir sense mirar cap full.",
          "Si el taller s’explica igual abans de dissabte.",
          "Si el micròfon recull el fregament del paper."
        ],
        "correct": "a",
        "explanation": "Escolta sense suport escrit per valorar què pot retenir."
      },
      "soroll": {
        "prompt": "Què canvia en Biel abans de la gravació final?",
        "options": [
          "Treu del text el dia i l’hora del taller.",
          "Canvia l’entrada pel pati per la del darrere.",
          "Aparta el full del micro perquè l’està fregant.",
          "Demana que la Mireia torni a mirar el paper."
        ],
        "correct": "c",
        "explanation": "El full davant del micròfon fa soroll de fregament i el deixa al costat."
      }
    },
    "openOnly": {}
  },
  "ca-S065": {
    "questions": {
      "objecte": {
        "prompt": "Què estan mesurant?",
        "options": [
          "Una paret.",
          "Un got de llapis.",
          "Una taula.",
          "Un quadern."
        ],
        "correct": "c",
        "explanation": "En Biel i el company estan mesurant una taula."
      },
      "finalitat": {
        "prompt": "Per a què necessiten la mesura?",
        "options": [
          "Per fer un dibuix de la taula.",
          "Per comparar-la amb la de l’altra aula.",
          "Per triar un regle més llarg.",
          "Per decidir on deixaran els llapis."
        ],
        "correct": "a",
        "explanation": "Mesuren la taula per dibuixar-la."
      },
      "ajuda": {
        "prompt": "Què demana primer la Mireia per entendre el problema?",
        "options": [
          "Que tornin a moure la taula.",
          "Que el company esborri el dibuix.",
          "Que li mostri com han posat el regle.",
          "Que en Biel repeteixi tots els números."
        ],
        "correct": "c",
        "explanation": "Prefereix observar el procediment abans de comparar més números."
      },
      "comencar": {
        "prompt": "Quina part del regle ha de coincidir amb la vora de la taula?",
        "options": [
          "El zero.",
          "La punta de plàstic.",
          "El costat del dit.",
          "L’última ratlla."
        ],
        "correct": "a",
        "explanation": "Han d’alinear el zero amb la vora, no la punta del regle."
      },
      "plàstic": {
        "prompt": "Què hi ha entre la punta del regle i el zero?",
        "options": [
          "La tira de cinta amb la marca del final.",
          "L’espai on en Biel posa sempre el dit.",
          "Un tros de plàstic fora de la mesura marcada.",
          "Una ratlla que marca la primera mesura."
        ],
        "correct": "c",
        "explanation": "La punta i el zero estan separats per un tros de plàstic que no s’ha de comptar."
      },
      "dit": {
        "prompt": "Quin problema té en Biel en moure el regle?",
        "options": [
          "El dit queda enganxat a la cinta del regle.",
          "El company li mou la taula mentre dibuixa.",
          "No pot veure els números perquè el quadern els tapa.",
          "El dit que marcava el punt se li mou."
        ],
        "correct": "d",
        "explanation": "La marca feta amb el dit no es manté estable quan continua mesurant."
      },
      "cinta": {
        "prompt": "On han d’enganxar la cinta?",
        "options": [
          "Damunt del regle, al costat del zero.",
          "A la taula, al costat del regle.",
          "Al dit que marca el punt.",
          "Al quadern del dibuix."
        ],
        "correct": "b",
        "explanation": "La marca ha de quedar fixa a la taula quan retiren el regle."
      },
      "funcio": {
        "prompt": "Com ajuda la marca de cinta?",
        "options": [
          "Marca la llargada total abans de moure el regle.",
          "Conserva el punt de continuació per tornar-hi a posar el zero.",
          "Subjecta el regle a la taula mentre dibuixen.",
          "Es mou amb el regle i recorda on havien començat."
        ],
        "correct": "b",
        "explanation": "Substitueix el dit per una referència fixa on alinear el zero."
      },
      "repetir": {
        "prompt": "Què farà en Biel i per què?",
        "options": [
          "Mesurarà el mateix costat, corregint la posició del zero i les marques.",
          "Mesurarà el got dels llapis, perquè la taula no cap al dibuix.",
          "Mesurarà una altra taula, perquè la primera canvia de llargada.",
          "Esborrarà el dibuix, perquè el company l’ha mesurat pel costat contrari."
        ],
        "correct": "a",
        "explanation": "Ha localitzat problemes en el procediment, per això repeteix la mateixa mesura correctament."
      }
    },
    "openOnly": {}
  },
  "ca-S066": {
    "questions": {
      "finalitat": {
        "prompt": "Què hauran de fer les famílies amb les gravacions?",
        "options": [
          "Escoltar i endevinar el lloc de l’escola.",
          "Gravar un recorregut nou per l’escola.",
          "Ordenar les veus segons el grup de classe.",
          "Repetir les passes tal com les sentin."
        ],
        "correct": "a",
        "explanation": "El joc de portes obertes consisteix a reconèixer els llocs escoltant-los."
      },
      "primer": {
        "prompt": "On era la gravadora al començament?",
        "options": [
          "Sobre l’armari baix al costat de la porta de classe.",
          "Al primer esglaó de l’escala.",
          "A la mà d’en Biel mentre sortia al pati.",
          "Al mig de la taula del grup."
        ],
        "correct": "a",
        "explanation": "Comença gravant des de l’armari baix, al costat de la porta."
      },
      "canvi": {
        "prompt": "Per què les passes se senten més properes al final?",
        "options": [
          "Perquè en Biel agafa la gravadora i camina fins a l’escala.",
          "Perquè totes les famílies arriben al passadís.",
          "Perquè el company puja el volum del fitxer.",
          "Perquè la Mireia mou l’armari cap a la porta."
        ],
        "correct": "a",
        "explanation": "La posició de la gravadora canvia quan en Biel se l’endú."
      },
      "triat": {
        "prompt": "Quin fragment vol triar en Biel i quins sons hi ha?",
        "options": [
          "El de la classe buida, amb sabates picant als esglaons.",
          "El de l’escala al final, amb cadires i converses del menjador.",
          "El de l’armari abans del timbre, només amb la seva respiració.",
          "El de la porta quan surt la gent, amb passes i cadires de l’aula."
        ],
        "correct": "d",
        "explanation": "Prefereix el fragment des de la porta perquè inclou passes i cadires."
      },
      "inici": {
        "prompt": "Per què conserven uns segons tranquils al principi?",
        "options": [
          "Per tapar el soroll de la respiració d’en Biel.",
          "Per poder afegir-hi el segon timbre més fort.",
          "Perquè les famílies tinguin temps de triar l’auricular.",
          "Per mostrar com el passadís passa de tranquil a ple."
        ],
        "correct": "d",
        "explanation": "La Mireia vol conservar el canvi d’ambient real."
      },
      "timbre": {
        "prompt": "Quina impressió donaria afegir un altre timbre al final?",
        "options": [
          "Que les cadires només es mouen quan tothom ja és fora.",
          "Que la gravadora no havia sortit mai de l’aula.",
          "Que la gent baixa l’escala abans del primer timbre.",
          "Que el timbre torna a sonar mentre encara surt la gent."
        ],
        "correct": "d",
        "explanation": "El segon timbre, vingut d’una altra gravació, faria semblar un fet que no va passar."
      },
      "nom": {
        "prompt": "Per què concretaran més el nom del fragment?",
        "options": [
          "Per saber quin company va parlar més fort.",
          "Per distingir la gravació des de la porta del tros caminant.",
          "Per indicar a les famílies la resposta mentre escolten.",
          "Per ordenar els arxius segons la durada del silenci."
        ],
        "correct": "b",
        "explanation": "«Passadís» sol pot confondre els dos punts de gravació."
      },
      "original": {
        "prompt": "Què demana la Mireia sobre l’arxiu original i per a què?",
        "options": [
          "Conservar-lo per escoltar després el soroll de l’escala.",
          "Enviar-lo a les famílies per explicar qui ha respirat.",
          "Tallar-lo al principi per treure’n el timbre real.",
          "Substituir-lo pel fragment nou per escoltar només la porta."
        ],
        "correct": "a",
        "explanation": "Demana desar també l’original perquè vol escoltar l’escala."
      }
    },
    "openOnly": {}
  },
  "ca-S067": {
    "questions": {
      "sorpresa": {
        "prompt": "Què sorprèn en Biel de les dues llistes?",
        "options": [
          "Que ningú de la seva classe llegeixi còmics.",
          "Que els dos grups hagin preguntat a classes diferents.",
          "Que una tingui molts còmics i l’altra llibres llargs dins la mateixa classe.",
          "Que els mateixos títols apareguin en el mateix ordre."
        ],
        "correct": "c",
        "explanation": "Li sorprèn la diferència malgrat pertànyer tots a la mateixa classe."
      },
      "primera": {
        "prompt": "Què preguntava el grup d’en Biel?",
        "options": [
          "Quin llibre estaven llegint en aquell moment.",
          "Quin era l’últim llibre que havien acabat.",
          "Quin llibre volien començar després del còmic.",
          "Quin era el llibre més llarg que havien llegit."
        ],
        "correct": "b",
        "explanation": "La pregunta del seu grup feia referència a l’últim llibre acabat."
      },
      "segona": {
        "prompt": "Què preguntava l’altre grup?",
        "options": [
          "Quin era l’últim llibre que havien acabat.",
          "Quin llibre preferien tornar a llegir.",
          "Quin llibre estaven llegint en aquell moment.",
          "Quin còmic havien llegit durant l’estona de lectura."
        ],
        "correct": "c",
        "explanation": "L’altre grup preguntava pel llibre en curs."
      },
      "biel": {
        "prompt": "Per què en Biel va donar dos títols diferents?",
        "options": [
          "Havia acabat el còmic però encara llegia el llibre de pirates.",
          "Havia acabat el llibre de pirates però encara llegia el còmic.",
          "Va canviar la resposta perquè no li agradava la pregunta.",
          "Va començar el llibre de misteri després de respondre al primer grup."
        ],
        "correct": "a",
        "explanation": "Les dues preguntes demanaven moments diferents de la lectura."
      },
      "arnau": {
        "prompt": "Què saben segur de l’Arnau i què han de preguntar-li?",
        "options": [
          "Saben que vol sortir d’una llista i han de preguntar de quina.",
          "Saben que ha acabat el llibre i han de preguntar quin còmic llegirà.",
          "Saben que s’ha equivocat de títol i han de preguntar quan el canviarà.",
          "Saben que el títol és a totes dues llistes i han d’aclarir per què."
        ],
        "correct": "d",
        "explanation": "El títol es repeteix; no s’ha comprovat encara per què l’Arnau ha respost així."
      },
      "canviar": {
        "prompt": "Per què canviar només la pregunta escrita no arregla les dades?",
        "options": [
          "Perquè els alumnes ja no recorden cap títol dels llibres.",
          "Perquè les respostes es van donar a una pregunta diferent.",
          "Perquè els títols llargs no cabrien al nou gràfic.",
          "Perquè totes les respostes repetides són necessàriament errònies."
        ],
        "correct": "b",
        "explanation": "Per exemple, el còmic d’en Biel respon a què ha acabat, no a què llegeix ara."
      },
      "colors": {
        "prompt": "Per què els colors no separen els dos grups de respostes?",
        "options": [
          "Perquè els dos grups només han apuntat còmics.",
          "Perquè el blau i el verd es veuen igual al paper.",
          "Perquè cada participant ha triat el seu propi color.",
          "Perquè marquen còmics i altres llibres, no la pregunta d’origen."
        ],
        "correct": "d",
        "explanation": "La classificació del gràfic és per tipus de llibre, no per pregunta."
      },
      "recuperar": {
        "prompt": "Amb què podran separar de nou les respostes?",
        "options": [
          "Amb els fulls originals, que tenen les respostes i els noms.",
          "Amb els títols de la pissarra, tots ja acabats de llegir.",
          "Amb el gràfic barrejat, comptant les columnes blaves i verdes.",
          "Amb els llibres de les motxilles, sense consultar cap full."
        ],
        "correct": "a",
        "explanation": "Els fulls conserven la pregunta d’origen, les respostes i qui les ha donades."
      },
      "grafics": {
        "prompt": "Què decideixen fer amb els gràfics?",
        "options": [
          "Guardar el primer com a prova i fer-ne un per a cada pregunta.",
          "Ajuntar les llistes i substituir les preguntes per una de nova.",
          "Esborrar el primer i repetir la mateixa pregunta a tothom.",
          "Mantenir el primer i canviar els colors per noms d’alumnes."
        ],
        "correct": "a",
        "explanation": "Conserven separades les dades de cadascuna de les dues preguntes."
      }
    },
    "openOnly": {}
  },
  "ca-S068": {
    "questions": {
      "visita": {
        "prompt": "A qui anaven a visitar?",
        "options": [
          "La cosina que vivia al barri.",
          "L’àvia de l’hort.",
          "La tieta d’una altra ciutat.",
          "Un amic del pare de l’estació."
        ],
        "correct": "c",
        "explanation": "Viatjaven per visitar la tieta que vivia en una altra ciutat."
      },
      "regal": {
        "prompt": "Per a qui eren les galetes de la capsa?",
        "options": [
          "Per a la tieta.",
          "Per al pare.",
          "Per a la mare.",
          "Per a en Ferran."
        ],
        "correct": "a",
        "explanation": "La mare havia omplert la capsa per portar-la a la tieta."
      },
      "previsio": {
        "prompt": "Per què la mare havia preparat entrepans?",
        "options": [
          "Perquè es pensava que el dinar de la tieta no els agradaria.",
          "Per compartir-los amb el personal de l’estació.",
          "Perquè la tieta no podia fer el dinar.",
          "Per si tenien gana durant el trajecte."
        ],
        "correct": "d",
        "explanation": "Els duien per si els venia gana durant el viatge."
      },
      "tren": {
        "prompt": "Quin tren es va retardar?",
        "options": [
          "El que havien d’agafar després del canvi.",
          "El primer que van agafar al matí.",
          "El que havien d’agafar per tornar a casa.",
          "El que portava la tieta fins a l’estació."
        ],
        "correct": "a",
        "explanation": "El primer arriba bé; es retarda el següent per uns treballs a la via."
      },
      "lloc": {
        "prompt": "On acaben dinant?",
        "options": [
          "En un banc del vestíbul de l’estació.",
          "Al taulell de l’estació del canvi.",
          "Al menjador de casa de la tieta.",
          "En un seient del segon tren."
        ],
        "correct": "a",
        "explanation": "La mare treu els entrepans mentre esperen al banc."
      },
      "capsa": {
        "prompt": "Què mostra que no es mengen les galetes mentre esperen?",
        "options": [
          "El pare compra una altra capsa abans de trucar a la tieta.",
          "La mare guarda la capsa i en Ferran la lliura a la tieta.",
          "En Ferran guarda els papers dels entrepans dins de la capsa.",
          "La mare diu que la capsa és buida des del començament."
        ],
        "correct": "b",
        "explanation": "La capsa torna al fons de la bossa i arriba a la tieta amb les galetes senceres."
      },
      "trucada": {
        "prompt": "Què fa el pare, a més de preguntar pel tren?",
        "options": [
          "Demana galetes al taulell de l’estació.",
          "Torna al primer tren a buscar la bossa.",
          "Va a buscar menjar a casa de la tieta.",
          "Truca a la tieta per explicar-li el retard."
        ],
        "correct": "d",
        "explanation": "Pot avisar la tieta des del telèfon de l’estació."
      },
      "sopar": {
        "prompt": "Per què en Ferran diu que va sopar el dinar de la tieta?",
        "options": [
          "Perquè arriben a casa seva just a l’hora de sopar.",
          "Perquè mengen els entrepans que ella havia preparat al matí.",
          "Perquè a l’estació els serveixen el que ella havia cuinat.",
          "Perquè s’emporten el menjar que ella havia guardat per al dinar."
        ],
        "correct": "d",
        "explanation": "La tieta conserva el dinar i se l’emporten per menjar-lo al vespre."
      }
    },
    "openOnly": {}
  },
  "ca-S068D": {
    "questions": {
      "visita": {
        "prompt": "A qui anaven a visitar?",
        "options": [
          "L’àvia de l’hort.",
          "La cosina que vivia al barri.",
          "Un amic del pare de l’estació.",
          "La tieta d’una altra ciutat."
        ],
        "correct": "d",
        "explanation": "Viatjaven per visitar la tieta que vivia en una altra ciutat."
      },
      "regal": {
        "prompt": "Per a qui eren les galetes de la capsa?",
        "options": [
          "Per al pare.",
          "Per a la tieta.",
          "Per a la mare.",
          "Per a en Ferran."
        ],
        "correct": "b",
        "explanation": "La mare havia omplert la capsa per portar-la a la tieta."
      },
      "previsio": {
        "prompt": "Per què la mare havia preparat entrepans?",
        "options": [
          "Perquè la tieta no podia fer el dinar.",
          "Per si tenien gana durant el trajecte.",
          "Per compartir-los amb el personal de l’estació.",
          "Perquè es pensava que el dinar de la tieta no els agradaria."
        ],
        "correct": "b",
        "explanation": "Els duien per si els venia gana durant el viatge."
      },
      "tren": {
        "prompt": "Quin tren es va retardar?",
        "options": [
          "El que havien d’agafar per tornar a casa.",
          "El que portava la tieta fins a l’estació.",
          "El que havien d’agafar després del canvi.",
          "El primer que van agafar al matí."
        ],
        "correct": "c",
        "explanation": "El primer arriba bé; es retarda el següent per uns treballs a la via."
      },
      "lloc": {
        "prompt": "On acaben dinant?",
        "options": [
          "Al taulell de l’estació del canvi.",
          "En un banc del vestíbul de l’estació.",
          "En un seient del segon tren.",
          "Al menjador de casa de la tieta."
        ],
        "correct": "b",
        "explanation": "La mare treu els entrepans mentre esperen al banc."
      },
      "capsa": {
        "prompt": "Què mostra que no es mengen les galetes mentre esperen?",
        "options": [
          "El pare compra una altra capsa abans de trucar a la tieta.",
          "La mare guarda la capsa i en Ferran la lliura a la tieta.",
          "La mare diu que la capsa és buida des del començament.",
          "En Ferran guarda els papers dels entrepans dins de la capsa."
        ],
        "correct": "b",
        "explanation": "La capsa torna al fons de la bossa i arriba a la tieta amb les galetes senceres."
      },
      "trucada": {
        "prompt": "Què fa el pare, a més de preguntar pel tren?",
        "options": [
          "Demana galetes al taulell de l’estació.",
          "Truca a la tieta per explicar-li el retard.",
          "Torna al primer tren a buscar la bossa.",
          "Va a buscar menjar a casa de la tieta."
        ],
        "correct": "b",
        "explanation": "Pot avisar la tieta des del telèfon de l’estació."
      },
      "sopar": {
        "prompt": "Per què en Ferran diu que va sopar el dinar de la tieta?",
        "options": [
          "Perquè s’emporten el menjar que ella havia guardat per al dinar.",
          "Perquè mengen els entrepans que ella havia preparat al matí.",
          "Perquè arriben a casa seva just a l’hora de sopar.",
          "Perquè a l’estació els serveixen el que ella havia cuinat."
        ],
        "correct": "a",
        "explanation": "La tieta conserva el dinar i se l’emporten per menjar-lo al vespre."
      }
    },
    "openOnly": {}
  },
  "ca-S069": {
    "questions": {
      "feina": {
        "prompt": "Quina feina fa en Ferran durant el partit?",
        "options": [
          "Porta aigua als jugadors del carrer Nou.",
          "Arbitra el partit amb un xiulet.",
          "Porta el marcador en una pissarra.",
          "Fa fotografies dels dos equips."
        ],
        "correct": "c",
        "explanation": "Encara és petit per jugar amb els grans i li encarreguen el marcador."
      },
      "noms": {
        "prompt": "Què hi ha escrit damunt dels dos números?",
        "options": [
          "Els noms dels equips: carrer Nou i carrer Major.",
          "Els noms de les dues porteries.",
          "Els noms del cosí i d’en Ferran.",
          "Els minuts de cada part del partit."
        ],
        "correct": "a",
        "explanation": "Cada número és sota el nom de l’equip corresponent."
      },
      "mitja": {
        "prompt": "Què canvia a la mitja part i què es queda al lloc?",
        "options": [
          "En Ferran canvia els noms i els equips es queden al mateix costat.",
          "Canvia de lloc la pissarra i els jugadors mantenen el costat.",
          "Els jugadors canvien de costat i la pissarra es queda al lloc.",
          "El cosí canvia d’equip i en Ferran deixa la pissarra a terra."
        ],
        "correct": "c",
        "explanation": "Els equips canvien de costat però la pissarra segueix recolzada al mateix lloc."
      },
      "error": {
        "prompt": "Per què en Ferran suma el gol al número equivocat?",
        "options": [
          "Perquè els noms s’han esborrat amb l’aigua.",
          "Perquè canvia la pissarra de lloc durant la mitja part.",
          "Perquè el cosí li assenyala el carrer Major.",
          "Perquè es guia pel costat de la porteria en lloc del nom de l’equip."
        ],
        "correct": "d",
        "explanation": "Confón el costat on marquen amb la posició del nom a la pissarra."
      },
      "senyals": {
        "prompt": "Com interpreta primer els senyals del cosí?",
        "options": [
          "Pensa que demana un altre guix.",
          "Pensa que vol un got d’aigua.",
          "Pensa que el saluda.",
          "Pensa que vol sortir a la foto."
        ],
        "correct": "c",
        "explanation": "En Ferran respon alçant el got perquè creu que és una salutació."
      },
      "corregir": {
        "prompt": "Com corregeixen el marcador?",
        "options": [
          "Esborren tots dos números i tornen a començar el partit.",
          "Sumen un altre gol al carrer Major per igualar els canvis.",
          "Desfan la suma equivocada i posen el gol sota carrer Nou.",
          "Canvien els noms dels equips de costat i deixen els números."
        ],
        "correct": "c",
        "explanation": "Treuen el gol de l’equip equivocat i l’afegeixen al carrer Nou."
      },
      "despres": {
        "prompt": "Què fa en Ferran abans de canviar el marcador les vegades següents?",
        "options": [
          "Pregunta al cosí quin número ha d’esborrar.",
          "Mira primer cap a quina porteria corren.",
          "Diu el nom de l’equip i el busca escrit.",
          "Gira la pissarra cap al costat del camp."
        ],
        "correct": "c",
        "explanation": "Relaciona cada gol amb el nom escrit abans de tocar el número."
      },
      "foto": {
        "prompt": "Per què el cosí gira la pissarra a la fotografia?",
        "options": [
          "Perquè en Ferran ha tornat a posar el gol a l’altre equip.",
          "Perquè vol que tapi el got d’aigua.",
          "Perquè els números han quedat esborrats.",
          "Perquè estava del revés i només se’n veuria la fusta."
        ],
        "correct": "d",
        "explanation": "En Ferran l’aguanta mostrant el darrere; el cosí la gira cap endavant."
      }
    },
    "openOnly": {}
  },
  "ca-S069D": {
    "questions": {
      "feina": {
        "prompt": "Quina feina fa en Ferran durant el partit?",
        "options": [
          "Porta aigua als jugadors del carrer Nou.",
          "Arbitra el partit amb un xiulet.",
          "Fa fotografies dels dos equips.",
          "Porta el marcador en una pissarra."
        ],
        "correct": "d",
        "explanation": "Encara és petit per jugar amb els grans i li encarreguen el marcador."
      },
      "noms": {
        "prompt": "Què hi ha escrit damunt dels dos números?",
        "options": [
          "Els minuts de cada part del partit.",
          "Els noms dels equips: carrer Nou i carrer Major.",
          "Els noms del cosí i d’en Ferran.",
          "Els noms de les dues porteries."
        ],
        "correct": "b",
        "explanation": "Cada número és sota el nom de l’equip corresponent."
      },
      "mitja": {
        "prompt": "Què canvia a la mitja part i què es queda al lloc?",
        "options": [
          "En Ferran canvia els noms i els equips es queden al mateix costat.",
          "El cosí canvia d’equip i en Ferran deixa la pissarra a terra.",
          "Canvia de lloc la pissarra i els jugadors mantenen el costat.",
          "Els jugadors canvien de costat i la pissarra es queda al lloc."
        ],
        "correct": "d",
        "explanation": "Els equips canvien de costat però la pissarra segueix recolzada al mateix lloc."
      },
      "error": {
        "prompt": "Per què en Ferran suma el gol al número equivocat?",
        "options": [
          "Perquè es guia pel costat de la porteria en lloc del nom de l’equip.",
          "Perquè canvia la pissarra de lloc durant la mitja part.",
          "Perquè el cosí li assenyala el carrer Major.",
          "Perquè els noms s’han esborrat amb l’aigua."
        ],
        "correct": "a",
        "explanation": "Confón el costat on marquen amb la posició del nom a la pissarra."
      },
      "senyals": {
        "prompt": "Com interpreta primer els senyals del cosí?",
        "options": [
          "Pensa que vol un got d’aigua.",
          "Pensa que demana un altre guix.",
          "Pensa que el saluda.",
          "Pensa que vol sortir a la foto."
        ],
        "correct": "c",
        "explanation": "En Ferran respon alçant el got perquè creu que és una salutació."
      },
      "corregir": {
        "prompt": "Com corregeixen el marcador?",
        "options": [
          "Desfan la suma equivocada i posen el gol sota carrer Nou.",
          "Esborren tots dos números i tornen a començar el partit.",
          "Canvien els noms dels equips de costat i deixen els números.",
          "Sumen un altre gol al carrer Major per igualar els canvis."
        ],
        "correct": "a",
        "explanation": "Treuen el gol de l’equip equivocat i l’afegeixen al carrer Nou."
      },
      "despres": {
        "prompt": "Què fa en Ferran abans de canviar el marcador les vegades següents?",
        "options": [
          "Diu el nom de l’equip i el busca escrit.",
          "Pregunta al cosí quin número ha d’esborrar.",
          "Mira primer cap a quina porteria corren.",
          "Gira la pissarra cap al costat del camp."
        ],
        "correct": "a",
        "explanation": "Relaciona cada gol amb el nom escrit abans de tocar el número."
      },
      "foto": {
        "prompt": "Per què el cosí gira la pissarra a la fotografia?",
        "options": [
          "Perquè vol que tapi el got d’aigua.",
          "Perquè en Ferran ha tornat a posar el gol a l’altre equip.",
          "Perquè els números han quedat esborrats.",
          "Perquè estava del revés i només se’n veuria la fusta."
        ],
        "correct": "d",
        "explanation": "En Ferran l’aguanta mostrant el darrere; el cosí la gira cap endavant."
      }
    },
    "openOnly": {}
  },
  "ca-S070": {
    "questions": {
      "instrument": {
        "prompt": "Quin instrument tocava el pare d’en Ferran?",
        "options": [
          "El piano.",
          "La guitarra.",
          "El violí.",
          "L’acordió."
        ],
        "correct": "d",
        "explanation": "Tenia un acordió guardat a l’armari."
      },
      "previ": {
        "prompt": "Quina dada mostra que ja el sabia tocar abans de la festa?",
        "options": [
          "Que el veí tenia els discos preparats.",
          "Que el van deixar tocar al final del ball.",
          "Que havia guardat l’instrument en un estoig.",
          "Que el tocava alguns diumenges després de dinar."
        ],
        "correct": "d",
        "explanation": "En Ferran explica que el pare ja el tocava a casa els diumenges."
      },
      "pla": {
        "prompt": "Com s’havia previst fer la major part del ball?",
        "options": [
          "Amb discos.",
          "Amb cançons de la gent.",
          "Amb músics de la botiga.",
          "Amb l’acordió del pare."
        ],
        "correct": "a",
        "explanation": "L’acordió era per a una cançó final; la resta del ball seria amb discos."
      },
      "tall": {
        "prompt": "Què indica que el tall de llum va més enllà de les bombetes de la plaça?",
        "options": [
          "Que el veí encara no havia posat el primer disc.",
          "Que la botiga del costat també es queda sense llum.",
          "Que la gent s’asseu mentre els petits corren.",
          "Que el pare havia deixat l’acordió a la planta baixa."
        ],
        "correct": "b",
        "explanation": "La botiga també queda a les fosques, per tant l’afectació és més àmplia."
      },
      "guardat": {
        "prompt": "On havia deixat el pare l’acordió?",
        "options": [
          "A l’armari de casa, a l’altra banda del barri.",
          "A casa del veí, a la planta baixa.",
          "Dins de la botiga del costat de la pista.",
          "Sota una taula de la plaça, al costat dels gots."
        ],
        "correct": "b",
        "explanation": "L’havia deixat a casa del veí perquè no li fes nosa."
      },
      "ball": {
        "prompt": "Com es reprèn el ball mentre el pare toca?",
        "options": [
          "S’hi acosta gent, una parella balla i altres la segueixen fent lloc.",
          "Tothom balla alhora i el pare se situa al mig.",
          "Els petits aparten totes les cadires abans que ningú s’acosti.",
          "El veí posa un disc i el pare l’acompanya."
        ],
        "correct": "a",
        "explanation": "El ball torna gradualment: primers oients, una parella i més gent que fa lloc amb les cadires."
      },
      "espera": {
        "prompt": "Per què el veí espera abans de posar el disc quan torna la llum?",
        "options": [
          "Perquè la botiga encara està tancada.",
          "Perquè el pare encara ha d’acabar la cançó.",
          "Perquè la mare encara no ha arribat a la plaça.",
          "Perquè en Ferran està buscant el primer disc."
        ],
        "correct": "b",
        "explanation": "Veu que el pare continua tocant i deixa acabar la cançó."
      },
      "mare": {
        "prompt": "Què fa el pare quan comencen els discos?",
        "options": [
          "Continua tocant al costat de la porta.",
          "Recull els gots amb en Ferran.",
          "Porta l’acordió de nou a casa del veí.",
          "Guarda l’acordió i va a ballar amb la mare."
        ],
        "correct": "d",
        "explanation": "Deixa l’instrument a l’estoig i baixa a ballar amb la mare."
      },
      "got": {
        "prompt": "Per què demana a en Ferran que no s’endugui el seu got?",
        "options": [
          "Perquè vol deixar l’aigua al veí que està preparant els discos.",
          "Perquè en Ferran recull els gots i ell encara no ha begut l’aigua.",
          "Perquè en Ferran l’ha d’omplir abans que el pare comenci a tocar.",
          "Perquè ha de tornar el got a la botiga abans d’acabar el ball."
        ],
        "correct": "b",
        "explanation": "El pare encara no ha fet ni un glop i vol evitar que el got acabi recollit."
      }
    },
    "openOnly": {}
  },
  "ca-S071": {
    "questions": {
      "semblants": {
        "prompt": "Què comparteixen les quatre entrades i què les diferencia?",
        "options": [
          "Mateix teatre i espectacle de titelles; dues blaves i dues d’un altre color.",
          "Mateix teatre i color blau; màgia de diumenge i titelles del dissabte següent.",
          "Mateix teatre i color blau; dues sessions de màgia el mateix dissabte.",
          "Mateix teatre i color blau; titelles de diumenge i màgia del dissabte següent."
        ],
        "correct": "d",
        "explanation": "Són blaves i del mateix teatre, però corresponen a dies i espectacles diferents."
      },
      "velles": {
        "prompt": "On deixa en Ferran les entrades del primer espectacle?",
        "options": [
          "A la taula de la cuina, dins d’un sobre.",
          "A la tauleta del rebedor, al costat d’un programa.",
          "A la butxaca de la jaqueta del tiet.",
          "A la tauleta del rebedor, dins la maleta."
        ],
        "correct": "b",
        "explanation": "Les conserva de record al rebedor, amb un programa de mà."
      },
      "noves": {
        "prompt": "On deixa el tiet les entrades de dissabte?",
        "options": [
          "Dins del programa de mà al rebedor.",
          "Dins d’un sobre blau a la tauleta del rebedor.",
          "Dins de la butxaca de la seva jaqueta.",
          "Dins d’un sobre blanc a la taula de la cuina."
        ],
        "correct": "d",
        "explanation": "Les entrades noves són al sobre blanc damunt la taula de la cuina."
      },
      "causa": {
        "prompt": "Com comença l’equivocació abans de sortir?",
        "options": [
          "En Ferran agafa les del rebedor, les creu bones i diu que ja les porta.",
          "En Ferran canvia de lloc els dos sobres mentre el tiet es vesteix.",
          "El tiet compra entrades de titelles pensant que són les de màgia.",
          "El tiet guarda les entrades noves al costat de les velles."
        ],
        "correct": "a",
        "explanation": "Dona per fet que les entrades blaves del rebedor són les d’aquell dia."
      },
      "data": {
        "prompt": "Quin detall revela l’error a la porta del teatre?",
        "options": [
          "La data del diumenge anterior.",
          "El color blau de les entrades.",
          "El nom del mateix teatre.",
          "El dibuix del sobre blanc."
        ],
        "correct": "a",
        "explanation": "El senyor de la porta comprova la data i veu que són les entrades anteriors."
      },
      "record": {
        "prompt": "Què fa recordar al tiet on són les entrades bones?",
        "options": [
          "Mirar les claus que s’ha guardat abans de sortir.",
          "Saber que en Ferran les ha agafades del rebedor.",
          "Sentir que en Ferran encara pensa en el conill.",
          "Veure el programa de mà del nou espectacle."
        ],
        "correct": "b",
        "explanation": "Quan en Ferran explica d’on les ha tret, el tiet recorda el sobre de la cuina."
      },
      "temps": {
        "prompt": "Quines dues circumstàncies els permeten arribar a temps?",
        "options": [
          "L’espectacle s’endarrereix i el tiet porta les entrades a la butxaca.",
          "El senyor de la porta els acompanya i els reserva un cotxe.",
          "La casa és lluny però en Ferran pot anar-hi corrent tot sol.",
          "Encara falta una estona i la casa és a dos carrers del teatre."
        ],
        "correct": "d",
        "explanation": "La proximitat de casa i el temps restant els permeten tornar a buscar-les."
      },
      "sobre": {
        "prompt": "Per què ara en Ferran guarda les quatre entrades juntes?",
        "options": [
          "Perquè totes quatre li recorden la història amb l’equivocació.",
          "Perquè les tornarà a fer servir per anar al mateix teatre.",
          "Perquè la mare les vol repartir entre quatre persones.",
          "Perquè el tiet encara ha de mirar quines són les bones."
        ],
        "correct": "a",
        "explanation": "Ara tenen valor de record de tota l’anècdota."
      }
    },
    "openOnly": {}
  },
  "ca-S071D": {
    "questions": {
      "semblants": {
        "prompt": "Què comparteixen les quatre entrades i què les diferencia?",
        "options": [
          "Mateix teatre i color blau; dues sessions de màgia el mateix dissabte.",
          "Mateix teatre i color blau; titelles de diumenge i màgia del dissabte següent.",
          "Mateix teatre i color blau; màgia de diumenge i titelles del dissabte següent.",
          "Mateix teatre i espectacle de titelles; dues blaves i dues d’un altre color."
        ],
        "correct": "b",
        "explanation": "Són blaves i del mateix teatre, però corresponen a dies i espectacles diferents."
      },
      "velles": {
        "prompt": "On deixa en Ferran les entrades del primer espectacle?",
        "options": [
          "A la butxaca de la jaqueta del tiet.",
          "A la tauleta del rebedor, dins la maleta.",
          "A la taula de la cuina, dins d’un sobre.",
          "A la tauleta del rebedor, al costat d’un programa."
        ],
        "correct": "d",
        "explanation": "Les conserva de record al rebedor, amb un programa de mà."
      },
      "noves": {
        "prompt": "On deixa el tiet les entrades de dissabte?",
        "options": [
          "Dins d’un sobre blau a la tauleta del rebedor.",
          "Dins d’un sobre blanc a la taula de la cuina.",
          "Dins de la butxaca de la seva jaqueta.",
          "Dins del programa de mà al rebedor."
        ],
        "correct": "b",
        "explanation": "Les entrades noves són al sobre blanc damunt la taula de la cuina."
      },
      "causa": {
        "prompt": "Com comença l’equivocació abans de sortir?",
        "options": [
          "El tiet compra entrades de titelles pensant que són les de màgia.",
          "En Ferran canvia de lloc els dos sobres mentre el tiet es vesteix.",
          "En Ferran agafa les del rebedor, les creu bones i diu que ja les porta.",
          "El tiet guarda les entrades noves al costat de les velles."
        ],
        "correct": "c",
        "explanation": "Dona per fet que les entrades blaves del rebedor són les d’aquell dia."
      },
      "data": {
        "prompt": "Quin detall revela l’error a la porta del teatre?",
        "options": [
          "El nom del mateix teatre.",
          "La data del diumenge anterior.",
          "El color blau de les entrades.",
          "El dibuix del sobre blanc."
        ],
        "correct": "b",
        "explanation": "El senyor de la porta comprova la data i veu que són les entrades anteriors."
      },
      "record": {
        "prompt": "Què fa recordar al tiet on són les entrades bones?",
        "options": [
          "Saber que en Ferran les ha agafades del rebedor.",
          "Veure el programa de mà del nou espectacle.",
          "Mirar les claus que s’ha guardat abans de sortir.",
          "Sentir que en Ferran encara pensa en el conill."
        ],
        "correct": "a",
        "explanation": "Quan en Ferran explica d’on les ha tret, el tiet recorda el sobre de la cuina."
      },
      "temps": {
        "prompt": "Quines dues circumstàncies els permeten arribar a temps?",
        "options": [
          "La casa és lluny però en Ferran pot anar-hi corrent tot sol.",
          "El senyor de la porta els acompanya i els reserva un cotxe.",
          "L’espectacle s’endarrereix i el tiet porta les entrades a la butxaca.",
          "Encara falta una estona i la casa és a dos carrers del teatre."
        ],
        "correct": "d",
        "explanation": "La proximitat de casa i el temps restant els permeten tornar a buscar-les."
      },
      "sobre": {
        "prompt": "Per què ara en Ferran guarda les quatre entrades juntes?",
        "options": [
          "Perquè totes quatre li recorden la història amb l’equivocació.",
          "Perquè la mare les vol repartir entre quatre persones.",
          "Perquè les tornarà a fer servir per anar al mateix teatre.",
          "Perquè el tiet encara ha de mirar quines són les bones."
        ],
        "correct": "a",
        "explanation": "Ara tenen valor de record de tota l’anècdota."
      }
    },
    "openOnly": {}
  },
  "ca-S072": {
    "questions": {
      "feina": {
        "prompt": "En què ajudava en Ferran la tieta al mercat?",
        "options": [
          "Anava a buscar farina i muntava prestatges.",
          "Feia les coques i reparava el forn.",
          "Repartia els encàrrecs per les cases.",
          "Preparava bosses i atenia el taulell de coques."
        ],
        "correct": "d",
        "explanation": "Ajudava a preparar les bosses i es quedava al taulell mentre la tieta buscava safates."
      },
      "parts": {
        "prompt": "Què anotaven a les dues bandes del full?",
        "options": [
          "A una, els noms; a l’altra, les hores d’obrir el forn.",
          "A una, el nombre de safates; a l’altra, les coques sobrants.",
          "A una, els preus; a l’altra, les receptes.",
          "A una, nom i encàrrec; a l’altra, la marca de recollida."
        ],
        "correct": "d",
        "explanation": "El quadern recollia els encàrrecs i indicava quan ja se’ls havien endut."
      },
      "deduccio": {
        "prompt": "Per què en Ferran creu que la coca del prestatge és de la Rosa?",
        "options": [
          "Perquè la Rosa li demana una coca gran quan torna a la parada.",
          "Perquè la tieta acaba de deixar-li una nota sobre aquella coca.",
          "Perquè coincideix amb l’encàrrec i ell no veu cap marca de recollida.",
          "Perquè la bossa del prestatge ja porta el nom de la Rosa."
        ],
        "correct": "c",
        "explanation": "Relaciona la coca gran de pinyons amb l’encàrrec aparentment pendent."
      },
      "compra": {
        "prompt": "Què ve a comprar la Rosa quan torna?",
        "options": [
          "Una safata de galetes.",
          "Dues coques petites.",
          "Dues pastes petites.",
          "Una coca gran de pinyons."
        ],
        "correct": "c",
        "explanation": "Ja s’havia endut la coca; ara demana dues pastes petites."
      },
      "dues": {
        "prompt": "Què imagina primer en Ferran quan la Rosa diu que ja té la coca?",
        "options": [
          "Que la clienta s’ha endut la coca d’una família.",
          "Que la tieta ha canviat la recepta.",
          "Que ha apuntat l’encàrrec en un altre quadern.",
          "Que hi pot haver dues clientes amb el mateix nom."
        ],
        "correct": "d",
        "explanation": "Pensa que dues clientes potser es diuen Rosa."
      },
      "tapat": {
        "prompt": "Què tapa la marca de recollida?",
        "options": [
          "Un paperet amb la llista de coses per al mercat.",
          "La bossa amb el nom de la clienta.",
          "La tapa verda del quadern.",
          "La safata de les coques petites."
        ],
        "correct": "a",
        "explanation": "El paperet s’ha girat en passar pàgina i tapa les marques."
      },
      "coca": {
        "prompt": "Per a qui és realment la coca que queda al prestatge?",
        "options": [
          "Per a la tieta, que se l’endurà a casa.",
          "Per a en Ferran, que la rebrà per ajudar.",
          "Per a qualsevol persona que la vulgui comprar.",
          "Per a una altra clienta anomenada Rosa."
        ],
        "correct": "c",
        "explanation": "És una coca disponible per vendre, perquè aquell matí ha vingut menys gent."
      },
      "canvi": {
        "prompt": "Què fa la tieta perquè el paperet no tapi les marques?",
        "options": [
          "El subjecta a la tapa del quadern.",
          "El posa a sota de les safates del taulell.",
          "El gira cada vegada que arriba un client.",
          "L’enganxa a la bossa de la coca gran."
        ],
        "correct": "a",
        "explanation": "El fixa a la tapa perquè deixi de girar sobre les marques."
      },
      "final": {
        "prompt": "Com es resol la situació de la coca gran?",
        "options": [
          "En Ferran la guarda per a la setmana següent i esborra el quadern.",
          "La tieta se l’endú al forn i en Ferran llença la bossa escrita.",
          "La Rosa torna a comprar-la i en Ferran li prepara una altra bossa.",
          "Una família la compra i ell aprofita la bossa girant la part amb el nom."
        ],
        "correct": "d",
        "explanation": "La família compra la coca per berenar i en Ferran reutilitza la bossa preparada."
      }
    },
    "openOnly": {}
  },
  "ca-S073": {
    "questions": {
      "tard": {
        "prompt": "Quin grup arribarà més tard a dinar?",
        "options": [
          "El que ajuda a portar els plats.",
          "El que espera ara davant la porta.",
          "El que s’asseu a les finestres.",
          "El que ha anat d’excursió."
        ],
        "correct": "d",
        "explanation": "El grup d’excursió encara no ha arribat."
      },
      "taula": {
        "prompt": "On seurà el grup de la Laia?",
        "options": [
          "A les taules del fons.",
          "A la taula petita de la porta.",
          "A les taules del costat de les finestres.",
          "A la taula del mig de les safates."
        ],
        "correct": "c",
        "explanation": "El grup que arriba ara seu al costat de les finestres."
      },
      "preparades": {
        "prompt": "Per què han preparat també les taules del fons?",
        "options": [
          "Perquè el segon grup pugui seure sense esperar que acabin els altres.",
          "Perquè hi puguin deixar tota la fruita i les safates buides.",
          "Perquè el primer grup hi deixi les motxilles mentre dina.",
          "Perquè els dos grups puguin esperar plegats abans de menjar."
        ],
        "correct": "a",
        "explanation": "Així no han de tornar a parar les taules del primer grup."
      },
      "plats": {
        "prompt": "Què porta la Laia a les taules del fons?",
        "options": [
          "Safates amb el primer plat.",
          "Gots i motxilles.",
          "Sopa acabada de servir.",
          "Plats buits."
        ],
        "correct": "d",
        "explanation": "Porta una pila de plats buits per repartir."
      },
      "servir": {
        "prompt": "Quan serviran el menjar al grup que arriba tard?",
        "options": [
          "Quan la Laia hagi acabat la fruita.",
          "Quan acabi del tot el grup de la Laia.",
          "Quan arribi aquell grup.",
          "Quan hagin retirat les taules del fons."
        ],
        "correct": "c",
        "explanation": "El menjar es serveix quan arriba cada grup."
      },
      "fruita": {
        "prompt": "On és avui la fruita?",
        "options": [
          "A la taula petita del costat de la porta.",
          "A les taules del costat de les finestres.",
          "A la taula del mig.",
          "A les taules del fons."
        ],
        "correct": "a",
        "explanation": "Avui s’ha traslladat a la taula petita prop de la porta."
      },
      "canvi": {
        "prompt": "Per què han canviat la fruita de lloc?",
        "options": [
          "Per deixar les safates buides a la taula del mig.",
          "Per deixar tots els plats buits al costat de la porta.",
          "Perquè la Mireia pugui posar motxilles a les finestres.",
          "Perquè el segon grup se l’endugui d’excursió."
        ],
        "correct": "a",
        "explanation": "Necessiten la taula central per a les safates buides."
      },
      "motxilles": {
        "prompt": "Per què convé penjar les motxilles a l’entrada?",
        "options": [
          "Per distingir els dos grups que vénen a dinar.",
          "Perquè cada alumne recordi on trobar la fruita.",
          "Perquè es puguin tornar a parar les taules del fons.",
          "Per deixar pas entre les taules a qui porta safates."
        ],
        "correct": "d",
        "explanation": "Les motxilles a les cadires dificultarien el pas amb les safates."
      }
    },
    "openOnly": {}
  },
  "ca-S074": {
    "questions": {
      "motiu": {
        "prompt": "Per què la Laia vol copiar la recepta?",
        "options": [
          "Per preparar un pastís gran per al menjador.",
          "Per comparar el pastís amb una recepta del forn.",
          "Perquè la mare li ha demanat la recepta de l’altre dia.",
          "Perquè l’Ona vol substituir la llibreta negra."
        ],
        "correct": "c",
        "explanation": "La mare li ha encarregat copiar la recepta del pastís que van menjar."
      },
      "negra": {
        "prompt": "Per a quin recipient són les quantitats de la llibreta negra?",
        "options": [
          "Per a la safata gran rectangular del menjador.",
          "Per a una safata rodona que va deixar la Mireia.",
          "Per a dos motlles petits del restaurant.",
          "Per a la safata rodona de casa de la Laia."
        ],
        "correct": "a",
        "explanation": "La negra té les quantitats de la safata rectangular que ocupa gairebé tot el forn."
      },
      "barreja": {
        "prompt": "Quin error havia començat a fer la Laia?",
        "options": [
          "Fer una foto només del dibuix de la safata rodona.",
          "Barrejar les dues pàgines d’una mateixa recepta.",
          "Copiar dues vegades el temps de forn de la mateixa pàgina.",
          "Copiar el sucre d’una llibreta i la farina de l’altra."
        ],
        "correct": "d",
        "explanation": "Havia començat a combinar quantitats de versions per a recipients diferents."
      },
      "tria": {
        "prompt": "Per què trien la recepta verda sencera?",
        "options": [
          "Perquè encara no s’ha provat i així poden adaptar-la a la safata rodona.",
          "Perquè correspon a la safata més gran i conserva la prova amb més racions.",
          "Perquè usa la safata de la mare i manté juntes les quantitats d’una prova.",
          "Perquè poden reduir-ne el sucre i conservar la farina de la safata gran."
        ],
        "correct": "c",
        "explanation": "La verda conserva totes les quantitats d’una prova feta amb el recipient que faran servir.",
        "evidence": [
          {
            "part": "rodona",
            "quote": "La recepta de la verda la vaig fer amb la safata rodona que em va deixar la teva mare el mes passat."
          },
          {
            "part": "rodona",
            "quote": "Si copiem la verda sencera, tindrem totes les quantitats de la mateixa prova."
          }
        ]
      },
      "primer": {
        "prompt": "Què va passar la primera vegada que l’Ona va fer el pastís?",
        "options": [
          "Li va faltar sucre perquè va barrejar les llibretes.",
          "Es va enganxar i va costar treure’l sencer.",
          "Va posar el paper sobre el pastís acabat.",
          "Va quedar massa gran per entrar al forn."
        ],
        "correct": "b",
        "explanation": "Havia oblidat preparar la safata i el pastís s’hi va enganxar."
      },
      "segona": {
        "prompt": "Què explicava la pàgina següent?",
        "options": [
          "Com havia posat paper a la base el segon cop.",
          "Com fer una fotografia amb la llum de la finestra.",
          "Com fer la recepta per a la safata rectangular.",
          "Com copiar les quantitats de la llibreta negra."
        ],
        "correct": "a",
        "explanation": "Hi havia l’afegit sobre el paper a la base en la segona prova."
      },
      "aturar": {
        "prompt": "Per què la primera còpia havia quedat incompleta?",
        "options": [
          "Deixa de copiar perquè la llibreta verda només té un dibuix.",
          "Oblida el sucre perquè el copia sencer de la llibreta negra.",
          "Fa les fotos de totes dues pàgines però se les deixa al menjador.",
          "S’atura al temps de forn sense veure que la recepta continua a la pàgina següent."
        ],
        "correct": "d",
        "explanation": "Havia pres el temps de forn pel final de la recepta, però faltava una pàgina."
      },
      "comprovar": {
        "prompt": "Què faran abans que la Laia marxi amb les fotos?",
        "options": [
          "Les miraran juntes per comprovar que s’hi llegeixi tot.",
          "Compararan el sucre de la verda amb la farina de la negra.",
          "Provaran el pastís de la primera recepta barrejada.",
          "Copiaran la verda damunt de la primera còpia."
        ],
        "correct": "a",
        "explanation": "L’Ona vol revisar que les fotos mostrin les dues pàgines senceres i llegibles."
      }
    },
    "openOnly": {}
  }
};
