# PRD

Updated: 2026-06-04 14:27:11 JST

## Product Intent
- Build a mobile-first MGTLAB parent video page.
- The site replaces KakaoTalk video delivery, because larger videos were uploaded without sound.
- The core job is not a broad student portfolio. It is: a mother opens her child's private link, enters the child's PIN, watches the weekly project introduction video with sound, and can download the video if needed.

## Users And Jobs
- Primary user: mothers of MGTLAB students.
- Job: quickly watch this week's child project introduction video on mobile, then optionally download/save the file.
- Operator: the site owner updates videos weekly by editing project files and deploying to Vercel.

## Current Requirements
- Mobile-first viewing experience.
- Child-specific random link, for example `/s/7f3k-minjun`.
- Child-specific fixed PIN.
- Static PIN guard is acceptable for v1.
- After successful PIN entry, store the authentication state in `localStorage` so the same browser can skip the PIN later.
- Weekly videos are selectable with week buttons.
- The current/latest week must be visually emphasized.
- The primary screen must support in-site video playback, not only download.
- The video player must be the main content.
- A clear `영상 다운로드` action must sit near the video.
- Project/week description is optional and short, 1-2 lines at most.
- Videos can live in `public/videos` for v1 and be deployed through Vercel.
- Video filenames and directories must be non-obvious/randomized, not simple child names and week names.
- Visible UX writing must stay minimal. The page should show labels and content titles, not explanatory helper copy.
- Visual direction should feel like a clean academy project record for parents, while keeping the video-first workflow.

## Open Questions
- What are the remaining two student videos and PIN details for a full five-student weekly batch?
- Should there be a manual "PIN 다시 입력" or "인증 해제" action in v1, or is localStorage-only enough?

## Decision Log
- 2026-06-03: Created initial PRD scaffold from repo context and the user's request to track planning with PRD/ARD/roadmap artifacts.
- 2026-06-03: Approved v1 direction: static video gate with child-specific random links, child-specific PINs, localStorage persistence, week buttons, in-site playback, and download.
- 2026-06-03: Initially adopted minimal visible copy and a brighter ClassDojo-inspired design direction documented in `DESIGN.md`.
- 2026-06-03: Replaced the classroom tone with `Parent Trust + Academy Record`: neutral white surfaces, restrained borders, and copy framed as project records for parents.
- 2026-06-04: Replaced available sample records with local real videos for 노아, 세임, and 재윤. Current compression target is 720p H.264/AAC mp4 with randomized storage paths under `public/videos`.
