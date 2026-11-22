'use strict';
// Offline insertion of a specific teacher-approved take; original PCM is retained.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {waveParts}=require('./gemini-result.cjs'),{wav}=require('./compact-mixed-pauses.cjs'),{tokens,align}=require('./split-synthesis-batch.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda'),sha=b=>createHash('sha256').update(b).digest('hex');
function boundary(data,target,low,high){
 const rate=data.format.readUInt32LE(4),frame=data.format.readUInt16LE(12);
 for(const delta of [0,...Array.from({length:300},(_,i)=>[(i+1)/1000,-(i+1)/1000]).flat()]){const at=target+delta;if(at<low||at>high)continue;const n=Math.round(at*rate)*frame;let max=0;for(let i=Math.max(0,n-Math.round(.004*rate)*frame);i<Math.min(data.pcm.length,n+Math.round(.004*rate)*frame);i+=2)max=Math.max(max,Math.abs(data.pcm.readInt16LE(i)));if(max<=32768*10**(-38/20))return {byte:n,seconds:n/frame/rate,peakDbFS:max?20*Math.log10(max/32768):-120};}
 throw Error('No quiet splice handle: '+target);
}
function activeRms(pcm){let sum=0,n=0;for(let i=0;i<pcm.length;i+=2){const x=pcm.readInt16LE(i);if(Math.abs(x)>327.68){sum+=x*x;n++;}}if(n<100)throw Error('No speech for level matching.');return Math.sqrt(sum/n);}
(async()=>{
 const code=process.argv.find(a=>a.startsWith('--only='))?.slice(7);if(!['S016','S023'].includes(code))throw Error('Only S016/S023 approved repair.');
 const {activities}=await import('../catalogue.js'),{productionProgress:p}=await import('../content/production-progress.js'),entry=activities.find(e=>e.code===code),plans=JSON.parse(await fs.readFile(path.join(root,'content/audio-repairs.json'))),plan=plans[code],repair=plan.repairs[0],approval=p['ca-'+code].receivedRepairs.find(r=>r.part===repair.part);
 if(approval?.status!=='approved-awaiting-application'||approval.applied!==false||approval.text!==repair.text||sha(await fs.readFile(path.join(root,approval.candidateFile)))!==approval.candidateSha256)throw Error('Teacher approval must match this exact comparison clip.');
 const report=JSON.parse(await fs.readFile(path.join(root,'assets/audio/'+code.toLowerCase()+'-production-manifest.json')));if(report.rawSha256!==plan.sourceRawSha256)throw Error('Raw source identity changed.');
 const legacy=path.join(work,code.toLowerCase());let raw;
 for(const name of (await fs.readdir(legacy)).filter(n=>n.endsWith('.wav'))){const b=await fs.readFile(path.join(legacy,name));if(sha(b)===plan.sourceRawSha256){raw=b;break;}}if(!raw)throw Error('Original raw source missing.');
 const split=JSON.parse(await fs.readFile(path.join(work,'mixed-batches/l03-2dd8d2f23322/split.json'))),take=split.cuts.find(t=>t.id===code+'-'+repair.part),candidate=await fs.readFile(take.file);if(sha(candidate)!==take.sha256||take.batchRequestHash!==approval.batchRequestHash)throw Error('Candidate raw identity changed.');
 const original=waveParts(raw),next=waveParts(candidate);if(!original.format.equals(next.format))throw Error('No implicit resampling at a splice.');
 const recognition=JSON.parse(await fs.readFile(path.join(legacy,'comparison-original-alignment.json'))),expected=tokens([entry.introduction,...entry.transcript.filter(p=>p.speaker).map(p=>p.text)].join(' ')),phrase=tokens(repair.text),offsets=[];
 for(let i=0;i<=expected.length-phrase.length;i++)if(phrase.every((t,j)=>expected[i+j]===t))offsets.push(i);if(offsets.length!==1)throw Error('Ambiguous sentence.');
 const offset=offsets[0],map=align(expected,recognition.words).map,matched=map.slice(offset,offset+phrase.length).filter(Boolean),previous=map.slice(0,offset).filter(Boolean).at(-1),after=map.slice(offset+phrase.length).find(Boolean);
 if(matched.length/phrase.length<.65||!previous||!after)throw Error('Insufficient alignment.');
 const a=boundary(original,(previous.end+matched[0].start)/2,previous.end+.12,matched[0].start-.12),b=boundary(original,(matched.at(-1).end+after.start)/2,matched.at(-1).end+.015,after.start-.008),span=take.spans[0],duration=take.seconds;
 const c=boundary(next,Math.max(.02,span.start-.20),0,Math.max(0,span.start-.08)),d=boundary(next,Math.min(duration,span.end+.18),span.end+.06,duration);
 const replaced=original.pcm.subarray(a.byte,b.byte),fragment=next.pcm.subarray(c.byte,d.byte),gain=activeRms(replaced)/activeRms(fragment);if(gain<.5||gain>2)throw Error('Unexpected level difference; review manually.');
 const leveled=Buffer.from(fragment);let peak=0;for(let i=0;i<leveled.length;i+=2){const sample=Math.round(leveled.readInt16LE(i)*gain);peak=Math.max(peak,Math.abs(sample));if(Math.abs(sample)>32000)throw Error('Level matching would clip.');leveled.writeInt16LE(sample,i);}
 const pcm=Buffer.concat([original.pcm.subarray(0,a.byte),leveled,original.pcm.subarray(b.byte)]),rate=original.format.readUInt32LE(4),frame=original.format.readUInt16LE(12),titleBytes=Math.round(report.cut.at*rate)*frame;
 if(!pcm.subarray(0,a.byte).equals(original.pcm.subarray(0,a.byte))||!pcm.subarray(a.byte+leveled.length).equals(original.pcm.subarray(b.byte)))throw Error('Unaffected voice samples changed.');
 const folder=path.join(legacy,'approved-repair-v3');await fs.mkdir(folder,{recursive:true});const body=wav(original.format,pcm.subarray(titleBytes));await fs.writeFile(path.join(folder,'body-input.wav'),body);
 const record={schema:1,code,part:repair.part,text:repair.text,date:'2026-11-22',teacherApproval:{at:approval.approvedAt,confirmation:approval.confirmation,candidateFile:approval.candidateFile,candidateSha256:approval.candidateSha256},originalRawSha256:sha(raw),candidateRawSha256:sha(candidate),candidateBatchRequestHash:take.batchRequestHash,originalRange:{start:a.seconds,end:b.seconds,handles:[a.peakDbFS,b.peakDbFS]},candidateRange:{start:c.seconds,end:d.seconds,handles:[c.peakDbFS,d.peakDbFS]},gainDb:20*Math.log10(gain),peakAfterGain:peak,deltaSeconds:(leveled.length-replaced.length)/frame/rate,bodySha256:sha(body),bodyPcmSha256:sha(pcm.subarray(titleBytes)),allOtherVoiceSamplesIdentical:true,voiceRetimed:false,pitchShifted:false,newRequests:0};
 await fs.writeFile(path.join(folder,'splice.json'),JSON.stringify(record,null,2)+'\n');console.log(JSON.stringify(record));
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
