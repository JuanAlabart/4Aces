document.addEventListener('DOMContentLoaded', () => {
  // MENÚ HAMBURGUESA
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('sidebar-open');
    });

    document.addEventListener('click', (event) => {
      if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        sidebar.classList.remove('sidebar-open');
      }
    });
  }

  // CHATBOT
  const chatbotButton = document.getElementById('chatbot-button');
  const chatbotPopup = document.getElementById('chatbot-popup');
  const closeChatbot = document.querySelector('.chatbot-header button');
  const chatbotForm = document.getElementById('chatbot-form');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotMessages = document.querySelector('.chatbot-messages');

  // Abrir o cerrar el popup al hacer clic en el botón del chatbot
  chatbotButton.addEventListener('click', () => {
    if (chatbotPopup.classList.contains('open')) {
      chatbotPopup.classList.remove('open');
    } else {
      chatbotPopup.classList.add('open');
    }
  });

  // Cerrar el popup al hacer clic en el botón de cierre (X)
  closeChatbot.addEventListener('click', () => {
    chatbotPopup.classList.remove('open');
  });

  // Enviar mensaje
  chatbotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userMessage = chatbotInput.value.trim();
    if (userMessage) {
      addMessage(userMessage, 'user');
      chatbotInput.value = '';
      setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        addMessage(botResponse, 'bot');
      }, 500);
    }
  });

  // Agregar mensaje al chat
  function addMessage(text, sender) {
    const message = document.createElement('div');
    message.classList.add('message', sender);
    message.textContent = text;
    chatbotMessages.appendChild(message);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Desplazar hacia abajo
  }

  // Respuestas automáticas simples
  function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('hola')) {
      return '¡Hola! ¿Cómo puedo ayudarte?';
    } else if (lowerMessage.includes('precio')) {
      return 'Nuestros precios varían según el servicio. ¿Qué necesitas?';
    } else if (lowerMessage.includes('gracias')) {
      return '¡De nada! 😊';
    } else {
      return 'Lo siento, no entiendo tu mensaje. ¿Puedes reformularlo?';
    }
  }

  // CARRUSEL
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const images = carousel.querySelectorAll('img');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentIndex = 0;

    function updateCarousel() {
      if (images[0]) {
        const slideWidth = images[0].clientWidth;
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
          currentIndex++;
          updateCarousel();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });
    }

    window.addEventListener('resize', () => {
      updateCarousel();
    });
  });

  // LIGHTBOX
  const lightboxes = document.querySelectorAll('.lightbox');
  lightboxes.forEach((lightbox) => {
    const prevBtn = lightbox.querySelector('.prev-lightbox');
    const nextBtn = lightbox.querySelector('.next-lightbox');

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = prevBtn.getAttribute('href').substring(1);
        const targetLightbox = document.getElementById(targetId);
        if (targetLightbox) {
          window.location.hash = `#${targetId}`;
        }
      });

      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = nextBtn.getAttribute('href').substring(1);
        const targetLightbox = document.getElementById(targetId);
        if (targetLightbox) {
          window.location.hash = `#${targetId}`;
        }
      });
    }
  });

  // Cerrar el lightbox al hacer clic fuera de la imagen
  document.addEventListener('click', (e) => {
    const lightbox = e.target.closest('.lightbox');
    if (lightbox && e.target === lightbox) {
      window.location.hash = ''; // Cierra el lightbox
    }
  });

  // Navegación con el teclado en el lightbox
  document.addEventListener('keydown', (e) => {
    const currentLightbox = document.querySelector('.lightbox:target');
    if (!currentLightbox) return; // Si no hay un lightbox abierto, no hacer nada

    if (e.key === 'ArrowLeft') {
      // Navegar a la imagen anterior
      const prevLink = currentLightbox.querySelector('.prev-lightbox');
      if (prevLink) {
        window.location.hash = prevLink.getAttribute('href');
      }
    } else if (e.key === 'ArrowRight') {
      // Navegar a la imagen siguiente
      const nextLink = currentLightbox.querySelector('.next-lightbox');
      if (nextLink) {
        window.location.hash = nextLink.getAttribute('href');
      }
    } else if (e.key === 'Escape') {
      // Cerrar el lightbox
      window.location.hash = '';
    }
  });

  // TOGGLE CARDS
  const cardContainer = document.querySelector('.trabajos');
  if (cardContainer) {
    cardContainer.addEventListener('click', (event) => {
      const button = event.target.closest('.toggle-card');
      if (button) {
        const card = button.closest('.card');
        if (card) {
          card.classList.toggle('open');

          // Cambiar la clase del botón para mostrar la flecha correcta
          button.classList.toggle('up', card.classList.contains('open'));
          button.classList.toggle('down', !card.classList.contains('open'));
        }
      }
    });
  }
});