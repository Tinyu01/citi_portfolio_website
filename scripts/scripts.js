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
document.addEventListener('DOMContentLoaded', (event) => {
  const yearSpan = document.querySelector('.year');
  yearSpan.textContent = new Date().getFullYear();
});

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  if (name && email && subject && message) {
    const mailtoLink = `mailto:216136982@edu.vut.ac.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
  } else {
    alert('Please fill in all fields.');
  }
});