'use strict';
const assert = require('node:assert/strict'), { fork } = require('node:child_process'), path = require('node:path');
const { chromium } = require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
  const { activities } = await import('../catalogue.js'), { cardReviewUpdate } = await import('../production-review.js'), { productionProgress } = await import('../content/production-progress.js');
  const entry = code => activities.find(item => item.code === code);
  assert.equal(cardReviewUpdate(entry('S005')).id, 'repair-pending');
  assert.equal(cardReviewUpdate(entry('S010')).id, 'repair-received');
  assert.equal(cardReviewUpdate(entry('S030')).id, 'montage-updated');
  assert.equal(cardReviewUpdate(entry('S039')).id, 'montage-updated');
  assert.equal(cardReviewUpdate(entry('S003')), null);
  const progress = productionProgress['ca-S010'], saved = structuredClone(progress.receivedRepairs);
  try {
    progress.receivedRepairs.pop(); assert.equal(cardReviewUpdate(entry('S010')).id, 'repair-mixed');
    progress.receivedRepairs = []; assert.equal(cardReviewUpdate(entry('S010')).id, 'repair-pending');
  } finally { progress.receivedRepairs = saved; }
  const updated = productionProgress['ca-S030'].reviewUpdate, audio = updated.audio;
  try { updated.audio = './superseded.mp3'; assert.equal(cardReviewUpdate(entry('S030')).id, 'audio-review'); } finally { updated.audio = audio; }
  const base = 'http://127.0.0.1:4273/';
  const server = fork(path.join(__dirname, 'serve.cjs'), { env: { ...process.env, SENTIT_PORT: '4273' }, stdio: ['ignore', 'pipe', 'inherit', 'ipc'] });
  let browser; const errors = [];
  try {
    await new Promise(resolve => server.stdout.once('data', resolve));
    browser = await chromium.launch({ channel: 'chrome', headless: true });
    const context = await browser.newContext({ viewport: { width: 1450, height: 950 } });
    await context.route('**/*', route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
    const page = await context.newPage(); page.on('pageerror', error => errors.push(error.message));
    await page.goto(base); await page.locator('.activity-card').first().waitFor();
    for (const code of ['S005', 'S010', 'S011', 'S025', 'S030', 'S039', 'S041']) {
      await page.locator('#search').fill(code);
      const card = page.locator('.activity-card').first();
      await page.waitForFunction(expected => document.querySelector('.activity-card')?.dataset.reviewUpdate === expected, cardReviewUpdate(entry(code)).id);
      assert.equal(await card.getAttribute('data-review-update'), cardReviewUpdate(entry(code)).id);
      const text = await card.locator('.activity-review-label').innerText();
      if (code === 'S010') assert(text.includes('Original sense substituir'));
      if (code === 'S039') assert(text.includes('Guió esmenat'));
      if (code === 'S025') assert(text.includes('prémer'));
      await page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))));
      const label = await card.locator('.activity-review-label').boundingBox(), box = await card.boundingBox();
      assert(label.x >= box.x && label.x + label.width <= box.x + box.width, code + ': label fits card');
    }
    await page.setViewportSize({ width: 820, height: 900 });
    await page.evaluate(() => document.documentElement.dataset.theme = 'dark');
    await page.screenshot({ path: path.resolve(__dirname, '../../tmp/sentit-qa/review-updates.png') });
    assert.deepEqual(errors, []);
    console.log('PASS: pending/received/partial/applied states, stale montage guard, visible card details, no page errors. Zero synthesis.');
  } finally { await browser?.close(); server.kill(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
