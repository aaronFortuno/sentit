'use strict';
// Offline planning only: no credentials, quota reservation or synthesis calls.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {request}=require('./audio-plan.cjs');
const root=path.resolve(__dirname,'..'),hash=x=>createHash('sha256').update(x).digest('hex');
function trialRequests(entry,plan){
 const next=plan.nextTrials,part=entry.transcript.find(p=>p.id===next?.part);
 if(!next?.teacherConfirmed||!part||part.speaker!==next.speaker||plan.voices[next.speaker]!==next.voice||part.text.split(next.canonicalText).length!==2)throw Error('Trial approval, canonical text or voice mismatch.');
 if(next.trials.length>next.maxTrials||new Set(next.trials.map(t=>t.id)).size!==next.trials.length)throw Error('Trial limit or identity mismatch.');
 return next.trials.map(trial=>{
  if(next.canonicalText.split(trial.canonicalWord).length!==2||next.canonicalText.replace(trial.canonicalWord,trial.ttsWord)!==trial.ttsText)throw Error('Only the approved auxiliary spelling may change.');
  if(/[<>]/u.test(trial.ttsText))throw Error('No literal direction tags in spoken text.');
  const body=request([{speaker:next.speaker,text:trial.ttsText}],{voices:{[next.speaker]:next.voice},pace:trial.direction});
  return {id:trial.id,code:entry.code,part:next.part,speaker:next.speaker,voice:next.voice,canonicalText:next.canonicalText,ttsText:trial.ttsText,canonicalSha256:hash(next.canonicalText),requestHash:hash(JSON.stringify(body)),body};
 });
}
async function main(){
 const code=process.argv.find(a=>a.startsWith('--only='))?.slice(7),{activities}=await import('../catalogue.js');
 const plan=JSON.parse(await fs.readFile(path.join(root,'content/audio-repairs.json'),'utf8'))[code],entry=activities.find(e=>e.code===code);
 if(!plan||!entry)throw Error('Specify --only=S022.');
 const trials=trialRequests(entry,plan);console.log(JSON.stringify({code,status:plan.nextTrials.status,newRequests:0,canonicalTextChanged:false,trials:trials.map(({body,...trial})=>trial),next:'Include in a compatible approved 6–8 minute batch; then audition each trial. No automatic splice.'},null,2));
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={trialRequests};
