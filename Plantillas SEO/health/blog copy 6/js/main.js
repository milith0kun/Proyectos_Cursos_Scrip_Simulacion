document.addEventListener('DOMContentLoaded', () => {
    initializeParticles();
    initializeScrollEffects();
    initializeAnimations();
    initializeMobileMenu();
    initializeMethodCards();
    initializeTestimonials();
    initializeCounters();
    initializeFormValidation();
    initializeParallax();
    initializeSafeWeightCards();
    initializeRecipesScroll()
});
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#3498db"
                },
                opacity: {
                    value: 0.1,
                    random: false,
                    anim: {
                        enable: true,
                        speed: 0.5,
                        opacity_min: 0.05,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#3498db",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.3
                        }
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Mejorar el manejo del resize
window.addEventListener('resize', () => {
    if (typeof particlesJS !== 'undefined') {
        setTimeout(() => {
            initializeParticles();
        }, 100);
    }
});

// Mejorar el manejo del resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (typeof particlesJS !== 'undefined') {
            particlesJS.load('particles-js', null);
            initializeParticles();
        }
    }, 250);
});
// Mejorar la gestión de las partículas
window.addEventListener('resize', () => {
    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', null);
        setTimeout(() => {
            initializeParticles();
        }, 100);
    }
});
// Mejorar la función de scroll
function initializeScrollEffects() {
    const header = document.querySelector('.main-header');
    const scrollItems = document.querySelectorAll('.fade-in');
    let lastScroll = 0;
    let scrollTimer;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        // Añadir la función que falta
        function highlightActiveSection() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const scroll = window.pageYOffset;
                
                if (scroll >= sectionTop && scroll < sectionTop + sectionHeight) {
                    const targetLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (targetLink) {
                        targetLink.classList.add('active');
                    }
                }
            });
        }
        // Header hide/show effect
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        
        // Header background effect
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active section highlighting
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            highlightActiveSection();
        }, 100);
        
        lastScroll = currentScroll;
    });
}
// Mejorar la navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Cerrar menú móvil si está abierto
            const navMenu = document.querySelector('.nav-menu');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
});
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('counter')) {
                    startCounting(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    document.querySelectorAll('.fade-in, .slide-in, .counter').forEach(el => {
        observer.observe(el);
    });
}

// Menú móvil
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Cerrar menú al hacer click en enlaces
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }
}

// Inicialización de tarjetas de métodos
function initializeMethodCards() {
    const cards = document.querySelectorAll('.method-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });
}

// Inicialización de testimonios
function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.opacity = i === index ? '1' : '0';
            testimonial.style.transform = i === index ? 'translateX(0)' : 'translateX(100%)';
        });
    }

    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}

// Inicialización de contadores
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    // Añadir después de las funciones existentes:
    
    function startCounting(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / duration * 10;
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            counter.textContent = Math.floor(current);
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 10);
    }
    // Mejorar la función de parallax
    function initializeParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    }
    counters.forEach(counter => {
        if (counter.classList.contains('visible')) {
            startCounting(counter);
        }
    });
}

// Efecto parallax
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Validación de formularios
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (validateForm(form)) {
                try {
                    await submitForm(form);
                    showSuccessMessage(form);
                    form.reset();
                } catch (error) {
                    showErrorMessage(form, error);
                }
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            showInputError(input, 'Este campo es requerido');
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            isValid = false;
            showInputError(input, 'Email inválido');
        }
    });
    
    return isValid;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showInputError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    input.classList.add('error');
    input.parentNode.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
        input.classList.remove('error');
    }, 3000);
}

function showSuccessMessage(form) {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = '¡Mensaje enviado con éxito!';
    form.appendChild(message);
    
    setTimeout(() => message.remove(), 3000);
}

function showErrorMessage(form, error) {
    const message = document.createElement('div');
    message.className = 'error-message';
    message.textContent = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
    form.appendChild(message);
    
    setTimeout(() => message.remove(), 3000);
}

async function submitForm(form) {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
}

// Añadir después de las funciones existentes
function initializeWeightLossMethods() {
    const cards = document.querySelectorAll('.weight-loss-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Actualizar el DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... otras inicializaciones ...
    initializeWeightLossMethods();
});

function initializeSafeWeightCards() {
    const cards = document.querySelectorAll('.safe-weight-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        observer.observe(card);
    });
}
function initializeRecipesScroll() {
    const recipesScroll = document.querySelector('.recipes-scroll');
    const prevBtn = document.querySelector('.recipe-nav-btn.prev');
    const nextBtn = document.querySelector('.recipe-nav-btn.next');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (!recipesScroll) return;

    // Mouse events for drag scrolling
    recipesScroll.addEventListener('mousedown', (e) => {
        isDown = true;
        recipesScroll.style.cursor = 'grabbing';
        startX = e.pageX - recipesScroll.offsetLeft;
        scrollLeft = recipesScroll.scrollLeft;
    });

    recipesScroll.addEventListener('mouseleave', () => {
        isDown = false;
        recipesScroll.style.cursor = 'grab';
    });

    recipesScroll.addEventListener('mouseup', () => {
        isDown = false;
        recipesScroll.style.cursor = 'grab';
    });

    recipesScroll.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - recipesScroll.offsetLeft;
        const walk = (x - startX) * 2;
        recipesScroll.scrollLeft = scrollLeft - walk;
    });

    // Navigation buttons
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            recipesScroll.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            recipesScroll.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    }

    // Update navigation buttons visibility
    const updateNavButtons = () => {
        if (!prevBtn || !nextBtn) return;
        
        prevBtn.style.opacity = recipesScroll.scrollLeft <= 0 ? '0.5' : '1';
        nextBtn.style.opacity = 
            recipesScroll.scrollLeft >= (recipesScroll.scrollWidth - recipesScroll.clientWidth) 
            ? '0.5' : '1';
    };

    recipesScroll.addEventListener('scroll', updateNavButtons);
    window.addEventListener('resize', updateNavButtons);
    updateNavButtons();
}