'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
const {trialRequests}=require('./pronunciation-trials.cjs');
(async()=>{
 const root=path.resolve(__dirname,'..'),log=path.resolve(root,'../output/sentit-primera-tanda/request-log.json'),before=await fs.readFile(log,'utf8'),{activities}=await import('../catalogue.js'),{productionProgress}=await import('../content/production-progress.js'),{pendingRepairClips}=await import('../repair-preview.js'),{cardReviewUpdate}=await import('../production-review.js');
 const plans=JSON.parse(await fs.readFile(path.join(root,'content/audio-repairs.json'))),entry=activities.find(e=>e.code==='S022'),plan=plans.S022;
 const trials=trialRequests(entry,plan);assert.equal(trials.length,2);assert.deepEqual(trials.map(t=>t.ttsText),plan.nextTrials.trials.map(t=>t.ttsText));assert(trials.every(t=>t.voice==='Algenib'&&t.canonicalText.includes(' rails ')&&t.body.input[0].content[0].text===t.ttsText));
 for(const mutate of [p=>p.nextTrials.teacherConfirmed=false,p=>p.nextTrials.voice='Leda',p=>p.nextTrials.canonicalText+=' changed',p=>p.nextTrials.trials[0].ttsText+=' changed',p=>p.nextTrials.maxTrials=1]){const changed=structuredClone(plan);mutate(changed);assert.throws(()=>trialRequests(entry,changed));}
 assert.equal(pendingRepairClips(entry).length,0);assert.equal(cardReviewUpdate(entry).id,'repair-pending');
 const s010=activities.find(e=>e.code==='S010');assert.equal(pendingRepairClips(s010).length,1);assert.equal(pendingRepairClips(s010)[0].status,'approved-awaiting-application');assert.equal(cardReviewUpdate(s010).words,'Til·lers');assert.equal(productionProgress['ca-S010'].listeningApproval,false);
 assert.equal(await fs.readFile(log,'utf8'),before);console.log('PASS · Two authorized TTS-only spelling trials, exact canonical/voice/limit guards; rejected takes hidden, approved Després preserved, Til·lers still pending. No requests.');
})().catch(e=>{console.error(e);process.exitCode=1;});
