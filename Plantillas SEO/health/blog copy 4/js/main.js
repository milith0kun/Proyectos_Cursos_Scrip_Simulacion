// Elementos principales
const sideNav = document.querySelector('.side-nav');
const mainContent = document.querySelector('.main-content');
const sections = document.querySelectorAll('.section');
const scrollProgress = document.querySelector('.scroll-progress');

// Control de navegación móvil
const createMobileMenu = () => {
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(menuButton);

    menuButton.addEventListener('click', () => {
        sideNav.classList.toggle('active');
        menuButton.classList.toggle('active');
    });
};

// Barra de progreso de scroll
const updateScrollProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    scrollProgress.style.transform = `scaleX(${progress / 100})`;
};

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
            
            // Cerrar menú móvil si está abierto
            if (window.innerWidth <= 768) {
                sideNav.classList.remove('active');
            }
        }
    });
});

// Observador de intersección para animaciones
const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animación escalonada para cards
            if (entry.target.classList.contains('tool-card')) {
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

// Calculadora IMC
const setupIMCCalculator = () => {
    const imcForm = document.querySelector('.imc-calculator');
    if (imcForm) {
        imcForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const peso = parseFloat(imcForm.querySelector('[name="peso"]').value);
            const altura = parseFloat(imcForm.querySelector('[name="altura"]').value);
            
            if (peso && altura) {
                const imc = peso / (altura * altura);
                const resultado = imcForm.querySelector('.resultado');
                resultado.textContent = `Tu IMC es: ${imc.toFixed(2)}`;
                resultado.classList.add('visible');
            }
        });
    }
};

// Búsqueda de artículos
const setupSearch = () => {
    const searchInput = document.querySelector('.nav-search input');
    const searchButton = document.querySelector('.nav-search button');
    
    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        // Implementar lógica de búsqueda aquí
        console.log('Buscando:', searchTerm);
    };
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
};

// Actualizar sección activa durante el scroll
const updateActiveSection = () => {
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
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
};

// Event Listeners
window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateActiveSection();
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sideNav.classList.remove('active');
    }
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu();
    setupSearch();
    setupIMCCalculator();
    
    // Aplicar observador a elementos
    document.querySelectorAll('.section, .tool-card, .article-card').forEach(el => {
        observador.observe(el);
    });
    
    // Iniciar con la sección activa correcta
    updateActiveSection();
});