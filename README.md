# Jam-a-Lot — GLM Landing Page

A standalone, dependency-free marketing landing page for Jam-a-Lot. Dark canvas
with an electric-blue accent (cobalt→cyan). Positioned around the three things
that distinguish the app:

1. **Every open-source tune, any style** — aggregates the open chord collections
   (a 1,382-tune jazz-standards corpus, pop/rock changes from open academic
   datasets, public-domain lead sheets, plus your own imports).
2. **Live performance flexibility** — shape the band while you play: double time
   the next chorus, trade fours with the drummer, turn on Live Changes.
3. **The listening band** — the mic hears you play (with the band's own sound
   subtracted per frequency bin) and the band follows your energy, answers your
   phrases, and catches a figure you repeat.

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
| `assets/icon.png` | Brand icon — a bassist (figure + upright bass) rendered from the app's own bandstand drawing code, in the blue palette; used in header, footer, og:image, apple-touch-icon |
| `assets/favicon.png` | Simplified 32px-friendly variant of the icon (thicker outline, no frets) for the browser tab |

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

## Access tiers (these are real, not placeholders)

Two doors, deliberately equal weight in the layout — the beta is the better
deal but guest mode is not hidden.

| Tier | Price | What it is |
|---|---|---|
| **Guest** | free, no sign-up | 3 demo tunes (*Blues in F*, *Oleo*, *Mr. P.C.*) with the full generated band and every live control. No editing, no imports, no sync. |
| **Beta Member** | **$0 — in exchange for feedback** | All 1,382 tunes, full chart editor, custom tunes, Rhythm Style Lab, cloud sync. Free during the whole beta; no card, no trial clock. |

The feedback-for-access framing is stated in three places on purpose: the hero
micro-note, the `#beta` section head, and the Beta card's price tag. If you
soften one, keep the other two.

The `#beta` section id was `#pricing`; the header nav anchor moved with it.

## Keeping this in sync with the app

Source of truth for what has actually shipped is the app repo's
`docs/FEATURES.md`, `docs/MANUAL.md` and `docs/RHYTHM_STYLES.md`. Two things
this page previously got wrong by drifting:

* **Feel count.** It is twelve *selectable* feels (`Feel` in
  `src/engine/types.ts` has thirteen entries; `two-feel` is not selectable —
  `resolveFeel` derives it from the performance plan's groove).
* **The Studio Recorder is hidden.** `STUDIO_RECORDER_ENABLED` is off in the
  app, so multitrack stems / WAV export / bandstand video must not be
  advertised here until the capture path is rebuilt.

All "Launch the app" CTAs point to the live deployment:
<https://jamalong.vercel.app/>
