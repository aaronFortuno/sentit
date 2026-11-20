'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const vm = require('node:vm');
const { pathToFileURL } = require('node:url');
const { fingerprint, assertProductionApproved } = require('./production-approval.cjs');
const plans = require('../content/production-plans.json');
const { specs } = require('./generate-prototypes.cjs');

(async () => {
  const { validRate, clockTime } = await import('../session.js');
  for (let i=16;i<=24;i++) assert(validRate(i/20));
  for (const value of [0,.79,1.21,1.02,NaN,Infinity]) assert(!validRate(value));
  assert.equal(clockTime(87.87/.85),'1:44');
  const spec = specs[1];
  const { foto } = await import('../content/la-foto-que-faltava.js');
  const entry = foto ?? Object.values(await import('../content/la-foto-que-faltava.js'))[0];
  assert.throws(()=>assertProductionApproved(entry,spec,plans.S008),/validar/);
  const approved = {...plans.S008,reviewActivity:'ca-S008',status:'approved',reviewedAt:'test-only'};
  approved.approvedFingerprint = fingerprint(entry,spec,approved);
  assert.doesNotThrow(()=>assertProductionApproved(entry,spec,approved));
  assert.throws(()=>assertProductionApproved(entry,spec,{...approved,reviewActivity:'ca-S008R'}),/versió independent/);
  assert.throws(()=>assertProductionApproved({...entry,introduction:'Canvi'},spec,approved),/validar/);
  assert.throws(()=>assertProductionApproved(entry,{...spec,voices:{Narradora:'Leda'}},approved),/validar/);
  assert.throws(()=>assertProductionApproved(entry,spec,{...approved,cues:['Canvi']}),/validar/);

  let audio, now=0, frame;
  const played=[], painted=[];
  class FakeAudio {
    constructor(){ audio=this; this.events={}; this.currentTime=0; }
    addEventListener(event,cb){ this.events[event]=cb; }
    async play(){ played.push({url:this.src,rate:this.playbackRate,pitch:this.preservesPitch}); }
    pause(){}
  }
  const source = (await fs.readFile(path.join(__dirname,'../guided-player.js'),'utf8')).replace(/^import[^\n]+\n/,'').replace('export function','function');
  const init = vm.runInNewContext(source+'\ninitGuidedPlayer;', {Audio:FakeAudio,selectedJingleUrl:()=> 'jingle',window:{addEventListener(){}},performance:{now:()=>now},requestAnimationFrame:cb=>{frame=cb;return 1;},cancelAnimationFrame(){}});
  const button={addEventListener(event,cb){this.click=cb;}};
  init({audio:'full',tracks:{introduction:'intro',body:'body'}},{enabled:true,jingle:true,rate:.85,reading:60,interval:30,listens:2,prepare:true,repeat:true},{prepareMinute:'prepare',repeat:'repeat'},button,state=>painted.push(state));
  const ended = async()=>{ audio.events.ended(); await new Promise(resolve=>setImmediate(resolve)); };
  await button.click(); assert.equal(played.at(-1).url,'jingle'); assert.equal(played.at(-1).rate,1);
  await ended(); assert.equal(played.at(-1).url,'intro'); assert.equal(played.at(-1).rate,.85); assert.equal(played.at(-1).pitch,true);
  await ended(); assert.equal(played.at(-1).url,'prepare'); assert.equal(played.at(-1).rate,1);
  await ended(); assert.equal(painted.at(-1).countdown,60);
  now=20000; frame(); assert.equal(painted.at(-1).countdown,40);
  await button.click(); now=90000; assert.equal(painted.at(-1).countdown,40);
  await button.click(); now=129999; frame(); assert.notEqual(played.at(-1).url,'body');
  now=130001; frame(); await new Promise(resolve=>setImmediate(resolve));
  assert.equal(played.at(-1).url,'body'); assert.equal(played.at(-1).rate,.85);
  audio.currentTime=999; audio.events.timeupdate(); assert.equal(played.length,4,'Split body finishes only on ended, never a cut timer');
  await ended(); assert.equal(painted.at(-1).countdown,30);
  now+=30001; frame(); await new Promise(resolve=>setImmediate(resolve)); assert.equal(played.at(-1).url,'repeat');
  await ended(); assert.equal(played.at(-1).url,'body');
  await ended(); assert.equal(painted.at(-1).status,'sessionEnded');
  assert.equal(played.filter(item=>item.url==='jingle').length,1);
  const simple={addEventListener(event,cb){this.click=cb;}};
  init({audio:'full'},{enabled:false,jingle:false,rate:1.2},{},simple,()=>{});
  await simple.click(); assert.equal(played.at(-1).url,'full'); assert.equal(played.at(-1).rate,1.2);
  const manifest = require('../assets/audio/remaster-v2-manifest.json');
  const {createHash}=require('node:crypto');
  for(const record of manifest.activities){
    assert.equal(record.newSynthesisRequests,0);
    const bytes=await fs.readFile(path.join(__dirname,'../assets/audio',record.file));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),record.sha256);
    const activity=Object.values(await import(pathToFileURL(path.join(__dirname,'../content',record.file.slice(5,-7)+'.js')))).find(item=>item.code===record.code);
    assert(activity.tracks.introduction && activity.tracks.body);
    assert(Math.abs(activity.fragment.start-record.offset)<.00001);
  }
  console.log('PASS · Voice-rate bounds, approval gate, pitch preservation, real-time waits, pause/resume, full tails, one jingle, simple mode and master integrity. Zero synthesis.');
})().catch(error=>{console.error(error);process.exitCode=1;});
