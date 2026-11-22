'use strict';
// Explicit revisions of existing news masters. New voice takes wait for audition.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {ffmpeg,ffmpegBinary}=require('./audio-files.cjs'),{waveParts}=require('./gemini-result.cjs'),{wav}=require('./compact-mixed-pauses.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda'),sha=x=>createHash('sha256').update(x).digest('hex');
const musicName='grand_project-breaking-news-background-music-505617.mp3';
const musicCredit={id:'grand-project-breaking-news-505617',title:'Breaking News Background Music',author:'Grand_Project',url:'https://pixabay.com/music/percussion-breaking-news-background-music-505617/',license:'Pixabay Content License',licenseUrl:'https://pixabay.com/service/license-summary/',source:'tools/remount-news-common.cjs',origin:'licensed-music',kind:'news-programme',sourceNotDistributedSeparately:true};
function quietCut(pcm,rate,frame,target){
 for(const offset of [0,-.025,.025,-.05,.05,-.075,.075]){const at=Math.max(0,target+offset),a=Math.max(0,Math.floor((at-.006)*rate)*frame),b=Math.min(pcm.length,Math.ceil((at+.006)*rate)*frame);let max=0;for(let i=a;i<b;i+=2)max=Math.max(max,Math.abs(pcm.readInt16LE(i)));if(max<=32768*10**(-40/20))return Math.round(at*rate)*frame;}
 throw Error('No safe quiet handle at '+target);
}
(async()=>{
 const {activities}=await import('../catalogue.js'),{productionProgress}=await import('../content/production-progress.js');
 const applyRepair=process.argv.includes('--approved-repair');
 const only=process.argv.find(a=>a.startsWith('--only='))?.slice(7),codes=only?only.split(','):['S006','S009','S016','S023','S029','S031','S039'];
 if(applyRepair&&codes.some(c=>!['S016','S023'].includes(c)))throw Error('Only the specifically approved S016/S023 repairs.');
 if(codes.some(c=>!['S006','S009','S016','S023','S029','S031','S039'].includes(c)))throw Error('Only existing teacher-returned news revisions.');
 const binary=await ffmpegBinary(),music=path.join(root,musicName),musicBytes=await fs.readFile(music),musicSha=sha(musicBytes);
 const privateSource=path.join(work,'sources',musicName);await fs.mkdir(path.dirname(privateSource),{recursive:true});await fs.writeFile(privateSource,musicBytes);
 const index=JSON.parse(await fs.readFile(path.join(work,'mixed-batches/takes.json'))),plans=JSON.parse(await fs.readFile(path.join(root,'content/production-plans.json'))),allFile=path.join(root,'assets/audio/prototips-manifest.json'),all=JSON.parse(await fs.readFile(allFile));
 const reports=[];
 for(const code of codes){
  const entry=activities.find(e=>e.code===code),reportFile=path.join(root,'assets/audio/'+code.toLowerCase()+'-production-manifest.json'),old=JSON.parse(await fs.readFile(reportFile));
  if(!entry?.audio||(!applyRepair&&old.newsRevision)||(applyRepair&&old.file!==code.toLowerCase()+'-news-common-v2.mp3'))throw Error('Preserve current master: '+code);
  if(sha(await fs.readFile(path.join(root,'assets/audio',old.file)))!==old.sha256)throw Error('Master changed: '+code);
  const version=applyRepair?'news-repair-v3':'news-common-v2';
  const folder=path.join(work,code.toLowerCase(),version);await fs.mkdir(folder,{recursive:true});
  const make=(name,args)=>{const file=path.join(folder,name+'.wav');ffmpeg(binary,['-v','error','-y',...args,'-ar','48000','-ac','1','-c:a','pcm_s16le',file]);return file;};
  let intro,body,retained={};
  const take=index[code+'-T01'];
  if(take){
   const decoded=waveParts(await fs.readFile(take.intro.file)),rate=decoded.format.readUInt32LE(4),frame=decoded.format.readUInt16LE(12),title=take.spans[0];
   const from=quietCut(decoded.pcm,rate,frame,Math.max(0,title.start-.14));let end=title.end+.18;
   if(code==='S029')end=4.425; // Verified gap between plaça (4.3785) and notícia (4.4685).
   const to=quietCut(decoded.pcm,rate,frame,Math.min(take.titleCut,end));
   intro=path.join(folder,'title-input.wav');await fs.writeFile(intro,wav(decoded.format,decoded.pcm.subarray(from,to)));
   body=path.join(work,code.toLowerCase(),'news-v1/body-input.wav');
   const paper=old.effects.find(e=>e.name==='beussa-749880'&&e.start>7);
   if(paper){const decodedBody=waveParts(await fs.readFile(body)),r=decodedBody.format.readUInt32LE(4),f=decodedBody.format.readUInt16LE(12),at=Math.round((paper.start-7-.1)*r)*f,n=Math.round(.9*r)*f,removed=decodedBody.pcm.subarray(at,at+n);if(removed.some(x=>x!==0))throw Error('Inserted paper pause is not digital silence.');body=path.join(folder,'body-input.wav');await fs.writeFile(body,wav(decodedBody.format,Buffer.concat([decodedBody.pcm.subarray(0,at),decodedBody.pcm.subarray(at+n)])));retained.removedInsertedPaperSilence=.9;}
   retained.titleRange={start:from/frame/rate,end:to/frame/rate};
  }else{
   const oldFolder=path.join(work,code.toLowerCase()),files=await fs.readdir(oldFolder);let raw;
   for(const name of files.filter(n=>n.endsWith('.wav'))){const f=path.join(oldFolder,name);if(sha(await fs.readFile(f))===old.rawSha256){raw=f;break;}}
   if(!raw)throw Error('Legacy raw take missing: '+code);
   intro=make('title-input',['-i',raw,'-af',`atrim=end=${old.cut.at},asetpts=PTS-STARTPTS`]);
   body=make('body-input',['-i',raw,'-af',`atrim=start=${old.cut.at},asetpts=PTS-STARTPTS`]);
   retained.rawSplit=old.cut.at;
  }
  let repairRecord;
  if(applyRepair){
   const prepared=path.join(work,code.toLowerCase(),'approved-repair-v3');repairRecord=JSON.parse(await fs.readFile(path.join(prepared,'splice.json')));
   const approval=productionProgress['ca-'+code].receivedRepairs.find(r=>r.part===repairRecord.part);
   if(approval?.status!=='approved-awaiting-application'||approval.applied!==false||approval.candidateSha256!==repairRecord.teacherApproval.candidateSha256||repairRecord.originalRawSha256!==old.rawSha256)throw Error('Repair no longer matches the teacher-approved take.');
   body=path.join(prepared,'body-input.wav');if(sha(await fs.readFile(body))!==repairRecord.bodySha256)throw Error('Prepared repair PCM changed.');
  }
  retained.bodyPcmSha256=sha(waveParts(await fs.readFile(body)).pcm);
  const titleMaster=make('title',['-i',intro,'-af','loudnorm=I=-19:TP=-2.5:LRA=9,adelay=220:all=1,apad=pad_dur=0.25']);
  const dry=make('voice',['-i',body,'-af','loudnorm=I=-19:TP=-2.5:LRA=9']);
  const seconds=waveParts(await fs.readFile(dry)).pcm.length/96000,lead=2.5,voiceEnd=lead+seconds,total=voiceEnd+4.25;
  const voice=make('voice-positioned',['-i',dry,'-af',`adelay=${lead*1000}:all=1,apad=whole_dur=${total}`]);
  const opening=make('music-opening',['-i',privateSource,'-af','atrim=end=3.5,asetpts=PTS-STARTPTS,loudnorm=I=-22:TP=-5:LRA=7,afade=t=in:d=0.08,afade=t=out:st=2.7:d=0.8']);
  const core=make('music-core',['-i',privateSource,'-af','atrim=start=12:end=142,asetpts=PTS-STARTPTS,loudnorm=I=-22:TP=-5:LRA=7']);
  const loop=make('music-loop',['-i',core,'-i',core,'-filter_complex','[0:a][1:a]acrossfade=d=1.2[out]','-map','[out]']);
  const middle=make('music-body',['-i',loop,'-af',`atrim=end=${seconds+1.5},afade=t=in:d=0.8,afade=t=out:st=${seconds+.5}:d=1,adelay=1700:all=1`]);
  const metadata=ffmpeg(binary,['-i',privateSource,'-f','null','-']),length=/Duration: (\d+):(\d+):([\d.]+)/.exec(metadata);if(!length)throw Error('Music duration missing');const musicSeconds=+length[1]*3600+(+length[2])*60+(+length[3]);
  const closing=make('music-closing',['-i',privateSource,'-af',`atrim=start=${musicSeconds-4.5},asetpts=PTS-STARTPTS,loudnorm=I=-22:TP=-5:LRA=7,afade=t=in:d=0.8,afade=t=out:st=3.5:d=1,adelay=${Math.round((voiceEnd-.5)*1000)}:all=1`]);
  const bed=make('music-score',['-i',opening,'-i',middle,'-i',closing,'-filter_complex',`[0:a][1:a][2:a]amix=inputs=3:duration=longest:normalize=0,apad=whole_dur=${total},atrim=end=${total},volume='if(lt(t,${lead-.6}),0.6,if(lt(t,${lead}),0.6-0.52*(t-${lead-.6})/.6,if(lt(t,${voiceEnd}),.08,if(lt(t,${voiceEnd+.8}),.08+.52*(t-${voiceEnd})/.8,.6))))':eval=frame[out]`,'-map','[out]']);
  const filters='[0:a]asplit=2[spoken][control];[1:a][control]sidechaincompress=threshold=.018:ratio=6:attack=12:release=450:makeup=1[ducked];[spoken][ducked]amix=inputs=2:duration=first:normalize=0,alimiter=limit=.75:level=false[out]';
  const musicMix=make('music-voice',['-i',voice,'-i',bed,'-filter_complex',filters,'-map','[out]']);
  let bodyMaster=musicMix,marketEffect;
  if(code==='S023'){
   const previousMarket=old.effects.find(e=>e.name==='real-market-interview'||e.name==='jmdh-covered-market-388315');
   if(!previousMarket)throw Error('Preserve the approved market ambience source.');
   const at=old.newsRevision?previousMarket.start:previousMarket.start-old.voice.bodyLead+lead;
   bodyMaster=make('body-master',['-i',musicMix,'-i',path.join(work,'s023/real-market-interview.wav'),'-filter_complex',`[1:a]volume=0.6,adelay=${Math.round(at*1000)}:all=1[room];[0:a][room]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.75:level=false[out]`,'-map','[out]']);
   const marketWave=waveParts(await fs.readFile(path.join(work,'s023/real-market-interview.wav'))),marketSeconds=marketWave.pcm.length/marketWave.format.readUInt32LE(4)/marketWave.format.readUInt16LE(12);
   marketEffect={...previousMarket,name:previousMarket.sourceId,start:at,end:at+marketSeconds,underSpeech:true,additionalGain:.6};
  }
  const master=make('master',['-i',titleMaster,'-f','lavfi','-t','0.65','-i','anullsrc=r=48000:cl=mono','-i',bodyMaster,'-filter_complex','[0:a][1:a][2:a]concat=n=3:v=0:a=1[out]','-map','[out]']);
  const log=ffmpeg(binary,['-i',master,'-af','loudnorm=I=-19:TP=-2.5:LRA=9:print_format=json','-f','null','-']),stats=JSON.parse(log.slice(log.lastIndexOf('{'),log.lastIndexOf('}')+1));
  if(!(+stats.input_i>=-24&&+stats.input_i<=-15&&+stats.input_tp<=-1))throw Error('Levels out of bounds: '+code);
  const stem=code.toLowerCase()+'-'+version,files={file:stem+'.mp3',introFile:stem+'-intro.mp3',bodyFile:stem+'-cos.mp3'};
  for(const [input,key]of [[master,'file'],[titleMaster,'introFile'],[bodyMaster,'bodyFile']])ffmpeg(binary,['-v','error','-y','-i',input,'-map_metadata','-1','-c:a','libmp3lame','-q:a','3',path.join(root,'assets/audio',files[key])]);
  const offset=waveParts(await fs.readFile(titleMaster)).pcm.length/96000+.65;
  const report={...old,...files,offset,bodyDuration:total,fullDuration:offset+total,lufs:+stats.input_i,peakDbTP:+stats.input_tp,newSynthesisRequests:0,effects:[{name:musicCredit.id,origin:'licensed-music-in-montage',start:0,underSpeech:true,credit:musicCredit,sourceSha256:musicSha,voiceMarginTargetDb:25,sidechain:{threshold:.018,ratio:6,attackMs:12,releaseMs:450},openingSeconds:3.5,closingSeconds:4.5}],sha256:sha(await fs.readFile(path.join(root,'assets/audio',files.file))),newsRevision:{date:'2026-11-22',baseFile:old.file,baseAudioSha256:old.sha256,allOldEffectsRemoved:true,voiceRetimed:false,...retained,teacherFinalApproval:false,newRequests:0}};
  report.voiceRetimed=false;
  report.voice={...old.voice,bodyLead:lead,retimed:false};
  if(repairRecord){report.synthesisRepair=repairRecord;report.state='awaiting-montage-validation';report.voice.bodyRawDuration=seconds;}
  if(marketEffect)report.effects.push(marketEffect);
  await fs.writeFile(path.join(root,'assets/audio/'+code.toLowerCase()+(applyRepair?'-before-news-repair-manifest.json':'-before-news-common-manifest.json')),JSON.stringify(old,null,2)+'\n');
  await fs.writeFile(reportFile,JSON.stringify(report,null,2)+'\n');await fs.writeFile(path.join(root,'assets/audio/'+stem+'-manifest.json'),JSON.stringify(report,null,2)+'\n');
  const item=all.activities.find(a=>a.code===code);if(item)Object.assign(item,report);
  const sourceFile=path.join(root,plans[code].reviewContent??({S023:'content/reobren-el-mercat.js'}[code]));let text=await fs.readFile(sourceFile,'utf8');for(const key of ['file','introFile','bodyFile'])text=text.replaceAll(old[key],files[key]);
  const at=text.indexOf("code: '"+code+"'"),next=text.indexOf('summary:',at);if(code==='S023'){text=text.replace(/seconds: \d+,/,`seconds: ${Math.ceil(report.fullDuration)},`).replace(/fragment: \{ start: [\d.]+, seconds: \d+ \}/,`fragment: { start: ${offset}, seconds: ${Math.round(total)} }`);}else if(at>=0&&next>at){let h=text.slice(at,next).replace(/seconds: \d+, status:/,`seconds: ${Math.ceil(report.fullDuration)}, status:`).replace(/fragment: \{ start: [\d.]+, seconds: \d+ \}/,`fragment: { start: ${offset}, seconds: ${Math.round(total)} }`);text=text.slice(0,at)+h+text.slice(next);}else throw Error('Unexpected content header');await fs.writeFile(sourceFile,text);
  const progress=productionProgress['ca-'+code];progress.audioSha256=report.sha256;progress.listeningApproval=false;progress.montageNewSynthesisRequests=0;
  progress.reviewUpdate={audio:'./assets/audio/'+files.file,at:'2026-11-22',summary:{ca:'Nova base comuna de notícies, amb entrada i sortida; retirats els papers i jingles anteriors. Pendent d’audició.',es:'Nueva base común de noticias, con entrada y salida; retirados los papeles y jingles anteriores. Pendiente de escucha.'}};
  if(repairRecord){
   const repaired=progress.receivedRepairs.find(r=>r.part===repairRecord.part);repaired.status='applied-awaiting-montage-listening';repaired.applied=true;repaired.appliedAt='2026-11-22';repaired.appliedAudio='./assets/audio/'+files.file;
   progress.feedback.filter(f=>f.part===repairRecord.part).forEach(f=>{f.status='applied';f.appliedAt='2026-11-22';});progress.state='montage-awaiting-listening';progress.jingleStatus='common-news-bed-pending-final-listening';progress.plannedNewRequests=0;
   progress.reviewUpdate.summary=code==='S023'?{ca:'Inserida la frase de suggeriments validada, amb la base comuna de notícies i el mercat conservats. Comprovar la continuïtat del timbre al tancament.',es:'Insertada la frase de sugerencias validada, con la base común de noticias y el mercado conservados. Comprobar la continuidad del timbre al cierre.'}:{ca:'Inserida la frase validada «Si l’estudi avança», sense l’artefacte inicial. Base comuna de notícies; pendent d’última audició.',es:'Insertada la frase validada «Si l’estudi avança», sin el artefacto inicial. Base común de noticias; pendiente de última escucha.'};
   progress.teacherAssessment=progress.reviewUpdate.summary.ca;
  }
  reports.push({code,seconds:report.fullDuration,lufs:report.lufs,peak:report.peakDbTP,pendingVoiceCorrections:progress.state==='audio-corrections-pending'});
 }
 await fs.writeFile(allFile,JSON.stringify(all,null,2)+'\n');await fs.writeFile(path.join(root,'content/production-progress.js'),'// Production stages are separate from editorial review and final listening approval.\nexport const productionProgress = '+JSON.stringify(productionProgress,null,2)+';\n');
 const creditFile=path.join(root,'assets/audio/news-common-music.json'),previousCredit=JSON.parse(await fs.readFile(creditFile,'utf8').catch(e=>{if(e.code==='ENOENT')return '{}';throw e;}));
 await fs.writeFile(creditFile,JSON.stringify({...musicCredit,sourceSha256:musicSha,usedBy:[...new Set([...(previousCredit.usedBy??[]),...codes.map(code=>'ca-'+code)])].sort(),newSynthesisRequests:0},null,2)+'\n');
 console.log(JSON.stringify({reports,newRequests:0,teacherApproval:false}));
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
