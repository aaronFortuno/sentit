import assert from 'node:assert/strict';
import {sanitizeEvent,countBucket,analyticsConfig,sendReport} from '../analytics.js';
assert.equal(analyticsConfig.website,'6acf2cae-4b28-4d71-98dd-550d2d086dcc');
for(const name of ['__proto__','constructor','write_text'])assert.equal(sanitizeEvent(name,{name:'Joana'}),false);
assert.equal(sanitizeEvent('aplica_filtre',{filtre:'__proto__',valor:'Anna'}),false);
assert.equal(sanitizeEvent('aplica_filtre',{filtre:'grade',valor:'3r de la Carla'}),false);
assert.equal(sanitizeEvent('obre_comprensio',{code:'private-lesson'}),false);
assert.equal(sanitizeEvent('colleccio',{accio:'La classe de la Martina'}),false);
const cases=[
  ['obre_comprensio',{code:'S008R',colleccio:true,name:'Joana',url:'/?classe=Joana'}],
  ['maqueta_fitxa',{code:'S008R',bloc:'codi_aula',accio:'ajusta',value:'Joana'}],
  ['colleccio',{accio:'crea',quantitat:'2-5',id:'Joana',name:'Joana'}],
  ['cerca_cataleg',{tipus:'text',resultats:'1',query:'Joana'}],
];
for(const [name,data]of cases){const event=sanitizeEvent(name,data);assert(event);assert(!JSON.stringify(event).includes('Joana'));assert.deepEqual(sanitizeEvent(event.name,event.data),event,'Queued events sanitize idempotently');}
const filter=sanitizeEvent('aplica_filtre',{filtre:'grade',valor:''});assert.deepEqual(sanitizeEvent(filter.name,filter.data),filter);
assert.equal(countBucket(NaN),undefined);assert.equal(countBucket(-1),undefined);assert.equal(countBucket(20),'16+');
console.log('PASS · Known event schema, public codes only, no user text, no classroom or collection names, bounded counts and idempotent queue.');
