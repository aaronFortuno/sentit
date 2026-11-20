'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {ffmpegBinary,ffmpeg,checkWave}=require('./audio-files.cjs'),{duration}=require('./remaster-audio.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-s008-v3'),hash=bytes=>createHash('sha256').update(bytes).digest('hex');
function pcm(wav){checkWave(wav);for(let i=12;i+8<=wav.length;){const n=wav.readUInt32LE(i+4);if(wav.toString('ascii',i,i+4)==='data')return wav.subarray(i+8,i+8+n);i+=8+n+n%2;}throw Error('Missing PCM');}
(async()=>{
 const record=JSON.parse(await fs.readFile(path.join(root,'assets/audio/s008-production-manifest.json'),'utf8')),bin=await ffmpegBinary();
 assert.equal(record.newSynthesisRequests,0);assert.equal(record.voice.retimed,false);assert.equal(record.voice.unchangedFromV2,true);
 const original=await fs.readFile(path.resolve(root,'../output/sentit-remaster-v2/S008-body-dry.wav')),current=await fs.readFile(path.join(work,'body-dry.wav'));
 assert.deepEqual(pcm(current),pcm(original));assert.equal(hash(current),record.voice.dryBodySha256);
 assert.deepEqual(pcm(await fs.readFile(path.join(work,'intro.wav'))),pcm(await fs.readFile(path.resolve(root,'../output/sentit-remaster-v2/S008-intro.wav'))));
 for(const source of record.sources)assert.equal(hash(await fs.readFile(path.resolve(root,'../output',source.file))),source.sha256);
 assert.equal(hash(await fs.readFile(path.join(root,'assets/audio',record.previousMaster.file))),record.previousMaster.sha256);
 assert.equal(hash(await fs.readFile(path.join(root,'assets/audio',record.file))),record.sha256);
 const e=record.effects[0].envelope;assert(e.riseAfterSpeech.start>e.voiceEnd);assert(Math.abs(e.holdAfterSpeech.end-e.holdAfterSpeech.start-2)<1e-8);assert.equal(e.silentTail,.65);
 const bed=pcm(await fs.readFile(path.join(work,'bed.wav')));
 const rms=(start,end)=>{let sum=0,count=0;for(let i=Math.round(start*48000)*2;i<Math.round(end*48000)*2;i+=2){sum+=bed.readInt16LE(i)**2;count++;}return Math.sqrt(sum/count);};
 const delta=20*Math.log10(rms(e.holdAfterSpeech.start,e.holdAfterSpeech.end)/rms(e.holdAfterSpeech.start-4,e.holdAfterSpeech.end-4));assert(delta>7&&delta<9,'Music actually rises by about 8 dB');
 for(const [file,expected]of[[record.file,record.fullDuration],[record.introFile,record.offset],[record.bodyFile,record.bodyDuration]]){
  const decoded=path.join(work,'qa-'+file+'.wav');ffmpeg(bin,['-v','error','-xerror','-y','-i',path.join(root,'assets/audio',file),'-ac','1','-ar','48000','-c:a','pcm_s16le',decoded]);
  assert(Math.abs(await duration(decoded)-expected)<.05);const data=pcm(await fs.readFile(decoded));let peak=0;for(let i=data.length-9600;i<data.length;i+=2)peak=Math.max(peak,Math.abs(data.readInt16LE(i)));assert(peak<10,file+' silent tail');
 }
 assert(record.lufs>=-24&&record.lufs<=-15&&record.peakDbTP<=-1);
 if(record.state==='published'){
  const {productionProgress}=await import('../content/production-progress.js'),{activities}=await import('../catalogue.js'),{editorialFingerprint,isEditoriallyReviewed}=await import('../editorial-review.js'),entry=activities.find(e=>e.code==='S008'),approval=productionProgress['ca-S008'];
  assert.equal(entry.status,'published');assert.equal(entry.reviewStatus,'validated');assert(isEditoriallyReviewed(entry));assert.equal(approval.audioSha256,record.sha256);assert.equal(approval.editorialFingerprint,await editorialFingerprint(entry));assert.equal(approval.listeningApproval,true);assert(record.teacherValidation.conditionalOnMusicalTail);
 }
 console.log('PASS · S008: identical dry speech and introduction, original sources, three MP3 decode and timings, measured music rise '+delta.toFixed(1)+' dB, two-second hold, fade and silent tails. Zero synthesis.');
})().catch(error=>{console.error(error);process.exitCode=1;});
