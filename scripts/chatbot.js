document.addEventListener('DOMContentLoaded', function () {
  const chatbotBody = document.getElementById('chatbot-body');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotWindow = document.querySelector('.chatbot-window');
  const sendButton = document.getElementById('send-button');

  if (!chatbotBody || !chatbotInput) {
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
    document.querySelector('.chatbot-window').classList.toggle('active');
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
      return `Masingita has experience as an ICT Intern at Collins Chabane Local Municipality and as a Freelance Software Engineer at Maltech Digital Solutions. You can read more about Masingita's experience [here](cv.html).`;
    } else if (lowerCaseMessage.includes('education')) {
      return `Masingita holds a Bachelor of Science in Information Technology from the University of Venda. You can find more details about Masingita's education [here](about.html).`;
    } else if (lowerCaseMessage.includes('contact')) {
      return `You can reach out via email at info@masingitamaluleke.com or connect on LinkedIn at https://www.linkedin.com/in/thefreelancer201/. You can also use the contact form [here](contact.html).`;
    } else {
      return `I'm not sure about that. Please contact Masingita directly at info@masingitamaluleke.com or visit the [contact page](contact.html).`;
    }
  }

  document.getElementById('chatbot-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  sendButton.addEventListener('click', sendMessage);
});
