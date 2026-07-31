document.addEventListener("DOMContentLoaded", () => {
  const subscribeForm = document.querySelector(".subscribe-form");

  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector("input");
      const email = emailInput.value.trim();

      if (email === "") {
        alert("Please enter your email address.");
        return;
      }

      alert("Thank you for subscribing to Netra Vantage!");
      this.reset();
    });
  }
});