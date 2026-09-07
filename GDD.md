# BLIND SPOT — Game Design Document

**Version 1.0 · 2026-09-06 · Dirty Boy Devs**

> Young rebels around the world use simple improvised tools to dismantle ridiculous
> surveillance installations through satisfying 2D physics puzzles.

---

## 0. How to read this document

This GDD is written against one rule, inherited from the concept brief and printed here
because every later section is subordinate to it:

> **KEEP IT SIMPLE.**
> Look at structure → receive tool → aim → launch → physics happen → evaluate → repeat.

Every section is tagged with its build phase:

| Tag | Meaning |
|---|---|
| **[MVP]** | In the first playable vertical slice. Region 1 only. |
| **[V1]** | The full six-region campaign. Designed here, built later. |
| **[LATER]** | Deliberately deferred. Recorded so it is not re-invented, not so it is built. |

If a section has no tag, it applies to everything.

**§30 is the guardrail** and it outranks any feature described below. When a decision in
this document conflicts with §30, §30 wins and this document is wrong.

---

## 1. HIGH-LEVEL CONCEPT

**Working title:** Blind Spot
**Genre:** 2D physics destruction puzzle
**Platform:** Standalone HTML, desktop browser. One `index.html` plus one vendored
physics library. No build step, no server, no account.
**Session length:** 30–90 seconds per level attempt. Restart is instant and expected.
**Audience:** Anyone who has played Angry Birds. Understandable in under ten seconds
without a word of tutorial text.

### 1.1 Core fantasy

A growing international crew of young rebels travels a colourful fictional world taking
apart increasingly absurd government surveillance installations.

**The rebels are never launched.** This is the single most important departure from the
genre's reference point and it drives the whole progression system. Each rebel
contributes *one improvised tool*. The tool is what flies. The rebel is a face, a
personality, a reason, and a permanent addition to the crew — not ammunition.

That distinction buys three things:

1. **A cast that accumulates instead of rotating.** Nobody is "used up" in a level.
2. **Tools that can be weird.** A person has to survive being fired at a wall; a jar of
   scavenged capacitors does not.
3. **A tone that stays playful.** Nobody is being hurled at concrete.

### 1.2 The feeling we are selling

The moment a carefully aimed shot triggers a chain reaction three steps longer than the
player expected. Everything in this document exists to produce that moment or to get the
player back to trying for it faster.

### 1.3 What this game is NOT

Recorded as hard exclusions, per the brief:

- not a hacking simulator, and the hacker tool must never open a minigame
- not an electrical-grid or network simulator
- not a stealth game
- not a strategy or base-building game
- not an inventory or loadout manager
- not an open sandbox
- not a realistic sabotage or terrorism simulator
- not a game about hurting people

---

## 2. THE ONE-SENTENCE RULES

Four rules that resolve most design arguments without a meeting.

**R1 — The controls rule.** The player has exactly one verb: *drag back and release*.
Any tool that needs a second verb is introduced late, alone, and taught in one level.

**R2 — The tool rule.** A new player understands what a tool does after seeing it used
once. If a tool needs a sentence of explanation, it needs a redesign.

**R3 — The depth rule.** Depth comes from **where and when** a simple tool is used —
never from upgrade trees, firing modes, combos, or resource management.

**R4 — The readability rule.** A player who has never seen the level must be able to
name every material and every target from a still screenshot.

---

## 3. THE WORLD

### 3.1 Setting

An unnamed, cheerful, entirely fictional country somewhere warm, run by a bureaucracy
that has confused *watching* with *governing*. The regime is never depicted as
militarily threatening. It is depicted as **tediously, expensively, ridiculously
nosey** — a state that has spent the schools budget on lenses.

The satire punches at the machinery and the paperwork, never at ordinary people living
under it. Civilians appear in the background as cheerful bystanders and are never
targets, obstacles, or collateral.

### 3.2 The antagonist, such as it is

There is no villain with a face. There is an **institution**, and it is funnier than a
villain.

| Entity | What it is |
|---|---|
| **The Ministry of Appropriate Behaviour** (MAB) | The government department. Issues the signage. |
| **OmniPeek Public Safety Solutions** | The private contractor that actually builds and bills for everything. Every camera has a small OmniPeek sticker. |
| **CitizenVision™** | The consumer-facing brand name of the camera network. |
| **The Public Safety Observation Network** (PSON) | What the whole apparatus is called on paperwork. |

The joke that carries the whole setting: **OmniPeek is paid per installed unit.** This
explains why there are nine cameras watching one bin, why a camera is mounted on top of
another camera, and why destroying the infrastructure is funny rather than grim. The
Ministry is not oppressive so much as *invoiced*.

### 3.3 Propaganda copy

Signage appears on boards, walls, and screens in levels. Rotating pool:

- SMILE. YOUR SAFETY IS BEING RECORDED.
- PRIVACY IS VERY SUSPICIOUS.
- NOTHING TO HIDE? NOTHING TO WORRY ABOUT.
- THIS AREA IS PROTECTED BY LOOKING AT IT.
- REPORT UNUSUAL CALM.
- YOUR COOPERATION HAS BEEN NOTED AND FILED.
- CITIZENVISION™ — BECAUSE SOMEONE SHOULD BE WATCHING.
- UNOBSERVED AREAS ARE BEING ADDRESSED.
- 47 CAMERAS SERVING THIS STREET. TARGET: 60.

