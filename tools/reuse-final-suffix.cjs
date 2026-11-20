'use strict';
// Reuse a previously approved take when an edit only removes the beginning of
// its final turn. All remaining words and voices must match the saved script.
const fs=require('node:fs/promises'),path=require('node:path');
const {assertProductionApproved}=require('./production-approval.cjs');
const {packedProposalRequest}=require('./proposal-plan.cjs');

async function reuseFinalSuffix(entry,spec,plan,folder,hash){
 const edit=plan.voiceReuse;if(!edit)return null;
 if(edit.type!=='keep-final-suffix')throw Error('Tipus de reutilització de veu desconegut.');
 const snapshot=JSON.parse(await fs.readFile(path.join(folder,'approved-input.json'),'utf8'));
 assertProductionApproved(snapshot.entry,snapshot.spec,snapshot.plan);
 const sourceHash=hash(JSON.stringify(packedProposalRequest(snapshot.entry)));
 if(sourceHash!==edit.sourceRequestHash||snapshot.plan.approvedFingerprint!==edit.sourceApprovalFingerprint)throw Error('La presa original no correspon a l’aprovació conservada.');
 if(entry.introduction!==snapshot.entry.introduction||JSON.stringify(spec.voices)!==JSON.stringify(snapshot.spec.voices))throw Error('No es poden canviar el títol o les veus en reutilitzar la presa.');
 const original=snapshot.entry.transcript.filter(p=>p.speaker),current=entry.transcript.filter(p=>p.speaker);
 if(current.length!==original.length||current.at(-1).id!==edit.part)throw Error('Només es pot escurçar el darrer torn.');
 for(let i=0;i<current.length;i++){
  const before=original[i],after=current[i];
  if(before.id!==after.id||before.speaker!==after.speaker)throw Error('Els torns no coincideixen amb la presa original.');
  if(i<current.length-1&&before.text!==after.text)throw Error('Hi ha més text canviat a la presa.');
 }
 if(current.at(-1).text!==edit.retainedText||!original.at(-1).text.endsWith(edit.retainedText)||original.at(-1).text===edit.retainedText)throw Error('El text retingut no és el sufix exacte del comiat original.');
 if(!(edit.removeStart>0&&edit.removeEnd>edit.removeStart))throw Error('Interval de retall invàlid.');
 return {...edit,originalText:original.at(-1).text,sourceRequestHash:sourceHash,removedSeconds:edit.removeEnd-edit.removeStart};
}
module.exports={reuseFinalSuffix};
