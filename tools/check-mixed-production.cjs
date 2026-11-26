'use strict';
const fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict'),{createHash}=require('node:crypto');
const {ffmpeg,ffmpegBinary}=require('./audio-files.cjs');
const root=path.resolve(__dirname,'..'),sha=b=>createHash('sha256').update(b).digest('hex');
(async()=>{
 const {activities}=await import('../catalogue.js'),{productionProgress}=await import('../content/production-progress.js'),{soundSources}=await import('../content/sound-sources.js'),{musicCatalogue}=await import('../content/music-catalogue.js'),{mixedAudioResources}=await import('../content/mixed-audio-resources.js'),binary=await ffmpegBinary();let montages=0,clips=0;
 const onlyValue=process.argv.find(a=>a.startsWith('--only='))?.slice(7),only=onlyValue?new Set(onlyValue.split(',')):null;
 for(const entry of activities){
  if(only&&!only.has(entry.code))continue;
  const manifest=await fs.readFile(path.join(root,`assets/audio/${entry.code.toLowerCase()}-production-manifest.json`),'utf8').then(JSON.parse).catch(e=>{if(e.code==='ENOENT')return null;throw e;});
  if(!manifest||(!manifest.newsRevision&&!['shared-mixed-batch','assembled-grouped-voices','repaired-mixed-take','repaired-existing-master'].includes(manifest.productionMode)))continue;
  const key=entry.language+'-'+entry.code;
  assert.equal(entry.audio,'./assets/audio/'+manifest.file);assert(mixedAudioResources[key]);
  if(entry.reviewStatus==='validated'){
   assert.equal(productionProgress[key].state,'published');assert.equal(productionProgress[key].listeningApproval,true);assert.equal(manifest.teacherValidation.audioSha256,manifest.sha256);assert(entry.image?.src);assert.equal(manifest.state,'published');
  }else{
   assert.equal(entry.reviewStatus,'audio-review');assert(['montage-awaiting-listening','audio-corrections-pending'].includes(productionProgress[key].state));assert.equal(productionProgress[key].listeningApproval,false);
   if(productionProgress[key].state==='audio-corrections-pending')assert(productionProgress[key].feedback.some(f=>f.status==='pending'));
  }
  assert.equal(sha(await fs.readFile(path.join(root,'assets/audio',manifest.file))),manifest.sha256);assert(manifest.lufs>=-24&&manifest.lufs<=-15&&manifest.peakDbTP<=-1);assert.equal(manifest.voiceRetimed,false);
  for(const file of [manifest.file,manifest.introFile,manifest.bodyFile]){ffmpeg(binary,['-v','error','-xerror','-i',path.join(root,'assets/audio',file),'-f','null','-']);clips++;}
  const metadata=ffmpeg(binary,['-i',path.join(root,'assets/audio',manifest.file),'-f','null','-']),match=/Duration: (\d+):(\d+):([\d.]+)/.exec(metadata);assert(match);const seconds=Number(match[1])*3600+Number(match[2])*60+Number(match[3]);assert(Math.abs(seconds-manifest.fullDuration)<.2);
  for(const effect of manifest.effects){
   if(effect.origin==='licensed-library-music'){const track=musicCatalogue.find(m=>m.id===effect.compositionId);assert(track?.usedBy.includes(key));assert.equal(track.license,'CC BY 4.0');assert.equal(track.libraryId,effect.libraryId);assert.equal(track.sourceSha256,effect.sourceSha256);assert.equal(effect.retimed,false);assert.equal(effect.envelope.holdSeconds,2);assert(effect.envelope.fadeEnd<=manifest.bodyDuration);continue;}
   if(manifest.activity==='ca-S013'&&manifest.productionMode==='repaired-existing-master'&&effect.origin==='original-procedural'){
    assert(['envelope-opening','sorting-to-delivery'].includes(effect.name));
    assert.equal(effect.inheritedFrom,manifest.previousMaster.file);
    assert.equal(sha(await fs.readFile(path.join(root,'assets/audio',effect.inheritedFrom))),manifest.previousMaster.sha256);
    assert(effect.end>effect.start&&effect.start>=0&&effect.end<manifest.bodyDuration);continue;
   }
   if(effect.origin==='licensed-recording-in-montage'){const recording=soundSources.find(s=>s.id===effect.name);assert.equal(recording.license,'Pixabay Content License');assert.equal(recording.sourceNotDistributedSeparately,true);assert(recording.usedBy.includes(key));assert.equal(recording.sha256,effect.sourceSha256);assert.equal(recording.file,undefined,'Standalone licensed source is not distributed');continue;}
   if(effect.origin==='licensed-music-in-montage'){assert.equal(effect.credit.license,'Pixabay Content License');assert.equal(effect.credit.sourceNotDistributedSeparately,true);assert(musicCatalogue.some(m=>m.id===effect.credit.id&&m.usedBy.includes(key)));assert.equal(effect.sidechain.ratio,6);continue;}
   if(effect.origin==='original-procedural-composition'){assert.equal(effect.license,'MIT');if(effect.jingleId)assert.equal(sha(await fs.readFile(path.join(root,effect.source))),effect.sourceSha256);if(effect.compositionId){assert(musicCatalogue.some(m=>m.id===effect.compositionId&&m.usedBy.includes(key)));assert.equal(effect.envelope.holdSeconds,2);assert(effect.envelope.fadeEnd<=manifest.bodyDuration);}}
   else{const source=soundSources.find(s=>s.id===effect.name);assert(source?.usedBy.includes(key));assert.equal(source.sha256,effect.sourceSha256);assert.equal(sha(await fs.readFile(path.join(root,source.file))),source.sha256);}
  }
  if(manifest.preparation){assert.equal(manifest.preparation.allRetainedSamplesIdentical,true);assert(manifest.preparation.bodyQuietCuts.every(c=>c.maximumDbFS<=-42));assert.equal(manifest.montageAuthorization.finalTeacherApproval,false);}
  montages++;
 }
 const receipts=(await fs.readdir(path.join(root,'assets/audio/synthesis-batches'))).filter(f=>/^l\d+\.json$/.test(f));let seconds=0,requests=0;
 for(const file of receipts){const r=JSON.parse(await fs.readFile(path.join(root,'assets/audio/synthesis-batches',file),'utf8'));assert.equal(r.coverageCheck.pronunciationValidated,false);assert.equal(r.newRequests,1);assert(r.usage.total_output_tokens<16384);seconds+=r.rawSeconds;requests++;}
 const l06=JSON.parse(await fs.readFile(path.join(root,'assets/audio/synthesis-batches/l06.json'),'utf8'));assert.equal(l06.coverageCheck.uncertainTurns.length,1);assert.equal(l06.coverageCheck.uncertainTurns[0].text,'Hi vaig ara?');
 for(const page of ['l01','l02','l03','l13']){const comparisons=JSON.parse(await fs.readFile(path.join(root,`assets/audio/${page}-repair-comparisons.json`),'utf8'));assert(comparisons);}
 console.log(JSON.stringify({pass:true,montages,decodedClips:clips,requests,rawSeconds:seconds,teacherApprovalUnchanged:true,newRequests:0}));
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
