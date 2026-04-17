/**
 * Expeditions Module — Zustand Store
 *
 * Manages: active expedition run, quest board, UI state, dev config.
 */

import { create } from 'zustand'
import type {
  DevConfig,
  ExpeditionRun,
  ExpeditionWeaponSnapshot,
  GeneratedQuest,
  QuestBoardState,
} from './types'
import { DEV_CONFIG_DEFAULTS } from './constants'
import { generateQuestBoard } from './lib/questGenerator'
import { resolveExpedition } from './lib/expeditionResolver'
import { createExpeditionRun, calculateEventDurabilityLoss } from './lib/dispatch'

// ---------------------------------------------------------------------------
// State & actions
// ---------------------------------------------------------------------------

export interface ExpeditionStoreState {
  /** Active expedition run (null when idle). */
  activeRun: ExpeditionRun | null

  /** Quest board state. */
  board: QuestBoardState | null

  /** Currently active Guild tab. */
  activeTab: 'expeditions' | 'encyclopedia' | 'intendant'

  /** Whether the dispatch screen is open. */
  dispatchScreenOpen: boolean

  /** ID of the quest selected for dispatch. */
  selectedQuestId: string | null

  /** Dev config. */
  devConfig: DevConfig

  // -- Actions --

  /** Generate a fresh quest board (replaces existing). */
  refreshBoard: () => void

  /** Select a quest card (opens dispatch screen). */
  selectQuest: (questId: string) => void

  /** Close dispatch screen without dispatching. */
  cancelDispatch: () => void

  /** Start an expedition for the selected quest. */
  dispatchExpedition: (quest: GeneratedQuest, weaponDurability: number) => void

  /** Update progress tick (call from UI timer). */
  tickProgress: (now: number, currentDurability: number) => void

  /** Skip to the end of the current expedition (dev). */
  skipToEnd: () => void

  /** Skip to the next unrevealed event (dev). */
  skipToNextEvent: () => void

  /** Resolve the completed expedition and produce outcome. */
  resolveRun: (weapon: ExpeditionWeaponSnapshot) => void

  /** Collect loot from a completed/failed expedition. */
  collectLoot: () => GeneratedQuest | null

  /** Set active Guild tab. */
  setActiveTab: (tab: 'expeditions' | 'encyclopedia' | 'intendant') => void

  /** Update dev config. */
  updateDevConfig: (partial: Partial<DevConfig>) => void
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useExpeditionStore = create<ExpeditionStoreState>((set, get) => ({
  activeRun: null,
  board: null,
  activeTab: 'expeditions',
  dispatchScreenOpen: false,
  selectedQuestId: null,
  devConfig: { ...DEV_CONFIG_DEFAULTS },

  // -- Board ----------------------------------------------------------------

  refreshBoard() {
    const quests = generateQuestBoard()
    const now = Date.now()
    set({
      board: {
        quests,
        generatedAt: now,
        expiresAt: now + 24 * 60 * 60 * 1000,
      },
    })
  },

  // -- Dispatch screen ------------------------------------------------------

  selectQuest(questId) {
    set({ selectedQuestId: questId, dispatchScreenOpen: true })
  },

  cancelDispatch() {
    set({ selectedQuestId: null, dispatchScreenOpen: false })
  },

  dispatchExpedition(quest, weaponDurability) {
    const { devConfig } = get()

    try {
      const run = createExpeditionRun(quest, weaponDurability, devConfig)

      set({
        activeRun: run,
        dispatchScreenOpen: false,
        selectedQuestId: null,
      })
    } catch {
      // Location not found — silently fail
    }
  },

  // -- Timer tick -----------------------------------------------------------

  tickProgress(now, currentDurability) {
    const run = get().activeRun
    if (!run || run.state !== 'traveling') return

    const elapsed = now - run.startedAt
    const total = run.expectedEndAt - run.startedAt
    const progress = Math.min(1, elapsed / total)

    // Reveal events whose triggerProgress has been crossed
    let revealedEvents = run.revealedEvents
    let weaponBroken = run.weaponBroken

    for (let i = 0; i < run.events.length; i++) {
      const event = run.events[i]
      if (event.triggerProgress <= progress && !event.resolved) {
        revealedEvents = i + 1
        // Check if this event's outcome causes durability to hit 0
        if (event.encounterResult?.effects.weaponDamages) {
          const loss = calculateEventDurabilityLoss(event.encounterResult.effects.weaponDamages)
          if (currentDurability - loss <= 0) {
            weaponBroken = true
          }
        }
      }
    }

    // Check if timer completed
    const newState: ExpeditionRun['state'] =
      progress >= 1 ? 'resolving' : 'traveling'

    set({
      activeRun: {
        ...run,
        progress,
        revealedEvents,
        weaponBroken,
        state: newState,
      },
    })

    // Auto-resolve if timer completed
    if (newState === 'resolving') {
      // Resolution will be triggered by the UI calling resolveRun
      // with the current weapon state from game-store
    }
  },

  // -- Skip (dev) -----------------------------------------------------------

  skipToEnd() {
    const run = get().activeRun
    if (!run || run.state !== 'traveling') return

    set({
      activeRun: {
        ...run,
        progress: 1,
        state: 'resolving',
        expectedEndAt: Date.now(),
        revealedEvents: run.events.length,
      },
    })
  },

  skipToNextEvent() {
    const run = get().activeRun
    if (!run || run.state !== 'traveling') return

    // Find next unrevealed event
    const nextEvent = run.events.find((e) => !e.resolved)
    if (!nextEvent) {
      // No more events, skip to end
      get().skipToEnd()
      return
    }

    // Set progress to just past the trigger point
    const targetProgress = Math.min(nextEvent.triggerProgress + 0.001, 1.0)
    const fakeElapsed = targetProgress * (run.expectedEndAt - run.startedAt)
    const newExpectedEndAt = run.startedAt + fakeElapsed / targetProgress

    set({
      activeRun: {
        ...run,
        progress: targetProgress,
        expectedEndAt: newExpectedEndAt,
        revealedEvents: run.events.indexOf(nextEvent) + 1,
      },
    })
  },

  // -- Resolution -----------------------------------------------------------

  resolveRun(weapon) {
    const run = get().activeRun
    if (!run || run.state !== 'resolving') return

    const outcome = resolveExpedition(run, weapon)

    const finalState: ExpeditionRun['state'] =
      outcome.status === 'failure' ? 'failed' : 'completed'

    set({
      activeRun: {
        ...run,
        state: finalState,
        outcome,
      },
    })
  },

  // -- Collect loot ---------------------------------------------------------

  collectLoot() {
    const run = get().activeRun
    if (!run || (run.state !== 'completed' && run.state !== 'failed')) return null

    const quest = run.quest
    set({ activeRun: null })
    return quest
  },

  // -- Tab ------------------------------------------------------------------

  setActiveTab(tab) {
    set({ activeTab: tab })
  },

  // -- Dev config -----------------------------------------------------------

  updateDevConfig(partial) {
    set((s) => ({
      devConfig: { ...s.devConfig, ...partial },
    }))
  },
}))
