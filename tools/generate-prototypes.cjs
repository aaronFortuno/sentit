'use strict';
const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { pathToFileURL } = require('node:url');
const { setTimeout: wait } = require('node:timers/promises');
const { checkWave, ffmpeg, ffmpegBinary } = require('./audio-files.cjs');
const { parseEnv } = require('node:util');
const { request, buildPlan } = require('./audio-plan.cjs');
const { assertQuota, reserveRequest, readJSON } = require('./audio-quota.cjs');
const productionPlans = require('../content/production-plans.json');
const { fingerprint, assertProductionApproved } = require('./production-approval.cjs');
const outputDirectory = path.resolve(__dirname, '../../output/sentit-primera-tanda');
async function geminiAudio(body, summaryFile) {
  const key = process.env.GEMINI_API_KEY?.trim() || parseEnv(await fs.readFile(path.resolve(__dirname, '../../.private/comprensio-oral/gemini.env'), 'utf8')).GEMINI_API_KEY?.trim();
  if (!key) throw Error('Gemini: falta configuració privada.');
  let response;
  try {
    response = await fetch('https://generativelanguage.googleapis.com/v1beta/interactions', { method:'POST', headers:{'x-goog-api-key':key,'Content-Type':'application/json'}, body:JSON.stringify(body), redirect:'error', signal:AbortSignal.timeout(180000) });
  } catch { throw Error('Gemini: connexió interrompuda.'); }
  if (!response.ok) {
    const result=await response.json().catch(()=>({}));
    const details=result.error?.details??[];
    const diagnostic={observedAt:new Date().toISOString(),http:response.status,status:result.error?.status,retryAfter:response.headers.get('retry-after'),retryDelay:details.find(d=>d.retryDelay)?.retryDelay,quota:details.flatMap(d=>(d.violations??[]).map(v=>({metric:v.quotaMetric,id:v.quotaId,value:v.quotaValue,model:v.quotaDimensions?.model}))),suggestedWait:/retry in ([^.\n]+)/i.exec(result.error?.message??'')?.[1]};
    if (response.status === 429 && Number(diagnostic.retryAfter) > 0) diagnostic.retryNotBefore = new Date(Date.now()+Number(diagnostic.retryAfter)*1000).toISOString();
    await fs.writeFile(path.join(outputDirectory,'last-api-error.json'),JSON.stringify(diagnostic,null,2));
    console.log(JSON.stringify(diagnostic));
    throw Error('Gemini: HTTP '+response.status+'.');
  }
  const result=await response.json();
  if (summaryFile) await fs.writeFile(summaryFile, JSON.stringify({ id:result.id, model:result.model ?? body.model, usage:result.usage ?? result.usageMetadata ?? null },null,2)+'\n');
  const clip=result.steps?.flatMap(s=>s.content??[]).findLast(c=>c.type==='audio'&&typeof c.data==='string');
  if (!clip) throw Error('Gemini: resposta sense àudio.');
  return Buffer.from(clip.data,'base64');
}
const root = path.resolve(__dirname, '..');
const sr = 48000;
const codec = ['-ac', '1', '-ar', String(sr), '-c:a', 'pcm_s16le'];
const specs = [
  { name: 'preparem-una-capsa-de-records', voices: { Mestra: 'Aoede' }, pace: 'Around 135 to 145 words per minute. An encouraging adult classroom teacher addressing eight- and nine-year-olds, with brief pauses between the steps, not a monotonous list.', scenes: [['capsa','dibuix','foto'],['missatge','nom','final']], ranges: [50, 80] },
  { name: 'la-foto-que-faltava', voices: { Narradora: 'Aoede' }, pace: 'Around 150 to 165 words per minute. Expressive warm adult storyteller, gentle curiosity at the missing photograph, relief at the explanation, no exaggerated cartoon voices. All dialogue is reported by the narrator.', scenes: [['album','buit','pregunta'],['mirar','diferencies','tornada']], ranges: [80, 120], effect: 'paper' },
  { name: 'una-restauradora-ens-explica-el-seu-ofici', voices: { Entrevistador: 'Puck', Nora: 'Aoede' }, pace: 'Around 145 to 155 words per minute. The interviewer is a curious teenage student and Nora is a calm, friendly adult art conservator. Distinct turns, natural questions and thoughtful answers. The expert corrects misconceptions warmly.', scenes: [['presentacio','observar','repintar','conservar'],['exemple','proves','prevencio','llum'],['temps','tancament']], ranges: [140, 195] },
  { name: 'reobren-el-mercat', voices: { Presentadora: 'Aoede', Pau: 'Charon' }, pace: 'Around 145 to 155 words per minute. Professional adult local radio news anchor; calm, informative and clearly articulated. Pau is an adult fruit seller, conversational and thoughtful. Make the distinctions between confirmed facts, expectations and undecided proposals clear, without over-emphasizing every word.', scenes: [['obertura','accessos','horari','testimoni'],['opinio','dades'],['recipients','cartell','tancament']], ranges: [190, 260], effect: 'news' },
];
function wavInfo(wav) {
  checkWave(wav);
  let byteRate;
  for (let offset = 12; offset + 8 <= wav.length;) {
    const size = wav.readUInt32LE(offset + 4);
    const kind = wav.toString('ascii', offset, offset + 4);
    if (kind === 'fmt ') byteRate = wav.readUInt32LE(offset + 16);
    if (kind === 'data') return { seconds: size / byteRate, pcm: wav.subarray(offset + 8, offset + 8 + size) };
    offset += 8 + size + (size % 2);
  }
  throw Error('WAV sense dades.');
}

