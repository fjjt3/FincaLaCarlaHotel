---
name: Finca La Carla
description: A guest-facing Andalusian boutique-hotel booking experience — warm, calm, understated.
colors:
  sun: "#E8B84B"
  sun-dark: "#D4A030"
  terracotta: "#C4956A"
  terracotta-dark: "#A67B52"
  mediterranean: "#1B3A5C"
  mediterranean-light: "#2C5380"
  olive: "#7A8B5B"
  olive-light: "#9AAB7B"
  dark-oak: "#2C1810"
  whitewash: "#FAF6F1"
  stone: "#E8E0D8"
  warm-gray: "#8B7E74"
  cream: "#F0EAE2"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.5rem, 8vw, 5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.02em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.15em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
  pill: "100px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
  3xl: "4rem"
  4xl: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.dark-oak}"
    rounded: "{rounded.sm}"
    padding: "1rem 3rem"
  button-primary-hover:
    backgroundColor: "{colors.sun-dark}"
    textColor: "{colors.dark-oak}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.terracotta-dark}"
    rounded: "{rounded.sm}"
    padding: "0.5rem 1rem"
  button-outline-hover:
    backgroundColor: "{colors.terracotta}"
    textColor: "{colors.white}"
  input-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.dark-oak}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
  card-surface:
    backgroundColor: "{colors.white}"
    textColor: "{colors.dark-oak}"
    rounded: "{rounded.lg}"
    padding: "2rem"
  chip-amenity:
    backgroundColor: "rgba(122, 139, 91, 0.1)"
    textColor: "{colors.olive}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.75rem"
---

# Design System: Finca La Carla

## Overview

**Creative North Star: "The Shaded Patio"**

An Andalusian house keeps a shaded patio at its heart: whitewashed walls that hold the midday heat at bay, cool stone underfoot, olive and clay just beyond the arcade, and a single shaft of light crossing the tiles as the day turns. Finca La Carla's visual system is that patio — a warm neutral field, a small earth-and-sea palette, and one bright shaft of sunlight saved for the moment a guest commits.

The mood is **warm, calm, and understated**. This is a small rural hotel, not a transaction engine, so the interface stays quiet: generous whitespace, gentle depth, no spectacle. Color, shadow, and motion are restrained; the craft shows in proportion and detail rather than loudness. Type does the emotional work — a high-contrast serif for display against a clean grotesque for reading.

Depth stays soft, like shade rather than structure: surfaces sit near-flat at rest and lift only slightly on hover, and every shadow is tinted with the dark oak brown instead of neutral black, so nothing ever reads as cold glass.

**Key Characteristics:**
- Warm off-white canvas (Warm Whitewash) with cream-plaster bands for rhythm, never grey.
- Earth-and-sea palette — Clay Terracotta, Olive Grove, Deep Mediterranean — with Sunlit Gold as the single bright action voice.
- Serif display (Playfair Display) over grotesque body (Inter); uppercase tracked labels and bilingual eyebrows.
- Restrained geometry: 4px on small controls, 8px on panels, 16px on cards, pill chips.
- Gentle, warm-tinted shadows; flat at rest, a small lift on hover.
- A recurring rotated diamond motif (the "andalusian divider") as the one ornament.

## Colors

A place-based palette of whitewashed neutrals, clay and olive earth, deep Mediterranean sea-blue, and one gold that carries every action.

