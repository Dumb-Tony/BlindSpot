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
const REGION_IDS = ['r1', 'r2', 'r3', 'r4'];
ok(LEVELS.length === 40, 'four regions of ten levels', '(' + LEVELS.length + ')');
for (const r of REGION_IDS)
  ok(LEVELS.filter(L => L.id.startsWith(r)).length === 10, r + ' has ten levels');

const KINDS = new Set(['wood', 'glass', 'concrete', 'steel', 'barrel', 'sign', 'cam', 'hcam', 'drone', 'guy']);
const TOOL_IDS = new Set(['chunk', 'paint', 'emp', 'grapple']);

/* Read the tuning out of the page rather than restating it here. The reachability
   rule below is only as good as its idea of how hard the sling throws, and a
   second copy of that number is a copy that goes stale silently. */
const cfgBlock = html.match(/==== CONFIG:BEGIN ====[\s\S]*?\n([\s\S]*?)\/\* ==== CONFIG:END ====/);
ok(!!cfgBlock, 'CONFIG block found between its markers');
const CONFIG = new Function(cfgBlock[1] + '\nreturn CONFIG;')();
const CAM_H = CONFIG.camH;
const GROUND_Y = CONFIG.groundY, LEVEL_W = CONFIG.levelW, LAUNCH_X = CONFIG.launchX;

/* A level's tools are a count (that many Chunks) or an explicit sequence. */
const supplyOf = L => (typeof L.tools === 'number' ? new Array(L.tools).fill('chunk') : L.tools);

const ids = new Set();
for (const L of LEVELS) {
  const tag = L.id;
  const supply = supplyOf(L), n = supply.length;
  ok(!ids.has(tag), tag + ' · id is unique'); ids.add(tag);
  ok(REGION_IDS.includes(tag.slice(0, 2)), tag + ' · id names a real region');
  ok(typeof L.name === 'string' && L.name.length > 0, tag + ' · has a name');
  ok(supply.every(t => TOOL_IDS.has(t)), tag + ' · every tool in the supply exists');
  ok(L.par >= 1 && L.par <= n, tag + ' · par ' + L.par + ' is inside the tool budget of ' + n);
  ok(n >= L.par + 1, tag + ' · budget leaves room to fail down to one star', '(par ' + L.par + ', ' + n + ' tools)');
  ok(typeof L.teach === 'string' && L.teach.length > 10, tag + ' · says what it teaches');

  const cams = L.parts.filter(p => p[0] === 'cam' || p[0] === 'hcam' || p[0] === 'drone');
  const armoured = L.parts.filter(p => p[0] === 'hcam');
  ok(cams.length >= 1, tag + ' · has at least one camera', '(' + cams.length + ')');
  /* One tool per camera is only the right arithmetic while every tool kills
     exactly one thing. A paint bomb takes a whole cluster, so a level with paint
     in it is ALLOWED to field more cameras than tools — that is the point of the
     tool, and the shot sweep is what proves the level is actually winnable. */
  ok(cams.length <= n || supply.includes('paint') || supply.includes('emp'),
     tag + ' · cameras (' + cams.length + ') vs tools (' + n + ') is winnable arithmetic');

  /* An armoured housing is immune to impact by design, so a level that contains
     one and supplies no paint is unwinnable by construction — the exact class of
     bug that shipped in r1-06 and took a scripted sweep to notice. */
  if (armoured.length)
    ok(supply.includes('paint') || supply.includes('emp') || supply.includes('grapple'),
       tag + ' · has armoured cameras AND a tool that can beat armour',
       '(' + armoured.length + ' armoured)');

  for (const p of L.parts) {
    const k = p[0];
    if (!KINDS.has(k)) { ok(false, tag + ' · unknown part kind "' + k + '"'); continue; }
    /* A guy wire is a PAIR of points — a body point and a ground anchor — so the
       single-position rules below do not describe it. Check it on its own terms. */
    if (k === 'guy') {
      if (!(p[3] > 0 && p[3] < LEVEL_W)) ok(false, tag + ' · guy anchor x=' + p[3] + ' outside the level');
      if (!(p[4] > GROUND_Y - 40 && p[4] <= GROUND_Y + 10)) ok(false, tag + ' · guy anchor y=' + p[4] + ' is not on the ground');
      continue;
    }
    const [x, y] = [p[1], p[2]];
    if (!(x > 0 && x < LEVEL_W)) ok(false, tag + ' · part ' + k + ' x=' + x + ' outside level width');
    if (!(y > -200 && y <= GROUND_Y)) ok(false, tag + ' · part ' + k + ' y=' + y + ' outside level height');
    if ((k === 'cam' || k === 'hcam') && y + CAM_H / 2 > GROUND_Y + 1) ok(false, tag + ' · camera at y=' + y + ' is below ground');
    if (k === 'sign' && typeof p[3] !== 'string') ok(false, tag + ' · sign has no text');
    if ((k === 'wood' || k === 'glass' || k === 'concrete' || k === 'steel') && !(p[3] > 0 && p[4] > 0))
      ok(false, tag + ' · ' + k + ' has no size');
  }

  /* Nothing may be built on top of the launcher, or the first shot is blocked
     by the level's own furniture. */
  const tooClose = L.parts.filter(p => p[0] !== 'sign' && Math.abs(p[1] - LAUNCH_X) < 260);
  ok(tooClose.length === 0, tag + ' · nothing built over the launch platform', tooClose.length ? '(' + tooClose.length + ')' : '');
}

/* Every camera must be reachable, and HEIGHT costs speed that a flat-range rule
   cannot see: a target 300 px up is far more expensive than one the same
   distance away on the ground. The minimum launch speed to pass through a point
   is v² = g·(h + √(d² + h²)) — the classic result — so this compares the speed
   a camera actually demands against the speed the sling can actually produce,
   and leaves 5% of margin so nothing sits exactly on the edge of possible. */
section('C. Reachability');
const G_STEP = CONFIG.gravity * 0.001 * (1000 / 60) ** 2;
const vMax = CONFIG.maxPull * CONFIG.power;
const LAUNCH_Y = CONFIG.launchY;
for (const L of LEVELS) {
  for (const p of L.parts.filter(q => q[0] === 'cam' || q[0] === 'hcam' || q[0] === 'drone')) {
    const d = p[1] - LAUNCH_X, h = LAUNCH_Y - p[2];
    const vNeed = Math.sqrt(G_STEP * (h + Math.hypot(d, h)));
    const frac = vNeed / vMax;
    ok(frac <= 0.95, L.id + ' · camera at ' + p[1] + ',' + p[2] + ' is reachable',
       '(needs ' + (frac * 100).toFixed(0) + '% of full power)');
  }
}

/* ── D · the GDD is the contract, so it must still be here ───────────────── */
section('D. Repo shape');
const gdd = readFileSync(join(ROOT, 'GDD.md'), 'utf8');
ok(/## 18\. WHAT SHIPS IN THE FIRST MILESTONE/.test(gdd), 'GDD still declares the milestone scope');
for (const L of LEVELS) ok(gdd.includes(L.name), 'GDD §8.3 lists "' + L.name + '"');

console.log('\n' + (fail ? 'FAILED' : 'OK') + ' — ' + pass + ' passed, ' + fail + ' failed\n');
process.exit(fail ? 1 : 0);
