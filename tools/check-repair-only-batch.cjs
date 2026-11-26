'use strict';
// Offline only. Produces exact short-batch candidates, not window exceptions.
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {buildBatch}=require('./synthesis-batch.cjs'),{repairRequest}=require('./audio-repairs.cjs'),{selectedRepair}=require('./batch-repair-source.cjs');
const sha=x=>createHash('sha256').update(x).digest('hex');
(async()=>{
 const {activities}=await import('../catalogue.js'),plans=require('../content/production-plans.json'),repairs=require('../content/audio-repairs.json');
 const make=(code,part,retry)=>{const ref={code,part,...(retry?{retry}:{})},entry=activities.find(e=>e.code===code),selected=selectedRepair(entry,repairs[code],ref,repairRequest(entry,repairs[code]));return {...ref,sourceRequestHash:sha(JSON.stringify(selected.original))};};
 const batches=[{id:'L43',state:'planned',speechTextFormat:'plain-v1',styleFormat:'compact-v1',execution:'background-v1',castPolicy:{kind:'repair-only-v1'},blocks:[make('S081','final','S081-final-r4'),make('S107','sortida','S107-sortida-r2'),make('S088','hola'),make('S109','temps'),make('S109','final')]},{id:'L44',state:'planned',speechTextFormat:'plain-v1',styleFormat:'compact-v1',execution:'background-v1',castPolicy:{kind:'repair-only-v1'},blocks:[make('S095','mida'),make('S095','recollida'),make('S102','sentit')]}],candidates=[];
 for(const batch of batches){
  const built=await buildBatch(activities,plans,repairs,batch);
  assert(built.voices.length<=2);assert(!built.body.input[0].content.some(i=>/[<>|]/u.test(i.text)));
  const normalize=t=>t.replace(/\s+/gu,' ').trim(),expected=batch.blocks.map(b=>repairs[b.code].repairs.find(r=>r.part===b.part).text).join(' ');
  assert.equal(normalize(built.body.input[0].content.map(i=>i.text).join(' ')),normalize(expected));
  const strict=structuredClone(batch);delete strict.castPolicy;await assert.rejects(buildBatch(activities,plans,repairs,strict),/lectura completa/);
  const changed=structuredClone(batch);changed.blocks[0].sourceRequestHash='changed';await assert.rejects(buildBatch(activities,plans,repairs,changed),/empremta/);
  const unapproved=structuredClone(repairs);unapproved[batch.blocks[0].code].status='pending';await assert.rejects(buildBatch(activities,plans,unapproved,batch),/autoritzada/);
  const tagged=structuredClone(batch);delete tagged.speechTextFormat;delete tagged.styleFormat;await assert.rejects(buildBatch(activities,plans,repairs,tagged),/repair-only/);
  const whole=structuredClone(batch);whole.blocks[0].take='S070-T01';await assert.rejects(buildBatch(activities,plans,repairs,whole),/repair-only/);
  const extra=structuredClone(batch);extra.blocks.push({extra:'MM-PILOT-001'});await assert.rejects(buildBatch(activities,plans,repairs,extra),/repair-only/);
  candidates.push({status:'offline-short-candidate-needs-exact-window-exception',batch,requestHash:built.requestHash,seconds:built.estimate.seconds,estimatedInputTokens:built.estimatedInputTokens,voices:built.voices,blocks:built.blocks,request:built.body,newRequests:0});
 }
 const three=structuredClone(batches[0]);three.blocks.push(batches[1].blocks[0]);await assert.rejects(buildBatch(activities,plans,repairs,three),/dues veus/);
 const file=path.resolve(__dirname,'../../tmp/sentit-qa/repair-only-candidates-20261126.json');await fs.writeFile(file,JSON.stringify(candidates,null,2)+'\n');console.log(JSON.stringify({pass:true,candidates:candidates.map(c=>({id:c.batch.id,hash:c.requestHash,seconds:c.seconds,voices:c.voices,blocks:c.blocks.map(b=>b.id)})),file,newRequests:0}));
})().catch(error=>{console.error(error);process.exitCode=1;});
