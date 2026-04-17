import type { BiomeData, Biome } from '../types'

/**
 * Biome catalog — the "living world" backbone.
 *
 * Each biome defines its own modifiers, complications, and narrative mood.
 * Locations inherit their biome's properties; encounters are filtered
 * through biome + tags; and complications can trigger mid-expedition.
 */

export const BIOMES: BiomeData[] = [
  // ── FOREST ──────────────────────────────────────────────────────────────
  {
    id: 'forest',
    nameRu: 'Восточные Марки',
    description:
      'Бескрайний лес на востоке Аркедона, простирающийся от полевых дорог до самого Корнегнилья. Листва шепчет, корни помнят, а гниль проникает повсюду.',
    lore: 'Восточные Марки — древнейший лес Аркедона, существовавший задолго до Войны Трёх Баронов. Когда королевство пало, лес начал наступать на заброшенные деревни, и сейчас лишь трактир «Последний приют» на тракте напоминает о том, что здесь когда-то жили люди. Гниль — не болезнь, а естественное состояние леса: старые деревья разлагаются, отдавая силы новым, и этот цикл покрывает всё от корней до крон. Строители Монолитов считали лес священным — их обелиски, оплетённые корнями, до сих пор находят в самой глубокой чаще. Охотники ходят сюда поколениями, но дальше Опушки редеют — Тёмная Чаща не прощает чужаков, а Сердце Корнегнилья и вовсе дышит спорами.',
    mood: 'mysterious',
    dominantElements: ['decay', 'shadow'],
    modifiers: [
      {
        id: 'forest_spore_air',
        name: 'Споровый воздух',
        description: 'Грибные споры въедаются в металл, усиливая урон от гнили.',
        target: 'damage_severity',
        value: 0.5,
        element: 'decay',
      },
      {
        id: 'forest_root_traps',
        name: 'Корни-ловушки',
        description: 'Корни преграждают путь, замедляя движение и создавая лишние события.',
        target: 'event_count',
        value: 0.3,
      },
      {
        id: 'forest_abundant_herbs',
        name: 'Изобилие трав',
        description: 'Лес щедро делится своими дарами — травы и смола попадаются чаще.',
        target: 'loot_chance',
        value: 0.2,
      },
    ],
    complications: [
      {
        id: 'forest_mushroom_fog_complication',
        name: 'Грибной туман',
        description: 'Густой туман спор окутал лес — видимость нулевая, дышать тяжело.',
        trigger: 'on_expedition_start',
        chance: 0.25,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'decay', severity: 1, source: 'mushroom_fog' },
          ],
        },
        tags: ['forest', 'spores', 'fog'],
      },
      {
        id: 'forest_whispering_trees',
        name: 'Шёпот деревьев',
        description: 'Старые дубы зашептались — искатель сбивается с пути, теряя время.',
        trigger: 'on_event',
        chance: 0.15,
        effects: { timeModifier: 0.1 }, // +10% duration
        tags: ['forest', 'ancient_trees', 'mind'],
      },
    ],
    adjacent: ['mountains', 'swamp', 'bog', 'desert'],
    tags: ['forest', 'nature', 'ancient', 'spores'],
  },

  // ── MOUNTAINS ───────────────────────────────────────────────────────────
  {
    id: 'mountains',
    nameRu: 'Северный хребет',
    description:
      'Величественный горный хребет, увенчанный вечной грозой. Перевалы — единственный путь на север, но грозовые орлы и камнепады не спят.',
    lore: 'Северный хребет — естественная граница Аркедона, за которой лежат неосвоенные земли. Кости доисторических тварей белят скалы Нижнего перевала — самая доступная дорога через горы, по которой ходят караваны с рудой. На перевале стоит сторожевая башня гильдии, последняя перед Пиком Гроз — высочайшей точкой, увенчанной вечной грозой. Строители Монолитов установили на вершине чёрный громоотвод из неизвестного металла, и молнии бьют в него с такой частотой, что камень оплавлен. Магнетизм здесь настолько силён, что компасы вращаются безостановочно. Грозовые орёлы вьют гнёзда на карнизах, и их перья — ценнейший алхимический компонент.',
    mood: 'hostile',
    dominantElements: ['lightning', 'magnetism', 'bone'],
    modifiers: [
      {
        id: 'mountains_thin_air',
        name: 'Разрежённый воздух',
        description: 'На высоте дышится тяжелее — искатель быстрее устаёт, риск ранения выше.',
        target: 'seeker_injury_chance',
        value: 0.15,
      },
      {
        id: 'mountains_magnetic_anomaly',
        name: 'Магнитная аномалия',
        description: 'Магнетизм гор искажает оружие, усиливая магнитный урон.',
        target: 'damage_severity',
        value: 0.5,
        element: 'magnetism',
      },
      {
        id: 'mountains_rockfall_zone',
        name: 'Зона камнепадов',
        description: 'Сыпучие склоны добавляют случайные столкновения с камнями.',
        target: 'event_count',
        value: 0.2,
      },
    ],
    complications: [
      {
        id: 'mountains_storm_front',
        name: 'Штормовой фронт',
        description: 'Грозовой фронт обрушился на хребет — молнии бьют непрерывно!',
        trigger: 'on_expedition_start',
        chance: 0.2,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'lightning', severity: 2, source: 'storm_front' },
          ],
        },
        tags: ['mountains', 'storm', 'lightning'],
      },
      {
        id: 'mountains_avalanche',
        name: 'Лавина',
        description: 'Грохот лавины! Камни и снег несутся вниз — укрыться невозможно.',
        trigger: 'on_event',
        chance: 0.1,
        effects: {
          weaponDamages: [
            { type: 'physical', severity: 2, source: 'avalanche' },
          ],
          timeModifier: 0.15,
        },
        tags: ['mountains', 'rockslide', 'cold'],
      },
    ],
    adjacent: ['forest', 'deep_mines', 'tundra', 'volcanic'],
    tags: ['mountains', 'height', 'storm', 'ore'],
  },

  // ── SWAMP ───────────────────────────────────────────────────────────────
  {
    id: 'swamp',
    nameRu: 'Ржавые болота',
    description:
      'Отравленные земли к северу от Восточных Марок. Бывший Северный тракт поглотила жижа, а вода окрашена кровью павших.',
    lore: 'Ржавые болота — самый страшный памятник Войне Трёх Баронов. Когда барон Керстон взорвал дамбы на Северном тракте, вода вернулась, затопив деревни, поля и дороги. Тысячи тел ушли под болотную жижу, и земля запомнила. Кровь здесь не метафора — грунтовые воды до сих пор красноваты от железа и чего-то похуже. Заболоченные тропы — всё, что осталось от мощёной дороги: булыжники торчат из бурой жижи, а на обочинах ржавеют остовы боевых повозок. Чёрная Топь, эпицентр Болотной Чумы, — место, куда не долетают птицы: мёртвые ходят по дну, а руки выныривают из чёрной воды. Бездна ближе здесь, чем где-либо — колодец в центре Топи уходит в никуда.',
    mood: 'oppressive',
    dominantElements: ['decay', 'blood', 'void'],
    modifiers: [
      {
        id: 'swamp_toxic_air',
        name: 'Ядовитый воздух',
        description: 'Болотные испарения разъедают металл — урон от гнили усилен.',
        target: 'damage_severity',
        value: 1.0,
        element: 'decay',
      },
      {
        id: 'swamp_bloody_water',
        name: 'Кровавая вода',
        description: 'Вода отравлена кровью — раны от крови страшнее обычного.',
        target: 'damage_severity',
        value: 0.5,
        element: 'blood',
      },
      {
        id: 'swamp_bogged_down',
        name: 'Топкая почва',
        description: 'Каждый шаг — по колено в жиже. Экспедиции длятся дольше.',
        target: 'duration',
        value: 0.25,
      },
      {
        id: 'swamp_foul_loot',
        name: 'Гнилое богатство',
        description: 'Болотные ресурсы ценны алхимиками, но встречаются реже из-за топи.',
        target: 'loot_chance',
        value: -0.1,
      },
    ],
    complications: [
      {
        id: 'swamp_plague_miasma',
        name: 'Миазмы чумы',
        description: 'Болотная чума дышит! Споры болезни заполняют лёгкие.',
        trigger: 'on_expedition_start',
        chance: 0.3,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'decay', severity: 2, source: 'plague_miasma' },
          ],
          seekerInjury: true,
        },
        tags: ['swamp', 'disease', 'toxic'],
      },
      {
        id: 'swamp_undead_rising',
        name: 'Восстание мёртвых',
        description: 'Мёртвые руки хватают за ноги из-под воды!',
        trigger: 'on_event',
        chance: 0.2,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'void', severity: 1, source: 'undead_hands' },
          ],
        },
        tags: ['swamp', 'undead', 'void'],
      },
      {
        id: 'swamp_quicksand',
        name: 'Зыбучие пески',
        description: 'Земля уходит из-под ног — искатель проваливается в трясину!',
        trigger: 'on_event',
        chance: 0.15,
        effects: {
          timeModifier: 0.2,
          weaponDamages: [
            { type: 'physical', severity: 1, source: 'quicksand' },
          ],
        },
        tags: ['swamp', 'trap', 'wet'],
      },
    ],
    adjacent: ['forest', 'bog', 'ocean_coast'],
    tags: ['swamp', 'wet', 'toxic', 'undead', 'war'],
  },

  // ── VOLCANIC ────────────────────────────────────────────────────────────
  {
    id: 'volcanic',
    nameRu: 'Склоны Игниррата',
    description:
      'Южные отроги вулкана Игниррат — пепел падает как снег, а из трещин вырывается пламя. Горячие ключи богаты минералами.',
    lore: 'Игниррат — вулкан на южной границе Аркедона. Последнего извержения не помнит никто из живущих, но гора не спит: пепел падает вечно, горячие источники кипят, а трещины в скалах дышат жаром. Южный склон — единственное место, где можно подойти к вулкану относительно безопасно: пепельный слой даёт footing, а гейзеры отмечают тропу. Огненные лисицы — странные создания, рождённые жаром и пеплом — пробираются к горячим ключам по ночам. Лавовые саламандры, куда опаснее, обитают в лавовых трещинах. Алхимики платят за огненные кристаллы, а кузнецы ценят пепельный камень — он отводит жар.',
    mood: 'hostile',
    dominantElements: ['flame'],
    modifiers: [
      {
        id: 'volcanic_scorching_heat',
        name: 'Испепеляющий жар',
        description: 'Жар вулкана усиливает любой огненный урон.',
        target: 'damage_severity',
        value: 1.0,
        element: 'flame',
      },
      {
        id: 'volcanic_ash_fall',
        name: 'Пепельный снег',
        description: 'Пепел залепляет глаза и замедляет движение.',
        target: 'duration',
        value: 0.15,
      },
      {
        id: 'volcanic_mineral_rich',
        name: 'Минеральное богатство',
        description: 'Вулканические породы щедры на огненные кристаллы и пепельный камень.',
        target: 'loot_chance',
        value: 0.3,
      },
    ],
    complications: [
      {
        id: 'volcanic_eruption_tremor',
        name: 'Толчок вулкана',
        description: 'Игниррат содрогнулся! Из трещин вырвались языки пламени.',
        trigger: 'on_event',
        chance: 0.2,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'flame', severity: 2, source: 'eruption_tremor' },
          ],
        },
        tags: ['volcanic', 'fire', 'eruption'],
      },
      {
        id: 'volcanic_gas_vent',
        name: 'Газовый гейзер',
        description: 'Едкий газ вырвался из-под земли! Дышать невозможно.',
        trigger: 'on_expedition_start',
        chance: 0.15,
        effects: {
          seekerInjury: true,
          weaponDamages: [
            { type: 'elemental', element: 'flame', severity: 1, source: 'gas_vent' },
          ],
        },
        tags: ['volcanic', 'gas', 'heat'],
      },
    ],
    adjacent: ['mountains', 'desert', 'crystal_caves'],
    tags: ['volcanic', 'fire', 'heat', 'minerals'],
  },

  // ── DEEP MINES ──────────────────────────────────────────────────────────
  {
    id: 'deep_mines',
    nameRu: 'Великие Шахты Холгара',
    description:
      'Двести лет рудокопы Холгара спускаются под землю. Верхние ярусы безопасны, но глубже — тоннели Монолитов, бездненные призраки и магнетизм, сводящий с ума.',
    lore: 'Великие Шахты Холгара — главная кузница Аркедона, поставляющая железо, магнетит и редкий глубинный металл уже двести лет. Верхние штольни обустроены: деревянные крепи, вентиляция, рудные обозы. Но ниже третьего горизонта всё меняется. Воздух густой и влажный, факелы горят тускло, а компасы безумно крутятся. Штольни Строителей Монолитов пронизывают породу — гладкие тоннели с идеальной геометрией уходят ещё глубже, в Бездну. Именно из этих глубин приходят бездненные призраки — порождения Бездны, чьё прикосновение вытягивает жизнь. Но именно здесь находят осколки бездны — самый ценный ресурс, за который алхимики и кузнецы платят золотом.',
    mood: 'eerie',
    dominantElements: ['magnetism', 'void'],
    modifiers: [
      {
        id: 'mines_magnetic_distortion',
        name: 'Магнитное искажение',
        description: 'Магнетит в стенах искажает оружие — магнитный урон усилен.',
        target: 'damage_severity',
        value: 0.5,
        element: 'magnetism',
      },
      {
        id: 'mines_darkness',
        name: 'Непроглядная тьма',
        description: 'Темнота скрывает опасности — встреч с тварями больше.',
        target: 'event_count',
        value: 0.25,
      },
      {
        id: 'mines_ore_veins',
        name: 'Рудные жилы',
        description: 'Шахты богаты рудой — железо и магнетит попадаются часто.',
        target: 'loot_chance',
        value: 0.25,
      },
      {
        id: 'mines_void_seepage',
        name: 'Протечка Бездны',
        description: 'Бездна сочится сквозь породу — урон бездны сильнее обычного.',
        target: 'damage_severity',
        value: 0.5,
        element: 'void',
      },
    ],
    complications: [
      {
        id: 'mines_cave_in',
        name: 'Обвал',
        description: 'Потолок трескается! Камни и пыль обрушились на искателя!',
        trigger: 'on_event',
        chance: 0.2,
        effects: {
          weaponDamages: [
            { type: 'physical', severity: 2, source: 'cave_in' },
          ],
          timeModifier: 0.15,
        },
        tags: ['mines', 'underground', 'rockfall'],
      },
      {
        id: 'mines_void_whisper',
        name: 'Шёпот Бездны',
        description: 'Голос из глубины шепчет на непонятном языке... Разум мутнеет.',
        trigger: 'on_expedition_start',
        chance: 0.2,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'void', severity: 1, source: 'void_whisper' },
          ],
          seekerInjury: true,
        },
        tags: ['mines', 'void', 'mind', 'dark'],
      },
    ],
    adjacent: ['mountains', 'crystal_caves', 'shadow_realm'],
    tags: ['mines', 'underground', 'ore', 'ancient', 'dark'],
  },

  // ── DESERT ──────────────────────────────────────────────────────────────
  {
    id: 'desert',
    nameRu: 'Пепельная пустошь',
    description:
      'Выжженная равнина к юго-востоку от Аркедона. Песок смешан с пеплом, миражи сводят с ума, а под дюнами спят руины.',
    lore: 'Пепельная пустошь — земля, которую огонь забрал и не вернул. Когда-то здесь была цветущая провинция, но наступление Игниррата и войны превратили её в бесконечную равнину из песка и пепла. Миражи — не оптическая иллюзия: искажение пространства, порождённое давней магией, заставляет видеть то, чего нет. Караваны идут по единственному безопасному тракту, отмеченному костями павших — «Костяной дорогой». Под дюнами лежат руины забытых городов, и иногда песчаные бури обнажают их стены. Искажение — главная угроза: пространство здесь нестабильно, и компасы указывают на разные стороны света.',
    mood: 'hostile',
    dominantElements: ['flame', 'distortion', 'bone'],
    modifiers: [
      {
        id: 'desert_scorching_sun',
        name: 'Палящее солнце',
        description: 'Солнце выжигает всё живое — огненный урон усилен.',
        target: 'damage_severity',
        value: 0.5,
        element: 'flame',
      },
      {
        id: 'desert_sandstorm_freq',
        name: 'Песчаные бури',
        description: 'Песчаные бури налетают внезапно, добавляя столкновения.',
        target: 'event_count',
        value: 0.2,
      },
      {
        id: 'desert_distortion_field',
        name: 'Поле искажения',
        description: 'Пространство нестабильно — искажение разъедает разум и металл.',
        target: 'damage_severity',
        value: 0.5,
        element: 'distortion',
      },
    ],
    complications: [
      {
        id: 'desert_mirage_trap',
        name: 'Ловушка миражей',
        description: 'Искажение пространства заманило искателя в ловушку!',
        trigger: 'on_event',
        chance: 0.2,
        effects: {
          timeModifier: 0.2,
          weaponDamages: [
            { type: 'elemental', element: 'distortion', severity: 1, source: 'mirage_trap' },
          ],
        },
        tags: ['desert', 'distortion', 'mirage'],
      },
    ],
    adjacent: ['volcanic', 'ancient_ruins', 'forest'],
    tags: ['desert', 'sand', 'heat', 'ruins', 'distortion'],
  },

  // ── TUNDRA ──────────────────────────────────────────────────────────────
  {
    id: 'tundra',
    nameRu: 'Крижані пустки',
    description:
      'Ледяная пустыня за Северным хребтом. Вечная мерзлота, воющие метели и кости великанов подо льдом.',
    lore: 'Крижані пустки — земля за хребтом, куда не доходит тепло Аркедона. Вечная мерзлота держит землю стальной хваткой, а метели воют, как голодные волки. Под толщей льда находят кости великанов — существ, вымерших до появления людей. Костяные копатели — единственные, кто отваживается сюда: кость великанов ценится кузнецами. Строители Монолитов тоже оставили след — ледяные обелиски, не тающие в оттепели. Мороз здесь — не стихия, а воля древнего холода, и он не терпит чужаков.',
    mood: 'hostile',
    dominantElements: ['frost', 'bone'],
    modifiers: [
      {
        id: 'tundra_bitter_cold',
        name: 'Лютый мороз',
        description: 'Холод пронизывает до костей — морозный урон значительно усилен.',
        target: 'damage_severity',
        value: 1.0,
        element: 'frost',
      },
      {
        id: 'tundra_frozen_ground',
        name: 'Мёрзлая земля',
        description: 'Передвигаться по льду тяжело и опасно — экспедиции длятся дольше.',
        target: 'duration',
        value: 0.3,
      },
    ],
    complications: [
      {
        id: 'tundra_blizzard',
        name: 'Метель',
        description: 'Снежная буря обрушилась! Видимость нулевая, холод кусает.',
        trigger: 'on_expedition_start',
        chance: 0.3,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'frost', severity: 2, source: 'blizzard' },
          ],
          timeModifier: 0.2,
        },
        tags: ['tundra', 'cold', 'storm'],
      },
    ],
    adjacent: ['mountains', 'ocean_coast'],
    tags: ['tundra', 'cold', 'ice', 'ancient'],
  },

  // ── OCEAN COAST ─────────────────────────────────────────────────────────
  {
    id: 'ocean_coast',
    nameRu: 'Берег Кракена',
    description:
      'Скалистое побережье на западе Аркедона. Штормовой океан, солёные ветры и руины портовых городов.',
    lore: 'Берег Кракена — западная оконечность Аркедона, где скалы встречаются с штормовым океаном. Когда-то здесь процветали портовые города, но после Войны Трёх Баронов морские пути прервались. Штормы здесь жестоки — рыбаки говорят, что океан помнит старую магию. Бездна ближе всего к поверхности именно здесь: в шторм из глубин поднимаются тени, а вода чернеет, как ночь. Свет — редкий гость на этом берегу, но те, кто видит его, говорят о сиянии из-под воды.',
    mood: 'eerie',
    dominantElements: ['void', 'light', 'frost'],
    modifiers: [
      {
        id: 'coast_storm_surge',
        name: 'Штормовой нагон',
        description: 'Волны и ветер замедляют движение вдоль берега.',
        target: 'duration',
        value: 0.2,
      },
      {
        id: 'coast_void_proximity',
        name: 'Близость Бездны',
        description: 'Океан — дверь в Бездну. Урон бездны усилен.',
        target: 'damage_severity',
        value: 0.5,
        element: 'void',
      },
    ],
    complications: [
      {
        id: 'coast_rogue_wave',
        name: 'Девятый вал',
        description: 'Огромная волна обрушилась с неба — оружие унесло в океан!',
        trigger: 'on_event',
        chance: 0.15,
        effects: {
          weaponDamages: [
            { type: 'physical', severity: 2, source: 'rogue_wave' },
          ],
        },
        tags: ['ocean', 'storm', 'water'],
      },
    ],
    adjacent: ['swamp', 'tundra', 'ancient_ruins'],
    tags: ['ocean', 'coast', 'storm', 'ruins'],
  },

  // ── ANCIENT RUINS ───────────────────────────────────────────────────────
  {
    id: 'ancient_ruins',
    nameRu: 'Руины Монолитов',
    description:
      'Останки цивилизации Строителей Монолитов. Каменные лабиринты, ловушки разума и артефакты невообразимой силы.',
    lore: 'Руины Монолитов — самая загадочная часть Аркедона. Строители Монолитов исчезли за тысячу лет до Войны, но их наследие живо: чёрные обелиски, идеальные тоннели, механизмы, работающие до сих пор. Руины разбросаны по всему королевству, но самое большое скопление — на юго-востоке, за Пепельной пустошью. Разум — главная угроза: ловушки Монолитов атакуют не тело, а сознание. Каменные стражи всё ещё патрулируют коридоры, а головоломки охраняют сокровища. Кровь здесь — не от ран, а от жертвоприношений, которые Строители совершали у алтарей.',
    mood: 'sacred',
    dominantElements: ['mind', 'blood', 'light', 'distortion'],
    modifiers: [
      {
        id: 'ruins_mind_trap_field',
        name: 'Поле ловушек разума',
        description: 'Древние механизмы атакуют разум — урон разума усилен.',
        target: 'damage_severity',
        value: 0.75,
        element: 'mind',
      },
      {
        id: 'ruins_distortion_aura',
        name: 'Аура искажения',
        description: 'Пространство в руинах нестабильно — искажение разъедает реальность.',
        target: 'damage_severity',
        value: 0.5,
        element: 'distortion',
      },
      {
        id: 'ruins_hidden_treasures',
        name: 'Скрытые сокровища',
        description: 'Руины таят невиданные богатства — шанс добычи значительно выше.',
        target: 'loot_chance',
        value: 0.4,
      },
    ],
    complications: [
      {
        id: 'ruins_guardian_awakening',
        name: 'Пробуждение стража',
        description: 'Каменный страж Монолитов ожил! Механизм атаки запущен.',
        trigger: 'on_event',
        chance: 0.2,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'magnetism', severity: 2, source: 'guardian_awakening' },
          ],
          seekerInjury: true,
        },
        tags: ['ruins', 'ancient', 'guardian', 'stone'],
      },
      {
        id: 'ruins_mind_trap',
        name: 'Ловушка разума',
        description: 'Головоломка Монолитов атакует сознание! Разум раскалывается.',
        trigger: 'on_expedition_start',
        chance: 0.2,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'mind', severity: 2, source: 'mind_trap' },
          ],
        },
        tags: ['ruins', 'ancient', 'mind', 'puzzle'],
      },
    ],
    adjacent: ['desert', 'ocean_coast', 'shadow_realm'],
    tags: ['ruins', 'ancient', 'stone', 'puzzle', 'mystery'],
  },

  // ── SHADOW REALM ────────────────────────────────────────────────────────
  {
    id: 'shadow_realm',
    nameRu: 'Теневое царство',
    description:
      'Земля, куда не проникает свет. Тени обретают плоть, а реальность течёт, как воск. Бездна здесь — не глубина, а горизонт.',
    lore: 'Теневое царство — место, которое не должно существовать. Оно появилось после Войны Трёх Баронов: когда барон Керстон применил запрещённое заклинание, часть реальности оторвалась и провалилась в тень. Теперь это отдельное царство, где тени обретают плоть, а свет — чужак. Бездна здесь не под землёй, а вокруг: горизонт дрожит, и если смотреть слишком долго, можно провалиться. Тень — не отсутствие света, а отдельная сущность, живая и голодная. Те немногие, кто вернулся, рассказывают о городах из тени, где живут существа, похожие на людей — но не люди.',
    mood: 'eerie',
    dominantElements: ['shadow', 'void', 'mind'],
    modifiers: [
      {
        id: 'shadow_realm_living_shadows',
        name: 'Живые тени',
        description: 'Тени атакуют сами по себе — урон тени значительно усилен.',
        target: 'damage_severity',
        value: 1.0,
        element: 'shadow',
      },
      {
        id: 'shadow_realm_reality_shift',
        name: 'Сдвиг реальности',
        description: 'Реальность нестабильна — все стихийные уроны немного усилены.',
        target: 'damage_severity',
        value: 0.25,
      },
      {
        id: 'shadow_realm_extra_events',
        name: 'Шёпот бездны',
        description: 'Тени нашёптывают — событий больше обычного.',
        target: 'event_count',
        value: 0.3,
      },
    ],
    complications: [
      {
        id: 'shadow_realm_shadow_attack',
        name: 'Атака тени',
        description: 'Собственная тень искателя ожила и напала!',
        trigger: 'on_event',
        chance: 0.25,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'shadow', severity: 2, source: 'shadow_attack' },
          ],
        },
        tags: ['shadow', 'living', 'attack'],
      },
    ],
    adjacent: ['ancient_ruins', 'deep_mines', 'crystal_caves'],
    tags: ['shadow', 'dark', 'void', 'unnatural'],
  },

  // ── CRYSTAL CAVES ───────────────────────────────────────────────────────
  {
    id: 'crystal_caves',
    nameRu: 'Хрустальные пещеры',
    description:
      'Подземный лабиринт из исполинских кристаллов. Свет преломляется в призмах, а резонанс сводит с ума.',
    lore: 'Хрустальные пещеры — геологическое чудо под юго-западом Аркедона. Исполинские кристаллы — от ногтя до дома — растут из стен, потолка и пола, образуя лабиринт сияющих залов. Свет здесь живёт своей жизнью: преломляется, фокусируется, иногда сгущается в сгустки, парящие в воздухе. Магнетизм и молния — дети этих пещер: кристаллы резонируют, накапливая заряд, и разряды молний сверкают между стенами. Строители Монолитов знали о пещерах — их вырезанные проходы соединяют залы, недоступные иначе. Пространство здесь искажено: расстояния не совпадают с ожиданиями, а эхо возвращается с других направлений.',
    mood: 'mysterious',
    dominantElements: ['lightning', 'magnetism', 'light', 'space'],
    modifiers: [
      {
        id: 'crystal_resonance',
        name: 'Кристаллический резонанс',
        description: 'Кристаллы резонируют — молнии бьют чаще и сильнее.',
        target: 'damage_severity',
        value: 0.75,
        element: 'lightning',
      },
      {
        id: 'crystal_distortion',
        name: 'Пространственное искажение',
        description: 'Расстояния обманчивы — экспедиции могут длиться дольше.',
        target: 'duration',
        value: 0.15,
      },
      {
        id: 'crystal_prismatic_loot',
        name: 'Призматические залежи',
        description: 'Кристаллы содержат редкие минералы — шанс добычи выше.',
        target: 'loot_chance',
        value: 0.3,
      },
    ],
    complications: [
      {
        id: 'crystal_resonance_burst',
        name: 'Резонансный выброс',
        description: 'Кристаллы разрядились! Молнии бьют во все стороны!',
        trigger: 'on_event',
        chance: 0.2,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'lightning', severity: 2, source: 'resonance_burst' },
          ],
        },
        tags: ['crystal', 'lightning', 'resonance'],
      },
    ],
    adjacent: ['volcanic', 'deep_mines', 'shadow_realm'],
    tags: ['crystal', 'underground', 'lightning', 'prism', 'ancient'],
  },

  // ── BOG ─────────────────────────────────────────────────────────────────
  {
    id: 'bog',
    nameRu: 'Гнилые мшары',
    description:
      'Топи между лесом и болотом, заросшие мхом и скрытые туманом. Здесь гниль и кровь сливаются воедино.',
    lore: 'Гнилые мшары — переходная зона между Восточными Марками и Ржавыми болотами, но хуже обоих. Если в болоте вода хотя бы стоячая, то в мшарах она дышит — пузыри газа поднимаются из-под мха, и каждый шаг — лотерея. Гниль здесь сильнее, чем в лесу: мох пожирает всё органическое за считанные дни. Кровавый мох — особый вид, растущий только здесь, — питается старой кровью из болот и ценится алхимиками. Пиявочники — главная угроза: они крупные, как собака, и присасываются намертво. Туман здесь никогда не рассеивается.',
    mood: 'oppressive',
    dominantElements: ['decay', 'blood'],
    modifiers: [
      {
        id: 'bog_acidic_moss',
        name: 'Кислотный мох',
        description: 'Мох разъедает металл — урон от гнили и крови усилен.',
        target: 'damage_severity',
        value: 0.75,
        element: 'decay',
      },
      {
        id: 'bog_endless_fog',
        name: 'Вечный туман',
        description: 'Туман не рассеивается никогда — ориентация невозможна, путь дольше.',
        target: 'duration',
        value: 0.3,
      },
    ],
    complications: [
      {
        id: 'bog_gas_pocket',
        name: 'Газовый карман',
        description: 'Под мхом скопился болотный газ — искра и взрыв!',
        trigger: 'on_event',
        chance: 0.2,
        effects: {
          weaponDamages: [
            { type: 'elemental', element: 'flame', severity: 1, source: 'gas_pocket' },
            { type: 'elemental', element: 'decay', severity: 1, source: 'gas_pocket' },
          ],
        },
        tags: ['bog', 'gas', 'explosion'],
      },
    ],
    adjacent: ['forest', 'swamp'],
    tags: ['bog', 'wet', 'fog', 'moss', 'decay'],
  },
]

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

const biomeMap = new Map(BIOMES.map((b) => [b.id, b]))

/** Get biome data by ID. Returns undefined for unknown biomes. */
export function getBiome(id: Biome): BiomeData | undefined {
  return biomeMap.get(id)
}

/** Get all biomes as a read-only array. */
export function getAllBiomes(): readonly BiomeData[] {
  return BIOMES
}
