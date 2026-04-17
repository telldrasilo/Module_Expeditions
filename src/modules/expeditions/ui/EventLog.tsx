'use client'

import type { PreGeneratedEvent } from '../types'
import { SEVERITY_ICON } from './shared/styles'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface EventLogProps {
  events: PreGeneratedEvent[]
}

export function EventLog({ events }: EventLogProps) {
  if (events.length === 0) {
    return (
      <p className="py-4 text-center text-xs text-stone-500 italic">
        События появятся во время экспедиции...
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto pr-1">
      {events.map((event, idx) => {
        const hasDamage =
          event.encounterResult?.effects.weaponDamages &&
          event.encounterResult.effects.weaponDamages.length > 0

        return (
          <div
            key={event.id}
            className="flex items-start gap-2 rounded-md bg-stone-800/50 px-3 py-2 text-xs"
          >
            {/* Progress percentage */}
            <span className="shrink-0 font-mono text-stone-500">
              {Math.round(event.triggerProgress * 100)}%
            </span>

            {/* Content */}
            <div className="min-w-0 flex-1">
              {event.encounterResult ? (
                <p className="text-stone-300">{event.encounterResult.text}</p>
              ) : (
                <p className="text-stone-500 italic">Событие обнаружено...</p>
              )}
            </div>

            {/* Damage icon */}
            {hasDamage && (
              <span className="shrink-0" title="Оружие повреждено">
                {SEVERITY_ICON[
                  Math.max(
                    ...event.encounterResult!.effects.weaponDamages!.map((d) => d.severity)
                  ) as 1 | 2 | 3
                ] ?? '⚠️'}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
