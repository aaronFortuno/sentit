'use strict';

// Original, deterministic instrumental accompaniment for S018. MIT, Sentit.
// This module only writes local music WAVs. No speech, samples or API calls.
const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { ffmpeg, checkWave } = require('./audio-files.cjs');

const RATE = 48000;
const TABLE_SIZE = 65536;
const TEMPO = 72;
const BEAT = 60 / TEMPO;
const HARMONY_SECONDS = 8 * BEAT;
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const rounded = number => Math.round(number * 1e6) / 1e6;
const gainDb = gain => rounded(20 * Math.log10(gain));

function table(partials) {
  const samples = new Float64Array(TABLE_SIZE + 1);
  for (let n = 0; n <= TABLE_SIZE; n++) {
    samples[n] = partials.reduce((sum, [harmonic, gain]) => sum + Math.sin(2 * Math.PI * n / TABLE_SIZE * harmonic) * gain, 0);
  }
  return samples;
}

const PIANO = table([[1, 1], [2, 0.22], [3, 0.065], [4, 0.018]]);
const PAD = table([[1, 1], [2, 0.11], [3, 0.022]]);
const WOOD = table([[1, 1], [2, 0.08], [4, 0.13]]);

function addTone(samples, { time, midi, gain, duration, kind }) {
  if (duration < 0.05) return;
  const start = Math.round(time * RATE);
  const count = Math.min(Math.round(duration * RATE), samples.length - start);
  if (start < 0 || count <= 0) return;
  const wave = kind === 'pad' ? PAD : kind === 'wood' ? WOOD : PIANO;
  const step = 440 * 2 ** ((midi - 69) / 12) / RATE * TABLE_SIZE;
  let phase = 0;
  for (let n = 0; n < count; n++) {
    const t = n / RATE;
    let envelope;
    if (kind === 'pad') {
      const attack = Math.min(1, t / Math.min(1.45, duration * 0.28));
      const release = Math.min(1, (duration - t) / Math.min(2.3, duration * 0.43));
      // Smooth, overlapping harmonic breaths rather than a swelling string cue.
      envelope = attack * attack * (3 - 2 * attack) * release * release * (3 - 2 * release);
    } else {
      const attack = 1 - Math.exp(-t / (kind === 'wood' ? 0.007 : 0.014));
      const decay = Math.exp(-t / (kind === 'wood' ? 0.48 : 0.96));
      const release = Math.min(1, Math.max(0, (duration - t) / 0.24));
      envelope = attack * decay * release;
    }
    const index = Math.floor(phase);
    const value = wave[index] + (wave[index + 1] - wave[index]) * (phase - index);
    samples[start + n] += value * envelope * gain;
    phase += step;
    if (phase >= TABLE_SIZE) phase -= TABLE_SIZE;
  }
}

