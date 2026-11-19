'use strict';
const {request}=require('./audio-plan.cjs');
const spec={code:'S015',strategy:'packed-title-dialogue-v1',voices:{Entrevistador:'Puck',Nora:'Kore'},titleSpeaker:'Entrevistador',pace:'Natural Central Catalan, around 145 to 155 words per minute. Puck is a curious teenage interviewer; Kore is a calm adult art conservator. Natural questions, clear explanations, complete consonants. The interviewer first reads the exercise title, then takes a long pause before the interview. No music, effects or added words.'};
function packedInterviewRequest(entry){
  const parts=[{speaker:spec.titleSpeaker,text:entry.introduction+' <long pause>'},...entry.transcript.filter(part=>part.speaker)];
  const turns=[];
  for(const part of parts){const previous=turns.at(-1);if(previous?.speaker===part.speaker)previous.text+='\n\n'+part.text;else turns.push({speaker:part.speaker,text:part.text});}
  const body=request(turns,spec),seen=new Set();
  for(const item of body.input[0].content){const annotation=item.annotations[0];if(seen.has(annotation.speaker))annotation.style='Same Central Catalan voice and natural clear pace. Verbatim, no added sounds.';else seen.add(annotation.speaker);}
  return body;
}
module.exports={spec,packedInterviewRequest};
