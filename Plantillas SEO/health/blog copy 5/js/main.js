// Elementos principales
const sideNav = document.querySelector('.side-nav');
const mainContent = document.querySelector('.main-content');
const scrollProgress = document.querySelector('.scroll-progress');
const heroSection = document.querySelector('.hero-section');

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

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!sideNav.contains(e.target) && !menuButton.contains(e.target)) {
            sideNav.classList.remove('active');
            menuButton.classList.remove('active');
        }
    });
};

// Efecto parallax en hero section
const setupParallax = () => {
    window.addEventListener('scroll', () => {
        if (heroSection) {
            const scrolled = window.pageYOffset;
            heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
};

// Barra de progreso de scroll mejorada
const updateScrollProgress = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    scrollProgress.style.transform = `scaleX(${progress / 100})`;
    
    // Actualizar opacidad del menú en scroll
    if (window.pageYOffset > 100) {
        sideNav.classList.add('scrolled');
    } else {
        sideNav.classList.remove('scrolled');
    }
};

// Calculadora IMC mejorada
const setupIMCCalculator = () => {
    const calculatorForm = document.getElementById('imcCalculator');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const peso = parseFloat(document.getElementById('peso').value);
            const altura = parseFloat(document.getElementById('altura').value);
            
            if (peso && altura) {
                const imc = peso / (altura * altura);
                const resultado = calculatorForm.querySelector('.result');
                
                let categoria = '';
                let color = '';
                
                if (imc < 18.5) {
                    categoria = 'Bajo peso';
                    color = '#ffa726';
                } else if (imc < 25) {
                    categoria = 'Peso normal';
                    color = '#66bb6a';
                } else if (imc < 30) {
                    categoria = 'Sobrepeso';
                    color = '#f57c00';
                } else {
                    categoria = 'Obesidad';
                    color = '#d32f2f';
                }

                resultado.innerHTML = `
                    <div class="result-box ${categoria.toLowerCase().replace(' ', '-')}" style="border-left: 4px solid ${color}">
                        <h4>Tu IMC: ${imc.toFixed(1)}</h4>
                        <p>Categoría: ${categoria}</p>
                        <div class="imc-range">
                            <div class="range-bar">
                                <div class="range-indicator" style="left: ${Math.min(Math.max((imc - 15) * 5, 0), 100)}%"></div>
                            </div>
                            <div class="range-labels">
                                <span>15</span>
                                <span>20</span>
                                <span>25</span>
                                <span>30</span>
                                <span>35+</span>
                            </div>
                        </div>
                        <small>Consulta con un profesional de la salud para una evaluación completa.</small>
                    </div>
                `;
                resultado.classList.add('visible');
            }
        });
    }
};

// Sistema de búsqueda mejorado con resaltado
const setupSearch = () => {
    const searchInput = document.querySelector('.nav-search input');
    const searchButton = document.querySelector('.nav-search button');
    
    const highlightText = (element, searchTerm) => {
        const text = element.textContent;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        element.innerHTML = text.replace(regex, '<mark>$1</mark>');
    };
    
    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm.length > 2) {
            const sections = document.querySelectorAll('.section');
            let found = false;
            
            // Eliminar resaltados anteriores
            document.querySelectorAll('mark').forEach(mark => {
                const parent = mark.parentNode;
                parent.textContent = parent.textContent;
            });
            
            sections.forEach(section => {
                const content = section.textContent.toLowerCase();
                if (content.includes(searchTerm)) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    section.classList.add('highlight');
                    
                    // Resaltar coincidencias
                    section.querySelectorAll('p, h2, h3, h4, li').forEach(element => {
                        if (element.textContent.toLowerCase().includes(searchTerm)) {
                            highlightText(element, searchTerm);
                        }
                    });
                    
                    setTimeout(() => section.classList.remove('highlight'), 2000);
                    found = true;
                }
            });

            if (!found) {
                const notification = document.createElement('div');
                notification.className = 'search-notification';
                notification.textContent = 'No se encontraron resultados para tu búsqueda.';
                document.body.appendChild(notification);
                setTimeout(() => notification.remove(), 3000);
            }
        }
    };
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Búsqueda en tiempo real
        let timeout = null;
        searchInput.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(performSearch, 500);
        });
    }
};

// Animaciones al scroll mejoradas
const setupScrollAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('count-up')) {
                    startCountAnimation(entry.target);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.article-card, .tool-card, .section-title, .safety-card, .count-up').forEach(el => {
        observer.observe(el);
    });
};

// Animación de conteo
const startCountAnimation = (element) => {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / duration * 10;
    let current = 0;
    
    const updateCount = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target;
        }
    };
    
    updateCount();
};

// Navegación activa mejorada
const updateActiveNavigation = () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const updateActive = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', updateActive);
    window.addEventListener('load', updateActive);
};

// Formulario de contacto
const setupContactForm = () => {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Aquí iría la lógica de envío del formulario
            const notification = document.createElement('div');
            notification.className = 'form-notification success';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Mensaje enviado correctamente</p>
            `;
            form.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
                form.reset();
            }, 3000);
        });
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu();
    setupParallax();
    setupIMCCalculator();
    setupSearch();
    setupScrollAnimations();
    updateActiveNavigation();
    setupContactForm();
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // Responsive checks
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sideNav.classList.remove('active');
            document.querySelector('.mobile-menu-btn')?.classList.remove('active');
        }
    });
});