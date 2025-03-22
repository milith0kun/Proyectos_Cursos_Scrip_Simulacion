// Importa los módulos necesarios
import { ShoppingCart } from '../components/cart.js';

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    // Initialize shopping cart
    const cart = new ShoppingCart();
});

// Lógica del header
let lastScroll = 0;
const header = document.querySelector('.site-header');
const heroSection = document.querySelector('.hero-section');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const heroHeight = heroSection?.offsetHeight || 0;

    if (currentScroll > lastScroll && currentScroll > heroHeight) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});