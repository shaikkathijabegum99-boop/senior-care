document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(
    ".trust-item, .service-card, .why-card, .life-card, .testimonial-card, .cta-box"
  );

  revealItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "all 0.7s ease";
  });

  const revealOnScroll = () => {
    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }
    });
  };

  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);
});











document.addEventListener("DOMContentLoaded", () => {
  initRevealAnimation();
  initSmoothHoverEffects();
  initCounterOptional();
});

/* =========================
   SCROLL REVEAL
========================= */
function initRevealAnimation() {
  const revealItems = document.querySelectorAll(`
    .trust-item,
    .service-card,
    .why-card,
    .life-card,
    .testimonial-card,
    .about-grid,
    .portal-grid,
    .cta-box,
    .section-heading
  `);

  revealItems.forEach(item => item.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("active");
        }, index * 100);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach(item => observer.observe(item));
}

/* =========================
   CARD HOVER PARALLAX
========================= */
function initSmoothHoverEffects() {
  const cards = document.querySelectorAll(
    ".service-card, .why-card, .life-card, .testimonial-card, .trust-item"
  );

  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      if (window.innerWidth < 768) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* =========================
   OPTIONAL COUNTER
========================= */
function initCounterOptional() {
  const counters = document.querySelectorAll("[data-count]");

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-count");
    let current = 0;
    const increment = Math.ceil(target / 60);

    const updateCounter = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = current;
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  });
}