'use strict';
// One frozen mixed batch at a time. Default/--freeze never contacts Gemini.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {productionSpec,packedProposalRequests}=require('./proposal-plan.cjs');
const {fingerprint,assertProductionApproved}=require('./production-approval.cjs');
const {repairSpec,repairRequest,assertDailyRoom}=require('./audio-repairs.cjs');
const {assertSynthesisWindow,estimateSynthesis}=require('./audio-batch-policy.cjs');
const {readJSON,reserveRequest,assertQuota}=require('./audio-quota.cjs');
const {checkWave}=require('./audio-files.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda'),sha=x=>createHash('sha256').update(x).digest('hex');
async function buildBatch(activities,plans,repairs,batch){
 const {isEditoriallyReviewed}=await import('../editorial-review.js');
 const content=[],blocks=[],labels=new Map(),voiceIdentities=new Map();
 const separatorTags=batch.separatorTags??2;if(![1,2].includes(separatorTags))throw Error('Cal almenys una pausa llarga entre blocs.');
 if(new Set(batch.blocks.map(b=>b.code+':'+(b.take??b.part))).size!==batch.blocks.length)throw Error('Blocs duplicats al lot.');
 for(const ref of batch.blocks){
  const entry=activities.find(e=>e.code===ref.code),plan=plans[ref.code];if(!entry||!isEditoriallyReviewed(entry))throw Error(ref.code+': revisió editorial no vigent.');
  let original,sourceItems,parts,spec,sourceRequestHash;
  if(ref.take){
   if(entry.audio)throw Error(ref.code+': ja té àudio; no repetir la síntesi.');
   spec=productionSpec(entry);assertProductionApproved(entry,spec,plan);
   const index=entry.generationPlan.takes.findIndex(t=>t.id===ref.take);if(index<0)throw Error('Presa desconeguda.');
   original=packedProposalRequests(entry)[index];sourceItems=original.input[0].content;parts=entry.generationPlan.takes[index].parts;
  }else{
   const correction=repairs[ref.code],repair=correction?.repairs.find(r=>r.part===ref.part);spec=repairSpec(entry);assertProductionApproved(entry,spec,plan);
   if(!repair||correction.status!=='approved-for-correction')throw Error('Esmena no autoritzada.');
   original=repairRequest(entry,correction);if(sha(JSON.stringify(original))!==correction.approvedRequestHash)throw Error('Esmena canviada.');
   const source=await readJSON(path.join(root,`assets/audio/${ref.code.toLowerCase()}-production-manifest.json`),null);
   if(source?.requestHash!==correction.sourceRequestHash||source.rawSha256!==correction.sourceRawSha256)throw Error('Origen de l’esmena canviat.');
   if(Date.now()<Date.parse(correction.notBefore))throw Error('Esmena encara bloquejada per quota.');
   sourceItems=[original.input[0].content[correction.repairs.indexOf(repair)]];parts=[repair.part];
  }
  sourceRequestHash=sha(JSON.stringify(original));
  if(ref.sourceRequestHash!==sourceRequestHash)throw Error(ref.code+': empremta d’origen diferent de la planificada.');
  const speech=original.generation_config.speech_config,voices=Array.isArray(speech)?speech:speech.speakers;
  const start=content.length,items=[],styles=new Set();
  for(const item of sourceItems){
   const annotation=item.annotations.find(a=>a.type==='speech_metadata'),sourceSpeaker=annotation.speaker??(ref.take?spec.titleSpeaker:repairs[ref.code].repairs.find(r=>r.part===ref.part).speaker),voice=voices.find(v=>v.speaker===annotation.speaker)?.voice??(voices.length===1?voices[0].voice:null);
   if(!voice)throw Error('Veu sense correspondència.');
   if(voiceIdentities.has(sourceSpeaker)&&voiceIdentities.get(sourceSpeaker)!==voice)throw Error('Identitat inconsistent dins del lot.');voiceIdentities.set(sourceSpeaker,voice);
   if(!labels.has(voice))labels.set(voice,'Voice'+(labels.size+1));
   const cloned=structuredClone(item);cloned.annotations[0].speaker=labels.get(voice);
   const styleKey=voice+'\0'+cloned.annotations[0].style;
   const repeatedStyle='Same Central Catalan voice and direction. Verbatim, with explicit pauses; no added sounds.';
   if(styles.has(styleKey)&&cloned.annotations[0].style.length>repeatedStyle.length)cloned.annotations[0].style=repeatedStyle;
   styles.add(styleKey);
   // A selected repair must not carry separators belonging to its old bundle.
   if(!ref.take)cloned.text=cloned.text.replace(/(?:\s*<long pause>)+$/u,'');
   items.push({text:cloned.text,sourceSpeaker,voice,requestIndex:content.length});content.push(cloned);
  }
  content[start].annotations[0].style+=' This is a separate recording in a batch. Read this block exactly once, without referring to any other block. The text fields contain all and only the words to speak; never speak labels or instructions. After this block leave the indicated long pauses.';
  content.at(-1).text+=' <long pause>'.repeat(separatorTags);
  blocks.push({...ref,id:ref.take??`${ref.code}-${ref.part}`,parts,firstItem:start,lastItem:content.length-1,items,productionApproval:fingerprint(entry,spec,plan)});
 }
 if(labels.size>2)throw Error('El lot supera les dues veus.');
 const speakers=[...labels].map(([voice,speaker])=>({speaker,voice}));
 const body={model:'gemini-3.8-flash-tts',input:[{type:'user_input',content}],response_format:{type:'audio',mime_type:'audio/wav',sample_rate:24000},generation_config:{speech_config:speakers.length===1?[{voice:speakers[0].voice}]:{speakers}}};
 if(speakers.length===1)for(const item of content)delete item.annotations[0].speaker;
 const estimatedInputTokens=Math.ceil(JSON.stringify(body).length/3);
 if(estimatedInputTokens>8192)throw Error('Estimació conservadora d’entrada superior a 8.192 tokens; dividir el lot.');
 return {body,blocks,voices:speakers,requestHash:sha(JSON.stringify(body)),estimatedInputTokens,estimate:estimateSynthesis(body)};
}
async function main(){
 const id=process.argv.find(a=>a.startsWith('--only='))?.slice(7).toUpperCase();
 const file=path.join(root,'content/synthesis-batches.json'),catalog=await readJSON(file,null),batch=catalog?.batches.find(b=>b.id===id);if(!batch)throw Error('Indica --only=LXX.');
 if(batch.state==='received'){console.log(JSON.stringify({batch:id,state:'received',receipt:batch.receipt,newRequests:0}));if(process.argv.includes('--generate'))throw Error('Lot ja rebut: no repetir.');return;}
 const {activities}=await import('../catalogue.js'),plans=await readJSON(path.join(root,'content/production-plans.json'),{}),repairs=await readJSON(path.join(root,'content/audio-repairs.json'),{});
 const built=await buildBatch(activities,plans,repairs,batch);
 const folder=path.join(work,'mixed-batches',id.toLowerCase()+'-'+built.requestHash.slice(0,12));
 console.log(JSON.stringify({batch:id,requestHash:built.requestHash,estimatedSeconds:built.estimate.seconds,estimatedInputTokens:built.estimatedInputTokens,voices:built.voices,blocks:built.blocks.map(b=>b.id),folder}));
 if(process.argv.includes('--freeze')){
  assertSynthesisWindow(built.body);if(batch.state&&batch.state!=='planned'&&batch.approvedRequestHash!==built.requestHash)throw Error('Lot ja congelat amb una altra empremta.');
  Object.assign(batch,{state:'authorized',approvedAt:new Date().toISOString(),approvedRequestHash:built.requestHash,estimatedSeconds:built.estimate.seconds,estimatedInputTokens:built.estimatedInputTokens,authorization:'El docent autoritza el 21/11/2026 processar els lots compatibles d’un en un, comprovant cada retorn i aprofitant els següents per a esmenes. Només guions i correccions ja validats.'});
  await fs.writeFile(file,JSON.stringify(catalog,null,2)+'\n');
 }
 if(!process.argv.includes('--generate'))return;
 if(!process.argv.includes('--max-requests=1'))throw Error('Cal limitar a una única petició.');
 if(batch.state!=='authorized'||batch.approvedRequestHash!==built.requestHash)throw Error('Cal congelar el lot exacte abans d’enviar.');
 assertSynthesisWindow(built.body);assertQuota(await readJSON(path.join(work,'last-api-error.json'),null));assertDailyRoom(await readJSON(path.join(work,'request-log.json'),[]));
 const disk=await fs.statfs(work);if(disk.bavail*disk.bsize<512*1024*1024)throw Error('Menys de 512 MB lliures: alliberar espai abans de reservar quota o sintetitzar. Cap petició enviada.');
 await fs.mkdir(folder,{recursive:true});
 const raw=path.join(folder,'raw.wav'),attemptFile=path.join(folder,'attempt.json'),previous=await readJSON(attemptFile,null);
 if(previous){const bytes=await fs.readFile(raw).catch(()=>null);if(previous.state==='raw-received'&&bytes&&sha(bytes)===previous.rawSha256){checkWave(bytes);console.log('Presa conservada; zero peticions noves.');return;}throw Error('Intent previ incert o ja processat: revisar abans de repetir.');}
 const index=await readJSON(path.join(work,'mixed-batches','takes.json'),{});if(built.blocks.some(b=>index[b.id]))throw Error('El lot conté una presa ja rebuda; replanificar per no duplicar-la.');
 const lock=path.join(work,'production.lock'),handle=await fs.open(lock,'wx'),attempt={batch:id,requestHash:built.requestHash,state:'prepared',startedAt:new Date().toISOString(),maxRequests:1};
 try{
  await handle.writeFile(JSON.stringify({pid:process.pid,batch:id,startedAt:attempt.startedAt}));
  await fs.writeFile(path.join(folder,'request.json'),JSON.stringify(built.body,null,2));await fs.writeFile(path.join(folder,'blocks.json'),JSON.stringify(built.blocks,null,2));
  await fs.writeFile(attemptFile,JSON.stringify(attempt,null,2));
  await reserveRequest(work,{code:id,purpose:'mixed-approved-batch',hash:built.requestHash,model:built.body.model},built.body,{minimumIntervalMs:65000});
  attempt.state='in-flight';await fs.writeFile(attemptFile,JSON.stringify(attempt,null,2));
  const audio=await require('./generate-prototypes.cjs').geminiAudio(built.body,path.join(folder,'usage.json'),{timeoutMs:1200000,responseFile:path.join(folder,'response.json')});
  checkWave(audio);await fs.writeFile(raw+'.part',audio);await fs.rename(raw+'.part',raw);Object.assign(attempt,{state:'raw-received',completedAt:new Date().toISOString(),rawSha256:sha(audio)});
  const response=await fs.readFile(path.join(folder,'response.json')),gzip=await require('node:util').promisify(require('node:zlib').gzip)(response);if(sha(await require('node:util').promisify(require('node:zlib').gunzip)(gzip))!==sha(response))throw Error('Còpia comprimida no íntegra.');await fs.writeFile(path.join(folder,'response.json.gz'),gzip);await fs.unlink(path.join(folder,'response.json'));attempt.responseSha256=sha(response);attempt.responseFile='response.json.gz';
  console.log(JSON.stringify({batch:id,state:attempt.state,bytes:audio.length,folder}));
 }catch(error){attempt.state='failed-or-uncertain';attempt.error=error.message;throw error;}
 finally{await fs.writeFile(attemptFile,JSON.stringify(attempt,null,2));await handle.close();await fs.unlink(lock);}
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={buildBatch};
