'use strict';
// Technical checks never replace the teacher's listening approval.
const fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict'),{createHash}=require('node:crypto');
const {ffmpeg,ffmpegBinary}=require('./audio-files.cjs'),{waveParts}=require('./gemini-result.cjs');
const root=path.resolve(__dirname,'..'),sha=b=>createHash('sha256').update(b).digest('hex');
(async()=>{
 const {activities}=await import('../catalogue.js'),{productionProgress}=await import('../content/production-progress.js'),{musicCatalogue}=await import('../content/music-catalogue.js'),{modularAudio}=await import('../content/modular-audio.js');
 const entry=activities.find(e=>e.code==='S130'),progress=productionProgress['ca-S130'],report=JSON.parse(await fs.readFile(path.join(root,'assets/audio/s130-production-manifest.json'),'utf8'));
 assert.equal(entry.reviewStatus,'audio-review');assert.equal(progress.state,'montage-awaiting-listening');assert.equal(progress.listeningApproval,false);assert.equal(progress.montageHold,undefined);assert.equal(progress.voiceApproval.status,'approved');assert.equal(progress.voiceApproval.sourceTakeSha256,report.takeSha256);
 assert.equal(report.newSynthesisRequests,0);assert.equal(report.voiceRetimed,false);assert.equal(report.effects.length,1);
 const music=report.effects[0],registered=musicCatalogue.find(m=>m.usedBy.includes('ca-S130'));
 assert.equal(music.libraryId,'M1');assert.equal(registered.id,music.compositionId);assert.equal(music.license,'CC BY 4.0');assert.equal(music.listeningValidation,'pending');assert.equal(music.envelope.holdSeconds,2);assert(report.bodyDuration-music.envelope.fadeEnd<.65);assert.equal(music.sourceSha256,registered.sourceSha256);
 const take=JSON.parse(await fs.readFile(path.resolve(root,'../output/sentit-primera-tanda/mixed-batches/takes.json'),'utf8'))['S130-T01'];
 assert.equal(sha(await fs.readFile(take.file)),report.takeSha256);
 for(const kind of ['body','title']){
  const input=kind==='title'?take.intro:take.body,handle=report.voiceHandles[kind],decoded=waveParts(await fs.readFile(input.file)),rate=decoded.format.readUInt32LE(4),frame=decoded.format.readUInt16LE(12);
  assert.equal(handle.sourceSha256,input.sha256);assert.equal(handle.allRetainedSamplesIdentical,true);
  const pcm=decoded.pcm.subarray(Math.round(handle.start*rate)*frame,Math.round(handle.end*rate)*frame);assert.equal(sha(pcm),handle.retainedPcmSha256);
 }
 const binary=await ffmpegBinary();for(const file of [report.file,report.introFile,report.bodyFile])ffmpeg(binary,['-v','error','-xerror','-i',path.join(root,'assets/audio',file),'-f','null','-']);
 assert.equal(sha(await fs.readFile(path.join(root,'assets/audio',report.file))),report.sha256);assert.equal(report.sha256,progress.audioSha256);assert(report.lufs>=-21&&report.lufs<=-18);assert(report.peakDbTP<=-2);
 const folder=path.resolve(root,'../output/sentit-primera-tanda/s130/mixed-v1');
 const loudness=(file,start)=>{const log=ffmpeg(binary,['-ss',String(start),'-t','8','-i',file,'-af','loudnorm=I=-19:print_format=json','-f','null','-']);return Number(JSON.parse(log.slice(log.lastIndexOf('{'),log.lastIndexOf('}')+1)).input_i);};
 const balance=[];for(const start of [8,30,55,80,99]){const voice=loudness(path.join(folder,'voice-complete.wav'),start),bed=loudness(path.join(folder,'library-music-bed.wav'),start);assert(voice-bed>=18,JSON.stringify({start,voice,bed}));balance.push(Number((voice-bed).toFixed(1)));}
 const published=JSON.parse(await fs.readFile(path.join(root,'content/public-audio.json'),'utf8'));
 assert(!published.files.some(f=>f.file==='assets/audio/'+report.file));
 for(const kind of ['introduction','body'])assert(published.files.some(f=>'./'+f.file===entry.tracks[kind]));assert.equal(modularAudio['ca-S130'].master,entry.audio);
 console.log(JSON.stringify({pass:true,code:'S130',seconds:report.fullDuration,music:'M1',voiceAboveMusicDb:balance,voiceSamplesPreserved:true,modularOnly:true,teacherMontageApproval:'pending',newRequests:0}));
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
