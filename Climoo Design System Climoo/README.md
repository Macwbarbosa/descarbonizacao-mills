# Climoo — Design System

This design system encodes the look, feel and content voice of **Climoo**, a
Brazilian climate-tech company that builds an integrated platform for corporate
decarbonization. Use it to produce on-brand mocks, slides, marketing pages,
prototypes and other artifacts that look and read like real Climoo work.

> If you're a designer or agent: start at the [Index](#index) below to find the
> file you need. If you're an LLM: read this file end-to-end, then explore the
> referenced files as you need them.

---

## Company context

Climoo (`climoo.com.br` · platform at `plataforma.climoo.com.br`) is a
Brazilian **technology + consulting** company specializing in corporate
sustainability. The product is a SaaS platform that companies use to **measure,
plan and track** carbon emissions over time.

Climoo positions itself as the bridge between consulting expertise and
auditable software — the people who built it have lived the GHG-Protocol
spreadsheet pain themselves and built a tool to fix it.

**Customers** are mid-market to large enterprises across pharma, retail,
agribusiness, logistics, automotive and consumer goods. Listed clients include
Eurofarma, Movida, Mills, RD Saúde, and Special Dog. 200+ companies served,
operations in 15 countries (per the marketing site).

**Products represented in this design system:**

| Product | Surface | Status |
|---|---|---|
| **Climoo Landing Page** (`climoo.com.br`) | Marketing website — home, About, Insights (blog), Solutions detail pages | ✅ Codebase available, recreated in `ui_kits/landing/` |
| **Climoo Platform** (`plataforma.climoo.com.br`) | The actual SaaS app | ⚠️ Not in the provided codebase. The dashboards visible in the marketing screenshots (`assets/products/*.png`) are the only reference. We have **not** recreated the app UI. |

**Core solutions** the brand talks about (these are the menu items, the
"product" surface the marketing site sells):

1. **Emissions Inventory** — GHG Protocol scopes 1/2/3 inventory builder
2. **ESG Indicators Management** — environmental + social KPI reporting
3. **Decarbonization Plan** — scenario modeling, MAC curves, initiative library
4. **SBTi Targets** — Science Based Targets initiative submission + management
5. **Supply Chain** (mentioned, not fully built out in current site)
6. **Climate Risk Analysis** (TCFD-aligned)

The brand explicitly aligns with these external frameworks/standards: **GHG
Protocol, CDP, TCFD, IFRS, SBTi**. Their logos live in `assets/standards/`.

---

## Sources

Everything in this design system was derived from these inputs. Store them so
future iterations can be cross-checked.

- **Codebase (provided, local mount):** `climoo-landing-page-main/`
  - React Router v7 + Tailwind v4 + Ant Design (v5) marketing site
  - All copy lives in `app/locales/{en-us,pt-br,es-es}.json` and
    `app/i18n/locales/`
  - All raster assets (logos, screenshots, illustrations) live in
    `app/assets/`
  - Global CSS / animations: `app/app.css`
- **Production sites (reference, public web):**
  - `https://climoo.com.br` — marketing
  - `https://plataforma.climoo.com.br` — platform login
- **Social / icons:** Instagram `@climoo.br`, LinkedIn `climoo-br`,
  YouTube `@climoo_br`, WhatsApp `+55 47 99119-0772`
- **Offices** (from footer):
  - Novale — Rua Cesare Valentini, 200, Jaraguá do Sul/SC — 89254-193
  - Ágora Tech Park — Rua Dona Francisca, 8300, Joinville/SC — 89219-600

No Figma file was provided.

---

## Content fundamentals

### Voice & tone

- **Confident expert, never preachy.** Climoo speaks as a competent partner who
  has done this work hands-on. They lean into being the people who *know the
  frameworks in practice* and have *been through this process from the
  client's side*. No moralizing about the climate, no guilt-trips, no
  eco-influencer energy.
- **We, not I.** Always first-person plural — "We built a complete platform",
  "Our certified professionals". The brand is a team, never a single voice.
- **You, the customer.** Addresses the reader directly: "your emissions
  management", "your company", "your climate strategy".
- **Plain, not jargony — except for the technical framework names.** Acronyms
  like GHG, SBTi, TCFD, IFRS, CDP, ESG, CSRD are used unexplained because the
  audience already knows them. Around those acronyms, the prose is plain:
  *"Simplify the development and management of your climate strategy"*,
  *"Eliminate scattered spreadsheets and manual collection"*.
