'use strict';
// New deterministic compositions for the approved narration plans. MIT, Sentit.
// No borrowed melodies, external samples, speech generation or short audio loops.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {ffmpeg}=require('./audio-files.cjs');
const settings={S027:{title:"Tovalles al vent",root:50,tempo:66,seed:27},S034:{title:"Entre dues cortines",root:55,tempo:72,seed:34},S038:{title:"Un lloc a l’ombra",root:53,tempo:64,seed:38},S038D:{title:"Una tarda per explicar",root:58,tempo:68,seed:138},S043:{title:"Una línia a la façana",root:50,tempo:60,seed:43}};
Object.assign(settings,{S045:{title:'Cadires sota les estrelles',root:57,tempo:66,seed:45,speechGain:.14,fadeSeconds:2},S046:{title:'Una butxaca amb farina',root:53,tempo:64,seed:46,speechGain:.14,fadeSeconds:2},S047:{title:'Botons de tots colors',root:55,tempo:68,seed:47,speechGain:.14,fadeSeconds:2}});
const sha=b=>createHash('sha256').update(b).digest('hex'),RATE=24000;
function makeWave(pcm){const b=Buffer.alloc(44+pcm.length);b.write('RIFF');b.writeUInt32LE(b.length-8,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(RATE,24);b.writeUInt32LE(RATE*2,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(pcm.length,40);pcm.copy(b,44);return b;}
async function makeBed({code,title,folder,binary,duration,lead,voiceEnd}){
 const config=settings[code];if(!config)throw Error('Composició pendent per a '+code);const samples=new Float32Array(Math.ceil(duration*RATE)),scale=[0,2,4,5,7,9,11],progression=[0,3,5,4,0,1,3,4,5,3,4,0];let state=config.seed,notes=0;
 const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
 function tone(at,midi,length,gain,pad=false){const start=Math.round(at*RATE),count=Math.min(Math.round(length*RATE),samples.length-start),frequency=440*2**((midi-69)/12);for(let n=0;n<count;n++){const t=n/RATE,remain=length-t,attack=Math.min(1,t/(pad?.8:.018)),release=Math.min(1,remain/(pad?1.1:.32)),envelope=pad?attack*attack*(3-2*attack)*release:attack*Math.exp(-t/1.15)*release;const phase=2*Math.PI*frequency*t;samples[start+n]+=(Math.sin(phase)+.12*Math.sin(phase*2)+.035*Math.sin(phase*3))*gain*envelope;}notes++;}
 const chordSeconds=8*60/config.tempo;let chord=0;
 for(let at=0;at<voiceEnd;at+=chordSeconds,chord++){
  const degree=progression[(chord+config.seed)%progression.length],chordNotes=[0,2,4].map(step=>config.root+scale[(degree+step)%7]+12*Math.floor((degree+step)/7));
  for(const midi of chordNotes)tone(at,midi,chordSeconds+1.3,.007,true);
  tone(at+.2,chordNotes[0]-12,3.4,.018);
  const first=scale[Math.floor(random()*scale.length)],second=scale[Math.floor(random()*scale.length)];tone(at+.6+random()*.7,config.root+12+first,2.8,.045);if(chord%4!==3)tone(at+chordSeconds*.58+random()*.4,config.root+12+second,2.5,.034);
 }
 tone(voiceEnd+.35,config.root+12,3,.035);tone(voiceEnd+.65,config.root+16,2.7,.025);
 const pcm=Buffer.alloc(samples.length*2);for(let i=0;i<samples.length;i++)pcm.writeInt16LE(Math.round(Math.max(-.98,Math.min(.98,samples[i]))*32767),i*2);
 const raw=path.join(folder,'music-original.wav'),normalized=path.join(folder,'music-base.wav'),file=path.join(folder,'music-bed.wav');await fs.writeFile(raw,makeWave(pcm));
 ffmpeg(binary,['-v','error','-y','-i',raw,'-af','highpass=f=65,lowpass=f=4200,loudnorm=I=-26:TP=-4:LRA=6,aresample=48000','-ac','1','-c:a','pcm_s16le',normalized]);
 const duckStart=Math.max(.3,lead-.9),duckEnd=lead-.15,riseStart=voiceEnd+.35,riseEnd=voiceEnd+1.15,fadeStart=riseEnd+2,fadeSeconds=config.fadeSeconds??1.15,fadeEnd=fadeStart+fadeSeconds,speechGain=config.speechGain??.26,drop=.7-speechGain;
 if(fadeEnd>duration-.2)throw Error('Cua insuficient per a la fosa musical.');
 const gain=`if(lt(t,${duckStart}),0.7,if(lt(t,${duckEnd}),0.7-${drop}*(t-${duckStart})/(${duckEnd-duckStart}),if(lt(t,${riseStart}),${speechGain},if(lt(t,${riseEnd}),${speechGain}+${drop}*(t-${riseStart})/(${riseEnd-riseStart}),0.7))))`;
 ffmpeg(binary,['-v','error','-y','-i',normalized,'-af',`volume='${gain}':eval=frame,afade=t=in:d=0.6,afade=t=out:st=${fadeStart}:d=${fadeSeconds}`,'-ar','48000','-ac','1','-c:a','pcm_s16le',file]);
 return {file,effect:{name:'gentle-narration-bed',origin:'original-procedural-composition',author:'Sentit',license:'MIT',source:'tools/narration-bed.cjs',title:config.title??title,compositionId:'sentit-'+code.toLowerCase()+'-v1',tempoBpm:config.tempo,rootMidi:config.root,scoreSeed:config.seed,notes,externalSamples:false,noSpeech:true,retimed:false,sha256:sha(await fs.readFile(file)),envelope:{fadeInSeconds:.6,duckStart,duckEnd,speechGain,nominalSpeechMusicLufs:-26+20*Math.log10(speechGain),riseStart,riseEnd,holdSeconds:2,fadeStart,fadeEnd},listeningValidation:'pending'}};
}
module.exports={makeBed};
