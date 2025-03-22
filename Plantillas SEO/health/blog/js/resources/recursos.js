document.addEventListener('DOMContentLoaded', function() {
    const toolButtons = document.querySelectorAll('.tool-nav-btn');
    const toolSections = document.querySelectorAll('.tool-section');
    const prevArrow = document.querySelector('.nav-arrow.prev');
    const nextArrow = document.querySelector('.nav-arrow.next');
    let currentIndex = 0;
    let isAnimating = false;

    function showSection(index, direction = 'next') {
        if (isAnimating) return;
        isAnimating = true;

        // Asegurar que el índice sea válido de manera circular
        if (index < 0) index = toolSections.length - 1;
        if (index >= toolSections.length) index = 0;

        // Configurar la dirección inicial de las secciones
        const currentSection = toolSections[currentIndex];
        const nextSection = toolSections[index];
        
        // Preparar la siguiente sección
        nextSection.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
        nextSection.style.opacity = '0';
        nextSection.style.visibility = 'visible';

        // Animar la salida de la sección actual
        currentSection.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
        currentSection.style.opacity = '0';

        // Animar la entrada de la siguiente sección
        setTimeout(() => {
            nextSection.classList.add('active');
            nextSection.style.transform = 'translateX(0)';
            nextSection.style.opacity = '1';
            
            currentSection.classList.remove('active');
            currentSection.style.visibility = 'hidden';
            
            currentIndex = index;
            isAnimating = false;
        }, 50);

        // Actualizar botones de navegación
        toolButtons.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
    }

    function navegarHerramientas(direction) {
        let nextIndex;
        if (direction === 'next') {
            nextIndex = currentIndex + 1;
            if (nextIndex >= toolSections.length) nextIndex = 0;
        } else {
            // Si estamos en calculadoras (índice 0), ir a evaluaciones
            if (currentIndex === 0) {
                nextIndex = 3; // Índice de evaluaciones
            } else {
                nextIndex = currentIndex - 1;
                if (nextIndex < 0) nextIndex = toolSections.length - 1;
            }
        }
        showSection(nextIndex, direction);
    }

    // Event listeners para flechas de navegación
    prevArrow.addEventListener('click', () => navegarHerramientas('prev'));
    nextArrow.addEventListener('click', () => navegarHerramientas('next'));

    // Event listeners para botones de navegación
    toolButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (index === currentIndex) return;
            const direction = index > currentIndex ? 'next' : 'prev';
            showSection(index, direction);
        });
    });

    // Navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            navegarHerramientas('prev');
        } else if (e.key === 'ArrowRight') {
            navegarHerramientas('next');
        }
    });

    // Mostrar primera sección por defecto
    showSection(0, 'next');
});