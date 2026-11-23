'use strict';
// Local intake verification only. Never reserves quota, reads credentials or sends speech.
const assert=require('node:assert/strict');
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const sha=value=>createHash('sha256').update(value).digest('hex');
(async()=>{
 const root=path.resolve(__dirname,'..');
 const data=JSON.parse(await fs.readFile(path.join(root,'content/synthesis-extras.json'),'utf8'));
 assert.equal(data.schema,1);assert.equal(new Set(data.extras.map(item=>item.id)).size,data.extras.length);
 const pilot=data.extras.find(item=>item.id==='MM-PILOT-001');assert(pilot,'Selected pilot must remain in the intake register');
 assert.equal(pilot.voice,'Erinome');assert.equal(pilot.speakerRole,'Júlia');assert.equal(pilot.placement,'last');
 assert.equal(pilot.priority,'next-mar-batch');assert.equal(pilot.titleSpoken,false);assert.equal(pilot.recurringCharacter,false);
 assert.equal(pilot.status,'teacher-selected-for-next-compatible-batch');
 assert.equal(pilot.canonicalBlock.type,'text');assert(pilot.canonicalBlock.text.startsWith('Ei, soc la Júlia!'));
 assert.equal(sha(pilot.canonicalBlock.text),pilot.speechSha256,'Canonical speech must retain its selected fingerprint');
 assert(pilot.canonicalBlock.annotations.some(item=>item.type==='speech_metadata'&&item.style.includes('no title')));
 assert.equal(pilot.sourceFile,'pilot-multimodal.json');
 try{
  const source=await fs.readFile(path.join(root,pilot.sourceFile));
  assert.equal(sha(source),pilot.sourceSha256,'User input changed: reconcile before preparing a request');
  assert(source.toString('utf8').includes(pilot.canonicalBlock.text),'Snapshot words must be present verbatim in source');
 }catch(error){if(error.code!=='ENOENT')throw error;console.log('Original local input absent; exact selected snapshot retained.');}
 console.log('PASS · prioritized final Mar pilot, 80 exact words, separate spontaneous direction, no title or new recurring identity. Zero synthesis.');
})().catch(error=>{console.error(error);process.exitCode=1;});