- **Problem→solution framing.** The site uses an explicit "pains" block:
  *"Your emissions management doesn't have to be like this"* — then lists
  fragmented data, inconsistent reports, slow manual collection. Then offers
  the platform as the fix. Reach for this structure when writing new copy.
- **No emoji. No exclamation points.** The brand voice is composed and a touch
  formal. Even the FAQ — *"It's simple!"* — only uses an exclamation point as
  the rare conversational beat in customer-support contexts.
- **Bilingual by default.** Portuguese (pt-BR) is the primary language; the
  site ships English (en-US) and Spanish (es-ES) translations. Office names
  stay in Portuguese ("Plano de descarbonização") in branded contexts.

### Casing

- **Sentence case for headlines.** *"Create and manage your decarbonization
  strategy"* — never Title Case, never ALL CAPS for headlines.
- **Title Case is reserved for product names and proper nouns.** "Climoo",
  "SBTi", "ESG Indicators Management", "Greenhouse Gas Protocol".
- **UPPERCASE + tracked** is used sparingly, only for eyebrow labels
  (`.climoo-caps`, 12px, 0.12em letter-spacing). Most are hidden from view in
  the current site; reserve them for editorial moments.
- Buttons use **Sentence case**: "Schedule a demo", "Learn more", "Sign in".

### Length

- **Hero headlines: 3–7 words, 1–3 lines.** Often broken with `\n` for visual
  rhythm: *"Create and manage / sustainability / indicators"*.
- **Subtitles: ~20–35 words, one paragraph.** Always concrete:
  *"Integrated solution for the preparation and management of emissions
  inventories, SBTi targets, decarbonization plan and Climate Risk Analysis…"*.
- **Card titles: 2–5 words.** "Centralize your emissions data", "ESG reports
  without rework".
- **Card descriptions: ≤25 words.** One sentence, sometimes two, never three.

### Example phrases — quote these to stay in voice

- "Create and manage your decarbonization strategy"
- "Simplify sustainability management"
- "More clarity, less effort"
- "Centralize your emissions data"
- "ESG reports without rework"
- "Auditable technology"
- "Built to work from day one"
- "Your emissions management doesn't have to be like this"
- "This isn't lack of climate commitment. It's lack of a tool made for your business."
- "The first 30 days are on us. No credit card, no commitment."

### What to avoid

- 🚫 Climate doom/urgency language ("the planet is dying", "before it's too late")
- 🚫 Tech-bro language ("disrupt", "revolutionize", "10x")
- 🚫 Vague aspirational fluff ("empowering a sustainable future")
- 🚫 Emoji in body copy or headlines
- 🚫 Exclamation points outside of FAQ/support copy
- 🚫 "AI-powered" framing — Climoo positions on expertise + auditability, not AI hype

---

## Visual foundations

### Color

Climoo's palette is **deep purple + cool blue-gray neutral** with cyan and
violet accents. See `colors_and_type.css` for full tokens.

- **Primary brand color: `#210856`** — the deep, almost-black purple used for
  every primary CTA, the hero background blob, the header pill when scrolled,
  link hovers, scroll indicators. This is *the* Climoo color. Use it more than
  you think you should.
- **Hero accent: `#9354E0`** — bright violet for the hero "Schedule a demo"
  button. Often shows up paired with `#210856` as the hover-swap.
- **Footer / stats backdrop: `#1b0753`** — one notch darker than the brand
  purple, used as a section background to give heavyweight sections (stats,
  footer) gravitas.
- **Page background: `#E4EBF0`** — cool blue-gray (NOT white). This is a
  signature. The body element is explicitly set to `#E4EBF0 !important`.
  Light sections sit on this; only specific surfaces (why-choose section, who-
  we-are image card) go to plain white or `#f3f4f6`.
- **Gradients** are used heavily but always within a tight palette: deep
  purple → violet → cyan, never warm hues. The signature decarb gradient is
  `linear-gradient(0deg, #62D0E5 0%, #9354E0 50%, #371776 100%)`.

### Type

- **Headings: Plus Jakarta Sans (Variable).** Weights 600/700, tight leading
  (`1.1–1.2`).
