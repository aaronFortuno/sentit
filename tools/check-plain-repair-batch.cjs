'use strict';
// Planning only: prove that a compatible repair keeps its exact words/voice,
// and cannot bypass approvals, source identity or the full-batch requirement.
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {buildBatch}=require('./synthesis-batch.cjs'),{repairRequest}=require('./audio-repairs.cjs'),{packedProposalRequests}=require('./proposal-plan.cjs'),{assertSynthesisWindow}=require('./audio-batch-policy.cjs');
const sha=s=>createHash('sha256').update(s).digest('hex');
(async()=>{
 const root=path.resolve(__dirname,'..'),{activities}=await import('../catalogue.js'),plans=JSON.parse(await fs.readFile(path.join(root,'content/production-plans.json'))),repairs=JSON.parse(await fs.readFile(path.join(root,'content/audio-repairs.json')));
 const logFile=path.resolve(root,'../output/sentit-primera-tanda/request-log.json'),before=await fs.readFile(logFile);
 const entry=code=>activities.find(e=>e.code===code),whole=code=>({code,take:entry(code).generationPlan.takes[0].id,sourceRequestHash:sha(JSON.stringify(packedProposalRequests(entry(code))[0]))}),repair=(code,part)=>({code,part,sourceRequestHash:sha(JSON.stringify(repairRequest(entry(code),repairs[code])))});
 const fix=repair('S029','anunci'),batch={speechTextFormat:'plain-v1',execution:'background-v1',blocks:[...['S053','S054','S057'].map(whole),fix]};
 const built=await buildBatch(activities,plans,repairs,batch),texts=built.body.input[0].content.map(p=>p.text),normalize=s=>s.replace(/\s+/gu,' ').trim();
 const expected=[...['S053','S054','S057'].flatMap(c=>[entry(c).introduction,...entry(c).transcript.filter(p=>p.speaker).map(p=>p.text)]),repairs.S029.repairs[0].text].join(' ');
 assert.equal(normalize(texts.join(' ')),normalize(expected));assert(texts.every(s=>!/[<>|]/u.test(s)));assert.deepEqual(built.voices.map(v=>v.voice),['Erinome']);assertSynthesisWindow(built.body);
 const block=built.blocks.at(-1);assert.equal(block.id,'S029-anunci');assert.equal(block.items[0].sourceSpeaker,'Mar');assert.equal(block.items[0].voice,'Erinome');assert.equal(block.items[0].text,repairs.S029.repairs[0].text);
 assert(!built.body.input[0].content[block.firstItem].annotations[0].style.includes('Read this title once'));
 await assert.rejects(buildBatch(activities,plans,repairs,{...batch,blocks:[fix]}),/almenys una lectura completa/);
 await assert.rejects(buildBatch(activities,plans,repairs,{...batch,blocks:[...batch.blocks,repair('S010','alternativa')]}),/mateix repartiment/);
 await assert.rejects(buildBatch(activities,plans,{...repairs,S029:{...repairs.S029,status:'awaiting-validation'}},batch),/no autoritzada/);
 await assert.rejects(buildBatch(activities,plans,repairs,{...batch,blocks:[...batch.blocks.slice(0,-1),{...fix,sourceRequestHash:'changed'}]}),/empremta/);
 const mobile=repair('S082','mòbil'),voiceBatch={...batch,blocks:[...['S078','S079','S080'].map(whole),mobile]},voiceBuilt=await buildBatch(activities,plans,repairs,voiceBatch);
 assertSynthesisWindow(voiceBuilt.body);assert.deepEqual(voiceBuilt.voices.map(v=>v.voice).sort(),['Algieba','Puck']);
 assert.equal(voiceBuilt.blocks.at(-1).items[0].sourceSpeaker,'Biel');assert.equal(voiceBuilt.blocks.at(-1).items[0].voice,'Puck');assert.equal(voiceBuilt.blocks.at(-1).items[0].text,repairs.S082.repairs[0].text);
 await assert.rejects(buildBatch(activities,plans,{...repairs,S082:{...repairs.S082,sourceTakeSha256:'changed'}},voiceBatch),/Presa de veu original/);
 await assert.rejects(buildBatch(activities,plans,{...repairs,S082:{...repairs.S082,sourceTakeId:'S081-T01'}},voiceBatch),/Presa de veu original/);
 assert((await fs.readFile(logFile)).equals(before),'Planning never consumes or reserves quota');
 console.log(JSON.stringify({pass:true,words:built.estimate.words,seconds:built.estimate.seconds,tokens:built.estimatedInputTokens,repairVoice:'Mar/Erinome',newRequests:0}));
})().catch(e=>{console.error(e);process.exitCode=1;});
