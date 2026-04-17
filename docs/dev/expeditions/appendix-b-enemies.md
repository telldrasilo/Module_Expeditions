# Appendix B: Enemy Catalog (MVP)

9 enemies with varied attack patterns: physical only, elemental only, or mixed.

| ID | Name (RU) | Biomes | Tier range | Attacks | Danger | Tags |
|----|-----------|--------|------------|---------|--------|------|
| `wolf` | Лесной волк | forest, mountains | 1-2 | `[{type:'physical'}]` | 1 | `wild`, `pack` |
| `rot_fox` | Гнилая лиса | forest, swamp | 2-3 | `[{type:'elemental', element:'decay'}]` | 2 | `wild`, `decay` |
| `fire_fox` | Огненная лиса | forest, volcanic | 2-3 | `[{type:'elemental', element:'flame'}]` | 2 | `wild`, `fire` |
| `swamp_leech` | Болотный пиявочник | swamp, bog | 2-3 | `[{type:'physical'}, {type:'elemental', element:'blood'}]` | 2 | `aquatic`, `blood` |
| `stone_guardian` | Каменный страж | mountains, ancient_ruins | 3-4 | `[{type:'physical'}, {type:'elemental', element:'magnetism'}]` | 3 | `ancient`, `stone`, `guardian` |
| `lava_salamander` | Лавовая саламандра | volcanic | 3-4 | `[{type:'elemental', element:'flame'}]` | 3 | `fire`, `heat` |
| `mine_crawler` | Шахтный ползун | deep_mines | 1-3 | `[{type:'physical'}]` | 2 | `underground`, `insect` |
| `void_wraith` | Бездненный призрак | deep_mines, swamp | 4 | `[{type:'elemental', element:'void'}, {type:'physical'}]` | 4 | `undead`, `void`, `dark` |
| `thunder_eagle` | Грозовой орёл | mountains | 3 | `[{type:'elemental', element:'lightning'}]` | 3 | `flying`, `storm` |

## Attack pattern coverage

| Pattern | Enemies | Count |
|---------|---------|-------|
| Physical only | wolf, mine_crawler | 2 |
| Elemental only | rot_fox, fire_fox, lava_salamander, thunder_eagle | 4 |
| Mixed (physical + elemental) | swamp_leech, stone_guardian, void_wraith | 3 |

All three attack patterns are represented, ensuring damage variety during expeditions.
