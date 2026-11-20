'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {ffmpegBinary,ffmpeg,checkWave}=require('./audio-files.cjs'),{duration}=require('./remaster-audio.cjs');
const {productionSpec}=require('./proposal-plan.cjs'),{assertProductionApproved}=require('./production-approval.cjs');
(async()=>{
 const {activities}=await import('../catalogue.js'),{isEditoriallyReviewed,editorialFingerprint}=await import('../editorial-review.js');
 const {productionProgress}=await import('../content/production-progress.js');
 const {musicCatalogue,musicForActivity}=await import('../content/music-catalogue.js');
 assert.equal(new Set(musicCatalogue.map(track=>track.id)).size,musicCatalogue.length);
 for(const track of musicCatalogue){assert(track.author&&track.license&&track.licenseUrl);await fs.access(path.resolve(__dirname,'..',track.source));if(track.usedBy.length>1)assert(track.sharedReason,'A reused composition needs an explicit editorial reason');}
 const bin=await ffmpegBinary(),root=path.resolve(__dirname,'..'),out=path.resolve(root,'../tmp/sentit-qa/produced-proposals');await fs.mkdir(out,{recursive:true});
 const plans=JSON.parse(await fs.readFile(path.join(root,'content/production-plans.json'),'utf8'));
 const produced=activities.filter(entry=>(entry.production||entry.code==='S023')&&entry.audio);
 for(const {code} of produced){
  const entry=activities.find(entry=>entry.code===code),record=JSON.parse(await fs.readFile(path.join(root,`assets/audio/${code.toLowerCase()}-production-manifest.json`),'utf8'));
  assertProductionApproved(entry,code==='S023'?require('./news-production.cjs').spec:productionSpec(entry),plans[code]);assert(isEditoriallyReviewed(entry));
  if(entry.reviewStatus==='validated'){
   const approval=productionProgress[`ca-${entry.code}`];assert.equal(entry.status,'published');assert.equal(approval.state,'published');assert.equal(approval.listeningApproval,true);assert.equal(approval.audioSha256,record.sha256);assert.equal(approval.editorialFingerprint,await editorialFingerprint(entry));assert.equal(record.state,'published');assert.equal(record.teacherValidation.audioSha256,record.sha256);
  }else assert.equal(entry.reviewStatus,'audio-review');
  assert.equal(record.editorialEdit?record.montageNewSynthesisRequests:record.newSynthesisRequests,entry.generationPlan.takes.reduce((n,take)=>n+take.requests,0));assert.equal(record.voice.retimed,false);
  assert(record.cut.peakDbFS<=-42);assert(record.cut.at>record.cut.previousWordEnd&&record.cut.at<record.cut.nextWordStart);
  assert(record.lufs>=-24&&record.lufs<=-15&&record.peakDbTP<=-1);
  if(['S010','S013','S022','S012','S019'].includes(code)){
   assert.equal(record.montageNewSynthesisRequests,0);
   if(['S010','S013','S022'].includes(code))assert.equal(record.pronunciationRepair.applied,false);
   else {assert.equal(record.voiceValidation.approved,true);assert.equal(record.voiceValidation.rawSha256,record.rawSha256);}
   assert.notEqual(record.sha256,record.previousMaster.sha256);
   const priorFile=path.join(root,'assets/audio',record.previousMaster.file);
   assert.equal(createHash('sha256').update(await fs.readFile(priorFile)).digest('hex'),record.previousMaster.sha256);
   const raw=path.resolve(root,'../output/sentit-primera-tanda',code.toLowerCase(),'titol-fragment-'+record.requestHash.slice(0,12)+'.wav');
   assert.equal(createHash('sha256').update(await fs.readFile(raw)).digest('hex'),record.rawSha256);
   assert(!record.effects.some(effect=>['small-rail-tap','rail-opening','rail-memory-transition','two-note-ending'].includes(effect.name)));
   if(['S010','S022'].includes(code)){
    const {soundSourcesForActivity}=await import('../content/sound-sources.js'),source=soundSourcesForActivity(entry)[0];
    const real=record.effects.filter(effect=>effect.origin==='external-recording');assert.equal(real.length,code==='S010'?3:2);
    for(const effect of real){assert.equal(effect.sourceSha256,source.sha256);assert.equal(effect.license,'CC0 1.0');assert.equal(effect.retimed,false);assert.equal(effect.pitchShifted,false);}
   }
  }
  if(code==='S012'){
   const {soundSourcesForActivity}=await import('../content/sound-sources.js'),source=soundSourcesForActivity(entry)[0],guitar=record.effects.find(effect=>effect.name==='real-loose-guitar-sequence');
   assert(guitar);assert.equal(guitar.origin,'external-recording');assert.equal(guitar.author,source.author);assert.equal(guitar.license,'CC0 1.0');
   assert.equal(guitar.sourceSha256,createHash('sha256').update(await fs.readFile(path.join(root,source.file))).digest('hex'));
   assert.deepEqual(guitar.excerpt,source.excerpt);assert.equal(guitar.events.filter(e=>e.phase==='opening').length,4);assert.equal(guitar.events.filter(e=>e.phase==='ending').length,3);
   assert(guitar.envelope.duckBeforeSpeech.end<guitar.speechStart);assert(guitar.speechOverlapSeconds>0);assert(guitar.speechWindowMarginDb>=18);
   assert(guitar.events.filter(e=>e.phase==='ending').every(e=>e.pitchShifted&&e.start>record.voice.bodyLead+record.voice.bodyRawDuration));assert.equal(guitar.voiceRetimed,false);
   assert.equal(record.montageNewSynthesisRequests,0);assert.equal(record.editorialEdit.retainedText,'Gràcies, Elies.');
   assert(record.editorialEdit.silenceChecks.every(cut=>cut.peakDbFS<=-42));assert.equal(record.voice.untrimmedApartFromSilenceSplit,false);
   assert.equal(Math.round(record.editorialEdit.removedSeconds*100),822);
  }
  if(code==='S019'){
   const bed=record.effects.find(effect=>effect.name==='real-kitchen-ambience');assert(bed);assert.equal(record.effects.length,1);assert.equal(bed.origin,'external-recording');assert(bed.speechWindowMarginDb>=22);assert(bed.speechWindowPeakDbFS<=-28);assert.equal(bed.passes,2);assert(bed.sourceDuration*2-bed.crossfadeSeconds>record.bodyDuration);assert(bed.envelope.holdAfterSpeech.end-bed.envelope.holdAfterSpeech.start>=2);assert(bed.envelope.riseAfterSpeech.start>record.voice.bodyLead+record.voice.bodyRawDuration);
  }
  if(code==='S020'){
   assert.equal(record.montageNewSynthesisRequests,0);assert.equal(record.sharedJingle.id,'petita-descoberta');
   const [opening,closing,click]=record.effects;assert.equal(opening.name,'petita-descoberta-obertura');assert.equal(closing.name,'petita-descoberta-tancament');
   for(const effect of [opening,closing]){assert.equal(effect.license,'MIT');assert.equal(effect.sourceSha256,createHash('sha256').update(await fs.readFile(path.join(root,effect.source))).digest('hex'));}
   assert(opening.end<record.voice.bodyLead);assert(closing.start>record.voice.bodyLead+record.voice.bodyRawDuration);assert(record.bodyDuration-closing.end>=.6);assert.equal(click.name,'podcast-check-click');
  }
  if(['S004','S004D','S018','S022'].includes(code)){
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
 console.log(`PASS · ${produced.length} productions, ${produced.length*3} MP3 decode, exact timings and hashes, silent tails, safe levels, distinct registered music beds with speech margins and unretimed voices. Listening pending.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
