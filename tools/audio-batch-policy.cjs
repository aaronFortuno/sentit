'use strict';
// During catalogue growth, scarce requests are reserved for useful full batches.
// No automatic exception just because the queue is empty or quota has reset.
// L01/L02 returned every block in 261.6/298.6 s. Rounded conservative planning
// after these pilots: 170 spoken wpm and 2 s per long-pause tag. This is only a
// forecast; the actual silence/coverage is checked and speech is never retimed.
const policy=Object.freeze({phase:'catalogue-growth',minimumSeconds:360,maximumSeconds:480,wordsPerMinute:170,longPauseSeconds:2,shortPauseSeconds:.35});
function estimateSynthesis(body){
 const text=(body?.input??[]).flatMap(turn=>turn.content??[]).filter(part=>part.type==='text').map(part=>part.text??'').join(' ');
 const words=text.replace(/<[^>]*>/g,' ').replaceAll('|',' ').trim().split(/\s+/u).filter(Boolean).length;
 const longPauses=(text.match(/<long pause>/g)||[]).length,shortPauses=(text.match(/<short pause>/g)||[]).length;
 return {words,longPauses,shortPauses,seconds:Math.ceil(words*60/policy.wordsPerMinute+longPauses*policy.longPauseSeconds+shortPauses*policy.shortPauseSeconds+4)};
}
function assertSynthesisWindow(body,exception,now=Date.now()){
 const estimate=estimateSynthesis(body);
 if(estimate.seconds>policy.maximumSeconds)throw Error(`Lot massa llarg (${estimate.seconds} s estimats): dividir-lo per mantenir la finestra acordada de 6–8 minuts. Cap petició enviada.`);
 if(estimate.seconds<policy.minimumSeconds){
  const issued=Date.parse(exception?.approvedAt),expires=Date.parse(exception?.expiresAt),hash=require('node:crypto').createHash('sha256').update(JSON.stringify(body)).digest('hex');
  const allowed=exception?.kind==='teacher-short-batch'&&exception.approvedBy==='docent'&&/^L\d+$/.test(exception.batchId??'')&&exception.requestHash===hash&&typeof exception.confirmation==='string'&&exception.confirmation.length>=20&&Number.isFinite(issued)&&issued<=now+5000&&expires>now&&expires-issued>0&&expires-issued<=86400000;
  if(!allowed)throw Error(`Lot massa petit (${estimate.seconds} s estimats): durant el creixement cal omplir una petició de 6–8 minuts, o una excepció docent vigent per a aquest lot exacte. Cap petició enviada.`);
 }
 return estimate;
}
module.exports={policy,estimateSynthesis,assertSynthesisWindow};
