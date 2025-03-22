document.addEventListener('DOMContentLoaded', () => {
    // Función para manejar las animaciones al hacer scroll
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.reveal-section, .fade-in, .slide-up, .horizontal-sections');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.75) {
                element.classList.add('visible', 'active');
            }
        });
    }

    // Manejar el header fijo
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scroll-header');
            if (currentScroll > lastScroll) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scroll-header');
        }

        lastScroll = currentScroll;
        handleScrollAnimations();
    });

    // Iniciar las animaciones al cargar la página
    handleScrollAnimations();
});