Signs are physical objects. They break. Breaking one is not required but is always
allowed, and it always makes a satisfying noise, because a player who tries something
for fun should be rewarded for it.

### 3.4 Tone guardrails

- Playful, not grim. Bright daylight, saturated colour, no rubble-and-ash palette.
- Rebels are cheerful and competent, never desperate.
- Destruction is comic — springs pop out, lenses go cross-eyed, a camera's red light
  dies with a sad little descending tone.
- No blood, no bodies, no weapons that read as weapons. The starter tool is *a rock*.

---

## 4. THE CAST

Each rebel has: a silhouette, a home region, a reason, and exactly one signature tool.

Rebels never enter the play area. They appear on the launch platform, on the level-intro
card, and in their joining sequence.

| # | Rebel | Region | Age | Who they are | Signature tool |
|---|---|---|---|---|---|
| 1 | **Nico Aldama** | Porto Vela | 16 | Skater. Knows which walls are load-bearing because he has fallen off all of them. Joined when a camera fined his neighbour for sitting on a harbour wall. | **The Chunk** — a lump of broken pavement |
| 2 | **Sofia Brankov** | Kestrel Row | 19 | Muralist. Has been painting over cameras by hand for two years and got tired of climbing. | **Paint Bomb** |
| 3 | **Tuan "Ampere" Vo** | New Meridian | 17 | Robotics club, resigned in protest. Builds things out of scooter batteries. | **EMP Jar** |
| 4 | **Marisol Okonjo** | Ridgeline | 22 | Cable-car mechanic. The only one who reads the installation manuals — that is how she knows where the bolts are. | **Grapple Winch** |
| 5 | **Bazyli "Baz" Nowak** | The Concrete Belt | 20 | Demolition apprentice, third generation. Deeply offended by bad structural engineering, which the Ministry produces constantly. | **The Breacher** |
| 6 | **Wren Osei** | The Capital | 18 | Ran a pirate radio show at fourteen. Talks to infrastructure. | **Signal Disruptor** |

### 4.1 Silhouette rule

Each rebel must be identifiable as a black shape at 40 px tall: Nico by the board under
his arm, Sofia by the hair and the can, Tuan by the overloaded backpack, Marisol by the
coil of cable on her shoulder, Baz by the helmet, Wren by the headphones and antenna.

### 4.2 Crew, not roster

Every rebel who joins stays on the launch platform for the rest of the game, idling,
reacting to shots. By Region 6 the platform is crowded. **That crowd is the progression
bar** — the player can see how far they have come without a menu.

---

## 5. THE TOOLS

### 5.1 Design rule (R2, restated as a test)

Show a stranger one use of the tool. If they cannot then predict its second use, cut it.

### 5.2 Roster

| Tool | Rebel | Phase | One sentence | Second verb? |
|---|---|---|---|---|
| **The Chunk** | Nico | **[MVP]** | A heavy rock that flies in an arc and breaks what it hits. | No |
| **Paint Bomb** | Sofia | **[BUILT]** | Bursts into paint. Any lens it can see is finished. | No |
| **EMP Jar** | Tuan | [V1] | Pops once and kills every powered device in a small radius. | No |
| **Grapple Winch** | Marisol | [V1] | Sticks to what it hits, then yanks it toward you. | Yes — one click |
| **The Breacher** | Baz | [V1] | Very heavy, flies flat, punches through walls instead of bouncing off. | No |
| **Signal Disruptor** | Wren | [V1] | Turns one camera against its own network, and it takes its neighbours down with it. | No |

### 5.3 The Chunk — full spec **[MVP]**

The entire vertical slice ships with this tool and nothing else. It must be perfect.

- Mass: heavy (density 2.6, radius 14 px). Reads as stone.
- `frictionAir: 0` — the flight path is a **true parabola**, so the aim preview can be
  computed analytically and is never a lie.
- Restitution 0.25 — it bounces a little. Bouncing is fun and creates second chances.
- Damage on impact, using the shared impulse model in §7.3. No special cases.
- Rolls after landing, and a rolling chunk can still finish a job. This is deliberate:
  it is the source of the game's most-loved accidental wins.

What it teaches, in order, over levels 1–10: aiming · gravity · momentum · material
strength · structural weak points · chain reactions.

### 5.4 The other five — behaviour notes [V1]

**Paint Bomb.** Explodes on first contact into ~12 paint particles that stick to what
they hit. A camera whose **lens** is hit by paint is disabled permanently. Structural
damage ≈ 0. This is the tool that teaches *surveillance does not have to be destroyed to
be defeated* — the game's thesis, delivered as a mechanic.

**EMP Jar.** On impact, one bright ring expands to radius R. Every *powered* target
inside — cameras, drones, scanners, screens — dies at once. Structures ignore it
completely. Teaches *target the group, not the object*. Drones inside the radius lose
power and fall, becoming physics debris, which is where the chain reactions come from.

