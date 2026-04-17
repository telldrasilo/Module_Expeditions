# Expeditions — normative stub (monorepo merge target)

**Canonical engineering pack:** [`docs/module/expeditions/00-index.md`](../module/expeditions/00-index.md)  
**As-built source map:** [`docs/module/expeditions/09-as-built.md`](../module/expeditions/09-as-built.md)  
**Implementation:** `src/modules/expeditions/`

This file is the **short registry entry** for `@expeditions/*` in a future monorepo. Normative scope, domain model, public API, and integration DAG are maintained in the module pack (`01`–`08`); MVP delivery status and file layout are in `09-as-built.md`.

## Persistence

Expedition and board state use **in-memory Zustand** in this MVP; **localStorage / server sync** is a product decision deferred until host persistence is defined. Document any change in [`docs/module/expeditions/03-public-api.md`](../module/expeditions/03-public-api.md) and [`04-integration-contracts.md`](../module/expeditions/04-integration-contracts.md).

## Clock model

Wall-clock timers with dev acceleration are used in the MVP (`DevConfig`, `tickProgress`). If the monorepo adopts tick-only or anti-cheat clock rules, update [`docs/module/expeditions/07-risks-and-edge-cases.md`](../module/expeditions/07-risks-and-edge-cases.md) and this section.

## Integration smoke (merge gate)

Minimal bar before declaring cross-module integration done:

1. Pick a location with known `primaryBiome` (see `data/locations.ts`).
2. Dispatch with a party snapshot stub (host or test).
3. Resolve run; verify loot `resourceId` keys exist in the active depot or stub catalog and match biome sourcing rules **or** an intentional, documented exception list.

## Scope drift

Any deliberate change to in/out scope must be recorded in [`docs/module/expeditions/00-index.md`](../module/expeditions/00-index.md) (changelog) and in [`01-scope-and-boundaries.md`](../module/expeditions/01-scope-and-boundaries.md).
