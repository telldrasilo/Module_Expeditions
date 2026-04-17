/**
 * Expeditions Module — Random Number Generation Utilities
 *
 * Pure functions for all RNG needs within the expeditions module.
 */

/** Random integer in [min, max] inclusive. */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** Random float in [min, max). */
export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

/** Pick a random element from an array. */
export function randomPick<T>(arr: readonly T[]): T {
  if (arr.length === 0) {
    throw new Error('randomPick: cannot pick from an empty array')
  }
  return arr[Math.floor(Math.random() * arr.length)]
}

/** Pick a random element using weights. Each entry has { item, weight }. */
export function weightedPick<T>(entries: Array<{ item: T; weight: number }>): T {
  if (entries.length === 0) {
    throw new Error('weightedPick: cannot pick from empty entries')
  }

  const totalWeight = entries.reduce((sum, e) => sum + e.weight, 0)
  const roll = Math.random() * totalWeight

  let accumulated = 0
  for (const entry of entries) {
    accumulated += entry.weight
    if (roll < accumulated) {
      return entry.item
    }
  }

  // Fallback (floating-point edge case) — return last item
  return entries[entries.length - 1].item
}

/** Roll a chance (0-1), returns true if roll <= chance. */
export function rollChance(chance: number): boolean {
  return Math.random() <= chance
}

/** Generate a simple UUID-like ID (for quests, runs, events). */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}
