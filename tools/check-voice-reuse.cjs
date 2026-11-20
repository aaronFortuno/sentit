'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {reuseFinalSuffix}=require('./reuse-final-suffix.cjs'),{productionSpec}=require('./proposal-plan.cjs');
(async()=>{
 const {activities}=await import('../catalogue.js'),entry=activities.find(a=>a.code==='S012'),spec=productionSpec(entry);
 const plans=JSON.parse(await fs.readFile(path.resolve(__dirname,'../content/production-plans.json'),'utf8')),plan=plans.S012,folder=path.resolve(__dirname,'../../output/sentit-primera-tanda/s012'),hash=data=>createHash('sha256').update(data).digest('hex');
 const reuse=await reuseFinalSuffix(entry,spec,plan,folder,hash);
 assert.equal(reuse.retainedText,'Gràcies, Elies.');assert.equal(Math.round(reuse.removedSeconds*100),822);
 const different=structuredClone(entry);different.transcript.find(p=>p.speaker).text+=' Una altra cosa.';
 await assert.rejects(reuseFinalSuffix(different,spec,plan,folder,hash),/més text canviat/);
 await assert.rejects(reuseFinalSuffix(entry,{...spec,voices:{Biel:'Charon',Elies:'Algieba'}},plan,folder,hash),/veus/);
 await assert.rejects(reuseFinalSuffix(entry,spec,{...plan,voiceReuse:{...plan.voiceReuse,sourceRequestHash:'invalid'}},folder,hash),/presa original/);
 const suffix=structuredClone(entry);suffix.transcript.filter(p=>p.speaker).at(-1).text='Gràcies per tot.';
 await assert.rejects(reuseFinalSuffix(suffix,spec,plan,folder,hash),/sufix exacte/);
 console.log('PASS · Original approval and exact suffix reused; other dialogue, new voices, wrong source and invented suffix rejected. No synthesis.');
})().catch(error=>{console.error(error);process.exitCode=1;});
