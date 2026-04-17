# Resource Depot — stub context (SCv5)

**Full Resource Depot** is not part of this standalone repository.

**Expeditions MVP** uses a **stub catalog** so loot and costs have stable `resourceId` keys:

- [`src/modules/expeditions/data/stubResources.ts`](../../src/modules/expeditions/data/stubResources.ts)

## Merge expectations

After monorepo integration:

- Replace or align stub ids with depot `RESOURCE_MAP` / catalog rows.
- Use depot **`Biome`** as the single source of truth; today expeditions define `Biome` in [`types.ts`](../../src/modules/expeditions/types.ts) — see [`docs/module/expeditions/02-domain-model.md`](../module/expeditions/02-domain-model.md).

## Loot application

Host applies loot to depot stock (or game-store bridge). Contract sketches: [`docs/module/expeditions/04-integration-contracts.md`](../module/expeditions/04-integration-contracts.md).
