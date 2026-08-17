
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


    /*
    ==========================================================
    FILTER BLOGS
    ==========================================================
    */

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


            /*
            --------------------------------------------------
            CATEGORY MATCH
            --------------------------------------------------
            */

            const matchesCategory =
                activeCategory === "all" ||
                category === activeCategory;


            /*
            --------------------------------------------------
            SEARCH MATCH
            --------------------------------------------------
            */

            const matchesSearch =
                title.includes(searchValue) ||
                description.includes(searchValue) ||
                categoryText.includes(searchValue);


            /*
            --------------------------------------------------
            SHOW / HIDE
            --------------------------------------------------
            */

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


        /*
        ------------------------------------------------------
        NO RESULTS
        ------------------------------------------------------
        */

        if (noResults) {

            noResults.style.display =
                visibleCount === 0
                    ? "block"
                    : "none";

        }

    }


    /*
    ==========================================================
    SEARCH
    ==========================================================
    */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterBlogs
        );

    }


    /*
    ==========================================================
    CATEGORY FILTER
    ==========================================================
    */

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


    /*
    ==========================================================
    INITIAL FILTER
    ==========================================================
    */

    filterBlogs();

});

/*==================================================
NAVBAR LOAD — PREVENT LOGO FLASH
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    const showNavbar = () => {
        if (navbar.innerHTML.trim() !== "") {
            navbar.classList.add("navbar-loaded");
        }
    };

    /* Check immediately */
    showNavbar();

    /* Watch dynamically loaded navbar */
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