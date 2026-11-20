'use strict';
const assert=require('node:assert/strict'),{fork}=require('node:child_process'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const base='http://127.0.0.1:4259/',out=path.resolve(__dirname,'../../tmp/sentit-qa/catalogue-controls');await fs.mkdir(out,{recursive:true});
 const server=fork(path.join(__dirname,'serve.cjs'),{env:{...process.env,SENTIT_PORT:'4259'},stdio:['ignore','pipe','inherit','ipc']});let browser;const errors=[];
 try{
  await new Promise(r=>server.stdout.once('data',r));browser=await chromium.launch({channel:'chrome'});
  const context=await browser.newContext({viewport:{width:1440,height:950}});await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(base);await page.locator('.activity-card').first().waitFor();
  const filterCount=await page.locator('#filters select').count();assert.equal(await page.locator('#filters .select-trigger').count(),filterCount);
  const grade=page.locator('#grade + .select-trigger'),genre=page.locator('#genre + .select-trigger');
  assert.match(await grade.getAttribute('aria-label'),/^Curs, /);
  await grade.click();const menu=page.locator('.select-menu:popover-open');await menu.getByRole('option',{name:/^5è/}).click();assert.equal(await page.locator('#grade').inputValue(),'5');assert.equal(await grade.getAttribute('aria-expanded'),'false');
  await grade.focus();await grade.press('Enter');await grade.press('Home');await grade.press('ArrowDown');await grade.press('Enter');assert.equal(await page.locator('#grade').inputValue(),'3');
  await grade.click();await grade.press('Escape');assert.equal(await grade.getAttribute('aria-expanded'),'false');
  await grade.click();await genre.click();assert.equal(await grade.getAttribute('aria-expanded'),'false');assert.equal(await genre.getAttribute('aria-expanded'),'true');
  await page.locator('#search').click();assert.equal(await genre.getAttribute('aria-expanded'),'false');
  await page.locator('#reset-filters').click();assert.equal(await page.locator('#grade').inputValue(),'');assert.match(await grade.innerText(),/Tots/);
  await page.locator('#meet-characters').click();assert.equal(await page.locator('#characters-dialog .character-roster-button').count(),11);
  for(const [id,version] of [['joana',1],['elies',2],['ona',2]]){
   await page.locator(`#characters-dialog [data-character="${id}"]`).click();const img=page.locator('#characters-dialog .character-portrait');
   await img.evaluate(n=>n.decode());assert.match(await img.getAttribute('src'),new RegExp(id+'-portrait-v'+version+'\\.webp$'));assert.equal(await img.evaluate(n=>n.naturalWidth/n.naturalHeight),1);
   assert.equal(await page.locator('.character-portrait-pending').count(),0);await page.evaluate(()=>Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{}))));await page.screenshot({path:path.join(out,id+'.png')});
  }
  await page.locator('#characters-dialog button[type="submit"]').click();await page.goto(base+'#lectura=ca-S025');await page.locator('#workspace').waitFor({state:'visible'});
  await page.locator('#theme').click();await page.waitForFunction(()=>getComputedStyle(document.querySelector('.paper')).backgroundColor==='rgb(255, 243, 227)');await page.screenshot({path:path.join(out,'dark-worksheet.png')});
  await page.emulateMedia({media:'print'});assert.equal(await page.locator('.paper').first().evaluate(n=>getComputedStyle(n).backgroundColor),'rgb(255, 255, 255)');await page.emulateMedia({media:'screen'});
  await page.locator('#back-catalog').click();await page.locator('.activity-card').first().waitFor();await page.setViewportSize({width:375,height:800});
  if(await page.locator('#filter-panel > summary').getAttribute('aria-expanded')==='false')await page.locator('#filter-panel > summary').click();
  await page.locator('#universe + .select-trigger').click();const box=await page.locator('.select-menu:popover-open').boundingBox();assert(box.x>=0&&box.x+box.width<=375&&box.y>=0&&box.y+box.height<=800);await page.evaluate(()=>Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{}))));await page.screenshot({path:path.join(out,'mobile-menu.png')});
  assert.deepEqual(errors,[]);console.log('PASS · Custom catalogue filters, keyboard/click/reset/outside/one-open, eleven character portraits including Joana and v2 Elies/Ona, dark cream preview, white print and mobile bounds. Local only.');
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
