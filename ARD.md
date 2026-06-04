# ARD

Updated: 2026-06-04 14:27:11 JST

## Architecture Intent
- Current app is a Next.js 16 app using React 19, TypeScript, Tailwind CSS 4, and the App Router under `app/`.
- `AGENTS.md` warns that this Next.js version has breaking changes; read `node_modules/next/dist/docs/` before making framework-specific code changes.
- v1 should stay static: no database, no CMS, no account login, no server PIN validation.
- Treat the page as a mobile video playback surface first. Download is a secondary action.
- `DESIGN.md` is the source of truth for the current visual system.

## Current Constraints
- Do not commit local secrets or environment files.
- Keep `CLAUDE.local.md` local-only and gitignored.
- Static PIN guard is not true access control. It prevents casual or accidental viewing, not technical bypass.
- Because files in `public/` can be accessed by URL, use randomized video paths and filenames.
- Video files may make the git repository and Vercel deploys heavy. Compress files before adding them.
- If videos grow beyond comfortable repo/deploy limits, migrate video storage to Vercel Blob, S3, Cloudflare R2, or similar.

## Integration Boundaries
- Frontend: `app/`, `public/`, global styles in `app/globals.css`.
- Product documentation: `PRD.md`, `roadmap.md`, `roadmap.progress.json`.
- Architecture documentation: `ARD.md`.
- Design documentation: `DESIGN.md`.
- Session history: `docs/session-logs/YYYY-MM-DD.md`.
- Suggested data boundary: a small typed data file for children, PINs, week metadata, and randomized video paths.
- Video boundary: `public/videos/<random-child-dir>/<random-week-file>.mp4` for v1.
- Auth boundary: client-side PIN check and `localStorage` persistence for v1.
- Backend/API/storage: intentionally deferred.

## Open Questions
- What deployment target should this assume, Vercel or another host?
- Which video formats must be supported beyond `.mp4`, if any?

## Decision Log
- 2026-06-03: Created initial ARD scaffold from available repo context.
- 2026-06-03: Approved Approach A: static Next.js video gate with randomized child links, fixed child PINs, localStorage persistence, week selector, in-site playback, and download.
- 2026-06-03: Added `DESIGN.md` as the design source of truth and regression tests that guard the brighter design direction.
- 2026-06-04: Kept child/PIN/week metadata in `app/s/[slug]/student-videos.ts`; compressed local `.mov` files to 720p H.264/AAC `.mp4` before placing them in randomized `public/videos` paths.