function compose(duration, voiceEnd) {
  const samples = new Float64Array(Math.round(duration * RATE));
  // Twelve voicings, all major or added-note major colours. No dramatic minor
  // turn, tension drone, dissonant clue or change tied to a character's action.
  const harmony = [
    [48,55,60,64,69], [53,57,60,67], [52,55,60,62], [55,59,62,64],
    [48,55,62,64], [53,57,62,67], [48,55,60,69], [55,59,62,69],
    [53,57,60,64], [52,55,60,67], [55,59,62,64], [48,55,60,64],
  ];
  const phrases = [
    [[0.3,64],[2.65,67],[5.3,69]], [[1.15,67],[4.45,65]],
    [[0.8,62],[3.8,64],[6.2,67]], [[1.65,69],[5.1,67]],
    [[0.45,67],[3.3,72],[6.0,69]], [[1.2,65],[4.75,64]],
    [[0.9,64],[3.9,62],[6.3,60]], [[1.8,67],[5.35,69]],
    [[0.6,69],[3.2,67],[5.95,64]], [[1.4,67],[4.55,64]],
    [[0.8,62],[3.7,67],[6.1,64]], [[1.6,64],[5.0,60]],
  ];
  let chordCount = 0;
  let pianoNotes = 0;
  let woodenNotes = 0;
  for (let section = 0, time = 0.12; time < voiceEnd - 0.15; section++, time += HARMONY_SECONDS) {
    const voicing = harmony[section % harmony.length];
    const padDuration = Math.min(HARMONY_SECONDS + 2.2, voiceEnd + 0.28 - time);
    voicing.forEach((midi, index) => addTone(samples, { time: time + index * 0.035, midi, gain: 0.017 / Math.sqrt(voicing.length / 4), duration: padDuration - index * 0.035, kind: 'pad' }));
    chordCount++;
    const phrase = phrases[section % phrases.length];
    const cycle = Math.floor(section / phrases.length);
    phrase.forEach(([beat, originalMidi], index) => {
      const noteTime = time + beat * BEAT + (cycle % 2 ? 0.16 : 0);
      if (noteTime > voiceEnd - 0.7) return;
      // A later cycle changes a note's register and spacing, not the mood.
      const midi = originalMidi + (cycle % 3 === 1 && index === 1 ? -12 : 0);
      addTone(samples, { time: noteTime, midi, gain: 0.075 + (index === 0 ? 0.008 : 0), duration: Math.min(2.8, voiceEnd + 0.18 - noteTime), kind: 'piano' });
      pianoNotes++;
    });
    if (section % 3 === 1) {
      const noteTime = time + 4.9;
      if (noteTime < voiceEnd - 1) {
        addTone(samples, { time: noteTime, midi: voicing[2] + 12, gain: 0.026, duration: 1.65, kind: 'wood' });
        woodenNotes++;
      }
    }
  }
  // A restrained C6 arrival after the final spoken word; never a revelation cue.
  const outroAt = voiceEnd + 0.16;
  const outroLength = Math.max(0.2, duration - 0.5 - outroAt);
  [48,55,60,64,69].forEach((midi, index) => addTone(samples, { time: outroAt + index * 0.032, midi, gain: 0.016, duration: outroLength - index * 0.032, kind: 'pad' }));
  [[0,67],[0.34,64],[0.76,60]].forEach(([delay, midi]) => {
    if (outroAt + delay < duration - 0.8) addTone(samples, { time: outroAt + delay, midi, gain: 0.077, duration: Math.min(2.5, duration - 0.5 - outroAt - delay), kind: 'piano' });
  });
  // Two quiet early reflections, rendered in place from the pre-room signal.
  const dry = samples.slice();
  for (const [seconds, amount] of [[0.073,0.08],[0.131,0.045]]) {
    const delay = Math.round(seconds * RATE);
    for (let n = delay; n < samples.length; n++) samples[n] += dry[n - delay] * amount;
  }
  const wav = Buffer.alloc(44 + samples.length * 2);
  wav.write('RIFF', 0); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8);
  wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(RATE, 24); wav.writeUInt32LE(RATE * 2, 28); wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34);
  wav.write('data', 36); wav.writeUInt32LE(samples.length * 2, 40);
  for (let n = 0; n < samples.length; n++) {
    if (Math.abs(samples[n]) >= 0.99) throw Error('S018: saturació al cru musical.');
    wav.writeInt16LE(Math.round(samples[n] * 32767), 44 + n * 2);
  }
  return { wav, chordCount, pianoNotes, woodenNotes };
}

function readLoudness(log) {
  const json = log.match(/\{\s*"input_i"[\s\S]*?\}/g)?.at(-1);
  if (!json) throw Error('S018: no s’ha pogut mesurar la música.');
  const result = JSON.parse(json);
  if (!Number.isFinite(Number(result.input_i))) throw Error('S018: sonoritat musical no finita.');
  return result;
}

function smoothExpression(start, end, from, to) {
  if (end <= start) return String(to);
  const x = `((t-${start})/${end - start})`;
  return `${from}+(${to - from})*(${x}*${x}*(3-2*${x}))`;
}

