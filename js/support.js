document.addEventListener("DOMContentLoaded", function () {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // Check URL hash for default tab
  const hash = window.location.hash.slice(1) || "faq";
  showTab(hash);

  // Add active class to default tab button
  document.querySelector(`[data-tab="${hash}"]`)?.classList.add("active");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabName = btn.dataset.tab;
      showTab(tabName);
      // Update URL without reload
      history.pushState(null, "", `#${tabName}`);
    });
  });

  function showTab(tabName) {
    // Update buttons
    tabBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tabName);
    });

    // Update content sections
    tabContents.forEach((content) => {
      content.classList.toggle("active", content.id === tabName);
      content.style.display = content.id === tabName ? "block" : "none";
    });

    // Update page title based on active tab
    const titles = {
      faq: "FAQs - My India",
      contact: "Contact Us - My India",
      feedback: "Share Feedback - My India",
    };
    document.title = titles[tabName] || "Help & Support - My India";
  }

  // Handle browser back/forward
  window.addEventListener("hashchange", () => {
    const newTab = window.location.hash.slice(1) || "faq";
    showTab(newTab);
  });
});
