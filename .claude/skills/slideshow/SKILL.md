---
name: slideshow
description: Convert the Lushies prototype's three homepage hero directions (full-bleed, editorial split, type-led triptych) into slides/blocks on Dawn's slideshow section.
---

# Slideshow (slide with caption)

## Source
`static-template/Lushies Store.dc.html` lines 118–178. Note the prototype exposes three interchangeable hero **directions** via buttons (lines 120–125), not three simultaneous slides — treat each as a distinct slide layout option:
- **1a Full-bleed** (lines 127–142): full-height background image, centered eyebrow/H1/body/CTA, dot pagination.
- **1b Editorial split** (lines 145–158): 2-column grid, copy left / campaign image right (4:5 portrait).
- **1c Type-led triptych** (lines 160–178): dark full-width band, giant serif wordmark, 3 image tiles below, centered CTA.

## Target
`sections/slideshow.liquid` (already implements a `slide` block type with `image_picker`, `inline_richtext` heading/subheading, `url` button link, `color_scheme`, and prev/next + dot pagination — this is a **styling/layout variant**, not new carousel logic).

## What to convert
- Dot pagination (`{{ dot0 }}`/`{{ dot1 }}`/`{{ dot2 }}`, lines 138–140) → Dawn's slideshow already renders pagination dots per block; only restyle.
- Full-bleed layout (1a) maps directly onto Dawn's existing default slide layout — mostly a color/type restyle (`Playfair Display` headline, uppercase eyebrow, pill-shaped CTA).
- Editorial split (1b) and type-led triptych (1c) are **not** in Dawn's current slide layout options — add them as a `slide_layout` select setting on the block schema (near line 389+), reusing the same block fields (image, heading, text, link) rather than adding new block types per layout.
- Triptych's 3 image tiles (lines 168–172) → a small block-level repeater or three optional image settings scoped to the triptych layout only.

## Notes
- Keep the "pick a hero direction" toggle (lines 120–125) as a merchant-facing schema `select` (per-slide `layout` setting), not a runtime UI control — Dawn sections are theme-editor driven, there's no client-side hero switcher.
- Cross-reference `static-template/uploads/index (2).html` line ~582 (`<section class="hero">`) for an alternate, plain-CSS hero treatment if you want a second visual reference beyond the primary prototype.
