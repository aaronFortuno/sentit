'use strict';
const assert = require('node:assert/strict');
const { fork } = require('node:child_process');
const fs = require('node:fs/promises'), path = require('node:path');
const { chromium } = require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const base = 'http://127.0.0.1:4274/', out = path.resolve(__dirname, '../../tmp/sentit-qa/context');
  await fs.mkdir(out, { recursive: true });
  const server = fork(path.join(__dirname, 'serve.cjs'), { env: { ...process.env, SENTIT_PORT: '4274' }, stdio: ['ignore', 'pipe', 'inherit', 'ipc'] });
  let browser;
  try {
    await new Promise(resolve => server.stdout.once('data', resolve));
    browser = await chromium.launch({ channel: 'chrome', headless: true });
    const context = await browser.newContext({ viewport: { width: 1500, height: 1000 } });
    await context.route('**/*', route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
    const page = await context.newPage(), errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const open = async (code, suffix = '') => {
      await page.goto(base + '#lectura=ca-' + code + suffix);
      await page.locator('#workspace').waitFor({ state: 'visible' });
      await page.locator('#worksheet-mode').click();
      await page.evaluate(() => document.fonts.ready);
    };
    const settle = () => page.evaluate(() => Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {}))));
    await open('S003');
    assert(await page.locator('#show-context').isChecked());
    assert.equal(await page.locator('.paper-listening-context').count(), 1);
    assert.equal(await page.locator('.paper-listening-context h4').innerText(), 'Context amb Sentit');
    assert.equal(await page.locator('#show-context').evaluate(node => node.closest('#print-panel') !== null), true);
    await page.locator('#show-context').uncheck();
    assert.equal(await page.locator('.paper-listening-context').count(), 0);
    await page.reload();
    await page.locator('#workspace').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#show-context').isChecked(), false);
    assert.equal(await page.locator('.paper-listening-context').count(), 0);
    await page.locator('#show-context').check();
    await page.locator('#show-instructions').uncheck();
    assert.equal(await page.locator('.paper-listening-context').count(), 1);
    assert.equal(await page.locator('.paper-instructions').count(), 0);
    await page.locator('#show-instructions').check();
    await page.locator('#answers-mode').click();
    assert(await page.locator('#context-option').isHidden());
    assert.equal(await page.locator('.paper-listening-context').count(), 0);
    await page.locator('#worksheet-mode').click();
    assert.equal(await page.locator('.paper-listening-context').count(), 1);
    await settle();
    await page.screenshot({ path: path.join(out, 'worksheet-light.png') });
    await page.pdf({ path: path.join(out, 's003-context.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });

    const result = await page.evaluate(async () => {
      const [{ activities }, { renderWorksheet, defaultFormat }, { strings }] = await Promise.all([import('./catalogue.js'), import('./worksheet.js'), import('./locales.js')]);
      const sandbox = document.createElement('div');
      sandbox.className = 'paper-pages';
      sandbox.style.cssText = 'position:absolute;left:-10000px;top:0;width:210mm;--sheet-zoom:1';
      document.body.append(sandbox);
      const issues = [];
      for (const entry of activities) {
        renderWorksheet(sandbox, entry, defaultFormat, {}, { answerKey: false, labels: strings.ca });
        if (sandbox.querySelectorAll('.paper-listening-context').length !== 1) issues.push(entry.code + ': context missing');
        for (const content of sandbox.querySelectorAll('.paper-content')) {
          const limit = content.getBoundingClientRect().bottom;
          for (const child of content.children) if (child.getBoundingClientRect().bottom > limit + 2) issues.push(entry.code + ': overflow ' + child.className);
        }
      }
      for (const code of ['S003', 'S062', 'S074']) {
        const entry = activities.find(entry => entry.code === code);
        for (const position of ['left', 'center', 'right']) {
          renderWorksheet(sandbox, entry, { font: 'verdana', size: 20, spacing: 9, leading: 1.8 }, { imagePosition: position }, { answerKey: false, labels: strings.ca });
          for (const content of sandbox.querySelectorAll('.paper-content')) for (const child of content.children) if (child.getBoundingClientRect().bottom > content.getBoundingClientRect().bottom + 2) issues.push(code + ': large print overflow ' + child.className);
        }
      }
      sandbox.remove();
      return { count: activities.length, issues, id: activities.find(entry => entry.code === 'S003').id };
    });
    assert.deepEqual(result.issues, []);
    await page.evaluate(id => localStorage.setItem('sentit.collections.v1', JSON.stringify([{ id: 'context-qa', name: 'Context QA', readingIds: [id], layouts: {} }])), result.id);
    await open('S003', '&col=context-qa');
    await page.locator('#show-context').uncheck();
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('sentit.collections.v1'))[0]);
    assert.equal(saved.layouts[result.id].settings.showContext, false);
    await open('S003');
    assert(await page.locator('#show-context').isChecked(), 'Collection choice does not overwrite the standalone worksheet');
    await open('S062');
    assert(await page.locator('#show-context').isChecked());
    await page.locator('#theme').click();
    await settle();
    await page.screenshot({ path: path.join(out, 'worksheet-dark.png') });
    await page.setViewportSize({ width: 640, height: 850 });
    await settle();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.deepEqual(errors, []);
    console.log(`PASS · ${result.count} worksheet contexts, page bounds, large-print/image positions, default on, independent instructions, answer-key visibility, persistence and collection isolation, dark/mobile. Local only.`);
  } finally {
    await browser?.close();
    server.kill();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
