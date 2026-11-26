'use strict';
// Canonical adjacent paragraphs form one take; no provider calls or file edits.
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
const {repairRequest}=require('./audio-repairs.cjs'),{buildBatch}=require('./synthesis-batch.cjs');
(async()=>{
 const {activities}=await import('../catalogue.js'),{productionProgress}=await import('../content/production-progress.js'),{repairQueue}=await import('./repair-queue.mjs');
 const root=path.resolve(__dirname,'..'),load=file=>fs.readFile(path.join(root,file),'utf8').then(JSON.parse),[plans,repairs,batches]=await Promise.all(['content/production-plans.json','content/audio-repairs.json','content/synthesis-batches.json'].map(load));
 const entry=activities.find(e=>e.code==='S017'),plan=repairs.S017,first=plan.repairs[0],ids=['coordinacio','retorn'];assert.deepEqual(first.sourceParts,ids);
 const expected=ids.map(id=>entry.transcript.find(p=>p.id===id).text).join('\n\n'),body=repairRequest(entry,plan);
 assert.equal(body.input[0].content.length,1);assert.equal(body.input[0].content[0].text,expected);assert.deepEqual(body.generation_config.speech_config,[{voice:'Aoede'}]);assert(!/[<>|]/u.test(expected));
 const mutate=patch=>({...plan,repairs:[{...first,...patch}]});
 assert.throws(()=>repairRequest(entry,mutate({sourceParts:['coordinacio','projecte']})),/consecutius/);
 assert.throws(()=>repairRequest(entry,mutate({sourceParts:['coordinacio','coordinacio']})),/no vàlid/);
 assert.throws(()=>repairRequest(entry,mutate({part:'retorn'})),/no vàlid/);
 assert.throws(()=>repairRequest(entry,mutate({text:expected+' Paraula afegida.'})),/text complet/);
 assert.throws(()=>repairRequest(entry,mutate({sourceParts:['sortida','coordinacio'],part:'sortida'})),/mateixa veu/);
 const awaiting={...productionProgress,'ca-S017':{...productionProgress['ca-S017'],receivedRepairs:[]}};
 const historicRepairs={...repairs,S017:{...plan,status:'approved-for-correction'}};
 const queue=repairQueue(activities,awaiting,historicRepairs);assert.equal(queue.queued.filter(r=>r.code==='S017').length,1,'No duplicate second paragraph from feedback');
 const progress={...productionProgress,'ca-S017':{...productionProgress['ca-S017'],receivedRepairs:[{part:'coordinacio',sourceParts:ids,status:'received-awaiting-listening',candidateFile:'test.mp3'}]}};
 assert.equal(repairQueue(activities,progress,historicRepairs).queued.filter(r=>r.code==='S017').length,0,'Both source paragraphs are covered by the received take');
 if(plan.status==='closed-original-accepted')assert(!repairQueue(activities,productionProgress,repairs).queued.some(r=>r.code==='S017'),'Teacher-retained original must never re-enter the queue');
 const batch=batches.batches.find(b=>b.id==='L40'),saved=batch.blocks.filter(b=>b.take).map(b=>{const entry=activities.find(e=>e.code===b.code);return{entry,audio:entry.audio};});
 try{for(const{entry}of saved)entry.audio=null;if(plan.status==='closed-original-accepted')await assert.rejects(buildBatch(activities,plans,repairs,batch),/no autoritzada/);const built=await buildBatch(activities,plans,historicRepairs,batch),block=built.blocks.find(b=>b.code==='S017');assert.equal(block.items.length,1);assert.equal(block.items[0].text,expected);assert.equal(block.items[0].voice,'Aoede');assert.equal(built.voices.length,2);}finally{for(const{entry,audio}of saved)entry.audio=audio;}
 console.log('PASS · S017 consecutive canonical paragraphs in one Aoede take; edits, reordering and mixed speakers rejected; no duplicate queue or new request.');
})().catch(e=>{console.error(e.stack);process.exitCode=1});
