document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const city = document.getElementById("city").value.trim();
      const service = document.getElementById("service").value.trim();

      if (!fullName || !email || !phone || !city || !service) {
        formMessage.textContent = "Please fill in all required fields.";
        formMessage.style.color = "#d9534f";
        return;
      }

      formMessage.textContent = "Thank you! Your inquiry has been submitted successfully.";
      formMessage.style.color = "#4f8a10";

      form.reset();
    });
  }
});