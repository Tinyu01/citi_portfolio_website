// JavaScript for filtering and searching projects
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-btn");
  
    // Filter projects by category
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
  
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // Add active class to the clicked button
        button.classList.add("active");
  
        // Filter projects
        projectCards.forEach((card) => {
          const category = card.getAttribute("data-category");
          if (filter === "all" || category === filter) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  
    // Search projects by keyword
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value.toLowerCase();
  
      projectCards.forEach((card) => {
        const title = card.querySelector("h4").textContent.toLowerCase();
        const description = card.querySelector("p").textContent.toLowerCase();
  
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });