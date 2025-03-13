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
    // Here you can add code to send the form data to your server
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
  // Create particles for background
  createParticles();
  
  // Initialize skill progress bars with animation
  initSkillBars();
  
  // Initialize typing effect
  // If you want to keep the static text instead, remove this line
  // initTypingEffect();
  
  // Apply 3D tilt effect to profile
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
    root: null, // Use viewport as root
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of the element is visible
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
    setTimeout(updateThemeSpecifics, 100); // Short delay to ensure classList changes have applied
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