**Grapple Winch.** Fired like anything else; sticks to the first body it hits. A second
click reels in, applying a force along the cable toward the launcher. Pulls supports out
and topples what impact cannot. **This is the only tool with a second verb**, so it
arrives in Region 4 with a level built solely to teach it.

**The Breacher.** Triple mass, low arc, high momentum, `restitution: 0`. It does not
bounce and it does not stop at the first wall. Reinforced concrete is introduced in the
same region and exists only so the Breacher has something to be the answer to.

**Signal Disruptor.** Hits one camera. That camera goes green, and every camera *sharing
its network link* (an authored, visibly drawn line) goes down with it. The chain is
drawn on screen before the shot, so the puzzle is "which one is the hub?", answered by
looking rather than by memorising. No minigame. No timer. No mode.

### 5.5 Tools explicitly rejected

Recorded so they are not proposed again: remote detonation, guided/steerable
projectiles, mid-flight ability keys, tool crafting, ammo purchase, a tool wheel, any
tool whose effect depends on a previous tool's state.

---

## 6. CORE GAMEPLAY LOOP

```
              ┌────────────────────────────────────┐
              ▼                                    │
   READ the structure                              │
        │                                          │
        ▼                                          │
   DRAG back from the launcher (aim preview shown) │
        │                                          │
        ▼                                          │
   RELEASE — tool flies, camera follows            │
        │                                          │
        ▼                                          │
   PHYSICS. Watch. Do not touch anything.          │
        │                                          │
        ▼                                          │
   WORLD SETTLES → evaluate ──────────────────────┘
        │
        ├── all cameras down ──► LEVEL COMPLETE (stars)
        ├── tools remain ──────► next tool loads
        └── no tools left ─────► LEVEL FAILED (instant restart)
```

The loop must never block on an animation. Every screen in it is skippable with a click.

---

## 7. PHYSICS AND DESTRUCTION

The physics is the product. Everything else is packaging.

### 7.1 Engine choice

**Matter.js 0.20.0, vendored into the repository** (`vendor/matter.min.js`), not loaded
from a CDN.

Rationale, recorded because it is the project's one dependency: no 2D rigid-body solver
with rotation exists anywhere in `C:\Dev` — the tree has axis-aligned arcade physics
(AirportBaggageCrew) and 3D Rapier (MoversFromHell), neither of which tips a tower over.
Writing an impulse solver from scratch would consume the entire first milestone and
produce jittery stacks, and §27 of the brief is explicit that if the core interaction is
not satisfying, the answer is to fix the core interaction rather than build around it.
A proven solver *is* fixing the core interaction. Vendoring rather than CDN-linking
matches the house pattern (Chameleon and MoversFromHell vendor Three.js) and keeps the
game working offline and on a locked-down network.

Settings that matter:

- `engine.enableSleeping = true` — settled stacks stop consuming solver time and stop
  micro-jittering. Sleep is also how "the world has settled" is detected (§7.6).
- `positionIterations: 8`, `velocityIterations: 6` — above default; stacks of six wooden
  blocks are the common case and they must not sag.
- Fixed timestep, 60 Hz, with an accumulator. The clamp on long frames comes from
  `AirportBaggageCrew\src\core\clock.js`.

### 7.2 Materials **[MVP]**

Four materials ship in the slice. The player must learn them without being told.

| Material | Density | HP | Impact floor | Restitution | Friction | Reads as |
|---|---|---|---|---|---|---|
| **Glass** | 0.6 | 14 | 3 | 0.05 | 0.35 | pale cyan, translucent, thin bright edge |
| **Wood** | 1.0 | 45 | 8 | 0.15 | 0.60 | warm ochre, visible grain, dark end-caps |
| **Concrete** | 2.6 | 140 | 22 | 0.05 | 0.80 | grey, chipped corners, speckled |
| **Steel** | 3.2 | 320 | 48 | 0.20 | 0.50 | blue-grey, rivets, bevelled highlight |

The one-line lesson each must teach: **glass = free**, **wood = breakable**,
**concrete = heavy** (useful as a falling weight, not as a thing to break),
**steel = do not bother** (route around it, or drop it on something).

**Reinforced concrete** (HP 900, impact floor 90) arrives in Region 5 with the Breacher
and exists only as that tool's answer. [V1]

### 7.3 The damage model — one formula, no exceptions

On every collision, for each body, compute an approximate impulse:

```
j = |v_rel · n| × (mA × mB) / (mA + mB)
damage = max(0, j − material.impactFloor) × DAMAGE_SCALE
```

Then `hp -= damage`, and at `hp <= 0` the body breaks (§7.4).

**The impact floor is the most important number in the game.** It is what makes a stack
*settle* instead of *dissolve*. Without it, a tower damages itself into rubble the moment
it is built, and every level fails on load. It is also the readability mechanism: below
the floor, an impact makes a noise and leaves a scuff and does nothing, which is exactly
the feedback "you hit steel, that will never work" needs to be.

Additional rules:

