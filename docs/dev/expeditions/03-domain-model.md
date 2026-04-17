# 03. Domain Model

All TypeScript types for the module. These are the authoritative definitions; the TZ prose is illustrative only.

## 3.1 Base types

```typescript
/** Biome identifiers — shared with RESOURCE_DEPOT (stub for now). */
export type Biome =
  | 'mountains' | 'forest' | 'swamp' | 'volcanic' | 'deep_mines'
  | 'desert' | 'tundra' | 'ocean_coast' | 'ancient_ruins'
  | 'shadow_realm' | 'crystal_caves' | 'bog'

/** Element identifiers — 13 fundamental forces. */
export type Element =
  | 'flame' | 'frost' | 'lightning' | 'decay' | 'blood' | 'bone'
  | 'mind' | 'shadow' | 'light' | 'distortion' | 'magnetism' | 'space' | 'void'

/** Difficulty tier (MVP uses 1-4 only). */
export type LocationTier = 1 | 2 | 3 | 4 | 5

/** Resource frequency band. */
export type ResourceFrequency = 'common' | 'uncommon' | 'rare' | 'legendary'
```

## 3.2 Location

```typescript
export interface ExpeditionLocation {
  id: string
  biome: Biome
  tier: LocationTier
  name: string                    // Player-facing (RU): 'Опушка Шепчущих Дубов'
  description: string
  risks: Element[]                // Dominant elements
  elementalProbabilities: Partial<Record<Element, number>>  // 0-1 per element
  requiredItemTier?: number       // Min weapon tier to enter
  unlockCondition?: UnlockCondition
  tags: string[]                  // Semantic tags for encounter filtering
}

export interface UnlockCondition {
  type: 'quest' | 'key' | 'reputation' | 'globalEvent'
  value: string
}
```

## 3.3 Enemy

```typescript
export type DamageType = 'physical' | 'elemental'

export interface EnemyAttack {
  type: DamageType
  element?: Element               // Present when type = 'elemental'
}

export interface Enemy {
  id: string
  name: string
  description: string
  biomes: Biome[]
  tierRange: [LocationTier, LocationTier]
  attacks: EnemyAttack[]          // 1-3 attacks per enemy
  dangerLevel: 1 | 2 | 3 | 4 | 5
  possibleDrops: EnemyDrop[]
  tags: string[]
}

export interface EnemyDrop {
  materialId: string
  chance: number                  // 0-1
  amount: [number, number]        // [min, max]
}
```

**Enemy attack patterns (MVP):**

| Pattern | Example |
|---------|---------|
| Physical only | `[{ type: 'physical' }]` |
| Elemental only | `[{ type: 'elemental', element: 'flame' }]` |
| Mixed | `[{ type: 'physical' }, { type: 'elemental', element: 'blood' }]` |

## 3.4 Weapon damage

```typescript
export interface WeaponDamage {
  element?: Element               // Element of damage (for elemental type)
  type: 'physical' | 'elemental'
  severity: 1 | 2 | 3            // 1=light, 2=medium, 3=critical
  source: string                  // ID of enemy or encounter that caused it
}
```

## 3.5 Quest giver

```typescript
export interface QuestGiver {
  id: string
  name: string
  role: 'merchant' | 'blacksmith' | 'alchemist' | 'noble' | 'commoner'
  preferredBiomes?: Biome[]
}
```

## 3.6 Stub resource

```typescript
export interface StubResource {
  id: string                      // 'mat-iron_ore', 'con-health_potion'
  name: string
  type: 'material' | 'consumable'
  biomes: { biome: Biome; frequency: ResourceFrequency }[]
  icon?: string
}
```

## 3.7 Quest template

```typescript
export interface QuestTemplate {
  id: string                      // 'hunt', 'gather', 'explore', 'deliver', 'boss'
  type: 'hunt' | 'gather' | 'explore' | 'deliver' | 'boss'
  titleTemplate: string           // 'Hunt {enemy} at {location}'
  descriptionTemplate: string
  baseReward: { gold: number; reputation: number }
  requiredDataType: 'enemy' | 'resource' | 'none'
}
```

## 3.8 Generated quest (expedition card)

```typescript
export interface GeneratedQuest {
  id: string                      // UUID
  templateId: string
  locationId: string
  questGiverId: string
  title: string                   // Filled template
  description: string
  targetEnemyId?: string
  targetResourceId?: string
  reward: { gold: number; reputation: number }
  durationMs: number              // Raw duration before timeScale
  resourceHints: ResourceHint[]
  risks: Element[]                // Aggregated from location + enemies
}

export interface ResourceHint {
  materialId: string
  frequency: ResourceFrequency
}
```

## 3.9 Expedition run

```typescript
export type ExpeditionState =
  | 'idle'          // No active expedition
  | 'traveling'     // Timer running
  | 'resolving'     // Timer ended, calculating outcome
  | 'completed'     // Outcome ready, awaiting loot collection
  | 'failed'        // Expedition failed

export interface ExpeditionRun {
  id: string
  quest: GeneratedQuest
  state: ExpeditionState
  startedAt: number               // epoch ms (real dispatch time)
  expectedEndAt: number           // epoch ms (real end time, accounting for timeScale)
  progress: number                // 0-1, recalculated on each tick
  events: PreGeneratedEvent[]
  revealedEvents: number          // How many events have been shown
  weaponBroken: boolean           // True if durability hit 0 during the run
  outcome?: ExpeditionOutcome
}

export interface PreGeneratedEvent {
  id: string
  encounterId: string             // Reference to Encounter template
  triggerProgress: number         // 0-1: when this event fires
  resolved: boolean               // Whether effects were applied
  encounterResult?: EncounterResult
}

export interface EncounterResult {
  text: string
  effects: EncounterEffects
}

export interface EncounterEffects {
  weaponDamages?: WeaponDamage[]
  addResources?: { resourceId: string; amount: number }[]
  seekerInjury?: boolean          // Stub effect
  timeModifier?: number           // ms change to remaining time (can be negative)
  reputationChange?: number
  keyItem?: string
}
```

## 3.10 Expedition outcome

```typescript
export interface ExpeditionOutcome {
  status: 'success' | 'partial' | 'failure'
  loot: Array<{ resourceId: string; quantity: number }>
  weaponDamages: WeaponDamage[]
  reputationChange: number
  goldReward: number
  narrativeSummary: string
}
```

## 3.11 Equipped weapon (MVP)

```typescript
/** Player weapon for expeditions; replace with WEAPON_INVENTORY integration later. */
export interface StubWeapon {
  id: string
  name: string
  tier: number
  durability: number              // Current (0 = broken)
  maxDurability: number           // Max (default 100)
  scars: WeaponDamage[]
}
```

## 3.12 Dev config

```typescript
export interface DevConfig {
  enabled: boolean
  timeScale: number               // 1 = real-time, 60 = 1 min/sec, 3600 = 1 hr/sec
  damageMultiplier: number        // 0.1 - 3.0
  eventsMin: number               // Min events per expedition (1-10)
  eventsMax: number               // Max events per expedition (1-10)
}
```

## 3.13 Chat message

```typescript
/** Message in the right panel Guild channel. */
export interface ChatMessage {
  id: string
  timestamp: number
  type: 'expedition_complete' | 'expedition_partial' | 'expedition_failed' | 'info'
  text: string
  details?: string[]
}
```
