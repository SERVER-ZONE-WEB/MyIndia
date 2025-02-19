document.addEventListener("DOMContentLoaded", () => {
  const regionData = {
    north: {
      title: "Northern India",
      features: ["Himalayas", "Indo-Gangetic Plains", "Cold Desert"],
      climate: "Varied - from Alpine to Subtropical",
      resources: ["Hydropower", "Tourism", "Agriculture"],
    },
    south: {
      title: "Southern India",
      features: ["Deccan Plateau", "Western Ghats", "Eastern Ghats"],
      climate: "Tropical",
      resources: ["Coffee", "Spices", "Technology Hubs"],
    },
    // Add east and west data
  };

  document.querySelectorAll(".region-selector button").forEach((button) => {
    button.addEventListener("click", () => {
      const region = button.dataset.region;
      updateRegionInfo(regionData[region]);
    });
  });

  function updateRegionInfo(data) {
    const infoDiv = document.getElementById("region-info");
    infoDiv.innerHTML = `
            <h3>${data.title}</h3>
            <ul>
                ${data.features.map((f) => `<li>${f}</li>`).join("")}
            </ul>
            <p><strong>Climate:</strong> ${data.climate}</p>
            <p><strong>Key Resources:</strong> ${data.resources.join(", ")}</p>
        `;
    infoDiv.classList.add("fade-up");
  }
});
