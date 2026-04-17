'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useGameStore } from '@/src/lib/game-store'
import { useExpeditionStore } from '@/src/modules/expeditions/expedition-store'
import {
  ExpeditionHostProvider,
  useExpeditionHost,
} from '@/src/modules/expeditions/expedition-host-context'
import type { ExpeditionOutcome } from '@/src/modules/expeditions/types'
import { ExpeditionsPanel } from '@/src/modules/expeditions/ui/ExpeditionsPanel'
import { GuildChannel } from '@/src/modules/expeditions/ui/GuildChannel'

function useSwordCraftExpeditionHostValue() {
  const weapon = useGameStore((s) => s.stubWeapon)
  const chatMessages = useGameStore((s) => s.chatMessages)
  const guildChannelActive = useGameStore((s) => s.guildChannelActive)
  const autoSwitchToGuild = useGameStore((s) => s.autoSwitchToGuild)
  const setGuildChannelActive = useGameStore((s) => s.setGuildChannelActive)
  const setAutoSwitchToGuild = useGameStore((s) => s.setAutoSwitchToGuild)

  const commitExpeditionOutcome = useCallback(
    (outcome: ExpeditionOutcome, weaponId: string) => {
      const st = useGameStore.getState()
      if (outcome.loot.length > 0) st.addExpeditionResources(outcome.loot)
      if (outcome.weaponDamages.length > 0) st.applyWeaponDamages(outcome.weaponDamages)
      if (outcome.goldReward > 0) st.earnGold(outcome.goldReward)
      if (outcome.reputationChange > 0) st.addGuildReputation(outcome.reputationChange)
      void weaponId
    },
    []
  )

  return useMemo(
    () => ({
      weapon,
      commitExpeditionOutcome,
      chatMessages,
      guildChannelActive,
      autoSwitchToGuild,
      setGuildChannelActive,
      setAutoSwitchToGuild,
    }),
    [
      weapon,
      commitExpeditionOutcome,
      chatMessages,
      guildChannelActive,
      autoSwitchToGuild,
      setGuildChannelActive,
      setAutoSwitchToGuild,
    ]
  )
}

/**
 * Game shell layout (sidebar, resources, module root, right encyclopedia / chat rail).
 * Right rail can collapse to the narrow channel strip (md+).
 */
