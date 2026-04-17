'use client'

import { useExpeditionStore } from '../expedition-store'
import { QuestCard } from './QuestCard'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function QuestBoard() {
  const board = useExpeditionStore((s) => s.board)
  const activeRun = useExpeditionStore((s) => s.activeRun)
  const refreshBoard = useExpeditionStore((s) => s.refreshBoard)

  const quests = board?.quests ?? []
  const locked = !!activeRun

  if (quests.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <h3 className="text-sm font-semibold text-amber-200">Доска заданий</h3>
        <p className="text-xs text-stone-500">Доска пуста</p>
        <button
          type="button"
          className="rounded-md bg-amber-800/70 px-4 py-2 text-sm font-semibold text-amber-100 transition-colors hover:bg-amber-700/80 active:bg-amber-900/80"
          onClick={refreshBoard}
        >
          Нажмите для обновления
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-amber-200">Доска заданий</h3>
        <button
          type="button"
          className="rounded-md border border-stone-700/50 bg-stone-800/50 px-2 py-1 text-xs text-stone-400 transition-colors hover:border-amber-700/40 hover:text-amber-200"
          onClick={refreshBoard}
          disabled={locked}
          title="Обновить доску"
        >
          🔄 Обновить
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {quests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} locked={locked} />
        ))}
      </div>
    </div>
  )
}
