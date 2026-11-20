'use strict';
// Offline montage of an approved complete take; no synthesis or credentials.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto'),{pathToFileURL}=require('node:url');
const {ffmpegBinary,ffmpeg,checkWave}=require('./audio-files.cjs'),{duration}=require('./remaster-audio.cjs'),{recognize}=require('./local-align.cjs');
const {productionSpec,packedProposalRequest}=require('./proposal-plan.cjs'),{assertProductionApproved,fingerprint}=require('./production-approval.cjs');
const {findPhrase,normalize}=require('./render-radio.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda');
const hash=data=>createHash('sha256').update(data).digest('hex');
const recipes={S020:{file:'s020-podcasts-v1',source:'sise',titleWords:8,titleLastWord:'podcast',titleCut:4.01,lead:4.3,tail:4.5},S023:{file:'s023-mercat-v1',content:'content/reobren-el-mercat.js',lead:2.5,tail:3.2},S019:{file:'s019-cuinera-v2',source:'sise',titleCut:3.95,lead:2.8,tail:5},S004D:{file:'s004d-boto-dialogat-v1',source:'variants',titleMinGap:.7,lead:2.7,tail:4},S005:{file:'s005-cartera-v1',source:'tercer',lead:2.5,tail:3.2},S004:{file:'s004-boto-v1',source:'tercer',lead:2.7,tail:4},S003:{file:'s003-paraigua-v1',source:'tercer',lead:2.25,tail:3.2},S010:{file:'s010-pavello-v2',source:'quart',lead:2,tail:2},S012:{file:'s012-instruments-v2',source:'quart',titleWords:7,lead:3.6,tail:7.3},S013:{file:'s013-carta-v2',source:'quart',lead:1.1,tail:3.2},S016:{file:'s016-jaciment-v1',source:'cinque',titleMinGap:.5,lead:2.3,tail:2.8},S018:{file:'s018-armari-verd-v1',source:'cinque',lead:2.7,tail:6},S022:{file:'s022-tramvia-v2',source:'sise',lead:2.7,tail:6}};
async function main(){
 const code=process.argv.find(arg=>arg.startsWith('--only='))?.slice(7).toUpperCase().replace(/^CA-/,'');
 const recipe=recipes[code];if(!recipe)throw Error('No hi ha recepta de muntatge revisada per a aquest codi.');
 const {activities}=await import(pathToFileURL(path.join(root,'catalogue.js'))),entry=activities.find(entry=>entry.code===code);
 if(entry.reviewStatus==='validated')throw Error('La peça està publicada definitivament. Cal obrir una revisió abans de modificar el màster validat.');
 const news=code==='S023'?require('./news-production.cjs'):null,spec=news?.spec??productionSpec(entry),plans=JSON.parse(await fs.readFile(path.join(root,'content/production-plans.json'),'utf8'));assertProductionApproved(entry,spec,plans[code]);
 if(plans[code].approvedScope==='voices-only')throw Error('Les veus estan autoritzades, però el muntatge espera validar la sintonia comuna.');
 const folder=path.join(work,code.toLowerCase());
 const reuse=await require('./reuse-final-suffix.cjs').reuseFinalSuffix(entry,spec,plans[code],folder,hash);
 const requestHash=reuse?.sourceRequestHash??hash(JSON.stringify(news?news.packedNewsRequest(entry):packedProposalRequest(entry)));
 const raw=path.join(folder,'titol-fragment-'+requestHash.slice(0,12)+'.wav'),bytes=await fs.readFile(raw);checkWave(bytes);
 const attempt=JSON.parse(await fs.readFile(path.join(folder,'attempt-'+requestHash.slice(0,12)+'.json'),'utf8'));
 if(attempt.state!=='complete'||attempt.audioSha256!==hash(bytes))throw Error('La presa no coincideix amb l’intent complet.');
 const alignment=await recognize(raw,path.join(folder,'alignment-packed.json')),words=alignment.words;
 const titleCount=recipe.titleWords??entry.introduction.split(/\s+/u).filter(word=>/[\p{L}\p{N}]/u.test(word)).length,lastTitle=words[titleCount-1],firstBody=words[titleCount];
 if(normalize(lastTitle.word)!==normalize(recipe.titleLastWord??entry.introduction.split(/\s+/u).at(-1))||firstBody.start-lastTitle.end<(recipe.titleMinGap??.8))throw Error('Cal revisar manualment la pausa després del títol.');
 const cut=recipe.titleCut??Math.round((lastTitle.end+firstBody.start)*500)/1000,binary=await ffmpegBinary();
 if(cut<=lastTitle.end+.15||cut>=firstBody.start-.15)throw Error('El tall no deixa prou marge als mots del títol i del fragment.');
 const wav=(name,args)=>{const file=path.join(folder,name+'.wav');ffmpeg(binary,['-v','error','-y',...args,'-ar','48000','-ac','1','-c:a','pcm_s16le',file]);return file;};
 const probe=wav('cut-silence-probe',['-i',raw,'-af',`atrim=start=${cut-.06}:end=${cut+.06},asetpts=PTS-STARTPTS`]);
 const probeLog=ffmpeg(binary,['-i',probe,'-af','volumedetect','-f','null','-']),cutPeak=Number(/max_volume: ([^ ]+) dB/.exec(probeLog)?.[1]);
 if(!(cutPeak<=-42))throw Error('El tall no cau dins un silenci comprovat.');
 const normalized=wav('voice-normalized-complete',['-i',raw,'-af','loudnorm=I=-19:TP=-2.5:LRA=9,aresample=48000']);
 const rawDuration=await duration(raw),lead=recipe.lead,tail=recipe.tail;
 let bodyRawDuration=rawDuration-cut,bodyVoice=normalized;
 if(reuse){
  const retained=words.slice(-2),prior=words[words.length-3],removedStart=findPhrase(words,'doncs avui torno');
  if(normalize(retained[0].word)!=='gracies'||reuse.removeStart<=words[removedStart-1].end||reuse.removeStart>=words[removedStart].start||reuse.removeEnd<=prior.end||reuse.removeEnd>=retained[0].start)throw Error('El retall no deixa marges als mots del comiat.');
  reuse.silenceChecks=[];
  for(const at of [reuse.removeStart,reuse.removeEnd]){
   const check=wav('suffix-cut-'+String(at).replace('.','-'),['-i',raw,'-af',`atrim=start=${at-.04}:end=${at+.04},asetpts=PTS-STARTPTS`]);
   const log=ffmpeg(binary,['-i',check,'-af','volumedetect','-f','null','-']),peakDbFS=Number(/max_volume: ([^ ]+) dB/.exec(log)?.[1]);
   if(!(peakDbFS<=-42))throw Error('El retall editorial no cau dins silenci comprovat.');
   reuse.silenceChecks.push({at,peakDbFS});
  }
  bodyVoice=wav('voice-editorial-suffix',['-i',normalized,'-filter_complex',`[0:a]asplit[a][b];[a]atrim=end=${reuse.removeStart},asetpts=PTS-STARTPTS[first];[b]atrim=start=${reuse.removeEnd},asetpts=PTS-STARTPTS[last];[first][last]concat=n=2:v=0:a=1[out]`,'-map','[out]']);
  bodyRawDuration-=reuse.removedSeconds;
 }
 const voiceEnd=lead+bodyRawDuration;
 const intro=wav('title-master',['-i',normalized,'-af',`atrim=end=${cut},asetpts=PTS-STARTPTS,adelay=250:all=1,apad=pad_dur=0.3`]);
 const voice=wav('program-voice',['-i',bodyVoice,'-af',`atrim=start=${cut},asetpts=PTS-STARTPTS,adelay=${Math.round(lead*1000)}:all=1,apad=pad_dur=${tail}`]);
 const effects=[],sources=[];
 const add=(file,name,start,end,details={})=>{effects.push({name,start,end,origin:'original-procedural',...details});sources.push(file);};
 const paper=(name,seconds,seed)=>wav(name,['-f','lavfi','-i',`anoisesrc=color=pink:amplitude=0.12:sample_rate=48000:duration=${seconds}:seed=${seed}`,'-af',`highpass=f=1100,lowpass=f=5800,volume=0.06,afade=t=in:d=0.025,afade=t=out:st=${Math.max(.03,seconds-.25)}:d=${Math.min(.25,seconds-.03)}`]);
 function transition(phrase,name,seed){const index=findPhrase(words,phrase),gap=words[index].start-words[index-1].end,seconds=Math.min(.45,gap-.16);if(seconds<.12)throw Error('No hi ha prou marge per a la transició de paper.');const start=lead+words[index].start-cut-.08-seconds;add(paper(name,seconds,seed),name,start,start+seconds);}
 const footsteps=(name,seconds,seed,period)=>wav(name,['-f','lavfi','-i',`anoisesrc=color=brown:amplitude=0.12:sample_rate=48000:duration=${seconds}:seed=${seed}`,'-af',`highpass=f=65,lowpass=f=1250,volume='0.025+0.65*exp(-55*mod(t,${period}))':eval=frame,afade=t=in:d=0.04,afade=t=out:st=${Math.max(.04,seconds-.7)}:d=${Math.min(.7,seconds-.04)}`]);
 if(code==='S003'){
  const ambientEnd=lead+words[findPhrase(words,'hola biel')].start-cut-.18;
  add(footsteps('corridor-steps',ambientEnd,3003,.49),'corridor-steps',0,ambientEnd);
  transition('aquí hi ha la cinta','bag-rustle',3004);
  add(footsteps('leaving-steps',2.2,3005,.52),'leaving-steps',voiceEnd+.4,voiceEnd+2.6);
 }else if(code==='S005'){
  const sting=wav('postal-opening-sting',['-f','lavfi','-i',"aevalsrc='0.045*sin(2*PI*if(lt(t,0.5),349.23,523.25)*t)*exp(-5*mod(t,0.5))':s=48000:d=1.8",'-af','afade=t=in:d=0.025,afade=t=out:st=1:d=0.8']);
  add(sting,'postal-opening-sting',0,1.8);
  add(paper('envelopes-opening',.55,5005),'envelopes-opening',1.8,2.35);
  // The local aligner splits ‘què passa si’ into three unreliable tokens; anchor on the following exact words.
  const index=findPhrase(words,'el número del carrer')-3;
  if(normalize(words[index]?.word??'')!=='que')throw Error('Cal revisar el principi de la pregunta del carrer.');
  const gap=words[index].start-words[index-1].end,seconds=Math.min(.65,gap-.16);
  if(seconds<.15)throw Error('No hi ha prou pausa per al canvi de recorregut.');
  const start=lead+words[index].start-cut-.08-seconds;
  add(footsteps('postal-route-steps',seconds,5006,.45),'postal-route-steps',start,start+seconds);
  add(sting,'postal-ending-sting',voiceEnd+.4,voiceEnd+2.2);
 }else if(code==='S010'){
  const {soundSourcesForActivity}=await import(pathToFileURL(path.join(root,'content/sound-sources.js')));
  const recording=soundSourcesForActivity(entry).find(source=>source.id==='evsecrets-footsteps-334457'),approved=plans[code].externalRecordings?.find(source=>source.id===recording?.id);
  if(!recording||!approved||approved.sha256!==recording.sha256||JSON.stringify(approved.excerpts)!==JSON.stringify(recording.excerpts)||approved.license!==recording.license)throw Error('Els passos no coincideixen amb la font i fragments aprovats.');
  const sourceFile=path.join(root,recording.file);
  if(hash(await fs.readFile(sourceFile))!==recording.sha256)throw Error('La gravació dels passos ha canviat.');
  function recordedSteps(name,excerpt,start){
   const seconds=excerpt.seconds,fade=Math.min(.4,seconds*.4);
   const file=wav(name,['-i',sourceFile,'-af',`atrim=start=${excerpt.start}:duration=${seconds},asetpts=PTS-STARTPTS,highpass=f=75,volume=0.45,afade=t=in:d=${Math.min(.04,seconds*.1)},afade=t=out:st=${seconds-fade}:d=${fade}`]);
   add(file,name,start,start+seconds,{origin:'external-recording',source:recording.file,sourceSha256:recording.sha256,sourceId:recording.id,author:recording.author,license:recording.license,url:recording.url,excerpt:{start:excerpt.start,end:excerpt.start+seconds},retimed:false,pitchShifted:false});
  }
  const openingEnd=lead+firstBody.start-cut+.5;
  if(Math.abs(openingEnd-recording.excerpts.opening.seconds)>.002)throw Error('La pausa inicial ha canviat: revisar el fragment de passos.');
  recordedSteps('route-opening-steps',recording.excerpts.opening,0);
  const index=findPhrase(words,'he vist un carreró'),start=lead+words[index].start-cut-.26;
  if(words[index].start-words[index-1].end<.34)throw Error('No hi ha prou pausa per a la passa del canvi de torn.');
  recordedSteps('route-single-step',recording.excerpts.transition,start);
  recordedSteps('route-leaving-steps',recording.excerpts.leaving,voiceEnd+.3);
 }else if(code==='S012'){
  const {soundSourcesForActivity}=await import(pathToFileURL(path.join(root,'content/sound-sources.js')));
  const recording=soundSourcesForActivity(entry).find(source=>source.id==='khenshom-guitar-537084');
  const approved=plans[code].externalRecordings?.find(source=>source.id===recording?.id);
  if(!recording||!approved||approved.sha256!==recording.sha256||JSON.stringify(approved.excerpt)!==JSON.stringify(recording.excerpt)||approved.license!==recording.license)throw Error('La gravació real no coincideix amb la font i el fragment aprovats.');
  const sourceFile=path.join(root,recording.file);
  if(hash(await fs.readFile(sourceFile))!==recording.sha256)throw Error('La gravació real de guitarra ha canviat.');
  const scene=await require('./recorded-scenes.cjs').guitarSequence({root,binary,wav,recording,voice,lead,voiceEnd,tail,speechStart:lead+firstBody.start-cut});
  add(scene.file,scene.effect.name,scene.effect.start,scene.effect.end,scene.effect);
  transition('i perquè tens els instruments','workshop-paper',12012);
 }else if(code==='S013'){
  add(paper('envelope-opening',.65,13013),'envelope-opening',0,.65);
  transition('quan la carta arriba','sorting-to-delivery',13014);
  // The teacher rejected the two-note ending. Keep the complete voice and a silent tail.
 }else if(code==='S019'){
  const {soundSourcesForActivity}=await import(pathToFileURL(path.join(root,'content/sound-sources.js')));
  const recording=soundSourcesForActivity(entry).find(source=>source.id==='soundtasticpro-kitchen-484572'),approved=plans[code].externalRecordings?.find(source=>source.id===recording?.id);
  if(!recording||!approved||approved.sha256!==recording.sha256||approved.license!==recording.license)throw Error('L’ambient de cuina no coincideix amb la font aprovada.');
  if(hash(await fs.readFile(path.join(root,recording.file)))!==recording.sha256)throw Error('La gravació de cuina ha canviat.');
  const scene=await require('./recorded-scenes.cjs').kitchenBed({root,binary,wav,recording,voice,lead,voiceEnd,tail});
  if(scene.effect.envelope.duckBeforeSpeech.end>lead+firstBody.start-cut-.15)throw Error('L’ambient no baixa prou abans de la primera paraula.');
  add(scene.file,scene.effect.name,scene.effect.start,scene.effect.end,scene.effect);
 }else if(code==='S020'){
  const jingle=JSON.parse(await fs.readFile(path.join(root,'assets/audio/mireia-jingle-proposta-v1.json'),'utf8'));
  const approved=plans[code].sharedJingle;
  if(jingle.status!=='approved'||!jingle.approval||approved?.id!=='petita-descoberta')throw Error('La sintonia del programa necessita aprovació.');
  for(const kind of ['obertura','tancament']){
   const track=jingle.files.find(file=>file.kind===kind),file=path.join(root,track.file);
   if(hash(await fs.readFile(file))!==track.sha256||approved[kind]!==track.sha256)throw Error('La sintonia aprovada ha canviat.');
   const start=kind==='obertura'?0:voiceEnd+.35;
   if((kind==='obertura'&&track.durationSeconds>lead-.3)||(kind==='tancament'&&start+track.durationSeconds>voiceEnd+tail-.6))throw Error('No hi ha prou marge fora de la veu per a la sintonia.');
   add(file,'petita-descoberta-'+kind,start,start+track.durationSeconds,{origin:'original-procedural-composition',source:track.file,sourceSha256:track.sha256,sourceId:'petita-descoberta',author:'Sentit',license:'MIT',retimed:false});
  }
  const index=findPhrase(words,'quan l’arxiu estigui pujat'),gap=words[index].start-words[index-1].end,seconds=Math.min(.09,gap-.18);
  if(seconds<.035)throw Error('Cal revisar la pausa de la comprovació abans de posar el clic.');
  const start=lead+words[index].start-cut-.09-seconds;
  const click=wav('podcast-check-click',['-f','lavfi','-i',`anoisesrc=color=pink:amplitude=0.05:sample_rate=48000:duration=${seconds}:seed=20020`,'-af',`highpass=f=650,lowpass=f=3200,volume=0.16,afade=t=in:d=0.003,afade=t=out:st=${Math.max(.005,seconds-.025)}:d=0.025`]);
  add(click,'podcast-check-click',start,start+seconds);
 }else if(code==='S023'){
  const sting=wav('market-news-sting',['-f','lavfi','-i',"aevalsrc='0.045*sin(2*PI*if(lt(t,0.5),392,if(lt(t,1),493.88,587.33))*t)*(1-exp(-80*mod(t,0.5)))*exp(-5*mod(t,0.5))':s=48000:d=2",'-af','afade=t=in:d=0.025,afade=t=out:st=1.35:d=0.65']);
  add(sting,'market-news-opening',0,2);
  const index=findPhrase(words,'parlem amb en pau'),gap=words[index].start-words[index-1].end,seconds=Math.min(.8,gap-.16);
  if(seconds<.2)throw Error('Cal revisar la pausa abans del testimoni del mercat.');
  const start=lead+words[index].start-cut-.08-seconds;
  add(footsteps('market-hall-steps',seconds,23023,.4),'market-hall-steps',start,start+seconds);
  const hall=wav('market-hall-air',['-f','lavfi','-i',`anoisesrc=color=pink:amplitude=0.045:sample_rate=48000:duration=${seconds}:seed=23024`,'-af',`highpass=f=150,lowpass=f=1800,volume=0.05,afade=t=in:d=0.04,afade=t=out:st=${seconds-.12}:d=0.12`]);
  add(hall,'market-hall-air',start,start+seconds);
  add(paper('market-paper',.22,23025),'market-paper',lead+words[index].start-cut-.1,lead+words[index].start-cut+.12);
  add(sting,'market-news-ending',voiceEnd+.3,voiceEnd+2.3);
 }else if(code==='S016'){
  const sting=(name,frequencies)=>wav(name,['-f','lavfi','-i',`aevalsrc='0.045*sin(2*PI*if(lt(t,0.5),${frequencies[0]},if(lt(t,1),${frequencies[1]},${frequencies[2]}))*t)*(1-exp(-90*mod(t,0.5)))*exp(-5*mod(t,0.5))':s=48000:d=2`,'-af','afade=t=in:d=0.025,afade=t=out:st=1.35:d=0.65']);
  add(sting('news-opening',[329.63,440,523.25]),'news-opening',0,2);
  const ambient=wav('quiet-worksite-opening',['-f','lavfi','-i','anoisesrc=color=pink:amplitude=0.04:sample_rate=48000:duration=1.8:seed=16016','-af','highpass=f=200,lowpass=f=1600,volume=0.04,afade=t=in:d=0.15,afade=t=out:st=0.8:d=1']);
  add(ambient,'quiet-worksite-opening',0,1.8);
  transition('també hi ha hagut preguntes','news-source-paper',16017);
  add(sting('news-ending',[523.25,440,329.63]),'news-ending',voiceEnd+.2,voiceEnd+2.2);
 }else if(['S004','S004D','S018','S022'].includes(code)){
  const {makeMusic}=require('./'+(code==='S004D'?'s004':code.toLowerCase())+'-music.cjs');
  const music=await makeMusic({folder,voiceEnd,lead,tail,binary,wav});
  add(music.file,music.effect.name,music.effect.start,music.effect.end,music.effect);
  const measure=(file)=>{const log=ffmpeg(binary,['-ss',String(lead+3),'-i',file,'-t',String(Math.max(5,voiceEnd-lead-6)),'-af','ebur128=peak=true','-f','null','-']);return Number(/Integrated loudness:\s+I:\s+([^ ]+) LUFS/.exec(log)?.[1]);};
  const musicLufs=measure(music.file),voiceLufs=measure(voice);
  if(!Number.isFinite(musicLufs)||voiceLufs-musicLufs<18)throw Error('La música no queda prou per sota de la veu.');
  effects[0].speechWindowMusicLufs=musicLufs;effects[0].speechWindowVoiceLufs=voiceLufs;effects[0].speechWindowMarginDb=voiceLufs-musicLufs;
  if(code==='S004'||code==='S004D'){
   const index=findPhrase(words,code==='S004'?'van sortir plegats':'vaig mirar el menjador'),gap=words[index].start-words[index-1].end,seconds=Math.min(.45,gap-.16);
   if(seconds<.12)throw Error('No hi ha prou pausa per al fregadís de roba.');
   const start=lead+words[index].start-cut-.08-seconds;
   const cloth=wav('jacket-cloth',['-f','lavfi','-i',`anoisesrc=color=pink:amplitude=0.1:sample_rate=48000:duration=${seconds}:seed=4004`,'-af',`highpass=f=250,lowpass=f=2600,volume=0.045,afade=t=in:d=0.025,afade=t=out:st=${Math.max(.03,seconds-.12)}:d=${Math.min(.12,seconds-.03)}`]);
   add(cloth,'jacket-cloth',start,start+seconds);
  }else if(code==='S018'){
   const key=wav('small-key',['-f','lavfi','-i',"aevalsrc='(0.035*sin(2*PI*1900*t)+0.019*sin(2*PI*3100*t)+0.012*sin(2*PI*4700*t))*exp(-18*t)':s=48000:d=0.32",'-af','afade=t=in:d=0.004,afade=t=out:st=0.17:d=0.15']);
   add(key,'small-key',1.7,2.02);
   transition('quan l’avi va tornar','cardboard-transition',18018);
   transition('la carpeta contenia','folder-paper',18019);
  }else{
   const {soundSourcesForActivity}=await import(pathToFileURL(path.join(root,'content/sound-sources.js')));
   const recording=soundSourcesForActivity(entry).find(source=>source.id==='migweis-tram-713419'),approved=plans[code].externalRecordings?.find(source=>source.id===recording?.id);
   if(!recording||!approved||approved.sha256!==recording.sha256||JSON.stringify(approved.excerpts)!==JSON.stringify(recording.excerpts)||approved.license!==recording.license)throw Error('El tramvia no coincideix amb la font aprovada.');
   const sourceFile=path.join(root,recording.file);if(hash(await fs.readFile(sourceFile))!==recording.sha256)throw Error('La font del tramvia ha canviat.');
   function tramRecording(name,excerpt,start){
    const file=wav(name,['-i',sourceFile,'-af',`atrim=start=${excerpt.start}:duration=${excerpt.seconds},asetpts=PTS-STARTPTS,highpass=f=70,volume=0.1,afade=t=in:d=0.08,afade=t=out:st=${excerpt.seconds-.25}:d=0.25`]);
    add(file,name,start,start+excerpt.seconds,{origin:'external-recording',source:recording.file,sourceSha256:recording.sha256,sourceId:recording.id,author:recording.author,license:recording.license,url:recording.url,excerpt:{start:excerpt.start,end:excerpt.start+excerpt.seconds},retimed:false,pitchShifted:false});
   }
   tramRecording('real-tram-opening',recording.excerpts.opening,0);
   const index=findPhrase(words,'ahir vaig trobar'),gap=words[index].start-words[index-1].end,paperSeconds=Math.min(.4,gap-.3);
   if(paperSeconds<.14)throw Error('No hi ha prou pausa per al retorn al present.');
   const previousEnd=lead+words[index-1].end-cut,paperStart=lead+words[index].start-cut-.07-paperSeconds;
   if(previousEnd+.07+recording.excerpts.transition.seconds>paperStart-.05)throw Error('El tramvia no cap dins la pausa: cal revisar el muntatge.');
   tramRecording('real-tram-memory-transition',recording.excerpts.transition,previousEnd+.07);
   add(paper('note-paper',paperSeconds,22023),'note-paper',paperStart,paperStart+paperSeconds);
  }
 }
 const filter=effects.map((effect,i)=>`[${i+1}:a]adelay=${Math.round(effect.start*1000)}:all=1[e${i}]`).join(';')+`;[0:a]${effects.map((_,i)=>`[e${i}]`).join('')}amix=inputs=${effects.length+1}:duration=first:normalize=0[out]`;
 const body=wav('program-master',['-i',voice,...sources.flatMap(file=>['-i',file]),'-filter_complex',filter,'-map','[out]']);
 const offset=await duration(intro),bodyDuration=await duration(body);
 if(Math.abs(bodyDuration-(lead+bodyRawDuration+tail))>.002)throw Error('La durada de la veu ha canviat.');
 const full=wav('full-master',['-i',intro,'-i',body,'-filter_complex','[0:a][1:a]concat=n=2:v=0:a=1[out]','-map','[out]']);
 const mp3=(file,suffix='')=>{const target=path.join(root,'assets/audio',recipe.file+suffix+'.mp3');ffmpeg(binary,['-v','error','-y','-i',file,'-map_metadata','-1','-c:a','libmp3lame','-b:a','128k',target]);return target;};
 const introFile=mp3(intro,'-intro'),bodyFile=mp3(body,'-cos'),master=mp3(full);
 const levels=ffmpeg(binary,['-xerror','-i',master,'-af','ebur128=peak=true','-f','null','-']);
 const lufs=Number(/Integrated loudness:\s+I:\s+([^ ]+) LUFS/.exec(levels)?.[1]),peakDbTP=Number(/True peak:\s+Peak:\s+([^ ]+) dBFS/.exec(levels)?.[1]);
 if(!(lufs>=-24&&lufs<=-15&&peakDbTP<=-1))throw Error('Nivells fora de marge.');
 const provider=JSON.parse(await fs.readFile(path.join(folder,'provider-usage-packed.json'),'utf8'));
 const report={code,activity:'ca-'+code,date:new Date().toISOString(),state:'awaiting-audio-validation',model:provider.model,voices:spec.voices,newSynthesisRequests:1,approvalFingerprint:fingerprint(entry,spec,plans[code]),requestHash,rawSha256:hash(bytes),usage:provider.usage,rawDuration,cut:{at:cut,previousWordEnd:lastTitle.end,nextWordStart:firstBody.start,peakDbFS:cutPeak,rawSamplesPreserved:true},file:path.basename(master),introFile:path.basename(introFile),bodyFile:path.basename(bodyFile),offset,bodyDuration,fullDuration:offset+bodyDuration,lufs,peakDbTP,voice:{bodyLead:lead,bodyRawDuration,untrimmedApartFromSilenceSplit:!reuse,retimed:false},...(spec.performance?{vocalPerformance:{...spec.performance,source:'Gemini TTS in the same take',listeningValidation:'pending'}}:{}),...(spec.overlaps?{vocalOverlaps:{requested:spec.overlaps,source:'Gemini TTS in the same take',listeningValidation:'pending'}}:{}),...(reuse?{editorialEdit:reuse,montageNewSynthesisRequests:0}:{}),effects,sha256:hash(await fs.readFile(master))};
 const {musicForActivity}=await import(pathToFileURL(path.join(root,'content/music-catalogue.js'))),musicTrack=musicForActivity(entry);
 if(code==='S020'){report.montageNewSynthesisRequests=0;report.sharedJingle={id:'petita-descoberta',approvedAt:'2026-11-20',opening:effects[0].sourceSha256,closing:effects[1].sourceSha256};}
 if(['S010','S013','S022','S012','S019'].includes(code)){
  const previousFile=path.join(folder,'before-remount-v2.json');
  if(!await fs.stat(previousFile).catch(error=>{if(error.code==='ENOENT')return null;throw error;}))await fs.copyFile(path.join(root,`assets/audio/${code.toLowerCase()}-production-manifest.json`),previousFile);
  const previous=JSON.parse(await fs.readFile(previousFile,'utf8'));
  if(previous.rawSha256!==report.rawSha256||previous.requestHash!==report.requestHash)throw Error('El remuntatge ha canviat la presa de veu.');
  report.montageNewSynthesisRequests=0;
  report.previousMaster={file:previous.file,sha256:previous.sha256};
  if(['S012','S019'].includes(code)){
   report.state='awaiting-montage-validation';
   const {productionProgress}=await import(pathToFileURL(path.join(root,'content/production-progress.js')));
   report.voiceValidation=productionProgress['ca-'+code].voiceValidation;
   if(!report.voiceValidation?.approved||report.voiceValidation.rawSha256!==report.rawSha256)throw Error('La veu no coincideix amb la validada pel docent.');
  }else{
   report.state='awaiting-pronunciation-correction-and-audio-review';
   report.pronunciationRepair={plan:'content/audio-repairs.json',status:'pending-quota-and-listening',applied:false};
  }
 }
 if(effects.some(effect=>effect.name==='gentle-narration-bed'||effect.name==='gentle-tram-memory-bed')){
  if(!musicTrack)throw Error('La base musical necessita una entrada al catàleg de músiques.');
  report.musicTrack={id:musicTrack.id,title:musicTrack.title,author:musicTrack.author,license:musicTrack.license,source:musicTrack.source};
 }
 await fs.writeFile(path.join(root,`assets/audio/${code.toLowerCase()}-production-manifest.json`),JSON.stringify(report,null,2)+'\n');
 const manifestFile=path.join(root,'assets/audio/prototips-manifest.json'),manifest=JSON.parse(await fs.readFile(manifestFile,'utf8')),index=manifest.activities.findIndex(item=>item.code===code);
 if(index<0)manifest.activities.push(report);else manifest.activities[index]=report;manifest.state='partially-produced-awaiting-validation';await fs.writeFile(manifestFile,JSON.stringify(manifest,null,2)+'\n');
 const contentFile=path.join(root,recipe.content??`content/propostes/${recipe.source}.js`);let content=await fs.readFile(contentFile,'utf8');
 const marker=content.indexOf(`code: '${code}'`),lineEnd=content.indexOf('\n',marker);if(marker<0)throw Error('Codi absent al fitxer de contingut.');
 if(code==='S023'){
  content=content.replace(/genre: 'news', seconds: \d+/,`genre: 'news', seconds: ${Math.ceil(report.fullDuration)}`).replace(/status: '[^']+'/,"status: 'ready-for-review'").replace(/reviewStatus: '[^']+'/,"reviewStatus: 'audio-review'");
  content=content.replace(/audio: null,/,`audio: './assets/audio/${report.file}', tracks: { introduction: './assets/audio/${report.introFile}', body: './assets/audio/${report.bodyFile}' },`);
  content=content.replace(/fragment: \{ start: [\d.]+, seconds: [\d.]+ \}/,`fragment: { start: ${offset}, seconds: ${Math.round(bodyDuration)} }`);
  await fs.writeFile(contentFile,content);
 }else if(!content.slice(lineEnd,lineEnd+400).includes(`./assets/audio/${recipe.file}.mp3`)){
  const metadata=`\n    seconds: ${Math.ceil(report.fullDuration)}, status: 'ready-for-review', reviewStatus: 'audio-review',\n    audio: './assets/audio/${report.file}', tracks: { introduction: './assets/audio/${report.introFile}', body: './assets/audio/${report.bodyFile}' },\n    fragment: { start: ${offset}, seconds: ${Math.round(bodyDuration)} },`;
  const summaryStart=content.indexOf('    summary:',lineEnd);
  if(summaryStart<0||summaryStart-lineEnd>1200)throw Error('No es pot actualitzar la capçalera d’àudio amb seguretat.');
  content=content.slice(0,lineEnd)+metadata+'\n'+content.slice(summaryStart);await fs.writeFile(contentFile,content);
 }
 console.log(JSON.stringify({code,bodyDuration,fullDuration:report.fullDuration,cut:report.cut,lufs,peakDbTP,usage:provider.usage}));
}
if(require.main===module)main().catch(error=>{console.error(error.message);process.exitCode=1;});
module.exports={main};
