'use strict';
// Explicit, source-bound exception for a measured short silence. Normal split
// margins stay unchanged; no cut may cross an aligned word or audible sample.
const {waveParts}=require('./gemini-result.cjs');
function verifiedQuietCut(bytes,record,before,after){
 const {format,pcm}=waveParts(bytes),rate=format.readUInt32LE(4);
 if(format.readUInt16LE(2)!==1||format.readUInt16LE(12)!==2||rate!==24000)throw Error('Unsupported verification PCM');
 const {at,windowStart,windowEnd,reason}=record;
 if(![at,windowStart,windowEnd,before,after].every(Number.isFinite)||typeof reason!=='string'||reason.length<12||windowStart<before+.02||windowEnd>after-.02||at-windowStart<.04||windowEnd-at<.04||windowEnd-windowStart<.08||windowStart<0||windowEnd>pcm.length/2/rate)throw Error('Verified cut lacks quiet margins between words');
 let peak=0;for(let i=Math.floor(windowStart*rate);i<Math.ceil(windowEnd*rate);i++)peak=Math.max(peak,Math.abs(pcm.readInt16LE(i*2)));
 const maximumDbFS=peak?20*Math.log10(peak/32768):-Infinity;if(maximumDbFS> -60)throw Error('Verified cut window contains audible samples');
 return{at,windowStart,windowEnd,maximumDbFS,reason,voiceSamplesRemoved:0};
}
module.exports={verifiedQuietCut};
