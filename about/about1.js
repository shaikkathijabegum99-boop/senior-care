document.addEventListener("DOMContentLoaded", () => {
 
  const revealItems = document.querySelectorAll(
    ".mvv-card, .choose-card, .stat-card, .highlight-item, .cta-box"
  );

  const revealOnScroll = () => {
    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }
    });
  };

  revealItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "all 0.7s ease";
  });

  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);
});


document.addEventListener("DOMContentLoaded", () => {
  revealOnScroll();
  animateCounters();
  smoothHoverTilt();
});


function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  function checkReveal() {
    const windowHeight = window.innerHeight;

    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", checkReveal);
  checkReveal();
}


function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  let started = false;

  function startCounters() {
    const statsSection = document.querySelector(".about-stats");
    if (!statsSection) return;

    const top = statsSection.getBoundingClientRect().top;
    if (top < window.innerHeight - 100 && !started) {
      started = true;

      counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = Math.ceil(target / 80);

        const updateCounter = () => {
          count += increment;
          if (count < target) {
            counter.innerText = count;
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target;
          }
        };

        updateCounter();
      });
    }
  }

  window.addEventListener("scroll", startCounters);
  startCounters();
}


function smoothHoverTilt() {
  const cards = document.querySelectorAll(".mvv-card, .choose-card, .stat-card, .highlight-item, .cta-box");

  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      if (window.innerWidth < 768) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}