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
async function loadNavbar() {
    try {
        const res = await fetch("../components/navbar.html");
        const data = await res.text();

        const navbar = document.getElementById("navbar");

        if (navbar) {
            navbar.innerHTML = data;
        }
    } catch (err) {
        console.error("Navbar error:", err);
    }
}

/* =========================
   LOAD FOOTER
========================= */
async function loadFooter() {
    try {
        const res = await fetch("../components/footer.html");
        const data = await res.text();

        const footer = document.getElementById("footer");

        if (footer) {
            footer.innerHTML = data;
        }
    } catch (err) {
        console.error("Footer error:", err);
    }
}

/* =========================
   THEME
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
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
    }
}

/* =========================
   RTL / LTR
========================= */
function loadSavedDirection() {
    const savedDir = localStorage.getItem("direction") || "ltr";
    applyDirection(savedDir);
}

function applyDirection(dir) {
    document.documentElement.setAttribute("dir", dir);
    localStorage.setItem("direction", dir);

    fixNavOrder(dir);
}

/* =========================
   NAV ORDER FIX
========================= */
function fixNavOrder(dir) {
    const nav = document.querySelector(".nav-links");

    if (!nav) return;

    if (window.innerWidth > 1023) {
        nav.style.flexDirection =
            dir === "rtl" ? "row-reverse" : "row";
    } else {
        nav.style.flexDirection = "column";
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

    /* HAMBURGER */
    hamburger?.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu?.classList.toggle("active");
    });

    /* MOBILE DROPDOWN */
    document.querySelectorAll(".nav-item").forEach(item => {

        const link = item.querySelector(".nav-link");
        const dropdown = item.querySelector(".dropdown-menu");

        if (!dropdown) return;

        link?.addEventListener("click", (e) => {

            if (window.innerWidth <= 1023) {

                e.preventDefault();

                document.querySelectorAll(".nav-item").forEach(other => {
                    if (other !== item) {
                        other.classList.remove("open");
                    }
                });

                item.classList.toggle("open");
            }

        });
    });

    /* THEME TOGGLE */
    themeToggle?.addEventListener("click", () => {

        const currentTheme =
            localStorage.getItem("theme") || "light";

        applyTheme(
            currentTheme === "dark"
                ? "light"
                : "dark"
        );
    });

    /* RTL TOGGLE */
    rtlToggle?.addEventListener("click", () => {

        const currentDir =
            document.documentElement.getAttribute("dir") || "ltr";

        applyDirection(
            currentDir === "rtl"
                ? "ltr"
                : "rtl"
        );
    });

    /* CLOSE OUTSIDE MENU */
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

    /* RESIZE FIX */
    window.addEventListener("resize", () => {

        const dir =
            document.documentElement.getAttribute("dir") || "ltr";

        fixNavOrder(dir);

        if (window.innerWidth > 1023) {

            navMenu?.classList.remove("active");
            hamburger?.classList.remove("active");

            document.querySelectorAll(".nav-item").forEach(item => {
                item.classList.remove("open");
            });
        }
    });

    /* INITIAL FIX */
    const dir =
        document.documentElement.getAttribute("dir") || "ltr";

    fixNavOrder(dir);
}

function fixNavOrder(dir) {
    const nav = document.querySelector(".nav-links");
    if (!nav) return;

    if (!nav.dataset.saved) {
        nav.dataset.saved = "true";
        nav.originalItems = [...nav.children];
    }

    const items = nav.originalItems;

    nav.innerHTML = "";

    if (dir === "rtl") {
        [...items].reverse().forEach(item => nav.appendChild(item));
    } else {
        items.forEach(item => nav.appendChild(item));
    }
}


/* =========================
   RTL / LTR NAV FIX
========================= */
function fixNavOrder(dir) {
    const navLinks = document.querySelector(".nav-links");
    const navContainer = document.querySelector(".nav-container");
    const logoBox = document.querySelector(".logo-box");
    const headerActions = document.querySelector(".header-actions");

    if (!navLinks || !navContainer) return;

    if (dir === "rtl") {
        navLinks.style.flexDirection = window.innerWidth > 1023
            ? "row-reverse"
            : "column";

        navContainer.style.flexDirection = "row-reverse";

        if (logoBox) logoBox.style.flexDirection = "row-reverse";
        if (headerActions) headerActions.style.flexDirection = "row-reverse";

    } else {
        navLinks.style.flexDirection = window.innerWidth > 1023
            ? "row"
            : "column";

        navContainer.style.flexDirection = "row";

        if (logoBox) logoBox.style.flexDirection = "row";
        if (headerActions) headerActions.style.flexDirection = "row";
    }
}