// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.classList.add('dark-mode');
  }
  
  // Theme toggle click event
  themeToggle.addEventListener('click', function() {
    // Toggle dark mode class
    body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
  
  // Active link highlighting
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Set active link based on current page
  function setActiveLink() {
    const currentLocation = window.location.pathname;
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Remove active class from all links
      link.classList.remove('active');
      
      // Check for exact match or hash links on index page
      if (href === currentLocation || 
         (currentLocation.includes('index.html') || currentLocation === '/' || currentLocation.endsWith('/')) && href.startsWith('#')) {
        link.classList.add('active');
      }
    });
  }
  
  setActiveLink();
  
  // For single page navigation with hash links
  window.addEventListener('hashchange', function() {
    const currentHash = window.location.hash;
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentHash) {
        link.classList.add('active');
      }
    });
  });
  
  // Add smooth hover effect for navbar items
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Set up the glitch effect
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    heroTitle.setAttribute('data-text', heroTitle.textContent);
    
    // Random glitch effect
    setInterval(() => {
      if (Math.random() > 0.95) {
        heroTitle.classList.add('active-glitch');
        setTimeout(() => {
          heroTitle.classList.remove('active-glitch');
        }, 200);
      }
    }, 500);
  }
  
  // Typewriter effect
  const typewriterElement = document.getElementById('typewriter');
  if (typewriterElement) {
    const roles = [
      'Software Engineer',
      'UX Designer',
      'Graphics Designer',
      'Database Administrator',
      'IT Specialist',
      'Project Manager'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        // Deleting text
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Faster when deleting
      } else {
        // Typing text
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100; // Normal speed when typing
      }
      
      // Logic to move to next role
      if (!isDeleting && charIndex === currentRole.length) {
        // Finished typing current role
        isDeleting = true;
        typingSpeed = 1000; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting current role
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length; // Move to next role
        typingSpeed = 500; // Pause before typing next word
      }
      
      setTimeout(typeWriter, typingSpeed);
    }
    
    // Start the typewriter effect
    setTimeout(typeWriter, 1000);
  }
  
  // Scroll animation for CTA buttons
  const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Only apply smooth scroll for anchor links within the page
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for navbar height
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Parallax effect on scroll
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && scrollPosition < heroSection.offsetHeight) {
      // Move the background pattern slightly for parallax effect
      const bgPattern = document.querySelector('.hero-bg-pattern');
      if (bgPattern) {
        bgPattern.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }
      
      // Fade out content slightly as user scrolls down
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        const opacity = 1 - (scrollPosition / (heroSection.offsetHeight * 0.8));
        heroContent.style.opacity = Math.max(opacity, 0.1);
      }
    }
  });
  
  // Add hover effects to tech badges
  const techBadges = document.querySelectorAll('.tech-badge');
  techBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    badge.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Theme compatibility - update colors when theme changes
  function checkTheme() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const root = document.documentElement;
    
    if (isDarkMode) {
      root.style.setProperty('--hero-text-color', 'var(--text-light)');
      root.style.setProperty('--hero-bg-gradient', 'var(--gradient-dark)');
    } else {
      root.style.setProperty('--hero-text-color', 'var(--text-dark)');
      root.style.setProperty('--hero-bg-gradient', 'var(--gradient-light)');
    }
  }
  
  // Run on load
  checkTheme();
  
  // Check for theme changes (if theme toggle exists from your navbar code)
  if (themeToggle) {
    themeToggle.addEventListener('click', checkTheme);
  }

  // Initialize tilt effect for Quick Links cards
  VanillaTilt.init(document.querySelectorAll(".card[data-tilt]"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
  });

  // Filter functionality for Skills and Technologies section
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillItems = document.querySelectorAll('.skill-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Get filter value
      const filterValue = this.getAttribute('data-filter');

      // Filter skill items with animation
      skillItems.forEach(item => {
        const category = item.getAttribute('data-category');

        // Reset classes
        item.classList.remove('hidden', 'fade-out');

        // Apply filtering
        if (filterValue !== 'all' && category !== filterValue) {
          // First fade out with animation
          item.classList.add('fade-out');

          // Then hide after animation completes
          setTimeout(() => {
            item.classList.add('hidden');
          }, 600);
        }
      });
    });
  });

  // Animate progress bars on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // When skills section is visible, add animation class to all skill items
        skillItems.forEach((item, index) => {
          // Add staggered delay for smoother animation
          setTimeout(() => {
            item.classList.add('animated');
          }, index * 100);
        });

        // Disconnect observer after animation is triggered
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  // Observe the skills section
  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    observer.observe(skillsSection);
  }

  // Add hover effects and interaction
  skillItems.forEach(item => {
    const skillCard = item.querySelector('.skill-card');
    const progressFill = item.querySelector('.progress-fill');
    const skillName = item.getAttribute('data-skill');

    if (skillCard) {
      skillCard.addEventListener('mouseenter', function() {
        // Optional: Customize hover effects based on skill
        skillCard.style.borderColor = getSkillColor(skillName);
      });

      skillCard.addEventListener('mouseleave', function() {
        skillCard.style.borderColor = '';
      });
    }

    // Customize progress bar colors based on skill
    if (progressFill) {
      progressFill.style.background = getSkillColor(skillName);
    }
  });

  // Helper function to get skill-specific colors
  function getSkillColor(skill) {
    const colors = {
      javascript: '#F7DF1E',
      python: '#3776AB',
      react: '#61DAFB',
      nodejs: '#339933',
      aws: '#FF9900',
      docker: '#2496ED',
      default: 'var(--accent-color)'
    };

    return colors[skill] || colors.default;
  }

  // Optional: Add "View All Skills" button functionality
  const viewAllButton = document.querySelector('.view-all-skills .btn');
  if (viewAllButton) {
    viewAllButton.addEventListener('click', function() {
      
    });
  }

  // Initialize any skill-specific tooltips or popups
  initializeSkillTooltips();

  function initializeSkillTooltips() {
    skillItems.forEach(item => {
      const skillName = item.getAttribute('data-skill');
      const skillDescription = getSkillDescription(skillName);

      // Optional: Add tooltip functionality if needed
      if (skillDescription) {
        item.setAttribute('title', skillDescription);
        
      }
    });
  }

  function getSkillDescription(skill) {
    const descriptions = {
      javascript: 'A high-level, interpreted programming language that conforms to the ECMAScript specification.',
      python: 'A high-level, general-purpose programming language known for its readability and versatility.',
      react: 'A JavaScript library for building user interfaces, particularly single-page applications.',
      nodejs: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine for server-side applications.',
      aws: 'Amazon Web Services - a comprehensive cloud computing platform.',
      docker: 'A platform for developing, shipping, and running applications in containers.',
      
    };

    return descriptions[skill] || '';
  }

  // Collapse navbar on link click
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    });
  });
});

