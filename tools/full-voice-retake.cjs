'use strict';
// Whole-recording replacements are explicit approved requests, never inferred
// from an unknown T02 or from the existence of a previous recording.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda'),sha=x=>createHash('sha256').update(x).digest('hex');
const normalize=text=>text.replace(/\s+/gu,' ').trim();
function assertFullRetake(entry,spec,ref,plan,source){
 const fail=message=>{throw Error(entry.code+': presa completa '+message);};
 if(entry.audio)fail('ja publicada; no repetir la síntesi.');
 if(ref.take||ref.part||ref.extra||ref.trial||ref.retry||!ref.fullRetake)fail('ha de tenir una referència fullRetake exclusiva.');
 if(!plan||plan.activity!==`${entry.language}-${entry.code}`||plan.scope!=='whole-recording'||plan.status!=='approved-awaiting-compatible-batch'||!/^\d{4}-\d{2}-\d{2}/u.test(plan.approvedAt??'')||!plan.approvalSource?.trim()||plan.preservesOriginals!==true||plan.montageAllowed!==false)fail('sense aprovació explícita o preservació dels originals.');
 if(plan.takeId!==ref.fullRetake||!new RegExp('^'+entry.code+'-T\\d+$','u').test(plan.takeId)||plan.takeId===plan.sourceTakeId||!entry.generationPlan.takes.some(t=>t.id===plan.sourceTakeId))fail('amb identificador de presa no vàlid.');
 if(sha(JSON.stringify(plan.request))!==plan.approvedRequestHash||ref.sourceRequestHash!==plan.approvedRequestHash)fail('amb empremta de petició diferent.');
 if(JSON.stringify(plan.voices)!==JSON.stringify(spec.voices))fail('amb veus diferents de les validades.');
 const parts=['introduction',...entry.transcript.filter(p=>p.speaker).map(p=>p.id)];
 if(JSON.stringify(plan.parts)!==JSON.stringify(parts))fail('que no cobreix el guió canònic complet.');
 const request=plan.request,items=request?.input?.[0]?.content,speech=request?.generation_config?.speech_config,voices=Array.isArray(speech)?speech:speech?.speakers;
 if(request?.model!=='gemini-3.8-flash-tts'||request.input.length!==1||request.input[0].type!=='user_input'||!Array.isArray(items)||!items.length||!Array.isArray(voices)||!voices.length||request.response_format?.mime_type!=='audio/wav'||request.response_format?.sample_rate!==24000)fail('amb format de petició no vàlid.');
 const names=Object.keys(spec.voices),resolved=voices.map(v=>[v.speaker??(names.length===1?names[0]:null),v.voice]);
 if(resolved.length!==names.length||resolved.some(([name,voice])=>!name||spec.voices[name]!==voice)||new Set(resolved.map(([name])=>name)).size!==names.length)fail('amb assignació de veus no canònica.');
 const merge=turns=>{const grouped=[];for(const turn of turns){if(grouped.at(-1)?.speaker===turn.speaker)grouped.at(-1).text+=' '+normalize(turn.text);else grouped.push({speaker:turn.speaker,text:normalize(turn.text)});}return grouped;};
 const expected=merge([{speaker:spec.titleSpeaker,text:entry.introduction},...entry.transcript.filter(p=>p.speaker)]);
 const actual=merge(items.map(item=>{const annotations=item.annotations?.filter(a=>a.type==='speech_metadata');if(item.type!=='text'||typeof item.text!=='string'||/[<>|]/u.test(item.text)||annotations?.length!==1||!annotations[0].style?.trim())fail('amb parla o anotacions no vàlides.');return {speaker:annotations[0].speaker??(names.length===1?names[0]:null),text:item.text};}));
 if(JSON.stringify(actual)!==JSON.stringify(expected))fail('amb text o ordre de parlants diferent del guió canònic.');
 if(!source||source.id!==plan.sourceTakeId||source.code!==entry.code||source.sha256!==plan.sourceTakeSha256||source.batchRequestHash!==plan.sourceRequestHash||source.rawBatchSha256!==plan.sourceRawSha256||JSON.stringify(source.parts)!==JSON.stringify(parts))fail('amb origen canviat.');
 return {original:plan.request,sourceItems:items,parts,authorization:{approvedAt:plan.approvedAt,approvalSource:plan.approvalSource,approvedRequestHash:plan.approvedRequestHash,sourceTakeId:plan.sourceTakeId,sourceTakeSha256:plan.sourceTakeSha256,sourceRequestHash:plan.sourceRequestHash,sourceRawSha256:plan.sourceRawSha256,sourceEditorialFingerprint:plan.sourceEditorialFingerprint,preservesOriginals:true,montageAllowed:false}};
}
async function loadFullRetake(entry,spec,ref,{allowReceived=false}={}){
 const registry=JSON.parse(await fs.readFile(path.join(root,'content/full-voice-retakes.json'),'utf8')),index=JSON.parse(await fs.readFile(path.join(work,'mixed-batches/takes.json'),'utf8')),plan=registry[ref.code],source=index[plan?.sourceTakeId];
 const selected=assertFullRetake(entry,spec,ref,plan,source);
 const {editorialFingerprint}=await import('../editorial-review.js');
 if(plan.sourceEditorialFingerprint!==await editorialFingerprint(entry))throw Error(ref.code+': empremta editorial de la presa completa canviada.');
 if(sha(await fs.readFile(source.file))!==plan.sourceTakeSha256)throw Error(ref.code+': SHA de la presa original canviat.');
 if(!allowReceived&&index[plan.takeId])throw Error(ref.code+': presa completa ja rebuda; no repetir.');
 return selected;
}
async function validateRetakeBlocks(activities,blocks){
 for(const block of blocks.filter(b=>b.fullRetake)){
  const entry=activities.find(e=>e.code===block.code);
  if(!entry)throw Error('Activitat de presa completa desconeguda.');
  const spec=require('./proposal-plan.cjs').productionSpec(entry),selected=await loadFullRetake(entry,spec,{code:block.code,fullRetake:block.fullRetake,sourceRequestHash:block.sourceRequestHash},{allowReceived:true});
  const expected=selected.sourceItems.map(item=>({text:normalize(item.text),speaker:item.annotations[0].speaker??spec.titleSpeaker})),actual=block.items.map(item=>({text:normalize(item.text),speaker:item.sourceSpeaker}));
  if(block.id!==block.fullRetake||block.take!==block.fullRetake||JSON.stringify(block.parts)!==JSON.stringify(selected.parts)||JSON.stringify(block.retakeAuthorization)!==JSON.stringify(selected.authorization)||JSON.stringify(actual)!==JSON.stringify(expected))throw Error(block.code+': bloc de presa completa diferent de l’autoritzat.');
 }
}
function assertFlexibleNarratorPolicy(policy,characters){
 if(policy.kind!=='anchor-with-flexible-narrator-v1'||policy.allowSharedPhysicalVoice!==true||policy.narratorRole!=='Narrador'||!characters.some(c=>c.name===policy.speaker&&c.voice.id===policy.voice))throw Error('Política explícita de narrador flexible no vàlida.');
}
function assertFlexibleNarratorCast(entry,spec,plan,policy){
 const names=Object.keys(spec.voices);
 if(names.length!==1)throw Error('El narrador flexible requereix una sola veu física per peça.');
 if(names[0]===policy.speaker&&spec.voices[policy.speaker]===policy.voice)return;
 const declared=entry.production.voicePolicy,selection=plan.voiceSelection;
 if(names[0]!==policy.narratorRole||spec.voices[names[0]]!==policy.voice||declared?.status!=='candidate-not-frozen'||declared.role!==names[0]||declared.maxPhysicalVoices!==1||!declared.candidates?.includes(policy.voice)||selection?.speaker!==names[0]||selection.voice!==policy.voice||!selection.reason?.trim())throw Error('Narrador sense política flexible i selecció de veu validades.');
}
function receiptTakeIds(entry,blocks){
 const replacement=blocks.filter(b=>b.code===entry.code&&b.fullRetake);
 if(replacement.length>1)throw Error('Més d’una presa completa de substitució per activitat.');
 return replacement.length?[replacement[0].fullRetake]:entry.generationPlan.takes.map(t=>t.id);
}
function assertRetakeReceipt(block,cut,take){
 if(!cut||!take||cut.id!==block.fullRetake||take.id!==block.fullRetake||cut.fullRetake!==block.fullRetake||take.fullRetake!==block.fullRetake||cut.code!==block.code||take.code!==block.code||cut.sha256!==take.sha256||cut.batchRequestHash!==take.batchRequestHash||cut.sourceRequestHash!==block.sourceRequestHash||JSON.stringify(cut.retakeAuthorization)!==JSON.stringify(block.retakeAuthorization)||JSON.stringify(take.retakeAuthorization)!==JSON.stringify(block.retakeAuthorization))throw Error('Recepció de presa completa sense tall i origen autoritzats.');
}
async function verifyRetakeReceipt(block,cut,take){
 assertRetakeReceipt(block,cut,take);
 if(sha(await fs.readFile(take.file))!==take.sha256)throw Error('SHA del tall rebut de presa completa canviat.');
}
module.exports={assertFullRetake,loadFullRetake,validateRetakeBlocks,assertFlexibleNarratorPolicy,assertFlexibleNarratorCast,receiptTakeIds,assertRetakeReceipt,verifyRetakeReceipt};
