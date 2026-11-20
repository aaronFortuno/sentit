'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {ffmpegBinary,ffmpeg,checkWave}=require('./audio-files.cjs'),{duration}=require('./remaster-audio.cjs');
const {productionSpec}=require('./proposal-plan.cjs'),{assertProductionApproved}=require('./production-approval.cjs');
(async()=>{
 const {activities}=await import('../catalogue.js'),{isEditoriallyReviewed}=await import('../editorial-review.js');
 const bin=await ffmpegBinary(),root=path.resolve(__dirname,'..'),out=path.resolve(root,'../tmp/sentit-qa/produced-proposals');await fs.mkdir(out,{recursive:true});
 const plans=JSON.parse(await fs.readFile(path.join(root,'content/production-plans.json'),'utf8'));
 for(const code of ['S003','S013']){
  const entry=activities.find(entry=>entry.code===code),record=JSON.parse(await fs.readFile(path.join(root,`assets/audio/${code.toLowerCase()}-production-manifest.json`),'utf8'));
  assertProductionApproved(entry,productionSpec(entry),plans[code]);assert(isEditoriallyReviewed(entry));
  assert.equal(entry.reviewStatus,'audio-review');assert.equal(record.newSynthesisRequests,1);assert.equal(record.voice.retimed,false);
  assert(record.cut.peakDbFS<=-42);assert(record.cut.at>record.cut.previousWordEnd&&record.cut.at<record.cut.nextWordStart);
  assert(record.lufs>=-24&&record.lufs<=-15&&record.peakDbTP<=-1);
  assert.equal(createHash('sha256').update(await fs.readFile(path.join(root,'assets/audio',record.file))).digest('hex'),record.sha256);
  for(const [name,expected] of [[record.file,record.fullDuration],[record.introFile,record.offset],[record.bodyFile,record.bodyDuration]]){
   const decoded=path.join(out,name+'.wav');ffmpeg(bin,['-v','error','-xerror','-y','-i',path.join(root,'assets/audio',name),'-ar','48000','-ac','1','-c:a','pcm_s16le',decoded]);
   const wav=await fs.readFile(decoded);checkWave(wav);assert(Math.abs(await duration(decoded)-expected)<.05,name+' timing');
   let samples;for(let i=12;i+8<=wav.length;){const size=wav.readUInt32LE(i+4);if(wav.toString('ascii',i,i+4)==='data'){samples=wav.subarray(i+8,i+8+size);break;}i+=8+size+size%2;}
   let peak=0;for(let i=samples.length-9600;i<samples.length;i+=2)peak=Math.max(peak,Math.abs(samples.readInt16LE(i)));assert(peak<10,name+' silent tail');
  }
 }
 console.log('PASS · S003/S013: six MP3 decode, exact timings and hashes, silent tails, safe levels, unretimed complete voices and one request each. Teacher listening remains pending.');
})().catch(error=>{console.error(error);process.exitCode=1;});
