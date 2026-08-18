document.addEventListener("DOMContentLoaded", () => {
    const searchInput =
        document.getElementById("blogSearch");
    const filterButtons =
        document.querySelectorAll(".filter-btn");
    const blogCards =
        document.querySelectorAll(".blog-card");
    const noResults =
        document.getElementById("noResults");
    let activeCategory = "all";
    
    function filterBlogs() {
        if (!searchInput) return;
        const searchValue =
            searchInput.value
                .toLowerCase()
                .trim();
        let visibleCount = 0;
        blogCards.forEach(card => {
            const category =
                (
                    card.getAttribute("data-category") || ""
                ).toLowerCase();
            const titleElement =
                card.querySelector("h3");
            const descriptionElement =
                card.querySelector("p");
            const categoryElement =
                card.querySelector(".blog-category");
            const title =
                titleElement
                    ? titleElement.textContent.toLowerCase()
                    : "";
            const description =
                descriptionElement
                    ? descriptionElement.textContent.toLowerCase()
                    : "";
            const categoryText =
                categoryElement
                    ? categoryElement.textContent.toLowerCase()
                    : "";
            
            const matchesCategory =
                activeCategory === "all" ||
                category === activeCategory;
            
            const matchesSearch =
                title.includes(searchValue) ||
                description.includes(searchValue) ||
                categoryText.includes(searchValue);
            
            if (
                matchesCategory &&
                matchesSearch
            ) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });
       
        if (noResults) {
            noResults.style.display =
                visibleCount === 0
                    ? "block"
                    : "none";
        }
    }
   
    if (searchInput) {
        searchInput.addEventListener(
            "input",
            filterBlogs
        );
    }
   
    filterButtons.forEach(button => {
        button.addEventListener(
            "click",
            () => {
                filterButtons.forEach(btn => {
                    btn.classList.remove("active");
                });
                button.classList.add("active");
                activeCategory =
                    (
                        button.getAttribute(
                            "data-category"
                        ) || "all"
                    ).toLowerCase();
                filterBlogs();
            }
        );
    });
   
    filterBlogs();
});

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;
    const showNavbar = () => {
        if (navbar.innerHTML.trim() !== "") {
            navbar.classList.add("navbar-loaded");
        }
    };
    showNavbar();
    const observer = new MutationObserver(() => {
        showNavbar();
        if (navbar.innerHTML.trim() !== "") {
            observer.disconnect();
        }
    });
    observer.observe(navbar, {
        childList: true,
        subtree: true
    });
});