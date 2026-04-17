import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore } from './game-store'

// Reset store between tests
beforeEach(() => {
  useGameStore.getState().resetGame()
})

describe('useGameStore — resources', () => {
  it('starts with zero gold and mana', () => {
    const { resources } = useGameStore.getState()
    expect(resources.gold).toBe(0)
    expect(resources.mana).toBe(0)
  })

  it('earns gold', () => {
    useGameStore.getState().earnGold(50)
    expect(useGameStore.getState().resources.gold).toBe(50)
  })

  it('spends gold when sufficient', () => {
    useGameStore.getState().earnGold(100)
    const result = useGameStore.getState().spendGold(30)
    expect(result).toBe(true)
    expect(useGameStore.getState().resources.gold).toBe(70)
  })

  it('refuses to spend gold when insufficient', () => {
    useGameStore.getState().earnGold(10)
    const result = useGameStore.getState().spendGold(50)
    expect(result).toBe(false)
    expect(useGameStore.getState().resources.gold).toBe(10)
  })

  it('earns mana', () => {
    useGameStore.getState().earnMana(20)
    expect(useGameStore.getState().resources.mana).toBe(20)
  })

  it('spends mana when sufficient', () => {
    useGameStore.getState().earnMana(100)
    const result = useGameStore.getState().spendMana(40)
    expect(result).toBe(true)
    expect(useGameStore.getState().resources.mana).toBe(60)
  })

  it('refuses to spend mana when insufficient', () => {
    useGameStore.getState().earnMana(5)
    const result = useGameStore.getState().spendMana(10)
    expect(result).toBe(false)
    expect(useGameStore.getState().resources.mana).toBe(5)
  })
})

describe('useGameStore — blacksmith', () => {
  it('starts at level 1 as Novice', () => {
    const { blacksmith } = useGameStore.getState()
    expect(blacksmith.level).toBe(1)
    expect(blacksmith.title).toBe('Novice')
    expect(blacksmith.experience).toBe(0)
    expect(blacksmith.experienceToNext).toBe(100)
  })

  it('gains experience without leveling up', () => {
    useGameStore.getState().gainExperience(50)
    const { blacksmith } = useGameStore.getState()
    expect(blacksmith.experience).toBe(50)
    expect(blacksmith.level).toBe(1)
  })

  it('levels up when experience threshold is met', () => {
    useGameStore.getState().gainExperience(100)
    const { blacksmith } = useGameStore.getState()
    expect(blacksmith.level).toBe(2)
    expect(blacksmith.experience).toBe(0)
    expect(blacksmith.experienceToNext).toBe(120) // 100 * 1.2
  })

  it('carries over excess experience on level-up', () => {
    useGameStore.getState().gainExperience(150)
    const { blacksmith } = useGameStore.getState()
    expect(blacksmith.level).toBe(2)
    expect(blacksmith.experience).toBe(50)
  })

  it('can level up multiple times at once', () => {
    // Level 1→2 needs 100, level 2→3 needs 120 = 220 total
    useGameStore.getState().gainExperience(250)
    const { blacksmith } = useGameStore.getState()
    expect(blacksmith.level).toBe(3)
    expect(blacksmith.experience).toBe(30)
  })

  it('updates title based on level', () => {
    const { gainExperience } = useGameStore.getState()

    // Level 5 → Apprentice
    for (let i = 0; i < 4; i++) gainExperience(100 * Math.pow(1.2, i))
    expect(useGameStore.getState().blacksmith.title).toBe('Apprentice')
  })
})

describe('useGameStore — forge', () => {
  it('starts with no forge task', () => {
    expect(useGameStore.getState().forgeTask).toBeNull()
  })

  it('starts a forge task', () => {
    useGameStore.getState().startForge('iron-sword', 5000)
    const task = useGameStore.getState().forgeTask
    expect(task).not.toBeNull()
    expect(task!.recipeId).toBe('iron-sword')
    expect(task!.durationMs).toBe(5000)
  })

  it('rejects a second forge task while one is active', () => {
    useGameStore.getState().startForge('iron-sword', 5000)
    useGameStore.getState().startForge('steel-axe', 3000)
    expect(useGameStore.getState().forgeTask!.recipeId).toBe('iron-sword')
  })

  it('completes a forge task and awards gold + XP', () => {
    useGameStore.getState().startForge('iron-sword', 5000)
    useGameStore.getState().completeForge()

    expect(useGameStore.getState().forgeTask).toBeNull()
    expect(useGameStore.getState().resources.gold).toBe(10)
    expect(useGameStore.getState().blacksmith.experience).toBe(25)
  })

  it('completeForge is a no-op when no task is active', () => {
    useGameStore.getState().completeForge()
    expect(useGameStore.getState().resources.gold).toBe(0)
    expect(useGameStore.getState().blacksmith.experience).toBe(0)
  })
})

describe('useGameStore — resetGame', () => {
  it('resets everything to initial state', () => {
    const store = useGameStore.getState()
    store.earnGold(999)
    store.earnMana(500)
    store.gainExperience(200)
    store.startForge('test', 1000)

    store.resetGame()

    const after = useGameStore.getState()
    expect(after.resources.gold).toBe(0)
    expect(after.resources.mana).toBe(0)
    expect(after.blacksmith.level).toBe(1)
    expect(after.blacksmith.experience).toBe(0)
    expect(after.forgeTask).toBeNull()
  })
})
