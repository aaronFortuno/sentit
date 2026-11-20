'use strict';
// Audition-only original compositions. Never changes production masters or v1.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {ffmpegBinary,ffmpeg,checkWave}=require('./audio-files.cjs');
const RATE=48000,root=path.resolve(__dirname,'..'),rawDir=path.resolve(root,'../output/sentit-sintonies'),assetDir=path.join(root,'assets/audio');
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const presets=[
 {id:'fil-de-veu',title:'Fil de veu',style:'Càlid i reposat',bpm:82,key:'Sol major',duration:[4.2,3.8],instrument:'keys',room:.11,
  description:'Piano elèctric sintetitzat, acords oberts i notes espaiades. Una entrada tranquil·la, sense percussió.',
  melody:[[0,67],[1,71],[2,74],[3,69],[3.75,67]],closing:[[0,74],[.8,71],[1.6,69],[2.6,67]],
  chords:[[0,[43,55,59,62]],[2,[48,55,59,64]],[3.75,[43,55,59,64]]],outChords:[[0,[50,57,62,66]],[2.6,[43,55,59,64]]]},
 {id:'pas-a-pas',title:'Pas a pas',style:'Rítmic i juganer',bpm:116,key:'Re major',duration:[3.8,3.4],instrument:'pluck',room:.035,
  description:'Percussió de fusta sintetitzada, petits contratemps i baix curt. Més moviment i un final sec.',
  melody:[[0,50],[.75,57],[1.5,62],[2.25,57],[3,66],[4,62]],closing:[[0,62],[.75,57],[1.5,54],[3,50]],
  chords:[],outChords:[]},
 {id:'ona-curta',title:'Ona curta',style:'Electrònic i lluminós',bpm:124,key:'La major',duration:[4,3.6],instrument:'pulse',room:.08,
  description:'Un motiu de sintetitzador suau, arpegi estèreo i coixí harmònic. Un aire de programa de ràdio.',
  melody:[[0,69],[.5,76],[1,73],[1.75,78],[2.5,76],[3.25,73],[4.5,69]],closing:[[0,76],[.5,73],[1.25,71],[2.25,73],[3.5,69]],
  chords:[[0,[45,57,61,64]],[2.5,[50,57,61,66]],[4.5,[45,57,61,66]]],outChords:[[0,[52,59,64,68]],[3.5,[45,57,61,66]]]},
];
function tone(channels,time,midi,gain,pan,kind,length){
 const hz=440*2**((midi-69)/12),start=Math.round(time*RATE),count=Math.min(Math.round(length*RATE),channels[0].length-start);
 const l=Math.cos((pan+1)*Math.PI/4),r=Math.sin((pan+1)*Math.PI/4);
 for(let n=0;n<count;n++){
  const t=n/RATE,phase=2*Math.PI*hz*t,release=Math.min(1,(length-t)/.16);let value;
  if(kind==='pad')value=(Math.sin(phase)+.09*Math.sin(phase*2.001))*Math.min(1,t/.22)*Math.min(1,(length-t)/.4)*.42;
  else if(kind==='keys')value=(Math.sin(phase)*Math.exp(-t/.65)+.22*Math.sin(phase*2.001)*Math.exp(-t/.3)+.06*Math.sin(phase*3.003)*Math.exp(-t/.15))*(1-Math.exp(-t/.009))*release;
  else if(kind==='pluck')value=(Math.sin(phase)+.16*Math.sin(phase*2)+.05*Math.sin(phase*3))*(1-Math.exp(-t/.004))*Math.exp(-t/.19)*release;
  else value=(Math.sin(phase)+.17*Math.sin(phase*2)+.08*Math.sin(phase*3)+.025*Math.sin(phase*5))*(1-Math.exp(-t/.012))*Math.exp(-t/.32)*release;
  channels[0][start+n]+=gain*value*l;channels[1][start+n]+=gain*value*r;
 }
}
function percussion(channels,time,kind,gain,pan){
 const length=kind==='kick'?.24:.13,start=Math.round(time*RATE),count=Math.min(Math.round(length*RATE),channels[0].length-start);
 for(let n=0;n<count;n++){
  const t=n/RATE,env=(1-Math.exp(-t/.002))*Math.exp(-t/(kind==='kick'?.052:.023))*Math.min(1,(length-t)/.02);
  const value=kind==='kick'?Math.sin(2*Math.PI*(54*t+8*(1-Math.exp(-t*35)))):Math.sin(2*Math.PI*960*t)+.35*Math.sin(2*Math.PI*1543*t);
  channels[0][start+n]+=gain*value*env*Math.cos((pan+1)*Math.PI/4);channels[1][start+n]+=gain*value*env*Math.sin((pan+1)*Math.PI/4);
 }
}
function render(preset,closing){
 const duration=preset.duration[closing?1:0],channels=[new Float64Array(Math.round(duration*RATE)),new Float64Array(Math.round(duration*RATE))],beat=60/preset.bpm;
 const melody=closing?preset.closing:preset.melody,chords=closing?preset.outChords:preset.chords;
 for(const [i,[at,midi]] of melody.entries())tone(channels,.12+at*beat,midi,preset.instrument==='pluck'?.18:.2,i%2?.18:-.18,preset.instrument,preset.instrument==='keys'?1.35:.95);
 for(const [at,notes] of chords)for(const [i,midi] of notes.entries())tone(channels,.12+at*beat+i*.018,midi,.032,-.3+i*.2,preset.instrument==='keys'?'keys':'pad',Math.min(2.1,duration-.25-at*beat));
 if(preset.id==='pas-a-pas'){
  for(const [at,kind,gain,pan] of [[0,'kick',.13,0],[.5,'wood',.04,-.35],[1.5,'wood',.065,.3],[2,'kick',.10,0],[2.75,'wood',.045,-.2],[3.5,'wood',.07,.2]])percussion(channels,.12+at*beat,kind,gain,pan);
 }
 const dry=channels.map(c=>c.slice());
 for(const [delay,gain] of [[.047,preset.room],[.101,preset.room*.55]]){
  const shift=Math.round(delay*RATE);for(let n=shift;n<channels[0].length;n++){channels[0][n]+=dry[1][n-shift]*gain;channels[1][n]+=dry[0][n-shift]*gain;}
 }
 const wav=Buffer.alloc(44+channels[0].length*4);wav.write('RIFF');wav.writeUInt32LE(wav.length-8,4);wav.write('WAVEfmt ',8);wav.writeUInt32LE(16,16);wav.writeUInt16LE(1,20);wav.writeUInt16LE(2,22);wav.writeUInt32LE(RATE,24);wav.writeUInt32LE(RATE*4,28);wav.writeUInt16LE(4,32);wav.writeUInt16LE(16,34);wav.write('data',36);wav.writeUInt32LE(wav.length-44,40);
 for(let n=0;n<channels[0].length;n++)for(let c=0;c<2;c++){
  const t=n/RATE,envelope=t<.08||t>=duration-.12?0:Math.min(1,(duration-.12-t)/.22),v=channels[c][n]*envelope;
  if(Math.abs(v)>=.99)throw Error('Saturació al cru '+preset.id);wav.writeInt16LE(Math.round(v*32767),44+n*4+c*2);
 }
 return {wav,duration,melody:melody.map(([at,midi])=>({beat:at,midi}))};
}
function loudness(log){const text=log.match(/\{\s*"input_i"[\s\S]*?\}/g)?.at(-1);if(!text)throw Error('No es pot mesurar la sonoritat.');const result=JSON.parse(text);if(!Number.isFinite(Number(result.input_i)))throw Error('Sonoritat no finita.');return result;}
async function main(){
 await fs.mkdir(rawDir,{recursive:true});await fs.mkdir(assetDir,{recursive:true});const binary=await ffmpegBinary(),proposals=[];
 for(const preset of presets){const files=[],base='mireia-'+preset.id+'-v1';
  for(const [i,kind] of ['obertura','tancament'].entries()){
   const {wav,duration,melody}=render(preset,i===1);checkWave(wav);const raw=path.join(rawDir,base+'-'+kind+'-cru.wav'),target=path.join(assetDir,base+'-'+kind+'.mp3');await fs.writeFile(raw,wav);
   const clean='highpass=f=40,lowpass=f=10000',first=loudness(ffmpeg(binary,['-i',raw,'-af',`${clean},loudnorm=I=-18:TP=-2.8:LRA=7:print_format=json`,'-f','null','-']));
   const normalize=`loudnorm=I=-18:TP=-2.8:LRA=7:measured_I=${first.input_i}:measured_TP=${first.input_tp}:measured_LRA=${first.input_lra}:measured_thresh=${first.input_thresh}:offset=${first.target_offset}:linear=true`;
   ffmpeg(binary,['-v','error','-y','-i',raw,'-af',`${clean},${normalize}`,'-ar',String(RATE),'-ac','2','-c:a','libmp3lame','-b:a','128k','-map_metadata','-1',target]);
   const log=ffmpeg(binary,['-xerror','-i',target,'-af','astats=metadata=0:reset=0,silencedetect=noise=-60dB:d=0.025,loudnorm=I=-18:TP=-2.8:LRA=7:print_format=json','-f','null','-']),measured=loudness(log);
   const samples=Number([...log.matchAll(/Number of samples:\s*(\d+)/g)].at(-1)?.[1]),silences=[...log.matchAll(/silence_end:\s*([\d.]+)\s*\|\s*silence_duration:\s*([\d.]+)/g)].map(m=>Number(m[2]));
   if(Math.abs(samples/RATE-duration)>.025||Number(measured.input_i)<-20||Number(measured.input_i)>-16||Number(measured.input_tp)>-2||silences[0]<.06||silences.at(-1)<.075)throw Error('Comprovació fallida: '+base+' '+kind);
   files.push({kind,file:'assets/audio/'+path.basename(target),durationSeconds:samples/RATE,integratedLufs:Number(measured.input_i),truePeakDbtp:Number(measured.input_tp),sampleRate:RATE,channels:2,safetySilenceSeconds:{start:silences[0],end:silences.at(-1)},sha256:hash(await fs.readFile(target)),rawSha256:hash(wav),decodeVerified:true,melody});
  }
  const record={id:base,title:preset.title,style:preset.style,description:preset.description,status:'proposal-pending-human-validation',approval:null,origin:{type:'original-procedural-composition',author:'Sentit',license:'MIT',source:'tools/propose-mireia-variants.cjs',externalSamples:false,speech:false,apiRequests:0},recipe:{tempoBpm:preset.bpm,key:preset.key,instrument:preset.instrument,production:'Síntesi local determinista, reflexions curtes, filtres, normalització en dues passades a −18 LUFS, MP3 estèreo 48 kHz/128 kbit/s.',masterGuard:'80 ms inicials i 120 ms finals de silenci, amb fosa abans de la cua.'},scope:'Només comparació; no incorporada a cap programa ni màster.',files};
  await fs.writeFile(path.join(assetDir,base+'.json'),JSON.stringify(record,null,2)+'\n');proposals.push(record);
 }
 await fs.writeFile(path.join(assetDir,'mireia-sintonies-comparacio.json'),JSON.stringify({status:'all-proposals-pending-validation',existing:'assets/audio/mireia-jingle-proposta-v1.json',newProposals:proposals.map(p=>({id:p.id,title:p.title,style:p.style,manifest:'assets/audio/'+p.id+'.json'})),newApiRequests:0},null,2)+'\n');
 console.log(JSON.stringify(proposals.map(p=>({title:p.title,files:p.files.map(f=>({kind:f.kind,seconds:f.durationSeconds,lufs:f.integratedLufs,peak:f.truePeakDbtp}))})),null,2));
}
if(require.main===module)main().catch(error=>{console.error(error.message);process.exitCode=1;});
module.exports={presets,render};
