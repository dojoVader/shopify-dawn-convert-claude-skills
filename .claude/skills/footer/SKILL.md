---
name: footer
description: Convert the Lushies prototype's footer (subscription form + 3-column footer menu) into Dawn's footer section.
---

# Footer (subscription form + footer menu)

## Source
`static-template/Lushies Store.dc.html` lines 547–586 — 4-column grid:
- Col 1: wordmark, blurb, email signup input + submit button (lines 552–556), and a plain-text social links row (line 557–559).
- Cols 2–4: three link-list groups — "Shop", "Client care", "House" (lines 561–578).
- Bottom bar: copyright + policy links row (lines 580–585).

## Target
`sections/footer.liquid` (already exists, 545 lines, with `link_list` blocks, a `brand_information` block, and image blocks — this covers the footer menu columns; restyle, don't rebuild the layout).

The subscription form specifically maps to `sections/email-signup-banner.liquid` or Dawn's built-in newsletter block — check whether `footer.liquid` already embeds a newsletter block before adding a new one.

## What to convert
- Wordmark + blurb (lines 551–552) → the section's existing `brand_information` block.
- Email input + subscribe button (lines 554–556) → Dawn's existing newsletter form partial (handles the real `/contact#newsletter` form action and honeypot/validation) — do not hand-roll a new `<form>`, the prototype's `onClick="{{ subscribe }}"` has no real submit logic to port.
- Social row (line 557–559) → `snippets/social-icons.liquid` (already used elsewhere, e.g. announcement bar) instead of plain text labels.
- Three link columns (lines 561–578) → three `link_list` blocks, already supported; just set the menu handles and restyle column headings.
- Bottom bar copyright + policy links (lines 580–585) → Dawn's footer already renders `shop.name`/copyright and policy links (`shop.policies`) automatically; don't hardcode "© 2026 Lushies".

## Notes
- Reuse `snippets/social-icons.liquid` and the newsletter partial rather than duplicating markup already covered by the **announcement-bar** skill's social icon usage.
