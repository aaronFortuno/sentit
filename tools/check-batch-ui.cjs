'use strict';
const assert=require('node:assert/strict'),{fork}=require('node:child_process'),fs=require('node:fs/promises'),path=require('node:path');
const {chromium}=require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const {proposedActivities}=await import('../content/propostes/index.js');
 const base='http://127.0.0.1:4252/';const server=fork(path.join(__dirname,'serve.cjs'),{env:{...process.env,SENTIT_PORT:'4252'},stdio:['ignore','pipe','inherit','ipc']});let browser;
 const output=path.resolve(__dirname,'../../tmp/sentit-qa/batch-v0128');await fs.mkdir(output,{recursive:true});const errors=[],remote=[],missing=[],pages=[];
 try{
  await new Promise(r=>server.stdout.once('data',r));browser=await chromium.launch({channel:'chrome',headless:true});
  const context=await browser.newContext({viewport:{width:1500,height:1000},serviceWorkers:'block'}),page=await context.newPage();
  page.on('pageerror',error=>errors.push(error.message));page.on('response',response=>{if(response.status()===404)missing.push(response.url());});
  await page.route('**/*',route=>{if(new URL(route.request().url()).origin===new URL(base).origin)return route.continue();remote.push(route.request().url());return route.abort();});
  await page.goto(base);await page.locator('.activity-card').first().waitFor();
  assert.match(await page.locator('#catalog-count').innerText(),/25/);assert.equal(await page.locator('.activity-card').count(),12);
  await page.locator('#catalog-more').click();assert.equal(await page.locator('.activity-card').count(),24);
  await page.locator('#catalog-more').click();assert.equal(await page.locator('.activity-card').count(),25);
  assert.equal(await page.locator('.activity-review-overlay').count(),20);
  for(const grade of ['3','4','5','6']){await page.locator('#grade').selectOption(grade);const count=grade==='4'?7:6;assert.equal(await page.locator('.activity-card').count(),count);}
  await page.locator('#reset-filters').click();await page.locator('#genre').selectOption('explanation');assert.equal(await page.locator('.activity-card').count(),4);
  assert.equal(await page.locator('.activity-type svg path').count(),4);
  await page.locator('#reset-filters').click();await page.locator('#search').fill('ca-S024');assert.equal(await page.locator('.activity-card').count(),1);
  await page.locator('#search').fill('');await page.evaluate(()=>Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{}))));await page.screenshot({path:path.join(output,'catalogue.png')});
  for(const entry of proposedActivities){
   await page.goto(base+'#lectura=ca-'+entry.code);await page.locator('#workspace').waitFor({state:'visible'});
   assert.equal(await page.locator('#answers-mode').getAttribute('aria-pressed'),'true');
   assert.equal(await page.locator('#print').isDisabled(),true);assert.equal(await page.locator('#open-player').isHidden(),true);
   assert.equal(await page.locator('.paper-take').count(),1);assert.equal(await page.locator('.paper-local-cut').count(),1);
   assert.equal(await page.locator('.paper-answer-label').count(),entry.questions.length);
   const sections=await page.locator('.paper-section-title').allTextContents();assert.match(sections[0],/Guió/);assert(sections.at(-1).includes('Preguntes'));
   const overflow=await page.locator('.paper-content').evaluateAll(nodes=>nodes.flatMap((node,i)=>[...node.children].filter(child=>child.getBoundingClientRect().bottom>node.getBoundingClientRect().bottom+2).map(()=>i+1)));
   assert.deepEqual(overflow,[],entry.code+' A4 overflow');
   const count=await page.locator('.paper').count();assert.equal(await page.locator('.paper-review-watermark').count(),count);
   await page.evaluate(()=>document.body.classList.remove('reviewing-draft'));
   await page.pdf({path:path.join(output,entry.code+'-solucionari-qa.pdf'),preferCSSPageSize:true,printBackground:true});
   await page.evaluate(()=>document.body.classList.add('reviewing-draft'));
   await page.locator('#worksheet-mode').click();assert.equal(await page.locator('.paper-transcript').count(),0);
   await page.evaluate(()=>document.body.classList.remove('reviewing-draft'));
   await page.pdf({path:path.join(output,entry.code+'-fitxa-qa.pdf'),preferCSSPageSize:true,printBackground:true});
   pages.push({code:entry.code,questions:entry.questions.length,keyPages:count,worksheetPages:await page.locator('.paper').count()});
  }
  await page.goto(base);await page.locator('#meet-characters').click();await page.locator('#characters-dialog [data-character="joana"]').click();
  assert.match(await page.locator('.character-portrait-pending').innerText(),/pendent/);assert.equal(await page.locator('#characters-dialog .character-story').count(),1);
  await page.setViewportSize({width:375,height:800});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);assert.deepEqual(remote,[]);
  await fs.writeFile(path.join(output,'pages.json'),JSON.stringify(pages,null,2));
  console.log('PASS · 25 cards, pagination, grade/type filters, code search, 19 default review scripts, 38 QA PDFs, draft guards, complete answers, A4 bounds, honest portrait placeholders and mobile. No external requests.');
 }finally{await browser?.close();server.kill();}
})().catch(error=>{console.error(error);process.exitCode=1;});
