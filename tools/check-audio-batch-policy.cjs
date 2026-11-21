'use strict';
const assert=require('node:assert/strict');
const {policy,estimateSynthesis,assertSynthesisWindow}=require('./audio-batch-policy.cjs');
const {reserveRequest}=require('./audio-quota.cjs');
const {geminiAudio}=require('./generate-prototypes.cjs');
const body=(words,pauses='')=>({input:[{content:[{type:'text',text:Array(words).fill('mot').join(' ')+pauses}]}]});
(async()=>{
 assert.equal(policy.minimumSeconds,360);assert.equal(policy.maximumSeconds,480);
 assert.throws(()=>assertSynthesisWindow(body(27)),/Lot massa petit/);
 assert.throws(()=>assertSynthesisWindow(body(1400)),/Lot massa llarg/);
 for(const words of [1020,1150,1340]) assert(assertSynthesisWindow(body(words)).seconds>=360);
 assert.deepEqual(estimateSynthesis(body(100,' <long pause> <short pause>')),{words:100,longPauses:1,shortPauses:1,seconds:42});
 let calls=0;const previousFetch=global.fetch;global.fetch=()=>{calls++;throw Error('Network must not be called');};
 try{
  // The invalid folder also proves the check happens before quota files or keys.
  await assert.rejects(reserveRequest('?:/never-created',{code:'TEST'},body(27)),/Lot massa petit/);
  await assert.rejects(geminiAudio(body(27),'?:/never-created'),/Lot massa petit/);
  await assert.rejects(geminiAudio(body(1400),'?:/never-created'),/Lot massa llarg/);
  assert.equal(calls,0);
 }finally{global.fetch=previousFetch;}
 console.log('PASS · Six to eight minute window, pause estimates, short/long rejection before keys, quota/files or network. No synthesis.');
})().catch(e=>{console.error(e);process.exitCode=1;});
