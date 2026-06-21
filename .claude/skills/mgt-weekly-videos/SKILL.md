---
name: mgt-weekly-videos
description: >
  Add a new weekly batch of MGTLAB student project videos to the showcase site.
  Use this whenever the user drops .MOV/.mp4 files in ~/Desktop/MGT_TEMPORARY and
  asks to add them for a given week — e.g. "MGT_TEMPORARY에 영상 넣었어, 4주차 추가해줘",
  "이번 주차 영상 올려줘", "N주차 학생 영상 넣어줘", "add this week's student videos".
  The user gives the week number and a rough description of that week's project
  (sensors used, the API, what the kids built); this skill compresses each video,
  files it under a randomized public/videos path, wires up app/s/[slug]/student-videos.ts,
  updates the tests, and verifies the result. Trigger it even if the user doesn't say
  the word "skill" — any "new weekly student videos" request belongs here.
---

# MGTLAB Weekly Student Videos

This is the repeatable flow for publishing one week's student project videos to the
parent-facing showcase. The user records each kid's ~1-minute project clip, drops the
`.MOV` files in `~/Desktop/MGT_TEMPORARY`, and tells you the week number plus a casual
description of the project. Your job is to turn that into compressed web videos and a
clean data update, matching the existing weeks' tone, without changing the page design.

`docs/weekly-update-checklist.md` is the human version of this process — read it for
context, but this skill is the executable one.

## What you need from the user

- **Week number** (e.g. 4주차) and roughly **what the project was**: which sensors,
  which API, what the kids built and how it works. Keep your own notes — you'll turn
  this into a short title + summary, not a spec.
- **Who has a video this week.** Filenames in the temp folder are usually
  `학생이름_N주차.MOV` (e.g. `박노아_4주차.MOV`). Map each Korean name to a student in
  `app/s/[slug]/student-videos.ts` via its `displayName`.
- **Who is missing a video.** A student with no clip this week is simply **left out of
  the new week** — don't add a week entry for them. Their tabs stop at the previous
  week and that week stays their latest. (This is the agreed "비활성화" behavior — no
  greyed-out tab, no design change.) Confirm with the user who's missing before you skip them.

If any of this is ambiguous (which name maps to which slug, who's missing), ask — a
wrong name→slug mapping ships the wrong kid's video to a parent.

## Steps

### 1. Inventory the source files
List `~/Desktop/MGT_TEMPORARY` and read `app/s/[slug]/student-videos.ts` to learn the
current students, their slugs, their latest week, and the `cohortLabel`/`dateLabel` in use.

### 2. Compress each video
For every student with a clip, pick a **fresh random child directory and random filename**
under `public/videos` — the path must NOT contain the student's name or slug (parents share
these links). Match the existing naming vibe: `<4char>-<word>/<4char>-<word>-note.mp4`
(look at the existing dirs for the flavor). Then run the bundled script:

```bash
.claude/skills/mgt-weekly-videos/scripts/compress.sh \
  "$HOME/Desktop/MGT_TEMPORARY/박노아_4주차.MOV" \
  public/videos/<random-dir>/<random-name>.mp4
```

These files are big (60-80 MB) and compression takes a minute or two each — run them in
the background and in parallel. The script prints the output size; **the existing videos
are ~2-8 MB, so aim for that range.** If a clip lands much heavier, re-run with a higher
CRF (the script takes it as a third arg). Don't ship a 20 MB clip when the others are 5 MB —
parents open these on mobile data.

### 3. Update the data file
Edit `app/s/[slug]/student-videos.ts`. For each student **who has a video this week**:

- Remove `isLatest: true` from their current latest week.
- Append a new week object at the end of their `weeks` array:
  - `id`: follow the existing scheme, e.g. `"2026-summer-w4"`.
  - `label`: `"N주차"`.
  - `dateLabel`: same term label the other weeks use (e.g. `"2026 여름학기"`).
  - `title`: `"<주제> 프로젝트 소개 영상"`.
  - `summary`: see tone guide below.
  - `videoPath`: `/videos/<random-dir>/<random-name>.mp4` (the file you just made).
  - `downloadName`: readable, e.g. `"mgtlab-noa-week-4.mp4"` (romanized name + week).
  - `isLatest: true`.

