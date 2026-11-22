'use strict';
// Fake transport only: prove recovery never submits the same job twice.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises'), os = require('node:os'), path = require('node:path');
const { backgroundInteraction } = require('./gemini-background.cjs');
(async () => {
  const folder = await fs.mkdtemp(path.join(os.tmpdir(), 'sentit-background-'));
  const body = { model: 'test-only', background: true, input: [] };
  let posts = 0, gets = 0, tick = 0;
  const file = path.join(folder, 'interaction.json');
  const options = {
    recordFile: file, pollMs: 10, maxWaitMs: 20, now: () => tick,
    wait: async ms => { tick += ms; },
    create: async () => { posts++; return { id: 'saved-id', status: 'in_progress' }; },
    retrieve: async id => {
      gets++; assert.equal(id, 'saved-id');
      assert.equal(JSON.parse(await fs.readFile(file)).id, id, 'ID saved before polling');
      throw Error('test disconnect');
    },
  };
  try {
    await assert.rejects(backgroundInteraction(body, options), /test disconnect/);
    assert.equal(posts, 1);
    const complete = { id: 'saved-id', status: 'completed', steps: [] };
    const result = await backgroundInteraction(body, { ...options, retrieve: async id => { gets++; assert.equal(id, complete.id); return complete; } });
    assert.deepEqual(result, complete); assert.equal(posts, 1); assert.equal(gets, 2);
    await assert.rejects(backgroundInteraction({ ...body, input: ['changed'] }, options), /different frozen/);
    assert.equal(posts, 1); assert.equal(gets, 2);
    await assert.rejects(backgroundInteraction(body, { ...options, recordFile: path.join(folder, 'no-id.json'), create: async () => { posts++; throw Error('submission disconnected'); } }), /submission disconnected/);
    await assert.rejects(backgroundInteraction(body, { ...options, recordFile: path.join(folder, 'no-id.json') }), /no server ID/);
    assert.equal(posts, 2, 'Unknown POST outcome cannot be submitted again');
    const failedFile = path.join(folder, 'failed.json');
    await assert.rejects(backgroundInteraction(body, { ...options, recordFile: failedFile, create: async () => ({ id: 'failed-id', status: 'failed' }) }), /interaction stopped/);
    await assert.rejects(backgroundInteraction(body, { ...options, recordFile: failedFile }), /terminal interaction/);
    const pendingFile = path.join(folder, 'pending.json'); tick = 0;
    await assert.rejects(backgroundInteraction(body, { ...options, recordFile: pendingFile, create: async () => ({ id: 'pending-id', status: 'in_progress' }), retrieve: async () => ({ id: 'pending-id', status: 'in_progress' }) }), /still pending/);
    assert.equal(JSON.parse(await fs.readFile(pendingFile)).id, 'pending-id');
    console.log('PASS · saved ID, interrupted retrieval, resume without POST, unknown outcomes, frozen identity, terminal states and bounded polling. No network or quota.');
  } finally { await fs.rm(folder, { recursive: true, force: true }); }
})().catch(error => { console.error(error); process.exitCode = 1; });
