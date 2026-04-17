# 11. MVP Plan & File Structure

> **Status:** Phases **0–6 are implemented** in this repository under `src/modules/expeditions/`. Treat this file as a **historical plan and file map**; operational truth for scope, API, and integration is [`docs/module/expeditions/00-index.md`](../../module/expeditions/00-index.md) and [`09-as-built.md`](../../module/expeditions/09-as-built.md).

## 11.1 Phases overview

The plan has **7 phases** across two tracks:

- **Track A — Content & Design:** lore, writing, data catalog polish
- **Track B — Code:** types, stores, logic, UI

Phases 0-1 are content/design. Phases 2-6 are code. Track A work can continue in parallel with Track B.

| Phase | Days | Track | Focus |
|-------|------|-------|-------|
| 0 | Day 0 | A | Location lore, encounter narratives, quest giver backstories |
| 1 | Day 1 | A+B | Data catalogs & TypeScript types |
| 2 | Day 2-3 | B | Store & logic (expedition store, generators, resolvers) |
| 3 | Day 4-5 | B | UI — Guild in sidebar, quest board, quest cards |
| 4 | Day 6-7 | B | UI — Active expedition, events, dispatch, results |
| 5 | Day 8-9 | B | UI — Encyclopedia, Intendant placeholder, dev mode, Guild channel |
| 6 | Day 10 | B | Polish, edge cases, testing |

---

## 11.2 Phase 0: Content & Lore (Day 0)

This phase produces **narrative content** that feeds into data catalogs. It happens before any code is written.

| # | Task | Output |
|---|------|--------|
| 0.1 | Review & finalize location lore (10 entries) | `appendix-a-locations.md` (done ✅) |
| 0.2 | Write encounter narrative templates (13+) | `06-random-events.md` expanded with template texts |
| 0.3 | Write quest giver backstories (5-6) | New: `appendix-d-quest-givers.md` |
| 0.4 | Define quest template narrative strings (5) | `04-mechanics.md` expanded with filled templates |
| 0.5 | Write enemy flavor text (9) | `appendix-b-enemies.md` expanded with descriptions |

### What "lore completion" means

Each data entry gets:

- **Flavor text** — 2-3 sentences of in-world description (for Encyclopedia tab and quest cards)
- **Narrative context** — why this thing exists in the world, ties to Arkedon history
- **Quest hooks** — 3-4 example quests referencing this location/enemy/NPC (for template generation)

### Status

- ✅ Location lore: 10 entries with full lore, quest hooks, and narrative context (appendix-a)
- ⬜ Encounter narratives: template texts with `{{placeholder}}` substitution
- ⬜ Quest giver backstories: 5-6 NPCs with roles, preferred biomes, dialogue snippets
- ⬜ Quest template narratives: filled examples for each of the 5 template types
- ⬜ Enemy flavor text: short descriptions and combat vignettes

---

## 11.3 Phase 1: Data & Types (Day 1)

| # | Task | File |
|---|------|------|
| 1.1 | Define all TypeScript types | `src/modules/expeditions/types.ts` |
| 1.2 | Location catalog (10 entries + lore) | `src/modules/expeditions/data/locations.ts` |
| 1.3 | Element catalog (13 entries) | `src/modules/expeditions/data/elements.ts` |
| 1.4 | Enemy catalog (9 entries + flavor) | `src/modules/expeditions/data/enemies.ts` |
| 1.5 | Quest giver catalog (5-6 + backstories) | `src/modules/expeditions/data/questGivers.ts` |
| 1.6 | Stub resource catalog (~15) | `src/modules/expeditions/data/stubResources.ts` |
| 1.7 | Quest template catalog (5 + narratives) | `src/modules/expeditions/data/questTemplates.ts` |
| 1.8 | Encounter catalog (13+ + templates) | `src/modules/expeditions/data/encounters.ts` |
| 1.9 | Biome adjacency map | `src/modules/expeditions/data/biomes.ts` (`adjacent` on each biome — no separate `biomeAdjacency.ts`) |
| 1.10 | Module constants | `src/modules/expeditions/constants.ts` |
| 1.11 | Module entry point (public API) | `src/modules/expeditions/index.ts` |

