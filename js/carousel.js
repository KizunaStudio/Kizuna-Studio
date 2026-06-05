const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.portfolio-card');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let index = 0;
let cardWidth;

// Fonction pour recalculer la largeur visible d’une carte
function updateCardWidth() {
  if (cards.length > 0) {
    cardWidth = cards[0].getBoundingClientRect().width + 32; // marge entre cartes
  }
}

function moveCarousel() {
  updateCardWidth();
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

// Boutons navigation
nextBtn.addEventListener('click', () => {
  index = (index + 1) % cards.length;
  moveCarousel();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + cards.length) % cards.length;
  moveCarousel();
});

// Auto-défilement
setInterval(() => {
  index = (index + 1) % cards.length;
  moveCarousel();
}, 5000);

// Recalcul automatique si la fenêtre change de taille
window.addEventListener('resize', moveCarousel);

// Initialisation
updateCardWidth();
moveCarousel();

/* ==========================
   FILTRES PORTFOLIO
========================== */

/* ==========================
   FILTRES PORTFOLIO
========================== */

const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");
const galleryItems = document.querySelectorAll(".gallery-item");

const carouselContainer = document.querySelector(".carousel-container");
const gallerySection = document.querySelector(".logos");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    if (filter === "all") {
      carouselContainer.style.display = "block";
      gallerySection.style.display = "block";
    } else if (filter === "site") {
      carouselContainer.style.display = "block";
      gallerySection.style.display = "none";
    } else {
      carouselContainer.style.display = "none";
      gallerySection.style.display = "block";
    }

    portfolioCards.forEach(card => {
      if (filter === "all" || card.dataset.category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    galleryItems.forEach(item => {
      if (filter === "all" || item.dataset.category === filter) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});

/* ==========================
   LIGHTBOX GALERIE
========================== */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.querySelector(".lightbox-close");

galleryItems.forEach(item => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("active");
  });
});

closeLightbox.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});
