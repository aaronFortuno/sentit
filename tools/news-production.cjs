'use strict';
const {request}=require('./audio-plan.cjs');
const spec={code:'S023',strategy:'packed-title-news-v1',voices:{Presentadora:'Erinome',Pau:'Charon'},titleSpeaker:'Presentadora',pace:'Natural Central Catalan, around 145 to 155 words per minute. Erinome is Mar, an adult local radio journalist, clear and engaged without a dramatic newsreader tone. Charon is Pau, an adult fruit seller, conversational and thoughtful. Preserve natural topic pauses and distinguish reported facts, preferences and undecided proposals without over-emphasizing the answers. Read the exercise title and fiction notice first, then a long pause before Bon dia. Verbatim, no added music, effects or words.'};
function packedNewsRequest(entry){
  const parts=[{speaker:spec.titleSpeaker,text:entry.introduction+' <long pause>'},...entry.transcript.filter(part=>part.speaker)];
  const turns=[];
  for(const part of parts){const previous=turns.at(-1);if(previous?.speaker===part.speaker)previous.text+='\n\n'+part.text;else turns.push({speaker:part.speaker,text:part.text});}
  const body=request(turns,spec),seen=new Set();
  for(const item of body.input[0].content){const annotation=item.annotations[0];if(seen.has(annotation.speaker))annotation.style='Same Central Catalan voice and natural clear pace. Verbatim, no added sounds.';else seen.add(annotation.speaker);}
  return body;
}
module.exports={spec,packedNewsRequest};
