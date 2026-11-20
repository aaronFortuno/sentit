'use strict';
const assert=require('node:assert/strict'),{fork}=require('node:child_process'),path=require('node:path');
const {chromium}=require('C:/Users/afortun8/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const {activities}=await import('../catalogue.js');
 const all=activities.map(entry=>entry.id),collection={id:'browse-curated',name:'Ordre del docent',readingIds:[...all].reverse(),layouts:{}};
 const server=fork(path.join(__dirname,'serve.cjs'),{env:{...process.env,SENTIT_PORT:'4254'},stdio:['ignore','pipe','inherit','ipc']});let browser;const errors=[],remote=[];
 try{
  await new Promise(r=>server.stdout.once('data',r));browser=await chromium.launch({channel:'chrome',headless:true});
  const ctx=await browser.newContext({viewport:{width:1440,height:850},serviceWorkers:'block'});
  await ctx.addInitScript(collection=>{if(!localStorage.getItem('browse-seeded')){localStorage.setItem('sentit.collections.v1',JSON.stringify([collection]));localStorage.setItem('browse-seeded','1');}},collection);
  const page=await ctx.newPage(),base='http://127.0.0.1:4254/';page.on('pageerror',error=>errors.push(error.message));
  await page.route('**/*',route=>{if(new URL(route.request().url()).origin===new URL(base).origin)return route.continue();remote.push(route.request().url());return route.abort();});
  const ids=()=>page.locator('.activity-card').evaluateAll(cards=>cards.map(card=>card.dataset.id));
  const bottom=()=>page.locator('.catalog-results-scroll').evaluate(node=>{node.scrollTop=node.scrollHeight;node.dispatchEvent(new Event('scroll'));});
  await page.goto(base);await page.locator('.activity-card').first().waitFor();assert.equal((await ids()).length,12);
  assert.equal(await page.locator('#catalog-more').count(),0);
  const first=await ids(),node=await page.locator('.activity-card').first().elementHandle();await node.focus();
  await bottom();await page.waitForFunction(()=>document.querySelectorAll('.activity-card').length===20);
  assert.deepEqual((await ids()).slice(0,12),first);assert.equal(await node.evaluate(el=>el.isConnected&&document.activeElement===el),true);
  await bottom();await page.waitForFunction(()=>document.querySelectorAll('.activity-card').length===25);
  const full=await ids();assert.equal(new Set(full).size,all.length);assert.deepEqual([...full].sort(),[...all].sort());
  await bottom();await page.waitForTimeout(80);assert.equal((await ids()).length,25);
  const source=await page.evaluate(async()=>{const {activities}=await import('./catalogue.js');return activities.map(entry=>entry.id);});assert.deepEqual(source,all,'Display shuffle never mutates catalogue data');
  await page.locator('#grade').selectOption('3');assert.deepEqual(await ids(),full.filter(id=>activities.find(entry=>entry.id===id).grade==='3'));
  await page.locator('#reset-filters').click();assert.deepEqual(await ids(),first);
  await page.locator('#language').evaluate(el=>{el.value='es';el.dispatchEvent(new Event('change',{bubbles:true}));});assert.deepEqual(await ids(),first,'Translation keeps the visit order');
  await page.reload();await page.locator('.activity-card').first().waitFor();assert.notDeepEqual(await ids(),first,'A new visit gets a new discovery order');
  await page.locator('#collection-select').selectOption(collection.id);assert.deepEqual(await ids(),collection.readingIds.slice(0,12));
  await bottom();await page.waitForFunction(()=>document.querySelectorAll('.activity-card').length===20);assert.deepEqual(await ids(),collection.readingIds.slice(0,20));
  await page.reload();await page.locator('.activity-card').first().waitFor();assert.deepEqual(await ids(),collection.readingIds.slice(0,12));
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('sentit.collections.v1')));assert.deepEqual(saved,[collection]);
  // Keyboard scrolling and filling a tall viewport use the same loader.
  await page.locator('.catalog-results-scroll').focus();await page.keyboard.press('End');await page.waitForFunction(()=>document.querySelectorAll('.activity-card').length===20);
  await page.locator('#collection-select').selectOption('');await page.setViewportSize({width:2000,height:4000});
  await page.waitForFunction(()=>document.querySelectorAll('.activity-card').length===25);
  await page.setViewportSize({width:375,height:800});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.deepEqual(errors,[]);assert.deepEqual(remote,[]);
  console.log('PASS · Automatic 12→20→25 loading, no duplicates/button, existing DOM and focus retained, stable random filter subsets, fresh visit order, curated collections unchanged, keyboard, tall viewport and mobile. No remote calls.');
 }finally{await browser?.close();server.kill();}
})().catch(error=>{console.error(error);process.exitCode=1;});
