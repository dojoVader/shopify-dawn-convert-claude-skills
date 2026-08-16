---
name: filtering
description: Convert the Lushies prototype's collection filter bar and slide-out filter/sort drawer into Dawn's facets snippets.
---

# Filtering

## Source
`static-template/Lushies Store.dc.html`:
- Sticky filter bar on the collection page, lines 303–323: "Filter & sort" trigger button + active filter pill chips + result count + sort label.
- Filter drawer, lines 629–690: slide-in panel from the right (`lsSlideIn` animation) with a "Sort by" option list, collapsible facet groups (color swatches, checkboxes, counts), a price range slider, and sticky Clear/Show-N footer buttons.

## Target
- `snippets/facets.liquid` (already exists — Dawn's full filter/sort implementation, drawer and horizontal-bar layouts included) and `snippets/price-facet.liquid` (already implements a price range slider — do not rebuild the slider from scratch).

## What to convert
- This is almost entirely a **restyle** of existing, working code: Dawn's `facets.liquid` already renders collapsible facet groups from `collection.filters`, checkbox/swatch inputs with result counts, a sort-by dropdown, and drawer vs. bar display modes.
- Active filter pill chips (line 314–316, `{{ f.label }}` buttons) → Dawn's facets snippet already tracks and renders active filter tags; restyle the pill shape/spacing only.
- Collapsible facet groups with `+`/`−` sign toggle (lines 649–667) → map onto the snippet's existing `<details>`/summary disclosure pattern; keep native `<details>` for accessibility rather than reimplementing open/close state.
- Color swatch facet items (`i.hex`/`i.dot`, lines 657–659) → Dawn's facets snippet already special-cases color-type filters as swatches when `filter.type == "list" and filter.presentation == "swatch"`.
- Price range track (lines 669–681) → `snippets/price-facet.liquid` already implements this exact two-handle slider; restyle handle/track colors only.
- Sticky footer (Clear / "Show {{ resultCount }}") (lines 684–687) → facets.liquid already has clear-all and apply/result-count affordances for the drawer variant.

## Notes
- Don't duplicate filter state logic in new JS — Dawn's filtering is powered by `?filter.*` URL params and progressive enhancement via `component-facets.js`; the prototype's `onClick` handlers have no client-side equivalent to port.
- Follow `liquid-skills:liquid-theme-a11y` for the drawer's focus trap and `Escape`-to-close behavior, and `liquid-skills:liquid-theme-standards` for swapping inline styles to real CSS.
