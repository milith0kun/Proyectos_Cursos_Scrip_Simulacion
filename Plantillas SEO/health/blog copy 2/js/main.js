// Animaciones de entrada mejoradas
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animaciones específicas para artículos
            if (entry.target.classList.contains('article-card')) {
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.15}s`;
            }
            
            // Animaciones para galería
            if (entry.target.classList.contains('gallery-item')) {
                entry.target.style.transitionDelay = '0.3s';
            }
            
            // Animaciones para programas
            if (entry.target.classList.contains('program-card')) {
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.2}s`;
            }
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

// Aplicar animaciones a elementos
document.querySelectorAll('.gallery-item, .program-card, .article-card, .class-card, .hero-content > *').forEach(el => {
    animateOnScroll.observe(el);
});

// Header dinámico con efecto de transparencia
const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('header-scrolled');
        if (currentScroll > lastScroll) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    } else {
        header.classList.remove('header-scrolled');
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Efecto parallax suave para imágenes
const heroSection = document.querySelector('.hero-section');
const galleryItems = document.querySelectorAll('.gallery-item img');
const articleImages = document.querySelectorAll('.article-image img');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    if (heroSection.getBoundingClientRect().bottom > 0) {
        galleryItems.forEach((img, index) => {
            const speed = 0.05 + (index * 0.02);
            const yPos = -(scrolled * speed);
            img.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Efecto suave para imágenes de artículos
    articleImages.forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.03;
            const yPos = ((rect.top - window.innerHeight/2) * speed);
            img.style.transform = `translateY(${yPos}px)`;
        }
    });
});

// Menú móvil mejorado
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenuButton.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Sistema de filtrado para artículos
const filterButtons = document.querySelectorAll('.filter-button');
const articleCards = document.querySelectorAll('.article-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            articleCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.add('show'), 50);
                } else {
                    card.classList.remove('show');
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// Formulario de contacto mejorado
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const submitButton = this.querySelector('button');
        const formData = new FormData(this);
        
        if (validateForm(formData)) {
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;
            
            try {
                await simulateFormSubmission();
                showNotification('¡Gracias! Nos pondremos en contacto contigo pronto.', 'success');
                this.reset();
            } catch (error) {
                showNotification('Hubo un error. Por favor, intenta nuevamente.', 'error');
            } finally {
                submitButton.innerHTML = 'RESERVAR AHORA';
                submitButton.disabled = false;
            }
        }
    });
}

// Validación de formulario
function validateForm(formData) {
    let isValid = true;
    const errors = [];

    if (!formData.get('nombre')) {
        errors.push('El nombre es requerido');
        isValid = false;
    }

    if (!isValidEmail(formData.get('email'))) {
        errors.push('Email inválido');
        isValid = false;
    }

    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
    }

    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Sistema de notificaciones elegante
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    requestAnimationFrame(() => notification.classList.add('show'));
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Simulación de envío de formulario
function simulateFormSubmission() {
    return new Promise(resolve => setTimeout(resolve, 1500));
}

// Inicialización de la página
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    
    // Animación inicial del hero y artículos destacados
    const heroContent = document.querySelector('.hero-content');
    const featuredArticles = document.querySelectorAll('.article-card.featured');
    
    if (heroContent) {
        heroContent.classList.add('animate-in');
    }
    
    featuredArticles.forEach(article => {
        article.classList.add('animate-in');
    });
});