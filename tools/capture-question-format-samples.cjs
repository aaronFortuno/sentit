'use strict';
// Capture real A4 worksheet output; keep its typography and crop only the first question.
const { fork } = require('node:child_process');
const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { chromium } = require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp = require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root = path.resolve(__dirname, '..');
const sha = buffer => createHash('sha256').update(buffer).digest('hex');
(async () => {
  const base = 'http://127.0.0.1:4297/';
  const server = fork(path.join(__dirname, 'serve.cjs'), { env: { ...process.env, SENTIT_PORT: '4297' }, stdio: ['ignore', 'pipe', 'inherit', 'ipc'] });
  let browser;
  try {
    await new Promise((resolve, reject) => { server.stdout.once('data', resolve); server.once('error', reject); });
    browser = await chromium.launch({ channel: 'chrome', headless: true });
    const page = await browser.newPage({ viewport: { width: 1100, height: 1400 }, deviceScaleFactor: 2 });
    await page.route('**/*', route => route.request().url().startsWith(base) ? route.continue() : route.abort());
    await page.route(base + '__samples__', route => route.fulfill({ contentType: 'text/html', body: `<!doctype html><html lang="ca"><head><meta charset="utf-8"><link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="worksheet.css"><style>html,body{display:block;height:auto;overflow:visible;background:#e9eadf}body{padding:24px}.paper-pages{width:210mm}.paper{margin:0;zoom:1}.paper-question-tools{display:none!important}</style></head><body><div id="sample" class="paper-pages"></div></body></html>` }));
    await page.goto(base + '__samples__');
    const records = [];
    for (const mode of ['open', 'choice']) {
      const source = await page.evaluate(async mode => {
        const { activities } = await import('./catalogue.js');
        const { renderWorksheet, defaultFormat } = await import('./worksheet.js');
        const { responseQuestion, registerQuestionChoices } = await import('./question-responses.js?v=0.1.111');
        const { strings } = await import('./locales.js');
        const entry = activities.find(a => a.code === 'S001' && a.language === 'ca');
        await registerQuestionChoices([entry]);
        const settings = { questionMode: mode, showImage: false, showContext: false, showInstructions: false };
        renderWorksheet(document.querySelector('#sample'), entry, defaultFormat, settings, { answerKey: false, labels: strings.ca, toolLabels: strings.ca, listenUrl: null });
        await document.fonts.ready;
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        const block = document.querySelector('[data-complete-question]');
        const prompt = block.querySelector('.paper-prompt').getBoundingClientRect();
        const paper = block.closest('.paper').getBoundingClientRect();
        const items = [...block.querySelectorAll(mode === 'open' ? '.write-line' : '.paper-choice')];
        const last = items.at(-1).getBoundingClientRect();
        return { code: entry.code, questionId: entry.questions[0].id, format: defaultFormat, settings, question: responseQuestion(entry, entry.questions[0], settings), lines: block.querySelectorAll('.write-line').length, options: block.querySelectorAll('.paper-choice').length, crop: { x: Math.floor(paper.x - 16), y: Math.floor(prompt.y - 8), width: 720, height: Math.ceil(last.bottom - prompt.y + 22) } };
      }, mode);
      if ((mode === 'open' && source.lines !== 2) || (mode === 'choice' && source.options !== 4)) throw Error('Unexpected worksheet sample structure');
      const png = await page.screenshot({ clip: source.crop });
      const filename = `question-format-${mode}-print-v1.webp`;
      const target = path.join(root, 'assets/images', filename);
      await sharp(png).webp({ lossless: true }).toFile(target);
      records.push({ mode, file: filename, cssWidth: 720, pixelRatio: 2, ...source, sha256: sha(await fs.readFile(target)) });
    }
    const provenance = { method: 'Local screenshot of the complete A4 renderWorksheet output, cropped to the first question. No rewritten sample markup, no solution marks, no generated image.', language: 'ca', rightFade: 'Applied by CSS mask in the preference dialog, outside the source captures.', sourceHashes: Object.fromEntries(await Promise.all(['worksheet.js', 'worksheet.css', 'styles.css'].map(async f => [f, sha(await fs.readFile(path.join(root, f)))]))), captures: records };
    await fs.writeFile(path.join(root, 'assets/images/question-format-print-samples.json'), JSON.stringify(provenance, null, 2) + '\n');
    console.log('Captured S001: two response lines and four unmarked ABCD options, at real A4 scale.');
  } finally { await browser?.close(); server.kill(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
