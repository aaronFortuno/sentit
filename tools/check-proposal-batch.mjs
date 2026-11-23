import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { activities } from '../catalogue.js';
import { proposedActivities, proposedVariants, firstBatchActivities, secondBatchActivities, thirdBatchActivities, fourthBatchActivities, fourthBatchGroups, dailyActivities } from '../content/propostes/index.js';
import { universes, universesForActivity } from '../content/universes.js';
import { charactersForActivity } from '../content/characters.js';
import { buildEvidence } from '../evidence.js';
const require=createRequire(import.meta.url);
const plans=require('../content/production-plans.json');
const { productionSpec, packedProposalRequests }=require('./proposal-plan.cjs');
const { assertProductionApproved }=require('./production-approval.cjs');
const base=activities.filter(entry=>/^S\d{3}$/.test(entry.code)&&Number(entry.code.slice(1))<=24);
assert.equal(base.length,24);
assert.deepEqual(base.map(entry=>entry.code),Array.from({length:24},(_,i)=>'S'+String(i+1).padStart(3,'0')));
for(const grade of ['3','4','5','6']){
 // Preserve initial design coverage while honoring explicit teacher calibration.
 const set=base.filter(entry=>(entry.code==='S010'?'4':entry.grade)===grade);assert.equal(set.length,6);
 for(const level of ['easy','middle','advanced'])assert(set.some(entry=>entry.level===level),grade+' has coverage of '+level);
 assert.equal(new Set(set.map(entry=>entry.genre)).size,6);
}
assert.equal(base.find(entry=>entry.code==='S010').grade,'5','Teacher calibration: S010 is 5th grade');
assert.equal(base.find(entry=>entry.code==='S010').level,'middle');
assert.equal(firstBatchActivities.length,19);
assert.equal(proposedActivities.length,19+secondBatchActivities.length+thirdBatchActivities.length+fourthBatchActivities.length+dailyActivities.length);
assert.equal(fourthBatchActivities.length,30);
for(const group of fourthBatchGroups){
 assert.equal(group.entries.length,5);
 assert(Object.keys(group.voices).length<=2);
 for(const entry of group.entries){
  // Teacher regrading preserves the original, approved question set.
  const initialGrade = entry.code === 'S067' ? '6' : ['S061','S066'].includes(entry.code) ? '5' : entry.grade;
  assert(['5','6'].includes(initialGrade));
  assert.equal(entry.questions.length,Number(initialGrade)+3);
  assert.deepEqual(entry.production.voices,group.voices,entry.code+' keeps the exact recurring cast for its block');
  assert.equal(entry.generationPlan.takes.length,1,entry.code+' is a complete recording, not split character turns');
 }
}
assert.equal(activities.find(entry=>entry.code==='S067').grade,'eso1','Teacher calibration: S067 is first ESO');
assert.equal(activities.find(entry=>entry.code==='S067').level,'middle');
assert.equal(activities.find(entry=>entry.code==='S061').grade,'6','Teacher calibration: S061 is 6th grade');
assert.equal(activities.find(entry=>entry.code==='S061').level,'middle');
for(const grade of ['3','4','5','6']){const next=secondBatchActivities.filter(e=>e.grade===grade);assert([0,5].includes(next.length),'Publish complete reviewed groups');if(next.length)assert.deepEqual(['easy','middle','advanced'].map(level=>next.filter(e=>e.level===level).length),[2,2,1]);}
for(const entry of secondBatchActivities){assert(['pending','audio-review','validated'].includes(entry.reviewStatus));assert.equal(Boolean(entry.audio),entry.reviewStatus!=='pending');assert.equal(entry.questions.length,Number(entry.grade)+3);assert(entry.universeIds?.length);for(const id of entry.universeIds)assert(universes.some(u=>u.id===id));assert(universesForActivity(entry).length>0);assert(plans[entry.code]?.reviewContent?.startsWith('content/propostes/tanda2/'));}
assert.equal(activities.find(entry=>entry.code==='S011').level,'advanced','Teacher calibration: S011 is 4t avançada');
let questions=0;
for(const entry of [...proposedActivities,...proposedVariants]){
 assert(['pending','audio-review','validated'].includes(entry.reviewStatus));
 if(entry.reviewStatus==='pending')assert.equal(entry.audio,null);
 else assert(entry.audio&&entry.tracks?.body&&entry.tracks?.introduction);
 const approved=plans[entry.code].status==='approved';
 if(!approved){assert.equal(plans[entry.code].status,'awaiting-validation');assert.equal(plans[entry.code].approvedFingerprint,null);}
 assert.deepEqual(buildEvidence(entry).errors,[],entry.code+' evidence anchors');
 const body=entry.transcript.filter(part=>part.speaker),ids=body.map(part=>part.id);
 assert.equal(new Set(ids).size,ids.length);assert(entry.production.words>=150&&entry.production.words<=650,entry.code+' complete age-appropriate spoken length');
 assert(entry.transcript.filter(part=>part.kind==='direction').length>=3);
 assert(entry.questions.length>=6&&entry.questions.length<=10);questions+=entry.questions.length;
 const anonymous = speaker => ['Narradora','Narrador'].includes(speaker);
 const cast=charactersForActivity(entry),guests=entry.guestSpeakers??[],guestNames=new Set(guests.map(guest=>guest.name));
 assert.equal(guestNames.size,guests.length,entry.code+' unique occasional guest roles');
 for(const guest of guests){assert.equal(entry.production.voices[guest.name],guest.voice);assert(!cast.some(character=>character.name===guest.name),'Guests do not impersonate recurring characters');assert(body.some(part=>part.speaker===guest.name));}
 assert.equal(cast.length,Object.keys(entry.production.voices).filter(speaker=>!anonymous(speaker)&&!guestNames.has(speaker)).length);
 for(const part of body){
  const identified=cast.some(character=>character.appearances.some(appearance=>appearance.code==='ca-'+entry.code&&appearance.speaker===part.speaker));
  assert.equal(identified,!anonymous(part.speaker)&&!guestNames.has(part.speaker),entry.code+' recurring speakers keep identities; guests stay outside the directory');
 }
 const spec=productionSpec(entry),payloads=packedProposalRequests(entry),payload=payloads[0];
 assert.equal(payloads.length,entry.generationPlan.takes.length);
 for(const body of payloads)assert((body.generation_config.speech_config.speakers?.length??1)<=2);
 const expected=[entry.introduction,...body.map(part=>part.text)].join(' ');
 let spoken=payloads.flatMap(payload=>payload.input[0].content.map(item=>item.text)).join(' ').replaceAll('<long pause>','');
 if(entry.production.performance){
  assert.equal((spoken.match(/<chuckle>/g)??[]).length,2);
  assert(spoken.includes(entry.transcript.find(part=>part.id===entry.production.performance.after).text+' <chuckle> |<chuckle>| <short pause>'));
  assert(!JSON.stringify(payload).includes('no nonverbal vocalizations'));
  spoken=spoken.replace(' <chuckle> |<chuckle>| <short pause>','');
 }
 if(entry.production.overlaps||entry.production.strategy==='grouped-voices-v1'){
  for(const overlap of entry.production.overlaps??[]){const reaction=body.find(part=>part.id===overlap.reaction);assert.equal(spoken.split('|'+reaction.text+'|').length,2,'La reacció sona una sola vegada');assert(spoken.includes(overlap.after+' |'+reaction.text+'|'));}
  const tokens=text=>text.replaceAll('|','').trim().split(/\s+/u).sort();
  assert.deepEqual(tokens(spoken),tokens(expected),entry.code+' all spoken words retained once, with planned overlap');
 }else assert.equal(spoken.replace(/\s+/g,' ').trim(),expected,entry.code+' complete speech, directions excluded');
 assert.equal(entry.production.words,body.map(part=>part.text).join(' ').split(/\s+/u).length);
 if(approved)assert.doesNotThrow(()=>assertProductionApproved(entry,spec,plans[entry.code]));
 else assert.throws(()=>assertProductionApproved(entry,spec,plans[entry.code]),/validar/);
}
console.log(`PASS · 24 base codes, initial design coverage, all levels and genres, teacher-calibrated difficulty; ${proposedActivities.length} proposals and ${proposedVariants.length} comparison variant, ${questions} questions, exact evidence, recurring cast and gated request plans. Zero synthesis.`);
