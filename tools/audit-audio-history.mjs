// Local, read-only Git audit. Never rewrites history, changes refs or contacts remotes.
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const option=name=>process.argv.find(arg=>arg.startsWith(name+'='))?.slice(name.length+1);
const root=path.resolve(option('--repo')??fileURLToPath(new URL('../',import.meta.url)));
const git=args=>execFileSync('C:/Program Files/Git/cmd/git.exe',['-c','safe.directory='+root.replaceAll('\\','/'),'-c','core.quotepath=false',...args],{cwd:root,encoding:'utf8',windowsHide:true,maxBuffer:64*1024*1024}).trim();
const manifest=JSON.parse(await fs.readFile(path.join(root,'content/public-audio.json'),'utf8')),keep=new Set(manifest.files.map(row=>row.file));
const names=git(['log','--all','--format=','--name-only','-z','--no-renames','--','assets/audio/']).split('\0').map(name=>name.replace(/^\n+/u,'')).filter(name=>/\.(mp3|wav|flac|ogg|m4a)$/iu.test(name));
const candidates=[...new Set(names)].filter(name=>!keep.has(name)).sort(),tracked=new Set(git(['ls-files','-z']).split('\0'));
const currentTreeCandidates=candidates.filter(name=>tracked.has(name));
const result={date:new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Berlin'}).format(new Date()),commit:git(['rev-parse','HEAD']),status:currentTreeCandidates.length?'current-tree-needs-cleanup':candidates.length?'history-cleanup-candidates':'no-history-cleanup-needed',retainedAudioPaths:keep.size,historicalCandidateCount:candidates.length,currentTreeCandidateCount:currentTreeCandidates.length,candidatePaths:candidates,historyRewritten:false,networkAccess:false,approvalRequiredBeforeSharedHistoryRewrite:candidates.length>0};
const output=option('--output');if(output){const target=path.resolve(root,output);await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,JSON.stringify(result,null,2)+'\n');}
console.log(JSON.stringify({...result,candidatePaths:candidates.slice(0,10),...(candidates.length>10?{fullList:output??'Use --output=path.json to save the complete local report'}:{})},null,2));
