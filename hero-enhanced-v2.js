// === HERO ENHANCED V2 - INTERACTIVE FEATURES ===

// Simulate active users counter
function animateActiveUsers() {
  const counterEl = document.getElementById('activeUsers');
  if (!counterEl) return;

  setInterval(() => {
    const currentCount = parseInt(counterEl.textContent);
    const change = Math.random() > 0.5 ? 1 : -1;
    const newCount = Math.max(200, Math.min(300, currentCount + change));

    counterEl.style.transform = 'scale(1.1)';
    setTimeout(() => {
      counterEl.textContent = newCount;
      counterEl.style.transform = 'scale(1)';
    }, 150);
  }, 5000); // Update every 5 seconds
}

// Share button functionality
function initShareButton() {
  const shareBtn = document.getElementById('heroShareBtn');
  if (!shareBtn) return;

  shareBtn.addEventListener('click', async () => {
    const shareData = {
      title: 'Datos Bíblicos Interactivos',
      text: 'Descubre patrones, historias y estadísticas que nunca habías visto en la Biblia',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        showShareFeedback('¡Enlace copiado al portapapeles!');
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  });
}

// Show share feedback
function showShareFeedback(message) {
  const feedback = document.createElement('div');
  feedback.className = 'share-feedback';
  feedback.textContent = message;
  feedback.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(78, 205, 196, 0.95);
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
  `;

  document.body.appendChild(feedback);

  setTimeout(() => {
    feedback.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => feedback.remove(), 300);
  }, 3000);
}

// Mobile view button
function initMobileButton() {
  const mobileBtn = document.getElementById('heroMobileBtn');
  if (!mobileBtn) return;

  mobileBtn.addEventListener('click', () => {
    // Generate QR code or show mobile instructions
    showMobileModal();
  });
}

// Show mobile modal
function showMobileModal() {
  const modal = document.createElement('div');
  modal.className = 'mobile-modal';
  modal.innerHTML = `
    <div class="mobile-modal-content">
      <button class="mobile-modal-close">&times;</button>
      <h3>Ver en tu móvil</h3>
      <p>Escanea este QR o abre este enlace en tu dispositivo móvil:</p>
      <div class="qr-placeholder">
        <div class="qr-code">QR</div>
      </div>
      <div class="mobile-url">
        <input type="text" value="${window.location.href}" readonly id="mobileUrl">
        <button class="copy-url-btn" id="copyMobileUrl">Copiar</button>
      </div>
    </div>
  `;

  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
  `;

  document.body.appendChild(modal);

  // Close button
  modal.querySelector('.mobile-modal-close').addEventListener('click', () => {
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => modal.remove(), 300);
  });

  // Copy URL button
  document.getElementById('copyMobileUrl').addEventListener('click', async () => {
    const urlInput = document.getElementById('mobileUrl');
    urlInput.select();
    await navigator.clipboard.writeText(urlInput.value);
    showShareFeedback('¡Enlace copiado!');
  });

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => modal.remove(), 300);
    }
  });
}

// Scroll indicator click
function initScrollIndicator() {
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');
  if (!scrollIndicator) return;

  scrollIndicator.addEventListener('click', () => {
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
      statsGrid.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Animate dashboard on scroll
function animateDashboardOnScroll() {
  const dashboard = document.querySelector('.hero-dashboard-mockup');
  if (!dashboard) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';

    if (scrollDirection === 'down') {
      dashboard.style.transform = `translateY(${scrollY * 0.3}px) scale(0.95)`;
      dashboard.style.opacity = Math.max(0, 1 - (scrollY / 500));
    } else {
      dashboard.style.transform = `translateY(${scrollY * 0.3}px) scale(1)`;
      dashboard.style.opacity = Math.min(1, 1 - (scrollY / 500));
    }

    lastScrollY = scrollY;
  });
}

// Wave banner scroll effect
function initWaveBannerScroll() {
  const waveBanner = document.querySelector('.hero-wave-banner');
  if (!waveBanner) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    waveBanner.style.opacity = Math.max(0, 1 - (scrollY / 300));
  });
}

// Constellation parallax effect
function initConstellationParallax() {
  const constellations = document.querySelectorAll('.constellation');
  if (constellations.length === 0) return;

  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    constellations.forEach((constellation, index) => {
      const speed = (index + 1) * 0.3;
      const x = (mouseX - 0.5) * speed * 30;
      const y = (mouseY - 0.5) * speed * 30;

      constellation.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

// Add CSS animations
function addCSSAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    .mobile-modal-content {
      background: white;
      border-radius: 20px;
      padding: 30px;
      max-width: 400px;
      width: 90%;
      position: relative;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    body.dark .mobile-modal-content {
      background: #1f2937;
      color: #f0f0f0;
    }

    .mobile-modal-close {
      position: absolute;
      top: 15px;
      right: 15px;
      background: none;
      border: none;
      font-size: 2rem;
      color: #999;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .mobile-modal-close:hover {
      color: #333;
    }

    body.dark .mobile-modal-close:hover {
      color: #f0f0f0;
    }

    .mobile-modal-content h3 {
      margin-bottom: 15px;
      color: #667eea;
    }

    .mobile-modal-content p {
      color: #666;
      margin-bottom: 20px;
    }

    body.dark .mobile-modal-content p {
      color: #d1d5db;
    }

    .qr-placeholder {
      display: flex;
      justify-content: center;
      margin: 20px 0;
    }

    .qr-code {
      width: 150px;
      height: 150px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 700;
      color: white;
    }

    .mobile-url {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    .mobile-url input {
      flex: 1;
      padding: 10px 15px;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 0.9rem;
    }

    body.dark .mobile-url input {
      background: #374151;
      border-color: #4b5563;
      color: #f0f0f0;
    }

    .copy-url-btn {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .copy-url-btn:hover {
      transform: scale(1.05);
    }
  `;
  document.head.appendChild(style);
}

// Initialize all features
function initHeroEnhancedV2() {
  animateActiveUsers();
  initShareButton();
  initMobileButton();
  initScrollIndicator();
  animateDashboardOnScroll();
  initWaveBannerScroll();
  initConstellationParallax();
  addCSSAnimations();
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initHeroEnhancedV2();
});
