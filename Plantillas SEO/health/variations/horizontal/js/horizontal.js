class HorizontalScroll {
    constructor() {
        this.container = document.querySelector('.horizontal-container');
        this.sections = document.querySelectorAll('.horizontal-section');
        this.navDots = document.querySelectorAll('.nav-dots a');
        this.currentSection = 0;
        this.isScrolling = false;
        this.sectionWidth = window.innerWidth;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.swipeThreshold = 50;
        this.animationDuration = 600;
        
        this.progressBar = document.querySelector('.progress-bar');
        this.scrollIndicator = document.querySelector('.scroll-indicator');
        this.init();
    }

    init() {
        this.setupLayout();
        this.setupEventListeners();
        this.setupAnimations();
        this.updateActiveSection(0);
    }

    setupLayout() {
        this.container.style.width = `${this.sections.length * 100}vw`;
        this.sections.forEach(section => {
            section.style.width = '100vw';
            section.style.opacity = '0';
            section.style.transform = 'scale(0.95)';
        });
        this.sections[0].style.opacity = '1';
        this.sections[0].style.transform = 'scale(1)';
    }

    setupEventListeners() {
        // Navegación por dots
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToSection(index);
            });
        });

        // Touch events
        this.container.addEventListener('touchstart', e => {
            this.touchStartX = e.touches[0].clientX;
        }, { passive: true });

        this.container.addEventListener('touchend', e => {
            this.touchEndX = e.changedTouches[0].clientX;
            const swipeDistance = this.touchEndX - this.touchStartX;
            
            if (Math.abs(swipeDistance) > this.swipeThreshold) {
                if (swipeDistance > 0) this.prevSection();
                else this.nextSection();
            }
        }, { passive: true });

        // Mouse wheel
        const wheelHandler = this.debounce((e) => {
            e.preventDefault();
            if (!this.isScrolling) {
                if (e.deltaY > 0) this.nextSection();
                else this.prevSection();
            }
        }, 50);

        window.addEventListener('wheel', wheelHandler, { passive: false });

        // Keyboard
        document.addEventListener('keydown', e => {
            if (!this.isScrolling) {
                switch(e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        this.nextSection();
                        break;
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        this.prevSection();
                        break;
                }
            }
        });

        // Resize
        window.addEventListener('resize', this.debounce(() => {
            this.sectionWidth = window.innerWidth;
            this.goToSection(this.currentSection, false);
        }, 250));
    }

    setupAnimations() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    goToSection(index, animate = true) {
        if (index < 0 || index >= this.sections.length || (this.isScrolling && animate)) return;

        this.isScrolling = animate;
        this.currentSection = index;

        const translateX = -(index * this.sectionWidth);
        this.container.style.transition = animate ? `transform ${this.animationDuration}ms cubic-bezier(0.645, 0.045, 0.355, 1)` : 'none';
        this.container.style.transform = `translateX(${translateX}px)`;

        this.updateActiveSection(index);

        if (animate) {
            setTimeout(() => {
                this.isScrolling = false;
            }, this.animationDuration);
        }
    }

    updateActiveSection(index) {
        // Update navigation
        this.navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Update sections
        this.sections.forEach((section, i) => {
            if (i === index) {
                section.style.opacity = '1';
                section.style.transform = 'scale(1)';
            } else {
                section.style.opacity = '0';
                section.style.transform = 'scale(0.95)';
            }
        });
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    nextSection() {
        if (this.currentSection < this.sections.length - 1) {
            this.goToSection(this.currentSection + 1);
        }
    }

    prevSection() {
        if (this.currentSection > 0) {
            this.goToSection(this.currentSection - 1);
        }
    }

    setupScrollIndicator() {
        if (this.scrollIndicator) {
            setTimeout(() => {
                this.scrollIndicator.style.opacity = '0';
            }, 3000);
        }
    }

    updateProgress(index) {
        if (this.progressBar) {
            const progress = (index / (this.sections.length - 1)) * 100;
            this.progressBar.style.width = `${progress}%`;
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new HorizontalScroll();
});