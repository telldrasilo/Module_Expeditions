# 09. Stubs

External modules that don't exist yet are represented as stubs within the Expeditions module. Each stub is clearly marked and will be replaced when the corresponding module is integrated.

## 9.1 Seeker (ADVENTURERS implicit MVP)

The ADVENTURERS module does not exist. For MVP there is **no** `StubSeeker` type in code — a single implicit seeker is assumed (party snapshot / derived power only):

```typescript
// Conceptual only — not a named export in src/
const implicitSeeker = {
  id: 'seeker_default',
  name: 'Искатель',
  available: true as const,
}
```

**Rules:**
- One seeker slot, always available, no hiring or leveling
- Seeker stats are derived: `effectivePower = blacksmithLevel × weaponTier`
- `seekerInjury` is tracked as a boolean flag in the run but has no lasting effect (no persistence between expeditions)
- When ADVENTURERS module is integrated, the stub is removed and the host passes a `partySnapshot`

## 9.2 Weapon (WEAPON_INVENTORY stub)

```typescript
const STUB_WEAPON: StubWeapon = {
  id: 'weapon_stub',
  name: 'Железный меч',
  tier: 1,
  durability: 100,
  maxDurability: 100,
  scars: [],
}
```

**Rules:**
- Single weapon, always equipped
- `tier` starts at 1; can be changed in dev mode for testing
- `durability` decreases during expeditions; can be "repaired" via a stub action (full restore)
- `scars` accumulate as `WeaponDamage[]` — no study/remove UI in MVP
- When WEAPON_INVENTORY is integrated, the stub is replaced by the actual weapon state

**Stub actions in game-store:**

```typescript
repairWeapon: () => void        // Full durability restore, clear scars
setWeaponTier: (tier: number) => void  // Dev helper
```

## 9.3 Resources (RESOURCE_DEPOT stub)

A minimal catalog of ~15-20 resources, living in `src/modules/expeditions/data/stubResources.ts`.

See [appendix-a-locations.md](appendix-a-locations.md) for the full resource list.

**Rules:**
- Resource IDs follow the convention: `mat-` for materials, `con-` for consumables
- Each resource has `biomes[]` with frequency — used for loot generation
- Expedition loot is stored in `game-store.expeditionResources: Record<string, number>`
- When RESOURCE_DEPOT is integrated, the stub is removed and loot flows to the depot stock

**Stub actions in game-store:**

```typescript
addExpeditionResources: (loot: Array<{ resourceId: string; quantity: number }>) => void
```

## 9.4 Repair (stub action)

A simple action in game-store that fully restores the weapon:

```typescript
repairWeapon: () => {
  set((s) => ({
    stubWeapon: {
      ...s.stubWeapon,
      durability: s.stubWeapon.maxDurability,
    },
  }))
}
```

(`scars` are not cleared in MVP — matches `game-store.ts`.)

This is a placeholder. The real repair module will have costs, skill checks, and scar management.

## 9.5 Stub resource catalog

```typescript
const STUB_RESOURCES: StubResource[] = [
  // Forest
  { id: 'mat-rotwood', name: 'Гнилое дерево', type: 'material',
    biomes: [{ biome: 'forest', frequency: 'common' }, { biome: 'swamp', frequency: 'uncommon' }] },
  { id: 'mat-herbs', name: 'Целебные травы', type: 'material',
    biomes: [{ biome: 'forest', frequency: 'common' }] },
  { id: 'mat-dark_resin', name: 'Тёмная смола', type: 'material',
    biomes: [{ biome: 'forest', frequency: 'uncommon' }] },

  // Mountains
  { id: 'mat-iron_ore', name: 'Железная руда', type: 'material',
    biomes: [{ biome: 'mountains', frequency: 'common' }, { biome: 'deep_mines', frequency: 'common' }] },
  { id: 'mat-bone_fragment', name: 'Костяной фрагмент', type: 'material',
    biomes: [{ biome: 'mountains', frequency: 'uncommon' }, { biome: 'tundra', frequency: 'uncommon' }] },
  { id: 'mat-magnetite', name: 'Магнетит', type: 'material',
    biomes: [{ biome: 'mountains', frequency: 'rare' }, { biome: 'deep_mines', frequency: 'uncommon' }] },

  // Swamp
  { id: 'mat-rot_essence', name: 'Гнилостная эссенция', type: 'material',
    biomes: [{ biome: 'swamp', frequency: 'common' }, { biome: 'bog', frequency: 'common' }] },
  { id: 'mat-blood_moss', name: 'Кровавый мох', type: 'material',
    biomes: [{ biome: 'swamp', frequency: 'uncommon' }, { biome: 'bog', frequency: 'common' }] },

  // Volcanic
  { id: 'mat-fire_crystal', name: 'Огненный кристалл', type: 'material',
    biomes: [{ biome: 'volcanic', frequency: 'uncommon' }] },
  { id: 'mat-ash_stone', name: 'Пепельный камень', type: 'material',
    biomes: [{ biome: 'volcanic', frequency: 'common' }] },

  // Deep Mines
  { id: 'mat-deep_iron', name: 'Глубинное железо', type: 'material',
    biomes: [{ biome: 'deep_mines', frequency: 'uncommon' }] },
  { id: 'mat-void_shard', name: 'Осколок бездны', type: 'material',
    biomes: [{ biome: 'deep_mines', frequency: 'rare' }] },

  // Universal
  { id: 'con-health_potion', name: 'Зелье здоровья', type: 'consumable',
    biomes: [{ biome: 'forest', frequency: 'uncommon' }, { biome: 'swamp', frequency: 'rare' }] },
  { id: 'mat-leather_scraps', name: 'Кожаные обрезки', type: 'material',
    biomes: [{ biome: 'forest', frequency: 'common' }, { biome: 'mountains', frequency: 'common' }] },
  { id: 'mat-fang', name: 'Звериный клык', type: 'material',
    biomes: [{ biome: 'forest', frequency: 'uncommon' }, { biome: 'mountains', frequency: 'uncommon' },
             { biome: 'tundra', frequency: 'uncommon' }] },
]
```

## 9.6 Migration notes

When replacing stubs with real modules:

| Stub | Real module | Migration step |
|------|-------------|----------------|
| Implicit seeker | ADVENTURERS | Host passes `partySnapshot` to dispatch; expedition store accepts adventurer IDs |
| `STUB_WEAPON` | WEAPON_INVENTORY | Expedition reads/writes weapon durability and scars through inventory API |
| `STUB_RESOURCES` | RESOURCE_DEPOT | Loot flows to depot stock; resource IDs validated against depot catalog |
| `repairWeapon()` | REPAIR module | Full repair action replaced by repair workflow with costs and skill |
