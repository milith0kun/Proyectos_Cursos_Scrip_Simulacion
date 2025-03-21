import { ParticleSystem } from './components/particles.js';
import { HeaderAnimation } from './components/nav_animation.js';
import { FooterAnimation } from './components/footer-animation.js';
import { ScrollAnimation } from './components/scroll-animation.js';

document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    new HeaderAnimation();
    new FooterAnimation();
    new ScrollAnimation();
});