Students without a video: leave their `weeks` untouched.

### 4. Match the tone for title + summary
The summaries are for parents, not engineers. Keep them to 1-2 warm, concrete sentences
that name the sensors/API and say what the child built and how it works. Mirror the
existing phrasing ("~를 활용해 ~를 만들었습니다 / 진행했습니다"). Don't over-explain the API
or the wiring.

**Example (week 4 — sound + switch sensor OX quiz):**
> 소리 센서와 스위치 센서로 OX 퀴즈 게임을 만들었습니다. 퀴즈 API에서 받아온 문제를 보고
> 왼쪽 버튼은 O, 오른쪽 버튼은 X로 정답을 맞히고, 박수를 쳐서 소리 센서가 큰 소리를 감지하면
> 다음 문제로 넘어가도록 만들었습니다.

All students that week share the same title/summary (they did the same project) — only the
video path and download name differ per student.

### 5. Light up the new week on the home page (easy to forget!)
The home page (`app/page.tsx`) has a `const currentWeek = N` and a row of week pills that
"light up" — past weeks dark, the current week pink, future weeks grey. If you don't bump
`currentWeek`, the new week's pill stays grey on the landing page even though the student
pages have the video. **Set `currentWeek` to the week number you just added.** (The grid's
aria-label is derived from `currentWeek`, so you don't need to touch it separately.) This is
the single most-forgotten step — do it every time you add a week.

### 6. Keep the tests in sync
`tests/student-videos.test.ts` encodes invariants that a new week can break. After adding a
week, check and fix:

- The per-student week **count** assertion — students now have different counts (kids with
  a video gained a week; skipped kids didn't). Use `>=`, not a hard equal.
- The **latest week** assertion — both the per-student one (latest should equal the last
  week in the array) and the specific-slug one (e.g. 노아's latest id is now the new week).
- Add a **content check** for the new week's title/summary, guarded by `.find(label === "N주차")`
  so it only runs for students who have it. This keeps the parent-facing copy under test.

### 7. Update the checklist status (if relevant)
If `docs/weekly-update-checklist.md` tracks an import status that's now stale, update it.

### 8. Verify — don't skip this
Run all of these and confirm they pass before reporting done:

```bash
npm test && npm run lint && npm run build
```

Then a real mobile smoke check, because the build passing doesn't prove the video plays:

1. `npm run start -- -p 4123 &` (then stop it when done).
2. Drive a browser at a mobile viewport (390×844). For a student **with** the new video:
   navigate to `/s/<slug>`, enter their PIN, and confirm the new 주차 tab appears, is
   auto-selected as latest, the `<video>` actually plays (readyState 4 / not paused), and
   the download link points at the right file.
3. For a **skipped** student: confirm their page has **no** new-week tab and their latest
   is unchanged.
4. Open the home page (`/`) and confirm the new week's pill is now lit (the current-week
   highlight sits on week N), not greyed out — this catches a forgotten step 5.
4. `curl -o /dev/null -w "%{http_code} %{size_download}"` each new `/videos/...mp4` to
   confirm it's served at full size.

Report what passed with the actual numbers (tab list, sizes, play state) — not just "looks good".

## Pitfalls
- **Bump `currentWeek` in `app/page.tsx`** — the most-forgotten step. Without it the new
  week's pill stays grey on the home page even though the videos are live.
- Don't put a student's name or slug in the video path — these links go to parents.
- Don't forget to remove the old `isLatest` when adding the new latest week; exactly one
  week per student should be latest.
- Don't add a week for a student who has no clip — that would 404 their video.
- Weeks 1..N-1 already in the data are unchanged; only touch what this week's batch requires.
