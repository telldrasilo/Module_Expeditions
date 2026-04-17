# SCv5 documentation map

Entry point for all maintainer-facing documentation in this repository. **Methodology:** atomic notes and hubs — see [`docs/spec/atomic-documentation.md`](spec/atomic-documentation.md).

## Start here

| Audience | Hub |
|----------|-----|
| **Agents / contributors** | [`AGENTS.md`](../AGENTS.md), [`worklog.md`](../worklog.md) |
| **Expeditions (shipping engineering)** | [`docs/module/expeditions/00-index.md`](module/expeditions/00-index.md) |
| **Expeditions (design deep-dive, MVP plan, appendices)** | [`docs/dev/expeditions/00-index.md`](dev/expeditions/00-index.md) |
| **Product / lore / roadmap (TZ)** | [`docs/TZ/README.md`](TZ/README.md) · English split [`docs/TZ/en/00-index.md`](TZ/en/00-index.md) |
| **Narrative audit (RU)** | [`docs/STORYLINE_AUDIT.md`](STORYLINE_AUDIT.md) |
| **Monorepo registry stubs** (merge targets) | [`docs/specs/README.md`](specs/README.md) |

## Layout

```text
docs/
  spec/           # How we write docs (meta)
  specs/          # Thin registry / normative stubs for future monorepo
  module/         # Engineering packs (boundaries, API, integration)
  dev/            # Implementation notes, lore appendices, historical plans
  TZ/             # Product specification
```

## Expeditions: which folder?

| Need | Use |
|------|-----|
| **What the code exports, DAG, integration rules** | `docs/module/expeditions/` (`01`–`09`) |
| **Where files live after MVP (`as-built`)** | [`docs/module/expeditions/09-as-built.md`](module/expeditions/09-as-built.md) |
| **Q&A design detail, UI wire intent, weapon model narrative** | `docs/dev/expeditions/` |
| **Game should / world should** | `docs/TZ/` |

If `module/` and `dev/` disagree, **prefer `module/`** for boundaries and API; update `dev/` or add a note in [`worklog.md`](../worklog.md).
