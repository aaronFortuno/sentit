'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const {ffmpegBinary,ffmpeg,checkWave}=require('./audio-files.cjs');
const {duration}=require('./remaster-audio.cjs');
const output=path.resolve(__dirname,'../../tmp/sentit-qa/sound-v0123');
function pcm(wave){
  checkWave(wave);
  for(let i=12;i+8<=wave.length;){const size=wave.readUInt32LE(i+4);if(wave.toString('ascii',i,i+4)==='data')return wave.subarray(i+8,i+8+size);i+=8+size+size%2;}
  throw Error('Sense PCM');
}
(async()=>{
  const bin=await ffmpegBinary();await fs.mkdir(output,{recursive:true});
  const manifest=require('../assets/audio/remaster-v2-manifest.json');
  for(const record of manifest.activities){
    assert(record.lufs>=-24&&record.lufs<=-15&&record.peakDbTP<=-1);
    const rawIntro=record.sources.find(source=>/intro-[a-f0-9]+\.wav$|locucio\.wav$/.test(source.file));
    assert(Math.abs(record.offset-rawIntro.seconds-1.75)<.0001,'The entire raw title plus margins is retained');
    for(const suffix of ['', '-intro', '-cos']){
      const name=record.file.replace('.mp3',suffix+'.mp3');
      const decoded=path.join(output,name+'.wav');
      ffmpeg(bin,['-v','error','-xerror','-y','-i',path.resolve(__dirname,'../assets/audio',name),'-ac','1','-ar','48000','-c:a','pcm_s16le',decoded]);
      const audio=pcm(await fs.readFile(decoded));
      const peak=(start,end)=>{let max=0;for(let i=start;i<end;i+=2)max=Math.max(max,Math.abs(audio.readInt16LE(i)));return max;};
      assert(peak(audio.length-4800*2,audio.length)<10,name+' retains a silent tail');
      if(suffix!=='-cos')assert(peak(0,4800*2)<10,name+' retains a silent attack margin');
      const seconds=await duration(decoded), expected=suffix==='-intro'?record.offset:suffix==='-cos'?record.bodyDuration:record.fullDuration;
      assert(Math.abs(seconds-expected)<.05,name+' timing matches metadata');
    }
  }
  for(const name of ['ca-lectura-temps-variable-v2','ca-lectura-un-minut-v2','ca-repassa-les-respostes-v2','sentit-jingle-v1']){
    ffmpeg(bin,['-v','error','-xerror','-i',path.resolve(__dirname,'../assets/audio',name+'.mp3'),'-f','null','-']);
  }
  console.log('PASS · 13 MP3 decode fully; raw titles retained, silent safety margins, full tails, exact track timings and safe master loudness. Listening review remains necessary.');
})().catch(error=>{console.error(error);process.exitCode=1;});
