/**
 * Expeditions Module — Shared UI Style Constants
 *
 * Single source of truth for biome, element, tier, severity,
 * and quest-type visual mappings used across all UI components.
 */

import type { Biome, Element, LocationTier } from '../../types'

// ═══════════════════════════════════════════════════════════════════════════
//  BIOME
// ═══════════════════════════════════════════════════════════════════════════

/** Emoji icon for each biome. */
export const BIOME_ICON: Record<Biome, string> = {
  forest: '🌲',
  mountains: '⛰️',
  swamp: '🏚️',
  volcanic: '🌋',
  deep_mines: '⛏️',
  desert: '🏜️',
  tundra: '❄️',
  ocean_coast: '🌊',
  ancient_ruins: '🏛️',
  shadow_realm: '👁️',
  crystal_caves: '💎',
  bog: '🌿',
}

/** Russian display name (icon + full name) for each biome. */
export const BIOME_NAME: Record<Biome, string> = {
  forest: '🌲 Восточные Марки',
  mountains: '⛰️ Северный хребет',
  swamp: '🏚️ Ржавые болота',
  volcanic: '🌋 Склоны Игниррата',
  deep_mines: '⛏️ Великие Шахты',
  desert: '🏜️ Пепельная пустошь',
  tundra: '❄️ Крижані пустки',
  ocean_coast: '🌊 Берег Кракена',
  ancient_ruins: '🏛️ Руины Монолитов',
  shadow_realm: '👁️ Теневое царство',
  crystal_caves: '💎 Хрустальные пещеры',
  bog: '🌿 Гнилые мшары',
}

/** Short Russian display name (icon + short name) for each biome — used in compact tables. */
export const BIOME_NAME_SHORT: Record<Biome, string> = {
  forest: '🌲 Лес',
  mountains: '⛰️ Горы',
  swamp: '🏚️ Болото',
  volcanic: '🌋 Вулкан',
  deep_mines: '⛏️ Шахты',
  desert: '🏜️ Пустыня',
  tundra: '❄️ Тундра',
  ocean_coast: '🌊 Побережье',
  ancient_ruins: '🏛️ Древние руины',
  shadow_realm: '👁️ Царство теней',
  crystal_caves: '💎 Кристальные пещеры',
  bog: '🌿 Трясина',
}

// ═══════════════════════════════════════════════════════════════════════════
//  ELEMENT
// ═══════════════════════════════════════════════════════════════════════════

export interface ElementStyle {
  bg: string
  text: string
  label: string
  border: string
  icon: string
}

export const ELEMENT_STYLE: Record<string, ElementStyle> = {
  flame:      { bg: 'bg-red-900/60',    text: 'text-red-300',    label: 'Пламя',       border: 'border-red-700/50',    icon: '🔥' },
  frost:      { bg: 'bg-cyan-900/60',   text: 'text-cyan-300',   label: 'Мороз',       border: 'border-cyan-700/50',   icon: '❄️' },
  lightning:  { bg: 'bg-yellow-900/60', text: 'text-yellow-300', label: 'Молния',      border: 'border-yellow-700/50', icon: '⚡' },
  decay:      { bg: 'bg-green-900/60',  text: 'text-green-300',  label: 'Гниль',       border: 'border-green-700/50',  icon: '🍄' },
  blood:      { bg: 'bg-red-950/70',    text: 'text-red-400',    label: 'Кровь',       border: 'border-red-800/50',    icon: '🩸' },
  bone:       { bg: 'bg-stone-700/60',  text: 'text-stone-300',  label: 'Кость',       border: 'border-stone-600/50',  icon: '🦴' },
  shadow:     { bg: 'bg-purple-900/60', text: 'text-purple-300', label: 'Тень',        border: 'border-purple-700/50', icon: '🌑' },
  magnetism:  { bg: 'bg-indigo-900/60', text: 'text-indigo-300', label: 'Магнетизм',   border: 'border-indigo-700/50', icon: '🧲' },
  void:       { bg: 'bg-neutral-900/80',text: 'text-neutral-300',label: 'Бездна',      border: 'border-neutral-700/50',icon: '🕳️' },
  mind:       { bg: 'bg-violet-900/60', text: 'text-violet-300', label: 'Разум',       border: 'border-violet-700/50', icon: '🧠' },
  light:      { bg: 'bg-amber-800/50',  text: 'text-amber-200',  label: 'Свет',        border: 'border-amber-600/50',  icon: '✨' },
  distortion: { bg: 'bg-rose-900/50',   text: 'text-rose-300',   label: 'Искажение',   border: 'border-rose-700/50',   icon: '🌀' },
  space:      { bg: 'bg-sky-900/50',    text: 'text-sky-300',    label: 'Пространство', border: 'border-sky-700/50',    icon: '💫' },
}

