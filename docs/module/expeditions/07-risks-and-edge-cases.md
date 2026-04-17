# Risks and edge cases

## Product / data risks

1. **Loot vs biome mismatch:** Granting an item whose catalog `biomes[]` never includes the expedition biome breaks world coherence. Mitigation: validation helper + CI; whitelist rare “story” drops explicitly.
2. **Empty `biomes[]` on processed goods:** Implies not a natural drop — boss caches or shops may still grant them; document each exception in location data or a global override table.
3. **`swamp` vs `bog`:** Two ids for similar fantasy tone — keep distinct in data unless UX research says merge; expedition copy should use depot labels to avoid drift.
4. **Multi-biome routes:** Weight loot by time spent, by “primary” biome, or by per-segment tables — **open design**; pick one rule before balancing.
5. **Sub-biomes:** Finer tags (e.g. forest: coniferous) vs named sites only — defer until worldgen/expedition scope needs them.

## Technical risks

1. **Double resolution:** Idempotent `clientRequestId` or run state machine guards to prevent duplicate loot on retry.
2. **Clock / offline:** Wall-clock completion vs tick-based — affects cheating and tests; document chosen model in [`docs/specs/expeditions.md`](../../specs/expeditions.md) (MVP: wall-clock + dev acceleration; see `DevConfig`).
3. **Standalone kit vs monorepo:** Standalone repo should use **stub catalog** or pinned subset of ids for tests; full parity tests run in monorepo CI.

## UX risks

1. **Magical biomes** (`shadow_realm`, `crystal_caves`, `ancient_ruins`): Gating must be clear (story, key, tier) to avoid player frustration.
2. **Frequency display:** Showing `legendary` spawn hints may over-promise yield; align wording with actual table math.

## Open questions (tracked)

| # | Question |
|---|----------|
| 1 | Sub-biomes vs named sites — when to introduce structured sub-tags? |
| 2 | Multi-biome expeditions — exact weighting function for loot? |
| 3 | Should EXPEDITIONS ever import ADVENTURERS, or always host-composed snapshots? |
| 4 | Server-authoritative runs vs client-only MVP — persistence and anti-cheat? |
| 5 | Integration with **`QUEST_SYSTEM`** — event hooks vs polling unlock flags? |

## Changelog (risks doc)

| Version | Date | Notes |
|---------|------|--------|
| 0.1 | 2026-04-15 | Merged risks/open questions from former locations/biomes working doc. |
