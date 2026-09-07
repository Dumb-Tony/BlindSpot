/* Local dev server. `node tools/serve.mjs`
 *
 * Port-scans 8361–8370 so Blind Spot can run alongside the other games in the
 * tree (Chameleon 8321–8330, Something's Different 8341–8350 — see Dev\INDEX.md).
 * No cache headers, because the whole point of a dev server is that a reload
 * shows what is on disk.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LO = 8361, HI = 8370;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
};

const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    /* normalize() collapses ".." before it can climb out of ROOT. */
    const file = join(ROOT, normalize(p).replace(/^([/\\])+/, ''));
    if (!file.startsWith(ROOT)) { res.writeHead(403).end('no'); return; }
    await stat(file);
    const body = await readFile(file);
    res.writeHead(200, {
      'Content-Type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('404');
  }
});

function listen(port) {
  server.once('error', e => {
    if (e.code === 'EADDRINUSE' && port < HI) return listen(port + 1);
    console.error(e.message); process.exit(1);
  });
  server.listen(port, '127.0.0.1', () => console.log('Blind Spot → http://localhost:' + port + '/'));
}
listen(LO);