---

## 11.4 Phase 2: Store & Logic (Day 2-3)

| # | Task | File |
|---|------|------|
| 2.1 | Create expedition store | `src/modules/expeditions/expedition-store.ts` |
| 2.2 | Quest generator | `src/modules/expeditions/lib/questGenerator.ts` |
| 2.3 | Event pre-generator | `src/modules/expeditions/lib/eventGenerator.ts` |
| 2.4 | Damage calculator | `src/modules/expeditions/lib/damageCalculator.ts` |
| 2.5 | Expedition resolver | `src/modules/expeditions/lib/expeditionResolver.ts` |
| 2.6 | Loot calculator | `src/modules/expeditions/lib/lootCalculator.ts` |
| 2.7 | RNG utilities | `src/modules/expeditions/lib/rng.ts` |
| 2.8 | Extend game-store (weapon, resources, chat) | `src/lib/game-store.ts` |
| 2.9 | Unit tests for generators | `src/modules/expeditions/lib/__tests__/questGenerator.test.ts` |
| 2.10 | Unit tests for damage & resolver | `src/modules/expeditions/lib/__tests__/damageCalculator.test.ts` |
| 2.11 | Unit tests for loot | `src/modules/expeditions/lib/__tests__/lootCalculator.test.ts` |

### Key logic decisions (from Q&A rounds)

- Weapon can break (durability=0) but expedition continues → `weaponBroken` flag
- Scars are a positive resource, accumulate on weapon stub
- Events pre-generated at dispatch with `triggerProgress` timestamps
- Outcome: `partial` if weapon broken, `failure` only if broken + seeker injured
- Chat messages stored in game-store, Guild channel with auto-switch

---

## 11.5 Phase 3: UI — Guild in Sidebar (Day 4-5)

| # | Task | File |
|---|------|------|
| 3.1 | Modify SkinShell: add Guild nav button | `components/skin-shell.tsx` |
| 3.2 | Add `activeModule` state (forge/guild) | `components/skin-shell.tsx` |
| 3.3 | Conditional rendering: Forge vs Guild | `components/skin-shell.tsx` |
| 3.4 | ExpeditionsPanel (3-tab wrapper) | `src/modules/expeditions/ui/ExpeditionsPanel.tsx` |
| 3.5 | Expeditions tab layout | `src/modules/expeditions/ui/ExpeditionsTab.tsx` |
| 3.6 | Quest card component | `src/modules/expeditions/ui/QuestCard.tsx` |
| 3.7 | Quest board grid | `src/modules/expeditions/ui/QuestBoard.tsx` |
| 3.8 | Intendant placeholder tab | `src/modules/expeditions/ui/IntendantTab.tsx` |

### Guild tabs

1. **Expeditions** — quest board + active expedition
2. **Encyclopedia** — locations, elements, enemies reference
3. **Intendant** — placeholder ("coming soon")

---

## 11.6 Phase 4: UI — Active Expedition & Events (Day 6-7)

| # | Task | File |
|---|------|------|
| 4.1 | Dispatch screen (modal/expand) | `src/modules/expeditions/ui/DispatchScreen.tsx` |
| 4.2 | Active expedition component (timer, progress) | `src/modules/expeditions/ui/ActiveExpedition.tsx` |
| 4.3 | Progress bar with shimmer animation | `src/modules/expeditions/ui/ActiveExpedition.tsx` |
| 4.4 | Event log component | `src/modules/expeditions/ui/EventLog.tsx` |
| 4.5 | Expedition results screen | `src/modules/expeditions/ui/ExpeditionResults.tsx` |
| 4.6 | Right panel: Guild channel tab | `components/skin-shell.tsx` (right panel section) |
| 4.7 | Guild channel message rendering | `src/modules/expeditions/ui/GuildChannel.tsx` |
| 4.8 | Auto-switch to Guild channel checkbox | `src/modules/expeditions/ui/GuildChannel.tsx` |

