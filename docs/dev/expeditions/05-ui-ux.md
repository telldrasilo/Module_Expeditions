# 05. UI/UX

## 5.1 Guild layout overview

```
┌─ SIDEBAR ────────────────────────────┐
│  ⚔️ SwordCraft                       │
│                                       │
│  🔥 Forge                             │
│  🛡️ Seekers' Guild  [navigation]     │
│                                       │
│  ┌─ STATUS BLOCK ───────────────┐     │
│  │  [ DEV mode ☐ ]             │     │
│  │  🔥 Forge is running        │     │
│  └──────────────────────────────┘     │
│  [Reset game]                         │
└───────────────────────────────────────┘

┌─ MAIN (Seekers' Guild) ───────────────────────────────────┐
│  ┌─ TABS ─────────────────────────────────────────────┐   │
│  │  [Expeditions]  [Encyclopedia]  [Intendant]       │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─ TAB: EXPEDITIONS ────────────────────────────────┐    │
│  │                                                     │    │
│  │  ┌─ ACTIVE EXPEDITION ─────────────────────────┐  │    │
│  │  │ 🏔️ Stormspire Peak | Tier 3 | ⏱ 1:24:15    │  │    │
│  │  │ ████████████░░░░░ 67%                       │  │    │
│  │  │ [⏭ Skip to end] [⏭ Next event]             │  │    │
│  │  │                                              │  │    │
│  │  │ 📜 Events:                                   │  │    │
│  │  │ 12:03 — Seeker stumbled upon...              │  │    │
│  │  │ 12:18 — Discovered ancient altar...           │  │    │
│  │  └──────────────────────────────────────────────┘  │    │
│  │                                                     │    │
│  │  ┌─ QUEST BOARD ───────────────────────────────┐   │    │
│  │  │  [Card 1]  [Card 2]  [Card 3]               │   │    │
│  │  │  [Card 4]  [Card 5]                          │   │    │
│  │  └──────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─ TAB: ENCYCLOPEDIA ────────────────────────────────┐   │
│  │  Locations | Elements | Enemies                     │   │
│  │  (developer reference)                              │   │
│  └────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘

┌─ RIGHT PANEL (chat/events) ───────────────────────────────┐
│  Encyclopedia | [Archivist]                                │
│  ──────────────────────────────                            │
│  📗 Expedition complete: Stormspire Peak — Success!       │
│  📗 Found: Iron Ore ×3, Fire Crystal ×1                   │
│  🔴 Weapon damaged: Flame (×2)                            │
└───────────────────────────────────────────────────────────┘
```

## 5.2 Sidebar navigation

The sidebar gains a second navigation button beneath "Forge":

```tsx
<button className={activeModule === 'forge' ? 'active-style' : 'default-style'}>
  🔥 Кузница
</button>
<button className={activeModule === 'guild' ? 'active-style' : 'default-style'}>
  🛡️ Гильдия Искателей
</button>
```

The `activeModule` state (`'forge' | 'guild'`) lives in `SkinShell` or `game-store`. The main area renders conditionally:

```tsx
{activeModule === 'forge' ? <ForgeModule /> : <ExpeditionsPanel />}
```

## 5.3 Quest card

Each expedition on the board is displayed as a card:

```
┌──────────────────────────────────┐
│  [Illustration image]            │  ← Top: small image for visual orientation
│                                  │
├──────────────────────────────────┤
│  Hunt Fire Fox                   │  ← Title
│  at Heart of Rotwood             │
│                                  │
│  🌲 Forest | Tier 3 | ⏱ 3h      │  ← Biome, tier, duration
│                                  │
│  ⚠ Risks: Decay, Shadow, Flame  │  ← Element icons
│                                  │
│  Client: Outskirts Merchant      │
│                                  │
│  💰 80 gold | ⭐ 30 reputation   │  ← Reward
│                                  │
│  📦 Expected: Iron Ore (common), │  ← Resource hints
│     Rotten Wood (uncommon)       │
│                                  │
│  [Dispatch seeker →]            │  ← Action button
└──────────────────────────────────┘
```

**Card states:**
- **Available:** no active run, card is clickable
- **Locked:** active run in progress, button disabled
- **Selected:** card is highlighted, dispatch screen opens

