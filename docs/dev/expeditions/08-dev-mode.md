# 08. Dev Mode

## 8.1 Configuration

```typescript
interface DevConfig {
  enabled: boolean               // Toggle (checkbox)
  timeScale: number              // Time multiplier (1-3600)
  damageMultiplier: number       // Damage multiplier (0.1-3.0)
  eventsMin: number              // Min events per expedition (1-10)
  eventsMax: number              // Max events per expedition (1-10)
}
```

## 8.2 Defaults

```typescript
const DEV_CONFIG_DEFAULTS: DevConfig = {
  enabled: false,
  timeScale: 60,          // 1 minute real = 1 hour game (fast prototyping)
  damageMultiplier: 1.0,
  eventsMin: 2,
  eventsMax: 6,
}
```

## 8.3 UI placement

### Dev checkbox — sidebar status block

The checkbox "DEV-режим" is placed in the lower status block of the sidebar (next to "Кузница работает"). When enabled, it expands to show a control panel:

```
┌─ DEV ─────────────────────────────┐
│  ☑ DEV-режим                      │
│                                    │
│  Time speed: [====●===] ×60        │  ← timeScale slider (1-3600)
│  Damage mult: [==●=====] ×1.0     │  ← damageMultiplier slider (0.1-3.0)
│  Events (min): [2]                │  ← eventsMin input (1-10)
│  Events (max): [6]                │  ← eventsMax input (1-10)
│  [Refresh Board]                  │  ← Regenerate quest board
└────────────────────────────────────┘
```

### Skip buttons — active expedition

Two buttons appear next to the progress bar of the active expedition **only in dev mode**:

| Button | Action |
|--------|--------|
| ⏭ Skip to end | Sets `expectedEndAt = Date.now()`, forcing immediate completion |
| ⏭ Next event | Advances progress to the next un-revealed event's `triggerProgress` |

These buttons are hidden when dev mode is off.

## 8.4 Dev mode behavior details

| Setting | Effect when changed |
|---------|-------------------|
| `timeScale` | Affects **new** expeditions only; running expeditions keep their original `expectedEndAt` |
| `damageMultiplier` | Applied during event pre-generation; affects **new** expeditions only |
| `eventsMin/Max` | Applied during event pre-generation; affects **new** expeditions only |
| `enabled` | Toggles visibility of dev controls and skip buttons |

## 8.5 Time scale presets

For convenience, the time scale slider could have preset stops:

| Scale | Meaning | Use case |
|-------|---------|----------|
| 1 | Real-time | Production behavior |
| 10 | 6 min = 1 hour | Quick testing |
| 60 | 1 min = 1 hour | Default dev speed |
| 360 | 10 sec = 1 hour | Rapid testing |
| 3600 | 1 sec = 1 hour | Ultra-fast debugging |

## 8.6 Future considerations

- Dev panel could include a "Give gold" button for economy testing
- Dev panel could include a "Repair weapon" button (bypassing the repair module)
- Event inspector: view all pre-generated events with their trigger points
- Force specific encounter: override random selection for testing
