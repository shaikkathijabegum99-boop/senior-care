/* ==========================================================
   GLOBAL.JS (FIXED)
   Theme + RTL + Navbar + Sticky Header
========================================================== */

document.addEventListener("DOMContentLoaded", async () => {

    await Promise.all([
        loadComponent("navbar", "../components/navbar.html"),
        loadComponent("footer", "../components/footer.html")
    ]);

    initTheme();
    initDirection();
    initNavbar();
    setActiveMenu();
    initStickyHeader();
});


/* ==========================================================
   LOAD COMPONENTS
========================================================== */

async function loadComponent(id, path) {

    const element = document.getElementById(id);
    if (!element) return;

    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load ${path}`);

        element.innerHTML = await response.text();

    } catch (error) {
        console.error(error);
    }
}


/* ==========================================================
   THEME
========================================================== */

function initTheme() {

    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    const themeBtn = document.getElementById("theme-toggle");

    themeBtn?.addEventListener("click", () => {

        const current = localStorage.getItem("theme") || "light";

        applyTheme(current === "dark" ? "light" : "dark");
    });
}

function applyTheme(theme) {

    document.body.classList.toggle("dark-theme", theme === "dark");

    localStorage.setItem("theme", theme);

    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {

    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    btn.innerHTML =
        theme === "dark"
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
}


/* ==========================================================
   RTL / LTR
========================================================== */

function initDirection() {

    const savedDir = localStorage.getItem("direction") || "ltr";
    applyDirection(savedDir);

    const rtlBtn = document.getElementById("rtl-toggle");

    rtlBtn?.addEventListener("click", () => {

        const current =
            document.documentElement.getAttribute("dir") || "ltr";

        applyDirection(current === "rtl" ? "ltr" : "rtl");
    });
}

function applyDirection(dir) {

    document.documentElement.setAttribute("dir", dir);
    localStorage.setItem("direction", dir);

    updateRTLIcon(dir);
    fixNavbarRTL(dir);
}

function updateRTLIcon(dir) {

    const btn = document.getElementById("rtl-toggle");
    if (!btn) return;

    btn.innerHTML = '<i class="fas fa-right-left"></i>';

    const icon = btn.querySelector("i");

    if (icon) {
        icon.style.transform = dir === "rtl" ? "rotate(180deg)" : "rotate(0deg)";
        icon.style.transition = "0.3s ease";
    }
}


/* ==========================================================
   FIX NAVBAR RTL (SAFE)
========================================================== */

function fixNavbarRTL(dir) {

    const navLinks = document.querySelector(".nav-links");
    if (!navLinks) return;

    if (!navLinks._originalItems) {
        navLinks._originalItems = Array.from(navLinks.children);
    }

    const items = navLinks._originalItems;

    navLinks.innerHTML = "";

    if (dir === "rtl" && window.innerWidth >= 1024) {
        [...items].reverse().forEach(item => navLinks.appendChild(item));
    } else {
        items.forEach(item => navLinks.appendChild(item));
    }
}


/* ==========================================================
   ACTIVE MENU
========================================================== */

function setActiveMenu() {

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-link").forEach(link => {

        const href = link.getAttribute("href");
        if (!href) return;

        const page = href.split("/").pop();

        link.classList.toggle("active", page === currentPage);
    });
}


/* ==========================================================
   NAVBAR + HAMBURGER
========================================================== */

function initNavbar() {

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (!hamburger || !navLinks) return;

    /* Hamburger Toggle (FIXED) */
    hamburger.addEventListener("click", () => {

        const isActive = hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");

        hamburger.setAttribute("aria-expanded", isActive);
    });

    /* Dropdown (Mobile) */
    document.querySelectorAll(".has-dropdown").forEach(item => {

        const link = item.querySelector(".nav-link");

        link?.addEventListener("click", (e) => {

            if (window.innerWidth <= 1023) {

                e.preventDefault();

                document.querySelectorAll(".has-dropdown")
                    .forEach(other => {
                        if (other !== item) {
                            other.classList.remove("open");
                        }
                    });

                item.classList.toggle("open");
            }
        });
    });

    /* Close on outside click */
    document.addEventListener("click", (e) => {

        if (
            navLinks.classList.contains("active") &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", false);
        }
    });

    /* Resize reset */
    window.addEventListener("resize", () => {

        const dir = document.documentElement.getAttribute("dir") || "ltr";
        fixNavbarRTL(dir);

        if (window.innerWidth >= 1024) {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", false);

            document.querySelectorAll(".has-dropdown")
                .forEach(item => item.classList.remove("open"));
        }
    });
}


/* ==========================================================
   STICKY HEADER
========================================================== */

function initStickyHeader() {

    const header = document.querySelector(".site-header");
    if (!header) return;

    const handleScroll = () => {
        header.classList.toggle("scrolled", window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
}