'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),{fork}=require('node:child_process');
const{chromium}=require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const {activities}=await import('../catalogue.js'),{transcriptPosition}=await import('../worksheet.js');
 assert.equal(transcriptPosition(activities.find(e=>e.code==='S003')),'bottom');assert.equal(transcriptPosition(activities.find(e=>e.code==='S135')),'top');assert.equal(transcriptPosition(activities.find(e=>e.code==='S003'),{transcriptPosition:'invalid'}),'bottom');
 const root=process.cwd(),base='http://127.0.0.1:4294/',out=path.resolve(root,'../tmp/sentit-qa/transcript-position');await fs.mkdir(out,{recursive:true});
 const server=fork(path.join(root,'tools/serve.cjs'),{env:{...process.env,SENTIT_PORT:'4294'},stdio:['ignore','pipe','inherit','ipc']});let browser;
 try{
  await new Promise(r=>server.stdout.once('data',r));browser=await chromium.launch({channel:'chrome',headless:true});const context=await browser.newContext({viewport:{width:1500,height:1150}});
  await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());await context.addInitScript(()=>localStorage.setItem('sentit.question-format.v1','choice'));
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  const ordered=()=>page.locator('#paper').evaluate(root=>{const nodes=[...root.querySelectorAll('.paper-content > *')];return{transcript:nodes.findIndex(n=>n.classList.contains('paper-transcript-block')),questions:nodes.findIndex(n=>n.dataset.completeQuestion!==undefined)};});
  const checkPages=async()=>{
   const pages=await page.locator('.paper').evaluateAll(pages=>pages.map(page=>{const content=page.querySelector('.paper-content'),footer=page.querySelector('.paper-footer'),license=footer.querySelector('.paper-license'),a=footer.getBoundingClientRect(),b=license.getBoundingClientRect();return{text:license.textContent,href:license.href,center:Math.abs((a.left+a.right-b.left-b.right)/2),within:b.left>=a.left&&b.right<=a.right,overflow:[...content.children].some(c=>c.getBoundingClientRect().bottom>content.getBoundingClientRect().bottom+2),page:footer.lastElementChild.textContent};}));
   assert(pages.length);for(const [i,p]of pages.entries()){assert.equal(p.text,'CC BY 4.0');assert.equal(p.href,'https://creativecommons.org/licenses/by/4.0/');assert(p.center<1&&p.within);assert(!p.overflow,'No printable content overflow');assert(p.page.includes((i+1)+' / '+pages.length));}
  };
  for(const code of ['S003','S067','S132']){
   await page.goto(base+'#lectura=ca-'+code);await page.locator('#workspace').waitFor({state:'visible'});await page.locator('#answers-mode').click();await page.evaluate(()=>document.fonts.ready);
   const entry=activities.find(e=>e.code===code),initial=code==='S132'?'top':'bottom';assert.equal(await page.locator('#transcript-position').inputValue(),initial);
   for(const position of ['top','bottom']){
    await page.locator('#transcript-position').selectOption(position,{force:true});const order=await ordered();assert(order.transcript>=0&&order.questions>=0);assert.equal(order.transcript<order.questions,position==='top');
    assert((await page.locator('.paper-choice').count())>0,'The printed solution uses the selected ABCD format');
    const spoken=await page.locator('.paper-transcript').evaluateAll(nodes=>nodes.map(n=>{const clone=n.cloneNode(true);clone.querySelectorAll('.paper-evidence-number').forEach(n=>n.remove());return clone.textContent;}).join(' ').replace(/\s+/g,' '));
    for(const part of entry.transcript.filter(p=>p.speaker))assert(spoken.includes(part.text.replace(/\s+/g,' ')),code+' preserves all speech');
    assert(await page.locator('.paper-evidence-cue').evaluateAll(links=>links.every(link=>document.getElementById(link.dataset.evidenceTarget))));await checkPages();
   }
  }
  await page.goto(base+'#lectura=ca-S003');await page.locator('#answers-mode').click();
  await page.locator('[data-response-mode="open"]').click();assert.equal(await page.locator('.paper-choice').count(),0);await page.locator('[data-response-mode="choice"]').click();assert((await page.locator('.paper-choice').count())>0);
  // Use the real custom menu for the user-visible choice.
  const field=page.locator('label:has(#transcript-position)');await field.getByRole('combobox').click();await page.getByRole('option',{name:'Abans de les preguntes',exact:true}).click();assert((await ordered()).transcript<(await ordered()).questions);
  await page.locator('#show-evidence').uncheck();assert.equal(await page.locator('.paper-evidence').count(),0);await page.reload();await page.locator('#answers-mode').click();assert.equal(await page.locator('#transcript-position').inputValue(),'top');assert.equal(await page.locator('#show-evidence').isChecked(),false);await page.locator('#show-evidence').check();
  const entry=activities.find(e=>e.code==='S003');await page.evaluate(id=>localStorage.setItem('sentit.collections.v1',JSON.stringify([{id:'position-qa',name:'Ordre QA',readingIds:[id],layouts:{[id]:{settings:{transcriptPosition:'bottom',showEvidence:false}}}}])),entry.id);
  await page.goto(base+'#lectura=ca-S003&col=position-qa');await page.locator('#answers-mode').click();assert.equal(await page.locator('#transcript-position').inputValue(),'bottom');await page.locator('#transcript-position').selectOption('top',{force:true});await page.reload();await page.locator('#answers-mode').click();assert.equal(await page.locator('#transcript-position').inputValue(),'top');await page.locator('#transcript-position').selectOption('bottom',{force:true});
  await page.goto(base+'#lectura=ca-S003');await page.locator('#answers-mode').click();assert.equal(await page.locator('#transcript-position').inputValue(),'top','Standalone setting is independent of its collection');
  await page.locator('.paper-stage').evaluate(n=>n.scrollTop=0);await page.screenshot({path:path.join(out,'solution-transcript-first.png')});await page.pdf({path:path.join(out,'solution-transcript-first.pdf'),preferCSSPageSize:true,printBackground:true});
  await page.emulateMedia({media:'print'});await page.screenshot({path:path.join(out,'printed-solution.png'),fullPage:true});await page.emulateMedia({media:'screen'});
  await page.locator('#worksheet-mode').click();assert.equal(await page.locator('#answer-key-panel').isVisible(),false);assert.equal(await page.locator('.paper-transcript-block').count(),0);assert.equal(await page.locator('.paper-qr').count(),1);await checkPages();
  assert.deepEqual(errors,[]);console.log('PASS · Transcript top/bottom on published and draft solutions, real custom menu, complete speech/evidence and pagination, independent per-reading/collection persistence; centered CC BY 4.0 on every printed page; pupil worksheet and QR preserved. Local only.');
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
