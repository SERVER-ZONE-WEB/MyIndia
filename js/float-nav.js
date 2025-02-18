function createFloatingNav() {
  const nav = document.createElement("nav");
  nav.className = "float-nav hidden";

  const button = document.createElement("button");
  button.className = "float-nav-button";
  button.innerHTML = '<i class="fas fa-compass"></i>';

  nav.innerHTML = `
        <ul>
            <li><a href="/index.html"><i class="fas fa-home"></i>Home</a></li>
            <li><a href="/pages/history.html"><i class="fas fa-landmark"></i>History</a></li>
            <li><a href="/pages/culture.html"><i class="fas fa-theater-masks"></i>Culture</a></li>
            <li><a href="/pages/geography.html"><i class="fas fa-mountain"></i>Geography</a></li>
            <li><a href="/pages/economy.html"><i class="fas fa-chart-line"></i>Economy</a></li>
            <li><a href="/pages/politics.html"><i class="fas fa-vote-yea"></i>Politics</a></li>
            <li><a href="/pages/about.html"><i class="fas fa-info-circle"></i>About</a></li>
        </ul>
    `;

  document.body.appendChild(button);
  document.body.appendChild(nav);

  button.addEventListener("click", () => {
    nav.classList.toggle("hidden");
  });
}

document.addEventListener("DOMContentLoaded", createFloatingNav);
