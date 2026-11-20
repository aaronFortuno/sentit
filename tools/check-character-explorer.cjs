const assert = require('node:assert/strict');
const { fork } = require('node:child_process');
const path = require('node:path');
let playwright;
try { playwright = require('playwright'); }
catch { playwright = require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'); }
const base = 'http://127.0.0.1:4242/';

function waveFixture() {
  const rate = 8000, samples = rate * 3;
  const wave = Buffer.alloc(44 + samples * 2);
  wave.write('RIFF'); wave.writeUInt32LE(36 + samples * 2, 4); wave.write('WAVEfmt ', 8);
  wave.writeUInt32LE(16, 16); wave.writeUInt16LE(1, 20); wave.writeUInt16LE(1, 22);
  wave.writeUInt32LE(rate, 24); wave.writeUInt32LE(rate * 2, 28); wave.writeUInt16LE(2, 32); wave.writeUInt16LE(16, 34);
  wave.write('data', 36); wave.writeUInt32LE(samples * 2, 40);
  for (let i = 0; i < samples; i++) wave.writeInt16LE(Math.round(300 * Math.sin(i * Math.PI * 440 / rate)), 44 + i * 2);
  return 'data:audio/wav;base64,' + wave.toString('base64');
}

(async () => {
  const { activities } = await import('../catalogue.js');
  const mercat = activities.find(entry => entry.code === 'S023');
  const seed = [{ id: 'character-test', name: 'La biblioteca del docent', readingIds: [mercat.id], layouts: { [mercat.id]: { settings: { code: '9.7.3' } } } }];
  const server = fork(path.join(__dirname, 'serve.cjs'), { env: { ...process.env, SENTIT_PORT: '4242' }, stdio: ['ignore', 'pipe', 'inherit', 'ipc'] });
  let browser;
  const errors = [], synthesis = [];
  try {
    await new Promise((resolve, reject) => { server.once('error', reject); server.stdout.once('data', resolve); });
    browser = await playwright.chromium.launch({ channel: 'chrome' });
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    await context.addInitScript(seed => {
      if (localStorage.getItem('character-test-seeded')) return;
      localStorage.setItem('sentit.collections.v1', JSON.stringify(seed));
      localStorage.setItem('sentit.collection.active.v1', '');
      localStorage.setItem('character-test-seeded', 'true');
    }, seed);
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => { if (/generativelanguage|texttospeech|tts\.speech/i.test(request.url())) synthesis.push(request.url()); });
    await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
    const codes = () => page.locator('.activity-card-code').allTextContents().then(rows => rows.map(row => row.split(' · ')[0]).sort());
    const chip = id => page.locator(`[data-filter-character="${id}"]`);
    const roster = id => page.locator(`#dialog-character-explorer [data-character="${id}"]`);
    const open = async () => { await page.locator('#meet-characters').click(); await page.locator('#characters-dialog').waitFor({ state: 'visible' }); };
    const close = async () => { await page.keyboard.press('Escape'); await page.locator('#characters-dialog').waitFor({ state: 'hidden' }); };
    await page.goto(base); await page.locator('.activity-card').first().waitFor();
    await open();
    assert.equal(await page.locator('#characters-dialog .character-roster-button').count(), 11);
    assert.equal(await page.locator('#characters-dialog .character-introduction-play').isDisabled(), true);
    assert.match(await page.locator('#characters-dialog .character-greeting').innerText(), /Soc la Laia/);
    await roster('biel').click();
    assert.equal(await page.locator('#characters-dialog .character-story').count(), 10);
    assert.equal(await page.locator('#characters-dialog .character-profile-intro h3').innerText(), 'Biel');
    assert.equal(await page.locator('#characters-dialog .voice-badge, #characters-dialog .character-sheet').count(), 0);
    await close();
    assert.equal(await page.evaluate(() => document.activeElement.id), 'meet-characters');

    await page.locator('#character-filter summary').click();
    await chip('biel').click(); assert.deepEqual(await codes(), ['S001','S003','S005','S007','S010','S011','S012','S015','S017','S024']);
    await chip('laia').click(); assert.deepEqual(await codes(), ['S001','S003','S005','S007','S010','S011','S012','S015','S017','S019','S021','S024']);
    await page.locator('#character-match').selectOption('all'); assert.deepEqual(await codes(), ['S001','S003','S007','S010','S011','S017','S024']);
    assert.match(page.url(), /coincidencia=tots/);
    await page.reload(); await page.locator('.activity-card').first().waitFor();
    assert.deepEqual(await codes(), ['S001','S003','S007','S010','S011','S017','S024']);
    assert.equal(await chip('biel').getAttribute('aria-pressed'), 'true');
    await chip('nora').click(); assert.deepEqual(await codes(), []);
    assert.equal(await page.locator('#catalog-empty').isVisible(), true);
    await page.locator('#character-match').selectOption('any'); assert.deepEqual(await codes(), ['S001','S003','S005','S007','S010','S011','S012','S015','S017','S019','S021','S024']);
    await page.locator('#grade').selectOption('5'); assert.deepEqual(await codes(), ['S001', 'S015', 'S017']);
    await page.locator('#genre').selectOption('interview'); assert.deepEqual(await codes(), ['S015']);
    await page.locator('#reset-filters').click(); assert.equal((await codes()).length, Math.min(12,activities.length));
    assert.equal(new URL(page.url()).searchParams.has('personatge'), false);
    await page.locator('#collection-select').selectOption('character-test');
    await page.locator('#grade').selectOption('6'); await page.locator('#search').fill('mercat');
    await open(); await roster('biel').click();
    await page.locator('#characters-dialog .character-detail-actions button').click();
    await page.locator('#characters-dialog').waitFor({ state: 'hidden' });
    assert.deepEqual(await codes(), ['S001','S003','S005','S007','S010','S011','S012','S015','S017','S024']);
    assert.equal(await page.locator('#collection-select').inputValue(), '');
    assert.equal(await page.locator('#grade').inputValue(), '');
    assert.equal(await page.locator('#search').inputValue(), '');
    assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('sentit.collections.v1'))), seed);
    await page.locator('.activity-card').first().click(); await page.locator('#workspace').waitFor({ state: 'visible' });
    await open(); await roster('mireia').click();
    assert.match(await page.locator('#characters-dialog .character-stories').innerText(), /Narradora/);
    await page.locator('#characters-dialog .character-story[data-activity="S008"]').click();
    await page.locator('#characters-dialog').waitFor({ state: 'hidden' });
    assert.match(page.url(), /lectura=ca-S008/);

    // A synthetic local fixture verifies future playback without any TTS call.
    await page.evaluate(async audio => {
      const { characters } = await import('./content/characters.js');
      characters.find(character => character.id === 'biel').introduction.audio = audio;
    }, waveFixture());
    await open(); await roster('biel').click();
    const play = page.locator('#characters-dialog .character-introduction-play');
    assert.equal(await play.isEnabled(), true); await play.click();
    await page.waitForFunction(() => document.querySelector('#characters-dialog .character-introduction-play').getAttribute('aria-pressed') === 'true');
    await roster('nora').click();
    assert.equal(await play.isDisabled(), true); assert.equal(await play.getAttribute('aria-pressed'), 'false');
    await roster('biel').click(); await play.click();
    await page.waitForFunction(() => document.querySelector('#characters-dialog .character-introduction-play').getAttribute('aria-pressed') === 'true');
    await close();
    assert.equal(await play.getAttribute('aria-pressed'), 'false', 'Closing the dialog stops a presentation');
    await page.goto(base + 'personatges.html#ferran');
    await page.locator('.character-profile-intro h3').waitFor();
    assert.equal(await page.locator('.character-profile-intro h3').innerText(), 'Ferran');
    assert.equal(await page.locator('.character-detail-actions button').isEnabled(), true);
    assert.equal(await page.locator('.character-story').count(), 2);
    await page.goto(base);
    await page.locator('#language').evaluate(node => { node.value = 'es'; node.dispatchEvent(new Event('change', { bubbles: true })); });
    await open(); assert.equal(await page.locator('#characters-title').innerText(), 'Conoce a los personajes');
    assert.match(await page.locator('#characters-dialog .character-detail-actions button').innerText(), /^Ver sus/);
    await close();
    await page.goto(base + '?escolta=ca-S001');
    await page.locator('#player').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#meet-characters').isHidden(), true);
    assert.equal(await page.locator('#dialog-character-explorer img').count(), 0, 'The listening view does not load the character explorer');
    await context.close();

    const mobile = await browser.newContext({ viewport: { width: 320, height: 568 }, hasTouch: true, isMobile: true });
    const phone = await mobile.newPage(); phone.on('pageerror', error => errors.push(error.message));
    await phone.goto(base + '?personatge=biel'); await phone.locator('#meet-characters').click();
    await phone.locator('#characters-dialog').waitFor({ state: 'visible' });
    assert.equal(await phone.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    const box = await phone.locator('#characters-dialog').boundingBox();
    assert(box.x >= 0 && box.y >= 0 && box.y + box.height <= 569);
    assert.equal(await phone.locator('#characters-dialog .character-detail-actions button').isVisible(), true);
    await phone.locator('#dialog-character-explorer [data-character="mar"]').tap();
    assert.equal(await phone.locator('#characters-dialog .character-profile-intro h3').innerText(), 'Mar');
    await mobile.close();
    assert.deepEqual(errors, []); assert.deepEqual(synthesis, []);
    console.log('PASS · Character modal, portraits, any/all filters, URLs, collections, playback lifecycle, Spanish and mobile. No TTS requests.');
  } finally { await browser?.close(); server.kill(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
