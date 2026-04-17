# 5. Locations & difficulty tiers

## 5.1 Location structure

A **Site** (location) is a concrete place inside a biome with:

- A unique name (e.g. “Heart of Rotwood”).
- A fixed difficulty **tier** (1–5).
- Typical risks (dominant elements, enemy types).
- Optional unlock rules (key, reputation, quest chain).

## 5.2 Difficulty tiers

| Tier | Description | Availability | Example requirements |
|------|-------------|--------------|----------------------|
| 1 | Safe outskirts, simple jobs. | Open immediately for base biomes (`forest`, `mountains`, `swamp`). | Any weapon quality. |
| 2 | Moderately dangerous; basic gear expected. | Open immediately for base biomes. | Weapon with at least one upgrade (or minimum seeker level). |
| 3 | Aggressive fauna and anomalies. | Unlocks after a special Guild job (e.g. “Scout: Eastern Marches”). | Tier-2 weapons; possible route map. |
| 4 | Ruined fortresses, rare lairs, deep ruins. | After several tier-3 jobs + key/artifact. | Tier-3 weapons; special pass. |
| 5 | Legendary sites for prepared seekers only. | Unique chains, rare keys, or global events. | Tier-4 weapons; unique key; high reputation. |

## 5.3 Keys & unlock conditions

Higher tiers or whole biomes may require:

- **Maps & schematics:** loot or vendor items, e.g. “Secret route map to Deep Mines (tier 3).”
- **Pass artifacts:** magical items crossing barriers or appeasing guardians, e.g. “Gatekeeper’s Feather” for high-tier `ancient_ruins`.
- **Reputation & quest chains:** completing a patron’s arc unlocks private grounds or intel.
- **Special tools:** e.g. magnetite-tipped pick to break warded stone in `crystal_caves`.

Keys may be **consumable** or **permanent** per design.

## 5.4 Sample locations (draft)

*A full list will be a separate document; these illustrate structure.*

| ID | Biome | Tier | Name | Description | Risks (elements) |
|----|-------|------|------|-------------|------------------|
| `forest_edge` | `forest` | 1 | Whispering Oaks Verge | Safer forest edge where hunters set snares. | Decay (weak) |
| `forest_heart` | `forest` | 3 | Heart of Rotwood | Tangled roots, heavy spores. | Decay, Shadow |
| `swamp_trail` | `swamp` | 2 | Flooded Trail | Old road sinking in the worst mud. | Decay, Blood |
| `swamp_black` | `swamp` | 4 | Black Mire | Black water, toxic bubbles. | Decay, Blood, Void |
| `mountain_pass` | `mountains` | 1 | Lower Pass | Narrow caravan path between cliffs. | Bone |
| `mountain_peak` | `mountains` | 3 | Stormspire Peak | Summit wrapped in storm clouds. | Lightning, Magnetism |
