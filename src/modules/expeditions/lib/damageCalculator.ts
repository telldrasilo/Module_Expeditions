/**
 * Expeditions Module — Damage Calculation Logic
 *
 * Pure functions for weapon damage chance, severity mapping,
 * and durability loss calculations.
 */

import { BASE_DAMAGE_CHANCE, DURABILITY_LOSS_PER_SEVERITY } from '../constants'

/** Calculate if an attack causes weapon damage. */
export function calculateDamageChance(
  currentDurability: number,
  maxDurability: number,
  damageMultiplier: number
): number {
  return (
    BASE_DAMAGE_CHANCE *
    (1 - currentDurability / maxDurability) *
    damageMultiplier
  )
}

/** Calculate severity based on enemy danger level. */
export function severityFromDangerLevel(level: number): 1 | 2 | 3 {
  if (level <= 2) return 1
  if (level === 3) return 2
  return 3 // 4-5
}

/** Calculate severity based on location tier (environment events). */
export function severityFromTier(tier: number): 1 | 2 | 3 {
  if (tier <= 2) return 1
  if (tier === 3) return 2
  return 3 // 4+
}

/** Calculate durability loss for a given severity. */
export function durabilityLoss(severity: 1 | 2 | 3): number {
  return DURABILITY_LOSS_PER_SEVERITY[severity]
}
