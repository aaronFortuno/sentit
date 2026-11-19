'use strict';
const { request } = require('./audio-plan.cjs');
const spec = {
  code:'S008R', voices:{Narradora:'Aoede'},
  pace:'Natural Central Catalan, around 150 to 165 words per minute. One warm adult radio storyteller throughout. Friendly greeting, gentle curiosity while the photo is missing, relief at the explanation, a warm brief farewell. Clear consonants and complete endings, never overacted. Respect paragraph pauses and the inline pause tags. No sound effects or music: those are mixed locally.',
  montage:{ lead:2, voiceHandle:.25, tail:2.6, paperSeconds:.5, paperOverlap:.15, music:'original-soft-arpeggio-ducked', outro:'two-second-rise-and-fade', intro:'reuse-s008-v2-intro' },
};
function packedRadioRequest(entry) {
  const turns=entry.transcript.filter(part=>part.speaker);
  if(turns.some(part=>part.speaker!=='Narradora'))throw Error('S008R només admet la narradora validada.');
  const text=turns.map((part,index)=>`${index && ['album','mirar','comiat'].includes(part.id)?'<short pause>\n\n':''}${part.text}`).join('\n\n');
  return request([{speaker:'Narradora',text}],spec);
}
module.exports={spec,packedRadioRequest};
