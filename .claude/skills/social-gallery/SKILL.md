---
name: social-gallery
description: Convert the Lushies prototype's "@lushies / As worn by you" UGC image grid into a Dawn section, reusing the collage section as a base where possible.
---

# Social media gallery

## Source
`static-template/Lushies Store.dc.html` lines 267–280 — centered eyebrow ("@lushies") + heading ("As worn by you"), then a 6-column grid of square gradient/image tiles (no captions or links visible in the prototype, but should link out to the social post/product in the real build).

## Target
Prefer extending `sections/collage.liquid` (already exists, supports mixed image/product blocks in a grid) over building a new section from scratch — check whether its block model can express a uniform 6-up square grid before adding a dedicated `social-gallery.liquid`.

## What to convert
- 6-column, square (`aspect-ratio:1`) grid, 10px gaps (lines 272–279) → a grid/column-count setting on the chosen section, image blocks driven by `image_picker` rather than CSS gradients.
- Since the prototype has no per-tile link/caption, add one: each tile should optionally link to a product, collection, or external social URL (a `link` setting per block) — this is required for a real storefront even though the mockup omits it.
- Eyebrow + heading (lines 269–270) → standard section-level text settings (`inline_richtext`), not hardcoded "@lushies" / "As worn by you".

## Notes
- If `collage.liquid`'s block model doesn't comfortably fit a uniform social grid (it's built more for asymmetric hero-style collages), fall back to a small new `sections/social-gallery.liquid` modeled directly on `collection-list.liquid`'s block/grid structure instead of inventing a new pattern.
