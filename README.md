# Blind Spot

> Young rebels around the world use simple improvised tools to dismantle ridiculous
> surveillance installations through satisfying 2D physics puzzles.

A 2D physics destruction puzzle for the browser. Drag back, release, watch a tower fall
on a camera. One `index.html`, one vendored physics library, no build step.

**Play:** https://dumb-tony.github.io/BlindSpot/

## Run it locally

Serve over http — `file://` is fine here (there are no fetches) but http is the habit:

```bash
python -m http.server 8361
```

Then open `http://localhost:8361/`.

## What's here

| Path | What |
|---|---|
| `index.html` | The entire game — markup, CSS, and all game code |
| `vendor/matter.min.js` | Matter.js 0.20.0, vendored, never edited |
| `GDD.md` | The Game Design Document — the contract this build is measured against |
| `tools/check.mjs` | Headless assertions: physics, level solvability, content integrity |

## The design in four rules

- **R1** — one verb: drag back and release.
- **R2** — a new player understands a tool after seeing it used once.
- **R3** — depth comes from *where and when* a simple tool is used.
- **R4** — every target and material is identifiable from a still frame.

Full detail in [GDD.md](GDD.md). The guardrail for any new feature: *does this make the
physics puzzle more interesting without making the controls significantly more
complicated?*

## Tests

Two gates, because they answer different questions.

**Static** — syntax, content integrity, every camera in range, GDD and level data
still agreeing. 115 assertions, runs in under a second:

```bash
node tools/check.mjs
```

**In the page** — the things that need a real physics world, where a lie is
invisible to a parser. Open the game and run it in the console:

```js
await BS.all()
```

- `settleTest()` — every level stands still on its own for two seconds: all parts
  intact, all cameras alive, world asleep. This is what catches an impact floor
  set too low, and the failure it prevents (a level that loses itself on load) is
  one nobody would diagnose from the symptom.
- `previewTest()` — the dotted aim arc *is* the flight path. Currently 0.000 px
  of error over 40 samples.
- `solveTest()` — sweeps angles and powers to find the fewest shots that clear
  each level, then re-fires the best candidates with a hand's worth of error and
  keeps the one that still works most often. A par nobody has hit is a guess.
  This is the test that found level 6 unwinnable: 150 scripted shots, zero kills.
- `playtest()` — replays each level with a **calibrated** human aim error and
  reports the clear rate and three-star rate. This is how "beatable but not too
  easy" stops being an opinion. Currently 81% mean clear, 61% mean three-star,
  and a clean per-region ramp: R1 92%, R2 84%, R3 85%, R4 61%. The floor is on
  PER-SHOT reliability, not raw clear rate — a four-shot finale clearing 40% is
  the same standard of play as a one-shot tutorial clearing 80%. Read GDD §8.6 before trusting a number from it — the
  bot cannot re-plan, so every figure is a lower bound.

`BS.headless(n)`, `BS.aim(deg, pull)`, `BS.fire(vx, vy, steps)` and `BS.tick(n)`
drive the simulation directly, which is how you pose a collapse and look at it.

## Status

**Four regions, forty levels, four rebels, four tools.**

- **Region 1 · Porto Vela** — Nico Aldama, The Chunk. Wood, glass, concrete, steel.
- **Region 2 · Kestrel Row** — Sofia Brankov, the Paint Bomb. Armoured housings that
  impact cannot touch, and a tool that wins by blinding rather than breaking.
- **Region 3 · New Meridian** — Tuan Vo, the EMP Jar. A pulse that reaches through solid
  material, and drones that hold station until they stop being powered.
- **Region 4 · Ridgeline** — Marisol Okonjo, the Grapple Winch. The one tool with a second
  verb: it sticks, then it pulls. Guyed masts that will not break but will come down.

Regions open on total stars, per GDD §9.2 — Region 2 at 18, Region 3 at 36, Region 4 at 54.
To open everything immediately, in the console:

```js
BS.LEVELS.forEach(l=>BS.Save.data.stars[l.id]=2); BS.Save.data.unlocked=30; BS.Save.flush(); location.reload()
```

## Credits

Physics by [Matter.js](https://brm.io/matter-js/) (MIT), vendored.
Everything else drawn and synthesised at runtime — no image or audio files.
