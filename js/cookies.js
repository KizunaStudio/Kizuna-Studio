document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  // Bloque TOUT effet ou script externe sur ce bandeau
  banner.setAttribute("data-no-animation", "true");
  banner.classList.remove("fade-section", "visible");
  banner.style.opacity = "1";
  banner.style.transform = "none";
  banner.style.transition = "none";

  const acceptBtn = document.getElementById("accept-cookies");
  const rejectBtn = document.getElementById("reject-cookies");

  // Vérifie s'il existe déjà une décision
  const choice = localStorage.getItem("cookieConsent");
  if (choice === "accepted" || choice === "rejected") {
    banner.style.display = "none";
    return;
  }

  // Affiche le bandeau et empêche toute animation externe
  banner.style.display = "flex";
  banner.style.position = "fixed";
  banner.style.bottom = "0";
  banner.style.left = "0";
  banner.style.width = "100%";
  banner.style.zIndex = "9999";
  banner.style.pointerEvents = "auto";

  // Gestion des clics
  const closeBanner = () => {
    banner.style.transition = "opacity 0.5s ease";
    banner.style.opacity = "0";
    setTimeout(() => {
      banner.style.display = "none";
    }, 500);
  };

  acceptBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    localStorage.setItem("cookieConsent", "accepted");
    closeBanner();
  });

  rejectBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    localStorage.setItem("cookieConsent", "rejected");
    closeBanner();
  });
});
