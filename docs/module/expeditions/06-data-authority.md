# Data authority

| Data | Single writer | Consumers | Notes |
|------|---------------|-----------|--------|
| `Biome` union + `BiomeEntry` shape | RESOURCE_DEPOT (`types.ts`) | EXPEDITIONS, depot UI, analyzers | Expeditions imports type; does not add new biome literals without depot change |
| Material/consumable catalog rows + `biomes[]` | RESOURCE_DEPOT catalog TS | Loot validation, expedition design tools | |
| `resourceId` registry | RESOURCE_DEPOT / craft-data alignment per [`resource-depot.md`](../../specs/resource-depot.md) | Loot tables, cost rules | |
| Location definitions (`locationId`, rules, loot table ids) | EXPEDITIONS module data (TS or JSON under module) | Host UI, tests | |
| Expedition run state | EXPEDITIONS store | Host (persistence bridge), telemetry | |
| Party / adventurer persistent stats | ADVENTURERS | Host applies `partyEffects` from outcome | |
| Depot stock quantities | RESOURCE_DEPOT store | Rewards/costs application | |

## Derived artifacts (do not hand-edit outside owner)

- **Biome → resource reverse index** for designers: generate from depot catalog in dev/CI, or expose a pure `buildBiomeToResourcesMap(catalog)` in depot toolkit — not a second manual table in expeditions.
- **Loot validation reports:** CI output derived from catalog + location tables.

## Post-merge note

After monorepo merge, **TypeScript catalogs and types are authoritative**; prose tables in `02-domain-model.md` are illustrative only.
