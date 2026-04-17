/**
 * Expeditions Module — TypeScript Types
 *
 * Authoritative definitions for all domain types.
 * TZ prose is illustrative only; these are the source of truth.
 */

// ---------------------------------------------------------------------------
// Base types
// ---------------------------------------------------------------------------

/** Biome identifiers — align with Resource Depot when the monorepo links catalogs. */
export type Biome =
  | 'mountains'
  | 'forest'
  | 'swamp'
  | 'volcanic'
  | 'deep_mines'
  | 'desert'
  | 'tundra'
  | 'ocean_coast'
  | 'ancient_ruins'
  | 'shadow_realm'
  | 'crystal_caves'
  | 'bog'

// ---------------------------------------------------------------------------
// Biome data ("living world" model)
// ---------------------------------------------------------------------------

/** Atmospheric mood of a biome — used for narrative generation. */
export type BiomeMood = 'serene' | 'mysterious' | 'oppressive' | 'hostile' | 'sacred' | 'eerie'

/** A modifier that a biome applies to encounters, damage, or duration. */
export interface BiomeModifier {
  id: string
  name: string
  description: string
  /** Which aspect this modifier affects. */
  target: 'damage_severity' | 'damage_chance' | 'duration' | 'event_count' | 'loot_chance' | 'seeker_injury_chance'
  /** Relative bonus/penalty (e.g. +0.5 = 50% more, -0.2 = 20% less). */
  value: number
  /** Only applies to damage of this element (if specified). */
  element?: Element
}

/** A biome-specific complication that can trigger during expeditions. */
export interface BiomeComplication {
  id: string
  name: string
  description: string
  /** When this complication can occur. */
  trigger: 'on_expedition_start' | 'on_event' | 'passive'
  /** Chance of triggering (0-1). Checked once per expedition for 'on_expedition_start', per event for 'on_event'. */
  chance: number
  /** Effects when triggered. */
  effects: EncounterEffects
  /** Semantic tags for narrative matching. */
  tags: string[]
}

/** Full biome definition with lore, modifiers, and complications. */
export interface BiomeData {
  id: Biome
  nameRu: string
  description: string
  lore: string
  mood: BiomeMood
  dominantElements: Element[]
  modifiers: BiomeModifier[]
  complications: BiomeComplication[]
  adjacent: Biome[]
  tags: string[]
}

/** Element identifiers — 13 fundamental forces. */
export type Element =
  | 'flame'
  | 'frost'
  | 'lightning'
  | 'decay'
  | 'blood'
  | 'bone'
  | 'mind'
  | 'shadow'
  | 'light'
  | 'distortion'
  | 'magnetism'
  | 'space'
  | 'void'

/** Difficulty tier (MVP uses 1-4 only). */
export type LocationTier = 1 | 2 | 3 | 4 | 5

/** Resource frequency band. */
export type ResourceFrequency = 'common' | 'uncommon' | 'rare' | 'legendary'

// ---------------------------------------------------------------------------
// Location
// ---------------------------------------------------------------------------

export interface ExpeditionLocation {
  id: string
  biome: Biome
  tier: LocationTier
  name: string // Player-facing (RU): 'Опушка Шепчущих Дубов'
  description: string // Short flavor (1-2 sentences)
  lore: string // Narrative context (2-3 paragraphs)
  questHooks: string[] // Example quest descriptions
  risks: Element[] // Dominant elements
  elementalProbabilities: Partial<Record<Element, number>> // 0-1 per element
  requiredItemTier?: number // Min weapon tier to enter
  unlockCondition?: UnlockCondition
  tags: string[] // Semantic tags for encounter filtering
}

export interface UnlockCondition {
  type: 'quest' | 'key' | 'reputation' | 'globalEvent'
  value: string
}

// ---------------------------------------------------------------------------
// Enemy
// ---------------------------------------------------------------------------

export type DamageType = 'physical' | 'elemental'

