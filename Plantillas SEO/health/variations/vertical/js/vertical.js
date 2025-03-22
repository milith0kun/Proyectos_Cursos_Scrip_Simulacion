class VerticalNavigation {
    constructor() {
        // Elementos principales
        this.nav = document.querySelector('.vertical-nav');
        this.sections = document.querySelectorAll('.section');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.themeBtn = document.querySelector('.theme-btn');
        
        // Estado
        this.currentSection = '';
        this.isNavOpen = false;
        this.isMobile = window.innerWidth <= 768;
        this.scrollTimeout = null;
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollSpy();
        this.setupMobileNav();
        this.setupThemeToggle();
        this.setupAnimations();
        this.setupResizeHandler();
        this.loadSavedTheme();
        this.setupKeyboardNavigation();
    }

    setupKeyboardNavigation() {
        this.nav.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isNavOpen) {
                this.toggleMobileNav(false);
            }
        });

        this.navLinks.forEach(link => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    link.click();
                }
            });
        });
    }

    setupNavigation() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.navigateToSection(targetId);
            });
        });
    }

    navigateToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        this.updateActiveLink(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        if (this.isMobile) {
            this.toggleMobileNav(false);
        }
    }

    updateActiveLink(targetId) {
        this.navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === targetId);
        });
    }

    setupScrollSpy() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    const id = entry.target.getAttribute('id');
                    if (this.currentSection !== id) {
                        this.currentSection = id;
                        this.updateActiveLink(`#${id}`);
                        entry.target.classList.add('active');
                    }
                }
            });
        }, {
            threshold: [0.5],
            rootMargin: '-50px'
        });

        this.sections.forEach(section => observer.observe(section));
    }

    setupMobileNav() {
        const toggle = document.createElement('button');
        toggle.className = 'nav-toggle';
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
        toggle.setAttribute('aria-label', 'Toggle navigation');
        toggle.setAttribute('aria-expanded', 'false');
        
        document.body.appendChild(toggle);

        toggle.addEventListener('click', () => this.toggleMobileNav());

        document.addEventListener('click', (e) => {
            if (!this.nav.contains(e.target) && !toggle.contains(e.target)) {
                this.toggleMobileNav(false);
            }
        });
    }

    toggleMobileNav(force = null) {
        this.isNavOpen = force !== null ? force : !this.isNavOpen;
        this.nav.classList.toggle('active', this.isNavOpen);
        
        const toggle = document.querySelector('.nav-toggle');
        if (toggle) {
            toggle.innerHTML = this.isNavOpen ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
            toggle.setAttribute('aria-expanded', this.isNavOpen.toString());
        }
    }

    setupThemeToggle() {
        if (this.themeBtn) {
            this.themeBtn.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        this.updateThemeIcon(newTheme);
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    updateThemeIcon(theme) {
        if (this.themeBtn) {
            this.themeBtn.innerHTML = theme === 'light' ? 
                '<i class="fas fa-moon"></i>' : 
                '<i class="fas fa-sun"></i>';
        }
    }

    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const wasMobile = this.isMobile;
                this.isMobile = window.innerWidth <= 768;
                
                if (wasMobile !== this.isMobile) {
                    this.toggleMobileNav(false);
                }
            }, 250);
        });
    }

    setupAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Solo animar una vez
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
}

// Inicialización con manejo de errores
document.addEventListener('DOMContentLoaded', () => {
    try {
        new VerticalNavigation();
    } catch (error) {
        console.error('Error initializing vertical navigation:', error);
    }
});