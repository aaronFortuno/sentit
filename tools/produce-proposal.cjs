'use strict';
// One explicitly approved title-and-program request. No quota probes or retries.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto'),{pathToFileURL}=require('node:url');
const {checkWave}=require('./audio-files.cjs');
const {readJSON,reserveRequest,assertQuota}=require('./audio-quota.cjs');
const {assertProductionApproved,fingerprint}=require('./production-approval.cjs');
const {productionSpec,packedProposalRequest}=require('./proposal-plan.cjs');
const {geminiAudio}=require('./generate-prototypes.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda');
async function main(){
 const code=process.argv.find(arg=>arg.startsWith('--only='))?.slice(7).toUpperCase().replace(/^CA-/,'');
 const {activities}=await import(pathToFileURL(path.join(root,'catalogue.js')));
 const entry=activities.find(entry=>entry.code===code);if(!entry?.production)throw Error('Cal --only=SXXX corresponent a una proposta editorial.');
 const {isEditoriallyReviewed}=await import(pathToFileURL(path.join(root,'editorial-review.js')));
 const plans=await readJSON(path.join(root,'content/production-plans.json'),{}),spec=productionSpec(entry),body=packedProposalRequest(entry);
 const hash=createHash('sha256').update(JSON.stringify(body)).digest('hex'),folder=path.join(work,code.toLowerCase());
 const raw=path.join(folder,'titol-fragment-'+hash.slice(0,12)+'.wav');
 const cached=await fs.readFile(raw).catch(error=>{if(error.code==='ENOENT')return null;throw error;});if(cached)checkWave(cached);
 const summary={code,newRequests:cached?0:1,voices:spec.voices,textItems:body.input[0].content.length,requestHash:hash,editorialReview:isEditoriallyReviewed(entry),fingerprint:fingerprint(entry,spec,plans[code]??{})};
 console.log(JSON.stringify(summary));if(!process.argv.includes('--synthesize'))return;
 assertProductionApproved(entry,spec,plans[code]);
 if(!isEditoriallyReviewed(entry))throw Error('La versió actual no ha superat la revisió editorial independent. Cap petició enviada.');
 if(cached){console.log('Presa completa conservada: cap petició nova.');return;}
 assertQuota(await readJSON(path.join(work,'last-api-error.json'),null));
 await fs.mkdir(folder,{recursive:true});const attemptFile=path.join(folder,'attempt-'+hash.slice(0,12)+'.json');
 if(await readJSON(attemptFile,null))throw Error('Intent previ sense WAV complet. Cal revisar-lo abans de repetir cap petició.');
 const lock=path.join(work,'production.lock'),handle=await fs.open(lock,'wx');
 await handle.writeFile(JSON.stringify({pid:process.pid,code,startedAt:new Date().toISOString()}));
 const attempt={code,requestHash:hash,approval:summary.fingerprint,startedAt:new Date().toISOString(),state:'in-flight',maxRequests:1};
 try{
  await fs.writeFile(path.join(folder,'approved-input.json'),JSON.stringify({entry,spec,plan:plans[code]},null,2));
  await reserveRequest(work,{code,purpose:'title-and-whole-program',hash,model:body.model});
  await fs.writeFile(attemptFile,JSON.stringify(attempt,null,2));await fs.writeFile(raw.replace('.wav','.request.json'),JSON.stringify(body,null,2));
  const audio=await geminiAudio(body,path.join(folder,'provider-usage-packed.json'));
  checkWave(audio);await fs.writeFile(raw+'.part',audio);await fs.rename(raw+'.part',raw);
  attempt.state='complete';attempt.completedAt=new Date().toISOString();attempt.audioSha256=createHash('sha256').update(audio).digest('hex');
  console.log(JSON.stringify({code,state:'raw-complete',newRequests:1,bytes:audio.length}));
 }catch(error){attempt.state='failed-or-uncertain';attempt.error=error.message;throw error;}
 finally{await fs.writeFile(attemptFile,JSON.stringify(attempt,null,2));await handle.close();await fs.unlink(lock);}
}
if(require.main===module)main().catch(error=>{console.error(error.message);process.exitCode=1;});
module.exports={main};
