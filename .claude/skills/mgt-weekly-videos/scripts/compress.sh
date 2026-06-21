#!/usr/bin/env bash
# Compress a student project MOV/MP4 into a parent-facing web mp4.
#
# Usage: compress.sh <input> <output.mp4> [crf]
#
# Why the specific flags matter:
#  -pix_fmt yuv420p  iPhone clips are often HEVC 10-bit (yuv420p10le). If you let
#                    x264 keep 10-bit, the output is H.264 "High 10" — which browsers,
#                    Safari, and macOS QuickTime CANNOT play (it looks like a dead/black
#                    video). Forcing 8-bit yuv420p is what makes it actually play
#                    everywhere. This is the single most important flag here.
#  scale ... 1280    Cap the LONGEST edge at 1280 while preserving orientation, then
#                    round to even dimensions (yuv420p requires even w/h). Phone clips
#                    are usually portrait, so a naive scale=1280:-2 (which assumes
#                    landscape) blows them up to ~1280x2276 and bloats the file. Capping
#                    the long edge gives ~720x1280, matching the existing videos.
#  crf 31            On these ~1-minute clips this lands around 4-9 MB, in line with the
#                    other weeks. Bump higher (32-34) if a clip is still heavy, lower
#                    (28-30) if it looks soft. Always re-check the output size + that it
#                    plays before shipping.
set -euo pipefail

input="$1"
output="$2"
crf="${3:-31}"

mkdir -p "$(dirname "$output")"

ffmpeg -y -i "$input" \
  -map 0:v:0 -map 0:a:0 \
  -vf "scale='min(1280,iw)':'min(1280,ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -preset medium -crf "$crf" \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  "$output"

probe() { ffprobe -v error -select_streams v:0 -show_entries "stream=$1" \
  -of default=nokey=1:noprint_wrappers=1 "$output"; }
size=$(du -h "$output" | cut -f1)
w=$(probe width)
h=$(probe height)
pf=$(probe pix_fmt)
prof=$(probe profile)
dur=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$output")
echo "OK  $output  (${size}, ${w}x${h}, ${pf}, ${prof}, ${dur}s, crf=${crf})"
# Safety net: yuv420p10le / High 10 will not play in browsers.
case "$pf" in
  yuv420p) ;;
  *) echo "WARNING: pix_fmt is '$pf' (expected yuv420p) — this may not play in browsers." >&2 ;;
esac
