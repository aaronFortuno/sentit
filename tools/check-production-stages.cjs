'use strict';
const assert=require('node:assert/strict'),{fork}=require('node:child_process'),path=require('node:path'),fs=require('node:fs/promises');
const {chromium}=require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const {activities}=await import('../catalogue.js'),{productionStage,pendingProductionStages}=await import('../production-stage.js'),{productionProgress}=await import('../content/production-progress.js'),{needsReview}=await import('../review.js');
 const entry=code=>activities.find(e=>e.code===code),drafts=activities.filter(needsReview),expected=id=>drafts.filter(e=>!id||productionStage(e).id===id).map(e=>e.code).sort();
 assert.equal(productionStage(entry('S003')).id,'published');assert.equal(productionStage(entry('S001')),null,'No retrospective approval for old prototypes');
 const raw=productionProgress['ca-S028'],original=structuredClone(raw);try{raw.state='voices-received';assert.equal(productionStage(entry('S028')).id,'voices');raw.editorialFingerprint='stale';assert.equal(productionStage(entry('S028')).id,'script','Changed script cannot inherit approval');}finally{Object.assign(raw,original);}
 const feedback=productionProgress['ca-S010'].feedback,saved=structuredClone(feedback);try{assert.equal(productionStage(entry('S010')).id,'corrections');feedback.forEach(f=>f.status='applied');assert.equal(productionStage(entry('S010')).id,'montage');}finally{productionProgress['ca-S010'].feedback=saved;}
 const base='http://127.0.0.1:4270/',out=path.resolve(__dirname,'../../tmp/sentit-qa/production-stages');await fs.mkdir(out,{recursive:true});
 const server=fork(path.join(__dirname,'serve.cjs'),{env:{...process.env,SENTIT_PORT:'4270'},stdio:['ignore','pipe','inherit','ipc']});let browser;const errors=[];
 try{
  await new Promise(r=>server.stdout.once('data',r));browser=await chromium.launch({channel:'chrome',headless:true});const context=await browser.newContext({viewport:{width:1500,height:1000}});
  await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(base);await page.locator('.activity-card').first().waitFor();
  const settle=()=>page.evaluate(()=>Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{}))));
  const codes=async()=>{for(let i=0;i<Math.ceil(activities.length/8)+2;i++){await page.locator('.catalog-results-scroll').evaluate(n=>{n.scrollTop=n.scrollHeight;n.dispatchEvent(new Event('scroll'));});await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));}return(await page.locator('.activity-card-code').allTextContents()).map(s=>s.split(' · ')[0]).sort();};
  const phaseButton=id=>page.locator(`#production-phase-options [data-phase="${id}"]`);
  assert(await page.locator('#production-filter').isVisible());assert.equal(await page.locator('.production-phase-chip').count(),6);assert.deepEqual(await codes(),expected(''));
  for(const card of await page.locator('.activity-card').all()){
   const code=(await card.locator('.activity-card-code').innerText()).split(' · ')[0],phase=productionStage(entry(code));assert.equal(await card.getAttribute('data-production-phase'),phase.id);assert.equal(await card.locator('.production-segments i').count(),6);assert.equal(await card.locator('.production-segments .is-filled').count(),phase.number);assert.equal(await card.locator('.production-step-number').innerText(),`${phase.number}/6`);assert.equal(await card.locator('.activity-review-label').count(),1);
  }
  for(const phase of pendingProductionStages){await phaseButton(phase.id).click();assert.deepEqual(await codes(),expected(phase.id));assert.equal(await phaseButton(phase.id).getAttribute('aria-pressed'),'true');assert.equal(await phaseButton(phase.id).evaluate(n=>n===document.activeElement),true);assert.equal(await page.locator('#catalog-empty').isVisible(),expected(phase.id).length===0);}
  await phaseButton('corrections').click();await page.locator('#grade').selectOption('4', {force:true});assert.deepEqual(await codes(),drafts.filter(e=>e.grade==='4'&&productionStage(e).id==='corrections').map(e=>e.code).sort());
  assert.equal(Number(await phaseButton('').locator('.production-chip-count').innerText()),drafts.filter(e=>e.grade==='4').length,'Counts describe other active filters, not only current phase');
  await page.locator('#grade').selectOption('', {force:true});await page.locator('#search').fill('S023');assert.deepEqual(await codes(),['S023']);assert.equal(await phaseButton('corrections').locator('.production-chip-count').innerText(),'1');
  await page.locator('#reset-filters').click();assert.equal(await phaseButton('').getAttribute('aria-pressed'),'true');assert.deepEqual(await codes(),expected(''));
  await settle();await page.screenshot({path:path.join(out,'all-phases.png')});
  await phaseButton('corrections').click();await page.locator('#show-provisional').uncheck();await settle();assert(await page.locator('#production-filter').isHidden());assert.equal(await page.locator('.activity-progress').count(),0);assert.equal((await codes()).length,activities.length-drafts.length);await page.locator('#show-provisional').check();await settle();assert.deepEqual(await codes(),expected('corrections'));
  // A mixed saved collection keeps its membership while phase filters narrow it.
  const fixture=drafts.filter(e=>['S007','S023'].includes(e.code)).map(e=>e.id).concat(entry('S003').id);
  await page.evaluate(readingIds=>{localStorage.setItem('sentit.collections.v1',JSON.stringify([{id:'phases-qa',name:'Fases',readingIds,layouts:{}}]));window.dispatchEvent(new StorageEvent('storage',{key:'sentit.collections.v1'}));},fixture);
  await page.locator('#collection-select').selectOption('phases-qa', {force:true});assert.deepEqual(await codes(),['S007','S023']);await phaseButton('corrections').click();assert.deepEqual(await codes(),['S023']);assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('sentit.collections.v1'))[0].readingIds),fixture);await page.locator('#collection-select').selectOption('', {force:true});
  await page.locator('#theme').click();await page.locator('#language').evaluate(n=>{n.value='es';n.dispatchEvent(new Event('change',{bubbles:true}));});assert.equal(await page.locator('#production-filter-title').innerText(),'Fase de producción');await phaseButton('corrections').click();assert.match(await page.locator('.production-step-label').first().innerText(),/Correcciones de voz/);await settle();await page.screenshot({path:path.join(out,'corrections-dark-es.png')});
  await page.locator('.activity-card').first().click();await page.locator('#workspace').waitFor({state:'visible'});await page.locator('#back-catalog').click();assert.equal(await phaseButton('corrections').getAttribute('aria-pressed'),'true');assert.deepEqual(await codes(),expected('corrections'));
  await phaseButton('').click();
  for(const width of [900,640,375,320]){await page.setViewportSize({width,height:800});await settle();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);assert.equal(await page.locator('#production-filter').evaluate(n=>n.scrollWidth>n.clientWidth),false);const footer=await page.locator('.bottom').boundingBox();assert(footer.y+footer.height<=801);if(width===375)await page.screenshot({path:path.join(out,'mobile.png')});}
  assert.deepEqual(errors,[]);console.log('PASS · Six-stage mapping, optional correction return, stale approval guard, segmented cards, all phase filters/counts, empty stages, combined search/grade, reset, collection preservation, mode switching, focus, dark/Spanish and 320px. No API or remote checks.');
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
