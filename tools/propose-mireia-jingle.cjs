'use strict';

// Original procedural composition. No samples, speech, model calls or downloads.
// This tool creates audition proposals only; it never edits production masters.
const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const { ffmpegBinary, ffmpeg, checkWave } = require('./audio-files.cjs');

const RATE = 48000;
const BEAT = 60 / 128;
const root = path.resolve(__dirname, '..');
const rawDir = path.resolve(root, '../output/sentit-sintonies');
const assetDir = path.join(root, 'assets/audio');
const base = 'mireia-jingle-proposta-v1';
const hz = midi => 440 * 2 ** ((midi - 69) / 12);
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');

function addNote(channels, time, midi, gain, pan, kind, length = 1.25) {
  const start = Math.round(time * RATE);
  const frequency = hz(midi);
  const left = Math.cos((pan + 1) * Math.PI / 4);
  const right = Math.sin((pan + 1) * Math.PI / 4);
  const tones = kind === 'marimba'
    ? [[1, 1, 0.42], [2.005, 0.16, 0.20], [4.01, 0.20, 0.09], [9.98, 0.025, 0.035]]
    : kind === 'bass'
      ? [[1, 1, 0.70], [2.001, 0.22, 0.45], [3.004, 0.055, 0.22]]
      : [[1, 1, 0.75], [2.002, 0.31, 0.44], [3.006, 0.10, 0.26], [4.013, 0.035, 0.16]];
  for (let n = 0; n < Math.ceil(length * RATE) && start + n < channels[0].length; n++) {
    const t = n / RATE;
    const attack = 1 - Math.exp(-t / (kind === 'marimba' ? 0.0035 : 0.009));
    const release = Math.min(1, Math.max(0, (length - t) / 0.11));
    let sample = 0;
    for (const [ratio, level, decay] of tones) {
      sample += level * Math.exp(-t / decay) * Math.sin(2 * Math.PI * frequency * ratio * t);
    }
    // A quiet, very short detuned partial gives the strike a wooden character.
    if (kind === 'marimba') sample += 0.055 * Math.exp(-t / 0.018) * Math.sin(2 * Math.PI * frequency * 6.73 * t);
    const value = gain * sample * attack * release;
    channels[0][start + n] += value * left;
    channels[1][start + n] += value * right;
  }
}

function chord(channels, time, notes, gain, length) {
  notes.forEach((note, i) => addNote(channels, time + i * 0.012, note, gain, -0.38 + i * 0.19, 'piano', length));
}

