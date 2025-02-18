document.addEventListener("DOMContentLoaded", () => {
  // Load components for inner pages
  async function loadPageComponents() {
    try {
      // Determine correct paths based on current page
      const isHomePage =
        window.location.pathname.endsWith("index.html") ||
        window.location.pathname.endsWith("/");
      const headerPath = isHomePage
        ? "./includes/components/header.html"
        : "./components/header.html";
      const footerPath = isHomePage
        ? "./includes/components/footer.html"
        : "./components/footer.html";

      // Load header
      const headerResponse = await fetch(headerPath);
      const headerHtml = await headerResponse.text();
      document.getElementById("header").innerHTML = headerHtml;

      // Load footer
      const footerResponse = await fetch(footerPath);
      const footerHtml = await footerResponse.text();
      document.getElementById("footer").innerHTML = footerHtml;

      // Update active tab
      setActivePage();
      setupMobileMenu();
    } catch (error) {
      console.error("Error loading components:", error);
    }
  }

  // Set active page based on current URL
  function setActivePage() {
    const currentPage = window.location.pathname.split("/").pop().toLowerCase();
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      const href = btn.getAttribute("href").toLowerCase();
      if (href.includes(currentPage)) {
        btn.classList.add("active");
      }
    });
  }

  // Mobile menu setup
  function setupMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });

      document.addEventListener("click", (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove("active");
        }
      });
    }
  }

  // Initialize if header container exists
  if (document.getElementById("header")) {
    loadPageComponents();
  }
});
