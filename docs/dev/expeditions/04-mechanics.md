# 04. Mechanics

## 4.1 Quest board generation

The board displays 3-6 expedition cards. Generation triggers:

- First visit to the Guild (if board is empty)
- Daily refresh at 00:00 server time (future feature)
- "Refresh board" button (dev mode only)

### Generation algorithm

```
for each slot on the board (3-6):
  1. Pick a random quest template (weighted)
  2. Pick a random unlocked biome
  3. Pick a location in that biome at a valid tier
  4. Resolve enemy/resource by template type:
     - hunt  → filter enemies by biome + tier
     - gather → filter resources by biome + tier + frequency
  5. Pick a quest giver (random or biome-preferring)
  6. Fill template strings
  7. Calculate reward:
     gold = base * (1 + (tier - 1) * 0.5)
     reputation = base * tier
  8. Calculate duration:
     baseMinutes = 60 * tier * typeMultiplier
       typeMultiplier: hunt=1.0, gather=0.8, explore=1.2, deliver=1.5, boss=2.0
  9. Aggregate risks: location.risks ∪ enemy attack elements
  10. Store in board state
```

## 4.2 Expedition timer

### Time model

| Config | Meaning |
|--------|---------|
| `timeScale = 1` | Real-time (1 hour = 1 hour) |
| `timeScale = 60` | Accelerated (1 minute real = 1 hour game) |
| `timeScale = 3600` | Ultra-fast (1 second real = 1 hour game) |

### Formula

```
actualDurationMs = rawDurationMs / timeScale
expectedEndAt = startedAt + actualDurationMs
progress = (Date.now() - startedAt) / (expectedEndAt - startedAt)
```

Progress is recalculated on every render tick. When `progress >= 1`, the expedition resolves.

### Offline handling

If the player closes the browser and returns after `expectedEndAt`, the expedition is already complete. The run state transitions to `resolving` → `completed` on the next mount/tick.

## 4.3 Event pre-generation

When an expedition starts (`startExpedition`):

```
1. Determine event count: randomInt(devConfig.eventsMin, devConfig.eventsMax)
2. For each event slot:
   a. Generate triggerProgress: random float in [0.1, 0.95]
   b. Filter encounters:
      - allowedBiomes includes location.biome
      - allowedTiers includes location.tier
      - tag intersection with location.tags is non-empty (or encounter has no tags)
   c. Pick a random encounter (weighted by encounter.weight)
   d. Pick an outcome (weighted by outcome.chance)
   e. Calculate effects (damage with devConfig.damageMultiplier applied)
3. Sort events by triggerProgress
4. Store in ExpeditionRun.events
```

Events are **revealed** (shown in UI) as progress crosses each `triggerProgress` threshold. Effects are **applied immediately** when revealed.

## 4.4 Expedition resolution

When the timer completes:

```
1. Apply all un-resolved events automatically
2. Calculate outcome status:
   - SUCCESS: no seeker injury AND weapon durability > 0
   - PARTIAL: seeker injured OR weapon durability = 0 (broken)
   - FAILURE: seeker injured AND weapon broken (both conditions)
3. Calculate loot:
   - For each stub resource matching the biome:
     weight = frequencyWeight * tierModifier
     roll for each resource, quantity = randomInRange
   - Add enemy drops (if combat events occurred)
4. Build ExpeditionOutcome
5. Push notification to right panel (chat)
6. Wait for player to collect loot
7. On collection: game-store.addExpeditionResources() + applyWeaponDamages()
```

### Loot calculation (detail)

```typescript
function calculateLoot(location: ExpeditionLocation, tier: LocationTier): LootEntry[] {
  const loot: LootEntry[] = []
  for (const resource of STUB_RESOURCES) {
    const biomeEntry = resource.biomes.find(b => b.biome === location.biome)
    if (!biomeEntry) continue

    const weight = frequencyToWeight(biomeEntry.frequency)
    const tierMod = 1 + (tier - 1) * 0.2
    const dropChance = (weight * tierMod) / 100  // normalised

    if (Math.random() < dropChance) {
      const quantity = randomInt(1, Math.ceil(tier * 1.5))
      loot.push({ resourceId: resource.id, quantity })
    }
  }
  return loot
}

function frequencyToWeight(freq: ResourceFrequency): number {
  switch (freq) {
    case 'common':    return 100
    case 'uncommon':  return 50
    case 'rare':      return 15
    case 'legendary': return 3
  }
}
```

### Weapon breakage during expedition

If weapon durability drops to 0 during an event (mid-expedition), the expedition **continues** — the mission is still completed. A broken weapon (durability = 0) does **not** cause the expedition to fail. Instead:

- The `weaponBroken: true` flag is set on the run.
- Weapon damage events still accumulate (scars), but no further durability is lost (already at 0).
- The outcome status is determined as follows:
  - **SUCCESS**: no seeker injury AND weapon durability > 0
  - **PARTIAL**: seeker injured OR weapon durability = 0 (broken)
  - **FAILURE**: only if seeker is injured AND weapon is broken

This means weapon breakage is not a disaster — it changes the outcome to `partial` (reducing bonus rewards), and the broken weapon becomes a source of scars for the enchantment module. The player is incentivized to let weapons accumulate damage, because scars are a crafting resource.

## 4.5 Quest board state

```typescript
interface QuestBoardState {
  quests: GeneratedQuest[]
  generatedAt: number             // epoch ms
  expiresAt: number               // epoch ms (daily refresh)
}
```

On board refresh, old uncompleted quests **disappear**. There is no "save slot" mechanic in MVP.

## 4.6 Single expedition slot

MVP allows only **one active expedition** at a time. If a run is in `traveling` state, the quest board is still visible but cards show a "locked" state — the player must wait for the current expedition to complete before dispatching another.

Future expansion: the Guild can be upgraded to unlock 2-3 slots.
