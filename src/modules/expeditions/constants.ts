/**
 * Expeditions Module — Constants
 */

export const MODULE_ID = 'expeditions' as const

/** Default equipped weapon until the host maps WEAPON_INVENTORY. */
export const INITIAL_WEAPON = {
  weaponId: 'weapon_stub',
  displayName: 'Железный меч',
  warSoulTier: 1,
  durability: 100,
  maxDurability: 100,
} as const

/** Default dev config. */
export const DEV_CONFIG_DEFAULTS = {
  enabled: false,
  timeScale: 60, // 1 minute real = 1 hour game
  damageMultiplier: 1.0,
  eventsMin: 2,
  eventsMax: 6,
} as const

/** Time scale presets for dev mode. */
export const TIME_SCALE_PRESETS = [
  { label: 'Реальное время', value: 1 },
  { label: '×10', value: 10 },
  { label: '×60', value: 60 },
  { label: '×360', value: 360 },
  { label: '×3600', value: 3600 },
] as const

/** Base damage chance per attack. */
export const BASE_DAMAGE_CHANCE = 0.3

/** Durability loss per severity level. */
export const DURABILITY_LOSS_PER_SEVERITY: Record<1 | 2 | 3, number> = {
  1: 10,
  2: 20,
  3: 30,
}

/** Quest type multipliers for duration. */
export const QUEST_TYPE_DURATION_MULTIPLIER: Record<
  'hunt' | 'gather' | 'explore' | 'deliver' | 'boss' | 'escort' | 'clear' | 'rescue',
  number
> = {
  hunt: 1.0,
  gather: 0.8,
  explore: 1.2,
  deliver: 1.5,
  boss: 2.0,
  escort: 1.4,
  clear: 1.3,
  rescue: 1.1,
}

/** Board size range. */
export const BOARD_SIZE_MIN = 3
export const BOARD_SIZE_MAX = 6

/** Quest board refresh interval (24 hours). */
export const BOARD_REFRESH_MS = 24 * 60 * 60 * 1000
