# Domain model

## Biome alignment (Resource Depot)

Expedition **locations** must stay consistent with the **biome** vocabulary used for “where this resource can appear in the world” on depot catalog entities.

### Authoritative biome ids

The **`Biome`** string union and **`BiomeEntry`** (`biome` + `frequency`) are **owned by Resource Depot** in the monorepo. After integration, expeditions should **import or re-export** from the depot public surface — **do not fork** a parallel union without a documented migration.

**This repo (MVP):** `Biome` and related expedition types are defined in [`src/modules/expeditions/types.ts`](../../../src/modules/expeditions/types.ts) and biomes in [`data/biomes.ts`](../../../src/modules/expeditions/data/biomes.ts) until depot is linked. Treat that union as **provisional** and diff against depot on merge.

**Conceptual inventory** (verify against code when integrating):

| `Biome` id | Role |
|------------|------|
| `mountains`, `forest`, `swamp`, `volcanic`, `deep_mines`, `desert`, `tundra`, `ocean_coast`, `ancient_ruins`, `shadow_realm`, `crystal_caves`, `bog` | World regions for sourcing; `swamp` and `bog` are distinct in catalog data. |

**Player-facing labels** for biomes use depot i18n keys `biome.<id>` (product language Russian). Frequencies: `freq.common` … `freq.legendary`.

### Catalog linkage

- **Materials and consumables** carry `biomes: BiomeEntry[]` in depot catalog sources (`materials.ts`, `consumables.ts`).
- Processed goods often use **`biomes: []`** — they are not natural wild drops; expedition loot should treat empty biomes as **not** default world drops unless a special table overrides (see `07-risks-and-edge-cases.md`).

### Separation from material “properties”

Numeric craft/planner properties (`density`, `hardness`, …) describe **physics/economy**, not spawn biome. **Biome exists only on catalog entities**, not as a `PropertyValue` key.

## Location (designer entity)

Abstract shape (exact TypeScript lives in implementation):

| Field | Description |
|-------|-------------|
| `locationId` | Stable string primary key (prefix convention TBD, e.g. `loc-…`). |
| `primaryBiome` | `Biome`; main tagging for UI and loot validation. |
| `secondaryBiomes?` | For multi-biome routes; weighting rules TBD. |
| `siteKey?` | Optional POI / narrative key (ruins branch, mine level). |
| `tier` | Gating band (enemy power, yield) — orthogonal to biome. |
| `metadata?` | Art refs, unlock flags, quest hooks — host or `QUEST_SYSTEM` may own some flags. |

**Design rule:** Loot tables that grant a depot resource should prefer items whose `biomes[]` includes the **active** biome context for that encounter (or documented exception).

## Expedition run

| Field | Description |
|-------|-------------|
| `expeditionRunId` | Unique run id (e.g. UUID). |
| `locationId` | FK to location. |
| `state` | Enum: e.g. `scheduled`, `traveling`, `active`, `resolving`, `completed`, `failed`, `cancelled` (exact set TBD). |
| `party` | Snapshot of adventurer ids + relevant stats **at dispatch** (immutable for the run) or reference resolved by host — choose one pattern and test it. |
| `startedAt` / `expectedResolutionAt` | Wall-clock or tick-based timing per product decision. |
| `rngSeed?` | If outcomes must be reproducible in tests. |
| `outcome?` | Structured result: loot rolls, injuries, narrative flags. |

## Loot and costs

- **Loot entries** reference **`resourceId`** (`mat-*`, `con-*`, …) and quantities (or ranges). Validation against depot catalog is **recommended** in CI/tests.
- **Costs** (supplies, fees) similarly use `resourceId`; deduct from **`RESOURCE_DEPOT`** stock via documented APIs (host or module — see `04-integration-contracts.md`).

## Identifiers summary

| ID | Owner module | Notes |
|----|--------------|--------|
| `locationId` | EXPEDITIONS | |
| `expeditionRunId` | EXPEDITIONS | |
| `resourceId` | RESOURCE_DEPOT catalog | Read-only for expeditions when validating loot |
| `Biome` union | RESOURCE_DEPOT | Shared type |
| Adventurer ids | ADVENTURERS | Opaque to expeditions beyond snapshot |
