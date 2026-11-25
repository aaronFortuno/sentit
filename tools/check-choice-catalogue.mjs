import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {activities} from '../catalogue.js';
import {questionChoices,questionChoiceBatches} from '../content/question-choices/index.js';
import {questionChoiceReviews} from '../content/question-choice-reviews.js';
import {registerQuestionChoices,multipleChoice,openOnlyReason,questionChoiceSnapshot,responseQuestion,responseSummary} from '../question-responses.js';
import {buildEvidence} from '../evidence.js';
const original=JSON.stringify(activities),complete=process.argv.includes('--complete');
const reviews=new Map(questionChoiceReviews.map(r=>[`${r.activity}/${r.questionId}`,r]));
assert.equal(reviews.size,questionChoiceReviews.length,'Duplicate reviews');
await registerQuestionChoices(activities);
let choices=0,open=0,total=0,unreviewed=0;
for(const [key,record] of Object.entries(questionChoices)) {
  const entry=activities.find(a=>`${a.language}-${a.code}`===key);
  assert(entry,key+': activity absent');assert(record.questions&&record.openOnly,key+': classification missing');
  const ids=[...Object.keys(record.questions),...Object.keys(record.openOnly)];
  assert.equal(new Set(ids).size,ids.length,key+': duplicate classification');
  assert.deepEqual(ids.sort(),entry.questions.map(q=>q.id).sort(),key+': classify every original question exactly once');
  for(const question of entry.questions){
    total++;
    const id=`${key}/${question.id}`,alternative=record.questions[question.id],reason=record.openOnly[question.id],review=reviews.get(id);
    if(alternative){
      assert.equal(typeof alternative.prompt,'string',id);assert(alternative.prompt.trim());
      assert.equal(typeof alternative.explanation,'string',id);assert(alternative.explanation.trim());
      assert.equal(alternative.options.length,4,id+': four options');
      assert(alternative.options.every(o=>typeof o==='string'&&o.trim().length),id+': blank option');
      assert.equal(new Set(alternative.options.map(o=>o.normalize('NFC').trim().toLocaleLowerCase('ca'))).size,4,id+': repeated options');
      assert(['a','b','c','d'].includes(alternative.correct),id+': invalid key');
      const evidence=alternative.evidence??question.evidence??[];
      assert(evidence.length,id+': evidence required');
      assert.deepEqual(buildEvidence(entry,[{question:{...question,evidence},id:question.id,number:1,colorIndex:0}]).errors,[],id+': evidence invalid');
    }else {assert.equal(typeof reason,'string',id);assert(reason.trim().length>=25,id+': specific reason to retain open response');}
    if(!review){unreviewed++;assert(!complete,id+': independent review missing');continue;}
    assert.equal(review.status,'passed',id);assert(review.author&&review.reviewer&&review.author!==review.reviewer,id+': independent authors');
    const batch=questionChoiceBatches.find(b=>b.choices[key]);assert.equal(review.author,batch.author,id+': provenance');
    assert.equal(review.fingerprint,createHash('sha256').update(questionChoiceSnapshot(entry,question)).digest('hex'),id+': stale review');
    if(alternative){
      choices++;const resolved=responseQuestion(entry,question,{questionMode:'choice'});
      assert.equal(resolved.responseMode,'choice');assert.equal(multipleChoice(entry,question).options.length,4);
      assert(resolved.answer.startsWith(alternative.correct.toUpperCase()+'. '));
      assert.equal(responseQuestion(entry,question,{questionMode:'open'}).prompt,question.prompt);
      assert.equal(responseQuestion(entry,question,{questionMode:'open'}).answer,question.answer);
      assert.equal(responseQuestion(entry,question,{questionMode:'choice',questionModes:{[question.id]:'open'}}).responseMode,'open');
    }else{open++;assert.equal(openOnlyReason(entry,question),reason);assert.equal(responseQuestion(entry,question).responseMode,'open');}
    if(review.teacherValidation==='approved')assert(review.teacherValidatedAt&&review.teacherConfirmation,id+': teacher approval needs source');
    else assert.equal(review.teacherValidation,'pending',id+': teacher status');
  }
  const summary=responseSummary(entry,{questionMode:'choice'});
  assert.equal(summary.total,entry.questions.length);assert.equal(summary.choices+summary.open,entry.questions.length);
  assert.equal(responseSummary(entry,{questionMode:'open'}).choices,0);
}
for(const [key,review]of reviews){const entry=activities.find(a=>`${a.language}-${a.code}`===review.activity);assert(entry?.questions.some(q=>q.id===review.questionId),key+': orphan review');assert(questionChoices[review.activity],key+': orphan batch');}
if(complete){assert.equal(Object.keys(questionChoices).length,activities.length);assert.equal(total,activities.reduce((n,a)=>n+a.questions.length,0));assert.equal(choices+open,total);assert.equal(unreviewed,0);}
assert.equal(JSON.stringify(activities),original,'Canonical reading and approvals remain unchanged');
console.log(JSON.stringify({pass:true,activities:Object.keys(questionChoices).length,questions:total,choices,openOnly:open,unreviewed,canonicalUnchanged:true}));
