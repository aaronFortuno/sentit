'use strict';
// Read-only tests: never contacts a provider or reserves a request.
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {buildBatch}=require('./synthesis-batch.cjs'),{packedProposalRequests}=require('./proposal-plan.cjs'),{assertSynthesisWindow}=require('./audio-batch-policy.cjs');
const sha=v=>createHash('sha256').update(v).digest('hex');
(async()=>{
 const root=path.resolve(__dirname,'..'),{activities}=await import('../catalogue.js'),plans=JSON.parse(await fs.readFile(path.join(root,'content/production-plans.json'))),repairs=JSON.parse(await fs.readFile(path.join(root,'content/audio-repairs.json'))),extra=JSON.parse(await fs.readFile(path.join(root,'content/synthesis-extras.json'))).extras[0];
 const logFile=path.resolve(root,'../output/sentit-primera-tanda/request-log.json'),log=await fs.readFile(logFile),entry=code=>activities.find(a=>a.code===code);
 const whole=code=>({code,take:entry(code).generationPlan.takes[0].id,sourceRequestHash:sha(JSON.stringify(packedProposalRequests(entry(code))[0]))});
 const batch={speechTextFormat:'plain-v1',execution:'background-v1',castPolicy:{kind:'anchor-with-guests-v1',speaker:'Mar',voice:'Erinome',guestVoice:'Callirrhoe'},blocks:[...['S055','S056','S083','S084'].map(whole),{extra:extra.id,sourceRequestHash:sha(JSON.stringify(extra))}]};
 const built=await buildBatch(activities,plans,repairs,batch),normalize=t=>t.replace(/\s+/gu,' ').trim();
 const expected=[...['S055','S056','S083','S084'].flatMap(c=>[entry(c).introduction,...entry(c).transcript.filter(p=>p.speaker).map(p=>p.text)]),extra.canonicalBlock.text].join(' ');
 assert.equal(normalize(built.body.input[0].content.map(p=>p.text).join(' ')),normalize(expected));
 assert.deepEqual(built.voices.map(v=>v.voice),['Erinome','Callirrhoe']);assertSynthesisWindow(built.body);assert(built.estimatedInputTokens<8192);
 assert.equal(built.blocks.at(-1).id,'MM-PILOT-001');assert.equal(built.blocks.at(-1).items[0].sourceSpeaker,'Júlia');assert.equal(built.blocks.at(-1).items[0].voice,'Erinome');
 assert.match(built.body.input[0].content.at(-1).annotations[0].style,/reset the preceding newsreader delivery completely/);
 assert(!built.body.input[0].content.some(p=>/[<>|]/u.test(p.text)));assert(!expected.includes('El paper per al regal.'));
 const early=structuredClone(batch);early.blocks.splice(1,0,early.blocks.pop());await assert.rejects(buildBatch(activities,plans,repairs,early),/últim tall/);
 const changed=structuredClone(batch);changed.blocks.at(-1).sourceRequestHash='changed';await assert.rejects(buildBatch(activities,plans,repairs,changed),/Empremta/);
 const third=structuredClone(batch);third.blocks.splice(-1,0,whole('S085'));await assert.rejects(buildBatch(activities,plans,repairs,third),/Convidat.*incompatible/);
 const reserved=structuredClone(batch);reserved.castPolicy.guestVoice='Leda';await assert.rejects(buildBatch(activities,plans,repairs,reserved),/timbre recurrent/);
 const unapproved=structuredClone(plans);unapproved.S084.status='awaiting-validation';await assert.rejects(buildBatch(activities,unapproved,repairs,batch),/validar amb el docent/);
 const strict=structuredClone(batch);delete strict.castPolicy;await assert.rejects(buildBatch(activities,plans,repairs,strict),/mateix repartiment/);
 const duplicate=structuredClone(batch);duplicate.blocks.push(duplicate.blocks.at(-1));await assert.rejects(buildBatch(activities,plans,repairs,duplicate),/duplicats/);
 assert((await fs.readFile(logFile)).equals(log));console.log(JSON.stringify({pass:true,seconds:built.estimate.seconds,inputTokens:built.estimatedInputTokens,wholeReadings:4,pilotLast:true,newRequests:0}));
})().catch(e=>{console.error(e);process.exitCode=1;});
