'use strict';
// Authorized local revision: same voice takes/timing and paper-removal sample.
const fs = require('node:fs/promises'), path = require('node:path'), { createHash } = require('node:crypto');
const { ffmpeg, ffmpegBinary } = require('./audio-files.cjs'), { waveParts } = require('./gemini-result.cjs'), { wav } = require('./compact-mixed-pauses.cjs');
const root = path.resolve(__dirname, '..'), work = path.resolve(root, '../output/sentit-primera-tanda'), sha = bytes => createHash('sha256').update(bytes).digest('hex');
(async () => {
  const reportFile = path.join(root, 'assets/audio/s030-production-manifest.json'), previous = JSON.parse(await fs.readFile(reportFile));
  if (previous.file !== 's030-timing-v2.mp3' || !previous.timingRevision) throw Error('Unexpected base: preserve existing revision.');
  if (sha(await fs.readFile(path.join(root, 'assets/audio', previous.file))) !== previous.sha256) throw Error('Base master changed.');
  const source = JSON.parse(await fs.readFile(path.join(work, 'source-records/bexhillcollege-274213.json')));
  if (sha(await fs.readFile(path.join(root, source.file))) !== source.sha256) throw Error('Ambient source changed.');
  const folder = path.join(work, 's030/corridor-v3'); await fs.mkdir(folder, { recursive: true });
  const binary = await ffmpegBinary(), render = (name, args) => { const file = path.join(folder, name + '.wav'); ffmpeg(binary, ['-v', 'error', '-y', ...args, '-ar', '48000', '-ac', '1', '-c:a', 'pcm_s16le', file]); return file; };
  const original = path.join(work, 's030/mixed-v1');
  const dry = render('dry-aligned', ['-i', path.join(original, 'voice-complete.wav'), '-af', 'adelay=250:all=1,apad=pad_dur=0.35']);
  const decoded = waveParts(await fs.readFile(dry)), rate = decoded.format.readUInt32LE(4), frame = decoded.format.readUInt16LE(12);
  const limit = Math.ceil(previous.timingRevision.tailEdit.start * rate) * frame, pieces = []; let cursor = 0;
  for (const cut of previous.timingRevision.body.cuts) { pieces.push(decoded.pcm.subarray(cursor, cut.first * frame)); cursor = cut.last * frame; }
  pieces.push(decoded.pcm.subarray(cursor, limit));
  const voice = path.join(folder, 'voice-compact.wav'), pcm = Buffer.concat(pieces); await fs.writeFile(voice, wav(decoded.format, pcm));
  const seconds = pcm.length / frame / rate;
  if (Math.abs(seconds - previous.bodyDuration) > .0001) throw Error('Voice timing changed.');
  const paper = previous.effects.find(effect => effect.insertedPause);
  if (!paper || paper.name !== 'beussa-749880') throw Error('Expected paper-removal effect absent.');
  const paperFile = path.join(original, 'event-0.wav'), paperSha = sha(await fs.readFile(paperFile));
  const room = render('hallway-excerpt', ['-i', path.join(root, source.file), '-af', 'atrim=start=3:end=57,asetpts=PTS-STARTPTS,highpass=f=110,lowpass=f=2200,loudnorm=I=-28:TP=-9:LRA=6']);
  const bed = render('hallway-bed', ['-i', room, '-i', room, '-filter_complex', `[0:a][1:a]acrossfade=d=2,atrim=end=${seconds},volume=0.18,afade=t=in:d=0.45,afade=t=out:st=${seconds - 1}:d=1[bed]`, '-map', '[bed]']);
  const paperStart = paper.start + .25;
  const body = render('body-master', ['-i', voice, '-i', bed, '-i', paperFile, '-filter_complex', `[2:a]adelay=${Math.round(paperStart * 1000)}:all=1[paper];[0:a][1:a][paper]amix=inputs=3:duration=first:normalize=0,alimiter=limit=0.75:level=false[out]`, '-map', '[out]']);
  const title = path.join(work, 's030/timing-v2/title.wav');
  const full = render('master', ['-i', title, '-f', 'lavfi', '-t', '0.8', '-i', 'anullsrc=r=48000:cl=mono', '-i', body, '-filter_complex', '[0:a][1:a][2:a]concat=n=3:v=0:a=1[out]', '-map', '[out]']);
  const levelsLog = ffmpeg(binary, ['-i', full, '-af', 'loudnorm=I=-19:TP=-2.5:LRA=9:print_format=json', '-f', 'null', '-']);
  const levels = JSON.parse(levelsLog.slice(levelsLog.lastIndexOf('{'), levelsLog.lastIndexOf('}') + 1));
  if (!(Number(levels.input_i) >= -24 && Number(levels.input_i) <= -15 && Number(levels.input_tp) <= -1)) throw Error('Master loudness out of bounds.');
  const stem = 's030-corridor-v3', files = { file: stem + '.mp3', introFile: stem + '-intro.mp3', bodyFile: stem + '-cos.mp3' };
  for (const [file, key] of [[full, 'file'], [title, 'introFile'], [body, 'bodyFile']]) ffmpeg(binary, ['-v', 'error', '-y', '-i', file, '-map_metadata', '-1', '-c:a', 'libmp3lame', '-q:a', '3', path.join(root, 'assets/audio', files[key])]);
  const revision = { ...previous, ...files, lufs: Number(levels.input_i), peakDbTP: Number(levels.input_tp), sha256: sha(await fs.readFile(path.join(root, 'assets/audio', files.file))), effects: [{ name: source.id, start: 0, source: source.file, sourceSha256: source.sha256, sourceUrl: source.url, author: source.author, license: source.license, underSpeech: true, sourceTargetLufs: -28, speechGain: .18, speechNominalLufs: -42.9, excerpt: { start: 3, seconds: 54 }, crossfadeSeconds: 2 }, { ...paper }], corridorRevision: { date: '2026-11-22', baseFile: previous.file, baseAudioSha256: previous.sha256, removedOpeningPaper: true, replacedOpeningClassroomWithContinuousCorridor: true, paperRemovalSampleSha256: paperSha, paperRemovalTimingUnchanged: true, voiceTimingUnchanged: true, sourceDryTakePreserved: true, newRequests: 0 } };
  await fs.writeFile(path.join(root, 'assets/audio/s030-corridor-v3-manifest.json'), JSON.stringify(revision, null, 2) + '\n');
  if (!process.argv.includes('--apply')) { console.log(JSON.stringify({ candidate: files.file, levels, newRequests: 0 })); return; }
  await fs.writeFile(reportFile, JSON.stringify(revision, null, 2) + '\n');
  const allFile = path.join(root, 'assets/audio/prototips-manifest.json'), all = JSON.parse(await fs.readFile(allFile)); Object.assign(all.activities.find(item => item.code === 'S030'), revision); await fs.writeFile(allFile, JSON.stringify(all, null, 2) + '\n');
  const plans = JSON.parse(await fs.readFile(path.join(root, 'content/production-plans.json'))), content = path.join(root, plans.S030.reviewContent); let text = await fs.readFile(content, 'utf8');
  for (const key of ['file', 'introFile', 'bodyFile']) text = text.replaceAll(previous[key], files[key]); await fs.writeFile(content, text);
  const { productionProgress } = await import('../content/production-progress.js');
  Object.assign(productionProgress['ca-S030'], { state: 'montage-awaiting-listening', audioSha256: revision.sha256, listeningApproval: false, montageNewSynthesisRequests: 0, reviewUpdate: { audio: './assets/audio/' + files.file, at: '2026-11-22', summary: { ca: 'Retirat el full inicial; ambient continu de passadís. Es conserva el so de despenjar-lo. Pendent d’última audició.', es: 'Retirado el papel inicial; ambiente continuo de pasillo. Se conserva el sonido de descolgarlo. Pendiente de última escucha.' } } });
  await fs.writeFile(path.join(root, 'content/production-progress.js'), '// Production stages are separate from editorial review and final listening approval.\nexport const productionProgress = ' + JSON.stringify(productionProgress, null, 2) + ';\n');
  console.log(JSON.stringify({ applied: true, file: files.file, seconds, lufs: revision.lufs, peak: revision.peakDbTP, newRequests: 0, teacherApproval: false }));
})().catch(error => { console.error(error.message); process.exitCode = 1; });
