'use strict';
// Script approval and a received take do not authorize a new montage.
function assertVoiceAudition(entry,take,progress){
 const approval=progress?.voiceApproval;
 if(take.missingParts?.length)throw Error(entry.code+': falten parts de veu; no muntar encara.');
 if(!approval||approval.status!=='approved'||approval.sourceTakeSha256!==take.sha256||!/^\d{4}-\d{2}-\d{2}/.test(approval.approvedAt??'')||!approval.confirmation)throw Error(entry.code+': cal l’audició i confirmació docent de la presa exacta abans del muntatge.');
}
module.exports={assertVoiceAudition};
