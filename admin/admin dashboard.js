document.addEventListener("DOMContentLoaded", () => {

  const themeToggle = document.getElementById("themeToggle");
  const themeMiniToggle = document.getElementById("themeMiniToggle");
  const savedTheme = localStorage.getItem("dashboard-theme") || "light";

  document.documentElement.setAttribute("data-theme", savedTheme);

  if (savedTheme === "dark") {
    themeMiniToggle?.classList.add("active");
    updateThemeIcon("dark");
  } else {
    themeMiniToggle?.classList.remove("active");
    updateThemeIcon("light");
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("dashboard-theme", next);

    updateThemeIcon(next);

    if (next === "dark") {
      themeMiniToggle?.classList.add("active");
    } else {
      themeMiniToggle?.classList.remove("active");
    }
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML =
      theme === "dark"
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
  }

  themeToggle?.addEventListener("click", toggleTheme);
  themeMiniToggle?.addEventListener("click", () => {
    themeMiniToggle.classList.toggle("active");
    toggleTheme();
  });

  const menuToggle = document.getElementById("menuToggle");
  const sidebarClose = document.getElementById("sidebarClose");
  const sidebar = document.getElementById("sidebar");

  menuToggle?.addEventListener("click", () => {
    sidebar.classList.add("show");
  });

  sidebarClose?.addEventListener("click", () => {
    sidebar.classList.remove("show");
  });

  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 900 &&
      sidebar &&
      !sidebar.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      sidebar.classList.remove("show");
    }
  });

  const notifBtn = document.getElementById("notifBtn");
  const notifDropdown = document.getElementById("notifDropdown");
  const profileBtn = document.getElementById("profileBtn");
  const profileDropdown = document.getElementById("profileDropdown");

  notifBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    notifDropdown?.classList.toggle("show");
    profileDropdown?.classList.remove("show");
  });

  profileBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    profileDropdown?.classList.toggle("show");
    notifDropdown?.classList.remove("show");
  });

  document.addEventListener("click", () => {
    notifDropdown?.classList.remove("show");
    profileDropdown?.classList.remove("show");
  });


  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));


  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const activateLink = () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", activateLink);
  activateLink();


  document.querySelectorAll(".toggle-switch").forEach((toggle) => {
    if (toggle.id !== "themeMiniToggle") {
      toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
      });
    }
  });
});