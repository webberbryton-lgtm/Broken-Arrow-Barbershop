# Broken Arrow Design System

Broken Arrow is a modern American heritage grooming brand built around expert barbering: haircuts that work for the person in the chair, transformative cuts, hair replacement, barber education, content and, later, men's grooming products. It should feel masculine without being aggressive, premium without being luxury, and classic without looking old.

**Brands / surfaces**
- **Broken Arrow Barbershop** — the physical shop at 375 E 800 S, Suite 12, Orem, UT 84097, and its website (orembarbershop.com, built on Shopify; booking via Square). The primary expression of the brand today. Three barbers: Bryton (owner, licensed barber instructor, all hair-system work), Connor, Elise.
- **Broken Arrow Grooming** — the future product arm (natural, small-batch men's grooming, sold through the same Shopify store). No products decided yet, so no product-specific rules.

The rule: Broken Arrow is a barbershop first. Outdoors gives character, hair replacement is the specialty, content shows the work, products give room to grow. Everything must work equally on a jar lid, a T-shirt, a YouTube thumbnail, a shop sign and a national ecommerce site.

## Sources

Everything here was built from files the user uploaded (the reader may not have access; paths kept for reference):
- `uploads/broken-arrow-design-system/` — an existing Broken Arrow brand book + mini design system: `README.md` (brand book), `website.md` (site spec, copy, prices, booking links, bios, application form), `tokens.json`, `components/bundle.js|bundle.css|index.d.ts` (Button, SectionHeader, ServiceList, TextField, Checkbox), `fonts/*.woff2`, `assets/Logos/*`, `assets/Photo References/*`. **This is the ground truth.** Values in `tokens/` are copied verbatim.
- `uploads/IMG_8330.JPG` — the shop interior (same as `assets/photos/shop-interior.jpg`).
- `uploads/Screenshot 2026-09-25 … 5.53.41 / 5.53.59` — an earlier website draft. Useful for layout (numbered labels, stacked headline, ruled service columns on a black band) but its copy ("Signature haircut", "done with intention", sentence-case service names) predates and **violates** the current voice rules. Don't copy that copy.
- `uploads/Screenshot … 5.55.22 PM.png` — outdoor film still (mood only).
- `uploads/IMG_1812/1813` (City Barbers Instagram) and `IMG_1823/1824` (Bradley Mountain Instagram) — photography mood references from other brands. Never publish.
- `uploads/ChatGPT Image …png`, `Untitled Project.*` — BA monogram artwork (already vectorised in `assets/logos/`).
- `uploads/Untitled document 2.pdf` — a booth rental agreement (internal legal doc; not a design surface, not used).

## Index

- `styles.css` — entry point; `@import`s only.
- `tokens/` — `fonts.css` (@font-face), `colors.css` (Off-white default + `[data-theme="dark"]` Black), `typography.css`, `spacing.css` (space, radius, border, layout, motion), `components.css` (the `ba-` component classes).
- `fonts/` — Inter Tight 700/800, Inter 400/500/600, EB Garamond 400/500, Courier Prime 400/700 (woff2, supplied).
- `assets/logos/` — Barbershop + Grooming lockups and BA monogram in black / off-white / green SVG, plus `ba-mark.png`.
- `assets/photos/shop-interior.jpg` — our shop (ours to use). `assets/photos/reference/` — other brands' photos, direction only.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `components/` — React primitives (see below).
- `ui_kits/website/` — click-through recreation of the Broken Arrow Barbershop website.
- `SKILL.md` — Agent Skill wrapper.

## Components

Exactly the inventory the source defines:
- **Button** (`components/actions/`) — primary / secondary / text; `tone="dark"` on bands; `loading`; `href`.
- **SectionHeader** (`components/layout/`) — "02 / SERVICES" over a display title, optional action.
- **ServiceList** (`components/content/`) — ruled, numbered service columns with price and Book now.
- **TextField** (`components/forms/`) — labelled input/textarea with hint and error.
- **Checkbox** (`components/forms/`) — checkbox or radio row.

Styling lives in `tokens/components.css` as `ba-*` classes (ported from the source `bundle.css`), so it ships with `styles.css`. The source's "Cover" preview was a card, not a component, and was not rebuilt. Intentional additions: none.

## UI kits

- `ui_kits/website/index.html` — Home (hero, how it works, services, the team, visit/hours, booking band), barber pages (Bryton / Connor / Elise), Hair replacement (steps, prices, $8-a-day block, FAQ), Free haircut application (validation, loading, confirmation). Photos of barbers and cuts are grey placeholders — none were supplied.

---

## CONTENT FUNDAMENTALS

**Voice:** clear, direct, knowledgeable, human — a good barber talking to a client, not an agency. *If a barber wouldn't naturally say it to someone in the chair, rewrite it.*

- **Person:** "we" is the shop, "you" is the client. Barbers go by first name. Bios are third person ("Connor is a Utah County local…").
- **Casing:** ALL CAPS for anything that isn't a paragraph — headlines, labels, nav, buttons, service names, place lines. Reading text is sentence case. Brand names in running text are title case ("Broken Arrow Barbershop"); never "BA" in words.
- **Headlines:** short, plain statements or questions. "NOT SURE WHAT YOU WANT?", "THE WORK", "BOOK A HAIRCUT", "ABOUT $8 A DAY."
- **Labels number the page:** "01 / HOW IT WORKS", "02 / SERVICES". Place line: "OREM, UTAH · BY APPOINTMENT".
- **CTAs:** the main one is always **BOOK NOW**. Others say exactly what happens: "View services", "Call the shop", "Get directions", "Apply", "Book with Connor", "Book a free consultation".
- **Service names:** plain and descriptive — Haircut, Haircut + Beard, Extended Service Haircut. Never "The Signature".
- **Explain jargon** the first time ("taper", "fade", "hair system").
- **Personality:** occasional dry lines only. Benchmark: "WALK-INS: BY APPOINTMENT OR LUCK." and "Skip the morning Starbucks. Keep the hair."
- **Never:** exclamation marks, emoji, superlatives, corporate words (solutions, experience, offerings), luxury words (elevated, curated, bespoke), motivational lines, forced masculinity ("gentlemen"), outdoor metaphors ("rugged"), AI-isms ("crafted with intention", "more than just a haircut").
- **Hair replacement:** calm, private, matter-of-fact. "Losing your hair doesn't mean you have to shave it." Never fear or insecurity; captions state facts ("Full hair system, color-matched and cut in.").
- **Awards:** quietly, as a label line, once per page max: "DAILY HERALD READERS' CHOICE · BEST BARBERSHOP IN UTAH VALLEY · 2023, 2024, 2026".
- **Errors:** say how to fix it. "Add your city so we know you can get to the shop in Orem."

## VISUAL FOUNDATIONS

- **Colour:** black, grey, off-white; the shop's wall green (`--green #445546`) is the only accent, used for one moment per view (primary-button hover, link underline, active nav, selected). `--alert` only for errors, always with words. Colour otherwise comes from photography (wall green, cognac chairs, wood, skin, steel). Two themes: Off-white (default) and Black (`data-theme="dark"`).
- **Type:** Inter Tight ExtraBold for display, ALL CAPS, tight tracking (−0.045em hero, −0.04em section), stacked in a narrow column like signage. Inter for labels (600, 13px, 0.18em) and reading text (17/28, 20/34 lead). Prices tabular. EB Garamond is logo lettering only. Courier Prime is supplied but has no documented use — treat as reserve (spec tables, stamps) until the brand says otherwise.
- **Layout:** 12-column grid in a 1280px container, 64px side margins (16px phone), 96px between sections (48px phone). Signature section: label in the left third, stacked display title + body-lg in the right two-thirds. Text measure 680px.
- **Backgrounds:** flat `canvas` off-white pages alternating with full-bleed black `band`s (hero, the work, booking, footer) and occasional `canvas-sunk` strips. No gradients as decoration, no textures, no patterns, no illustrations. The only gradient allowed is a photo protection gradient into `band` under hero text.
- **Imagery:** cinematic, documentary; warm natural light, deep shadow, visible grain, slightly desaturated, greens and cognac kept true (never teal-and-orange). Black-and-white fine for details. Full-bleed or square in the grid, never rounded. Captions below in body-sm muted.
- **Borders & separation:** rules, not boxes or shadows. 1px `line` hairlines between rows, 1px `line-strong` column rules, 2px `ink` section-top rules. Cards = `canvas-raised` + 1px `line` outline, square, no shadow.
- **Shadows:** none. The only box-shadow is the focus ring construction on inputs.
- **Corners:** `radius-0` everywhere; `radius-sm` 2px for inputs; `radius-md` 4px for menus/popovers. Nothing pill-shaped. The radio dot is the only circle.
- **Hover:** primary button → green fill; secondary → ink fill; text links and field borders → green or ink. No opacity fades, no lifts.
- **Press:** hover colour plus a 1px translateY press-down on buttons.
- **Focus:** 2px solid `--focus` outline, 2px offset (on-band on black bands). Never removed.
- **Disabled:** `canvas-sunk` fill + `ink-muted` text. Use rarely.
- **Motion:** 150ms ease on colour only; nothing moves the layout; no entrance animations, no bounces. Everything off under `prefers-reduced-motion`.
- **Transparency & blur:** not used, except `on-band` text at 78% opacity for labels on bands and the hero photo dimmed under a protection gradient.
- **Fixed elements:** a simple sticky header (lockup, label-style nav, BOOK NOW) on canvas with a hairline bottom rule.
- **Tap targets:** at least 44px; buttons 56px tall.
- **Avoid:** barber poles, mustaches, scissors/razor icons, fake vintage badges, Western type, axes, whiskey-and-cigars black-and-gold, red-white-and-blue, streetwear, stock photography, franchise looks, the red/white/blue award badges.

## ICONOGRAPHY

There is **no icon set**, by design. Prefer words and numbers ("01 /", "Open / Close", "Book now") over icons. No icon font, no sprite, no PNG icons in the sources; no emoji; no unicode glyphs as icons (the middle dot `·` and slash `/` are typographic separators, not icons). The checkbox tick and loading spinner are CSS-drawn.

If an interface genuinely needs one (menu, close, map pin), use a thin-line, square-cornered set in `ink` at 20–24px, functional only. Suggested CDN substitute: **Lucide** (1.5px stroke, `stroke-linecap="square"`) — *a substitution, not a brand asset.* The UI kit uses none.

**Logos** (`assets/logos/`): the Barbershop lockup is primary (header, footer, sign, booking page); the BA monogram alone for small/repeated uses (avatar, favicon, lids, hats, stamps). Black on off-white, off-white on bands/green/photos, green only for merch and packaging. Monogram ≥24px tall, lockup ≥160px wide. Never in a badge, circle or crest; never stretched, outlined, rotated or re-typed.
