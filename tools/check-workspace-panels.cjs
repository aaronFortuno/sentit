'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),{fork}=require('node:child_process');
const {chromium}=require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const base='http://127.0.0.1:4266/',output=path.resolve(__dirname,'../../tmp/sentit-qa/workspace-panels');await fs.mkdir(output,{recursive:true});
 const server=fork(path.join(__dirname,'serve.cjs'),{env:{...process.env,SENTIT_PORT:'4266'},stdio:['ignore','pipe','inherit','ipc']});let browser;const errors=[];
 try{
  await new Promise(r=>server.stdout.once('data',r));browser=await chromium.launch({channel:'chrome',headless:true});const context=await browser.newContext({viewport:{width:1500,height:950}});
  await context.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  const settle=()=>page.evaluate(()=>Promise.all(document.getAnimations().map(a=>a.finished.catch(()=>{}))));
  const bounds=async()=>{assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);const footer=await page.locator('.bottom').boundingBox();assert(footer.y+footer.height<=(await page.viewportSize()).height+1);const preview=await page.locator('.preview').boundingBox();assert(preview.height>200);};
  await page.goto(base+'#lectura=ca-S008');await page.locator('#workspace').waitFor({state:'visible'});await settle();
  assert.equal(await page.locator('.audio-sources').evaluate(n=>n.open),false);
  assert.equal(await page.locator('#audio-panel .audio-settings-group').count(),3);
  await page.locator('#guided-mode').uncheck();await settle();assert(await page.locator('#session-fields').isHidden());await page.locator('#guided-mode').check();await settle();
  await page.locator('#session-reading').fill('0');assert(await page.locator('#session-prepare').isDisabled());await page.locator('#session-reading').fill('60');
  await page.locator('#session-listens').selectOption('1');assert(await page.locator('#session-repeat').isDisabled());assert(await page.locator('#session-interval').isDisabled());await page.locator('#session-listens').selectOption('2');
  await settle();await page.screenshot({path:path.join(output,'audio-groups.png')});
  const positions=await page.locator('#audio-panel,.preview,#print-panel').evaluateAll(nodes=>Object.fromEntries(nodes.map(n=>{const r=n.getBoundingClientRect();return [n.id||'preview',{x:r.x,right:r.right,y:r.y,bottom:r.bottom}];})));
  assert(positions['audio-panel'].right<=positions.preview.x);assert(positions.preview.right<=positions['print-panel'].x);assert.equal(positions['audio-panel'].y,positions['print-panel'].y);
  await page.locator('.audio-sources summary').click();await page.locator('#image-panel summary').click();await settle();await page.setViewportSize({width:1366,height:650});await bounds();
  const credits=page.locator('.audio-sources > .details-panel');assert(await credits.evaluate(n=>n.clientHeight<=Math.min(220,innerHeight*.28)+1&&n.scrollHeight>n.clientHeight));
  const audioBefore=await page.locator('#audio-scroll').evaluate(n=>n.scrollTop);await credits.evaluate(n=>n.scrollTop=n.scrollHeight);assert(await credits.evaluate(n=>n.scrollTop>0));assert.equal(await page.locator('#audio-scroll').evaluate(n=>n.scrollTop),audioBefore);await credits.evaluate(n=>n.scrollTop=0);
  const footerBounds=await page.locator('.audio-panel-footer').boundingBox(),audioBounds=await page.locator('#audio-panel').boundingBox();assert(Math.abs(footerBounds.y+footerBounds.height-audioBounds.y-audioBounds.height)<2);
  const printTop=await page.locator('#print-scroll').evaluate(n=>n.scrollTop),paperTop=await page.locator('.paper-stage').evaluate(n=>n.scrollTop);
  await page.locator('#audio-scroll').evaluate(n=>n.scrollTop=n.scrollHeight);assert(await page.locator('#audio-scroll').evaluate(n=>n.scrollTop>0));assert.equal(await page.locator('#print-scroll').evaluate(n=>n.scrollTop),printTop);assert.equal(await page.locator('.paper-stage').evaluate(n=>n.scrollTop),paperTop);
  await page.locator('#print-scroll').evaluate(n=>n.scrollTop=n.scrollHeight);assert(await page.locator('#print-scroll').evaluate(n=>n.scrollTop>0));assert(await page.locator('#print').isVisible());assert(await page.locator('#open-player').isVisible());
  await page.locator('#audio-scroll').evaluate(n=>n.scrollTop=0);await page.locator('#print-scroll').evaluate(n=>n.scrollTop=0);await settle();await page.screenshot({path:path.join(output,'desktop.png')});
  await page.locator('#session-reading').fill('45');await page.locator('#sheet-size').fill('13');await page.locator('#sheet-size').press('Tab');assert.match(new URL(await page.locator('#open-player').getAttribute('href')).searchParams.get('p'),/^45-/);assert.equal(await page.locator('#sheet-size').inputValue(),'13');
  for(const width of [1060,768,375,320]){
   await page.setViewportSize({width,height:800});await bounds();assert.equal(await page.locator('#audio-panel').evaluate(n=>n.inert),true);assert.equal(await page.locator('#print-panel').evaluate(n=>n.inert),true);
   await page.locator('[data-workspace-panel="audio"]').click();await settle();assert.equal(await page.locator('#audio-panel').evaluate(n=>n.inert),false);assert.equal(await page.locator('[data-workspace-panel="audio"]').getAttribute('aria-expanded'),'true');assert(await page.locator('#open-player').isVisible());
   await page.locator('[data-workspace-panel="print"]').click();await settle();assert.equal(await page.locator('#audio-panel').evaluate(n=>n.inert),true);assert.equal(await page.locator('#print-panel').evaluate(n=>n.inert),false);assert(await page.locator('#print').isVisible());await bounds();
   if(width===375)await page.screenshot({path:path.join(output,'mobile-print.png')});
   await page.locator('#print-panel .panel-close').click();await settle();assert.equal(await page.locator('[data-workspace-panel="print"]').evaluate(n=>document.activeElement===n),true);
   await page.locator('[data-workspace-panel="audio"]').click();await page.keyboard.press('Escape');await settle();assert.equal(await page.locator('#audio-panel').evaluate(n=>n.inert),true);
  }
  await page.locator('[data-workspace-panel="audio"]').click();await page.setViewportSize({width:1500,height:950});await settle();assert.equal(await page.locator('#audio-panel').evaluate(n=>n.inert),false);assert.equal(await page.locator('#print-panel').evaluate(n=>n.inert),false);assert.equal(await page.locator('#session-reading').inputValue(),'45');
  await page.locator('#answers-mode').click();await page.locator('#show-evidence').uncheck();await page.pdf({path:path.join(output,'solucionari.pdf'),preferCSSPageSize:true,printBackground:true});
  await page.locator('#language').evaluate(n=>{n.value='es';n.dispatchEvent(new Event('change',{bubbles:true}));});assert.equal(await page.locator('#print-panel-title').innerText(),'Impresión');await page.locator('#theme').click();await settle();await page.screenshot({path:path.join(output,'desktop-dark.png')});
  await page.goto(base+'#lectura=ca-S007');await page.locator('#workspace').waitFor({state:'visible'});assert(await page.locator('#print').isDisabled());assert(await page.locator('#open-player').isHidden());assert(await page.locator('#generation-plan').isVisible());await bounds();assert.deepEqual(errors,[]);
  console.log('PASS · Independent left/right scrolling and fixed actions, print and audio configuration, exclusive animated drawers at 1060/768/375/320px, Escape/focus, resize, footer bounds, dark/Spanish, PDF and draft guards. Local only.');
 }finally{await browser?.close();server.kill();}
})().catch(e=>{console.error(e);process.exitCode=1;});
