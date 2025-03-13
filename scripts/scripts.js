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

//quick links

document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  // Check for saved theme preference or default to 'light'
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  
  themeToggle.addEventListener('click', function() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add transition class for smooth theme change
    body.classList.add('theme-transition');
    setTimeout(() => {
      body.classList.remove('theme-transition');
    }, 500);
  });
  
  // Card hover effects with vanilla JS (alternative to Tilt.js)
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = (y - centerY) / 14;
      const tiltY = (centerX - x) / 14;
      
      this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
      
      // Dynamic shadow effect
      this.style.boxShadow = `
        0 15px 35px rgba(0, 0, 0, 0.1),
        ${(x - centerX) / 40}px ${(y - centerY) / 40}px 30px rgba(0, 0, 0, 0.05)
      `;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
      
      // Add transition for smooth return
      this.style.transition = 'all 0.5s ease';
      setTimeout(() => {
        this.style.transition = '';
      }, 500);
    });
    
    // Add focus styles for accessibility
    const cardLink = card.querySelector('.card-link');
    cardLink.addEventListener('focus', function() {
      card.classList.add('card-focused');
    });
    
    cardLink.addEventListener('blur', function() {
      card.classList.remove('card-focused');
    });
  });
  
  // Add intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  cards.forEach(card => {
    observer.observe(card);
  });
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Apply saved theme
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  
  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      // Toggle the dark-mode class
      document.body.classList.toggle('dark-mode');
      
      // Save the current theme preference
      const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', currentTheme);
      
      // Add animation to profile elements
      const profileImage = document.querySelector('.profile-image');
      const profileBlob = document.querySelector('.profile-blob');
      
      // Apply animation classes
      profileImage.classList.add('theme-transition');
      profileBlob.classList.add('theme-transition');
      
      // Remove animation classes after transition
      setTimeout(() => {
        profileImage.classList.remove('theme-transition');
        profileBlob.classList.remove('theme-transition');
      }, 600);
    });
  }
  
  // Add hover animations for profile image
  const profileImage = document.querySelector('.profile-image');
  if (profileImage) {
    profileImage.addEventListener('mouseover', function() {
      const profileBlob = document.querySelector('.profile-blob');
      profileBlob.style.transform = 'scale(1.1) rotate(10deg)';
    });
    
    profileImage.addEventListener('mouseout', function() {
      const profileBlob = document.querySelector('.profile-blob');
      profileBlob.style.transform = 'scale(1) rotate(0deg)';
    });
  }
});

// Additional animations for skills tags
document.addEventListener('DOMContentLoaded', function() {
  const skillTags = document.querySelectorAll('.skill-tag');
  
  skillTags.forEach((tag, index) => {
    // Add staggered appearance animation on page load
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      tag.style.transition = 'all 0.5s ease';
      tag.style.opacity = '1';
      tag.style.transform = 'translateY(0)';
    }, 300 + (index * 100));
  });
});