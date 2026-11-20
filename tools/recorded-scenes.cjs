'use strict';
// Offline edits of attributed recordings. No speech synthesis or credentials.
const path=require('node:path');
const {ffmpeg}=require('./audio-files.cjs'),{duration}=require('./remaster-audio.cjs');
function level(binary,file,start,seconds){
 const log=ffmpeg(binary,['-ss',String(start),'-i',file,'-t',String(seconds),'-af','volumedetect','-f','null','-']);
 return {meanDbFS:Number(/mean_volume: ([^ ]+) dB/.exec(log)?.[1]),peakDbFS:Number(/max_volume: ([^ ]+) dB/.exec(log)?.[1])};
}
function attribution(recording){return {origin:'external-recording',source:recording.file,sourceId:recording.id,sourceSha256:recording.sha256,sourceUrl:recording.url,author:recording.author,license:recording.license,licenseUrl:recording.licenseUrl};}
async function kitchenBed({root,binary,wav,recording,voice,lead,voiceEnd,tail}){
 const total=voiceEnd+tail,source=path.join(root,recording.file);
 const base=wav('kitchen-recording-normalized',['-i',source,'-af','highpass=f=80,lowpass=f=6800,loudnorm=I=-25:TP=-9:LRA=6,aresample=48000,alimiter=limit=0.25:level=false']);
 const sourceDuration=await duration(base),crossfade=1;
 if(sourceDuration*2-crossfade<total)throw Error('La gravació de cuina no cobreix el muntatge previst amb dues passades.');
 const loop=wav('kitchen-recording-loop',['-i',base,'-i',base,'-filter_complex',`[0:a][1:a]acrossfade=d=${crossfade}:c1=tri:c2=tri,atrim=duration=${total}[out]`,'-map','[out]']);
 const fadeIn=.65,duckStart=2,duckEnd=3,riseStart=voiceEnd+.15,riseEnd=voiceEnd+.65,fadeStart=voiceEnd+2.75,fadeEnd=total-.65;
 const intro=.72,speech=.1,outro=.8;
 const envelope=`if(lt(t,${fadeIn}),${intro}*t/${fadeIn},if(lt(t,${duckStart}),${intro},if(lt(t,${duckEnd}),${intro}+(${speech}-${intro})*(t-${duckStart})/(${duckEnd}-${duckStart}),if(lt(t,${riseStart}),${speech},if(lt(t,${riseEnd}),${speech}+(${outro}-${speech})*(t-${riseStart})/(${riseEnd}-${riseStart}),if(lt(t,${fadeStart}),${outro},if(lt(t,${fadeEnd}),${outro}*(${fadeEnd}-t)/(${fadeEnd}-${fadeStart}),0)))))))`;
 const file=wav('real-kitchen-ambience',['-i',loop,'-af',`volume='${envelope}':eval=frame`]);
 const from=lead+3,seconds=voiceEnd-from-2,bedLevel=level(binary,file,from,seconds),voiceLevel=level(binary,voice,from,seconds),margin=voiceLevel.meanDbFS-bedLevel.meanDbFS;
 if(!(margin>=22&&bedLevel.peakDbFS<=-28))throw Error('L’ambient de cuina no deixa prou marge a les veus.');
 return {file,effect:{name:'real-kitchen-ambience',start:0,end:fadeEnd,...attribution(recording),retimed:false,pitchShifted:false,sourceDuration,passes:2,crossfadeSeconds:crossfade,sourceNormalization:'-25 LUFS target; -12 dBFS peak ceiling',speechWindowMeanDbFS:bedLevel.meanDbFS,speechWindowPeakDbFS:bedLevel.peakDbFS,speechWindowVoiceMeanDbFS:voiceLevel.meanDbFS,speechWindowMarginDb:margin,envelope:{fadeIn:{start:0,end:fadeIn},duckBeforeSpeech:{start:duckStart,end:duckEnd},speechGain:speech,riseAfterSpeech:{start:riseStart,end:riseEnd},holdAfterSpeech:{start:riseEnd,end:fadeStart},fadeOut:{start:fadeStart,end:fadeEnd},silentTail:.65},listeningValidation:'pending'}};
}
async function guitarSequence({root,binary,wav,recording,voice,lead,voiceEnd,tail,speechStart}){
 const source=path.join(root,recording.file),seconds=recording.excerpt.end-recording.excerpt.start,total=voiceEnd+tail;
 const base=wav('loose-guitar-amplified',['-i',source,'-af',`atrim=start=${recording.excerpt.start}:end=${recording.excerpt.end},asetpts=PTS-STARTPTS,volume=1.6,alimiter=limit=0.55:level=false`]);
 const intro=[0,.85,2.05,3.7].map(start=>({phase:'opening',start,semitones:0}));
 const ending=[{start:voiceEnd+.3,semitones:-1.2},{start:voiceEnd+1.55,semitones:-.5},{start:voiceEnd+3.6,semitones:.1}].map(event=>({...event,phase:'ending'}));
 const events=[...intro,...ending],clips=[];
 for(const [i,event]of events.entries()){
  if(!event.semitones){clips.push(base);continue;}
  const ratio=2**(event.semitones/12);
  clips.push(wav('guitar-tuning-'+i,['-i',base,'-af',`asetrate=${48000*ratio},aresample=48000,atempo=${1/ratio},apad=whole_dur=${seconds},atrim=duration=${seconds}`]));
 }
 const duckStart=speechStart-.5,duckEnd=speechStart-.1;
 const envelope=`if(lt(t,${duckStart}),1,if(lt(t,${duckEnd}),1-(1-0.045)*(t-${duckStart})/(${duckEnd}-${duckStart}),if(lt(t,${voiceEnd+.2}),0.045,1)))`;
 const filter=events.map((event,i)=>`[${i}:a]adelay=${Math.round(event.start*1000)}:all=1[g${i}]`).join(';')+';'+events.map((_,i)=>`[g${i}]`).join('')+`amix=inputs=${events.length}:duration=longest:normalize=0,apad=whole_dur=${total},atrim=duration=${total},volume='${envelope}':eval=frame,alimiter=limit=0.5:level=false,afade=t=in:d=0.01,afade=t=out:st=${total-1.6}:d=1[out]`;
 const file=wav('real-loose-guitar-sequence',[...clips.flatMap(file=>['-i',file]),'-filter_complex',filter,'-map','[out]']);
 const overlapEnd=intro.at(-1).start+seconds,overlapSeconds=overlapEnd-speechStart;
 const guitarLevel=level(binary,file,speechStart,overlapSeconds),voiceLevel=level(binary,voice,speechStart,overlapSeconds),margin=voiceLevel.meanDbFS-guitarLevel.meanDbFS;
 if(!(margin>=18&&guitarLevel.peakDbFS<=-26))throw Error('La guitarra tapa l’inici d’en Biel.');
 return {file,effect:{name:'real-loose-guitar-sequence',start:0,end:ending.at(-1).start+seconds,...attribution(recording),excerpt:recording.excerpt,gainBeforeLimiter:1.6,openingSourceTimeUnchanged:true,events:events.map(event=>({...event,end:event.start+seconds,pitchShifted:Boolean(event.semitones),durationPreserved:true})),voiceRetimed:false,speechStart,speechOverlapSeconds:overlapSeconds,speechWindowMeanDbFS:guitarLevel.meanDbFS,speechWindowPeakDbFS:guitarLevel.peakDbFS,speechWindowVoiceMeanDbFS:voiceLevel.meanDbFS,speechWindowMarginDb:margin,envelope:{duckBeforeSpeech:{start:duckStart,end:duckEnd},underVoiceGain:.045,silentTail:.6},tuningMethod:'Pitch changes only on the three recorded ending clips; asetrate plus compensating atempo, with original duration retained. No voice processing.',listeningValidation:'pending'}};
}
module.exports={kitchenBed,guitarSequence};