export interface EnemyAttack {
  type: DamageType
  element?: Element // Present when type = 'elemental'
}

export interface Enemy {
  id: string
  name: string // Player-facing (RU)
  description: string // Short flavor text
  biomes: Biome[]
  tierRange: [LocationTier, LocationTier]
  attacks: EnemyAttack[] // 1-3 attacks per enemy
  dangerLevel: 1 | 2 | 3 | 4 | 5
  possibleDrops: EnemyDrop[]
  tags: string[]
}

export interface EnemyDrop {
  materialId: string
  chance: number // 0-1
  amount: [number, number] // [min, max]
}

// ---------------------------------------------------------------------------
// Weapon damage & scars
// ---------------------------------------------------------------------------

export interface WeaponDamage {
  element?: Element // Element of damage (for elemental type)
  type: 'physical' | 'elemental'
  severity: 1 | 2 | 3 // 1=light, 2=medium, 3=critical
  source: string // ID of enemy or encounter that caused it
}

// ---------------------------------------------------------------------------
// Quest giver
// ---------------------------------------------------------------------------

export interface QuestGiver {
  id: string
  name: string // Player-facing (RU)
  role: 'merchant' | 'blacksmith' | 'alchemist' | 'noble' | 'commoner'
  preferredBiomes?: Biome[]
  description: string // Short flavor text
}

// ---------------------------------------------------------------------------
// Stub resource
// ---------------------------------------------------------------------------

export interface StubResource {
  id: string // 'mat-iron_ore', 'con-health_potion'
  name: string // Player-facing (RU)
  type: 'material' | 'consumable'
  biomes: { biome: Biome; frequency: ResourceFrequency }[]
  icon?: string
}

// ---------------------------------------------------------------------------
// Quest template
// ---------------------------------------------------------------------------

export interface QuestTemplate {
  id: string // 'hunt', 'gather', 'explore', 'deliver', 'boss', 'escort', 'clear', 'rescue'
  type: 'hunt' | 'gather' | 'explore' | 'deliver' | 'boss' | 'escort' | 'clear' | 'rescue'
  titleTemplate: string // 'Охота на {enemy} в {location}'
  descriptionTemplate: string
  baseReward: { gold: number; reputation: number }
  requiredDataType: 'enemy' | 'resource' | 'none'
}

// ---------------------------------------------------------------------------
// Generated quest (expedition card)
// ---------------------------------------------------------------------------

export interface GeneratedQuest {
  id: string // UUID
  templateId: string
  locationId: string
  questGiverId: string
  title: string // Filled template
  description: string
  targetEnemyId?: string
  targetResourceId?: string
  reward: { gold: number; reputation: number }
  durationMs: number // Raw duration before timeScale
  resourceHints: ResourceHint[]
  risks: Element[] // Aggregated from location + enemies
}

export interface ResourceHint {
  materialId: string
  frequency: ResourceFrequency
}

// ---------------------------------------------------------------------------
// Encounter
// ---------------------------------------------------------------------------

export type EncounterCategory =
  | 'combat'
  | 'environment'
  | 'remains'
  | 'wildlife'
  | 'npc'
  | 'puzzle'

export interface Encounter {
  id: string
  category: EncounterCategory
  templateText: string // '{{seeker}} наткнулся на {{enemy}}...'
  allowedBiomes: Biome[]
  allowedTiers: LocationTier[]
  requiredElement?: Element // If tied to a specific element
  possibleEnemies?: string[] // For combat category
  possibleResources?: string[] // For remains, wildlife
  outcomes: EncounterOutcome[]
  weight?: number // For weighted random selection
  tags: string[] // Semantic tags for filtering
}

export interface EncounterOutcome {
  id: string
  description: string
  chance: number // 0-1
  effects: EncounterEffects
}

