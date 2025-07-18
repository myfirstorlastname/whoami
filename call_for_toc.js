fetch("https://myfirstorlastname.github.io/whoami/toc.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("toc-container").innerHTML = data;

    // === Ajout logique "current" après injection de la TOC ===
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
  });
