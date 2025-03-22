class GridController {
    constructor() {
        this.initializeState();
        this.initializeElements();
        this.init();
    }

    initializeState() {
        this.state = {
            lastScroll: 0,
            isMenuOpen: false,
            currentTheme: localStorage.getItem('theme') || 'light',
            retries: 0,
            maxRetries: 3,
            isLoading: true
        };
    }

    initializeElements() {
        this.elements = {
            header: document.querySelector('.header'),
            menuToggle: document.querySelector('.menu-toggle'),
            menu: document.querySelector('.menu'),
            menuLinks: document.querySelectorAll('.menu-link'),
            projectGrid: document.querySelector('.project-grid'),
            servicesGrid: document.querySelector('.services-grid'),
            skillsGrid: document.querySelector('.skills-grid'),
            themeToggle: document.querySelector('.theme-toggle'),
            loadingScreen: document.querySelector('.loading-screen'),
            progressBar: document.querySelector('.progress-bar'),
            mainContent: document.querySelector('.grid-container'),
            heroBackground: document.querySelector('.hero-background')
        };

        if (this.elements.heroBackground) {
            this.elements.heroBackground.style.backgroundImage = 'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80")';
        }
    }

    async init() {
        try {
            this.showLoading();
            await this.preloadImages();
            this.setupTheme();
            this.loadContent();
            this.setupEventListeners();
            this.setupAnimations();
            this.hideLoading();
        } catch (error) {
            console.error('Error durante la inicialización:', error);
            this.handleError(error);
        }
    }

    showLoading() {
        if (this.elements.loadingScreen) {
            this.elements.loadingScreen.style.display = 'flex';
            this.elements.mainContent.style.opacity = '0';
        }
    }

    hideLoading() {
        if (this.elements.loadingScreen) {
            this.elements.loadingScreen.style.opacity = '0';
            this.elements.mainContent.style.opacity = '1';
            setTimeout(() => {
                this.elements.loadingScreen.style.display = 'none';
            }, 600);
        }
    }

    async preloadImages() {
        const imageUrls = SITE_CONFIG.projects.map(project => project.image);
        const loadPromises = imageUrls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = url;
            });
        });
        await Promise.all(loadPromises);
    }

    loadContent() {
        this.loadProjects();
        this.loadSkills();
        this.loadServices();
    }

    loadProjects() {
        if (this.elements.projectGrid) {
            this.elements.projectGrid.innerHTML = SITE_CONFIG.projects.map(project => `
                <article class="project-card animate-on-scroll">
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}" loading="lazy">
                    </div>
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <a href="${project.url}" class="project-link">Ver Proyecto</a>
                    </div>
                </article>
            `).join('');
        }
    }

    loadSkills() {
        if (this.elements.skillsGrid) {
            this.elements.skillsGrid.innerHTML = SITE_CONFIG.skills.map(skill => `
                <div class="skill-item animate-on-scroll" style="--skill-color: ${skill.color}">
                    <div class="skill-icon">
                        <i class="fas fa-${skill.icon}"></i>
                    </div>
                    <div class="skill-info">
                        <h3>${skill.name}</h3>
                        <div class="skill-bar">
                            <div class="skill-progress" style="width: 0%"></div>
                        </div>
                        <span class="skill-percentage">${skill.level}%</span>
                    </div>
                </div>
            `).join('');

            setTimeout(() => {
                document.querySelectorAll('.skill-progress').forEach((bar, index) => {
                    bar.style.width = `${SITE_CONFIG.skills[index].level}%`;
                });
            }, 500);
        }
    }

    loadServices() {
        if (this.elements.servicesGrid) {
            this.elements.servicesGrid.innerHTML = SITE_CONFIG.services.map(service => `
                <article class="service-card animate-on-scroll" style="--service-color: ${service.color}">
                    <div class="service-icon">
                        <i class="fas fa-${service.icon}"></i>
                    </div>
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                    <a href="#contact" class="service-cta">
                        Solicitar Servicio
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </article>
            `).join('');
        }
    }

    setupEventListeners() {
        this.elements.menuToggle?.addEventListener('click', () => this.toggleMenu());
        window.addEventListener('scroll', () => this.handleScroll());
        this.elements.themeToggle?.addEventListener('click', () => this.toggleTheme());
        this.setupMenuLinks();
    }

    setupMenuLinks() {
        this.elements.menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    this.closeMenu();
                }
            });
        });
    }

    toggleMenu() {
        this.state.isMenuOpen = !this.state.isMenuOpen;
        this.elements.menu.classList.toggle('active', this.state.isMenuOpen);
        this.elements.menuToggle.setAttribute('aria-expanded', this.state.isMenuOpen);
    }

    closeMenu() {
        this.state.isMenuOpen = false;
        this.elements.menu.classList.remove('active');
        this.elements.menuToggle.setAttribute('aria-expanded', 'false');
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        this.elements.header.classList.toggle('scrolled', scrollY > 50);
        this.elements.header.classList.toggle('header-hidden', scrollY > this.state.lastScroll && scrollY > 100);
        
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / height) * 100;
        this.elements.progressBar.style.width = `${progress}%`;
        
        this.state.lastScroll = scrollY;
    }

    setupAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.2 }
        );

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    setupTheme() {
        const theme = SITE_CONFIG.theme[this.state.currentTheme];
        Object.entries(theme).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--color-${key}`, value);
        });
        document.documentElement.setAttribute('data-theme', this.state.currentTheme);
        
        const icon = this.elements.themeToggle.querySelector('i');
        if (icon) {
            icon.className = `fas fa-${this.state.currentTheme === 'light' ? 'moon' : 'sun'}`;
        }
    }

    handleError(error) {
        if (this.state.retries < this.state.maxRetries) {
            this.state.retries++;
            setTimeout(() => this.init(), 2000);
        } else {
            if (this.elements.loadingScreen) {
                this.elements.loadingScreen.innerHTML = `
                    <div class="error-message">
                        <p>No se pudo cargar la página. Por favor, inténtalo más tarde.</p>
                        <button class="retry-button" onclick="window.location.reload()">
                            <i class="fas fa-redo"></i> Reintentar
                        </button>
                    </div>
                `;
            }
        }
    }
}

// Configuración del sitio
const SITE_CONFIG = {
    projects: [
        {
            title: "E-commerce Premium",
            description: "Plataforma de comercio electrónico con integración de pagos y gestión de inventario",
            image: "https://images.unsplash.com/photo-1661956602116-aa6865609028",
            tags: ["React.js", "Node.js", "MongoDB", "AWS"],
            url: "#"
        },
        {
            title: "App Fintech",
            description: "Aplicación financiera con análisis en tiempo real y gestión de inversiones",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
            tags: ["Flutter", "Firebase", "Machine Learning"],
            url: "#"
        },
        {
            title: "Dashboard Enterprise",
            description: "Sistema de análisis empresarial con visualización de datos avanzada",
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692",
            tags: ["Vue.js", "D3.js", "Python"],
            url: "#"
        },
        {
            title: "Sistema IoT",
            description: "Plataforma de monitoreo para dispositivos IoT industriales",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
            tags: ["IoT", "React", "Node.js"],
            url: "#"
        }
    ],
    skills: [
        { name: "Desarrollo Frontend", icon: "laptop-code", level: 95, color: "#3498db" },
        { name: "Diseño UI/UX", icon: "palette", level: 90, color: "#e74c3c" },
        { name: "Desarrollo Backend", icon: "server", level: 85, color: "#2ecc71" },
        { name: "DevOps", icon: "cloud", level: 80, color: "#9b59b6" },
        { name: "Mobile Development", icon: "mobile-alt", level: 85, color: "#f1c40f" }
    ],
    services: [
        {
            title: "Desarrollo Web Premium",
            description: "Sitios web de alto rendimiento con las últimas tecnologías",
            icon: "globe",
            color: "#3498db"
        },
        {
            title: "Aplicaciones Móviles",
            description: "Apps nativas y multiplataforma de calidad profesional",
            icon: "mobile-screen",
            color: "#e74c3c"
        },
        {
            title: "Consultoría Técnica",
            description: "Asesoramiento experto en arquitectura y tecnología",
            icon: "lightbulb",
            color: "#2ecc71"
        },
        {
            title: "UI/UX Design",
            description: "Diseño de experiencias digitales centradas en el usuario",
            icon: "wand-magic-sparkles",
            color: "#9b59b6"
        }
    ],
    theme: {
        light: {
            primary: "#2c3e50",
            secondary: "#3498db",
            accent: "#e74c3c",
            success: "#2ecc71",
            background: "#ffffff",
            surface: "#f8f9fa",
            text: "#2c3e50"
        },
        dark: {
            primary: "#1a1a1a",
            secondary: "#3498db",
            accent: "#e74c3c",
            success: "#2ecc71",
            background: "#121212",
            surface: "#1e1e1e",
            text: "#ffffff"
        }
    }
};

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new GridController();
});