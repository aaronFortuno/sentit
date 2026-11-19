'use strict';
const assert=require('node:assert/strict');const fs=require('node:fs/promises');const path=require('node:path');const {createHash}=require('node:crypto');
const {ffmpegBinary,ffmpeg}=require('./audio-files.cjs');const {duration}=require('./remaster-audio.cjs');
const {packedRadioRequest,spec}=require('./radio-production.cjs');const {fingerprint}=require('./production-approval.cjs');
(async()=>{
  const {fotoRadio:entry}=await import('../content/la-foto-que-faltava-radio.js');const {restauradora}=await import('../content/una-restauradora-ens-explica-el-seu-ofici.js');
  const {packedInterviewRequest}=require('./interview-production.cjs');
  const report=require('../assets/audio/s008r-production-manifest.json'),plans=require('../content/production-plans.json');
  assert.equal(report.newSynthesisRequests,1);assert.equal(report.approvalFingerprint,fingerprint(entry,spec,plans.S008R));
  assert.equal(report.usage.total_input_tokens,513);assert.equal(report.usage.total_output_tokens,2373);
  const body=packedRadioRequest(entry);assert.equal(body.input[0].content.length,1);
  const expected=entry.transcript.filter(p=>p.speaker).map(p=>p.text).join(' ');
  assert.equal(body.input[0].content[0].text.replace(/<short pause>/g,'').replace(/\s+/g,' ').trim(),expected);
  const interview=packedInterviewRequest(restauradora);
  assert.deepEqual(interview.generation_config.speech_config.speakers,[{speaker:'Entrevistador',voice:'Puck'},{speaker:'Nora',voice:'Kore'}]);
  assert(interview.input[0].content[0].text.startsWith(restauradora.introduction+' <long pause>'));
  assert(!JSON.stringify(interview).includes('Entrada de l’entrevista:'));
  assert.equal(restauradora.reviewStatus,'pending');
  const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
  assert.equal(hash(await fs.readFile(path.resolve(__dirname,'..',entry.tracks.introduction))),report.sourceIntroSha256);
  assert.equal(hash(await fs.readFile(path.resolve(__dirname,'..',entry.audio))),report.sha256);
  assert(Math.abs(report.bodyDuration-report.voice.start-report.voice.duration-2.6)<.001);
  assert(report.lufs>=-24&&report.lufs<=-15&&report.peakDbTP<=-1);
  const binary=await ffmpegBinary(),folder=path.resolve(__dirname,'../../tmp/sentit-qa/radio-v0125');await fs.mkdir(folder,{recursive:true});
  for(const [name,file,seconds]of [['body',entry.tracks.body,report.bodyDuration],['full',entry.audio,report.fullDuration]]){
    const decoded=path.join(folder,name+'.wav');ffmpeg(binary,['-v','error','-xerror','-y','-i',path.resolve(__dirname,'..',file),'-ar','48000','-ac','1','-c:a','pcm_s16le',decoded]);
    assert(Math.abs(await duration(decoded)-seconds)<.05);
    const wave=await fs.readFile(decoded);const samples=wave.subarray(wave.length-4800*2);let peak=0;for(let i=0;i<samples.length;i+=2)peak=Math.max(peak,Math.abs(samples.readInt16LE(i)));assert(peak<10,'Silent tail retained');
  }
  console.log('PASS · Approved radio script, one 513/2373-token request, conserved title, full voice and tails, master integrity, local effects and next interview packed into one two-voice request.');
})().catch(error=>{console.error(error);process.exitCode=1;});
