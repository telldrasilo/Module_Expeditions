# 07. Weapon Damage

## 7.1 Damage model

Weapon damage is calculated during each random event. Every event outcome may contain zero or more `WeaponDamage` entries.

### Damage sources

| Source | Type | Example |
|--------|------|---------|
| Enemy physical attack | `physical` | Boar charge, wolf bite |
| Enemy elemental attack | `elemental` | Fire fox flame, ice touch |
| Environmental anomaly | `elemental` | Lava flow, fungal spore cloud |

### Enemy → damage mapping

An enemy has `attacks: EnemyAttack[]`. During a combat event:

- For each `attack` in the enemy's `attacks` array:
  - If `type = 'physical'` → chance to inflict `WeaponDamage { type: 'physical', severity: cappedDangerLevel }`
  - If `type = 'elemental'` → chance to inflict `WeaponDamage { type: 'elemental', element: attack.element, severity: cappedDangerLevel }`

### Environment → damage mapping

For environment events:

- Damage element = event's `requiredElement` OR random from `location.risks`
- Severity depends on location tier

## 7.2 Damage chance formula

```
baseDamageChance = 0.3                          // 30% per attack
damageChance = baseDamageChance
             × (1 - durability / maxDurability) // lower durability → higher risk
             × damageMultiplier                 // dev config (0.1 - 3.0)
```

The formula creates a feedback loop: as the weapon takes damage and durability drops, subsequent hits are more likely to cause additional damage. The `damageMultiplier` from dev config allows tuning this for testing.

## 7.3 Severity table

### Combat events (enemy attacks)

| Enemy dangerLevel | Severity |
|-------------------|----------|
| 1-2 | 1 (light) |
| 3 | 2 (medium) |
| 4-5 | 3 (critical) |

### Environment events

| Location tier | Severity |
|---------------|----------|
| 1-2 | 1 (light) |
| 3 | 2 (medium) |
| 4+ | 3 (critical) |

## 7.4 Durability loss

Each damage reduces durability by `severity × 10`:

| Severity | Durability loss |
|----------|----------------|
| 1 (light) | -10 |
| 2 (medium) | -20 |
| 3 (critical) | -30 |

Starting durability is 100. When durability reaches 0, the weapon is **broken** — but the expedition continues. The `weaponBroken` flag is set on the run. No further durability is lost (already at 0), and the outcome status becomes `partial` (not `failed`). The expedition only fails if both the weapon is broken AND the seeker is injured.

This design reinforces that weapon damage (and resulting scars) is a **desired outcome**, not something to avoid.

## 7.5 Average damage expectation

With default settings (`damageMultiplier = 1.0`):

- Full durability weapon: `0.3` chance per attack
- 2-6 events, each with 1-2 attacks on average
- Expected damages per expedition: `0.3 × attacks × events ≈ 0-3`

This matches the user's requirement of "0-3 damages on average, tied to probability and risk."

## 7.6 Scars — a positive resource

Weapon damages are stored as `scars: WeaponDamage[]` on the stub weapon. **Scars are not a penalty — they are a crafting resource.** The enchantment module (future) will use scars as input material: the more elemental scars a weapon has, the more enchantment options become available.

This creates a core gameplay loop:

```
Forge weapon → Send on expedition → Weapon accrues scars → Scars enable enchantments
```

The player is incentivized to **let weapons take damage** rather than avoid it. A weapon with many scars is more valuable than a pristine one — it has been "seasoned" through real combat.

### Design implications

- Players should **want** to send weapons on dangerous expeditions to accumulate scars
- A weapon with 0 scars is a "blank slate" — enchantment potential is zero
- A weapon with diverse elemental scars (flame + frost + blood) opens more enchantment paths
- Durability loss is the only real cost — the weapon must eventually be repaired
- The repair module (future) will clear durability but **preserve scars** (or offer a choice)

In MVP, there is no UI for studying or removing scars — they accumulate as data. The scar → enchantment pipeline belongs to a future module.

```typescript
// After expedition:
stubWeapon.scars.push(...outcome.weaponDamages)
stubWeapon.durability -= totalDurabilityLoss
```

## 7.7 Edge cases

| Case | Behavior |
|------|----------|
| Durability drops to 0 mid-event | Weapon broken flag set; expedition continues. Outcome = `partial` |
| Durability already 0 at dispatch | Dispatch blocked (UI shows warning: "Оружие сломано, необходим ремонт") |
| Multiple severity-3 damages | Each reduces durability by 30; can reach 0 quickly |
| DamageMultiplier = 0.1 | Almost no damage; useful for testing UI flow |
| DamageMultiplier = 3.0 | Heavy damage; stress-test for failure path |