async function makeMusic({ folder, voiceEnd, lead, tail, binary, wav }) {
  if (!folder || typeof wav !== 'function' || !binary) throw Error('S018: calen folder, binary i el helper wav.');
  if (![voiceEnd, lead, tail].every(Number.isFinite) || lead < 0.4 || voiceEnd <= lead + 0.5 || tail < 1.5) throw Error('S018: durades musicals no vàlides; cal una cua mínima d’1,5 s.');
  const duration = rounded(voiceEnd + tail);
  const introGain = 0.7, speechGain = 0.14, outroGain = 0.7;
  const duckEnd = rounded(lead - 0.18);
  const duckStart = rounded(Math.max(0.04, duckEnd - 0.65));
  const fadeInEnd = rounded(Math.min(0.8, duckStart));
  const riseStart = rounded(voiceEnd + 0.12);
  const fadeEnd = rounded(duration - 0.6);
  const fadeDuration = Math.min(1.3, (tail - 0.6) * 0.5);
  const fadeStart = rounded(fadeEnd - fadeDuration);
  const riseEnd = rounded(Math.min(riseStart + 0.72, fadeStart));
  if (riseEnd <= riseStart) throw Error('S018: no hi ha espai per a la pujada posterior a la veu.');
  const envelope = `if(lt(t,${fadeInEnd}),${smoothExpression(0, fadeInEnd, 0, introGain)},if(lt(t,${duckStart}),${introGain},if(lt(t,${duckEnd}),${smoothExpression(duckStart, duckEnd, introGain, speechGain)},if(lt(t,${riseStart}),${speechGain},if(lt(t,${riseEnd}),${smoothExpression(riseStart, riseEnd, speechGain, outroGain)},if(lt(t,${fadeStart}),${outroGain},if(lt(t,${fadeEnd}),${smoothExpression(fadeStart, fadeEnd, outroGain, 0)},0)))))))`;
  await fs.mkdir(folder, { recursive: true });
  const composition = compose(duration, voiceEnd);
  const raw = path.join(folder, 's018-music-original-cru.wav');
  await fs.writeFile(raw, composition.wav);
  checkWave(composition.wav);
  const toneFilter = 'highpass=f=65,lowpass=f=4200';
  const first = readLoudness(ffmpeg(binary, ['-i', raw, '-af', `${toneFilter},loudnorm=I=-27:TP=-5:LRA=6:print_format=json`, '-f', 'null', '-']));
  const normalize = `loudnorm=I=-27:TP=-5:LRA=6:measured_I=${first.input_i}:measured_TP=${first.input_tp}:measured_LRA=${first.input_lra}:measured_thresh=${first.input_thresh}:offset=${first.target_offset}:linear=true`;
  const normalized = await wav('s018-music-base-normalized', ['-i', raw, '-af', `${toneFilter},${normalize}`]);
  const file = await wav('s018-music-envelope', ['-i', normalized, '-af', `volume='${envelope}':eval=frame,atrim=end=${fadeEnd},apad=whole_dur=${duration},atrim=duration=${duration}`]);
  const baseLevels = readLoudness(ffmpeg(binary, ['-i', normalized, '-af', 'loudnorm=I=-27:TP=-5:LRA=6:print_format=json', '-f', 'null', '-']));
  const finalLevels = readLoudness(ffmpeg(binary, ['-xerror', '-i', file, '-af', 'loudnorm=I=-27:TP=-5:LRA=6:print_format=json', '-f', 'null', '-']));
  if (Math.abs(Number(baseLevels.input_i) + 27) > 1.2 || Number(finalLevels.input_tp) > -5) throw Error('S018: nivells musicals fora del marge.');
  const [normalizedBytes, fileBytes] = await Promise.all([fs.readFile(normalized), fs.readFile(file)]);
  checkWave(normalizedBytes); checkWave(fileBytes);
  return {
    file,
    effect: {
      name: 'gentle-narration-bed', start: 0, end: fadeEnd, timelineDuration: duration,
      origin: 'original-procedural', author: 'Sentit', license: 'MIT', source: 'tools/s018-music.cjs',
      rawFile: path.basename(raw), normalizedFile: path.basename(normalized), renderedFile: path.basename(file),
      sampleRate: RATE, channels: 1, noSpeech: true, externalSamples: false, apiRequests: 0,
      normalizedBaseLufs: Number(baseLevels.input_i), renderedLufs: Number(finalLevels.input_i), truePeakDbtp: Number(finalLevels.input_tp),
      envelope: {
        fadeIn: { start: 0, end: fadeInEnd, targetGain: introGain },
        duckBeforeSpeech: { start: duckStart, end: duckEnd, safetyBeforeLead: rounded(lead - duckEnd) },
        speech: { start: duckEnd, end: riseStart, gain: speechGain, gainDb: gainDb(speechGain), nominalLufs: rounded(Number(baseLevels.input_i) + gainDb(speechGain)) },
        riseAfterSpeech: { start: riseStart, end: riseEnd, safetyAfterVoiceEnd: rounded(riseStart - voiceEnd), targetGain: outroGain },
        fadeOut: { start: fadeStart, end: fadeEnd }, silentTail: 0.6, curve: 'smoothstep',
      },
      recipe: {
        key: 'Do major', tempoBpm: TEMPO, chordSeconds: rounded(HARMONY_SECONDS),
        harmony: 'Dotze disposicions de C6/add9, F6/add9, C/E i G6/add9, amb transicions llargues. Sense gir dramàtic ni música de suspens.',
        instruments: ['Piano suau espaiat', 'Pad harmònic molt discret', 'Un toc de percussió afinada de fusta cada tres canvis d’acord'],
        synthesis: 'Taules sinusoidals harmòniques deterministes a 48 kHz mono; envolvents d’atac lent i decaïment, dues reflexions curtes, filtre 65–4200 Hz i normalització en dues passades.',
        variation: 'Dotze frases amb espais i registres variats en cicles posteriors; cap bucle d’àudio ni motiu curt de quatre notes repetit.',
        cadence: 'Arribada discreta a C6 després de la veu; cap canvi musical lligat a Aina, Ferran o una pista del relat.',
        chords: composition.chordCount, pianoNotes: composition.pianoNotes, woodenNotes: composition.woodenNotes,
      },
      sha256: hash(fileBytes), rawSha256: hash(composition.wav), normalizedSha256: hash(normalizedBytes),
      decodeVerified: true, listeningValidation: 'pending',
    },
  };
}

module.exports = { makeMusic };
