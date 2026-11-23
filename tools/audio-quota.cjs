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

async function reserveRequest(directory, metadata, body, options = {}) {
  const utilization=require('./audio-batch-policy.cjs').assertSynthesisWindow(body,options.windowException);
  if(options.windowException&&options.windowException.batchId!==metadata.code)throw Error('L’excepció de mida correspon a un altre lot. Cap petició enviada.');
  assertQuota(await readJSON(path.join(directory, 'last-api-error.json'), null));
  const file = path.join(directory, 'request-log.json');
  const log = await readJSON(file, []);
  if (!Array.isArray(log)) throw Error('Registre de peticions no vàlid.');
  const day=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Los_Angeles'}),today=day.format(new Date());
  if(log.filter(item=>day.format(new Date(item.at))===today).length>=10)throw Error('Ja consten deu peticions en el dia de quota. Cap petició enviada.');
  const previous = log.length ? Date.parse(log.at(-1).at) : 0;
  const interval=options.minimumIntervalMs??22000;
  let remaining = previous + interval - Date.now();
  if (remaining > interval+1000) throw Error('El rellotge no concorda amb el registre de peticions.');
  while(remaining>0){await wait(Math.min(remaining,55000));remaining=previous+interval-Date.now();}
  assertQuota(await readJSON(path.join(directory, 'last-api-error.json'), null));
  log.push({ at: new Date().toISOString(), ...metadata, estimatedSeconds:utilization.seconds,...(options.windowException?{windowException:options.windowException}:{}) });
  await fs.writeFile(file, JSON.stringify(log, null, 2) + '\n');
}

module.exports = { assertQuota, reserveRequest, readJSON };
