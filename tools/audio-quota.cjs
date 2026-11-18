'use strict';
const fs = require('node:fs/promises');
const path = require('node:path');
const { setTimeout: wait } = require('node:timers/promises');

async function readJSON(file, fallback) {
  return JSON.parse(await fs.readFile(file, 'utf8').catch(error => { if (error.code === 'ENOENT') return JSON.stringify(fallback); throw error; }));
}

function assertQuota(quota, now = Date.now()) {
  if (quota?.http !== 429) return;
  const until = Date.parse(quota.retryNotBefore);
  if (!Number.isFinite(until)) throw Error('Quota aturada: cal revisar el límit abans de reprendre. Cap petició enviada.');
  if (until > now) throw Error('Quota aturada fins a ' + quota.retryNotBefore + '. Cap petició enviada.');
}

async function reserveRequest(directory, metadata) {
  assertQuota(await readJSON(path.join(directory, 'last-api-error.json'), null));
  const file = path.join(directory, 'request-log.json');
  const log = await readJSON(file, []);
  if (!Array.isArray(log)) throw Error('Registre de peticions no vàlid.');
  const previous = log.length ? Date.parse(log.at(-1).at) : 0;
  const remaining = previous + 22000 - Date.now();
  if (remaining > 60000) throw Error('El rellotge no concorda amb el registre de peticions.');
  if (remaining > 0) await wait(remaining);
  assertQuota(await readJSON(path.join(directory, 'last-api-error.json'), null));
  log.push({ at: new Date().toISOString(), ...metadata });
  await fs.writeFile(file, JSON.stringify(log, null, 2) + '\n');
}

module.exports = { assertQuota, reserveRequest, readJSON };
