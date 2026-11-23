'use strict';
// Exact authorized batches and failure cases, with no provider or quota calls.
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path');
const{buildBatch}=require('./synthesis-batch.cjs'),{assertSynthesisWindow}=require('./audio-batch-policy.cjs');
(async()=>{
 const root=path.resolve(__dirname,'..'),{activities}=await import('../catalogue.js'),plans=JSON.parse(await fs.readFile(path.join(root,'content/production-plans.json'))),repairs=JSON.parse(await fs.readFile(path.join(root,'content/audio-repairs.json'))),catalog=JSON.parse(await fs.readFile(path.join(root,'content/synthesis-batches.json'))),logFile=path.resolve(root,'../output/sentit-primera-tanda/request-log.json'),before=await fs.readFile(logFile);
 const ferran=catalog.batches.find(b=>b.id==='L30'),duo=catalog.batches.find(b=>b.id==='L31'),a=await buildBatch(activities,plans,repairs,ferran),b=await buildBatch(activities,plans,repairs,duo);
 assertSynthesisWindow(a.body);assertSynthesisWindow(b.body);assert.deepEqual(a.voices.map(v=>v.voice),['Algenib','Achird']);assert.deepEqual(b.voices.map(v=>v.voice),['Leda','Puck']);
 const normalized=text=>text.replace(/\s+/gu,' ').trim();
 for(const built of[a,b]){assert(built.estimatedInputTokens<=8192);assert(built.body.input[0].content.every(i=>!/[<>|]/u.test(i.text)));for(const block of built.blocks.filter(b=>b.take)){const entry=activities.find(e=>e.code===block.code);assert.equal(normalized(block.items.map(i=>i.text).join(' ')),normalized([entry.introduction,...entry.transcript.filter(p=>p.speaker).map(p=>p.text)].join(' ')));}}
 const trials=a.blocks.filter(b=>b.trial);assert.equal(trials.length,2);assert(trials.every(t=>t.canonicalText===repairs.S022.nextTrials.canonicalText&&t.items[0].voice==='Algenib'));assert(trials[0].items[0].text.includes('raíls'));assert(trials[1].items[0].text.includes('raïls'));
 const retry=b.blocks.find(b=>b.id==='S010-alternativa-v2');assert.equal(retry.items.length,1);assert.equal(retry.items[0].sourceSpeaker,'Biel');assert.equal(retry.items[0].voice,'Puck');assert.equal(retry.items[0].text,repairs.S010.repairs.find(r=>r.part==='alternativa').text);
 const title=b.blocks.find(b=>b.id==='S061-introduction');assert.equal(title.items[0].text,activities.find(e=>e.code==='S061').introduction);assert.equal(title.items[0].voice,'Leda');
 const denied=structuredClone(ferran);delete denied.castPolicy.allowAnchorRepairs;await assert.rejects(buildBatch(activities,plans,repairs,denied),/lot estricte/);
 const wrongVoice=structuredClone(ferran);wrongVoice.blocks.push(duo.blocks.find(r=>r.retry));await assert.rejects(buildBatch(activities,plans,repairs,wrongVoice),/recurrent de referència/);
 const unapproved=structuredClone(repairs);unapproved.S022.nextTrials.teacherConfirmed=false;await assert.rejects(buildBatch(activities,plans,unapproved,ferran),/Trial approval/);
 const changed=structuredClone(duo);changed.blocks.find(b=>b.retry).sourceRequestHash='changed';await assert.rejects(buildBatch(activities,plans,repairs,changed),/empremta/);
 const badId=structuredClone(duo);badId.blocks.find(b=>b.retry).retry='S010-alternativa-v3';await assert.rejects(buildBatch(activities,plans,repairs,badId),/Reintent no autoritzat/);
 assert((await fs.readFile(logFile)).equals(before));console.log('PASS · two full authorized batches, exact texts, guest anchor repairs, limited auxiliary-spelling trials, Puck retry identity and missing-title take; altered approvals, identities and hashes rejected. Zero requests.');
})().catch(e=>{console.error(e);process.exitCode=1;});
