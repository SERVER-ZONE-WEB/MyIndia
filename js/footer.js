document.addEventListener("DOMContentLoaded", () => {
  // Add active state to current page link in footer
  const currentPath = window.location.pathname;
  document.querySelectorAll(".footer-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  // Animate social icons on hover
  document.querySelectorAll(".social-icon").forEach((icon) => {
    icon.addEventListener("mouseover", function () {
      this.style.transform = "scale(1.2) rotate(5deg)";
    });
    icon.addEventListener("mouseout", function () {
      this.style.transform = "scale(1) rotate(0)";
    });
  });
});
