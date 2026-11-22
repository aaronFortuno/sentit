'use strict';
// Persist the server ID before polling. Resuming this file never creates a new interaction.
const fs = require('node:fs/promises');
const { createHash } = require('node:crypto');
const { setTimeout: pause } = require('node:timers/promises');

async function backgroundInteraction(body, options) {
  if (body.background !== true) throw Error('Gemini: background mode must be explicit in the frozen request.');
  const hash = createHash('sha256').update(JSON.stringify(body)).digest('hex');
  const { recordFile, create, retrieve, pollMs = 30000, maxWaitMs = 1200000, wait = pause, now = Date.now } = options;
  let record = await fs.readFile(recordFile, 'utf8').then(JSON.parse).catch(error => {
    if (error.code === 'ENOENT') return null;
    throw error;
  });
  if (record && record.requestHash !== hash) throw Error('Gemini: interaction belongs to a different frozen request.');
  if (record && !record.id) throw Error('Gemini: previous submission has no server ID; do not submit again.');
  const save = async () => {
    await fs.writeFile(recordFile + '.part', JSON.stringify(record, null, 2) + '\n');
    await fs.rename(recordFile + '.part', recordFile);
  };
  const started = now();
  let result;
  try {
    if (!record) {
      record = { requestHash: hash, status: 'submission-started', createdAt: new Date(now()).toISOString() };
      await save();
      result = await create();
      if (typeof result.id !== 'string' || !result.id || result.id.length > 2048) throw Error('Gemini: response has no usable interaction ID.');
      record.id = result.id;
      record.status = result.status;
      if(result.errors?.length)record.providerErrors=result.errors.map(error=>({code:error.code,message:String(error.message??'').slice(0,500)}));
      await save();
    } else {
      if (['failed', 'cancelled', 'requires_action'].includes(record.status)) throw Error('Gemini: terminal interaction requires review (' + record.status + ').');
      result = await retrieve(record.id);
    }
    for (;;) {
      if (result.id && result.id !== record.id) throw Error('Gemini: response belongs to a different interaction.');
      record.status = result.status;
      record.observedAt = new Date(now()).toISOString();
      await save();
      options.onProgress?.({ status: record.status, elapsedSeconds: Math.round((now() - started) / 1000) });
      if (result.status === 'completed') return result;
      if (!['in_progress', 'pending', 'queued'].includes(result.status)) throw Error('Gemini: interaction stopped (' + result.status + '); review without resubmitting.');
      if (now() - started >= maxWaitMs) throw Error('Gemini: result is still pending; resume with the saved ID.');
      await wait(Math.min(pollMs, maxWaitMs - (now() - started)));
      result = await retrieve(record.id);
    }
  } catch (error) {
    record.lastError = error.message;
    record.lastErrorAt = new Date(now()).toISOString();
    await save();
    throw error;
  }
}

module.exports = { backgroundInteraction };
