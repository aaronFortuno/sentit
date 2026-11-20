'use strict';
// Read-only planning. No API client, credentials or synthesis path in this tool.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {request}=require('./audio-plan.cjs');
const {fingerprint}=require('./production-approval.cjs');
function productionSpec(entry){
  if(!entry.production)throw Error('Aquesta activitat no és una proposta del lot editorial.');
  if(entry.production.strategy==='grouped-voices-v1')return {code:entry.code,strategy:entry.production.strategy,voices:entry.production.voices,titleSpeaker:entry.production.titleSpeaker,pace:`Natural Central Catalan, clear complete consonants and natural pauses. ${entry.production.delivery} Read only the supplied lines verbatim, separated by the explicit long pauses for local editing. Do not add missing characters, questions or answers. No added sounds, words or vocalizations.`};
  const performance=entry.production.performance;
  if(performance){
    const part=entry.transcript.find(part=>part.id===performance.after);
    if(performance.kind!=='shared-chuckle'||part?.speaker!==performance.speaker||!entry.production.voices[performance.listener]||Object.keys(entry.production.voices).length!==2||performance.listener===performance.speaker)throw Error('Gest vocal sense configurar al guió o al repartiment.');
    return {code:entry.code,strategy:entry.production.strategy,voices:entry.production.voices,titleSpeaker:entry.production.titleSpeaker,performance,allowVocalTags:true,pace:'Natural Central Catalan, clear complete consonants and natural pauses. Warm conversational surprise, then amused gratitude. First the exercise title, a long pause, then the whole dialogue. Perform only the two explicitly tagged brief chuckles, one from each speaker, at the end of the conversation. No additional words, music, effects or other vocalizations.'};
  }
  return {code:entry.code,strategy:entry.production.strategy,voices:entry.production.voices,titleSpeaker:entry.production.titleSpeaker,pace:`Natural Central Catalan, clear complete consonants and natural pauses. ${entry.production.delivery} Read only the supplied dialogue verbatim. First the exercise title, a long pause, then the whole program. No added sounds, words or vocalizations.`,...(entry.production.overlaps?{overlaps:entry.production.overlaps}:{})};
}
function packedProposalRequest(entry){
  if(entry.production.strategy==='grouped-voices-v1')throw Error('Aquesta proposta requereix dues preses per grups de veus; no es pot enviar com una sola petició.');
  const spec=productionSpec(entry),turns=[];
  const spoken=entry.transcript.filter(part=>part.speaker).map(part=>({...part})),reactions=new Set();
  for(const overlap of spec.overlaps??[]){
    const host=spoken.find(part=>part.id===overlap.during),reaction=spoken.find(part=>part.id===overlap.reaction);
    if(!host||!reaction||host.speaker===reaction.speaker||Object.keys(spec.voices).length!==2||!overlap.after||host.text.split(overlap.after).length!==2||reactions.has(reaction.id)||/[|<>]/.test(reaction.text))throw Error('Solapament sense punt exacte o reacció vàlida.');
    host.text=host.text.replace(overlap.after,overlap.after+' |'+reaction.text+'|');reactions.add(reaction.id);
  }
  for(const part of [{speaker:spec.titleSpeaker,text:entry.introduction+' <long pause>'},...spoken.filter(part=>!reactions.has(part.id))]){
    const text=part.text+(spec.performance&&part.id===spec.performance.after?' <chuckle> |<chuckle>| <short pause>':'');
    const previous=turns.at(-1);if(previous?.speaker===part.speaker)previous.text+='\n\n'+text;else turns.push({speaker:part.speaker,text});
  }
  const body=request(turns,spec),seen=new Set();
  for(const item of body.input[0].content){const annotation=item.annotations[0],key=annotation.speaker??spec.titleSpeaker;if(seen.has(key))annotation.style=spec.performance?'Natural Central Catalan, conversational, clear consonants. Verbatim words; only the explicitly tagged brief chuckles, one per speaker.':'Same natural Central Catalan voice and pace. Verbatim, no added sounds.';else seen.add(key);}
  return body;
}
function packedProposalRequests(entry){
  if(entry.production.strategy!=='grouped-voices-v1')return [packedProposalRequest(entry)];
  const spec=productionSpec(entry),ids=['introduction',...entry.transcript.filter(part=>part.speaker).map(part=>part.id)],covered=entry.generationPlan.takes.flatMap(take=>take.parts);
  if(covered.length!==ids.length||new Set(covered).size!==ids.length||ids.some(id=>!covered.includes(id)))throw Error('El pla de preses no cobreix tot el text exactament una vegada.');
  return entry.generationPlan.takes.map(take=>{
    const turns=take.parts.map((id,index)=>{const part=id==='introduction'?{speaker:spec.titleSpeaker,text:entry.introduction}:entry.transcript.find(part=>part.id===id&&part.speaker);return {speaker:part.speaker,text:part.text+(index<take.parts.length-1?' <long pause>':'')};});
    return request(turns,spec);
  });
}
async function main(){
  const {proposedActivities,proposedVariants}=await import('../content/propostes/index.js');
  const plans=JSON.parse(await fs.readFile(path.resolve(__dirname,'../content/production-plans.json'),'utf8'));
  const code=process.argv.find(arg=>arg.startsWith('--only='))?.slice(7).toUpperCase().replace(/^CA-/,'');
  const entries=[...proposedActivities,...proposedVariants].filter(entry=>!code||entry.code===code);if(!entries.length)throw Error('Codi de proposta desconegut.');
  for(const entry of entries){const payloads=packedProposalRequests(entry);console.log(JSON.stringify({code:entry.code,words:entry.production.words,newRequests:entry.generationPlan.takes.reduce((n,take)=>n+take.requests,0),textItems:payloads.reduce((n,payload)=>n+payload.input[0].content.length,0),validation:plans[entry.code]?.status,fingerprint:fingerprint(entry,productionSpec(entry),plans[entry.code]),requestHashes:plans[entry.code]?.voiceReuse?[plans[entry.code].voiceReuse.sourceRequestHash]:payloads.map(payload=>createHash('sha256').update(JSON.stringify(payload)).digest('hex'))}));}
}
if(require.main===module)main().catch(error=>{console.error(error.message);process.exitCode=1;});
module.exports={productionSpec,packedProposalRequest,packedProposalRequests};
