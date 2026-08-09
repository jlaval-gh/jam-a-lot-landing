/* ============================================================
   Hero screenshot carousel. No dependencies.

   The track is a flex row of slides; advancing sets
   translateX(-index * 100%). Autoplay pauses on hover, on focus
   within, when the tab is hidden, and permanently after the
   first manual interaction — an advance under someone's finger
   is the thing that makes a carousel annoying.

   Respects prefers-reduced-motion: no autoplay, no transition.
   ============================================================ */
(function () {
  "use strict";

  var root = document.getElementById("shots");
  var track = document.getElementById("shots-track");
  var dotsBox = document.getElementById("shots-dots");
  if (!root || !track || !dotsBox) return;

  var slides = Array.prototype.slice.call(track.querySelectorAll(".shot"));
  if (slides.length < 2) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DELAY = 5500;
  var index = 0;
  var timer = null;
  var userTookOver = false;

  // Dots
  var dots = slides.map(function (_, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "shots-dot";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", "Screenshot " + (i + 1) + " of " + slides.length);
    b.addEventListener("click", function () { stopAuto(); go(i); });
    dotsBox.appendChild(b);
    return b;
  });

  function go(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = "translateX(" + (-index * 100) + "%)";
    dots.forEach(function (d, n) {
      var on = n === index;
      d.classList.toggle("active", on);
      d.setAttribute("aria-selected", on ? "true" : "false");
    });
    slides.forEach(function (s, n) {
      // Keep off-screen slides out of the tab order and the a11y tree.
      s.setAttribute("aria-hidden", n === index ? "false" : "true");
    });
  }

  function next() { go(index + 1); }
  function prev() { go(index - 1); }

  function startAuto() {
    if (reduced || userTookOver || timer) return;
    timer = setInterval(next, DELAY);
  }
  function pauseAuto() {
    if (timer) { clearInterval(timer); timer = null; }
  }
  function stopAuto() {           // permanent: the visitor is driving now
    userTookOver = true;
    pauseAuto();
  }

  document.getElementById("shots-prev").addEventListener("click", function () { stopAuto(); prev(); });
  document.getElementById("shots-next").addEventListener("click", function () { stopAuto(); next(); });

  root.addEventListener("mouseenter", pauseAuto);
  root.addEventListener("mouseleave", startAuto);
  root.addEventListener("focusin", pauseAuto);
  root.addEventListener("focusout", startAuto);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) pauseAuto(); else startAuto();
  });

  // Keyboard, once the carousel has focus
  root.tabIndex = 0;
  root.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { stopAuto(); next(); e.preventDefault(); }
    else if (e.key === "ArrowLeft") { stopAuto(); prev(); e.preventDefault(); }
  });

  // Touch swipe. Only horizontal gestures count, or we'd hijack the
  // page scroll on a phone, which is exactly where this hurts most.
  var x0 = null, y0 = null, locked = false;
  root.addEventListener("touchstart", function (e) {
    x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; locked = false;
  }, { passive: true });
  root.addEventListener("touchmove", function (e) {
    if (x0 === null || locked) return;
    var dx = e.touches[0].clientX - x0;
    var dy = e.touches[0].clientY - y0;
    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      locked = true;
      stopAuto();
      if (dx < 0) next(); else prev();
    }
  }, { passive: true });
  root.addEventListener("touchend", function () { x0 = y0 = null; }, { passive: true });

  if (reduced) track.style.transition = "none";
  go(0);
  startAuto();
})();
