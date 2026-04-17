'use client'

import { useEffect, useRef } from 'react'
import { useExpeditionHost } from '../expedition-host-context'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function GuildChannel() {
  const {
    chatMessages,
    guildChannelActive,
    autoSwitchToGuild,
    setAutoSwitchToGuild,
  } = useExpeditionHost()

  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chatMessages.length])

  if (!guildChannelActive) return null

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-stone-800/80 px-2 py-2">
        <span className="pl-1 text-xs font-semibold uppercase tracking-wide text-stone-400">
          Гильдия
        </span>
        <label className="flex items-center gap-1 text-[10px] text-stone-500 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={autoSwitchToGuild}
            onChange={(e) => setAutoSwitchToGuild(e.target.checked)}
            className="h-3 w-3 rounded border-stone-600 bg-stone-800 accent-amber-500"
          />
          ☑ Автопереход
        </label>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto p-2 space-y-1"
      >
        {chatMessages.length === 0 ? (
          <p className="py-4 text-center text-xs text-stone-600 italic">
            Нет сообщений гильдии
          </p>
        ) : (
          chatMessages.map((msg) => {
            const icon =
              msg.type === 'expedition_complete'
                ? '📗'
                : msg.type === 'expedition_failed'
                  ? '🔴'
                  : msg.type === 'expedition_partial'
                    ? '🟡'
                    : '📜'

            const time = new Date(msg.timestamp)
            const timeStr = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`

            return (
              <div
                key={msg.id}
                className="flex items-start gap-1.5 rounded px-1.5 py-1 text-[11px] hover:bg-stone-800/40 transition-colors"
              >
                <span className="shrink-0">{icon}</span>
                <div className="min-w-0 flex-1">
                  <span className="text-stone-500 font-mono text-[9px]">{timeStr}</span>
                  <p className="text-stone-300 leading-snug">{msg.text}</p>
                  {msg.details && msg.details.length > 0 && (
                    <div className="mt-0.5 flex flex-col gap-0.5">
                      {msg.details.map((d, i) => (
                        <span key={i} className="text-[9px] text-stone-500">
                          • {d}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
