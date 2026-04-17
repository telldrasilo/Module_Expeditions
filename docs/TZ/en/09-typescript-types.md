# 9. TypeScript data types

## 9.1 Base types from RESOURCE_DEPOT

```typescript
export type Biome =
  | 'mountains' | 'forest' | 'swamp' | 'volcanic' | 'deep_mines'
  | 'desert' | 'tundra' | 'ocean_coast' | 'ancient_ruins'
  | 'shadow_realm' | 'crystal_caves' | 'bog';

export interface BiomeEntry {
  biome: Biome;
  frequency: 'common' | 'uncommon' | 'rare' | 'legendary';
}

export interface Material {
  id: string;
  name: string;
  biomes: BiomeEntry[];
  // ...other fields
}
```

## 9.2 Elements

```typescript
export type Element =
  | 'flame' | 'frost' | 'lightning' | 'decay' | 'blood' | 'bone'
  | 'mind' | 'shadow' | 'light' | 'distortion' | 'magnetism' | 'space' | 'void';

export interface ElementInfo {
  id: Element;
  nameRu: string;
  description: string;
  strongBiomes: Biome[];
}
```

## 9.3 Locations

```typescript
export type LocationTier = 1 | 2 | 3 | 4 | 5;

export interface ExpeditionLocation {
  id: string;
  biome: Biome;
  tier: LocationTier;
  name: string;
  description: string;
  risks: Element[];
  requiredItemTier?: number;
  unlockCondition?: UnlockCondition;
}

export interface UnlockCondition {
  type: 'quest' | 'key' | 'reputation' | 'globalEvent';
  value: string;
}
```

## 9.4 Quests

```typescript
export interface QuestTemplate {
  id: string;
  type: 'hunt' | 'gather' | 'explore' | 'deliver' | 'boss';
  titleTemplate: string;
  descriptionTemplate: string;
  baseRewardFormula: { gold: number; reputation: number };
  requiredDataType: 'enemy' | 'resource' | 'none';
}

export interface GeneratedQuest {
  id: string;
  templateId: string;
  locationId: string;
  questGiverId: string;
  title: string;
  description: string;
  targetEnemyId?: string;
  targetResourceId?: string;
  reward: { gold: number; reputation: number };
  duration: number;
  resourceHints: ResourceHint[];
}

export interface ResourceHint {
  materialId: string;
  frequency: 'common' | 'uncommon' | 'rare' | 'legendary';
}
```

## 9.5 Encounters (extended)

```typescript
export interface Encounter {
  id: string;
  category: EncounterCategory;
  templateText: string;
  allowedBiomes: Biome[];
  allowedTiers: LocationTier[];
  requiredElement?: Element;
  possibleEnemies?: string[];
  possibleResources?: string[];
  outcomes: EncounterOutcome[];
  weight?: number;
}

export type EncounterCategory =
  | 'combat' | 'environment' | 'remains' | 'wildlife' | 'npc' | 'puzzle';

export interface EncounterOutcome {
  id: string;
  description: string;
  chance: number;
  effects: EncounterEffects;
}

export interface EncounterEffects {
  addScar?: Element;
  addResources?: { materialId: string; amount: number }[];
  seekerInjury?: boolean;
  timeModifier?: number;
  reputationChange?: number;
  keyItem?: string;
  unlockLocation?: string;
}
```

## 9.6 Enemies

```typescript
export interface Enemy {
  id: string;
  name: string;
  description: string;
  biomes: Biome[];
  tierRange: [LocationTier, LocationTier];
  elementalAffinity: Element[];
  dangerLevel: 1 | 2 | 3 | 4 | 5;
  possibleDrops: EnemyDrop[];
}

export interface EnemyDrop {
  materialId: string;
  chance: number;
  amount: [number, number];
}
```

## 9.7 Clients

```typescript
export interface QuestGiver {
  id: string;
  name: string;
  role: 'merchant' | 'blacksmith' | 'alchemist' | 'noble' | 'commoner';
  preferredBiomes?: Biome[];
}
```

## 9.8 Quest board state

```typescript
export interface QuestBoardState {
  generatedAt: number;
  expiresAt: number;
  quests: GeneratedQuest[];
}
```