- **Nothing is damaged in the first 1.0 s of a level.** Settling is not an attack.
- Debris fragments do not take damage and cannot break further. This caps body count.
- A body's own weight resting on another never exceeds the floor at these densities.
  Verified by test, not by hope: a level that loads must still be intact one second later.

### 7.4 Breaking

When a body breaks:

1. Remove it from the world.
2. Spawn 3–5 **fragments** — smaller convex bodies, inheriting the parent's velocity
   plus a small outward impulse, coloured from the parent's material.
3. Emit a particle burst (dust for concrete, splinters for wood, shards for glass,
   sparks for steel).
4. Fire the material's break cue (§11).
5. Fragments live 6 s, then fade over 1 s and despawn.

Global cap: **120 fragments**. Oldest despawn first. This is a hard performance ceiling
and the finale level is authored against it.

### 7.5 Cameras — the target **[MVP]**

Cameras are the pigs. They must be the single most readable object on screen.

**Anatomy:** a body (rounded box), a lens (large, dark, glassy, with a bright ring), a
red LED, and a bracket connecting it to whatever it is mounted on.

**Behaviour when alive:** the head sweeps slowly left–right, 20° either side, on a
per-camera phase offset so a bank of cameras does not sweep in unison. The LED pulses.
When the player drags to aim, nearby cameras **turn to look at the launcher**. This costs
nothing and gives the objects personality without a line of dialogue.

**State:** each camera has `hp: 10` and an `alive` flag. Camera HP is low on purpose —
the puzzle is *reaching* the camera, never *grinding* it down.

**Disabling.** A camera is disabled by any of:

| Route | Phase | Mechanism |
|---|---|---|
| Direct hit | **[MVP]** | Impulse over the floor exceeds its remaining HP |
| Falling debris | **[MVP]** | Same formula, no special case — debris is just a body |
| Structural collapse | **[MVP]** | Its mount breaks, it becomes a free body, it lands hard |
| Knocked off its mount | **[MVP]** | The mount survives but the bracket constraint breaks |
| Long fall | **[MVP]** | Landing impulse over its HP. Emergent, not scripted. |
| Paint on the lens | [V1] | Occlusion, no damage |
| EMP in radius | [V1] | Power loss |
| Network cascade | [V1] | Signal Disruptor's hub chain |

**Death presentation:** LED goes out, lens cracks and goes cross-eyed, the head droops on
its bracket, a small spark burst, a wire dangles, and a descending three-note "powering
down" sting. The camera body stays in the world as debris. **Seeing the corpse matters** —
it is how a player counts what is left without reading the HUD.

### 7.6 Settling and evaluation

After the last tool is spent, the game must not declare failure while a chain reaction is
still running. The world is **settled** when either:

- every dynamic body is asleep or moving slower than 0.4 px/step, held for 0.6 s, **or**
- 8.0 s have elapsed since the last launch (hard cap, for a body stuck rolling forever).

Evaluation happens only on settle. Win is checked continuously — the *instant* the last
camera dies the level is won, even mid-flight, because making a player wait after they
have obviously succeeded is the fastest way to make a good shot feel bad.

### 7.7 The chain reaction, worked

The canonical target experience, from the brief, spelled out as a physics sequence the
engine actually produces:

> Chunk hits the lower support · support breaks · platform tilts · barrel rolls off ·
> barrel strikes the mast · mast topples · camera falls · camera smashes the glass roof ·
> glass lands on the second camera · **LEVEL COMPLETE**

Level 8 (*The Barrel Run*) and level 10 (*The Eye of Porto Vela*) are authored to make
this class of outcome likely rather than lucky.

---

## 8. LEVEL DESIGN

### 8.1 Anatomy

Side view. Launcher on the left, installation on the right, flat ground with authored
raised platforms. Levels are wider than the viewport; the camera pans.

### 8.2 The three-solution rule

Every level should contain:

- an **obvious** solution — hit the visible thing, works, costs the most shots
- an **efficient** solution — hit the support instead, the intended par
- ideally an **unexpected** one — an emergent physics route we did not author

The ideal player thought is: *"I could hit the camera… but what happens if I hit THAT?"*

**Emergent solutions are a feature.** If a player three-stars a level by a route the
designer never saw, that level is working. Do not patch it out.

### 8.3 Difficulty curve, Region 1 **[MVP]**

Ten levels. Each introduces exactly one idea and then combines it with the last.

| # | Name | Teaches | Par | Tools |
|---|---|---|---|---|
| 1 | **Say Cheese** | Aiming. One camera on a short post. | 1 | 3 |
| 2 | **Timber** | Structural weak points — hit the leg, not the camera. | 1 | 3 |
| 3 | **Double Vision** | Efficiency. Two cameras, one shared structure. | 2 | 4 |
| 4 | **Behind Glass** | Materials. Glass is free; go through it. | 1 | 3 |
| 5 | **Domino Effect** | Chain reactions. A row of pillars. | 1 | 3 |
| 6 | **Hard Hat Area** | Concrete as weight. Drop the lid, don't break it. | 2 | 4 |
| 7 | **Overwatch** | Steel is a wall — take its legs instead. | 2 | 5 |
| 8 | **The Barrel Run** | Rolling objects as ammunition. | 1 | 3 |
| 9 | **Neighbourhood Watch** | Three targets, one budget. | 3 | 6 |
| 10 | **The Eye of Porto Vela** | Finale. Everything at once, four cameras. | 3 | 7 |

