# DESIGN

Updated: 2026-06-07 12:35:00 JST

## Direction
MGTLAB parent video pages use an Airbnb-inspired, video-first design with the tone of an academy project record. The page should feel like a private, trustworthy parent viewing link, not a classroom dashboard or a children's app. Use a clean white canvas, restrained borders, generous spacing, and one confident action color.

## Design Name
Parent Trust + Academy Record

## Principles
- Keep the video as the primary object.
- Use minimal UX writing. Labels should name things, not explain obvious actions.
- Name the home surface as project intro videos, not a generic student video page.
- Signal selected state with strong contrast, not extra copy.
- Avoid pale blue, yellow, mint, and other classroom-decoration colors.
- Avoid dark dashboard styling.
- Avoid childish overload. This is for parents, not a toy interface.

## Palette
- Canvas: `#ffffff`
- Surface soft: `#f7f7f7`
- Hairline: `#dddddd`
- Hairline strong: `#c1c1c1`
- Primary: `#ff385c`
- Primary active: `#e00b41`
- Ink: `#222222`
- Body: `#3f3f3f`
- Muted: `#6a6a6a`

## Layout
- Mobile-first single column.
- PIN screen: centered white panel on a soft neutral background.
- Video screen: compact MGTLAB header, academy-record kicker, week buttons, then the video card.
- Home screen: show the class context first, then the internal student list. Use `프로젝트 소개 영상` as the home title, with `MGTLAB 4쿼터`, `여름학기 토요일반`, and `MGT-LAB 수업 · 16:00-18:00` as compact metadata. Never show raw slugs.

## Components
- Student cards: white background, hairline border, no helper sentence.
- PIN button: primary action.
- PIN input: neutral border; focus ring uses primary.
- Week buttons: selected week uses dark fill; inactive weeks stay white with hairline border.
- Video card: white surface, thin neutral border, no colored outline.
- Download button: secondary neutral outline.

## Motion
Use small press feedback only. No decorative animation in v1.
