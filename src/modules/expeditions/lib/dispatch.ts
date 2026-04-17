/**
 * Expeditions Module — Dispatch Logic
 *
 * Pure functions for creating expedition runs.
 * Extracted from the Zustand store to keep it lean.
 */

import type {
  BiomeData,
  DevConfig,
  ExpeditionRun,
  GeneratedQuest,
  PreGeneratedEvent,
} from '../types'

import { DURABILITY_LOSS_PER_SEVERITY } from '../constants'
import { LOCATIONS } from '../data/locations'
import { ENEMIES } from '../data/enemies'
import { getBiome } from '../data/biomes'
import { preGenerateEvents, rollStartComplications } from './eventGenerator'
import { generateId } from './rng'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Apply biome duration modifier to the quest's raw duration. */
function applyBiomeDurationModifier(
  durationMs: number,
  biomeData: BiomeData | undefined
): number {
  if (!biomeData) return durationMs

  const durationMod = biomeData.modifiers
    .filter((m) => m.target === 'duration')
    .reduce((sum, m) => sum + m.value, 0)

  return durationMs * (1 + durationMod)
}

/** Create complication events from triggered complication IDs. */
function createComplicationEvents(
  complicationIds: string[],
  biomeData: BiomeData | undefined
): PreGeneratedEvent[] {
  if (!biomeData) return []

  const events: PreGeneratedEvent[] = []
  for (const compId of complicationIds) {
    const comp = biomeData.complications.find((c) => c.id === compId)
    if (comp) {
      events.push({
        id: generateId(),
        encounterId: compId,
        triggerProgress: 0,
        resolved: false,
        encounterResult: {
          text: comp.description,
          effects: comp.effects,
        },
      })
    }
  }
  return events
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Build a complete ExpeditionRun from a quest and dev config. */
export function createExpeditionRun(
  quest: GeneratedQuest,
  weaponDurability: number,
  devConfig: DevConfig
): ExpeditionRun {
  // Find location
  const location = LOCATIONS.find((l) => l.id === quest.locationId)
  if (!location) {
    throw new Error(`Location not found: ${quest.locationId}`)
  }

  // Find target enemy (if any)
  const targetEnemy = quest.targetEnemyId
    ? ENEMIES.find((e) => e.id === quest.targetEnemyId)
    : undefined

  // Pre-generate events (includes biome modifier effects)
  const events = preGenerateEvents(location, devConfig, targetEnemy)

  // Roll start-of-expedition complications
  const startComplications = rollStartComplications(location)
  const biomeData = getBiome(location.biome)

  // Create complication events and prepend
  const complicationEvents = createComplicationEvents(startComplications, biomeData)
  const allEvents = [...complicationEvents, ...events].sort(
    (a, b) => a.triggerProgress - b.triggerProgress
  )

  // Apply biome duration modifier
  const adjustedDurationMs = applyBiomeDurationModifier(quest.durationMs, biomeData)

  // Calculate real duration accounting for timeScale
  const actualDurationMs = adjustedDurationMs / devConfig.timeScale
  const startedAt = Date.now()
  const expectedEndAt = startedAt + actualDurationMs

  return {
    id: generateId(),
    quest,
    state: 'traveling',
    startedAt,
    expectedEndAt,
    progress: 0,
    events: allEvents,
    revealedEvents: 0,
    weaponBroken: weaponDurability <= 0,
    triggeredComplications: startComplications,
    outcome: undefined,
  }
}

/** Calculate durability loss from weapon damages in event effects. */
export function calculateEventDurabilityLoss(
  weaponDamages: Array<{ severity: 1 | 2 | 3 }>
): number {
  return weaponDamages.reduce(
    (sum, dmg) => sum + DURABILITY_LOSS_PER_SEVERITY[dmg.severity],
    0
  )
}
