# 11. Phased development plan

## Phase 1: Data prep (1–2 weeks)

- [ ] Add constant modules: `elements.ts`, `biomes.ts`, `enemies.ts`, `questGivers.ts`, `locations.ts` (first 10–15 sites).
- [ ] Export all TypeScript types.
- [ ] Implement `getPossibleResourcesForLocation` integrated with `RESOURCE_DEPOT`.

## Phase 2: Locations & tiers (1 week)

- [ ] Author a minimal `locations` table (1–2 sites per biome for tiers 1–3).
- [ ] Player state for unlocked locations + condition checks.

## Phase 3: Quest generation (2 weeks)

- [ ] `questTemplates` array (5–7 templates).
- [ ] `generateQuest` implementation.
- [ ] Next.js quest board UI with generated cards.
- [ ] Daily refresh (client timer check, `setInterval`, or server cron).

## Phase 4: Expedition runtime (2 weeks)

- [ ] Active expedition state: timer, quest payload, event log.
- [ ] Countdown UI.
- [ ] Periodic encounter rolls (e.g. every 20 minutes).
- [ ] Completion: loot, scar effects, resource updates.

## Phase 5: Events & scars (2–3 weeks)

- [ ] `encounters` catalog (20–30 minimum).
- [ ] Selection + log rendering.
- [ ] Scar pipeline on weapon state.
- [ ] Post-run weapon inspection UI (study/remove scars).

## Phase 6: Polish & expansion (ongoing)

- [ ] More locations, enemies, events.
- [ ] Reputation & global events.
- [ ] Quest chains & unique keys.
- [ ] Reward & drop balance.
