import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { activities } from '../catalogue.js';
import { proposedActivities } from '../content/propostes/index.js';
import { charactersForActivity } from '../content/characters.js';
import { buildEvidence } from '../evidence.js';
const require=createRequire(import.meta.url);
const plans=require('../content/production-plans.json');
const { productionSpec, packedProposalRequest }=require('./proposal-plan.cjs');
const { assertProductionApproved }=require('./production-approval.cjs');
const base=activities.filter(entry=>/^S\d{3}$/.test(entry.code));
assert.equal(base.length,24);
assert.deepEqual(base.map(entry=>entry.code),Array.from({length:24},(_,i)=>'S'+String(i+1).padStart(3,'0')));
for(const grade of ['3','4','5','6']){
 const set=base.filter(entry=>entry.grade===grade);assert.equal(set.length,6);
 for(const level of ['easy','middle','advanced'])assert.equal(set.filter(entry=>entry.level===level).length,2);
 assert.equal(new Set(set.map(entry=>entry.genre)).size,6);
}
assert.equal(proposedActivities.length,19);
let questions=0;
for(const entry of proposedActivities){
 assert.equal(entry.reviewStatus,'pending');assert.equal(entry.audio,null);
 assert.equal(plans[entry.code].status,'awaiting-validation');assert.equal(plans[entry.code].approvedFingerprint,null);
 assert.deepEqual(buildEvidence(entry).errors,[],entry.code+' evidence anchors');
 const body=entry.transcript.filter(part=>part.speaker),ids=body.map(part=>part.id);
 assert.equal(new Set(ids).size,ids.length);assert(entry.production.words>=150&&entry.production.words<=650,entry.code+' complete age-appropriate spoken length');
 assert(entry.transcript.filter(part=>part.kind==='direction').length>=3);
 assert(entry.questions.length>=6&&entry.questions.length<=10);questions+=entry.questions.length;
 const cast=charactersForActivity(entry);assert.equal(cast.length,Object.keys(entry.production.voices).length);
 for(const part of body)assert(cast.some(character=>character.appearances.some(appearance=>appearance.code==='ca-'+entry.code&&appearance.speaker===part.speaker)),entry.code+' speaker has a recurring identity');
 const spec=productionSpec(entry),payload=packedProposalRequest(entry);
 assert(Object.keys(spec.voices).length<=2);assert.equal(entry.generationPlan.takes.length,1);
 const expected=[entry.introduction,...body.map(part=>part.text)].join(' ');
 assert.equal(payload.input[0].content.map(item=>item.text).join(' ').replace('<long pause>','').replace(/\s+/g,' ').trim(),expected,entry.code+' complete speech, directions excluded');
 assert.equal(entry.production.words,body.map(part=>part.text).join(' ').split(/\s+/u).length);
 assert.throws(()=>assertProductionApproved(entry,spec,plans[entry.code]),/validar/);
}
console.log(`PASS · 24 base codes, six per grade, balanced levels and genres; 19 new complete drafts, ${questions} questions, exact evidence, recurring cast and blocked one-request plans. Zero synthesis.`);
