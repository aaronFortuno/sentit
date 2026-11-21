'use strict';
// Post-production only: delete the middle of measured quiet padding at known
// turn boundaries. Never stretch, pitch-shift, normalize or replace speech.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {waveParts}=require('./gemini-result.cjs'),{ffmpeg,ffmpegBinary}=require('./audio-files.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda'),sha=b=>createHash('sha256').update(b).digest('hex');
function wav(format,pcm){const b=Buffer.alloc(44+pcm.length);b.write('RIFF');b.writeUInt32LE(b.length-8,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);format.copy(b,20,0,16);b.write('data',36);b.writeUInt32LE(pcm.length,40);pcm.copy(b,44);return b;}
function peak(pcm){let p=0;for(let i=0;i<pcm.length;i+=2)p=Math.max(p,Math.abs(pcm.readInt16LE(i)));return p;}
function compact(format,pcm,silences,windows,protectedWindows=[]){
 const rate=format.readUInt32LE(4),frame=format.readUInt16LE(12),cuts=[];
 for(const silence of silences)for(const window of windows){
  let start=Math.max(silence.start,window.start),end=Math.min(silence.end,window.end);if(end-start<.95)continue;
  start+=.25;end-=.25;
  if(protectedWindows.some(p=>p.start<end&&p.end>start))continue;
  const first=Math.ceil(start*rate),last=Math.floor(end*rate),removed=pcm.subarray(first*frame,last*frame),maximum=peak(removed);
  if(!removed.length||maximum>32768*10**(-42/20))continue;
  cuts.push({first,last,start:first/rate,end:last/rate,seconds:(last-first)/rate,maximumDbFS:maximum?20*Math.log10(maximum/32768):-120});
 }
 cuts.sort((a,b)=>a.first-b.first);const unique=cuts.filter((c,i)=>!i||c.first>=cuts[i-1].last),chunks=[];let cursor=0;for(const c of unique){chunks.push(pcm.subarray(cursor,c.first*frame));cursor=c.last*frame;}chunks.push(pcm.subarray(cursor));
 const kept=Buffer.concat(chunks);let offset=0;for(const chunk of chunks){if(!kept.subarray(offset,offset+chunk.length).equals(chunk))throw Error('Retained samples differ');offset+=chunk.length;}
 return {pcm:kept,cuts:unique,removedSeconds:unique.reduce((n,c)=>n+c.seconds,0),retainedPcmSha256:sha(kept),allRetainedSamplesIdentical:true};
}
function silenceIntervals(binary,file,seconds){const log=ffmpeg(binary,['-i',file,'-af','silencedetect=noise=-42dB:d=0.18','-f','null','-']),intervals=[];let start;for(const line of log.split('\n')){const a=/silence_start: ([\d.]+)/.exec(line),b=/silence_end: ([\d.]+)/.exec(line);if(a)start=Number(a[1]);if(b&&start!==undefined){intervals.push({start,end:Number(b[1])});start=undefined;}}if(start!==undefined)intervals.push({start,end:seconds});return intervals;}
async function main(){
 const code=process.argv.find(a=>a.startsWith('--only='))?.slice(7).toUpperCase(),apply=process.argv.includes('--apply');if(!['S011','S027','S030','S025','S006','S009','S029','S031','S039'].includes(code))throw Error('Only the two requested timing revisions are authorized.');
 const {activities}=await import('../catalogue.js'),entry=activities.find(e=>e.code===code),reportPath=path.join(root,`assets/audio/${code.toLowerCase()}-production-manifest.json`),old=JSON.parse(await fs.readFile(reportPath,'utf8'));if(old.timingRevision)throw Error('Revision already applied; keep it.');if(apply&&entry.reviewStatus==='validated')throw Error('Do not replace a published master without listening approval.');
 if(sha(await fs.readFile(path.join(root,'assets/audio',old.file)))!==old.sha256)throw Error('Base master differs.');
 const originalFolder=path.join(work,code.toLowerCase(),'mixed-v1'),folder=code==='S025'?path.join(work,'s025/voice-only-v2-input'):originalFolder,output=path.join(work,code.toLowerCase(),'timing-v2');await fs.mkdir(output,{recursive:true});const binary=await ffmpegBinary(),takes=JSON.parse(await fs.readFile(path.join(work,'mixed-batches/takes.json'),'utf8')),take=takes[code==='S011'?code+'-ASSEMBLED':code+'-T01'];
 const removedEffects=code==='S025'?old.effects.map(e=>e.name):[];
 if(code==='S025'){await fs.mkdir(folder,{recursive:true});await fs.copyFile(path.join(originalFolder,'title-master.wav'),path.join(folder,'title-master.wav'));ffmpeg(binary,['-v','error','-y','-i',path.join(originalFolder,'voice-complete.wav'),'-af','loudnorm=I=-19:TP=-2.5:LRA=9,aresample=48000,adelay=250:all=1,apad=pad_dur=0.35','-ar','48000','-ac','1','-c:a','pcm_s16le',path.join(folder,'body-master.wav')]);old.effects=[];}
 const intro=waveParts(await fs.readFile(path.join(folder,'title-master.wav'))),body=waveParts(await fs.readFile(path.join(folder,'body-master.wav')));if(!intro.format.equals(body.format))throw Error('Format mismatch');const rate=body.format.readUInt32LE(4),frame=body.format.readUInt16LE(12),introSeconds=intro.pcm.length/frame/rate,bodySeconds=body.pcm.length/frame/rate;
 const introSilences=silenceIntervals(binary,path.join(folder,'title-master.wav'),introSeconds),titleWindows=[{start:0,end:introSilences.find(s=>s.start===0)?.end??0},{start:introSilences.find(s=>s.end>=introSeconds-.05)?.start??introSeconds,end:introSeconds}];
 const title=compact(intro.format,intro.pcm,introSilences,titleWindows);
 let shortened={pcm:body.pcm,cuts:[],removedSeconds:0,retainedPcmSha256:sha(body.pcm),allRetainedSamplesIdentical:true};
 let tailEdit=null;
 if(code!=='S027'){
  const insertions=old.effects.filter(e=>e.insertedPause).sort((a,b)=>a.start-b.start),time=raw=>{let result=.25+2.4+raw-take.titleCut;for(const e of insertions)if(result>=e.start+.25-.12)result+=e.insertedPause;return result;},spans=take.spans.filter(s=>s.part!=='introduction').map(s=>({start:time(s.start),end:time(s.end)}));
  if(code==='S030'){const canonicalEnd=spans.at(-1).end,cut=canonicalEnd+.5,quiet=silenceIntervals(binary,path.join(folder,'body-master.wav'),bodySeconds).find(s=>s.start<=cut-.02&&s.end>=cut+.02);if(!quiet)throw Error('No safe silence after the last canonical sentence.');const first=Math.ceil(cut*rate),handle=body.pcm.subarray((first-Math.ceil(.01*rate))*frame,(first+Math.ceil(.01*rate))*frame);if(peak(handle)>32768*10**(-42/20))throw Error('Tail cut is not quiet.');tailEdit={start:first/rate,end:bodySeconds,canonicalLastWordEnd:canonicalEnd,reason:'Unrequested post-speech breath, long padding and delayed closing footsteps',cutPeakDbFS:20*Math.log10(Math.max(peak(handle),1)/32768)};body.pcm=body.pcm.subarray(0,first*frame);}
  const windows=[{start:0,end:spans[0].start},...spans.slice(1).map((s,i)=>({start:spans[i].end,end:s.start}))];
  windows.push({start:spans.at(-1).end,end:bodySeconds});
  const protectedWindows=old.effects.map(e=>({start:e.start+.25-.1,end:e.start+.25+(e.excerpt?.seconds??(e.name==='sentit-two-note-ending-v1'?1.2:2))+.1}));
  shortened=compact(body.format,body.pcm,silenceIntervals(binary,path.join(folder,'body-master.wav'),bodySeconds),windows,protectedWindows);
 }
 const titleFile=path.join(output,'title.wav'),bodyFile=path.join(output,'body.wav'),masterFile=path.join(output,'master.wav');await fs.writeFile(titleFile,wav(intro.format,title.pcm));await fs.writeFile(bodyFile,wav(body.format,shortened.pcm));const gap=Buffer.alloc(Math.round(rate*.8)*frame);await fs.writeFile(masterFile,wav(body.format,Buffer.concat([title.pcm,gap,shortened.pcm])));
 const stem=code.toLowerCase()+'-timing-v2',files={file:stem+'.mp3',introFile:stem+'-intro.mp3',bodyFile:stem+'-cos.mp3'};for(const [file,key]of [[masterFile,'file'],[titleFile,'introFile'],[bodyFile,'bodyFile']])ffmpeg(binary,['-v','error','-y','-i',file,'-map_metadata','-1','-c:a','libmp3lame','-q:a','3',path.join(root,'assets/audio',files[key])]);
 const measurement=ffmpeg(binary,['-i',masterFile,'-af','loudnorm=I=-19:TP=-2.5:LRA=9:print_format=json','-f','null','-']),levels=JSON.parse(measurement.slice(measurement.lastIndexOf('{'),measurement.lastIndexOf('}')+1)),offset=title.pcm.length/frame/rate+.8,bodyDuration=shortened.pcm.length/frame/rate;
 const revision={...old,...files,state:apply?(['S011','S025'].includes(code)?'awaiting-audio-corrections':'awaiting-montage-validation'):'timing-candidate-awaiting-listening',offset,bodyDuration,fullDuration:offset+bodyDuration,lufs:Number(levels.input_i),peakDbTP:Number(levels.input_tp),sha256:sha(await fs.readFile(path.join(root,'assets/audio',files.file))),newSynthesisRequests:0,voiceRetimed:false,timingRevision:{baseFile:old.file,baseAudioSha256:old.sha256,intro:{cuts:title.cuts,removedSeconds:title.removedSeconds,retainedPcmSha256:title.retainedPcmSha256},body:{cuts:shortened.cuts,removedSeconds:shortened.removedSeconds,retainedPcmSha256:shortened.retainedPcmSha256},tailEdit,effectsRemoved:removedEffects,quietThresholdDbFS:-42,allRetainedSamplesIdentical:true,newRequests:0,originalPreserved:true}};
 delete revision.teacherValidation;delete revision.publicationMaterials;revision.effects=old.effects.filter(e=>!tailEdit||e.start+.25<tailEdit.start).map(e=>({...e,start:e.start-shortened.cuts.filter(c=>c.end<=e.start+.25).reduce((n,c)=>n+c.seconds,0)}));
 await fs.writeFile(path.join(root,`assets/audio/${code.toLowerCase()}-timing-v2-manifest.json`),JSON.stringify(revision,null,2)+'\n');
 if(apply){
  await fs.copyFile(reportPath,path.join(root,`assets/audio/${code.toLowerCase()}-mixed-v1-manifest.json`));await fs.writeFile(reportPath,JSON.stringify(revision,null,2)+'\n');const allPath=path.join(root,'assets/audio/prototips-manifest.json'),all=JSON.parse(await fs.readFile(allPath,'utf8'));Object.assign(all.activities.find(a=>a.code===code),revision);await fs.writeFile(allPath,JSON.stringify(all,null,2)+'\n');
  const plans=JSON.parse(await fs.readFile(path.join(root,'content/production-plans.json'),'utf8')),sourceFile=path.join(root,plans[code].reviewContent);let source=await fs.readFile(sourceFile,'utf8'),start=source.indexOf(`code: '${code}'`),next=source.indexOf('    summary:',start);let header=source.slice(start,next);header=header.replaceAll(old.file,files.file).replaceAll(old.introFile,files.introFile).replaceAll(old.bodyFile,files.bodyFile).replace(/seconds: \d+, status:/,`seconds: ${Math.ceil(revision.fullDuration)}, status:`).replace(/fragment: \{ start: [\d.]+, seconds: \d+ \}/,`fragment: { start: ${offset}, seconds: ${Math.round(bodyDuration)} }`);source=source.slice(0,start)+header+source.slice(next);await fs.writeFile(sourceFile,source);
  const {productionProgress}=await import('../content/production-progress.js');Object.assign(productionProgress['ca-'+code],{audioSha256:revision.sha256,state:['S011','S025'].includes(code)?'audio-corrections-pending':'montage-awaiting-listening',timingRevision:revision.timingRevision,listeningApproval:false});await fs.writeFile(path.join(root,'content/production-progress.js'),'// Production stages are separate from editorial review and final listening approval.\nexport const productionProgress = '+JSON.stringify(productionProgress,null,2)+';\n');
 }
 console.log(JSON.stringify({code,applied:apply,introRemovedSeconds:title.removedSeconds,bodyRemovedSeconds:shortened.removedSeconds,tailRemovedSeconds:tailEdit?tailEdit.end-tailEdit.start:0,cuts:shortened.cuts.length,voicesChanged:false,newRequests:0}));
}
if(require.main===module)main().catch(e=>{console.error(e.stack);process.exitCode=1;});
module.exports={compact,wav};