## 5.4 Dispatch screen

A modal or expanded view when a card is selected:

- Full quest description
- Location details (biome, tier, risks)
- Stub seeker info (always the same in MVP)
- Stub weapon info (durability, current scars)
- "Confirm dispatch" button
- "Cancel" button

## 5.5 Active expedition view

Shown at the top of the Expeditions tab when a run is in `traveling` state:

- **Header:** Location name, tier, remaining time
- **Progress bar:** with shimmer animation (reuse `.animate-progress-shimmer`)
- **Skip buttons** (dev mode only):
  - ⏭ Skip to end — sets `expectedEndAt = Date.now()`
  - ⏭ Next event — advances progress to next `triggerProgress`
- **Event log:** chronological list of revealed events with timestamps and effect summaries

## 5.6 Expedition results

Shown when run state is `completed` or `failed`:

- Outcome banner (Success / Partial / Failure)
- Loot table (resource name × quantity)
- Weapon damage report (list of new damages)
- Gold and reputation earned
- "Collect" button → moves loot to game-store, transitions run to `idle`

## 5.7 Encyclopedia tab

A developer-facing reference inside the Guild:

- **Locations** sub-tab: table of all locations with biome, tier, risks, tags
- **Elements** sub-tab: table of all 13 elements with biome probabilities
- **Enemies** sub-tab: table of all enemies with biomes, attacks, danger level

This is primarily for development analysis, not core gameplay.

## 5.8 Intendant tab (placeholder)

A third tab in the Guild — **Intendant** — is a placeholder for a future feature. In MVP it shows:

```
┌─ TAB: INTENDANT ──────────────────────────────────┐
│                                                     │
│              🏪 Интендант                           │
│                                                     │
│   Этот раздел будет доступен в будущих обновлениях  │
│                                                     │
│   Здесь появится магазин гильдии: покупка карт,     │
│   ключей, снаряжения для искателей.                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

The tab is visible but disabled (greyed out) or shows a "coming soon" message. This reserves the UI space and sets player expectations.

## 5.9 Right panel — Guild channel

The right panel currently has an "Encyclopedia" channel. We add a **"Guild"** channel for expedition notifications.

### Channel tabs in right panel

```
┌─ RIGHT PANEL ──────────────────────────────────┐
│  [Энциклопедия]  [Гильдия]                      │  ← Channel tabs
│  ──────────────────────────────────────────────  │
│  (content of active channel)                     │
└──────────────────────────────────────────────────┘
```

### Guild channel content

When an expedition completes, a message is pushed to the Guild channel:

```
📗 Экспедиция завершена: {location} — {status}!
📗 Найдено: {resource list}
🔴 Оружие получило повреждения: {damage list}
```

Random events during expeditions do **not** appear in the right panel — only completion notifications.

### Auto-switch to Guild channel

A checkbox controls whether the right panel automatically switches to the Guild channel when an expedition completes:

- **☑ Автопереход к каналу Гильдии** — when checked, the right panel switches to the Guild channel upon expedition completion
- When unchecked, the notification still appears in the Guild channel but the panel stays on whatever channel the user is viewing

This checkbox can be placed in the Guild channel header or in the dev panel.

### Message store

The Guild channel is backed by a **message store** (shared Zustand slice in game-store):

```typescript
interface ChatMessage {
  id: string
  timestamp: number
  type: 'expedition_complete' | 'expedition_partial' | 'expedition_failed' | 'info'
  text: string
  details?: string[]
}

// In game-store:
chatMessages: ChatMessage[]
guildChannelActive: boolean
addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void
setGuildChannelActive: (active: boolean) => void
```

Both the right panel and the expedition store can read/write to this store.

## 5.10 Styling conventions

- Reuse existing CSS utilities: `card-medieval`, `glow-gold`, `scrollbar-medieval`
- Reuse animation classes: `animate-progress-shimmer`, `animate-fade-in-up`, `animate-card-hover`
- Color palette: stone (backgrounds), amber (primary/gold), purple (mana), custom element colors
- All player-visible strings in Russian
- Follow the existing `SkinShell` dark medieval aesthetic
