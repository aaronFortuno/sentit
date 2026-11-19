'use strict';
// Read-only planning. No API client, credentials or synthesis path in this tool.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {request}=require('./audio-plan.cjs');
const {fingerprint}=require('./production-approval.cjs');
function productionSpec(entry){
  if(!entry.production)throw Error('Aquesta activitat no és una proposta del lot editorial.');
  return {code:entry.code,strategy:entry.production.strategy,voices:entry.production.voices,titleSpeaker:entry.production.titleSpeaker,pace:`Natural Central Catalan, clear complete consonants and natural pauses. ${entry.production.delivery} Read only the supplied dialogue verbatim. First the exercise title, a long pause, then the whole program. No added sounds, words or vocalizations.`};
}
function packedProposalRequest(entry){
  const spec=productionSpec(entry),turns=[];
  for(const part of [{speaker:spec.titleSpeaker,text:entry.introduction+' <long pause>'},...entry.transcript.filter(part=>part.speaker)]){
    const previous=turns.at(-1);if(previous?.speaker===part.speaker)previous.text+='\n\n'+part.text;else turns.push({speaker:part.speaker,text:part.text});
  }
  const body=request(turns,spec),seen=new Set();
  for(const item of body.input[0].content){const annotation=item.annotations[0],key=annotation.speaker??spec.titleSpeaker;if(seen.has(key))annotation.style='Same natural Central Catalan voice and pace. Verbatim, no added sounds.';else seen.add(key);}
  return body;
}
async function main(){
  const {proposedActivities}=await import('../content/propostes/index.js');
  const plans=JSON.parse(await fs.readFile(path.resolve(__dirname,'../content/production-plans.json'),'utf8'));
  const code=process.argv.find(arg=>arg.startsWith('--only='))?.slice(7).toUpperCase().replace(/^CA-/,'');
  const entries=proposedActivities.filter(entry=>!code||entry.code===code);if(!entries.length)throw Error('Codi de proposta desconegut.');
  for(const entry of entries){const payload=packedProposalRequest(entry);console.log(JSON.stringify({code:entry.code,words:entry.production.words,newRequests:1,textItems:payload.input[0].content.length,validation:plans[entry.code]?.status,fingerprint:fingerprint(entry,productionSpec(entry),plans[entry.code]),requestHash:createHash('sha256').update(JSON.stringify(payload)).digest('hex')}));}
}
if(require.main===module)main().catch(error=>{console.error(error.message);process.exitCode=1;});
module.exports={productionSpec,packedProposalRequest};
