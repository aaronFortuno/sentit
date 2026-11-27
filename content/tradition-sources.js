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
 S143:['Isop, The Crow & the Pitcher, The Aesop for Children, 1919 · Library of Congress','Isop, The Crow and the Pitcher, versió J. H. Stickney, 1915 · Project Gutenberg 49010'],
 S144:['Isop, The Fox & the Stork, The Aesop for Children, 1919 · Library of Congress'],
 S145:['Isop, The Town Mouse & the Country Mouse, The Aesop for Children, 1919 · Library of Congress','Isop, The Town Mouse and the Country Mouse · trad. G. F. Townsend, Project Gutenberg 21'],
 S146:['Isop, The Dog & His Reflection, The Aesop for Children, 1919 · Library of Congress','Isop, The Dog and His Shadow · versió Joseph Jacobs, Project Gutenberg 28'],
 S147:['DIBA, Mapes de Patrimoni Cultural, fitxa 08265-65 · origen de Pescallunes','Recull d’Antoni Prat i Puig · versió local identificada de Ramon Vinyeta, 1979'],
 S148:['Museu d’Història de Catalunya, guia de visita · variant de Lluís el Pietós','Museu d’Història de Catalunya, materials didàctics · variant de Carles el Calb','Ajuntament de Navès, Monument a Guifré el Pelós · variant de Carles el Calb'],
 S149:['Presence Switzerland · tradició de Guillem Tell','Museu Nacional Suís · crònica de Petermann Etterlin, 1507'],
 S150:['DIBA, Mapes de Patrimoni Cultural, fitxa 08901-190 · variant del gegant bo, Observacions'],
 S151:['Apol·lodor, Biblioteca 3.14.1 · trad. J. G. Frazer, 1921, Perseus'],
 S152:['Ovidi, Metamorfosis VI, 1–145 · trad. G. T. Villenave, 1806, UCLouvain'],
 S153:['Hesíode, Els treballs i els dies, 42–105 · Center for Hellenic Studies, Harvard','Hesíode, Works and Days, 42–105 · trad. H. G. Evelyn-White, 1914'],
 S154:['Ovidi, Metamorfosis X, 1–85 · trad. G. T. Villenave, 1806, UCLouvain'],
};
const universes=new Set(['faules-mon','llegendes-mon','mites-antiguitat']);
export function traditionSources(entry){
 if(entry?.language!=='ca'||!entry.universeIds?.some(id=>universes.has(id)))return [];
 return (entry.production?.factualSources??[]).map((source,index)=>({label:labels[entry.code]?.[index]??source.label,url:source.url}));
}
