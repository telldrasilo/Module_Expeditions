'use client'

import { useExpeditionStore } from '../expedition-store'
import { ExpeditionsTab } from './ExpeditionsTab'
import { EncyclopediaTab } from './EncyclopediaTab'
import { IntendantTab } from './IntendantTab'
import { DevPanel } from './DevPanel'
import { DispatchScreen } from './DispatchScreen'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ExpeditionsPanel() {
  const activeTab = useExpeditionStore((s) => s.activeTab)
  const setActiveTab = useExpeditionStore((s) => s.setActiveTab)

  const tabs: { id: 'expeditions' | 'encyclopedia' | 'intendant'; label: string; icon: string }[] = [
    { id: 'expeditions', label: 'Экспедиции', icon: '⚔️' },
    { id: 'encyclopedia', label: 'Энциклопедия', icon: '📖' },
    { id: 'intendant', label: 'Интендант', icon: '🏪' },
  ]

  return (
    <div className="flex flex-col gap-4">
      {/* Tab bar */}
      <div className="flex gap-1 rounded-lg bg-stone-900/60 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-amber-800 to-amber-900 text-amber-100 shadow-lg glow-gold'
                : 'text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
            }`}
            onClick={() => setActiveTab(tab.id)}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            <span className="mr-1.5">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div role="tabpanel">
        {activeTab === 'expeditions' && <ExpeditionsTab />}
        {activeTab === 'encyclopedia' && <EncyclopediaTab />}
        {activeTab === 'intendant' && <IntendantTab />}
      </div>

      {/* Dev panel (always rendered, visibility handled inside) */}
      <DevPanel />

      {/* Dispatch screen modal (portal overlay) */}
      <DispatchScreen />
    </div>
  )
}
