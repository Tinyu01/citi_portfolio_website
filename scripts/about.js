// current year
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.querySelector('.year');
    yearSpan.textContent = new Date().getFullYear();
  });
  
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Init cursor effects
    initCustomCursor();
    
    // Init scroll reveal animations
    initScrollReveal();
    
    // Init particle background
    initParticleBackground();

    // Initialize skill tabs functionality
    initSkillTabs();
  });
  
  // Custom cursor effect
  function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);
    
    let cursorVisible = true;
    
    // Hide cursor when inactive
    let mouseTimer;
    const hideCursor = () => {
      cursorVisible = false;
      cursor.style.opacity = '0';
      cursorDot.style.opacity = '0';
    };
    
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      
      if (!cursorVisible) {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
        cursorVisible = true;
      }
      
      clearTimeout(mouseTimer);
      mouseTimer = setTimeout(hideCursor, 3000);
    });
    
    // Mouse events for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .tech-bubble');
    let cursorEnlarged = false;
    interactiveElements.forEach(el => {
      el.addEventListener('mouseover', () => {
        cursor.classList.add('cursor-enlarged');
        cursorEnlarged = true;
      });
      
      el.addEventListener('mouseout', () => {
        cursor.classList.remove('cursor-enlarged');
        cursorEnlarged = false;
      });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseout', () => {
      cursor.style.opacity = '0';
      cursorDot.style.opacity = '0';
    });
    
    document.addEventListener('mousedown', () => {
      cursor.classList.add('cursor-click');
      setTimeout(() => {
        cursor.classList.remove('cursor-click');
      }, 300);
    });
  }
  
  // Scroll reveal animations
  function initScrollReveal() {
    // Only initialize on sections after the hero
    const sections = document.querySelectorAll('section:not(.hero-section)');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.15
    });
    
    sections.forEach(section => {
      observer.observe(section);
    });
  }
  
  // Particle background effect
  function initParticleBackground() {
    const heroSection = document.querySelector('.hero-section');
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.classList.add('particles-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.3';
    canvas.style.zIndex = '1';
    
    heroSection.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full size
    function resizeCanvas() {
      canvas.width = heroSection.offsetWidth;
      canvas.height = heroSection.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = this.getRandomColor();
      }
      
      getRandomColor() {
        const colors = [
          'rgba(67, 97, 238, 0.6)',   // Primary
          'rgba(58, 12, 163, 0.5)',   // Secondary
          'rgba(76, 201, 240, 0.7)'   // Accent
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce on edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    const particles = [];
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 10000));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Connect particles with lines
    function connectParticles() {
      const maxDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // The closer, the more opaque
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(76, 201, 240, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      connectParticles();
      requestAnimationFrame(animate);
    }
    
    animate();
  }
  
  // Auto-type text effect for the greeting section
  // This function will create a typing effect for the introduction
  function initTypeWriter() {
    const textElement = document.querySelector('.greeting-text');
    const text = textElement.textContent;
    textElement.textContent = '';
    
    let i = 0;
    const speed = 50; // typing speed in ms
    
    function type() {
      if (i < text.length) {
        textElement.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    setTimeout(() => {
      type();
    }, 1000); // Delay before starting typing
  }
  
  // Skills highlighting effect for tech bubbles
  function initSkillsHighlight() {
    const techBubbles = document.querySelectorAll('.tech-bubble');
    
    techBubbles.forEach(bubble => {
      bubble.addEventListener('mouseover', () => {
        // Pulse animation
        bubble.style.animation = 'none';
        bubble.offsetHeight; // Trigger reflow
        bubble.style.animation = 'pulse 1s ease-in-out';
        
        // Scale up
        bubble.style.transform = 'scale(1.2)';
        bubble.style.zIndex = '5';
        bubble.style.boxShadow = '0 8px 20px rgba(76, 201, 240, 0.4)';
        
        // Show skill name
        const skillName = document.createElement('div');
        skillName.classList.add('skill-name');
        skillName.textContent = getSkillName(bubble);
        bubble.appendChild(skillName);
      });
      
      bubble.addEventListener('mouseout', () => {
        // Return to normal
        bubble.style.transform = 'scale(1)';
        bubble.style.zIndex = '1';
        bubble.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        
        // Remove skill name
        const skillName = bubble.querySelector('.skill-name');
        if (skillName) {
          bubble.removeChild(skillName);
        }
      });
    });
    
    function getSkillName(bubble) {
      // Get the icon class to determine which skill
      const icon = bubble.querySelector('i');
      if (icon.classList.contains('fa-react')) return 'React';
      if (icon.classList.contains('fa-node-js')) return 'Node.js';
      if (icon.classList.contains('fa-python')) return 'Python';
      if (icon.classList.contains('fa-figma')) return 'Figma';
      if (icon.classList.contains('fa-database')) return 'Database';
      return 'Skill';
    }
  }
  
  // Add smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }
  
  // Add CSS for custom cursor
  function addCustomCursorStyles() {
    const style = document.createElement('style');
    style.textContent = `
      body {
        cursor: none;
      }
      
      .custom-cursor {
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid rgba(76, 201, 240, 0.5);
        border-radius: 50%;
        pointer-events: none;
        transform: translate3d(-50%, -50%, 0);
        transition: all 0.1s ease-out;
        z-index: 9999;
        mix-blend-mode: difference;
      }
      
      .cursor-dot {
        position: fixed;
        width: 8px;
        height: 8px;
        background-color: rgba(76, 201, 240, 1);
        border-radius: 50%;
        pointer-events: none;
        transform: translate3d(-50%, -50%, 0);
        transition: opacity 0.2s ease-out;
        z-index: 10000;
      }
      
      .cursor-enlarged {
        transform: translate3d(-50%, -50%, 0) scale(1.5);
        background-color: rgba(76, 201, 240, 0.1);
        border: 1px solid rgba(76, 201, 240, 0.6);
      }
      
      .cursor-click {
        transform: translate3d(-50%, -50%, 0) scale(0.8);
        opacity: 0.8;
      }
      
      @media (max-width: 768px) {
        .custom-cursor, .cursor-dot {
          display: none;
        }
        
        body {
          cursor: auto;
        }
      }
      
      .skill-name {
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(10, 25, 47, 0.9);
        color: #fff;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        pointer-events: none;
        z-index: 10;
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
      }
    `;
    
    document.head.appendChild(style);
  }
  
  // Initialize all effects
  window.addEventListener('load', function() {
    addCustomCursorStyles();
    initTypeWriter();
    initSkillsHighlight();
    initSmoothScroll();
  });

  // Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Check if AOS is available and initialize
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    } else {
      console.warn('AOS library not loaded. Please include it in your project.');
    }
    
    // Syntax highlighting for code snippet
    highlightCodeSnippet();
    
    // Add animated typing effect for the quote
    const quoteElement = document.querySelector('.quote blockquote');
    if (quoteElement) {
      animateTyping(quoteElement);
    }
    
    // Add parallax effect for visual elements
    addParallaxEffect();
    
    // Add interactive hover effects
    addInteractiveHoverEffects();
  });
  
  // Function to highlight code in the code snippet
  function highlightCodeSnippet() {
    const codeElement = document.querySelector('.code-snippet code');
    if (!codeElement) return;
    
    const code = codeElement.innerHTML;
    let highlightedCode = code
      .replace(/const|let|var/g, '<span class="keyword">$&</span>')
      .replace(/(".*?")/g, '<span class="string">$1</span>')
      .replace(/('.*?')/g, '<span class="string">$1</span>')
      .replace(/(\w+):/g, '<span class="property">$1</span>');
    
    codeElement.innerHTML = highlightedCode;
  }
  
  // Function to animate typing for quote
  function animateTyping(element) {
    const text = element.textContent;
    element.textContent = '';
    
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        element.textContent += text.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
  }
  
  // Function to add parallax effect
  function addParallaxEffect() {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      
      // Parallax for experience visual
      const experienceVisual = document.querySelector('.experience-visual');
      if (experienceVisual) {
        experienceVisual.style.transform = `rotate(-3deg) translateY(${scrollPosition * 0.05}px)`;
      }
      
      // Parallax for code snippet
      const codeSnippet = document.querySelector('.code-snippet');
      if (codeSnippet) {
        codeSnippet.style.transform = `rotate(3deg) translateY(${scrollPosition * -0.03}px)`;
      }
    });
  }
  
  // Function to add interactive hover effects
  function addInteractiveHoverEffects() {
    // Timeline items hover effect
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        const marker = this.querySelector('.timeline-marker');
        marker.style.transform = 'scale(1.2)';
        marker.style.transition = 'transform 0.3s ease';
      });
      
      item.addEventListener('mouseleave', function() {
        const marker = this.querySelector('.timeline-marker');
        marker.style.transform = 'scale(1)';
      });
    });
    
    // Highlight text effect
    const highlightSpans = document.querySelectorAll('.highlight');
    highlightSpans.forEach(span => {
      span.addEventListener('mouseenter', function() {
        this.style.color = 'var(--accent-color)';
      });
      
      span.addEventListener('mouseleave', function() {
        this.style.color = 'var(--primary-color)';
      });
    });
    
    // Add particle effect to about section
    createParticleEffect();
  }
  
  // Function to create a subtle particle effect in the background
  function createParticleEffect() {
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    aboutSection.prepend(canvas);
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = aboutSection.offsetWidth;
      canvas.height = aboutSection.offsetHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Initialize particles
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = Math.random() > 0.5 ? 'rgba(76, 201, 240, 0.3)' : 'rgba(67, 97, 238, 0.3)';
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // Create initial particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }
  
  // Function to add skills progress animation
  document.addEventListener('scroll', function() {
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;
    
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.75) {
      const highlightElements = document.querySelectorAll('.highlight');
      highlightElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('highlight-animate');
        }, index * 200);
      });
    }
  });

  // Skills Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.skills-tab-content');
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    // Initialize AOS (Animate on Scroll) if available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100
      });
    }
    
    // Tab switching functionality
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding tab content
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
        
        // Trigger animation for skill bars in the active tab
        animateSkillBars();
      });
    });
    
    // Function to animate skill bars
    function animateSkillBars() {
      // Reset all skill bars
      skillProgressBars.forEach(bar => {
        bar.style.width = '0%';
      });
      
      // Animate skill bars in active tab
      setTimeout(() => {
        const activeTab = document.querySelector('.skills-tab-content.active');
        if (activeTab) {
          const activeBars = activeTab.querySelectorAll('.skill-progress');
          activeBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
              bar.style.width = targetWidth;
            }, 100);
          });
        }
      }, 100);
    }
    
    // Initialize the first tab
    if (tabButtons.length > 0 && tabContents.length > 0) {
      tabButtons[0].classList.add('active');
      tabContents[0].classList.add('active');
      setTimeout(animateSkillBars, 500);
    }
    
    // Add scroll-triggered animations to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    let delay = 0;
    
    skillCards.forEach(card => {
      // Add staggered animation delay
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `all 0.5s ease ${delay}s`;
      delay += 0.1;
      
      // Create intersection observer
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            observer.unobserve(card);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(card);
    });
    
    // Add particle background effect if section is visible
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
      createParticleBackground(skillsSection);
    }
    
    // Function to create floating particles in the background
    function createParticleBackground(container) {
      const particleCount = 20;
      const colors = ['rgba(67, 97, 238, 0.3)', 'rgba(76, 201, 240, 0.3)', 'rgba(58, 12, 163, 0.2)'];
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('span');
        particle.className = 'floating-particle';
        
        // Random styling
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.position = 'absolute';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.opacity = Math.random() * 0.7 + 0.3;
        particle.style.pointerEvents = 'none';
        
        // Random animations
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.animation = `floatingParticle ${duration}s linear ${delay}s infinite`;
        
        container.appendChild(particle);
      }
      
      // Add keyframe animation to document if it doesn't exist
      if (!document.getElementById('particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.innerHTML = `
          @keyframes floatingParticle {
            0% {
              transform: translate(0, 0) rotate(0deg);
            }
            25% {
              transform: translate(50px, -30px) rotate(90deg);
            }
            50% {
              transform: translate(0, -60px) rotate(180deg);
            }
            75% {
              transform: translate(-50px, -30px) rotate(270deg);
            }
            100% {
              transform: translate(0, 0) rotate(360deg);
            }
          }
        `;
        document.head.appendChild(style);
      }
    }
    
    // Additional tabs content generation based on LinkedIn profile
    populateAdditionalSkillTabs();
    
    // Function to populate the remaining skill tabs with content from the profile
    function populateAdditionalSkillTabs() {
      // Design skills tab
      const designTab = document.getElementById('design');
      if (designTab) {
        designTab.innerHTML = `
          <div class="skills-grid">
            <div class="skill-card">
              <div class="skill-icon"><i class="fab fa-figma"></i></div>
              <div class="skill-info">
                <h3>UI/UX Design</h3>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: 85%"></div>
                  </div>
                  <span class="skill-percentage">85%</span>
                </div>
              </div>
              <div class="skill-tooltip">
                <p>User-centered design principles and wireframing</p>
                <div class="tooltip-projects">
                  <span>5+ Projects</span>
                </div>
              </div>
            </div>
            
            <div class="skill-card">
              <div class="skill-icon"><i class="fas fa-palette"></i></div>
              <div class="skill-info">
                <h3>Graphic Design</h3>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: 90%"></div>
                  </div>
                  <span class="skill-percentage">90%</span>
                </div>
              </div>
              <div class="skill-tooltip">
                <p>Branding, visual identity creation, and marketing materials</p>
                <div class="tooltip-projects">
                  <span>10+ Projects</span>
                </div>
              </div>
            </div>
            
            <div class="skill-card">
              <div class="skill-icon"><i class="fas fa-pencil-ruler"></i></div>
              <div class="skill-info">
                <h3>Visual Design</h3>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: 80%"></div>
                  </div>
                  <span class="skill-percentage">80%</span>
                </div>
              </div>
              <div class="skill-tooltip">
                <p>Creating visually appealing layouts and graphics</p>
                <div class="tooltip-projects">
                  <span>7+ Projects</span>
                </div>
              </div>
            </div>
            
            <div class="skill-card">
              <div class="skill-icon"><i class="fas fa-paint-brush"></i></div>
              <div class="skill-info">
                <h3>Adobe Creative Suite</h3>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: 85%"></div>
                  </div>
                  <span class="skill-percentage">85%</span>
                </div>
              </div>
              <div class="skill-tooltip">
                <p>Proficient in Photoshop, Illustrator, and XD</p>
                <div class="tooltip-projects">
                  <span>All Design Projects</span>
                </div>
              </div>
            </div>
          </div>
        `;
      }
      
      // Database skills tab
      const databaseTab = document.getElementById('database');
      if (databaseTab) {
        databaseTab.innerHTML = `
          <div class="skills-grid">
            <div class="skill-card">
              <div class="skill-icon"><i class="fas fa-server"></i></div>
              <div class="skill-info">
                <h3>SQL</h3>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: 88%"></div>
                  </div>
                  <span class="skill-percentage">88%</span>
                </div>
              </div>
              <div class="skill-tooltip">
                <p>Database design, optimization, and complex queries</p>
                <div class="tooltip-projects">
                  <span>6+ Projects</span>
                </div>
              </div>
            </div>
            
            <div class="skill-card">
              <div class="skill-icon"><i class="fas fa-leaf"></i></div>
              <div class="skill-info">
                <h3>MongoDB</h3>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: 82%"></div>
                  </div>
                  <span class="skill-percentage">82%</span>
                </div>
              </div>
              <div class="skill-tooltip">
                <p>NoSQL database management and integration with Node.js</p>
                <div class="tooltip-projects">
                  <span>4+ Projects</span>
                </div>
              </div>
            </div>
            
            <div class="skill-card">
              <div class="skill-icon"><i class="fas fa-database"></i></div>
              <div class="skill-info">
                <h3>Database Administration</h3>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: 80%"></div>
                  </div>
                  <span class="skill-percentage">80%</span>
                </div>
              </div>
              <div class="skill-tooltip">
                <p>Backup, recovery, security, and performance optimization</p>
                <div class="tooltip-projects">
                  <span>3+ Years Experience</span>
                </div>
              </div>
            </div>
            
            <div class="skill-card">
              <div class="skill-icon"><i class="fas fa-table"></i></div>
              <div class="skill-info">
                <h3>Data Modeling</h3>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: 75%"></div>
                  </div>
                  <span class="skill-percentage">75%</span>
                </div>
              </div>
              <div class="skill-tooltip">
                <p>Entity-relationship diagrams and schema design</p>
                <div class="tooltip-projects">
                  <span>5+ Projects</span>
                </div>
              </div>
            </div>
          </div>
        `;
      }
      
      // Security skills tab
      const securityTab = document.getElementById('security');
      if (securityTab) {
        securityTab.innerHTML = `
          <div class="skills-grid">
            <div class="skill-card">
              <div class="skill-icon"><i class="fas fa-shield-alt"></i></div>
              <div class="skill-info">
                <h3>Cybersecurity</h3>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: 85%"></div>
                  </div>
                  <span class="skill-percentage">85%</span>
                </div>
              </div>
              <div class="skill-tooltip">
                <p>Certified in cybersecurity fundamentals and practices</p>
                <div class="tooltip-projects">
                  <span>Introduction to Cybersecurity Certification</span>
                </div>
              </div>
            </div>
            
            <div class="skill-card">
              <div class="skill-icon"><i class="fas fa-bug"></i></div>
              <div class="skill-info">
                <h3>Threat Intelligence</h3>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: 80%"></div>
                  </div>
                  <span class="skill-percentage">80%</span>
                </div>
              </div>
              <div class="skill-tooltip">
                <p>Identifying and responding to security threats</p>
                <div class="tooltip-projects">
                  <span>Threat Intelligence Certification</span>
                </div>
              </div>
            </div>
            
            <div class="skill-card">
              <div class="skill-icon"><i class="fas fa-lock"></i></div>
              <div class="skill-info">
                <h3>Secure Coding</h3>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: 82%"></div>
                  </div>
                  <span class="skill-percentage">82%</span>
                </div>
              </div>
              <div class="skill-tooltip">
                <p>OWASP principles and secure application development</p>
                <div class="tooltip-projects">
                  <span>All Development Projects</span>
                </div>
              </div>
            </div>
            
            <div class="skill-card">
              <div class="skill-icon"><i class="fas fa-user-shield"></i></div>
              <div class="skill-info">
                <h3>Network Security</h3>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: 78%"></div>
                  </div>
                  <span class="skill-percentage">78%</span>
                </div>
              </div>
              <div class="skill-tooltip">
                <p>Firewall configuration, VPN setup, and intrusion detection</p>
                <div class="tooltip-projects">
                  <span>IT Technician Experience</span>
                </div>
              </div>
            </div>
          </div>
        `;
      }
      
      // Management skills tab
      const managementTab = document.getElementById('management');
      if (managementTab) {
        managementTab.innerHTML = `
          <div class="skills-grid">
            <div class="skill-card">
              <div class="skill-icon"><i class="fas fa-tasks"></i></div>
              <div class="skill-info">
                <h3>Project Management</h3>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: 85%"></div>
                  </div>
                  <span class="skill-percentage">85%</span>
                </div>
              </div>
              <div class="skill-tooltip">
                <p>Planning, execution, and delivery of IT projects</p>
                <div class="tooltip-projects">
                  <span>Multiple Freelance Projects</span>
                </div>
              </div>
            </div>
            
            <div class="skill-card">
              <div class="skill-icon"><i class="fas fa-users-cog"></i></div>
              <div class="skill-info">
                <h3>Team Leadership</h3>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: 80%"></div>
                  </div>
                  <span class="skill-percentage">80%</span>
                </div>
              </div>
              <div class="skill-tooltip">
                <p>Coordinating team efforts and mentoring junior staff</p>
                <div class="tooltip-projects">
                  <span>IT Department Experience</span>
                </div>
              </div>
            </div>
            
            <div class="skill-card">
              <div class="skill-icon"><i class="fas fa-comments"></i></div>
              <div class="skill-info">
                <h3>Communication</h3>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: 90%"></div>
                  </div>
                  <span class="skill-percentage">90%</span>
                </div>
              </div>
              <div class="skill-tooltip">
                <p>Clear technical communication with stakeholders</p>
                <div class="tooltip-projects">
                  <span>Client-Facing Experience</span>
                </div>
              </div>
            </div>
            
            <div class="skill-card">
              <div class="skill-icon"><i class="fas fa-chart-line"></i></div>
              <div class="skill-info">
                <h3>Business Acumen</h3>
                <div class="skill-level">
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: 75%"></div>
                  </div>
                  <span class="skill-percentage">75%</span>
                </div>
              </div>
              <div class="skill-tooltip">
                <p>Understanding business needs and aligning IT solutions</p>
                <div class="tooltip-projects">
                  <span>Freelance Business Experience</span>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }
  });

  // Services Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.services-tab-content');
    
    // Initialize AOS animation library if it exists
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        once: false,
        mirror: true,
        offset: 50
      });
    }
  
    // Tab switching functionality
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Get target tab
        const targetId = this.getAttribute('data-target');
        const targetTab = document.getElementById(targetId);
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => {
          content.classList.remove('active');
          content.style.display = 'none';
        });
        
        // Add active class to clicked button and target content
        this.classList.add('active');
        targetTab.classList.add('active');
        
        // Animate tab content
        setTimeout(() => {
          targetTab.style.display = 'block';
          
          // Apply animation to service cards
          const cards = targetTab.querySelectorAll('.service-card');
          cards.forEach((card, index) => {
            card.classList.remove('fadeInUp');
            void card.offsetWidth; // Trigger reflow
            card.classList.add('fadeInUp');
            card.style.animationDelay = `${0.1 * (index + 1)}s`;
          });
        }, 50);
      });
    });
  
    // Add hover effects and interactions
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
      // Add hover effect with subtle 3D rotation
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top; // y position within the element
        
        // Calculate rotation based on mouse position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        // Apply transformation
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      });
      
      // Reset on mouse leave
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.transition = 'transform 0.5s ease';
        
        // Remove transition after it's done to not interfere with hover effect
        setTimeout(() => {
          this.style.transition = '';
        }, 500);
      });
    });
    
    // Highlight icon on card hover
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
      });
      
      card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.service-icon');
        icon.style.transform = '';
      });
    });
    
    // Animate elements when they come into view
    function animateOnScroll() {
      const elements = document.querySelectorAll('.service-card, .section-header');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight) && (elementBottom > 0);
        
        if (isVisible && !element.classList.contains('animated')) {
          element.classList.add('animated', 'fadeInUp');
        }
      });
    }
    
    // Trigger animations on scroll if AOS is not available
    if (typeof AOS === 'undefined') {
      window.addEventListener('scroll', animateOnScroll);
      animateOnScroll(); // Initial check
    }
    
    // Expanding service card details on smaller screens
    if (window.innerWidth < 768) {
      const serviceInfoHeadings = document.querySelectorAll('.service-info h3');
      
      serviceInfoHeadings.forEach(heading => {
        heading.addEventListener('click', function() {
          const card = this.closest('.service-card');
          const details = card.querySelector('.service-details');
          const cta = card.querySelector('.service-cta');
          
          if (details) {
            details.classList.toggle('active');
            if (details.style.maxHeight) {
              details.style.maxHeight = null;
              if (cta) cta.style.maxHeight = null;
            } else {
              details.style.maxHeight = details.scrollHeight + 'px';
              if (cta) cta.style.maxHeight = cta.scrollHeight + 'px';
            }
          }
        });
      });
    }
  });
  
  // Add particle background effect for visual enhancement
  document.addEventListener('DOMContentLoaded', function() {
    const servicesSection = document.querySelector('.services-section');
    
    if (!servicesSection) return;
    
    // Create canvas element for particles
    const canvas = document.createElement('canvas');
    canvas.classList.add('particles-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    
    // Insert canvas as first child of services section
    servicesSection.insertBefore(canvas, servicesSection.firstChild);
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = servicesSection.offsetWidth;
      canvas.height = servicesSection.offsetHeight;
    };
    
    window.addEventListener('resize', setCanvasDimensions);
    setCanvasDimensions();
    
    // Get canvas context
    const ctx = canvas.getContext('2d');
    
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(76, 201, 240, ${Math.random() * 0.3})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }
    
    // Create particles
    const particles = [];
    const particleCount = Math.min(Math.floor(canvas.width * canvas.height / 10000), 100);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animate particles
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Connect particles with lines if they're close enough
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(76, 201, 240, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Initialize the experience section functionality
    initExperienceSection();
  
    // Initialize AOS animation library if available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  });
  
  function initExperienceSection() {
    // Create the experience data structure based on the provided HTML
    const experienceData = [
      {
        year: "2024",
        role: "ICT Intern",
        company: "Collins Chabane Local Municipality",
        logo: "assets/images/ccm-logo.png",
        tags: ["Network Admin", "Technical Support", "IT Infrastructure"],
        situation: "Joined the IT department to assist with maintaining and optimizing the municipal network infrastructure.",
        task: "Responsible for network administration, user support, and software implementation.",
        action: "Configured and deployed new network devices, researched network monitoring solutions, and provided technical support.",
        result: "Achieved a 15% increase in network uptime and developed strong communication and teamwork skills."
      },
      {
        year: "2023",
        role: "Freelance Software Engineer",
        company: "Maltech Digital Solutions & Co.",
        logo: "assets/images/maltech-logo.png",
        tags: ["Full-Stack", "Web Apps", "Mobile"],
        situation: "Tasked with delivering full-stack development projects for various clients.",
        task: "Develop user-friendly front-ends and scalable back-end systems.",
        action: "Applied expertise in ReactJS, NodeJS, and Python to tackle projects independently.",
        result: "Successfully delivered multiple projects on time and within budget while building strong client relationships."
      },
      {
        year: "2021",
        role: "Freelance Graphic Designer",
        company: "Maltech Digital Solutions & Co.",
        logo: "assets/images/maltech-logo.png",
        tags: ["UI/UX", "Branding", "Marketing"],
        situation: "Established as a freelance graphic designer to help businesses with their visual identity needs.",
        task: "Create branding, UI/UX designs, and marketing materials for various clients.",
        action: "Collaborated with businesses to design user interfaces and comprehensive brand identities.",
        result: "Increased user conversion by 15% for a tech startup and boosted follower engagement by 20% for an e-commerce company."
      },
      {
        year: "2022",
        role: "IT Technician",
        company: "Mbhanyele Secondary School",
        logo: "assets/images/mbhanyele-logo.png",
        tags: ["Hardware", "Network", "Troubleshooting"],
        situation: "Hired to manage IT infrastructure and resolve technical issues for the school.",
        task: "Troubleshoot and resolve IT incidents, maintain network infrastructure, and implement new software solutions.",
        action: "Upgraded systems, leveraged expertise in hardware repair, and utilized diagnostic tools to resolve complex issues.",
        result: "Successfully resolved over 150 critical IT incidents and increased network efficiency by 15%."
      },
      {
        year: "2021",
        role: "Education Assistant",
        company: "Mbhanyele Secondary School",
        logo: "assets/images/mbhanyele-logo.png", 
        tags: ["Teaching", "Student Support", "Academic"],
        situation: "Engaged to provide support for students from grades 8 to 12.",
        task: "Foster a positive learning environment and provide individualized support to meet diverse student needs.",
        action: "Developed personalized learning strategies and assisted teachers with classroom management.",
        result: "Promoted academic success and created an engaging learning atmosphere for students."
      }
    ];
  
    // Generate the experience section HTML
    generateExperienceSection(experienceData);
  
    // Initialize the experience years slider
    initExperienceYearsSlider();
  }
  
  function generateExperienceSection(experienceData) {
    // Get the experience section element
    const experienceSection = document.getElementById('experience');
    
    // Create the container if it doesn't exist
    let container = experienceSection.querySelector('.container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'container';
      experienceSection.appendChild(container);
    }
    
    // Create the section header if it doesn't exist
    let sectionHeader = container.querySelector('.section-header');
    if (!sectionHeader) {
      sectionHeader = document.createElement('div');
      sectionHeader.className = 'section-header';
      sectionHeader.setAttribute('data-aos', 'fade-up');
      sectionHeader.innerHTML = `
        <span class="section-tag">Professional Journey</span>
        <h2 class="section-title">Work <span class="highlight">Experience</span></h2>
      `;
      container.appendChild(sectionHeader);
    }
    
    // Create unique years from the experience data
    const uniqueYears = [...new Set(experienceData.map(exp => exp.year))].sort((a, b) => b - a);
    
    // Create the experience navigation with years as buttons
    const experienceNavigation = document.createElement('div');
    experienceNavigation.className = 'experience-navigation';
    experienceNavigation.setAttribute('data-aos', 'fade-up');
    
    // Create slider with prev/next arrows
    experienceNavigation.innerHTML = `
      <div class="slider-arrow prev"><i class="fas fa-chevron-left"></i></div>
      <div class="experience-years">
        ${uniqueYears.map(year => `
          <button class="year-btn" data-year="${year}">
            <span>${year}</span>
          </button>
        `).join('')}
      </div>
      <div class="slider-arrow next"><i class="fas fa-chevron-right"></i></div>
    `;
    
    container.appendChild(experienceNavigation);
    
    // Create the experience showcase area
    const experienceShowcase = document.createElement('div');
    experienceShowcase.className = 'experience-showcase';
    
    // Generate content for each year
    uniqueYears.forEach((year, index) => {
      const yearExperiences = experienceData.filter(exp => exp.year === year);
      
      const experienceContent = document.createElement('div');
      experienceContent.className = `experience-content ${index === 0 ? 'active' : ''}`;
      experienceContent.id = `experience-${year}`;
      experienceContent.setAttribute('data-aos', 'fade-up');
      
      // Generate experience cards for this year
      experienceContent.innerHTML = `
        ${yearExperiences.map(exp => `
          <div class="experience-card">
            <div class="experience-header">
              <h3 class="role">${exp.role}</h3>
              <div class="company">
                <span>${exp.company}</span>
                <div class="company-logo">
                  <img src="${exp.logo}" alt="${exp.company} Logo">
                </div>
              </div>
              <div class="tags">
                ${exp.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
              </div>
            </div>
            <div class="experience-body">
              <div class="star-framework">
                <div class="star-item">
                  <span class="star-label">Situation</span>
                  <p>${exp.situation}</p>
                </div>
                <div class="star-item">
                  <span class="star-label">Task</span>
                  <p>${exp.task}</p>
                </div>
                <div class="star-item">
                  <span class="star-label">Action</span>
                  <p>${exp.action}</p>
                </div>
                <div class="star-item">
                  <span class="star-label">Result</span>
                  <p>${exp.result}</p>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      `;
      
      experienceShowcase.appendChild(experienceContent);
    });
    
    container.appendChild(experienceShowcase);
    
    // Set up event listeners for year buttons
    const yearButtons = experienceNavigation.querySelectorAll('.year-btn');
    yearButtons.forEach((btn, index) => {
      if (index === 0) btn.classList.add('active');
      
      btn.addEventListener('click', function() {
        const year = this.getAttribute('data-year');
        
        // Remove active class from all buttons and add to clicked button
        yearButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Hide all content and show the selected one
        const allContent = experienceShowcase.querySelectorAll('.experience-content');
        allContent.forEach(content => content.classList.remove('active'));
        
        const selectedContent = document.getElementById(`experience-${year}`);
        selectedContent.classList.add('active');
      });
    });
  }
  
  function initExperienceYearsSlider() {
    const sliderContainer = document.querySelector('.experience-years');
    const prevArrow = document.querySelector('.slider-arrow.prev');
    const nextArrow = document.querySelector('.slider-arrow.next');
    
    if (!sliderContainer || !prevArrow || !nextArrow) return;
    
    // Function to scroll the slider
    const scrollSlider = (direction) => {
      const scrollAmount = sliderContainer.offsetWidth * 0.7;
      if (direction === 'prev') {
        sliderContainer.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
        });
      } else {
        sliderContainer.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    };
    
    // Add click event listeners to arrows
    prevArrow.addEventListener('click', () => scrollSlider('prev'));
    nextArrow.addEventListener('click', () => scrollSlider('next'));
    
    // Add hover effect to experience cards
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.classList.add('hovered');
      });
      
      card.addEventListener('mouseleave', function() {
        this.classList.remove('hovered');
      });
    });
  }
  
  // Add some extras to enhance the experience
  function enhanceUserExperience() {
    // Add subtle parallax effect to the background
    window.addEventListener('mousemove', function(e) {
      const experienceSection = document.querySelector('.experience-section');
      if (!experienceSection) return;
      
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      
      experienceSection.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    });
    
    // Add smooth hover transitions to cards
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        const header = this.querySelector('.experience-header');
        header.style.height = '180px';
      });
      
      card.addEventListener('mouseleave', function() {
        const header = this.querySelector('.experience-header');
        header.style.height = '';
      });
    });
  }
  
  // Call the enhance function when the page is fully loaded
  window.addEventListener('load', enhanceUserExperience);

  // JavaScript for Certifications Section
document.addEventListener('DOMContentLoaded', function() {
    // Certification data - can be expanded with your actual certifications
    const certifications = [
      {
        title: "Cloud Application Developer",
        issuer: "IBM",
        date: "Issued Dec 2023",
        id: "IBM-CAD-2023",
        icon: "fas fa-cloud",
        skills: ["Cloud Services", "Microservices", "DevOps"],
        featured: true
      },
      {
        title: "IoT Cloud Developer",
        issuer: "Microsoft",
        date: "Issued Oct 2023",
        id: "MS-IOT-2023",
        icon: "fas fa-microchip",
        skills: ["IoT", "Azure", "Connected Devices"]
      },
      {
        title: "Introduction to Cybersecurity",
        issuer: "Cisco",
        date: "Issued Sep 2023",
        id: "CISCO-CYBER-2023",
        icon: "fas fa-shield-alt",
        skills: ["Network Security", "Risk Management", "Security Concepts"]
      },
      {
        title: "Getting Started with Threat Intelligence and Hunting",
        issuer: "IBM Security",
        date: "Issued Jul 2023",
        id: "IBM-THREAT-2023",
        icon: "fas fa-search",
        skills: ["Threat Analysis", "Security Operations", "Incident Response"]
      },
      {
        title: "ALX Software Engineering",
        issuer: "ALX Africa",
        date: "Issued May 2023",
        id: "ALX-SE-2023",
        icon: "fas fa-code",
        skills: ["Full-Stack Development", "System Design", "Problem Solving"],
        featured: true
      }
    ];
  
    // Function to create certification cards dynamically
    function renderCertifications() {
      const certsGrid = document.querySelector('.certifications-grid');
      certsGrid.innerHTML = ''; // Clear existing content
      
      // Add certification counter badge
      const counterBadge = document.createElement('div');
      counterBadge.className = 'cert-counter';
      counterBadge.textContent = certifications.length;
      document.querySelector('.section-header').appendChild(counterBadge);
  
      // Create and append cards
      certifications.forEach((cert, index) => {
        const certCard = document.createElement('div');
        certCard.className = 'cert-card';
        certCard.setAttribute('data-cert', cert.title.toLowerCase().replace(/\s+/g, '-'));
        certCard.setAttribute('data-aos', 'fade-up');
        certCard.setAttribute('data-aos-delay', (index * 100).toString());
        
        if (cert.featured) {
          certCard.setAttribute('data-featured', 'true');
        }
        
        certCard.innerHTML = `
          <div class="cert-content">
            <div class="cert-icon">
              <i class="${cert.icon}"></i>
            </div>
            <div class="cert-details">
              <h3 class="cert-title">${cert.title}</h3>
              <p class="cert-issuer">${cert.issuer}</p>
              <div class="cert-meta">
                <span class="cert-date">${cert.date}</span>
                <span class="cert-id">ID: ${cert.id}</span>
              </div>
            </div>
          </div>
          <div class="cert-actions">
            <button class="cert-view-btn">View Certificate <i class="fas fa-external-link-alt"></i></button>
            <div class="cert-skills">
              ${cert.skills.map(skill => `<span class="cert-skill">${skill}</span>`).join('')}
            </div>
          </div>
        `;
        
        certsGrid.appendChild(certCard);
      });
      
      // Add event listeners to certification cards
      document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('mouseenter', handleCardHover);
        card.addEventListener('mouseleave', handleCardLeave);
        
        // Add click event to view button
        const viewBtn = card.querySelector('.cert-view-btn');
        viewBtn.addEventListener('click', function(e) {
          e.preventDefault();
          const certName = card.getAttribute('data-cert');
          // You can replace this with actual certificate view functionality
          showCertificateModal(certName);
        });
      });
    }
    
    // Function to handle card hover animation
    function handleCardHover(e) {
      const card = e.currentTarget;
      const skills = card.querySelectorAll('.cert-skill');
      
      skills.forEach((skill, index) => {
        skill.style.animation = `fadeInUp 0.3s forwards ${index * 0.1}s`;
      });
      
      // Add subtle tilt effect
      card.style.transform = 'translateY(-10px) rotate(1deg)';
    }
    
    // Function to handle card leave animation
    function handleCardLeave(e) {
      const card = e.currentTarget;
      const skills = card.querySelectorAll('.cert-skill');
      
      skills.forEach(skill => {
        skill.style.animation = '';
      });
      
      // Remove tilt effect
      card.style.transform = '';
    }
    
    // Function to show certificate modal (placeholder)
    function showCertificateModal(certName) {
      // This is a placeholder for actual modal functionality
      console.log(`Viewing certificate: ${certName}`);
      
      // Create a simulated popup alert
      const modalOverlay = document.createElement('div');
      modalOverlay.className = 'cert-modal-overlay';
      modalOverlay.style.position = 'fixed';
      modalOverlay.style.top = '0';
      modalOverlay.style.left = '0';
      modalOverlay.style.width = '100%';
      modalOverlay.style.height = '100%';
      modalOverlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
      modalOverlay.style.display = 'flex';
      modalOverlay.style.alignItems = 'center';
      modalOverlay.style.justifyContent = 'center';
      modalOverlay.style.zIndex = '1000';
      
      const modalContent = document.createElement('div');
      modalContent.className = 'cert-modal-content';
      modalContent.style.backgroundColor = 'white';
      modalContent.style.padding = '30px';
      modalContent.style.borderRadius = '10px';
      modalContent.style.width = '80%';
      modalContent.style.maxWidth = '600px';
      modalContent.style.position = 'relative';
      modalContent.style.animation = 'modalFadeIn 0.3s forwards';
      
      // Find the certification details
      const cert = certifications.find(c => c.title.toLowerCase().replace(/\s+/g, '-') === certName);
      
      modalContent.innerHTML = `
        <button class="modal-close" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 24px; cursor: pointer;">×</button>
        <h2 style="color: var(--primary-color); margin-bottom: 15px;">${cert.title} Certificate</h2>
        <div style="border: 1px solid #eee; padding: 20px; margin-bottom: 20px; text-align: center;">
          <i class="${cert.icon}" style="font-size: 50px; color: var(--primary-color); margin-bottom: 20px;"></i>
          <p style="font-size: 24px; font-weight: bold;">Certificate of Completion</p>
          <p>This certifies that</p>
          <p style="font-size: 20px; font-weight: bold; margin: 10px 0;">Masingita Ottis Maluleke</p>
          <p>has successfully completed the ${cert.title} certification</p>
          <p>Issued by: ${cert.issuer}</p>
          <p>${cert.date}</p>
          <p>Certificate ID: ${cert.id}</p>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <button class="download-btn" style="padding: 10px 20px; background-color: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">Download Certificate</button>
          <button class="verify-btn" style="padding: 10px 20px; background-color: var(--accent-color); color: white; border: none; border-radius: 5px; cursor: pointer;">Verify Certificate</button>
        </div>
      `;
      
      modalOverlay.appendChild(modalContent);
      document.body.appendChild(modalOverlay);
      
      // Add close functionality
      modalOverlay.querySelector('.modal-close').addEventListener('click', function() {
        document.body.removeChild(modalOverlay);
      });
      
      // Close when clicking outside the modal
      modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
          document.body.removeChild(modalOverlay);
        }
      });
      
      // Add keyframe animation for modal
      const style = document.createElement('style');
      style.textContent = `
        @keyframes modalFadeIn {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Function to filter certifications
    function setupFilterButtons() {
      // Create filter buttons container
      const filterContainer = document.createElement('div');
      filterContainer.className = 'cert-filters';
      filterContainer.style.display = 'flex';
      filterContainer.style.justifyContent = 'center';
      filterContainer.style.marginBottom = '40px';
      filterContainer.style.gap = '10px';
      filterContainer.style.flexWrap = 'wrap';
      
      // Create "All" button and issuer-specific buttons
      const issuers = ['All', ...new Set(certifications.map(cert => cert.issuer))];
      
      issuers.forEach(issuer => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = issuer;
        btn.style.padding = '8px 16px';
        btn.style.backgroundColor = issuer === 'All' ? 'var(--primary-color)' : 'rgba(67, 97, 238, 0.1)';
        btn.style.color = issuer === 'All' ? 'white' : 'var(--primary-color)';
        btn.style.border = 'none';
        btn.style.borderRadius = '30px';
        btn.style.cursor = 'pointer';
        btn.style.fontWeight = '600';
        btn.style.transition = 'all 0.3s';
        
        btn.addEventListener('mouseover', function() {
          if (btn.textContent !== 'All' || btn.style.backgroundColor !== 'var(--primary-color)') {
            btn.style.transform = 'translateY(-3px)';
            btn.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
          }
        });
        
        btn.addEventListener('mouseout', function() {
          if (btn.textContent !== 'All' || btn.style.backgroundColor !== 'var(--primary-color)') {
            btn.style.transform = 'translateY(0)';
            btn.style.boxShadow = 'none';
          }
        });
        
        btn.addEventListener('click', function() {
          // Update active button style
          document.querySelectorAll('.filter-btn').forEach(button => {
            button.style.backgroundColor = 'rgba(67, 97, 238, 0.1)';
            button.style.color = 'var(--primary-color)';
          });
          
          btn.style.backgroundColor = 'var(--primary-color)';
          btn.style.color = 'white';
          
          // Filter certifications
          filterCertifications(issuer);
        });
        
        filterContainer.appendChild(btn);
      });
      
      // Insert filter container before the grid
      const grid = document.querySelector('.certifications-grid');
      grid.parentNode.insertBefore(filterContainer, grid);
    }
    
    // Function to filter certifications by issuer
    function filterCertifications(issuer) {
      const cards = document.querySelectorAll('.cert-card');
      
      cards.forEach(card => {
        if (issuer === 'All') {
          card.style.display = 'block';
          card.classList.add('fade-in');
        } else {
          const cardIssuer = card.querySelector('.cert-issuer').textContent;
          if (cardIssuer === issuer) {
            card.style.display = 'block';
            card.classList.add('fade-in');
          } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
          }
        }
      });
      
      // Add fade-in animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
          animation: fadeIn 0.5s forwards;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Function to initialize the section
    function initCertificationsSection() {
      renderCertifications();
      setupFilterButtons();
      
      // Add a search feature
      const searchContainer = document.createElement('div');
      searchContainer.className = 'cert-search';
      searchContainer.style.maxWidth = '500px';
      searchContainer.style.margin = '0 auto 40px';
      searchContainer.style.position = 'relative';
      
      searchContainer.innerHTML = `
        <input type="text" placeholder="Search certifications..." class="cert-search-input" 
          style="width: 100%; padding: 12px 20px; border-radius: 30px; border: 1px solid #ddd; 
          font-size: 16px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); transition: all 0.3s;">
        <i class="fas fa-search" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); 
          color: var(--primary-color);"></i>
      `;
      
      // Insert search before filters
      const filters = document.querySelector('.cert-filters');
      filters.parentNode.insertBefore(searchContainer, filters);
      
      // Add search functionality
      const searchInput = searchContainer.querySelector('.cert-search-input');
      searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const cards = document.querySelectorAll('.cert-card');
        
        cards.forEach(card => {
          const title = card.querySelector('.cert-title').textContent.toLowerCase();
          const issuer = card.querySelector('.cert-issuer').textContent.toLowerCase();
          const skills = Array.from(card.querySelectorAll('.cert-skill')).map(skill => skill.textContent.toLowerCase());
          
          if (title.includes(query) || issuer.includes(query) || skills.some(skill => skill.includes(query))) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
      
      // Enhance the search input
      searchInput.addEventListener('focus', function() {
        this.style.boxShadow = '0 5px 25px rgba(67, 97, 238, 0.15)';
        this.style.borderColor = 'var(--primary-color)';
      });
      
      searchInput.addEventListener('blur', function() {
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
        this.style.borderColor = '#ddd';
      });
    }
    
    // Initialize the certification section
    initCertificationsSection();
    
    // Helper function for animations - can be used with Intersection Observer for on-scroll animations
    function setupScrollAnimations() {
      // This is a simple implementation - consider using AOS library for more advanced animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });
      
      document.querySelectorAll('.cert-card').forEach(card => {
        observer.observe(card);
      });
      
      // Add animation styles
      const style = document.createElement('style');
      style.textContent = `
        .cert-card {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.5s, transform 0.5s;
        }
        
        .cert-card.animate {
          opacity: 1;
          transform: translateY(0);
        }
      `;
      document.head.appendChild(style);
    }
    
    // Set up scroll animations
    setupScrollAnimations();
  });

  // Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) library
    // Note: You need to include AOS library in your HTML
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  
    // Contact form submission handler
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form (basic validation)
        if (!name || !email || !subject || !message) {
          showNotification('Please fill all required fields', 'error');
          return;
        }
        
        if (!isValidEmail(email)) {
          showNotification('Please enter a valid email address', 'error');
          return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form submission)
        setTimeout(function() {
          // Reset form
          contactForm.reset();
          
          // Reset button
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
          
          // Show success message
          showNotification('Your message has been sent successfully!', 'success');
        }, 1500);
        
        // In a real application, you would send the form data to your server here
        // Example using fetch:
        /*
        fetch('your-form-endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            subject: subject,
            message: message
          }),
        })
        .then(response => response.json())
        .then(data => {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
          contactForm.reset();
          showNotification('Your message has been sent successfully!', 'success');
        })
        .catch(error => {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
          showNotification('There was an error sending your message. Please try again.', 'error');
        });
        */
      });
    }
    
    // Add animation effects to form fields
    const formInputs = document.querySelectorAll('.input-container input, .input-container textarea');
    
    formInputs.forEach(input => {
      // Add focus effect
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('input-focused');
      });
      
      // Remove focus effect
      input.addEventListener('blur', function() {
        this.parentElement.classList.remove('input-focused');
      });
      
      // Add typing effect
      input.addEventListener('input', function() {
        if (this.value.length > 0) {
          this.classList.add('has-text');
        } else {
          this.classList.remove('has-text');
        }
      });
    });
    
    // Add hover effects to contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.contact-card-icon i');
        icon.classList.add('fa-beat');
        setTimeout(() => {
          icon.classList.remove('fa-beat');
        }, 1000);
      });
    });
    
    // Add typing effect to the form header
    const formHeader = document.querySelector('.form-header h3');
    if (formHeader) {
      const text = formHeader.textContent;
      formHeader.textContent = '';
      
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          formHeader.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 100);
    }
    
    // Add particle background (tech-inspired)
    createParticleBackground();
  });
  
  // Utility functions
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  function showNotification(message, type = 'info') {
    // Check if notification container exists, create if not
    let notifContainer = document.querySelector('.notification-container');
    
    if (!notifContainer) {
      notifContainer = document.createElement('div');
      notifContainer.className = 'notification-container';
      document.body.appendChild(notifContainer);
      
      // Add styles for notification container
      notifContainer.style.position = 'fixed';
      notifContainer.style.bottom = '20px';
      notifContainer.style.right = '20px';
      notifContainer.style.zIndex = '1000';
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-icon">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
      </div>
      <div class="notification-content">
        <p>${message}</p>
      </div>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    // Add styles for notification
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.background = type === 'success' ? '#06d6a0' : type === 'error' ? '#ef476f' : '#4361ee';
    notification.style.color = 'white';
    notification.style.borderRadius = '8px';
    notification.style.padding = '15px';
    notification.style.marginBottom = '10px';
    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease';
    
    // Add notification to container
    notifContainer.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
      notification.style.opacity = '1';
    }, 10);
    
    // Setup close button
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
          notification.remove();
        }, 300);
      });
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
          notification.remove();
        }, 300);
      }
    }, 5000);
  }
  
  function createParticleBackground() {
    // Create canvas for particles if not already present
    if (!document.getElementById('particle-canvas')) {
      const canvas = document.createElement('canvas');
      canvas.id = 'particle-canvas';
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '0';
      canvas.style.opacity = '0.3';
      
      // Add canvas to contact section
      const contactSection = document.querySelector('.contact-section');
      if (contactSection) {
        contactSection.insertBefore(canvas, contactSection.firstChild);
        
        // Set canvas dimensions
        canvas.width = contactSection.offsetWidth;
        canvas.height = contactSection.offsetHeight;
        
        // Initialize particles
        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 30;
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            color: `rgba(${67 + Math.random() * 20}, ${97 + Math.random() * 20}, ${238 + Math.random() * 20}, ${Math.random() * 0.3 + 0.1})`,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5
          });
        }
        
        // Animate particles
        function animateParticles() {
          requestAnimationFrame(animateParticles);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          particles.forEach(particle => {
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) {
              particle.speedX = -particle.speedX;
            }
            
            if (particle.y < 0 || particle.y > canvas.height) {
              particle.speedY = -particle.speedY;
            }
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Draw connections between nearby particles
            particles.forEach(otherParticle => {
              const dx = particle.x - otherParticle.x;
              const dy = particle.y - otherParticle.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(67, 97, 238, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
              }
            });
          });
        }
        
        // Start animation
        animateParticles();
        
        // Handle window resize
        window.addEventListener('resize', () => {
          canvas.width = contactSection.offsetWidth;
          canvas.height = contactSection.offsetHeight;
        });
      }
    }
  }
  
  // Add "typing cursor" effect to highlight text
  document.addEventListener('DOMContentLoaded', function() {
    const highlight = document.querySelector('.highlight');
    
    if (highlight) {
      // Create and append a cursor element
      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      cursor.innerHTML = '|';
      cursor.style.display = 'inline-block';
      cursor.style.marginLeft = '3px';
      cursor.style.fontWeight = '300';
      cursor.style.animation = 'cursor-blink 1s infinite';
      highlight.appendChild(cursor);
      
      // Add cursor blinking animation to stylesheet
      const style = document.createElement('style');
      style.textContent = `
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  });

document.addEventListener('DOMContentLoaded', function() {
    // Initialize skill tabs functionality
    initSkillTabs();
});

function initSkillTabs() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            // Close all other skill items
            skillItems.forEach(skill => {
                if (skill !== item) {
                    skill.classList.remove('active');
                }
            });

            // Toggle the clicked skill item
            item.classList.toggle('active');
        });
    });
}

