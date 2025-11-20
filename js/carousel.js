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
