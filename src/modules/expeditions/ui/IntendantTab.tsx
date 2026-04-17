'use client'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function IntendantTab() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <span className="text-4xl opacity-40">🏪</span>
      <h3 className="text-lg font-bold text-stone-500">Интендант</h3>
      <div className="max-w-xs space-y-2">
        <p className="text-sm text-stone-600">
          Этот раздел будет доступен в будущих обновлениях
        </p>
        <p className="text-xs text-stone-700">
          Здесь появится магазин гильдии: покупка карт, ключей, снаряжения для искателей.
        </p>
      </div>
    </div>
  )
}
