---
name: climoo-design
description: Use this skill to generate well-branded interfaces and assets for Climoo, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

This skill defines the design system for **Climoo**, a Brazilian climate-tech
SaaS company. The brand is built around:

- Deep purple (`#210856`) as the dominant color, with violet (`#9354E0`) and
  cyan (`#62D0E5`) as gradient accents
- A cool blue-gray (`#E4EBF0`) page background — not white
- Plus Jakarta Sans for headings, Outfit for body
- Pill-shaped buttons everywhere
- A signature top-left ellipse "blob" on heroes
- Concentric gradient rings as a decorative motif on solution pages
- Soft, low-opacity shadows
- Outlined (Lucide / Heroicons / Material outlined) icons in 1.5–2px stroke

Climoo speaks as a confident climate-tech expert — "we built", "your
sustainability strategy" — addressing mid-market and enterprise customers who
already know acronyms like SBTi, GHG, TCFD, IFRS, ESG.

## What's here

- `README.md` — the full system: company context, voice & tone, visual
  foundations, iconography, file index
- `colors_and_type.css` — CSS variables for the whole palette + type +
  spacing + motion + shadow + radius; plus semantic classes
  (`.climoo-h1`, `.climoo-btn--primary`, etc)
- `fonts/` — Plus Jakarta Sans variable axis. Outfit loads from Google Fonts
- `assets/` — real Climoo logos, client logos, framework logos, product
  screenshots, and supporting imagery
- `ui_kits/landing/` — JSX recreation of the marketing site, with one
  component per file (Button, Header, Hero, etc) composed in `index.html`
- `preview/` — small specimen cards used by the design-system review pane

## How to use

If creating **visual artifacts** (slides, mocks, throwaway prototypes, etc):

1. Read `README.md` end-to-end first.
2. Link `colors_and_type.css` from your HTML and use the CSS variables
   (`var(--climoo-purple-800)`) and semantic classes (`.climoo-btn--primary`)
   instead of hardcoding values.
3. Copy assets out of `assets/` rather than referencing them by URL — keep
   artifacts self-contained.
4. For marketing-style work, lift component patterns from `ui_kits/landing/`
   rather than reinventing the hero blob, header pill, or solution-card
   gradient.
5. Default font stack: heading `Plus Jakarta Sans`, body `Outfit`. Don't
   substitute either without flagging it.

If working on **production code** (the actual React + Tailwind + Ant Design
site at `climoo-landing-page-main/`):

- The values in `colors_and_type.css` are derived from `app/app.css` and
  inline styles. Use them as a reference cheat-sheet, but the source of truth
  in production is still Tailwind config + the inline styles.
- The full React component definitions live in `climoo-landing-page-main/app/`,
  organized by route (`home/`, `about/`, `blog/`, `solutions/`) and shared
  primitives in `app/shared/components/` and `app/components/`.

If the user invokes this skill **without other guidance**, ask them what they
want to build or design (deck, landing page, app screen, social asset, etc.),
ask 3–5 focused questions (audience, tone, length, variations they want), and
act as an expert Climoo brand designer — outputting HTML artifacts or
production code depending on the need.

## Notable caveats

- The platform app (`plataforma.climoo.com.br`) is NOT represented as code.
  Only the marketing site source was provided. For app-style mocks, use the
  product screenshots in `assets/products/` as reference, but flag that you
  are designing without the canonical UI source.
- The original site uses `react-icons` (Heroicons outline, Material outlined,
  Feather, FontAwesome). Recreations use Lucide via CDN — visually close,
  not pixel-identical.
- Outfit ships from Google Fonts; only Plus Jakarta Sans is bundled.
