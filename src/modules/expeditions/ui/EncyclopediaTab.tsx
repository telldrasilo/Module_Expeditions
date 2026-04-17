'use client'

import { useState } from 'react'
import { LOCATIONS } from '../data/locations'
import { ENEMIES } from '../data/enemies'
import { ELEMENTS } from '../data/elements'
import { BIOME_NAME_SHORT, getElementStyle } from './shared/styles'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const DANGER_STARS: Record<number, string> = {
  1: '⭐',
  2: '⭐⭐',
  3: '⭐⭐⭐',
  4: '⭐⭐⭐⭐',
  5: '⭐⭐⭐⭐⭐',
}

type SubTab = 'locations' | 'elements' | 'enemies'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function EncyclopediaTab() {
  const [subTab, setSubTab] = useState<SubTab>('locations')

  const tabs: { id: SubTab; label: string }[] = [
    { id: 'locations', label: 'Локации' },
    { id: 'elements', label: 'Элементы' },
    { id: 'enemies', label: 'Враги' },
  ]

  return (
    <div className="flex flex-col gap-4">
      {/* Sub-tab switcher */}
      <div className="flex gap-1 rounded-lg bg-stone-900/60 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              subTab === tab.id
                ? 'bg-amber-800/70 text-amber-100'
                : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
            }`}
            onClick={() => setSubTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Locations sub-tab */}
      {subTab === 'locations' && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-stone-700/50 text-left text-stone-500">
                <th className="pb-2 pr-3 font-semibold">Локация</th>
                <th className="pb-2 pr-3 font-semibold">Биом</th>
                <th className="pb-2 pr-3 font-semibold">Тир</th>
                <th className="pb-2 pr-3 font-semibold">Риски</th>
                <th className="pb-2 font-semibold">Описание</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/50">
              {LOCATIONS.map((loc) => (
                <tr key={loc.id} className="text-stone-300">
                  <td className="py-2 pr-3 font-medium text-amber-200 whitespace-nowrap">
                    {loc.name}
                  </td>
                  <td className="py-2 pr-3 whitespace-nowrap">
                    {BIOME_NAME_SHORT[loc.biome] ?? loc.biome}
                  </td>
                  <td className="py-2 pr-3">
                    <span className="rounded border border-stone-600/50 bg-stone-800/50 px-1 py-0.5 text-[10px] font-bold">
                      {loc.tier}
                    </span>
                  </td>
                  <td className="py-2 pr-3">
                    <div className="flex flex-wrap gap-0.5">
                      {loc.risks.map((el) => {
                        const style = getElementStyle(el)
                        return (
                          <span
                            key={el}
                            className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium ${style.bg} ${style.text}`}
                          >
                            {ELEMENTS.find((e) => e.id === el)?.nameRu ?? el}
                          </span>
                        )
                      })}
                    </div>
                  </td>
                  <td className="py-2 text-stone-400 max-w-[200px] truncate" title={loc.description}>
                    {loc.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Elements sub-tab */}
      {subTab === 'elements' && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-stone-700/50 text-left text-stone-500">
                <th className="pb-2 pr-3 font-semibold">Элемент</th>
                <th className="pb-2 pr-3 font-semibold">ID</th>
                <th className="pb-2 font-semibold">Основные биомы</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/50">
              {ELEMENTS.map((el) => {
                const style = getElementStyle(el.id)
                return (
                  <tr key={el.id} className="text-stone-300">
                    <td className="py-2 pr-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${style.bg} ${style.text}`}>
                        {el.nameRu}
                      </span>
                    </td>
                    <td className="py-2 pr-3 font-mono text-stone-500">{el.id}</td>
                    <td className="py-2">
                      <div className="flex flex-wrap gap-1">
                        {el.primaryBiomes.map((b) => (
                          <span
                            key={b}
                            className="inline-flex items-center rounded border border-stone-600/40 bg-stone-800/40 px-1.5 py-0.5 text-[9px] text-stone-400"
                          >
                            {BIOME_NAME_SHORT[b] ?? b}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Enemies sub-tab */}
      {subTab === 'enemies' && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-stone-700/50 text-left text-stone-500">
                <th className="pb-2 pr-3 font-semibold">Враг</th>
                <th className="pb-2 pr-3 font-semibold">Биом</th>
                <th className="pb-2 pr-3 font-semibold">Тир</th>
                <th className="pb-2 pr-3 font-semibold">Атаки</th>
                <th className="pb-2 font-semibold">Опасность</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/50">
              {ENEMIES.map((enemy) => (
                <tr key={enemy.id} className="text-stone-300">
                  <td className="py-2 pr-3 font-medium text-amber-200 whitespace-nowrap">
                    {enemy.name}
                  </td>
                  <td className="py-2 pr-3">
                    <div className="flex flex-wrap gap-0.5">
                      {enemy.biomes.map((b) => (
                        <span key={b} className="text-[10px]">
                          {BIOME_NAME_SHORT[b] ?? b}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 pr-3 text-stone-400">
                    {enemy.tierRange[0]}–{enemy.tierRange[1]}
                  </td>
                  <td className="py-2 pr-3">
                    <div className="flex flex-wrap gap-0.5">
                      {enemy.attacks.map((atk, i) => (
                        <span
                          key={i}
                          className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                            atk.type === 'elemental' && atk.element
                              ? getElementStyle(atk.element).bg + ' ' + getElementStyle(atk.element).text
                              : 'bg-stone-700/60 text-stone-300'
                          }`}
                        >
                          {atk.type === 'elemental' && atk.element
                            ? ELEMENTS.find((e) => e.id === atk.element)?.nameRu ?? atk.element
                            : 'Физ.'}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 text-[10px]">{DANGER_STARS[enemy.dangerLevel]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
