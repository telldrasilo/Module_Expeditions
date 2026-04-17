'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { ChatMessage, ExpeditionOutcome, ExpeditionWeaponSnapshot } from './types'

// ---------------------------------------------------------------------------
// Host contract — implemented by app shell (composition root), not a separate package.
// ---------------------------------------------------------------------------

export interface ExpeditionHostValue {
  /** Projection of the equipped weapon for expeditions (e.g. from WEAPON_INVENTORY). */
  weapon: ExpeditionWeaponSnapshot
  /**
   * Apply a resolved expedition outcome to host state (resources, wear, currencies).
   * `weaponId` is the stable id at commit time; use for soul points / inventory writes on the host.
   */
  commitExpeditionOutcome: (outcome: ExpeditionOutcome, weaponId: string) => void
  chatMessages: ChatMessage[]
  guildChannelActive: boolean
  autoSwitchToGuild: boolean
  setGuildChannelActive: (active: boolean) => void
  setAutoSwitchToGuild: (enabled: boolean) => void
}

const ExpeditionHostContext = createContext<ExpeditionHostValue | null>(null)

export function ExpeditionHostProvider({
  value,
  children,
}: {
  value: ExpeditionHostValue
  children: ReactNode
}) {
  return <ExpeditionHostContext.Provider value={value}>{children}</ExpeditionHostContext.Provider>
}

export function useExpeditionHost(): ExpeditionHostValue {
  const ctx = useContext(ExpeditionHostContext)
  if (!ctx) {
    throw new Error('useExpeditionHost must be used within ExpeditionHostProvider')
  }
  return ctx
}
