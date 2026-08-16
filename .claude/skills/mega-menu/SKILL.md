---
name: mega-menu
description: Convert the Lushies static prototype's 5-column mega menu dropdown (3 link columns + gifting column + campaign image tile) into Dawn's header-mega-menu snippet.
---

# Mega menu

## Source
`static-template/Lushies Store.dc.html` lines 66–113 — dropdown shown on `onMouseEnter`, full-bleed panel below the nav:
- 4 equal columns, each a category tile: gradient image placeholder + heading (`Playfair Display`) + link list (lines 69–105)
- A wider 5th column (`1.4fr`) — a campaign image tile with heading and "Discover" link (lines 106–110)

## Target
`snippets/header-mega-menu.liquid` (already exists and implements the dropdown mechanics, keyboard nav, and `mega_menu` link-list detection — restyle/extend its column layout, don't reimplement hover/focus behavior).

## What to convert
- `onMouseEnter="{{ openMega }}"` / `onMouseLeave="{{ closeMega }}"` → Dawn already opens the mega menu via its `header-menu` custom element and `details`/`summary` or hover CSS in `header-mega-menu.liquid`; do not add JS event handlers, restyle the existing trigger.
- The 4 link columns come from the menu's nested link list items (each top-level "Lips" menu item's child links) — map `sc-for list="{{ ... }}"` loops onto Dawn's existing `{% for child_link in link.links %}` pattern already in the snippet.
- Each column's gradient image placeholder (lines 70, 79, 88, 98) → an optional block-level `image_picker` setting per menu item, following the pattern Dawn already uses for mega menu block images (check the snippet's current block schema before adding a new one).
- The wide campaign tile (lines 106–110) → a dedicated "featured" block/setting on the mega menu (image + heading + link), since Dawn's default mega menu doesn't include a promo tile — this is the one genuinely new piece.

## Notes
- Preserve column count responsiveness — Dawn's mega menu grid already collapses per breakpoint; don't hardcode `repeat(4,minmax(0,1fr)) 1.4fr`.
- Follow `liquid-skills:liquid-theme-a11y` for the dropdown's `aria-expanded`/`aria-haspopup` and focus-trap behavior — the prototype has none of this, Dawn's existing snippet does.