async function publishMetadata(filename, entry, report) {
  const original = await fs.readFile(filename, 'utf8');
  let source = original.replace(/seconds: \d+,/, 'seconds: ' + Math.ceil(report.fullDuration) + ',');
  source = source.replace(/  audio: (?:'[^']+'|null),/, `  audio: './assets/audio/${report.file}',`);
  source = source.replace(/  fragment: \{ start: [\d.]+, seconds: \d+ \},/, `  fragment: { start: ${Number(report.offset.toFixed(5))}, seconds: ${Math.round(report.bodyDuration)} },`);
  source = source.replace("status: 'awaiting-audio'", "status: 'ready-for-review'");
  if (source !== original) await fs.writeFile(filename, source);
  const manifestFile = path.join(root, 'assets/audio/prototips-manifest.json');
  const manifest = await readJSON(manifestFile, { activities: [] });
  const record = { ...report, state: 'ready-for-teacher-review' };
  const position = manifest.activities.findIndex(item => item.code === entry.code);
  if (position < 0) manifest.activities.push(record); else manifest.activities[position] = record;
  manifest.state = manifest.activities.some(item => item.state === 'awaiting-audio') ? 'partially-produced' : 'ready-for-teacher-review';
  await fs.writeFile(manifestFile, JSON.stringify(manifest, null, 2) + '\n');
}
async function main() {
  const generate = process.argv.includes('--generate');
  const selected = process.argv.find(arg => /^--only=/.test(arg))?.slice(7);
  const planOnly = process.argv.includes('--plan') || !generate;
  const binary = planOnly ? null : await ffmpegBinary();
  if (binary) ffmpeg(binary, ['-version']);
  const matches = specs.filter((item, i) => !selected || item.name === selected || ['S002','S008','S015','S023'][i].toLowerCase() === selected.toLowerCase());
  if (!matches.length) throw Error('Codi o nom de prototip desconegut.');
  let release;
  if (!planOnly) {
    await fs.mkdir(outputDirectory, { recursive: true });
    const lock = path.join(outputDirectory,'production.lock');
    const handle = await fs.open(lock,'wx').catch(error=>{if(error.code==='EEXIST')throw Error('Ja hi ha un generador o un lock pendent de revisar.');throw error;});
    await handle.writeFile(JSON.stringify({pid:process.pid,startedAt:new Date().toISOString()}));
    release = async()=>{await handle.close();await fs.unlink(lock);};
  }
  try {
  for (const spec of matches) {
    const filename = path.join(root, 'content', spec.name + '.js');
    const entry = Object.values(await import(pathToFileURL(filename)))[0];
    if(productionPlans[entry.code]?.strategy==='packed-title-dialogue-v1'){
      const {spec:packedSpec,packedInterviewRequest}=require('./interview-production.cjs');
      const payload=packedInterviewRequest(entry);
      console.log(JSON.stringify({code:entry.code,mode:'packed-title-dialogue',newRequests:1,textItems:payload.input[0].content.length,localCuts:entry.generationPlan.localCuts.map(cut=>({id:cut.id,after:cut.after})),validation:productionPlans[entry.code].status,fingerprint:fingerprint(entry,packedSpec,productionPlans[entry.code])}));
      if(planOnly)continue;
      assertProductionApproved(entry,packedSpec,productionPlans[entry.code]);
      throw Error('Cal preparar el muntatge de la nova versió amb dues veus abans d’executar-la. Cap petició enviada.');
    }
    const folder = path.join(outputDirectory, entry.code.toLowerCase());
    if (!planOnly) await fs.mkdir(folder, { recursive: true });
    const cacheFile = (name, turns, intro = false) => path.join(folder, name + '-' + createHash('sha256').update(JSON.stringify(request(turns, spec, intro))).digest('hex').slice(0,12) + '.wav');
    const plan = await buildPlan(entry, spec, async (name, turns, intro) => {
      const audio = await fs.readFile(cacheFile(name, turns, intro)).catch(error=>{if(error.code==='ENOENT')return null;throw error;});
      if (!audio) return false;
      checkWave(audio); return true;
    });
    console.log(JSON.stringify({code:entry.code, mode:plan.mode, newRequests:plan.requests, validation:productionPlans[entry.code]?.status, fingerprint:fingerprint(entry,spec,productionPlans[entry.code]), pieces:plan.pieces.map(p=>({name:p.name,parts:p.parts,cached:p.cached})), introCached:plan.intro.cached}));
    if (planOnly) continue;
    if (plan.requests) {
      assertProductionApproved(entry,spec,productionPlans[entry.code]);
      assertQuota(await readJSON(path.join(outputDirectory,'last-api-error.json'), null));
    }
    const remasters = await readJSON(path.join(root,'assets/audio/remaster-v2-manifest.json'), { activities: [] });
    const previousReport = remasters.activities.find(item => entry.audio?.endsWith('/'+item.file)) ?? JSON.parse(await fs.readFile(path.join(folder,'report.json'),'utf8').catch(error=>{if(error.code==='ENOENT')return 'null';throw error;}));
    if (!plan.requests && previousReport) {
      const published = await fs.readFile(path.join(root,'assets/audio',previousReport.file));
      if (createHash('sha256').update(published).digest('hex') !== previousReport.sha256) throw Error('El màster publicat no coincideix amb el registre.');
      await publishMetadata(filename, entry, previousReport);
      console.log(entry.code+' · màster complet conservat, cap petició ni nova mescla.');continue;
    }
    const encode = (name, input) => { const file = path.join(folder, name + '.wav'); ffmpeg(binary, ['-v','error','-y',...input,...codec,file]); return file; };
    async function take(name, turns, intro = false) {
      const body = request(turns, spec, intro);
      const hash = createHash('sha256').update(JSON.stringify(body)).digest('hex').slice(0,12);
      const file = path.join(folder, name + '-' + hash + '.wav');
      const found = await fs.stat(file).catch(error => { if (error.code !== 'ENOENT') throw error; });
      if (!found) {
        if (!generate) throw Error(entry.code + ': falta la presa ' + name);
        console.log(entry.code + ' · generant ' + name);
        let audio;
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            await reserveRequest(outputDirectory, {code:entry.code,purpose:name,hash,model:body.model});
            audio = await geminiAudio(body); break;
          }
          catch (error) {
            if (attempt || !/^Gemini: HTTP 5\d\d\./.test(error.message)) throw error;
            console.log(entry.code + ' · error transitori, un reintent');
            await wait(8000);
          }
        }
        checkWave(audio);
        await fs.writeFile(file + '.part', audio);
        ffmpeg(binary, ['-v','error','-xerror','-i',file+'.part','-f','null','-']);
        await fs.rename(file + '.part', file);
        await fs.writeFile(file.replace('.wav','.request.json'), JSON.stringify(body,null,2));
        await wait(3000);
      }
      return encode(name + '-render', ['-i',file,'-af','aformat=channel_layouts=mono,loudnorm=I=-19:TP=-2.5:LRA=9,aresample=48000,adelay=250:all=1,apad=pad_dur=0.3']);
    }
    const sceneFiles = [];
    for (const piece of plan.pieces) sceneFiles.push(await take(piece.name, piece.turns));
    const silence = (name, seconds) => encode(name, ['-f','lavfi','-i',`anullsrc=r=${sr}:cl=mono`,'-t',String(seconds)]);
    const sequence = [silence('inici', .25)];
    const timeline = [];
    let cursor = .25;
    for (const [i,file] of sceneFiles.entries()) {
      if (i) { const gap = entry.code === 'S002' ? 3.0 : .35; sequence.push(silence('pausa-' + i,gap)); cursor += gap; }
      const seconds = wavInfo(await fs.readFile(file)).seconds;
      timeline.push({ scene: i+1, start: cursor, end: cursor+seconds, parts: plan.pieces[i].parts });
      sequence.push(file); cursor += seconds;
    }
    sequence.push(silence('final', .35));
    const list = path.join(folder, 'body.ffconcat');
    await fs.writeFile(list, 'ffconcat version 1.0\n' + sequence.map(file => `file '${path.basename(file)}'\n`).join(''));
    let body = encode('body-dry', ['-f','concat','-safe','1','-i',list]);
    const effectTimeline = [];
    if (spec.effect === 'paper') {
      const fx = encode('paper', ['-f','lavfi','-i',`anoisesrc=color=pink:amplitude=.35:sample_rate=${sr}:duration=0.75`,'-af','highpass=f=1100,lowpass=f=6200,afade=t=in:d=0.08,afade=t=out:st=0.18:d=0.57,volume=.09']);
      const start = timeline.length > 1 ? timeline[1].start - .12 : .12;
      body = encode('body-effect', ['-i',body,'-i',fx,'-filter_complex',`[1:a]adelay=${Math.round(start*1000)}:all=1[fx];[0:a][fx]amix=inputs=2:duration=first:normalize=0[out]`,'-map','[out]']);
      effectTimeline.push({ effect:'paper', start, end:start+.75, overlapsSpeech:true });
    }
    if (spec.effect === 'news') {
      const fx = encode('news-sting', ['-f','lavfi','-i',`aevalsrc=0.065*(sin(2*PI*523.25*t)+0.4*sin(2*PI*659.25*t)+0.25*sin(2*PI*783.99*t)):s=${sr}:d=0.85`,'-af','afade=t=in:d=0.03,afade=t=out:st=0.18:d=0.67']);
      body = encode('body-effect', ['-i',body,'-i',fx,'-filter_complex','[0:a]adelay=400:all=1[voice];[1:a]volume=.28[fx];[voice][fx]amix=inputs=2:duration=longest:normalize=0[out]','-map','[out]']);
      timeline.forEach(item => { item.start += .4; item.end += .4; });
      effectTimeline.push({ effect:'news-sting', start:0, end:.85, overlapsSpeech:true });
    }
    const bodyDuration = wavInfo(await fs.readFile(body)).seconds;
    if (bodyDuration < spec.ranges[0] || bodyDuration > spec.ranges[1]) throw Error(entry.code + ': revisa durada ' + bodyDuration);
    const introTake = await take('intro',[{ speaker:'Presentació', text:entry.introduction }],true);
    const intro = encode('intro-paused', ['-i',introTake,'-af','apad=pad_dur=1.5']);
    const offset = wavInfo(await fs.readFile(intro)).seconds;
    const audioName = entry.code.toLowerCase() + '-' + spec.name + '-v1.mp3';
    const master = path.join(folder,audioName);
    ffmpeg(binary,['-v','error','-y','-i',intro,'-i',body,'-filter_complex','[0:a][1:a]concat=n=2:v=0:a=1[out]','-map','[out]','-map_metadata','-1','-ac','1','-ar',String(sr),'-c:a','libmp3lame','-b:a','128k',master]);
    const log = ffmpeg(binary,['-xerror','-i',master,'-af','ebur128=peak=true','-f','null','-']);
    const lufs = Number(/Integrated loudness:\s+I:\s+([^ ]+) LUFS/.exec(log)?.[1]);
    const peak = Number(/True peak:\s+Peak:\s+([^ ]+) dBFS/.exec(log)?.[1]);
    if (!(lufs>=-23 && lufs<=-15 && peak<=-1)) throw Error('Màster fora de nivell.');
    const report = { code:entry.code, activity:entry.language+'-'+entry.code, file:audioName, voices:spec.voices, model:'gemini-3.8-flash-tts', productionMode:plan.mode, bodyDuration, offset, fullDuration:offset+bodyDuration, lufs, peakDbTP:peak, wordCount:entry.transcript.filter(p=>p.speaker).map(p=>p.text).join(' ').split(/\s+/).length, timeline, effects:effectTimeline, sha256:createHash('sha256').update(await fs.readFile(master)).digest('hex') };
    await fs.writeFile(path.join(folder,'report.json'),JSON.stringify(report,null,2));
    await fs.copyFile(master,path.join(root,'assets/audio',audioName));
    await publishMetadata(filename, entry, report);
    console.log(`${entry.code} · ${bodyDuration.toFixed(2)} s de fragment · ${lufs} LUFS · pic ${peak} dBTP`);
  }
  } finally { if (release) await release(); }
}
if (require.main === module) main().catch(error=>{console.error(error.message);process.exitCode=1;});
module.exports = { main, specs, geminiAudio };