**Par and tool count are different dials and must not be confused.** Par sets where the
third star sits; the tool count sets how much a mistake costs. When a level measures as
unforgiving, the fix is almost always more tools — that reduces frustration while leaving
the three-star bar exactly where it was.

**Level 1 must be solvable by a player who drags in roughly the right direction.** It is
not a puzzle, it is a handshake.

### 8.3b Difficulty curve, Region 2 **[BUILT]**

Kestrel Row. Sofia joins; the Paint Bomb arrives; armoured housings make impact
genuinely useless on some targets. The region's whole argument is that *surveillance
does not have to be destroyed to be defeated* — so its levels are about **lines of
sight** and **clustering**, not about force.

| # | Name | Teaches | Par | Supply |
|---|---|---|---|---|
| 1 | **Wet Paint** | Paint breaks nothing and wins anyway. Two exposed lenses, one jar. | 1 | 3 paint |
| 2 | **The Housing** | Armour. Throw a rock at it once, to be sure. | 2 | chunk, 2 paint |
| 3 | **Alley Cluster** | Clustering — three lenses, one alley, one jar. | 1 | paint, chunk, paint |
| 4 | **Line of Sight** | Paint cannot see through glass. Rock first, then paint. | 2 | chunk, 2 paint |
| 5 | **Rooftop Row** | Right tool, right roof. Mixed armoured and plain. | 3 | chunk, paint, chunk, paint |
| 6 | **Up There** | Reach. Two lenses close together, a long way up. | 1 | 2 paint, chunk |
| 7 | **Split Duty** | Budgeting. Two clusters too far apart to share a jar. | 2 | 2 paint, chunk |
| 8 | **Behind the Billboard** | The Ministry's own advertising blocks its own cameras. | 2 | chunk, 2 paint |
| 9 | **Scaffold** | Collapse *and* paint, in one level. | 3 | 6, alternating |
| 10 | **The Billboard** | Finale. Five lenses, two armoured, one enormous screen. | 3 | 8, paint-first |

**⚠ The supply's ORDER sets the floor on the shot count.** Both of this region's
misses in testing were this mistake, not a physics problem: *Up There* asked for par 1
while handing the player a rock to throw first, and *The Billboard* put its two paint
bombs at positions 2 and 4, which made the cheapest possible clear four shots against a
par of three. When a par looks unreachable, count the queue before touching the level.

**Armoured housings** (`hcam`) carry an impact floor above any impulse a thrown rock
can generate at these ranges, so impact does not work on them at all. That is the
mechanic, not a difficulty tax — and it makes a level with an armoured camera and no
paint in its supply *unwinnable by construction*, which `tools/check.mjs` now refuses.

**The supply is an ordered queue, not a pile.** Handing the player a rock first in
*The Housing* is the level design: it teaches that the rock is not enough.

### 8.4 Authoring format

A level is plain data. Adding one is adding an array entry — no code, no editor, no
build step. This is the extensibility requirement (brief §32.9) discharged.

```js
{ id:'r1-02', name:'Timber', par:1, tools:['chunk','chunk','chunk'],
  parts:[
    ['wood',  700, 500, 26, 150],
    ['wood',  700, 350, 26, 150],
    ['wood',  700, 262,120,  22],
    ['cam',   700, 236],
    ['sign',  520, 520, 'PRIVACY IS VERY SUSPICIOUS'],
  ]}
```

Part kinds: `wood` `glass` `concrete` `steel` (`x,y,w,h,angleDeg?`) ·
`barrel` (`x,y,r?`) · `cam` (`x,y,facingDeg?`) · `sign` (`x,y,text`) ·
`plat` (static platform, `x,y,w,h`).

### 8.5 Region plan [V1]

| # | Region | Rebel | Tool | New mechanic | Look |
|---|---|---|---|---|---|
| 1 | **Porto Vela** | Nico | Chunk | — the basics | sun-bleached harbour town, blue sea, terracotta |
| 2 | **Kestrel Row** | Sofia | Paint Bomb | armoured housings; cameras impact can't reach | dense blocks, alleys, murals, rooftop rigs |
| 3 | **New Meridian** | Tuan | EMP Jar | powered clusters, drones, screens | glass towers, mint and white, too many lights |
| 4 | **Ridgeline** | Marisol | Grapple Winch | cables, counterweights, suspended masts | mountain relay station, pine, snow, steel |
| 5 | **The Concrete Belt** | Baz | The Breacher | reinforced concrete, bunkers | checkpoint architecture, brutalism, orange stripes |
| 6 | **The Capital** | Wren | Signal Disruptor | networked cameras, moving targets | marble, gold, absurd civic grandeur |

Each region: 10–14 levels, ending in an oversized **finale installation** — a destruction
puzzle, never a combat boss. Region finales listed in §12.

---

## 8.6 DIFFICULTY, MEASURED

