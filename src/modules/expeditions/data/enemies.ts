import type { Enemy } from '../types'

/**
 * Enemy catalog — enemies are tied to biomes and tier ranges.
 *
 * Each enemy has attacks (physical or elemental), danger level (1-5),
 * possible drops, and semantic tags for encounter matching.
 */

export const ENEMIES: Enemy[] = [
  // ═══════════════════════════════════════════════════════════════════════
  //  FOREST
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'wolf',
    name: 'Лесной волк',
    description:
      'Стайный хищник северных лесов и горных предгорий. Охотится сворами, загоняя добычу в засады.',
    biomes: ['forest', 'mountains'],
    tierRange: [1, 2],
    attacks: [{ type: 'physical' }],
    dangerLevel: 1,
    possibleDrops: [
      { materialId: 'mat-leather_scraps', chance: 0.4, amount: [1, 2] },
      { materialId: 'mat-fang', chance: 0.3, amount: [1, 1] },
    ],
    tags: ['wild', 'pack'],
  },

  {
    id: 'rot_fox',
    name: 'Гнилая лиса',
    description:
      'Лиса, заражённая лесной гнилью. Её укус передаёт заразу, а шерсть источает запах прелой листвы.',
    biomes: ['forest', 'swamp'],
    tierRange: [2, 3],
    attacks: [{ type: 'elemental', element: 'decay' }],
    dangerLevel: 2,
    possibleDrops: [
      { materialId: 'mat-rot_essence', chance: 0.5, amount: [1, 2] },
    ],
    tags: ['wild', 'decay'],
  },

  {
    id: 'fire_fox',
    name: 'Огненная лиса',
    description:
      'Пепельно-рыжая лиса с вулканских склонов. В моменты опасности её шерсть вспыхивает жарким пламенем.',
    biomes: ['forest', 'volcanic'],
    tierRange: [2, 3],
    attacks: [{ type: 'elemental', element: 'flame' }],
    dangerLevel: 2,
    possibleDrops: [
      { materialId: 'mat-fire_crystal', chance: 0.3, amount: [1, 1] },
    ],
    tags: ['wild', 'fire'],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  MOUNTAINS
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'stone_guardian',
    name: 'Каменный страж',
    description:
      'Древняя конструкция Строителей Монолитов, всё ещё охраняющая заброшенные руины. Магнетизм позволяет ей притягивать оружие врагов.',
    biomes: ['mountains', 'ancient_ruins'],
    tierRange: [3, 4],
    attacks: [{ type: 'physical' }, { type: 'elemental', element: 'magnetism' }],
    dangerLevel: 3,
    possibleDrops: [
      { materialId: 'mat-magnetite', chance: 0.5, amount: [1, 2] },
      { materialId: 'mat-bone_fragment', chance: 0.3, amount: [1, 1] },
    ],
    tags: ['ancient', 'stone', 'guardian'],
  },

  {
    id: 'thunder_eagle',
    name: 'Грозовой орёл',
    description:
      'Хищная птица Пика Гроз, в гнёздах которой скапливается магнитная руда. Атакует молниями, пикируя с неба.',
    biomes: ['mountains'],
    tierRange: [3, 3],
    attacks: [{ type: 'elemental', element: 'lightning' }],
    dangerLevel: 3,
    possibleDrops: [
      { materialId: 'mat-magnetite', chance: 0.2, amount: [1, 1] },
    ],
    tags: ['flying', 'storm'],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  SWAMP
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'swamp_leech',
    name: 'Болотный пиявочник',
    description:
      'Крупное членистоногое болотных топей. Присасывается к жертве и высасывает кровь, ослабляя даже закованных в броню воинов.',
    biomes: ['swamp', 'bog'],
    tierRange: [2, 3],
    attacks: [{ type: 'physical' }, { type: 'elemental', element: 'blood' }],
    dangerLevel: 2,
    possibleDrops: [
      { materialId: 'mat-blood_moss', chance: 0.4, amount: [1, 2] },
    ],
    tags: ['aquatic', 'blood'],
  },

  {
    id: 'void_wraith',
    name: 'Бездненный призрак',
    description:
      'Порождение Бездны, проявляющееся в глубинах шахт и на границах болот. Его прикосновение вытягивает жизнь, а удары проходят сквозь броню.',
    biomes: ['deep_mines', 'swamp'],
    tierRange: [4, 4],
    attacks: [{ type: 'elemental', element: 'void' }, { type: 'physical' }],
    dangerLevel: 4,
    possibleDrops: [
      { materialId: 'mat-void_shard', chance: 0.3, amount: [1, 1] },
    ],
    tags: ['undead', 'void', 'dark'],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  VOLCANIC
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'lava_salamander',
    name: 'Лавовая саламандра',
    description:
      'Огненная ящерица, обитающая в лавовых трещинах Игниррата. Её тело покрыто застывшей коркой пепла, а из пасти вырывается пламя.',
    biomes: ['volcanic'],
    tierRange: [3, 4],
    attacks: [{ type: 'elemental', element: 'flame' }],
    dangerLevel: 3,
    possibleDrops: [
      { materialId: 'mat-fire_crystal', chance: 0.5, amount: [1, 2] },
      { materialId: 'mat-ash_stone', chance: 0.4, amount: [1, 3] },
    ],
    tags: ['fire', 'heat'],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  DEEP MINES
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'mine_crawler',
    name: 'Шахтный ползун',
    description:
      'Слепое членистоногое, обитающее в верхних ярусах шахт. Нападает из засады, бросаясь на проходчиков из темноты.',
    biomes: ['deep_mines'],
    tierRange: [1, 3],
    attacks: [{ type: 'physical' }],
    dangerLevel: 2,
    possibleDrops: [
      { materialId: 'mat-iron_ore', chance: 0.4, amount: [1, 2] },
    ],
    tags: ['underground', 'insect'],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  DESERT — NEW
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'sand_wurm',
    name: 'Песчаный червь',
    description:
      'Гигантский червь, обитающий под дюнами Пепельной пустоши. Чувствует вибрацию шагов за сотни метров и атакует из-под земли.',
    biomes: ['desert'],
    tierRange: [2, 4],
    attacks: [{ type: 'physical' }, { type: 'elemental', element: 'distortion' }],
    dangerLevel: 3,
    possibleDrops: [
      { materialId: 'mat-bone_fragment', chance: 0.4, amount: [1, 3] },
      { materialId: 'mat-ash_stone', chance: 0.3, amount: [1, 2] },
    ],
    tags: ['sand', 'underground', 'beast'],
  },

  {
    id: 'mirage_serpent',
    name: 'Миражный змей',
    description:
      'Полупрозрачный змей, сотканный из искажённого пространства. Его укус не ранит тело — он ранит реальность вокруг оружия.',
    biomes: ['desert'],
    tierRange: [3, 4],
    attacks: [{ type: 'elemental', element: 'distortion' }],
    dangerLevel: 3,
    possibleDrops: [
      { materialId: 'mat-bone_fragment', chance: 0.3, amount: [1, 2] },
    ],
    tags: ['desert', 'distortion', 'ethereal'],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  TUNDRA — NEW
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'frost_wraith',
    name: 'Ледяной призрак',
    description:
      'Дух великана, погребённого под льдом тысячелетия назад. Его присутствие замораживает воздух, а касание обжигает холодом.',
    biomes: ['tundra'],
    tierRange: [3, 4],
    attacks: [{ type: 'elemental', element: 'frost' }],
    dangerLevel: 4,
    possibleDrops: [
      { materialId: 'mat-bone_fragment', chance: 0.5, amount: [2, 4] },
    ],
    tags: ['undead', 'cold', 'giant'],
  },

  {
    id: 'ice_wolf',
    name: 'Ледяной волк',
    description:
      'Белоснежный хищник Крижаних пусток. Стая окружает жертву, отрезая пути отхода, и нападает из метели.',
    biomes: ['tundra', 'mountains'],
    tierRange: [2, 3],
    attacks: [{ type: 'physical' }, { type: 'elemental', element: 'frost' }],
    dangerLevel: 2,
    possibleDrops: [
      { materialId: 'mat-leather_scraps', chance: 0.4, amount: [1, 2] },
      { materialId: 'mat-fang', chance: 0.3, amount: [1, 1] },
    ],
    tags: ['wild', 'pack', 'cold'],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  OCEAN COAST — NEW
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'deep_one',
    name: 'Глубоководный',
    description:
      'Амфибия из океанских глубин, выходящая на берег в шторм. Её щупальца покрыты присосками, выделяющими бездненную слизь.',
    biomes: ['ocean_coast'],
    tierRange: [3, 4],
    attacks: [{ type: 'physical' }, { type: 'elemental', element: 'void' }],
    dangerLevel: 4,
    possibleDrops: [
      { materialId: 'mat-void_shard', chance: 0.2, amount: [1, 1] },
    ],
    tags: ['aquatic', 'void', 'deep'],
  },

  {
    id: 'salt_crab',
    name: 'Соляной краб',
    description:
      'Исполинский краб скалистых берегов. Панцирь из кристаллизованной соли твёрже железа, а клешни крушат камень.',
    biomes: ['ocean_coast'],
    tierRange: [1, 2],
    attacks: [{ type: 'physical' }],
    dangerLevel: 2,
    possibleDrops: [
      { materialId: 'mat-bone_fragment', chance: 0.3, amount: [1, 2] },
    ],
    tags: ['aquatic', 'crustacean'],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  ANCIENT RUINS — NEW
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'mind_flayer',
    name: 'Пожиратель разума',
    description:
      'Порождение ловушек Монолитов, обретшее собственную волю. Атакует разум, заставляя оружие бить мимо, а руки — дрожать.',
    biomes: ['ancient_ruins'],
    tierRange: [3, 4],
    attacks: [{ type: 'elemental', element: 'mind' }, { type: 'elemental', element: 'distortion' }],
    dangerLevel: 4,
    possibleDrops: [
      { materialId: 'mat-magnetite', chance: 0.4, amount: [1, 2] },
      { materialId: 'mat-void_shard', chance: 0.15, amount: [1, 1] },
    ],
    tags: ['ancient', 'mind', 'horror'],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  SHADOW REALM — NEW
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'shadow_stalker',
    name: 'Теневой охотник',
    description:
      'Существо из чистой тени, обретшее форму хищника. Нападает из углов, где свет не достаёт, и тает при столкновении с ярким светом.',
    biomes: ['shadow_realm'],
    tierRange: [4, 5],
    attacks: [{ type: 'elemental', element: 'shadow' }, { type: 'physical' }],
    dangerLevel: 4,
    possibleDrops: [
      { materialId: 'mat-void_shard', chance: 0.25, amount: [1, 1] },
    ],
    tags: ['shadow', 'hunter', 'ethereal'],
  },

  {
    id: 'void_walker',
    name: 'Бездненный ходок',
    description:
      'Человекоподобная фигура, сотканная из бездны. Шагает сквозь стены, а его руки — провалы в никуда.',
    biomes: ['shadow_realm'],
    tierRange: [4, 5],
    attacks: [{ type: 'elemental', element: 'void' }, { type: 'elemental', element: 'shadow' }],
    dangerLevel: 5,
    possibleDrops: [
      { materialId: 'mat-void_shard', chance: 0.4, amount: [1, 2] },
    ],
    tags: ['void', 'shadow', 'humanoid'],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  CRYSTAL CAVES — NEW
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'crystal_golem',
    name: 'Кристальный голем',
    description:
      'Живой кристалл, выросший из породы пещер. При приближении начинает резонировать, накапливая смертельный заряд молний.',
    biomes: ['crystal_caves'],
    tierRange: [3, 4],
    attacks: [{ type: 'elemental', element: 'lightning' }, { type: 'physical' }],
    dangerLevel: 3,
    possibleDrops: [
      { materialId: 'mat-magnetite', chance: 0.4, amount: [1, 2] },
    ],
    tags: ['crystal', 'lightning', 'construct'],
  },

  {
    id: 'prism_spider',
    name: 'Призменный паук',
    description:
      'Многоглазый паук, чьё тело преломляет свет. Плетёт сети из кристаллических нитей, которые режут сталь.',
    biomes: ['crystal_caves'],
    tierRange: [2, 3],
    attacks: [{ type: 'physical' }, { type: 'elemental', element: 'lightning' }],
    dangerLevel: 2,
    possibleDrops: [
      { materialId: 'mat-magnetite', chance: 0.3, amount: [1, 1] },
    ],
    tags: ['crystal', 'spider', 'light'],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  BOSS ENEMIES — dangerLevel 5
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'boss_kornegnill',
    name: 'Корнегниль',
    description:
      'Сердце леса обрело волю. Гигантский корневой комплекс, осознавший себя, раскинул щупальца гнили на десятки акров. Древний, голодный, терпеливый.',
    biomes: ['forest'],
    tierRange: [4, 5],
    attacks: [
      { type: 'elemental', element: 'decay' },
      { type: 'elemental', element: 'shadow' },
      { type: 'physical' },
    ],
    dangerLevel: 5,
    possibleDrops: [
      { materialId: 'mat-rot_essence', chance: 0.8, amount: [3, 5] },
      { materialId: 'mat-dark_resin', chance: 0.6, amount: [2, 4] },
      { materialId: 'mat-void_shard', chance: 0.2, amount: [1, 1] },
    ],
    tags: ['boss', 'ancient', 'decay', 'forest'],
  },

  {
    id: 'boss_storm_lord',
    name: 'Повелитель гроз',
    description:
      'Бессмертная сущность Пика Гроз, живущая в вечной буре. Его тело — чистая молния, а голос — раскат грома. Громоотвод Монолитов — его темница и трон.',
    biomes: ['mountains'],
    tierRange: [4, 5],
    attacks: [
      { type: 'elemental', element: 'lightning' },
      { type: 'elemental', element: 'magnetism' },
      { type: 'physical' },
    ],
    dangerLevel: 5,
    possibleDrops: [
      { materialId: 'mat-magnetite', chance: 0.8, amount: [3, 5] },
      { materialId: 'mat-void_shard', chance: 0.3, amount: [1, 2] },
    ],
    tags: ['boss', 'storm', 'lightning', 'ancient'],
  },

  {
    id: 'boss_plague_mother',
    name: 'Матерь чумы',
    description:
      'Источник Болотной чумы — древняя тварь, спящая на дне Чёрной Топи. Её дыхание — миазмы, касание — гниль, а пробуждение — смерть для всего живого.',
    biomes: ['swamp'],
    tierRange: [4, 5],
    attacks: [
      { type: 'elemental', element: 'decay' },
      { type: 'elemental', element: 'blood' },
      { type: 'elemental', element: 'void' },
    ],
    dangerLevel: 5,
    possibleDrops: [
      { materialId: 'mat-blood_moss', chance: 0.7, amount: [3, 5] },
      { materialId: 'mat-rot_essence', chance: 0.7, amount: [2, 4] },
      { materialId: 'mat-void_shard', chance: 0.3, amount: [1, 2] },
    ],
    tags: ['boss', 'disease', 'undead', 'void'],
  },

  {
    id: 'boss_ignirrat_heart',
    name: 'Сердце Игниррата',
    description:
      'Огненный элементаль, обитающий в жерле вулкана. Когда Игниррат просыпается — это не извержение, а его гнев. Расплавленная порода — его кровь.',
    biomes: ['volcanic'],
    tierRange: [4, 5],
    attacks: [
      { type: 'elemental', element: 'flame' },
      { type: 'elemental', element: 'flame' },
      { type: 'physical' },
    ],
    dangerLevel: 5,
    possibleDrops: [
      { materialId: 'mat-fire_crystal', chance: 0.8, amount: [3, 6] },
      { materialId: 'mat-ash_stone', chance: 0.7, amount: [4, 8] },
      { materialId: 'mat-void_shard', chance: 0.2, amount: [1, 1] },
    ],
    tags: ['boss', 'fire', 'elemental', 'ancient'],
  },

  {
    id: 'boss_void_depths',
    name: 'Бездненный колосс',
    description:
      'То, что ждёт в самом низу Великих Шахт. Глубинный горизонт — не конец: за ним — Бездна, а в ней — Он. Колосс из тьмы и магнетита, ростом с крепостную башню.',
    biomes: ['deep_mines'],
    tierRange: [5, 5],
    attacks: [
      { type: 'elemental', element: 'void' },
      { type: 'elemental', element: 'magnetism' },
      { type: 'physical' },
    ],
    dangerLevel: 5,
    possibleDrops: [
      { materialId: 'mat-void_shard', chance: 0.7, amount: [2, 4] },
      { materialId: 'mat-magnetite', chance: 0.7, amount: [3, 5] },
      { materialId: 'mat-deep_iron', chance: 0.6, amount: [2, 4] },
    ],
    tags: ['boss', 'void', 'depths', 'ancient'],
  },
]
