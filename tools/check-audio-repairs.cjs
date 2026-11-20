'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),{createHash}=require('node:crypto');
const {repairRequest,assertDailyRoom}=require('./audio-repairs.cjs');
const {buildBatch}=require('./audio-repair-batches.cjs');
(async()=>{
 const logFile=require('node:path').resolve(__dirname,'../../output/sentit-primera-tanda/request-log.json'),before=await fs.readFile(logFile,'utf8');
 const {activities}=await import('../catalogue.js'),plans=JSON.parse(await fs.readFile(new URL('../content/audio-repairs.json','file:///'+__filename.replaceAll('\\','/')),'utf8'));
 for(const [code,plan] of Object.entries(plans)){
  const entry=activities.find(e=>e.code===code),body=repairRequest(entry,plan),hash=createHash('sha256').update(JSON.stringify(body)).digest('hex');
  assert.equal(hash,plan.approvedRequestHash);assert.equal(plan.status,'approved-for-correction');
  assert.equal(body.input[0].content.length,plan.repairs.length);
  assert(body.input[0].content.every((part,i)=>part.text.replace(' <long pause>','')===plan.repairs[i].text));
  const manifest=JSON.parse(await fs.readFile(require('node:path').resolve(__dirname,`../assets/audio/${code.toLowerCase()}-production-manifest.json`),'utf8'));
  assert.equal(manifest.requestHash,plan.sourceRequestHash);assert.equal(manifest.rawSha256,plan.sourceRawSha256);
  for(const field of ['speaker','text','part']){const changed=structuredClone(plan);changed.repairs[0][field]+=' CORRUPT';assert.throws(()=>repairRequest(entry,changed));}
  const altered=structuredClone(plan);altered.direction+=' altered';assert.notEqual(createHash('sha256').update(JSON.stringify(repairRequest(entry,altered))).digest('hex'),plan.approvedRequestHash);
 }
 const now=new Date('2026-11-20T12:00:00Z'),ten=Array.from({length:10},()=>({at:'2026-11-20T09:00:00Z'}));
 const batches=JSON.parse(await fs.readFile(require('node:path').resolve(__dirname,'../content/audio-repair-batches.json'),'utf8'));
 const covered=[];
 for(const batch of batches){const built=buildBatch(activities,plans,batch);assert.equal(built.requestHash,batch.approvedRequestHash);assert(Object.keys(built.voices).length<=2);assert(built.body.input[0].content.every(part=>part.text.endsWith('<long pause> <long pause>')));covered.push(...built.fragments.map(f=>f.code+':'+f.part));}
 assert.deepEqual(covered.sort(),Object.entries(plans).flatMap(([code,p])=>p.repairs.map(r=>code+':'+r.part)).sort(),'Every correction appears in exactly one batch');
 assert.equal(new Set(covered).size,covered.length);assert.equal(batches.length,4);
 assert.throws(()=>buildBatch(activities,plans,{fragments:[...batches[0].fragments,batches[1].fragments[0]]}),/dues veus/);
 assert.throws(()=>assertDailyRoom(ten,now),/deu/);assert.equal(assertDailyRoom(ten.slice(1),now),9);
 assert.equal(assertDailyRoom(ten,new Date('2026-11-21T08:00:01Z')),0);
 assert.equal(await fs.readFile(logFile,'utf8'),before,'Planning and guard checks never send or reserve a request');
 console.log('PASS · Eight exact repair fragments in four frozen batches of at most two voices, canonical text/raw identities, long pauses, mutation guards and daily quota boundary. No API calls.');
})().catch(error=>{console.error(error);process.exitCode=1;});
