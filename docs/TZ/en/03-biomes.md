# 3. Biomes

## 3.1 Data source

Biomes are defined in the `RESOURCE_DEPOT` module as the string union `Biome`. The expeditions system uses the same list for compatibility with the materials catalog.

## 3.2 Full biome list

| ID | Russian UI name | Player-facing description |
|----|-----------------|-----------------------------|
| `mountains` | Горы | High rocky peaks and deep gorges. Rich in ore; dangerous rockfalls and birds of prey. |
| `forest` | Лес | Dense thickets, clearings, streams. Game aplenty — and predators. |
| `swamp` | Болото | Sinking mud, reeds, moss. Poisonous vapors and treacherous creatures. |
| `volcanic` | Вулкан | Ash wastes, lava flows. Source of rare fire minerals. |
| `deep_mines` | Глубокие шахты | Abandoned and active pits plunging deep. Darkness and stale air. |
| `desert` | Пустыня | Endless sand, rock outcrops, oases. Scorching days, cold nights. |
| `tundra` | Тундра | Cold plains, permafrost, sparse shrubs. Home to hardy beasts. |
| `ocean_coast` | Побережье | Cliffs, beaches, coastal caves. Rich sea resources; storms. |
| `ancient_ruins` | Древние руины | Remains of an unknown civilization. Traps and magical anomalies. |
| `shadow_realm` | Теневой мир | A fractured plane where darkness takes shape. Twisted physics and shadow life. |
| `crystal_caves` | Кристальные пещеры | Grottoes lined with glowing crystals. Fragile beauty and volatile magic. |
| `bog` | Топь | Deep black-water quagmires and rotting trees. More **Decay** and **blood** than `swamp`. |

## 3.3 Biome adjacency

For world logic and possible transitions in events:

| Biome | Neighbors |
|-------|-----------|
| `mountains` | `forest`, `deep_mines`, `tundra`, `volcanic` |
| `forest` | `mountains`, `swamp`, `bog`, `desert` (border) |
| `swamp` | `forest`, `bog`, `ocean_coast` (delta) |
| `volcanic` | `mountains`, `desert`, `crystal_caves` |
| `deep_mines` | `mountains`, `crystal_caves`, `shadow_realm` (depths) |
| `desert` | `volcanic`, `ancient_ruins`, `forest` (edge) |
| `tundra` | `mountains`, `ocean_coast` (north) |
| `ocean_coast` | `swamp`, `tundra`, `ancient_ruins` |
| `ancient_ruins` | `desert`, `ocean_coast`, `shadow_realm` |
| `shadow_realm` | `ancient_ruins`, `deep_mines`, `crystal_caves` |
| `crystal_caves` | `volcanic`, `deep_mines`, `shadow_realm` |
| `bog` | `forest`, `swamp` |
