# Jam-a-Lot — GLM Landing Page

A standalone, dependency-free marketing landing page for Jam-a-Lot. Dark canvas
with an electric-blue accent (cobalt→cyan). Positioned around the two things
that distinguish the app:

1. **Every open-source tune, any style** — aggregates the open chord collections
   (jazz standards, pop/rock changes from open academic datasets, public-domain
   lead sheets, plus your own imports).
2. **Live performance flexibility** — shape the band while you play: double time
   the next chorus, trade fours with the drummer, turn on living substitutions.

## Run it

Plain HTML/CSS/JS — no build step. Open `index.html` directly, or serve the
folder for proper font/asset loading:

```bash
# from this folder
python3 -m http.server 8080
# then open http://localhost:8080
```

Or drop the folder anywhere static (Vercel/Netlify/`vite preview`).

## Files

| File | Purpose |
|------|---------|
| `index.html` | Structure: header, hero, library, **live performance** (the differentiator), features, how-it-works, pricing, CTA, footer |
| `styles.css` | Full design system — dark canvas, electric-blue accent, Instrument Serif + Inter |
| `chart-demo.js` | Animated "Autumn Leaves" mock that cycles through live states (head → double time → trade fours → living substitutions) |
| `reveal.js` | Scroll-reveal via IntersectionObserver + sticky-header state |
| `assets/icon.png` | Brand icon (extracted from the source brand SVG; used in header, footer, og:image) |
| `assets/logo.svg` | Full brand logo — grid backing + icon + wordmark + blue accent line (hero) |
| `assets/favicon.svg` | Vector favicon in the brand palette (dark backing + blue accent) |

## Design tokens

| Token | Value |
|---|---|
| Page bg | `#14161a` |
| Panel/card bg | `#1d2026` |
| Border | `#2a2e36` |
| Text | `#e8e8ea` |
| Muted text | `#9aa0a8` |
| Accent (cobalt) | `#3b82f6` |
| Accent 2 (cyan) | `#22d3ee` |
| Accent gradient | `linear-gradient(135deg, #3b82f6, #22d3ee)` |
| Display font | Instrument Serif |
| Body font | Inter |

## Pricing tiers (placeholders)

| Plan | Price | Positioning |
|---|---|---|
| Free | $0/mo | Chart + editor, generated band, all seven feels, transposition, loop |
| Pro | $5/mo *(most popular)* | Full open-source catalog, **live dynamics / trading / living changes**, Rhythm Style Lab, bandstand |
| Max | $20/mo | Recording studio, stem/video export, live notation + MusicXML, cloud backup |

All "Launch the app" CTAs point to the live deployment:
<https://jamalong.vercel.app/>
