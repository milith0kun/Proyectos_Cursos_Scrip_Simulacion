// Elementos principales
const parallaxBg = document.querySelector('.parallax-bg');
const sections = document.querySelectorAll('.section');
const scrollProgress = document.querySelector('.scroll-progress');

// Control de Parallax y Animaciones
let lastScrollY = window.scrollY;
let ticking = false;

function updateParallax() {
    const scrollY = window.scrollY;
    
    // Efecto parallax para el fondo
    parallaxBg.style.transform = `translateY(${scrollY * 0.5}px)`;
    
    // Efecto para las secciones
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const speed = section.dataset.speed || 0.1;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = (rect.top - window.innerHeight) * speed;
            section.style.transform = `translateY(${-yPos}px)`;
            section.style.opacity = Math.min(1, 1 - (Math.abs(rect.top) / window.innerHeight));
        }
    });
}

// Barra de progreso
function updateScrollProgress() {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.transform = `scaleX(${progress / 100})`;
}

// Observador de intersección para animaciones
const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            if (entry.target.classList.contains('card')) {
                const cards = entry.target.parentElement.children;
                const index = Array.from(cards).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.2}s`;
            }
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '-50px'
});

// Aplicar observador a elementos
document.querySelectorAll('.routine-card, .day-card, .safety-card, .tip-card, .method-card, .section-title').forEach(el => {
    observador.observe(el);
});

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Actualizar navegación activa
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Menú móvil
const menuButton = document.createElement('button');
menuButton.className = 'menu-mobile';
menuButton.innerHTML = '<span></span><span></span><span></span>';
document.body.appendChild(menuButton);

menuButton.addEventListener('click', () => {
    document.querySelector('.side-nav').classList.toggle('active');
    menuButton.classList.toggle('active');
});

// Event Listeners
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
            updateScrollProgress();
            updateActiveSection();
            ticking = false;
        });
        ticking = true;
    }
});

// Actualizar sección activa durante el scroll
function updateActiveSection() {
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - sectionHeight/3)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    updateParallax();
    updateScrollProgress();
    
    // Marcar sección inicial
    const hash = window.location.hash || '#inicio';
    document.querySelector(`a[href="${hash}"]`)?.classList.add('active');
    
    // Iniciar animaciones
    sections.forEach(section => {
        section.classList.add('ready');
    });
});