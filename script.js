// ============================================================
//  Thiệp cưới online — vanilla JS, không phụ thuộc thư viện
// ============================================================
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // ---- Năm ở footer ----
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Reveal on scroll ----
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // ---- Nút lên đầu trang ----
  var toTop = $("#toTop");
  window.addEventListener("scroll", function () {
    if (toTop) toTop.classList.toggle("show", window.scrollY > 500);
  }, { passive: true });
  if (toTop) toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---- Nhạc nền ----
  var music = $("#bgMusic");
  var musicBtn = $("#musicBtn");
  if (musicBtn && music) {
    musicBtn.addEventListener("click", function () {
      if (music.paused) {
        var p = music.play();
        if (p && p.catch) p.catch(function () {
          alert("Chưa có file nhạc. Hãy thêm file 'music.mp3' vào cùng thư mục.");
        });
        musicBtn.classList.add("playing");
      } else {
        music.pause();
        musicBtn.classList.remove("playing");
      }
    });
  }

  // ---- Đếm ngược ----
  var cd = $("#countdown");
  if (cd) {
    var target = new Date(cd.getAttribute("data-date")).getTime();
    var elD = $("#cd-days"), elH = $("#cd-hours"), elM = $("#cd-mins"), elS = $("#cd-secs");
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    var tick = function () {
      var diff = target - Date.now();
      if (diff < 0) diff = 0;
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      if (elD) elD.textContent = d;
      if (elH) elH.textContent = pad(h);
      if (elM) elM.textContent = pad(m);
      if (elS) elS.textContent = pad(s);
    };
    tick();
    setInterval(tick, 1000);
  }

  // ---- Album ảnh (thay link ảnh ở đây) ----
  var photos = [
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=60",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=60",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=60",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=60",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=60",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=60",
    "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=600&q=60",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=60"
  ];
  var gallery = $("#gallery");
  if (gallery) {
    photos.forEach(function (src) {
      var div = document.createElement("div");
      div.className = "g-item";
      div.style.backgroundImage = "url('" + src + "')";
      div.setAttribute("data-full", src.replace("w=600", "w=1400"));
      gallery.appendChild(div);
    });
    // Lightbox
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = '<span class="lb-close" aria-label="Đóng">&times;</span><img alt="Ảnh cưới" />';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector("img");
    gallery.addEventListener("click", function (e) {
      var item = e.target.closest(".g-item");
      if (!item) return;
      lbImg.src = item.getAttribute("data-full");
      lb.classList.add("open");
    });
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.classList.contains("lb-close")) lb.classList.remove("open");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") lb.classList.remove("open");
    });
  }

  // ---- RSVP (chỉ phía client — chưa gửi đi đâu) ----
  var rsvp = $("#rsvpForm");
  var rsvpMsg = $("#rsvpMsg");
  if (rsvp) {
    rsvp.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = rsvp.elements["name"];
      if (name.value.trim().length < 2) {
        name.classList.add("invalid");
        setMsg(rsvpMsg, "Vui lòng nhập họ tên của bạn.", "err");
        return;
      }
      name.classList.remove("invalid");
      var attend = rsvp.elements["attend"].value;
      var txt = attend === "yes"
        ? "Cảm ơn " + name.value.trim() + "! Hẹn gặp bạn tại đám cưới 🥰"
        : "Cảm ơn " + name.value.trim() + " đã phản hồi. Rất tiếc vì bạn không đến được 💛";
      setMsg(rsvpMsg, txt, "ok");
      rsvp.reset();
    });
  }

  // ---- Lời chúc (lưu localStorage) ----
  var wishForm = $("#wishForm");
  var wishList = $("#wishList");
  var STORE = "wedding_wishes";
  function loadWishes() {
    try { return JSON.parse(localStorage.getItem(STORE)) || []; }
    catch (err) { return []; }
  }
  function renderWishes(list) {
    if (!wishList) return;
    wishList.innerHTML = "";
    list.slice().reverse().forEach(function (w) {
      var li = document.createElement("li");
      li.innerHTML = '<div class="w-name"></div><div class="w-text"></div>';
      li.querySelector(".w-name").textContent = w.name;
      li.querySelector(".w-text").textContent = w.text;
      wishList.appendChild(li);
    });
  }
  var seed = [
    { name: "Gia đình hai họ", text: "Chúc hai con trăm năm hạnh phúc, sớm sinh quý tử!" },
    { name: "Nhóm bạn thân", text: "Cưới nhau đi rồi ăn cỗ nha, chúc mừng hai đứa 🎉" }
  ];
  var wishes = loadWishes();
  if (!wishes.length) { wishes = seed.slice(); }
  renderWishes(wishes);
  if (wishForm) {
    wishForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var n = wishForm.elements["wname"].value.trim();
      var t = wishForm.elements["wtext"].value.trim();
      if (n.length < 1 || t.length < 1) return;
      wishes.push({ name: n, text: t });
      try { localStorage.setItem(STORE, JSON.stringify(wishes)); } catch (err) {}
      renderWishes(wishes);
      wishForm.reset();
    });
  }

  function setMsg(el, text, type) {
    if (!el) return;
    el.textContent = text;
    el.className = "form-msg " + (type || "");
  }

  // ---- Hiệu ứng cánh hoa / trái tim rơi ----
  var petals = $("#petals");
  if (petals && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var glyphs = ["🌸", "🌿", "🍃", "🌷", "❀"];
    setInterval(function () {
      if (document.hidden) return;
      var p = document.createElement("span");
      p.className = "petal";
      p.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      p.style.left = Math.random() * 100 + "vw";
      p.style.fontSize = (0.9 + Math.random() * 1.1) + "rem";
      var dur = 6 + Math.random() * 6;
      p.style.animationDuration = dur + "s";
      petals.appendChild(p);
      setTimeout(function () { p.remove(); }, dur * 1000);
    }, 900);
  }
})();
