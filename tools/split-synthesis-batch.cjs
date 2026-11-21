'use strict';
// Local coverage and silence checks. ASR is not a pronunciation approval.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {ffmpeg,ffmpegBinary}=require('./audio-files.cjs'),{recognize}=require('./local-align.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda'),sha=b=>createHash('sha256').update(b).digest('hex');
const tokens=text=>text.replace(/<[^>]*>/g,' ').normalize('NFD').replace(/\p{M}/gu,'').toLowerCase().match(/[\p{L}\p{N}]+/gu)??[];
function similarity(a,b){if(a===b)return 1;if(Math.min(a.length,b.length)<2)return 0;let row=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){const next=[i];for(let j=1;j<=b.length;j++)next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+Number(a[i-1]!==b[j-1]));row=next;}return 1-row[b.length]/Math.max(a.length,b.length);}
function align(expected,words){
 const heard=words.flatMap(w=>tokens(w.word).map(word=>({...w,word}))),n=expected.length,m=heard.length,width=m+1,trace=new Uint8Array((n+1)*width);let prev=Float32Array.from({length:width},(_,j)=>j*.9);
 for(let j=1;j<=m;j++)trace[j]=2;
 const cache=new Map();const sim=(a,b)=>{const key=a+'\0'+b;if(!cache.has(key))cache.set(key,similarity(a,b));return cache.get(key);};
 for(let i=1;i<=n;i++){const row=new Float32Array(width);row[0]=i;trace[i*width]=1;for(let j=1;j<=m;j++){const s=sim(expected[i-1],heard[j-1].word),sub=prev[j-1]+(s===1?0:s>=.65?.45:1.25),del=prev[j]+1,ins=row[j-1]+.9,best=Math.min(sub,del,ins);row[j]=best;trace[i*width+j]=best===sub?0:best===del?1:2;}prev=row;}
 const map=Array(n).fill(null);let i=n,j=m;while(i||j){const direction=trace[i*width+j];if(!direction&&i&&j){if(sim(expected[i-1],heard[j-1].word)>=.65)map[i-1]=heard[j-1];i--;j--;}else if(direction===1&&i)i--;else if(j)j--;else i--;}
 return {map,heard};
}
function silenceCut(before,after,silences){
 const low=before+.12,high=after-.12;
 const valid=silences.map(s=>({start:Math.max(low,s.start+.04),end:Math.min(high,s.end-.04)})).filter(s=>s.end-s.start>=.02).sort((a,b)=>(b.end-b.start)-(a.end-a.start));
 if(!valid.length)throw Error(`No hi ha silenci segur entre ${before.toFixed(2)} i ${after.toFixed(2)}; no retallar.`);
 return Number(((valid[0].start+valid[0].end)/2).toFixed(4));
}
async function main(){
 const id=process.argv.find(a=>a.startsWith('--only='))?.slice(7).toUpperCase(),catalog=JSON.parse(await fs.readFile(path.join(root,'content/synthesis-batches.json'),'utf8')),batch=catalog.batches.find(b=>b.id===id);if(!batch?.approvedRequestHash)throw Error('Lot no congelat.');
 const folder=path.join(work,'mixed-batches',id.toLowerCase()+'-'+batch.approvedRequestHash.slice(0,12)),raw=path.join(folder,'raw.wav'),attempt=JSON.parse(await fs.readFile(path.join(folder,'attempt.json'),'utf8')),bytes=await fs.readFile(raw);if(attempt.state!=='raw-received'||attempt.rawSha256!==sha(bytes))throw Error('Presa rebuda no íntegra.');
 const blocks=JSON.parse(await fs.readFile(path.join(folder,'blocks.json'),'utf8')),{activities}=await import('../catalogue.js');
 const expected=[],segments=[];
 for(const block of blocks){const entry=activities.find(e=>e.code===block.code);for(const [partIndex,part] of block.parts.entries()){const text=block.take?(part==='introduction'?entry.introduction:entry.transcript.find(p=>p.id===part)?.text):block.items[0].text;if(!text)throw Error('Text d’origen absent.');const words=tokens(text);segments.push({block:block.id,code:block.code,part,text,partIndex,partCount:block.parts.length,offset:expected.length,length:words.length});expected.push(...words);}}
 const alignmentFile=process.argv.find(a=>a.startsWith('--alignment='))?.slice(12);
 const recognition=alignmentFile?JSON.parse(await fs.readFile(path.resolve(alignmentFile),'utf8')):await recognize(raw,path.join(folder,'alignment.json'));
 if(recognition.sha256!==attempt.rawSha256)throw Error('Alineació d’una altra presa.');
 const {map}=align(expected,recognition.words);
 const report=[],uncertainParts=new Set((process.argv.find(a=>a.startsWith('--retain-short-uncertainty='))?.split('=')[1]??'').split(',').filter(Boolean)),uncertainties=[];
 for(const segment of segments){const matches=map.slice(segment.offset,segment.offset+segment.length),good=matches.filter(Boolean),coverage=good.length/segment.length;if(!good.length||coverage<.5){const before=map.slice(0,segment.offset).reverse().find(Boolean),after=map.slice(segment.offset+segment.length).find(Boolean);await fs.writeFile(path.join(folder,'alignment-warning.json'),JSON.stringify({batch:id,requestHash:batch.approvedRequestHash,segment:segment.part,block:segment.block,text:segment.text,coverage,start:Math.max(0,(before?.end??0)-.35),end:Math.min(recognition.duration,(after?.start??recognition.duration)+.35)},null,2));
   // Explicitly retain a very short uncertain turn for listening, without claiming
   // that ASR confirmed its content. Never accept a missing/long turn or a block
   // boundary this way. Recognition stays verbatim and the raw take is untouched.
   const retained=retainShortUncertainty(segment,recognition.words,before,after,uncertainParts);
   if(!retained)throw Error(segment.block+'/'+segment.part+': cobertura local insuficient ('+Math.round(coverage*100)+'%). Conservar presa per revisar.');
   uncertainties.push({...retained,block:segment.block,part:segment.part,text:segment.text,coverage});report.push({...segment,coverage,start:retained.start,end:retained.end,contentUnconfirmed:true});continue;
  }report.push({...segment,coverage,start:good[0].start,end:good.at(-1).end});}
 const binary=await ffmpegBinary(),log=ffmpeg(binary,['-i',raw,'-af','silencedetect=noise=-42dB:d=0.18','-f','null','-']),silences=[];let silenceStart;
 for(const line of log.split('\n')){const start=/silence_start: ([\d.]+)/.exec(line),end=/silence_end: ([\d.]+)/.exec(line);if(start)silenceStart=Number(start[1]);if(end&&silenceStart!==undefined){silences.push({start:silenceStart,end:Number(end[1])});silenceStart=undefined;}}
 if(silenceStart!==undefined)silences.push({start:silenceStart,end:recognition.duration});
 const boundaries=[0];for(let i=1;i<blocks.length;i++){const previous=report.filter(r=>r.block===blocks[i-1].id).at(-1),next=report.find(r=>r.block===blocks[i].id);boundaries.push(silenceCut(previous.end,next.start,silences));}boundaries.push(recognition.duration);
 const cuts=[];
 for(const [i,block]of blocks.entries()){
  const spans=report.filter(r=>r.block===block.id),start=boundaries[i],end=boundaries[i+1],coverage=spans.reduce((n,s)=>n+s.coverage*s.length,0)/spans.reduce((n,s)=>n+s.length,0);if(coverage<.7)throw Error(block.id+': cobertura total insuficient.');
  const blockFile=path.join(folder,block.id.toLowerCase()+'.wav');ffmpeg(binary,['-v','error','-y','-i',raw,'-af',`atrim=start=${start}:end=${end},asetpts=PTS-STARTPTS`,'-c:a','pcm_s16le',blockFile]);
  const info={id:block.id,code:block.code,parts:block.parts,sourceRequestHash:block.sourceRequestHash,batch:id,batchRequestHash:batch.approvedRequestHash,rawBatchSha256:attempt.rawSha256,file:blockFile,sha256:sha(await fs.readFile(blockFile)),start,end,seconds:end-start,coverage,spans:spans.map(s=>({...s,start:s.start-start,end:s.end-start}))};
  if(block.take&&spans[0].part==='introduction'){
   const cut=silenceCut(spans[0].end,spans[1].start,silences);info.titleCut=cut-start;
   for(const [name,from,to]of [['intro',start,cut],['body',cut,end]]){const file=path.join(folder,block.id.toLowerCase()+'-'+name+'.wav');ffmpeg(binary,['-v','error','-y','-i',raw,'-af',`atrim=start=${from}:end=${to},asetpts=PTS-STARTPTS`,'-c:a','pcm_s16le',file]);info[name]={file,sha256:sha(await fs.readFile(file)),seconds:to-from};}
  }
  cuts.push(info);
 }
 await fs.writeFile(path.join(folder,'split.json'),JSON.stringify({batch:id,requestHash:batch.approvedRequestHash,rawSha256:attempt.rawSha256,seconds:recognition.duration,expectedWords:expected.length,recognizedWords:recognition.words.length,coverage:map.filter(Boolean).length/map.length,silences,cuts,uncertainties,pronunciationValidation:'pending-listening'},null,2)+'\n');
 const indexFile=path.join(work,'mixed-batches','takes.json'),index=JSON.parse(await fs.readFile(indexFile,'utf8').catch(e=>{if(e.code==='ENOENT')return '{}';throw e;}));for(const cut of cuts){if(index[cut.id]&&index[cut.id].batchRequestHash!==cut.batchRequestHash)throw Error('Presa ja conservada amb altre origen.');index[cut.id]=cut;}await fs.writeFile(indexFile,JSON.stringify(index,null,2)+'\n');
 console.log(JSON.stringify({batch:id,seconds:recognition.duration,coverage:map.filter(Boolean).length/map.length,cuts:cuts.map(c=>({id:c.id,seconds:Number(c.seconds.toFixed(2)),coverage:Number(c.coverage.toFixed(3))})),pronunciation:'pendent d’audició'}));
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
function retainShortUncertainty(segment,words,before,after,allowed){
 if(!allowed.has(segment.block+'/'+segment.part)||segment.length>5||segment.partIndex===0||segment.partIndex===segment.partCount-1||segment.part==='introduction'||!before||!after||after.start-before.end>4)return null;
 const inside=words.filter(w=>w.start>=before.end+.05&&w.end<=after.start-.05);
 if(!inside.length||inside.at(-1).end-inside[0].start<.3)return null;
 return {start:inside[0].start,end:inside.at(-1).end,heard:inside.map(w=>w.word).join(' '),status:'short-turn-awaiting-listening',originalPreserved:true};
}
module.exports={tokens,align,silenceCut,retainShortUncertainty};
