class FormHandler {
    constructor() {
        this.form = document.querySelector('.contact-form');
        if (this.form) this.init();
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.setupInputAnimations();
    }

    async handleSubmit(e) {
        e.preventDefault();
        const submitBtn = this.form.querySelector('button[type="submit"]');
        
        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

            // Simular envío (reemplazar con tu lógica real)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.showMessage('¡Mensaje enviado con éxito!', 'success');
            this.form.reset();
        } catch (error) {
            this.showMessage('Error al enviar el mensaje', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Enviar Mensaje <i class="fas fa-paper-plane"></i>';
        }
    }

    setupInputAnimations() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `form-message ${type}`;
        message.textContent = text;
        
        this.form.insertAdjacentElement('beforebegin', message);
        
        setTimeout(() => {
            message.classList.add('show');
            setTimeout(() => message.remove(), 3000);
        }, 100);
    }
}

class GalleryHandler {
    constructor() {
        this.gallery = document.querySelector('.gallery-grid');
        if (this.gallery) this.init();
    }

    init() {
        this.setupLightbox();
        this.setupHoverEffects();
    }

    setupLightbox() {
        this.gallery.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('h3').textContent;
                this.openLightbox(img.src, title);
            });
        });
    }

    setupHoverEffects() {
        this.gallery.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.classList.add('hover');
            });

            item.addEventListener('mouseleave', () => {
                item.classList.remove('hover');
            });
        });
    }

    openLightbox(src, title) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${src}" alt="${title}">
                <h3>${title}</h3>
                <button class="close-lightbox">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(lightbox);
        setTimeout(() => lightbox.classList.add('show'), 100);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('show');
                setTimeout(() => lightbox.remove(), 300);
            }
        });

        lightbox.querySelector('.close-lightbox').addEventListener('click', () => {
            lightbox.classList.remove('show');
            setTimeout(() => lightbox.remove(), 300);
        });
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    new ParallaxEffect();
    new FormHandler();
    new GalleryHandler();
});