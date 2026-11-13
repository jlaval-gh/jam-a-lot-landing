# Jam-a-Lot — Landing Page

A standalone, dependency-free marketing landing page for Jam-a-Lot. Dark studio
canvas (`#14161a` / `#1d2026`) with warm studio brass (`#d4a359`) and sage
emerald (`#6ee7b7`) accents. Positioned around the core capabilities of the app:

1. **1,000+ tunes across Jazz, Latin, Brazilian, Funk, Soul & Pop** — aggregates
   open chord collections, academic datasets, public-domain lead sheets, and
   user-authored charts.
2. **15 selectable feels & 24 built-in rhythm styles** — Swing, Ballad, Gypsy Jazz,
   Bossa Nova (with default nylon-string guitar), Rio Samba batucada (with Swingue
   knob), Salsa, Bolero, Bolero Modern, Tresillo, Soul-Jazz, Funk, Blues Shuffle,
   R&B / Neo-Soul, Soul Waltz (3/4), Soul 6/8, Soul 6/8 Brushes, Rock, and four
   EDM styles — plus the **Rhythm Blend Lab** and **Microrhythm Playground**.
3. **The listening band** — subtracts its own speaker output per frequency bin,
   calibrates with one-click *Set my range*, and follows your dynamics, phrase
   gaps, and repeated motifs.
4. **Complete studio workbench** — 5-line Staff View, unified Staff Editor &
   beat-tracked AI Solo Transcription, Mix & EQ Studio with 72-band RTA &
   Instrument FX racks, and Practice Video waveform A/B looper.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Structure: focused 4-link header, hero + 8-slide logged-in screenshot carousel, **What's New in v0.2 Beta** tabbed section, comparison block, listening band, live performance, core studio features, library, how-it-works, FAQ, beta access, CTA, footer |
| `styles.css` | App-native dark studio slate (`#14161a` / `#1d2026`), warm brass (`#d4a359`), Instrument Serif + Inter |
| `carousel.js` | Hero screenshot carousel |
| `reveal.js` | Scroll-reveal via IntersectionObserver, sticky-header state, and accessible What's New tabs (`beforematch` + arrow-key support) |
| `assets/shots/*.webp` | 8 logged-in app screenshots (`01-play.webp` through `08-plan-mixer.webp`), ~460 KB total |
| `manual.html` | Full user manual |
| `llms.txt` / `llms-full.txt` | AI-readable feature summary and manual |
