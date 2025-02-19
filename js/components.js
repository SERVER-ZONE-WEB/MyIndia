class PageComponent {
  constructor() {
    this.loadComponents();
    this.setupEventListeners();
  }

  async loadComponents() {
    const headerHtml = await this.fetchComponent(
      "/includes/components/header.html"
    );
    const footerHtml = await this.fetchComponent(
      "/includes/components/footer.html"
    );

    document.getElementById("header-placeholder").innerHTML = headerHtml;
    document.getElementById("footer-placeholder").innerHTML = footerHtml;

    this.updatePageContent();
    this.checkAuthStatus();
  }

  async fetchComponent(path) {
    const response = await fetch(path);
    return await response.text();
  }

  updatePageContent() {
    const pageName = document.querySelector('meta[name="page-name"]').content;
    const pageTitle = document.querySelector("#page-title");
    const pageDesc = document.querySelector("#page-description");

    if (pageTitle && pageDesc) {
      const content = this.getPageContent(pageName);
      pageTitle.textContent = content.title;
      pageDesc.textContent = content.description;
    }
  }

  getPageContent(pageName) {
    const contents = {
      home: {
        title: "Discover Incredible India",
        description: "A journey through culture, history, and diversity",
      },
      // ... add other pages
    };
    return contents[pageName] || contents.home;
  }

  checkAuthStatus() {
    const isLoggedIn = window.userAuth?.isLoggedIn();
    this.updateAuthButtons(isLoggedIn);
  }

  setupEventListeners() {
    document.addEventListener("authStateChanged", () => {
      this.checkAuthStatus();
    });
  }

  updateAuthButtons(isLoggedIn) {
    const loginBtn = document.querySelector("#loginBtn");
    const logoutBtn = document.querySelector("#logoutBtn");
    if (loginBtn && logoutBtn) {
      loginBtn.style.display = isLoggedIn ? "none" : "block";
      logoutBtn.style.display = isLoggedIn ? "block" : "none";
    }
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  window.pageComponent = new PageComponent();
  updateAuthButtons();
});

function updateAuthButtons() {
  const loginButton = document.getElementById("loginButton");
  const logoutButton = document.getElementById("logoutButton");
  const userDisplay = document.getElementById("userDisplay");

  const currentUser = JSON.parse(localStorage.getItem("myIndia_currentUser"));

  if (currentUser) {
    loginButton.classList.add("hidden");
    logoutButton.classList.remove("hidden");
    userDisplay.textContent = currentUser.fullName || "User";
  } else {
    loginButton.classList.remove("hidden");
    logoutButton.classList.add("hidden");
    userDisplay.textContent = "";
  }
}

function handleLogout() {
  localStorage.removeItem("myIndia_currentUser");
  updateAuthButtons();
  window.location.href = "/index.html";
}
