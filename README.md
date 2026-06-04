# MGTLAB Project Records

Private parent-facing weekly project-record pages for MGTLAB students.

## Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Update Weekly Videos

The source of truth is `app/s/[slug]/student-videos.ts`.

Use `docs/weekly-update-checklist.md` when adding each weekly batch. Videos should be compressed to randomized paths under `public/videos/<random-child-dir>/<random-week-file>.mp4`.

## Verify

```bash
npm test
npm run lint
npm run build
```

## Current Routes

- `/s/a8n4-river`
- `/s/q5t9-paper`
- `/s/r3c7-stone`

Each route uses a per-student PIN and stores successful local access in `localStorage`.
