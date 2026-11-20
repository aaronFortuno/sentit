'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {ffmpegBinary,ffmpeg}=require('./audio-files.cjs');
const {duration}=require('./remaster-audio.cjs');
const {assertProductionApproved}=require('./production-approval.cjs');
const {spec,packedInterviewRequest}=require('./interview-production.cjs');
(async()=>{
 const {restauradora:entry}=await import('../content/una-restauradora-ens-explica-el-seu-ofici.js');
 const {mercat}=await import('../content/reobren-el-mercat.js');
 const plans=require('../content/production-plans.json'),report=require('../assets/audio/s015-production-manifest.json');
 assertProductionApproved(entry,spec,plans.S015);
 const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
 assert.equal(report.requestHash,hash(JSON.stringify(packedInterviewRequest(entry))));
 assert.equal(report.newSynthesisRequests,1);assert.equal(report.usage.total_input_tokens,601);assert.equal(report.usage.total_output_tokens,3349);
 assert.equal(entry.reviewStatus,'audio-review');assert.equal(report.state,'awaiting-audio-validation');
 assert(report.cut.at-report.cut.previousWordEnd>=.3);assert(report.cut.nextWordStart-report.cut.at>=.3);assert(report.cut.peakDbFS<=-45);
 assert(report.cut.rawSamplesPreserved);assert(!report.voice.retimed);
 assert.equal(hash(await fs.readFile(path.resolve(__dirname,'..',entry.audio))),report.sha256);
 assert(Math.abs(report.offset-(report.cut.at+.55))<.002);
 assert(Math.abs(report.bodyDuration-(report.rawDuration-report.cut.at+2.25+2.9))<.002);
 assert(report.lufs>=-24&&report.lufs<=-15&&report.peakDbTP<=-1);
 const binary=await ffmpegBinary(),folder=path.resolve(__dirname,'../../tmp/sentit-qa/interview-v0127');await fs.mkdir(folder,{recursive:true});
 for(const [name,file,seconds]of [['intro',entry.tracks.introduction,report.offset],['body',entry.tracks.body,report.bodyDuration],['full',entry.audio,report.fullDuration]]){
  const decoded=path.join(folder,name+'.wav');ffmpeg(binary,['-v','error','-xerror','-y','-i',path.resolve(__dirname,'..',file),'-ar','48000','-ac','1','-c:a','pcm_s16le',decoded]);
  assert(Math.abs(await duration(decoded)-seconds)<.05);
  const bytes=await fs.readFile(decoded),tail=bytes.subarray(bytes.length-4800*2);let peak=0;for(let i=0;i<tail.length;i+=2)peak=Math.max(peak,Math.abs(tail.readInt16LE(i)));assert(peak<20,'Silent ending preserved');
 }
 const {spec:newsSpec,packedNewsRequest}=require('./news-production.cjs');
 const news=packedNewsRequest(mercat);assert.equal(news.input[0].content.length,5);
 assert.deepEqual(newsSpec.voices,{Presentadora:'Erinome',Pau:'Charon'});
 const expected=[mercat.introduction,...mercat.transcript.filter(p=>p.speaker).map(p=>p.text)].join(' ');
 assert.equal(news.input[0].content.map(item=>item.text).join(' ').replace('<long pause>','').replace(/\s+/g,' ').trim(),expected);
 assert(!JSON.stringify(news).includes('ambient de sala'));assert.equal(plans.S023.status,'approved');
 assert.doesNotThrow(()=>assertProductionApproved(mercat,newsSpec,plans.S023));
 console.log('PASS · Approved S015, one request, exact raw identity, silent title cut with handles, complete unretimed voice, decoded MP3 tracks and levels; S023 approved and packed into one request. No API calls.');
})().catch(error=>{console.error(error);process.exitCode=1;});
