/**
 * Expeditions Module — Event Pre-Generation
 *
 * Pre-generates random encounters for an expedition run based on
 * location, target enemy, biome modifiers, and dev configuration.
 *
 * Biome modifiers affect:
 * - damage_severity: bumps severity of matching-element damage
 * - damage_chance: adds bonus chance for damage outcomes
 * - duration: not applied here (applied at dispatch time)
 * - event_count: adds bonus events
 * - loot_chance: not applied here (applied at resolution time)
 * - seeker_injury_chance: adds bonus seekerInjury to outcomes
 */

import type {
  ExpeditionLocation,
  Enemy,
  DevConfig,
  PreGeneratedEvent,
  Encounter,
  WeaponDamage,
  BiomeModifier,
} from '../types'

import { ENCOUNTERS } from '../data/encounters'
import { getBiome } from '../data/biomes'

import { randomInt, randomFloat, weightedPick, rollChance, generateId } from './rng'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Check if two tag arrays have at least one tag in common. */
function tagsIntersect(a: string[], b: string[]): boolean {
  if (a.length === 0 || b.length === 0) return false
  return a.some((tag) => b.includes(tag))
}

/** Clamp a severity value to valid range [1, 3]. */
function clampSeverity(value: number): 1 | 2 | 3 {
  return Math.min(3, Math.max(1, Math.round(value))) as 1 | 2 | 3
}

/** Apply damage multiplier to weapon damage severities. */
function applyDamageMultiplier(
  damages: WeaponDamage[],
  multiplier: number
): WeaponDamage[] {
  return damages.map((d) => ({
    ...d,
    severity: clampSeverity(d.severity * multiplier),
  }))
}

/** Apply biome modifiers that affect damage severity. */
function applyBiomeDamageModifiers(
  damages: WeaponDamage[],
  modifiers: BiomeModifier[]
): WeaponDamage[] {
  return damages.map((d) => {
    let bonusSeverity = 0
    for (const mod of modifiers) {
      if (mod.target !== 'damage_severity') continue
      // If modifier specifies an element, only apply to matching damage
      if (mod.element && d.element !== mod.element) continue
      // value is a relative bonus (e.g. 0.5 = +50% severity)
      bonusSeverity += d.severity * mod.value
    }
    if (bonusSeverity > 0) {
      return { ...d, severity: clampSeverity(d.severity + bonusSeverity) }
    }
    return d
  })
}

/** Calculate extra event count from biome modifiers. */
function bonusEventCount(modifiers: BiomeModifier[]): number {
  let bonus = 0
  for (const mod of modifiers) {
    if (mod.target === 'event_count') {
      // value 0.3 means ~30% chance of an extra event
      if (rollChance(mod.value)) bonus++
    }
  }
  return bonus
}

/** Apply seeker injury chance modifier to outcomes. */
function applyBiomeInjuryChance(
  effects: Encounter['outcomes'][number]['effects'],
  modifiers: BiomeModifier[]
): Encounter['outcomes'][number]['effects'] {
  for (const mod of modifiers) {
    if (mod.target === 'seeker_injury_chance' && rollChance(mod.value)) {
      return { ...effects, seekerInjury: true }
    }
  }
  return effects
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Pre-generate random events for an expedition run. */
export function preGenerateEvents(
  location: ExpeditionLocation,
  devConfig: DevConfig,
  _targetEnemy?: Enemy
): PreGeneratedEvent[] {
  // Get biome data for modifiers
  const biomeData = getBiome(location.biome)
  const biomeModifiers = biomeData?.modifiers ?? []

  // Base event count + bonus from biome
  const baseCount = randomInt(devConfig.eventsMin, devConfig.eventsMax)
  const bonusCount = bonusEventCount(biomeModifiers)
  const count = baseCount + bonusCount

  const events: PreGeneratedEvent[] = []

  for (let i = 0; i < count; i++) {
    // a. Generate trigger progress
    const triggerProgress = randomFloat(0.1, 0.95)

    // b. Filter encounters matching location criteria
    const filtered = ENCOUNTERS.filter((enc) => {
      // Biome must match
      if (!enc.allowedBiomes.includes(location.biome)) return false

      // Tier must match
      if (!enc.allowedTiers.includes(location.tier)) return false

      // Tag intersection must be non-empty OR encounter has no tags (universal)
      if (enc.tags.length > 0 && !tagsIntersect(enc.tags, location.tags)) {
        return false
      }

      return true
    })

    // If no encounters match, skip this event slot
    if (filtered.length === 0) continue

    // c. Pick a random encounter using weightedPick
    const encounter = weightedPick(
      filtered.map((enc: Encounter) => ({
        item: enc,
        weight: enc.weight ?? 5,
      }))
    )

    // d. Pick an outcome using weightedPick
    const outcome = weightedPick(
      encounter.outcomes.map((o) => ({
        item: o,
        weight: o.chance,
      }))
    )

    // e. Apply biome modifiers to effects
    let adjustedEffects = { ...outcome.effects }

    // Apply damage multiplier from dev config
    if (adjustedEffects.weaponDamages && adjustedEffects.weaponDamages.length > 0) {
      adjustedEffects = {
        ...adjustedEffects,
        weaponDamages: applyDamageMultiplier(
          adjustedEffects.weaponDamages,
          devConfig.damageMultiplier
        ),
      }
    }

    // Apply biome damage severity modifiers
    if (adjustedEffects.weaponDamages && adjustedEffects.weaponDamages.length > 0) {
      adjustedEffects = {
        ...adjustedEffects,
        weaponDamages: applyBiomeDamageModifiers(
          adjustedEffects.weaponDamages,
          biomeModifiers
        ),
      }
    }

    // Apply biome seeker injury chance
    adjustedEffects = applyBiomeInjuryChance(adjustedEffects, biomeModifiers)

    // f. Create PreGeneratedEvent
    events.push({
      id: generateId(),
      encounterId: encounter.id,
      triggerProgress,
      resolved: false,
      encounterResult: {
        text: outcome.description,
        effects: adjustedEffects,
      },
    })
  }

  // 3. Sort events by triggerProgress ascending
  events.sort((a, b) => a.triggerProgress - b.triggerProgress)

  return events
}

/**
 * Roll biome complications at expedition start.
 * Returns IDs of complications that triggered.
 */
export function rollStartComplications(
  location: ExpeditionLocation
): string[] {
  const biomeData = getBiome(location.biome)
  if (!biomeData) return []

  const triggered: string[] = []
  for (const comp of biomeData.complications) {
    if (comp.trigger === 'on_expedition_start' && rollChance(comp.chance)) {
      triggered.push(comp.id)
    }
  }
  return triggered
}

/**
 * Roll biome complications for a specific event.
 * Returns IDs of complications that triggered.
 */
export function rollEventComplications(
  location: ExpeditionLocation
): string[] {
  const biomeData = getBiome(location.biome)
  if (!biomeData) return []

  const triggered: string[] = []
  for (const comp of biomeData.complications) {
    if (comp.trigger === 'on_event' && rollChance(comp.chance)) {
      triggered.push(comp.id)
    }
  }
  return triggered
}
