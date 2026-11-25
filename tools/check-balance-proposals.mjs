import assert from'node:assert/strict';import{createRequire}from'node:module';import{readFile}from'node:fs/promises';
import{balanceActivities,balanceNews,balanceExplanations,balanceWorkshops,balanceSources}from'../content/propostes/equilibri/index.js';
import{registerQuestionChoices,multipleChoice}from'../question-responses.js';import{editorialFingerprint}from'../editorial-review.js';import{editorialReviews}from'../content/editorial-reviews.js';import{buildEvidence}from'../evidence.js';
const require=createRequire(import.meta.url),{packedProposalRequests,productionSpec}=require('./proposal-plan.cjs'),{assertProductionApproved}=require('./production-approval.cjs');
const plans=JSON.parse(await readFile(new URL('../content/production-plans.json',import.meta.url)));
assert.deepEqual(balanceActivities.map(a=>a.code),Array.from({length:16},(_,i)=>'S'+(112+i)));
assert.equal(balanceNews.length,8);assert.equal(balanceExplanations.length,4);assert.equal(balanceWorkshops.length,4);
await registerQuestionChoices(balanceActivities);let questions=0;
for(const a of balanceActivities){
  assert.equal(a.production.strategy,'plain-v1');assert(Object.keys(a.production.voices).length<=2);assert.equal(a.generationPlan.takes.length,1);
  assert.equal(a.questions.length,balanceNews.includes(a)?5:6);assert(a.production.words>=80&&a.production.words<=400);
  assert.equal(plans[a.code].reviewContent,balanceSources[a.code]);assert.deepEqual(buildEvidence(a).errors,[]);
  assert.equal(await editorialFingerprint(a),editorialReviews['ca-'+a.code]?.fingerprint,a.code+': stale independent review');
  const [payload]=packedProposalRequests(a),actual=payload.input[0].content.map(p=>p.text).join(' ').replace(/\s+/gu,' ').trim(),expected=[a.introduction,...a.transcript.filter(p=>p.speaker).map(p=>p.text)].join(' ');
  assert.equal(actual,expected,a.code+': every spoken word once');assert(!/[<>|]/u.test(actual),a.code+': no spoken pause instructions');
  assert.deepEqual(new Set(a.generationPlan.takes[0].parts),new Set(['introduction',...a.transcript.filter(p=>p.speaker).map(p=>p.id)]));
  const correct=[];
  for(const q of a.questions){const choice=multipleChoice(a,q);assert(choice);assert.equal(choice.options.length,4);correct.push(choice.correct);questions++;}
  assert(new Set(correct).size>=3,a.code+': avoid identical answer letters');
  if(plans[a.code].status!=='approved'){assert.equal(plans[a.code].approvedFingerprint,null);assert.throws(()=>assertProductionApproved(a,productionSpec(a),plans[a.code]),/validar/);}
}
assert.equal(questions,88);
console.log('PASS · 16 balanced proposals, 88 dual questions, exact editorial reviews, plain speech without pause tags, two voices maximum and teacher approval gate.');
