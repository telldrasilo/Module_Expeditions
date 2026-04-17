# Atomic documentation specification

## Goals

- **Navigate quickly:** any topic should be reachable from a small number of hub pages, without reading long linear documents.
- **Stable context for agents:** one file should carry enough local context for a task; cross-links provide depth without duplication.
- **Portable text:** docs remain useful in Git, GitHub, and Cursor without relying on proprietary note formats.

This borrows the *idea* of Obsidian-style **atomic notes** (one main idea per file, dense linking). We use **standard Markdown** and **relative paths** so links work everywhere.

---

## Atomic note

An **atomic note** is a Markdown file that:

1. **Centers on one concern** — e.g. a subsystem boundary, a contract, a glossary term cluster, or a single workflow. If the title needs “and” twice, consider splitting.
2. **Stays short enough to skim** — rough guide: roughly **200–600 lines** for narrative specs; shorter for indexes and checklists. If it grows past that, split by *concern* and link.
3. **Names itself clearly** — file name matches the main idea (`06-data-authority.md`, `atomic-documentation.md`). Prefer **kebab-case**; use **numeric prefixes** only for ordered packs (`00-index`, `01-…`, `02-…`).
4. **Links outward** — related atoms are referenced explicitly; the note does not silently assume the reader has read everything else.

**Not atomic:** a dump of everything about a module in one file; a copy-paste of another doc with minor edits (use one canonical atom and link).

---

## Hub pages (`00-index.md`)

Each **documentation pack** (a folder that forms a coherent set) should have a **`00-index.md`** hub that:

- States **purpose** and **status** (draft / current / deprecated).
- Lists **all sibling atoms** in a table with one-line descriptions.
- Provides **cross-pack links** (e.g. module pack ↔ TZ ↔ audits).
- Optionally includes **reading order** for onboarding, separate from the full table.

Hubs are the main **entry points** for humans and agents. When you add a new atom in a pack, **update that pack’s `00-index.md`**.

---

## Linking rules

1. **Use relative Markdown links** — `[title](./other.md)`, `[TZ](../../TZ/en/00-index.md)`. Avoid Obsidian-only `[[wikilinks]]` in canonical repo docs (they do not render reliably on GitHub or in all editors).
2. **Link to a specific atom**, not only to a folder, unless the folder’s `00-index.md` is the intended landing page.
3. **Avoid duplicate sources of truth** — one canonical atom per fact; elsewhere, link or quote a short excerpt with “see …”.
4. **When product vs engineering specs differ** — resolve in code or in docs, then record the decision briefly in the relevant hub or in [`worklog.md`](../../worklog.md).

---

## Documentation layers

Use separate packs for different *roles* of documentation (same idea may appear in two layers with different emphasis — link between them):

| Layer | Typical path | Role |
|-------|----------------|------|
| **Product / feature (TZ)** | `docs/TZ/`, `docs/TZ/en/` | What the game should do; lore; player-facing rules; roadmap. |
| **Module / engineering** | e.g. `docs/module/<module>/` | Boundaries, domain model, public API, integration contracts, delivery. |
| **Implementation / dev notes** | e.g. `docs/dev/<topic>/` | Experiments, MVP plans, stubs, deep dives not yet promoted to module docs. |
| **Methodology (meta)** | `docs/spec/` | How we write docs (this specification). |
| **Audits** | e.g. `docs/STORYLINE_AUDIT.md` or dedicated packs | Narrative or cross-cutting reviews; link from hubs, do not merge into module atoms unless adopted as spec. |

When a dev note becomes authoritative, **promote** it (move or summarize into module/TZ) and replace the old file with a short pointer to the new canonical atom.

---

## Front matter (optional)

Optional YAML at the top of an atom is allowed when it helps automation or clarity, for example:

```yaml
---
title: Data authority
status: current
---
```

Keep fields minimal. Do not rely on front matter as the only place where **status** or **title** is stated; repeat a short status line in the body if the pack uses that convention elsewhere.

---

## Style

- **English** for `docs/spec/` and for maintainer-facing module docs unless a pack explicitly targets another language (e.g. Russian TZ source).
- **One H1** per file (`# Title`).
- Prefer **tables** for cross-references and file lists in hubs.
- Use **blockquote** sparingly for warnings or canonicality (“Source of truth: …”).

---

## Agent and contributor expectations

When editing documentation in this repo:

1. **Prefer surgical edits** — change only the atoms relevant to the task; do not rewrite unrelated sections for style.
2. **Preserve links** — after moves/renames, update all relative links and hub tables.
3. **Update the hub** — new or removed files in a pack require an `00-index.md` update.
4. **State assumptions** — if something is unclear, add a short “Open questions” or link to `worklog.md` instead of guessing.
5. **Follow this spec** — detailed rules live in this file; [`AGENTS.md`](../../AGENTS.md) points here for Cursor and other agents.

---

## Checklist (new atom)

- [ ] Single clear concern; name reflects content.
- [ ] Linked from the pack’s `00-index.md`.
- [ ] Cross-links to related TZ/module/dev atoms where useful.
- [ ] No duplicate canonical definition of the same fact.
- [ ] Relative paths only; no broken links after save.

---

## Revision

Major changes to this methodology should update **this file** and, if agent behavior changes, [`AGENTS.md`](../../AGENTS.md) and the Cursor rule in `.cursor/rules/` that references this spec.
