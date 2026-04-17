# Agent instructions (SCv5)

## Scope

This file applies to work in the **SwordCraft Idle Forge** app under this directory (`SCv5/`): Next.js UI, game shell, and documentation in `docs/`.

## Documentation

**Map:** [`docs/00-index.md`](docs/00-index.md) — where TZ, module, dev, and audits live.

When creating, moving, or restructuring Markdown under `docs/`, follow the **atomic documentation** specification:

- **Index:** [`docs/spec/00-index.md`](docs/spec/00-index.md)
- **Full spec:** [`docs/spec/atomic-documentation.md`](docs/spec/atomic-documentation.md)

**Hubs:** each doc pack should expose a `00-index.md`; update it when adding or removing files in that pack.

**Product vs engineering:** feature intent lives in [`docs/TZ/`](docs/TZ/README.md); module boundaries and APIs in [`docs/module/`](docs/module/expeditions/00-index.md). If they disagree, reconcile and note the decision in [`worklog.md`](worklog.md) or the relevant hub.

## Code

- Run tests with `npm test` when changing behavior covered by tests.
- Match existing patterns in `src/`; avoid drive-by refactors unrelated to the task.
