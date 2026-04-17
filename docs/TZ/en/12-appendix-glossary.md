# 12. Appendix: glossary & reference tables

## 12.1 Biome display names (Russian UI)

| Code | RU label |
|------|----------|
| `mountains` | Горы |
| `forest` | Лес |
| `swamp` | Болото |
| `volcanic` | Вулкан |
| `deep_mines` | Глубокие шахты |
| `desert` | Пустыня |
| `tundra` | Тундра |
| `ocean_coast` | Побережье |
| `ancient_ruins` | Древние руины |
| `shadow_realm` | Теневой мир |
| `crystal_caves` | Кристальные пещеры |
| `bog` | Топь |

## 12.2 Resource frequency weights

| Code | RU label | Default weight |
|------|----------|----------------|
| `common` | Обычный | 100 |
| `uncommon` | Необычный | 50 |
| `rare` | Редкий | 15 |
| `legendary` | Легендарный | 3 |

## 12.3 Example duration & reward formulas

**Duration (minutes):**

```
base = 60 * tier
typeMultiplier:
  hunt: 1.0
  gather: 0.8
  explore: 1.2
  deliver: 1.5
  boss: 2.0
```

**Gold:**

```
base = template.baseGold
tierMultiplier = 1 + (tier - 1) * 0.5
gold = base * tierMultiplier
```

**Reputation:**

```
base = template.baseReputation
reputation = base * tier
```

---

## Closing note

This specification is the full **skeleton** for the expeditions system. Details may evolve during implementation, but the core definitions above should stay stable.

**Next step:** approve the doc and start **Phase 1** (data preparation).
