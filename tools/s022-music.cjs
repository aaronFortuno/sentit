'use strict';

// Rails de memòria: original local composition, Sentit, MIT.
// No voice, API, imported sample, existing score or production-master edits.
const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { ffmpeg, checkWave } = require('./audio-files.cjs');

const RATE = 48000;
const TABLE_SIZE = 65536;
const TEMPO = 60;
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

const STRING_BODY = table([[1,1],[2,0.09],[3,0.018]]);
const STRING_EDGE = table([[2,0.19],[3,0.095],[4,0.038],[5,0.014],[6,0.008]]);
const FELT = table([[1,1],[2,0.13],[3,0.032]]);
const AIR = table([[1,1],[2,0.035]]);

function readTable(wave, phase) {
  const index = Math.floor(phase);
  return wave[index] + (wave[index + 1] - wave[index]) * (phase - index);
}

function addTone(samples, { time, midi, gain, duration, kind }) {
  if (duration < 0.05) return;
  const start = Math.round(time * RATE);
  const count = Math.min(Math.round(duration * RATE), samples.length - start);
  if (start < 0 || count <= 0) return;
  const step = 440 * 2 ** ((midi - 69) / 12) / RATE * TABLE_SIZE;
  let phase = 0;
  for (let n = 0; n < count; n++) {
    const t = n / RATE;
    let sample;
    if (kind === 'string') {
      // Short upper-partial decay over a longer string body: a gentle pluck,
      // not the mallet-like attack or sustained pad used for S018.
      const attack = 1 - Math.exp(-t / 0.006);
      const release = Math.min(1, Math.max(0, (duration - t) / 0.24));
      sample = attack * release * (readTable(STRING_BODY, phase) * Math.exp(-t / 1.12) + readTable(STRING_EDGE, phase) * Math.exp(-t / 0.23));
    } else if (kind === 'felt') {
      const attack = 1 - Math.exp(-t / 0.025);
      const release = Math.min(1, Math.max(0, (duration - t) / 0.40));
      sample = readTable(FELT, phase) * attack * Math.exp(-t / 1.08) * release;
    } else {
      const attack = Math.min(1, t / Math.min(1.9, duration * 0.32));
      const release = Math.min(1, (duration - t) / Math.min(2.2, duration * 0.48));
      sample = readTable(AIR, phase) * attack * attack * (3 - 2 * attack) * release * release * (3 - 2 * release);
    }
    samples[start + n] += sample * gain;
    phase += step;
    if (phase >= TABLE_SIZE) phase -= TABLE_SIZE;
  }
}

function compose(duration, voiceEnd) {
  const samples = new Float64Array(Math.round(duration * RATE));
  // G-centred voicings with a restrained relative-minor colour, not a sad cue.
  // The harmonic path and instrumental register are independent of S018.
  const harmony = [
    [43,50,55,59,64], [42,50,57,62], [48,55,59,62], [47,55,62,67],
    [40,47,55,62], [48,55,57,64], [45,52,55,60], [50,57,64,66],
    [43,54,57,62], [48,55,59,64], [50,57,59,66], [43,50,59,64],
  ];
  const phrases = [
    [[0.22,55],[1.95,59],[4.35,62],[6.85,57]],
    [[0.90,62],[3.60,57],[6.20,54]],
    [[0.45,59],[2.85,62],[5.75,64]],
    [[1.30,67],[4.05,62],[6.70,59]],
    [[0.35,59],[3.10,55],[6.05,62]],
    [[0.80,64],[3.45,60],[5.95,57]],
    [[1.05,60],[3.90,59],[6.60,55]],
    [[0.55,57],[2.45,62],[5.50,66]],
    [[1.45,62],[4.15,59],[6.90,57]],
    [[0.30,64],[2.95,62],[6.30,59]],
    [[0.95,59],[3.80,57],[6.15,54]],
    [[0.60,62],[3.55,59],[6.45,55]],
  ];
  let chordCount = 0, stringNotes = 0, feltNotes = 0, airNotes = 0;
  for (let section = 0, time = 0.13; time < voiceEnd - 0.15; section++, time += HARMONY_SECONDS) {
    const notes = harmony[section % harmony.length];
    const cycle = Math.floor(section / harmony.length);
    // A muted, loosely spread accompaniment; there is no constant train rhythm.
    notes.slice(0, 3).forEach((midi, index) => {
      const noteAt = time + index * 0.095;
      addTone(samples, { time: noteAt, midi, gain: 0.039 - index * 0.004, duration: Math.min(4.0, voiceEnd + 0.18 - noteAt), kind: 'felt' });
      feltNotes++;
    });
    if (section % 2 === 0) {
      [notes[1], notes[2]].forEach(midi => {
        addTone(samples, { time: time + 0.6, midi, gain: 0.0048, duration: Math.min(6.7, voiceEnd + 0.22 - time - 0.6), kind: 'air' });
        airNotes++;
      });
    }
    const phrase = phrases[section % phrases.length];
    phrase.forEach(([beat, originalMidi], index) => {
      const offset = cycle % 2 ? (index % 2 ? -0.20 : 0.24) : 0;
      const noteTime = time + beat * BEAT + offset;
      if (noteTime > voiceEnd - 0.7) return;
      const midi = originalMidi + (cycle % 3 === 1 && index === phrase.length - 1 ? 12 : 0);
      addTone(samples, { time: noteTime, midi, gain: index === 0 ? 0.088 : 0.072, duration: Math.min(3.1, voiceEnd + 0.15 - noteTime), kind: 'string' });
      stringNotes++;
    });
    chordCount++;
  }
  // D major -> G6 after the narration: a small arrival, without a dramatic swell.
  const outroAt = voiceEnd + 0.16;
  [[0,[50,57,62,66]],[0.68,[43,50,59,64]]].forEach(([delay, chord]) => {
    chord.forEach((midi, index) => {
      const time = outroAt + delay + index * 0.045;
      if (time < duration - 0.75) addTone(samples, { time, midi, gain: 0.025, duration: Math.min(2.8, duration - 0.5 - time), kind: 'felt' });
    });
  });
  [[0.02,57],[0.34,62],[0.81,59],[1.10,55]].forEach(([delay, midi]) => {
    const time = outroAt + delay;
    if (time < duration - 0.8) addTone(samples, { time, midi, gain: 0.073, duration: Math.min(2.5, duration - 0.5 - time), kind: 'string' });
  });
  // A short wooden room, much drier than a wash of sustained chords.
  const dry = samples.slice();
  for (const [seconds, amount] of [[0.049,0.065],[0.097,0.035]]) {
    const delay = Math.round(seconds * RATE);
    for (let n = delay; n < samples.length; n++) samples[n] += dry[n - delay] * amount;
  }
  const wav = Buffer.alloc(44 + samples.length * 2);
  wav.write('RIFF', 0); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8);
  wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22);
  wav.writeUInt32LE(RATE, 24); wav.writeUInt32LE(RATE * 2, 28); wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34);
  wav.write('data', 36); wav.writeUInt32LE(samples.length * 2, 40);
  for (let n = 0; n < samples.length; n++) {
    if (Math.abs(samples[n]) >= 0.99) throw Error('S022: saturació al cru musical.');
    wav.writeInt16LE(Math.round(samples[n] * 32767), 44 + n * 2);
  }
  return { wav, chordCount, stringNotes, feltNotes, airNotes };
}

