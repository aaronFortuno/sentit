'use strict';
// One approved API attempt, then only local processing. No automatic paid retries.
const fs=require('node:fs/promises');
const path=require('node:path');
const {createHash}=require('node:crypto');
const {pathToFileURL}=require('node:url');
const {checkWave}=require('./audio-files.cjs');
const {readJSON,reserveRequest,assertQuota}=require('./audio-quota.cjs');
const {assertProductionApproved,fingerprint}=require('./production-approval.cjs');
const {spec,packedRadioRequest}=require('./radio-production.cjs');
const {geminiAudio}=require('./generate-prototypes.cjs');
const root=path.resolve(__dirname,'..');
const work=path.resolve(root,'../output/sentit-primera-tanda');
const folder=path.join(work,'s008r');
async function main(){
  const {fotoRadio:entry}=await import(pathToFileURL(path.join(root,'content/la-foto-que-faltava-radio.js')));
  const plans=await readJSON(path.join(root,'content/production-plans.json'),{});
  const body=packedRadioRequest(entry);
  const hash=createHash('sha256').update(JSON.stringify(body)).digest('hex');
  const raw=path.join(folder,'fragment-complet-'+hash.slice(0,12)+'.wav');
  const cached=await fs.readFile(raw).catch(error=>{if(error.code==='ENOENT')return null;throw error;});
  if(cached)checkWave(cached);
  const plan={code:entry.code,newRequests:cached?0:1,words:entry.transcript.filter(p=>p.speaker).map(p=>p.text).join(' ').split(/\s+/).length,textItems:body.input[0].content.length,reusedIntroduction:entry.generationPlan.takes[0].source,fingerprint:fingerprint(entry,spec,plans.S008R),requestHash:hash};
  console.log(JSON.stringify(plan));
  if(!process.argv.includes('--synthesize'))return;
  assertProductionApproved(entry,spec,plans.S008R);
  await fs.access(path.join(root,plan.reusedIntroduction));
  if(cached){console.log('Presa completa conservada: cap petició nova.');return;}
  assertQuota(await readJSON(path.join(work,'last-api-error.json'),null));
  await fs.mkdir(folder,{recursive:true});
  const attemptFile=path.join(folder,'attempt-'+hash.slice(0,12)+'.json');
  if(await readJSON(attemptFile,null))throw Error('Hi ha un intent previ sense WAV complet. Cal revisar-lo abans de repetir cap petició.');
  const lock=path.join(work,'production.lock');
  const handle=await fs.open(lock,'wx').catch(error=>{if(error.code==='EEXIST')throw Error('Ja hi ha una producció o un lock pendent de revisar.');throw error;});
  await handle.writeFile(JSON.stringify({pid:process.pid,code:entry.code,startedAt:new Date().toISOString()}));
  const attempt={code:entry.code,requestHash:hash,approval:plan.fingerprint,startedAt:new Date().toISOString(),state:'in-flight',maxRequests:1};
  try{
    await reserveRequest(work,{code:entry.code,purpose:'whole-radio-program',hash,model:body.model});
    await fs.writeFile(attemptFile,JSON.stringify(attempt,null,2));
    await fs.writeFile(raw.replace('.wav','.request.json'),JSON.stringify(body,null,2));
    const audio=await geminiAudio(body,path.join(folder,'provider-usage.json'));
    checkWave(audio);await fs.writeFile(raw+'.part',audio);await fs.rename(raw+'.part',raw);
    attempt.state='complete';attempt.completedAt=new Date().toISOString();attempt.audioSha256=createHash('sha256').update(audio).digest('hex');
    console.log(JSON.stringify({code:entry.code,state:'raw-complete',newRequests:1,bytes:audio.length}));
  }catch(error){attempt.state='failed-or-uncertain';attempt.error=error.message;throw error;}
  finally{await fs.writeFile(attemptFile,JSON.stringify(attempt,null,2));await handle.close();await fs.unlink(lock);}
}
if(require.main===module)main().catch(error=>{console.error(error.message);process.exitCode=1;});
module.exports={main};