/** Get element style with fallback for unknown elements. */
export function getElementStyle(el: Element | string): ElementStyle {
  return ELEMENT_STYLE[el] ?? {
    bg: 'bg-stone-700/60',
    text: 'text-stone-300',
    label: el,
    border: 'border-stone-600/50',
    icon: '❓',
  }
}

/** Get element icon emoji with fallback for unknown elements. */
export function getElementIcon(el: Element | string): string {
  return getElementStyle(el).icon
}

// ═══════════════════════════════════════════════════════════════════════════
//  TIER
// ═══════════════════════════════════════════════════════════════════════════

export const TIER_BADGE: Record<LocationTier, string> = {
  1: 'bg-emerald-900/70 text-emerald-300 border-emerald-700/50',
  2: 'bg-amber-900/70 text-amber-300 border-amber-700/50',
  3: 'bg-orange-900/70 text-orange-300 border-orange-700/50',
  4: 'bg-red-900/70 text-red-300 border-red-700/50',
  5: 'bg-purple-900/70 text-purple-300 border-purple-700/50',
}

/** Full display string for a tier badge, e.g. "Т3". */
export function tierLabel(tier: LocationTier): string {
  return `Т${tier}`
}

// ═══════════════════════════════════════════════════════════════════════════
//  SEVERITY
// ═══════════════════════════════════════════════════════════════════════════

export const SEVERITY_ICON: Record<1 | 2 | 3, string> = {
  1: '🔹',
  2: '🔶',
  3: '🔴',
}

export const SEVERITY_LABEL: Record<1 | 2 | 3, string> = {
  1: 'Лёгкий',
  2: 'Средний',
  3: 'Критический',
}

export const SEVERITY_BADGE: Record<1 | 2 | 3, string> = {
  1: 'bg-blue-900/60 text-blue-300 border-blue-700/50',
  2: 'bg-amber-900/60 text-amber-300 border-amber-700/50',
  3: 'bg-red-900/60 text-red-300 border-red-700/50',
}

// ═══════════════════════════════════════════════════════════════════════════
//  QUEST TYPE
// ═══════════════════════════════════════════════════════════════════════════

export interface QuestTypeVisual {
  icon: string
  accent: string
  label: string
}

export const QUEST_TYPE_VISUAL: Record<string, QuestTypeVisual> = {
  hunt:    { icon: '🏹', accent: 'text-red-400',    label: 'Охота' },
  gather:  { icon: '🌿', accent: 'text-green-400',   label: 'Сбор' },
  explore: { icon: '🧭', accent: 'text-cyan-400',    label: 'Разведка' },
  deliver: { icon: '📦', accent: 'text-amber-400',   label: 'Доставка' },
  boss:    { icon: '💀', accent: 'text-purple-400',   label: 'Угроза' },
  escort:  { icon: '🛡️', accent: 'text-blue-400',    label: 'Сопровождение' },
  clear:   { icon: '⚔️', accent: 'text-orange-400',   label: 'Зачистка' },
  rescue:  { icon: '🆘', accent: 'text-rose-400',     label: 'Спасение' },
}

export function getQuestTypeVisual(typeId: string): QuestTypeVisual {
  return QUEST_TYPE_VISUAL[typeId] ?? { icon: '📜', accent: 'text-stone-300', label: typeId }
}

// ═══════════════════════════════════════════════════════════════════════════
//  TIME FORMATTING
// ═══════════════════════════════════════════════════════════════════════════

/** Format a duration in ms to a human-readable Russian string, e.g. "2 ч 30 мин". */
export function formatDuration(ms: number): string {
  const totalSec = Math.round(ms / 1000)
  if (totalSec < 60) return `${totalSec} сек`
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  if (m < 60) return s > 0 ? `${m} мин ${s} сек` : `${m} мин`
  const h = Math.floor(m / 60)
  const rm = m % 60
  return rm > 0 ? `${h} ч ${rm} мин` : `${h} ч`
}

/** Format remaining time as a countdown "HH:MM:SS" string. */
export function formatCountdown(ms: number): string {
  if (ms <= 0) return '00:00:00'
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}
