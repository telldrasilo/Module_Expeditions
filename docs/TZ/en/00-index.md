# Expeditions & locations — English spec (split index)

**Version:** 1.0 (translation of `../spec.ru.md`)  
**Date:** 2026-04-15  
**Project:** Idle blacksmith game on Next.js  
**Module:** Expeditions & Seekers’ Guild

## Parts

| # | File | Topic |
|---|------|--------|
| 1 | [01-introduction.md](01-introduction.md) | Introduction & high-level concept |
| 2 | [02-lore-and-setting.md](02-lore-and-setting.md) | Lore & world setting |
| 3 | [03-biomes.md](03-biomes.md) | Biomes |
| 4 | [04-elements.md](04-elements.md) | Element system |
| 5 | [05-locations-and-tiers.md](05-locations-and-tiers.md) | Locations & difficulty tiers |
| 6 | [06-quest-board.md](06-quest-board.md) | Seekers’ Guild quest board |
| 7 | [07-semiprocedural-quests.md](07-semiprocedural-quests.md) | Semi-procedural quest generation |
| 8 | [08-random-events.md](08-random-events.md) | Random events during expeditions |
| 9 | [09-typescript-types.md](09-typescript-types.md) | TypeScript data types |
| 10 | [10-implementation-examples.md](10-implementation-examples.md) | Example implementations |
| 11 | [11-development-roadmap.md](11-development-roadmap.md) | Phased development plan |
| 12 | [12-appendix-glossary.md](12-appendix-glossary.md) | Appendix: glossary & reference tables |

**Russian source (single file):** [`../spec.ru.md`](../spec.ru.md)

## Working alongside the module doc pack

Product detail lives in the numbered files above. **Architecture, public API, integration DAG, data authority, and delivery** are defined in [`docs/module/expeditions/00-index.md`](../../module/expeditions/00-index.md) (`01`–`08`). Use TZ for *what* to build; use the module pack for *where it lives* and *what may import what*.

### Cross-reference: TZ part → module file

| TZ part | When coding, align with module doc |
|---------|-----------------------------------|
| [01-introduction.md](01-introduction.md), [11-development-roadmap.md](11-development-roadmap.md) | [`01-scope-and-boundaries.md`](../../module/expeditions/01-scope-and-boundaries.md), [`08-delivery-manifest.md`](../../module/expeditions/08-delivery-manifest.md) |
| [02-lore-and-setting.md](02-lore-and-setting.md) | [`05-i18n-and-ux-copy.md`](../../module/expeditions/05-i18n-and-ux-copy.md) (tone/copy), [`07-risks-and-edge-cases.md`](../../module/expeditions/07-risks-and-edge-cases.md) (world edge cases) |
| [03-biomes.md](03-biomes.md), [04-elements.md](04-elements.md), [05-locations-and-tiers.md](05-locations-and-tiers.md) | [`02-domain-model.md`](../../module/expeditions/02-domain-model.md), [`06-data-authority.md`](../../module/expeditions/06-data-authority.md) |
| [06-quest-board.md](06-quest-board.md), [07-semiprocedural-quests.md](07-semiprocedural-quests.md) | [`04-integration-contracts.md`](../../module/expeditions/04-integration-contracts.md), [`03-public-api.md`](../../module/expeditions/03-public-api.md) |
| [08-random-events.md](08-random-events.md) | [`04-integration-contracts.md`](../../module/expeditions/04-integration-contracts.md), [`02-domain-model.md`](../../module/expeditions/02-domain-model.md) |
| [09-typescript-types.md](09-typescript-types.md), [10-implementation-examples.md](10-implementation-examples.md) | [`03-public-api.md`](../../module/expeditions/03-public-api.md), [`02-domain-model.md`](../../module/expeditions/02-domain-model.md) — **freeze types in the module pack**, not only in TZ |
| [12-appendix-glossary.md](12-appendix-glossary.md) | [`05-i18n-and-ux-copy.md`](../../module/expeditions/05-i18n-and-ux-copy.md) |
