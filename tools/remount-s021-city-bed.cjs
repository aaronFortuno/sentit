'use strict';
// Offline revision explicitly requested by the teacher. Preserve the raw takes
// and complete dialogue; remove only the verified post-speech tail and its paper.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {ffmpeg,ffmpegBinary}=require('./audio-files.cjs'),{waveParts}=require('./gemini-result.cjs'),{wav}=require('./compact-mixed-pauses.cjs'),{silenceCut}=require('./split-synthesis-batch.cjs'),{duration}=require('./remaster-audio.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda'),sha=x=>createHash('sha256').update(x).digest('hex');
(async()=>{
 const code='S021',manifestFile=path.join(root,'assets/audio/s021-production-manifest.json'),old=JSON.parse(await fs.readFile(manifestFile));
 if(old.file!=='s021-mixed-v1.mp3')throw Error('Preserve the existing revision.');
 const {productionProgress}=await import('../content/production-progress.js'),{soundSources}=await import('../content/sound-sources.js');
 const take=JSON.parse(await fs.readFile(path.join(work,'mixed-batches/takes.json')))[code+'-T01'];
 for(const source of [take,take.body,take.intro])if(sha(await fs.readFile(source.file))!==source.sha256)throw Error('Raw take changed.');
 if(sha(await fs.readFile(path.join(root,'assets/audio',old.file)))!==old.sha256)throw Error('Master changed.');
 const folder=path.join(work,'s021/city-bed-v2');await fs.mkdir(folder,{recursive:true});const binary=await ffmpegBinary();
 const make=(name,args)=>{const file=path.join(folder,name+'.wav');ffmpeg(binary,['-v','error','-y',...args,'-ar','48000','-ac','1','-c:a','pcm_s16le',file]);return file;};
 const raw=waveParts(await fs.readFile(take.body.file)),rate=raw.format.readUInt32LE(4),frame=raw.format.readUInt16LE(12),speechEnd=take.spans.at(-1).end-take.titleCut,retainedEnd=speechEnd+.4;
 let handlePeak=0;for(let i=Math.round((retainedEnd-.008)*rate)*frame;i<Math.round((retainedEnd+.008)*rate)*frame;i+=2)handlePeak=Math.max(handlePeak,Math.abs(raw.pcm.readInt16LE(i)));
 if(handlePeak>32768*10**(-40/20))throw Error('No quiet closing handle.');
 const kept=raw.pcm.subarray(0,Math.round(retainedEnd*rate)*frame),input=path.join(folder,'body-input.wav');await fs.writeFile(input,wav(raw.format,kept));
 const split=JSON.parse(await fs.readFile(path.join(path.dirname(take.file),'split.json'))),events=[];
 for(const event of [{before:'materials',after:'vespre',source:'evsecrets-footsteps-334457',from:1.4,seconds:1.1,gap:1.45},{before:'final',after:'limit',source:'beussa-749880',from:0,seconds:.678,gap:1.05}]){
  const after=take.spans.find(s=>s.part===event.after),before=take.spans.find(s=>s.part===event.before),at=silenceCut(take.start+after.end,take.start+before.start,split.silences)-take.start-take.titleCut;
  const source=soundSources.find(s=>s.id===event.source);if(!source||sha(await fs.readFile(path.join(root,source.file)))!==source.sha256)throw Error('Effect source changed.');events.push({...event,at,recording:source});
 }
 const segments=[];let cursor=0;for(const [i,e]of events.entries()){segments.push(make('voice-'+i,['-i',input,'-af',`atrim=start=${cursor}:end=${e.at},asetpts=PTS-STARTPTS`]));segments.push(make('gap-'+i,['-f','lavfi','-i','anullsrc=r=48000:cl=mono','-t',String(e.gap)]));cursor=e.at;}
 segments.push(make('voice-end',['-i',input,'-af',`atrim=start=${cursor},asetpts=PTS-STARTPTS`]));
 const concat=path.join(folder,'voice.ffconcat');await fs.writeFile(concat,'ffconcat version 1.0\n'+segments.map(p=>`file '${p.replaceAll('\\','/')}'`).join('\n')+'\n');
 const lead=2.4,added=events.reduce((n,e)=>n+e.gap,0),voiceEnd=lead+speechEnd+added,riseStart=voiceEnd+.5,riseEnd=riseStart+.5,fadeStart=riseEnd+2,fadeEnd=fadeStart+1,total=fadeEnd+.3;
 const voice=make('voice-complete',['-f','concat','-safe','0','-i',concat,'-af',`loudnorm=I=-19:TP=-2.5:LRA=9,aresample=48000,adelay=${lead*1000}:all=1,apad=pad_dur=${total-lead-retainedEnd-added}`]);
 if(Math.abs(await duration(voice)-total)>.005)throw Error('Padded voice duration differs.');
 const city=soundSources.find(s=>s.id==='soaress-546234');if(!city||sha(await fs.readFile(path.join(root,city.file)))!==city.sha256)throw Error('City source changed.');
 const excerpt=make('city-excerpt',['-i',path.join(root,city.file),'-af','atrim=start=40:end=100,asetpts=PTS-STARTPTS,highpass=f=100,lowpass=f=2600,loudnorm=I=-28:TP=-9:LRA=6,aresample=48000']);if(await duration(excerpt)<59.9)throw Error('City excerpt too short.');
 const bed=make('city-bed',['-i',excerpt,'-i',excerpt,'-i',excerpt,'-filter_complex',`[0:a][1:a]acrossfade=d=1[first];[first][2:a]acrossfade=d=1,atrim=end=${total},volume='if(lt(t,${lead-.6}),0.35,if(lt(t,${lead}),0.35-0.17*(t-${lead-.6})/0.6,if(lt(t,${riseStart}),0.18,if(lt(t,${riseEnd}),0.18+0.37*(t-${riseStart})/0.5,0.55))))':eval=frame,afade=t=in:d=0.6,afade=t=out:st=${fadeStart}:d=1[out]`,'-map','[out]']);
 const inputs=[voice,bed],effects=[{name:city.id,start:0,source:city.file,sourceSha256:city.sha256,sourceUrl:city.url,author:city.author,license:city.license,underSpeech:true,excerpt:{start:40,seconds:60},sourceTargetLufs:-28,speechGain:.18,openingGain:.35,raisedGain:.55,lowPassHz:2600,passes:3,crossfadeSeconds:1,envelope:{riseStart,riseEnd,holdSeconds:2,fadeStart,fadeEnd}}];
 let shift=0;for(const [i,e]of events.entries()){
  const at=lead+e.at+shift+.12,track=make('event-'+i,['-i',path.join(root,e.recording.file),'-af',`atrim=start=${e.from}:end=${e.from+e.seconds},asetpts=PTS-STARTPTS,loudnorm=I=-27:TP=-9:LRA=5,afade=t=in:d=0.025,afade=t=out:st=${e.seconds-.1}:d=0.1,adelay=${Math.round(at*1000)}:all=1`]);
  inputs.push(track);effects.push({...old.effects.find(f=>f.name===e.source&&f.insertedPause),start:at});shift+=e.gap;
 }
 const body=make('body-master',[...inputs.flatMap(p=>['-i',p]),'-filter_complex',`${inputs.map((_,i)=>'['+i+':a]').join('')}amix=inputs=${inputs.length}:duration=first:normalize=0,alimiter=limit=0.75:level=false[out]`,'-map','[out]']);
 const title=make('title-master',['-i',take.intro.file,'-af','loudnorm=I=-19:TP=-2.5:LRA=9,aresample=48000,adelay=250:all=1,apad=pad_dur=0.3']);
 if(Math.abs(await duration(title)+.8-old.offset)>.001)throw Error('Title timing differs.');
 const full=make('master',['-i',title,'-f','lavfi','-t','0.8','-i','anullsrc=r=48000:cl=mono','-i',body,'-filter_complex','[0:a][1:a][2:a]concat=n=3:v=0:a=1[out]','-map','[out]']);
 const log=ffmpeg(binary,['-i',full,'-af','loudnorm=I=-19:TP=-2.5:LRA=9:print_format=json','-f','null','-']),levels=JSON.parse(log.slice(log.lastIndexOf('{'),log.lastIndexOf('}')+1));if(!(+levels.input_i>=-24&&+levels.input_i<=-15&&+levels.input_tp<=-1))throw Error('Levels outside bounds.');
 const stem='s021-city-bed-v2',files={file:stem+'.mp3',introFile:old.introFile,bodyFile:stem+'-cos.mp3'};for(const [inputFile,key]of [[full,'file'],[body,'bodyFile']]){const target=path.join(root,'assets/audio',files[key]);try{await fs.access(target);throw Error('Revision already exists.');}catch(e){if(e.code!=='ENOENT')throw e;}ffmpeg(binary,['-v','error','-i',inputFile,'-map_metadata','-1','-c:a','libmp3lame','-q:a','3',target]);}
 const report={...old,...files,bodyDuration:total,fullDuration:old.offset+total,lufs:+levels.input_i,peakDbTP:+levels.input_tp,sha256:sha(await fs.readFile(path.join(root,'assets/audio',files.file))),effects,cityBedRevision:{date:'2026-11-23',source:'tools/remount-s021-city-bed.cjs',baseFile:old.file,baseSha256:old.sha256,sourceTakeSha256:take.sha256,bodyInputSha256:take.body.sha256,retainedPcmSha256:sha(kept),retainedUntilBodySeconds:retainedEnd,quietHandlePeakDbFS:20*Math.log10(handlePeak/32768),allRetainedSpeechSamplesIdentical:true,removedClosingBreath:true,removedClosingPaper:true,midDialogueEffectsPreserved:true,voiceRetimed:false,newRequests:0,teacherFinalApproval:false}};
 await fs.writeFile(path.join(root,'assets/audio/s021-before-city-bed-manifest.json'),JSON.stringify(old,null,2)+'\n');await fs.writeFile(manifestFile,JSON.stringify(report,null,2)+'\n');await fs.writeFile(path.join(root,'assets/audio/'+stem+'-manifest.json'),JSON.stringify(report,null,2)+'\n');
 const allFile=path.join(root,'assets/audio/prototips-manifest.json'),all=JSON.parse(await fs.readFile(allFile));Object.assign(all.activities.find(e=>e.code===code),report);await fs.writeFile(allFile,JSON.stringify(all,null,2)+'\n');
 const source=path.join(root,'content/propostes/sise.js');let text=await fs.readFile(source,'utf8');const at=text.indexOf("code: 'S021'"),until=text.indexOf('    summary:',at);if(at<0||until<at)throw Error('Missing activity bounds.');
 let header=text.slice(at,until);for(const key of Object.keys(files))header=header.replaceAll(old[key],files[key]);header=header.replace(/seconds: \d+, status:/,`seconds: ${Math.ceil(report.fullDuration)}, status:`).replace(/fragment: \{ start: [\d.]+, seconds: \d+ \}/,`fragment: { start: ${old.offset}, seconds: ${Math.round(total)} }`);
 const cues=[{before:'places',text:'Ambient urbà enregistrat amb entrada suau, continu i molt tènue sota tota la conversa.'},{after:'vespre',text:'Passes enregistrades conservades a la transició, sense tapar les paraules.'},{after:'limit',text:'Full enregistrat conservat abans de l’última intervenció.'},{after:'final',text:'Sense la respiració ni el full posteriors. Mig segon de marge, pujada suau de l’ambient, dos segons i fosa d’un segon.'}];
 header+='    recordingCues: '+JSON.stringify(cues)+',\n';await fs.writeFile(source,text.slice(0,at)+header+text.slice(until));
 Object.assign(productionProgress['ca-S021'],{state:'montage-awaiting-listening',listeningApproval:false,audioSha256:report.sha256,montageNewSynthesisRequests:0,feedbackAt:'2026-11-23',feedback:[{part:'ambient',kind:'ambience',word:'Ambient urbà continu i entrada més suau',status:'applied'},{part:'final',kind:'tail',word:'Respiració i full després del final',status:'applied'}],reviewUpdate:{audio:'./assets/audio/'+files.file,at:'2026-11-23',summary:{ca:'Ambient urbà continu i molt baix; entrada més suau. Retirats la respiració i el full del final; pujada d’ambient de dos segons i fosa. Pendent d’última escolta.',es:'Ambiente urbano continuo y muy bajo; entrada más suave. Retirados la respiración y el papel finales; subida de ambiente de dos segundos y fundido. Pendiente de última escucha.'}}});
 await fs.writeFile(path.join(root,'content/production-progress.js'),'// Production stages are separate from editorial review and final listening approval.\nexport const productionProgress = '+JSON.stringify(productionProgress,null,2)+';\n');
 console.log(JSON.stringify({code,file:files.file,seconds:report.fullDuration,speechEnd:old.offset+voiceEnd,ending:{riseStart:old.offset+riseStart,hold:2,fade:1},lufs:report.lufs,peak:report.peakDbTP,newRequests:0}));
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
