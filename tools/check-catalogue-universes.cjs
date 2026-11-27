'use strict';
const assert=require('node:assert/strict'),{fork}=require('node:child_process'),path=require('node:path'),fs=require('node:fs/promises');
const {chromium}=require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base='http://127.0.0.1:4258/',key='sentit.catalogue.show-provisional.v1';
(async()=>{
 const {activities}=await import('../catalogue.js'),{universes,matchesUniverse,universesForActivity}=await import('../content/universes.js');
 const ready=activities.filter(e=>e.audio&&!['pending','audio-review'].includes(e.reviewStatus)),readyCodes=ready.map(e=>e.code).sort();
 const drafts=activities.filter(e=>['pending','audio-review'].includes(e.reviewStatus)),draftCodes=drafts.map(e=>e.code).sort();
 assert(matchesUniverse({language:'es',code:'S001'},'independent'),'Unassigned language variants are independent');
 assert.equal(universes.length,10);assert(activities.every(e=>universesForActivity(e).length),'No reading lost its classification');
 for(const code of ['S008R','S043'])assert.deepEqual(universesForActivity(activities.find(e=>e.code===code)).map(u=>u.id),['aina-ferran']);
 for(const code of ['S108','S109','S110','S111']){const entry=activities.find(e=>e.code===code);assert(matchesUniverse(entry,'situacions-quotidianes'));assert(matchesUniverse(entry,'a-peu-de-cami'),'Source IDs remain compatible');}
 assert(matchesUniverse(activities.find(e=>e.code==='S043'),'histories-sentit'));
 const server=fork(path.join(__dirname,'serve.cjs'),{env:{...process.env,SENTIT_PORT:'4258'},stdio:['ignore','pipe','inherit','ipc']});let browser;
 const out=path.resolve(__dirname,'../../tmp/sentit-qa/catalogue-universes');await fs.mkdir(out,{recursive:true});const errors=[];
 try{
  await new Promise(r=>server.stdout.once('data',r));browser=await chromium.launch({channel:'chrome'});
  const context=await browser.newContext({viewport:{width:1500,height:950},reducedMotion:'reduce'});
  await context.addInitScript(()=>localStorage.setItem('sentit.question-format.v1','open'));
  await context.route('**/*',route=>new URL(route.request().url()).origin===new URL(base).origin?route.continue():route.abort());
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(base);await page.locator('.activity-card').first().waitFor();
  const toggle=page.locator('#show-provisional');assert.equal(await toggle.isChecked(),false);await toggle.check();
  assert.equal(await page.locator('.top #catalog-count').innerText(),ready.length+' comprensions orals per a la teva aula');
  assert.equal(await page.locator('.catalog #catalog-count').count(),0);
  const codes=async()=>(await page.locator('.activity-card-code').allTextContents()).map(s=>s.split(' · ')[0]).sort();
  // The catalogue renders a first page and loads further cards on demand.
  const assertVisible=async expected=>{const visible=await codes();if(expected.length<=12)assert.deepEqual(visible,expected);else{assert(visible.length>=12);assert(visible.every(code=>expected.includes(code)));}};
  await assertVisible(draftCodes);assert.equal(await page.locator('label:has(#genre) > span').innerText(),'Tipologia textual');
  const checkUniverses=async entries=>{await page.locator('#reset-filters').click();for(const u of universes){const expected=entries.filter(e=>matchesUniverse(e,u.id)).map(e=>e.code).sort();if(!expected.length){assert.equal(await page.locator(`#universe option[value="${u.id}"]`).count(),0);continue;}await page.locator('#universe').selectOption(u.id,{force:true});await assertVisible(expected);}assert.equal(await page.locator('#universe option[value="independent"]').count(),0);};
  await checkUniverses(drafts);
  const draftForUniverse=drafts.find(entry=>universesForActivity(entry).length),draftUniverse=universesForActivity(draftForUniverse)[0];
  await page.locator('#universe').selectOption(draftUniverse.id, {force:true});await page.locator('#search').fill(draftForUniverse.code);
  assert((await page.locator('.activity-universe').innerText()).includes(draftUniverse.name.ca));await page.locator('.activity-card').click();await page.locator('#workspace').waitFor({state:'visible'});assert((await page.locator('#activity-meta').innerText()).includes(draftUniverse.name.ca));await page.locator('#back-catalog').click();
  await page.locator('#reset-filters').click();
  const saved=await page.evaluate(()=>{const saved=JSON.stringify([{id:'universe-qa',name:'Mostra',readingIds:['el-senyal-de-la-radio','el-paraigua-intercanviat'],layouts:{}}]);localStorage.setItem('sentit.collections.v1',saved);return saved;});
  await toggle.uncheck();await assertVisible(readyCodes);assert.equal(await page.evaluate(key=>localStorage.getItem(key),key),'false');
  await checkUniverses(ready);
  await page.locator('#reset-filters').click();assert.equal(await toggle.isChecked(),false);await assertVisible(readyCodes);
  await page.reload();await page.locator('.activity-card').first().waitFor();assert.equal(await toggle.isChecked(),false);await assertVisible(readyCodes);
  assert.equal(await page.evaluate(()=>localStorage.getItem('sentit.collections.v1')),saved);
  await page.locator('#universe').selectOption('aina-ferran', {force:true});const readyAina=ready.filter(e=>matchesUniverse(e,'aina-ferran')).map(e=>e.code).sort();await assertVisible(readyAina);assert.equal(await page.locator('#catalog-empty').isVisible(),readyAina.length===0);
  const other=await context.newPage();await other.goto(base);await other.locator('.activity-card').first().waitFor();assert.equal(await other.locator('#show-provisional').isChecked(),false);
  await toggle.check();await other.waitForFunction(()=>document.querySelector('#show-provisional').checked);await page.locator('#reset-filters').click();await assertVisible(draftCodes);
  await other.waitForFunction(()=>[...document.querySelectorAll('.activity-card')].every(n=>n.classList.contains('is-review-pending')));
  await page.locator('#language').evaluate(n=>{n.value='es';n.dispatchEvent(new Event('change',{bubbles:true}));});assert.match(await page.locator('#catalog-count').innerText(),new RegExp(ready.length+' comprensiones orales para tu aula'));
  assert.match(await page.locator('#universe').innerText(),/En clase con Mireia/);assert.equal(await toggle.isChecked(),true);
  assert.equal(await page.locator('#universe option[value="independent"]').count(),0);
  assert.equal(await page.locator('#universe option[value="histories-sentit"], #universe option[value="a-peu-de-cami"]').count(),0);
  assert.equal(await page.locator('label:has(#genre) > span').innerText(),'Tipología textual');
  await page.screenshot({path:path.join(out,'desktop.png')});
  for(const width of [900,640,320]){await page.setViewportSize({width,height:800});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);const count=await page.locator('#catalog-count').boundingBox(),brand=await page.locator('.brand').boundingBox(),actions=await page.locator('.top-actions').boundingBox();assert(count.x+count.width<=actions.x||count.y>=actions.y+actions.height);assert(count.y>=brand.y);}
  await page.screenshot({path:path.join(out,'mobile.png')});
  const blocked=await browser.newContext({viewport:{width:1200,height:800},reducedMotion:'reduce'});await blocked.route('**/*',route=>new URL(route.request().url()).origin===new URL(base).origin?route.continue():route.abort());
  await blocked.addInitScript(()=>{Storage.prototype.getItem=()=>{throw Error('Storage blocked');};Storage.prototype.setItem=()=>{throw Error('Storage blocked');};});
  const fallback=await blocked.newPage();fallback.on('pageerror',e=>errors.push(e.message));await fallback.goto(base);await fallback.locator('.activity-card').first().waitFor();assert.equal(await fallback.locator('#show-provisional').isChecked(),false);assert.equal(await fallback.locator('.activity-card').count(),Math.min(12,ready.length));await fallback.locator('#show-provisional').check();assert.equal(await fallback.locator('.activity-card').count(),Math.min(12,drafts.length));
  assert.deepEqual(errors,[]);console.log('PASS · Ten consolidated universes, source-ID compatibility, no unassigned readings or empty universe options, combined filters, unchanged ready count, reload/cross-tab persistence, collections, Catalan/Spanish, 320px and blocked storage. Local only.');
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
