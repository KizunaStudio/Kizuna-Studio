// === main.js — Kizuna Studio ===

document.addEventListener("DOMContentLoaded", () => {

  /* === MENU BURGER === */
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  /* === SCROLL FLUID === */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: "smooth"
        });
        navLinks.classList.remove("active");
      }
    });
  });

  /* === ANIMATION APPARITION SECTIONS === */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".fade-section").forEach(section => {
    observer.observe(section);
  });

  /* === EFFET NEON SUR LE LOGO AU CHARGEMENT === */
  const logo = document.querySelector(".hero-logo");
  if (logo) {
    logo.style.opacity = 0;
    logo.style.transform = "scale(0.9)";
    setTimeout(() => {
      logo.style.transition = "all 1.5s ease";
      logo.style.opacity = 1;
      logo.style.transform = "scale(1)";
      logo.style.filter = "drop-shadow(0 0 20px rgba(76,201,240,0.4))";
    }, 500);
  }

});

// === BOUTON RETOUR HAUT ===
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.style.display = "flex";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
