'use strict';
// Unary audio responses are WAV containers. Preserve every returned block;
// joining their PCM never concatenates RIFF headers. Coverage is checked later.
function waveParts(bytes) {
  if(bytes.length<44||bytes.toString('ascii',0,4)!=='RIFF'||bytes.toString('ascii',8,12)!=='WAVE')throw Error('Gemini: format WAV absent.');
  let format;const data=[];
  for(let at=12;at+8<=bytes.length;){const size=bytes.readUInt32LE(at+4),end=at+8+size;if(end>bytes.length)throw Error('Gemini: WAV truncat.');const kind=bytes.toString('ascii',at,at+4);if(kind==='fmt ')format=bytes.subarray(at+8,end);if(kind==='data')data.push(bytes.subarray(at+8,end));at=end+size%2;}
  if(!format||format.length<16||format.readUInt16LE(0)!==1||format.readUInt16LE(14)!==16||!data.length)throw Error('Gemini: cal revisar el format PCM rebut.');
  const pcm=Buffer.concat(data);
  if(pcm.includes(Buffer.from('application/c2pa\0'))&&pcm.includes(Buffer.from('c2pa manifest store\0')))throw Error('Gemini: metadades intercalades al PCM; conservar la resposta i separar-les abans de publicar.');
  return {format,pcm};
}
function collectAudio(result) {
  if(result.status&&result.status!=='completed')throw Error('Gemini: resposta no completada ('+result.status+'). Conservar i revisar abans de repetir.');
  const clips=(result.steps??[]).filter(s=>s.type==='model_output'||!s.type).flatMap(s=>s.content??[]).filter(c=>c.type==='audio'&&typeof c.data==='string');
  if(!clips.length)throw Error('Gemini: resposta sense àudio.');
  const decoded=clips.map(c=>Buffer.from(c.data,'base64')),parts=decoded.map(waveParts);
  if(parts.some(p=>!p.format.equals(parts[0].format)))throw Error('Gemini: formats diferents; blocs conservats per revisar.');
  if(decoded.length===1)return {audio:decoded[0],blocks:1};
  for(let i=1;i<parts.length;i++){const a=parts[i-1].pcm,b=parts[i].pcm,n=Math.min(a.length,b.length);if(a.subarray(0,n).equals(b.subarray(0,n)))throw Error('Gemini: blocs repetits o acumulatius; no unir automàticament.');}
  const pcm=Buffer.concat(parts.map(p=>p.pcm)),format=parts[0].format,pad=format.length%2,out=Buffer.alloc(12+8+format.length+pad+8+pcm.length);
  out.write('RIFF');out.writeUInt32LE(out.length-8,4);out.write('WAVE',8);out.write('fmt ',12);out.writeUInt32LE(format.length,16);format.copy(out,20);const at=20+format.length+pad;out.write('data',at);out.writeUInt32LE(pcm.length,at+4);pcm.copy(out,at+8);
  return {audio:out,blocks:clips.length};
}
module.exports={collectAudio,waveParts};
