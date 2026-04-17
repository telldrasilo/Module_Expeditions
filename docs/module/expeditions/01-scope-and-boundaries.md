# Scope and boundaries

## In scope (product intent)

- **Location catalog (data):** Definitions that map expedition destinations to **depot biomes**, optional **site / POI** identity, **tier** or difficulty band, and rules for encounters/loot bias (exact simulation depth TBD in implementation).
- **Expedition lifecycle:** From **scheduling** (or immediate dispatch) through **travel / active** phases to **resolution** (success, failure, partial) and **reward distribution**.
- **Resource consistency:** Loot that grants depot items respects **biome sourcing** rules (materials/consumables with `biomes[]` on catalog rows) unless a **documented exception** (e.g. boss cache, story drop).
- **Player-facing UX:** List or map of locations, run setup (party, loadout, duration), progress display, results summary — RU copy per product rules.
- **Identifiers:** Stable `locationId`, `expeditionRunId`; references to `resourceId` keys shared with Resource Depot.

## Out of scope (explicit)

- **Full real-time combat simulation** inside this module — combat outcomes may be abstracted (rolls, tables) unless a future spec merges combat here.
- **Owning adventurer roster persistence** — **`ADVENTURERS`** (or equivalent) owns hireable units; this module consumes **snapshots or IDs** supplied by the host unless a later contract merges ownership (see `04-integration-contracts.md`).
- **Weapon crafting** — **`CRAFT_PLANNER`**; no upward dependency from expeditions into planner internals.
- **Shop economy** — **`SHOP`**; purchasing is separate (expeditions may *consume* items already in depot stock as costs).
- **Quest narrative graph** — **`QUEST_SYSTEM`** may trigger or gate expeditions via host; this pack does not define the full quest DSL.

## Integration roles (names only)

- **Host:** Next.js shell; composes **`EXPEDITIONS`**, **`RESOURCE_DEPOT`**, **`ADVENTURERS`**, and future **`QUEST_SYSTEM`** without creating cycles between feature modules.
- **Resource Depot:** Canonical **`Biome`** type, catalog rows (`biomes[]`), stock mutations for rewards/costs, `resourceId` vocabulary.
- **Adventurers:** Party members, skills, survival stats — exposed to the host or via narrow read APIs; not owned by expeditions.
- **Expeditions:** Owns location + run models, expedition UI shell, and pure logic for scheduling/resolution **that does not import consumer modules upward**.

## Versioning note

v1 boundaries may shrink for a first playable slice (e.g. fixed party, single biome). Deviations from this scope must be recorded in `00-index.md` changelog and summarized in [`docs/specs/expeditions.md`](../../specs/expeditions.md) (stub + merge checklist; deep detail stays in this pack).
