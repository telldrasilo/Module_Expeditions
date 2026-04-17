# 02. Architecture

## 2.1 Dependency DAG

```
RESOURCE_DEPOT (stub)   does not import   EXPEDITIONS

EXPEDITIONS   may import   game-store (Zustand)
EXPEDITIONS   must not import   CRAFT_PLANNER, WEAPON_INVENTORY, SHOP, ADVENTURERS

Host (SkinShell)   imports   EXPEDITIONS public API
```

Rationale: avoid cycles. The planner, inventory, and shop must remain free of expedition knowledge. Party composition and cross-feature orchestration live at the **host** level (`SkinShell` or thin `app/` bridges), not in stable public APIs.

## 2.2 Integration pattern

The module lives in `src/modules/expeditions/` and exports its public API through `index.ts`. The host (`SkinShell`) connects the module by:

1. Adding a "Seekers' Guild" button in the sidebar navigation.
2. Rendering `<ExpeditionsPanel />` in the main area when the Guild tab is active.
3. Bridging the expedition store to `game-store` for resource exchange.

## 2.3 State management

Two store layers:

### Expedition store (`expedition-store.ts`)

Own Zustand store for the module. Manages:

| Slice | Contents |
|-------|----------|
| Active run | Current `ExpeditionRun` (or null) |
| Quest board | `GeneratedQuest[]` with board metadata |
| UI state | Active tab, selected card, dispatch screen open/closed |
| Dev config | `DevConfig` (time scale, damage multiplier, event count range) |

### Game store (`game-store.ts` — existing, extended)

Extended with expedition-related state:

| New field | Type | Purpose |
|-----------|------|---------|
| `expeditionResources` | `Record<string, number>` | Stub resource inventory from expeditions |
| `stubWeapon` | `StubWeapon` | Weapon stub with durability and scars |
| `guildReputation` | `number` | Guild reputation counter |

New actions: `addExpeditionResources`, `applyWeaponDamages`, `repairWeapon`, `addGuildReputation`.

## 2.4 Data flow

```
Quest Board → Player selects → Dispatch screen
        ↓
  startExpedition(quest)
        ↓
  ExpeditionRun created (events pre-generated)
        ↓
  Timer ticks (useEffect + setInterval or requestAnimationFrame)
        ↓
  Events reveal at triggerProgress → effects applied immediately
        ↓
  Timer completes → resolveExpedition()
        ↓
  ExpeditionOutcome → loot + damages
        ↓
  Player collects → game-store.addExpeditionResources()
        ↓
  Notification → right panel (chat)
```

## 2.5 Module entry point

```typescript
// src/modules/expeditions/index.ts

// Types
export type { ... } from './types'

// Store hook
export { useExpeditionStore } from './expedition-store'

// UI entry
export { ExpeditionsPanel } from './ui/ExpeditionsPanel'

// Module ID
export const MODULE_ID = 'expeditions' as const
```

Deep imports from `src/modules/expeditions/lib/...` or `src/modules/expeditions/data/...` are **internal** — the host must only import from `index.ts`.
