# Trace Commons — Landing

Public landing page for [Trace Commons](https://github.com/TraceCommons/trace-commons-server).

**Live:** https://tracecommons.github.io/trace-commons-landing/

## What this is

A single-page static site (`index.html` + three React/JSX components loaded
via Babel standalone in the browser). No build step, no bundler — open
`index.html` in a browser and it works.

Content shipped from a [Claude Design](https://claude.ai/design) handoff:
hero animation, "Why Now" subsidy framing, thesis, Trace Credits pipeline,
final CTA → `near.com`, footer with protocol links.

## Files

| File | What |
|---|---|
| `index.html` | Page shell. CSS tokens (oklch palette, dark/light vars), typography, layout, fonts. Loads React 18 + Babel standalone from unpkg. |
| `trace-app.jsx` | Sections + composition: Nav, Hero, Marquee, WhyNow, Thesis, Credits, BigCTA, Footer. All copy lives here. |
| `trace-hero.jsx` | Animated agent-trajectory SVG in the hero. Nodes light up in sequence (`reason → tool → observe → recover → settle`) with short hashes appearing as each step is "captured". |
| `tweaks-panel.jsx` | Reusable dev tweaks shell (accent color, dark/light, film grain). Hidden in production unless the design-host postMessage protocol is active. |

## Viewing locally

```bash
# Anything that serves the directory as static files works. Two options:
python3 -m http.server 8000       # → http://localhost:8000/
# or
npx serve .                       # → http://localhost:3000/
```

(Opening `index.html` directly via `file://` mostly works, but some browsers
block the Babel-transformed `<script type="text/babel">` from a `file://`
origin. Serving over HTTP avoids it.)

## Editing copy

Almost everything visible is in `trace-app.jsx`. Search for the section
function (`Hero`, `WhyNow`, `Thesis`, `Credits`, `BigCTA`, `Footer`) and edit
in place. No rebuild required — refresh the browser.

The hero animation node graph is in `trace-hero.jsx` — `NODES` and `EDGES`
at the top define the trajectory shape.

CSS tokens (colors, fonts, spacing) live in the `:root` and
`html[data-mode="dark"|"light"]` blocks in `index.html`. The accent color
defaults to a signal-amber oklch and is overridable via the tweaks panel.

## Conventions

- No build step. If you want React, JSX, fonts, or anything else, load via
  CDN with subresource integrity. Babel-standalone transforms the JSX in
  the browser; that's intentional for a no-tooling deploy.
- Plain anchor links (`<a href="...">`) over JS routing. The page is one
  scrollable document by design.
- External links open in a new tab with `target="_blank" rel="noopener"`.
- No tracking, no cookies, no analytics. Keep it that way unless the project
  decides otherwise — privacy posture is part of the value proposition.

## Deployment

GitHub Pages serves the repo root on every push to `main`. After cloning:

```bash
# Make your edits, then:
git add . && git commit -m "your change"
git push
```

If Pages is ever disabled, the homepage will 404 — re-enable at
https://github.com/TraceCommons/trace-commons-landing/settings/pages with
"Deploy from a branch" → `main` / `/ (root)`.
