'use strict';
// Offline montage of an approved complete take; no synthesis or credentials.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto'),{pathToFileURL}=require('node:url');
const {ffmpegBinary,ffmpeg,checkWave}=require('./audio-files.cjs'),{duration}=require('./remaster-audio.cjs'),{recognize}=require('./local-align.cjs');
const {productionSpec,packedProposalRequest}=require('./proposal-plan.cjs'),{assertProductionApproved,fingerprint}=require('./production-approval.cjs');
const {findPhrase,normalize}=require('./render-radio.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda');
const hash=data=>createHash('sha256').update(data).digest('hex');
const recipes={S003:{file:'s003-paraigua-v1',source:'tercer',lead:2.25,tail:3.2},S010:{file:'s010-pavello-v1',source:'quart',lead:2,tail:2},S013:{file:'s013-carta-v1',source:'quart',lead:1.1,tail:3.2},S018:{file:'s018-armari-verd-v1',source:'cinque',lead:2.7,tail:6},S022:{file:'s022-tramvia-v1',source:'sise',lead:2.7,tail:6}};
async function main(){
 const code=process.argv.find(arg=>arg.startsWith('--only='))?.slice(7).toUpperCase().replace(/^CA-/,'');
 const recipe=recipes[code];if(!recipe)throw Error('No hi ha recepta de muntatge revisada per a aquest codi.');
 const {activities}=await import(pathToFileURL(path.join(root,'catalogue.js'))),entry=activities.find(entry=>entry.code===code);
 const spec=productionSpec(entry),plans=JSON.parse(await fs.readFile(path.join(root,'content/production-plans.json'),'utf8'));assertProductionApproved(entry,spec,plans[code]);
 if(plans[code].approvedScope==='voices-only')throw Error('Les veus estan autoritzades, però el muntatge espera validar la sintonia comuna.');
 const folder=path.join(work,code.toLowerCase()),requestHash=hash(JSON.stringify(packedProposalRequest(entry)));
 const raw=path.join(folder,'titol-fragment-'+requestHash.slice(0,12)+'.wav'),bytes=await fs.readFile(raw);checkWave(bytes);
 const attempt=JSON.parse(await fs.readFile(path.join(folder,'attempt-'+requestHash.slice(0,12)+'.json'),'utf8'));
 if(attempt.state!=='complete'||attempt.audioSha256!==hash(bytes))throw Error('La presa no coincideix amb l’intent complet.');
 const alignment=await recognize(raw,path.join(folder,'alignment-packed.json')),words=alignment.words;
 const titleCount=entry.introduction.split(/\s+/u).length,lastTitle=words[titleCount-1],firstBody=words[titleCount];
 if(normalize(lastTitle.word)!==normalize(entry.introduction.split(/\s+/u).at(-1))||firstBody.start-lastTitle.end<.8)throw Error('Cal revisar manualment la pausa després del títol.');
 const cut=Math.round((lastTitle.end+firstBody.start)*500)/1000,binary=await ffmpegBinary();
 const wav=(name,args)=>{const file=path.join(folder,name+'.wav');ffmpeg(binary,['-v','error','-y',...args,'-ar','48000','-ac','1','-c:a','pcm_s16le',file]);return file;};
 const probe=wav('cut-silence-probe',['-i',raw,'-af',`atrim=start=${cut-.06}:end=${cut+.06},asetpts=PTS-STARTPTS`]);
 const probeLog=ffmpeg(binary,['-i',probe,'-af','volumedetect','-f','null','-']),cutPeak=Number(/max_volume: ([^ ]+) dB/.exec(probeLog)?.[1]);
 if(!(cutPeak<=-42))throw Error('El tall no cau dins un silenci comprovat.');
 const normalized=wav('voice-normalized-complete',['-i',raw,'-af','loudnorm=I=-19:TP=-2.5:LRA=9,aresample=48000']);
 const rawDuration=await duration(raw),lead=recipe.lead,tail=recipe.tail,voiceEnd=lead+rawDuration-cut;
 const intro=wav('title-master',['-i',normalized,'-af',`atrim=end=${cut},asetpts=PTS-STARTPTS,adelay=250:all=1,apad=pad_dur=0.3`]);
 const voice=wav('program-voice',['-i',normalized,'-af',`atrim=start=${cut},asetpts=PTS-STARTPTS,adelay=${Math.round(lead*1000)}:all=1,apad=pad_dur=${tail}`]);
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
 }else if(code==='S010'){
  const openingEnd=lead+firstBody.start-cut+.5;
  add(footsteps('route-opening-steps',openingEnd,10010,.49),'route-opening-steps',0,openingEnd);
  const index=findPhrase(words,'he vist un carreró'),start=lead+words[index].start-cut-.26;
  if(words[index].start-words[index-1].end<.34)throw Error('No hi ha prou pausa per a la passa del canvi de torn.');
  add(footsteps('route-single-step',.18,10011,.5),'route-single-step',start,start+.18);
  add(footsteps('route-leaving-steps',.9,10012,.5),'route-leaving-steps',voiceEnd+.3,voiceEnd+1.2);
 }else if(code==='S013'){
  add(paper('envelope-opening',.65,13013),'envelope-opening',0,.65);
  transition('quan la carta arriba','sorting-to-delivery',13014);
  const sting=wav('two-note-ending',['-f','lavfi','-i',"aevalsrc='0.06*sin(2*PI*if(lt(t,0.65),329.63,440)*t)*exp(-5*mod(t,0.65))':s=48000:d=1.8",'-af','lowpass=f=2400,afade=t=in:d=0.025,afade=t=out:st=1:d=0.8']);
  add(sting,'two-note-ending',voiceEnd+.4,voiceEnd+2.2);
 }else if(code==='S018'||code==='S022'){
  const {makeMusic}=require(code==='S018'?'./s018-music.cjs':'./s022-music.cjs');
  const music=await makeMusic({folder,voiceEnd,lead,tail,binary,wav});
  add(music.file,music.effect.name,music.effect.start,music.effect.end,music.effect);
  const measure=(file)=>{const log=ffmpeg(binary,['-ss',String(lead+3),'-i',file,'-t',String(Math.max(5,voiceEnd-lead-6)),'-af','ebur128=peak=true','-f','null','-']);return Number(/Integrated loudness:\s+I:\s+([^ ]+) LUFS/.exec(log)?.[1]);};
  const musicLufs=measure(music.file),voiceLufs=measure(voice);
  if(!Number.isFinite(musicLufs)||voiceLufs-musicLufs<18)throw Error('La música no queda prou per sota de la veu.');
  effects[0].speechWindowMusicLufs=musicLufs;effects[0].speechWindowVoiceLufs=voiceLufs;effects[0].speechWindowMarginDb=voiceLufs-musicLufs;
  if(code==='S018'){
   const key=wav('small-key',['-f','lavfi','-i',"aevalsrc='(0.035*sin(2*PI*1900*t)+0.019*sin(2*PI*3100*t)+0.012*sin(2*PI*4700*t))*exp(-18*t)':s=48000:d=0.32",'-af','afade=t=in:d=0.004,afade=t=out:st=0.17:d=0.15']);
   add(key,'small-key',1.7,2.02);
   transition('quan l’avi va tornar','cardboard-transition',18018);
   transition('la carpeta contenia','folder-paper',18019);
  }else{
   const tram=wav('tram-opening-rumble',['-f','lavfi','-i','anoisesrc=color=brown:amplitude=0.16:sample_rate=48000:duration=2.2:seed=22022','-af','highpass=f=55,lowpass=f=350,volume=0.14,afade=t=in:d=0.15,afade=t=out:st=1.35:d=0.85']);
   add(tram,'tram-opening-rumble',0,2.2);
   const rail=wav('small-rail-tap',['-f','lavfi','-i',"aevalsrc='(0.035*sin(2*PI*850*t)+0.02*sin(2*PI*2250*t))*exp(-40*t)':s=48000:d=0.09",'-af','afade=t=in:d=0.003,afade=t=out:st=0.055:d=0.035']);
   add(rail,'rail-opening',.7,.79);
   const index=findPhrase(words,'ahir vaig trobar'),gap=words[index].start-words[index-1].end,paperSeconds=Math.min(.4,gap-.3);
   if(paperSeconds<.14)throw Error('No hi ha prou pausa per al retorn al present.');
   const previousEnd=lead+words[index-1].end-cut,paperStart=lead+words[index].start-cut-.07-paperSeconds;
   add(rail,'rail-memory-transition',previousEnd+.07,previousEnd+.16);
   add(paper('note-paper',paperSeconds,22023),'note-paper',paperStart,paperStart+paperSeconds);
  }
 }
 const filter=effects.map((effect,i)=>`[${i+1}:a]adelay=${Math.round(effect.start*1000)}:all=1[e${i}]`).join(';')+`;[0:a]${effects.map((_,i)=>`[e${i}]`).join('')}amix=inputs=${effects.length+1}:duration=first:normalize=0[out]`;
 const body=wav('program-master',['-i',voice,...sources.flatMap(file=>['-i',file]),'-filter_complex',filter,'-map','[out]']);
 const offset=await duration(intro),bodyDuration=await duration(body);
 if(Math.abs(bodyDuration-(lead+rawDuration-cut+tail))>.002)throw Error('La durada de la veu ha canviat.');
 const full=wav('full-master',['-i',intro,'-i',body,'-filter_complex','[0:a][1:a]concat=n=2:v=0:a=1[out]','-map','[out]']);
 const mp3=(file,suffix='')=>{const target=path.join(root,'assets/audio',recipe.file+suffix+'.mp3');ffmpeg(binary,['-v','error','-y','-i',file,'-map_metadata','-1','-c:a','libmp3lame','-b:a','128k',target]);return target;};
 const introFile=mp3(intro,'-intro'),bodyFile=mp3(body,'-cos'),master=mp3(full);
 const levels=ffmpeg(binary,['-xerror','-i',master,'-af','ebur128=peak=true','-f','null','-']);
 const lufs=Number(/Integrated loudness:\s+I:\s+([^ ]+) LUFS/.exec(levels)?.[1]),peakDbTP=Number(/True peak:\s+Peak:\s+([^ ]+) dBFS/.exec(levels)?.[1]);
 if(!(lufs>=-24&&lufs<=-15&&peakDbTP<=-1))throw Error('Nivells fora de marge.');
 const provider=JSON.parse(await fs.readFile(path.join(folder,'provider-usage-packed.json'),'utf8'));
 const report={code,activity:'ca-'+code,date:new Date().toISOString(),state:'awaiting-audio-validation',model:provider.model,voices:spec.voices,newSynthesisRequests:1,approvalFingerprint:fingerprint(entry,spec,plans[code]),requestHash,rawSha256:hash(bytes),usage:provider.usage,rawDuration,cut:{at:cut,previousWordEnd:lastTitle.end,nextWordStart:firstBody.start,peakDbFS:cutPeak,rawSamplesPreserved:true},file:path.basename(master),introFile:path.basename(introFile),bodyFile:path.basename(bodyFile),offset,bodyDuration,fullDuration:offset+bodyDuration,lufs,peakDbTP,voice:{bodyLead:lead,bodyRawDuration:rawDuration-cut,untrimmedApartFromSilenceSplit:true,retimed:false},...(spec.performance?{vocalPerformance:{...spec.performance,source:'Gemini TTS in the same take',listeningValidation:'pending'}}:{}),effects,sha256:hash(await fs.readFile(master))};
 const {musicForActivity}=await import(pathToFileURL(path.join(root,'content/music-catalogue.js'))),musicTrack=musicForActivity(entry);
 if(effects.some(effect=>effect.name==='gentle-narration-bed'||effect.name==='gentle-tram-memory-bed')){
  if(!musicTrack)throw Error('La base musical necessita una entrada al catàleg de músiques.');
  report.musicTrack={id:musicTrack.id,title:musicTrack.title,author:musicTrack.author,license:musicTrack.license,source:musicTrack.source};
 }
 await fs.writeFile(path.join(root,`assets/audio/${code.toLowerCase()}-production-manifest.json`),JSON.stringify(report,null,2)+'\n');
 const manifestFile=path.join(root,'assets/audio/prototips-manifest.json'),manifest=JSON.parse(await fs.readFile(manifestFile,'utf8')),index=manifest.activities.findIndex(item=>item.code===code);
 if(index<0)manifest.activities.push(report);else manifest.activities[index]=report;manifest.state='partially-produced-awaiting-validation';await fs.writeFile(manifestFile,JSON.stringify(manifest,null,2)+'\n');
 const contentFile=path.join(root,`content/propostes/${recipe.source}.js`);let content=await fs.readFile(contentFile,'utf8');
 const marker=content.indexOf(`code: '${code}'`),lineEnd=content.indexOf('\n',marker);if(marker<0)throw Error('Codi absent al fitxer de contingut.');
 if(!content.slice(lineEnd,lineEnd+400).includes(`./assets/audio/${recipe.file}.mp3`)){
  const metadata=`\n    seconds: ${Math.ceil(report.fullDuration)}, status: 'ready-for-review', reviewStatus: 'audio-review',\n    audio: './assets/audio/${report.file}', tracks: { introduction: './assets/audio/${report.introFile}', body: './assets/audio/${report.bodyFile}' },\n    fragment: { start: ${offset}, seconds: ${Math.round(bodyDuration)} },`;
  content=content.slice(0,lineEnd)+metadata+content.slice(lineEnd);await fs.writeFile(contentFile,content);
 }
 console.log(JSON.stringify({code,bodyDuration,fullDuration:report.fullDuration,cut:report.cut,lufs,peakDbTP,usage:provider.usage}));
}
if(require.main===module)main().catch(error=>{console.error(error.message);process.exitCode=1;});
module.exports={main};
