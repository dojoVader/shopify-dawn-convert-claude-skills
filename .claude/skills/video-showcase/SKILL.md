---
name: video-showcase
description: Convert the Lushies prototype's full-width cinematic video banner into Dawn's video section.
---

# Video showcase

## Source
`static-template/Lushies Store.dc.html` lines 240–247 — 620px-tall 21:9 banner, gradient placeholder standing in for the video poster, centered play-circle icon, `Playfair Display` title, and a "Film · 2:14" duration label.

## Target
`sections/video.liquid` (already exists, supports both a `video` (Shopify-hosted) and `video_url` (YouTube/Vimeo) setting plus `image_picker` for the poster/cover and `inline_richtext` for overlay text — this is a restyle, not new functionality).

## What to convert
- Gradient placeholder (line 240) → the section's existing cover `image_picker` setting; keep the gradient only as a loading/no-image CSS fallback.
- Play button circle (line 243) → Dawn's video section already renders a play icon/button that triggers the modal or inline player; just restyle size/border to match (78px circle, 1px rgba border).
- Title + duration caption (lines 244–245) → map onto the section's heading/description rich-text settings rather than hardcoding "The making of Nocturne".

## Notes
- Don't rebuild video playback (modal vs. inline, YouTube/Vimeo embed handling) — `sections/video.liquid` and its JS controller already handle this.