export interface EncounterEffects {
  weaponDamages?: WeaponDamage[]
  addResources?: { resourceId: string; amount: number }[]
  seekerInjury?: boolean // Narrative flag until ADVENTURERS owns injuries
  timeModifier?: number // ms change to remaining time (can be negative)
  reputationChange?: number
  keyItem?: string
}

// ---------------------------------------------------------------------------
// Expedition run
// ---------------------------------------------------------------------------

export type ExpeditionState =
  | 'idle' // No active expedition
  | 'traveling' // Timer running
  | 'resolving' // Timer ended, calculating outcome
  | 'completed' // Outcome ready, awaiting loot collection
  | 'failed' // Expedition failed

export interface ExpeditionRun {
  id: string
  quest: GeneratedQuest
  state: ExpeditionState
  startedAt: number // epoch ms (real dispatch time)
  expectedEndAt: number // epoch ms (real end time, accounting for timeScale)
  progress: number // 0-1, recalculated on each tick
  events: PreGeneratedEvent[]
  revealedEvents: number // How many events have been shown
  weaponBroken: boolean // True if durability hit 0 during the run
  /** IDs of biome complications that have triggered during this run. */
  triggeredComplications: string[]
  outcome?: ExpeditionOutcome
}

export interface PreGeneratedEvent {
  id: string
  encounterId: string // Reference to Encounter template
  triggerProgress: number // 0-1: when this event fires
  resolved: boolean // Whether effects were applied
  encounterResult?: EncounterResult
}

export interface EncounterResult {
  text: string
  effects: EncounterEffects
}

// ---------------------------------------------------------------------------
// Expedition outcome
// ---------------------------------------------------------------------------

export type OutcomeStatus = 'success' | 'partial' | 'failure'

export interface ExpeditionOutcome {
  status: OutcomeStatus
  loot: Array<{ resourceId: string; quantity: number }>
  weaponDamages: WeaponDamage[]
  reputationChange: number
  goldReward: number
  narrativeSummary: string
}

// ---------------------------------------------------------------------------
// Equipped weapon (integration surface)
// ---------------------------------------------------------------------------

/**
 * Read-only snapshot of the weapon used for expedition logic and UI.
 * Host maps WEAPON_INVENTORY `WeaponRecord` → this shape (no planner recompute).
 */
export interface ExpeditionWeaponSnapshot {
  /** Stable id (`weaponId` in inventory, e.g. wpn_…). */
  weaponId: string
  displayName: string
  /** War Soul tier from inventory (`tierFromSoulPoints`); used for location gates. */
  warSoulTier: number
  /** Expedition durability track (host may map from record stats or a side channel). */
  durability: number
  maxDurability: number
  scars: WeaponDamage[]
  /**
   * Snapshot at craft; host multiplies soul-point grants: `addSoulPoints(id, base * affinityTotal)`.
   */
  affinityTotal?: number
}

/** @deprecated Use ExpeditionWeaponSnapshot */
export type StubWeapon = ExpeditionWeaponSnapshot

// ---------------------------------------------------------------------------
// Dev config
// ---------------------------------------------------------------------------

export interface DevConfig {
  enabled: boolean
  timeScale: number // 1 = real-time, 60 = 1 min/sec, 3600 = 1 hr/sec
  damageMultiplier: number // 0.1 - 3.0
  eventsMin: number // Min events per expedition (1-10)
  eventsMax: number // Max events per expedition (1-10)
}

// ---------------------------------------------------------------------------
// Chat message (right panel Guild channel)
// ---------------------------------------------------------------------------

/** Message in the right panel Guild channel. */
export interface ChatMessage {
  id: string
  timestamp: number
  type: 'expedition_complete' | 'expedition_partial' | 'expedition_failed' | 'info'
  text: string
  details?: string[]
}

// ---------------------------------------------------------------------------
// Quest board state
// ---------------------------------------------------------------------------

export interface QuestBoardState {
  quests: GeneratedQuest[]
  generatedAt: number // epoch ms
  expiresAt: number // epoch ms (daily refresh)
}
