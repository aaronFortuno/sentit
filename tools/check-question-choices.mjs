import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {activities} from '../catalogue.js';
import {pilotChoices} from '../content/question-choices/pilot-001.js';
import {questionChoiceReviews} from '../content/question-choice-reviews.js';
import {registerQuestionChoices,draftQuestionChoice,questionChoiceSnapshot,multipleChoice,responseQuestion,responseSettings,responseSummary} from '../question-responses.js';
import {buildEvidence} from '../evidence.js';
import {saveCollectionEntries,saveCollectionLayout,listCollections} from '../collections.js';
const original=JSON.stringify(activities),sha=text=>createHash('sha256').update(text).digest('hex');
const keys=Object.keys(pilotChoices);
assert.deepEqual(keys,['ca-S001','ca-S002','ca-S003','ca-S004','ca-S004D','ca-S005']);
assert.equal(new Set(questionChoiceReviews.map(r=>`${r.activity}/${r.questionId}`)).size,questionChoiceReviews.length);
await registerQuestionChoices(activities);
let choices=0,open=0;
for(const key of keys){
 const entry=activities.find(a=>`${a.language}-${a.code}`===key),records=pilotChoices[key];
 assert(entry);assert.deepEqual([...Object.keys(records.questions),...Object.keys(records.openOnly)].sort(),entry.questions.map(q=>q.id).sort());
 const legacy=responseSettings({questions:{[entry.questions[0].id]:{lines:5,included:true}}},true);
 assert.equal(legacy.questionMode,'open');assert.equal(responseSettings({},false).questionMode,'choice');
 for(const question of entry.questions){
  const review=questionChoiceReviews.find(r=>r.activity===key&&r.questionId===question.id);
  assert(review&&review.status==='passed'&&review.author!==review.reviewer&&review.teacherValidation==='pending');
  assert.equal(review.fingerprint,sha(questionChoiceSnapshot(entry,question)));
  const alternative=multipleChoice(entry,question);
  if(!alternative){assert(records.openOnly[question.id]);assert.equal(responseQuestion(entry,question).responseMode,'open');open++;continue;}
  choices++;assert.equal(alternative.options.length,4);assert.deepEqual(alternative.options.map(o=>o.id),['a','b','c','d']);
  assert.equal(new Set(alternative.options.map(o=>o.text)).size,4);assert.equal(alternative.options.filter(o=>o.id===alternative.correct).length,1);
  assert(alternative.prompt&&alternative.explanation);assert.deepEqual(buildEvidence(entry,[{question:{...question,evidence:alternative.evidence},id:question.id,number:1,colorIndex:0}]).errors,[]);
  const closed=responseQuestion(entry,question,{});assert.equal(closed.responseMode,'choice');assert(closed.answer.startsWith(alternative.correct.toUpperCase()+'. '));
  const restored=responseQuestion(entry,question,{...legacy,questionModes:{[question.id]:'open'}});assert.equal(restored.prompt,question.prompt);assert.equal(restored.answer,question.answer);
  assert.equal(legacy.questions[entry.questions[0].id].lines,5);
 }
 const summary=responseSummary(entry,{});assert.equal(summary.total,entry.questions.length);
 assert.equal(responseSummary(entry,{questions:{[entry.questions[0].id]:{included:false}}}).total,entry.questions.length-1);
}
assert.equal(choices,37);assert.equal(open,1);
const example=activities.find(a=>a.code==='S001'),question=example.questions[0];
const tampered=questionChoiceReviews.map(r=>r.activity==='ca-S001'&&r.questionId===question.id?{...r,fingerprint:'0'.repeat(64)}:r);
await registerQuestionChoices([example],tampered);assert.equal(multipleChoice(example,question),null);assert.equal(responseQuestion(example,question).responseMode,'open');
await registerQuestionChoices([example]);assert(draftQuestionChoice(example,question));assert(multipleChoice(example,question));
assert.equal(JSON.stringify(activities),original,'Never mutate original editorial questions or approvals');
const memory=new Map(),storage={getItem:key=>memory.get(key)??null,setItem:(key,value)=>memory.set(key,value)};
const layout={format:{font:'serif'},settings:{questionMode:'choice',questionModes:{activitat:'open'},questions:{activitat:{lines:5,included:false}}}};
const collection=saveCollectionEntries('Pilot',[example],{[example.id]:layout},'',storage);
saveCollectionLayout(collection.id,example.id,layout,storage);assert.deepEqual(listCollections(storage)[0].layouts[example.id],layout);
console.log('PASS · 37 choices, one justified open item, exact independent reviews, evidence, legacy/new/mixed formats, exclusions, stale-review fallback and original catalogue preserved.');
