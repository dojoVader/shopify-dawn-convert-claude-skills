---
name: html-to-liquid
description: Convert the static template from the folder `static-template` into a new Dawn theme, using Liquid and the Dawn section/snippet architecture. This is a high-level skill that encompasses multiple smaller skills (mega menu, interactive quiz, product showcase, etc.) and is not a restyle of an existing Dawn section. Ensure to start with the layout (theme.liquid) to give a consistent look and feel across the theme, then convert each static component into its own section or snippet, following Dawn's conventions for schema, blocks, and custom elements.
---

# HTML to Liquid Conversion

## Source
The source is the static HTML template located in the `static-template` folder. This template contains various components such as the header, footer, mega menu, interactive quiz, and product showcase that need to be converted into a Dawn theme structure.

## Liquid Template Structure

This is the full set of theme files a conversion pass may touch, grouped by role. Section-level work (the actual static-HTML-to-markup conversion) is delegated to the per-component skills in `.claude/skills/` (`header`, `mega-menu`, `slideshow`, `collection-grid`, `collection-cards`, `product-showcase`, `video-showcase`, `filtering`, `interactive-quiz`, `social-gallery`, `footer`, `announcement-bar`) — this skill is the orchestrator that wires their output into the layout/template/config layers below.

### Layout (`/layout`)
- `theme.liquid` — the single shell every template renders inside (`<head>`, global CSS/JS includes, `{{ content_for_header }}`, `{{ content_for_layout }}`). Convert the prototype's shared chrome here first: fonts (`Playfair Display` / `Jost`), the `#FFF7FA` background and `#6E3048` ink color as theme color-scheme defaults, and global resets from `static-template/Lushies Store.dc.html` lines 14–25.
- `password.liquid` — separate shell for password-protected stores; only needs the logo/wordmark treatment, not full nav.

### Core page templates (`/templates`)
JSON templates that pick which sections render, in order, for each page type — this is where the per-page section list is assembled once the individual sections exist:
- `index.json` — homepage: order the sections built by **slideshow**, **collection-grid**, **product-showcase**, **video-showcase**, **interactive-quiz**, **social-gallery** to match lines 118–280 top-to-bottom.
- `product.json` — PDP (not covered by a dedicated skill yet; source is lines 375–546 if needed later).
- `collection.json` — uses **collection-cards** (banner) + **filtering** + **product-showcase** (grid).
- `list-collections.json` — collection index; can reuse **collection-grid**'s card treatment.
- `cart.json`, `search.json`, `page.json`, `blog.json`, `article.json`, `404.json` — no corresponding prototype screens; leave on Dawn defaults unless asked.
- `gift_card.liquid` — Liquid (not JSON) by Shopify convention; leave on Dawn default.

### Customer account templates
Not present in this Dawn version — classic `templates/customers/*.json` (account, login, register, addresses, order, activate_account, reset_password) were removed; Shopify now handles these via the separate Customer Account UI extensions surface, outside the theme. Skip this category unless the project explicitly adds classic account templates back.

### Core section templates (`/sections`)
The structural `main-*` sections each page template renders into, plus the global `header.liquid`/`footer.liquid` handled by the **header** and **footer** skills:
- `main-product.liquid`, `main-collection-banner.liquid`, `main-collection-product-grid.liquid`, `main-cart-items.liquid`, `main-cart-footer.liquid`, `main-search.liquid`, `main-page.liquid`, `main-blog.liquid`, `main-article.liquid`, `main-404.liquid`, `main-list-collections.liquid`, `main-password-header.liquid`, `main-password-footer.liquid`.
- These are Dawn's existing, working implementations — only restyle to match the prototype's design tokens; don't restructure unless a skill above calls for it (e.g. **filtering** touches `main-collection-product-grid.liquid`'s facet integration).

### Configuration (`/config`)
- `settings_schema.json` — add any new global theme settings introduced by the skills above (e.g. a Lushies color palette preset, typography picks) as new settings groups, not one-off hardcoded values in individual sections.
- `settings_data.json` — the merchant's current values for those settings; update defaults here to ship the Lushies look out of the box.

### Localization (`/locales`)
- `en.default.json` — add translation keys for any new user-facing strings introduced during conversion (e.g. "Filter & sort", "Shade finder", quiz copy) instead of hardcoding English text in `.liquid` files.
- `en.default.schema.json` (not in the user's original list, but the companion file for schema `label`/`info` translation keys) — update alongside it whenever a new setting is added to a section schema.

