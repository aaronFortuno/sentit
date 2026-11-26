'use strict';
// Explicit recovery of a provider WAV prefix followed by PCM. Strict normal
// WAV parsing remains unchanged. Preserve the entire provider response too.
const { createHash } = require('node:crypto');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
function recoverStreamedWave(bytes) {
  if (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WAVE') throw Error('Not a RIFF/WAVE prefix');
  const end = bytes.readUInt32LE(4) + 8, chunks = [];
  if (end < 44 || end >= bytes.length) throw Error('No trailing stream to recover');
  for (let at = 12; at < end;) {
    if (at + 8 > end) throw Error('Truncated prefix');
    const tag = bytes.toString('ascii', at, at + 4), size = bytes.readUInt32LE(at + 4), next = at + 8 + size + size % 2;
    if (next > end) throw Error('Truncated prefix chunk');
    chunks.push({ tag, data: bytes.subarray(at + 8, at + 8 + size) }); at = next;
  }
  if (chunks.map(chunk => chunk.tag).join(',') !== 'fmt ,data,C2PA') throw Error('Unknown prefix layout: no automatic recovery');
  const [fmt, first] = chunks.map(chunk => chunk.data), rest = bytes.subarray(end);
  if (fmt.length !== 16 || fmt.readUInt16LE(0) !== 1 || fmt.readUInt16LE(2) !== 1 || fmt.readUInt16LE(14) !== 16 || fmt.readUInt16LE(12) !== 2 || fmt.readUInt32LE(4) !== 24000 || fmt.readUInt32LE(8) !== 48000 || first.length % 2 || rest.length % 2) throw Error('Unsupported PCM format');
  // Observed provider prefixes: 10 ms (L38), 20 ms (L42), 30 ms (L40),
  // 40 ms, 60 ms (L43), 80 ms, 110 ms (L41), or 120 ms (L46) of initial PCM.
  // Accept only those observed layouts; all other format checks stay strict.
  if (![480,960,1440,1920,2880,3840,5280,5760].includes(first.length)) throw Error('Unexpected first streaming frame');
  const pieces=[first],tags=[];let cursor=end,scan=end;
  while((scan=bytes.indexOf('ID3',scan))!==-1){
    const at=scan;scan+=3;
    if(at+20>bytes.length||bytes.toString('ascii',at+10,at+14)!=='GEOB')continue;
    if(bytes[at+3]!==3||bytes[at+4]!==0||bytes[at+5]!==0||[6,7,8,9].some(i=>bytes[at+i]>127))throw Error('Unsupported interleaved metadata header');
    const size=bytes[at+6]*2097152+bytes[at+7]*16384+bytes[at+8]*128+bytes[at+9],tagEnd=at+10+size,frameSize=bytes.readUInt32BE(at+14);
    if(tagEnd>bytes.length||size!==frameSize+10||bytes.readUInt16BE(at+18)!==0)throw Error('Truncated or unexpected interleaved metadata frame');
    const payload=bytes.subarray(at+20,tagEnd);
    if(!payload.subarray(0,18).equals(Buffer.from('\0application/c2pa\0'))||payload.indexOf('c2pa manifest store\0')<0||payload.indexOf('jumb')<0)throw Error('Unknown interleaved GEOB payload');
    if((at-cursor)%2||((tagEnd-at)%2))throw Error('Interleaved metadata breaks PCM sample alignment');
    pieces.push(bytes.subarray(cursor,at));tags.push({sourceOffset:at,bytes:tagEnd-at,sha256:sha(bytes.subarray(at,tagEnd))});cursor=tagEnd;scan=tagEnd;
  }
  pieces.push(bytes.subarray(cursor));
  const pcm = Buffer.concat(pieces), audio = Buffer.alloc(44 + pcm.length);
  audio.write('RIFF'); audio.writeUInt32LE(audio.length - 8, 4); audio.write('WAVEfmt ', 8); audio.writeUInt32LE(16, 16); fmt.copy(audio, 20); audio.write('data', 36); audio.writeUInt32LE(pcm.length, 40); pcm.copy(audio, 44);
  return { audio, report: { mode: 'riff-c2pa-prefix-plus-pcm-v2', providerWaveSha256: sha(bytes), recoveredWaveSha256: sha(audio), pcmSha256: sha(pcm), prefixPcmBytes: first.length, trailingStreamBytes: rest.length, metadataBytes: chunks[2].data.length, interleavedMetadata:{count:tags.length,removedBytes:tags.reduce((n,t)=>n+t.bytes,0),tags}, seconds: pcm.length / 48000, allPcmSamplesPreserved: true, voiceRetimed: false } };
}
module.exports = { recoverStreamedWave };
if (require.main === module) (async () => {
  const fs = require('node:fs/promises'), path = require('node:path'), { promisify } = require('node:util'), { gzip } = require('node:zlib');
  const id = process.argv.find(arg => arg.startsWith('--only='))?.slice(7).toUpperCase(), root = path.resolve(__dirname, '..'), catalogue = JSON.parse(await fs.readFile(path.join(root, 'content/synthesis-batches.json'))), batch = catalogue.batches.find(batch => batch.id === id);
  if (!batch?.approvedRequestHash || batch.state === 'received') throw Error('Need a frozen unreceived batch');
  const folder = path.resolve(root, '../output/sentit-primera-tanda/mixed-batches', id.toLowerCase() + '-' + batch.approvedRequestHash.slice(0, 12));
  const attemptFile = path.join(folder, 'attempt.json'), attempt = JSON.parse(await fs.readFile(attemptFile)), server = JSON.parse(await fs.readFile(path.join(folder, 'interaction.json')));
  const bytes = await fs.readFile(path.join(folder, 'response.json')), result = JSON.parse(bytes), clips = result.steps.flatMap(step => step.content ?? []).filter(item => item.type === 'audio');
  if (attempt.state !== 'failed-or-uncertain' || attempt.requestHash !== batch.approvedRequestHash || server.requestHash !== batch.approvedRequestHash || result.id !== server.id || result.status !== 'completed' || result.model !== 'gemini-3.8-flash-tts' || clips.length !== 1) throw Error('Unverified response identity');
  const recovered = recoverStreamedWave(Buffer.from(clips[0].data, 'base64'));
  require('./audio-files.cjs').checkWave(recovered.audio);
  await fs.writeFile(path.join(folder, 'provider-wave.wav'), Buffer.from(clips[0].data, 'base64'), { flag: 'wx' });
  await fs.writeFile(path.join(folder, 'wave-recovery.json'), JSON.stringify({ ...recovered.report, providerId: result.id, newRequests: 0, pronunciationValidated: false }, null, 2) + '\n');
  await fs.writeFile(path.join(folder, 'raw.wav'), recovered.audio, { flag: 'wx' });
  await fs.writeFile(path.join(folder, 'response.json.gz'), await promisify(gzip)(bytes));
  Object.assign(attempt, { state: 'raw-received', completedAt: new Date().toISOString(), rawSha256: recovered.report.recoveredWaveSha256, responseSha256: sha(bytes), responseFile: 'response.json.gz', waveRecovery: recovered.report });
  await fs.writeFile(attemptFile, JSON.stringify(attempt, null, 2) + '\n');
  console.log(JSON.stringify({ batch: id, ...recovered.report, newRequests: 0, coverage: 'requires-local-alignment' }));
})().catch(error => { console.error(error.message); process.exitCode = 1; });
