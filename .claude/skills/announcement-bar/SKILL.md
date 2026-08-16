---
name: announcement-bar
description: Restyle Dawn's announcement bar to match the Lushies static prototype's rotating top announcement strip (prev/next arrows, centered uppercase message).
---

# Announcement bar

## Source
`static-template/Lushies Store.dc.html` lines 30–34 — a 38px maroon strip with prev/next chevrons and a centered `{{ announce }}` message.

## Target
`sections/announcement-bar.liquid` (already exists and is fully functional — do not rebuild the carousel logic).

## What's already there
Dawn's `announcement-bar.liquid` already renders a `<slideshow-component>` with prev/next slider buttons when a section has more than one `announcement` block (see lines ~53+ of the file), backed by `component-slideshow.css` / `component-slider.css`. The rotation, ARIA roles, and block-based text/link settings are already implemented — this is a **restyle**, not a rebuild.

## What to convert
- Bar height (38px), background `#6E3048`, text color `#FFF7FA`, `font-size:11.5px`, `letter-spacing:.16em`, `text-transform:uppercase`, `font-weight:300` → map onto the section's `color_scheme` setting and `utility-bar`/`announcement-bar` CSS classes (in `assets/component-slideshow.css` / theme CSS custom properties), not inline styles.
- Chevron glyphs (`&#8249;` / `&#8250;`) → Dawn already uses `icon-caret.svg` / slider button markup; only restyle (opacity, size), don't replace the icon system.
- Each `{{ announce }}` message becomes one `announcement` block's `text` setting (merchant-editable), not hardcoded copy.

## Notes
- Preserve Dawn's accessible slider button markup (`aria-label`, `role="region"`) — the prototype's raw `onClick` handlers have no equivalent, they're already replaced by real anchor/button semantics in Dawn.
- Follow `liquid-skills:liquid-theme-standards` for how to add scoped CSS instead of inline `style=""`.