// Carousel Initialization
const projectCarousel = new bootstrap.Carousel('#projectCarousel');
const testimonialCarousel = new bootstrap.Carousel('#testimonialCarousel');

// Enlarge Project Image
document.querySelectorAll('.project-image').forEach(imageContainer => {
  imageContainer.addEventListener('click', () => {
    const img = imageContainer.querySelector('img');
    const enlargedDiv = document.createElement('div');
    enlargedDiv.classList.add('project-image', 'enlarged');
    enlargedDiv.innerHTML = `
      <img src="${img.src}" alt="${img.alt}">
      <span class="close-enlarged">&times;</span>
    `;
    document.body.appendChild(enlargedDiv);

    enlargedDiv.querySelector('.close-enlarged').addEventListener('click', () => {
      document.body.removeChild(enlargedDiv);
    });
  });
});

// Enlarge Project Image
document.querySelectorAll('.project-image img').forEach(image => {
  image.addEventListener('click', () => {
    const enlargedDiv = document.createElement('div');
    enlargedDiv.classList.add('enlarged-image-container');
    enlargedDiv.innerHTML = `
      <div class="enlarged-image-overlay"></div>
      <div class="enlarged-image-content">
        <img src="${image.src}" alt="${image.alt}">
        <span class="close-enlarged">&times;</span>
      </div>
    `;
    document.body.appendChild(enlargedDiv);

    enlargedDiv.querySelector('.close-enlarged').addEventListener('click', () => {
      document.body.removeChild(enlargedDiv);
    });

    enlargedDiv.querySelector('.enlarged-image-overlay').addEventListener('click', () => {
      document.body.removeChild(enlargedDiv);
    });
  });
});

