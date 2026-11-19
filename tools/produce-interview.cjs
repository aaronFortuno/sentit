'use strict';
// One approved title-and-interview request; raw audio and approval are kept intact.
const fs=require('node:fs/promises'),path=require('node:path');
const {createHash}=require('node:crypto');
const {pathToFileURL}=require('node:url');
const {checkWave}=require('./audio-files.cjs');
const {readJSON,reserveRequest,assertQuota}=require('./audio-quota.cjs');
const {assertProductionApproved,fingerprint}=require('./production-approval.cjs');
const {spec,packedInterviewRequest}=require('./interview-production.cjs');
const {geminiAudio}=require('./generate-prototypes.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda'),folder=path.join(work,'s015');
async function main(){
  const {restauradora:entry}=await import(pathToFileURL(path.join(root,'content/una-restauradora-ens-explica-el-seu-ofici.js')));
  const plans=await readJSON(path.join(root,'content/production-plans.json'),{});
  const body=packedInterviewRequest(entry),hash=createHash('sha256').update(JSON.stringify(body)).digest('hex');
  const raw=path.join(folder,'titol-entrevista-'+hash.slice(0,12)+'.wav');
  const cached=await fs.readFile(raw).catch(error=>{if(error.code==='ENOENT')return null;throw error;});
  if(cached)checkWave(cached);
  const plan={code:entry.code,newRequests:cached?0:1,textItems:body.input[0].content.length,voices:spec.voices,fingerprint:fingerprint(entry,spec,plans.S015),requestHash:hash};
  console.log(JSON.stringify(plan));
  if(!process.argv.includes('--synthesize'))return;
  assertProductionApproved(entry,spec,plans.S015);
  if(cached){console.log('Presa completa conservada: cap petició nova.');return;}
  assertQuota(await readJSON(path.join(work,'last-api-error.json'),null));
  await fs.mkdir(folder,{recursive:true});
  const attemptFile=path.join(folder,'attempt-'+hash.slice(0,12)+'.json');
  if(await readJSON(attemptFile,null))throw Error('Intent previ sense WAV complet. Cal revisar-lo abans de repetir cap petició.');
  const lock=path.join(work,'production.lock'),handle=await fs.open(lock,'wx');
  await handle.writeFile(JSON.stringify({pid:process.pid,code:entry.code,startedAt:new Date().toISOString()}));
  const attempt={code:entry.code,requestHash:hash,approval:plan.fingerprint,startedAt:new Date().toISOString(),state:'in-flight',maxRequests:1};
  try{
    await fs.writeFile(path.join(folder,'approved-input.json'),JSON.stringify({entry,spec,plan:plans.S015},null,2));
    await reserveRequest(work,{code:entry.code,purpose:'title-and-whole-interview',hash,model:body.model});
    await fs.writeFile(attemptFile,JSON.stringify(attempt,null,2));
    await fs.writeFile(raw.replace('.wav','.request.json'),JSON.stringify(body,null,2));
    const audio=await geminiAudio(body,path.join(folder,'provider-usage-packed.json'));
    checkWave(audio);await fs.writeFile(raw+'.part',audio);await fs.rename(raw+'.part',raw);
    attempt.state='complete';attempt.completedAt=new Date().toISOString();attempt.audioSha256=createHash('sha256').update(audio).digest('hex');
    console.log(JSON.stringify({code:entry.code,state:'raw-complete',newRequests:1,bytes:audio.length}));
  }catch(error){attempt.state='failed-or-uncertain';attempt.error=error.message;throw error;}
  finally{await fs.writeFile(attemptFile,JSON.stringify(attempt,null,2));await handle.close();await fs.unlink(lock);}
}
if(require.main===module)main().catch(error=>{console.error(error.message);process.exitCode=1;});
module.exports={main};
