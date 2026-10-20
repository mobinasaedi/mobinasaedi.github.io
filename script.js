(function () {
  "use strict";

  var navbar = document.getElementById("navbar");
  var toggle = document.getElementById("navToggle");
  var links = document.querySelectorAll(".nav-links a");

  // Sticky navbar background after scrolling
  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  toggle.addEventListener("click", function () {
    var open = navbar.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.forEach(function (a) {
    a.addEventListener("click", function () {
      navbar.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // Highlight the nav link of the section currently in view
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  function spy() {
    var pos = window.scrollY + 120;
    var current = sections[0];
    sections.forEach(function (s) { if (s.offsetTop <= pos) current = s; });
    links.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current.id);
    });
  }
  window.addEventListener("scroll", spy, { passive: true });
  spy();

  // Fade-in on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("visible"); });
  }

  // Certificate viewer
  var modal = document.getElementById("certModal");
  var img = document.getElementById("certImg");
  var ttl = document.getElementById("certTitle");
  var missing = document.getElementById("certMissing");
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
  document.querySelectorAll(".cert-view").forEach(function (btn) {
    btn.addEventListener("click", function () {
      ttl.innerHTML = btn.getAttribute("data-title");
      missing.hidden = true; img.hidden = false;
      img.alt = "Certificate: " + ttl.textContent;
      img.onerror = function () { img.hidden = true; missing.hidden = false; };
      img.src = btn.getAttribute("data-img");
      modal.classList.add("open"); modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });
  document.getElementById("certClose").addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
