import assert from 'node:assert/strict';
import {sanitizeEvent,countBucket,analyticsConfig,sendReport,universeEvents,arrivalChannel} from '../analytics.js';
assert.equal(analyticsConfig.website,'6acf2cae-4b28-4d71-98dd-550d2d086dcc');
for(const name of ['__proto__','constructor','write_text'])assert.equal(sanitizeEvent(name,{name:'Joana'}),false);
assert.equal(sanitizeEvent('aplica_filtre',{filtre:'__proto__',valor:'Anna'}),false);
assert.equal(sanitizeEvent('aplica_filtre',{filtre:'grade',valor:'3r de la Carla'}),false);
assert.equal(sanitizeEvent('aplica_filtre',{filtre:'universe',valor:'la classe de la Carla'}),false);
assert.deepEqual(sanitizeEvent('aplica_filtre',{filtre:'universe',valor:'aina-ferran'}),{name:'aplica_filtre',data:{filtre:'universe',valor:'aina-ferran'}});
assert.deepEqual(sanitizeEvent('canvia_provisionals',{visible:false,name:'Carla'}),{name:'canvia_provisionals',data:{visible:false}});
assert.deepEqual(sanitizeEvent('aplica_filtre',{filtre:'production-phase',valor:'corrections'}),{name:'aplica_filtre',data:{filtre:'production-phase',valor:'corrections'}});
assert.equal(sanitizeEvent('aplica_filtre',{filtre:'production-phase',valor:'La classe de la Carla'}),false);
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
assert.equal(sanitizeEvent('aplica_filtre',{filtre:'genre',valor:'explanation'}).data.valor,'explanation');
assert.equal(countBucket(NaN),undefined);assert.equal(countBucket(-1),undefined);assert.equal(countBucket(20),'16+');
const opening=sanitizeEvent('obre_comprensio',{code:'S008R',titol:'La classe de la Carla',universos:'privat',estat:'privada'});
assert.equal(opening.data.lectura,'ca-S008R');assert.equal(opening.data.titol,'La foto que faltava · Històries amb sentit');assert.equal(opening.data.estat,'publicada');
assert.deepEqual(new Set(opening.data.universos.split('|')),new Set(['aina-ferran','histories-sentit']));
const linked=universeEvents(opening);assert.equal(linked.length,2);assert.deepEqual(new Set(linked.map(e=>e.data.univers)),new Set(['aina-ferran','histories-sentit']));assert(linked.every(e=>e.data.accio==='obre'&&e.data.nom_univers));
assert.equal(sanitizeEvent('us_univers',{code:'S008R',univers:'faules-mon',accio:'obre'}),false,'A reading cannot report another universe');
assert.equal(sanitizeEvent('obre_comprensio',{lectura:'es-S008R'}),false,'Unknown language/code cannot alias the Catalan reading');
assert.equal(sanitizeEvent('obre_comprensio',{code:'S132'}).data.estat,'provisional');
assert.equal(sanitizeEvent('maqueta_fitxa',{code:'S001',bloc:'context',accio:'ajusta'}).data.bloc,'context');
assert.equal(universeEvents(sanitizeEvent('escolta_audio',{code:'S008R',accio:'previsualitza'})).length,0,'Teacher previews are not pupil listening starts');
assert(universeEvents(sanitizeEvent('escolta_audio',{code:'S008R',accio:'reinicia'})).every(e=>e.data.accio==='inicia_escolta'),'A restarted session is another start, not an unmatched completion');
assert(linked.every(e=>JSON.stringify(sanitizeEvent(e.name,e.data))===JSON.stringify(e)));
assert.equal(arrivalChannel('https://sentit.ortogra.fi/?via=nus&classe=Carla'),'nus');
assert.equal(arrivalChannel('https://sentit.ortogra.fi/?via=vivecoding'),'vivecoding');
assert.equal(arrivalChannel('https://sentit.ortogra.fi/?via=Carla'),'directe');
assert.equal(arrivalChannel('https://sentit.ortogra.fi/','https://ortogra.fi/?privat=Carla'),'ortografi');
assert.equal(arrivalChannel('https://sentit.ortogra.fi/','https://classroom.test/Carla'),'altres');
console.log('PASS · Known event schema, public codes only, no user text, no classroom or collection names, bounded counts and idempotent queue.');
