'use strict';
// Offline mix from a teacher-approved library composition. Sources stay local.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {ffmpeg}=require('./audio-files.cjs'),{duration}=require('./remaster-audio.cjs');
const root=path.resolve(__dirname,'..'),sha=b=>createHash('sha256').update(b).digest('hex');
async function makeLibraryBed({id,folder,binary,duration:total,lead,voiceEnd}){
 const {narrationMusic}=await import('../content/narration-music.js'),track=narrationMusic.find(t=>t.id===id);
 if(!track?.active||track.status!=='approved')throw Error('La pista musical no forma part del repertori validat.');
 const manifest=JSON.parse(await fs.readFile(path.join(root,'assets/audio/music-previews/manifest.json'),'utf8')),record=manifest.tracks.find(t=>t.id===id);
 const source=path.resolve(root,'../output/sentit-music-tradicio',id+'.mp3');
 if(!record||record.isrc!==track.isrc||sha(await fs.readFile(source))!==record.sourceSha256)throw Error('La font musical no coincideix amb la mostra validada.');
 const start=6,normal=path.join(folder,'library-music-normalized.wav');
 ffmpeg(binary,['-v','error','-y','-i',source,'-af',`atrim=start=${start},asetpts=PTS-STARTPTS,loudnorm=I=-23:TP=-3:LRA=7,aresample=48000`,'-ar','48000','-ac','1','-c:a','pcm_s16le',normal]);
 const sourceSeconds=await duration(normal);if(sourceSeconds<5)throw Error('Font musical massa curta.');
 const copies=Math.max(1,Math.ceil((total-1)/(sourceSeconds-1))),loop=path.join(folder,'library-music-loop.wav');
 if(copies===1)await fs.copyFile(normal,loop);
 else{
  const filters=[];for(let i=1;i<copies;i++)filters.push(`${i===1?'[0:a]':'[loop'+(i-1)+']'}[${i}:a]acrossfade=d=1[${i===copies-1?'out':'loop'+i}]`);
  ffmpeg(binary,['-v','error','-y',...Array.from({length:copies},()=>['-i',normal]).flat(),'-filter_complex',filters.join(';'),'-map','[out]','-ar','48000','-ac','1','-c:a','pcm_s16le',loop]);
 }
 const duckStart=.3,duckEnd=lead-.15,riseStart=voiceEnd+.35,riseEnd=voiceEnd+1.15,fadeStart=riseEnd+2,fadeSeconds=1.15,fadeEnd=fadeStart+fadeSeconds;
 if(duckEnd<=duckStart||fadeEnd>total-.2)throw Error('Marges insuficients per a les foses musicals.');
 const opening=.25,speech=.10,raised=.50;
 const gain=`if(lt(t,${duckStart}),${opening},if(lt(t,${duckEnd}),${opening}-(${opening-speech})*(t-${duckStart})/(${duckEnd-duckStart}),if(lt(t,${riseStart}),${speech},if(lt(t,${riseEnd}),${speech}+(${raised-speech})*(t-${riseStart})/(${riseEnd-riseStart}),${raised}))))`;
 const file=path.join(folder,'library-music-bed.wav');
 ffmpeg(binary,['-v','error','-y','-i',loop,'-af',`atrim=end=${total},volume='${gain}':eval=frame,afade=t=in:d=0.6,afade=t=out:st=${fadeStart}:d=${fadeSeconds}`,'-ar','48000','-ac','1','-c:a','pcm_s16le',file]);
 return {file,effect:{name:'licensed-narration-bed',origin:'licensed-library-music',compositionId:'incompetech-'+track.isrc,libraryId:id,title:track.title,author:track.author,license:track.license,licenseUrl:track.licenseUrl,sourceUrl:track.sourceUrl,sourceSha256:record.sourceSha256,sourceNotDistributedSeparately:true,sourceStart:start,sourceSeconds,loopCopies:copies,crossfadeSeconds:copies>1?1:0,retimed:false,underSpeech:true,sha256:sha(await fs.readFile(file)),envelope:{fadeInSeconds:.6,duckStart,duckEnd,speechGain:speech,nominalSpeechMusicLufs:-43,riseStart,riseEnd,holdSeconds:2,fadeStart,fadeEnd},listeningValidation:'pending'}};
}
module.exports={makeLibraryBed};
