/* Blind Spot — static checks. `node tools/check.mjs`
 *
 * This is the fast gate, not the whole gate. It answers the questions that can
 * be answered without a browser: does the game's script parse, and is the level
 * content internally consistent? The questions that need a real physics world —
 * does a level stand up on its own, is the aim preview honest, is every par
 * actually reachable — live in `window.BS.all()` inside the page, because they
 * need Matter.js to answer them and a lie there is invisible to a parser.
 *
 * Exit code 1 on any failure, so it works as a pre-push hook.
 */

import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(ROOT, 'index.html'), 'utf8');

let pass = 0, fail = 0;
const ok = (cond, msg, detail = '') => {
  if (cond) { pass++; console.log('  PASS  ' + msg + (detail ? '  ' + detail : '')); }
  else { fail++; console.log('  FAIL  ' + msg + (detail ? '  ' + detail : '')); }
};
const section = t => console.log('\n' + t);

/* ── A · the script parses ───────────────────────────────────────────────── */
section('A. Syntax');

const inline = [...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
ok(inline.length === 1, 'exactly one inline script block', '(' + inline.length + ')');

const src = inline.join('\n');
const dir = mkdtempSync(join(tmpdir(), 'blindspot-'));
const tmp = join(dir, 'game.js');
writeFileSync(tmp, src, 'utf8');
try {
  execFileSync(process.execPath, ['--check', tmp], { stdio: 'pipe' });
  ok(true, 'node --check on the inline script', '(' + src.split('\n').length + ' lines)');
} catch (e) {
  /* An empty Buffer is truthy and stringifies to nothing, so `e.stderr || e.message`
     reports a syntax error with no syntax error in it. A gate that hides its own
     reason is worse than no gate. */
  const why = [e.stderr, e.stdout].map(b => (b && b.length) ? b.toString() : '').join('').trim();
  ok(false, 'node --check on the inline script', '\n' + (why || e.message));
}

/* The vendored library must be present and must be the version the GDD names. */
const vendor = readFileSync(join(ROOT, 'vendor', 'matter.min.js'), 'utf8');
ok(/matter-js 0\.20\.0/.test(vendor), 'vendored Matter.js is 0.20.0');
ok(/<script src="vendor\/matter\.min\.js">/.test(html), 'index.html loads the vendored copy, not a CDN');
ok(!/https?:\/\/(?!brm\.io|github|dumb-tony)/.test(html.replace(/<!--[\s\S]*?-->/g, '')),
   'no external runtime requests in the page');

/* ── B · content integrity ───────────────────────────────────────────────── */
section('B. Level content');

const block = html.match(/==== LEVELS:BEGIN ====[\s\S]*?\n([\s\S]*?)\/\* ==== LEVELS:END ====/);
ok(!!block, 'LEVELS block found between its markers');
const LEVELS = new Function(block[1] + '\nreturn LEVELS;')();
ok(LEVELS.length === 10, 'region 1 has ten levels', '(' + LEVELS.length + ')');

const KINDS = new Set(['wood', 'glass', 'concrete', 'steel', 'barrel', 'sign', 'cam']);
const CAM_H = 26;
const GROUND_Y = 720, LEVEL_W = 1620, LAUNCH_X = 170;

const ids = new Set();
for (const L of LEVELS) {
  const tag = L.id;
  ok(!ids.has(tag), tag + ' · id is unique'); ids.add(tag);
  ok(typeof L.name === 'string' && L.name.length > 0, tag + ' · has a name');
  ok(L.par >= 1 && L.par <= L.tools, tag + ' · par ' + L.par + ' is inside the tool budget of ' + L.tools);
  ok(L.tools >= L.par + 1, tag + ' · budget leaves room to fail down to one star', '(par ' + L.par + ', ' + L.tools + ' tools)');
  ok(typeof L.teach === 'string' && L.teach.length > 10, tag + ' · says what it teaches');

  const cams = L.parts.filter(p => p[0] === 'cam');
  ok(cams.length >= 1, tag + ' · has at least one camera', '(' + cams.length + ')');
  ok(cams.length <= L.tools, tag + ' · cameras (' + cams.length + ') do not outnumber tools (' + L.tools + ')');

  for (const p of L.parts) {
    const k = p[0];
    if (!KINDS.has(k)) { ok(false, tag + ' · unknown part kind "' + k + '"'); continue; }
    const [x, y] = [p[1], p[2]];
    if (!(x > 0 && x < LEVEL_W)) ok(false, tag + ' · part ' + k + ' x=' + x + ' outside level width');
    if (!(y > -200 && y <= GROUND_Y)) ok(false, tag + ' · part ' + k + ' y=' + y + ' outside level height');
    if (k === 'cam' && y + CAM_H / 2 > GROUND_Y + 1) ok(false, tag + ' · camera at y=' + y + ' is below ground');
    if (k === 'sign' && typeof p[3] !== 'string') ok(false, tag + ' · sign has no text');
    if ((k === 'wood' || k === 'glass' || k === 'concrete' || k === 'steel') && !(p[3] > 0 && p[4] > 0))
      ok(false, tag + ' · ' + k + ' has no size');
  }

  /* Nothing may be built on top of the launcher, or the first shot is blocked
     by the level's own furniture. */
  const tooClose = L.parts.filter(p => p[0] !== 'sign' && Math.abs(p[1] - LAUNCH_X) < 260);
  ok(tooClose.length === 0, tag + ' · nothing built over the launch platform', tooClose.length ? '(' + tooClose.length + ')' : '');
}

/* Every camera must be reachable: a rock leaving the sling at max power travels
   this far on a 45° arc, so a target beyond it is unhittable by construction. */
section('C. Reachability');
const G_STEP = 1.0 * 0.001 * (1000 / 60) ** 2;
const vMax = 132 * 0.155;
const range = (vMax * vMax) / G_STEP;           // flat-ground range at 45°
for (const L of LEVELS) {
  for (const p of L.parts.filter(q => q[0] === 'cam')) {
    ok(p[1] - LAUNCH_X < range * 0.85, L.id + ' · camera at x=' + p[1] + ' is inside comfortable range',
       '(' + Math.round(p[1] - LAUNCH_X) + ' of ' + Math.round(range * 0.85) + ' px)');
  }
}

/* ── D · the GDD is the contract, so it must still be here ───────────────── */
section('D. Repo shape');
const gdd = readFileSync(join(ROOT, 'GDD.md'), 'utf8');
ok(/## 18\. WHAT SHIPS IN THE FIRST MILESTONE/.test(gdd), 'GDD still declares the milestone scope');
for (const L of LEVELS) ok(gdd.includes(L.name), 'GDD §8.3 lists "' + L.name + '"');

console.log('\n' + (fail ? 'FAILED' : 'OK') + ' — ' + pass + ' passed, ' + fail + ' failed\n');
process.exit(fail ? 1 : 0);
