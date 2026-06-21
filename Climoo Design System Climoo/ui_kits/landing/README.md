# Landing UI Kit

A pixel-faithful recreation of the **climoo.com.br** marketing site, factored
into small reusable JSX components. Open `index.html` to see the assembled
home page.

## Files

- `index.html` — entry point. Loads React + Babel + each component, then
  composes the home page (Header → Hero → TrustedBy → Solutions → Standards →
  WhyChoose → WhoWeAre → Stats → CTAPanel → Footer).
- `Button.jsx` — pill `<Button variant="primary|violet|ghost|secondary">`.
- `Header.jsx` — fixed floating-pill header. Logo + nav + language + CTA.
  Becomes a translucent blur pill when the page is scrolled past 50px.
- `Hero.jsx` — the signature top-left purple blob with hero title, subtitle,
  CTA, and product image with floating gauge/ring decoration.
- `TrustedBy.jsx` — horizontal client logo strip on light bg.
- `SolutionsCarousel.jsx` — 4 gradient cards with concentric-ring decorators.
- `StandardsBar.jsx` — framework compliance row (GHG / CDP / TCFD / IFRS).
- `WhyChoose.jsx` — 3 flat feature cards with stroked icons.
- `WhoWeAre.jsx` — two-column title + photo block.
- `Stats.jsx` — 4 big purple counters on the dark `#1b0753` backdrop.
- `CTAPanel.jsx` — gradient CTA card with cropped person.
- `Footer.jsx` — multi-column dark footer with offices, nav, socials.

## What this is (and isn't)

This is the **marketing site only**. The actual Climoo platform
(`plataforma.climoo.com.br`) was not provided as code, so it isn't recreated
here.

Functionality is intentionally shallow — links don't go anywhere, the
"Schedule a demo" button opens a stubbed modal alert, the language switcher
is decorative. The goal is **visual fidelity** so designers can compose new
marketing surfaces (campaign pages, partner-specific landings, etc) using
faithful Climoo components.
