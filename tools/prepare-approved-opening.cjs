'use strict';
// Restore exact teacher-approved opening omissions. Offline PCM only.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {waveParts}=require('./gemini-result.cjs'),{wav}=require('./compact-mixed-pauses.cjs'),{repairRequest}=require('./audio-repairs.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda'),sha=b=>createHash('sha256').update(b).digest('hex');
async function prepare(code){
 const config={S056:{part:'trasllat',prefixOnly:true},S097:{part:'hola',prefixOnly:false},S061:{titleOnly:true},S090:{part:'pilota',prefixOnly:false}}[code];
 if(!config)throw Error('No authorized opening restoration for this code');
 const {activities}=await import('../catalogue.js'),{productionProgress:p}=await import('../content/production-progress.js'),entry=activities.find(a=>a.code===code),state=p['ca-'+code],approval=state.repairApplicationApproval;
 const read=f=>fs.readFile(f,'utf8').then(JSON.parse),indexFile=path.join(work,'mixed-batches/takes.json'),index=await read(indexFile),plan=(await read(path.join(root,'content/audio-repairs.json')))[code],take=index[plan.sourceTakeId],batches=(await read(path.join(root,'content/synthesis-batches.json'))).batches;
 if(entry.audio||entry.reviewStatus==='validated'||index[code+'-REPAIRED']||approval?.scope!=='approved-repair'||!approval.confirmation||approval.clips?.length!==(config.titleOnly?1:2))throw Error('Exact teacher approval and an unmounted original are required');
 if((approval.sourceTakeSha256??(config.titleOnly?plan.sourceTakeSha256:null))!==take.sha256||state.bodyVoiceApproval?.status!=='approved'||state.bodyVoiceApproval.sourceTakeSha256!==take.sha256||plan.sourceTakeSha256!==take.sha256||plan.sourceRequestHash!==take.batchRequestHash||sha(JSON.stringify(repairRequest(entry,plan)))!==plan.approvedRequestHash)throw Error('Original approval or repair plan changed');
 if(config.titleOnly&&take.titleCut!==0)throw Error('Only an entirely omitted title may be inserted');
 const sourceBytes=await fs.readFile(take.file),bodyBytes=await fs.readFile(take.body.file),source=waveParts(sourceBytes),body=waveParts(bodyBytes),rate=source.format.readUInt32LE(4),frame=source.format.readUInt16LE(12),duration=d=>d.pcm.length/frame/rate;
 if(sha(sourceBytes)!==take.sha256||sha(bodyBytes)!==take.body.sha256||!source.format.equals(body.format)||take.rawBatchSha256!==plan.sourceRawSha256)throw Error('Original source identity changed');
 if(!body.pcm.equals(source.pcm.subarray(Math.round(take.titleCut*rate)*frame)))throw Error('Original body is not the intact tail of the source');
 const selected=[];
 for(const part of(config.titleOnly?['introduction']:['introduction',config.part])){
  const accepted=approval.clips.find(c=>c.part===part),received=state.receivedRepairs.find(r=>r.part===part),repair=plan.repairs.find(r=>r.part===part);
  if(!accepted||accepted.text!==repair.text||received?.status!=='approved-awaiting-application'||received.applied||received.candidateFile!==accepted.candidateFile||received.batchRequestHash!==accepted.batchRequestHash||sha(await fs.readFile(path.join(root,accepted.candidateFile)))!==accepted.candidateSha256)throw Error('Approved candidate changed');
  const batch=batches.find(b=>b.approvedRequestHash===accepted.batchRequestHash),folder=batch&&path.join(work,'mixed-batches',batch.id.toLowerCase()+'-'+batch.approvedRequestHash.slice(0,12));
  if(!folder||batch.state!=='received')throw Error('Candidate receipt absent');
  const split=await read(path.join(folder,'split.json')),cut=split.cuts.find(c=>c.code===code&&c.parts.length===1&&c.parts[0]===part),bytes=cut&&await fs.readFile(cut.file);
  if(!cut||sha(bytes)!==cut.sha256||cut.sourceRequestHash!==plan.approvedRequestHash||cut.spans.length!==1||cut.spans[0].text!==repair.text)throw Error('Candidate PCM or canonical text changed');
  const decoded=waveParts(bytes);if(!source.format.equals(decoded.format))throw Error('PCM formats differ');
  const firstPeak=decoded.pcm.subarray(0,Math.round(.006*rate)*frame),lastPeak=decoded.pcm.subarray(-Math.round(.006*rate)*frame);
  for(const edge of[firstPeak,lastPeak])for(let i=0;i<edge.length;i+=2)if(Math.abs(edge.readInt16LE(i))>32768*10**(-40/20))throw Error('Candidate has no quiet file boundary');
  selected.push({part,accepted,cut,decoded,batch});
 }
 const title=selected[0],greeting=selected[1],gap=Buffer.alloc(Math.round((config.titleOnly?0:.15)*rate)*frame),bodyPcm=config.titleOnly?body.pcm:Buffer.concat([greeting.decoded.pcm,gap,body.pcm]),pcm=Buffer.concat([title.decoded.pcm,bodyPcm]),patched=wav(source.format,pcm),newTitle=duration(title.decoded),prefix=config.titleOnly?0:duration(greeting.decoded)+gap.length/frame/rate,bodyOutputStart=newTitle+prefix;
 const bodyAt=Math.round(bodyOutputStart*rate)*frame;if(!pcm.subarray(bodyAt).equals(body.pcm))throw Error('Previously approved body samples differ');
 const folder=path.join(work,code.toLowerCase(),'approved-opening-v1');await fs.mkdir(folder,{recursive:true});
 const patchedFile=path.join(folder,'patched-source.wav'),introFile=path.join(folder,'intro.wav'),bodyFile=path.join(folder,'body.wav'),nextBody=wav(source.format,bodyPcm),titleBytes=wav(source.format,title.decoded.pcm);
 const bodySpans=take.spans.filter(s=>s.part!=='introduction');
 if(config.prefixOnly&&bodySpans[0]?.part!==config.part)throw Error('Greeting prefix does not belong to the first source turn');
 if(!config.prefixOnly&&bodySpans.some(s=>s.part===config.part))throw Error('Opening turn already present; do not duplicate it');
 const spans=[{...title.cut.spans[0],text:entry.introduction,part:'introduction'},...(!config.titleOnly&&!config.prefixOnly?[{...greeting.cut.spans[0],start:newTitle+greeting.cut.spans[0].start,end:newTitle+greeting.cut.spans[0].end}]:[]),...bodySpans.map((s,i)=>({...s,start:config.prefixOnly&&i===0?newTitle+greeting.cut.spans[0].start:bodyOutputStart+s.start-take.titleCut,end:bodyOutputStart+s.end-take.titleCut}))];
 const edits=selected.map(item=>({part:item.part,text:item.accepted.text,accepted:item.accepted,candidateRawFile:item.cut.file,candidateRawSha256:item.cut.sha256,candidateBatch:item.batch.id,candidateRawBatchSha256:item.cut.rawBatchSha256,candidateRange:{start:0,end:duration(item.decoded)},outputStart:item.part==='introduction'?0:newTitle,operation:item.part==='introduction'?(take.titleCut?'replace-partial-introduction':'insert-omitted-introduction'):(config.prefixOnly?'insert-omitted-greeting':'insert-omitted-opening-turn'),gainDb:0}));
 const record={code,date:approval.approvedAt,scope:'approved-repair',originalRawFile:take.file,originalRawSha256:take.sha256,originalBodyFile:take.body.file,originalBodySha256:take.body.sha256,patchedFile,patchedSha256:sha(patched),seconds:pcm.length/frame/rate,edits,retainedRanges:[{originalFile:take.body.file,originalStart:0,originalEnd:duration(body),outputStart:bodyOutputStart,sha256:sha(body.pcm)}],insertedSilenceSeconds:gap.length/frame/rate,allOtherVoiceSamplesIdentical:true,voiceRetimed:false,pitchShifted:false,newRequests:0};
 const sourceBatchRequests=[{batch:take.batch,requestHash:take.batchRequestHash,rawSha256:take.rawBatchSha256},{batch:title.batch.id,requestHash:title.batch.approvedRequestHash,rawSha256:title.cut.rawBatchSha256}];
 const next={...take,id:code+'-REPAIRED',file:patchedFile,sha256:sha(patched),rawBatchSha256:sha(patched),batch:sourceBatchRequests.map(r=>r.batch).join('+'),batchRequestHash:sha(JSON.stringify(sourceBatchRequests)),sourceBatchRequests,repairApplication:record,spans,start:0,end:record.seconds,seconds:record.seconds,titleCut:newTitle,intro:{file:introFile,sha256:sha(titleBytes),seconds:newTitle},body:{file:bodyFile,sha256:sha(nextBody),seconds:bodyPcm.length/frame/rate},missingParts:[]};
 delete next.partialIntroduction;delete next.missingVoiceDetails;
 if(code==='S090')delete next.omittedSpeech;
 for(const[file,bytes]of[[patchedFile,patched],[introFile,titleBytes],[bodyFile,nextBody]])await fs.writeFile(file,bytes,{flag:'wx'});
 await fs.writeFile(path.join(folder,'split.json'),JSON.stringify({silences:[],uncertainties:[],repairApplication:record},null,2)+'\n',{flag:'wx'});await fs.writeFile(path.join(folder,'usage.json'),JSON.stringify({usage:null,sharedRequests:sourceBatchRequests},null,2)+'\n',{flag:'wx'});await fs.writeFile(path.join(folder,'repair-application.json'),JSON.stringify(record,null,2)+'\n',{flag:'wx'});
 index[next.id]=next;await fs.writeFile(indexFile,JSON.stringify(index,null,2)+'\n');
 state.voiceApproval={status:'approved',approvedAt:approval.approvedAt,sourceTakeSha256:next.sha256,baseTakeSha256:take.sha256,confirmation:approval.confirmation,derivation:'Previously approved complete body, plus the exact teacher-approved opening clips. Full montage still awaits listening.',repairs:approval.clips};
 await fs.writeFile(path.join(root,'content/production-progress.js'),'// Production stages are separate from editorial review and final listening approval.\nexport const productionProgress = '+JSON.stringify(p,null,2)+';\n');
 console.log(JSON.stringify({code,parts:edits.map(e=>e.part),bodyPcmUnchanged:true,titleSeconds:newTitle,bodySeconds:next.body.seconds,newRequests:0}));return record;
}
if(require.main===module)prepare(process.argv.find(a=>a.startsWith('--only='))?.slice(7)).catch(e=>{console.error(e.stack);process.exitCode=1;});module.exports={prepare};
