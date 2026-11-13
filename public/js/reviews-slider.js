/* Style 3 reviews slider: one quote at a time, dots + auto-advance */
  (function () {
    var track = document.querySelector(".v3 .reviews");
    if (!track) return;
    var slides = track.children, dots = document.createElement("div"), i = 0, timer;
    dots.className = "rv-dots";
    for (var n = 0; n < slides.length; n++) {
      var b = document.createElement("button");
      b.setAttribute("aria-label", "Show review " + (n + 1));
      b.addEventListener("click", (function (k) { return function () { go(k); restart(); }; })(n));
      dots.appendChild(b);
    }
    track.parentNode.insertBefore(dots, track.nextSibling);
    function mark() { for (var k = 0; k < dots.children.length; k++) dots.children[k].setAttribute("aria-current", k === i); }
    function go(k) { i = (k + slides.length) % slides.length; track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: "smooth" }); mark(); }
    function restart() { clearInterval(timer); timer = setInterval(function () { go(i + 1); }, 6500); }
    track.addEventListener("scroll", function () { var k = Math.round(track.scrollLeft / track.clientWidth); if (k !== i) { i = k; mark(); } }, { passive: true });
    mark(); restart();
  })();