### Dispatch flow

1. Player clicks quest card → DispatchScreen opens
2. Shows: quest description, location details, stub seeker, stub weapon (durability + scars)
3. "Confirm dispatch" → `startExpedition()` → run state = `traveling`
4. "Cancel" → close dispatch screen

### Results flow

1. Timer completes → run state = `completed` or `failed`
2. Results screen: outcome banner, loot table, weapon damage report, gold/reputation
3. "Collect" button → `collectLoot()` → resources to game-store, run state = `idle`
4. Notification pushed to Guild channel in right panel

---

## 11.7 Phase 5: Encyclopedia, Dev Mode & Polish (Day 8-9)

| # | Task | File |
|---|------|------|
| 5.1 | Encyclopedia tab: Locations sub-tab | `src/modules/expeditions/ui/EncyclopediaTab.tsx` |
| 5.2 | Encyclopedia tab: Elements sub-tab | `src/modules/expeditions/ui/EncyclopediaTab.tsx` |
| 5.3 | Encyclopedia tab: Enemies sub-tab | `src/modules/expeditions/ui/EncyclopediaTab.tsx` |
| 5.4 | Dev panel (checkbox + sliders + inputs) | `src/modules/expeditions/ui/DevPanel.tsx` |
| 5.5 | Skip buttons on active expedition | `src/modules/expeditions/ui/ActiveExpedition.tsx` |
| 5.6 | Wire dev config to expedition store | `src/modules/expeditions/expedition-store.ts` |
| 5.7 | Weapon repair stub action (dev) | `src/lib/game-store.ts` |

### Dev panel controls

- ☑ DEV-режим toggle (sidebar status block)
- Time speed slider (1-3600)
- Damage multiplier slider (0.1-3.0)
- Events min/max inputs (1-10)
- [Refresh Board] button

---

## 11.8 Phase 6: Testing & Final Polish (Day 10)

| # | Task | File |
|---|------|------|
| 6.1 | Full playthrough test: dispatch → run → collect | — |
| 6.2 | Edge case: weapon breaks mid-expedition | — |
| 6.3 | Edge case: dispatch with durability=0 (blocked) | — |
| 6.4 | Edge case: offline return after completion | — |
| 6.5 | Edge case: dev mode skip-to-end | — |
| 6.6 | Final styling pass (medieval theme) | — |
| 6.7 | Animation polish (progress shimmer, fade-in) | — |
| 6.8 | Update documentation to match final implementation | `docs/dev/expeditions/` |

---

## 11.9 File structure

```
src/modules/expeditions/
├── index.ts                          # Public API
├── types.ts                          # All TypeScript types (3.1–3.14)
├── constants.ts                      # MODULE_ID, defaults, magic numbers
├── expedition-store.ts               # Zustand store (active run, board, dev config)
│
├── data/
│   ├── locations.ts                  # 10 locations + lore + elementalProbabilities
│   ├── elements.ts                   # 13 elements with biome probabilities
│   ├── enemies.ts                    # 9 enemies + flavor text + attack patterns
│   ├── questGivers.ts                # 5-6 quest givers + backstories
│   ├── questTemplates.ts             # 5 quest templates + narrative strings
│   ├── encounters.ts                 # 13+ encounters + template texts
│   ├── biomeAdjacency.ts            # Biome neighbor map
│   └── stubResources.ts             # ~15 stub resources with biome frequencies
│
├── lib/
│   ├── questGenerator.ts            # Board generation algorithm
│   ├── eventGenerator.ts            # Event pre-generation + semantic tag matching
│   ├── damageCalculator.ts          # Damage chance + severity + durability loss
│   ├── lootCalculator.ts            # Loot calculation by biome + tier + frequency
│   ├── expeditionResolver.ts        # Outcome resolution, status, narrative summary
│   ├── rng.ts                       # Seeded random, weighted pick, dice helpers
│   └── __tests__/
│       ├── questGenerator.test.ts
│       ├── eventGenerator.test.ts
│       ├── damageCalculator.test.ts
│       ├── lootCalculator.test.ts
│       └── expeditionResolver.test.ts
│
└── ui/
    ├── ExpeditionsPanel.tsx          # 3-tab wrapper (Expeditions | Encyclopedia | Intendant)
    ├── ExpeditionsTab.tsx            # Quest board + active expedition slot
    ├── QuestBoard.tsx                # Grid of quest cards
    ├── QuestCard.tsx                 # Single expedition card
    ├── DispatchScreen.tsx            # Dispatch confirmation modal
    ├── ActiveExpedition.tsx          # Timer, progress bar, skip buttons, event log
    ├── EventLog.tsx                  # Chronological event feed during run
    ├── ExpeditionResults.tsx         # Outcome + loot + damages + collect button
    ├── EncyclopediaTab.tsx           # Locations | Elements | Enemies sub-tabs
    ├── IntendantTab.tsx              # "Coming soon" placeholder
    ├── DevPanel.tsx                  # Dev controls (time, damage, events)
    └── GuildChannel.tsx              # Right panel Guild channel (messages + auto-switch)
```

