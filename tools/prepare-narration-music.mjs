// Existing third-party compositions, not generated music. Full sources stay outside the repository.
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { narrationMusic } from '../content/narration-music.js';
const require=createRequire(import.meta.url),{ffmpeg,ffmpegBinary}=require('./audio-files.cjs');
const binary=await ffmpegBinary(),sourceDir=new URL('../../output/sentit-music-tradicio/',import.meta.url),targetDir=new URL('../assets/audio/music-previews/',import.meta.url);
await fs.mkdir(sourceDir,{recursive:true});await fs.mkdir(targetDir,{recursive:true});
const sha=data=>createHash('sha256').update(data).digest('hex');
const rows=[];
const onlyValue=process.argv.find(arg=>arg.startsWith('--only='))?.slice(7),only=onlyValue?new Set(onlyValue.split(',')):null;
if(only&&[...only].some(id=>!narrationMusic.some(track=>track.id===id)))throw Error('Unknown music ID');
const previous=await fs.readFile(new URL('manifest.json',targetDir),'utf8').then(JSON.parse).catch(error=>{if(error.code==='ENOENT')return{tracks:[]};throw error;});
for(const track of narrationMusic){
  if(only&&!only.has(track.id)){
    const old=previous.tracks.find(row=>row.id===track.id);
    if(!old||old.isrc!==track.isrc||old.preview!==track.preview||sha(await fs.readFile(new URL('../'+track.preview.replace(/^\.\//u,''),import.meta.url)))!==old.previewSha256)throw Error('Preserved preview identity mismatch: '+track.id);
    rows.push({...old,...track});continue;
  }
  const source=new URL(`${track.id}.mp3`,sourceDir),page=new URL(`${track.id}.source.html`,sourceDir);
  try{await fs.access(source);}catch{if(!process.argv.includes('--download'))throw Error('Source absent: use --download explicitly.');const response=await fetch(track.downloadUrl,{signal:AbortSignal.timeout(90000)});if(!response.ok)throw Error(`${track.id}: HTTP ${response.status}`);await fs.writeFile(source,Buffer.from(await response.arrayBuffer()));}
  try{await fs.access(page);}catch{const response=await fetch(track.sourceUrl,{signal:AbortSignal.timeout(45000)});if(!response.ok)throw Error(`${track.id} page: HTTP ${response.status}`);await fs.writeFile(page,await response.text());}
  const html=await fs.readFile(page,'utf8');if(!html.includes('By Attribution 4.0'))throw Error(`${track.id}: license statement absent`);
  const target=new URL(`${track.id}.mp3`,targetDir);
  const recipe=`loudnorm=I=-23:TP=-3:LRA=7,afade=t=in:st=0:d=0.7,afade=t=out:st=30:d=2`;
  ffmpeg(binary,['-y','-ss',String(track.excerpt.start),'-i',fileURLToPath(source),'-t',String(track.excerpt.seconds),'-vn','-af',recipe,'-ar','44100','-ac','2','-c:a','libmp3lame','-b:a','128k','-metadata',`title=${track.title} (32-second comparison excerpt)`,'-metadata',`artist=${track.author}`,'-metadata',`copyright=CC BY 4.0; ${track.licenseUrl}; excerpt, normalization and fades by Sentit`,fileURLToPath(target)]);
  const original=await fs.readFile(source),excerpt=await fs.readFile(target);
  rows.push({...track,sourceSha256:sha(original),sourceBytes:original.length,sourcePageSha256:sha(Buffer.from(html)),previewSha256:sha(excerpt),previewBytes:excerpt.length,processing:{filter:recipe,bitrate:128000,sampleRate:44100,channels:2},retrievedAt:'2026-11-26',usedBy:[]});
  console.log(`${track.id} · ${track.title} · ${excerpt.length} bytes`);
}
await fs.writeFile(new URL('manifest.json',targetDir),JSON.stringify({status:'legends-and-myths-approved-fables-selection-open',approvedIds:narrationMusic.filter(track=>track.status==='approved').map(track=>track.id),pendingIds:narrationMusic.filter(track=>track.status==='candidate').map(track=>track.id),author:'Kevin MacLeod (incompetech.com)',license:'CC BY 4.0',licenseUrl:'https://creativecommons.org/licenses/by/4.0/',changes:'32-second excerpts from second 6, loudness adjustment and fades; no new synthesis.',tracks:rows},null,2)+'\n');
