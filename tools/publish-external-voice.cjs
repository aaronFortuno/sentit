'use strict';
// Publish a verified pilot clip for the parallel project; no synthesis or montage.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const{ffmpeg,ffmpegBinary}=require('./audio-files.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda'),sha=b=>createHash('sha256').update(b).digest('hex');
(async()=>{
 const id=process.argv.find(a=>a.startsWith('--extra='))?.slice(8);if(id!=='MM-PILOT-001')throw Error('Indica --extra=MM-PILOT-001.');
 const extra=JSON.parse(await fs.readFile(path.join(root,'content/synthesis-extras.json'))).extras.find(e=>e.id===id),index=JSON.parse(await fs.readFile(path.join(work,'mixed-batches/takes.json'))),take=index[id];
 if(!take||take.id!==id||take.parts.length!==1||take.parts[0]!=='speech')throw Error('Tall extern encara no verificat.');
 if(sha(await fs.readFile(take.file))!==take.sha256)throw Error('Presa externa alterada.');
 const batch=JSON.parse(await fs.readFile(path.join(root,'content/synthesis-batches.json'))).batches.find(b=>b.id===take.batch);
 if(batch?.state!=='received'||batch.blocks.at(-1)?.extra!==id||batch.approvedRequestHash!==take.batchRequestHash)throw Error('Origen del tall extern incompatible.');
 const requestFile=path.join(root,`assets/audio/synthesis-batches/${take.batch.toLowerCase()}-request.json`),request=JSON.parse(await fs.readFile(requestFile));
 if(request.input[0].content.at(-1).text!==extra.canonicalBlock.text||sha(JSON.stringify(extra))!==batch.blocks.at(-1).sourceRequestHash)throw Error('Text extern canviat.');
 const file='assets/audio/external/mm-pilot-001-voices-v1.mp3',manifest='assets/audio/external/mm-pilot-001-voices-v1.json';
 await fs.mkdir(path.join(root,'assets/audio/external'),{recursive:true});
 ffmpeg(await ffmpegBinary(),['-v','error','-y','-i',take.file,'-af','loudnorm=I=-19:TP=-2.5:LRA=9,aresample=48000,adelay=250:all=1,apad=pad_dur=0.35','-map_metadata','-1','-c:a','libmp3lame','-q:a','3',path.join(root,file)]);
 const record={id,title:extra.title,status:'voices-received-awaiting-listening',voice:extra.voice,speakerRole:extra.speakerRole,text:extra.canonicalBlock.text,speechSha256:extra.speechSha256,sourceSha256:extra.sourceSha256,batch:take.batch,requestHash:take.batchRequestHash,sourceRawSha256:take.rawBatchSha256,sourceTakeSha256:take.sha256,file,sha256:sha(await fs.readFile(path.join(root,file))),seconds:take.seconds,coverage:take.coverage,teacherAudioApproval:false,voiceRetimed:false,notes:'Veu sola per revisar al projecte multimodal; sense títol, música ni efectes. Presa crua conservada i marges del tall verificat mantinguts. Normalització de volum i petits marges de silenci, sense canvi de to o velocitat.'};
 await fs.writeFile(path.join(root,manifest),JSON.stringify(record,null,2)+'\n');console.log(JSON.stringify({id,file,manifest,status:record.status,newRequests:0}));
})().catch(e=>{console.error(e.message);process.exitCode=1;});
