/* =========================================================
   🌍 GLOBAL THEME SYSTEM JS
   Works with dynamic navbar loading ✅
   ========================================================= */

// ✅ Apply saved theme immediately on page load
(function () {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();


// ✅ Handle Theme Toggle (works even if navbar loads later)
document.addEventListener('click', (e) => {
  const toggleBtn = e.target.closest('#theme-toggle');
  if (!toggleBtn) return;

  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  // Set new theme
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  // Update icon
  const icon = toggleBtn.querySelector('i');
  if (icon) {
    icon.className = newTheme === 'dark'
      ? 'fas fa-sun'
      : 'fas fa-moon';
  }
});


// ✅ Update icon on page load (after navbar is rendered)
document.addEventListener('DOMContentLoaded', () => {
  const updateIcon = () => {
    const toggleBtn = document.querySelector('#theme-toggle');
    if (!toggleBtn) return;

    const icon = toggleBtn.querySelector('i');
    if (!icon) return;

    const currentTheme = document.documentElement.getAttribute('data-theme');

    icon.className = currentTheme === 'dark'
      ? 'fas fa-sun'
      : 'fas fa-moon';
  };

  // Run once
  updateIcon();

  // Run again after delay (for dynamic navbar)
  setTimeout(updateIcon, 500);
});



const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});