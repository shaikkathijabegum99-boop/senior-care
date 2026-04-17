
const themeToggle = document.getElementById("themeToggle");
const body = document.body;


if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-theme");
  if (themeToggle) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");

    if (body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
}


const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    togglePassword.innerHTML =
      type === "password"
        ? '<i class="fas fa-eye"></i>'
        : '<i class="fas fa-eye-slash"></i>';
  });
}

const signinForm = document.getElementById("signinForm");

if (signinForm) {
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    alert("Sign in successful! Redirecting to dashboard...");


  });
}

const visitForm = document.getElementById("visitForm");

if (visitForm) {
  visitForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("visitEmail").value.trim();
    const location = document.getElementById("location").value;
    const visitDate = document.getElementById("visitDate").value;
    const visitTime = document.getElementById("visitTime").value;
    const visitType = document.getElementById("visitType").value;

    if (!fullName || !phone || !email || !location || !visitDate || !visitTime || !visitType) {
      alert("Please complete all required fields.");
      return;
    }

    alert("Your visit has been booked successfully! Our team will contact you shortly.");
    visitForm.reset();
  });
}

const rtlToggle = document.getElementById("rtlToggle");


if (localStorage.getItem("rtl") === "true") {
  document.body.classList.add("rtl");
}

rtlToggle.addEventListener("click", () => {
  document.body.classList.toggle("rtl");

  if (document.body.classList.contains("rtl")) {
    localStorage.setItem("rtl", "true");
  } else {
    localStorage.setItem("rtl", "false");
  }
});