---
name: interactive-quiz
description: Convert the Lushies prototype's "shade finder" homepage teaser and quiz modal into a new custom Dawn section — this is genuinely new functionality, not a restyle of an existing Dawn section.
---

# Interactive UI (shade finder quiz)

## Source
`static-template/Lushies Store.dc.html`:
- Homepage teaser, lines 249–265: 2-column band, copy + CTA ("Start the shade finder") on the left, 2×2 image grid on the right.
- Collection page teaser, lines 363–371: compact banded CTA variant ("Not sure which shade?").
- Quiz modal, lines 692–717: centered dialog, step label + question heading, a vertical list of answer options (`sc-for list="{{ quizOptions }}"`), and a result state (`quizDone`) showing a matched product image, name, description, and add-to-cart button.

## Target
No existing Dawn section covers this — build **new**:
- `sections/interactive-quiz.liquid` for the homepage/collection teaser bands (schema: heading, body richtext, CTA, 4 image blocks).
- `snippets/quiz-modal.liquid` + a small custom element (e.g. `<quiz-modal>` following Dawn's existing custom-element conventions like `<slideshow-component>`) for the multi-step dialog, opened from the teaser's CTA.
- Quiz question/option data and the matching logic belong in a block-based schema (one block per question, each with option labels) rather than hardcoded JS — the actual shade-matching result (lines 705–714) should resolve to a real `product`/`variant` picked by merchant-configured rules or a simple tag-based lookup, not fabricated copy.

## What to convert
- Step label + heading (lines 698–699) → per-question block settings (`inline_richtext` for the question, a list of option blocks).
- Answer options (line 701–703) → nested option blocks, each storing a `label` and the `tag`/`value` it contributes to the match.
- Result state (lines 705–714) → render a real product card (reuse `snippets/card-product.liquid` per the **product-showcase** skill) instead of the placeholder gradient swatch.
- Modal chrome (backdrop, close button, `lsFade` animation) → follow the same `<dialog>`/focus-trap pattern Dawn uses elsewhere (e.g. cart drawer, search modal) for consistency, per `liquid-skills:liquid-theme-a11y`.

## Notes
- This is the highest-effort skill of the set since there's no existing Dawn section to lean on — scope the first pass to teaser band + modal shell + static question flow, and treat "smart" shade matching as a stretch goal.