"Easily playable and beatable, but not too easy" is a claim, and a claim needs a number.
`BS.playtest()` replays each level's known-good shot script with a **human-sized error**
on it and reports how often that still wins.

**The band**

| | Meaning | Threshold |
|---|---|---|
| `clear` | a careful player finishes the level | **≥ 40%** (finales sit near this) |
| `threeStar` | …and does it at par | **≤ 92%**, except tutorial levels |

**Calibration matters more than the band.** The aim preview is exact and shows the whole
flight to the ground, so the player's error is mouse precision, not prediction. Measured
landing scatter at ~1000 px of range against a 38 px camera:

| Aim error | Landing scatter |
|---|---|
| 1.0° / 1.5% pull — *careful* | 43 px |
| 2.0° / 3% pull — *casual* | 85 px |
| 3.5° / 6% pull | 156 px |

The bot was first written at 3.5°/6%, which models somebody flicking the mouse without
looking at the arc. Judged against that, almost every level in the game reads as
punishing — and **tuning to it would have made the whole game easier to satisfy an
instrument that aims badly.** Judge on *careful*; use *casual* as a robustness check.

**Measure the instrument, and state its limits.** The bot cannot re-plan. It works
through its target list and retries what it missed, but it never invents a new shot, so
every clear rate is a **lower bound** and the star mix is pessimistic in the same
direction. It is for comparing levels against each other and for catching one far outside
the band — not as an absolute.

**Where the build stands** (30 trials/level, careful player):

| | Value |
|---|---|
| Mean clear rate | **80%** |
| Mean three-star rate | **60%** |
| Casual-player clear rate | 69% |
| Levels below the floor | none |
| Hardest | *The Billboard* (R2 finale) — 50% clear, 8% three-star |
| Easiest | *Wet Paint*, *Up There* — 100% clear |

**⚠ A solver optimises what you ask for, and it will not be what you meant.** Three
separate times the search returned solutions no player could use:

1. It stopped at the **first** shot that cleared the level, which was always the steepest
   angle at nearly full power — the most fragile solution available.
2. Told to prefer low power instead, it found **minimum-power trick shots** that were
   just as precise. *Gentle is not the same as forgiving.*
3. Scored on displacement, it chased a **rolling barrel** across the level and reported
   levels unsolvable with a good route one rock away.

It now scores the whole sweep, then re-fires the top ten candidates with a hand's worth
of error and keeps the one that still works most often. Selecting for the property you
actually want — repeatability — lifted the mean clear rate from 61% to 80% without
changing a single level.

---

## 9. PROGRESSION AND SCORING

### 9.1 Stars **[MVP]**

Deliberately not mathematical. The level states its **PAR** in the HUD before the first
shot, so the three-star goal is never a secret.

| Result | Stars |
|---|---|
| Cleared using **par or fewer** tools | ★★★ |
| Cleared using **par + 1** | ★★ |
| Cleared using **more than par + 1** | ★ |
| Ran out of tools with a camera alive | none — LEVEL FAILED |

No points. No score number. No leaderboard. Nothing to optimise except elegance.

### 9.2 Unlocking **[MVP]**

Levels unlock in sequence: clearing level *N* unlocks *N+1*, at any star count. Stars
gate **regions**, not levels — a player who is stuck is never blocked from continuing,
but a player who rushed will be asked to go back and improve two or three levels before
the next region opens. Region *N+1* requires 60% of region *N*'s available stars.

### 9.3 Macro loop [V1]

```
clear levels → earn stars → finish the region → meet a rebel →
new rebel joins the launch platform → new tool → one teaching level → next region
```

Earlier tools keep appearing. **Each level authors its own tool list** — the player is
never handed all six and asked to choose. That is the inventory-management trap from §1.3,
and per-level curation is how it is avoided permanently.

### 9.4 Persistence **[MVP]**

`localStorage`, one versioned key (`blindspot.save.v1`), holding stars per level id and
the highest unlocked level. Storage is probed in a `try/catch` so a locked-down profile
or a headless harness degrades to no-save rather than throwing — pattern copied from
`SmallTownEmergencyServices\src\core\save.js`.

---

## 10. PRESENTATION

### 10.1 Art direction

**Stencil-and-poster.** Flat colour, heavy confident shapes, bold outlines, screen-print
texture, protest-poster palette. Closer to a silkscreen gig poster than to a cartoon.
Everything is drawn procedurally on a 2D canvas — no image assets, so the whole game
stays one file plus one library.

The world is warm and inviting; the *surveillance equipment* is the only cold thing on
screen. That contrast is the art direction in one sentence, and it doubles as R4:
targets are the only grey-blue objects in a warm frame, so they read instantly.

**Palette**

| Role | Colour |
|---|---|
| Sky | `#ffd98a` → `#ff9a6c` warm gradient |
| Ground | `#2e2a3f` deep plum |
| Wood | `#d98f4a` with `#a5622c` grain |
| Glass | `#8fd8e8` at 45% alpha, bright edge |
| Concrete | `#9a9aa8` speckled |
| Steel | `#5f7186` with rivets |
| **Camera (alive)** | `#3d4a5c` body, `#ff3b52` LED |
| **Camera (dead)** | `#4a4a4a`, LED off |
| Rebel accent | `#ffe14d` |
| Paint (Sofia) | `#ff44a0` |

