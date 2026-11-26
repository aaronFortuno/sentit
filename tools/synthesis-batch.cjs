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
 const plain=batch.speechTextFormat==='plain-v1';
 if(batch.speechTextFormat&&!plain)throw Error('Format de parla desconegut.');
 const compact=batch.styleFormat==='compact-v1',sharedStyles=new Set(),flexibleRoles=new Set();
 if(batch.styleFormat&&!compact)throw Error('Format de direcció desconegut.');
 if(compact&&!plain)throw Error('La direcció compacta requereix text pla.');
 const repairOnly=batch.castPolicy?.kind==='repair-only-v1',narratorPolicy=batch.castPolicy?.kind==='anchor-with-flexible-narrator-v1'?batch.castPolicy:null,guestPolicy=narratorPolicy||repairOnly?null:batch.castPolicy;
 const {characters}=batch.castPolicy?await import('../content/characters.js'):{characters:[]};
 const {loadFullRetake,assertFlexibleNarratorPolicy,assertFlexibleNarratorCast}=require('./full-voice-retake.cjs');
 const {assertGuestPolicy,assertGuestCast,loadExtra}=require('./synthesis-extra.cjs');
 if(guestPolicy){if(!plain)throw Error('Els convidats requereixen text pla.');assertGuestPolicy(guestPolicy,characters);}
 if(narratorPolicy){if(!plain)throw Error('El narrador flexible requereix text pla.');assertFlexibleNarratorPolicy(narratorPolicy,characters);}
 if(repairOnly&&(!plain||Object.keys(batch.castPolicy).length!==1||!batch.blocks.length||batch.blocks.some(b=>b.take||b.fullRetake||b.extra||b.trial||!b.code||!b.part)))throw Error('repair-only-v1 només admet esmenes canòniques en text pla, sense lectures, proves o extres.');
 let cast;
 const separatorTags=batch.separatorTags??2;if(![1,2].includes(separatorTags))throw Error('Cal almenys una pausa llarga entre blocs.');
 if(new Set(batch.blocks.map(b=>b.extra??b.retry??b.trial??b.code+':'+(b.fullRetake??b.take??b.part))).size!==batch.blocks.length)throw Error('Blocs duplicats al lot.');
 for(const ref of batch.blocks){
  const whole=Boolean(ref.take||ref.fullRetake);
  if(ref.extra){
   if(!guestPolicy||!cast||ref.code||ref.take||ref.part)throw Error('El tall extern necessita lectures completes compatibles abans.');
   const extra=await loadExtra(ref,guestPolicy,batch.blocks.indexOf(ref),batch.blocks.length),voice=extra.voice;
   if(!labels.has(voice))throw Error('El pilot no pot afegir una altra veu.');
   const item=structuredClone(extra.canonicalBlock),start=content.length;
   item.annotations[0].speaker=labels.get(voice);
   item.annotations[0].style=extra.direction+' '+item.annotations[0].style;
   item.annotations[0].style+=' This final recording is independent: no title, no newsreader cadence, no music or effects. Finish every word fully and leave quiet at the end.';
   content.push(item);
   blocks.push({...ref,id:extra.id,code:extra.id,external:true,parts:['speech'],firstItem:start,lastItem:start,items:[{text:item.text,sourceSpeaker:extra.speakerRole,voice,requestIndex:start}],sourceSha256:extra.sourceSha256,speechSha256:extra.speechSha256});
   continue;
  }
  const entry=activities.find(e=>e.code===ref.code),plan=plans[ref.code];if(!entry||!isEditoriallyReviewed(entry))throw Error(ref.code+': revisió editorial no vigent.');
  let original,sourceItems,parts,spec,sourceRequestHash,selected;
  if(whole){
   if(entry.audio)throw Error(ref.code+': ja té àudio; no repetir la síntesi.');
   spec=productionSpec(entry);assertProductionApproved(entry,spec,plan);
   if(plain){
    if(entry.generationPlan.takes.length!==1||spec.performance||spec.overlaps)throw Error('plain-v1 requereix lectures completes sense marques vocals ni solapaments.');
    const identity=JSON.stringify(Object.entries(spec.voices).sort(([a],[b])=>a.localeCompare(b)));
    if(guestPolicy)assertGuestCast(entry,spec,guestPolicy,characters);
    else if(narratorPolicy){assertFlexibleNarratorCast(entry,spec,plan,narratorPolicy);flexibleRoles.add(Object.keys(spec.voices)[0]===narratorPolicy.narratorRole?'narrator':'anchor');}
    else if(cast&&cast!==identity)throw Error('plain-v1 requereix el mateix repartiment exacte a totes les lectures.');
    cast=identity;
   }
   if(ref.fullRetake){
    if(!plain)throw Error('Les preses completes de substitució requereixen text pla.');
    selected=await loadFullRetake(entry,spec,ref);({original,sourceItems,parts}=selected);
   }else{
    const index=entry.generationPlan.takes.findIndex(t=>t.id===ref.take);if(index<0)throw Error('Presa desconeguda.');
    original=packedProposalRequests(entry)[index];sourceItems=original.input[0].content;parts=entry.generationPlan.takes[index].parts;
   }
  }else{
   if(narratorPolicy)throw Error('El lot amb narrador flexible només admet lectures completes.');
   if(guestPolicy&&!guestPolicy.allowAnchorRepairs)throw Error('Les esmenes requereixen un lot estricte separat dels papers ocasionals.');
   const correction=repairs[ref.code],trialPart=ref.trial?correction?.nextTrials?.part:null,repair=correction?.repairs.find(r=>r.part===(trialPart??ref.part));spec=repairSpec(entry);assertProductionApproved(entry,spec,plan);
   if(!repair||correction.status!=='approved-for-correction')throw Error('Esmena no autoritzada.');
   const canonical=repairRequest(entry,correction);if(sha(JSON.stringify(canonical))!==correction.approvedRequestHash)throw Error('Esmena canviada.');
   if(guestPolicy&&(repair.speaker!==guestPolicy.speaker||correction.voices[repair.speaker]!==guestPolicy.voice))throw Error('L’esmena ha de conservar el recurrent de referència.');
   if(correction.sourceTakeId){
    const index=await readJSON(path.join(work,'mixed-batches/takes.json'),{}),source=index[correction.sourceTakeId];
    if(!source||source.code!==ref.code||!(repair.sourceParts??[repair.part]).every(part=>source.parts?.includes(part))||source.batchRequestHash!==correction.sourceRequestHash||source.rawBatchSha256!==correction.sourceRawSha256||source.sha256!==correction.sourceTakeSha256||sha(await fs.readFile(source.file))!==correction.sourceTakeSha256)throw Error('Presa de veu original de l’esmena canviada.');
   }else{
    const source=await readJSON(path.join(root,`assets/audio/${ref.code.toLowerCase()}-production-manifest.json`),null);
    if(source?.requestHash!==correction.sourceRequestHash||source.rawSha256!==correction.sourceRawSha256)throw Error('Origen de l’esmena canviat.');
   }
   if(Date.now()<Date.parse(correction.notBefore))throw Error('Esmena encara bloquejada per quota.');
   selected=require('./batch-repair-source.cjs').selectedRepair(entry,correction,ref,canonical);({original,sourceItems,parts}=selected);
  }
  sourceRequestHash=sha(JSON.stringify(original));
  if(ref.sourceRequestHash!==sourceRequestHash)throw Error(ref.code+': empremta d’origen diferent de la planificada.');
  const speech=original.generation_config.speech_config,voices=Array.isArray(speech)?speech:speech.speakers;
  // Optional, explicit format: identical direction strings need only be stated
  // once per physical voice. Historical frozen requests keep their old format.
  const start=content.length,items=[],styles=compact?sharedStyles:new Set();
  for(const item of sourceItems){
   const annotation=item.annotations.find(a=>a.type==='speech_metadata'),sourceSpeaker=annotation.speaker??(whole?spec.titleSpeaker:repairs[ref.code].repairs.find(r=>r.part===parts[0]).speaker),voice=voices.find(v=>v.speaker===annotation.speaker)?.voice??(voices.length===1?voices[0].voice:null);
   if(!voice)throw Error('Veu sense correspondència.');
   if(voiceIdentities.has(sourceSpeaker)&&voiceIdentities.get(sourceSpeaker)!==voice)throw Error('Identitat inconsistent dins del lot.');voiceIdentities.set(sourceSpeaker,voice);
   if(!labels.has(voice))labels.set(voice,'Voice'+(labels.size+1));
   const cloned=structuredClone(item);cloned.annotations[0].speaker=labels.get(voice);
   if(plain){
    cloned.text=cloned.text.replace(/<long pause>|<short pause>/gu,'').trim();
    if(/[<>|]/u.test(cloned.text))throw Error('El text pla conté marques no admeses.');
   }
   const styleKey=voice+'\0'+cloned.annotations[0].style;
   const repeatedStyle=plain?'Same natural Central Catalan voice, pace and character. Read the words verbatim, with conversational turn-taking. No added sounds.':'Same Central Catalan voice and direction. Verbatim, with explicit pauses; no added sounds.';
   if(styles.has(styleKey)&&cloned.annotations[0].style.length>repeatedStyle.length)cloned.annotations[0].style=repeatedStyle;
   styles.add(styleKey);
   // A selected repair must not carry separators belonging to its old bundle.
   if(!whole)cloned.text=cloned.text.replace(/(?:\s*<long pause>)+$/u,'');
   items.push({text:cloned.text,sourceSpeaker,voice,requestIndex:content.length});content.push(cloned);
  }
  if(plain){
   if(whole){
   const continuity=narratorPolicy?'Keep the assigned physical voice stable. Each recording has its own supplied role and direction: the anonymous narrator is separate from the recurring character. Do not carry names or character mannerisms between recordings.':guestPolicy?'Keep the assigned physical voices unchanged. This recording has only the supplied cast; guest roles belong only to this scene.':Object.keys(spec.voices).length===1?'Keep this same single character voice throughout all recordings.':'Keep the same two character voices throughout all recordings.';
    const passage=Object.keys(spec.voices).length===1?'story':'dialogue';
    content[start].annotations[0].style+=' This begins a separate complete recording. Read this title once, then leave a clear quiet gap before its '+passage+'. '+continuity+' Instructions are not spoken.';
   }else content[start].annotations[0].style+=repairOnly?' This is a separate repair paragraph with no title. Keep the exact assigned character voice stable throughout this corrective recording. Read every supplied word once, including the first sentence. Instructions are not spoken.':' This is a separate repair paragraph with no title. Keep the same character voice as in the complete recordings. Read every supplied word once, including the first sentence. Instructions are not spoken.';
   content.at(-1).annotations[0].style+=' Finish the final word fully, then leave a clear quiet gap before the next recording. Do not speak any instruction or transition.';
  }else{
   content[start].annotations[0].style+=' This is a separate recording in a batch. Read this block exactly once, without referring to any other block. The text fields contain all and only the words to speak; never speak labels or instructions. After this block leave the indicated long pauses.';
   content.at(-1).text+=' <long pause>'.repeat(separatorTags);
  }
  blocks.push({...ref,id:ref.fullRetake??ref.take??selected?.id??`${ref.code}-${ref.part}`,...(ref.fullRetake?{take:ref.fullRetake,retakeAuthorization:selected.authorization}:{}),...(selected?.trial?{trial:selected.trial,canonicalText:selected.canonicalText}:{}),parts,firstItem:start,lastItem:content.length-1,items,productionApproval:fingerprint(entry,spec,plan)});
 }
 if(plain){
  if(!cast&&!repairOnly)throw Error('El text pla d’esmenes requereix almenys una lectura completa del mateix repartiment.');
  if(narratorPolicy&&flexibleRoles.size!==2)throw Error('La política de narrador flexible requereix el recurrent de referència i una narració anònima al mateix lot.');
  if(!guestPolicy&&!narratorPolicy&&!repairOnly){const expectedCast=new Map(JSON.parse(cast));
   for(const[name,voice]of voiceIdentities)if(expectedCast.get(name)!==voice)throw Error('Les esmenes en text pla requereixen el mateix repartiment de les lectures completes.');}
 }
 if(labels.size>2)throw Error('El lot supera les dues veus.');
 const speakers=[...labels].map(([voice,speaker])=>({speaker,voice}));
 const body={model:'gemini-3.8-flash-tts',input:[{type:'user_input',content}],response_format:{type:'audio',mime_type:'audio/wav',sample_rate:24000},generation_config:{speech_config:speakers.length===1?[{voice:speakers[0].voice}]:{speakers}}};
 if(batch.execution&&batch.execution!=='background-v1')throw Error('Transport de síntesi desconegut.');
 if(batch.execution==='background-v1')body.background=true;
 if(speakers.length===1)for(const item of content)delete item.annotations[0].speaker;
 const estimatedInputTokens=Math.ceil(JSON.stringify(body).length/3);
 if(estimatedInputTokens>8192)throw Error('Estimació conservadora d’entrada superior a 8.192 tokens; dividir el lot.');
 return {body,blocks,voices:speakers,requestHash:sha(JSON.stringify(body)),estimatedInputTokens,estimate:estimateSynthesis(body)};
}
async function main(){
 const id=process.argv.find(a=>a.startsWith('--only='))?.slice(7).toUpperCase();
 const file=path.join(root,'content/synthesis-batches.json'),catalog=await readJSON(file,null),batch=catalog?.batches.find(b=>b.id===id);if(!batch)throw Error('Indica --only=LXX.');
 if(batch.state==='received'){console.log(JSON.stringify({batch:id,state:'received',receipt:batch.receipt,newRequests:0}));if(process.argv.includes('--generate'))throw Error('Lot ja rebut: no repetir.');return;}
 if(process.argv.includes('--generate')&&batch.speechTextFormat!=='plain-v1')throw Error('Els nous enviaments requereixen text pla, sense marques literals de pausa. Cap petició enviada.');
 const {activities}=await import('../catalogue.js'),plans=await readJSON(path.join(root,'content/production-plans.json'),{}),repairs=await readJSON(path.join(root,'content/audio-repairs.json'),{});
 const built=await buildBatch(activities,plans,repairs,batch);
 const folder=path.join(work,'mixed-batches',id.toLowerCase()+'-'+built.requestHash.slice(0,12));
 console.log(JSON.stringify({batch:id,requestHash:built.requestHash,estimatedSeconds:built.estimate.seconds,estimatedInputTokens:built.estimatedInputTokens,voices:built.voices,blocks:built.blocks.map(b=>b.id),folder}));
 if(process.argv.includes('--freeze')){
  assertSynthesisWindow(built.body,batch.windowException);if(batch.state&&batch.state!=='planned'&&batch.approvedRequestHash!==built.requestHash)throw Error('Lot ja congelat amb una altra empremta.');
  Object.assign(batch,{state:'authorized',approvedAt:new Date().toISOString(),approvedRequestHash:built.requestHash,estimatedSeconds:built.estimate.seconds,estimatedInputTokens:built.estimatedInputTokens,authorization:batch.authorization??'El docent autoritza processar els lots compatibles d’un en un, comprovant cada retorn. Només guions i correccions ja validats.'});
  await fs.writeFile(file,JSON.stringify(catalog,null,2)+'\n');
 }
 if(!process.argv.includes('--generate'))return;
 const resume=process.argv.includes('--resume-background');
 if(!process.argv.includes('--max-requests=1'))throw Error('Cal limitar a una única petició.');
 if(batch.state!=='authorized'||batch.approvedRequestHash!==built.requestHash)throw Error('Cal congelar el lot exacte abans d’enviar.');
 assertSynthesisWindow(built.body,batch.windowException);if(!resume){assertQuota(await readJSON(path.join(work,'last-api-error.json'),null));assertDailyRoom(await readJSON(path.join(work,'request-log.json'),[]));}
 const disk=await fs.statfs(work);if(disk.bavail*disk.bsize<512*1024*1024)throw Error('Menys de 512 MB lliures: alliberar espai abans de reservar quota o sintetitzar. Cap petició enviada.');
 await fs.mkdir(folder,{recursive:true});
 const raw=path.join(folder,'raw.wav'),attemptFile=path.join(folder,'attempt.json'),previous=await readJSON(attemptFile,null);
 if(resume){const server=await readJSON(path.join(folder,'interaction.json'),null);if(!previous||!built.body.background||!server?.id||server.requestHash!==built.requestHash)throw Error('No hi ha cap interacció identificada per recuperar sense repetir. Cap petició enviada.');}
 if(previous){const bytes=await fs.readFile(raw).catch(()=>null);if(previous.state==='raw-received'&&bytes&&sha(bytes)===previous.rawSha256){checkWave(bytes);console.log('Presa conservada; zero peticions noves.');return;}if(!resume)throw Error('Intent previ incert o ja processat: revisar abans de repetir.');}
 const index=await readJSON(path.join(work,'mixed-batches','takes.json'),{});if(built.blocks.some(b=>index[b.id]))throw Error('El lot conté una presa ja rebuda; replanificar per no duplicar-la.');
 const lock=path.join(work,'production.lock'),handle=await fs.open(lock,'wx'),attempt=resume?{...previous,retrievedAt:new Date().toISOString(),retrievals:(previous.retrievals??0)+1}:{batch:id,requestHash:built.requestHash,state:'prepared',startedAt:new Date().toISOString(),maxRequests:1};
 try{
  await handle.writeFile(JSON.stringify({pid:process.pid,batch:id,startedAt:attempt.startedAt}));
  await fs.writeFile(path.join(folder,'request.json'),JSON.stringify(built.body,null,2));await fs.writeFile(path.join(folder,'blocks.json'),JSON.stringify(built.blocks,null,2));
  await fs.writeFile(attemptFile,JSON.stringify(attempt,null,2));
  if(!resume)await reserveRequest(work,{code:id,purpose:'mixed-approved-batch',hash:built.requestHash,model:built.body.model},built.body,{minimumIntervalMs:65000,windowException:batch.windowException});
  attempt.state='in-flight';await fs.writeFile(attemptFile,JSON.stringify(attempt,null,2));
  const audio=await require('./generate-prototypes.cjs').geminiAudio(built.body,path.join(folder,'usage.json'),{timeoutMs:1200000,responseFile:path.join(folder,'response.json'),windowException:batch.windowException});
  checkWave(audio);await fs.writeFile(raw+'.part',audio);await fs.rename(raw+'.part',raw);Object.assign(attempt,{state:'raw-received',completedAt:new Date().toISOString(),rawSha256:sha(audio)});
  const response=await fs.readFile(path.join(folder,'response.json')),gzip=await require('node:util').promisify(require('node:zlib').gzip)(response);if(sha(await require('node:util').promisify(require('node:zlib').gunzip)(gzip))!==sha(response))throw Error('Còpia comprimida no íntegra.');await fs.writeFile(path.join(folder,'response.json.gz'),gzip);await fs.unlink(path.join(folder,'response.json'));attempt.responseSha256=sha(response);attempt.responseFile='response.json.gz';
  console.log(JSON.stringify({batch:id,state:attempt.state,bytes:audio.length,folder}));
 }catch(error){attempt.state='failed-or-uncertain';attempt.error=error.message;throw error;}
 finally{await fs.writeFile(attemptFile,JSON.stringify(attempt,null,2));await handle.close();await fs.unlink(lock);}
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={buildBatch};