export function SkinShell() {
  const expeditionHost = useSwordCraftExpeditionHostValue()
  const [isRightRailOpen, setIsRightRailOpen] = useState(true)

  const activeModule = useGameStore((s) => s.activeModule)
  const setActiveModule = useGameStore((s) => s.setActiveModule)
  const devConfig = useExpeditionStore((s) => s.devConfig)
  const resources = useGameStore((s) => s.resources)
  const blacksmith = useGameStore((s) => s.blacksmith)

  const isForge = activeModule === 'forge'
  const isGuild = activeModule === 'guild'

  return (
    <ExpeditionHostProvider value={expeditionHost}>
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 text-stone-300 md:flex-row">
      <nav
        className="flex w-full shrink-0 flex-col flex-wrap border-b border-stone-700/50 bg-gradient-to-b from-stone-900 to-stone-950 p-4 md:h-auto md:w-64 md:flex-nowrap md:border-b-0 md:border-r"
        aria-label="Основная навигация"
      >
        <div className="mb-8 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-amber-200 text-glow">⚔️ SwordCraft</h1>
            <p className="text-xs text-stone-500">Idle Forge</p>
          </div>
          <button
            type="button"
            className="h-8 w-8 shrink-0 rounded-md p-0 text-stone-400 hover:text-amber-400 disabled:opacity-90"
            title="Сохранить игру"
            aria-label="Сохранить игру"
            disabled
          >
            <svg className="mx-auto h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-2 md:flex-1">
          {/* Forge nav button */}
          <button
            type="button"
            onClick={() => setActiveModule('forge')}
            className={`flex w-full items-center justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isForge
                ? 'bg-gradient-to-r from-amber-800 to-amber-900 text-amber-100 shadow-lg glow-gold'
                : 'bg-stone-800/50 text-stone-400 hover:bg-stone-800 hover:text-amber-200'
            }`}
            aria-current={isForge ? 'page' : undefined}
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
            <span className="flex-1 text-left">Кузница</span>
          </button>

          {/* Guild nav button */}
          <button
            type="button"
            onClick={() => setActiveModule('guild')}
            className={`flex w-full items-center justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isGuild
                ? 'bg-gradient-to-r from-amber-800 to-amber-900 text-amber-100 shadow-lg glow-gold'
                : 'bg-stone-800/50 text-stone-400 hover:bg-stone-800 hover:text-amber-200'
            }`}
            aria-current={isGuild ? 'page' : undefined}
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="flex-1 text-left">Гильдия Искателей</span>
          </button>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-4 md:mt-auto">
          {/* Dev mode toggle */}
          <label className="flex items-center gap-2 text-xs text-stone-500">
            <input
              type="checkbox"
              checked={devConfig.enabled}
              onChange={(e) =>
                useExpeditionStore.getState().updateDevConfig({ enabled: e.target.checked })
              }
              className="rounded border-stone-600 bg-stone-800 text-amber-500 focus:ring-amber-500/50"
            />
            DEV-режим
          </label>

          {/* Status block */}
          <div className="flex h-24 items-end justify-center rounded-lg border border-amber-800/20 bg-gradient-to-t from-amber-900/20 to-transparent pb-4">
            <div className="text-center">
              <svg
                className="animate-pulse-gold mx-auto h-8 w-8 text-amber-500/50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
              <p className="mt-1 text-xs text-stone-600">Кузница работает</p>
            </div>
          </div>
          <button
            type="button"
            className="w-full justify-start gap-2 rounded-md px-3 py-2 text-left text-xs text-stone-500 opacity-80 hover:text-red-400"
            onClick={() => useGameStore.getState().resetGame()}
          >
            Сбросить игру
          </button>
        </div>
      </nav>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col md:flex-row">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header
            className="shrink-0 border-b border-stone-700/50 bg-gradient-to-b from-stone-900 to-stone-950 px-4 py-3"
            data-tutorial="resources-bar"
            aria-label="Ресурсы и прогресс"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-md border border-amber-600/50 bg-amber-900/30 px-2 py-0.5 text-xs font-semibold text-amber-200">
                  Lv.{blacksmith.level}
                </span>
                <span className="font-medium text-stone-300">Кузнец</span>
                <span className="hidden text-xs text-stone-500 sm:inline">({blacksmith.title})</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="inline-flex items-center gap-1 font-semibold text-amber-200">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="8" cy="8" r="6" />
                    <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
                    <path d="M7 6h1v4" />
                    <path d="m16.71 13.88.7.71-2.82 2.82" />
                  </svg>
                  {resources.gold.toLocaleString()}
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-purple-300">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
                  </svg>
                  {resources.mana.toLocaleString()}
                </span>
                <div className="flex min-w-[140px] items-center gap-2">
                  <div
                    className="relative h-2 w-24 overflow-hidden rounded-full bg-stone-800"
                    role="progressbar"
                    aria-valuenow={Math.round((blacksmith.experience / blacksmith.experienceToNext) * 100)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Опыт до следующего уровня"
                  >
                    <div
                      className="bg-primary h-full w-full transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${100 - (blacksmith.experience / blacksmith.experienceToNext) * 100}%)` }}
                    />
                  </div>
                  <span className="whitespace-nowrap text-xs text-stone-400">
                    {blacksmith.experience}/{blacksmith.experienceToNext}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <main className="scrollbar-medieval min-h-0 flex-1 overflow-y-auto" id="module-root">
            {isForge ? (
              <div className="space-y-6 p-4 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="flex items-center gap-2 text-2xl font-bold text-amber-200">
                      <svg className="h-6 w-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                      </svg>
                      Кузница
                    </h2>
                    <p className="text-sm text-stone-500">Создавайте легендарное оружие</p>
                  </div>
                </div>
                <div className="flex min-h-[12rem] items-center justify-center rounded-md border border-dashed border-stone-600 bg-stone-900/40 p-6 text-center text-sm text-muted-foreground">
                  Модуль кузницы — в разработке
                </div>
              </div>
            ) : (
              <ExpeditionsPanel />
            )}
          </main>
        </div>

        {/* Right rail */}
        <RightRail
          isRightRailOpen={isRightRailOpen}
          setIsRightRailOpen={setIsRightRailOpen}
        />
      </div>
    </div>
    </ExpeditionHostProvider>
  )
}

// ---------------------------------------------------------------------------
// Right rail with channel tabs
// ---------------------------------------------------------------------------

function RightRail({
  isRightRailOpen,
  setIsRightRailOpen,
}: {
  isRightRailOpen: boolean
  setIsRightRailOpen: (v: boolean) => void
}) {
  const { guildChannelActive, setGuildChannelActive } = useExpeditionHost()

  const [activeChannel, setActiveChannel] = useState<'encyclopedia' | 'guild'>(
    guildChannelActive ? 'guild' : 'encyclopedia'
  )

  // Sync with guild channel
  useEffect(() => {
    if (guildChannelActive && activeChannel !== 'guild') {
      setActiveChannel('guild')
    }
  }, [guildChannelActive, activeChannel])

  return (
    <aside
      className={`hidden min-h-0 shrink-0 flex-row self-stretch border-l border-stone-800/80 bg-stone-950/80 backdrop-blur-sm md:flex ${
        isRightRailOpen ? 'w-[min(100vw,356px)]' : 'w-12'
      }`}
      aria-label="Лента событий"
    >
      {isRightRailOpen ? (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-stone-800/80 px-2 py-2">
            <span className="pl-1 text-xs font-semibold uppercase tracking-wide text-stone-400">
              {activeChannel === 'encyclopedia' ? 'Энциклопедия' : 'Гильдия'}
            </span>
            <button
              type="button"
              className="h-8 w-8 shrink-0 rounded-md text-stone-400 hover:bg-stone-800/80 hover:text-amber-200"
              aria-label="Свернуть ленту событий вправо"
              aria-expanded={true}
              aria-controls="skin-shell-right-rail-panel"
              title="Свернуть"
              onClick={() => setIsRightRailOpen(false)}
            >
              <svg className="mx-auto h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
          <div
            id="skin-shell-right-rail-panel"
            className="scrollbar-dock-subtle min-h-0 flex-1 overflow-y-auto p-2"
          >
            {activeChannel === 'guild' ? <GuildChannel /> : (
              <p className="text-xs text-stone-600">Раздел энциклопедии — в разработке</p>
            )}
          </div>
        </div>
      ) : null}
      <div
        className={`flex w-12 shrink-0 flex-col gap-1 bg-stone-950/90 py-2 pl-1 pr-1 ${
          isRightRailOpen ? 'border-l border-stone-800/80' : ''
        }`}
        role="tablist"
        aria-label="Каналы сообщений"
      >
        {!isRightRailOpen ? (
          <button
            type="button"
            className="mb-1 flex h-8 w-full shrink-0 items-center justify-center rounded-md text-stone-400 hover:bg-stone-800/80 hover:text-amber-200"
            aria-label="Развернуть ленту событий"
            aria-expanded={false}
            aria-controls="skin-shell-right-rail-panel"
            title="Развернуть"
            onClick={() => setIsRightRailOpen(true)}
          >
            <svg className="mx-auto h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        ) : null}
        {/* Encyclopedia channel button */}
        <button
          type="button"
          className={`flex w-full flex-col items-center justify-center rounded-md border py-2 ${
            activeChannel === 'encyclopedia'
              ? 'border-amber-700/60 bg-amber-900/50 text-amber-100'
              : 'border-transparent text-stone-500 hover:text-stone-300'
          }`}
          aria-selected={activeChannel === 'encyclopedia'}
          title="Энциклопедия"
          aria-label="Энциклопедия"
          onClick={() => {
            setActiveChannel('encyclopedia')
            setGuildChannelActive(false)
          }}
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 7v14" />
            <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
          </svg>
        </button>
        {/* Guild channel button */}
        <button
          type="button"
          className={`flex w-full flex-col items-center justify-center rounded-md border py-2 ${
            activeChannel === 'guild'
              ? 'border-amber-700/60 bg-amber-900/50 text-amber-100'
              : 'border-transparent text-stone-500 hover:text-stone-300'
          }`}
          aria-selected={activeChannel === 'guild'}
          title="Гильдия"
          aria-label="Гильдия"
          onClick={() => {
            setActiveChannel('guild')
            setGuildChannelActive(true)
          }}
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </button>
      </div>
    </aside>
  )
}
