# Worklog — SwordCraft module kit (SCv4)

**Read this file before any task.** It mixes **non-negotiable boundaries** (module-kit rules) with **short session state** (to-do + latest work record).

For the full process (doc pack, GitHub Template workflow, merge checklist), use the SwordCraft monorepo spec **`docs/specs/module-development-kit.md`** when available, or the doc pack under **`docs/module/<your-slug>/`** in your repo.

---

## Module kit — must follow

Use this section as a **checklist**; do not rely on memory from chat.

| Rule | Detail |
|------|--------|
| **Layout** | New feature code follows **`examples/reference-module/`** (or the path your `README` names). Do not invent new top-level folders without a one-line note in `docs/module/<slug>/00-index.md`. |
| **Docs** | Domain specs for a **product module** live in **`docs/module/<slug>/`** (`00-index` … `08-delivery-manifest`). This `worklog.md` is **not** the module spec. |
| **DAG** | A feature module **must not** import the **Craft Planner** (or other "consumer" hosts). Integration is composed in the **host** / shell. |
| **Data** | One **single writer** per catalog or rule set (see `06-data-authority.md` in your doc pack). No copy-paste duplicates across modules. |
| **API** | Stable exports only through the module **entry** (`index.ts` / agreed public file). Deep paths are not a public contract. |
| **Delivery** | No handoffs that bundle `.git` from other projects, random `skills/`, or full monorepo trees — see `08-delivery-manifest.md`. |
| **Secrets** | Never commit **`.env`** with real secrets. Only **`.env.example`**. |

---

## What belongs in the sections below

- **To-do:** only the **current** task (keep short).
- **Work records:** only the **latest** completed task. Older records go to **`archive/`** (`01-topic.md`, `02-topic.md`, ...).
- Long write-ups belong in **`docs/`**, not here.

---

## Current state

| Item | Value |
|------|-------|
| Stack | Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript |
| Theme | Dark medieval (`theme-root.css`, `globals.css`) |
| Layout | `SkinShell` component (sidebar, statusbar, forge, dock) |
| State mgmt | Zustand 5 (`src/lib/game-store.ts`) — resources, blacksmith, forge |
| Tests | Vitest 4 — run `npm test` |
| Dev port | 3000 |

---

## Development rules

### Layout and files

- Follow: **`app/`** (routes, layout, globals), **`components/`** (shell and UI), **`src/`** (theme, CSS, `experiments/`), **`public/`** (static assets).
- **Split large components** into focused files under `components/` or `app/`.
- **Reusable helpers** — small pure modules under `src/` or a dedicated `lib/`; avoid copy-paste.

### Documentation

- When behavior or setup changes, update the **right** markdown (`README`, boilerplate notes, or **`docs/module/...`**).
- Do not use this file as a full specification.

### Language (SwordCraft-aligned)

- **Code comments and maintainer docs** — **English**.
- **Player-visible UI strings** (labels, buttons, in-game copy) — **Russian** when building features intended for the SwordCraft game shell.
- **This repo's** project markdown (README, worklog, technical notes) — **English**, unless a file is intentionally bilingual/RU for team review only.

### Technical debt and risk

- Prefer **small steps**; keep `npm run typecheck`, `npm test`, and `npm run build` green.
- Mark **temporary** choices in code or docs so they are easy to revisit.

### Tests

- Non-trivial logic → testable helpers + **Vitest** **`*.test.ts`** next to the module.

---

## Agent protocol

Every agent **must**:

1. **Read** this file (including **Module kit — must follow**) before starting.
2. On task completion: move the **previous** work record to `archive/` (next free number), then add the **new** record under **Work records** (only one).

Record format:

```markdown
---
Task ID: <id>
Agent: <agent name>
Task: <what was requested>

Work Log:
- <step 1>
- <step 2>

Stage Summary:
- <key results / decisions / artifacts>
```

---

## To-do

<!-- On completion: add archive/NN-topic.md and trim this section. -->

- Optional: expand encounter / quest-giver narrative content (Track A in `docs/dev/expeditions/11-mvp-plan.md`) — code MVP is shipped
- Optional: align `docs/TZ` and data with [`docs/STORYLINE_AUDIT.md`](docs/STORYLINE_AUDIT.md) follow-ups

---

## Work records

---
Task ID: 8
Agent: main
Task: Document repo layout alignment with GitHub Module_Expeditions; worklog hygiene

Work Log:
- Archived older work records (Tasks 4–6) to `archive/00-prior-work-records-tasks-4-6.md`; Task 7 to `archive/03-work-record-expeditions-implementation.md` per agent protocol
- Recorded delivery context: local tree was flattened to match `https://github.com/telldrasilo/Module_Expeditions` (app/src/components at repo root, no nested `SCv5/` folder in Git)
- Noted prior push used `git subtree split --prefix=SCv5` then `git push --force` to `origin/main` so remote history was replaced; clones should use root `npm install` / `npm run dev`
- Root `.gitignore` excludes `node_modules/`, `.next/`, `.env*` (keep `.env.example` only)

Stage Summary:
- Single current work record in this file; Task 7 preserved in archive
- Contributors: treat this repo as the Next app root; do not reintroduce a `SCv5/` wrapper in Git without updating README and AGENTS paths
