// === Particules d'arrière-plan — Kizuna Studio ===
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particlesArray;
const numParticles = 80; // nombre de particules

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.fill();
  }

  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0)
      this.directionX = -this.directionX;
    if (this.y + this.size > canvas.height || this.y - this.size < 0)
      this.directionY = -this.directionY;

    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < numParticles; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * (innerWidth - size * 2);
    const y = Math.random() * (innerHeight - size * 2);
    const directionX = (Math.random() * 0.4) - 0.2;
    const directionY = (Math.random() * 0.4) - 0.2;

    const colors = [
      "rgba(76, 201, 240, 0.8)", // bleu clair
      "rgba(162, 89, 255, 0.8)", // violet
      "rgba(255, 255, 255, 0.3)" // léger blanc
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
}

init();
animate();