### Primary
- **Sunlit Gold** (#E8B84B): the bright action voice. Fills the primary CTA (hero "Book Your Stay", form submit, nav CTA), focus rings, text selection, and the "Most popular" badge. Use sparingly — it earns attention because it is the only saturated hue.
- **Deeper Gold** (#D4A030): the hover fill for every gold control (`--color-sun-dark`); the darker shade Sunlit Gold deepens to on interaction.
- **Clay Terracotta** (#C4956A): the brand accent. The andalusian divider rules and diamond ornament, the outlined secondary CTA border, and the gradient fills behind room imagery.
- **Baked Clay** (#A67B52): the darker terracotta for text and outlines where contrast matters (contact links, secondary CTA labels).

### Secondary
- **Deep Mediterranean** (#1B3A5C): the structural color. Navbar, footer, reservation card header, and the room-card price amount — the cool "interior" to the patio's warm walls.
- **Mediterranean Blue** (#2C5380): gradient partner to Deep Mediterranean and the tint behind the active room-option ring.

### Tertiary
- **Olive Grove** (#7A8B5B): amenity chips and the attribute text that marks the natural surroundings.
- **Pale Olive** (#9AAB7B): gradient partner to Olive Grove in room-imagery fallbacks.

### Neutral
- **Warm Whitewash** (#FAF6F1): the page canvas — warm, never pure white.
- **Cream Plaster** (#F0EAE2): alternating section bands (`--color-cream`) and the price-summary panel.
- **Pure White** (#FFFFFF): card and input surfaces (`--color-white`) that sit above the warm canvas.
- **Warm Stone** (#E8E0D8): hairline borders and dividers (card footers, the price-summary rule, the inactive room-option border).
- **Warm Taupe** (#8B7E74): secondary text, eyebrows, descriptions, muted labels.
- **Dark Oak** (#2C1810): primary text, headings, and the tint behind every shadow.

### Named Rules
**The One Bright Voice Rule.** Sunlit Gold is the only saturated color and covers no more than ~10% of any screen. Its scarcity is what makes the booking action read instantly.

**The Warm-Neutral Rule.** There is no neutral grey in the palette. Whites lean warm (whitewash, cream plaster), darks lean oak brown, and even inactive borders use warm stone. A cold `#888` is always the wrong answer.

## Typography

**Display Font:** Playfair Display (with Georgia, serif)
**Body Font:** Inter (with -apple-system, BlinkMacSystemFont, sans-serif fallbacks)

**Character:** A warm editorial pairing — high-contrast Playfair Display carries the sense of place and hospitality, while Inter keeps forms, labels, and prices precise and legible. Serif is for voice; grotesque is for information.

### Hierarchy
- **Display** (700, clamp(2.5rem → 5rem), 1.1, letter-spacing 0.02em): the hero title only ("Finca La Carla"), set in white over the hero image.
- **Headline** (600, clamp(1.75rem → 2.5rem), 1.2): section titles ("Our Rooms", "Find Us").
- **Title** (600, 1.25rem, 1.2): room-card names.
- **Body** (400, 1rem, 1.6): descriptions and form-label neighborhoods; section copy steps up to 1.125rem at 1.7 and caps near 680px (~65ch) for readability.
- **Label** (600, 0.75rem, letter-spacing 0.15em, uppercase): eyebrows ("Bienvenidos", "Estancias", "Dónde estamos") and amenity chips.

Playfair also sets the two brand wordmarks — navbar (1.4rem) and footer (1.125rem) — and every monetary amount. Two hero voices sit outside the scale: the subtitle (Inter, clamp(1rem → 1.375rem), weight 300) and the tracked uppercase location line (Inter, 0.875rem).

### Named Rules
**The Bilingual Eyebrow Rule.** Section eyebrows are uppercase, tracked, and Spanish against English body copy — a small, consistent signature of place. Keep them warm taupe, never gold.

**The Serif-Voice Rule.** Playfair is reserved for titles, brand wordmarks, and monetary amounts. Never set body copy, labels, or form text in the display serif.

## Layout

A single centered column inside a 1200px max-width container, with full-width banded sections stacked vertically. Sections breathe at 6rem vertical padding (`--space-4xl`), and each intro block is centered with a max ~680px measure.

Room cards use an intrinsic responsive grid — `repeat(auto-fit, minmax(300px, 1fr))` with a 2rem gap — so the column count follows the viewport without explicit breakpoints. The reservation page narrows to a centered 7/12 column (`col-lg-7`) holding one card; forms collapse to a single column on small screens.

Breakpoints follow Bootstrap's defaults (sm 576, md 768, lg 992, xl 1200). The navbar collapses to a toggler below `lg`.

## Elevation & Depth

A gentle, warm-shadowed system. Surfaces are essentially flat at rest and gain a small amount of depth on interaction; the intent is softness, not loft. Every shadow is tinted with Dark Oak (`rgba(44, 24, 16, …)`) so depth reads as warm shade, never cold grey glass. The reservation card takes a Bootstrap `shadow` utility for a slightly stronger resting elevation because it is the page's single focal element.

### Shadow Vocabulary
- **Resting hairline** (`box-shadow: 0 1px 3px rgba(44, 24, 16, 0.08)`): default card elevation at rest.
- **Raised** (`box-shadow: 0 4px 12px rgba(44, 24, 16, 0.1)`): the emphasized "popular" room card.
- **Hover lift** (`box-shadow: 0 8px 30px rgba(44, 24, 16, 0.12)`): room-card hover, paired with `translateY(-4px)`.
- **Focus glow** (`box-shadow: 0 0 0 0.2rem rgba(232, 184, 75, 0.25)`): the gold-tinted ring on focused form controls; the active room-option uses the parallel Mediterranean Blue tint (`rgba(44, 83, 128, 0.2)`).

### Named Rules
**The Warm Shadow Rule.** All shadows are tinted with Dark Oak; a neutral-black shadow is never used.

**The Small-Lift Rule.** Hover elevation is capped at a 4px translate (2px on buttons). Big jumps and dramatic rises break the calm.

## Shapes

Restrained, slightly soft geometry. Small controls — buttons, with chips as the pill exception — take a 4px radius; inputs, panels, and the room-option picker take 8px; room cards and the reservation card take 16px. Amenity chips are fully rounded (100px). Borders are hairlines in Warm Stone (1px) or a 1px Clay Terracotta accent on the outline CTA; room options carry a 2px Warm Stone edge that turns Deep Mediterranean when active.

The one recurring ornament is the **diamond**: a 12px square rotated 45°, Clay Terracotta at 60% opacity, centered between two 30%-opacity terracotta rules the full width of their container (the "andalusian divider"). Room-card imagery carries a large faint diamond glyph as a fallback watermark. No other decorative geometry is introduced.

## Components

### Buttons
- **Shape:** small radius (4px); uppercase, tracked labels.
- **Primary (gold fill):** `Sunlit Gold` background, `Dark Oak` text, weight 600, uppercase, letter-spacing 0.06–0.08em; hero CTA pads `1rem 3rem`, nav CTA `0.5rem 1.5rem`, form submit full-width and three rows tall. Never a border.
- **Hover / Focus:** background deepens to Deeper Gold (`#D4A030`) with a 1–2px upward translate over 0.2s; a disabled form submit drops to 0.6 opacity with a not-allowed cursor.
- **Outline (secondary):** transparent fill, 1px Clay Terracotta border, `Baked Clay` text; on hover it fills Clay Terracotta with white text ("Book →" on room cards).

### Cards / Containers
- **Corner Style:** 16px (`--radius-lg`).
- **Background:** Pure White (#FFFFFF) on the Warm Whitewash canvas; the reservation card header is `Deep Mediterranean` with white text.
- **Shadow Strategy:** see Elevation — resting hairline, hover lift.
- **Border:** none; separation comes from the shadow and a Warm Stone hairline above card footers.
- **Internal Padding:** 2rem (`--space-xl`) card body.

### Inputs / Fields
- **Style:** Pure White fill, Warm Stone hairline border, 8px radius, large control height (`form-control-lg`, 1.25rem text, 0.5rem 1rem padding); bold Inter labels above.
- **Focus:** the border shifts to `Sunlit Gold` with the gold focus glow; the browser default outline is suppressed in favor of this.
- **Disabled / Invalid:** rely on Bootstrap's disabled and `:invalid` states; keep the gold focus treatment unchanged.

### Room Option (signature picker)
A row of selectable room tiles used in the reservation form: an image strip on top, name and nightly price below, a 2px Warm Stone border that turns `Deep Mediterranean` with a Mediterranean Blue ring when active, and warms to Warm Taupe on hover. `aria-pressed` carries selection.

### Price Summary (signature)
A Cream Plaster panel (#F0EAE2, 8px radius) shown once dates resolve: a muted per-night row separated by a Warm Stone hairline from a bold "Total" row, with the amount set in Playfair and colored `Deep Mediterranean` — the same monetary treatment as the room-card price.

### Navigation
A fixed, translucent `Deep Mediterranean` bar (`rgba(27, 58, 92, 0.95)`) with a 12px backdrop blur and a faint white bottom hairline. The brand is Playfair in Warm Whitewash; links are Inter, uppercase, tracked 0.08em, white at 80% opacity, turning Sunlit Gold on hover/active. "Book Your Stay" is a gold-filled primary button. Collapses to a toggler below `lg`.

## Do's and Don'ts

### Do:
- **Do** keep the canvas warm (Warm Whitewash / Cream Plaster) and darks oak-tinted; every neutral should carry a little heat.
- **Do** reserve `Sunlit Gold` for actions and focus — one bright voice per view (The One Bright Voice Rule).
- **Do** tint all shadows with `rgba(44, 24, 16, …)` and keep hover lifts to ≤4px.
- **Do** pair a Spanish uppercase eyebrow with English body copy on every section (The Bilingual Eyebrow Rule).
- **Do** set titles, wordmarks, and monetary amounts in Playfair Display, and everything else in Inter.
- **Do** keep small controls at 4px, panels at 8px, cards at 16px, and chips as full pills.

### Don't:
- **Don't** introduce cold greys, pure `#000`/`#888`, or neutral-black shadows.
- **Don't** flood a screen with terracotta, olive, or gold; they are accents over a neutral base.
- **Don't** set body copy, labels, or form fields in the display serif.
- **Don't** add decorative geometry beyond the diamond divider motif.
- **Don't** chase a generic OTA/booking-widget or stock-Bootstrap look; craft stays boutique and calm.
