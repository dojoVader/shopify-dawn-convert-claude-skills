---
name: collection-cards
description: Convert the Lushies prototype's collection banner ("Image Cover") and collection card/thumbnail styles into Dawn's card-collection snippet and collection banner section.
---

# Collection cards (Image Cover / Collection Thumbnail)

## Source
`static-template/Lushies Store.dc.html`:
- **Image Cover** — collection page hero banner, lines 287–291: full-bleed gradient background, centered white text (eyebrow label, `Playfair Display` H1, description).
- **Collection Thumbnail** — mega menu category tiles (lines 69–105) and homepage "shop by category" tiles (lines 194–201) both reuse the same pattern: aspect-ratio image block + caption underneath/overlaid.
- Sub-collection pill row on the collection page, lines 297–301 (`subCollections` loop) — small rounded thumbnail chips for filtering into child collections.

## Target
- `sections/main-collection-banner.liquid` (or the equivalent collection hero section) for the **Image Cover** style.
- `snippets/card-collection.liquid` (already exists) for the **Collection Thumbnail** card — this is the single source of truth reused by collection grids, mega menu, and sub-collection pills; restyle it once rather than duplicating markup per skill.

## What to convert
- Gradient placeholders (`linear-gradient(150deg,#F3C4D1,#C97F98)` etc.) → real `collection.featured_image | image_url` via `image_tag`, with the gradient kept only as a CSS `background` fallback when no image is set (Dawn's existing pattern in `card-collection.liquid`).
- Eyebrow label / heading / description on the banner (lines 288–290) → `collection.title` / `collection.description` plus a `section.settings` override for custom banner copy, not hardcoded "Lips" text.
- Sub-collection pill row (lines 297–301) → a small block list referencing child collections; this can be a thin wrapper around `card-collection.liquid` in `compact`/`pill` display mode rather than new markup.

## Notes
- Keep one canonical card partial (`card-collection.liquid`) with a `display` or `style` param for cover/thumbnail/pill variants, matching how Dawn already parameterizes `card-product.liquid` — don't fork three separate snippets.
- Follow `liquid-skills:shopify-liquid-themes` for LiquidDoc header conventions when adding new snippet parameters.
