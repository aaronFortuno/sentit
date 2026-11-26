// Compact bibliography for print and the web. The full adaptation notes and
// consulted URLs remain in each activity's existing factualSources register.
const labels={
 S128:['Isop, The Lion and the Mouse, versió de G. F. Townsend · Project Gutenberg, llibre 21','La Fontaine, Le Lion et le Rat, Fables II, 11 · edició Barbin/Thierry'],
 S129:['Generalitat de Catalunya, Barcelona, ciutat de dracs · orígens de la tradició','MNAC, Sant Jordi, dia de llibres, roses i dracs'],
 S130:['Apol·lodor, Biblioteca, Epítom 1.7–1.9 · trad. J. G. Frazer, 1921'],
 S131:['Isop, The Fox & the Crow, The Aesop for Children, 1919 · Library of Congress'],
 S132:['Isop, The Hare & the Tortoise, The Aesop for Children, 1919 · Library of Congress'],
 S133:['Isop, The North Wind & the Sun, The Aesop for Children, 1919 · Library of Congress'],
 S134:['Isop, The Shepherd Boy & the Wolf, The Aesop for Children, 1919 · Library of Congress'],
 S135:['DIBA, El Pont del Diable de Martorell i el menhir de Palausolità','Biblioteca de Martorell, Informació local · variant atribuïda a Joan Amades, 1932'],
 S136:['Ajuntament de Banyoles, Itinerari llegendari · El Drac de Banyoles','Diputació de Girona, L’estany de Banyoles, p. 61 · Lluís G. Constans'],
 S137:['Ajuntament del Bruc, Festa El Timbaler','DIBA, Llegenda del Timbaler del Bruc'],
 S138:['Eliza Gutch, The Pied Piper of Hamelin, Folk-Lore 3, 1892 · relat dels germans Grimm','Ajuntament d’Hameln, Brothers Grimm, German Legends'],
 S139:['Ovidi, Metamorfosis XI, 85–145 · trad. Brookes More, 1922'],
 S140:['Ovidi, Metamorfosis VIII, 183–235 · trad. Brookes More, 1922'],
 S141:['Himne homèric a Demèter, 1–89 i 305–473 · trad. H. G. Evelyn-White, 1914'],
 S142:['Himne homèric a Hermes, 17–61, 68–94, 138–153, 182–396 i 414–502 · trad. H. G. Evelyn-White, 1914'],
};
const universes=new Set(['faules-mon','llegendes-mon','mites-antiguitat']);
export function traditionSources(entry){
 if(entry?.language!=='ca'||!entry.universeIds?.some(id=>universes.has(id)))return [];
 return (entry.production?.factualSources??[]).map((source,index)=>({label:labels[entry.code]?.[index]??source.label,url:source.url}));
}
