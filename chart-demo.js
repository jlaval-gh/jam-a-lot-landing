/* ============================================================
   Chord-chart demo — animates a mock "Autumn Leaves" A-section
   cell grid, cycling through the live-performance states that
   differentiate Jam-a-Lot:
     1. head           — plain walk through the form
     2. double time    — next chorus is doubled (faster step)
     3. trade fours    — drummer trades bars with you
     4. living changes — common substitutions swap chords in
   Pure DOM, no audio, no dependencies.
   ============================================================ */
(function () {
  "use strict";

  // Base A-section. Each bar carries optional substitution(s) used
  // during the "living changes" state. Section tints match the app
  // palette (A=blue, B=green, …).
  var BARS = [
    { chord: "Cm7",    sub: "Cm7",   section: "A", tint: "tint-a" },
    { chord: "F7",     sub: "F7b9",  section: "",  tint: "tint-a" },
    { chord: "Bbmaj7", sub: "Bbmaj7",section: "",  tint: "tint-a" },
    { chord: "Ebmaj7", sub: "Ebmaj7",section: "",  tint: "tint-a" },
    { chord: "Am7b5",  sub: "Em7b5", section: "",  tint: "tint-a" }, // sub: ii of ii
    { chord: "D7",     sub: "Ab7",   section: "",  tint: "tint-a" }, // sub: tritone
    { chord: "Gm",     sub: "Gm",    section: "",  tint: "tint-a" },
    { chord: "Gm",     sub: "Gm",    section: "",  tint: "tint-a" }
  ];

  var grid = document.getElementById("chart-demo");
  if (!grid) return;

  // Build cells
  BARS.forEach(function (bar, i) {
    var cell = document.createElement("div");
    cell.className = "chart-cell " + bar.tint + (bar.section ? " section-start" : "");
    if (bar.section) cell.setAttribute("data-section", bar.section);
    cell.textContent = bar.chord;
    cell.setAttribute("data-index", String(i));
    grid.appendChild(cell);
  });

  var cells = grid.querySelectorAll(".chart-cell");
  var barNumEl = document.getElementById("bar-num");
  var chorusEl = document.getElementById("chorus-num");
  var liveEl = document.getElementById("live-state");

  // Live-performance states. STEP_MS is per-bar base speed; double-time
  // state halves it to dramatize the tempo change.
  var BASE_MS = 1300;
  var stateIdx = 0;
  var STATES = [
    { label: "head",          chorus: 1, stepMs: BASE_MS,       useSubs: false },
    { label: "double time",   chorus: 2, stepMs: BASE_MS / 2,   useSubs: false, cls: "doubled" },
    { label: "trade 4s",      chorus: 3, stepMs: BASE_MS,       useSubs: false, cls: "trade"  },
    { label: "living changes",chorus: 4, stepMs: BASE_MS,       useSubs: true,  cls: "subbed" }
  ];

  function applyState(state) {
    if (liveEl) {
      liveEl.textContent = state.label;
      liveEl.className = "meta-tag live-tag " + (state.cls || "");
    }
    if (chorusEl) chorusEl.textContent = String(state.chorus);
    // Swap chord text for living-changes state
    cells.forEach(function (cell, i) {
      cell.textContent = state.useSubs ? BARS[i].sub : BARS[i].chord;
      cell.classList.toggle("subbed", !!state.useSubs && BARS[i].sub !== BARS[i].chord);
    });
  }

  var barIdx = 0;
  var current = STATES[stateIdx];
  applyState(current);

  function advance() {
    // Clear previous active cell
    cells.forEach(function (c) { c.classList.remove("active"); });

    var cell = cells[barIdx];

    // During "trade 4s", drummer "answers" every other 4-bar group:
    // dim the cell slightly when it's the drummer's turn.
    if (current.cls === "trade" && barIdx >= 4) {
      cell.classList.add("active");
    } else {
      cell.classList.add("active");
    }

    if (barNumEl) barNumEl.textContent = String(barIdx + 1);
    barIdx++;

    // End of form → advance to next live state
    if (barIdx >= BARS.length) {
      barIdx = 0;
      stateIdx = (stateIdx + 1) % STATES.length;
      current = STATES[stateIdx];
      applyState(current);
    }
  }

  // schedule with dynamic interval so double-time visibly speeds up
  function loop() {
    advance();
    setTimeout(loop, current.stepMs);
  }
  // small initial delay so the hero settles before motion starts
  setTimeout(loop, 600);
})();
