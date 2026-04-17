import { describe, it, expect } from 'vitest'
import { formatNumber, formatPercent } from './format'

describe('formatNumber', () => {
  it('formats small numbers as-is', () => {
    expect(formatNumber(0)).toBe('0')
    expect(formatNumber(42)).toBe('42')
    expect(formatNumber(999)).toBe('999')
  })

  it('formats thousands with K suffix', () => {
    expect(formatNumber(1000)).toBe('1K')
    expect(formatNumber(12458)).toBe('12.5K')
  })

  it('formats millions with M suffix', () => {
    expect(formatNumber(1_000_000)).toBe('1M')
    expect(formatNumber(3_240_000)).toBe('3.2M')
  })

  it('formats billions with B suffix', () => {
    expect(formatNumber(1_500_000_000)).toBe('1.5B')
  })

  it('formats trillions with T suffix', () => {
    expect(formatNumber(2_000_000_000_000)).toBe('2T')
  })
})

describe('formatPercent', () => {
  it('returns 0% when total is zero', () => {
    expect(formatPercent(50, 0)).toBe('0%')
  })

  it('calculates percentage correctly', () => {
    expect(formatPercent(50, 100)).toBe('50%')
    expect(formatPercent(1, 4)).toBe('25%')
  })

  it('caps at 100%', () => {
    expect(formatPercent(150, 100)).toBe('100%')
  })
})
