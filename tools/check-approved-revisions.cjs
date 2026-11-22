'use strict';
const fs=require('node:fs/promises'),path=require('node:path'),assert=require('node:assert/strict'),{createHash}=require('node:crypto');
const {waveParts}=require('./gemini-result.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda'),sha=b=>createHash('sha256').update(b).digest('hex');
(async()=>{
 const {productionProgress:p}=await import('../content/production-progress.js');
 for(const code of ['S016','S023']){
  const m=JSON.parse(await fs.readFile(path.join(root,'assets/audio/'+code.toLowerCase()+'-production-manifest.json'))),r=m.synthesisRepair,folder=path.join(work,code.toLowerCase());assert(r?.teacherApproval);assert.equal(r.newRequests,0);assert.equal(r.voiceRetimed,false);assert.equal(r.pitchShifted,false);
  let raw;for(const name of (await fs.readdir(folder)).filter(n=>n.endsWith('.wav'))){const b=await fs.readFile(path.join(folder,name));if(sha(b)===r.originalRawSha256){raw=waveParts(b);break;}}assert(raw);
  const body=waveParts(await fs.readFile(path.join(folder,'approved-repair-v3/body-input.wav'))),rate=raw.format.readUInt32LE(4),frame=raw.format.readUInt16LE(12),cut=Math.round(m.cut.at*rate)*frame,a=Math.round(r.originalRange.start*rate)*frame,b=Math.round(r.originalRange.end*rate)*frame,inserted=Math.round((r.candidateRange.end-r.candidateRange.start)*rate)*frame;
  assert.equal(sha(body.pcm),r.bodyPcmSha256);assert(body.pcm.subarray(0,a-cut).equals(raw.pcm.subarray(cut,a)));assert(body.pcm.subarray(a-cut+inserted).equals(raw.pcm.subarray(b)),'All other voice samples must remain identical');
  assert(p['ca-'+code].receivedRepairs.find(x=>x.part===r.part).applied);assert.equal(p['ca-'+code].listeningApproval,false);assert.equal(p['ca-'+code].state,'montage-awaiting-listening');
 }
 const m=JSON.parse(await fs.readFile(path.join(root,'assets/audio/s017-production-manifest.json'))),edit=m.nonverbalRevision;assert(edit.fullMasterRange.start>=148&&edit.fullMasterRange.end<=161);assert(edit.sourceRawRange.start>edit.protectedPreviousSpeechEnd+.2);assert(edit.sourceRawRange.end<edit.protectedNextSpeechStart-.2);assert.equal(p['ca-S017'].state,'audio-corrections-pending');assert.deepEqual(p['ca-S017'].plannedRepair.parts,['coordinacio','retorn']);assert.equal(p['ca-S017'].plannedRepair.voice,'Aoede');
 const before=waveParts(await fs.readFile(path.join(work,'s017/mixed-v1/body-master.wav'))),after=waveParts(await fs.readFile(path.join(work,'s017/breaths-v2/body-master.wav'))),rate=before.format.readUInt32LE(4),frame=before.format.readUInt16LE(12),a=Math.round((edit.fullMasterRange.start-m.offset)*rate)*frame,b=Math.round((edit.fullMasterRange.end-m.offset)*rate)*frame,cross=Math.round(edit.crossfadeSeconds*rate)*frame;
 assert(after.pcm.subarray(0,a-cross).equals(before.pcm.subarray(0,a-cross)));assert(after.pcm.subarray(a).equals(before.pcm.subarray(b+cross)),'Existing speech and ambient after the removed padding are unchanged');
 console.log('PASS · S016/S023 exact approved splices preserve every other raw sample; S017 removes only the reported nonverbal gap and keeps the existing mix. Final listening remains pending. No synthesis.');
})().catch(e=>{console.error(e);process.exitCode=1;});
