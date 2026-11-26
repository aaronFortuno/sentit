import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
// Reuse verified production copies across dates; never create a daily audio duplicate.
export async function archiveProductionAudio({root,files,date,sourceCommit}) {
  if(!/^\d{4}-\d{2}-\d{2}$/u.test(date))throw Error('Invalid archive date');
  const store=path.resolve(root,'../output/sentit-production-archive'),audioRoot=path.join(root,'assets/audio'),known=new Map();
  await fs.mkdir(store,{recursive:true});
  for(const name of await fs.readdir(store)){
    if(!/^\d{4}-\d{2}-\d{2}$/u.test(name))continue;
    const manifest=await fs.readFile(path.join(store,name,'manifest.json'),'utf8').then(JSON.parse).catch(error=>{if(error.code==='ENOENT')return null;throw error;});
    for(const record of manifest?.files??[]){const location=path.resolve(record.localCopy??'');if(/^[a-f0-9]{64}$/u.test(record.sha256??'')&&location.startsWith(store+path.sep))known.set(record.sha256,{...record,localCopy:location});}
  }
  const archived=[];let newCopies=0,reusedCopies=0;
  for(const row of files){
    const source=path.resolve(root,row.file);if(!source.startsWith(audioRoot+path.sep))throw Error('Source outside production audio: '+row.file);
    const bytes=await fs.readFile(source),hash=sha(bytes),previous=known.get(hash);
    let target=previous?.localCopy;
    const exists=target&&await fs.stat(target).then(stat=>stat.size===bytes.length,error=>{if(error.code==='ENOENT')return false;throw error;});
    if(exists){
      // Before untracking a file, verify the preserved copy, even when it already exists.
      if(row.tracked&&sha(await fs.readFile(target))!==hash)throw Error('Preserved archive hash mismatch: '+row.file);
      reusedCopies++;
    }else{
      target=path.join(store,'objects',hash+path.extname(row.file).toLowerCase());await fs.mkdir(path.dirname(target),{recursive:true});
      try{await fs.writeFile(target,bytes,{flag:'wx'});}catch(error){if(error.code!=='EEXIST')throw error;}
      if(sha(await fs.readFile(target))!==hash)throw Error('Archive hash mismatch: '+row.file);
      known.set(hash,{localCopy:target});newCopies++;
    }
    archived.push({file:row.file,bytes:bytes.length,sha256:hash,localCopy:target});
  }
  const folder=path.join(store,date);await fs.mkdir(folder,{recursive:true});
  await fs.writeFile(path.join(folder,'manifest.json'),JSON.stringify({date,sourceCommit,storage:'Verified content copies reused across dates; original production files remain in place.',files:archived},null,2)+'\n');
  return{folder,newCopies,reusedCopies,files:archived.length};
}
