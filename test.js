let currentTOC = "themes"; // Initial TOC

function loadTOC(mode) {
  const tocUrl = mode === "themes"
    ? "https://myfirstorlastname.github.io/whoami/toc_themes.html"
    : "https://myfirstorlastname.github.io/whoami/toc_origin.html";

  fetch(tocUrl)
    .then(response => response.text())
    .then(data => {
      // Inject TOC + bouton de bascule
      const toggleButton = `
        <button id="toc-toggle-btn" style="margin-bottom: 1rem; padding: 5px 10px; font-size: 0.9rem;">
          Switch to ${mode === "themes" ? "Origin View" : "Thematic View"}
        </button>
      `;
      document.getElementById("toc-container").innerHTML = toggleButton + data;

      // Highlight current page
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

      // Setup toggle
      document.getElementById("toc-toggle-btn").onclick = () => {
        currentTOC = currentTOC === "themes" ? "origin" : "themes";
        loadTOC(currentTOC);
      };
    });
}

// Appel initial
loadTOC(currentTOC);
