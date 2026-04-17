# Archive 01 — Vitest setup + Game state store

## Completed: 2026-04-12

### Vitest

- Installed `vitest@4.1.4` as dev dependency
- Created `vitest.config.ts` with `@/` path alias and node environment
- Added `npm test` (single run) and `npm run test:watch` (watch mode) scripts
- Created `vitest.setup.test.ts` — 2 basic smoke tests
- All 29 tests green

### Game state (Zustand 5)

- Installed `zustand@5`
- Created `src/lib/game-store.ts` with:
  - **Resources**: gold, mana — earn/spend with balance checks
  - **Blacksmith**: level, XP, level-up with 1.2x scaling, title progression (Novice → Apprentice → Expert → Master → Legend)
  - **Forge**: start/complete single craft, gold + XP rewards on completion
  - **resetGame**: full state reset
- Created `src/lib/format.ts` with `formatNumber` (K/M/B/T suffixes) and `formatPercent`
- Created `src/lib/game-store.test.ts` — 19 tests covering all store actions
- Created `src/lib/format.test.ts` — 8 tests for formatting utilities
