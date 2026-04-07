
(function () {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();



document.addEventListener('click', (e) => {
  const toggleBtn = e.target.closest('#theme-toggle');
  if (!toggleBtn) return;

  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

 
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  const icon = toggleBtn.querySelector('i');
  if (icon) {
    icon.className = newTheme === 'dark'
      ? 'fas fa-sun'
      : 'fas fa-moon';
  }
});



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


  updateIcon();

 
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