'use strict';
// Offline montage of a verified mixed-batch take. Never calls a provider.
const fs=require('node:fs/promises'),path=require('node:path'),{createHash}=require('node:crypto');
const {ffmpegBinary,ffmpeg}=require('./audio-files.cjs'),{duration}=require('./remaster-audio.cjs'),{silenceCut}=require('./split-synthesis-batch.cjs');
const {makeBed}=require('./narration-bed.cjs');
const {waveParts}=require('./gemini-result.cjs');
const {wav:encodeWave}=require('./compact-mixed-pauses.cjs');
const {productionSpec}=require('./proposal-plan.cjs'),{assertProductionApproved}=require('./production-approval.cjs');
const root=path.resolve(__dirname,'..'),work=path.resolve(root,'../output/sentit-primera-tanda'),sha=b=>createHash('sha256').update(b).digest('hex');
const recipes={S021:{source:'content/propostes/sise.js',ambient:'soaress-546234',ambientFrom:40,events:[{before:'materials',after:'vespre',source:'evsecrets-footsteps-334457',from:1.4,seconds:1.1,gap:1.45},{before:'final',after:'limit',source:'beussa-749880',from:0,seconds:.678,gap:1.05}]},S032:{source:'content/propostes/tanda2/quart.js',ambient:'elenalostale-648659',ambientFrom:20,events:[{before:'prova',after:'ordre',source:'beussa-749880',from:0,seconds:.678,gap:1.05}]}};
Object.assign(recipes,{
 S130:{libraryMusic:'M1',events:[],ending:'ambient',lead:1.2,tail:5.6,titleGap:.4,cleanHandles:true,preserveBodyEnd:true},
 S081:{takeId:'S081-REPAIRED',ambient:'callmethefoo-744447',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.07,bedRaisedGain:.23},
 S088:{takeId:'S088-REPAIRED',ambient:'bexhillcollege-274213',ambientFrom:6,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.07,bedRaisedGain:.23,bedLowpassHz:800},
 S090:{takeId:'S090-REPAIRED',ambient:'soaress-546234',ambientFrom:40,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.07,bedRaisedGain:.23,bedLowpassHz:3600},
 S109:{takeId:'S109-REPAIRED',ambient:'soaress-546234',ambientFrom:40,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.07,bedRaisedGain:.23,bedLowpassHz:3600},
 S085:{takeId:'S085-REPAIRED',ambient:'soaress-546234',ambientFrom:140,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.08,bedRaisedGain:.23,bedLowpassHz:800},
 S093:{takeId:'S093-REPAIRED',ambient:'bexhillcollege-274213',ambientFrom:6,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.07,bedRaisedGain:.23,bedLowpassHz:800},
 S058:{ambient:'elenalostale-648659',ambientFrom:20,bed:true,events:[],ending:'ambient',lead:1.2,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.07,bedRaisedGain:.24},
 S059:{takeId:'S059-REPAIRED',ambient:'kyles-450728',ambientFrom:5,bed:true,events:[],ending:'ambient',lead:1.2,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.07,bedRaisedGain:.24},
 S061:{takeId:'S061-REPAIRED',ambient:'bexhillcollege-274213',ambientFrom:6,bed:true,events:[],ending:'ambient',lead:1.3,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.07,bedRaisedGain:.24,bedLowpassHz:800},
 S071:{takeId:'S071-REPAIRED',music:true,events:[],ending:'ambient',lead:1.6,tail:5.6,titleGap:.4,cleanHandles:true,preserveBodyEnd:true},
 S055:{newsMusic:true,events:[],ending:'ambient',lead:2.5,tail:4.25,titleGap:.65,cleanHandles:true},
 S083:{ambient:'soaress-546234',ambientFrom:40,bed:true,events:[],ending:'ambient',lead:1.3,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.22,bedSpeechGain:.10,bedRaisedGain:.28,bedLowpassHz:3600},
 S084:{ambient:'soaress-546234',ambientFrom:140,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.08,bedRaisedGain:.23,bedLowpassHz:800},
 S086:{ambient:'soaress-546234',ambientFrom:140,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.08,bedRaisedGain:.23,bedLowpassHz:800},
 S076:{ambient:'soundtasticpro-kitchen-484572',ambientFrom:5,bed:true,events:[],ending:'ambient',lead:1.2,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.18,bedSpeechGain:.08,bedRaisedGain:.28},
 S092:{ambient:'soaress-546234',ambientFrom:40,bed:true,events:[],ending:'ambient',lead:1.3,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.22,bedSpeechGain:.10,bedRaisedGain:.28,bedLowpassHz:3600},
 S098:{ambient:'vecera999-cafe-706805',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:1.2,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.08,bedRaisedGain:.24},
 S060:{ambient:'bexhillcollege-274213',ambientFrom:6,bed:true,events:[],ending:'ambient',lead:1.3,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.07,bedRaisedGain:.24,bedLowpassHz:800},
 S074:{ambient:'soundtasticpro-kitchen-484572',ambientFrom:5,bed:true,events:[],ending:'ambient',lead:1.2,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.18,bedSpeechGain:.08,bedRaisedGain:.28},
 S103:{ambient:'vecera999-cafe-706805',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:1.2,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.08,bedRaisedGain:.24},
 S101:{ambient:'callmethefoo-744447',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.07,bedRaisedGain:.23},
 S096:{ambient:'soaress-546234',ambientFrom:140,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.08,bedRaisedGain:.23,bedLowpassHz:800},
 S091:{ambient:'soaress-546234',ambientFrom:40,bed:true,events:[],ending:'ambient',lead:1.3,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.22,bedSpeechGain:.10,bedRaisedGain:.28,bedLowpassHz:3600},
 S105:{ambient:'soaress-546234',ambientFrom:140,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.08,bedRaisedGain:.23,bedLowpassHz:800},
 S108:{ambient:'soaress-546234',ambientFrom:40,bed:true,events:[],ending:'ambient',lead:1.3,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.22,bedSpeechGain:.10,bedRaisedGain:.28,bedLowpassHz:3600},
 S104:{ambient:'soaress-546234',ambientFrom:140,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.08,bedRaisedGain:.23,bedLowpassHz:800},
 S110:{ambient:'soaress-546234',ambientFrom:40,bed:true,events:[],ending:'ambient',lead:1.3,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.22,bedSpeechGain:.10,bedRaisedGain:.28,bedLowpassHz:3600},
 S111:{ambient:'fthgurdy-528944',ambientFrom:0,bed:true,events:[],ending:'ambient',lead:1.3,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.22,bedSpeechGain:.10,bedRaisedGain:.28,bedLowpassHz:3600},
 S106:{ambient:'soaress-546234',ambientFrom:140,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.08,bedRaisedGain:.23,bedLowpassHz:800},
 S056:{takeId:'S056-REPAIRED',newsMusic:true,events:[],ending:'ambient',lead:2.5,tail:4.25,titleGap:.65,cleanHandles:true},
 S100:{ambient:'soaress-546234',ambientFrom:140,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.08,bedRaisedGain:.23,bedLowpassHz:800},
 S099:{ambient:'soaress-546234',ambientFrom:140,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.08,bedRaisedGain:.23,bedLowpassHz:800},
 S094:{ambient:'soaress-546234',ambientFrom:140,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.08,bedRaisedGain:.23,bedLowpassHz:800},
 S089:{ambient:'soaress-546234',ambientFrom:40,bed:true,events:[],ending:'ambient',lead:1.3,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.22,bedSpeechGain:.10,bedRaisedGain:.28,bedLowpassHz:3600},
 S072:{music:true,ambient:'jmdh-covered-market-388315',ambientFrom:12,events:[],ending:'ambient',lead:2.1,tail:5.6,titleGap:.4,cleanHandles:true,overlays:[{after:'dubte',source:'beussa-749880',from:0,seconds:.678,lufs:-32}]},
 S087:{ambient:'soaress-546234',ambientFrom:140,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.08,bedRaisedGain:.23,bedLowpassHz:800},
 S097:{takeId:'S097-REPAIRED',ambient:'soaress-546234',ambientFrom:140,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.08,bedRaisedGain:.23,bedLowpassHz:800},
 S069:{takeId:'S069-REPAIRED',music:true,events:[],ending:'ambient',lead:1.6,tail:5.6,titleGap:.4,cleanHandles:true,preserveBodyEnd:true},
 S082:{takeId:'S082-REPAIRED',ambient:'callmethefoo-744447',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.3,bedSpeechGain:.12,bedRaisedGain:.4},
 S028:{ambient:'jmdh-covered-market-388315',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.35,bedSpeechGain:.14,bedRaisedGain:.45},
 S049:{ambient:'jmdh-covered-market-388315',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.35,bedSpeechGain:.14,bedRaisedGain:.45},
 S033:{ambient:'callmethefoo-744447',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.3,bedSpeechGain:.12,bedRaisedGain:.4},
 S036:{ambient:'callmethefoo-744447',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.3,bedSpeechGain:.12,bedRaisedGain:.4},
 S040:{ambient:'callmethefoo-744447',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.3,bedSpeechGain:.12,bedRaisedGain:.4},
 S052:{ambient:'callmethefoo-744447',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.3,bedSpeechGain:.12,bedRaisedGain:.4},
 S051:{ambient:'callmethefoo-744447',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.3,bedSpeechGain:.12,bedRaisedGain:.4},
 S046:{music:true,events:[],ending:'ambient',lead:1.6,tail:5.6,titleGap:.4,cleanHandles:true,preserveBodyEnd:true},
 S073:{ambient:'soundtasticpro-kitchen-484572',ambientFrom:5,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.35,bedSpeechGain:.14,bedRaisedGain:.45},
 S077:{ambient:'soundtasticpro-kitchen-484572',ambientFrom:5,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.35,bedSpeechGain:.14,bedRaisedGain:.45},
 S075:{ambient:'vecera999-cafe-706805',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.3,bedSpeechGain:.12,bedRaisedGain:.4},
 S062:{ambient:'kyles-450728',ambientFrom:5,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.3,bedSpeechGain:.12,bedRaisedGain:.4},
 S079:{ambient:'callmethefoo-744447',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.3,bedSpeechGain:.12,bedRaisedGain:.4},
 S078:{ambient:'callmethefoo-744447',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.3,bedSpeechGain:.12,bedRaisedGain:.4},
 S080:{ambient:'callmethefoo-744447',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.3,bedSpeechGain:.12,bedRaisedGain:.4},
 S046D:{music:true,events:[],ending:'ambient',lead:1.6,tail:5.6,titleGap:.4,cleanHandles:true,preserveBodyEnd:true},
 S045D:{music:true,events:[],ending:'ambient',lead:1.6,tail:5.6,titleGap:.4,cleanHandles:true,preserveBodyEnd:true},
 S068D:{music:true,events:[],ending:'ambient',lead:1.6,tail:5.6,titleGap:.4,cleanHandles:true,preserveBodyEnd:true},
 S071D:{music:true,events:[],ending:'ambient',lead:1.6,tail:5.6,titleGap:.4,cleanHandles:true,preserveBodyEnd:true},
 S057:{newsMusic:true,events:[],ending:'ambient',lead:2.5,tail:4.25,titleGap:.65,cleanHandles:true},
 S054:{newsMusic:true,events:[],ending:'ambient',lead:2.5,tail:4.25,titleGap:.65,cleanHandles:true},
 S053:{newsMusic:true,events:[],ending:'ambient',lead:2.5,tail:4.25,titleGap:.65,cleanHandles:true},
 S066:{ambient:'kyles-450728',ambientFrom:5,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.3,bedSpeechGain:.12,bedRaisedGain:.4},
 S064:{ambient:'kyles-450728',ambientFrom:5,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.3,bedSpeechGain:.12,bedRaisedGain:.4},
 S063:{ambient:'kyles-450728',ambientFrom:5,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.3,bedSpeechGain:.12,bedRaisedGain:.4},
 S065:{ambient:'kyles-450728',ambientFrom:5,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.3,bedSpeechGain:.12,bedRaisedGain:.4},
 S067:{ambient:'kyles-450728',ambientFrom:5,bed:true,events:[],ending:'ambient',lead:2,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2,bedOpeningGain:.3,bedSpeechGain:.12,bedRaisedGain:.4},
 S068:{music:true,events:[],ending:'ambient',lead:1.6,tail:5.6,titleGap:.4,cleanHandles:true,preserveBodyEnd:true},
 S069D:{music:true,events:[],ending:'ambient',lead:1.6,tail:5.6,titleGap:.4,cleanHandles:true,preserveBodyEnd:true},
 S050:{ambient:'jmdh-covered-market-388315',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:1.6,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2},
 S048:{ambient:'jmdh-covered-market-388315',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:1.6,tail:5.4,titleGap:.4,cleanHandles:true,bedFadeSeconds:2},
 S047:{music:true,events:[],ending:'ambient',lead:1.6,tail:5.6,titleGap:.4,cleanHandles:true,opening:[{source:'throndronis-799526',from:12,seconds:1.4,at:0}],overlays:[{after:'tren',source:'throndronis-799526',from:16,seconds:1,lufs:-41}]},
 S045:{music:true,events:[],ending:'ambient',lead:1.6,tail:5.6,titleGap:.4,cleanHandles:true,preserveBodyEnd:true,opening:[{source:'simgo-380687',from:12,seconds:1.4,at:0}],overlays:[{after:'davant',source:'funkysandwich-871017',from:0,seconds:.6,lufs:-36}]},
 S043:{ambient:'hz37-792502',ambientFrom:8,music:true,events:[{before:'hipotesi',after:'troballa',source:'beussa-749880',from:0,seconds:.678,gap:1.05}],ending:'ambient'},
 S027:{ambient:'fthgurdy-528944',ambientFrom:1,music:true,events:[{before:'baixar',after:'canvi',source:'ienba-850705',from:1,seconds:1.2,gap:1.5}],ending:'ambient'},
 S034:{ambient:'callmethefoo-744447',ambientFrom:12,music:true,events:[{before:'veins',after:'calor',source:'funkysandwich-871017',from:0,seconds:1.2,gap:1.5}],ending:'ambient'},
 S038:{ambient:'hz37-792502',ambientFrom:8,music:true,events:[],ending:'ambient'},
 S038D:{ambient:'callmethefoo-744447',ambientFrom:12,music:true,events:[],ending:'ambient'},
 S007:{ambient:'elenalostale-648659',ambientFrom:20,opening:[{source:'funkysandwich-871017',from:0,seconds:1.2,at:.3}],events:[{before:'proposta',after:'prudencia',source:'beussa-749880',from:0,seconds:.678,gap:1.05}],ending:'tone'},
 S011:{ambient:'elenalostale-648659',ambientFrom:20,opening:[{source:'breezy2000uk-578712',from:3,seconds:.8,at:.35}],events:[{before:'sostre',after:'confirmacio',source:'breezy2000uk-578712',from:3,seconds:.8,gap:1.15}],ending:'tone'},
 S024:{ambient:'mcconnell-731979',ambientFrom:20,events:[{before:'jocs',after:'temps',source:'beussa-749880',from:0,seconds:.678,gap:1.05}],ending:'tone'},
 S017:{ambient:'tallis0410-707510',ambientFrom:15,bed:true,opening:[{source:'funkysandwich-871017',from:0,seconds:1.2,at:.35}],events:[{before:'embalatge',after:'pluja-anticipada',source:'beussa-749880',from:0,seconds:.678,gap:1.05}],ending:'ambient'},
 S035:{ambient:'tallis0410-707510',ambientFrom:15,bed:true,events:[{before:'nom',after:'dues',source:'beussa-749880',from:0,seconds:.678,gap:1.05}],ending:'ambient'},
 S014:{ambient:'elenalostale-648659',ambientFrom:20,opening:[{source:'godowan-235278',from:0,seconds:1.35,at:.3}],events:[{before:'apuntar',after:'observar',source:'beussa-749880',from:0,seconds:.678,gap:1.05}],ending:'tone'},
 S026:{ambient:'tallis0410-707510',ambientFrom:15,bed:true,opening:[{source:'breezy2000uk-578712',from:3,seconds:1.1,at:.25}],events:[],ending:'box'},
 S041:{ambient:'tallis0410-707510',ambientFrom:15,bed:true,events:[{before:'llegir',after:'consultar',source:'funkysandwich-871017',from:0,seconds:1.2,gap:1.5}],ending:'ambient'},
 S042:{ambient:'elenalostale-648659',ambientFrom:20,events:[{before:'segon',after:'primer',source:'beussa-749880',from:0,seconds:.678,gap:1.05}],ending:'chair'},
 S025:{opening:[{source:'brnck-257357',from:0,seconds:.257,at:.7}],events:[],ending:'chair'},
 S030:{ambient:'elenalostale-648659',ambientFrom:20,opening:[{source:'beussa-749880',from:0,seconds:.678,at:.3}],events:[{before:'tornar',after:'porta',source:'beussa-749880',from:0,seconds:.678,gap:1.05}],ending:'steps'},
 S037:{ambient:'elenalostale-648659',ambientFrom:20,opening:[{source:'beussa-749880',from:0,seconds:.678,at:.3}],events:[],ending:'steps'},
 S044:{opening:[{source:'brnck-257357',from:0,seconds:.257,at:.6}],events:[{before:'provar',after:'afegir',source:'beussa-749880',from:0,seconds:.678,gap:1.05}],ending:'paper'},
});
Object.assign(recipes,{
 S112:{newsMusic:true,events:[],ending:'ambient',lead:2.5,tail:4.25,titleGap:.65,cleanHandles:true},
 S113:{newsMusic:true,events:[],ending:'ambient',lead:2.5,tail:4.25,titleGap:.65,cleanHandles:true},
 S115:{newsMusic:true,events:[],ending:'ambient',lead:2.5,tail:4.25,titleGap:.65,cleanHandles:true},
 S117:{newsMusic:true,events:[],ending:'ambient',lead:2.5,tail:4.25,titleGap:.65,cleanHandles:true},
 S119:{newsMusic:true,events:[],ending:'ambient',lead:2.5,tail:4.25,titleGap:.65,cleanHandles:true},
 S114:{newsMusic:true,events:[],ending:'ambient',lead:2.5,tail:4.25,titleGap:.65,cleanHandles:true},
 S116:{newsMusic:true,events:[],ending:'ambient',lead:2.5,tail:4.25,titleGap:.65,cleanHandles:true},
 S118:{newsMusic:true,events:[],ending:'ambient',lead:2.5,tail:4.25,titleGap:.65,cleanHandles:true},
 S120:{ambient:'kyles-450728',ambientFrom:5,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.14,bedSpeechGain:.06,bedRaisedGain:.20},
 S123:{ambient:'bexhillcollege-274213',ambientFrom:6,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.14,bedSpeechGain:.06,bedRaisedGain:.20,bedLowpassHz:800},
 S124:{ambient:'callmethefoo-744447',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.07,bedRaisedGain:.23},
 S125:{ambient:'callmethefoo-744447',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.07,bedRaisedGain:.23},
 S126:{ambient:'callmethefoo-744447',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.07,bedRaisedGain:.23},
 S121:{ambient:'mcconnell-731979',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.14,bedSpeechGain:.06,bedRaisedGain:.20,bedLowpassHz:1800},
 S127:{ambient:'callmethefoo-744447',ambientFrom:12,bed:true,events:[],ending:'ambient',lead:1.1,tail:3.8,titleGap:.4,cleanHandles:true,bedFadeSeconds:1.4,bedOpeningGain:.16,bedSpeechGain:.07,bedRaisedGain:.23},
});
async function main(){
 const code=process.argv.find(a=>a.startsWith('--only='))?.slice(7).toUpperCase(),recipe=recipes[code];if(!recipe)throw Error('Recepta de muntatge encara pendent per a aquest codi.');
 const {activities}=await import('../catalogue.js'),entry=activities.find(e=>e.code===code),plans=JSON.parse(await fs.readFile(path.join(root,'content/production-plans.json'),'utf8'));assertProductionApproved(entry,productionSpec(entry),plans[code]);if(entry.audio)throw Error('Ja hi ha un muntatge: conservar-lo i obrir-ne una revisió explícita.');
 const contentFile=path.join(root,recipe.source??plans[code].reviewContent);let source=await fs.readFile(contentFile,'utf8');const at=new RegExp(`\\bcode:\\s*['"]${code}['"]`).exec(source)?.index??-1,lineEnd=source.indexOf('\n',at);if(at<0||lineEnd<0||source.slice(lineEnd,lineEnd+220).includes('audio:'))throw Error('Capçalera no esperada.');
 const takes=JSON.parse(await fs.readFile(path.join(work,'mixed-batches/takes.json'),'utf8')),take=takes[recipe.takeId??(entry.production.strategy==='grouped-voices-v1'?`${code}-ASSEMBLED`:`${code}-T01`)];if(!take?.body)throw Error('Presa completa verificada encara absent.');
 for(const source of [take,take.intro,take.body])if(!source||sha(await fs.readFile(source.file))!==source.sha256)throw Error('Presa alterada o incompleta.');
 require('./voice-audition.cjs').assertVoiceAudition(entry,take,(await import('../content/production-progress.js')).productionProgress['ca-'+code]);
 const batchFolder=path.dirname(take.file),split=JSON.parse(await fs.readFile(path.join(batchFolder,'split.json'),'utf8')),provider=JSON.parse(await fs.readFile(path.join(batchFolder,'usage.json'),'utf8'));
 const output=path.join(work,code.toLowerCase(),'mixed-v1');await fs.mkdir(output,{recursive:true});const binary=await ffmpegBinary();
 const wav=(name,args)=>{const file=path.join(output,name+'.wav');ffmpeg(binary,['-v','error','-y',...args,'-ar','48000','-ac','1','-c:a','pcm_s16le',file]);return file;};
 let bodyInput=take.body.file,titleInput=take.intro.file,bodyTrimStart=0,voiceHandles;
 if(recipe.cleanHandles){
  const trim=async(source,name,start,end)=>{
   const original=await fs.readFile(source.file),decoded=waveParts(original),rate=decoded.format.readUInt32LE(4),frame=decoded.format.readUInt16LE(12),seconds=decoded.pcm.length/frame/rate;
   const safe=(target,opening)=>{if(opening&&target<=0)return 0;for(const margin of [0,.04,.08,.16,.24,.32,.48]){const at=Math.max(0,Math.min(seconds,target+(opening?-margin:margin))),first=Math.max(0,Math.floor((at-.006)*rate)*frame),last=Math.min(decoded.pcm.length,Math.ceil((at+.006)*rate)*frame);let peak=0;for(let i=first;i<last;i+=2)peak=Math.max(peak,Math.abs(decoded.pcm.readInt16LE(i)));if(peak<=32768*10**(-40/20))return Math.round(at*rate);}throw Error('Sense marge silenciós segur a '+name);};
   const first=safe(start,true),last=safe(end,false),pcm=decoded.pcm.subarray(first*frame,last*frame),file=path.join(output,name+'.wav');
   await fs.writeFile(file,encodeWave(decoded.format,pcm));return{file,start:first/rate,end:last/rate,retainedPcmSha256:sha(pcm),sourceSha256:sha(original),allRetainedSamplesIdentical:true};
  };
  const body=await trim(take.body,'body-input',Math.max(0,take.spans[1].start-take.titleCut-.2),recipe.preserveBodyEnd?take.body.seconds:Math.min(take.body.seconds,take.spans.at(-1).end-take.titleCut+.35));
  const title=await trim(take.intro,'title-input',Math.max(0,take.spans[0].start-.2),Math.min(take.intro.seconds,take.spans[0].end+.2));
  bodyInput=body.file;titleInput=title.file;bodyTrimStart=body.start;
  const {file:bodyPath,...bodyRecord}=body,{file:titlePath,...titleRecord}=title;voiceHandles={body:bodyRecord,title:titleRecord};
 }
 const records=(await import('../content/sound-sources.js')).soundSources;
 async function recording(id){const existing=records.find(s=>s.id===id);const r=existing??await fs.readFile(path.join(work,'source-records',id+'.json'),'utf8').then(JSON.parse);if(sha(await fs.readFile(path.join(root,r.file)))!==r.sha256)throw Error('Font alterada: '+id);return r;}
 const ambient=recipe.ambient?await recording(recipe.ambient):null,paper=await recording('beussa-749880'),events=[];
 for(const event of recipe.events){const before=take.spans.find(s=>s.part===event.before),after=take.spans.find(s=>s.part===event.after);if(!before||!after)throw Error('Referència del muntatge absent.');const absolute=silenceCut(take.start+after.end,take.start+before.start,split.silences),at=absolute-take.start-take.titleCut;events.push({...event,at,recording:await recording(event.source)});}
 events.sort((a,b)=>a.at-b.at);
 const segments=[],list=[];let cursor=0;for(const [i,event]of events.entries()){segments.push(wav('voice-'+i,['-i',bodyInput,'-af',`atrim=start=${cursor}:end=${event.at},asetpts=PTS-STARTPTS`]));segments.push(wav('gap-'+i,['-f','lavfi','-i','anullsrc=r=48000:cl=mono','-t',String(event.gap)]));cursor=event.at;}segments.push(wav('voice-end',['-i',bodyInput,'-af',`atrim=start=${cursor},asetpts=PTS-STARTPTS`]));
 for(const file of segments)list.push(`file '${file.replaceAll('\\','/').replaceAll("'","'\\''")}'`);const concat=path.join(output,'voice.ffconcat');await fs.writeFile(concat,'ffconcat version 1.0\n'+list.join('\n')+'\n');
 const lead=recipe.lead??2.4,tail=recipe.tail??(recipe.music?5.6:3.3),voice=wav('voice-complete',['-f','concat','-safe','0','-i',concat,'-af',`loudnorm=I=-19:TP=-2.5:LRA=9,aresample=48000,adelay=${lead*1000}:all=1,apad=pad_dur=${tail}`]),total=await duration(voice);
 const inputs=[voice],effects=[];function add(file,at,source,details={}){inputs.push(file);effects.push({name:source.id,start:at,source:source.file,sourceSha256:source.sha256,sourceUrl:source.url,author:source.author??source.id.split('-')[0],license:source.license,...details});}
 if(ambient&&!recipe.bed){const opening=wav('ambient-opening',['-i',path.join(root,ambient.file),'-af',`atrim=start=${recipe.ambientFrom}:end=${recipe.ambientFrom+2},asetpts=PTS-STARTPTS,loudnorm=I=-29:TP=-9:LRA=5,afade=t=in:d=0.2,afade=t=out:st=1.5:d=0.5`]);add(opening,0,ambient,{excerpt:{start:recipe.ambientFrom,seconds:2},underSpeech:false});}
 const voiceEnd=lead+take.spans.at(-1).end-take.titleCut-bodyTrimStart+events.reduce((n,e)=>n+e.gap,0);
 if(recipe.newsMusic){const bed=await require('./news-bed.cjs').makeNewsBed({folder:output,binary,total,voiceEnd,lead});inputs.push(bed.file);effects.push(bed.effect);}
 if(recipe.music){const music=await makeBed({code,title:entry.title,folder:output,binary,duration:total,lead,voiceEnd});inputs.push(music.file);effects.push({...music.effect,start:0,underSpeech:true});}
 if(recipe.libraryMusic){const music=await require('./library-narration-bed.cjs').makeLibraryBed({id:recipe.libraryMusic,folder:output,binary,duration:total,lead,voiceEnd});inputs.push(music.file);effects.push({...music.effect,start:0});}
 if(ambient&&recipe.bed){
  const room=wav('room-excerpt',['-i',path.join(root,ambient.file),'-af',`atrim=start=${recipe.ambientFrom}:end=${recipe.ambientFrom+90},asetpts=PTS-STARTPTS,highpass=f=100,lowpass=f=${recipe.bedLowpassHz??1800},loudnorm=I=-28:TP=-9:LRA=6,aresample=48000`]);
  const roomSeconds=await duration(room);if(roomSeconds<=1)throw Error('Ambient massa curt per fer foses creuades.');
  const passes=Math.max(3,Math.ceil((total-1)/(roomSeconds-1))),loopInputs=Array.from({length:passes},()=>['-i',room]).flat(),loopFilters=[];
  for(let i=1;i<passes;i++)loopFilters.push(`${i===1?'[0:a]':'[loop'+(i-1)+']'}[${i}:a]acrossfade=d=1[${i===passes-1?'out':'loop'+i}]`);
  const roomLoop=wav('room-crossfaded',[...loopInputs,'-filter_complex',loopFilters.join(';'),'-map','[out]']);if(await duration(roomLoop)<total)throw Error('Ambient curt per a la conversa.');
  const end=total-.6,duckStart=lead-.9,duckEnd=lead-.15,riseStart=voiceEnd+.35,riseEnd=voiceEnd+1.15,fade=recipe.bedFadeSeconds??1.2,openingGain=recipe.bedOpeningGain??.7,speechGain=recipe.bedSpeechGain??.2,raisedGain=recipe.bedRaisedGain??.7;
  const bed=wav('room-bed',['-i',roomLoop,'-af',`atrim=end=${end},volume='if(lt(t,${duckStart}),${openingGain},if(lt(t,${duckEnd}),${openingGain}-(${openingGain-speechGain})*(t-${duckStart})/(${duckEnd-duckStart}),if(lt(t,${riseStart}),${speechGain},if(lt(t,${riseEnd}),${speechGain}+(${raisedGain-speechGain})*(t-${riseStart})/(${riseEnd-riseStart}),${raisedGain}))))':eval=frame,afade=t=in:d=0.4,afade=t=out:st=${end-fade}:d=${fade},apad=pad_dur=0.6`]);add(bed,0,ambient,{underSpeech:true,speechGain,openingGain,raisedGain,sourceTargetLufs:-28,speechNominalLufs:-28+20*Math.log10(speechGain),lowPassHz:recipe.bedLowpassHz??1800,passes,crossfadeSeconds:1,excerpt:{start:recipe.ambientFrom,seconds:roomSeconds},envelope:{riseStart,riseEnd,holdSeconds:Math.max(0,end-fade-riseEnd),fadeStart:end-fade,fadeEnd:end}});
 }
 for(const [i,event]of (recipe.opening??[]).entries()){const source=await recording(event.source),file=wav('opening-'+i,['-i',path.join(root,source.file),'-af',`atrim=start=${event.from}:end=${event.from+event.seconds},asetpts=PTS-STARTPTS,loudnorm=I=-29:TP=-9:LRA=5,afade=t=in:d=0.025,afade=t=out:st=${Math.max(.03,event.seconds-.08)}:d=0.08`]);add(file,event.at,source,{excerpt:{start:event.from,seconds:event.seconds},underSpeech:false});}
 for(const [i,event]of (recipe.overlays??[]).entries()){
  const span=take.spans.find(s=>s.part===event.after);if(!span)throw Error('Referència de simultaneïtat absent.');
  const source=await recording(event.source),at=lead+span.end-take.titleCut-bodyTrimStart+.08,file=wav('overlay-'+i,['-i',path.join(root,source.file),'-af',`atrim=start=${event.from}:end=${event.from+event.seconds},asetpts=PTS-STARTPTS,lowpass=f=1800,loudnorm=I=${event.lufs}:TP=-9:LRA=5,afade=t=in:d=0.08,afade=t=out:st=${Math.max(.1,event.seconds-.2)}:d=0.2`]);
  add(file,at,source,{excerpt:{start:event.from,seconds:event.seconds},underSpeech:true,insertedPause:0,sourceTargetLufs:event.lufs});
 }
 let added=0;for(const [i,event]of events.entries()){const file=wav('event-'+i,['-i',path.join(root,event.recording.file),'-af',`atrim=start=${event.from}:end=${event.from+event.seconds},asetpts=PTS-STARTPTS,loudnorm=I=-27:TP=-9:LRA=5,afade=t=in:d=0.025,afade=t=out:st=${Math.max(.04,event.seconds-.1)}:d=0.1`]);add(file,lead+event.at+added+.12,event.recording,{excerpt:{start:event.from,seconds:event.seconds},underSpeech:false,insertedPause:event.gap});added+=event.gap;}
 if(recipe.ending==='tone'){
  const closing=wav('two-note-ending',['-f','lavfi','-i',"aevalsrc='0.035*sin(2*PI*if(lt(t,0.6),523.251,659.255)*t)*exp(-5*mod(t,0.6))*(1-exp(-60*mod(t,0.6)))':s=48000:d=1.2",'-af','afade=t=in:d=0.025,afade=t=out:st=0.85:d=0.35']);add(closing,total-2.4,{id:'sentit-two-note-ending-v1',file:'tools/render-mixed-take.cjs',url:'https://github.com/aaronFortuno/sentit/blob/main/tools/render-mixed-take.cjs',author:'Sentit',license:'MIT'},{origin:'original-procedural-composition',underSpeech:false});
 }else if(recipe.ending!=='ambient'){
  const endSource=recipe.ending==='chair'?await recording('funkysandwich-871017'):recipe.ending==='steps'?await recording('evsecrets-footsteps-334457'):recipe.ending==='box'?await recording('breezy2000uk-578712'):paper,from=recipe.ending==='steps'?1.4:recipe.ending==='box'?3:0,seconds=recipe.ending==='chair'?1.2:recipe.ending==='steps'?1.3:recipe.ending==='box'?1.1:.678;
  const closing=wav('closing-recording',['-i',path.join(root,endSource.file),'-af',`atrim=start=${from}:end=${from+seconds},asetpts=PTS-STARTPTS,loudnorm=I=-29:TP=-9:LRA=5,afade=t=in:d=0.025,afade=t=out:st=${seconds-.15}:d=0.15`]);add(closing,total-2.6,endSource,{excerpt:{start:from,seconds},underSpeech:false});
 }
 const args=inputs.flatMap(file=>['-i',file]),filters=effects.map((e,i)=>`[${i+1}:a]adelay=${Math.round(e.start*1000)}:all=1[s${i}]`);filters.push(`[0:a]${effects.map((_,i)=>`[s${i}]`).join('')}amix=inputs=${inputs.length}:duration=first:normalize=0,loudnorm=I=-19:TP=-2.5:LRA=9,aresample=48000,adelay=250:all=1,apad=pad_dur=0.35[out]`);
 if(recipe.newsMusic){if(inputs.length!==2||effects.length!==1)throw Error('News recipe must contain only voice and the common music');filters.splice(0,filters.length,'[0:a]asplit=2[spoken][control];[1:a][control]sidechaincompress=threshold=.018:ratio=6:attack=12:release=450:makeup=1[ducked];[spoken][ducked]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-19:TP=-2.5:LRA=9,aresample=48000,adelay=250:all=1,apad=pad_dur=0.35[out]');}
 if(recipe.libraryMusic){const ending=effects.find(e=>e.libraryId===recipe.libraryMusic).envelope.fadeEnd+.55;filters[filters.length-1]=filters.at(-1).replace('[out]',`,atrim=end=${ending}[out]`);}
 const body=wav('body-master',[...args,'-filter_complex',filters.join(';'),'-map','[out]']),intro=wav('title-master',['-i',titleInput,'-af','loudnorm=I=-19:TP=-2.5:LRA=9,aresample=48000,adelay=250:all=1,apad=pad_dur=0.3']);
 const titleGap=recipe.titleGap??.8,introSeconds=await duration(intro),gap=wav('title-gap',['-f','lavfi','-i','anullsrc=r=48000:cl=mono','-t',String(titleGap)]);const masterList=path.join(output,'master.ffconcat');await fs.writeFile(masterList,'ffconcat version 1.0\n'+[intro,gap,body].map(f=>`file '${f.replaceAll('\\','/')}'`).join('\n')+'\n');const master=wav('master',['-f','concat','-safe','0','-i',masterList]);
 const stem=code.toLowerCase()+'-mixed-v1',mp3=async(file,suffix)=>{const name=stem+suffix+'.mp3',target=path.join(root,'assets/audio',name);ffmpeg(binary,['-v','error','-y','-i',file,'-map_metadata','-1','-c:a','libmp3lame','-q:a','3',target]);return name;};
 const file=await mp3(master,''),introFile=await mp3(intro,'-intro'),bodyFile=await mp3(body,'-cos'),bodyDuration=await duration(body),fullDuration=await duration(master);
 const measurement=ffmpeg(binary,['-i',master,'-af','loudnorm=I=-19:TP=-2.5:LRA=9:print_format=json','-f','null','-']),stats=JSON.parse(measurement.slice(measurement.lastIndexOf('{'),measurement.lastIndexOf('}')+1));
 const report={code,activity:'ca-'+code,state:'awaiting-montage-validation',file,introFile,bodyFile,offset:introSeconds+.8,bodyDuration,fullDuration,voices:entry.production.voices,model:'gemini-3.8-flash-tts',productionMode:take.assembly?'assembled-grouped-voices':'shared-mixed-batch',requestHash:take.batchRequestHash,sourceRequestHash:take.sourceRequestHash,batch:take.batch,...(take.sourceBatchRequests?{sourceBatchRequests:take.sourceBatchRequests,assembly:take.assembly,requestHashIsCompositionChecksum:true}:{}),rawSha256:take.rawBatchSha256,takeSha256:take.sha256,coverage:take.coverage,uncertainTurns:(split.uncertainties??[]).filter(turn=>!turn.block||turn.block.startsWith(code+'-')),newSynthesisRequests:code==='S021'?1:0,sharedRequest:true,...(code==='S021'?{usage:provider.usage}:{}),lufs:Number(stats.input_i),peakDbTP:Number(stats.input_tp),voiceRetimed:false,effects,sha256:sha(await fs.readFile(path.join(root,'assets/audio',file)))};
 report.offset=introSeconds+titleGap;if(voiceHandles)report.voiceHandles=voiceHandles;report.voiceApproval=(await import('../content/production-progress.js')).productionProgress['ca-'+code].voiceApproval;
 if(take.repairApplication){const{originalRawFile,originalBodyFile,patchedFile,retainedRanges,...record}=take.repairApplication;report.productionMode='repaired-mixed-take';report.repairApplication={...record,edits:record.edits.map(({candidateRawFile,...e})=>({...e,candidateRawFile:path.basename(candidateRawFile)})),...(retainedRanges?{retainedRanges:retainedRanges.map(({originalFile,...r})=>({...r,...(originalFile?{originalFile:path.basename(originalFile)}:{})}))}:{}),...(originalBodyFile?{originalBodyFile:path.basename(originalBodyFile)}:{}),originalRawFile:path.basename(originalRawFile),patchedFile:path.basename(patchedFile)};}
 if(!(report.lufs>=-24&&report.lufs<=-15&&report.peakDbTP<=-1))throw Error('Nivells del màster fora de marge.');
 await fs.writeFile(path.join(root,`assets/audio/${code.toLowerCase()}-production-manifest.json`),JSON.stringify(report,null,2)+'\n');
 const manifestFile=path.join(root,'assets/audio/prototips-manifest.json'),manifest=JSON.parse(await fs.readFile(manifestFile,'utf8'));if(manifest.activities.some(a=>a.code===code))throw Error('Informe ja existent: no sobreescriure.');manifest.activities.push(report);manifest.state='partially-produced-awaiting-validation';await fs.writeFile(manifestFile,JSON.stringify(manifest,null,2)+'\n');
 const metadata=`\n    seconds: ${Math.ceil(fullDuration)}, status: 'ready-for-review', reviewStatus: 'audio-review',\n    audio: './assets/audio/${file}', tracks: { introduction: './assets/audio/${introFile}', body: './assets/audio/${bodyFile}' },\n    fragment: { start: ${report.offset}, seconds: ${Math.round(bodyDuration)} },`;source=source.slice(0,lineEnd)+metadata+source.slice(lineEnd);await fs.writeFile(contentFile,source);
 const {productionProgress}=await import('../content/production-progress.js');Object.assign(productionProgress['ca-'+code],{state:'montage-awaiting-listening',mountedAt:new Date().toISOString(),synthesisBatch:take.batch,requestHash:take.batchRequestHash,audioSha256:report.sha256,listeningApproval:false,montageNewSynthesisRequests:0});await fs.writeFile(path.join(root,'content/production-progress.js'),'// Production stages are separate from editorial review and final listening approval.\nexport const productionProgress = '+JSON.stringify(productionProgress,null,2)+';\n');
 console.log(JSON.stringify({code,state:report.state,bodyDuration,lufs:report.lufs,peakDbTP:report.peakDbTP,effects:effects.length,newRequests:0}));
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={main};
