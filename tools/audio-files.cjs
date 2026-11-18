'use strict';
const fs = require('node:fs/promises');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

function checkWave(wav) {
  if (wav.length < 44 || wav.toString('ascii', 0, 4) !== 'RIFF' || wav.toString('ascii', 8, 12) !== 'WAVE') throw Error('La presa no és un WAV vàlid.');
  let rate = 0;
  for (let offset = 12; offset + 8 <= wav.length;) {
    const size = wav.readUInt32LE(offset + 4);
    if (offset + 8 + size > wav.length) throw Error('Presa WAV incompleta.');
    const kind = wav.toString('ascii', offset, offset + 4);
    if (kind === 'fmt ' && size >= 16) rate = wav.readUInt32LE(offset + 16);
    if (kind === 'data' && rate > 0 && size > 0) return;
    offset += 8 + size + size % 2;
  }
  throw Error('Presa WAV sense dades d’àudio.');
}

async function ffmpegBinary() {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH;
  const folder = path.resolve(__dirname, '../../tmp/canvi-de-plans/ffmpeg/imageio_ffmpeg/binaries');
  const files = await fs.readdir(folder).catch(error => { if (error.code === 'ENOENT') return []; throw error; });
  const binary = files.find(file => /^ffmpeg-.*\.exe$/.test(file));
  return binary ? path.join(folder, binary) : 'ffmpeg';
}

function ffmpeg(binary, args) {
  const result = spawnSync(binary, ['-nostdin', '-hide_banner', ...args], { encoding: 'utf8', windowsHide: true, maxBuffer: 8 * 1024 * 1024 });
  if (result.error) throw Error('FFmpeg: ' + (result.error.code ?? 'no disponible'));
  if (result.status !== 0) throw Error('FFmpeg: ' + result.stderr.trim());
  return result.stderr;
}

module.exports = { checkWave, ffmpeg, ffmpegBinary };
