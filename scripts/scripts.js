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

if (!chatbotBody || !chatbotInput || !chatbotWindow || !sendButton) {
  console.error('Chatbot elements not found in the DOM');
  return;
}

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