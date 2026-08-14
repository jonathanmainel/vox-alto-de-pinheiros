/* ==========================================================================
   VOX2YOU ALTO DE PINHEIROS - INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      mobileToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  // 3. Course Tabs Switcher
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.course-content-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCourse = btn.getAttribute('data-course');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(`course-${targetCourse}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // 4. FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentItem = btn.closest('.faq-item');
      if (!parentItem) return;
      const isActive = parentItem.classList.contains('active');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isActive) {
        parentItem.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 5. YouTube Inline Video Player
  const videoTriggers = document.querySelectorAll('[data-video-id]');

  function playVideoInline(trigger, videoId) {
    if (!trigger || !videoId || trigger.classList.contains('is-playing')) return;

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&vq=hd1080&hd=1`;
    iframe.title = trigger.getAttribute('title') || 'Vídeo Vox';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;

    trigger.classList.add('is-playing');
    trigger.innerHTML = '';
    trigger.appendChild(iframe);
  }

  videoTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const videoId = trigger.getAttribute('data-video-id');
      playVideoInline(trigger, videoId);
    });
  });

  // 6. Phone Masking
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 6) {
        v = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
      } else if (v.length > 2) {
        v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
      } else if (v.length > 0) {
        v = `(${v}`;
      }
      e.target.value = v;
    });
  }

  // 7. Form Submission & Toast Feedback
  const heroForm = document.getElementById('heroForm');
  const toastNotification = document.getElementById('toastNotification');

  if (heroForm) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const phone = document.getElementById('phone')?.value.trim();
      const profession = document.getElementById('profession')?.value.trim() || 'Nao informado';

      if (!name || !email || !phone) {
        showToast('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      // Show Success Toast
      showToast(`Obrigado, ${name}! Seu contato foi recebido com sucesso.`);

      // Optional: Prepare WhatsApp Redirect Message
      const encodedMsg = encodeURIComponent(
        `Olá Vox Alto de Pinheiros! Meu nome é ${name}, tenho interesse no curso de Oratória.\n\n` +
        `📱 WhatsApp: ${phone}\n` +
        `✉️ E-mail: ${email}\n` +
        `💼 Profissão: ${profession}`
      );
      
      const whatsappUrl = `https://wa.me/5511999998888?text=${encodedMsg}`;

      // Reset form after short delay
      setTimeout(() => {
        heroForm.reset();
        window.open(whatsappUrl, '_blank');
      }, 1500);
    });
  }

  function showToast(message) {
    if (toastNotification) {
      const toastText = toastNotification.querySelector('.toast-text');
      if (toastText) toastText.textContent = message;
      
      toastNotification.classList.add('active');
      setTimeout(() => {
        toastNotification.classList.remove('active');
      }, 4000);
    }
  }
});
