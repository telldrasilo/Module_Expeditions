'use client'

import { useEffect, useRef, useState } from 'react'
import { useExpeditionStore } from '../expedition-store'
import { useExpeditionHost } from '../expedition-host-context'
import { LOCATIONS } from '../data/locations'
import { EventLog } from './EventLog'
import { ExpeditionResults } from './ExpeditionResults'
import { BIOME_ICON, TIER_BADGE, tierLabel, formatCountdown } from './shared/styles'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ActiveExpedition() {
  const activeRun = useExpeditionStore((s) => s.activeRun)
  const tickProgress = useExpeditionStore((s) => s.tickProgress)
  const resolveRun = useExpeditionStore((s) => s.resolveRun)
  const skipToEnd = useExpeditionStore((s) => s.skipToEnd)
  const skipToNextEvent = useExpeditionStore((s) => s.skipToNextEvent)
  const devConfig = useExpeditionStore((s) => s.devConfig)
  const { weapon } = useExpeditionHost()

  const [now, setNow] = useState(Date.now())
  const hasResolved = useRef(false)

  // Timer tick — every 100ms
  useEffect(() => {
    if (!activeRun || activeRun.state !== 'traveling') return

    const interval = setInterval(() => {
      const currentTime = Date.now()
      setNow(currentTime)
      tickProgress(currentTime, weapon.durability)
    }, 100)

    return () => clearInterval(interval)
  }, [activeRun?.id, activeRun?.state, tickProgress, weapon.durability])

  // Auto-resolve when state becomes 'resolving'
  useEffect(() => {
    if (!activeRun || activeRun.state !== 'resolving') {
      hasResolved.current = false
      return
    }
    if (hasResolved.current) return

    hasResolved.current = true
    resolveRun(weapon)
  }, [activeRun?.state, resolveRun, weapon])

  if (!activeRun) return null

  const location = LOCATIONS.find((l) => l.id === activeRun.quest.locationId)
  const remaining = Math.max(0, activeRun.expectedEndAt - now)
  const progressPct = Math.round(activeRun.progress * 100)

  // Show results if completed or failed
  if (activeRun.state === 'completed' || activeRun.state === 'failed') {
    return <ExpeditionResults />
  }

  const isTraveling = activeRun.state === 'traveling'

  // Get revealed events
  const revealedEvents = activeRun.events.slice(0, activeRun.revealedEvents)

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-amber-700/40 bg-gradient-to-b from-stone-900/80 to-stone-950/90 p-4 animate-glow-pulse">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-amber-200">
            {BIOME_ICON[location?.biome ?? 'forest']}{' '}
            {location?.name ?? activeRun.quest.locationId}
          </h3>
          <p className="mt-0.5 text-xs text-stone-400">{activeRun.quest.title}</p>
        </div>
        {location && (
          <span
            className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase ${TIER_BADGE[location.tier]}`}
          >
            {tierLabel(location.tier)}
          </span>
        )}
      </div>

      {/* Timer */}
      <div className="flex items-center gap-3">
        <svg className="h-5 w-5 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="font-mono text-lg font-bold text-amber-200">
          {formatCountdown(remaining)}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-stone-800">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-700 to-amber-500 transition-all duration-200"
          style={{ width: `${progressPct}%` }}
        />
        {isTraveling && (
          <div className="animate-progress-shimmer absolute inset-y-0 left-0 right-0" />
        )}
      </div>
      <div className="flex items-center justify-between text-xs text-stone-500">
        <span>Прогресс</span>
        <span className="font-mono">{progressPct}%</span>
      </div>

      {/* Event log */}
      <div className="flex flex-col gap-1">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-stone-500">
          Журнал событий
        </h4>
        <EventLog events={revealedEvents} />
      </div>

      {/* Dev skip buttons */}
      {devConfig.enabled && isTraveling && (
        <div className="flex gap-2 border-t border-stone-700/40 pt-3">
          <button
            type="button"
            className="flex-1 rounded-md border border-stone-700/50 bg-stone-800/50 px-3 py-1.5 text-xs font-medium text-stone-400 transition-colors hover:bg-stone-700/50 hover:text-stone-200"
            onClick={skipToNextEvent}
          >
            ⏭ Следующее событие
          </button>
          <button
            type="button"
            className="flex-1 rounded-md border border-red-800/50 bg-red-900/30 px-3 py-1.5 text-xs font-medium text-red-300 transition-colors hover:bg-red-800/40"
            onClick={skipToEnd}
          >
            ⏭ Завершить
          </button>
        </div>
      )}
    </div>
  )
}
