'use client'

import { useExpeditionStore } from '../expedition-store'
import { useExpeditionHost } from '../expedition-host-context'
import { weaponMeetsLocationRequirement } from '../lib/weaponGates'
import { LOCATIONS } from '../data/locations'
import { BIOME_ICON, getElementStyle, TIER_BADGE, tierLabel } from './shared/styles'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DispatchScreen() {
  const dispatchScreenOpen = useExpeditionStore((s) => s.dispatchScreenOpen)
  const selectedQuestId = useExpeditionStore((s) => s.selectedQuestId)
  const board = useExpeditionStore((s) => s.board)
  const cancelDispatch = useExpeditionStore((s) => s.cancelDispatch)
  const dispatchExpedition = useExpeditionStore((s) => s.dispatchExpedition)
  const { weapon } = useExpeditionHost()

  if (!dispatchScreenOpen || !selectedQuestId) return null

  const quest = board?.quests.find((q) => q.id === selectedQuestId)
  if (!quest) return null

  const location = LOCATIONS.find((l) => l.id === quest.locationId)
  const durPct = weapon.maxDurability > 0
    ? Math.round((weapon.durability / weapon.maxDurability) * 100)
    : 0

  const meetsTierGate = weaponMeetsLocationRequirement(weapon, location)

  const handleConfirm = () => {
    dispatchExpedition(quest, weapon.durability)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-lg border border-stone-700/60 bg-gradient-to-b from-stone-900 to-stone-950 p-6 shadow-2xl">
        {/* Quest title */}
        <h2 className="text-lg font-bold text-amber-200">{quest.title}</h2>
        {quest.description && (
          <p className="mt-1 text-sm text-stone-400 leading-relaxed">
            {quest.description}
          </p>
        )}

        {/* Location details */}
        {location && (
          <div className="mt-4 flex flex-col gap-2 rounded-md border border-stone-700/40 bg-stone-800/40 p-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{BIOME_ICON[location.biome]}</span>
              <span className="text-sm font-semibold text-stone-200">{location.name}</span>
              <span className={`ml-auto rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase ${TIER_BADGE[location.tier] ?? 'bg-stone-700/60 text-stone-300'}`}>
                {tierLabel(location.tier)}
              </span>
            </div>

            {/* Risks */}
            {quest.risks.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {quest.risks.map((el) => {
                  const style = getElementStyle(el)
                  return (
                    <span
                      key={el}
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${style.bg} ${style.text}`}
                    >
                      {style.label}
                    </span>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Seeker info */}
        <div className="mt-4 flex items-center gap-2 text-sm text-stone-300">
          <span className="text-lg">🧭</span>
          <span className="font-medium">Искатель</span>
          <span className="text-xs text-stone-500">— всегда доступен</span>
        </div>

        {/* Weapon info */}
        <div className="mt-3 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-400">
              ⚔️ {weapon.displayName} (тир души {weapon.warSoulTier})
            </span>
            <span className={`font-mono ${durPct > 50 ? 'text-green-400' : durPct > 20 ? 'text-yellow-400' : 'text-red-400'}`}>
              {weapon.durability}/{weapon.maxDurability}
            </span>
          </div>
          {/* Durability bar */}
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-stone-800">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                durPct > 50
                  ? 'bg-green-600'
                  : durPct > 20
                    ? 'bg-yellow-600'
                    : 'bg-red-600'
              }`}
              style={{ width: `${durPct}%` }}
            />
          </div>
          {/* Scars count */}
          {weapon.scars.length > 0 && (
            <span className="text-[10px] text-stone-500">
              Шрамов: {weapon.scars.length}
            </span>
          )}
          {location?.requiredItemTier !== undefined && !meetsTierGate && (
            <p className="text-[11px] text-amber-400/90">
              Требуется тир души оружия ≥ {location.requiredItemTier}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className="flex-1 rounded-md border border-stone-600/50 bg-stone-800/60 px-4 py-2 text-sm font-medium text-stone-300 transition-colors hover:bg-stone-700/60"
            onClick={cancelDispatch}
          >
            Отмена
          </button>
          <button
            type="button"
            className="flex-1 rounded-md bg-amber-800/70 px-4 py-2 text-sm font-semibold text-amber-100 transition-colors hover:bg-amber-700/80 active:bg-amber-900/80"
            onClick={handleConfirm}
            disabled={weapon.durability <= 0 || !meetsTierGate}
          >
            Подтвердить отправку
          </button>
        </div>
      </div>
    </div>
  )
}