function readLoudness(log) {
  const json = log.match(/\{\s*"input_i"[\s\S]*?\}/g)?.at(-1);
  if (!json) throw Error('S022: no s’ha pogut mesurar la música.');
  const result = JSON.parse(json);
  if (!Number.isFinite(Number(result.input_i))) throw Error('S022: sonoritat musical no finita.');
  return result;
}

function smoothExpression(start, end, from, to) {
  if (end <= start) return String(to);
  const x = `((t-${start})/${end - start})`;
  return `${from}+(${to - from})*(${x}*${x}*(3-2*${x}))`;
}

async function makeMusic({ folder, voiceEnd, lead, tail, binary, wav }) {
  if (!folder || typeof wav !== 'function' || !binary) throw Error('S022: calen folder, binary i el helper wav.');
  if (![voiceEnd, lead, tail].every(Number.isFinite) || lead < 0.4 || voiceEnd <= lead + 0.5 || tail < 1.5) throw Error('S022: durades musicals no vàlides; cal una cua mínima d’1,5 s.');
  const duration = rounded(voiceEnd + tail);
  const introGain = 0.7, speechGain = 0.14, outroGain = 0.7;
  const duckEnd = rounded(lead - 0.18);
  const duckStart = rounded(Math.max(0.04, duckEnd - 0.65));
  const fadeInEnd = rounded(Math.min(0.8, duckStart));
  const riseStart = rounded(voiceEnd + 0.12);
  const fadeEnd = rounded(duration - 0.6);
  const fadeStart = rounded(fadeEnd - Math.min(1.3, (tail - 0.6) * 0.5));
  const riseEnd = rounded(Math.min(riseStart + 0.72, fadeStart));
  if (riseEnd <= riseStart) throw Error('S022: no hi ha espai per a la pujada posterior a la veu.');
  const envelope = `if(lt(t,${fadeInEnd}),${smoothExpression(0,fadeInEnd,0,introGain)},if(lt(t,${duckStart}),${introGain},if(lt(t,${duckEnd}),${smoothExpression(duckStart,duckEnd,introGain,speechGain)},if(lt(t,${riseStart}),${speechGain},if(lt(t,${riseEnd}),${smoothExpression(riseStart,riseEnd,speechGain,outroGain)},if(lt(t,${fadeStart}),${outroGain},if(lt(t,${fadeEnd}),${smoothExpression(fadeStart,fadeEnd,outroGain,0)},0)))))))`;
  await fs.mkdir(folder, { recursive: true });
  const composition = compose(duration, voiceEnd);
  const raw = path.join(folder, 's022-music-original-cru.wav');
  await fs.writeFile(raw, composition.wav);
  checkWave(composition.wav);
  const toneFilter = 'highpass=f=60,lowpass=f=3500';
  const first = readLoudness(ffmpeg(binary, ['-i',raw,'-af',`${toneFilter},loudnorm=I=-27:TP=-5:LRA=6:print_format=json`,'-f','null','-']));
  const normalize = `loudnorm=I=-27:TP=-5:LRA=6:measured_I=${first.input_i}:measured_TP=${first.input_tp}:measured_LRA=${first.input_lra}:measured_thresh=${first.input_thresh}:offset=${first.target_offset}:linear=true`;
  const normalizationPass = await wav('s022-music-base-normalization-pass', ['-i',raw,'-af',`${toneFilter},${normalize}`]);
  const passLevels = readLoudness(ffmpeg(binary, ['-i',normalizationPass,'-af','loudnorm=I=-27:TP=-5:LRA=6:print_format=json','-f','null','-']));
  const correctionDb = rounded(-27-Number(passLevels.input_i));
  const normalized = await wav('s022-music-base-normalized', ['-i',normalizationPass,'-af',`volume=${correctionDb}dB`]);
  const file = await wav('s022-music-envelope', ['-i',normalized,'-af',`volume='${envelope}':eval=frame,atrim=end=${fadeEnd},apad=whole_dur=${duration},atrim=duration=${duration}`]);
  const baseLevels = readLoudness(ffmpeg(binary, ['-i',normalized,'-af','loudnorm=I=-27:TP=-5:LRA=6:print_format=json','-f','null','-']));
  const finalLevels = readLoudness(ffmpeg(binary, ['-xerror','-i',file,'-af','loudnorm=I=-27:TP=-5:LRA=6:print_format=json','-f','null','-']));
  if (Math.abs(Number(baseLevels.input_i) + 27) > 1.2 || Number(finalLevels.input_tp) > -5) throw Error('S022: nivells musicals fora del marge.');
  const [normalizedBytes, fileBytes] = await Promise.all([fs.readFile(normalized),fs.readFile(file)]);
  checkWave(normalizedBytes); checkWave(fileBytes);
  return {
    file,
    effect: {
      name: 'gentle-tram-memory-bed', musicId: 'sentit-tramvia-records-v1', title: 'Rails de memòria',
      start: 0, end: fadeEnd, timelineDuration: duration,
      origin: 'original-procedural', author: 'Sentit', license: 'MIT', source: 'tools/s022-music.cjs',
      rawFile: path.basename(raw), normalizedFile: path.basename(normalized), renderedFile: path.basename(file),
      sampleRate: RATE, channels: 1, noSpeech: true, externalSamples: false, apiRequests: 0,
      normalizedBaseLufs: Number(baseLevels.input_i), normalizationCorrectionDb: correctionDb, renderedLufs: Number(finalLevels.input_i), truePeakDbtp: Number(finalLevels.input_tp),
      envelope: {
        fadeIn: { start: 0, end: fadeInEnd, targetGain: introGain },
        duckBeforeSpeech: { start: duckStart, end: duckEnd, safetyBeforeLead: rounded(lead-duckEnd) },
        speech: { start: duckEnd, end: riseStart, gain: speechGain, gainDb: gainDb(speechGain), nominalLufs: rounded(Number(baseLevels.input_i)+gainDb(speechGain)) },
        riseAfterSpeech: { start: riseStart, end: riseEnd, safetyAfterVoiceEnd: rounded(riseStart-voiceEnd), targetGain: outroGain },
        fadeOut: { start: fadeStart, end: fadeEnd }, silentTail: 0.6, curve: 'smoothstep',
      },
      recipe: {
        key: 'Sol major', tempoBpm: TEMPO, chordSeconds: HARMONY_SECONDS,
        harmony: 'G6, D/F#, Cmaj9, G/B, Em7, C6, Am7, Dadd9, Gmaj9, Cmaj7, D6, G6; dotze disposicions de vuit temps.',
        instruments: ['Corda polsada suau amb cos llarg i harmònics que decauen ràpid', 'Acompanyament molt espaiat de piano amb sordina', 'Dues notes de pad molt discretes cada dos acords'],
        synthesis: 'Taules harmòniques deterministes a 48 kHz mono. Decaïments diferents del cos i de l’atac de la corda, dos reflexos de sala curta, filtre 60–3500 Hz, normalització en dues passades i ajust fi de guany mesurat a −27 LUFS.',
        variation: 'Dotze frases pròpies amb tres o quatre notes espaiades de manera desigual; canvis de ritme i registre en cicles posteriors. Sense bucle d’àudio ni ostinato de quatre notes.',
        cadence: 'Re major cap a G6 després de la veu. Nostàlgia continguda, sense tristesa imposada, gir de suspens ni ritme literal de tramvia.',
        chords: composition.chordCount, stringNotes: composition.stringNotes, feltNotes: composition.feltNotes, airNotes: composition.airNotes,
      },
      sha256: hash(fileBytes), rawSha256: hash(composition.wav), normalizedSha256: hash(normalizedBytes),
      decodeVerified: true, listeningValidation: 'pending',
    },
  };
}

module.exports = { makeMusic };