function render(kind) {
  const duration = kind === 'obertura' ? 3.8 : 3.4;
  const channels = [new Float64Array(Math.round(duration * RATE)), new Float64Array(Math.round(duration * RATE))];
  const at = beat => 0.10 + beat * BEAT;
  let melody;
  if (kind === 'obertura') {
    // Two short three-beat phrases: F major -> B-flat colour -> F6 arrival.
    melody = [[0,65,0.22], [0.5,69,0.20], [1,72,0.23], [1.75,74,0.17], [2.5,72,0.20], [3.25,67,0.18], [4,69,0.21], [4.75,65,0.24]];
    chord(channels, at(0), [53,57,60,64], 0.060, 1.38);
    chord(channels, at(2.5), [58,62,65,67], 0.045, 1.20);
    chord(channels, at(4.75), [53,57,60,62], 0.068, 1.30);
    addNote(channels, at(0), 41, 0.16, -0.08, 'bass', 1.30);
    addNote(channels, at(2.5), 46, 0.10, 0.08, 'bass', 1.05);
    addNote(channels, at(4.75), 41, 0.16, -0.04, 'bass', 1.30);
  } else {
    // The same melodic cells settle downward over Bbadd9 -> C6 -> F6.
    melody = [[0,72,0.21], [0.5,74,0.16], [1,72,0.20], [1.75,69,0.20], [2.5,67,0.18], [3.25,69,0.17], [4,65,0.24]];
    chord(channels, at(0), [58,62,65,67], 0.055, 1.20);
    chord(channels, at(1.75), [55,60,64,69], 0.045, 1.12);
    chord(channels, at(4), [53,57,60,62], 0.070, 1.24);
    addNote(channels, at(0), 46, 0.11, -0.08, 'bass', 1.08);
    addNote(channels, at(1.75), 48, 0.09, 0.08, 'bass', 1.05);
    addNote(channels, at(4), 41, 0.17, -0.04, 'bass', 1.24);
  }
  melody.forEach(([beat, note, gain], i) => addNote(channels, at(beat), note, gain, i % 2 ? 0.16 : -0.12, 'marimba', 1.30));
  // A small room, not a long wash: independent reflections of the dry signal.
  const dry = channels.map(channel => channel.slice());
  [[0.037,0.105], [0.073,0.074], [0.119,0.048], [0.167,0.030], [0.223,0.018]].forEach(([delay, gain], index) => {
    const shift = Math.round(delay * RATE);
    for (let n = shift; n < channels[0].length; n++) {
      channels[0][n] += dry[index % 2][n - shift] * gain;
      channels[1][n] += dry[(index + 1) % 2][n - shift] * gain;
    }
  });
  // Eighty milliseconds of clean silence at the start, 100 ms at the end.
  const first = Math.round(0.08 * RATE);
  const tail = Math.round((duration - 0.10) * RATE);
  for (let n = 0; n < channels[0].length; n++) {
    const envelope = n < first || n >= tail ? 0 : Math.min(1, (tail - n) / (0.15 * RATE));
    channels[0][n] *= envelope;
    channels[1][n] *= envelope;
  }
  const dataBytes = channels[0].length * 4;
  const wav = Buffer.alloc(44 + dataBytes);
  wav.write('RIFF', 0); wav.writeUInt32LE(36 + dataBytes, 4); wav.write('WAVEfmt ', 8);
  wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(2, 22);
  wav.writeUInt32LE(RATE, 24); wav.writeUInt32LE(RATE * 4, 28);
  wav.writeUInt16LE(4, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(dataBytes, 40);
  for (let n = 0; n < channels[0].length; n++) {
    for (let channel = 0; channel < 2; channel++) {
      const value = channels[channel][n];
      if (Math.abs(value) >= 0.999) throw Error('El cru satura; cal revisar els guanys de la composició.');
      wav.writeInt16LE(Math.round(value * 32767), 44 + n * 4 + channel * 2);
    }
  }
  return { wav, duration, melody: melody.map(([beat, midi]) => ({ beat, midi })) };
}

function loudness(stderr) {
  const match = stderr.match(/\{\s*"input_i"[\s\S]*?\}/g)?.at(-1);
  if (!match) throw Error('No s’ha pogut llegir la mesura de sonoritat.');
  const result = JSON.parse(match);
  if (!Number.isFinite(Number(result.input_i))) throw Error('Sonoritat no mesurable.');
  return result;
}

async function main() {
  await fs.mkdir(rawDir, { recursive: true });
  await fs.mkdir(assetDir, { recursive: true });
  const binary = await ffmpegBinary();
  const files = [];
  for (const kind of ['obertura', 'tancament']) {
    const { wav, duration, melody } = render(kind);
    checkWave(wav);
    const name = `${base}-${kind}`;
    const raw = path.join(rawDir, `${name}-cru.wav`);
    const mp3 = path.join(assetDir, `${name}.mp3`);
    await fs.writeFile(raw, wav);
    const clean = 'highpass=f=40,lowpass=f=10000';
    const first = loudness(ffmpeg(binary, ['-i', raw, '-af', `${clean},loudnorm=I=-18:TP=-2.8:LRA=7:print_format=json`, '-f', 'null', '-']));
    const normalize = `loudnorm=I=-18:TP=-2.8:LRA=7:measured_I=${first.input_i}:measured_TP=${first.input_tp}:measured_LRA=${first.input_lra}:measured_thresh=${first.input_thresh}:offset=${first.target_offset}:linear=true`;
    ffmpeg(binary, ['-y', '-i', raw, '-af', `${clean},${normalize}`, '-ar', String(RATE), '-ac', '2', '-codec:a', 'libmp3lame', '-b:a', '128k', '-map_metadata', '-1', mp3]);
    const decoded = ffmpeg(binary, ['-i', mp3, '-af', 'astats=metadata=0:reset=0,silencedetect=noise=-60dB:d=0.025,loudnorm=I=-18:TP=-2.8:LRA=7:print_format=json', '-f', 'null', '-']);
    const measured = loudness(decoded);
    const samples = Number([...decoded.matchAll(/Number of samples:\s*(\d+)/g)].at(-1)?.[1]);
    const silenceStarts = [...decoded.matchAll(/silence_start:\s*([\d.]+)/g)].map(match => Number(match[1]));
    const silenceEnds = [...decoded.matchAll(/silence_end:\s*([\d.]+)\s*\|\s*silence_duration:\s*([\d.]+)/g)].map(match => ({ end: Number(match[1]), duration: Number(match[2]) }));
    const integratedLufs = Number(measured.input_i);
    const truePeakDbtp = Number(measured.input_tp);
    if (integratedLufs < -20 || integratedLufs > -16 || truePeakDbtp > -2) throw Error(`Mesures fora del marge: ${kind}, ${integratedLufs} LUFS, ${truePeakDbtp} dBTP.`);
    if (!samples || Math.abs(samples / RATE - duration) > 0.025) throw Error(`Durada descodificada inesperada: ${kind}.`);
    if (silenceStarts[0] !== 0 || silenceEnds[0]?.duration < 0.060 || silenceEnds.at(-1)?.duration < 0.075) throw Error(`Falten silencis de seguretat: ${kind}.`);
    const mp3Bytes = await fs.readFile(mp3);
    files.push({
      kind, file: `assets/audio/${name}.mp3`, raw: path.relative(root, raw).split(path.sep).join('/'),
      durationSeconds: samples / RATE, sampleRate: RATE, channels: 2, bitrate: 128000,
      integratedLufs, truePeakDbtp, loudnessRangeLu: Number(measured.input_lra),
      safetySilenceSeconds: { start: silenceEnds[0].duration, end: silenceEnds.at(-1).duration },
      decodeVerified: true, sha256: sha256(mp3Bytes), rawSha256: sha256(wav), melody,
    });
  }
  const metadata = {
    id: base, title: 'Petita descoberta · sintonia de Mireia', version: 1,
    status: 'proposal-pending-human-validation', approval: null,
    scope: 'Parella original d’obertura i tancament per als programes de Mireia. Proposta separada per a audició; no incorporada a màsters ni generadors de producció.',
    intendedUse: 'Deixar acabar la peça abans de la parla; no és una base contínua sota el diàleg.',
    origin: { type: 'original-procedural-composition', author: 'Sentit', license: 'MIT', source: 'tools/propose-mireia-jingle.cjs', externalSamples: false, speech: false, apiRequests: 0 },
    recipe: {
      sampleRate: RATE, timeSignature: '3/4; dues frases breus', tempoBpm: 128, key: 'Fa major',
      instruments: ['Percussió afinada de fusta amb parcials amortits i atac suau', 'Acords arpegiats de piano suau per síntesi additiva', 'Baix sinusoidal amb harmònics discrets'],
      openingHarmony: ['Fmaj7', 'Bb6', 'F6'], closingHarmony: ['Bb6', 'C6', 'F6'],
      production: 'Síntesi additiva determinista en JavaScript, sala curta amb cinc reflexions, filtre de 40 Hz a 10 kHz, normalització en dues passades a -18 LUFS amb sostre -2,8 dBTP i MP3 estèreo a 48 kHz / 128 kbit/s.',
      masterGuard: '80 ms inicials i 100 ms finals de silenci al WAV, amb cua esmorteïda abans del silenci. Els WAV crus es conserven.',
      reproduction: 'node tools/propose-mireia-jingle.cjs',
    },
    files,
  };
  const json = path.join(assetDir, `${base}.json`);
  await fs.writeFile(json, JSON.stringify(metadata, null, 2) + '\n');
  console.log(JSON.stringify({ metadata: json, files: files.map(({ kind, durationSeconds, integratedLufs, truePeakDbtp, safetySilenceSeconds }) => ({ kind, durationSeconds, integratedLufs, truePeakDbtp, safetySilenceSeconds })) }, null, 2));
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
