/**
 * Number formatting utilities for idle-game UI.
 * Handles large numbers with suffixes (K, M, B, T).
 */

const SUFFIXES = ['', 'K', 'M', 'B', 'T'] as const

export function formatNumber(value: number): string {
  if (value < 1000) return Math.floor(value).toLocaleString()

  let tier = 0
  let scaled = value
  while (scaled >= 1000 && tier < SUFFIXES.length - 1) {
    scaled /= 1000
    tier++
  }

  const formatted =
    scaled % 1 === 0 ? scaled.toFixed(0) : scaled.toFixed(1)
  return `${formatted}${SUFFIXES[tier]}`
}

export function formatPercent(value: number, total: number): string {
  if (total <= 0) return '0%'
  return `${Math.min(100, Math.floor((value / total) * 100))}%`
}
