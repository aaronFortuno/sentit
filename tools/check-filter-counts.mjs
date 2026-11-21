import assert from 'node:assert/strict';
import { activities } from '../catalogue.js';
import { characters, matchesCharacters } from '../content/characters.js';
import { universes, matchesUniverse } from '../content/universes.js';
import { matchesDuration } from '../activity-meta.js';
import { needsReview } from '../review.js';
import { productionStage } from '../production-stage.js';
import { matchesCatalogFilters, catalogFacetCounts } from '../catalog-filters.js';

const searchIndex = new Map(activities.map(e => [e.id, `${e.language}-${e.code} ${e.title} ${e.summary}`.toLocaleLowerCase().normalize('NFD').replace(/\p{M}/gu, '')]));
const choices = { grade: ['','3','4','5','6'], level: ['','easy','middle','advanced'], duration: ['','short','medium','long'], genre: ['',...new Set(activities.map(e=>e.genre))], universe: ['',...universes.map(u=>u.id),'independent'], 'content-language': ['','ca'], characters: characters.map(c=>c.id) };
let checked = 0;
// Independently substitute each candidate into the full filter state. Counts
// must agree with the list it would produce, even for empty results/collections.
for (const showProvisional of [true,false]) for (const values of [{}, {grade:'4'}, {grade:'4',level:'advanced'}, {duration:'medium',genre:'dialogue'}, {universe:'amb-mireia'}, {grade:'5',level:'easy',universe:'radio-escola'}]) {
  for (const characterMode of ['any','all']) for (const entries of [activities,activities.slice(0,7),[]]) {
    const state={values:{'character-match':characterMode,...values},selectedCharacters:new Set(['laia','biel']),terms:[],searchIndex,showProvisional,phaseFilter:showProvisional?'montage':''};
    for (const [field,options] of Object.entries(choices)) {
      const counts=catalogFacetCounts(entries,state,field,options);
      for (const option of options) {
        const substituted={...state,values:{...state.values},selectedCharacters:new Set(state.selectedCharacters)};
        if(field==='characters')substituted.selectedCharacters=new Set([option]); else substituted.values[field]=option;
        const expected=entries.filter(e=>needsReview(e)===showProvisional
          && (!substituted.values.grade||e.grade===substituted.values.grade)
          && (!substituted.values.level||e.level===substituted.values.level)
          && matchesDuration(e,substituted.values.duration)
          && (!substituted.values.genre||e.genre===substituted.values.genre)
          && matchesUniverse(e,substituted.values.universe)
          && (!substituted.values['content-language']||e.language===substituted.values['content-language'])
          && matchesCharacters(e,substituted.selectedCharacters,characterMode)
          && (!state.phaseFilter||productionStage(e)?.id===state.phaseFilter));
        assert.equal(counts.get(option),expected.length,JSON.stringify({field,option,values,showProvisional}));checked++;
      }
    }
  }
}
const target=activities.find(e=>e.code==='S043');
const searchState={values:{},selectedCharacters:new Set(),terms:['ca-s043'],searchIndex,showProvisional:true,phaseFilter:''};
assert.deepEqual(activities.filter(e=>matchesCatalogFilters(e,searchState)).map(e=>e.id),[target.id]);
assert.equal(catalogFacetCounts(activities,searchState,'grade',['',target.grade]).get(target.grade),1);
assert.equal(catalogFacetCounts(activities,{...searchState,terms:['inexistent-no-results']},'grade',['']).get(''),0);
// Protect the requested case: a difficulty's count uses the selected course,
// while a course's count uses the selected difficulty.
const state={...searchState,terms:[],values:{grade:'4',level:'advanced'}};
assert.equal(catalogFacetCounts(activities,state,'level',['advanced']).get('advanced'),activities.filter(e=>needsReview(e)&&e.grade==='4'&&e.level==='advanced').length);
console.log(`PASS · ${checked} facet counts: dependent filters, any/all characters, review modes, phases, collections, zero results and code search. No network or synthesis.`);
