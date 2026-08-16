---
name: product-showcase
description: Convert the Lushies prototype's "best sellers" featured product grid and collection page product grid into Dawn's featured-collection section and card-product snippet.
---

# Product showcase

## Source
`static-template/Lushies Store.dc.html`:
- Homepage "Best sellers" grid, lines 204–238: 4-column grid, each card = image with badge + hover "Quick add" button, name/price row, description, star rating, shade-swatch row.
- Collection page product grid, lines 325–355: same card anatomy plus a low-stock pulsing badge (lines 332–334) and per-swatch click-to-pick (line 348) and a "Load more" progress bar (lines 357–361).

## Target
- `sections/featured-collection.liquid` for the homepage grid (already supports a `collection` setting, product count, and columns — restyle only).
- `snippets/card-product.liquid` for the card itself (already exists — this is the single source of truth for both the homepage and collection grid; extend it once).
- `sections/main-collection-product-grid.liquid` + pagination markup (`snippets/pagination.liquid`) for the "Load more"/progress bar on the collection page.

## What to convert
- Badge (`p.badge`, line 217/330) → `card-product.liquid` already supports sale/sold-out badges; only add a generic "custom badge text" block setting if Lushies needs arbitrary labels beyond sale/sold-out.
- Low-stock pulsing badge (lines 332–334) → new: Dawn doesn't ship a low-stock indicator by default. Add it as an optional card setting driven by `product.selected_or_first_available_variant.inventory_quantity` with a threshold setting, plus the `lsPulse` keyframe as a real CSS animation (not inline `style`).
- Quick add button (line 219/335) → Dawn already has a quick-add pattern (`snippets/product-card-gallery.liquid` / quick-add modal); reuse it rather than writing new add-to-cart JS.
- Shade swatches (lines 230–233, 346–350) → map onto product variant options with a `color`/swatch config, following Dawn's existing swatch config support (`settings_data.json` swatch presets) if enabled, not custom `{{ s.dot }}` styles.
- Star rating (`p.stars`, line 227) → Dawn's product review integration point (metafield-driven), not literal star characters.
- "Load more" + progress bar (lines 357–361) → `snippets/pagination.liquid` already exists; if a load-more (vs. numbered) pagination style is wanted, extend it rather than hand-rolling a progress bar.

## Notes
- Keep `card-product.liquid` the single card implementation shared across this skill and **collection-grid**/**collection-cards** — don't fork per-section product card markup.
