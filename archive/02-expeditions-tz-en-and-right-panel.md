# Archive 02 — Expeditions docs, English TZ split, README/worklog, right panel collapse

## Completed: 2026-04-14

### Documentation

- Restructured `docs/TZ` (file) into `docs/TZ/spec.ru.md` + `docs/TZ/README.md` + `docs/TZ/en/*.md` (12 translated parts + index).
- Linked expeditions module index to the TZ folder.
- Updated root `README.md` to point at `docs/module/expeditions` and `docs/TZ`.

### UI

- `SkinShell`: right encyclopedia / message rail collapses to the narrow channel strip; expand/collapse control wired with `useState` and a11y labels.

### Follow-up (doc navigation)

- Bidirectional **cross-reference tables** between `docs/module/expeditions/00-index.md` and `docs/TZ/en/00-index.md`; `docs/TZ/README.md` and root `README.md` point at them.
