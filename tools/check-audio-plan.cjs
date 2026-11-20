'use strict';
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { buildPlan, request } = require('./audio-plan.cjs');
const { assertQuota } = require('./audio-quota.cjs');
const { specs } = require('./generate-prototypes.cjs');

(async () => {
  for (const spec of specs) {
    const entry = Object.values(await import(pathToFileURL(path.resolve(__dirname, '../content', spec.name + '.js'))))[0];
    const ids = entry.transcript.filter(p => p.speaker).map(p => p.id);
    const legacyIds = (spec.scenes ?? []).flat();
    if (legacyIds.length && (legacyIds.length !== ids.length || legacyIds.some((id, i) => id !== ids[i]))) {
      // A rewritten script must not inherit the old scene cache by position.
      await assert.rejects(buildPlan(entry, spec, async () => false), /no coincideixen/);
      const currentSpec = { ...spec, scenes: [] };
      const current = await buildPlan(entry, currentSpec, async () => false);
      assert.equal(current.requests, 2);
      assert.deepEqual(current.pieces[0].parts, ids);
      const cached = await buildPlan(entry, currentSpec, async name => ['fragment-complet', 'intro'].includes(name));
      assert.equal(cached.requests, 0);
      assert.equal(cached.mode, 'whole');
      continue;
    }
    const fresh = await buildPlan(entry, spec, async () => false);
    assert.equal(fresh.requests, 2, 'One whole fragment request plus one title request');
    assert.equal(fresh.pieces.length, 1);
    assert.deepEqual(fresh.pieces[0].parts, entry.transcript.filter(p => p.speaker).map(p => p.id));
    const payload = request(fresh.pieces[0].turns, spec);
    assert.equal(payload.input.length, 1);
    assert.deepEqual(payload.input[0].content.map(p => p.text), entry.transcript.filter(p => p.speaker).map(p => p.text));

    const done = await buildPlan(entry, spec, async name => name === 'intro' || name.startsWith('scene-'));
    assert.equal(done.requests, 0, 'Completed legacy takes require no generation');
    assert.equal(done.mode, 'legacy');
    const partial = await buildPlan(entry, spec, async name => name === 'scene-1');
    assert.equal(partial.requests, 2, 'Reuse old prefix and synthesize the whole remainder in one call');
    assert.equal(partial.pieces.length, 2);
    assert(partial.pieces[0].cached);
    assert.deepEqual(partial.pieces.flatMap(p => p.parts), fresh.pieces[0].parts);
    const resumed = await buildPlan(entry, spec, async name => ['scene-1', 'fragment-restant', 'intro'].includes(name));
    assert.equal(resumed.requests, 0, 'Resume after synthesis but before a completed mix without repeating calls');
    await assert.rejects(buildPlan(entry, spec, async name => name === 'scene-2'), /fora d’ordre/);
  }
  assert.throws(() => assertQuota({ http: 429 }), /revisar/);
  assert.throws(() => assertQuota({ http: 429, retryNotBefore: '2026-11-19T08:00:00Z' }, Date.parse('2026-11-18T20:00:00Z')), /Quota aturada/);
  assert.doesNotThrow(() => assertQuota({ http: 429, retryNotBefore: '2026-11-19T08:00:00Z' }, Date.parse('2026-11-19T08:00:01Z')));
  console.log('PASS · Whole-text calls, legacy preservation, partial resume, cache reuse and quota stop. No API requests.');
})().catch(error => { console.error(error); process.exitCode = 1; });
