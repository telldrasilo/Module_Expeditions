/**
 * Expeditions Module — Quest Board Generation
 *
 * Generates individual quests and full quest boards from templates,
 * locations, enemies, resources, and quest givers.
 */

import type {
  Biome,
  GeneratedQuest,
  ResourceHint,
  Element,
  QuestTemplate,
} from '../types'

import { LOCATIONS } from '../data/locations'
import { ENEMIES } from '../data/enemies'
import { QUEST_GIVERS } from '../data/questGivers'
import { QUEST_TEMPLATES } from '../data/questTemplates'
import { STUB_RESOURCES } from '../data/stubResources'

import {
  QUEST_TYPE_DURATION_MULTIPLIER,
  BOARD_SIZE_MIN,
  BOARD_SIZE_MAX,
} from '../constants'

import { randomInt, randomPick, weightedPick, generateId } from './rng'

// ---------------------------------------------------------------------------
// Quest type weights — hunt/gather more common, boss rare
// ---------------------------------------------------------------------------

const QUEST_TYPE_WEIGHTS: Record<QuestTemplate['type'], number> = {
  hunt: 25,
  gather: 20,
  explore: 15,
  deliver: 12,
  escort: 10,
  clear: 10,
  rescue: 5,
  boss: 3,
}

/** Default MVP biomes used when unlockedBiomes is not specified. */
const MVP_BIOMES: Biome[] = ['forest', 'swamp', 'mountains', 'volcanic', 'deep_mines']

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Find a quest giver who prefers the given biome, or fall back to any. */
function pickQuestGiver(biome: Biome) {
  const preferred = QUEST_GIVERS.filter(
    (g) => g.preferredBiomes && g.preferredBiomes.includes(biome)
  )
  const pool = preferred.length > 0 ? preferred : QUEST_GIVERS
  return randomPick(pool)
}

/** Fill template placeholders: {enemy}, {location}, {resource}, {questGiver} */
function fillTemplate(
  template: string,
  vars: Record<string, string>
): string {
  let result = template
  for (const [key, value] of Object.entries(vars)) {
    result = result.replaceAll(`{${key}}`, value)
  }
  return result
}

/** Build resource hints for a given biome. */
function buildResourceHints(biome: Biome): ResourceHint[] {
  const hints: ResourceHint[] = []
  for (const res of STUB_RESOURCES) {
    const match = res.biomes.find((b) => b.biome === biome)
    if (match) {
      hints.push({ materialId: res.id, frequency: match.frequency })
    }
  }
  return hints
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Generate a single quest. */
export function generateQuest(unlockedBiomes?: Biome[]): GeneratedQuest {
  const biomes = unlockedBiomes ?? MVP_BIOMES

  // 1. Pick a random quest template (weighted by type)
  const template = weightedPick(
    QUEST_TEMPLATES.map((t) => ({
      item: t,
      weight: QUEST_TYPE_WEIGHTS[t.type],
    }))
  )

  // 2. Pick a random unlocked biome
  const biome = randomPick(biomes)

  // 3. Pick a random location in that biome
  const biomeLocations = LOCATIONS.filter((l) => l.biome === biome)
  if (biomeLocations.length === 0) {
    // Fallback: pick any location from any unlocked biome
    const allLocations = LOCATIONS.filter((l) => biomes.includes(l.biome))
    const location = randomPick(allLocations.length > 0 ? allLocations : LOCATIONS)
    return buildQuestFromLocation(template, location, biomes)
  }
  const location = randomPick(biomeLocations)

  return buildQuestFromLocation(template, location, biomes)
}

/** Internal: build a GeneratedQuest from a template + location. */
function buildQuestFromLocation(
  template: QuestTemplate,
  location: (typeof LOCATIONS)[number],
  _biomes: Biome[]
): GeneratedQuest {
  const tier = location.tier

  // 4. Resolve target
  let targetEnemyId: string | undefined
  let targetResourceId: string | undefined
  let enemyName: string | undefined
  let resourceName: string | undefined

  if (template.requiredDataType === 'enemy') {
    const matching = ENEMIES.filter(
      (e) =>
        e.biomes.includes(location.biome) &&
        tier >= e.tierRange[0] &&
        tier <= e.tierRange[1]
    )
    if (matching.length > 0) {
      const enemy = randomPick(matching)
      targetEnemyId = enemy.id
      enemyName = enemy.name
    }
  } else if (template.requiredDataType === 'resource') {
    const matching = STUB_RESOURCES.filter((r) =>
      r.biomes.some((b) => b.biome === location.biome)
    )
    if (matching.length > 0) {
      const resource = randomPick(matching)
      targetResourceId = resource.id
      resourceName = resource.name
    }
  }

  // 5. Pick quest giver (prefer those with preferredBiomes matching location biome)
  const questGiver = pickQuestGiver(location.biome)

  // 6. Fill template strings
  const vars: Record<string, string> = {
    enemy: enemyName ?? 'неизвестного врага',
    location: location.name,
    resource: resourceName ?? 'редкий ресурс',
    questGiver: questGiver.name,
  }
  const title = fillTemplate(template.titleTemplate, vars)
  const description = fillTemplate(template.descriptionTemplate, vars)

  // 7. Calculate reward
  const gold = Math.round(
    template.baseReward.gold * (1 + (tier - 1) * 0.5)
  )
  const reputation = Math.round(template.baseReward.reputation * tier)

  // 8. Calculate duration
  const typeMultiplier = QUEST_TYPE_DURATION_MULTIPLIER[template.type]
  const baseMinutes = 60 * tier * typeMultiplier
  const durationMs = baseMinutes * 60 * 1000

  // 9. Aggregate risks: location.risks ∪ (enemy attacks' elements if combat)
  const risks: Element[] = [...location.risks]
  if (targetEnemyId) {
    const enemy = ENEMIES.find((e) => e.id === targetEnemyId)
    if (enemy) {
      for (const attack of enemy.attacks) {
        if (attack.element && !risks.includes(attack.element)) {
          risks.push(attack.element)
        }
      }
    }
  }

  // 10. Build resource hints
  const resourceHints = buildResourceHints(location.biome)

  return {
    id: generateId(),
    templateId: template.id,
    locationId: location.id,
    questGiverId: questGiver.id,
    title,
    description,
    targetEnemyId,
    targetResourceId,
    reward: { gold, reputation },
    durationMs,
    resourceHints,
    risks,
  }
}

/** Generate a full quest board (3-6 quests). */
export function generateQuestBoard(unlockedBiomes?: Biome[]): GeneratedQuest[] {
  const count = randomInt(BOARD_SIZE_MIN, BOARD_SIZE_MAX)
  const quests: GeneratedQuest[] = []
  const usedLocationIds = new Set<string>()

  let attempts = 0
  const maxAttempts = count * 10

  while (quests.length < count && attempts < maxAttempts) {
    attempts++
    const quest = generateQuest(unlockedBiomes)

    // Ensure no duplicate location IDs
    if (usedLocationIds.has(quest.locationId)) {
      continue
    }

    usedLocationIds.add(quest.locationId)
    quests.push(quest)
  }

  return quests
}
