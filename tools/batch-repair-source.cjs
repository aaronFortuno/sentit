'use strict';
const {request}=require('./audio-plan.cjs'),{trialRequests}=require('./pronunciation-trials.cjs');
function selectedRepair(entry,correction,ref,canonical){
 if(ref.trial&&ref.retry)throw Error('Una esmena no pot ser prova i reintent alhora.');
 if(ref.trial){const trial=trialRequests(entry,correction).find(t=>t.id===ref.trial);if(!trial)throw Error('Prova de pronunciació no autoritzada.');return{original:trial.body,sourceItems:trial.body.input[0].content,parts:[trial.part],id:trial.id,trial:trial.id,canonicalText:trial.canonicalText};}
 const repair=correction.repairs.find(r=>r.part===ref.part);if(!repair)throw Error('Esmena no autoritzada.');
 if(ref.retry){const next=repair.nextAttempt;if(next?.id!==ref.retry||next.status!=='awaiting-compatible-batch'||next.speaker!==repair.speaker||next.voice!==correction.voices[repair.speaker]||!next.instruction)throw Error('Reintent no autoritzat.');const original=request([{speaker:repair.speaker,text:repair.text}],{voices:{[repair.speaker]:next.voice},pace:correction.direction+' '+repair.pronunciation+' '+next.instruction});return{original,sourceItems:original.input[0].content,parts:[repair.part],id:next.id};}
 return{original:canonical,sourceItems:[canonical.input[0].content[correction.repairs.indexOf(repair)]],parts:[repair.part],id:entry.code+'-'+repair.part};
}
module.exports={selectedRepair};
