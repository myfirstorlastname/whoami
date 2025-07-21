let currentTOC = "themes"; // "themes" ou "origin"

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

      // Branche le bouton (après injection dynamique)
      const toggleBtn = document.getElementById("toc-toggle-btn");
      if (toggleBtn) {
        toggleBtn.onclick = () => {
          currentTOC = currentTOC === "themes" ? "origin" : "themes";
          loadTOC(currentTOC);
        };
      }
    });
}

// Appel initial
loadTOC(currentTOC);
