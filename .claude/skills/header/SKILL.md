---
name: header
description: Restyle Dawn's header (localization, logo, nav, cart) to match the Lushies static prototype's 3-column sticky header with wordmark logo and pill nav.
---

# Header section

## Source
`static-template/Lushies Store.dc.html` lines 36–64 — sticky header, `grid-template-columns:1fr auto 1fr`:
- Left: currency selector + "Search" (lines 38–41)
- Center: text wordmark "Lushies" + tagline "Colour · Paris" (lines 42–45)
- Right: Account / Wishlist / Bag with cart count bubble (lines 46–52)
- Below: centered horizontal nav list, one item shown with an active underline (lines 55–64)

For the mega menu dropdown itself (lines 66–113), see the **mega-menu** skill instead — keep header layout and mega menu markup as separate concerns like Dawn does (`header.liquid` vs `snippets/header-mega-menu.liquid`).

## Target
`sections/header.liquid` (687 lines, already implements sticky positioning, logo, cart icon bubble, and multiple `menu_type_desktop` layouts including a centered logo variant — extend/restyle, don't rewrite from scratch).

## What to convert
- The 3-column grid layout maps to Dawn's existing `header--middle-left`/centered logo layouts — check `section.settings.logo_position` options already defined in the schema (~line 549+) before adding a new layout option.
- Currency/localization block (lines 38-41) → Dawn's `enable_country_selector`/`snippets/country-localization.liquid`, already wired into `header.liquid`.
- Cart count bubble (line 50) → `snippets/cart-icon-bubble.liquid`, already exists — just restyle colors/sizing.
- Wordmark + tagline (lines 43–44) → Dawn's logo block already supports an image logo; a stacked text wordmark + tagline needs a small schema addition (e.g. a `tagline` text setting) rather than hardcoding "Lushies" / "Colour · Paris".
- Nav list active-item underline (line 58) → drive from `linklist.current` / `link.active` in the existing `link_list` rendering, not a hardcoded index.

## Notes
- Keep all interactive behavior (`onMouseEnter`/`onMouseLeave` mega-menu triggers) delegated to the **mega-menu** skill / Dawn's existing `header-menu` custom element — don't duplicate hover logic in `header.liquid`.
- Follow `liquid-skills:liquid-theme-a11y` for keyboard/focus handling on the account, wishlist, and cart controls.