### Documentation structure

```
docs/dev/expeditions/
├── 00-index.md                       # This file — table of contents + changelog
├── 01-concept-and-scope.md           # Concept, boundaries, scope, key principles
├── 02-architecture.md                # DAG, state management, data flow
├── 03-domain-model.md               # TypeScript types (3.1–3.14)
├── 04-mechanics.md                   # Quest board, timer, resolution, weapon breakage
├── 05-ui-ux.md                       # Layouts, tabs, cards, Guild channel, Intendant
├── 06-random-events.md               # Encounters, categories, semantic tags
├── 07-weapon-damage.md              # Damage model, scars as resource, durability
├── 08-dev-mode.md                    # Dev config, skip buttons, time scale presets
├── 09-stubs.md                       # Stubs: seeker, weapon, resources, repair
├── 10-integration.md                # SkinShell, game-store, right panel, message store
├── 11-mvp-plan.md                    # This file — phases, timeline, file structure
├── appendix-a-locations.md          # 10 locations with full lore + quest hooks
├── appendix-b-enemies.md            # 9 enemies with attack patterns
├── appendix-c-elements.md           # 13 elements with biome probabilities
└── appendix-d-quest-givers.md       # (planned) Quest giver backstories
```

---

## 11.10 Dependencies between phases

```
Phase 0 (lore) ──→ Phase 1 (data+types) ──→ Phase 2 (store+logic) ──→ Phase 3 (UI: sidebar)
                                                                        │
                                                                        ├──→ Phase 4 (UI: expedition)
                                                                        │
                                                                        └──→ Phase 5 (UI: encyc+dev)
                                                                               │
                                                                               └──→ Phase 6 (polish+test)
```

- Phase 0 must complete before Phase 1 (data catalogs need lore text)
- Phase 1 must complete before Phase 2 (logic needs types and data)
- Phase 2 must complete before Phases 3-5 (UI needs store and logic)
- Phases 3, 4, 5 can partially overlap (different UI components)
- Phase 6 is last

## 11.11 Open design questions

These are decisions that should be made before or during the corresponding phase:

| # | Question | Phase | Status |
|---|----------|-------|--------|
| Q1 | What are the 5-6 quest giver names, roles, and backstories? | 0 | ⬜ Pending |
| Q2 | How many encounters per category? Exact template texts? | 0 | ⬜ Pending |
| Q3 | Exact narrative summary template for expedition results? | 0 | ⬜ Pending |
| Q4 | Quest board card layout — grid or horizontal scroll? | 3 | ⬜ Pending |
| Q5 | Dispatch screen — modal or inline expand? | 4 | ⬜ Pending |
| Q6 | Encyclopedia tab — table view or card view? | 5 | ⬜ Pending |
