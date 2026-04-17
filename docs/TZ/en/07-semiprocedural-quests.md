# 7. Semi-procedural quest generation

## 7.1 Principle

Quests combine **fixed templates** with catalog data (locations, enemies, resources, clients) so narratives stay coherent while content stays varied.

## 7.2 Quest templates

Each template defines mission **type**, reward **formula**, and required **slots**.

**Examples:**

| Template ID | Type | Title pattern | Description pattern | Base reward |
|-------------|------|---------------|---------------------|-------------|
| `hunt` | Hunt | `Hunt {enemy} at {location}` | `{questGiver} asks you to kill a dangerous beast terrorizing {location}.` | Gold: 50 + tier×20; Rep: 10 |
| `gather` | Gather | `Gather {resource} at {location}` | `{questGiver} needs a batch of {resource}.` | Gold: 30 + rarity; Rep: 5 |
| `explore` | Scout | `Scout: {location}` | `The Guild wants intel on {location}; mark hazards.` | Gold: 80; Rep: 15 + possible key |
| `deliver` | Deliver | `Escort cargo through {location}` | `{questGiver} needs an escort through dangerous ground.` | Gold: 100; Rep: 10 |
| `boss` | Lair | `Clear the {enemy} lair at {location}` | `Locals pooled coin to destroy the {enemy} lair at {location}.` | Gold: 200; Rep: 25; unique resource |

## 7.3 Substitution catalogs

### Clients (QuestGiver)

Static NPC pool with names, roles, optional biome prefs.

```typescript
const questGivers = [
  { id: 'merchant_1', name: 'Торговец из Предместья', role: 'merchant' },
  { id: 'blacksmith_1', name: 'Старый кузнец Грегор', role: 'blacksmith' },
  { id: 'alchemist_1', name: 'Алхимик Лира', role: 'alchemist' },
  // ...
];
```

*(Player-facing names stay Russian in-game; maintainer keys are English.)*

### Enemies

Catalog with biome, tier range, and elemental affinity.

```typescript
interface Enemy {
  id: string;
  name: string;
  description: string;
  biomes: Biome[];
  tierRange: [number, number];
  elementalAffinity: Element[];
  dangerLevel: 1 | 2 | 3 | 4 | 5;
}
```

### Resources

Pulled from `RESOURCE_DEPOT`; generation filters by biome and tier.

## 7.4 Generation algorithm

1. Pick a random **template** (optionally weighted).
2. Pick an **unlocked biome**.
3. Pick a **location** in that biome at a valid **tier** (template-driven or random among unlocked).
4. Resolve **enemy** / **resource** by template type (`hunt` → enemy filter; `gather` → resource filter + `frequency`).
5. Pick a **client** (biome-tied or random).
6. **Fill strings** from templates.
7. **Compute reward** with tier/rarity modifiers.
8. **Persist** to board state until refresh.

## 7.5 Caching & refresh

Generated quests live in **game state** (e.g. localStorage or server) until the board rolls. On refresh, replace the set.
