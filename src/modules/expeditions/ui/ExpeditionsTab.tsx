'use client'

import { useEffect } from 'react'
import { useExpeditionStore } from '../expedition-store'
import { ActiveExpedition } from './ActiveExpedition'
import { QuestBoard } from './QuestBoard'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ExpeditionsTab() {
  const activeRun = useExpeditionStore((s) => s.activeRun)
  const board = useExpeditionStore((s) => s.board)
  const refreshBoard = useExpeditionStore((s) => s.refreshBoard)

  // Auto-generate board on first render if none exists
  useEffect(() => {
    if (!board) {
      refreshBoard()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col gap-6">
      {/* Active expedition */}
      {activeRun && (
        <section aria-label="Активная экспедиция">
          <ActiveExpedition />
        </section>
      )}

      {/* Quest board */}
      <section aria-label="Доска заданий">
        <QuestBoard />
      </section>
    </div>
  )
}
