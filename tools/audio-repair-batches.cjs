'use strict';
// One guarded batch of at most two voices. Default command only describes the plan.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {request}=require('./audio-plan.cjs'),{repairRequest,repairSpec,assertDailyRoom}=require('./audio-repairs.cjs');
const {checkWave}=require('./audio-files.cjs'),{readJSON,reserveRequest,assertQuota}=require('./audio-quota.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda'),hash=data=>createHash('sha256').update(data).digest('hex');
function buildBatch(entries,plans,batch){
 const voices={},fragments=[];
 for(const ref of batch.fragments){
  const plan=plans[ref.code],entry=entries.find(e=>e.code===ref.code),repair=plan?.repairs.find(r=>r.part===ref.part);
  if(!entry||!repair||plan.status!=='approved-for-correction'||hash(JSON.stringify(repairRequest(entry,plan)))!==plan.approvedRequestHash)throw Error('La correcció no coincideix amb la proposta autoritzada.');
  const voice=plan.voices[repair.speaker];if(voices[repair.speaker]&&voices[repair.speaker]!==voice)throw Error('Identitat de veu inconsistent.');voices[repair.speaker]=voice;
  fragments.push({...repair,code:ref.code,sourceRequestHash:plan.sourceRequestHash,sourceRawSha256:plan.sourceRawSha256,notBefore:plan.notBefore});
 }
 const body=request(fragments.map(f=>({speaker:f.speaker,text:f.text+' <long pause> <long pause>'})),{voices,pace:'Read each supplied repair sentence verbatim. At each pair of long-pause tags leave at least three seconds of silence for local editing. No spoken labels, numbers, introduction, added words, effects or music.'});
 body.input[0].content.forEach((item,i)=>{item.annotations[0].style+=' '+fragments[i].pronunciation;});
 return {body,fragments,voices,requestHash:hash(JSON.stringify(body))};
}
async function main(){
 const id=process.argv.find(a=>a.startsWith('--only='))?.slice(7).toUpperCase();
 const batches=await readJSON(path.join(root,'content/audio-repair-batches.json'),[]),batch=batches.find(b=>b.id===id);if(!batch)throw Error('Indica --only amb un lot de content/audio-repair-batches.json.');
 const {activities}=await import('../catalogue.js'),plans=await readJSON(path.join(root,'content/audio-repairs.json'),{}),built=buildBatch(activities,plans,batch);
 if(batch.approvedRequestHash!==built.requestHash)throw Error('El lot ha canviat; cal revisar-ne les instruccions.');
 for(const fragment of built.fragments){const current=await readJSON(path.join(root,`assets/audio/${fragment.code.toLowerCase()}-production-manifest.json`),null);if(current?.requestHash!==fragment.sourceRequestHash||current.rawSha256!==fragment.sourceRawSha256)throw Error('La presa original ha canviat.');}
 const folder=path.join(work,'repair-batches'),raw=path.join(folder,id.toLowerCase()+'-'+built.requestHash.slice(0,12)+'.wav'),cached=await fs.readFile(raw).catch(e=>{if(e.code==='ENOENT')return null;throw e;});if(cached)checkWave(cached);
 console.log(JSON.stringify({batch:id,newRequests:cached?0:1,voices:built.voices,fragments:built.fragments.map(f=>({code:f.code,part:f.part,text:f.text})),requestHash:built.requestHash,action:'Raw comparison only; no automatic publication or splice.'}));
 if(!process.argv.includes('--generate')||cached)return;
 if(batch.status!=='approved-for-correction')throw Error('El lot no està autoritzat per sintetitzar.');
 if(!process.argv.includes('--max-requests=1'))throw Error('Cal un topall explícit d’una petició.');
 if(built.fragments.some(f=>Date.now()<Date.parse(f.notBefore)))throw Error('Esperar el restabliment; cap petició enviada.');
 const {isEditoriallyReviewed}=await import('../editorial-review.js'),{assertProductionApproved}=require('./production-approval.cjs'),production=await readJSON(path.join(root,'content/production-plans.json'),{});
 for(const code of new Set(built.fragments.map(f=>f.code))){const entry=activities.find(e=>e.code===code);if(!isEditoriallyReviewed(entry))throw Error('Revisió editorial caducada.');assertProductionApproved(entry,repairSpec(entry),production[code]);}
 assertQuota(await readJSON(path.join(work,'last-api-error.json'),null));assertDailyRoom(await readJSON(path.join(work,'request-log.json'),[]));
 await fs.mkdir(folder,{recursive:true});const attemptFile=raw.replace('.wav','.attempt.json');if(await readJSON(attemptFile,null))throw Error('Intent anterior incert; revisar abans de repetir.');
 const lock=path.join(work,'production.lock'),handle=await fs.open(lock,'wx'),attempt={batch:id,requestHash:built.requestHash,state:'in-flight',startedAt:new Date().toISOString()};
 try{
  await handle.writeFile(JSON.stringify({pid:process.pid,batch:id,purpose:'batched-pronunciation-repair'}));assertDailyRoom(await readJSON(path.join(work,'request-log.json'),[]));
  await reserveRequest(work,{code:id,purpose:'batched-pronunciation-repair',hash:built.requestHash,model:built.body.model});
  await fs.writeFile(attemptFile,JSON.stringify(attempt,null,2));await fs.writeFile(raw.replace('.wav','.request.json'),JSON.stringify(built.body,null,2));
  const audio=await require('./generate-prototypes.cjs').geminiAudio(built.body,raw.replace('.wav','.usage.json'));checkWave(audio);await fs.writeFile(raw+'.part',audio);await fs.rename(raw+'.part',raw);
  attempt.state='complete-awaiting-listening';attempt.rawSha256=hash(audio);attempt.completedAt=new Date().toISOString();
 }catch(e){attempt.state='failed-or-uncertain';attempt.error=e.message;throw e;}
 finally{await fs.writeFile(attemptFile,JSON.stringify(attempt,null,2));await handle.close();await fs.unlink(lock);}
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={buildBatch};
