import type { Encounter } from '../types'

/**
 * Encounter catalog — biome-tagged random events.
 *
 * Each encounter is filtered by biome, tier, and tag intersection with
 * the expedition's location. Biome-specific encounters carry the biome
 * as a tag and are only available in that biome.
 *
 * Categories: combat | environment | remains | wildlife | npc | puzzle | biome_specific
 */

export const ENCOUNTERS: Encounter[] = [
  // ═══════════════════════════════════════════════════════════════════════
  //  COMBAT — generic encounters available across biomes
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'predator_ambush',
    category: 'combat',
    templateText: 'Искатель попал в засаду хищника!',
    allowedBiomes: ['forest', 'mountains'],
    allowedTiers: [1, 2, 3],
    possibleEnemies: ['wolf', 'rot_fox', 'thunder_eagle'],
    weight: 10,
    tags: ['forest', 'mountains', 'wild'],
    outcomes: [
      {
        id: 'fight_win',
        description: 'Искатель отбил атаку хищника. Кровь на клинке, но металл цел.',
        chance: 0.6,
        effects: {
          weaponDamages: [
            { type: 'physical', severity: 1, source: 'predator_ambush' },
          ],
        },
      },
      {
        id: 'fight_tough',
        description:
          'Жестокая схватка! Хищник не отступал, и оружие приняло на себя удары клыков и когтей.',
        chance: 0.3,
        effects: {
          weaponDamages: [
            { type: 'physical', severity: 2, source: 'predator_ambush' },
          ],
        },
      },
      {
        id: 'fight_bad',
        description:
          'Хищник оказался сильнее ожидаемого. Тяжёлый удар сбил искателя с ног!',
        chance: 0.1,
        effects: {
          weaponDamages: [
            { type: 'physical', severity: 3, source: 'predator_ambush' },
          ],
          seekerInjury: true,
        },
      },
    ],
  },

  {
    id: 'venomous_creature',
    category: 'combat',
    templateText: 'Ядовитое существо преградило путь!',
    allowedBiomes: ['swamp', 'bog'],
    allowedTiers: [2, 3, 4],
    possibleEnemies: ['swamp_leech', 'rot_fox'],
    weight: 8,
    tags: ['swamp', 'toxic'],
    outcomes: [
      {
        id: 'venom_dodge',
        description: 'Искатель уклонился от ядовитого удара. Едкая слюна прошипела на камнях.',
        chance: 0.5,
        effects: {},
      },
      {
        id: 'venom_hit',
        description: 'Ядовитое прикосновение обожгло металл — следы кислоты на клинке!',
        chance: 0.35,
        effects: {
          weaponDamages: [
            {
              type: 'elemental',
              element: 'blood',
              severity: 1,
              source: 'venomous_creature',
            },
          ],
        },
      },
      {
        id: 'venom_bad',
        description: 'Концентрированный яд разъел металл! Оружие покрыто язвами.',
        chance: 0.15,
        effects: {
          weaponDamages: [
            {
              type: 'elemental',
              element: 'blood',
              severity: 2,
              source: 'venomous_creature',
            },
          ],
        },
      },
    ],
  },

  {
    id: 'fire_elemental',
    category: 'combat',
    templateText: 'Огненный элементаль вырвался из трещины!',
    allowedBiomes: ['volcanic'],
    allowedTiers: [2, 3, 4],
    possibleEnemies: ['fire_fox', 'lava_salamander'],
    weight: 7,
    tags: ['volcanic', 'fire', 'heat'],
    outcomes: [
      {
        id: 'fire_resist',
        description: 'Искатель ушёл от огненной струи. Жар опалил бороду, но оружие цело.',
        chance: 0.4,
        effects: {},
      },
      {
        id: 'fire_hit',
        description: 'Пламя опалило оружие! Металл раскалился докрасна.',
        chance: 0.4,
        effects: {
          weaponDamages: [
            {
              type: 'elemental',
              element: 'flame',
              severity: 2,
              source: 'fire_elemental',
            },
          ],
        },
      },
      {
        id: 'fire_bad',
        description: 'Оружие серьёзно обожжено! Закалка разрушена, кромка потемнела.',
        chance: 0.2,
        effects: {
          weaponDamages: [
            {
              type: 'elemental',
              element: 'flame',
              severity: 3,
              source: 'fire_elemental',
            },
          ],
        },
      },
    ],
  },

  {
    id: 'cave_crawler',
    category: 'combat',
    templateText: 'Шахтный ползун напал из темноты!',
    allowedBiomes: ['deep_mines'],
    allowedTiers: [1, 2, 3],
    possibleEnemies: ['mine_crawler'],
    weight: 8,
    tags: ['mines', 'dark', 'underground'],
    outcomes: [
      {
        id: 'crawler_dodge',
        description: 'Искатель увернулся от когтей ползуна. Слепая тварь прошипела и уползла.',
        chance: 0.5,
        effects: {},
      },
      {
        id: 'crawler_hit',
        description: 'Когти ползуна оставили глубокие зарубки на оружии. Хитин крепче железа!',
        chance: 0.4,
        effects: {
          weaponDamages: [
            { type: 'physical', severity: 1, source: 'cave_crawler' },
          ],
        },
      },
      {
        id: 'crawler_bad',
        description: 'Ползун вырвал оружие из рук! Пришлось подбирать из-под камней.',
        chance: 0.1,
        effects: {
          weaponDamages: [
            { type: 'physical', severity: 2, source: 'cave_crawler' },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  COMBAT — biome-specific encounters
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'sand_wurm_attack',
    category: 'combat',
    templateText: 'Песчаный червь вынырнул из-под дюн!',
    allowedBiomes: ['desert'],
    allowedTiers: [2, 3, 4],
    possibleEnemies: ['sand_wurm'],
    weight: 8,
    tags: ['desert', 'sand', 'underground'],
    outcomes: [
      {
        id: 'wurm_dodge',
        description: 'Червь пронёсся мимо, обдав искателя песком. Удалось отскочить!',
        chance: 0.45,
        effects: {},
      },
      {
        id: 'wurm_hit',
        description: 'Жвала червя сомкнулись на оружии! Кислотная слюна разъедает сталь.',
        chance: 0.4,
        effects: {
          weaponDamages: [
            { type: 'physical', severity: 2, source: 'sand_wurm' },
          ],
        },
      },
      {
        id: 'wurm_bad',
        description: 'Червь целиком заглотил оружие! Едва вырвали из пищевода.',
        chance: 0.15,
        effects: {
          weaponDamages: [
            { type: 'physical', severity: 3, source: 'sand_wurm' },
          ],
        },
      },
    ],
  },

  {
    id: 'frost_wraith_encounter',
    category: 'combat',
    templateText: 'Ледяной призрак возник из метели!',
    allowedBiomes: ['tundra'],
    allowedTiers: [3, 4, 5],
    possibleEnemies: ['frost_wraith'],
    weight: 7,
    tags: ['tundra', 'cold', 'undead'],
    outcomes: [
      {
        id: 'frost_resist',
        description: 'Призрак прошёл сквозь искателя, не причинив вреда — холод не коснулся.',
        chance: 0.4,
        effects: {},
      },
      {
        id: 'frost_touch',
        description: 'Ледяное прикосновение обожгло! Иней покрыл оружие.',
        chance: 0.4,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'frost', severity: 2, source: 'frost_wraith' },
          ],
        },
      },
      {
        id: 'frost_freeze',
        description: 'Призрак заморозил оружие! Рукоять покрылась коркой льда.',
        chance: 0.2,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'frost', severity: 3, source: 'frost_wraith' },
          ],
          seekerInjury: true,
        },
      },
    ],
  },

  {
    id: 'deep_one_assault',
    category: 'combat',
    templateText: 'Глубоководная тень поднялась из пены!',
    allowedBiomes: ['ocean_coast'],
    allowedTiers: [3, 4, 5],
    possibleEnemies: ['deep_one'],
    weight: 7,
    tags: ['ocean', 'water', 'void'],
    outcomes: [
      {
        id: 'deep_one_repel',
        description: 'Искатель отогнал тень светом факела. Она с шипением отступила в воду.',
        chance: 0.4,
        effects: {},
      },
      {
        id: 'deep_one_grab',
        description: 'Щупальце схватило оружие! Бездненный холод обжигает.',
        chance: 0.4,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'void', severity: 2, source: 'deep_one' },
          ],
        },
      },
      {
        id: 'deep_one_drag',
        description: 'Тень потянула на дно! Едва вырвались — но оружие изрядно пострадало.',
        chance: 0.2,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'void', severity: 3, source: 'deep_one' },
          ],
          seekerInjury: true,
        },
      },
    ],
  },

  {
    id: 'guardian_patrol',
    category: 'combat',
    templateText: 'Каменный страж Монолитов преградил путь!',
    allowedBiomes: ['ancient_ruins'],
    allowedTiers: [3, 4, 5],
    possibleEnemies: ['stone_guardian'],
    weight: 8,
    tags: ['ruins', 'ancient', 'guardian', 'stone'],
    outcomes: [
      {
        id: 'guardian_evade',
        description: 'Искатель проскользнул мимо — страж не заметил. Его глаза — пустые прорези.',
        chance: 0.35,
        effects: {},
      },
      {
        id: 'guardian_fight',
        description: 'Страж атаковал! Магнетизм притянул оружие, пришлось вырывать силой.',
        chance: 0.45,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'magnetism', severity: 2, source: 'guardian_patrol' },
          ],
        },
      },
      {
        id: 'guardian_overwhelm',
        description: 'Страж оказался мощнее ожидаемого! Магнитное поле вырвало оружие из рук.',
        chance: 0.2,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'magnetism', severity: 3, source: 'guardian_patrol' },
            { type: 'physical', severity: 2, source: 'guardian_patrol' },
          ],
          seekerInjury: true,
        },
      },
    ],
  },

  {
    id: 'shadow_stalker_ambush',
    category: 'combat',
    templateText: 'Теневой охотник отделился от стены!',
    allowedBiomes: ['shadow_realm'],
    allowedTiers: [4, 5],
    possibleEnemies: ['shadow_stalker'],
    weight: 8,
    tags: ['shadow', 'dark', 'living'],
    outcomes: [
      {
        id: 'shadow_evade',
        description: 'Искатель выставил свет — тень отступила, шипя.',
        chance: 0.35,
        effects: {},
      },
      {
        id: 'shadow_strike',
        description: 'Теневой коготь рассёк воздух! Оружие покрылось тёмным налётом.',
        chance: 0.45,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'shadow', severity: 2, source: 'shadow_stalker' },
          ],
        },
      },
      {
        id: 'shadow_overwhelm',
        description: 'Тень обхватила оружие! Бездна сочится из клинка, как смола.',
        chance: 0.2,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'shadow', severity: 3, source: 'shadow_stalker' },
            { type: 'elemental', element: 'void', severity: 1, source: 'shadow_stalker' },
          ],
        },
      },
    ],
  },

  {
    id: 'crystal_golem_attack',
    category: 'combat',
    templateText: 'Кристальный голем преградил путь — резонанс бьёт в уши!',
    allowedBiomes: ['crystal_caves'],
    allowedTiers: [3, 4, 5],
    possibleEnemies: ['crystal_golem'],
    weight: 7,
    tags: ['crystal', 'lightning', 'underground'],
    outcomes: [
      {
        id: 'golem_dodge',
        description: 'Искатель отступил — голем медленный. Кристаллы мерцают недобро.',
        chance: 0.4,
        effects: {},
      },
      {
        id: 'golem_shock',
        description: 'Голем разрядился! Молния прошила оружие насквозь.',
        chance: 0.4,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'lightning', severity: 2, source: 'crystal_golem' },
          ],
        },
      },
      {
        id: 'golem_shatter',
        description: 'Резонансный удар! Кристалл взорвался, осколки впились в оружие.',
        chance: 0.2,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'lightning', severity: 2, source: 'crystal_golem' },
            { type: 'physical', severity: 2, source: 'crystal_golem' },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  ENVIRONMENT — natural hazards
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'mushroom_fog',
    category: 'environment',
    templateText: 'Грибной туман окутал путь искателя...',
    allowedBiomes: ['forest', 'swamp'],
    allowedTiers: [2, 3],
    requiredElement: 'decay',
    weight: 6,
    tags: ['forest', 'spores', 'swamp'],
    outcomes: [
      {
        id: 'fog_pass',
        description: 'Споры осели на оружие, но быстро смылись дождём. Повезло.',
        chance: 0.5,
        effects: {},
      },
      {
        id: 'fog_damage',
        description:
          'Грибковые споры въелись в металл — следы гнили! Запах прелой листвы не выветрить.',
        chance: 0.4,
        effects: {
          weaponDamages: [
            {
              type: 'elemental',
              element: 'decay',
              severity: 1,
              source: 'mushroom_fog',
            },
          ],
        },
      },
      {
        id: 'fog_loot',
        description: 'В тумане искатель нашёл редкие грибы! Алхимики за них хорошо платят.',
        chance: 0.1,
        effects: {
          addResources: [{ resourceId: 'mat-herbs', amount: 2 }],
        },
      },
    ],
  },

  {
    id: 'lightning_strike',
    category: 'environment',
    templateText: 'Молния ударила рядом с искателем!',
    allowedBiomes: ['mountains'],
    allowedTiers: [3, 4],
    requiredElement: 'lightning',
    weight: 5,
    tags: ['storm', 'peak', 'exposed'],
    outcomes: [
      {
        id: 'lightning_near',
        description:
          'Молния ударила в камень рядом — искателя лишь оглушило. Уши звенят.',
        chance: 0.6,
        effects: {},
      },
      {
        id: 'lightning_hit',
        description: 'Разряд прошёл через оружие! Магнитный след на лезвии.',
        chance: 0.3,
        effects: {
          weaponDamages: [
            {
              type: 'elemental',
              element: 'lightning',
              severity: 2,
              source: 'lightning_strike',
            },
          ],
        },
      },
      {
        id: 'lightning_bad',
        description:
          'Прямое попадание молнии! Оружие трещит от напряжения, закалка нарушена.',
        chance: 0.1,
        effects: {
          weaponDamages: [
            {
              type: 'elemental',
              element: 'lightning',
              severity: 3,
              source: 'lightning_strike',
            },
          ],
        },
      },
    ],
  },

  {
    id: 'lava_flow',
    category: 'environment',
    templateText: 'Поток лавы перегородил путь!',
    allowedBiomes: ['volcanic'],
    allowedTiers: [2, 3],
    requiredElement: 'flame',
    weight: 5,
    tags: ['volcanic', 'fire', 'heat'],
    outcomes: [
      {
        id: 'lava_dodge',
        description: 'Искатель нашёл обходной путь по остывшей корке. Жар невыносимый.',
        chance: 0.5,
        effects: {},
      },
      {
        id: 'lava_hit',
        description: 'Брызги лавы обожгли оружие! Металл потемнел от жара.',
        chance: 0.4,
        effects: {
          weaponDamages: [
            {
              type: 'elemental',
              element: 'flame',
              severity: 1,
              source: 'lava_flow',
            },
          ],
        },
      },
      {
        id: 'lava_loot',
        description: 'В остывшей лаве блеснул огненный кристалл! Редкая находка.',
        chance: 0.1,
        effects: {
          addResources: [{ resourceId: 'mat-fire_crystal', amount: 1 }],
        },
      },
    ],
  },

  {
    id: 'rockslide',
    category: 'environment',
    templateText: 'Камнепад!',
    allowedBiomes: ['mountains', 'deep_mines'],
    allowedTiers: [2, 3],
    weight: 6,
    tags: ['mountains', 'mines', 'underground'],
    outcomes: [
      {
        id: 'rock_dodge',
        description: 'Искатель успел укрыться в нише. Камни просвистели мимо.',
        chance: 0.5,
        effects: {},
      },
      {
        id: 'rock_hit',
        description: 'Камень ударил по оружию! Зарубка на лезвии.',
        chance: 0.35,
        effects: {
          weaponDamages: [
            { type: 'physical', severity: 1, source: 'rockslide' },
          ],
        },
      },
      {
        id: 'rock_bad',
        description: 'Тяжёлый обвал! Оружию досталось — лезвие погнулось.',
        chance: 0.15,
        effects: {
          weaponDamages: [
            { type: 'physical', severity: 2, source: 'rockslide' },
          ],
        },
      },
    ],
  },

  // ── Environment: biome-specific ──────────────────────────────────────

  {
    id: 'sandstorm',
    category: 'environment',
    templateText: 'Песчаная буря налетела из ниоткуда!',
    allowedBiomes: ['desert'],
    allowedTiers: [2, 3, 4],
    requiredElement: 'distortion',
    weight: 6,
    tags: ['desert', 'sand', 'storm'],
    outcomes: [
      {
        id: 'sandstorm_shelter',
        description: 'Искатель укрылся за дюной. Песок свирепствует, но не достаёт.',
        chance: 0.5,
        effects: {},
      },
      {
        id: 'sandstorm_scour',
        description: 'Песок ободрал оружие! Мелкие царапины, но металл стёрт.',
        chance: 0.35,
        effects: {
          weaponDamages: [
            { type: 'physical', severity: 1, source: 'sandstorm' },
            { type: 'elemental', element: 'distortion', severity: 1, source: 'sandstorm' },
          ],
        },
      },
      {
        id: 'sandstorm_lost',
        description: 'Бурая стена песка! Искатель сбился с пути и потерял время.',
        chance: 0.15,
        effects: {
          timeModifier: 0.2,
          weaponDamages: [
            { type: 'elemental', element: 'distortion', severity: 2, source: 'sandstorm' },
          ],
        },
      },
    ],
  },

  {
    id: 'frost_snap',
    category: 'environment',
    templateText: 'Температура рухнула! Мгновенный мороз.',
    allowedBiomes: ['tundra'],
    allowedTiers: [2, 3, 4],
    requiredElement: 'frost',
    weight: 6,
    tags: ['tundra', 'cold', 'ice'],
    outcomes: [
      {
        id: 'frost_warm',
        description: 'Искатель успел укрыться и разжечь огонь. Руки трясутся, но целы.',
        chance: 0.5,
        effects: {},
      },
      {
        id: 'frost_brittle',
        description: 'Мороз сделал металл хрупким! При ударе — микротрещины.',
        chance: 0.35,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'frost', severity: 2, source: 'frost_snap' },
          ],
        },
      },
      {
        id: 'frost_severe',
        description: 'Обморожение! Оружие покрылось инеем, пальцы не гнутся.',
        chance: 0.15,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'frost', severity: 3, source: 'frost_snap' },
          ],
          seekerInjury: true,
        },
      },
    ],
  },

  {
    id: 'tidal_wave',
    category: 'environment',
    templateText: 'Штормовой вал обрушился на берег!',
    allowedBiomes: ['ocean_coast'],
    allowedTiers: [2, 3, 4],
    weight: 5,
    tags: ['ocean', 'storm', 'water'],
    outcomes: [
      {
        id: 'tidal_dodge',
        description: 'Искатель отступил на скалу. Волна разбилась о камни.',
        chance: 0.5,
        effects: {},
      },
      {
        id: 'tidal_hit',
        description: 'Волна сбила с ног! Солёная вода разъедает царапины на оружии.',
        chance: 0.35,
        effects: {
          weaponDamages: [
            { type: 'physical', severity: 1, source: 'tidal_wave' },
          ],
        },
      },
      {
        id: 'tidal_wash',
        description: 'Волна унесла часть припасов! Но на берегу блеснула раковина...',
        chance: 0.15,
        effects: {
          timeModifier: 0.1,
          addResources: [{ resourceId: 'mat-pearl_shell', amount: 1 }],
        },
      },
    ],
  },

  {
    id: 'crystal_resonance_hum',
    category: 'environment',
    templateText: 'Кристаллы запели! Низкий гул отдаётся в костях...',
    allowedBiomes: ['crystal_caves'],
    allowedTiers: [2, 3, 4],
    requiredElement: 'magnetism',
    weight: 5,
    tags: ['crystal', 'resonance', 'lightning'],
    outcomes: [
      {
        id: 'hum_pass',
        description: 'Резонанс прошёл — кристаллы замолчали. Только эхо в голове.',
        chance: 0.5,
        effects: {},
      },
      {
        id: 'hum_shock',
        description: 'Резонанс нарастал — и разрядился молнией в оружие!',
        chance: 0.35,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'lightning', severity: 2, source: 'crystal_resonance' },
          ],
        },
      },
      {
        id: 'hum_loot',
        description: 'От резонанса откололся кристалл — ценная находка!',
        chance: 0.15,
        effects: {
          addResources: [{ resourceId: 'mat-prism_shard', amount: 1 }],
        },
      },
    ],
  },

  {
    id: 'shadow_drift',
    category: 'environment',
    templateText: 'Реальность дрогнула — тени потекли, как чернила...',
    allowedBiomes: ['shadow_realm'],
    allowedTiers: [3, 4, 5],
    weight: 5,
    tags: ['shadow', 'distortion', 'void'],
    outcomes: [
      {
        id: 'drift_steady',
        description: 'Искатель сфокусировался — тени отступили. Реальность на месте... вроде бы.',
        chance: 0.4,
        effects: {},
      },
      {
        id: 'drift_touch',
        description: 'Тень мазнула по оружию! Остался чёрный след, холодный как лёд.',
        chance: 0.4,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'shadow', severity: 2, source: 'shadow_drift' },
          ],
        },
      },
      {
        id: 'drift_lost',
        description: 'Пространство свернулось! Искатель потерял ориентацию и время.',
        chance: 0.2,
        effects: {
          timeModifier: 0.2,
          weaponDamages: [
            { type: 'elemental', element: 'void', severity: 1, source: 'shadow_drift' },
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  REMAINS — ruins, abandoned places, altars
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'ancient_altar',
    category: 'remains',
    templateText: 'Искатель обнаружил древний алтарь...',
    allowedBiomes: ['forest', 'ancient_ruins'],
    allowedTiers: [2, 3, 4],
    weight: 4,
    tags: ['ruins', 'ancient', 'forest'],
    outcomes: [
      {
        id: 'altar_loot',
        description: 'На алтаре лежали древние подношения! Костяные амулеты и толика магнетита.',
        chance: 0.4,
        effects: {
          addResources: [{ resourceId: 'mat-bone_fragment', amount: 2 }],
        },
      },
      {
        id: 'altar_trap',
        description: 'Алтарь защищён ловушкой разума! Головная боль, оружие дрожит в руках.',
        chance: 0.3,
        effects: {
          weaponDamages: [
            {
              type: 'elemental',
              element: 'mind',
              severity: 1,
              source: 'ancient_altar',
            },
          ],
        },
      },
      {
        id: 'altar_nothing',
        description: 'Алтарь пуст. Лишь пыль и тлен. Время забрало всё.',
        chance: 0.3,
        effects: {},
      },
    ],
  },

  {
    id: 'abandoned_mine',
    category: 'remains',
    templateText: 'Заброшенная штольня... Что внутри?',
    allowedBiomes: ['deep_mines'],
    allowedTiers: [1, 2, 3],
    weight: 5,
    tags: ['mines', 'underground', 'abandoned'],
    outcomes: [
      {
        id: 'mine_loot',
        description: 'В старой тачке нашлась руда! Кто-то оставил в спешке.',
        chance: 0.4,
        effects: {
          addResources: [{ resourceId: 'mat-iron_ore', amount: 3 }],
        },
      },
      {
        id: 'mine_cavein',
        description: 'Потолок затрещал! Обломки посыпались на оружие.',
        chance: 0.3,
        effects: {
          weaponDamages: [
            { type: 'physical', severity: 1, source: 'abandoned_mine' },
          ],
        },
      },
      {
        id: 'mine_empty',
        description: 'Штольня пуста. Только крысы да паутина. Пустая трата времени.',
        chance: 0.3,
        effects: {},
      },
    ],
  },

  {
    id: 'sunken_ruins',
    category: 'remains',
    templateText: 'Полуутопленные руины выступают из воды...',
    allowedBiomes: ['ocean_coast', 'swamp'],
    allowedTiers: [2, 3, 4],
    weight: 4,
    tags: ['ruins', 'water', 'ocean'],
    outcomes: [
      {
        id: 'sunken_loot',
        description: 'В нише руин — древний ларец! Внутри кости и ракушки.',
        chance: 0.4,
        effects: {
          addResources: [{ resourceId: 'mat-bone_fragment', amount: 1 }],
          reputationChange: 3,
        },
      },
      {
        id: 'sunken_trap',
        description: 'Вода в руинах отравлена! Едкая слизь на стенах.',
        chance: 0.3,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'blood', severity: 1, source: 'sunken_ruins' },
          ],
        },
      },
      {
        id: 'sunken_empty',
        description: 'Руины пусты. Волны давно унесли всё ценное.',
        chance: 0.3,
        effects: {},
      },
    ],
  },

  {
    id: 'buried_city',
    category: 'remains',
    templateText: 'Песок обнажил стену древнего города...',
    allowedBiomes: ['desert'],
    allowedTiers: [3, 4],
    weight: 4,
    tags: ['desert', 'ruins', 'ancient'],
    outcomes: [
      {
        id: 'buried_loot',
        description: 'В развалинах — тайник! Искажённый артефакт и кость.',
        chance: 0.35,
        effects: {
          addResources: [
            { resourceId: 'mat-bone_fragment', amount: 2 },
          ],
          reputationChange: 5,
        },
      },
      {
        id: 'buried_trap',
        description: 'Песок обрушился! Искажение пространства дезориентировало.',
        chance: 0.35,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'distortion', severity: 1, source: 'buried_city' },
          ],
          timeModifier: 0.1,
        },
      },
      {
        id: 'buried_nothing',
        description: 'Стена пуста. Только песок и высохший раствор.',
        chance: 0.3,
        effects: {},
      },
    ],
  },

  {
    id: 'monolith_chamber',
    category: 'remains',
    templateText: 'Зал Монолитов... Чёрный обелиск ещё светится.',
    allowedBiomes: ['ancient_ruins', 'crystal_caves', 'shadow_realm'],
    allowedTiers: [3, 4, 5],
    weight: 3,
    tags: ['ruins', 'ancient', 'monolith'],
    outcomes: [
      {
        id: 'monolith_gift',
        description: 'Обелиск откликнулся! Струя света принесла артефакт.',
        chance: 0.3,
        effects: {
          addResources: [{ resourceId: 'mat-void_shard', amount: 1 }],
          reputationChange: 10,
        },
      },
      {
        id: 'monolith_test',
        description: 'Обелиск испытал искателя! Боль и свет — оружие в шрамах.',
        chance: 0.4,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'mind', severity: 2, source: 'monolith_chamber' },
          ],
        },
      },
      {
        id: 'monolith_silence',
        description: 'Обелиск молчит. Его свет погас тысячелетия назад.',
        chance: 0.3,
        effects: {},
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  WILDLIFE — passive fauna encounters
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'deer_herd',
    category: 'wildlife',
    templateText: 'Стадо оленей промчалось мимо!',
    allowedBiomes: ['forest', 'mountains'],
    allowedTiers: [1, 2],
    weight: 7,
    tags: ['forest', 'mountains', 'wild'],
    outcomes: [
      {
        id: 'deer_hunt',
        description: 'Искатель подстрелил оленя — кожа и клыки в котомке!',
        chance: 0.3,
        effects: {
          addResources: [
            { resourceId: 'mat-leather_scraps', amount: 2 },
            { resourceId: 'mat-fang', amount: 1 },
          ],
        },
      },
      {
        id: 'deer_watch',
        description:
          'Олени убежали. Красивое зрелище, но без добычи. Лес живёт своей жизнью.',
        chance: 0.7,
        effects: {},
      },
    ],
  },

  {
    id: 'ice_fox_sighting',
    category: 'wildlife',
    templateText: 'Ледяная лисица мелькнула между торосами!',
    allowedBiomes: ['tundra'],
    allowedTiers: [1, 2, 3],
    weight: 6,
    tags: ['tundra', 'cold', 'wild'],
    outcomes: [
      {
        id: 'ice_fox_catch',
        description: 'Удалось подстрелить лисицу! Мех — редкая находка.',
        chance: 0.25,
        effects: {
          addResources: [
            { resourceId: 'mat-leather_scraps', amount: 2 },
          ],
        },
      },
      {
        id: 'ice_fox_watch',
        description: 'Лисица растворилась в метели. Призрачная красота.',
        chance: 0.75,
        effects: {},
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  NPC — social encounters
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'wounded_traveler',
    category: 'npc',
    templateText: 'Раненый путник на дороге...',
    allowedBiomes: [
      'forest',
      'mountains',
      'swamp',
      'volcanic',
      'deep_mines',
    ],
    allowedTiers: [1, 2, 3, 4],
    weight: 3,
    tags: [],
    outcomes: [
      {
        id: 'traveler_help',
        description:
          'Искатель помог путнику. Тот рассказал полезные сведения о дороге впереди.',
        chance: 0.5,
        effects: { reputationChange: 5 },
      },
      {
        id: 'traveler_trap',
        description: 'Путник оказался разбойником! Удар в спину — оружие приняло на себя.',
        chance: 0.2,
        effects: {
          weaponDamages: [
            {
              type: 'physical',
              severity: 1,
              source: 'wounded_traveler',
            },
          ],
        },
      },
      {
        id: 'traveler_reward',
        description:
          'Путник оказался торговцем! В благодарность дал зелье здоровья.',
        chance: 0.3,
        effects: {
          addResources: [{ resourceId: 'con-health_potion', amount: 1 }],
        },
      },
    ],
  },

  {
    id: 'ghostly_merchant',
    category: 'npc',
    templateText: 'Призрачный торговец возник из тумана...',
    allowedBiomes: ['shadow_realm', 'ancient_ruins', 'crystal_caves'],
    allowedTiers: [3, 4, 5],
    weight: 3,
    tags: ['shadow', 'ancient', 'mystery'],
    outcomes: [
      {
        id: 'ghost_trade',
        description: 'Призрак предложил сделку! Осколок бездны за молчание.',
        chance: 0.4,
        effects: {
          addResources: [{ resourceId: 'mat-void_shard', amount: 1 }],
          reputationChange: -3,
        },
      },
      {
        id: 'ghost_curse',
        description: 'Призрак рассмеялся и проклял оружие! Тень въелась в сталь.',
        chance: 0.3,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'shadow', severity: 2, source: 'ghostly_merchant' },
          ],
        },
      },
      {
        id: 'ghost_vanish',
        description: 'Призрак растаял, не сказав ни слова. Может, к лучшему.',
        chance: 0.3,
        effects: {},
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════
  //  PUZZLE — intellectual challenges
  // ═══════════════════════════════════════════════════════════════════════

  {
    id: 'puzzle_ruins',
    category: 'puzzle',
    templateText: 'Загадка древних руин...',
    allowedBiomes: ['ancient_ruins', 'deep_mines'],
    allowedTiers: [3, 4],
    weight: 3,
    tags: ['ruins', 'ancient'],
    outcomes: [
      {
        id: 'puzzle_solve',
        description: 'Искатель разгадал загадку! Секретная ниша открылась — сокровище!',
        chance: 0.3,
        effects: {
          addResources: [{ resourceId: 'mat-void_shard', amount: 1 }],
          reputationChange: 10,
        },
      },
      {
        id: 'puzzle_fail',
        description: 'Загадка не поддалась. Но руины кое-что дали — кости и пыль.',
        chance: 0.4,
        effects: {
          addResources: [{ resourceId: 'mat-bone_fragment', amount: 1 }],
        },
      },
      {
        id: 'puzzle_trap',
        description: 'Неправильный ответ активировал ловушку! Искажение ударило по разуму.',
        chance: 0.3,
        effects: {
          weaponDamages: [
            {
              type: 'elemental',
              element: 'distortion',
              severity: 2,
              source: 'puzzle_ruins',
            },
          ],
        },
      },
    ],
  },

  {
    id: 'rune_lock',
    category: 'puzzle',
    templateText: 'Рунический замок на двери...',
    allowedBiomes: ['ancient_ruins', 'crystal_caves', 'shadow_realm'],
    allowedTiers: [3, 4, 5],
    weight: 3,
    tags: ['ruins', 'ancient', 'rune'],
    outcomes: [
      {
        id: 'rune_open',
        description: 'Руны отозвались! Дверь открылась, за ней — сокровище Монолитов.',
        chance: 0.25,
        effects: {
          addResources: [{ resourceId: 'mat-magnetite', amount: 2 }],
          reputationChange: 8,
        },
      },
      {
        id: 'rune_partial',
        description: 'Частичный ответ — дверь приоткрылась. Что-то блеснуло внутри.',
        chance: 0.45,
        effects: {
          addResources: [{ resourceId: 'mat-bone_fragment', amount: 1 }],
        },
      },
      {
        id: 'rune_backlash',
        description: 'Руны вспыхнули! Разряд молнии ударил в оружие.',
        chance: 0.3,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'lightning', severity: 2, source: 'rune_lock' },
          ],
        },
      },
    ],
  },
]
