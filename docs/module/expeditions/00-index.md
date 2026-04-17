# Expeditions and locations — documentation pack index

> **Registry stub (monorepo):** [`docs/specs/expeditions.md`](../../specs/expeditions.md) · [`docs/specs/modules.md`](../../specs/modules.md) · [`AGENTS.md`](../../../AGENTS.md)

**Doc pack version:** 0.2  
**Status:** **MVP shipped** in this repo (`src/modules/expeditions/`). Monorepo extraction path remains `modules/EXPEDITIONS` with `@expeditions/*` when merged upstream.

## Purpose

Define **expedition runs** (dispatch, duration, resolution, rewards, risk) and **locations** so that outbound gameplay aligns with **world geography** and with **resource sourcing** (depot or stub catalog). Locations reuse the **`Biome`** vocabulary for loot compatibility and consistent player-facing labels.

**As-built map (code ↔ docs):** [`09-as-built.md`](09-as-built.md)

**Product / feature spec (lore, biomes, quest board, procedural jobs, events, TS sketches, roadmap):** [`docs/TZ/README.md`](../../TZ/README.md) — English [`docs/TZ/en/00-index.md`](../../TZ/en/00-index.md); Russian [`docs/TZ/spec.ru.md`](../../TZ/spec.ru.md).

**Design narrative, MVP plan, catalogs (lore appendices):** [`docs/dev/expeditions/00-index.md`](../../dev/expeditions/00-index.md) — use for deep detail; **boundaries and API** in this pack win on conflicts unless you update both deliberately.

**Storyline audit (RU):** [`docs/STORYLINE_AUDIT.md`](../../STORYLINE_AUDIT.md)

**Full documentation map:** [`docs/00-index.md`](../../00-index.md)

### How this pack relates to `docs/TZ/en`

| Read first for… | Document set | Use it to… |
|-----------------|--------------|------------|
| **Behavior & content** (“what the game should do”) | [`docs/TZ/en/`](../../TZ/en/00-index.md) (+ optional [`spec.ru.md`](../../TZ/spec.ru.md)) | Lore, biome/location lists, quest/event rules, example TS shapes, phased roadmap. |
| **Code boundaries & shipping** (“how the module fits the repo”) | This folder (`01`–`09`) | Scope, domain model, **public API**, integration contracts, i18n split, single writers, delivery, as-built. |

**Suggested flow:** align roadmap with [`11-development-roadmap.md`](../../TZ/en/11-development-roadmap.md); implement against [`09-as-built.md`](09-as-built.md) and types/contracts in `02`–`04`; resolve product detail in TZ (e.g. events → [`08-random-events.md`](../../TZ/en/08-random-events.md)). If TZ and this pack disagree, update both and note it in [`worklog.md`](../../../worklog.md) or the changelog below.

### Cross-reference: this pack ↔ `docs/TZ/en`

