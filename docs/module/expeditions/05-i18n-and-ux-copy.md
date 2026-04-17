# i18n and UX copy

Per SwordCraft rules:

- **Player-visible strings:** Russian.
- **Code comments, maintainer docs, this pack:** English.

## Biome and frequency labels

- Reuse Resource Depot keys: `biome.<biomeId>` and `freq.common` … `freq.legendary` where expedition UI shows sourcing hints consistent with depot.
- If expedition screens need **extra** flavor (e.g. location title, route nickname), add **`expedition.*`** or **`location.*`** keys in the shared locale strategy — avoid duplicating literal RU strings that already exist under `biome.*`.

## UI surfaces (non-exhaustive)

- **Location list / map:** Region name, biome chip, tier/difficulty, requirements, travel time.
- **Dispatch:** Party selection helper text, consumable requirements, confirm/cancel.
- **In progress:** Remaining time, optional risk indicator.
- **Results:** Loot list (item names from depot locale), injuries, retry/return actions.

## English maintainer parity

Where debug or admin UI shows English, follow the same pattern as depot (`nameEN` / EN bundles) if dual-language artifacts already exist; do not block v1 on full EN player UI.

## Data-driven copy

Location titles and descriptions should be **data fields** (RU strings in catalog or i18n indirection) so standalone kit tests can load minimal JSON without pulling the full game lore.
