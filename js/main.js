/* Life Spa London – shared behaviour */
(function () {
  "use strict";

  /* Header: transparent over hero, solid after scrolling */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-solid", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var toggle = document.querySelector(".menu-toggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
  }

  /* Treatments mega-menu: click/keyboard toggle (hover handled in CSS on desktop) */
  document.querySelectorAll(".has-mega > button").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var li = btn.parentElement;
      var open = li.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
  });
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".has-mega.open").forEach(function (li) {
      if (!li.contains(e.target)) {
        li.classList.remove("open");
        li.firstElementChild.setAttribute("aria-expanded", "false");
      }
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    document.querySelectorAll(".has-mega.open").forEach(function (li) {
      li.classList.remove("open");
      li.firstElementChild.setAttribute("aria-expanded", "false");
    });
  });

  /* Tabs (What we offer) */
  document.querySelectorAll("[data-tabs]").forEach(function (root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    var panels = Array.prototype.slice.call(root.querySelectorAll('[role="tabpanel"]'));
    function select(i, focus) {
      tabs.forEach(function (t, n) {
        var on = n === i;
        t.setAttribute("aria-selected", on);
        t.tabIndex = on ? 0 : -1;
        panels[n].classList.toggle("active", on);
        if (on && focus) t.focus();
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(i); });
      t.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { e.preventDefault(); select((i + 1) % tabs.length, true); }
        if (e.key === "ArrowLeft") { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length, true); }
      });
    });
    select(0);
  });

  /* Accordions: every item closed by default */
  document.querySelectorAll(".acc-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", !open);
    });
  });

  /* Open an accordion's parent when jumping to it (e.g. "See prices") */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function () {
      var el = document.querySelector(a.getAttribute("href"));
      if (el) el.setAttribute("tabindex", "-1");
    });
  });

  /* Before / after sliders (drag the line) */
  document.querySelectorAll(".ba-box").forEach(function (box) {
    var range = box.querySelector(".ba-range");
    if (!range) return;
    function set(v) { box.style.setProperty("--pos", v + "%"); }
    range.addEventListener("input", function () { set(range.value); });
    set(range.value);
  });

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Hero video: fall back to the poster/background if autoplay is blocked */
  document.querySelectorAll(".hero video").forEach(function (v) {
    var p = v.play && v.play();
    if (p && p.catch) p.catch(function () { v.setAttribute("controls", ""); v.removeAttribute("controls"); });
  });
})();

/* Count-up numbers ([data-count]) when they scroll into view */
(function () {
  var els = document.querySelectorAll("[data-count]");
  if (!els.length) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function fmt(n) { return Math.round(n).toLocaleString("en-GB"); }
  function run(el) {
    var target = +el.getAttribute("data-count"), start = null, dur = 1600;
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (reduce || !("IntersectionObserver" in window)) return;
  els.forEach(function (el) { el.textContent = "0"; });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
  }, { threshold: 0.4 });
  els.forEach(function (el) { io.observe(el); });
})();

/* Team carousel: drag with the mouse, arrow buttons, swipe on touch (native scroll) */
(function () {
  document.querySelectorAll(".team").forEach(function (track) {
    var nav = document.createElement("div");
    nav.className = "team-nav";
    nav.innerHTML = '<button type="button" aria-label="Previous team member">←</button><button type="button" aria-label="Next team member">→</button>';
    track.parentNode.insertBefore(nav, track.nextSibling);
    var prev = nav.children[0], next = nav.children[1];
    function step() { var c = track.querySelector(".member"); return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 24) : 300; }
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
    function update() {
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    }
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    /* mouse drag */
    var down = false, startX = 0, startLeft = 0, moved = false;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse") return;
      down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
    });
    window.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 4) { moved = true; track.classList.add("dragging"); }
      if (moved) track.scrollLeft = startLeft - dx;
    });
    window.addEventListener("pointerup", function () {
      if (!down) return;
      down = false;
      if (moved) {
        track.classList.remove("dragging");
        /* settle on the nearest card */
        var s = step(), target = Math.round(track.scrollLeft / s) * s;
        track.scrollTo({ left: target, behavior: "smooth" });
      }
    });
    track.addEventListener("click", function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  });
})();
