'use strict';
const assert = require('node:assert/strict'), fs = require('node:fs/promises'), path = require('node:path');
const { fork } = require('node:child_process');
const { chromium } = require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async () => {
  const base = 'http://127.0.0.1:4278/', output = path.resolve(__dirname, '../../tmp/sentit-qa/repairs');
  await fs.mkdir(output, { recursive: true });
  const before = await fs.readFile(path.resolve(__dirname, '../content/production-progress.js'), 'utf8');
  const server = fork(path.join(__dirname, 'serve.cjs'), { env: { ...process.env, SENTIT_PORT: '4278' }, stdio: ['ignore', 'pipe', 'inherit', 'ipc'] });
  let browser;
  try {
    await new Promise(resolve => server.stdout.once('data', resolve));
    browser = await chromium.launch({ channel: 'chrome', headless: true });
    const page = await browser.newPage({ viewport: { width: 1500, height: 1000 } }), errors = [];
    await page.route('**/*', route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
    page.on('pageerror', error => errors.push(error.message));
    for (const [code, count] of [['S010', 1]]) {
      await page.goto(base + '#lectura=ca-' + code);
      await page.locator('#repair-previews button').click();
      const dialog = page.locator('#repair-preview-dialog');
      await dialog.waitFor({ state: 'visible' });
      assert.equal(await dialog.locator('.repair-preview-pair').count(), count);
      assert.equal(await dialog.locator('audio').count(), count * 2);
      assert((await page.locator('#repair-preview-notice').innerText()).includes('versió anterior'));
      await dialog.locator('audio[data-repair-version="candidateFile"]').first().evaluate(audio => audio.play());
      await page.waitForFunction(() => [...document.querySelectorAll('#repair-preview-dialog audio')].some(audio => !audio.paused));
      await dialog.locator('audio[data-repair-version="originalFile"]').first().evaluate(audio => audio.play());
      assert.equal(await dialog.locator('audio').evaluateAll(audios => audios.filter(audio => !audio.paused).length), 1);
      assert((await dialog.locator('label').last().innerText()).includes('validada'));
      if (code === 'S010') await page.screenshot({ path: path.join(output, 's010-comparison.png') });
      await dialog.locator('button[type="submit"]').click();
      await page.waitForFunction(() => !document.getElementById('repair-preview-dialog').open);
      assert(await dialog.locator('audio').evaluateAll(audios => audios.every(audio => audio.paused)));
    }
    await page.locator('#theme').click();
    await page.setViewportSize({ width: 640, height: 850 });
    await page.locator('#repair-previews button').evaluate(button => button.click());
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.setViewportSize({ width: 390, height: 780 });
    assert.equal(await page.locator('#repair-preview-dialog').evaluate(dialog => dialog.scrollWidth > dialog.clientWidth), false);
    await page.screenshot({ path: path.join(output, 's010-approved-dark-mobile.png') });
    await page.goto(base + '#lectura=ca-S022');
    await page.locator('#workspace').waitFor({ state: 'visible' });
    assert(await page.locator('#repair-previews').isHidden(), 'Rejected trial is not offered as a new pending take');
    await page.goto(base + '#lectura=ca-S003');
    await page.locator('#workspace').waitFor({ state: 'visible' });
    assert(await page.locator('#repair-previews').isHidden());
    assert.deepEqual(errors, []);
    assert.equal(await fs.readFile(path.resolve(__dirname, '../content/production-progress.js'), 'utf8'), before, 'Listening never approves or applies a repair');
    console.log('PASS · S010 approved comparison / S022 rejected trial, real playback, one audio at a time, close stops sound, mobile/dark, absent without repairs and unchanged approvals. Local only.');
  } finally { await browser?.close(); server.kill(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
