import { readFile, writeFile } from 'node:fs/promises';
import { proposedActivities, proposedVariants, secondBatchSources, dailySources, newUniverseSources, balanceSources } from '../content/propostes/index.js';
const file=new URL('../content/production-plans.json',import.meta.url);
const plans=JSON.parse(await readFile(file,'utf8'));
const newOnly=process.argv.includes('--new-only');
for(const entry of [...proposedActivities,...proposedVariants]){
  if(plans[entry.code]?.status==='approved'||(newOnly&&plans[entry.code]))continue;
  plans[entry.code]={status:'awaiting-validation',approvedFingerprint:null,reviewedAt:null,reviewActivity:`ca-${entry.code}`,reviewContent:balanceSources[entry.code]??newUniverseSources[entry.code]??dailySources[entry.code]??secondBatchSources[entry.code]??`content/propostes/${proposedVariants.includes(entry)?'variants':{'3':'tercer','4':'quart','5':'cinque','6':'sise'}[entry.grade]}.js`,format:entry.production.editorialFocus,cues:entry.transcript.filter(part=>part.kind==='direction').map(part=>part.text),plannedNewRequests:entry.generationPlan.takes.reduce((n,take)=>n+take.requests,0),requiredVoices:entry.production.voices,strategy:entry.production.strategy,ending:'Es conserva la cua completa i s’afegeixen els marges indicats a l’escaleta; cap síntesi abans de validar la proposta.'};
}
await writeFile(file,JSON.stringify(plans,null,2)+'\n');
console.log(`${proposedActivities.length+proposedVariants.length} propostes registrades; cap aprovació nova ni petició de síntesi.`);
