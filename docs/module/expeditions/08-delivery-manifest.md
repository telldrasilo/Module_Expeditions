# Delivery manifest

## Current repository (MVP delivered)

| Item | Location |
|------|----------|
| Implementation | `src/modules/expeditions/` |
| Engineering pack | `docs/module/expeditions/` (`01`–`09`, hub [`00-index.md`](00-index.md)) |
| Registry stubs | [`docs/specs/README.md`](../../specs/README.md) |
| Host bridge | `src/lib/game-store.ts`, shell under `components/` |
| Doc map | [`docs/00-index.md`](../../00-index.md) |

**Includes:** Next.js app shell, Vitest, expeditions module (types, data, store, UI), design deep-dive under [`docs/dev/expeditions/`](../../dev/expeditions/00-index.md).

**Excludes:** Full SwordCraft monorepo, production Resource Depot, ADVENTURERS package, real `.env` secrets.

## Standalone repository (template lineage)

Per [`docs/specs/module-development-kit.md`](../../specs/module-development-kit.md):

**Expected from template** (some items omitted in lightweight checkouts):

- Next.js + Vitest skeleton.
- `docs/module/expeditions/` — documentation pack with `00-index.md`.
- Root **`worklog.md`** — discipline + session notes.
- `src/modules/expeditions/` — implementation mirroring future `modules/EXPEDITIONS/src` layout (`index.ts` public surface, `lib/` pure logic).
- Optional: `examples/reference-module/` — structural reference only.

**Excludes:** Full monorepo tree, snapshot extract folders, secrets.

## Monorepo target (after merge)

| Deliverable | Path / action |
|-------------|----------------|
| Implementation | `modules/EXPEDITIONS/` (move or re-export from `src/modules/expeditions/` as needed) |
| English behavior stub | [`docs/specs/expeditions.md`](../../specs/expeditions.md) — expand with CI gates; deep spec stays in this pack |
| Registry | Extend [`docs/specs/modules.md`](../../specs/modules.md) with monorepo paths and `@expeditions/*` |
| Module README | `modules/EXPEDITIONS/README.md` — summary + link to `docs/specs/expeditions.md` and module pack |
| Paths | `module-paths.ts` + `tsconfig.json` — `@expeditions/*` → module root |

## Import alias goal

`@expeditions/*` → `modules/EXPEDITIONS/src/*` — host imports **`@expeditions/index`** only for the public surface.

## Handoff string (external agents)

Repository URL + read [`README.md`](../../../README.md), [`worklog.md`](../../../worklog.md), [`docs/module/expeditions/00-index.md`](00-index.md), and [`docs/module/expeditions/09-as-built.md`](09-as-built.md); obey [`04-integration-contracts.md`](04-integration-contracts.md) DAG.
