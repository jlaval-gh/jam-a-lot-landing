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
| `index.html` | Structure: header, hero + screenshot carousel, **comparison block**, library, **live performance**, **it listens**, features, how-it-works, **FAQ**, beta, CTA, footer |
| `styles.css` | Full design system — dark canvas, electric-blue accent, Instrument Serif + Inter |
| `carousel.js` | Hero screenshot carousel (see below) |
| `reveal.js` | Scroll-reveal via IntersectionObserver + sticky-header state |
| `chart-demo.js` | **Retired.** The animated chord-chart mock the carousel replaced. No longer referenced by `index.html`; safe to delete |
| `assets/hero-bg.webp` | Custom 1920×1080 jazz trio artwork behind the hero (dark canvas #14161a, cobalt #3b82f6 / cyan #22d3ee lighting) |
| `assets/shots/*.webp` | Real app screenshots, 1200×857, ~470 KB total for all five |
| `assets/icon.png` | Brand icon — a bassist (figure + upright bass) rendered from the app's own bandstand drawing code, in the blue palette; used in header, footer, og:image, apple-touch-icon |
| `assets/favicon.png` | Simplified 32px-friendly variant of the icon (thicker outline, no frets) for the browser tab |

## The hero carousel

Five real screenshots, shot from the app running locally (**not**
the Vercel deploy — that lags the working tree). Slides, in order:

| File | Shows |
|---|---|
| `01-play.webp` | Play view — bandstand, chart, transport, Live Changes substitutions in green, Song Info panel |
| `02-fullscreen.webp` | Full-screen performance view |
| `03-mixer.webp` | Live Mixer — dB levels, sound pickers, pan positions, Song Info panel |
| `04-listening.webp` | Listening Band panel — meters, calibration, response sliders |
| `05-plan.webp` | Performance Plan — head, solos, trading, out head, Song Info panel |

Re-shooting: captured at 1500×1071 @2x via headless Chrome CDP with dark color scheme and 2D stage, normalized to 1200×857 (ratio 1.40) letterboxed on `#14161a`. Slides share a ratio so `.shots-frame` stays stable.

`carousel.js` is dependency-free. Autoplay (5.5 s) pauses on hover, on focus
within, and on a hidden tab, and **stops permanently after the first manual
interaction** — advancing under someone's finger is what makes a carousel
irritating. Arrow keys work once it has focus; horizontal swipe works on touch
and deliberately ignores gestures that are more vertical than horizontal, so it
never hijacks page scroll. `prefers-reduced-motion` disables the autoplay *and*
the transition.

Known limitation: the mixer and plan slides are dense desktop UI, so their
text is decorative rather than readable on a phone. The captions carry the
message; don't add slides that depend on reading small type.

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
<https://jamalot.vercel.app/>
