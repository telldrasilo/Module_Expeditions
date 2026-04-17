# 01. Concept & Scope

## 1.1 Core concept

The Expeditions module is the primary idle mechanic of SwordCraft. The player (a blacksmith) does not travel personally — instead, they dispatch NPC seekers on dangerous expeditions through the Seekers' Guild. Expeditions run in real time (with a dev-mode speed multiplier), random events occur during the run, and upon completion the player receives loot, resources, and weapon damage reports.

**Expedition lifecycle:**

```
1. Player opens "Guild" tab in the sidebar
2. Sees the quest board (expedition cards)
3. Selects a card → dispatch screen
4. Confirms dispatch → run state changes to "traveling"
5. Timer runs; random events appear in UI (pre-generated)
6. Timer ends → expedition resolves:
   - Loot is calculated (resources by biome)
   - Weapon damage is applied
   - Outcome is determined (success / partial / failure)
7. Notification appears in the right panel (chat)
8. Player collects loot → resources flow to game-store
```

## 1.2 Key principles

- **Expeditions = quests.** The terms are interchangeable, but UI always uses "Expedition."
- **Locations are data only.** Players never see a raw location list — only expedition cards on the board.
- **Random events are pre-generated** at dispatch time with trigger timestamps, creating the illusion of real-time events.
- **The module does not own** seekers, scars, or repairs — these are stubs.
- **Scars are a resource.** Weapon damage is not a penalty — scars accumulated during expeditions are the input material for the enchantment module. Players are incentivized to send weapons on dangerous expeditions.
- **Weapon breakage ≠ expedition failure.** A weapon can reach 0 durability during an expedition, but the mission still completes. Breakage only changes the outcome to `partial`.

## 1.3 In scope

| Component | Description |
|-----------|-------------|
| Location catalog | Data: 10 locations, 6 biomes, tiers 1-4 |
| Element catalog | 13 elements with biome associations |
| Enemy catalog | Enemies with biomes, tiers, elemental affinities |
| Client catalog | NPC quest-givers for quest generation |
| Resource catalog (stub) | RESOURCE_DEPOT stub: ~15-20 materials |
| Quest generation | Semi-procedural board generation (templates + substitution) |
| Expedition dispatch | UI for selecting and sending an expedition |
| Expedition timer | Configurable (real-time / accelerated) |
| Random event system | Pre-generation, display, effects |
| Expedition resolution | Loot, damage, and outcome calculation |
| Guild UI | Sidebar + tabs + quest board + event log |
| Dev mode | Checkbox + sliders + skip buttons |
| Weapon damage (data) | Damage calculation, storage in store |
| Right panel Guild channel | Message store, Guild channel tab, auto-switch checkbox |
| Intendant tab (placeholder) | "Coming soon" placeholder in Guild tabs |

## 1.4 Out of scope (stubs only)

| Component | Approach |
|-----------|----------|
| Seekers (ADVENTURERS) | 1 slot, always available, stat = blacksmith level × weapon tier |
| Weapon scars | Data only: `scars: WeaponDamage[]` — no study/repair UI |
| Weapon repair | Stub — separate iteration |
| Crafting / weapon | Stub — simple object with `durability` |
| RESOURCE_DEPOT | Stub catalog inside the module |
| Quest system (QUEST_SYSTEM) | Not implemented — expeditions ARE the quests |
