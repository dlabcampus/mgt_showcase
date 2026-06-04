# Weekly Update Checklist

Updated: 2026-06-04 JST

## Goal
Add five MGTLAB student project-record videos in 10-20 minutes without changing the visible page design.

## Inputs
- Five finished student videos.
- Student display names.
- Fixed 4-6 digit PIN for each student.
- Week label, for example `10주차`.
- One short title and one short summary per week.

## Video Prep
- Put incoming files outside the repo first, for example `~/Downloads`.
- Compress each video before adding it to `public/videos`.
- Use a random child directory and random mp4 filename. Do not put the student name in the storage path.
- Keep output as `.mp4` with H.264 video and AAC audio.

Example:

```bash
mkdir -p public/videos/r7m4-canvas
ffmpeg -y -i ~/Downloads/input.mov \
  -map 0:v:0 -map 0:a:0 \
  -vf 'scale=1280:-2' \
  -c:v libx264 -preset medium -crf 28 \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  public/videos/r7m4-canvas/p9w2-signal-record.mp4
```

## Data Update
- Edit `app/s/[slug]/student-videos.ts`.
- Add or update one `students` entry per student.
- Keep `slug` random enough for sharing, for example `a8n4-river`.
- Set `displayName` to the parent-facing student name.
- Set `pin` to that student's fixed PIN.
- Add the newest week under `weeks`.
- Set `isLatest: true` on exactly one week per student.
- Remove `isLatest` from the previous latest week when adding a new week.
- Set `videoPath` to the compressed file under `/videos/...`.
- Set `downloadName` to a readable file name, for example `mgtlab-noa-week-10.mp4`.

## Five-Student Pass
- Student 1: data updated, compressed mp4 added, PIN checked.
- Student 2: data updated, compressed mp4 added, PIN checked.
- Student 3: data updated, compressed mp4 added, PIN checked.
- Student 4: data updated, compressed mp4 added, PIN checked.
- Student 5: data updated, compressed mp4 added, PIN checked.

## Verification
- Run `npm test`.
- Run `npm run lint`.
- Run `npm run build`.
- Open at least one updated `/s/<slug>` route on mobile viewport.
- Enter the PIN and confirm the page opens.
- Play the video and confirm sound works.
- Tap `영상 다운로드` and confirm the linked mp4 exists.

## Current Import Status
- Imported: 노아, 세임, 재윤.
- Missing before a complete five-student weekly batch: two more student videos and their student/PIN details.
