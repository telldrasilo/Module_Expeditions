# Appendix C: Element Catalog & Biome Probabilities

13 elements with their associated biomes and default manifestation probabilities.

## Element table

| Element | ID | Primary biomes | Probability per biome |
|---------|-----|----------------|-----------------------|
| Пламя (Flame) | `flame` | volcanic, desert, deep_mines | volcanic: 0.6, desert: 0.3, deep_mines: 0.15 |
| Мороз (Frost) | `frost` | tundra, deep_mines, mountains | tundra: 0.6, deep_mines: 0.2, mountains: 0.15 |
| Молния (Lightning) | `lightning` | mountains, volcanic, crystal_caves | mountains: 0.35, volcanic: 0.2, crystal_caves: 0.15 |
| Гниль (Decay) | `decay` | swamp, bog, forest | swamp: 0.5, bog: 0.6, forest: 0.2 |
| Кровь (Blood) | `blood` | ancient_ruins, shadow_realm, bog | ancient_ruins: 0.25, shadow_realm: 0.2, bog: 0.35 |
| Кость (Bone) | `bone` | mountains, desert, tundra | mountains: 0.2, desert: 0.25, tundra: 0.2 |
| Разум (Mind) | `mind` | shadow_realm, ancient_ruins, crystal_caves | shadow_realm: 0.3, ancient_ruins: 0.2, crystal_caves: 0.15 |
| Тень (Shadow) | `shadow` | shadow_realm, forest, ancient_ruins | shadow_realm: 0.5, forest: 0.15, ancient_ruins: 0.2 |
| Свет (Light) | `light` | ancient_ruins, crystal_caves, ocean_coast | ancient_ruins: 0.15, crystal_caves: 0.2, ocean_coast: 0.15 |
| Искажение (Distortion) | `distortion` | desert, shadow_realm, ancient_ruins | desert: 0.15, shadow_realm: 0.2, ancient_ruins: 0.15 |
| Магнетизм (Magnetism) | `magnetism` | deep_mines, crystal_caves, mountains | deep_mines: 0.3, crystal_caves: 0.2, mountains: 0.15 |
| Пространство (Space) | `space` | crystal_caves, shadow_realm, ancient_ruins | crystal_caves: 0.15, shadow_realm: 0.15, ancient_ruins: 0.1 |
| Бездна (Void) | `void` | shadow_realm, ocean_coast, deep_mines | shadow_realm: 0.35, ocean_coast: 0.1, deep_mines: 0.1 |

## How probabilities are used

`elementalProbabilities` on `ExpeditionLocation` determines:

1. **Which elements can appear** in environmental events at this location
2. **How likely** each element is to manifest (used in event generation)
3. **Which element** is selected when an environment event doesn't specify `requiredElement`

For MVP locations, probabilities are pre-set based on the table above. Locations only include probabilities for elements listed in their `risks` array.

### Example: Stormspire Peak

```typescript
{
  id: 'mountain_peak',
  risks: ['lightning', 'magnetism'],
  elementalProbabilities: {
    lightning: 0.35,
    magnetism: 0.15,
  },
}
```

### Example: Black Mire

```typescript
{
  id: 'swamp_black',
  risks: ['decay', 'blood', 'void'],
  elementalProbabilities: {
    decay: 0.5,
    blood: 0.25,
    void: 0.1,
  },
}
```

## Biome adjacency

For world logic and potential future multi-biome routes:

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

Not directly used in MVP (no multi-biome routes), but included for future reference and event generation logic.
