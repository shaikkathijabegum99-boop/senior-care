const searchInput = document.getElementById("blogSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const blogCards = document.querySelectorAll(".blog-card");
const noResults = document.getElementById("noResults");

let activeCategory = "all";

function filterBlogs() {
  const searchValue = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;

  blogCards.forEach(card => {
    const category = card.getAttribute("data-category").toLowerCase();
    const title = card.querySelector("h3").textContent.toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();

    const matchesCategory = activeCategory === "all" || category === activeCategory;
    const matchesSearch =
      title.includes(searchValue) || description.includes(searchValue);

    if (matchesCategory && matchesSearch) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  noResults.style.display = visibleCount === 0 ? "block" : "none";
}

searchInput.addEventListener("input", filterBlogs);

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.getAttribute("data-category");
    filterBlogs();
  });
});

filterBlogs();