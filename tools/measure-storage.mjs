// Read-only local inventory. No network calls, secrets or changes to Git history.
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { activities } from '../catalogue.js';
import { productionProgress } from '../content/production-progress.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const git = args => execFileSync('C:/Program Files/Git/cmd/git.exe', ['-c', `safe.directory=${root.replaceAll('\\','/').replace(/\/$/u,'')}`, ...args], { cwd:root, windowsHide:true, maxBuffer:16*1024*1024 }).toString();
const tracked = git(['ls-files','-z']).split('\0').filter(Boolean);
const sum = a => a.reduce((s,n)=>s+n,0);
const files = await Promise.all(tracked.map(async name => ({ name, bytes:(await fs.stat(path.join(root,name))).size })));
const total = files => sum(files.map(f=>f.bytes));
const localFile = async source => { if(!source?.startsWith('./'))return null;const name=source.slice(2);try{return {name,bytes:(await fs.stat(path.join(root,name))).size};}catch{return null;} };
const active = await Promise.all(activities.map(async entry=>{
  const progress=productionProgress[`${entry.language}-${entry.code}`];
  const source=entry.audio??progress?.voicePreviewFile;
  return {code:`${entry.language}-${entry.code}`,seconds:entry.seconds??0,mounted:Boolean(entry.audio),file:await localFile(source),tracks:await Promise.all(Object.values(entry.tracks??{}).map(localFile)),fragment:entry.fragment};
}));
const audio=active.filter(a=>a.file), mounted=audio.filter(a=>a.mounted);
const unique=rows=>[...new Map(rows.filter(Boolean).map(file=>[file.name,file])).values()];
async function walk(dir){let bytes=0,count=0;for(const ent of await fs.readdir(dir,{withFileTypes:true})){const file=path.join(dir,ent.name);if(ent.isSymbolicLink())continue;if(ent.isDirectory()){const child=await walk(file);bytes+=child.bytes;count+=child.files;}else{bytes+=(await fs.stat(file)).size;count++;}}return{bytes,files:count};}
const all=await walk(root), history=await walk(path.join(root,'.git'));
const ext={};for(const f of files){const key=path.extname(f.name).toLowerCase()||'(none)';ext[key]??={files:0,bytes:0};ext[key].files++;ext[key].bytes+=f.bytes;}
const headRows=git(['ls-tree','-rl','HEAD']).trim().split('\n').filter(Boolean);
const headBytes=sum(headRows.map(line=>Number(line.split('\t')[0].trim().split(/\s+/u).at(-1))));
const audioFiles=files.filter(f=>/\.(mp3|wav|ogg|m4a)$/iu.test(f.name));
const mountedBytes=total(unique(mounted.map(a=>a.file))), mountedSeconds=sum(mounted.map(a=>a.seconds));
const splitFiles=unique(mounted.flatMap(a=>a.tracks)), splitBytes=total(splitFiles);
const withSplit=mounted.filter(a=>a.tracks.filter(Boolean).length>0);
const result={date:new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Berlin'}).format(new Date()),commit:git(['rev-parse','--short','HEAD']).trim(),units:'bytes; MiB=2^20 bytes; GiB=2^30 bytes',catalogue:{activities:activities.length,withAudio:audio.length,mounted:mounted.length,voiceOnly:audio.length-mounted.length},head:{files:headRows.length,bytes:headBytes},workingTracked:{files:files.length,bytes:total(files),audio:{files:audioFiles.length,bytes:total(audioFiles)},images:{files:files.filter(f=>f.name.startsWith('assets/images/')).length,bytes:total(files.filter(f=>f.name.startsWith('assets/images/')))}},git:history,localFolder:all,ignoredOrUntrackedBytes:all.bytes-history.bytes-total(files),extensions:ext,activeAudio:{files:unique(audio.map(a=>a.file)).length,bytes:total(unique(audio.map(a=>a.file))),mountedFiles:mounted.length,mountedBytes,mountedDeclaredSeconds:mountedSeconds,averageMasterBytes:mountedBytes/mounted.length,averageDeclaredSeconds:mountedSeconds/mounted.length,splitFiles:splitFiles.length,splitBytes,mountedWithSplit:withSplit.length,averageSplitBytes:splitBytes/withSplit.length},projection600:{masterBytes:mountedBytes/mounted.length*600,masterPlusSplitBytes:(mountedBytes/mounted.length+splitBytes/withSplit.length)*600,assumptions:'Same observed duration/bitrate distribution; master plus observed split tracks per exercise. Excludes illustrations, candidate clips, historical masters and Git history.'}};
const output=process.argv.find(arg=>arg.startsWith('--output='))?.slice(9);
if(output)await fs.writeFile(path.resolve(root,output),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
