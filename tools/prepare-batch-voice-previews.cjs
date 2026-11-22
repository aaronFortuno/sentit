'use strict';
// Voice-only previews for received whole takes; no jingle choice, montage approval
// or new provider request is implied. The immutable raw take remains local.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {ffmpeg,ffmpegBinary}=require('./audio-files.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda'),sha=b=>createHash('sha256').update(b).digest('hex');
async function main(){
 const {activities}=await import('../catalogue.js'),{productionProgress}=await import('../content/production-progress.js'),index=JSON.parse(await fs.readFile(path.join(work,'mixed-batches/takes.json'),'utf8')),binary=await ffmpegBinary();
 const only=process.argv.find(arg=>arg.startsWith('--only='))?.slice(7).toUpperCase();
 if(only&&!/^L\d+$/u.test(only))throw Error('Indica --only=LXX per a un lot rebut.');
 const rows=JSON.parse(await fs.readFile(path.join(root,'assets/audio/batch-voice-previews.json'),'utf8').catch(error=>{if(error.code==='ENOENT')return '[]';throw error;}));
 const codes=only?[...new Set(Object.values(index).filter(take=>take.batch===only&&/-T\d+$/u.test(take.id)).map(take=>take.code))]:['S006','S009','S029','S031','S039'];
 if(only&&!codes.length)throw Error('El lot encara no té preses completes verificades.');
 for(const code of codes){
  const entry=activities.find(e=>e.code===code),take=index[code+'-T01'];if(!take||entry.audio)continue;
  if(sha(await fs.readFile(take.file))!==take.sha256)throw Error('Presa alterada: '+code);
  const old=rows.findIndex(row=>row.code===code);
  if(old>=0&&rows[old].sourceTakeSha256!==take.sha256)throw Error('Previsualització anterior d’una altra presa: conservar-la abans de revisar.');
  const file=`assets/audio/${code.toLowerCase()}-voices-review-v1.mp3`;
  ffmpeg(binary,['-v','error','-y','-i',take.file,'-af','loudnorm=I=-19:TP=-2.5:LRA=9,aresample=48000,adelay=250:all=1,apad=pad_dur=0.35','-map_metadata','-1','-c:a','libmp3lame','-q:a','3',path.join(root,file)]);
  const record={code,title:entry.title,batch:take.batch,sourceTakeSha256:take.sha256,sourceRawSha256:take.rawBatchSha256,file,sha256:sha(await fs.readFile(path.join(root,file))),state:'voices-received-awaiting-montage',teacherAudioApproval:false,newRequests:0,voiceRetimed:false};
  if(old>=0)rows[old]=record;else rows.push(record);
  productionProgress['ca-'+code].voicePreview='./proves/veus-rebudes.html#'+code;
 }
 const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
 await fs.writeFile(path.join(root,'assets/audio/batch-voice-previews.json'),JSON.stringify(rows,null,2)+'\n');
 const ordered=[...rows].sort((a,b)=>Number(Boolean(activities.find(e=>e.code===a.code)?.audio))-Number(Boolean(activities.find(e=>e.code===b.code)?.audio))||a.code.localeCompare(b.code));
 const html=`<!doctype html><html lang="ca"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Veus rebudes · Sentit</title><style>body{font:17px/1.55 system-ui;background:#f7f4eb;color:#253b3a;max-width:850px;margin:32px auto;padding:0 24px}article{background:#fffdf8;padding:20px 24px;border:1px solid #d6ddd4;border-radius:14px;margin:20px 0}h1{font-size:1.7rem}h2{font-size:1.12rem}audio{width:100%}a{color:#1d6b65}.note{color:#6b5e43}article:target{outline:2px solid #a7c9b8}</style><h1>Veus rebudes</h1><p class="note">Preses per revisar la dicció abans del muntatge. Sense ambients ni sintonia; no són versions definitives. També es conserva l’arxiu de preses de peces que ja tenen muntatge.</p>${ordered.map(r=>`<article id="${r.code}"><h2>${escape(r.code+' · '+r.title)}</h2><p class="note">${activities.find(e=>e.code===r.code)?.audio?'Arxiu de veus originals; consulta el muntatge actual a la fitxa.':'Veus pendents d’audició i de muntatge.'}</p><audio controls preload="none" src="../${r.file}"></audio><p><a href="../#lectura=ca-${r.code}">Obre la fitxa i el guió</a> · Lot ${r.batch}</p></article>`).join('')}<p><a href="../">Torna a Sentit</a></p></html>`;
 await fs.writeFile(path.join(root,'proves/veus-rebudes.html'),html);
 await fs.writeFile(path.join(root,'content/production-progress.js'),'// Production stages are separate from editorial review and final listening approval.\nexport const productionProgress = '+JSON.stringify(productionProgress,null,2)+';\n');
 console.log(JSON.stringify({voicePreviews:rows.map(r=>r.code),newRequests:0}));
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
