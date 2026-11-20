'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {ffmpegBinary,ffmpeg,checkWave}=require('./audio-files.cjs'),{duration}=require('./remaster-audio.cjs');
const {productionSpec}=require('./proposal-plan.cjs'),{assertProductionApproved}=require('./production-approval.cjs');
(async()=>{
 const {activities}=await import('../catalogue.js'),{isEditoriallyReviewed}=await import('../editorial-review.js');
 const {musicCatalogue,musicForActivity}=await import('../content/music-catalogue.js');
 assert.equal(new Set(musicCatalogue.map(track=>track.id)).size,musicCatalogue.length);
 for(const track of musicCatalogue){assert(track.author&&track.license&&track.licenseUrl);await fs.access(path.resolve(__dirname,'..',track.source));if(track.usedBy.length>1)assert(track.sharedReason,'A reused composition needs an explicit editorial reason');}
 const bin=await ffmpegBinary(),root=path.resolve(__dirname,'..'),out=path.resolve(root,'../tmp/sentit-qa/produced-proposals');await fs.mkdir(out,{recursive:true});
 const plans=JSON.parse(await fs.readFile(path.join(root,'content/production-plans.json'),'utf8'));
 const produced=activities.filter(entry=>entry.production&&entry.audio);
 for(const {code} of produced){
  const entry=activities.find(entry=>entry.code===code),record=JSON.parse(await fs.readFile(path.join(root,`assets/audio/${code.toLowerCase()}-production-manifest.json`),'utf8'));
  assertProductionApproved(entry,productionSpec(entry),plans[code]);assert(isEditoriallyReviewed(entry));
  assert.equal(entry.reviewStatus,'audio-review');assert.equal(record.newSynthesisRequests,entry.generationPlan.takes.reduce((n,take)=>n+take.requests,0));assert.equal(record.voice.retimed,false);
  assert(record.cut.peakDbFS<=-42);assert(record.cut.at>record.cut.previousWordEnd&&record.cut.at<record.cut.nextWordStart);
  assert(record.lufs>=-24&&record.lufs<=-15&&record.peakDbTP<=-1);
  if(['S018','S022'].includes(code)){
   const track=musicForActivity(entry),bed=record.effects.find(effect=>effect.name==='gentle-narration-bed'||effect.name==='gentle-tram-memory-bed');
   assert(track&&bed);assert.equal(record.musicTrack.id,track.id);assert.equal(bed.source,track.source);
   assert(bed.speechWindowMarginDb>=18);assert(bed.envelope.riseAfterSpeech.start>=record.voice.bodyLead+record.voice.bodyRawDuration);
   assert(bed.envelope.duckBeforeSpeech.end<record.voice.bodyLead);assert.equal(bed.envelope.silentTail,.6);
   for(const effect of record.effects.filter(effect=>effect!==bed)){
    if(effect.start>=record.voice.bodyLead)assert(effect.end<=record.voice.bodyLead+record.voice.bodyRawDuration);
   }
  }
  assert.equal(createHash('sha256').update(await fs.readFile(path.join(root,'assets/audio',record.file))).digest('hex'),record.sha256);
  for(const [name,expected] of [[record.file,record.fullDuration],[record.introFile,record.offset],[record.bodyFile,record.bodyDuration]]){
   const decoded=path.join(out,name+'.wav');ffmpeg(bin,['-v','error','-xerror','-y','-i',path.join(root,'assets/audio',name),'-ar','48000','-ac','1','-c:a','pcm_s16le',decoded]);
   const wav=await fs.readFile(decoded);checkWave(wav);assert(Math.abs(await duration(decoded)-expected)<.05,name+' timing');
   let samples;for(let i=12;i+8<=wav.length;){const size=wav.readUInt32LE(i+4);if(wav.toString('ascii',i,i+4)==='data'){samples=wav.subarray(i+8,i+8+size);break;}i+=8+size+size%2;}
   let peak=0;for(let i=samples.length-9600;i<samples.length;i+=2)peak=Math.max(peak,Math.abs(samples.readInt16LE(i)));assert(peak<10,name+' silent tail');
  }
 }
 assert.notEqual(musicForActivity(activities.find(e=>e.code==='S018')).id,musicForActivity(activities.find(e=>e.code==='S022')).id);
 const a=JSON.parse(await fs.readFile(path.join(root,'assets/audio/s018-production-manifest.json'),'utf8')),b=JSON.parse(await fs.readFile(path.join(root,'assets/audio/s022-production-manifest.json'),'utf8'));
 assert.notEqual(a.effects[0].rawSha256,b.effects[0].rawSha256,'The two narrations use genuinely different original compositions');
 console.log(`PASS · ${produced.length} productions, ${produced.length*3} MP3 decode, exact timings and hashes, silent tails, safe levels, two distinct registered music beds with speech margins and unretimed voices. Listening pending.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
