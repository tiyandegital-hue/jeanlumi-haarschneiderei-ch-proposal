/* Jeanlumi — Interaktionen (ohne Framework, bewusst schlank) */
(function () {
  "use strict";

  /* 1. Salon-Daten aus config.js einsetzen (Fallback steht bereits im HTML) */
  try {
    if (typeof SALON !== "undefined") {
      document.querySelectorAll("[data-salon]").forEach(function (el) {
        var key = el.getAttribute("data-salon");
        if (SALON[key] != null) el.textContent = SALON[key];
      });
      document.querySelectorAll("[data-salon-tel]").forEach(function (el) {
        el.setAttribute("href", "tel:" + SALON.telefonLink);
        el.textContent = SALON.telefonAnzeige;
      });
      document.querySelectorAll("[data-salon-mail]").forEach(function (el) {
        el.setAttribute("href", "mailto:" + SALON.email);
        el.textContent = SALON.email;
      });
    }
  } catch (e) { /* Fallback-HTML bleibt bestehen */ }

  /* 2. Mobile Navigation */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("mainnav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Menü schliessen" : "Menü öffnen");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* 3. Scroll-Reveals (nur wenn IO verfügbar; sonst alles sichtbar) */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".rv");
  if (!reduced && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* 4. Akkordeon (Leistungen) */
  document.querySelectorAll(".acc-item").forEach(function (item) {
    var btn = item.querySelector(".acc-btn");
    var panel = item.querySelector(".acc-panel");
    if (!btn || !panel) return;
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".acc-item.open").forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".acc-panel").style.maxHeight = null;
        other.querySelector(".acc-btn").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* 5. Galerie-Filter */
  var filters = document.querySelectorAll(".filter");
  var gitems = document.querySelectorAll(".g-item");
  if (filters.length && gitems.length) {
    filters.forEach(function (f) {
      f.addEventListener("click", function () {
        filters.forEach(function (x) { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
        f.classList.add("active"); f.setAttribute("aria-pressed", "true");
        var cat = f.getAttribute("data-filter");
        gitems.forEach(function (g) {
          var show = cat === "alle" || g.getAttribute("data-cat") === cat;
          g.classList.toggle("hide", !show);
        });
      });
    });
  }

  /* 6. Demo-Formulare: Validierung + ehrlicher Demo-Hinweis (sendet nichts) */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var wrap = field.closest(".field");
        var bad = !field.value || (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value));
        if (wrap) wrap.classList.toggle("invalid", bad);
        if (bad) valid = false;
      });
      if (!valid) {
        var firstBad = form.querySelector(".field.invalid input, .field.invalid select, .field.invalid textarea");
        if (firstBad) firstBad.focus();
        return;
      }
      var ok = form.querySelector(".form-ok");
      if (ok) { ok.classList.add("show"); ok.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" }); }
      form.querySelectorAll("input,select,textarea").forEach(function (f) { f.value = ""; });
    });
    /* Live-Reset der Fehlermarkierung beim Tippen */
    form.querySelectorAll("[required]").forEach(function (field) {
      field.addEventListener("input", function () {
        var wrap = field.closest(".field");
        if (wrap) wrap.classList.remove("invalid");
      });
    });
  });

  /* 7. Footer-Jahr */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
