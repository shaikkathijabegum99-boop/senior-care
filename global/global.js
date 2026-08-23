document.addEventListener("DOMContentLoaded", () => {
    const loadedComponents = new Set();
    async function loadComponent(selector, file) {
        const element = document.querySelector(selector);
        if (!element) {
            return;
        }
        try {
            const response = await fetch(file, {
                cache: "no-cache"
            });
            if (!response.ok) {
                throw new Error(
                    `Component not found: ${file}`
                );
            }
            element.innerHTML = await response.text();
            loadedComponents.add(selector);
           
            if (selector === "#navbar") {
                initNavbar();
                setActiveNav();
            }
           
            createIcons();
        } catch (error) {
            console.error(
                `Failed to load ${file}`,
                error
            );
        }
    }
    function createIcons() {
        if (
            window.lucide &&
            typeof window.lucide.createIcons === "function"
        ) {
            try {
                window.lucide.createIcons();
            } catch (error) {
                console.error(
                    "Lucide icon initialization failed:",
                    error
                );
            }
        }
    }
    loadComponent(
        "#navbar",
        "../components/navbar.html"
    );
    loadComponent(
        "#footer",
        "../components/footer.html"
    );
    let navbarInitialized = false;
    function initNavbar() {
        if (navbarInitialized) {
            return;
        }
        const ham =
            document.getElementById("ham");
        const mobNav =
            document.getElementById("mob-nav");
        const overlay =
            document.getElementById("mob-overlay");
        const closeBtn =
            document.getElementById("mob-close");
        const themeBtn =
            document.getElementById("theme-btn");
        const rtlBtn =
            document.getElementById("rtl-btn");
        const header =
            document.querySelector(".site-header");
        
        if (!ham || !mobNav) {
            return;
        }
        navbarInitialized = true;
        const savedTheme =
            localStorage.getItem("theme");
        if (savedTheme === "dark" ||
            savedTheme === "light") {
            document.documentElement.setAttribute(
                "data-theme",
                savedTheme
            );
        }
        const savedDirection =
            localStorage.getItem("direction");
        if (
            savedDirection === "rtl" ||
            savedDirection === "ltr"
        ) {
            document.documentElement.setAttribute(
                "dir",
                savedDirection
            );
        }
        function openMenu() {
            if (!mobNav) {
                return;
            }
            mobNav.classList.add("active");
            if (overlay) {
                overlay.classList.add("active");
            }
            if (ham) {
                ham.classList.add("active");
                ham.setAttribute(
                    "aria-expanded",
                    "true"
                );
            }
            document.body.classList.add(
                "menu-open"
            );
        }
        function closeMenu() {
            if (mobNav) {
                mobNav.classList.remove("active");
            }
            if (overlay) {
                overlay.classList.remove("active");
            }
            if (ham) {
                ham.classList.remove("active");
                ham.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
            document.body.classList.remove(
                "menu-open"
            );
        }
        function toggleMenu(event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (
                mobNav.classList.contains("active")
            ) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        ham.addEventListener(
            "click",
            toggleMenu
        );
      
        if (closeBtn) {
            closeBtn.addEventListener(
                "click",
                function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    closeMenu();
                }
            );
        }
       
        if (overlay) {
            overlay.addEventListener(
                "click",
                function() {
                    closeMenu();
                }
            );
        }
       
        document.addEventListener(
            "click",
            function(event) {
                const link =
                    event.target.closest(
                        ".mob-nav a"
                    );
                if (link) {
                    closeMenu();
                }
            }
        );
        const mobDrop =
            document.querySelector(
                ".mob-dd-toggle"
            );
        const mobDropdown =
            document.querySelector(
                ".mob-dropdown"
            );
        if (
            mobDrop &&
            mobDropdown
        ) {
            mobDrop.addEventListener(
                "click",
                function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    const isOpen =
                        mobDropdown.classList.contains(
                            "active"
                        );
                    mobDropdown.classList.toggle(
                        "active",
                        !isOpen
                    );
                    mobDrop.classList.toggle(
                        "active",
                        !isOpen
                    );
                    mobDrop.setAttribute(
                        "aria-expanded",
                        String(!isOpen)
                    );
                }
            );
        }
        if (themeBtn) {
            themeBtn.addEventListener(
                "click",
                function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    const currentTheme =
                        document.documentElement.getAttribute(
                            "data-theme"
                        );
                    const newTheme =
                        currentTheme === "dark"
                            ? "light"
                            : "dark";
                    document.documentElement.setAttribute(
                        "data-theme",
                        newTheme
                    );
                    localStorage.setItem(
                        "theme",
                        newTheme
                    );
                    updateThemeIcon(
                        themeBtn,
                        newTheme
                    );
                }
            );
            const currentTheme =
                document.documentElement.getAttribute(
                    "data-theme"
                ) || "light";
            updateThemeIcon(
                themeBtn,
                currentTheme
            );
        }
        if (rtlBtn) {
            rtlBtn.addEventListener(
                "click",
                function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    const currentDirection =
                        document.documentElement.getAttribute(
                            "dir"
                        ) || "ltr";
                    const newDirection =
                        currentDirection === "rtl"
                            ? "ltr"
                            : "rtl";
                    document.documentElement.setAttribute(
                        "dir",
                        newDirection
                    );
                    localStorage.setItem(
                        "direction",
                        newDirection
                    );
                   
                    closeMenu();
                    setActiveNav();
                }
            );
        }
        function updateHeader() {
            if (!header) {
                return;
            }
            if (window.scrollY > 50) {
                header.classList.add(
                    "sticky"
                );
            } else {
                header.classList.remove(
                    "sticky"
                );
            }
        }
        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );
        updateHeader();
        let resizeTimer;
        window.addEventListener(
            "resize",
            function() {
                clearTimeout(resizeTimer);
                resizeTimer =
                    setTimeout(
                        function() {
                            const width =
                                window.innerWidth;
                           
                            if (width > 1024) {
                                closeMenu();
                            }
                            
                            createIcons();
                        },
                        150
                    );
            }
        );
        document.addEventListener(
            "keydown",
            function(event) {
                if (
                    event.key === "Escape" ||
                    event.key === "Esc"
                ) {
                    closeMenu();
                }
            }
        );
     
        ham.setAttribute(
            "aria-expanded",
            "false"
        );
    }
    function updateThemeIcon(
        button,
        theme
    ) {
        if (!button) {
            return;
        }
        const icon =
            button.querySelector("i");
        if (!icon) {
            return;
        }
        icon.classList.remove(
            "fa-moon",
            "fa-sun"
        );
        if (theme === "dark") {
            icon.classList.add(
                "fa-sun"
            );
        } else {
            icon.classList.add(
                "fa-moon"
            );
        }
    }
    function setActiveNav() {
        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase() ||
            "index.html";
      
        document.querySelectorAll(
            ".nav-links a, .nav-dropdown a, .mob-nav a"
        ).forEach(
            link => {
                link.classList.remove("act");
            }
        );
      
        document.querySelectorAll(
            ".nav-links a, .mob-nav a"
        ).forEach(
            link => {
                const href =
                    link.getAttribute("href");
                if (!href) {
                    return;
                }
                const page =
                    href
                        .split("/")
                        .pop()
                        .split("#")[0]
                        .split("?")[0]
                        .toLowerCase();
                if (
                    page === currentPage
                ) {
                    link.classList.add(
                        "act"
                    );
                }
            }
        );
      
        if (
            currentPage === "index.html" ||
            currentPage === "home2.html"
        ) {
            const homeLink =
                document.querySelector(
                    ".has-drop > a"
                );
            const mobHome =
                document.querySelector(
                    ".mob-dd-toggle"
                );
            if (homeLink) {
                homeLink.classList.add(
                    "act"
                );
            }
            if (mobHome) {
                mobHome.classList.add(
                    "act"
                );
            }
          
            document.querySelectorAll(
                ".nav-dropdown a, .mob-dropdown a"
            ).forEach(
                link => {
                    const href =
                        link.getAttribute(
                            "href"
                        );
                    if (!href) {
                        return;
                    }
                    const page =
                        href
                            .split("/")
                            .pop()
                            .split("#")[0]
                            .split("?")[0]
                            .toLowerCase();
                    if (
                        page === currentPage
                    ) {
                        link.classList.add(
                            "act"
                        );
                    }
                }
            );
        }
    }
});