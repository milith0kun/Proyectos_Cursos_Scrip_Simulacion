document.addEventListener('DOMContentLoaded', () => {

    // --- Mostrar y ocultar recetas ---
    const recipeButtons = document.querySelectorAll('.toggle-recipe'); // Botones para mostrar/ocultar recetas
    recipeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const recipeDiv = document.getElementById(this.dataset.recipeId);
            recipeDiv.classList.toggle('hidden'); // Usar una clase para mostrar/ocultar
            this.innerText = recipeDiv.classList.contains('hidden') ? 'Mostrar receta especial' : 'Ocultar receta'; // Cambiar texto del botón
        });
    });

    // --- Validación de formulario de recetas ---
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

    // --- Funcionalidad adicional para manejar otras interacciones aquí ---
});