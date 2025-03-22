document.addEventListener('DOMContentLoaded', () => {

    // --- Mostrar/Ocultar Información de Dietas ---
    const dietButtons = document.querySelectorAll('.toggle-diet'); // Botones para mostrar/ocultar información de dietas
    dietButtons.forEach(button => {
        button.addEventListener('click', function () {
            const dietDiv = document.getElementById(this.dataset.dietId);
            dietDiv.classList.toggle('hidden'); // Alternar visibilidad de la dieta
            this.innerText = dietDiv.classList.contains('hidden') ? 'Mostrar información de la dieta' : 'Ocultar información'; // Cambiar texto del botón
        });
    });

    // --- Validación de formulario de recetas (si se aplica) ---
    const recipeForm = document.getElementById('recipeForm');
    if (recipeForm) {
        recipeForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Evitar el envío del formulario

            // Obtener valores del formulario
            const recipeName = document.getElementById('recipeName').value.trim();
            const ingredients = document.getElementById('ingredients').value.trim();
            const instructions = document.getElementById('instructions').value.trim();

            // Validación simple
            if (recipeName === '' || ingredients === '' || instructions === '') {
                alert('Por favor, completa todos los campos de la receta.');
                return; // Termina la ejecución si los campos están vacíos
            }

            alert(`¡Receta "${recipeName}" guardada con éxito!`);
            recipeForm.reset(); // Limpia los campos del formulario
        });
    }

    // --- Validación adicional para inputs numéricos ---
    const numericInputs = document.querySelectorAll('input[type="number"]');
    numericInputs.forEach(input => {
        input.addEventListener('input', function () {
            if (this.value < 0) {
                alert('El valor no puede ser negativo.');
                this.value = '';
            }
        });
    });

    // --- Animación al hacer scroll (reveal) ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const position = el.getBoundingClientRect().top;
            if (position < window.innerHeight - 50) {
                el.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);

    // --- Funcionalidad adicional para gestionar otras interacciones aquí ---
});
