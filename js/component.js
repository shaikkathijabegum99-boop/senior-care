document.addEventListener("DOMContentLoaded", async () => {
    await loadNavbar();
    await loadFooter();

    loadSavedTheme();
    loadSavedDirection();

    initNavbar();
});

/* =========================
   LOAD NAVBAR
========================= */
function loadNavbar() {
    return fetch('../components/navbar.html')
        .then(res => res.text())
        .then(data => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                navbar.innerHTML = data;
            }
        })
        .catch(err => console.error('Navbar error:', err));
}

/* =========================
   LOAD FOOTER
========================= */
function loadFooter() {
    return fetch('../components/footer.html')
        .then(res => res.text())
        .then(data => {
            const footer = document.getElementById('footer');
            if (footer) {
                footer.innerHTML = data;
            }
        })
        .catch(err => console.error('Footer error:', err));
}

/* =========================
   THEME (LOAD + APPLY)
========================= */
function loadSavedTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
}

function applyTheme(theme) {
    const body = document.body;
    const themeToggle = document.getElementById("theme-toggle");

    if (theme === "dark") {
        body.classList.add("dark-theme");
    } else {
        body.classList.remove("dark-theme");
    }

    localStorage.setItem("theme", theme);

    if (themeToggle) {
        themeToggle.innerHTML =
            theme === "dark"
                ? `<i class="fas fa-sun"></i>`
                : `<i class="fas fa-moon"></i>`;
    }
}

/* =========================
   RTL / LTR FIX
========================= */
function loadSavedDirection() {
    const savedDir = localStorage.getItem("direction") || "ltr";
    applyDirection(savedDir);
}

function applyDirection(dir) {
    const html = document.documentElement;

    html.setAttribute("dir", dir);
    localStorage.setItem("direction", dir);

    fixNavOrder(dir);
}

/* =========================
   NAV ORDER FIX (IMPORTANT)
   Home → Dashboard (LTR)
   Dashboard → Home (RTL)
========================= */
function fixNavOrder(dir) {
    const nav = document.querySelector(".nav-links");
    if (!nav) return;

    if (!nav.dataset.original) {
        nav.dataset.original = "true";
        nav._items = Array.from(nav.children);
    }

    const items = nav._items;
    nav.innerHTML = "";

    if (dir === "rtl") {
        [...items].reverse().forEach(i => nav.appendChild(i));
    } else {
        items.forEach(i => nav.appendChild(i));
    }
}

/* =========================
   INIT NAVBAR
========================= */
function initNavbar() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const themeToggle = document.getElementById("theme-toggle");
    const rtlToggle = document.getElementById("rtl-toggle");

    /* MOBILE MENU */
    hamburger?.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    /* DROPDOWN */
    document.querySelectorAll(".nav-item").forEach(item => {
        const link = item.querySelector(".nav-link");

        link?.addEventListener("click", (e) => {
            if (window.innerWidth <= 1023) {
                e.preventDefault();

                document.querySelectorAll(".nav-item").forEach(other => {
                    if (other !== item) other.classList.remove("open");
                });

                item.classList.toggle("open");
            }
        });
    });

    /* THEME TOGGLE */
    themeToggle?.addEventListener("click", () => {
        const current = localStorage.getItem("theme") || "light";
        applyTheme(current === "dark" ? "light" : "dark");
    });

    /* RTL TOGGLE */
    rtlToggle?.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("dir") || "ltr";
        applyDirection(current === "rtl" ? "ltr" : "rtl");
    });

    /* CLOSE OUTSIDE CLICK */
    document.addEventListener("click", (e) => {
        if (
            navMenu &&
            hamburger &&
            navMenu.classList.contains("active") &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
        }
    });

    /* RESET ON RESIZE */
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1023) {
            navMenu?.classList.remove("active");
            hamburger?.classList.remove("active");

            document.querySelectorAll(".nav-item").forEach(item => {
                item.classList.remove("open");
            });
        }
    });
}

