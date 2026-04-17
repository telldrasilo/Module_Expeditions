# Expeditions — development documentation (deep-dive)

**Version:** 1.2  
**Date:** 2026-04-17  
**Project:** SwordCraft v5 — Idle Forge  
**Module:** Expeditions & Seekers' Guild  

This pack captures **design narrative**, **MVP planning**, and **content appendices** (locations, enemies, elements) that informed implementation. It is **not** the canonical engineering contract.

| Canonical for… | Location |
|----------------|----------|
| **API, DAG, scope, integration, as-built map** | [`docs/module/expeditions/00-index.md`](../../module/expeditions/00-index.md) |
| **Product / TZ** | [`docs/TZ/en/00-index.md`](../../TZ/en/00-index.md) |
| **Full doc map** | [`docs/00-index.md`](../../00-index.md) |
| **Storyline audit (RU)** | [`docs/STORYLINE_AUDIT.md`](../../STORYLINE_AUDIT.md) |

---

## Parts

| # | File | Topic |
|---|------|-------|
| 01 | [01-concept-and-scope.md](01-concept-and-scope.md) | Concept overview, module boundaries, scope |
| 02 | [02-architecture.md](02-architecture.md) | Architecture, dependency DAG, state management |
| 03 | [03-domain-model.md](03-domain-model.md) | TypeScript types, data structures |
| 04 | [04-mechanics.md](04-mechanics.md) | Game mechanics: quest board, timer, resolution |
| 05 | [05-ui-ux.md](05-ui-ux.md) | UI/UX layouts, Guild structure, quest cards |
| 06 | [06-random-events.md](06-random-events.md) | Event system, categories, semantic tags |
| 07 | [07-weapon-damage.md](07-weapon-damage.md) | Damage model, calculation, durability |
| 08 | [08-dev-mode.md](08-dev-mode.md) | Dev mode config, skip buttons, defaults |
| 09 | [09-stubs.md](09-stubs.md) | Stubs for external modules (ADVENTURERS, RESOURCE_DEPOT, weapon) |
| 10 | [10-integration.md](10-integration.md) | Integration with existing SkinShell and game-store |
| 11 | [11-mvp-plan.md](11-mvp-plan.md) | MVP iteration plan, file structure, timeline |
| A | [appendix-a-locations.md](appendix-a-locations.md) | Location catalog with lore (10 entries for MVP) |
| B | [appendix-b-enemies.md](appendix-b-enemies.md) | Enemy catalog (9 entries for MVP) |
| C | [appendix-c-elements.md](appendix-c-elements.md) | Element catalog with biome probabilities |

## Changelog

| Version | Date | Change |
|---------|------|--------|
| 1.2 | 2026-04-17 | Hub rework: point to `docs/module/expeditions` as canonical engineering; clarify role vs TZ and storyline audit |
| 1.1 | 2026-04-17 | Q&A round 3: weapon breakage model, scars as resource, Guild channel, Intendant placeholder, location lore |
| 1.0 | 2026-04-17 | Initial version: TZ + Q&A synthesis |
