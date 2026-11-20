'use strict';
// During catalogue growth, scarce requests are reserved for useful full batches.
// No automatic exception just because the queue is empty or quota has reset.
const policy=Object.freeze({phase:'catalogue-growth',minimumSeconds:360,maximumSeconds:480,wordsPerMinute:120,longPauseSeconds:3,shortPauseSeconds:.35});
function estimateSynthesis(body){
 const text=(body?.input??[]).flatMap(turn=>turn.content??[]).filter(part=>part.type==='text').map(part=>part.text??'').join(' ');
 const words=text.replace(/<[^>]*>/g,' ').replaceAll('|',' ').trim().split(/\s+/u).filter(Boolean).length;
 const longPauses=(text.match(/<long pause>/g)||[]).length,shortPauses=(text.match(/<short pause>/g)||[]).length;
 return {words,longPauses,shortPauses,seconds:Math.ceil(words*60/policy.wordsPerMinute+longPauses*policy.longPauseSeconds+shortPauses*policy.shortPauseSeconds+4)};
}
function assertSynthesisWindow(body){
 const estimate=estimateSynthesis(body);
 if(estimate.seconds<policy.minimumSeconds)throw Error(`Lot massa petit (${estimate.seconds} s estimats): durant el creixement cal omplir una petició de 6–8 minuts. Esperar més material compatible i recordar-ho al docent abans de plantejar una excepció. Cap petició enviada.`);
 if(estimate.seconds>policy.maximumSeconds)throw Error(`Lot massa llarg (${estimate.seconds} s estimats): dividir-lo per mantenir la finestra acordada de 6–8 minuts. Cap petició enviada.`);
 return estimate;
}
module.exports={policy,estimateSynthesis,assertSynthesisWindow};
