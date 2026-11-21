'use strict';
// Interleave already-recorded characters. Only near-zero padding is shortened;
// every voiced sample and 300/350 ms of handles are retained. No TTS calls.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {waveParts}=require('./gemini-result.cjs'),{ffmpeg,ffmpegBinary}=require('./audio-files.cjs'),{silenceCut}=require('./split-synthesis-batch.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda'),sha=b=>createHash('sha256').update(b).digest('hex');
function wave(format,pcm){const out=Buffer.alloc(44+pcm.length);out.write('RIFF');out.writeUInt32LE(out.length-8,4);out.write('WAVEfmt ',8);out.writeUInt32LE(16,16);format.copy(out,20,0,16);out.write('data',36);out.writeUInt32LE(pcm.length,40);pcm.copy(out,44);return out;}
async function main(){
 const code=process.argv.find(a=>a.startsWith('--only='))?.slice(7).toUpperCase(),{activities}=await import('../catalogue.js'),entry=activities.find(e=>e.code===code);if(entry?.production?.strategy!=='grouped-voices-v1')throw Error('Cal una escena amb preses agrupades per veu.');if(entry.audio)throw Error('Ja té muntatge; no sobreescriure.');
 const file=path.join(work,'mixed-batches/takes.json'),index=JSON.parse(await fs.readFile(file,'utf8')),takes=entry.generationPlan.takes.map(t=>index[t.id]);if(takes.some(t=>!t))throw Error('Falten preses de personatges.');
 const folder=path.join(work,code.toLowerCase(),'assembled-v1');await fs.mkdir(folder,{recursive:true});
 const sources=[];let format,rate,frame;
 for(const take of takes){const bytes=await fs.readFile(take.file);if(sha(bytes)!==take.sha256)throw Error('Presa canviada.');const data=waveParts(bytes);if(format&&!format.equals(data.format))throw Error('Formats de presa diferents.');format=data.format;rate=format.readUInt32LE(4);frame=format.readUInt16LE(12);const split=JSON.parse(await fs.readFile(path.join(path.dirname(take.file),'split.json'),'utf8'));sources.push({take,...data,silences:split.silences.map(s=>({start:Math.max(0,s.start-take.start),end:Math.min(take.seconds,s.end-take.start)})).filter(s=>s.end>s.start)});}
 const chunks=[],spans=[],edits=[];let cursor=0;
 for(const part of entry.transcript.filter(p=>p.speaker)){
  const candidates=sources.filter(s=>s.take.spans.some(p=>p.part===part.id));if(candidates.length!==1)throw Error('Torn absent o repetit: '+part.id);const source=candidates[0],at=source.take.spans.findIndex(p=>p.part===part.id),span=source.take.spans[at],before=source.take.spans[at-1],after=source.take.spans[at+1];
  const low=before?silenceCut(before.end,span.start,source.silences):0,high=after?silenceCut(span.end,after.start,source.silences):source.take.seconds;
  const first=Math.max(0,Math.floor(low*rate)),last=Math.min(source.pcm.length/frame,Math.ceil(high*rate));let voicedFirst=first,voicedLast=last-1;
  function audible(i){for(let ch=0;ch<frame;ch+=2)if(Math.abs(source.pcm.readInt16LE(i*frame+ch))>10)return true;return false;}
  while(voicedFirst<last&&!audible(voicedFirst))voicedFirst++;while(voicedLast>voicedFirst&&!audible(voicedLast))voicedLast--;if(voicedFirst===last)throw Error('Torn sense veu: '+part.id);
  const retainedFirst=Math.max(first,voicedFirst-Math.ceil(rate*.3)),retainedLast=Math.min(last,voicedLast+1+Math.ceil(rate*.35)),pcm=source.pcm.subarray(retainedFirst*frame,retainedLast*frame),seconds=pcm.length/frame/rate;
  chunks.push(pcm);spans.push({part:part.id,text:part.text,start:cursor+Math.max(0,span.start-retainedFirst/rate),end:cursor+Math.min(seconds,span.end-retainedFirst/rate),length:part.text.split(/\s+/u).length,coverage:span.coverage});edits.push({part:part.id,speaker:part.speaker,sourceTake:source.take.id,sourceTakeSha256:source.take.sha256,sourceRange:{start:retainedFirst/rate,end:retainedLast/rate},removedOnlyBelowDbFS:-70,retainedLeadSeconds:.3,retainedTailSeconds:.35});cursor+=seconds;
 }
 const title=takes.find(t=>t.intro)?.intro;if(!title)throw Error('Falta el títol.');const titleBytes=await fs.readFile(title.file),titleWave=waveParts(titleBytes);if(!titleWave.format.equals(format))throw Error('Format del títol diferent.');
 const gap=Buffer.alloc(Math.round(rate*.8)*frame),bodyPCM=Buffer.concat(chunks),whole=wave(format,Buffer.concat([titleWave.pcm,gap,bodyPCM])),raw=path.join(folder,'assembled.wav'),bodyFile=path.join(folder,'body.wav'),introFile=path.join(folder,'intro.wav');await fs.writeFile(raw,whole);await fs.writeFile(bodyFile,wave(format,bodyPCM));await fs.writeFile(introFile,titleBytes);
 const titleCut=(titleWave.pcm.length+gap.length)/frame/rate,log=ffmpeg(await ffmpegBinary(),['-i',raw,'-af','silencedetect=noise=-42dB:d=0.18','-f','null','-']),silences=[];let start;
 for(const line of log.split('\n')){const a=/silence_start: ([\d.]+)/.exec(line),b=/silence_end: ([\d.]+)/.exec(line);if(a)start=Number(a[1]);if(b&&start!==undefined){silences.push({start,end:Number(b[1])});start=undefined;}}
 const seconds=whole.length>44?(whole.length-44)/frame/rate:0;if(start!==undefined)silences.push({start,end:seconds});
 await fs.writeFile(path.join(folder,'split.json'),JSON.stringify({silences,assembly:edits,speechRetimed:false},null,2));await fs.writeFile(path.join(folder,'usage.json'),JSON.stringify({usage:null,sharedRequests:takes.map(t=>({batch:t.batch,requestHash:t.batchRequestHash}))},null,2));
 const sourceBatchRequests=takes.map(t=>({batch:t.batch,requestHash:t.batchRequestHash,rawSha256:t.rawBatchSha256})),assembled={id:code+'-ASSEMBLED',code,parts:['introduction',...spans.map(p=>p.part)],batch:takes.map(t=>t.batch).join('+'),batchRequestHash:sha(JSON.stringify(sourceBatchRequests)),sourceRequestHash:sha(JSON.stringify(takes.map(t=>t.sourceRequestHash))),sourceBatchRequests,rawBatchSha256:sha(whole),file:raw,sha256:sha(whole),start:0,end:seconds,seconds,titleCut,coverage:Math.min(...takes.map(t=>t.coverage)),spans:[{part:'introduction',start:0,end:titleCut-.8,text:entry.introduction},...spans.map(p=>({...p,start:p.start+titleCut,end:p.end+titleCut}))],intro:{file:introFile,sha256:sha(titleBytes),seconds:titleWave.pcm.length/frame/rate},body:{file:bodyFile,sha256:sha(await fs.readFile(bodyFile)),seconds:cursor},assembly:edits};
 index[assembled.id]=assembled;await fs.writeFile(file,JSON.stringify(index,null,2)+'\n');console.log(JSON.stringify({code,turns:spans.length,voices:Object.keys(entry.production.voices),seconds,allVoicedSamplesRetained:true,newRequests:0}));
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
