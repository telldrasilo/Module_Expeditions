# Expeditions — as-built (MVP)

**Code root:** `src/modules/expeditions/`  
**Status:** MVP playable in the Next.js shell (quest board, dispatch, timer, events, resolution, Guild UI, dev tools).  
**Product detail:** [`docs/TZ/en/00-index.md`](../../TZ/en/00-index.md) · **Design deep-dive:** [`docs/dev/expeditions/00-index.md`](../../dev/expeditions/00-index.md)

## Public surface

Host imports **only** [`index.ts`](../../../src/modules/expeditions/index.ts):

| Export kind | Symbols (representative) |
|-------------|---------------------------|
| Types | `ExpeditionRun`, `GeneratedQuest`, `ExpeditionOutcome`, `QuestBoardState`, `ExpeditionLocation`, `Biome`, … |
| Store | `useExpeditionStore` |
| UI | `ExpeditionsPanel` |
| Data helpers | `BIOMES`, `getBiome`, `getAllBiomes` |
| Constants | `MODULE_ID` |

## Directory map

| Path | Role |
|------|------|
| `types.ts` | Domain TypeScript types |
| `constants.ts` | Durations, damage tables, defaults |
| `expedition-store.ts` | Zustand: board, active run, dispatch, ticks, resolve, dev config |
| `data/` | `locations`, `biomes`, `elements`, `enemies`, `encounters`, `questTemplates`, `questGivers`, `stubResources` |
| `lib/` | `questGenerator`, `eventGenerator`, `expeditionResolver`, `damageCalculator`, `lootCalculator`, `dispatch`, `rng` |
| `ui/` | Guild panel, tabs, quest board, dispatch modal, results, dev panel, encyclopedia, intendant placeholder |

## Host integration (this repo)

| Concern | Location |
|---------|----------|
| Shell / sidebar / Forge vs Guild | `components/` (e.g. SkinShell) |
| Shared game state (resources, chat, weapon stub) | [`game-store.ts`](../../../src/lib/game-store.ts) |
| Route / layout | `app/` |

## Stubs and deferred ownership

| Topic | MVP behavior |
|-------|----------------|
| Resource Depot | [`stubResources.ts`](../../../src/modules/expeditions/data/stubResources.ts) — ids must stay consistent until depot merge |
| Seekers / party | Stub seeker + snapshot pattern; no ADVENTURERS package |
| Weapon | Stub weapon durability / scars in store; no WEAPON_INVENTORY module |
| Intendant tab | Placeholder UI |
| Persistence | In-memory store reset on reload unless extended later |

## Verification

Run `npm test` from the `SCv5/` directory; keep typecheck and build green per [`worklog.md`](../../../worklog.md).
