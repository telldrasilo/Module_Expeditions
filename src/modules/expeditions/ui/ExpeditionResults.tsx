'use client'

import { useExpeditionStore } from '../expedition-store'
import { useExpeditionHost } from '../expedition-host-context'
import { STUB_RESOURCES } from '../data/stubResources'
import type { OutcomeStatus, WeaponDamage } from '../types'
import { getElementIcon, SEVERITY_LABEL } from './shared/styles'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const OUTCOME_CONFIG: Record<OutcomeStatus, { label: string; color: string; icon: string }> = {
  success: { label: 'Успех!', color: 'text-green-400', icon: '✅' },
  partial: { label: 'Частичный успех', color: 'text-yellow-400', icon: '⚠️' },
  failure: { label: 'Провал', color: 'text-red-400', icon: '❌' },
}

function getResourceName(id: string): string {
  return STUB_RESOURCES.find((r) => r.id === id)?.name ?? id
}

function renderDamages(damages: WeaponDamage[]) {
  if (damages.length === 0) return null
  return (
    <div className="flex flex-col gap-1">
      {damages.map((dmg, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span>{getElementIcon(dmg.element ?? 'flame')}</span>
          <span className="text-stone-300">
            {dmg.type === 'elemental'
              ? `Элементальный урон`
              : 'Физический урон'}
          </span>
          <span
            className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
              dmg.severity === 3
                ? 'bg-red-900/60 text-red-300'
                : dmg.severity === 2
                  ? 'bg-orange-900/60 text-orange-300'
                  : 'bg-yellow-900/60 text-yellow-300'
            }`}
          >
            {SEVERITY_LABEL[dmg.severity]}
          </span>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ExpeditionResults() {
  const activeRun = useExpeditionStore((s) => s.activeRun)
  const collectLoot = useExpeditionStore((s) => s.collectLoot)
  const { commitExpeditionOutcome, weapon } = useExpeditionHost()

  if (!activeRun || !activeRun.outcome) return null

  const { outcome } = activeRun
  const config = OUTCOME_CONFIG[outcome.status]

  const handleCollect = () => {
    commitExpeditionOutcome(outcome, weapon.weaponId)
    collectLoot()
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-stone-700/60 bg-stone-900/70 p-4">
      {/* Outcome banner */}
      <div className="text-center">
        <span className="text-2xl">{config.icon}</span>
        <h3 className={`mt-1 text-lg font-bold ${config.color}`}>{config.label}</h3>
      </div>

      {/* Narrative summary */}
      {outcome.narrativeSummary && (
        <p className="text-sm italic text-stone-400 leading-relaxed">
          {outcome.narrativeSummary}
        </p>
      )}

      {/* Loot table */}
      {outcome.loot.length > 0 && (
        <div className="flex flex-col gap-1">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Добыча
          </h4>
          <div className="flex flex-wrap gap-2">
            {outcome.loot.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-md border border-amber-700/40 bg-amber-900/30 px-2 py-0.5 text-xs font-medium text-amber-200"
              >
                {getResourceName(item.resourceId)} ×{item.quantity}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Weapon damage report */}
      {outcome.weaponDamages.length > 0 && (
        <div className="flex flex-col gap-1">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            Повреждения оружия
          </h4>
          {renderDamages(outcome.weaponDamages)}
        </div>
      )}

      {/* Gold and reputation */}
      <div className="flex items-center gap-4 text-sm">
        {outcome.goldReward > 0 && (
          <span className="inline-flex items-center gap-1 font-semibold text-amber-200">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="8" cy="8" r="6" />
              <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
            </svg>
            +{outcome.goldReward}
          </span>
        )}
        {outcome.reputationChange > 0 && (
          <span className="inline-flex items-center gap-1 font-semibold text-purple-300">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>
            +{outcome.reputationChange} репутации
          </span>
        )}
      </div>

      {/* Collect button */}
      <button
        type="button"
        className="w-full rounded-md bg-amber-800/70 px-4 py-2 text-sm font-semibold text-amber-100 transition-colors hover:bg-amber-700/80 active:bg-amber-900/80"
        onClick={handleCollect}
      >
        Собрать добычу
      </button>
    </div>
  )
}
