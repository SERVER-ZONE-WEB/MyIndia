document.addEventListener("DOMContentLoaded", () => {
  // Load header and footer from correct paths
  const loadHeader = fetch("/includes/components/header.html").then((r) =>
    r.text()
  );
  const loadFooter = fetch("/includes/components/footer.html").then((r) =>
    r.text()
  );

  Promise.all([loadHeader, loadFooter]).then(([headerHtml, footerHtml]) => {
    document.getElementById("header-placeholder").innerHTML = headerHtml;
    document.getElementById("footer-placeholder").innerHTML = footerHtml;

    const pageName = document.querySelector('meta[name="page-name"]')?.content;
    if (pageName) {
      const activeLink = document.querySelector(`a[href*="/${pageName}"]`);
      if (activeLink) activeLink.classList.add("active");
      updatePageHeader(pageName);
    }
  });
});

function updatePageHeader(pageName) {
  const titles = {
    home: "Discover Incredible India",
    history: "History of India",
    culture: "Indian Culture",
    geography: "Indian Geography",
    economy: "Indian Economy",
    politics: "Indian Politics",
    about: "About Us",
  };

  const descriptions = {
    home: "Your Guide to Incredible India",
    history: "Journey Through Time",
    culture: "Exploring India's Rich Heritage",
    geography: "Diverse Landscapes of India",
    economy: "India's Economic Growth Story",
    politics: "Understanding India's Democracy",
    about: "Learn More About Us",
  };

  const pageTitle = document.getElementById("page-title");
  const pageDescription = document.getElementById("page-description");

  if (pageTitle) pageTitle.textContent = titles[pageName] || titles.home;
  if (pageDescription)
    pageDescription.textContent = descriptions[pageName] || descriptions.home;
}
