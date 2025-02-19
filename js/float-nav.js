function createFloatingNav() {
  const nav = document.createElement("nav");
  nav.className = "float-nav hidden";

  const button = document.createElement("button");
  button.className = "float-nav-button";
  button.innerHTML = '<i class="fas fa-compass"></i>';

  const currentPath = window.location.pathname.toLowerCase();

  const links = [
    { url: "/index.html", icon: "home", text: "Home" },
    { url: "/pages/history.html", icon: "landmark", text: "History" },
    { url: "/pages/culture.html", icon: "theater-masks", text: "Culture" },
    { url: "/pages/geography.html", icon: "mountain", text: "Geography" },
    { url: "/pages/economy.html", icon: "chart-line", text: "Economy" },
    { url: "/pages/politics.html", icon: "vote-yea", text: "Politics" },
    { url: "/pages/about.html", icon: "info-circle", text: "About" },
  ];

  nav.innerHTML = `
        <ul>
            ${links
              .map(
                (link) => `
                <li>
                    <a href="${link.url}" class="${
                  currentPath.endsWith(link.url.toLowerCase()) ? "active" : ""
                }">
                        <i class="fas fa-${link.icon}"></i>${link.text}
                    </a>
                </li>
            `
              )
              .join("")}
        </ul>
    `;

  document.body.appendChild(button);
  document.body.appendChild(nav);

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !button.contains(e.target)) {
      nav.classList.add("hidden");
    }
  });
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", createFloatingNav);
