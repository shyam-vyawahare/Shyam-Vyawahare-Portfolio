// Optimized JavaScript for faster hero title loading
document.addEventListener('DOMContentLoaded', function() {
  // =============================================
  // IMMEDIATE HERO TITLE DISPLAY (No typing animation)
  // =============================================
  const heroTitle = document.querySelector('.hero h1');
  // Title is already visible in HTML, no need for JS animation
  
  // ===== FONT LOADING OPTIMIZATION =====
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      document.documentElement.classList.add('fonts-loaded');
    }).catch(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
  } else {
    // Fallback for browsers that don't support document.fonts
    setTimeout(() => {
      document.documentElement.classList.add('fonts-loaded');
    }, 300);
  }

  // =============================================
  // Optimized Scroll Animations with Intersection Observer
  // =============================================
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-in');
        // Stop observing after animation triggers
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Observe all sections for scroll animations
  document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
  });

  // =============================================
  // Element Animation on Scroll (for elements within sections)
  // =============================================
  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // Add focus animation for elements near center
        const rect = entry.target.getBoundingClientRect();
        const distanceFromCenter = Math.abs(rect.top + rect.height/2 - window.innerHeight/2);
        
        if (distanceFromCenter < window.innerHeight/4) {
          entry.target.classList.add('focus-animation');
        }
      }
    });
  }, { threshold: 0.15 });

  // Observe elements within sections
  document.querySelectorAll('.section > .container > *').forEach(element => {
    elementObserver.observe(element);
  });

  // =============================================
  // Hover effect for project cards (with performance optimization)
  // =============================================
  let hoverTimeout;
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      // Throttle the mousemove events
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }, 16); // ~60fps
    });
  });

  // =============================================
  // Dark/light mode toggle
  // =============================================
  const modeToggle = document.createElement('div');
  modeToggle.className = 'mode-toggle';
  modeToggle.innerHTML = '🌓';
  document.body.appendChild(modeToggle);
  
  modeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    this.innerHTML = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
  });

  // Check for saved preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    modeToggle.innerHTML = '🌙';
  }

  // =============================================
  // Smooth scrolling for section links
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // =============================================
  // Optimized mouse move effects (throttled)
  // =============================================
  let mouseMoveTimeout;
  document.addEventListener('mousemove', (e) => {
    // Throttle mousemove events
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(() => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      document.querySelectorAll('.interactive-element').forEach(el => {
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    }, 16); // ~60fps
  });

  // =============================================
  // Responsive adjustments (debounced)
  // =============================================
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Any responsive adjustments would go here
    }, 250);
  });
});

// Add CSS for animations (inject if not already in your CSS)
(function() {
  const style = document.createElement('style');
  style.textContent = `
    .slide-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    /* For staggered animations */
    .section:nth-child(2) { transition-delay: 0.1s !important; }
    .section:nth-child(3) { transition-delay: 0.2s !important; }
    .section:nth-child(4) { transition-delay: 0.3s !important; }
  `;
  document.head.appendChild(style);
})();

// Contact form handling with prettier feedback
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitBtn = this.querySelector('.submit-btn');
    const messageDiv = document.getElementById('formMessage');
    
    // Reset state
    messageDiv.className = "";
    messageDiv.style.display = "none";

    // Disable button during submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
        const response = await fetch('/submit_contact', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            messageDiv.textContent = data.message;
            messageDiv.classList.add("show", "success");
            this.reset();
        } else {
            messageDiv.textContent = data.message;
            messageDiv.classList.add("show", "error");
        }
        
    } catch (error) {
        messageDiv.textContent = '❌ Network error. Please try again later.';
        messageDiv.classList.add("show", "error");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});

// About section animation on scroll
function animateAboutSection() {
    const aboutItems = document.querySelectorAll('.about-item');
    const options = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    aboutItems.forEach(item => {
        observer.observe(item);
    });
}

// Call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animateAboutSection();
});

// Hero ring animation and interaction
function initHeroRing() {
    const hero = document.querySelector('.hero');
    const ring = document.createElement('div');
    ring.className = 'hero-ring';
    
    const innerRing = document.createElement('div');
    innerRing.className = 'hero-ring-inner';
    
    const orb = document.createElement('div');
    orb.className = 'hero-ring-orb';
    
    ring.appendChild(innerRing);
    innerRing.appendChild(orb);
    hero.appendChild(ring);
    
    // Make ring interactive with mouse movement
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
        
        // Tilt the ring slightly toward mouse position
        ring.style.transform = `translate(-50%, -50%) rotate(${angle + 90}deg)`;
        innerRing.style.transform = `translate(-50%, -50%) rotate(${-angle - 90}deg)`;
    });
    
    // Reset ring position when mouse leaves
    hero.addEventListener('mouseleave', () => {
        ring.style.transform = 'translate(-50%, -50%)';
        innerRing.style.transform = 'translate(-50%, -50%)';
    });
}

// Call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHeroRing();
});