/**
 * Expeditions Module — Loot Calculation
 *
 * Determines resource drops for a completed expedition based on
 * location biome and tier, using stub resource frequency data.
 */

import type { Biome, LocationTier, ResourceFrequency } from '../types'
import { STUB_RESOURCES } from '../data/stubResources'
import { randomInt, rollChance } from './rng'

// ---------------------------------------------------------------------------
// Frequency → weight mapping
// ---------------------------------------------------------------------------

const FREQUENCY_WEIGHTS: Record<ResourceFrequency, number> = {
  common: 100,
  uncommon: 50,
  rare: 15,
  legendary: 3,
}

function frequencyToWeight(frequency: ResourceFrequency): number {
  return FREQUENCY_WEIGHTS[frequency]
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Calculate loot for a completed expedition. */
export function calculateLoot(
  location: { biome: Biome },
  tier: LocationTier
): Array<{ resourceId: string; quantity: number }> {
  const loot: Array<{ resourceId: string; quantity: number }> = []

  for (const resource of STUB_RESOURCES) {
    // Find biome entry matching location.biome
    const biomeEntry = resource.biomes.find((b) => b.biome === location.biome)
    if (!biomeEntry) continue

    const weight = frequencyToWeight(biomeEntry.frequency)
    const tierMod = 1 + (tier - 1) * 0.2
    const dropChance = (weight * tierMod) / 100

    if (rollChance(dropChance)) {
      const quantity = randomInt(1, Math.ceil(tier * 1.5))
      loot.push({ resourceId: resource.id, quantity })
    }
  }

  return loot
}
