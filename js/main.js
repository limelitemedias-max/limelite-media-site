// main.js - Limelite Agency Website

// ===== DOM ELEMENTS =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');
const currentYear = document.getElementById('currentYear');
const navbar = document.querySelector('.navbar');
const form = document.getElementById("contactForm");
const popup = document.getElementById("successPopup");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const response = await fetch(form.action, {
    method: "POST",
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  if(response.ok){
    popup.style.display = "flex";
    form.reset();
  } 
});

function closePopup(){
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

// ===== FORM SUBMISSION =====
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !service) {
            alert('Please fill in all required fields.');
            return;
        }
        
        console.log('Form submitted:', { name, email, service, message });
        alert(`Thank you, ${name}! We'll contact you at ${email} within 24 hours.`);
        contactForm.reset();
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

// ===== SERVICES ACCORDION (MOBILE) =====
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
            const isActive = content.classList.contains('active');
            
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
                
                if (entry.target.classList.contains('stagger-children')) {
                    const children = entry.target.querySelectorAll('.animate-on-scroll');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animated');
                        }, index * 100);
                    });
                }
            } else {
                entry.target.classList.remove('animated');
                
                if (entry.target.classList.contains('stagger-children')) {
                    const children = entry.target.querySelectorAll('.animate-on-scroll');
                    children.forEach(child => {
                        child.classList.remove('animated');
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    animatedElements.forEach(element => {
        if (!element.parentElement.classList.contains('stagger-children')) {
            observer.observe(element);
        }
    });
    
    document.querySelectorAll('.stagger-children').forEach(container => {
        observer.observe(container);
    });
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

// ===== SERVICE CARD HOVER EFFECTS =====
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

// ===== FORM INPUT VALIDATION =====
function initFormValidation() {
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = this.checkValidity() ? '#4CAF50' : '#FFD700';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#FFD700';
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function setCurrentYear() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

// ===== INITIALIZE ALL FEATURES =====
function initAllFeatures() {
    setCurrentYear();
    initMobileNavigation();
    initSmoothScrolling();
    initContactForm();
    initFormValidation();
    initHeroAnimations();
    initScrollAnimations();
    initServicesAccordion();
    initServiceCardHover();
    
    console.log('Limelite Website Initialized');
}

// ===== WINDOW LOAD EVENT =====
window.addEventListener('load', initAllFeatures);

// ===== RESIZE HANDLER =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initServicesAccordion();
    }, 250);
});