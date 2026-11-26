// Keep service audio in Git; archive working copies locally without deleting them.
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { activities, legacyActivities } from '../catalogue.js';
import { productionProgress } from '../content/production-progress.js';
import { archiveProductionAudio } from './production-archive.mjs';

const root=fileURLToPath(new URL('../',import.meta.url)),audioRoot=path.join(root,'assets/audio');
const git=args=>execFileSync('C:/Program Files/Git/cmd/git.exe',['-c',`safe.directory=${root.replaceAll('\\','/').replace(/\/$/u,'')}`,...args],{cwd:root,windowsHide:true,encoding:'utf8',maxBuffer:16*1024*1024});
const date=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Berlin'}).format(new Date());
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const audioPattern=/\.(mp3|wav|flac|ogg|m4a)$/iu;
const relative=absolute=>path.relative(root,absolute).replaceAll('\\','/');
const htmlAudioPath=(name,html,source)=>{const base=html.match(/<base\b[^>]*\bhref=['"]([^'"]+)['"]/iu)?.[1];return decodeURIComponent(new URL(source,new URL(base??'',`https://sentit.invalid/proves/${name}`)).pathname).replace(/^\//u,'');};
async function walk(folder){const result=[];for(const entry of await fs.readdir(folder,{withFileTypes:true})){if(entry.isSymbolicLink())throw Error('Symlink in audio archive: '+entry.name);const file=path.join(folder,entry.name);if(entry.isDirectory())result.push(...await walk(file));else if(audioPattern.test(entry.name))result.push(relative(file));}return result;}
const audio=await walk(audioRoot),available=new Set(audio),retained=new Map();
if(process.argv.includes('--apply'))execFileSync(process.execPath,[fileURLToPath(new URL('./prepare-modular-audio.mjs',import.meta.url))],{cwd:root,windowsHide:true,stdio:'inherit'});
const{modularAudio}=await import('../content/modular-audio.js?publication='+Date.now());
const add=(value,reason)=>{if(typeof value!=='string')return;const file=value.replace(/^\.\//u,'');if(!file.startsWith('assets/audio/')||!audioPattern.test(file))return;if(!available.has(file))throw Error('Required audio missing: '+file);const reasons=retained.get(file)??new Set();reasons.add(reason);retained.set(file,reasons);};
const visit=(value,reason)=>{if(typeof value==='string')add(value,reason);else if(value&&typeof value==='object')Object.values(value).forEach(child=>visit(child,reason));};
for(const entry of [...activities,...legacyActivities]){
 const modular=Boolean(entry.audio&&entry.tracks?.introduction&&entry.tracks?.body);
 if(modular){const record=modularAudio[`${entry.language}-${entry.code}`];if(record?.master!==entry.audio||['introduction','body'].some(kind=>record?.[kind]?.src!==entry.tracks[kind]||!(record[kind].seconds>0)))throw Error('Modular playback metadata outdated: '+entry.code);}
 else visit(entry.audio,'legacy-single-track');
 visit(entry.tracks,'modular-service-tracks');
 const progress=productionProgress[`${entry.language}-${entry.code}`];if(!progress)continue;
 // Match the actual review controls: do not archive a still-accessible voice review.
 if(progress.voicePreviewFile&&!(entry.audio&&(progress.voiceApproval?.status==='approved'||['montage-awaiting-listening','published'].includes(progress.state))))add(progress.voicePreviewFile,'pending-voice-review');
 for(const repair of progress.receivedRepairs??[])if(repair.applied===false&&['received-awaiting-listening','approved-awaiting-application'].includes(repair.status)&&repair.candidateFile&&(repair.originalFile||repair.missingOriginal))visit({original:repair.originalFile,candidate:repair.candidateFile},'pending-repair-comparison');
 if(progress.timbreReview?.status==='pending-listening')visit({original:progress.timbreReview.previousAudio,trial:progress.timbreReview.trialAudio},'pending-timbre-comparison');
}
for(const file of audio){
 if(/^assets\/audio\/(?:sources|music-previews|external)\//u.test(file))add(file,'reusable-source-or-export');
 if(/^assets\/audio\/[^/]+$/u.test(file)&&!/^s\d/iu.test(path.basename(file)))add(file,'shared-prompt-jingle-or-pilot');
}
const tracked=git(['ls-files','-z']).split('\0').filter(Boolean),trackedSet=new Set(tracked);
for(const file of tracked.filter(file=>/\.(js|html)$/u.test(file)&&! /^(content|tools|proves|assets)\//u.test(file))){const text=await fs.readFile(path.join(root,file),'utf8');for(const match of text.matchAll(/(?:\.\/)?assets\/audio\/[\w./-]+\.mp3/gu))add(match[0],'static-interface-reference');}
const rows=await Promise.all(audio.sort().map(async file=>({file,bytes:(await fs.stat(path.join(root,file))).size,reasons:[...(retained.get(file)??[])],tracked:trackedSet.has(file)})));
const archive=rows.filter(row=>!row.reasons.length),remove=archive.filter(row=>row.tracked),keep=rows.filter(row=>row.reasons.length),sum=rows=>rows.reduce((total,row)=>total+row.bytes,0);
if(process.argv.includes('--apply')){
 const archiveResult=await archiveProductionAudio({root,files:archive,date,sourceCommit:git(['rev-parse','HEAD']).trim()});
 const ignoreFile=path.join(audioRoot,'.gitignore'),old=await fs.readFile(ignoreFile,'utf8').catch(error=>{if(error.code==='ENOENT')return '';throw error;});
 if(old&&!old.startsWith('# Generated by tools/public-audio.mjs'))throw Error('Existing audio ignore rules need manual review');
 const ignore='# Generated by tools/public-audio.mjs --apply. Production takes and full masters stay local.\n# Keep modular title/body tracks, pending reviews and reusable sources.\n*.mp3\n*.wav\n*.flac\n*.ogg\n*.m4a\n'+keep.map(row=>'!/'+row.file.slice('assets/audio/'.length)).join('\n')+'\n';
 await fs.writeFile(ignoreFile,ignore);
 await fs.writeFile(path.join(root,'content/public-audio.json'),JSON.stringify({generatedAt:date,policy:'Modular title/body service tracks; pending voice/repair reviews; reusable effects, music and prompts. Full masters and historical production audio stay local.',files:keep.map(row=>({file:row.file,bytes:row.bytes,reasons:row.reasons}))},null,2)+'\n');
 // Historical comparison pages remain reachable without broken audio players.
 const archived=new Set(archive.map(row=>row.file));
 for(const name of await fs.readdir(path.join(root,'proves'))){if(!name.endsWith('.html'))continue;const file=path.join(root,'proves',name),old=await fs.readFile(file,'utf8');
  const html=old.replace(/<audio\b([^>]*\bsrc=(['"])([^'"]+)\2[^>]*)>[\s\S]*?<\/audio>/giu,(element,attrs,quote,source)=>{
   if(/^[a-z]+:/iu.test(source))return element;const resolved=htmlAudioPath(name,old,source);
   if(!archived.has(resolved))return element;const code=path.basename(resolved).match(/\bs\d{3}d?\b/iu)?.[0].toUpperCase();
   return '<p class="note">Presa de treball arxivada en local. <a href="'+(/<base\b/iu.test(old)?'./':'../')+(code?'#lectura=ca-'+code:'')+'">Consulta l’àudio vigent a Sentit</a>.</p>';
  });if(html!==old)await fs.writeFile(file,html);
 }
 // Remove only from the Git index; working files stay in place for production tools.
 for(let offset=0;offset<remove.length;offset+=40)git(['rm','--cached','--quiet','--ignore-unmatch','--',...remove.slice(offset,offset+40).map(row=>row.file)]);
 console.log(`Archive ${archiveResult.folder}: ${archiveResult.newCopies} new copies, ${archiveResult.reusedCopies} reused. Working files preserved; Git history unchanged.`);
}
const summary={date,trackedAudioBefore:rows.filter(row=>row.tracked).length,retained:{files:keep.length,bytes:sum(keep)},toUntrack:{files:remove.length,bytes:sum(remove)},localOnly:{files:archive.length,bytes:sum(archive)},mode:process.argv.includes('--apply')?'applied-to-current-tree-only':'read-only'};
console.log(JSON.stringify(summary,null,2));
if(process.argv.includes('--check')){
 if(remove.length)throw Error('Historical production audio is still tracked; review and run --apply.');
 const missing=keep.filter(row=>!row.tracked);if(missing.length)throw Error('Required audio not tracked: '+missing.map(row=>row.file).join(', '));
 for(const entry of activities.filter(entry=>entry.audio&&entry.tracks?.introduction&&entry.tracks?.body)){const record=modularAudio[`${entry.language}-${entry.code}`];for(const kind of ['introduction','body'])if(sha(await fs.readFile(path.join(root,record[kind].src)))!==record[kind].sha256)throw Error('Service audio fingerprint changed: '+entry.code+' '+kind);}
 for(const name of await fs.readdir(path.join(root,'proves'))){if(!name.endsWith('.html'))continue;const file=path.join(root,'proves',name),html=await fs.readFile(file,'utf8');for(const match of html.matchAll(/<audio\b[^>]*\bsrc=['"]([^'"]+)['"]/giu)){if(/^[a-z]+:/iu.test(match[1]))continue;const audioFile=htmlAudioPath(name,html,match[1]);if(!retained.has(audioFile))throw Error('Comparison player points to local-only audio: '+name+' -> '+audioFile);}}
 console.log('PASS · Every required playback file is tracked; historical audio is local-only.');
}
