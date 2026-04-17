# 06. Random Events

## 6.1 Encounter template

```typescript
export interface Encounter {
  id: string
  category: EncounterCategory
  templateText: string            // '{{seeker}} stumbled upon {{enemy}}...'
  allowedBiomes: Biome[]
  allowedTiers: LocationTier[]
  requiredElement?: Element       // If tied to a specific element
  possibleEnemies?: string[]      // For combat category
  possibleResources?: string[]    // For remains, wildlife
  outcomes: EncounterOutcome[]
  weight?: number                 // For weighted random selection
  tags: string[]                  // Semantic tags for filtering
}

export type EncounterCategory =
  | 'combat' | 'environment' | 'remains' | 'wildlife' | 'npc' | 'puzzle'

export interface EncounterOutcome {
  id: string
  description: string
  chance: number                  // 0-1
  effects: EncounterEffects
}
```

## 6.2 Categories

| Category | Description | Typical effects |
|----------|-------------|-----------------|
| `combat` | Hostile encounter | Weapon damage, resources from drops |
| `environment` | Elemental anomaly | Elemental weapon damage |
| `remains` | Ruins, stashes | Resources, keys, curses |
| `wildlife` | Neutral creatures | Rare resources |
| `npc` | Social encounter | Information, reputation |
| `puzzle` | Skill challenge | Valuable resources or traps |

## 6.3 Semantic tag system

Encounters are linked to locations via **tags**. Both encounters and locations carry a `tags: string[]` field. An encounter is eligible for a location if:

- The intersection of `encounter.tags` and `location.tags` is **non-empty**, OR
- `encounter.tags` is **empty** (universal encounter)

This ensures thematic consistency — a "mushroom fog" event only appears in forests and swamps, never in volcanoes.

### Tag examples

**Locations:**

| Location | Tags |
|----------|------|
| Whispering Oaks Verge | `forest`, `edge`, `hunters`, `safe` |
| Heart of Rotwood | `forest`, `dense`, `spores`, `ancient_trees`, `dark` |
| Stormspire Peak | `mountains`, `storm`, `peak`, `lightning`, `exposed` |
| Black Mire | `swamp`, `deep`, `toxic`, `undead`, `dark` |

**Encounters:**

| Encounter | Tags | Rationale |
|-----------|------|-----------|
| Mushroom Fog | `forest`, `spores`, `swamp` | Appears in fungal forests and marshes |
| Lightning Strike | `storm`, `peak`, `exposed` | On peaks and exposed stormy areas |
| Stone Guardian | `ruins`, `ancient`, `stone` | In ruins and ancient places |
| Rotting Bog | `swamp`, `toxic`, `deep` | Deep toxic swamps only |

## 6.4 MVP encounter catalog

| # | Category | Name | Tags | Biomes |
|---|----------|------|------|--------|
| 1 | combat | Predator Ambush | `forest`, `mountains`, `wild` | forest, mountains |
| 2 | combat | Venomous Creature | `swamp`, `toxic` | swamp, bog |
| 3 | combat | Fire Elemental | `volcanic`, `fire`, `heat` | volcanic |
| 4 | combat | Cave Crawler | `mines`, `dark`, `underground` | deep_mines |
| 5 | environment | Mushroom Fog | `forest`, `spores`, `swamp` | forest, swamp |
| 6 | environment | Lightning Strike | `storm`, `peak`, `exposed` | mountains |
| 7 | environment | Lava Flow | `volcanic`, `fire`, `heat` | volcanic |
| 8 | environment | Rockslide | `mountains`, `mines`, `underground` | mountains, deep_mines |
| 9 | remains | Ancient Altar | `ruins`, `ancient`, `forest` | forest, ancient_ruins |
| 10 | remains | Abandoned Mine | `mines`, `underground`, `abandoned` | deep_mines |
| 11 | wildlife | Deer Herd | `forest`, `mountains`, `wild` | forest, mountains |
| 12 | npc | Wounded Traveler | *(empty = universal)* | all |
| 13 | puzzle | Puzzle Ruins | `ruins`, `ancient` | ancient_ruins, deep_mines |

## 6.5 Event resolution flow

When a pre-generated event is revealed (progress crosses `triggerProgress`):

```
1. Look up Encounter by encounterId
2. Display template text in event log (fill placeholders)
3. Look up the pre-selected outcome
4. Apply effects immediately:
   - weaponDamages → append to run's accumulated damages
   - addResources → append to run's accumulated loot
   - seekerInjury → flag on run (affects outcome)
   - timeModifier → adjust expectedEndAt
5. Mark event as resolved
6. Check if weapon durability <= 0 → if so, transition run to 'failed'
```

## 6.6 Template text substitution

Placeholders in `templateText` and `outcome.description` are replaced at generation time:

| Placeholder | Replaced with |
|-------------|---------------|
| `{{seeker}}` | Seeker name (stub: 'Искатель') |
| `{{enemy}}` | Enemy name |
| `{{element}}` | Element RU name |
| `{{location}}` | Location name |
| `{{resource}}` | Resource name |
| `{{questGiver}}` | Quest giver name |
