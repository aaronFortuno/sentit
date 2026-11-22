'use strict';
// Recover an already completed provider export. No credentials or network calls.
const fs = require('node:fs/promises'), path = require('node:path'), { createHash } = require('node:crypto');
const { gzip } = require('node:zlib'), { promisify } = require('node:util');
const { collectAudio } = require('./gemini-result.cjs');
const { tokens, align } = require('./split-synthesis-batch.cjs');
const root = path.resolve(__dirname, '..'), work = path.resolve(root, '../output/sentit-primera-tanda');
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
(async () => {
  const arg = name => process.argv.find(value => value.startsWith('--' + name + '='))?.slice(name.length + 3);
  const id = arg('only')?.toUpperCase(), source = path.resolve(arg('export') ?? ''), alignment = path.resolve(arg('alignment') ?? '');
  const catalogue = JSON.parse(await fs.readFile(path.join(root, 'content/synthesis-batches.json'))), batch = catalogue.batches.find(batch => batch.id === id);
  if (!batch?.approvedRequestHash || batch.state === 'received') throw Error('Cal un lot congelat pendent, no rebut.');
  const folder = path.join(work, 'mixed-batches', id.toLowerCase() + '-' + batch.approvedRequestHash.slice(0, 12));
  const attemptFile = path.join(folder, 'attempt.json'), attempt = JSON.parse(await fs.readFile(attemptFile));
  const request = JSON.parse(await fs.readFile(path.join(folder, 'request.json')));
  if (attempt.state !== 'failed-or-uncertain' || attempt.requestHash !== batch.approvedRequestHash || sha(JSON.stringify(request)) !== batch.approvedRequestHash) throw Error('Origen de l’intent incert no verificat.');
  if (await fs.stat(path.join(folder, 'raw.wav')).then(() => true, error => { if (error.code === 'ENOENT') return false; throw error; })) throw Error('Ja existeix una presa crua: no sobreescriure.');
  const exportBytes = await fs.readFile(source), result = JSON.parse(exportBytes), audio = collectAudio(result).audio;
  if (!result.id || result.model !== request.model) throw Error('Exportació sense identitat o d’un altre model.');
  const recognized = JSON.parse(await fs.readFile(alignment));
  if (recognized.sha256 !== sha(audio)) throw Error('Alineació d’un altre àudio.');
  const blocks = JSON.parse(await fs.readFile(path.join(folder, 'blocks.json')));
  const expected = [], spans = [];
  for (const block of blocks) {
    const words = tokens(block.items.map(item => item.text).join(' '));
    spans.push({ id: block.id, offset: expected.length, length: words.length }); expected.push(...words);
  }
  const mapped = align(expected, recognized.words).map;
  const coverage = spans.map(span => {
    const matched = mapped.slice(span.offset, span.offset + span.length).filter(Boolean);
    return { id: span.id, fraction: matched.length / span.length, start: matched[0]?.start, end: matched.at(-1)?.end };
  });
  if (coverage.some((span, i) => span.fraction < .8 || span.start == null || (i && span.start < coverage[i - 1].end))) throw Error('L’exportació no coincideix prou amb la seqüència completa del lot.');
  const now = new Date().toISOString();
  const recovery = { recoveredAt: now, providerId: result.id, sourceExportSha256: sha(exportBytes), priorAttempt: attempt, matchedSequence: coverage, newRequests: 0, pronunciationValidated: false };
  await fs.writeFile(path.join(folder, 'recovery.json'), JSON.stringify(recovery, null, 2) + '\n');
  await fs.writeFile(path.join(folder, 'response.json.gz'), await promisify(gzip)(exportBytes));
  await fs.writeFile(path.join(folder, 'usage.json'), JSON.stringify({ id: result.id, status: result.status, model: result.model, usage: result.usage, audioBlocks: (result.steps ?? []).flatMap(step => step.content ?? []).filter(item => item.type === 'audio').length }, null, 2) + '\n');
  await fs.writeFile(path.join(folder, 'raw.wav'), audio, { flag: 'wx' });
  await fs.copyFile(alignment, path.join(folder, 'alignment.json'));
  Object.assign(attempt, { state: 'raw-received', completedAt: now, completedAtSource: 'local-export-recovery', recoveredAt: now, rawSha256: sha(audio), responseSha256: sha(exportBytes), responseFile: 'response.json.gz', recovery: 'recovery.json' });
  await fs.writeFile(attemptFile, JSON.stringify(attempt, null, 2) + '\n');
  console.log(JSON.stringify({ batch: id, recovered: true, newRequests: 0, coverage, pronunciation: 'pendent d’audició' }));
})().catch(error => { console.error(error.message); process.exitCode = 1; });
