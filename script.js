document.addEventListener('DOMContentLoaded', function() {
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
  const chatbotMessages = document.querySelector('.chatbot-messages');
  const chatbotQuestions = document.querySelectorAll('.chatbot-question');
  const chatbotQuestionsContainer = document.getElementById('chatbot-questions');

  function showMainMenu() {
    chatbotQuestionsContainer.style.display = 'flex';
    const volverBtn = document.getElementById('chatbot-volver');
    if (volverBtn) volverBtn.remove();
  }

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

  chatbotQuestions.forEach(btn => {
    btn.addEventListener('click', function() {
      // Mostrar pregunta del usuario
      const userMsg = document.createElement('div');
      userMsg.className = 'message user';
      userMsg.textContent = this.textContent;
      chatbotMessages.appendChild(userMsg);

      // Mostrar respuesta del bot
      const botMsg = document.createElement('div');
      botMsg.className = 'message bot';

      switch (this.textContent) {
        case '¿Qué servicios ofrecen?':
          botMsg.textContent = 'Ofrecemos análisis de datos, optimización de procesos, dashboards y modelos predictivos.';
          break;
        case '¿Quiénes forman el equipo?':
          botMsg.textContent = 'Nuestro equipo está formado por 4 especialistas en datos, automatización y desarrollo web.';
          break;
        case '¿Cómo puedo contactarlos?':
          botMsg.textContent = 'Puedes contactarnos desde la sección Consultas o por LinkedIn.';
          break;
        case '¿Qué herramientas usan?':
          botMsg.textContent = 'Usamos Power BI, Python, SQL y Trello para nuestros proyectos.';
          break;
        default:
          botMsg.textContent = '¡Pregunta no reconocida!';
      }

      chatbotMessages.appendChild(botMsg);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

      // Oculta las preguntas y muestra el botón volver
      chatbotQuestionsContainer.style.display = 'none';
      if (!document.getElementById('chatbot-volver')) {
        const volverBtn = document.createElement('button');
        volverBtn.id = 'chatbot-volver';
        volverBtn.textContent = 'Volver al menú';
        volverBtn.className = 'chatbot-question';
        volverBtn.style.marginTop = '12px';
        volverBtn.onclick = showMainMenu;
        chatbotQuestionsContainer.parentNode.appendChild(volverBtn);
      }
    });
  });

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

    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    function setTheme(dark) {
      document.body.classList.toggle('dark-mode', dark);
      document.body.classList.toggle('light-mode', !dark);
      themeToggle.checked = dark;
      localStorage.setItem('theme', dark ? 'dark' : 'light');
      // Cambia los íconos según el estado
      if (dark) {
        moonIcon.src = 'logos/moon-on.svg';
        sunIcon.src = 'logos/sun-off.svg';
      } else {
        moonIcon.src = 'logos/moon-off.svg';
        sunIcon.src = 'logos/sun-on.svg';
      }
    }

    // Inicializar tema
    if (savedTheme) {
      setTheme(savedTheme === 'dark');
    } else {
      setTheme(prefersDark);
    }

    themeToggle.addEventListener('change', () => {
      setTheme(themeToggle.checked);
    });


    function showIntroOverlay() {
      const overlay = document.getElementById('intro-overlay');
      overlay.classList.remove('hide');
    }
    
    function hideIntroOverlay() {
      const overlay = document.getElementById('intro-overlay');
      overlay.classList.add('hide');
    }
    
    // Ocultar overlay al hacer click
    document.getElementById('intro-overlay').addEventListener('click', hideIntroOverlay);
    
    // Mostrar overlay al cargar la página (siempre)
    showIntroOverlay();

    
    // Al hacer click en el logo de la topbar, mostrar animación de nuevo
    document.querySelector('.topbar-left a').addEventListener('click', function(e) {
    e.preventDefault();
    showIntroOverlay();
      setTimeout(() => {window.location.href = this.href;}, 700); // Espera la animación antes de navegar
    });
});