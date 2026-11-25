'use strict';
// Derive public credits from the resources actually included in a mixed montage.
// Never upgrades a script, voice, montage or pronunciation approval.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda'),sha=b=>createHash('sha256').update(b).digest('hex');
async function main(){
 const {activities}=await import('../catalogue.js'),{soundSources}=await import('../content/sound-sources.js'),{musicCatalogue}=await import('../content/music-catalogue.js'),resources={};
 const mixedKeys=new Set(activities.filter(e=>/-(?:mixed|timing|directives|no-ambience|no-opening|title|news|corridor|hallway|classroom|city-bed|train|breaths|clean|inline-paper|tail)-v\d+|-news-(?:common|repair)-v\d+/.test(e.audio??'')).map(e=>e.language+'-'+e.code));
 for(const recording of soundSources)recording.usedBy=recording.usedBy.filter(id=>!mixedKeys.has(id));
 for(const entry of activities){
  const report=await fs.readFile(path.join(root,`assets/audio/${entry.code.toLowerCase()}-production-manifest.json`),'utf8').then(JSON.parse).catch(e=>{if(e.code==='ENOENT')return null;throw e;});
  if(!report||(!report.newsRevision&&!['shared-mixed-batch','assembled-grouped-voices','repaired-mixed-take','repaired-existing-master'].includes(report.productionMode)))continue;
  const key=entry.language+'-'+entry.code,labels=Object.entries(entry.production?.voices??report.voices).map(([name,voice])=>`${name}: ${voice}`).join('; ');
  const descriptions=[];
  for(const effect of report.effects??[]){
   if(report.productionMode==='repaired-existing-master'&&effect.origin==='original-procedural'&&effect.musicId){const music=musicCatalogue.find(m=>m.id===effect.musicId);if(!music)throw Error('Inherited music absent from catalogue');descriptions.push(`Base original «${music.title}» (${music.license}), molt baixa sota la narració, amb pujada i fosa final.`);continue;}
   if(report.productionMode==='repaired-existing-master'&&effect.origin==='original-procedural'&&['envelope-opening','sorting-to-delivery','note-paper'].includes(effect.name)){descriptions.push('Efecte breu del muntatge anterior conservat en la mateixa escena, sense generar cap so nou.');continue;}
   if(effect.origin==='licensed-recording-in-montage'){
    if(!effect.credit?.sourceNotDistributedSeparately||sha(await fs.readFile(path.join(work,'sources',effect.name+'.mp3')))!==effect.sourceSha256)throw Error('Licensed recording identity or distribution mismatch.');
    let recording=soundSources.find(s=>s.id===effect.name);if(!recording){recording={...effect.credit,sha256:effect.sourceSha256,usedBy:[]};soundSources.push(recording);}else Object.assign(recording,effect.credit,{sha256:effect.sourceSha256});if(!recording.usedBy.includes(key))recording.usedBy.push(key);
    descriptions.push(`${recording.title} · ${recording.author} (${recording.license}). ${effect.credit.treatment??'Ambient molt baix sota el trajecte; font completa conservada localment i distribuïda només dins del muntatge.'}`);continue;
   }
   if(effect.origin==='licensed-music-in-montage'){
    let music=musicCatalogue.find(item=>item.id===effect.credit.id);if(!music){music={...effect.credit,usedBy:[]};musicCatalogue.push(music);}if(!music.usedBy.includes(key))music.usedBy.push(key);
    descriptions.push(`${music.title} · ${music.author} (${music.license}). Entrada, base contínua atenuada sota la parla i sortida; font completa conservada localment, no distribuïda sola.`);continue;
   }
   if(effect.origin==='original-procedural-composition'){
    if(effect.compositionId&&!musicCatalogue.some(m=>m.id===effect.compositionId))musicCatalogue.push({id:effect.compositionId,title:effect.title,kind:'narration-bed',author:'Sentit',license:'MIT',licenseUrl:'https://github.com/aaronFortuno/sentit/blob/main/LICENSE',origin:'original-procedural',externalSamples:false,source:'tools/narration-bed.cjs',usedBy:[key],description:`Composició pròpia de piano suau i harmonia espaiada, ${effect.tempoBpm} pulsacions per minut; partitura determinista ${effect.scoreSeed}, fosa d’entrada, música atenuada sota la veu i pujada de dos segons seguida de fosa al final.`});
    if(effect.compositionId){const composition=musicCatalogue.find(m=>m.id===effect.compositionId);if(!composition.usedBy.includes(key))composition.usedBy.push(key);for(const code of ['S045','S046','S068','S069'])if(effect.compositionId==='sentit-'+code.toLowerCase()+'-v1'&&composition.usedBy.includes('ca-'+code+'D'))composition.sharedReason=`Composició compartida intencionadament entre ${code} narrada i ${code}D dialogada, amb mescles i durades pròpies.`;}
    descriptions.push(effect.jingleId?'Sintonia de programa «Ona curta» (MIT), només fora de la parla.':effect.compositionId?`Base original «${effect.title}» (MIT), molt baixa durant la narració, amb pujada i fosa final.`:'Dues notes originals de Sentit (MIT), fora de la parla.');continue;
   }
   let record=soundSources.find(s=>s.id===(effect.sourceId??effect.name));
   if(!record){const source=JSON.parse(await fs.readFile(path.join(work,'source-records',effect.name+'.json'),'utf8'));record={id:source.id,title:source.name.replace(/^Freesound - /,'').replace(/ by .*$/,''),author:source.author,url:source.url,license:source.license,licenseUrl:source.licenseUrl,origin:'external-recording',description:'Enregistrament real utilitzat en els muntatges indicats.',file:source.file,rendition:'Còpia pública HQ en MP3 de Freesound; no és el WAV original.',downloadUrl:source.downloadUrl??source.download,retrievedAt:source.retrievedAt??source.checkedAt,sha256:source.sha256,usedBy:[],treatment:'Fragments curts dins pauses i/o ambient atenuat sota la veu, segons el manifest de cada muntatge. Foses, filtratge i normalització locals. La font crua es conserva.'};soundSources.push(record);}
   if(sha(await fs.readFile(path.join(root,record.file)))!==record.sha256||record.sha256!==effect.sourceSha256)throw Error('Font diferent del muntatge: '+record.id);
   if(!record.usedBy.includes(key))record.usedBy.push(key);
   descriptions.push(`${record.title} · ${record.author} (${record.license})${effect.underSpeech?', molt baix sota la conversa':', fora de la parla'}.`);
  }
  const uncertain=(report.uncertainTurns??[]).map(u=>report.voiceApproval?.status==='approved'?` Torn curt «${u.text}» no confirmat pel reconeixement local; la presa completa té validació de veus del docent.`:` Torn curt pendent de comprovar a l’oïda: «${u.text}»; el reconeixement local no el confirma.`).join('');
  const status=entry.reviewStatus==='validated'?'Guió, veus i muntatge validats pel docent; publicació definitiva.':report.state==='awaiting-audio-corrections'?(report.directiveRevision?'Instruccions llegides per error retirades; pronunciació de «Quan hagis parlat» pendent d’esmena.':'Pauses tècniques escurçades; identitat i estabilitat de les veus pendents d’esmena.'):'Muntatge pendent d’audició docent, sense canvis de ritme.';
  resources[key]={voices:labels+'. Preses originals conservades; '+(report.productionMode==='assembled-grouped-voices'?'tres personatges intercalats a partir de dues preses compatibles. ':'')+status+uncertain,sounds:[...new Set(descriptions)].join(' '),...(report.newsRevision?{currentRevision:report.synthesisRepair?'news-repair-v3':'news-common-v2'}:{}),recipe:report.newsRevision?'tools/remount-news-common.cjs':report.montageAuthorization?'tools/render-news-batch.cjs':'tools/render-mixed-take.cjs'};
  if(report.cleanRevision)resources[key].recipe='tools/clean-s026-bookends.cjs';
  if(report.bookendRevision)resources[key].recipe='tools/clean-s042-bookends.cjs';
  if(report.classroomRevision)resources[key].recipe='tools/remount-s014-classroom.cjs';
  if(report.ambienceRevision)resources[key].recipe=report.ambienceRevision.source;
  if(report.trainRevision)resources[key].recipe=report.trainRevision.source??'tools/remount-s047-train.cjs';
  if(report.inlinePaperRevision)resources[key].recipe=report.inlinePaperRevision.source;
  if(report.tailRevision)resources[key].recipe='tools/finish-s035-tail.cjs';
  if(report.openingRevision)resources[key].recipe=report.openingRevision.source;
  if(report.newsTitleRevision&&!report.repairApplication){resources[key].recipe=report.newsTitleRevision.source;resources[key].voices+=' Presentació completa recuperada; primera frase pendent del proper lot de Mar, amb el paràgraf complet per comparar.';}
  if(report.cityBedRevision)resources[key].recipe=report.cityBedRevision.source;
  if(report.reviewMontageRevision){resources[key].recipe=report.reviewMontageRevision.source;if(report.reviewMontageRevision.unresolvedVoicePart)resources[key].voices+=' Torn del Biel «Llavors podem tenir aigua al voltant sense veure-la?» pendent d’esmena de veu; pauses i ambient revisats.';}
  if(report.repairApplication){resources[key].recipe=report.productionMode==='repaired-mixed-take'?'tools/render-mixed-take.cjs':'tools/render-reviewed-revision.cjs';resources[key].currentRevision=report.file.replace(/\.mp3$/,'');}
 }
 const previews=JSON.parse(await fs.readFile(path.join(root,'assets/audio/batch-voice-previews.json'),'utf8').catch(e=>{if(e.code==='ENOENT')return '[]';throw e;}));
 for(const preview of previews){const entry=activities.find(e=>e.code===preview.code);if(entry.audio)continue;resources[entry.language+'-'+entry.code]={voices:Object.entries(entry.production.voices).map(([name,voice])=>`${name}: ${voice}`).join('; ')+`. Lot ${preview.batch}, veus rebudes i pendents d’audició.`,sounds:'Previsualització de les veus sense música ni efectes. El muntatge i la sintonia encara estan pendents; no és un àudio definitiu.',recipe:'tools/prepare-batch-voice-previews.cjs'};}
 const sourcesFile=path.join(root,'content/sound-sources.js'),sourceText=await fs.readFile(sourcesFile,'utf8'),musicFile=path.join(root,'content/music-catalogue.js'),musicText=await fs.readFile(musicFile,'utf8');
 await fs.writeFile(sourcesFile,'// Sources actually used, with verified licenses and file fingerprints.\nexport const soundSources = '+JSON.stringify(soundSources,null,2)+';\n\n'+sourceText.slice(sourceText.indexOf('export function soundSourcesForActivity')));
 await fs.writeFile(musicFile,'// Narration compositions; recurring programme jingles have their own register.\nexport const musicCatalogue = '+JSON.stringify(musicCatalogue,null,2)+';\n\n'+musicText.slice(musicText.indexOf('export function musicForActivity')));
 await fs.writeFile(path.join(root,'content/mixed-audio-resources.js'),'// Generated from actual montage manifests; listening approval remains separate.\nexport const mixedAudioResources = '+JSON.stringify(resources,null,2)+';\n');
 console.log(JSON.stringify({activities:Object.keys(resources).length,recordings:soundSources.length,music:musicCatalogue.length,newRequests:0}));
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
