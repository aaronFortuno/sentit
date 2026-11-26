// Run after teacher approval and material finalization; never approves or synthesizes.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url)),apply=process.argv.includes('--apply');
if(apply&&process.argv.includes('--check'))throw Error('Choose --apply or --check, not both.');
if(process.argv.some(arg=>arg.startsWith('--')&&!['--apply','--check'].includes(arg)))throw Error('Use --apply to prepare publication, or --check after staging.');
const run=(name,...args)=>execFileSync(process.execPath,[fileURLToPath(new URL('./'+name,import.meta.url)),...args],{cwd:root,windowsHide:true,stdio:'inherit'});
run('public-audio.mjs',apply?'--apply':'--check');
run('check-modular-audio.mjs');
run('check-editorial-review.mjs');
run('check-choice-catalogue.mjs','--complete');
run('check-listening-contexts.mjs');
if(apply)run('update-production-table.mjs');
run('audit-audio-history.mjs');
console.log(apply?'Publication prepared. Stage the intended changes, then run --check before committing. No approval, synthesis, commit, push or history rewrite performed.':'PASS · Publication files and reviews checked; historical cleanup report prepared.');
