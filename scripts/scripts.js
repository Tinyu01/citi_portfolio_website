// Chatbot Toggle
document.querySelector('.chatbot-icon').addEventListener('click', () => {
  document.querySelector('.chatbot-window').classList.toggle('active');
});

// Close Chatbot
document.querySelector('.close-chatbot').addEventListener('click', () => {
  document.querySelector('.chatbot-window').classList.remove('active');
});

// Initialize Tilt Effect
VanillaTilt.init(document.querySelectorAll('.card'), {
  max: 25,
  speed: 400,
  glare: true,
  'max-glare': 0.5,
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  const isLightMode = body.classList.contains('light-mode');
  themeToggle.innerHTML = isLightMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

// Carousel Initialization
const projectCarousel = new bootstrap.Carousel('#projectCarousel');
const testimonialCarousel = new bootstrap.Carousel('#testimonialCarousel');