// current year
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.querySelector('.year');
  yearSpan.textContent = new Date().getFullYear();
});

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  if (name && email && subject && message) {
    alert('Thank you for your message!');
    
  } else {
    alert('Please fill in all fields.');
  }
});

const chatbotBody = document.getElementById('chatbot-body');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotWindow = document.querySelector('.chatbot-window');
const sendButton = document.getElementById('send-button');

if (chatbotBody && chatbotInput && chatbotWindow && sendButton) {
  const responses = {
    "skills": "Masingita specializes in Software Engineering, UX Design, Database Administration, Cybersecurity, and Project Management.",
    "projects": "Masingita has worked on projects like an E-Commerce Platform, a Task Management App, and a Restaurant Branding project. Would you like more details about any of these?",
    "experience": "Masingita has experience as an ICT Intern at Collins Chabane Local Municipality and as a Freelance Software Engineer at Maltech Digital Solutions.",
    "education": "Masingita holds a Bachelor of Science in Information Technology from the University of Venda.",
    "contact": "You can reach out via email at info@masingitamaluleke.com or connect on LinkedIn at https://www.linkedin.com/in/thefreelancer201/."
  };

  function toggleChatbot() {
    chatbotWindow.classList.toggle('active');
  }

  function sendMessage() {
    const userMessage = chatbotInput.value.trim();
    if (userMessage) {
      addMessage(userMessage, 'user-message');
      chatbotInput.value = '';
      setTimeout(() => {
        const botResponse = getResponse(userMessage);
        addMessage(botResponse, 'bot-message');
      }, 500);
    }
  }

  function addMessage(message, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${className}`;
    messageDiv.textContent = message;
    chatbotBody.appendChild(messageDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  function getResponse(message) {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes('skills')) {
      return `Masingita specializes in Software Engineering, UX Design, Database Administration, Cybersecurity, and Project Management. You can learn more about Masingita's skills [here](skills.html).`;
    } else if (lowerCaseMessage.includes('projects')) {
      return `Masingita has worked on projects like an E-Commerce Platform, a Task Management App, and a Restaurant Branding project. Would you like more details about any of these? You can view the projects [here](portfolio.html).`;
    } else if (lowerCaseMessage.includes('experience')) {
      return responses.experience;
    } else if (lowerCaseMessage.includes('education')) {
      return responses.education;
    } else if (lowerCaseMessage.includes('contact')) {
      return responses.contact;
    } else {
      return "I'm not sure about that. Please contact Masingita directly at info@masingitamaluleke.com.";
    }
  }

  document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  sendButton.addEventListener('click', sendMessage);
} else {
  console.error('Chatbot elements not found in the DOM');
}

/// Vanilla tilt initialization
document.addEventListener("DOMContentLoaded", function() {
  VanillaTilt.init(document.querySelectorAll(".card"), {
    max: 10,
    speed: 300,
    glare: true,
    "max-glare": 0.2,
  });

  // Create particles
  const particlesContainers = document.querySelectorAll('.particles');
  
  particlesContainers.forEach(container => {
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random size
      const size = Math.random() * 3 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random animation delay
      particle.style.animationDelay = `${Math.random() * 3}s`;
      
      container.appendChild(particle);
    }
  });
});

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  createParticles();
  
  // Initialize skill progress bars with animation
  initSkillBars();
  
  applyTiltEffect();
  
  // Add intersection observer to animate elements when scrolled into view
  setupIntersectionObserver();
});

