'use client'

import type { GeneratedQuest, Biome } from '../types'
import { useExpeditionStore } from '../expedition-store'
import { useExpeditionHost } from '../expedition-host-context'
import { LOCATIONS } from '../data/locations'
import { QUEST_GIVERS } from '../data/questGivers'
import { getBiome } from '../data/biomes'
import {
  BIOME_ICON,
  getElementStyle,
  TIER_BADGE,
  tierLabel,
  formatDuration,
  getQuestTypeVisual,
} from './shared/styles'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface QuestCardProps {
  quest: GeneratedQuest
  locked: boolean
}

export function QuestCard({ quest, locked }: QuestCardProps) {
  const activeRun = useExpeditionStore((s) => s.activeRun)
  const { weapon } = useExpeditionHost()
  const selectQuest = useExpeditionStore((s) => s.selectQuest)

  const location = LOCATIONS.find((l) => l.id === quest.locationId)
  const giver = QUEST_GIVERS.find((g) => g.id === quest.questGiverId)
  const biomeData = location ? getBiome(location.biome) : undefined

  const weaponBroken = weapon.durability <= 0
  const disabled = locked || !!activeRun || weaponBroken

  const typeVisual = getQuestTypeVisual(quest.templateId)

  return (
    <div
      className={`group relative flex flex-col gap-2.5 rounded-xl border p-4 transition-all duration-200 ${
        locked
          ? 'cursor-not-allowed border-stone-700/20 bg-stone-900/20 opacity-40'
          : disabled
            ? 'cursor-not-allowed border-stone-700/30 bg-stone-900/40 opacity-50'
            : 'cursor-pointer border-stone-700/50 bg-stone-900/70 hover:border-amber-600/40 hover:bg-stone-800/80 hover:shadow-lg hover:shadow-amber-900/10'
      }`}
      onClick={() => {
        if (!disabled) selectQuest(quest.id)
      }}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      {/* ── Header: type icon + title + tier ──────────────────────── */}
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 text-lg leading-none" aria-hidden="true">
          {typeVisual.icon}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-amber-100 leading-tight">
            {quest.title}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-stone-400">
            <span>{BIOME_ICON[location?.biome ?? 'forest']}</span>
            <span className="text-stone-300">{location?.name ?? quest.locationId}</span>
            {biomeData && (
              <span className="text-stone-500">· {biomeData.nameRu}</span>
            )}
          </div>
        </div>
        {location && (
          <span
            className={`shrink-0 rounded-md border px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
              TIER_BADGE[location.tier] ?? 'bg-stone-700/60 text-stone-300'
            }`}
          >
            {tierLabel(location.tier)}
          </span>
        )}
      </div>

      {/* ── Description (full text) ───────────────────────────────── */}
      {quest.description && (
        <p className="text-xs leading-relaxed text-stone-400 line-clamp-3">
          {quest.description}
        </p>
      )}

      {/* ── Risks ─────────────────────────────────────────────────── */}
      {quest.risks.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {quest.risks.map((el) => {
            const style = getElementStyle(el)
            return (
              <span
                key={el}
                className={`inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${style.bg} ${style.text} ${style.border}`}
              >
                {style.label}
              </span>
            )
          })}
        </div>
      )}

      {/* ── Biome complication hint ───────────────────────────────── */}
      {biomeData && biomeData.complications.length > 0 && (
        <div className="flex items-center gap-1 text-[10px] text-amber-500/70">
          <span>⚠</span>
          <span className="italic">
            {biomeData.complications[0].name}
            {biomeData.complications.length > 1 && ` +${biomeData.complications.length - 1}`}
          </span>
        </div>
      )}

      {/* ── Info row: duration + quest giver ───────────────────────── */}
      <div className="flex items-center justify-between gap-2 text-xs text-stone-400">
        <div className="flex items-center gap-1.5">
          <svg className="h-3.5 w-3.5 text-stone-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>{formatDuration(quest.durationMs)}</span>
        </div>
        {giver && (
          <span className="text-stone-500">
            от <span className="text-stone-300">{giver.name}</span>
          </span>
        )}
      </div>

      {/* ── Reward + action row ────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-xs">
          {quest.reward.gold > 0 && (
            <span className="inline-flex items-center gap-1 font-bold text-amber-200">
              <svg className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="8" cy="8" r="6" />
                <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
              </svg>
              {quest.reward.gold}
            </span>
          )}
          {quest.reward.reputation > 0 && (
            <span className="inline-flex items-center gap-1 font-bold text-purple-300">
              <svg className="h-3.5 w-3.5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
              {quest.reward.reputation}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={disabled}
          className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
            disabled
              ? 'cursor-not-allowed bg-stone-800/40 text-stone-600'
              : 'bg-amber-800/80 text-amber-100 hover:bg-amber-700/90 active:bg-amber-900/90 shadow-sm shadow-amber-900/30'
          }`}
          onClick={(e) => {
            e.stopPropagation()
            if (!disabled) selectQuest(quest.id)
          }}
        >
          {locked ? '🔒 Занято' : weaponBroken ? '🔨 Сломано' : 'Отправить'}
        </button>
      </div>
    </div>
  )
}
