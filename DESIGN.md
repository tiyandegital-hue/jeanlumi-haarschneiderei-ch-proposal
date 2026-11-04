# DESIGN.md — Jeanlumi-Haarschneiderei (Konzept-Entwurf)

## Overview
German-language multipage proposal website for a hair salon in Gwatt (Thun), Switzerland.
Pillar: WEBSITES/CRO. Goal: turn local searchers into callers/bookers via trust + one clear CTA.

## Mood (three words)
Warm · präzise · ruhig

## Signature idea
**"Licht & Linie"** — an editorial Swiss-salon composition: oversized Cormorant Garamond
headlines with masked-line reveals, hairline rules, generous whitespace, one bronze accent.
Each page carries ONE signature moment:
- index: masked-line hero reveal + interactive Termin-Wunsch booking widget (demo-labeled)
- leistungen: editorial numbered accordion ("Das Menü")
- galerie: filterable grid (Schnitt / Farbe / Styling)
- preise: honest "auf Anfrage" price architecture (no invented numbers)
- ueber-uns: monogram portrait placeholder (no fake photo) + values
- kontakt: hours table + address + demo inquiry form with validation

## Colors
| Token | Value | Use |
|---|---|---|
| `--paper` | #FAF7F2 | page background |
| `--surface` | #F3EDE2 | alt sections |
| `--surface-2` | #ECE4D4 | media placeholders |
| `--ink` | #201B16 | text, footer, booking panel |
| `--muted` | #6E6357 | secondary text |
| `--line` | rgba(32,27,22,.14) | hairlines |
| `--accent` | #9C6B2F | CTA + key lines only (<5% of screen) |
| `--accent-deep` | #7A5222 | accent hover / price values |

One-voltage rule: `--accent` does ALL CTA work. No gradients as decoration.

## Typography
- Display: Cormorant Garamond 500/600 (Google Fonts), H1 clamp(2.9rem,7vw,5.6rem),
  tracking −0.03em, line-height 0.98. Serif italic used for emphasis (never bold).
- Body/UI: Jost 400/500/600, 17px desktop / 16px mobile, line-height 1.65.
- Eyebrow labels: 0.72rem, +0.28em tracking, uppercase, accent color.

## Layout
- Wrap: min(1180px, 100% − 40px). Section rhythm 56–112px (clamp).
- Hero: asymmetric split (copy 1.05fr / media .95fr), masked-line H1, meta strip.
- Marquee service strip; 3-col cards → 2-col tablet → 1-col phone.
- Radius: 3px everywhere (quiet, crafted). Shadows rationed (one soft tier on hero frame).

## Components & states
- Sticky blurred header, mobile hamburger (animated, aria-expanded).
- Buttons: solid accent / ghost / light; hover lift ≤1px, active scale .98, focus-visible ring.
- Accordion: single-open, max-height animation, rotating + icon.
- Gallery filter: pill buttons, aria-pressed, instant filtering.
- Forms: labeled fields (never placeholder-only), inline error messages, demo success panel,
  honest "Demo — sendet nichts" note.
- Scroll reveals: IntersectionObserver, translateY(26px)+opacity, 80ms stagger,
  disabled under prefers-reduced-motion (content visible by default).

## Motion
- Hero masked-line rise: 1s cubic-bezier(.16,1,.3,1), 120ms stagger.
- Reveals: .8s var(--ease). Hovers ≤300ms. Marquee 28s linear.
- No WebGL, no scroll-scrubbed copy, no infinite pulsing.

## Do's and Don'ts
- DO: one CTA per section; German copy, warm and direct; real address/hours/phone.
- DON'T: invented prices/reviews/stats; stock people endorsing; purple gradients;
  emoji icons; centered-everything.

## Known Gaps (honesty section)
- No real salon photos — Unsplash placeholders, clearly labeled; owner must supply real photos.
- No real prices — "auf Anfrage" architecture; owner fills in final prices.
- No online booking backend — demo forms only; real booking via phone/email.
- Reviews block omitted (no verified public reviews found) — better absent than fake.
- German copy written by the agency; owner should proofread for local tone (Berndeutsch vs. Hochdeutsch).