- **Body: Outfit (Variable).** Weights 400 for text, 500 for buttons, 600 for
  light emphasis.
- **No serif. No mono.** Climoo is fully sans-serif. If you ever need code or
  data display, fall back to `ui-monospace, monospace` but it's effectively
  never used.
- **Fluid scale via `clamp()`.** Most large type uses
  `clamp(min, vw, max)` so it scales smoothly without breakpoint jumps.

### Backgrounds — the "hero blob" pattern

This is Climoo's most distinctive visual move:

- A **huge purple ellipse/circle** is positioned at the top-left of every hero,
  bleeding off the canvas. On desktop it's `~150vw × 90vh` with `border-radius:
  50%`; on mobile it becomes a flat rectangle covering the full viewport.
- On solution pages, the blob holds **concentric gradient rings** inside it
  (4 nested circles with `border: 2px solid` and a cyan→violet→purple gradient
  border via `padding-box / border-box` background-clip trick — see
  `app/solutions/shared/SolutionHeroSection.tsx`).
- Around hero images: a small **decorative ring PNG** (`assets/ring.png`) and
  inline gauge/chart screenshots float over the product image as proof-of-life.
- **Solution cards** have their own decorative concentric circles drawn with
  `1px solid` borders at 130–150% width, positioned `top: -30%; right: -20%`,
  giving them an orbital feel.
- **No textures, no grain, no noise, no patterns.** Surfaces are flat color or
  gradient.

### Imagery

- **Product screenshots dominate.** Hero shows the platform UI on a tilted
  laptop/phone with stat callouts floating around it.
- **Photography is warm-toned and corporate** — co-working spaces, the Ágora
  Tech Park photo, smiling people in front of windows. Never stock-photo
  cliché; never abstract eco-imagery (no leaves, no Earth-from-space).
- **Client logos** are monochrome PNGs displayed on the light page background.
- **No illustrations.** No hand-drawn art, no SVG mascots, no character
  cartoons. The closest thing to illustration is the cropped person in the CTA
  panel (`cta-image.png`).

### Animation

- **Reveal-on-mount.** Every hero animates in with a 0.6–1s `ease-out`
  fade + 20–40px translateY, staggered: title (100ms) → subtitle (250ms) →
  CTA (400ms) → cards (700–1100ms). See `app.css` `slideInUp`, `cardSlideIn`,
  `phoneReveal`.
- **The hero blob itself slides in from above** with `slideInDown`, 1s.
- **Hover: subtle.** Buttons scale `1.05` and gain a soft shadow. Cards swap
  to a `rgba(0,0,0,0.45)` backdrop-blur overlay with a 0.5s transition.
- **Scroll indicator bounce.** A `bounce` keyframe (translateY ±4–8px) on a
  chevron under the hero. Climoo uses `Smooth scroll-behavior` globally.
- **Standard durations:** `0.2s` for hover state changes, `0.3s` for header
  scroll-state, `0.5s cubic-bezier(0.4,0,0.2,1)` for blur overlays, `0.6–1s
  ease-out` for entrance reveals, `1.2s` for the hero phone reveal.
- **No bouncing/elastic easings on UI.** No spring physics. Just `ease-out`
  and a `cubic-bezier(0.4, 0, 0.2, 1)` for blur transitions.

### Hover / press

- **Primary buttons swap fully** — `#210856` background on rest swaps to
  `#9354E0` on hover (or the inverse: `#9354E0` → white-bg/purple-text on
  hero CTA). Hover is a **color swap, not a darkening**.
- **Nav links** brighten from white to `#210856` on light bg (or stay white
  on dark hero).
- **Scaled hovers** of `transform: scale(1.05)` + soft shadow on the major
  CTAs. No press-down `:active` shrink.
- **Card hovers** dim the card with a translucent black overlay
  (`rgba(0,0,0,0.45)`) and reveal a description that translates up 10px and
  fades in.

### Borders & dividers

- **Hairline borders** — `1px` or `1.5px` solid, mostly white-at-10–30% alpha
  on dark surfaces.
- The solution-hero rings use a clever **gradient border** built with
  `linear-gradient padding-box, linear-gradient border-box` so the ring
  *itself* fades from cyan to deep purple.
- **No double borders, no dashed/dotted patterns.**

### Shadow / elevation

Three named elevations, all soft:

1. `0 4px 16px rgba(0,0,0,0.07)` — base card lift
2. `0 5px 28px rgba(0,0,0,0.10)` — main card / hero card
3. `0 12px 32px rgba(0,0,0,0.10)` — hero image drop-shadow

Plus context-specific:
- `0 2px 12px rgba(33,8,86,0.10)` — carousel arrow rest
- `0 4px 20px rgba(33,8,86,0.25)` — carousel arrow hover
- `0 4px 32px rgba(0,0,0,0.3)` — scrolled-header floating pill

**Never use:** hard black shadows, inset shadows, neumorphic dual-shadow.

### Transparency & blur

- **Header pill gains `backdrop-filter: blur(20px)`** when scrolled past 50px,
  with a `rgba(33, 8, 86, 0.6)` tint behind it.
- **Card hover overlays** use `backdrop-filter: blur(4px)`.
- **Carousel arrows** use `backdrop-filter: blur(8px)` over a translucent
  white background.

Transparency is used sparingly and always with a blur — Climoo never just
overlays a translucent panel without blur behind it.

### Corner radius

- **Buttons: `99px` pills.** All buttons, including mobile nav language
  pickers and the header CTA.
- **Cards: `20px`.** Solution cards, why-choose cards.
- **Bigger surfaces: `24px` (drawer, who-we-are image), `28px` (CTA hero panel).**
- **Small UI: `12–16px`** — dropdown menu items, mobile drawer nav items,
  small dropdown panels.
- **Icons in social bar:** `border-radius: 50%` with `1.5px solid
  rgba(255,255,255,0.3)`.

### Cards

The canonical Climoo card is:

- `border-radius: 20px`
- Either flat `#f3f4f6` background OR a `linear-gradient(145deg, …)` running
  from a brighter purple at top-left to a deeper purple at bottom-right
- Optional 1–2 large concentric circle decorators at top-right with a
  semi-transparent border
- Padding `40px 32px` (desktop) / `36px 28px` (mobile)
- Icon top-left, title bottom-left (or both stacked top-left for non-gradient
  cards)
- Shadow: usually none; only the hero floating cards get a shadow

### Layout

- **Max content width: `1280px`** centered, with `px-4 sm:px-8 lg:px-16`.
- **Section vertical padding:** ~`132–138px` on desktop, ~`72px` on mobile.
- **Header is `position: fixed`**, 72px tall, becomes a translucent pill once
  the page scrolls.
- **Grid breakpoint:** `sm-lg: 852px` is the custom breakpoint where the desktop
  header layout swaps in. Below that, hamburger drawer.
- **Hero is asymmetric:** `48fr / 52fr` text/image grid on desktop, stacked
  on mobile.

---

## Iconography

Climoo's marketing site uses **React Icons** as its only icon source — pulled
from four families:

| Library | Prefix | Used for |
|---|---|---|
| **Heroicons (outline)** | `react-icons/hi` | Header chevrons (`HiChevronDown`), hamburger (`HiOutlineMenu`, `HiOutlineX`) |
| **Material Design (outlined)** | `react-icons/md` | Language globe (`MdLanguage`), feature cards (`MdOutlineVerified`, `MdOutlineFactCheck`, `MdOutlinePublic`) |
| **Feather** | `react-icons/fi` | Social bar (`FiInstagram`, `FiLinkedin`, `FiYoutube`) |
| **FontAwesome** | `react-icons/fa` | WhatsApp (`FaWhatsapp`) — the only solid/branded icon |

Style: **outlined, 1.5–2px stroke, 16–24px size**. Always rendered with
`aria-hidden="true"` next to a text label.

**Color:** Most icons take the inherited text color. Two exceptions in the
codebase:
- Why-choose card icons are explicitly `#7c3aed` (bright violet) at `size={36}`
- Feature icons in stats appear in `#a855f7`

**No icon font, no SVG sprite, no custom SVG icon set** lives in the repo.
There's only one custom logo SVG (`assets/logos/climoo-white.svg`).

**Emoji:** never used in the UI.

**Unicode characters as icons:** never used.

**Flags:** the `flag-icons` CSS library is imported, but isn't visibly used in
the current header (the language picker is text-only — "PT / EN / ES").

### How to draw icons in this design system

