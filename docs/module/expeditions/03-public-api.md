# Public API

All host-facing exports come from **`src/modules/expeditions/index.ts`**. After monorepo extraction, the same surface should live at `modules/EXPEDITIONS/src/index.ts` as **`@expeditions/index`**.

**As-built:** [`09-as-built.md`](09-as-built.md) · **Types source:** [`types.ts`](../../../src/modules/expeditions/types.ts)

## Stable exports (MVP)

| Category | Exports |
|----------|---------|
| **Constants** | `MODULE_ID` |
| **UI** | `ExpeditionsPanel` |
| **Store** | `useExpeditionStore` |
| **Data** | `BIOMES`, `getBiome`, `getAllBiomes` |
| **Types** | `Biome`, `Element`, `ExpeditionLocation`, `GeneratedQuest`, `QuestBoardState`, `ExpeditionRun`, `ExpeditionOutcome`, `ExpeditionState`, `StubWeapon`, `DevConfig`, `ChatMessage`, and other types re-exported from `./types` (see `index.ts` for the full list). |

Run orchestration, board refresh, and dispatch are **store actions** on `useExpeditionStore` (not separate `startExpedition` free functions). Hosts may wrap these in adapters when extracting the module.

## Stable vs internal

- **Stable:** Everything exported from `index.ts`, plus integration callbacks or props documented in [`04-integration-contracts.md`](04-integration-contracts.md).
- **Internal:** Imports from `lib/`, `data/`, or deep UI paths are **not** part of the public contract.

## Store pattern

**One Zustand store** (`expedition-store.ts`) owns expedition runs, quest board, dispatch UI flags, and dev settings. Persistence (localStorage, server) is **not** enabled in the MVP; policy belongs in [`docs/specs/expeditions.md`](../../specs/expeditions.md) once chosen.

## Optional future exports

| Symbol | Role |
|--------|------|
| `validateLootAgainstCatalog` | Pure helper: loot vs depot catalog + biome (tests / CI) — not exported in MVP. |
| `selectLootTable` | RNG-driven resolution with injected RNG — internal to resolver today. |
