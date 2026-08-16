---
name: collection-grid
description: Convert the Lushies prototype's homepage "shop by category" tile grid into Dawn's collection-list section.
---

# Collection grid (Collection Grid / Product Categories)

## Source
`static-template/Lushies Store.dc.html` lines 189–202 — centered eyebrow+heading ("Collections" / "Shop by category"), then a 5-column grid (`sc-for list="{{ categories }}"`) of image + uppercase caption tiles, each linking to a collection.

## Target
`sections/collection-list.liquid` (already exists, uses `featured_collection` blocks with a `collection` setting — this section already does exactly this job, restyle its grid/card treatment rather than building a new section).

## What to convert
- 5-column grid, 16px gaps → `sections/collection-list.liquid`'s existing column-count setting (check schema ~line 214+ for `color_scheme`/grid settings); adjust default column count and gap to match, don't hardcode `repeat(5,1fr)`.
- Each tile's image + caption (lines 196–199) → delegate rendering to the **collection-cards** skill's `card-collection.liquid` (thumbnail variant) so the grid and mega-menu tiles share one card partial.
- `hint-placeholder-count="5"` → the section already supports N `featured_collection` blocks added by the merchant in the theme editor; no fixed count needed.

## Notes
- This section is the "Collection Grid" homepage block. If the sermon note's separate "Product Categories" item means an in-collection sub-category nav instead, that's covered by the sub-collection pill row in the **collection-cards** skill, not this section.