| Module file | Product detail in TZ (read when designing / reviewing) |
|-------------|--------------------------------------------------------|
| [01-scope-and-boundaries.md](01-scope-and-boundaries.md) | [`01-introduction.md`](../../TZ/en/01-introduction.md), [`11-development-roadmap.md`](../../TZ/en/11-development-roadmap.md) |
| [02-domain-model.md](02-domain-model.md) | [`03-biomes.md`](../../TZ/en/03-biomes.md), [`04-elements.md`](../../TZ/en/04-elements.md), [`05-locations-and-tiers.md`](../../TZ/en/05-locations-and-tiers.md), [`09-typescript-types.md`](../../TZ/en/09-typescript-types.md) |
| [03-public-api.md](03-public-api.md) | [`09-typescript-types.md`](../../TZ/en/09-typescript-types.md) (illustrative TZ vs stable `index.ts`) |
| [04-integration-contracts.md](04-integration-contracts.md) | [`06-quest-board.md`](../../TZ/en/06-quest-board.md), [`07-semiprocedural-quests.md`](../../TZ/en/07-semiprocedural-quests.md), [`08-random-events.md`](../../TZ/en/08-random-events.md) |
| [05-i18n-and-ux-copy.md](05-i18n-and-ux-copy.md) | [`12-appendix-glossary.md`](../../TZ/en/12-appendix-glossary.md), biome/element tables in [`03-biomes.md`](../../TZ/en/03-biomes.md) / [`04-elements.md`](../../TZ/en/04-elements.md) |
| [06-data-authority.md](06-data-authority.md) | [`03-biomes.md`](../../TZ/en/03-biomes.md) (depot as source), [`07-semiprocedural-quests.md`](../../TZ/en/07-semiprocedural-quests.md) (catalogs) |
| [07-risks-and-edge-cases.md](07-risks-and-edge-cases.md) | [`04-elements.md`](../../TZ/en/04-elements.md), [`08-random-events.md`](../../TZ/en/08-random-events.md) |
| [08-delivery-manifest.md](08-delivery-manifest.md) | [`11-development-roadmap.md`](../../TZ/en/11-development-roadmap.md) |
| [09-as-built.md](09-as-built.md) | — (implementation map; pair with dev docs for UI/mechanics narrative) |

## Table of contents

| File | Topic |
|------|--------|
| [01-scope-and-boundaries.md](01-scope-and-boundaries.md) | In/out of scope; integration roles |
| [02-domain-model.md](02-domain-model.md) | Locations, runs, IDs, biome alignment with depot |
| [03-public-api.md](03-public-api.md) | Exports for host and peers |
| [04-integration-contracts.md](04-integration-contracts.md) | DTOs, dependency DAG, depot and party wiring |
| [05-i18n-and-ux-copy.md](05-i18n-and-ux-copy.md) | RU player copy, EN maintainer text |
| [06-data-authority.md](06-data-authority.md) | Single writer per data class |
| [07-risks-and-edge-cases.md](07-risks-and-edge-cases.md) | Trade-offs, open questions |
| [08-delivery-manifest.md](08-delivery-manifest.md) | Standalone repo vs monorepo merge |
| [09-as-built.md](09-as-built.md) | MVP file map, stubs, host wiring |

**Process norm:** [`docs/specs/module-development-kit.md`](../../specs/module-development-kit.md) · [`docs/spec/atomic-documentation.md`](../../spec/atomic-documentation.md)

## Glossary

- **Biome:** World region tag aligned with Resource Depot (`Biome` on materials/consumables). In this repo the union is defined in expeditions [`types.ts`](../../../src/modules/expeditions/types.ts) until depot is linked.
- **Location:** Designer-authored destination for an expedition (biome + optional site, tier, rules), not necessarily 1:1 with a single biome in edge cases (multi-biome routes — see `07-risks-and-edge-cases.md`).
- **Expedition run:** One scheduled or active instance: party assignment, timers/state, outcome, reward application.
- **`resourceId`:** Material/consumable id (`mat-*`, `con-*`, …). MVP keys live in [`stubResources.ts`](../../../src/modules/expeditions/data/stubResources.ts); merge target is depot `RESOURCE_MAP` (see [`docs/specs/resource-depot.md`](../../specs/resource-depot.md)).

## Integration status (checklist)

| Item | State |
|------|--------|
| Doc pack under `docs/module/expeditions/` | Current (`01`–`09`) |
| [`docs/specs/expeditions.md`](../../specs/expeditions.md) | Stub + merge checks |
| `src/modules/expeditions/` MVP | **Shipped** |
| Monorepo `modules/EXPEDITIONS/` | Pending upstream |
| Registry in monorepo `docs/specs/modules.md` | Stub exists here; expand on merge |

## Changelog (pack)

| Pack version | Date | Notes |
|--------------|------|--------|
| 0.2 | 2026-04-17 | MVP as-built (`09`), docs hub linkage, `docs/specs/*` stubs, status moved from pre-integration to shipped in-repo. |
| 0.1 | 2026-04-15 | Initial `00`–`08` pack. |
