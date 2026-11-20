'use strict';
const assert=require('node:assert/strict'),{fork}=require('node:child_process'),path=require('node:path'),fs=require('node:fs/promises');
const {chromium}=require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base='http://127.0.0.1:4258/',key='sentit.catalogue.show-provisional.v1';
(async()=>{
 const {activities}=await import('../catalogue.js'),{universes,matchesUniverse}=await import('../content/universes.js');
 assert(matchesUniverse({language:'es',code:'S001'},'independent'),'Unassigned language variants are independent');
 const server=fork(path.join(__dirname,'serve.cjs'),{env:{...process.env,SENTIT_PORT:'4258'},stdio:['ignore','pipe','inherit','ipc']});let browser;
 const out=path.resolve(__dirname,'../../tmp/sentit-qa/catalogue-universes');await fs.mkdir(out,{recursive:true});const errors=[];
 try{
  await new Promise(r=>server.stdout.once('data',r));browser=await chromium.launch({channel:'chrome'});
  const context=await browser.newContext({viewport:{width:1500,height:950},reducedMotion:'reduce'});
  await context.route('**/*',route=>new URL(route.request().url()).origin===new URL(base).origin?route.continue():route.abort());
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(base);await page.locator('.activity-card').first().waitFor();
  const toggle=page.locator('#show-provisional');assert.equal(await toggle.isChecked(),true);
  assert.match(await page.locator('.top #catalog-count').innerText(),/^2 comprensions orals per a la teva aula$/);
  assert.equal(await page.locator('.catalog #catalog-count').count(),0);
  const codes=async()=>{for(let i=0;i<4;i++){const before=await page.locator('.activity-card').count();await page.locator('.catalog-results-scroll').evaluate(n=>{n.scrollTop=n.scrollHeight;n.dispatchEvent(new Event('scroll'));});await page.evaluate(()=>new Promise(requestAnimationFrame));if(await page.locator('.activity-card').count()===before)break;}return (await page.locator('.activity-card-code').allTextContents()).map(s=>s.split(' · ')[0]).sort();};
  for(const u of universes){await page.locator('#universe').selectOption(u.id);assert.deepEqual(await codes(),u.activities.map(id=>id.slice(3)).sort());}
  await page.locator('#universe').selectOption('aina-ferran');await page.locator('#search').fill('S008R');
  assert.match(await page.locator('.activity-universe').innerText(),/Aina/);await page.locator('.activity-card').click();await page.locator('#workspace').waitFor({state:'visible'});assert.match(await page.locator('#activity-meta').innerText(),/Aina/);await page.locator('#back-catalog').click();
  await page.locator('#reset-filters').click();
  const saved=await page.evaluate(()=>{const saved=JSON.stringify([{id:'universe-qa',name:'Mostra',readingIds:['el-senyal-de-la-radio','el-paraigua-intercanviat'],layouts:{}}]);localStorage.setItem('sentit.collections.v1',saved);return saved;});
  await toggle.uncheck();assert.deepEqual(await codes(),['S001','S002']);assert.equal(await page.evaluate(key=>localStorage.getItem(key),key),'false');
  await page.locator('#reset-filters').click();assert.equal(await toggle.isChecked(),false);assert.deepEqual(await codes(),['S001','S002']);
  await page.reload();await page.locator('.activity-card').first().waitFor();assert.equal(await toggle.isChecked(),false);assert.deepEqual(await codes(),['S001','S002']);
  assert.equal(await page.evaluate(()=>localStorage.getItem('sentit.collections.v1')),saved);
  await page.locator('#universe').selectOption('aina-ferran');assert.equal(await page.locator('.activity-card').count(),0);assert.equal(await page.locator('#catalog-empty').isVisible(),true);
  const other=await context.newPage();await other.goto(base);await other.locator('.activity-card').first().waitFor();assert.equal(await other.locator('#show-provisional').isChecked(),false);
  await toggle.check();await other.waitForFunction(()=>document.querySelector('#show-provisional').checked);await page.locator('#reset-filters').click();assert.equal((await codes()).length,activities.length);
  await page.locator('#language').evaluate(n=>{n.value='es';n.dispatchEvent(new Event('change',{bubbles:true}));});assert.match(await page.locator('#catalog-count').innerText(),/2 comprensiones orales para tu aula/);
  assert.match(await page.locator('#universe').innerText(),/Con Mireia/);assert.equal(await toggle.isChecked(),true);
  await page.screenshot({path:path.join(out,'desktop.png')});
  for(const width of [900,640,320]){await page.setViewportSize({width,height:800});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);const count=await page.locator('#catalog-count').boundingBox(),brand=await page.locator('.brand').boundingBox(),actions=await page.locator('.top-actions').boundingBox();assert(count.x+count.width<=actions.x||count.y>=actions.y+actions.height);assert(count.y>=brand.y);}
  await page.screenshot({path:path.join(out,'mobile.png')});
  const blocked=await browser.newContext({viewport:{width:1200,height:800},reducedMotion:'reduce'});await blocked.route('**/*',route=>new URL(route.request().url()).origin===new URL(base).origin?route.continue():route.abort());
  await blocked.addInitScript(()=>{Storage.prototype.getItem=()=>{throw Error('Storage blocked');};Storage.prototype.setItem=()=>{throw Error('Storage blocked');};});
  const fallback=await blocked.newPage();fallback.on('pageerror',e=>errors.push(e.message));await fallback.goto(base);await fallback.locator('.activity-card').first().waitFor();assert.equal(await fallback.locator('#show-provisional').isChecked(),true);await fallback.locator('#show-provisional').uncheck();assert.equal(await fallback.locator('.activity-card').count(),2);
  assert.deepEqual(errors,[]);console.log('PASS · Four universes, narrated-character links, combined filters, ready-only header count, default visible drafts, reload/cross-tab persistence, reset independence, collection preservation, Spanish, 320px and blocked storage. No external requests.');
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
