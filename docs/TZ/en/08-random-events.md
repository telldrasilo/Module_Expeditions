# 8. Random events during expeditions

## 8.1 Core loop

While an expedition **timer** runs, events fire on an interval (e.g. every 15–30 real minutes or each progress “tick”). An event is drawn from a pool filtered by:

- Current location **biome** and **tier**.
- Location **elements**.
- Mission **type** (optional).
- Seeker stats (future).

Events show as short **log lines** under the timeline. Some apply **gameplay effects**:

- Add loot.
- Add a weapon **scar** of an element.
- Injure the seeker (efficiency/time penalty).
- Change remaining duration.
- Drop a key or map.

## 8.2 Event categories

### 8.2.1 Combat

Ambush or fight; outcome depends on seeker skill and weapon.

**Template example:**  
*“{seeker} walked into {enemy} lying in wait. A short fight followed.”*

**Outcomes:** victory (loot + possible scar); costly victory (loot + scar + injury); defeat (retreat, lost loot, extra weapon damage/scar).

### 8.2.2 Environment

Elemental surge; often applies a matching **scar**.

**Template:** *“In a cliff cleft, a vein of pure {element} throbs. The air shudders with heat.”*

**Outcomes:** study (scar + maybe resource); bypass (no effect).

### 8.2.3 Remains

Ruins, stashes, altars.

**Example:** *“{seeker} finds an old altar marked with {element}. In a hollow — handfuls of ash.”*

**Outcomes:** resource/key; curse (scar/penalty); nothing.

### 8.2.4 Wildlife

Non-hostile but risky/useful creatures.

**Outcomes:** sneak (rare resource chance); observe (nothing).

### 8.2.5 NPC

Brief social encounter.

**Outcomes:** help (map/info/rep); ignore.

### 8.2.6 Puzzle

Skill check situation.

**Outcomes:** success (stash); fail (nothing or trap: scar/loss).

## 8.3 Event data shape

```typescript
interface Encounter {
  id: string;
  category: 'combat' | 'environment' | 'remains' | 'wildlife' | 'npc' | 'puzzle';
  templateText: string;
  allowedBiomes: Biome[];
  allowedTiers: LocationTier[];
  requiredElement?: Element;
  possibleEnemies?: EnemyId[];
  possibleResources?: ResourceId[];
  possibleOutcomes: EncounterOutcome[];
}

interface EncounterOutcome {
  description: string;
  chance: number;
  effects: {
    addScar?: Element;
    addResources?: { resourceId: string; amount: number }[];
    seekerInjury?: boolean;
    timeModifier?: number;
    reputationChange?: number;
    keyItem?: string;
  };
}
```

## 8.4 Weapon scars

A **scar** records elemental exposure. After repair, the blacksmith may **study** it — remove it or keep it as latent power.

- Weapons hold `scars: Element[]` (or counts per element).
- Scar-granting events append (or increment) the matching element.
- Post-expedition UI lists new scars and possible actions.

*(Detailed War Soul flow lives in another module.)*
