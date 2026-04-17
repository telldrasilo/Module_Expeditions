import type { StubResource } from '../types'

export const STUB_RESOURCES: StubResource[] = [
  // ── FOREST ──────────────────────────────────────────────────────
  {
    id: 'mat-rotwood',
    name: 'Гнилое дерево',
    type: 'material',
    biomes: [
      { biome: 'forest', frequency: 'common' },
      { biome: 'swamp', frequency: 'uncommon' },
    ],
  },
  {
    id: 'mat-herbs',
    name: 'Целебные травы',
    type: 'material',
    biomes: [{ biome: 'forest', frequency: 'common' }],
  },
  {
    id: 'mat-dark_resin',
    name: 'Тёмная смола',
    type: 'material',
    biomes: [{ biome: 'forest', frequency: 'uncommon' }],
  },
  {
    id: 'mat-leather_scraps',
    name: 'Кожаные обрезки',
    type: 'material',
    biomes: [
      { biome: 'forest', frequency: 'common' },
      { biome: 'mountains', frequency: 'common' },
      { biome: 'tundra', frequency: 'uncommon' },
    ],
  },
  {
    id: 'mat-fang',
    name: 'Звериный клык',
    type: 'material',
    biomes: [
      { biome: 'forest', frequency: 'uncommon' },
      { biome: 'mountains', frequency: 'uncommon' },
      { biome: 'tundra', frequency: 'uncommon' },
    ],
  },

  // ── MOUNTAINS ──────────────────────────────────────────────────
  {
    id: 'mat-iron_ore',
    name: 'Железная руда',
    type: 'material',
    biomes: [
      { biome: 'mountains', frequency: 'common' },
      { biome: 'deep_mines', frequency: 'common' },
    ],
  },
  {
    id: 'mat-bone_fragment',
    name: 'Костяной фрагмент',
    type: 'material',
    biomes: [
      { biome: 'mountains', frequency: 'uncommon' },
      { biome: 'desert', frequency: 'uncommon' },
      { biome: 'tundra', frequency: 'uncommon' },
      { biome: 'ancient_ruins', frequency: 'uncommon' },
    ],
  },
  {
    id: 'mat-magnetite',
    name: 'Магнетит',
    type: 'material',
    biomes: [
      { biome: 'mountains', frequency: 'rare' },
      { biome: 'deep_mines', frequency: 'uncommon' },
      { biome: 'crystal_caves', frequency: 'uncommon' },
    ],
  },

  // ── SWAMP / BOG ───────────────────────────────────────────────
  {
    id: 'mat-rot_essence',
    name: 'Гнилостная эссенция',
    type: 'material',
    biomes: [
      { biome: 'swamp', frequency: 'common' },
      { biome: 'bog', frequency: 'common' },
    ],
  },
  {
    id: 'mat-blood_moss',
    name: 'Кровавый мох',
    type: 'material',
    biomes: [
      { biome: 'swamp', frequency: 'uncommon' },
      { biome: 'bog', frequency: 'uncommon' },
    ],
  },

  // ── VOLCANIC ───────────────────────────────────────────────────
  {
    id: 'mat-fire_crystal',
    name: 'Огненный кристалл',
    type: 'material',
    biomes: [
      { biome: 'volcanic', frequency: 'uncommon' },
      { biome: 'desert', frequency: 'rare' },
    ],
  },
  {
    id: 'mat-ash_stone',
    name: 'Пепельный камень',
    type: 'material',
    biomes: [
      { biome: 'volcanic', frequency: 'common' },
      { biome: 'desert', frequency: 'uncommon' },
    ],
  },

  // ── DEEP MINES ────────────────────────────────────────────────
  {
    id: 'mat-deep_iron',
    name: 'Глубинное железо',
    type: 'material',
    biomes: [{ biome: 'deep_mines', frequency: 'uncommon' }],
  },
  {
    id: 'mat-void_shard',
    name: 'Осколок бездны',
    type: 'material',
    biomes: [
      { biome: 'deep_mines', frequency: 'rare' },
      { biome: 'shadow_realm', frequency: 'uncommon' },
      { biome: 'ancient_ruins', frequency: 'rare' },
    ],
  },

  // ── DESERT ─────────────────────────────────────────────────────
  {
    id: 'mat-sand_glass',
    name: 'Песчаное стекло',
    type: 'material',
    biomes: [{ biome: 'desert', frequency: 'uncommon' }],
  },

  // ── TUNDRA ─────────────────────────────────────────────────────
  {
    id: 'mat-frost_crystal',
    name: 'Морозный кристалл',
    type: 'material',
    biomes: [{ biome: 'tundra', frequency: 'uncommon' }],
  },
  {
    id: 'mat-giant_bone',
    name: 'Кость великана',
    type: 'material',
    biomes: [{ biome: 'tundra', frequency: 'rare' }],
  },

  // ── OCEAN COAST ───────────────────────────────────────────────
  {
    id: 'mat-pearl_shell',
    name: 'Перламутровая раковина',
    type: 'material',
    biomes: [{ biome: 'ocean_coast', frequency: 'uncommon' }],
  },
  {
    id: 'mat-salt_crystal',
    name: 'Соляной кристалл',
    type: 'material',
    biomes: [{ biome: 'ocean_coast', frequency: 'common' }],
  },

  // ── ANCIENT RUINS ──────────────────────────────────────────────
  {
    id: 'mat-monolith_chip',
    name: 'Осколок монолита',
    type: 'material',
    biomes: [{ biome: 'ancient_ruins', frequency: 'uncommon' }],
  },

  // ── SHADOW REALM ───────────────────────────────────────────────
  {
    id: 'mat-shadow_ichor',
    name: 'Теневая ихор',
    type: 'material',
    biomes: [{ biome: 'shadow_realm', frequency: 'uncommon' }],
  },

  // ── CRYSTAL CAVES ──────────────────────────────────────────────
  {
    id: 'mat-prism_shard',
    name: 'Призменный осколок',
    type: 'material',
    biomes: [{ biome: 'crystal_caves', frequency: 'uncommon' }],
  },

  // ── CONSUMABLES ───────────────────────────────────────────────
  {
    id: 'con-health_potion',
    name: 'Зелье здоровья',
    type: 'consumable',
    biomes: [
      { biome: 'forest', frequency: 'uncommon' },
      { biome: 'swamp', frequency: 'rare' },
    ],
  },
]
