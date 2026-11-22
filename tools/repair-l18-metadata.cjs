'use strict';
// One offline correction of the L18 container, with every prior artefact kept.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {recoverStreamedWave}=require('./streamed-wave-recovery.cjs');
const root=path.resolve(__dirname,'..'),sha=x=>createHash('sha256').update(x).digest('hex');
(async()=>{
 const catalog=JSON.parse(await fs.readFile(path.join(root,'content/synthesis-batches.json'))),batch=catalog.batches.find(b=>b.id==='L18');
 const folder=path.resolve(root,'../output/sentit-primera-tanda/mixed-batches/l18-'+batch.approvedRequestHash.slice(0,12)),attemptFile=path.join(folder,'attempt.json'),attempt=JSON.parse(await fs.readFile(attemptFile));
 if(attempt.metadataRepairV2||attempt.requestHash!==batch.approvedRequestHash||attempt.state!=='raw-received')throw Error('Unexpected or already corrected attempt');
 const previous=await fs.readFile(path.join(folder,'raw.wav')),provider=await fs.readFile(path.join(folder,'provider-wave.wav'));
 if(sha(previous)!==attempt.rawSha256||sha(provider)!==attempt.waveRecovery.providerWaveSha256)throw Error('Source identity differs');
 const clean=recoverStreamedWave(provider);if(clean.report.interleavedMetadata.count!==35)throw Error('Unexpected metadata count: review before replacing files');
 require('./audio-files.cjs').checkWave(clean.audio);
 const archive=path.join(folder,'before-id3-repair');await fs.mkdir(archive);
 const names=await fs.readdir(folder);for(const name of names.filter(n=>/^(?:attempt|alignment|alignment-refined|split|wave-recovery)\.json$|^raw\.wav$|^s0\d+-t0\d(?:-intro|-body)?\.wav$/i.test(n)))await fs.copyFile(path.join(folder,name),path.join(archive,name));
 const receipt=path.join(root,'assets/audio/synthesis-batches/l18.json');await fs.copyFile(receipt,path.join(root,'assets/audio/synthesis-batches/l18-before-metadata-repair.json'),fs.constants.COPYFILE_EXCL);
 await fs.copyFile(path.join(root,'assets/audio/batch-voice-previews.json'),path.join(root,'assets/audio/batch-voice-previews-before-l18-metadata-repair.json'),fs.constants.COPYFILE_EXCL);
 await fs.writeFile(path.join(folder,'raw.wav.part'),clean.audio);await fs.rename(path.join(folder,'raw.wav.part'),path.join(folder,'raw.wav'));
 attempt.metadataRepairV2={at:new Date().toISOString(),priorRawSha256:attempt.rawSha256,originals:'before-id3-repair',newRequests:0};attempt.rawSha256=clean.report.recoveredWaveSha256;attempt.waveRecovery=clean.report;
 await fs.writeFile(attemptFile,JSON.stringify(attempt,null,2)+'\n');await fs.writeFile(path.join(folder,'wave-recovery-v2.json'),JSON.stringify(clean.report,null,2)+'\n');
 await fs.unlink(path.join(folder,'alignment-refined.json')).catch(e=>{if(e.code!=='ENOENT')throw e;});
 console.log(JSON.stringify({batch:'L18',removedTags:35,seconds:clean.report.seconds,allVoiceSamplesPreserved:true,newRequests:0}));
})().catch(e=>{console.error(e.message);process.exitCode=1;});
