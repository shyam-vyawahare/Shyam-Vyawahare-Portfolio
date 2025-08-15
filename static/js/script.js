document.addEventListener('DOMContentLoaded', function() {
  // =============================================
  // Typing animation for hero text
  // =============================================
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 100);
  }
  
  // ===== FONT LOADING OPTIMIZATION =====
  document.fonts.ready.then(() => {
  document.documentElement.classList.add('fonts-loaded');
  });

  // Font load fallback (if takes longer than 500ms)
  setTimeout(() => {
    document.documentElement.classList.add('fonts-loaded');
  }, 500);


  // =============================================
  // Enhanced Scroll Animations
  // =============================================
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.section > .container > *');
    const windowHeight = window.innerHeight;
    const triggerOffset = windowHeight / 1.5;
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const elementHeight = element.offsetHeight;
    
    // Calculate distance from center of viewport
    const distanceFromCenter = Math.abs(elementPosition + elementHeight/2 - windowHeight/2);
    
    // When element enters viewport (with 20% threshold)
    if (elementPosition < triggerOffset) {
      // Remove and re-add animated class to restart animation
      element.classList.remove('animated');
      void element.offsetWidth; // Trigger reflow
      element.classList.add('animated');
      
      // Dynamic intensity based on scroll speed and position
      const scrollIntensity = 1 - Math.min(distanceFromCenter / windowHeight, 0.5);
      element.style.setProperty('--animation-intensity', scrollIntensity);
      
      // Add bounce effect when near center
      if (distanceFromCenter < windowHeight/4) {
        element.classList.add('focus-animation');
      } else {
        element.classList.remove('focus-animation');
      }
    } else {
      // Reset when scrolled out of view
      element.classList.remove('animated', 'focus-animation');
    }
  });
};

// Initialize animations
document.querySelectorAll('.section').forEach((section, index) => {
  const container = section.querySelector('.container');
  container.style.transitionDelay = `${index * 0.15}s`;
  
  // Add parallax effect to background elements
  const bgElements = section.querySelectorAll('.bg-element');
  bgElements.forEach(el => {
    el.setAttribute('data-speed', (0.3 + Math.random() * 0.4).toFixed(2));
  });
});

// Add scroll event with throttling
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', function() {
  lastScroll = window.scrollY;
  
  if (!ticking) {
    window.requestAnimationFrame(function() {
      animateOnScroll();
      ticking = false;
    });
    ticking = true;
  }
});

// Initial trigger
animateOnScroll();

// Add mouse move effects for interactive elements
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  document.querySelectorAll('.interactive-element').forEach(el => {
    const moveX = (mouseX - 0.5) * 20;
    const moveY = (mouseY - 0.5) * 20;
    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

  // =============================================
  // Hover effect for project cards
  // =============================================
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const x = e.clientX - card.getBoundingClientRect().left;
      const y = e.clientY - card.getBoundingClientRect().top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // =============================================
  // Dark/light mode toggle
  // =============================================
  const modeToggle = document.createElement('div');
  modeToggle.className = 'mode-toggle';
  modeToggle.innerHTML = '🌓';
  document.body.appendChild(modeToggle); // Changed from nav to body
  
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
  // Smooth scrolling for section links (if any)
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // =============================================
  // Responsive adjustments
  // =============================================
  function handleResize() {
    // Add any responsive JS adjustments here if needed
  }

  window.addEventListener('resize', handleResize);
});

document.addEventListener('DOMContentLoaded', function() {
    // Set up the Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add slide-in class when section comes into view
                entry.target.classList.add('slide-in');
                
                // Optional: Stop observing after animation triggers
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        // Add initial hidden state
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Start observing each section
        observer.observe(section);
    });

    // Optional: Add this to your CSS or keep it in JS
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
});


