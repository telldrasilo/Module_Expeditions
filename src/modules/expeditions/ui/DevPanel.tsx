'use client'

import { useExpeditionStore } from '../expedition-store'
import type { DevConfig } from '../types'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DevPanel() {
  const devConfig = useExpeditionStore((s) => s.devConfig)
  const updateDevConfig = useExpeditionStore((s) => s.updateDevConfig)
  const refreshBoard = useExpeditionStore((s) => s.refreshBoard)

  if (!devConfig.enabled) return null

  const handleChange = (partial: Partial<DevConfig>) => {
    updateDevConfig(partial)
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-stone-700/40 bg-stone-900/60 p-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">🛠️</span>
        <h3 className="text-sm font-bold text-stone-400">Режим разработчика</h3>
      </div>

      {/* Time speed */}
      <div className="flex flex-col gap-1">
        <label className="flex items-center justify-between text-xs text-stone-400">
          <span>Скорость времени</span>
          <span className="font-mono text-amber-300">×{devConfig.timeScale}</span>
        </label>
        <input
          type="range"
          min={1}
          max={3600}
          step={1}
          value={devConfig.timeScale}
          onChange={(e) => handleChange({ timeScale: Number(e.target.value) })}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-stone-700 accent-amber-500"
        />
        <div className="flex justify-between text-[9px] text-stone-600">
          <span>×1</span>
          <span>×3600</span>
        </div>
      </div>

      {/* Damage multiplier */}
      <div className="flex flex-col gap-1">
        <label className="flex items-center justify-between text-xs text-stone-400">
          <span>Множитель урона</span>
          <span className="font-mono text-amber-300">×{devConfig.damageMultiplier.toFixed(1)}</span>
        </label>
        <input
          type="range"
          min={0.1}
          max={3.0}
          step={0.1}
          value={devConfig.damageMultiplier}
          onChange={(e) => handleChange({ damageMultiplier: Number(e.target.value) })}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-stone-700 accent-amber-500"
        />
        <div className="flex justify-between text-[9px] text-stone-600">
          <span>×0.1</span>
          <span>×3.0</span>
        </div>
      </div>

      {/* Events min/max */}
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-xs text-stone-400">Мин. событий</label>
          <input
            type="number"
            min={1}
            max={10}
            value={devConfig.eventsMin}
            onChange={(e) => handleChange({ eventsMin: Math.max(1, Math.min(10, Number(e.target.value))) })}
            className="w-full rounded-md border border-stone-700/50 bg-stone-800/60 px-2 py-1 text-xs text-stone-300 outline-none focus:border-amber-700/50"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-xs text-stone-400">Макс. событий</label>
          <input
            type="number"
            min={1}
            max={10}
            value={devConfig.eventsMax}
            onChange={(e) => handleChange({ eventsMax: Math.max(1, Math.min(10, Number(e.target.value))) })}
            className="w-full rounded-md border border-stone-700/50 bg-stone-800/60 px-2 py-1 text-xs text-stone-300 outline-none focus:border-amber-700/50"
          />
        </div>
      </div>

      {/* Refresh board button */}
      <button
        type="button"
        className="w-full rounded-md border border-stone-600/50 bg-stone-800/60 px-3 py-2 text-xs font-medium text-stone-300 transition-colors hover:bg-stone-700/60 hover:text-amber-200"
        onClick={refreshBoard}
      >
        🔄 Обновить доску
      </button>
    </div>
  )
}