### 10.2 Readability checklist (R4)

From a still frame the player must identify: every **target**, every **material**, every
**loose object likely to cause a chain reaction**, and the **tools remaining**. Loose
objects get a subtle outline the static structure does not have — that is the whole hint
system, and it needs no words.

### 10.3 Juice

Small, cheap, and load-bearing for feel:

- screen shake on impact, scaled by impulse, capped
- hit-stop: 40 ms freeze on a break over a size threshold
- dust puffs, splinters, glass shards, sparks
- the previous shot's flight path stays on screen as a dotted trail
- camera lenses track the launcher while the player is aiming
- a soft slow-motion pulse on the final camera's death

### 10.4 Camera (viewport)

Follows the projectile in flight with a lead, eases back to the launcher on settle, and
zooms to fit the level's authored bounds. Free scroll by dragging the background, always
available. Never traps the player looking at the wrong thing.

---

## 11. AUDIO

Synthesised at runtime through WebAudio. No audio files — same approach and the same
function names as the rest of the tree (`tone`, `makeNoise`, `CUES`), copied from
`SmallTownEmergencyServices\src\audio\audio.js` per `Dev\INDEX.md`. Fifth adaptation.

**Cues are a data table keyed by event name**, not a switch. A new sound is a new row; an
event with no row is silent rather than fatal.

| Event | Sound |
|---|---|
| `LAUNCH` | elastic creak → release thump |
| `IMPACT_SOFT` | low knock |
| `WOOD_BREAK` | dry cracking snap |
| `GLASS_BREAK` | bright shatter (noise burst + high ring) |
| `CONCRETE_BREAK` | heavy crumble |
| `STEEL_HIT` | clang, no break |
| `CAMERA_DEAD` | three-note descending powerdown + spark fizz |
| `COLLAPSE` | low rumble, scaled by mass |
| `LEVEL_COMPLETE` | rising major triad |
| `LEVEL_FAILED` | two-note descending shrug |
| `STAR_AWARDED` | bright ping per star, ascending |

Music: one bed per region, region-flavoured but original and stylised. **[LATER]** — the
slice ships with SFX only, because SFX is what makes destruction feel good and music is
what makes a menu feel finished.

Mute toggle persists to `localStorage`. Audio never writes to game state; it is the
renderer's twin.

---

## 12. FINALE LEVELS [V1]

One per region. Oversized destruction puzzles, not combat.

| Region | Finale |
|---|---|
| 1 Porto Vela | **The Eye of Porto Vela** — harbour mast, four cameras, mixed materials |
| 2 Kestrel Row | **The Billboard** — a propaganda screen the size of a building |
| 3 New Meridian | **The Hive** — drone docking tower, drones launching mid-level |
| 4 Ridgeline | **The Relay** — a suspended mast held by four cables and a counterweight |
| 5 The Concrete Belt | **Checkpoint 9** — a bunker; the only way in is through |
| 6 The Capital | **The Ministry of Appropriate Behaviour** — every mechanic, one building |

---

## 13. CHARACTER INTRODUCTIONS [V1]

Three to four static comic panels with a hard cut, under eight seconds, skippable on any
click. Never cinematic, never unskippable, never voiced.

Template, Sofia's:

> **1.** A surveillance mast over a quiet street.
> **2.** Sofia walks under it. The camera swivels to follow her.
> **3.** She stops. Looks up. Shakes a can.
> **4.** *(hard cut)* The camera, entirely pink.
>
> **SOFIA HAS JOINED THE RESISTANCE**
> **NEW TOOL: PAINT BOMB**

---

## 14. FAILURE AND RESTART

Failure costs nothing and must feel like nothing.

- Out of tools with a camera alive → **LEVEL FAILED** card, immediately.
- The card offers **Restart** (default, focused) and **Level Select**.
- `R` restarts from anywhere in play, with no confirmation and no card.
- Restart rebuilds the level from its data in under 100 ms. No loading, no fade.

Experimentation is the game. Any friction here is a tax on the core loop.

---

## 15. UI AND SCREENS **[MVP]**

| Screen | Contents |
|---|---|
| **Title** | Logo, PLAY, level-select entry, mute toggle. One screen, no submenus. |
| **Level select** | Grid of Region 1's ten levels: number, name, stars earned, locked state. |
| **In play** | Tools remaining (as icons, top-left) · PAR · cameras remaining · restart · menu. Nothing else. |
| **Complete** | Stars animating in, level name, NEXT (default) · REPLAY · SELECT |
| **Failed** | RESTART (default) · SELECT |

HUD rule: **at most four pieces of information on screen during play.** Anything else
belongs on a card between attempts.

---

## 16. VIOLENCE AND TARGETING

Hard constraint, not a preference.

- Targets are **machines and architecture**. Never people.
- No human casualties exist as a concept. There is no health, no hurt state, no civilian
  hazard.
- Any future security presence is robotic — drones, automated turret-cameras, patrol
  units — and even then it is disabled, never killed.
