# 10. Integration

How the Expeditions module integrates with the existing SwordCraft codebase.

## 10.1 SkinShell modifications

File: `components/skin-shell.tsx`

### Sidebar navigation

Add a "Seekers' Guild" button below "Forge":

```tsx
<div className="flex flex-col gap-2 md:flex-1">
  <button className={activeModule === 'forge' ? activeStyle : defaultStyle} onClick={() => setActiveModule('forge')}>
    🔥 Кузница
  </button>
  <button className={activeModule === 'guild' ? guildStyle : defaultStyle} onClick={() => setActiveModule('guild')}>
    🛡️ Гильдия Искателей
  </button>
</div>
```

### Main area

Conditional rendering based on `activeModule`:

```tsx
<main id="module-root">
  {activeModule === 'forge' ? (
    <ForgeModule />  // existing content
  ) : (
    <ExpeditionsPanel />  // new Guild module
  )}
</main>
```

### Status block

Add dev mode **toggle** in the lower sidebar area (updates `useExpeditionStore` `devConfig.enabled`). **Dev controls** (sliders, refresh board) render only inside [`ExpeditionsPanel`](../../../src/modules/expeditions/ui/ExpeditionsPanel.tsx) via [`DevPanel`](../../../src/modules/expeditions/ui/DevPanel.tsx) — avoid duplicating `DevPanel` in the shell.

```tsx
<label className="flex items-center gap-2 text-xs text-stone-500">
  <input
    type="checkbox"
    checked={devConfig.enabled}
    onChange={(e) => useExpeditionStore.getState().updateDevConfig({ enabled: e.target.checked })}
  />
  DEV-режим
</label>
```

## 10.2 Game-store extensions

File: `src/lib/game-store.ts`

### New state fields

```typescript
export interface GameState {
  // ...existing fields...

  // Expedition-related
  expeditionResources: Record<string, number>
  stubWeapon: StubWeapon
  guildReputation: number
}
```

### New actions

```typescript
export interface GameState {
  // ...existing actions...

  addExpeditionResources: (loot: Array<{ resourceId: string; quantity: number }>) => void
  applyWeaponDamages: (damages: WeaponDamage[]) => void
  repairWeapon: () => void
  addGuildReputation: (amount: number) => void
  setWeaponTier: (tier: number) => void  // dev helper
}
```

### Default values

```typescript
const INITIAL_WEAPON: StubWeapon = {
  id: 'weapon_stub',
  name: 'Железный меч',
  tier: 1,
  durability: 100,
  maxDurability: 100,
  scars: [],
}
```

## 10.3 Right panel integration

The right panel currently shows an "Encyclopedia" channel. We add a **"Guild"** channel for expedition notifications, backed by a message store in game-store.

### Channel tabs

The right panel gains tab navigation: "Энциклопедия" | "Гильдия". Each channel has its own content.

### Message type

```typescript
interface ChatMessage {
  id: string
  timestamp: number
  type: 'expedition_complete' | 'expedition_partial' | 'expedition_failed' | 'info'
  text: string
  details?: string[]
}
```

### Message store (game-store)

Messages are stored in game-store as a shared Zustand slice:

```typescript
// New fields in GameState:
chatMessages: ChatMessage[]
guildChannelActive: boolean
autoSwitchToGuild: boolean    // Checkbox: auto-switch to Guild channel on notification

// New actions:
addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void
setGuildChannelActive: (active: boolean) => void
setAutoSwitchToGuild: (enabled: boolean) => void
```

When an expedition resolves, the expedition store calls `addChatMessage()`. If `autoSwitchToGuild` is true, `setGuildChannelActive(true)` is also called. Random events during expeditions do NOT push messages — only completion notifications.

## 10.4 Module public API

File: `src/modules/expeditions/index.ts`

```typescript
// Types
export type { ... } from './types'

// Store
export { useExpeditionStore } from './expedition-store'

// UI
export { ExpeditionsPanel } from './ui/ExpeditionsPanel'

// Constants
export { MODULE_ID } from './constants'
```

The host imports only from this entry point. Deep imports into `lib/` or `data/` are not part of the public contract.

## 10.5 tsconfig paths

If using path aliases, add to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@expeditions/*": ["src/modules/expeditions/*"]
    }
  }
}
```

However, for MVP, relative imports within the module are sufficient. The host uses:

```typescript
import { ExpeditionsPanel } from '@/modules/expeditions'
```
