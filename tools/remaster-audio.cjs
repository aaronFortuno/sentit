'use strict';
// Offline only: no credentials, HTTP requests, synthesis or quota reservation.
const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { pathToFileURL } = require('node:url');
const { ffmpeg, ffmpegBinary, checkWave } = require('./audio-files.cjs');
const root = path.resolve(__dirname, '..');
const sourceRoot = path.resolve(root, '../output');
const output = path.resolve(sourceRoot, 'sentit-remaster-v2');
const published = path.join(root, 'assets/audio');
const hash = data => createHash('sha256').update(data).digest('hex');
async function duration(file) {
  const wav = await fs.readFile(file); checkWave(wav);
  let rate;
  for (let i = 12; i + 8 <= wav.length;) {
    const size = wav.readUInt32LE(i + 4), kind = wav.toString('ascii', i, i + 4);
    if (kind === 'fmt ') rate = wav.readUInt32LE(i + 16);
    if (kind === 'data') return size / rate;
    i += 8 + size + size % 2;
  }
  throw Error('WAV sense dades');
}
async function main() {
  await fs.mkdir(output, { recursive: true });
  const bin = await ffmpegBinary();
  const wav = (name, args) => { const file = path.join(output, name + '.wav'); ffmpeg(bin, ['-v','error','-y',...args,'-ac','1','-ar','48000','-c:a','pcm_s16le',file]); return file; };
  const mp3 = (file, name, args = []) => { const target = path.join(published, name + '.mp3'); ffmpeg(bin, ['-v','error','-y','-i',file,...args,'-map_metadata','-1','-ac','1','-ar','48000','-c:a','libmp3lame','-b:a','128k',target]); return target; };
  // Preserve the complete raw waveform, including quiet consonants and breath tails.
  const voice = (file, name, tail = .3) => wav(name, ['-i',file,'-af',`aformat=channel_layouts=mono,loudnorm=I=-19:TP=-2.5:LRA=9,aresample=48000,adelay=250:all=1,apad=pad_dur=${tail}`]);
  const silence = (name, seconds) => wav(name, ['-f','lavfi','-i','anullsrc=r=48000:cl=mono','-t',String(seconds)]);
  async function concat(name, files) {
    const list = path.join(output, name + '.ffconcat');
    // All paths are generated local files; FFmpeg concat quoting, not shell interpolation.
    await fs.writeFile(list, 'ffconcat version 1.0\n' + files.map(file => `file '${file.replace(/\\/g,'/').replace(/'/g,"'\\''")}'`).join('\n'));
    return wav(name, ['-f','concat','-safe','0','-i',list]);
  }
  // Original four-note acoustic signature. No third-party sample or recording.
  const notes = [];
  for (const [i, frequency] of [523.25,659.25,587.33,783.99].entries()) {
    notes.push(wav('jingle-note-' + i, ['-f','lavfi','-i',`aevalsrc=0.17*sin(2*PI*${frequency}*t)*exp(-7*t)+0.025*sin(4*PI*${frequency}*t)*exp(-12*t):s=48000:d=${i===3?.6:.22}`,'-af',`afade=t=in:d=0.008,afade=t=out:st=${i===3?.36:.14}:d=${i===3?.24:.08}`]));
  }
  const jingle = await concat('jingle', [silence('jingle-in',.18),...notes,silence('jingle-out',.25)]);
  mp3(jingle,'sentit-jingle-v1',['-af','loudnorm=I=-23:TP=-3:LRA=7']);
  for (const name of ['lectura-temps-variable','lectura-un-minut','repassa-les-respostes']) {
    const raw = path.join(sourceRoot, 'sentit-locucions-opcionals', name + '.wav');
    mp3(voice(raw, 'prompt-' + name, .5), 'ca-' + name + '-v2');
  }
  const results = [];
  for (const [code, slug] of [['S001','el-senyal-de-la-radio'],['S002','preparem-una-capsa-de-records'],['S008','la-foto-que-faltava']]) {
    const contentFile = path.join(root,'content',slug+'.js');
    const entry = Object.values(await import(pathToFileURL(contentFile)))[0];
    const sources = [], timeline = [], effects = [];
    const source = async file => { const data = await fs.readFile(file); sources.push({ file: path.relative(sourceRoot,file).replace(/\\/g,'/'), sha256: hash(data), seconds: await duration(file) }); return file; };
    let rawIntro, body;
    if (code === 'S001') {
      const folder = path.join(sourceRoot,'sentit-radio-leda-puck');
      const old = JSON.parse(await fs.readFile(path.join(folder,'escaleta.json'),'utf8'));
      const rawNames = { avis:'avis-3dc483633dd2.wav', acord:'acord-065881e216c0.wav', emissio:'emissio-4651373c630a.wav' };
      const parts = []; let cursor = 0;
      for (const cue of old.timeline) {
        const raw = rawNames[cue.segment]; let file;
        if (raw) file = voice(await source(path.join(folder,raw)), code+'-'+cue.segment);
        else {
          const filename = cue.segment.startsWith('toc-') ? 'toc.wav' : cue.segment.startsWith('sintonia-') ? cue.segment.replace('sintonia-','nota-')+'.wav' : cue.segment+'.wav';
          file = await source(path.join(folder,filename));
        }
        const seconds = await duration(file);
        timeline.push({ segment:cue.segment,start:cursor,end:cursor+seconds });
        parts.push(file); cursor += seconds;
      }
      body = await concat(code+'-body-dry',parts);
      rawIntro = await source(path.join(sourceRoot,'sentit-locucions/el-senyal-de-la-radio-locucio.wav'));
      effects.push({effect:'radio-ticks-and-closing-theme',origin:'original-procedural'});
    } else {
      const folder = path.join(sourceRoot,'sentit-primera-tanda',code.toLowerCase());
      const names = await fs.readdir(folder);
      const find = prefix => {
        const matches = names.filter(name => new RegExp('^'+prefix+'-[a-f0-9]{12}\\.wav$').test(name));
        if (matches.length !== 1) throw Error(code+': cal una única presa original de '+prefix);
        return path.join(folder,matches[0]);
      };
      rawIntro = await source(find('intro'));
      const files = [silence(code+'-in', .35)]; let cursor = .35;
      for (const i of [1,2]) {
        if (i>1) { const seconds = code==='S002'?3:.5; files.push(silence(code+'-gap',seconds)); cursor+=seconds; }
        const file = voice(await source(find('scene-'+i)),code+'-scene-'+i);
        const seconds = await duration(file); timeline.push({scene:i,start:cursor,end:cursor+seconds});
        files.push(file); cursor+=seconds;
      }
      files.push(silence(code+'-out', .6));
      body = await concat(code+'-body-dry',files);
      if (code === 'S008') {
        const seconds = await duration(body);
        // Gentle original arpeggio, quieter still under speech (sidechain ducking).
        const bed = wav(code+'-bed',['-f','lavfi','-i',`aevalsrc='0.02*sin(2*PI*if(lt(mod(t,4),1),261.63,if(lt(mod(t,4),2),329.63,if(lt(mod(t,4),3),392,329.63)))*t)*(0.35+0.65*exp(-4*mod(t,1)))+0.008*sin(2*PI*130.81*t)':s=48000:d=${seconds}`,'-af',`lowpass=f=1800,afade=t=in:d=1.2,afade=t=out:st=${seconds-1.8}:d=1.8`]);
        const paper = await source(path.join(folder,'paper.wav'));
        const at = Math.max(0,timeline[1].start-.15);
        body = wav(code+'-body-mixed',['-i',body,'-i',bed,'-i',paper,'-filter_complex',`[0:a]asplit=2[voice][side];[1:a][side]sidechaincompress=threshold=.015:ratio=8:attack=15:release=500[bed];[2:a]adelay=${Math.round(at*1000)}:all=1[paper];[voice][bed][paper]amix=inputs=3:duration=first:normalize=0[out]`,'-map','[out]']);
        effects.push({effect:'original-instrumental-bed',start:0,end:seconds,duckedUnderSpeech:true},{effect:'paper',start:at,end:at+.75});
      }
    }
    body = wav(code+'-body', ['-i',body,'-af','apad=pad_dur=0.4']);
    const intro = voice(rawIntro,code+'-intro',1.5);
    const offset = await duration(intro), bodyDuration = await duration(body);
    const name = code.toLowerCase()+'-'+slug+'-v2';
    mp3(intro,name+'-intro'); mp3(body,name+'-cos');
    const full = await concat(code+'-full',[intro,body]);
    const master = mp3(full,name);
    const log = ffmpeg(bin,['-xerror','-i',master,'-af','ebur128=peak=true','-f','null','-']);
    const lufs = Number(/Integrated loudness:\s+I:\s+([^ ]+) LUFS/.exec(log)?.[1]);
    const peakDbTP = Number(/True peak:\s+Peak:\s+([^ ]+) dBFS/.exec(log)?.[1]);
    if (!(lufs>=-24&&lufs<=-15&&peakDbTP<=-1)) throw Error(code+': nivell fora de marge');
    const report = {code,activity:'ca-'+code,file:path.basename(master),productionMode:'offline-raw-remaster',newSynthesisRequests:0,offset,bodyDuration,fullDuration:offset+bodyDuration,lufs,peakDbTP,timeline,effects,sources,sha256:hash(await fs.readFile(master))};
    results.push(report);
    let text = await fs.readFile(contentFile,'utf8');
    text = text.replace(/seconds: \d+,/,'seconds: '+Math.ceil(report.fullDuration)+',');
    text = text.replace(/  audio: '[^']+',/,`  audio: './assets/audio/${report.file}',`);
    text = text.replace(/  tracks: \{[^\r\n]+\},\r?\n/g,'');
    text = text.replace(/(  audio: '[^']+',)/,`$1\n  tracks: { introduction: './assets/audio/${name}-intro.mp3', body: './assets/audio/${name}-cos.mp3' },`);
    text = text.replace(/fragment: \{ start: [\d.]+, seconds: \d+ \}/,`fragment: { start: ${Number(offset.toFixed(5))}, seconds: ${Math.round(bodyDuration)} }`);
    await fs.writeFile(contentFile,text);
    console.log(JSON.stringify({code,offset,bodyDuration,lufs,peakDbTP,newSynthesisRequests:0}));
  }
  await fs.writeFile(path.join(published,'remaster-v2-manifest.json'),JSON.stringify({date:'2026-11-18',state:'teacher-listening-pending',activities:results},null,2)+'\n');
  const manifestFile=path.join(published,'prototips-manifest.json');
  const manifest=JSON.parse(await fs.readFile(manifestFile,'utf8'));
  for(const report of results){
    const index=manifest.activities.findIndex(item=>item.code===report.code);
    const old=index<0?{}:manifest.activities[index];
    const record={...old,...report,previousFile:old.file!==report.file?old.file:old.previousFile,state:'ready-for-teacher-review'};
    if(index<0)manifest.activities.push(record);else manifest.activities[index]=record;
  }
  manifest.state='partially-produced-awaiting-script-validation';
  await fs.writeFile(manifestFile,JSON.stringify(manifest,null,2)+'\n');
}
if (require.main === module) main().catch(error=>{console.error(error.message);process.exitCode=1;});
module.exports = { duration };
