# Worklog — SwordCraft module kit (SCv4)

**Read this file before any task.** It mixes **non-negotiable boundaries** (module-kit rules) with **short session state** (to-do + latest work record).

For the full process (doc pack, GitHub Template workflow, merge checklist), use the SwordCraft monorepo spec **`docs/specs/module-development-kit.md`** when available, or the doc pack under **`docs/module/<your-slug>/`** in your repo.

---

## Module kit — must follow

Use this section as a **checklist**; do not rely on memory from chat.

| Rule | Detail |
|------|--------|
| **Layout** | New feature code follows **`examples/reference-module/`** (or the path your `README` names). Do not invent new top-level folders without a one-line note in `docs/module/<slug>/00-index.md`. |
| **Docs** | Domain specs for a **product module** live in **`docs/module/<slug>/`** (`00-index` … `08-delivery-manifest`). This `worklog.md` is **not** the module spec. |
| **DAG** | A feature module **must not** import the **Craft Planner** (or other "consumer" hosts). Integration is composed in the **host** / shell. |
| **Data** | One **single writer** per catalog or rule set (see `06-data-authority.md` in your doc pack). No copy-paste duplicates across modules. |
| **API** | Stable exports only through the module **entry** (`index.ts` / agreed public file). Deep paths are not a public contract. |
| **Delivery** | No handoffs that bundle `.git` from other projects, random `skills/`, or full monorepo trees — see `08-delivery-manifest.md`. |
| **Secrets** | Never commit **`.env`** with real secrets. Only **`.env.example`**. |

---

## What belongs in the sections below

- **To-do:** only the **current** task (keep short).
- **Work records:** only the **latest** completed task. Older records go to **`archive/`** (`01-topic.md`, `02-topic.md`, ...).
- Long write-ups belong in **`docs/`**, not here.

---

## Current state

| Item | Value |
|------|-------|
| Stack | Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript |
| Theme | Dark medieval (`theme-root.css`, `globals.css`) |
| Layout | `SkinShell` component (sidebar, statusbar, forge, dock) |
| State mgmt | Zustand 5 (`src/lib/game-store.ts`) — resources, blacksmith, forge |
| Tests | Vitest 4 — run `npm test` |
| Dev port | 3000 |

---

## Development rules

### Layout and files

- Follow: **`app/`** (routes, layout, globals), **`components/`** (shell and UI), **`src/`** (theme, CSS, `experiments/`), **`public/`** (static assets).
- **Split large components** into focused files under `components/` or `app/`.
- **Reusable helpers** — small pure modules under `src/` or a dedicated `lib/`; avoid copy-paste.

### Documentation

- When behavior or setup changes, update the **right** markdown (`README`, boilerplate notes, or **`docs/module/...`**).
- Do not use this file as a full specification.

### Language (SwordCraft-aligned)

- **Code comments and maintainer docs** — **English**.
- **Player-visible UI strings** (labels, buttons, in-game copy) — **Russian** when building features intended for the SwordCraft game shell.
- **This repo's** project markdown (README, worklog, technical notes) — **English**, unless a file is intentionally bilingual/RU for team review only.

### Technical debt and risk

- Prefer **small steps**; keep `npm run typecheck`, `npm test`, and `npm run build` green.
- Mark **temporary** choices in code or docs so they are easy to revisit.

### Tests

- Non-trivial logic → testable helpers + **Vitest** **`*.test.ts`** next to the module.

---

## Agent protocol

Every agent **must**:

1. **Read** this file (including **Module kit — must follow**) before starting.
2. On task completion: move the **previous** work record to `archive/` (next free number), then add the **new** record under **Work records** (only one).

Record format:

```markdown
---
Task ID: <id>
Agent: <agent name>
Task: <what was requested>

Work Log:
- <step 1>
- <step 2>

Stage Summary:
- <key results / decisions / artifacts>
```

---

## To-do

<!-- On completion: add archive/NN-topic.md and trim this section. -->

- Optional: expand encounter / quest-giver narrative content (Track A in `docs/dev/expeditions/11-mvp-plan.md`) — code MVP is shipped
- Optional: align `docs/TZ` and data with [`docs/STORYLINE_AUDIT.md`](docs/STORYLINE_AUDIT.md) follow-ups

---

## Work records

---
Task ID: 4
Agent: main
Task: Study project, synthesize Q&A into development documentation for Expeditions module

Work Log:
- Cloned SCv5 repository to /home/z/my-project/SCv5/
- Read all project source code: game-store.ts, skin-shell.tsx, page.tsx, layout.tsx, format.ts
- Read all TZ documentation (12 parts, Russian spec + English split)
- Read all module documentation (8 parts: scope, domain model, public API, integration contracts, i18n, data authority, risks, delivery manifest)
- Read archive files and worklog
- Synthesized user Q&A answers into unified concept
- Created comprehensive development documentation at docs/dev/expeditions-module-dev-doc.md

