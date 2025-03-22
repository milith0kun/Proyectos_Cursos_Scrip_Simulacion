class ThemeInitializer {
    constructor(config) {
        this.config = config;
        this.loadingDelay = 1000;
        this.elements = {
            loader: null,
            themeToggle: document.querySelector('.theme-toggle'),
            metaTags: document.querySelectorAll('meta[name], meta[property]'),
            sections: document.querySelectorAll('section[id]'),
            socialLinks: document.querySelector('.social-links')
        };
        this.init();
    }

    async init() {
        try {
            await this.showLoadingScreen();
            await this.setupTheme();
            await this.loadContent();
            await this.initializeComponents();
            await this.hideLoadingScreen();
        } catch (error) {
            console.error('Initialization error:', error);
            this.hideLoadingScreen();
        }
    }

    async showLoadingScreen() {
        this.elements.loader = document.querySelector('.loading-screen') || this.createLoadingScreen();
        this.elements.loader.style.display = 'flex';
        await new Promise(resolve => setTimeout(resolve, this.loadingDelay));
    }

    createLoadingScreen() {
        const loader = document.createElement('div');
        loader.className = 'loading-screen';
        loader.innerHTML = `
            <div class="loader"></div>
            <p>Cargando experiencia...</p>
        `;
        document.body.appendChild(loader);
        return loader;
    }

    async hideLoadingScreen() {
        if (this.elements.loader) {
            this.elements.loader.style.opacity = '0';
            await new Promise(resolve => setTimeout(resolve, 500));
            this.elements.loader.remove();
        }
    }

    async setupTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        await this.applyTheme(savedTheme);
        this.setupThemeToggle();
    }

    setupThemeToggle() {
        if (this.elements.themeToggle) {
            this.elements.themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                this.applyTheme(newTheme);
                this.updateThemeIcon(newTheme);
            });
        }
    }

    updateThemeIcon(theme) {
        const icon = this.elements.themeToggle?.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    async applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const themeConfig = this.config.themes[theme];
        if (themeConfig) {
            Object.entries(themeConfig).forEach(([key, value]) => {
                document.documentElement.style.setProperty(`--color-${key}`, value);
            });
        }
    }

    async loadContent() {
        await Promise.all([
            this.updateMetaTags(),
            this.updateSections(),
            this.updateSocialLinks()
        ]);
    }

    updateMetaTags() {
        const { site } = this.config;
        document.title = site.title;
        
        const metaContent = {
            'description': site.description,
            'author': site.author,
            'og:title': site.title,
            'og:description': site.description
        };

        this.elements.metaTags.forEach(meta => {
            const key = meta.getAttribute('name') || meta.getAttribute('property');
            if (metaContent[key]) {
                meta.content = metaContent[key];
            }
        });
    }

    async updateSections() {
        const { sections } = this.config;
        const updatePromises = Array.from(this.elements.sections).map(section => {
            const sectionData = sections[section.id];
            return sectionData ? this.updateSectionContent(section, sectionData) : null;
        });
        
        await Promise.all(updatePromises.filter(Boolean));
    }

    async updateSectionContent(section, data) {
        if (data.background) {
            await this.loadBackground(section, data.background);
        }

        const title = section.querySelector('h1, h2');
        if (title && data.title) {
            title.textContent = data.title;
        }

        if (data.content) {
            const content = section.querySelector('.section-content');
            if (content) {
                content.innerHTML = data.content;
            }
        }
    }

    async loadBackground(section, url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                section.style.backgroundImage = `url(${url})`;
                resolve();
            };
            img.onerror = resolve;
            img.src = url;
        });
    }

    updateSocialLinks() {
        if (!this.elements.socialLinks) return;

        const { social } = this.config.site;
        Object.entries(social).forEach(([platform, url]) => {
            const link = this.elements.socialLinks.querySelector(`[data-platform="${platform}"]`);
            if (link && url) {
                link.href = url;
                link.setAttribute('aria-label', `Visitar ${platform}`);
            }
        });
    }

    async initializeComponents() {
        await new Promise(resolve => setTimeout(resolve, 100));
        new HorizontalScroll();
    }
}

window.addEventListener('load', () => {
    new ThemeInitializer(SITE_CONFIG);
});