- The Ministry's staff, where seen, are cheerful clipboard-carrying bureaucrats standing
  well outside the play area, mildly inconvenienced.

---

## 17. TECHNICAL ARCHITECTURE

### 17.1 Shape

```
C:\Dev\BlindSpot\
  index.html          the entire game — markup, CSS, and all game code
  vendor/
    matter.min.js     Matter.js 0.20.0, vendored, never edited
  GDD.md              this document
  README.md
  tools/
    check.mjs         headless smoke + physics assertions (node)
```

**One file for the game, on purpose.** GitHub Pages sends `Cache-Control: max-age=600`,
and a `?cb=` query string busts the *document* but not its statically imported ES modules
— a documented trap in `Dev\INDEX.md` that has burned three projects in this tree. A
single inline document means a cache-busted URL is genuinely the new build. The vendored
library is immutable, so its own caching is a non-issue.

### 17.2 Internal structure

Ordered sections inside `index.html`, so the file stays navigable as it grows:

1. **CONFIG** — every tunable number, in one frozen object
2. **DATA** — materials, tools, rebels, regions, levels (the content layer)
3. **RNG** — `mulberry32` / `Rng`, copied from `AirportBaggageCrew\src\core\rng.js`
4. **AUDIO** — `tone`, `makeNoise`, `CUES`, copied from `SmallTownEmergencyServices`
5. **SAVE** — versioned localStorage with a storage probe
6. **BUILD** — level data → Matter bodies
7. **SIM** — fixed step, damage, breaking, settle detection, win/lose
8. **RENDER** — canvas draw, per material, particles, HUD
9. **INPUT** — drag-to-aim, camera pan
10. **SHELL** — screens and transitions

### 17.3 Determinism

No gameplay system calls `Math.random()`. Fragment shapes, particle jitter, and camera
sweep phases draw from a seeded `Rng` keyed on the level id, so a level looks and breaks
the same way every attempt. Matter.js itself is deterministic given identical input.

### 17.4 Performance budget

60 fps on integrated graphics. Ceilings: **80 rigid bodies** authored per level,
**120 fragments** live, **300 particles** live. Fragments are convex and simple; nothing
is concave. Sleeping is on.

### 17.5 Publishing

Push-is-the-deploy: public repo, `index.html` at root, Pages serving `main` at `/`. No
build step and no second repo. Verified by comparing the git blob hash of the served
bytes against `git rev-parse HEAD:index.html` — never by byte count, since the working
copy is CRLF and Pages serves LF.

---

## 18. WHAT SHIPS IN THE FIRST MILESTONE **[MVP]**

The vertical slice. Its entire job is to answer one question:

> **Is knocking these surveillance structures apart fun?**

**Systems**
- fixed-step 2D rigid-body physics
- drag-to-aim with an honest trajectory preview
- launching, flight, impact
- material damage, breaking, fragments, particles
- cameras with sweep, personality, and death
- settle detection, win/lose evaluation
- star scoring against par
- instant restart
- versioned localStorage save
- synthesised SFX with a mute toggle

**Content**
- Region 1: Porto Vela
- one rebel: Nico
- one tool: The Chunk
- four materials: wood, glass, concrete, steel
- barrels, propaganda signs, platforms
- ten hand-built levels

**Presentation**
- title screen, level select, complete card, failed card
- full procedural art in the stencil-poster style
- screen shake, hit-stop, dust, trails

**Explicitly NOT in the slice:** other rebels, other tools, other regions, drones,
networked cameras, music, a level editor, achievements, mobile support.

### 18.1 Shipped since — Region 2 **[BUILT]**

Kestrel Row, Sofia Brankov and the Paint Bomb (§8.3b), armoured housings, blinding as a
second way to lose a camera, region gating on stars, Sofia's four-panel joining sequence,
and a second region palette. Twenty levels, two tools, two rebels.

---

## 19. RISKS

| Risk | Mitigation |
|---|---|
| Stacks jitter or self-destruct on load | Impact floor (§7.3) + 1 s damage grace + sleeping. Asserted by test: a loaded level is intact at t=1 s. |
| Physics feels floaty | Tune gravity and mass *before* authoring any level. Levels are built against the feel, never the reverse. |
| Levels are unsolvable at par | Every level's par must be demonstrated by a scripted shot in `tools/check.mjs`. A par nobody has hit is a guess. |
| Fragment count tanks the framerate | Hard cap 120, oldest-first despawn, fragments are inert. |
| Destruction is not actually fun | This is the milestone's whole question. If the answer is no, fix the core interaction — do not add a second region. |

---

## 20. THE GUARDRAIL

Before any feature is added, it must pass:

> **Does this make the physics puzzle more interesting without making the controls
> significantly more complicated?**

If no — postpone or reject. Restraint is the design.

---

## 21. LONG TERM [LATER]

Recorded, not planned: six full regions, 60+ levels, achievements, challenge levels,
optional collectibles, a level editor, community levels, full original soundtrack, a
Steam release. **None of it is required for the prototype, and none of it should be
started before §18 is genuinely fun.**

---

*Blind Spot — Dirty Boy Devs. The Ministry of Appropriate Behaviour has been notified of
this document.*
