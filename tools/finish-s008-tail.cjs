'use strict';
// Offline remount only. Reuses the complete raw takes; no API or credentials.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {ffmpegBinary,ffmpeg,checkWave}=require('./audio-files.cjs'),{duration}=require('./remaster-audio.cjs');
const root=path.resolve(__dirname,'..'),outputRoot=path.resolve(root,'../output'),work=path.join(outputRoot,'sentit-s008-v3'),assets=path.join(root,'assets/audio');
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
async function main(){
 const {activities}=await import('../catalogue.js'),entry=activities.find(e=>e.code==='S008');
 if(entry.reviewStatus==='validated')throw Error('S008 is published. Reopen explicitly before remounting.');
 const aggregateFile=path.join(assets,'prototips-manifest.json'),aggregate=JSON.parse(await fs.readFile(aggregateFile,'utf8')),prior=aggregate.activities.find(r=>r.code==='S008');
 if(prior.file!=='s008-la-foto-que-faltava-v2.mp3')throw Error('Unexpected S008 source master.');
 if(hash(await fs.readFile(path.join(assets,prior.file)))!==prior.sha256)throw Error('Source master hash mismatch.');
 for(const source of prior.sources){const bytes=await fs.readFile(path.join(outputRoot,source.file));checkWave(bytes);if(hash(bytes)!==source.sha256)throw Error('Raw source mismatch: '+source.file);}
 await fs.mkdir(work,{recursive:true});await fs.writeFile(path.join(work,'before-remount.json'),JSON.stringify(prior,null,2)+'\n');
 const bin=await ffmpegBinary();
 const wav=(name,args)=>{const file=path.join(work,name+'.wav');ffmpeg(bin,['-v','error','-y',...args,'-ac','1','-ar','48000','-c:a','pcm_s16le',file]);return file;};
 const silence=(name,seconds)=>wav(name,['-f','lavfi','-i','anullsrc=r=48000:cl=mono','-t',String(seconds)]);
 const voice=(file,name,tail=.3)=>wav(name,['-i',file,'-af',`aformat=channel_layouts=mono,loudnorm=I=-19:TP=-2.5:LRA=9,aresample=48000,adelay=250:all=1,apad=pad_dur=${tail}`]);
 async function concat(name,files){const list=path.join(work,name+'.ffconcat');await fs.writeFile(list,'ffconcat version 1.0\n'+files.map(file=>`file '${file.replaceAll('\\','/').replaceAll("'","'\\''")}'`).join('\n'));return wav(name,['-f','concat','-safe','0','-i',list]);}
 const raw=pattern=>path.join(outputRoot,prior.sources.find(s=>pattern.test(s.file)).file);
 const scenes=[voice(raw(/scene-1-/),'scene-1'),voice(raw(/scene-2-/),'scene-2')];
 const dry=await concat('body-dry',[silence('body-in',.35),scenes[0],silence('scene-gap',.5),scenes[1],silence('body-out',.6)]);
 const oldDry=path.join(outputRoot,'sentit-remaster-v2/S008-body-dry.wav');
 if(hash(await fs.readFile(dry))!==hash(await fs.readFile(oldDry)))throw Error('Rebuilt voice differs from the original dry body.');
 const intro=voice(raw(/intro-/),'intro',1.5),offset=await duration(intro),voiceEnd=prior.timeline.at(-1).end;
 const riseStart=voiceEnd+.15,riseEnd=riseStart+.5,holdEnd=riseEnd+2,fadeEnd=holdEnd+2,bodyDuration=fadeEnd+.65;
 const padded=wav('voice-padded',['-i',dry,'-af',`apad=whole_dur=${bodyDuration},atrim=duration=${bodyDuration}`]);
 const bed=wav('bed',['-f','lavfi','-i',`aevalsrc='0.02*sin(2*PI*if(lt(mod(t,4),1),261.63,if(lt(mod(t,4),2),329.63,if(lt(mod(t,4),3),392,329.63)))*t)*(0.35+0.65*exp(-4*mod(t,1)))+0.008*sin(2*PI*130.81*t)':s=48000:d=${bodyDuration}`,'-af',`lowpass=f=1800,afade=t=in:d=1.2,volume='if(lt(t,${riseStart}),1,if(lt(t,${riseEnd}),1+1.5*(t-${riseStart})/.5,2.5))':eval=frame,afade=t=out:st=${holdEnd}:d=2,atrim=duration=${fadeEnd},apad=whole_dur=${bodyDuration}`]);
 const paperAt=prior.effects.find(e=>e.effect==='paper').start;
 const body=wav('body',['-i',padded,'-i',bed,'-i',raw(/paper\.wav$/),'-filter_complex',`[0:a]asplit=2[voice][side];[1:a][side]sidechaincompress=threshold=.015:ratio=8:attack=15:release=500[music];[2:a]adelay=${Math.round(paperAt*1000)}:all=1[paper];[voice][music][paper]amix=inputs=3:duration=first:normalize=0[out]`,'-map','[out]']);
 const full=await concat('full',[intro,body]),name='s008-la-foto-que-faltava-v3';
 for(const [file,suffix]of[[full,''],[intro,'-intro'],[body,'-cos']])ffmpeg(bin,['-v','error','-y','-i',file,'-map_metadata','-1','-ac','1','-ar','48000','-c:a','libmp3lame','-b:a','128k',path.join(assets,name+suffix+'.mp3')]);
 const log=ffmpeg(bin,['-xerror','-i',path.join(assets,name+'.mp3'),'-af','ebur128=peak=true','-f','null','-']);
 const lufs=Number(/Integrated loudness:\s+I:\s+([^ ]+) LUFS/.exec(log)?.[1]),peakDbTP=Number(/True peak:\s+Peak:\s+([^ ]+) dBFS/.exec(log)?.[1]);
 if(!(lufs>=-24&&lufs<=-15&&peakDbTP<=-1))throw Error('Master levels out of bounds.');
 const record={...prior,date:'2026-11-20',file:name+'.mp3',introFile:name+'-intro.mp3',bodyFile:name+'-cos.mp3',state:'awaiting-conditional-publication',previousMaster:{file:prior.file,sha256:prior.sha256},productionMode:'offline-tail-remount',newSynthesisRequests:0,montageNewSynthesisRequests:0,offset,bodyDuration,fullDuration:offset+bodyDuration,lufs,peakDbTP,voice:{retimed:false,rawSamplesPreserved:true,dryBodySha256:hash(await fs.readFile(dry)),unchangedFromV2:true},effects:[{effect:'original-instrumental-bed',start:0,end:fadeEnd,duckedUnderSpeech:true,musicTrackId:'sentit-foto-arpegi-v1',envelope:{voiceEnd,riseAfterSpeech:{start:riseStart,end:riseEnd,gainFrom:1,gainTo:2.5},holdAfterSpeech:{start:riseEnd,end:holdEnd},fadeOut:{start:holdEnd,end:fadeEnd},silentTail:.65}},prior.effects.find(e=>e.effect==='paper')],sha256:hash(await fs.readFile(path.join(assets,name+'.mp3')))};
 await fs.writeFile(path.join(assets,'s008-production-manifest.json'),JSON.stringify(record,null,2)+'\n');
 aggregate.activities[aggregate.activities.findIndex(r=>r.code==='S008')]=record;await fs.writeFile(aggregateFile,JSON.stringify(aggregate,null,2)+'\n');
 const contentFile=path.join(root,'content/la-foto-que-faltava.js');let text=await fs.readFile(contentFile,'utf8');
 text=text.replace(/seconds: \d+,/,()=>`seconds: ${Math.ceil(record.fullDuration)},`).replaceAll('s008-la-foto-que-faltava-v2','s008-la-foto-que-faltava-v3').replace(/fragment: \{ start: [\d.]+, seconds: \d+ \}/,()=>`fragment: { start: ${offset}, seconds: ${Math.round(bodyDuration)} }`);
 await fs.writeFile(contentFile,text);console.log(JSON.stringify({code:'S008',file:record.file,bodyDuration,fullDuration:record.fullDuration,lufs,peakDbTP,sha256:record.sha256,envelope:record.effects[0].envelope,newSynthesisRequests:0}));
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
