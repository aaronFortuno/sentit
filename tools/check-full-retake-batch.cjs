'use strict';
// Offline integration and guard tests. Only the requested candidate/report under
// ../tmp/sentit-qa are written; no provider, quota, receipt or state change.
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {buildBatch}=require('./synthesis-batch.cjs'),{productionSpec,packedProposalRequests}=require('./proposal-plan.cjs'),{assertSynthesisWindow}=require('./audio-batch-policy.cjs');
const {assertFullRetake,validateRetakeBlocks,assertFlexibleNarratorCast,receiptTakeIds,assertRetakeReceipt,verifyRetakeReceipt}=require('./full-voice-retake.cjs');
const {selectPreviewTakes,assertPreviewDestination,previewHistory}=require('./prepare-batch-voice-previews.cjs');
const root=path.resolve(__dirname,'..'),sha=x=>createHash('sha256').update(x).digest('hex'),read=file=>fs.readFile(path.resolve(root,file),'utf8').then(JSON.parse);
(async()=>{
 const {activities}=await import('../catalogue.js'),plans=await read('content/production-plans.json'),repairs=await read('content/audio-repairs.json'),retakes=await read('content/full-voice-retakes.json'),index=await read('../output/sentit-primera-tanda/mixed-batches/takes.json');
 const protectedFiles=['content/production-progress.js','content/production-plans.json','content/full-voice-retakes.json','content/synthesis-batches.json','assets/audio/batch-voice-previews.json','../output/sentit-primera-tanda/mixed-batches/takes.json','../output/sentit-primera-tanda/request-log.json'];
 const before=await Promise.all(protectedFiles.map(file=>fs.readFile(path.resolve(root,file))));
 const entry=code=>activities.find(e=>e.code===code),retake=retakes.S070,source=index[retake.sourceTakeId];
 const whole=code=>({code,take:code+'-T01',sourceRequestHash:sha(JSON.stringify(packedProposalRequests(entry(code))[0]))});
 const batch={id:'L41',state:'planned',speechTextFormat:'plain-v1',styleFormat:'compact-v1',execution:'background-v1',castPolicy:{kind:'anchor-with-flexible-narrator-v1',speaker:'Ferran',voice:'Algenib',narratorRole:'Narrador',allowSharedPhysicalVoice:true},note:'Candidat offline. Una presa completa de Ferran i tres narracions anònimes; Algenib compartida només segons la política explícita i les seleccions ja validades. Cap enviament, congelació, muntatge ni aprovació d’audició.',blocks:[{code:'S070',fullRetake:retake.takeId,sourceRequestHash:retake.approvedRequestHash},...['S128','S129','S130'].map(whole)]};
 if(index[retake.takeId]){
  // A received take is verified from its immutable frozen request and cuts.
  // Never clear the index or bypass duplicate guards to reconstruct a request.
  const received=index[retake.takeId],catalogue=await read('content/synthesis-batches.json'),frozen=catalogue.batches.find(b=>b.id===received.batch);
  assert.equal(frozen?.state,'received');assert.equal(frozen.approvedRequestHash,received.batchRequestHash);
  const folder=path.resolve(root,'../output/sentit-primera-tanda/mixed-batches',frozen.id.toLowerCase()+'-'+frozen.approvedRequestHash.slice(0,12)),load=file=>fs.readFile(path.join(folder,file),'utf8').then(JSON.parse);
  const request=await load('request.json'),blocks=await load('blocks.json'),split=await load('split.json');
  assert.equal(sha(JSON.stringify(request)),frozen.approvedRequestHash);assert.equal(split.requestHash,frozen.approvedRequestHash);assert.equal(split.rawSha256,received.rawBatchSha256);assertSynthesisWindow(request);
  assert.deepEqual(blocks.map(b=>b.id),['S070-T02','S128-T01','S129-T01','S130-T01']);
  const normalize=t=>t.replace(/\s+/gu,' ').trim(),expected=blocks.flatMap(b=>[entry(b.code).introduction,...entry(b.code).transcript.filter(p=>p.speaker).map(p=>p.text)]).join(' ');
  assert.equal(normalize(request.input[0].content.map(i=>i.text).join(' ')),normalize(expected));assert(!request.input[0].content.some(i=>/[<>|]/u.test(i.text)));
  await validateRetakeBlocks(activities,blocks);
  const block=blocks.find(b=>b.id===retake.takeId),cut=split.cuts.find(c=>c.id===retake.takeId);
  await verifyRetakeReceipt(block,cut,received);assert.deepEqual(cut.parts,retake.parts);assert.deepEqual(receiptTakeIds(entry('S070'),frozen.blocks),['S070-T02']);
  const {waveParts}=require('./gemini-result.cjs'),raw=await fs.readFile(path.join(folder,'raw.wav'));
  assert.equal(sha(raw),split.rawSha256);
  const pcmCuts=[];for(const take of split.cuts){const bytes=await fs.readFile(take.file);assert.equal(sha(bytes),take.sha256);pcmCuts.push(waveParts(bytes).pcm);}
  assert(Buffer.concat(pcmCuts).equals(waveParts(raw).pcm),'Frozen cuts preserve all original PCM samples');
  for(const name of ['intro','body'])assert.equal(sha(await fs.readFile(cut[name].file)),cut[name].sha256);
  assert(Buffer.concat([waveParts(await fs.readFile(cut.intro.file)).pcm,waveParts(await fs.readFile(cut.body.file)).pcm]).equals(waveParts(await fs.readFile(cut.file)).pcm));
  await assert.rejects(buildBatch(activities,plans,repairs,frozen),/ja rebuda/,'A received full retake can never be synthesized again');
  const tampered=structuredClone(blocks);tampered[0].retakeAuthorization.sourceTakeSha256='changed';await assert.rejects(validateRetakeBlocks(activities,tampered),/autoritzat/);
  await assert.rejects(verifyRetakeReceipt(block,cut,{...received,sha256:'changed'}),/Recepció/);
  const previews=await read('assets/audio/batch-voice-previews.json'),preview=previews.find(r=>r.code==='S070'),selected=selectPreviewTakes(index,frozen.id);
  assert.equal(selected.find(t=>t.code==='S070').id,'S070-T02');assert.equal(preview.sourceTakeId,'S070-T02');assert.equal(preview.sourceTakeSha256,received.sha256);assert(preview.revision>=2);
  assert.equal(sha(await fs.readFile(path.join(root,preview.file))),preview.sha256);
  assert.equal(preview.replaces.file,'assets/audio/s070-voices-review-v1.mp3');assert.equal(preview.replaces.sourceTakeSha256,source.sha256);
  assert.equal(sha(await fs.readFile(path.join(root,preview.replaces.file))),preview.replaces.sha256);assert.equal(sha(await fs.readFile(source.file)),retake.sourceTakeSha256);
  assert.throws(()=>assertPreviewDestination(received,{...preview.replaces,revision:1},1,preview.replaces.file,true),/anterior/);
  assert.deepEqual(previewHistory(preview,preview.file),{replaces:preview.replaces});
  for(let i=0;i<protectedFiles.length;i++)assert((await fs.readFile(path.resolve(root,protectedFiles[i]))).equals(before[i]),protectedFiles[i]+' changed');
  console.log(JSON.stringify({pass:true,phase:'post-receipt',batch:frozen.id,requestHash:frozen.approvedRequestHash,takeId:received.id,duplicateSynthesisRejected:true,pcmPreserved:true,previewRevision:preview.revision,originalPreviewPreserved:true,protectedFilesUnchanged:protectedFiles.length,newRequests:0}));
  return;
 }
 const built=await buildBatch(activities,plans,repairs,batch);
 assertSynthesisWindow(built.body);assert.equal(built.estimate.seconds,388);assert.equal(built.estimatedInputTokens<=8192,true);
 assert.deepEqual(built.blocks.map(b=>b.id),['S070-T02','S128-T01','S129-T01','S130-T01']);assert.deepEqual(built.voices.map(v=>v.voice),['Algenib']);
 const expected=batch.blocks.flatMap(b=>[entry(b.code).introduction,...entry(b.code).transcript.filter(p=>p.speaker).map(p=>p.text)]).join(' '),normalize=t=>t.replace(/\s+/gu,' ').trim();
 assert.equal(normalize(built.body.input[0].content.map(i=>i.text).join(' ')),normalize(expected));
 assert(!built.body.input[0].content.some(i=>/[<>|]/u.test(i.text)));
 assert.match(built.body.input[0].content[0].annotations[0].style,/asseia/,'Retake pronunciation direction survives batching');
 for(const b of built.blocks)assert.match(built.body.input[0].content[b.firstItem].annotations[0].style,/anonymous narrator is separate/);
 assert.equal(built.blocks[0].take,'S070-T02');assert.equal(built.blocks[0].retakeAuthorization.sourceTakeId,'S070-T01');assert.equal(built.blocks[0].retakeAuthorization.montageAllowed,false);
 await validateRetakeBlocks(activities,built.blocks);
 const spec=productionSpec(entry('S070')),ref=batch.blocks[0];
 for(const mutate of [p=>p.status='pending',p=>delete p.approvalSource,p=>p.montageAllowed=true,p=>p.preservesOriginals=false,p=>p.takeId='S070-T01',p=>p.parts.pop(),p=>p.voices.Ferran='Charon',p=>p.request.input[0].content[0].text+=' Una frase nova.']){const altered=structuredClone(retake);mutate(altered);assert.throws(()=>assertFullRetake(entry('S070'),spec,ref,altered,source));}
 const changedText=structuredClone(retake);changedText.request.input[0].content[0].text+=' Una frase nova.';changedText.approvedRequestHash=sha(JSON.stringify(changedText.request));assert.throws(()=>assertFullRetake(entry('S070'),spec,{...ref,sourceRequestHash:changedText.approvedRequestHash},changedText,source),/canònic/,'A recalculated request hash cannot approve changed spoken text');
 assert.throws(()=>assertFullRetake(entry('S070'),spec,ref,retake,{...source,sha256:'changed'}),/origen/);
 assert.throws(()=>assertFullRetake(entry('S070'),spec,ref,retake,{...source,batchRequestHash:'changed'}),/origen/);
 assert.throws(()=>assertFullRetake({...entry('S070'),audio:'published.mp3'},spec,ref,retake,source),/publicada/);
 const tampered=structuredClone(built.blocks);tampered[0].retakeAuthorization.sourceTakeSha256='changed';await assert.rejects(validateRetakeBlocks(activities,tampered),/autoritzat/);
 const tamperedSpeech=structuredClone(built.blocks);tamperedSpeech[0].items[0].text+=' Text nou.';await assert.rejects(validateRetakeBlocks(activities,tamperedSpeech),/autoritzat/);
 const cut={id:'S070-T02',code:'S070',fullRetake:'S070-T02',sha256:'new-cut',batchRequestHash:built.requestHash,sourceRequestHash:ref.sourceRequestHash,retakeAuthorization:built.blocks[0].retakeAuthorization};
 assertRetakeReceipt(built.blocks[0],cut,{...cut});assert.throws(()=>assertRetakeReceipt(built.blocks[0],cut,{...cut,id:'S070-T01'}),/Recepció/);assert.throws(()=>assertRetakeReceipt(built.blocks[0],cut,{...cut,sha256:'changed'}),/Recepció/);
 const pcmFixture={...cut,sha256:source.sha256,file:source.file};await verifyRetakeReceipt(built.blocks[0],pcmFixture,{...pcmFixture});const alteredPcm={...pcmFixture,sha256:'incorrect-file-sha'};await assert.rejects(verifyRetakeReceipt(built.blocks[0],alteredPcm,{...alteredPcm}),/SHA del tall/);
 const unknown=structuredClone(batch);unknown.blocks[0].fullRetake='S070-T03';await assert.rejects(buildBatch(activities,plans,repairs,unknown),/identificador/);
 const implicit=structuredClone(batch);implicit.blocks[0].take=implicit.blocks[0].fullRetake;delete implicit.blocks[0].fullRetake;await assert.rejects(buildBatch(activities,plans,repairs,implicit),/desconeguda/);
 const strict=structuredClone(batch);delete strict.castPolicy;await assert.rejects(buildBatch(activities,plans,repairs,strict),/mateix repartiment/);
 const noPermission=structuredClone(batch);noPermission.castPolicy.allowSharedPhysicalVoice=false;await assert.rejects(buildBatch(activities,plans,repairs,noPermission),/Política explícita/);
 const noAnchor=structuredClone(batch);noAnchor.blocks.shift();await assert.rejects(buildBatch(activities,plans,repairs,noAnchor),/recurrent de referència/);
 const role=structuredClone(entry('S128'));delete role.production.voicePolicy;assert.throws(()=>assertFlexibleNarratorCast(role,productionSpec(role),plans.S128,batch.castPolicy),/política flexible/);
 const noSelection=structuredClone(plans);delete noSelection.S128.voiceSelection;await assert.rejects(buildBatch(activities,noSelection,repairs,batch),/validar amb el docent/);
 const selected=selectPreviewTakes({'S070-T01':{id:'S070-T01',code:'S070',batch:'L22'},'S070-T02':{id:'S070-T02',code:'S070',batch:'L41',sha256:'new'},'S128-T01':{id:'S128-T01',code:'S128',batch:'L41'},repair:{id:'S070-esperar',code:'S070',batch:'L41'}},'L41');
 assert.deepEqual(selected.map(t=>t.id),['S070-T02','S128-T01']);assert.deepEqual(receiptTakeIds(entry('S070'),batch.blocks),['S070-T02']);assert.deepEqual(receiptTakeIds(entry('S128'),batch.blocks),['S128-T01']);
 const old={file:'assets/audio/s070-voices-review-v1.mp3',revision:1,sourceTakeId:'S070-T01',sourceTakeSha256:'old',sha256:'old-preview'},take=selected[0],v2='assets/audio/s070-voices-review-v2.mp3';
 assert.throws(()=>assertPreviewDestination(take,old,1,old.file,true),/anterior/);assertPreviewDestination(take,old,2,v2,false);assert.throws(()=>assertPreviewDestination(take,old,2,v2,true),/conservat/);
 const history=previewHistory(old,v2);assert.equal(history.replaces.file,old.file);assert.equal(history.replaces.sha256,old.sha256);assert.deepEqual(previewHistory({...old,file:v2,...history},v2),history,'Repeating a preview keeps its v1 history');
 for(let i=0;i<protectedFiles.length;i++)assert((await fs.readFile(path.resolve(root,protectedFiles[i]))).equals(before[i]),protectedFiles[i]+' changed');
 const destination=path.resolve(root,'../tmp/sentit-qa');await fs.mkdir(destination,{recursive:true});
 const candidate={status:'offline-candidate-not-frozen',dispatchAuthorized:false,newRequests:0,batch,requestHash:built.requestHash,estimatedSeconds:built.estimate.seconds,estimatedInputTokens:built.estimatedInputTokens,voices:built.voices,blocks:built.blocks,request:built.body,previewAfterReceipt:'node tools/prepare-batch-voice-previews.cjs --only=L41 --revision=2',notes:'L41 és un identificador proposat, no reservat. Esperar la recepció i els talls verificats abans de crear previews; S070 v1 i la presa T01 es conserven. El docent valida després les veus.'};
 await fs.writeFile(path.join(destination,'full-retake-batch-candidate-20261126.json'),JSON.stringify(candidate,null,2)+'\n');
 console.log(JSON.stringify({pass:true,seconds:388,inputTokens:built.estimatedInputTokens,blocks:built.blocks.map(b=>b.id),requestHash:built.requestHash,newRequests:0,protectedFilesUnchanged:protectedFiles.length,candidate:'../tmp/sentit-qa/full-retake-batch-candidate-20261126.json'}));
})().catch(error=>{console.error(error);process.exitCode=1;});