Stage Summary:
- Development documentation created: `docs/dev/expeditions-module-dev-doc.md` (v1.0)
- 14 sections + 3 appendices (locations catalog, enemies catalog, elements catalog)
- MVP plan: 6 phases, ~10 working days
- All user decisions reflected in document
- No code changes yet — documentation only

---
Task ID: 5
Agent: main
Task: Update documentation based on user Q&A round 3 answers

Work Log:
- Updated 04-mechanics.md: weapon breakage no longer causes expedition failure — mission completes, weaponBroken flag set, outcome = partial
- Updated 07-weapon-damage.md: scars reframed as positive resource for enchantment module, durability=0 continues expedition, edge cases updated
- Updated 05-ui-ux.md: added Intendant tab placeholder, Guild channel in right panel with auto-switch checkbox, message store spec
- Updated 10-integration.md: right panel integration now uses message store with Guild channel tabs, autoSwitchToGuild flag
- Updated 03-domain-model.md: added weaponBroken flag to ExpeditionRun, added ChatMessage type (3.14)
- Updated 01-concept-and-scope.md: added principles about scars as resource and weapon breakage ≠ failure, added Guild channel and Intendant placeholder to scope
- Identified gap: location lore/storylines need development

Stage Summary:
- Documentation updated to reflect 6 user answers from Q&A round 3
- Key changes: weapon break model, scars as positive resource, Guild channel + message store, Intendant placeholder
- Location storyline/lore identified as next content gap to address

---
Task ID: 6
Agent: main
Task: Expand location lore, audit docs, rewrite MVP plan

Work Log:
- Audited all 15 doc files: sizes range 16-263 lines, well-organized, no oversized files
- Expanded appendix-a-locations.md from 16 lines (table only) to ~120 lines with full lore for all 10 locations
- Each location now has: data table, description, lore (2-3 paragraphs tying to Arkedon history), quest hooks (3-4 examples)
- Lore ties locations to: Builders of Monoliths, War of Three Barons, Swamp Plague, Eastern Marches geography
- Updated 00-index.md to v1.1 with changelog entry
- Rewrote 11-mvp-plan.md: added Phase 0 (lore/content), expanded to 7 phases, added dependency graph, open design questions, updated file structure with new components (IntendantTab, GuildChannel, lootCalculator)

Stage Summary:
- Location lore complete: all 10 MVP locations have narrative depth
- MVP plan now has 7 phases (0-6) with Track A (content) and Track B (code)
- 6 open design questions identified for future resolution
- Documentation structure validated: 15 files, well-organized, no files > 263 lines

---
Task ID: 7
Agent: main
Task: Implement Expeditions module — Phase 1-3 (types, data, store, logic, UI, integration)

Work Log:
- Created types.ts with all 27 domain types (Biome, Element, Location, Enemy, WeaponDamage, QuestGiver, etc.)
- Created 8 data catalogs: locations (10), elements (13), enemies (9), questGivers (6), questTemplates (5), encounters (13), stubResources (15), biomeAdjacency
- Created constants.ts with module defaults, damage tables, duration multipliers
- Created index.ts as public API entry point
- Created 6 logic libraries: rng, questGenerator, eventGenerator, damageCalculator, lootCalculator, expeditionResolver
- Created expedition-store.ts (Zustand) with full state management: board, dispatch, timer tick, skip, resolve, collect
- Extended game-store.ts with: stubWeapon, expeditionResources, guildReputation, chatMessages, guildChannelActive, autoSwitchToGuild, activeModule, and all new actions
- Created 12 UI components: ExpeditionsPanel, ExpeditionsTab, QuestBoard, QuestCard, DispatchScreen, ActiveExpedition, EventLog, ExpeditionResults, EncyclopediaTab, IntendantTab, DevPanel, GuildChannel
- Modified SkinShell: Forge/Guild navigation, conditional module rendering, Dev mode toggle + panel, right rail with Guild channel tab, dynamic resource bar
- TypeScript: clean compilation (0 errors)
- Build: successful (Next.js 16.1.1)
- Tests: 29/29 passing

Stage Summary:
- Full Expeditions module implemented (types → data → store → logic → UI → integration)
- Module is functional: quest board generation, expedition dispatch, timer, events, resolution, loot collection
- Dev mode with time scale, damage multiplier, skip buttons
- Guild channel in right panel with auto-switch
- All 3 Guild tabs: Expeditions, Encyclopedia, Intendant (placeholder)
