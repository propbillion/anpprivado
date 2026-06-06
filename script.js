/* ============================================================
   ANP PRIVADO — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- WhatsApp number for the lead form ---------- */
  var WA_NUMBER = "918857090799";

  /* ---------- NAV: hide on scroll down, show on up ---------- */
  var nav = document.getElementById("nav");
  var lastY = window.scrollY;
  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    if (y > 80) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");

    if (y > lastY && y > 300) nav.classList.add("is-hidden");
    else nav.classList.remove("is-hidden");
    lastY = y;
  }, { passive: true });

  /* ---------- FAQ: keep only one open at a time ---------- */
  var faqs = document.querySelectorAll(".faq__item");
  faqs.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqs.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ---------- PRIVACY MODAL ---------- */
  var modal = document.getElementById("privacyModal");
  var openBtn = document.querySelector("[data-privacy]");
  var closeBtn = modal ? modal.querySelector("[data-close]") : null;

  function openModal(e) { if (e) e.preventDefault(); modal.hidden = false; document.body.style.overflow = "hidden"; }
  function closeModal() { modal.hidden = true; document.body.style.overflow = ""; }

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modal) modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && modal && !modal.hidden) closeModal(); });

  /* ---------- LEAD FORM -> WhatsApp ---------- */
  var form = document.getElementById("leadForm");
  if (form) {
    var nameInput = document.getElementById("name");
    var mobileInput = document.getElementById("mobile");

    mobileInput.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 10);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var name = nameInput.value.trim();
      var mobile = mobileInput.value.trim();

      if (name.length < 2) { nameInput.classList.add("is-error"); ok = false; }
      else nameInput.classList.remove("is-error");

      if (!/^[6-9]\d{9}$/.test(mobile)) { mobileInput.classList.add("is-error"); ok = false; }
      else mobileInput.classList.remove("is-error");

      if (!ok) return;

      var msg =
        "Hi, I'm interested in ANP Privado, Baner.\n" +
        "Name: " + name + "\n" +
        "Mobile: +91 " + mobile + "\n" +
        "Please share pricing, floor plans and priority allocation details.";

      window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg), "_blank");
    });
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  var revealTargets = document.querySelectorAll(
    ".section-title, .section-sub, .pcard, .plan, .bp, .ff, .stat, .conn, .pt, .faq__item, .band__content, .feature__img, .about__p"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = (Array.prototype.indexOf.call(el.parentNode.children, el) % 6) * 70;
          setTimeout(function () { el.classList.add("is-in"); }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-in"); });
  }
})();
