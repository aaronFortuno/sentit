'use strict';
const fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict'),{createHash}=require('node:crypto');
const {ffmpeg,ffmpegBinary}=require('./audio-files.cjs');
const root=path.resolve(__dirname,'..'),sha=b=>createHash('sha256').update(b).digest('hex');
(async()=>{
 const {activities}=await import('../catalogue.js'),{productionProgress}=await import('../content/production-progress.js'),{soundSources}=await import('../content/sound-sources.js'),{musicCatalogue}=await import('../content/music-catalogue.js'),{mixedAudioResources}=await import('../content/mixed-audio-resources.js'),binary=await ffmpegBinary();let montages=0,clips=0;
 for(const entry of activities){
  const manifest=await fs.readFile(path.join(root,`assets/audio/${entry.code.toLowerCase()}-production-manifest.json`),'utf8').then(JSON.parse).catch(e=>{if(e.code==='ENOENT')return null;throw e;});
  if(!manifest||!['shared-mixed-batch','assembled-grouped-voices'].includes(manifest.productionMode))continue;
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
   if(effect.origin==='original-procedural-composition'){assert.equal(effect.license,'MIT');if(effect.compositionId){assert(musicCatalogue.some(m=>m.id===effect.compositionId&&m.usedBy.includes(key)));assert.equal(effect.envelope.holdSeconds,2);assert(effect.envelope.fadeEnd<=manifest.bodyDuration);}}
   else{const source=soundSources.find(s=>s.id===effect.name);assert(source?.usedBy.includes(key));assert.equal(source.sha256,effect.sourceSha256);assert.equal(sha(await fs.readFile(path.join(root,source.file))),source.sha256);}
  }
  montages++;
 }
 const receipts=(await fs.readdir(path.join(root,'assets/audio/synthesis-batches'))).filter(f=>/^l\d+\.json$/.test(f));let seconds=0,requests=0;
 for(const file of receipts){const r=JSON.parse(await fs.readFile(path.join(root,'assets/audio/synthesis-batches',file),'utf8'));assert.equal(r.coverageCheck.pronunciationValidated,false);assert.equal(r.newRequests,1);assert(r.usage.total_output_tokens<16384);seconds+=r.rawSeconds;requests++;}
 const l06=JSON.parse(await fs.readFile(path.join(root,'assets/audio/synthesis-batches/l06.json'),'utf8'));assert.equal(l06.coverageCheck.uncertainTurns.length,1);assert.equal(l06.coverageCheck.uncertainTurns[0].text,'Hi vaig ara?');
 for(const page of ['l01','l02','l03','l13']){const comparisons=JSON.parse(await fs.readFile(path.join(root,`assets/audio/${page}-repair-comparisons.json`),'utf8'));assert(comparisons);}
 console.log(JSON.stringify({pass:true,montages,decodedClips:clips,requests,rawSeconds:seconds,teacherApprovalUnchanged:true,newRequests:0}));
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
