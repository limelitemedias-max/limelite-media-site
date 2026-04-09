// main.js - Limelite Agency Website

// ===== DOM ELEMENTS =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');
const currentYear = document.getElementById('currentYear');
const navbar = document.querySelector('.navbar');
const popup = document.getElementById("successPopup");

// ===== FORM SUBMISSION (VALIDATION + WEB3FORMS + POPUP) =====
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ===== VALIDATION =====
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;

    if (!name || !email || !service) {
      alert('Please fill in all required fields.');
      return;
    }

    // ===== SEND DATA =====
    const data = new FormData(contactForm);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (result.success) {
        popup.style.display = "flex"; // ✅ SHOW POPUP
        contactForm.reset();
      } else {
        alert("Submission failed. Try again.");
      }

    } catch (error) {
      alert("Something went wrong!");
    }
  });
}

// ===== CLOSE POPUP =====
function closePopup() {
  popup.style.display = "none";
}

// ===== MOBILE NAVIGATION =====
function initMobileNavigation() {
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
}

// ===== SERVICES ACCORDION =====
function initServicesAccordion() {
    const serviceCards = document.querySelectorAll('.service-card');
    const isMobile = window.innerWidth <= 767;
    
    if (!isMobile) {
        serviceCards.forEach(card => {
            const content = card.querySelector('.service-content');
            if (content) content.style.display = 'block';
        });
        return;
    }
    
    serviceCards.forEach(card => {
        const header = card.querySelector('.service-header');
        const toggleBtn = card.querySelector('.service-toggle');
        const content = card.querySelector('.service-content');
        
        if (!header || !content) return;
        
        content.classList.remove('active');
        if (toggleBtn) toggleBtn.classList.remove('active');
        
        header.addEventListener('click', () => {
            serviceCards.forEach(otherCard => {
                if (otherCard !== card) {
                    const otherContent = otherCard.querySelector('.service-content');
                    const otherToggle = otherCard.querySelector('.service-toggle');
                    if (otherContent) otherContent.classList.remove('active');
                    if (otherToggle) otherToggle.classList.remove('active');
                }
            });
            
            content.classList.toggle('active');
            if (toggleBtn) toggleBtn.classList.toggle('active');
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (!animatedElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            } else {
                entry.target.classList.remove('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    animatedElements.forEach(element => observer.observe(element));
}

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
    const heroElements = document.querySelectorAll('.hero .animate-on-scroll');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animated');
        }, index * 200);
    });
}

// ===== HOVER EFFECT =====
function initServiceCardHover() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 767) {
                this.style.transform = 'translateY(-8px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 767) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// ===== FORM INPUT VALIDATION (UI) =====
function initFormValidation() {
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = this.checkValidity() ? '#4CAF50' : '#FFD700';
            }
        });
    });
}

// ===== UTILITY =====
function setCurrentYear() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

// ===== INIT =====
function initAllFeatures() {
    setCurrentYear();
    initMobileNavigation();
    initSmoothScrolling();
    initFormValidation(); // keep validation UI
    initHeroAnimations();
    initScrollAnimations();
    initServicesAccordion();
    initServiceCardHover();
    
    console.log('Limelite Website Initialized');
}

window.addEventListener('load', initAllFeatures);

// ===== RESIZE =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initServicesAccordion();
    }, 250);
});