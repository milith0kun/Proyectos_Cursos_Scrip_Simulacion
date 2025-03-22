class ParallaxEffect {
    constructor() {
        this.sections = document.querySelectorAll('.parallax-section');
        this.header = document.querySelector('.header');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        
        this.lastScrollTop = 0;
        this.scrollThrottle = false;
        
        this.init();
    }

    init() {
        this.setupParallax();
        this.setupNavigation();
        this.setupScrollAnimations();
    }

    setupParallax() {
        window.addEventListener('scroll', () => {
            if (!this.scrollThrottle) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    this.scrollThrottle = false;
                });
                this.scrollThrottle = true;
            }
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;

        // Parallax effect
        this.sections.forEach(section => {
            const bg = section.querySelector('.parallax-bg');
            if (bg) {
                const speed = parseFloat(bg.getAttribute('data-speed')) || 0.5;
                const yPos = -(scrollTop * speed);
                bg.style.transform = `translateY(${yPos}px)`;
            }
        });

        // Header effect
        if (scrollTop > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        // Update active nav link
        this.updateActiveNavLink(scrollTop);
    }

    updateActiveNavLink(scrollTop) {
        let current = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    setupNavigation() {
        // Mobile menu toggle
        this.navToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.navToggle.classList.toggle('active');
        });

        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                this.navMenu.classList.remove('active');
                this.navToggle.classList.remove('active');
            });
        });

        // Active link highlighting
        window.addEventListener('scroll', () => {
            let current = '';
            
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 60) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
}