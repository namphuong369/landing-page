// ===== Landing page interactions (vanilla JS, no dependencies) =====
(function () {
  "use strict";

  // --- Năm hiện tại ở footer ---
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Header: thêm shadow khi cuộn ---
  var header = document.getElementById("siteHeader");
  var toTop = document.getElementById("toTop");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (toTop) toTop.classList.toggle("show", y > 400);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // --- Nút lên đầu trang ---
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- Menu mobile ---
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    // Đóng menu khi bấm 1 link
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  // --- Reveal on scroll (IntersectionObserver) ---
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // --- Đếm số liệu ở hero ---
  var counters = document.querySelectorAll(".hero-stats strong[data-count]");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var start = 0;
    var duration = 1200;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = Math.floor(eased * target).toLocaleString("vi-VN");
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length && "IntersectionObserver" in window) {
    var countObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (c) { countObserver.observe(c); });
  }

  // --- Form liên hệ: validate client-side ---
  var form = document.getElementById("contactForm");
  var formMsg = document.getElementById("formMsg");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements["name"];
      var email = form.elements["email"];
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      var nameOk = name.value.trim().length >= 2;

      name.classList.toggle("invalid", !nameOk);
      email.classList.toggle("invalid", !emailOk);

      if (!nameOk || !emailOk) {
        setMsg("Vui lòng nhập họ tên và email hợp lệ.", "err");
        return;
      }
      // Không có backend — demo thành công phía client
      setMsg("Cảm ơn " + name.value.trim() + "! Chúng tôi sẽ liên hệ sớm.", "ok");
      form.reset();
    });
  }
  function setMsg(text, type) {
    if (!formMsg) return;
    formMsg.textContent = text;
    formMsg.className = "form-msg " + (type || "");
  }
})();
