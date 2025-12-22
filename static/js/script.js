document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    //              HERO TITLE DISPLAY 
    // =============================================
    const heroTitle = document.querySelector('.hero h1');

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
                // Removed focus-animation (pulse effect) - keeping only animated class
            }
        });
    }, { threshold: 0.15 });

    // Observe elements within sections
    document.querySelectorAll('.section > .container > *').forEach(element => {
        elementObserver.observe(element);
    });

    // Close mobile menu on various interactions 
    // Function to handle the menu closing
    function forceCloseMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');

        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            console.log("Menu closed successfully"); // Debugging check
        }
    }

    // Global click listener
    document.addEventListener('click', function(e) {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');

        if (!navMenu || !navToggle) return; // Exit if elements aren't found

        if (navMenu.classList.contains('active')) {
            // If clicking a LINK inside the menu, close it
            if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
                forceCloseMenu();
                return;
            }

            // If clicking OUTSIDE the menu and NOT on the toggle button, close it
            const isClickInside = navMenu.contains(e.target);
            const isClickOnToggle = navToggle.contains(e.target);

            if (!isClickInside && !isClickOnToggle) {
                forceCloseMenu();
            }
        }
    });

    // Scroll listener
    window.addEventListener('scroll', function() {
        forceCloseMenu();
    }, { passive: true });

    // =============================================
    // Hover effect for project cards 
    // =============================================

    document.querySelectorAll('.project-card').forEach(card => {
        let rafId = null;
        let mouseX = 0;
        let mouseY = 0;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;

            if (!rafId) {
                rafId = requestAnimationFrame(() => {
                    card.style.setProperty('--mouse-x', `${mouseX}px`);
                    card.style.setProperty('--mouse-y', `${mouseY}px`);
                    rafId = null;
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        });
    });


    // =============================================
    // Dark/light mode toggle (professional switch)
    // =============================================
    const modeToggle = document.createElement('button');
    modeToggle.type = 'button';
    modeToggle.className = 'mode-toggle';
    modeToggle.setAttribute('aria-label', 'Toggle dark mode');
    modeToggle.innerHTML = `
    <span class="mode-toggle-track">
      <span class="mode-toggle-thumb"></span>
      <span class="theme-toggle-icon theme-toggle-icon-sun">☀️</span>
      <span class="theme-toggle-icon theme-toggle-icon-moon">🌙</span>
    </span>
  `;
    document.body.appendChild(modeToggle);

    const applyTheme = (isDark) => {
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('darkMode', isDark ? 'true' : 'false');
    };

    // Initialize from saved preference (falls back to light)
    if (localStorage.getItem('darkMode') === 'true') {
        applyTheme(true);
    }

    modeToggle.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark-mode');
        applyTheme(isDark);
    });

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

// Contact form handling with Web3Forms
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.error('Contact form not found!');
        return;
    }

    console.log('Contact form found, attaching submit handler');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent page reload
        e.stopPropagation(); // Stop event bubbling

        const submitBtn = this.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const messageDiv = document.getElementById('formMessage');

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            messageDiv.textContent = '❌ Please fill in all fields.';
            messageDiv.classList.add("show", "error");
            messageDiv.style.display = "block";
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            messageDiv.textContent = '❌ Please enter a valid email address.';
            messageDiv.classList.add("show", "error");
            messageDiv.style.display = "block";
            return;
        }

        // Reset state
        messageDiv.className = "";
        messageDiv.style.display = "none";

        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';

        try {
            console.log('Submitting form to Web3Forms...');

            // Prepare form data for Web3Forms
            const formData = new FormData(this);

            // Log form data for debugging
            console.log('Form data:', {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                access_key: formData.get('access_key')
            });

            // Send email using Web3Forms API
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            // Success
            if (response.ok && data.success) {
                console.log('Form submitted successfully!');
                // Show success modal
                window.showSuccessModal();
                // Reset form
                this.reset();
                messageDiv.style.display = "none";
            } else {
                throw new Error(data.message || 'Failed to send message');
            }

        } catch (error) {
            console.error('Web3Forms Error:', error);
            messageDiv.textContent = '❌ Sorry, there was an error sending your message: ' + error.message + '. Please try again later or contact me directly at shyamvyawahare1@gmail.com';
            messageDiv.classList.add("show", "error");
            messageDiv.style.display = "block";
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    });
});

// Success Modal Functions (Global scope)
window.showSuccessModal = function() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'flex';
        console.log('Success modal displayed');
    } else {
        console.error('Success modal element not found!');
    }
}

window.closeSuccessModal = function() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside or on X button
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('successModal');
    const modalClose = document.querySelector('.modal-close');

    if (modal) {
        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeSuccessModal();
            }
        });

        // Close on X button click
        if (modalClose) {
            modalClose.addEventListener('click', closeSuccessModal);
        }
    }
});

const words = ["AI Developer", "Full-Stack Web Developer", "Digital Artist", "Novelist", "Content Writer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const dynamicText = document.getElementById("dynamic-text");

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        // Remove characters
        dynamicText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add characters
        dynamicText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Timing logic
    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        // Pause at the end of the word
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start the effect
document.addEventListener("DOMContentLoaded", typeEffect);

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
    initNavbar();
});

// =============================================
// Professional Navigation Bar Functionality
// =============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Handle scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveLink);

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}