For HTML artifacts produced from this design system, use **Lucide** via CDN —
it's stylistically identical to Heroicons-outline + Feather (same stroke
weight, same metaphors) and easy to load:

```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="chevron-down"></i>
<script>lucide.createIcons();</script>
```

Lucide names that map to Climoo's actual usage:
- `chevron-down`, `menu`, `x` (header)
- `globe` (language)
- `shield-check`, `clipboard-check`, `globe-2` (feature cards)
- `instagram`, `linkedin`, `youtube` (social)

⚠️ **Substitution flag:** the Climoo site uses Material Design's "filled
outline" variant for some feature cards (`MdOutlineVerified` has a fill-line
shield). Lucide doesn't have an exact equivalent — `shield-check` is the
closest. Document if you need pixel-perfect parity.

---

## Visual assets

All copied into `assets/`:

- `assets/logos/`
  - `horizontal-logo.png` — white logo for dark backgrounds (used in header,
    footer, mobile drawer header)
  - `horizontal-logo-dark.png` — dark logo for light backgrounds
  - `climoo-white.svg` — vector logo
- `assets/clients/` — 8 generic + 5 named (Eurofarma, Movida, Mills, RD Saúde,
  Special Dog) client logos for the "Trusted by" strip
- `assets/standards/` — GHG, CDP, TCFD, IFRS framework logos for the
  compliance bar
- `assets/products/` — screenshots of the platform UI (data collection, audit,
  scenario modeling, MAC curve, BI, SBTi submission)
- `assets/hero-image.png` — the hero phone/laptop mockup
- `assets/ring.png`, `assets/scope-3-gauge.png`, `assets/emission-distribution.png` — hero
  floaters
- `assets/agora.png` — Ágora Tech Park photo
- `assets/cta-image.png` — cropped person for the CTA panel
- `assets/about-hero-image.png`, `assets/peoples.png` — about page imagery
- `assets/platform.png`, `assets/emissions-inventory.png`, `assets/blog-card.png` — supporting screenshots
- `assets/map.png` — global presence map
- `assets/selo-sbti.png` — SBTi accreditation seal

---

## Index

**Foundations**
- `README.md` — you're reading it
- `colors_and_type.css` — all CSS variables (colors, type, spacing, motion, radius, shadow) + semantic classes (`.climoo-h1`, `.climoo-btn--primary`, etc)
- `SKILL.md` — meta-spec, also usable as a Claude Code skill manifest
- `fonts/` — Plus Jakarta Sans variable axis (regular + italic). Outfit is loaded from Google Fonts.

**Assets**
- `assets/logos/`, `assets/clients/`, `assets/standards/`, `assets/products/`, plus loose marketing images at `assets/*.png`

**UI Kits**
- `ui_kits/landing/` — pixel-faithful recreation of the Climoo marketing site
  - `index.html` — the demo home page (Header → Hero → Trusted-By → Solutions → Standards → Why-Choose → Who-we-are → Stats → CTA → Footer)
  - `Header.jsx`, `Footer.jsx`, `Hero.jsx`, `SolutionCard.jsx`, `StandardsBar.jsx`, `WhyChooseCard.jsx`, `StatBlock.jsx`, `CTAPanel.jsx`, `Button.jsx`

**Previews** (registered into the Design System tab)
- `preview/*.html` — small cards used by the asset review pane. Not for editing.

---

## Font files

`fonts/` contains the **Plus Jakarta Sans** variable axis (regular + italic),
provided by the user. They are wired up via `@font-face` at the top of
`colors_and_type.css` so artifacts work fully offline for the headings family.

**Outfit** (body) was not provided as `.ttf`. It is loaded from Google Fonts
(`@import` in `colors_and_type.css`). If you need to ship offline-only, ask
the user for the Outfit variable axis `.ttf` and add it the same way.

---

## Caveats

- **The platform app UI is not represented.** Only the marketing site was in
  the codebase. The "product screenshots" in `assets/products/` are the only
  reference for what the real app looks like — they're enough to do
  marketing-style mocks but not enough to recreate the app itself.
- **No Figma file** was provided, so this system is based solely on the
  shipped React code + the asset PNGs.
- **Lucide is a substitution for Material/Heroicons** — close in style, not
  identical. See [Iconography](#iconography).
- **Fonts loaded from Google CDN** instead of bundled `.woff2`.
