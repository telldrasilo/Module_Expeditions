/**
 * Expeditions Module — Public API
 *
 * The host (SkinShell) imports only from this entry point.
 * Deep imports into lib/ or data/ are not part of the public contract.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type {
  Biome,
  Element,
  LocationTier,
  ResourceFrequency,
  BiomeMood,
  BiomeModifier,
  BiomeComplication,
  BiomeData,
  ExpeditionLocation,
  UnlockCondition,
  DamageType,
  EnemyAttack,
  Enemy,
  EnemyDrop,
  WeaponDamage,
  QuestGiver,
  StubResource,
  QuestTemplate,
  GeneratedQuest,
  ResourceHint,
  EncounterCategory,
  Encounter,
  EncounterOutcome,
  EncounterEffects,
  ExpeditionState,
  ExpeditionRun,
  PreGeneratedEvent,
  EncounterResult,
  OutcomeStatus,
  ExpeditionOutcome,
  ExpeditionWeaponSnapshot,
  StubWeapon,
  DevConfig,
  ChatMessage,
  QuestBoardState,
} from './types'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

export { BIOMES, getBiome, getAllBiomes } from './data/biomes'

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export { useExpeditionStore } from './expedition-store'

export type { ExpeditionHostValue } from './expedition-host-context'
export { ExpeditionHostProvider, useExpeditionHost } from './expedition-host-context'

export { weaponMeetsLocationRequirement } from './lib/weaponGates'

// ---------------------------------------------------------------------------
// UI
// ---------------------------------------------------------------------------

export { ExpeditionsPanel } from './ui/ExpeditionsPanel'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export { MODULE_ID } from './constants'
