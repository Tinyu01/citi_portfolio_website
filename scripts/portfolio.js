// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-btn");
  const projectImages = document.querySelectorAll(".project-image");
  const overlay = document.getElementById("overlay");
  const enlargedImage = document.getElementById("enlarged-image");
  const closeBtn = document.querySelector(".close-btn");
  
  // Animation for project cards on page load
  animateProjectCards();
  
  // Filter projects by category
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get filter value
      const filter = button.getAttribute("data-filter");
      
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      
      // Add active class to the clicked button
      button.classList.add("active");
      
      // Filter and animate projects
      filterProjects(filter);
    });
  });
  
  // Search projects by keyword
  searchButton.addEventListener("click", searchProjects);
  
  // Also trigger search on Enter key
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchProjects();
    }
  });
  
  // Enlarge project images on click
  projectImages.forEach((imageContainer) => {
    imageContainer.addEventListener("click", () => {
      const img = imageContainer.querySelector("img");
      enlargedImage.src = img.src;
      enlargedImage.alt = img.alt;
      overlay.classList.add("active");
      
      // Disable scroll on body when overlay is active
      document.body.style.overflow = "hidden";
    });
  });
  
  // Close enlarged image
  closeBtn.addEventListener("click", closeOverlay);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeOverlay();
    }
  });
  
  // Close overlay on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeOverlay();
    }
  });
  
  // Functions
  function filterProjects(filter) {
    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      
      // Reset any existing animations
      card.style.animation = "none";
      card.offsetHeight; // Trigger reflow
      
      if (filter === "all" || category === filter) {
        card.style.display = "flex";
        // Add fade-in animation
        card.style.animation = "fadeIn 0.5s forwards";
      } else {
        card.style.display = "none";
      }
    });
  }
  
  function searchProjects() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // If search term is empty, show all projects
    if (searchTerm === "") {
      // Get current active filter
      const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-filter");
      filterProjects(activeFilter);
      return;
    }
    
    projectCards.forEach((card) => {
      const title = card.querySelector("h4").textContent.toLowerCase();
      const description = card.querySelector("p").textContent.toLowerCase();
      const tools = card.querySelectorAll(".tools-used span");
      
      // Reset any existing animations
      card.style.animation = "none";
      card.offsetHeight; // Trigger reflow
      
      // Check if search term is in title, description, or tools
      let matchFound = title.includes(searchTerm) || description.includes(searchTerm);
      
      // Also check in tools
      if (!matchFound) {
        tools.forEach((tool) => {
          if (tool.textContent.toLowerCase().includes(searchTerm)) {
            matchFound = true;
          }
        });
      }
      
      if (matchFound) {
        card.style.display = "flex";
        // Add fade-in animation
        card.style.animation = "fadeIn 0.5s forwards";
        
        // Highlight matching text
        highlightText(card, searchTerm);
      } else {
        card.style.display = "none";
      }
    });
  }
  
  function highlightText(card, searchTerm) {
    // Get elements that might contain the search term
    const title = card.querySelector("h4");
    const description = card.querySelector("p");
    
    // Temporarily store original text to restore later
    if (!title.dataset.original) {
      title.dataset.original = title.innerHTML;
    }
    if (!description.dataset.original) {
      description.dataset.original = description.innerHTML;
    }
    
    // Restore original text before highlighting new search term
    title.innerHTML = title.dataset.original;
    description.innerHTML = description.dataset.original;
    
    // Highlight text if it contains the search term
    if (title.textContent.toLowerCase().includes(searchTerm)) {
      const regex = new RegExp(searchTerm, 'gi');
      title.innerHTML = title.textContent.replace(
        regex, 
        match => `<span class="highlight">${match}</span>`
      );
    }
    
    if (description.textContent.toLowerCase().includes(searchTerm)) {
      const regex = new RegExp(searchTerm, 'gi');
      description.innerHTML = description.textContent.replace(
        regex, 
        match => `<span class="highlight">${match}</span>`
      );
    }
  }
  
  function closeOverlay() {
    overlay.classList.remove("active");
    // Re-enable scroll on body
    document.body.style.overflow = "auto";
  }
  
  function animateProjectCards() {
    projectCards.forEach((card, index) => {
      // Add a slight delay for each card to create a staggered effect
      const delay = index * 0.1;
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      
      setTimeout(() => {
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, delay * 1000);
    });
  }
  
  // Add CSS animations programmatically
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .highlight {
      background: rgba(0, 170, 255, 0.3);
      border-radius: 3px;
      padding: 0 3px;
    }
  `;
  document.head.appendChild(styleSheet);
});