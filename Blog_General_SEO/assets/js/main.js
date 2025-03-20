import { ParticleSystem } from './components/particles.js';
import { HeaderAnimation } from './components/nav_animation.js';

document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    new HeaderAnimation();
});