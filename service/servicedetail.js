document.addEventListener("DOMContentLoaded", () => {

  const faqItems = document.querySelectorAll(".faq-card");

  faqItems.forEach(item => {

    const button = item.querySelector(".faq-question");
    const icon = item.querySelector(".faq-icon");

    button.addEventListener("click", () => {

      const isOpen = item.classList.contains("active");

      faqItems.forEach(card => {
        card.classList.remove("active");
        card.querySelector(".faq-icon").textContent = "+";
      });

      if (!isOpen) {
        item.classList.add("active");
        icon.textContent = "−";
      }

    });

  });

});