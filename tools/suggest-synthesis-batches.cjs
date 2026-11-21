'use strict';
// Read-only packing suggestions. Never authorizes, reserves quota or sends audio.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {packedProposalRequests}=require('./proposal-plan.cjs'),{estimateSynthesis,policy}=require('./audio-batch-policy.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda');
async function main(){
 const {activities}=await import('../catalogue.js'),plans=JSON.parse(await fs.readFile(path.join(root,'content/production-plans.json'),'utf8')),repairs=JSON.parse(await fs.readFile(path.join(root,'content/audio-repairs.json'),'utf8')),catalog=JSON.parse(await fs.readFile(path.join(root,'content/synthesis-batches.json'),'utf8'));
 const reserved=new Set(catalog.batches.filter(b=>['received','authorized'].includes(b.state)).flatMap(b=>b.blocks.map(r=>r.take??r.code+'-'+r.part))),items=[];
 const weight=m=>m.words*60/policy.wordsPerMinute+m.longPauses*policy.longPauseSeconds+m.shortPauses*policy.shortPauseSeconds+2*policy.longPauseSeconds;
 for(const entry of activities.filter(e=>!e.audio&&plans[e.code]?.status==='approved'))for(const [i,body]of packedProposalRequests(entry).entries()){
  const id=entry.generationPlan.takes[i].id;if(reserved.has(id))continue;const config=body.generation_config.speech_config,voices=Array.isArray(config)?config:config.speakers,m=estimateSynthesis(body);
  items.push({id,code:entry.code,take:id,sourceRequestHash:createHash('sha256').update(JSON.stringify(body)).digest('hex'),voices:[...new Set(voices.map(v=>v.voice))],words:m.words,weight:weight(m)});
 }
 for(const [code,plan]of Object.entries(repairs))for(const repair of plan.repairs){const id=code+'-'+repair.part;if(reserved.has(id))continue;const m=estimateSynthesis({input:[{content:[{type:'text',text:repair.text}]}]});items.push({id,code,part:repair.part,sourceRequestHash:plan.approvedRequestHash,voices:[plan.voices[repair.speaker]],words:m.words,weight:weight(m)});}
 const voices=[...new Set(items.flatMap(x=>x.voices))],candidates=new Map();
 for(let a=0;a<voices.length;a++)for(let b=a;b<voices.length;b++){
  const pair=new Set([voices[a],voices[b]]),available=items.map((x,i)=>({...x,index:i})).filter(x=>x.voices.every(v=>pair.has(v)));
  function walk(at,mask,seconds,indices){if(seconds>policy.maximumSeconds-4)return;if(seconds>=policy.minimumSeconds-4&&indices.length&&!candidates.has(mask.toString()))candidates.set(mask.toString(),{mask,seconds,indices});for(let i=at;i<available.length;i++){const x=available[i];walk(i+1,mask|(1n<<BigInt(x.index)),seconds+x.weight,[...indices,x.index]);}}
  walk(0,0n,0,[]);
 }
 const options=items.map((_,i)=>[...candidates.values()].filter(c=>c.mask&(1n<<BigInt(i)))),eligible=items.reduce((m,_,i)=>options[i].length?m|(1n<<BigInt(i)):m,0n),target=items.reduce((n,x,i)=>n+(options[i].length?x.words:0),0),memo=new Map();let best={score:0,groups:[]},nodes=0;
 function solve(remaining,chosen,score){
  if(++nodes>25000||best.score===target)return;
  if(!remaining){if(score>best.score)best={score,groups:chosen};return;}
  let upper=score;for(let i=0;i<items.length;i++)if(remaining&(1n<<BigInt(i)))upper+=items[i].words;if(upper<=best.score)return;const key=remaining.toString();if((memo.get(key)??-1)>=score)return;memo.set(key,score);
  let selected=-1,allowed;for(let i=0;i<items.length;i++)if(remaining&(1n<<BigInt(i))){const opts=options[i].filter(c=>(c.mask&remaining)===c.mask);if(!opts.length){solve(remaining&~(1n<<BigInt(i)),chosen,score);return;}if(!allowed||opts.length<allowed.length){selected=i;allowed=opts;}}
  const value=c=>c.indices.reduce((n,i)=>n+items[i].words,0);allowed.sort((a,b)=>value(b)-value(a));for(const candidate of allowed)solve(remaining&~candidate.mask,[...chosen,candidate],score+value(candidate));solve(remaining&~(1n<<BigInt(selected)),chosen,score);
 }
 solve(eligible,[],0);
 const groups=best.groups.map(c=>({seconds:Math.ceil(c.seconds+4),voices:[...new Set(c.indices.flatMap(i=>items[i].voices))],blocks:c.indices.map(i=>items[i])})),covered=new Set(groups.flatMap(g=>g.blocks.map(b=>b.id))),waiting=items.filter(b=>!covered.has(b.id));
 const report={calibration:{wordsPerMinute:policy.wordsPerMinute,longPauseSeconds:policy.longPauseSeconds},nodes,candidates:candidates.size,coveredWords:best.score,eligibleWords:target,groups,waiting,action:'Suggestions only; validate and freeze each actual request separately.'};
 const output=process.argv.find(a=>a.startsWith('--output='))?.slice(9);if(output)await fs.writeFile(path.resolve(output),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({...report,groups:groups.map(g=>({...g,blocks:g.blocks.map(b=>b.id)})),waiting:waiting.map(b=>({id:b.id,seconds:Math.ceil(b.weight+4),voices:b.voices}))},null,2));
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
