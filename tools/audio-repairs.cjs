'use strict';
// Default: a local plan. Generation is explicit, quota-bounded and never edits a published master.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {request}=require('./audio-plan.cjs'),{checkWave}=require('./audio-files.cjs');
const {readJSON,reserveRequest,assertQuota}=require('./audio-quota.cjs');
const hash=data=>createHash('sha256').update(data).digest('hex');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda');
function repairSpec(entry){return entry.code==='S015'?require('./interview-production.cjs').spec:entry.code==='S023'?require('./news-production.cjs').spec:require('./proposal-plan.cjs').productionSpec(entry);}
function repairRequest(entry,plan){
 if(plan.activity!==`${entry.language}-${entry.code}`||plan.repairs.length<1)throw Error('Pla de correcció desconegut.');
 const turns=plan.repairs.map((repair,index)=>{
  const part=entry.transcript.find(part=>part.id===repair.part);
  if(!part||part.speaker!==repair.speaker||part.text.split(repair.text).length!==2)throw Error('El text de la correcció ha canviat: cal revisar-lo.');
  if(plan.voices[part.speaker]!==repairSpec(entry).voices[part.speaker])throw Error('La veu de la correcció no coincideix.');
  return {speaker:part.speaker,text:repair.text+(index<plan.repairs.length-1?' <long pause>':'')};
 });
 const body=request(turns,{voices:plan.voices,pace:plan.direction});
 for(let i=0;i<body.input[0].content.length;i++)body.input[0].content[i].annotations[0].style+=' '+plan.repairs[i].pronunciation;
 return body;
}
function assertDailyRoom(log,now=new Date()){
 const day=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Los_Angeles'}),key=day.format(now);
 const used=log.filter(item=>day.format(new Date(item.at))===key).length;
 if(used>=10)throw Error('Ja consten deu peticions en el dia de quota. Cap petició enviada.');
 return used;
}
async function main(){
 const code=process.argv.find(arg=>arg.startsWith('--only='))?.slice(7).toUpperCase().replace(/^CA-/,'');
 const plans=await readJSON(path.join(root,'content/audio-repairs.json'),{}),plan=plans[code];if(!plan)throw Error('Indica --only amb un codi de content/audio-repairs.json.');
 const {activities}=await import('../catalogue.js'),entry=activities.find(e=>e.code===code),body=repairRequest(entry,plan),requestHash=hash(JSON.stringify(body));
 const source=await readJSON(path.join(root,`assets/audio/${code.toLowerCase()}-production-manifest.json`),null);
 if(source.requestHash!==plan.sourceRequestHash||source.rawSha256!==plan.sourceRawSha256)throw Error('La presa d’origen ha canviat. Cal revisar el pla.');
 const folder=path.join(work,code.toLowerCase(),'repairs'),raw=path.join(folder,'repair-'+requestHash.slice(0,12)+'.wav');
 const cached=await fs.readFile(raw).catch(e=>{if(e.code==='ENOENT')return null;throw e;});if(cached)checkWave(cached);
 console.log(JSON.stringify({code,status:plan.status,requestHash,newRequests:cached?0:1,words:plan.repairs.map(r=>r.text).join(' ').split(/\s+/u).length,parts:plan.repairs.map(r=>r.part),notBefore:plan.notBefore,action:'Raw audition only; no published replacement or final validation.'}));
 if(!process.argv.includes('--generate'))return;
 if(!process.argv.includes('--max-requests=1'))throw Error('Cal limitar explícitament a una petició.');
 if(plan.status!=='approved-for-correction'||plan.approvedRequestHash!==requestHash)throw Error('La petició no coincideix amb la correcció autoritzada.');
 if(cached)return;
 if(Date.now()<Date.parse(plan.notBefore))throw Error('Correcció preparada per al proper restabliment; cap petició enviada.');
 const {isEditoriallyReviewed}=await import('../editorial-review.js');
 if(!isEditoriallyReviewed(entry))throw Error('La revisió editorial actual no coincideix.');
 const {assertProductionApproved}=require('./production-approval.cjs');
 assertProductionApproved(entry,repairSpec(entry),(await readJSON(path.join(root,'content/production-plans.json'),{}))[code]);
 require('./audio-batch-policy.cjs').assertSynthesisWindow(body);
 assertQuota(await readJSON(path.join(work,'last-api-error.json'),null));
 assertDailyRoom(await readJSON(path.join(work,'request-log.json'),[]));
 await fs.mkdir(folder,{recursive:true});const attemptFile=raw.replace('.wav','.attempt.json');
 if(await readJSON(attemptFile,null))throw Error('Hi ha un intent anterior sense resultat: revisar abans de repetir-lo.');
 const lock=path.join(work,'production.lock'),handle=await fs.open(lock,'wx');
 const attempt={code,requestHash,state:'in-flight',startedAt:new Date().toISOString(),maxRequests:1};
 try{
  await handle.writeFile(JSON.stringify({pid:process.pid,code,purpose:'pronunciation-repair',startedAt:attempt.startedAt}));
  assertDailyRoom(await readJSON(path.join(work,'request-log.json'),[]));
  await reserveRequest(work,{code,purpose:'pronunciation-repair',hash:requestHash,model:body.model},body);
  await fs.writeFile(attemptFile,JSON.stringify(attempt,null,2));await fs.writeFile(raw.replace('.wav','.request.json'),JSON.stringify(body,null,2));
  const audio=await require('./generate-prototypes.cjs').geminiAudio(body,raw.replace('.wav','.usage.json'));
  checkWave(audio);await fs.writeFile(raw+'.part',audio);await fs.rename(raw+'.part',raw);
  attempt.state='complete-awaiting-listening';attempt.rawSha256=hash(audio);attempt.completedAt=new Date().toISOString();
 }catch(error){attempt.state='failed-or-uncertain';attempt.error=error.message;throw error;}
 finally{await fs.writeFile(attemptFile,JSON.stringify(attempt,null,2));await handle.close();await fs.unlink(lock);}
}
if(require.main===module)main().catch(error=>{console.error(error.message);process.exitCode=1;});
module.exports={repairRequest,repairSpec,assertDailyRoom};
