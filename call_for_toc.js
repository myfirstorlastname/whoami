// Vérifie s'il existe déjà un TOC stocké dans localStorage
let currentTOC = localStorage.getItem("tocMode") || "themes";

function loadTOC(mode) {
  const tocUrl = mode === "themes"
    ? "https://myfirstorlastname.github.io/whoami/toc_themes.html"
    : "https://myfirstorlastname.github.io/whoami/toc_origin.html";

  fetch(tocUrl)
    .then(response => response.text())
    .then(data => {
      document.getElementById("toc-container").innerHTML = data;

      // Marquage du lien courant
      const currentUrl = window.location.href;
      const tocLinks = document.querySelectorAll('.toc-list a');
      tocLinks.forEach(link => {
        if (link.href === currentUrl) {
          link.classList.add('current');
          const subListItem = link.closest('li');
          if (subListItem) {
            subListItem.classList.add('current-only');
          }
        }
      });

      // Bouton de bascule après injection dynamique
      const toggleBtn = document.getElementById("toc-toggle-btn");
      if (toggleBtn) {
        toggleBtn.onclick = () => {
          // Alterne le mode
          currentTOC = currentTOC === "themes" ? "origin" : "themes";
          localStorage.setItem("tocMode", currentTOC); // Sauvegarde du choix
          loadTOC(currentTOC); // Recharge avec le nouveau mode
        };
      }
    });
}

// Chargement initial de la TOC (mémorisée)
loadTOC(currentTOC);
