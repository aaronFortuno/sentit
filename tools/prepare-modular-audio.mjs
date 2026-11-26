// Metadata for existing title/body MP3s. No synthesis, transcoding or approval edits.
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { activities } from '../catalogue.js';
import { modularAudio as previous } from '../content/modular-audio.js';
const require=createRequire(import.meta.url),{ffmpeg,ffmpegBinary}=require('./audio-files.cjs'),binary=await ffmpegBinary();
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const records={};
for(const entry of activities.filter(entry=>entry.audio&&entry.tracks?.introduction&&entry.tracks?.body)){
  const key=`${entry.language}-${entry.code}`,record={master:entry.audio};
  try{record.masterSha256=sha(await fs.readFile(new URL('../'+entry.audio.replace(/^\.\//u,''),import.meta.url)));}
  catch(error){if(error.code!=='ENOENT'||previous[key]?.master!==entry.audio||!previous[key]?.masterSha256)throw error;record.masterSha256=previous[key].masterSha256;}
  for(const kind of ['introduction','body']){
    const src=entry.tracks[kind],file=new URL('../'+src.replace(/^\.\//u,''),import.meta.url),hash=sha(await fs.readFile(file)),old=previous[key]?.[kind];
    if(old?.src===src&&old.sha256===hash){record[kind]=old;continue;}
    const{fileURLToPath}=await import('node:url');
    const log=ffmpeg(binary,['-i',fileURLToPath(file),'-f','null','-']);
    const match=/Duration: (\d+):(\d+):(\d+\.\d+)/u.exec(log);if(!match)throw Error('Duration absent: '+src);
    const seconds=Number(match[1])*3600+Number(match[2])*60+Number(match[3]);if(!(seconds>0))throw Error('Invalid duration: '+src);
    record[kind]={src,seconds,sha256:hash};
  }
  records[key]=record;
}
await fs.writeFile(new URL('../content/modular-audio.js',import.meta.url),'// Generated from existing MP3s by tools/prepare-modular-audio.mjs; masters remain local.\nexport const modularAudio = '+JSON.stringify(records,null,2)+';\n');
console.log(`Modular playback metadata: ${Object.keys(records).length} activities, unchanged MP3s and approvals.`);
