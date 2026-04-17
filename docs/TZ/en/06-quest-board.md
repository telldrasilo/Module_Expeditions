# 6. Seekers’ Guild quest board

## 6.1 Interaction flow

1. The player opens the **Seekers’ Guild** UI and sees the **quest board**.
2. The board lists available jobs (typically 3–6), refreshing daily (or on a trigger).
3. Each job is a **card** with summary info.
4. The player selects a job and taps **Send seeker**.
5. The system assigns a suitable NPC seeker (or the player picks among available seekers if extended).
6. An expedition **timer** starts.
7. **Random events** appear as text reports during the run.
8. On completion, the player gets a report: loot, weapon condition, rewards.

## 6.2 Quest card fields

| Field | Description | Data source |
|-------|-------------|-------------|
| **Title** | e.g. “Hunt the fire fox in the Heart of Rotwood.” | Template fill |
| **Biome & location** | Biome name + specific site | Location catalog |
| **Client** | Name & role (e.g. “Outskirts merchant”) | NPC pool |
| **Description** | Short narrative hook (2–3 sentences) | Template fill |
| **Risks** | Icons or labels for dangerous elements/enemies | Location + enemies |
| **Expected resources** | Materials with rough odds | Biome + tier filter |
| **Requirements** | Min weapon tier, key items | Location rules |
| **Base reward** | Gold, Guild reputation | Formula |
| **Duration** | Base expedition time | Tier + difficulty |

## 6.3 Board refresh

- The board refreshes **daily** at a fixed time (e.g. 00:00 server).
- On refresh, old incomplete jobs **disappear** (unless a paid “save slot” exists).
- New jobs respect **unlocked biomes/tiers** and any **global events** (if implemented).
