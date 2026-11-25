'use strict';

const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs/promises');
const root = path.resolve(__dirname, '..');
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.md': 'text/plain; charset=utf-8',
};
const port = Number(process.env.SENTIT_PORT || 4231);

http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://127.0.0.1');
    const name = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname.slice(1));
    const target = path.resolve(root, name);
    if (!target.startsWith(root + path.sep) || name.split('/').some(part => part.startsWith('.'))) {
      response.writeHead(403).end();
      return;
    }
    const body = await fs.readFile(target);
    const headers = { 'Content-Type': types[path.extname(target)] || 'text/plain; charset=utf-8', 'Accept-Ranges': 'bytes' };
    if (request.headers.range) {
      const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
      if (!range || (!range[1] && !range[2])) { response.writeHead(416, { 'Content-Range': `bytes */${body.length}` }).end(); return; }
      const start = range[1] ? Number(range[1]) : Math.max(0, body.length - Number(range[2]));
      const end = range[1] && range[2] ? Math.min(body.length - 1, Number(range[2])) : body.length - 1;
      if (start >= body.length || start > end) { response.writeHead(416, { 'Content-Range': `bytes */${body.length}` }).end(); return; }
      response.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${body.length}`, 'Content-Length': end - start + 1 }).end(request.method === 'HEAD' ? undefined : body.subarray(start, end + 1)); return;
    }
    response.writeHead(200, { ...headers, 'Content-Length': body.length }).end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404).end();
  }
}).listen(port, '127.0.0.1', () => console.log(`Sentit · http://127.0.0.1:${port}/`));
