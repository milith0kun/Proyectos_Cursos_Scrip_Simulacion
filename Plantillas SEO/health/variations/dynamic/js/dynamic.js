// Utilidades
const utils = {
    // Función para retrasar la ejecución
    debounce(func, tiempo = 250) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), tiempo);
        };
    },

    // Función para limitar la frecuencia de ejecución
    throttle(func, limite = 250) {
        let esperando = false;
        return (...args) => {
            if (!esperando) {
                func.apply(this, args);
                esperando = true;
                setTimeout(() => esperando = false, limite);
            }
        };
    },

    // Cargar módulos dinámicamente
    async cargarModulo(url) {
        try {
            return await import(url);
        } catch (error) {
            console.error(`Error al cargar el módulo ${url}:`, error);
            return null;
        }
    }
};

// Gestor del tema
class GestorTema {
    constructor() {
        this.tema = localStorage.getItem('tema') || 'light';
        this.botonTema = document.querySelector('.theme-toggle');
        this.inicializar();
    }

    inicializar() {
        document.documentElement.setAttribute('data-theme', this.tema);
        this.botonTema?.addEventListener('click', () => this.cambiarTema());
    }

    cambiarTema() {
        this.tema = this.tema === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.tema);
        localStorage.setItem('tema', this.tema);
    }
}

// Gestor de scroll
class GestorScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.botonSubir = document.querySelector('.back-to-top');
        this.alturaHeader = this.header?.offsetHeight || 0;
        this.ultimoScroll = 0;
        
        this.inicializar();
    }

    inicializar() {
        window.addEventListener('scroll', utils.throttle(() => {
            this.manejarScroll();
        }, 100));

        this.botonSubir?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    manejarScroll() {
        const scrollActual = window.scrollY;

        if (this.header) {
            this.header.classList.toggle('scrolled', scrollActual > this.alturaHeader);
        }

        if (this.botonSubir) {
            this.botonSubir.classList.toggle('visible', scrollActual > 500);
        }

        this.ultimoScroll = scrollActual;
    }
}

// Gestor del formulario
class GestorFormulario {
    constructor(selectorFormulario) {
        this.formulario = document.querySelector(selectorFormulario);
        this.botonEnviar = this.formulario?.querySelector('button[type="submit"]');
        
        if (this.formulario) {
            this.inicializar();
        }
    }

    inicializar() {
        this.formulario.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (this.validarFormulario()) {
                await this.manejarEnvio();
            }
        });

        // Validación en tiempo real
        this.formulario.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => this.validarCampo(input));
        });
    }

    validarFormulario() {
        let esValido = true;
        this.formulario.querySelectorAll('input, textarea').forEach(input => {
            if (!this.validarCampo(input)) {
                esValido = false;
            }
        });
        return esValido;
    }

    validarCampo(input) {
        const valor = input.value.trim();
        const tipo = input.type;

        if (!valor) {
            this.mostrarError(input, 'Este campo es requerido');
            return false;
        }

        if (tipo === 'email' && !this.validarEmail(valor)) {
            this.mostrarError(input, 'Email inválido');
            return false;
        }

        this.eliminarError(input);
        return true;
    }

    validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    mostrarError(input, mensaje) {
        const grupoFormulario = input.closest('.form-group');
        const error = grupoFormulario.querySelector('.error-message') || 
                     this.crearElementoError(mensaje);
        
        grupoFormulario.classList.add('error');
        if (!grupoFormulario.querySelector('.error-message')) {
            grupoFormulario.appendChild(error);
        }
    }

    eliminarError(input) {
        const grupoFormulario = input.closest('.form-group');
        grupoFormulario.classList.remove('error');
        const error = grupoFormulario.querySelector('.error-message');
        if (error) error.remove();
    }

    crearElementoError(mensaje) {
        const error = document.createElement('span');
        error.classList.add('error-message');
        error.textContent = mensaje;
        return error;
    }

    async manejarEnvio() {
        try {
            this.botonEnviar.disabled = true;
            this.botonEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

            // Simular llamada API
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.mostrarExito('Mensaje enviado correctamente');
            this.formulario.reset();
        } catch (error) {
            this.mostrarError(this.botonEnviar, 'Error al enviar el mensaje');
            console.error('Error:', error);
        } finally {
            this.botonEnviar.disabled = false;
            this.botonEnviar.innerHTML = 'Enviar';
        }
    }

    mostrarExito(mensaje) {
        const alerta = document.createElement('div');
        alerta.classList.add('alert', 'alert-success');
        alerta.textContent = mensaje;
        this.formulario.insertAdjacentElement('beforebegin', alerta);
        setTimeout(() => alerta.remove(), 3000);
    }
}

// Gestor de cookies
class GestorCookies {
    constructor() {
        this.banner = document.querySelector('.cookie-consent');
        this.botonAceptar = document.querySelector('.accept-cookies');
        this.inicializar();
    }

    inicializar() {
        if (!this.obtenerConsentimiento()) {
            this.mostrarBanner();
        }
    }

    mostrarBanner() {
        this.banner?.removeAttribute('hidden');
        this.botonAceptar?.addEventListener('click', () => this.aceptarCookies());
    }

    aceptarCookies() {
        localStorage.setItem('cookiesAceptadas', 'true');
        this.banner?.setAttribute('hidden', '');
    }

    obtenerConsentimiento() {
        return localStorage.getItem('cookiesAceptadas') === 'true';
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    try {
        new GestorTema();
        new GestorScroll();
        new GestorFormulario('.contact-form');
        new GestorCookies();
    } catch (error) {
        console.error('Error de inicialización:', error);
    }
});