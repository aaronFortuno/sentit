const assert = require('node:assert/strict');
const { fork } = require('node:child_process');
const path = require('node:path');
let playwright;
try { playwright = require('playwright'); }
catch { playwright = require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'); }
const base = 'http://127.0.0.1:4238/';

(async () => {
  const { activities } = await import('../catalogue.js');
  // Fixed fixture: three easy cards followed by a hidden middle/advanced tail.
  // Extra catalogue entries must not turn the filtered-tail drop into a middle drop.
  const ids = activities.slice(0, 5).map(entry => entry.id);
  const layout = { format: { font: 'Georgia', size: 14, spacing: 8, leading: 1.7 }, settings: { code: '4.2.7' } };
  const seed = [{ id: 'gesture-main', name: 'Principal', readingIds: ids, layouts: { [ids[0]]: layout } },
    { id: 'gesture-other', name: 'Una altra', readingIds: [ids[4]], layouts: {} }];
  const server = fork(path.join(__dirname, 'serve.cjs'), { env: { ...process.env, SENTIT_PORT: '4238' }, stdio: ['ignore', 'pipe', 'inherit', 'ipc'] });
  let browser;
  const errors = [];
  try {
    await new Promise((resolve, reject) => { server.once('error', reject); server.stdout.once('data', resolve); });
    browser = await playwright.chromium.launch({ channel: 'chrome' });
    async function start(options = {}) {
      const context = await browser.newContext({ viewport: { width: 1500, height: 1000 }, reducedMotion: 'reduce', ...options });
      await context.addInitScript(seed => {
        if (localStorage.getItem('gestures-test-seeded')) return;
        localStorage.setItem('sentit.collections.v1', JSON.stringify(seed));
        localStorage.setItem('sentit.collection.active.v1', 'gesture-main');
        localStorage.setItem('gestures-test-seeded', 'true');
      }, seed);
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      await page.route('**/cloud.umami.is/**', route => route.abort());
      await page.goto(base);
      await page.locator('#activity-grid .activity-card').first().waitFor();
      return { context, page };
    }
    const { context, page } = await start();
    const card = id => page.locator(`#activity-grid .activity-card[data-id="${id}"]`);
    const order = () => page.evaluate(() => JSON.parse(localStorage.getItem('sentit.collections.v1'))[0].readingIds);
    const visible = () => page.locator('#activity-grid .activity-card').evaluateAll(cards => cards.map(card => card.dataset.id));
    const closed = () => page.waitForFunction(() => !document.querySelector('#card-context-menu').matches(':popover-open'));
    const open = () => page.waitForFunction(() => document.querySelector('#card-context-menu').matches(':popover-open'));
    async function drag(fromId, toId) {
      const from = await card(fromId).boundingBox(), to = await card(toId).boundingBox();
      await page.mouse.move(from.x + from.width / 2, from.y + 65);
      await page.mouse.down();
      await page.mouse.move(from.x + from.width / 2 + 12, from.y + 65);
      await page.waitForFunction(() => document.body.classList.contains('is-catalog-dragging'));
      await page.mouse.move(to.x + to.width * .85, to.y + 65, { steps: 15 });
      await page.waitForTimeout(180);
      await page.mouse.up();
    }
    assert.equal(await page.locator('#collection-library, #collection-manage, #activity-grid input').count(), 0);
    assert.equal(await card(ids[1]).locator('.duration-meter .is-filled').count(), 1);
    assert.equal(await card(ids[0]).locator('.duration-meter .is-filled').count(), 2);
    await card(ids[0]).click();
    await page.locator('#workspace').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#classroom-code').inputValue(), '4.2.7');
    assert.equal(await page.locator('#sheet-size').inputValue(), '14');
    await page.locator('#back-catalog').click();

    await drag(ids[0], ids[2]);
    assert.deepEqual(await order(), [ids[1], ids[2], ids[0], ...ids.slice(3)]);
    assert.deepEqual(await visible(), await order());
    assert.equal(await page.locator('#catalog-view').isVisible(), true);
    assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('sentit.collections.v1'))[0].layouts), seed[0].layouts);
    assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('sentit.collections.v1'))[1]), seed[1]);
    // Filtered tail stays after the last visible card on a drop.
    await page.locator('#level').selectOption('easy');
    await drag(ids[1], ids[0]);
    assert.deepEqual(await order(), [ids[2], ids[0], ids[1], ...ids.slice(3)]);
    await card(ids[1]).focus();
    await page.keyboard.press('Alt+ArrowLeft');
    assert.deepEqual(await order(), [ids[2], ids[1], ids[0], ...ids.slice(3)]);
    assert.equal(await page.evaluate(() => document.activeElement.dataset.id), ids[1]);
    await page.reload();
    await card(ids[2]).waitFor();
    assert.deepEqual(await visible(), await order());

    // A failed write must restore even an already reordered DOM.
    const before = await order();
    await page.evaluate(() => {
      const original = Storage.prototype.setItem;
      window.restoreStorage = () => { Storage.prototype.setItem = original; };
      Storage.prototype.setItem = function(key, value) {
        if (key === 'sentit.collections.v1') throw new DOMException('Full', 'QuotaExceededError');
        return original.call(this, key, value);
      };
    });
    await drag(ids[2], ids[0]);
    assert.deepEqual(await order(), before);
    assert.deepEqual(await visible(), before);
    assert((await page.locator('#catalog-status').textContent()).includes('desar'));
    await page.evaluate(() => window.restoreStorage());

    const held = await card(ids[0]).boundingBox();
    await page.mouse.move(held.x + held.width / 2, held.y + 65);
    await page.mouse.down(); await open(); await page.mouse.up();
    assert.equal(await page.locator('#catalog-view').isVisible(), true);
    await page.locator('[data-card-option="remove"]').click();
    assert(!(await order()).includes(ids[0]));
    assert.deepEqual(await page.evaluate(id => JSON.parse(localStorage.getItem('sentit.collections.v1'))[0].layouts[id], ids[0]), layout);
    await page.locator('#collection-select').selectOption('');
    await page.locator('#search').fill(activities[0].code);
    await card(ids[0]).click({ button: 'right' }); await open();
    assert.equal(await page.locator('[data-card-option="remove"]').isVisible(), false);
    await page.locator('[data-card-option="add"]').click();
    await page.locator('[data-collection-target="gesture-main"]').click();
    assert((await order()).includes(ids[0]));
    assert.equal(await page.locator('#collection-select').inputValue(), '');
    assert.equal(await page.locator('[data-collection-target="gesture-main"]').isDisabled(), true);
    assert.deepEqual(await page.evaluate(id => JSON.parse(localStorage.getItem('sentit.collections.v1'))[0].layouts[id], ids[0]), layout);
    await page.locator('[data-card-collection-new]').click();
    await page.locator('#card-collection-name').fill('Principal');
    await page.locator('.card-collection-form button[type="submit"]').click();
    assert.equal(await page.locator('#card-collection-name').getAttribute('aria-invalid'), 'true');
    await page.locator('#card-collection-name').fill('Prova nova');
    await page.locator('.card-collection-form button[type="submit"]').click();
    assert(await page.evaluate(() => JSON.parse(localStorage.getItem('sentit.collections.v1')).some(entry => entry.name === 'Prova nova')));
    await page.keyboard.press('Escape'); await page.keyboard.press('Escape'); await closed();
    await card(ids[0]).focus(); await page.keyboard.press('Shift+F10'); await open();
    await page.keyboard.press('Escape'); await closed();
    assert.equal(await page.evaluate(() => document.activeElement.dataset.id), ids[0]);

    await page.locator('#search').fill('');
    await page.locator('#collection-save').click();
    assert.equal(await page.locator('#activity-grid input').count(), 0);
    await card(ids[1]).click();
    assert.equal(await card(ids[1]).getAttribute('aria-pressed'), 'true');
    await card(ids[1]).press('Space');
    assert.equal(await card(ids[1]).getAttribute('aria-pressed'), 'false');
    await page.locator('#selection-all').click();
    assert.equal(await page.locator('.activity-card.is-selected').count(), activities.length);
    await page.locator('#selection-save').click();
    await page.locator('#collection-name').fill('Tanda');
    await page.locator('#collection-submit').click();
    assert.equal(await page.locator('#activity-grid .is-selected').count(), 0);
    assert.equal((await page.locator('#collection-select option:checked').textContent()), 'Tanda');
    await page.locator('#collection-rename-toggle').click();
    await page.locator('#collection-rename-name').fill('Tanda nova');
    await page.locator('#collection-rename button').click();
    assert.equal((await page.locator('#collection-select option:checked').textContent()), 'Tanda nova');
    await context.close();

    async function touch(client, type, x, y) {
      await client.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y, id: 1, radiusX: 2, radiusY: 2, force: 1 }] });
    }
    const phone = await start({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const client = await phone.context.newCDPSession(phone.page);
    const phoneCard = phone.page.locator('#activity-grid .activity-card').first();
    await phoneCard.scrollIntoViewIfNeeded();
    const box = await phoneCard.boundingBox();
    const scrollTop = () => phone.page.locator('.catalog-results-scroll').evaluate(node => node.scrollTop);
    const initialScroll = await scrollTop();
    await touch(client, 'touchStart', box.x + 100, box.y + 100);
    for (let step = 1; step <= 8; step++) { await touch(client, 'touchMove', box.x + 100, box.y + 100 - step * 12); await phone.page.waitForTimeout(12); }
    await touch(client, 'touchEnd'); await phone.page.waitForTimeout(200);
    assert((await scrollTop()) > initialScroll, 'A quick swipe scrolls normally');
    assert.deepEqual(await phone.page.evaluate(() => JSON.parse(localStorage.getItem('sentit.collections.v1'))[0].readingIds), ids);
    await phoneCard.scrollIntoViewIfNeeded();
    const hold = await phoneCard.boundingBox();
    await touch(client, 'touchStart', hold.x + 100, hold.y + 65);
    await phone.page.waitForFunction(() => document.querySelector('#card-context-menu').matches(':popover-open'));
    await touch(client, 'touchEnd');
    assert.equal(await phone.page.locator('#catalog-view').isVisible(), true);
    await phone.page.locator('[data-card-option="add"]').tap();
    await phone.page.locator('[data-card-collection-new]').tap();
    await phone.page.locator('#card-collection-name').fill('Tàctil');
    await phone.page.locator('.card-collection-form button[type="submit"]').tap();
    assert(await phone.page.evaluate(() => JSON.parse(localStorage.getItem('sentit.collections.v1')).some(entry => entry.name === 'Tàctil')));
    await phone.context.close();

    const tablet = await start({ viewport: { width: 1100, height: 1000 }, hasTouch: true });
    const tabletClient = await tablet.context.newCDPSession(tablet.page);
    const from = await tablet.page.locator('.activity-card').nth(0).boundingBox();
    const to = await tablet.page.locator('.activity-card').nth(1).boundingBox();
    await touch(tabletClient, 'touchStart', from.x + from.width / 2, from.y + 65);
    await tablet.page.waitForTimeout(270);
    await touch(tabletClient, 'touchMove', from.x + from.width / 2 + 15, from.y + 65);
    await tablet.page.waitForFunction(() => document.body.classList.contains('is-catalog-dragging'));
    await touch(tabletClient, 'touchMove', to.x + to.width * .85, to.y + 65);
    await tablet.page.waitForTimeout(180); await touch(tabletClient, 'touchEnd');
    await tablet.page.waitForFunction(id => JSON.parse(localStorage.getItem('sentit.collections.v1'))[0].readingIds[0] !== id, ids[0]);
    assert.equal(await tablet.page.locator('#catalog-view').isVisible(), true);
    await tablet.context.close();

    // A context menu opened during a collapsing selection bar stays usable.
    const motion = await start({ viewport: { width: 1100, height: 820 }, reducedMotion: 'no-preference' });
    await motion.page.locator('#collection-select').selectOption('');
    await motion.page.locator('#collection-save').click();
    await motion.page.locator('.activity-card').first().click();
    await motion.page.locator('#selection-cancel').click();
    await motion.page.locator('.activity-card').last().click({ button: 'right' });
    await motion.page.waitForTimeout(300);
    assert(await motion.page.locator('#card-context-menu').evaluate(node => node.matches(':popover-open')));
    assert.equal(await motion.page.locator('#card-context-menu').evaluate(node => getComputedStyle(node).transitionDuration.split(',')[0]), '0.22s');
    await motion.page.locator('[data-card-option="add"]').click();
    await motion.page.locator('[data-card-collection-new]').click();
    await motion.page.locator('#card-collection-name').fill('Amb animació');
    await motion.page.locator('.card-collection-form button[type="submit"]').click();
    await motion.page.mouse.click(1050, 100);
    assert(await motion.page.locator('#card-context-menu').evaluate(node => !node.matches(':popover-open')));
    await motion.context.close();
    assert.deepEqual(errors, []);
    console.log('PASS · Mouse/touch drag, long press, keyboard, scrolling, selection, saved layouts, filtered tail, rollback and persistence.');
  } finally { await browser?.close(); server.kill(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
