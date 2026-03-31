document.addEventListener("DOMContentLoaded", () => {
  // Smooth reveal animation
  const revealItems = document.querySelectorAll(
    ".why-card, .lifestyle-card, .testimonial-card, .dashboard-card, .welcome-image, .welcome-content"
  );

  const revealOnScroll = () => {
    revealItems.forEach((item) => {
      const itemTop = item.getBoundingClientRect().top;
      const triggerPoint = window.innerHeight - 80;

      if (itemTop < triggerPoint) {
        item.classList.add("show");
      }
    });
  };

  revealItems.forEach((item) => {
    item.classList.add("hidden-reveal");
  });

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});














document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initRevealAnimations();
  initSmoothHoverState();
  initActiveNavLinks();
});

/* =========================
   THEME TOGGLE + SAVE
========================= */
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  // Toggle theme
  if (themeToggle) {
    updateThemeIcon(themeToggle);

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");

      const isDark = document.body.classList.contains("dark-theme");
      localStorage.setItem("theme", isDark ? "dark" : "light");

      updateThemeIcon(themeToggle);
    });
  }
}

function updateThemeIcon(btn) {
  const isDark = document.body.classList.contains("dark-theme");
  btn.innerHTML = isDark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

/* =========================
   SCROLL REVEAL ANIMATION
========================= */
function initRevealAnimations() {
  const revealElements = document.querySelectorAll(`
    .section-heading,
    .welcome-image,
    .welcome-content,
    .why-card,
    .lifestyle-card,
    .dashboard-content,
    .dashboard-card,
    .testimonial-card,
    .cta-box
  `);

  revealElements.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("active");
          }, index * 100);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* =========================
   ACTIVE NAV LINK
========================= */
function initActiveNavLinks() {
  const navLinks = document.querySelectorAll(".nav-link");
  const currentPath = window.location.pathname.split("/").pop();

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.includes(currentPath)) {
      link.classList.add("active");
    }
  });
}

/* =========================
   SMOOTH INTERACTION
========================= */
function initSmoothHoverState() {
  const cards = document.querySelectorAll(`
    .why-card,
    .testimonial-card,
    .dashboard-card,
    .lifestyle-card,
    .mockup-item
  `);

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.willChange = "transform";
    });

    card.addEventListener("mouseleave", () => {
      card.style.willChange = "auto";
    });
  });
}