// Create floating particles in the background
function createParticles() {
  const particlesContainer = document.querySelector('.background-particles');
  const colors = [
    'rgba(67, 97, 238, 0.3)',
    'rgba(76, 201, 240, 0.3)',
    'rgba(58, 12, 163, 0.3)',
    'rgba(6, 214, 160, 0.3)'
  ];
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 15 + 5;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = Math.random() * 20 + 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.background = color;
    particle.style.opacity = Math.random() * 0.5 + 0.2;
    
    // Animation
    particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
    
    // Add to container
    particlesContainer.appendChild(particle);
  }
  
  // Add animation keyframes dynamically
  const styleSheet = document.createElement('style');
  styleSheet.innerHTML = `
    @keyframes floatParticle {
      0% {
        transform: translate(0, 0) rotate(0deg);
      }
      25% {
        transform: translate(50px, -30px) rotate(90deg);
      }
      50% {
        transform: translate(100px, 0) rotate(180deg);
      }
      75% {
        transform: translate(50px, 30px) rotate(270deg);
      }
      100% {
        transform: translate(0, 0) rotate(360deg);
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

// Initialize skill progress bars with animation
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  // Add animation to skill bars when the section is in view
  skillBars.forEach(bar => {
    // Get the width value from the style attribute
    const width = bar.style.width;
    // Initially set width to 0
    bar.style.width = '0';
    
    // Store the target width as a data attribute
    bar.dataset.width = width;
  });
}

// Initialize typing effect (optional - can be removed if you prefer static text)
function initTypingEffect() {
  const typingElement = document.querySelector('.typing-effect');
  const textToType = typingElement.textContent;
  typingElement.textContent = '';
  
  let i = 0;
  const typingInterval = setInterval(() => {
    if (i < textToType.length) {
      typingElement.textContent += textToType.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
    }
  }, 50);
}

// Apply 3D tilt effect to profile image
function applyTiltEffect() {
  const profileFrame = document.querySelector('.profile-frame');
  
  profileFrame.addEventListener('mousemove', (e) => {
    const rect = profileFrame.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = -(x - centerX) / 10;
    
    profileFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  
  profileFrame.addEventListener('mouseleave', () => {
    profileFrame.style.transform = '';
    // Restore the floating animation
    profileFrame.style.animation = 'profileFloat 6s ease-in-out infinite';
  });
}

// Setup Intersection Observer to animate elements when scrolled into view
function setupIntersectionObserver() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('about-content')) {
          // Animate skill bars
          const skillBars = entry.target.querySelectorAll('.skill-progress');
          skillBars.forEach(bar => {
            setTimeout(() => {
              bar.style.width = bar.dataset.width;
            }, 300);
          });
        }
        
        // Add fadein class for animation
        entry.target.classList.add('fade-in');
        
        // Stop observing after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  // Observe elements
  observer.observe(document.querySelector('.about-content'));
  observer.observe(document.querySelector('.profile-image-container'));
}

// Handle theme toggle (assuming you have a theme toggle button elsewhere)
// This connects to any existing theme toggle functionality
function updateThemeSpecifics() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  const root = document.documentElement;
  
  if (isDarkMode) {
    root.style.setProperty('--skill-progress-gradient', 'linear-gradient(90deg, var(--accent-color), var(--secondary-color))');
  } else {
    root.style.setProperty('--skill-progress-gradient', 'linear-gradient(90deg, var(--primary-color), var(--accent-color))');
  }
}

// If a theme toggle exists elsewhere, connect to it
const existingThemeToggle = document.getElementById('theme-toggle');
if (existingThemeToggle) {
  existingThemeToggle.addEventListener('click', () => {
    setTimeout(updateThemeSpecifics, 100); 
  });
}

// Initial theme check
updateThemeSpecifics();

// Add CSS keyframes for fade-in animation
const fadeInStyles = document.createElement('style');
fadeInStyles.innerHTML = `
  .fade-in {
    animation: fadeIn 0.8s ease forwards;
  }

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
`;
document.head.appendChild(fadeInStyles);

document.addEventListener('DOMContentLoaded', function() {
  // Define CSS variables for proper dark/light mode
  const root = document.documentElement;
  
  // Check if user prefers dark mode
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let isDarkMode = localStorage.getItem('darkMode') === 'true' || prefersDarkMode;
  
  // Set initial theme variables
  setThemeVariables(isDarkMode);
  
  // Variables for skills section
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillItems = document.querySelectorAll('.skill-item');
  
  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter skill items with animation
      skillItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        // Reset classes
        item.classList.remove('hidden', 'fade-out');
        
        // Apply filtering
        if (filterValue !== 'all' && category !== filterValue) {
          // First fade out with animation
          item.classList.add('fade-out');
          
          // Then hide after animation completes
          setTimeout(() => {
            item.classList.add('hidden');
          }, 600);
        }
      });
    });
  });
  
  // Animate progress bars on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // When skills section is visible, add animation class to all skill items
        skillItems.forEach((item, index) => {
          // Add staggered delay for smoother animation
          setTimeout(() => {
            item.classList.add('animated');
          }, index * 100);
        });
        
        // Disconnect observer after animation is triggered
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });
  
  // Observe the skills section
  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    observer.observe(skillsSection);
  }
  
  // Add hover effects and interaction
  skillItems.forEach(item => {
    const skillCard = item.querySelector('.skill-card');
    const progressFill = item.querySelector('.progress-fill');
    const skillName = item.getAttribute('data-skill');
    
    if (skillCard) {
      skillCard.addEventListener('mouseenter', function() {
        // Optional: Customize hover effects based on skill
        skillCard.style.borderColor = getSkillColor(skillName);
      });
      
      skillCard.addEventListener('mouseleave', function() {
        skillCard.style.borderColor = '';
      });
    }
    
    // Customize progress bar colors based on skill
    if (progressFill) {
      progressFill.style.background = getSkillColor(skillName);
    }
  });
  
  // Toggle dark mode functionality (if needed)
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      isDarkMode = !isDarkMode;
      document.body.classList.toggle('dark-mode', isDarkMode);
      localStorage.setItem('darkMode', isDarkMode);
      setThemeVariables(isDarkMode);
    });
  }
  
  // Set initial dark/light mode class
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  }

  // Helper function to get skill-specific colors
  function getSkillColor(skill) {
    const colors = {
      javascript: '#F7DF1E',
      python: '#3776AB',
      react: '#61DAFB',
      nodejs: '#339933',
      aws: '#FF9900',
      docker: '#2496ED',
      // Add more skills and their respective colors as needed
      default: 'var(--accent-color)'
    };
    
    return colors[skill] || colors.default;
  }
  
  // Function to set theme variables
  function setThemeVariables(darkMode) {
    if (darkMode) {
      root.style.setProperty('--background-light', '#121927');
      root.style.setProperty('--background-dark', '#0A101E');
      root.style.setProperty('--text-light', '#FFFFFF');
      root.style.setProperty('--text-dark', '#E0E0E0');
    } else {
      root.style.setProperty('--background-light', '#FFFFFF');
      root.style.setProperty('--background-dark', '#F5F7FA');
      root.style.setProperty('--text-light', '#FFFFFF');
      root.style.setProperty('--text-dark', '#2A2C35');
    }
  }
  
  // Optional: Add "View All Skills" button functionality
  const viewAllButton = document.querySelector('.view-all-skills .btn');
  if (viewAllButton) {
    viewAllButton.addEventListener('click', function(e) {
    
    });
  }
  
  // Initialize any skill-specific tooltips or popups
  initializeSkillTooltips();
  
  function initializeSkillTooltips() {
    skillItems.forEach(item => {
      const skillName = item.getAttribute('data-skill');
      const skillDescription = getSkillDescription(skillName);
      
      // Optional: Add tooltip functionality if needed
      if (skillDescription) {
        item.setAttribute('title', skillDescription);
        // Or implement a custom tooltip solution here
      }
    });
  }
  
  function getSkillDescription(skill) {
    const descriptions = {
      javascript: 'A high-level, interpreted programming language that conforms to the ECMAScript specification.',
      python: 'A high-level, general-purpose programming language known for its readability and versatility.',
      react: 'A JavaScript library for building user interfaces, particularly single-page applications.',
      nodejs: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine for server-side applications.',
      aws: 'Amazon Web Services - a comprehensive cloud computing platform.',
      docker: 'A platform for developing, shipping, and running applications in containers.',
      // Add more descriptions as needed
    };
    
    return descriptions[skill] || '';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const typingElement = document.getElementById('typing-effect');
  const text = "Hello! I'm an IT graduate with a burning desire to explore all things in tech";
  let index = 0;
  let isAdding = true;

  function type() {
    if (isAdding) {
      if (index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 100); // Adjust typing speed here
      } else {
        isAdding = false;
        setTimeout(type, 2000); // Pause before deleting
      }
    } else {
      if (index > 0) {
        typingElement.innerHTML = text.substring(0, index - 1);
        index--;
        setTimeout(type, 50); // Adjust deleting speed here
      } else {
        isAdding = true;
        setTimeout(type, 500); // Pause before typing again
      }
    }
  }

  type();
});
