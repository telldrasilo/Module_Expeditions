# Archive 01 — Clone & deploy SCv4 project

## Completed: 2026-04-12

- Cloned https://github.com/telldrasilo/SCv4.git into /home/z/my-project/SCv4
- Copied all project files (app/, components/, src/, configs) to /home/z/my-project/ root
- Changed dev port from 3010 to 3000 in package.json
- Excluded skills/ and SCv4/ from tsconfig.json to fix typecheck noise
- Verified tsc --noEmit passes clean
- Verified Next.js dev server starts and serves GET / 200
- Removed SCv4/ duplicate directory
- Created archive/ directory and worklog.md

**Result:** Project running at http://localhost:3000 (Next.js 16 + React 19 + Tailwind 4). All source files in correct layout (app/, components/, src/, public/).
