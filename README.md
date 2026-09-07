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

## Status

Milestone 1 — the vertical slice. Region 1 (Porto Vela), one rebel (Nico), one tool
(The Chunk), ten levels, four materials, stars, save, sound.

Its whole job is to answer one question: **is knocking these surveillance structures
apart fun?**

## Credits

Physics by [Matter.js](https://brm.io/matter-js/) (MIT), vendored.
Everything else drawn and synthesised at runtime — no image or audio files.
