# Integration contracts

## Dependency DAG (must hold)

```text
RESOURCE_DEPOT   does not import   EXPEDITIONS

EXPEDITIONS   may import   RESOURCE_DEPOT   public API (types, catalog readers, stock helpers)
EXPEDITIONS   must not import   CRAFT_PLANNER, WEAPON_INVENTORY, SHOP, QUEST_SYSTEM

ADVENTURERS   must not import   EXPEDITIONS

Host imports   EXPEDITIONS, RESOURCE_DEPOT, ADVENTURERS   and composes dispatch + rewards
```

**Rationale:** Avoid cycles and keep planner/inventory free of expedition knowledge. Party composition and cross-feature orchestration live at **host** or in thin `app/` / `components/` bridges that are **not** stable public APIs.

### Allowed exception (explicit only)

If performance requires, a **read-only** import of `@adventurers/index` types or selectors may be allowed **only after** a line is added here and in `docs/specs/modules.md` cross-module section. Default for v1: **no** `EXPEDITIONS` → `ADVENTURERS` import; host passes `DispatchInput.partySnapshot`.

## Resource Depot

- **`resourceId` parity:** Loot and costs use the same keys as depot `RESOURCE_MAP` / catalogs (see [`docs/specs/resource-depot.md`](../../specs/resource-depot.md) and [`docs/specs/modules.md`](../../specs/modules.md)).
- **Biome:** Use depot `Biome` type and `biome.*` i18n keys for location UI.
- **Stock mutations:** Applying loot or consuming supplies calls into **`RESOURCE_DEPOT`** APIs (`useDepotStore` or future server sync). Either:
  - **A (recommended):** Host listens for `ExpeditionOutcome` and applies depot deltas in one place; or
  - **B:** EXPEDITIONS module calls depot public methods — still **no** deep imports into depot internals.

## Adventurers

- **Input:** `DispatchInput` includes an **opaque party snapshot** (adventurer ids, stats needed for resolution). Produced by host from `ADVENTURERS` state.
- **Output:** Injuries, XP, death flags — returned in `ExpeditionOutcome` for host to commit into `ADVENTURERS` (this module does not own long-term adventurer persistence unless spec changes).

## Quests and unlocks

- Location visibility or tier unlocks may depend on **`QUEST_SYSTEM`**. Preferred: host passes `availableLocationIds` or unlock flags into expeditions store **initialization** rather than importing quest code inside `EXPEDITIONS`.

## DTO sketches (serializable)

**DispatchInput** (illustrative):

- `locationId: string`
- `partySnapshot: AdventurerSnapshot[]` (shape owned by integration tests)
- `consumablesLoadout?: Record<resourceId, quantity>` — validated against depot
- `clientRequestId?: string` — idempotency for double-submit

**ExpeditionOutcome** (illustrative):

- `expeditionRunId: string`
- `status: 'success' | 'failure' | 'aborted'`
- `loot: Array<{ resourceId: string; quantity: number }>`
- `partyEffects: Array<{ adventurerId: string; … }>` — host interprets
- `narrativeFlags?: string[]` — optional hooks for quests

Exact TypeScript belongs in `src/modules/expeditions` (today) / `modules/EXPEDITIONS` (monorepo) with Vitest fixtures.

## Smoke scenario (merge gate)

Documented in [`docs/specs/expeditions.md`](../../specs/expeditions.md). Minimal bar for integration:

1. Pick a location with known `primaryBiome`.
2. Dispatch with party snapshot stub.
3. Resolve run; verify loot items’ catalog `biomes[]` intersect that biome **or** intentional exception list is empty in CI.
