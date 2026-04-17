import type { Biome, Element } from '../types'

/**
 * Element catalog — reverse view from BIOMES.dominantElements.
 *
 * NOTE: primaryBiomes and probabilities are derived from biome data.
 * nameRu is the canonical Russian label for each element (also mirrored
 * in ui/shared/styles.ts ELEMENT_STYLE.label for UI rendering).
 */
export interface ElementEntry {
  id: Element
  nameRu: string
  primaryBiomes: Biome[]
  /** Per-biome base probability — derivable from locations' elementalProbabilities. */
  probabilities: Partial<Record<Biome, number>>
}

export const ELEMENTS: ElementEntry[] = [
  {
    id: 'flame',
    nameRu: 'Пламя',
    primaryBiomes: ['volcanic', 'desert', 'deep_mines'],
    probabilities: { volcanic: 0.6, desert: 0.3, deep_mines: 0.15 },
  },
  {
    id: 'frost',
    nameRu: 'Мороз',
    primaryBiomes: ['tundra', 'deep_mines', 'mountains'],
    probabilities: { tundra: 0.6, deep_mines: 0.2, mountains: 0.15 },
  },
  {
    id: 'lightning',
    nameRu: 'Молния',
    primaryBiomes: ['mountains', 'volcanic', 'crystal_caves'],
    probabilities: { mountains: 0.35, volcanic: 0.2, crystal_caves: 0.15 },
  },
  {
    id: 'decay',
    nameRu: 'Гниль',
    primaryBiomes: ['swamp', 'bog', 'forest'],
    probabilities: { swamp: 0.5, bog: 0.6, forest: 0.2 },
  },
  {
    id: 'blood',
    nameRu: 'Кровь',
    primaryBiomes: ['ancient_ruins', 'shadow_realm', 'bog'],
    probabilities: { ancient_ruins: 0.25, shadow_realm: 0.2, bog: 0.35 },
  },
  {
    id: 'bone',
    nameRu: 'Кость',
    primaryBiomes: ['mountains', 'desert', 'tundra'],
    probabilities: { mountains: 0.2, desert: 0.25, tundra: 0.2 },
  },
  {
    id: 'mind',
    nameRu: 'Разум',
    primaryBiomes: ['shadow_realm', 'ancient_ruins', 'crystal_caves'],
    probabilities: { shadow_realm: 0.3, ancient_ruins: 0.2, crystal_caves: 0.15 },
  },
  {
    id: 'shadow',
    nameRu: 'Тень',
    primaryBiomes: ['shadow_realm', 'forest', 'ancient_ruins'],
    probabilities: { shadow_realm: 0.5, forest: 0.15, ancient_ruins: 0.2 },
  },
  {
    id: 'light',
    nameRu: 'Свет',
    primaryBiomes: ['ancient_ruins', 'crystal_caves', 'ocean_coast'],
    probabilities: { ancient_ruins: 0.15, crystal_caves: 0.2, ocean_coast: 0.15 },
  },
  {
    id: 'distortion',
    nameRu: 'Искажение',
    primaryBiomes: ['desert', 'shadow_realm', 'ancient_ruins'],
    probabilities: { desert: 0.15, shadow_realm: 0.2, ancient_ruins: 0.15 },
  },
  {
    id: 'magnetism',
    nameRu: 'Магнетизм',
    primaryBiomes: ['deep_mines', 'crystal_caves', 'mountains'],
    probabilities: { deep_mines: 0.3, crystal_caves: 0.2, mountains: 0.15 },
  },
  {
    id: 'space',
    nameRu: 'Пространство',
    primaryBiomes: ['crystal_caves', 'shadow_realm', 'ancient_ruins'],
    probabilities: { crystal_caves: 0.15, shadow_realm: 0.15, ancient_ruins: 0.1 },
  },
  {
    id: 'void',
    nameRu: 'Бездна',
    primaryBiomes: ['shadow_realm', 'ocean_coast', 'deep_mines'],
    probabilities: { shadow_realm: 0.35, ocean_coast: 0.1, deep_mines: 0.1 },
  },
]
