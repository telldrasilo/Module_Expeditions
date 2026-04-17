/**
 * Expeditions Module — Expedition Resolution
 *
 * Resolves a completed expedition run by applying all un-resolved
 * events, calculating outcome status, loot, damages, and narrative.
 */

import type {
  ExpeditionRun,
  ExpeditionWeaponSnapshot,
  ExpeditionOutcome,
  OutcomeStatus,
  WeaponDamage,
  PreGeneratedEvent,
} from '../types'

import { LOCATIONS } from '../data/locations'

import { calculateLoot } from './lootCalculator'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Resolve a single un-resolved event: mark as resolved and collect effects. */
function resolveEvent(event: PreGeneratedEvent): {
  weaponDamages: WeaponDamage[]
  addResources: Array<{ resourceId: string; amount: number }>
  seekerInjury: boolean
  reputationChange: number
} {
  // Mark as resolved
  event.resolved = true

  const result = event.encounterResult
  const damages: WeaponDamage[] = []
  const resources: Array<{ resourceId: string; amount: number }> = []
  let seekerInjury = false
  let reputationChange = 0

  if (result) {
    const effects = result.effects

    if (effects.weaponDamages) {
      damages.push(...effects.weaponDamages)
    }

    if (effects.addResources) {
      resources.push(...effects.addResources)
    }

    if (effects.seekerInjury) {
      seekerInjury = true
    }

    if (effects.reputationChange) {
      reputationChange += effects.reputationChange
    }
  }

  return { weaponDamages: damages, addResources: resources, seekerInjury, reputationChange }
}

/** Merge additional resources into the loot array, stacking duplicates. */
function mergeResources(
  loot: Array<{ resourceId: string; quantity: number }>,
  additions: Array<{ resourceId: string; amount: number }>
): Array<{ resourceId: string; quantity: number }> {
  const map = new Map<string, number>()

  // Seed with existing loot
  for (const item of loot) {
    map.set(item.resourceId, (map.get(item.resourceId) ?? 0) + item.quantity)
  }

  // Add event resources
  for (const item of additions) {
    map.set(item.resourceId, (map.get(item.resourceId) ?? 0) + item.amount)
  }

  return Array.from(map.entries()).map(([resourceId, quantity]) => ({
    resourceId,
    quantity,
  }))
}

/** Build a Russian-language narrative summary based on outcome status. */
function buildNarrative(status: OutcomeStatus, locationName: string): string {
  switch (status) {
    case 'success':
      return `Экспедиция в ${locationName} завершилась успешно! Искатель вернулся без серьёзных ранений.`
    case 'partial':
      return `Экспедиция в ${locationName} завершилась с трудностями. Оружие пострадало, но задание выполнено.`
    case 'failure':
      return `Экспедиция в ${locationName} провалилась. Искатель ранен, оружие повреждено.`
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Resolve an expedition that has completed its timer. */
export function resolveExpedition(
  run: ExpeditionRun,
  weapon: ExpeditionWeaponSnapshot
): ExpeditionOutcome {
  // 1. Apply all un-resolved events automatically
  let hasSeekerInjury = false
  const allWeaponDamages: WeaponDamage[] = []
  const allEventResources: Array<{ resourceId: string; amount: number }> = []
  let eventReputationChange = 0

  for (const event of run.events) {
    if (!event.resolved) {
      const result = resolveEvent(event)

      if (result.seekerInjury) {
        hasSeekerInjury = true
      }

      allWeaponDamages.push(...result.weaponDamages)
      allEventResources.push(...result.addResources)
      eventReputationChange += result.reputationChange
    } else {
      // Already resolved — still collect its effects for aggregation
      if (event.encounterResult) {
        const effects = event.encounterResult.effects
        if (effects.seekerInjury) {
          hasSeekerInjury = true
        }
        if (effects.weaponDamages) {
          allWeaponDamages.push(...effects.weaponDamages)
        }
        if (effects.addResources) {
          allEventResources.push(...effects.addResources)
        }
        if (effects.reputationChange) {
          eventReputationChange += effects.reputationChange
        }
      }
    }
  }

  // 2. Calculate outcome status
  const weaponBroken = weapon.durability <= 0 || run.weaponBroken

  let status: OutcomeStatus
  if (!hasSeekerInjury && !weaponBroken) {
    status = 'success'
  } else if (hasSeekerInjury && weaponBroken) {
    status = 'failure'
  } else {
    status = 'partial'
  }

  // 3. Calculate loot using the quest's location
  const location = LOCATIONS.find((l) => l.id === run.quest.locationId)
  const baseLoot = location
    ? calculateLoot(location, location.tier)
    : []

  // 4. Also add resources from encounter event outcomes
  const loot = mergeResources(baseLoot, allEventResources)

  // 5. Collect all weapon damages (already collected above)
  // 6. Calculate total gold reward (from quest reward)
  const goldReward = run.quest.reward.gold

  // 7. Calculate reputation change (quest reward + event reputation changes)
  const reputationChange = run.quest.reward.reputation + eventReputationChange

  // 8. Build narrative summary
  const locationName = location?.name ?? run.quest.locationId
  const narrativeSummary = buildNarrative(status, locationName)

  return {
    status,
    loot,
    weaponDamages: allWeaponDamages,
    reputationChange,
    goldReward,
    narrativeSummary,
  }
}
