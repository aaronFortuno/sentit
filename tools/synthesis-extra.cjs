'use strict';
// Explicit, fingerprinted guest/pilot support. Default historical batches stay strict.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const root=path.resolve(__dirname,'..'),sha=value=>createHash('sha256').update(value).digest('hex');
function assertGuestPolicy(policy,characters){
 if(!policy||policy.kind!=='anchor-with-guests-v1')throw Error('Política de convidats desconeguda.');
 if(policy.allowAnchorRepairs!==undefined&&typeof policy.allowAnchorRepairs!=='boolean')throw Error('Permís d’esmenes no vàlid.');
 if(!characters.some(c=>c.name===policy.speaker&&c.voice.id===policy.voice))throw Error('Veu recurrent de referència desconeguda.');
 if(!policy.guestVoice||characters.some(c=>c.voice.id===policy.guestVoice))throw Error('La veu ocasional envaeix un timbre recurrent.');
}
function assertGuestCast(entry,spec,policy,characters){
 if(spec.voices[policy.speaker]!==policy.voice)throw Error('El guió no conserva la veu recurrent de referència.');
 const names=Object.keys(spec.voices),guests=entry.guestSpeakers??[];
 if(names.length>2)throw Error('Massa papers al guió.');
 for(const name of names.filter(n=>n!==policy.speaker)){
  const guest=guests.find(g=>g.name===name&&g.voice===spec.voices[name]);
  if(!guest||guest.voice!==policy.guestVoice||characters.some(c=>c.name===name||c.voice.id===guest.voice))throw Error('Convidat no declarat o veu incompatible.');
 }
}
async function loadExtra(ref,policy,position,total){
 if(position!==total-1)throw Error('El pilot prioritari ha de ser l’últim tall.');
 if(ref.extra!=='MM-PILOT-001')throw Error('Tall extern no previst.');
 const registry=JSON.parse(await fs.readFile(path.join(root,'content/synthesis-extras.json'),'utf8'));
 const extra=registry.extras.find(e=>e.id===ref.extra);
 if(!extra||extra.status!=='teacher-selected-for-next-compatible-batch'||extra.priority!=='next-mar-batch'||extra.placement!=='last')throw Error('Tall extern no seleccionat o ja rebut.');
 if(policy.speaker!=='Mar'||policy.voice!=='Erinome'||extra.voice!==policy.voice||extra.speakerRole!=='Júlia'||extra.recurringCharacter!==false||extra.titleSpoken!==false)throw Error('Identitat del pilot incompatible.');
 if(extra.sourceFile!=='pilot-multimodal.json'||sha(await fs.readFile(path.join(root,extra.sourceFile)))!==extra.sourceSha256)throw Error('Origen del pilot canviat: revisar abans d’enviar.');
 if(sha(extra.canonicalBlock.text)!==extra.speechSha256||sha(JSON.stringify(extra))!==ref.sourceRequestHash)throw Error('Empremta del pilot diferent.');
 if(extra.canonicalBlock.type!=='text'||/[<>|]/u.test(extra.canonicalBlock.text)||!extra.canonicalBlock.annotations.some(a=>a.type==='speech_metadata'&&a.style))throw Error('Parla del pilot no vàlida.');
 return extra;
}
module.exports={assertGuestPolicy,assertGuestCast,loadExtra};
