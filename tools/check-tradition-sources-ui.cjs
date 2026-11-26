'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),{fork}=require('node:child_process');
const {chromium}=require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const {activities}=await import('../catalogue.js'),{traditionSources}=await import('../content/tradition-sources.js');
 const entries=activities.filter(e=>traditionSources(e).length);assert.equal(entries.length,15);
 for(const e of entries){const sources=traditionSources(e);assert.equal(sources.length,e.production.factualSources.length);assert.deepEqual(sources.map(s=>s.url),e.production.factualSources.map(s=>s.url));assert(sources.every(s=>s.label.length>10&&new URL(s.url).protocol==='https:'));}
 assert.deepEqual(traditionSources(activities.find(e=>e.code==='S070')),[]);
 const base='http://127.0.0.1:4296/',server=fork(path.join(__dirname,'serve.cjs'),{env:{...process.env,SENTIT_PORT:'4296'},stdio:['ignore','pipe','inherit','ipc']});let browser;
 try{
  await new Promise(r=>server.stdout.once('data',r));browser=await chromium.launch({channel:'chrome',headless:true});const context=await browser.newContext({viewport:{width:1500,height:1000}});await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());await context.addInitScript(()=>{localStorage.setItem('sentit.question-format.v1','choice');localStorage.setItem('sentit.catalogue.show-provisional.v1','true');});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const e of entries){
   await page.goto(base+'#lectura=ca-'+e.code);await page.locator('#workspace').waitFor({state:'visible'});
   for(const mode of ['#worksheet-mode','#answers-mode']){
    await page.locator(mode).click();const citation=page.locator('.paper-attribution');assert.equal(await citation.count(),1);assert.match(await citation.innerText(),/Adaptació catalana pròpia de Sentit/);assert.deepEqual(await citation.locator('a').evaluateAll(a=>a.map(n=>n.href)),traditionSources(e).map(s=>s.url));
    const overflow=await page.locator('.paper-content').evaluateAll(nodes=>nodes.some(n=>[...n.children].some(c=>c.getBoundingClientRect().bottom>n.getBoundingClientRect().bottom+2)));assert.equal(overflow,false,e.code+' citation pagination');
   }
   await page.locator('.audio-sources summary').click();const credits=page.locator('#audio-resources .adaptation-sources');assert(await credits.isVisible());assert.deepEqual(await credits.locator('a').evaluateAll(a=>a.map(n=>n.href)),traditionSources(e).map(s=>s.url));
  }
  await page.goto(base+'#lectura=ca-S130');await page.locator('#worksheet-mode').click();await page.screenshot({path:'../tmp/sentit-qa/tradition-source-worksheet.png'});await page.pdf({path:'../tmp/sentit-qa/tradition-source-worksheet.pdf',preferCSSPageSize:true,printBackground:true});
  await page.goto(base+'#lectura=ca-S095');await page.locator('#answers-mode').click();assert(await page.locator('.paper-illustration img').first().isVisible());const text=await page.locator('.paper-transcript').allTextContents();assert(text.join(' ').includes('Empleat'));assert(text.join(' ').includes('Empleada'));await page.screenshot({path:'../tmp/sentit-qa/s095-three-speakers.png'});
  assert.deepEqual(errors,[]);console.log('PASS · 15 cultural activities: cited sources match existing bibliography, print/solution citations and linked web references, no page overflow; S095 three-person illustration and speaker labels. Local only.');
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
