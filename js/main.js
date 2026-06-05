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

/* ==========================
   MINI-JEU KIZUNA
========================== */

const steps = document.querySelectorAll(".game-step");
const result = document.getElementById("gameResult");
const resultText = document.getElementById("resultText");
const progressBar = document.getElementById("progressBar");
const restartBtn = document.getElementById("restartGame");

let currentStep = 0;
let answers = [];

const resultMessages = [
  "Tu sembles avoir besoin d'une identité visuelle forte. Un logo professionnel et une présence en ligne cohérente seraient un excellent point de départ.",
  "Ton activité gagnerait à renforcer sa visibilité grâce à un site web moderne et une communication adaptée.",
  "Tu possèdes déjà de bonnes bases. Une stratégie de contenu et quelques supports de communication pourraient faire la différence.",
  "Ton projet est déjà bien avancé. L'objectif est maintenant de valoriser ton image et développer ton audience."
];

steps.forEach(step => {

  const buttons = step.querySelectorAll("button");

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      answers.push(button.dataset.value);

      step.classList.remove("active");

      currentStep++;

      progressBar.style.width =
        ((currentStep) / steps.length) * 100 + "%";

      if (currentStep < steps.length) {

        steps[currentStep].classList.add("active");

      } else {

        showResult();

      }

    });

  });

});

function showResult() {

  result.classList.add("active");

  let score = 0;

  answers.forEach(answer => {

    if (
      answer === "clients" ||
      answer === "visibilite" ||
      answer === "site" ||
      answer === "moderne"
    ) {
      score++;
    }

  });

  if (score <= 1) {

    resultText.textContent = resultMessages[0];

  } else if (score === 2) {

    resultText.textContent = resultMessages[1];

  } else if (score === 3) {

    resultText.textContent = resultMessages[2];

  } else {

    resultText.textContent = resultMessages[3];

  }

}

if (restartBtn && progressBar && result && steps.length > 0) {

  restartBtn.addEventListener("click", () => {

    currentStep = 0;
    answers = [];

    progressBar.style.width = "0%";

    result.classList.remove("active");

    steps.forEach(step => {
      step.classList.remove("active");
    });

    steps[0].classList.add("active");

  });

}

/* ==========================
   ROUE BONUS KIZUNA
========================== */

/* ==========================
   ROUE BONUS KIZUNA
========================== */

const wheel = document.getElementById("kizunaWheel");
const spinBtn = document.getElementById("spinWheel");
const wheelResult = document.getElementById("wheelResult");
const claimBonus = document.getElementById("claimBonus");

const bonuses = [
  "Audit gratuit de votre présence en ligne",
  "Checklist pour lancer votre site web",
  "Conseils Instagram personnalisés",
  "Mini diagnostic identité visuelle",
  "-5% sur la création d’un logo",
  "-5% sur une affiche ou un flyer",
  "Conseil gratuit sur votre nom de domaine",
  "Astuce marketing personnalisée"
];

let wheelRotation = 0;
let hasSpun = localStorage.getItem("kizunaWheelPlayed") === "true";
let savedBonus = localStorage.getItem("kizunaBonus");

if (hasSpun && spinBtn && wheelResult && claimBonus) {
  spinBtn.disabled = true;
  spinBtn.textContent = "Bonus déjà débloqué";
  wheelResult.textContent = `🎁 Votre bonus : ${savedBonus}`;
  claimBonus.href = `contact.html?bonus=${encodeURIComponent(savedBonus)}`;
  claimBonus.classList.add("active");
}

if (spinBtn && wheel && wheelResult && claimBonus) {
  spinBtn.addEventListener("click", () => {
    if (hasSpun) return;

    hasSpun = true;
    spinBtn.disabled = true;
    wheelResult.textContent = "";
    claimBonus.classList.remove("active");

    const randomIndex = Math.floor(Math.random() * bonuses.length);
    const degreesPerSlice = 360 / bonuses.length;
    const extraTurns = 5 * 360;

    const targetRotation =
      extraTurns + 360 - (randomIndex * degreesPerSlice + degreesPerSlice / 2);

    wheelRotation += targetRotation;
    wheel.style.transform = `rotate(${wheelRotation}deg)`;

    setTimeout(() => {
      const bonus = bonuses[randomIndex];

      localStorage.setItem("kizunaWheelPlayed", "true");
      localStorage.setItem("kizunaBonus", bonus);

      wheelResult.textContent = `🎉 Félicitations ! Vous avez gagné : ${bonus}`;
      claimBonus.href = `contact.html?bonus=${encodeURIComponent(bonus)}`;
      claimBonus.classList.add("active");
      spinBtn.textContent = "Bonus débloqué";
    }, 4200);
  });
}

/* ==========================
   BONUS KIZUNA
========================== */

const params = new URLSearchParams(window.location.search);
const bonus = params.get("bonus");

if (bonus) {

  const bonusInput =
    document.getElementById("bonus");

  const bonusMessage =
    document.getElementById("bonusMessage");

  if (bonusInput) {
    bonusInput.value = bonus;
  }

  if (bonusMessage) {
    bonusMessage.style.display = "block";
    bonusMessage.textContent =
      `🎁 Bonus débloqué : ${bonus}`;
  }

}

/* ==========================
   COLLABORATION INTERACTIVE
========================== */

window.addEventListener("load", () => {
  const collabCards = document.querySelectorAll(".collab-card");
  const collabResult = document.getElementById("collabResult");

  if (!collabCards.length || !collabResult) return;

  collabCards.forEach(card => {
    card.addEventListener("click", (e) => {
      e.preventDefault();

      collabCards.forEach(item => item.classList.remove("active"));
      card.classList.add("active");

      collabResult.innerHTML = card.getAttribute("data-text");
    });
  });
});

/* ==========================
   FORMULAIRE CONTACT MULTI-ÉTAPES
========================== */

document.addEventListener("DOMContentLoaded", () => {
  const formSteps = document.querySelectorAll(".form-step");
  const projectButtons = document.querySelectorAll(".choice-btn");
  const budgetButtons = document.querySelectorAll(".budget-btn");
  const projectInput = document.getElementById("projectInput");
  const budgetInput = document.getElementById("budgetInput");
  const progressBar = document.getElementById("formProgressBar");
  const backBtn = document.getElementById("formBack");

  let formCurrentStep = 0;

  function showFormStep(index) {
    formSteps.forEach(step => step.classList.remove("active"));
    formSteps[index].classList.add("active");

    if (progressBar) {
      progressBar.style.width = ((index + 1) / formSteps.length) * 100 + "%";
    }
  }

  if (formSteps.length > 0) {
    showFormStep(formCurrentStep);
  }

  projectButtons.forEach(button => {
    button.addEventListener("click", () => {
      projectInput.value = button.dataset.project;
      formCurrentStep = 1;
      showFormStep(formCurrentStep);
    });
  });

  budgetButtons.forEach(button => {
    button.addEventListener("click", () => {
      budgetInput.value = button.dataset.budget;
      formCurrentStep = 2;
      showFormStep(formCurrentStep);
    });
  });

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (formCurrentStep > 0) {
        formCurrentStep--;
        showFormStep(formCurrentStep);
      }
    });
  }
});
