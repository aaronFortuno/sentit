'use strict';
// Comparison clips only. Never splices a master or approves pronunciation.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {recognize}=require('./local-align.cjs'),{align,tokens}=require('./split-synthesis-batch.cjs'),{ffmpeg,ffmpegBinary}=require('./audio-files.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda');
async function main(){
 const id=process.argv.find(a=>a.startsWith('--only='))?.slice(7).toUpperCase(),catalog=JSON.parse(await fs.readFile(path.join(root,'content/synthesis-batches.json'),'utf8')),batch=catalog.batches.find(b=>b.id===id);if(!batch?.approvedRequestHash)throw Error('Lot absent.');
 const folder=path.join(work,'mixed-batches',id.toLowerCase()+'-'+batch.approvedRequestHash.slice(0,12)),split=JSON.parse(await fs.readFile(path.join(folder,'split.json'),'utf8')),plans=JSON.parse(await fs.readFile(path.join(root,'content/audio-repairs.json'),'utf8')),{activities}=await import('../catalogue.js'),binary=await ffmpegBinary(),records=[],takeIndex=JSON.parse(await fs.readFile(path.join(work,'mixed-batches/takes.json'),'utf8'));
 await fs.mkdir(path.join(root,'assets/audio/repairs'),{recursive:true});
 for(const take of split.cuts.filter(c=>!/-T\d+$/.test(c.id)&&!batch.blocks.some(b=>b.extra===c.id))){
  const plan=plans[take.code],repair=plan.repairs.find(r=>r.part===take.parts[0]),trial=plan.nextTrials?.trials.find(t=>t.id===take.id),entry=activities.find(e=>e.code===take.code),legacy=path.join(work,take.code.toLowerCase());await fs.mkdir(legacy,{recursive:true});let raw,sourceTake;
  if(plan.sourceTakeId){
   const source=takeIndex[plan.sourceTakeId];if(!source||source.code!==take.code||source.sha256!==plan.sourceTakeSha256||source.batchRequestHash!==plan.sourceRequestHash||source.rawBatchSha256!==plan.sourceRawSha256||createHash('sha256').update(await fs.readFile(source.file)).digest('hex')!==plan.sourceTakeSha256)throw Error('Presa original canviada.');raw=source.file;sourceTake=source;
  }else{
   const files=await fs.readdir(legacy),names=files.filter(n=>n.endsWith('.wav')&&n.includes(plan.sourceRequestHash.slice(0,12)));
   for(const name of names){const file=path.join(legacy,name);if(createHash('sha256').update(await fs.readFile(file)).digest('hex')===plan.sourceRawSha256){raw=file;break;}}
  }
  if(!raw)throw Error('Presa original no localitzada: '+take.code);
  const missingOriginal=repair.missingOriginal===true||repair.part==='introduction'&&plan.scope==='missing-title',stem=id.toLowerCase()+'-'+take.code.toLowerCase()+'-'+(trial?trial.id:repair.part),candidateFile='assets/audio/repairs/'+stem+'-prova.mp3';let originalFile;
  if(!missingOriginal){
  // A derived take keeps its verified, shifted turn boundaries. Re-recognizing
  // the full recording can align a repeated phrase to the wrong occurrence.
  const known=sourceTake?.spans?.find(s=>s.part===repair.part&&s.text===repair.text&&s.coverage>=.65&&s.start>=0&&s.end>s.start&&s.end<=sourceTake.seconds);
  let from,to;
  if(known){from=Math.max(0,known.start-.3);to=Math.min(sourceTake.seconds,known.end+.45);}
  else {
  const recognition=await recognize(raw,path.join(legacy,'comparison-original-alignment.json')),expected=tokens([entry.introduction,...entry.transcript.filter(p=>p.speaker).map(p=>p.text)].join(' ')),phrase=tokens(repair.text),offsets=[];
  for(let i=0;i<=expected.length-phrase.length;i++)if(phrase.every((t,j)=>expected[i+j]===t))offsets.push(i);if(offsets.length!==1)throw Error('Frase original ambigua.');
  const {map}=align(expected,recognition.words),words=map.slice(offsets[0],offsets[0]+phrase.length).filter(Boolean);if(words.length/phrase.length<.65)throw Error('Comparació original sense prou cobertura.');
  from=Math.max(0,words[0].start-.25);to=Math.min(recognition.duration,words.at(-1).end+.4);
  }
  originalFile='assets/audio/repairs/'+stem+'-original.mp3';
  ffmpeg(binary,['-v','error','-y','-i',raw,'-af',`atrim=start=${from}:end=${to},asetpts=PTS-STARTPTS,loudnorm=I=-19:TP=-2.5:LRA=9,aresample=48000,adelay=250:all=1,apad=pad_dur=0.3`,'-c:a','libmp3lame','-q:a','3',path.join(root,originalFile)]);
  }
  const candidateFrom=Math.max(0,take.spans[0].start-.3),candidateTo=Math.min(take.seconds,take.spans.at(-1).end+.45);
  ffmpeg(binary,['-v','error','-y','-i',take.file,'-af',`atrim=start=${candidateFrom}:end=${candidateTo},asetpts=PTS-STARTPTS,loudnorm=I=-19:TP=-2.5:LRA=9,aresample=48000,adelay=250:all=1,apad=pad_dur=0.3`,'-c:a','libmp3lame','-q:a','3',path.join(root,candidateFile)]);
  records.push({code:take.code,part:repair.part,...(repair.sourceParts?{sourceParts:repair.sourceParts}:{}),...(repair.missingPart?{missingPart:repair.missingPart}:{}),text:repair.text,pronunciation:trial?.direction??repair.pronunciation,...(trial?{trialId:trial.id,ttsWord:trial.ttsWord,ttsText:trial.ttsText,canonicalTextChanged:false}:{}),status:'received-awaiting-listening',...(missingOriginal?{missingOriginal:true}:{originalFile}),candidateFile,sourceRawSha256:plan.sourceRawSha256,...(plan.sourceTakeId?{sourceTakeId:plan.sourceTakeId,sourceTakeSha256:plan.sourceTakeSha256}:{}),batchRequestHash:take.batchRequestHash,applied:false});
 }
 const manifest={batch:id,requestHash:batch.approvedRequestHash,repairs:records,masterChanged:false};await fs.writeFile(path.join(root,'assets/audio',id.toLowerCase()+'-repair-comparisons.json'),JSON.stringify(manifest,null,2)+'\n');
 const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');const cards=records.map(r=>`<section id="${r.trialId??r.code+'-'+r.part}"><h2>${r.code} · ${r.part}${r.ttsWord?' · '+escape(r.ttsWord):''}</h2><p>${escape(r.text)}</p>${r.ttsWord?'<p>Grafia auxiliar només de síntesi: '+escape(r.ttsWord)+'. El text editorial es conserva.</p>':''}<div class="clips">${r.originalFile?`<label>Original<audio controls preload="none" src="../${r.originalFile}"></audio></label>`:'<p>Fragment omès a la presa original; escolta la locució nova.</p>'}<label>Prova nova<audio controls preload="none" src="../${r.candidateFile}"></audio></label></div><a href="../#lectura=ca-${r.code}">Torna a ${r.code}</a></section>`).join('\n');
 await fs.writeFile(path.join(root,'proves','correccions-'+id.toLowerCase()+'.html'),`<!doctype html><html lang="ca"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sentit · Correccions ${id}</title><style>:root{color-scheme:light dark;font-family:system-ui;color:#233f37;background:#f7f6ef}body{max-width:960px;margin:0 auto;padding:32px 20px}header{margin-bottom:24px}h1{font-size:1.5rem}h2{font-size:1.05rem}section{background:#fffef8;border:1px solid #d7ddcf;border-radius:12px;padding:20px;margin-bottom:16px}.clips{display:flex;gap:24px;flex-wrap:wrap;margin:16px 0}label{display:grid;gap:8px}a{color:inherit}audio{max-width:100%}@media(prefers-color-scheme:dark){:root{background:#192924;color:#e4e9df}section{background:#22362f;border-color:#456055}}</style><header><a href="../">sentit.</a><h1>Correccions de veu · ${id}</h1><p>Compara la pronunciació. Els originals es conserven i aquestes proves encara no s’han aplicat als muntatges.</p></header><main>${cards}</main></html>`);
 const {productionProgress}=await import('../content/production-progress.js');for(const r of records){const progress=productionProgress['ca-'+r.code];progress.repairComparison='./proves/correccions-'+id.toLowerCase()+'.html#'+(r.trialId??r.code+'-'+r.part);progress.receivedRepairs=[...(progress.receivedRepairs??[]).filter(p=>r.trialId?p.trialId!==r.trialId:p.part!==r.part||p.trialId),r];if(progress.plannedRepair?.part===r.part)Object.assign(progress.plannedRepair,{status:'received-awaiting-listening',batch:id});if(r.missingOriginal)progress.voiceReviewUpdate={file:progress.voicePreviewFile,at:new Date().toISOString().slice(0,10),summary:{ca:'Els fragments nous ja són a «Escolta les esmenes». Cal escoltar-los juntament amb la resta de la locució abans de muntar.',es:'Los fragmentos nuevos están en «Escucha las correcciones». Hay que escucharlos junto al resto de la locución antes del montaje.'}};}await fs.writeFile(path.join(root,'content/production-progress.js'),'// Production stages are separate from editorial review and final listening approval.\nexport const productionProgress = '+JSON.stringify(productionProgress,null,2)+';\n');console.log(JSON.stringify({batch:id,comparisons:records.length,mastersChanged:false,newRequests:0}));
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
