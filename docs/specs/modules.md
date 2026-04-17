# Module registry — SCv5 standalone

Cross-module notes for **this** repo. When merging into the SwordCraft monorepo, extend this table with full paths and CI gates.

| Import alias | Code path (this repo) | Engineering spec |
|--------------|----------------------|-------------------|
| `@expeditions/*` (conceptual) | `src/modules/expeditions/` | [`expeditions.md`](expeditions.md) → [`docs/module/expeditions/00-index.md`](../module/expeditions/00-index.md) |
| Resource Depot | Not present — expeditions use [`stubResources.ts`](../../src/modules/expeditions/data/stubResources.ts) | [`resource-depot.md`](resource-depot.md) |

## Cross-module rules (summary)

- **EXPEDITIONS** must not import **CRAFT_PLANNER**, **SHOP**, or **QUEST_SYSTEM** internals. Details: [`docs/module/expeditions/04-integration-contracts.md`](../module/expeditions/04-integration-contracts.md).
- **Default:** no `EXPEDITIONS` → `ADVENTURERS` import; host passes party snapshot (same file).

## Adventurers / host

**ADVENTURERS** is not a package in this repo; party data is stubbed. Host composition: `components/` + [`game-store.ts`](../../src/lib/game-store.ts).
