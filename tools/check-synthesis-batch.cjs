'use strict';
const assert=require('node:assert/strict'),{collectAudio,waveParts}=require('./gemini-result.cjs'),{buildBatch}=require('./synthesis-batch.cjs');
function wave(value){const b=Buffer.alloc(64);b.write('RIFF');b.writeUInt32LE(56,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(24000,24);b.writeUInt32LE(48000,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(20,40);for(let i=44;i<64;i+=2)b.writeInt16LE(value,i);return b;}
const response=clips=>({status:'completed',steps:[{type:'model_output',content:clips.map(b=>({type:'audio',data:b.toString('base64')}))}]});
(async()=>{
 const a=wave(123),b=wave(456),one=collectAudio(response([a])),two=collectAudio(response([a,b]));assert(one.audio.equals(a));assert.equal(two.blocks,2);assert.equal(waveParts(two.audio).pcm.length,40);assert.equal(waveParts(two.audio).pcm.readInt16LE(20),456);assert.throws(()=>collectAudio(response([a,a])),/repetits/);assert.throws(()=>collectAudio({...response([a]),status:'incomplete'}),/no completada/);const truncated=Buffer.from(a);truncated.writeUInt32LE(1000,40);assert.throws(()=>collectAudio(response([truncated])),/truncat/);
 const {activities}=await import('../catalogue.js'),plans=require('../content/production-plans.json'),repairs=require('../content/audio-repairs.json'),catalog=require('../content/synthesis-batches.json');
 const log=require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../../output/sentit-primera-tanda/request-log.json'),'utf8');
 const l01=catalog.batches.find(b=>b.id==='L01');await assert.rejects(buildBatch(activities,plans,repairs,l01),/ja té àudio/);
 // Reconstruct the frozen source as an in-memory fixture, without changing files.
 const saved=activities.filter(e=>l01.blocks.some(b=>b.take&&b.code===e.code)).map(e=>({e,audio:e.audio}));for(const {e}of saved)e.audio=null;
 const built=await buildBatch(activities,plans,repairs,l01);assert.equal(built.blocks.length,5);assert.equal(built.voices.length,2);assert(built.estimate.seconds<360);assert(built.estimatedInputTokens<8192);
 for(const block of built.blocks)for(const item of block.items)assert(built.body.input[0].content[item.requestIndex].text.startsWith(item.text));
 const bad=structuredClone(l01);bad.blocks[0].sourceRequestHash='wrong';await assert.rejects(buildBatch(activities,plans,repairs,bad),/empremta/);
 await assert.rejects(buildBatch(activities,plans,repairs,{blocks:[l01.blocks[0],l01.blocks[0]]}),/duplicats/);
 const three={blocks:[l01.blocks[0],catalog.batches.find(b=>b.id==='L12').blocks[0]]};await assert.rejects(buildBatch(activities,plans,repairs,three));
 for(const {e,audio}of saved)e.audio=audio;
 const l14=catalog.batches.find(b=>b.id==='L14');
 if(l14){
  const entries=l14.blocks.map(b=>activities.find(e=>e.code===b.code)),audio=entries.map(e=>e.audio);
  try{
   entries.forEach(e=>e.audio=null);
   const plain=await buildBatch(activities,plans,repairs,l14),texts=plain.body.input[0].content.map(item=>item.text);
   const normalized=text=>text.replace(/\s+/gu,' ').trim();
   const expected=entries.flatMap(e=>[e.introduction,...e.transcript.filter(p=>p.speaker).map(p=>p.text)]).join(' ');
   assert.equal(normalized(texts.join(' ')),normalized(expected),'All and only approved spoken words survive the format change');
   assert(texts.every(text=>!/[<>|]/u.test(text)),'No spoken tags or separators');
   assert.equal(plain.voices.length,2);assert.deepEqual(plain.voices.map(v=>v.voice),['Leda','Charon']);
   assert(plain.estimate.seconds>=360&&plain.estimate.seconds<=480);assert(plain.estimatedInputTokens<8192);
   const mixed=structuredClone(l14);mixed.blocks.push(catalog.batches.find(b=>b.id==='L12').blocks[0]);
   await assert.rejects(buildBatch(activities,plans,repairs,mixed),/mateix repartiment/);
  }finally{entries.forEach((e,i)=>e.audio=audio[i]);}
 }
 assert.equal(require('node:fs').readFileSync(require('node:path').resolve(__dirname,'../../output/sentit-primera-tanda/request-log.json'),'utf8'),log);
 console.log('PASS · Mixed sources/approvals, canonical voices, no duplicate blocks, 6–8 minute pilot, PCM joining without repeated WAV headers, truncated/incomplete/duplicate output rejection. No API call or quota reservation.');
})().catch(e=>{console.error(e);process.exitCode=1;});
