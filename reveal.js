/* ============================================================
   Scroll reveal + sticky header state + What's New tabs.
   IntersectionObserver adds .visible to .reveal elements; header
   gets .scrolled once the page moves; What's New tablist supports
   click, Left/Right/Home/End keyboard navigation, and beforematch
   for hidden="until-found" panels. No dependencies.
   ============================================================ */
(function () {
  "use strict";

  // 1. Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  // 2. Sticky header shadow on scroll
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // 3. What's New in v0.2 Beta Accessible Tabs
  var shell = document.querySelector(".whatsnew-shell");
  if (shell) {
    var tabs = Array.prototype.slice.call(shell.querySelectorAll(".whatsnew-tab"));
    var selectTab = function (activeKey, focusTab) {
      tabs.forEach(function (tab) {
        var key = tab.getAttribute("data-wn-tab");
        var panel = document.getElementById("wn-panel-" + key);
        var isSelected = key === activeKey;
        tab.setAttribute("aria-selected", isSelected ? "true" : "false");
        tab.tabIndex = isSelected ? 0 : -1;
        if (focusTab && isSelected) tab.focus();
        if (panel) {
          if (isSelected) {
            panel.removeAttribute("hidden");
          } else {
            panel.setAttribute("hidden", "until-found");
          }
        }
      });
    };

    tabs.forEach(function (tab, idx) {
      tab.tabIndex = idx === 0 ? 0 : -1;
      tab.addEventListener("click", function () {
        selectTab(tab.getAttribute("data-wn-tab"), false);
      });
      tab.addEventListener("keydown", function (e) {
        var nextIdx = -1;
        if (e.key === "ArrowRight") nextIdx = (idx + 1) % tabs.length;
        else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") nextIdx = 0;
        else if (e.key === "End") nextIdx = tabs.length - 1;
        if (nextIdx !== -1) {
          e.preventDefault();
          selectTab(tabs[nextIdx].getAttribute("data-wn-tab"), true);
        }
      });
    });

    shell.addEventListener("beforematch", function (e) {
      var panel = e.target.closest("[role='tabpanel']");
      if (panel && panel.id.indexOf("wn-panel-") === 0) {
        selectTab(panel.id.replace("wn-panel-", ""), false);
      }
    });
  }
})();
