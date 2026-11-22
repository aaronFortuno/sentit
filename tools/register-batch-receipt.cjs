'use strict';
const fs=require('node:fs/promises'),path=require('node:path');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda');
async function main(){
 const id=process.argv.find(a=>a.startsWith('--only='))?.slice(7).toUpperCase(),file=path.join(root,'content/synthesis-batches.json'),catalog=JSON.parse(await fs.readFile(file,'utf8')),batch=catalog.batches.find(b=>b.id===id);if(!batch?.approvedRequestHash)throw Error('Lot no congelat.');
 const folder=path.join(work,'mixed-batches',id.toLowerCase()+'-'+batch.approvedRequestHash.slice(0,12)),attempt=JSON.parse(await fs.readFile(path.join(folder,'attempt.json'),'utf8')),split=JSON.parse(await fs.readFile(path.join(folder,'split.json'),'utf8')),provider=JSON.parse(await fs.readFile(path.join(folder,'usage.json'),'utf8'));
 if(attempt.state!=='raw-received'||attempt.rawSha256!==split.rawSha256||split.requestHash!==batch.approvedRequestHash)throw Error('Rebut no verificat.');
 const receipt={id,state:'received-and-split',requestHash:attempt.requestHash,rawSha256:attempt.rawSha256,startedAt:attempt.startedAt,completedAt:attempt.completedAt,rawSeconds:split.seconds,usage:provider.usage,returnedAudioBlocks:provider.audioBlocks,newRequests:1,coverageCheck:{engine:'vosk-model-small-ca-0.4',matchedFraction:split.coverage,pronunciationValidated:false,uncertainTurns:split.uncertainties??[]},parts:split.cuts.map(c=>({id:c.id,code:c.code,sourceRequestHash:c.sourceRequestHash,start:c.start,end:c.end,clipSha256:c.sha256,coverage:c.coverage,status:/-T\d+$/.test(c.id)?'voices-received':'correction-awaiting-listening'})),preservesOriginals:true,voiceRetimed:false};
 receipt.missingParts=split.cuts.filter(c=>c.missingParts?.length).map(c=>({take:c.id,parts:c.missingParts}));
 if(attempt.waveRecovery)receipt.waveRecovery=attempt.waveRecovery;
 if(attempt.recovery){const recovered=JSON.parse(await fs.readFile(path.join(folder,attempt.recovery),'utf8'));receipt.recovery={recoveredAt:recovered.recoveredAt,providerId:recovered.providerId,sourceExportSha256:recovered.sourceExportSha256,matchedSequence:recovered.matchedSequence,newRequests:0};}
 await fs.mkdir(path.join(root,'assets/audio/synthesis-batches'),{recursive:true});await fs.writeFile(path.join(root,`assets/audio/synthesis-batches/${id.toLowerCase()}.json`),JSON.stringify(receipt,null,2)+'\n');await fs.copyFile(path.join(folder,'request.json'),path.join(root,`assets/audio/synthesis-batches/${id.toLowerCase()}-request.json`));Object.assign(batch,{state:'received',receipt:`assets/audio/synthesis-batches/${id.toLowerCase()}.json`,completedAt:attempt.completedAt});await fs.writeFile(file,JSON.stringify(catalog,null,2)+'\n');
 const {activities}=await import('../catalogue.js'),{editorialFingerprint}=await import('../editorial-review.js'),{productionProgress}=await import('../content/production-progress.js'),index=JSON.parse(await fs.readFile(path.join(work,'mixed-batches/takes.json'),'utf8'));
 for(const code of new Set(split.cuts.filter(c=>/-T\d+$/.test(c.id)).map(c=>c.code))){
  const entry=activities.find(e=>e.code===code),needed=entry.generationPlan.takes.map(t=>t.id),received=needed.filter(t=>index[t]),progress=productionProgress['ca-'+code];if(!progress)throw Error('Guió sense validació registrada.');
  progress.uncertainTurns=(split.uncertainties??[]).filter(u=>u.block.startsWith(code+'-'));
  progress.receivedTakes={received,total:needed.length,batches:[...new Set(received.map(t=>index[t].batch))]};
  progress.voiceApproval=false;
  delete progress.synthesisIssue;
  progress.missingVoiceParts=needed.flatMap(t=>index[t]?.missingParts??[]);
  if(!entry.audio){progress.state=received.length===needed.length?'voices-received':'ready-for-voices';progress.editorialFingerprint=await editorialFingerprint(entry);progress.voicesReceivedAt=attempt.completedAt;progress.listeningApproval=false;}
 }
 await fs.writeFile(path.join(root,'content/production-progress.js'),'// Production stages are separate from editorial review and final listening approval.\nexport const productionProgress = '+JSON.stringify(productionProgress,null,2)+';\n');
 console.log(JSON.stringify({batch:id,seconds:split.seconds,usage:provider.usage,parts:split.cuts.length,teacherAudioApproval:false}));
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
