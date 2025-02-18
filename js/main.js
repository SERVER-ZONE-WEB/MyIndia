class WebsiteController {
  constructor() {
    this.init();
  }

  async init() {
    await this.loadComponents();
    this.setupNavigation();
    this.initializePageContent();
    this.setupSearch();
  }

  async loadComponents() {
    try {
      const components = ["header", "footer"];
      const basePath = this.getBasePath();

      for (const comp of components) {
        const response = await fetch(
          `${basePath}/includes/components/${comp}.html`
        );
        if (!response.ok) throw new Error(`Failed to load ${comp}`);
        const html = await response.text();
        document.getElementById(`${comp}-placeholder`).innerHTML = html;
      }
    } catch (error) {
      console.error("Error loading components:", error);
      this.handleError(error);
    }
  }

  getBasePath() {
    // Get the correct base path depending on current page location
    const path = window.location.pathname;
    return path.includes("/pages/") ? ".." : ".";
  }

  handleError(error) {
    console.error("Application error:", error);
    const message = `
      <div class="error-message">
        <p>${error.message || "An error occurred. Please refresh the page."}</p>
      </div>
    `;
    document.body.insertAdjacentHTML("afterbegin", message);
  }

  setupNavigation() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger?.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  initializePageContent() {
    const currentPage = document.querySelector(
      'meta[name="page-name"]'
    )?.content;
    if (currentPage) {
      const pageTitle = document.getElementById("page-title");
      const pageDesc = document.getElementById("page-description");

      if (pageTitle && pageDesc) {
        const pageData = {
          history: { title: "History of India", desc: "Journey Through Time" },
          culture: {
            title: "Indian Culture",
            desc: "Rich Heritage & Traditions",
          },
          politics: { title: "Indian Politics", desc: "Democratic System" },
          geography: { title: "Indian Geography", desc: "Diverse Landscapes" },
          economy: { title: "Indian Economy", desc: "Growing Economic Power" },
        };

        const data = pageData[currentPage] || {
          title: "MyIndia.io",
          desc: "Discover Incredible India",
        };
        pageTitle.textContent = data.title;
        pageDesc.textContent = data.desc;
      }
    }
  }

  setupSearch() {
    const searchInput = document.querySelector(".search-container input");
    const searchBtn = document.querySelector(".search-container button");

    const performSearch = () => {
      const term = searchInput.value.trim().toLowerCase();
      if (term) {
        // Store search term in session storage
        sessionStorage.setItem("searchTerm", term);
        // Redirect to search results page
        window.location.href = "../pages/search.html";
      }
    };

    searchBtn?.addEventListener("click", performSearch);
    searchInput?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") performSearch();
    });
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new WebsiteController();
});
