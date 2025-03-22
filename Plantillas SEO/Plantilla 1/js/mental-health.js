document.addEventListener('DOMContentLoaded', () => {

    // --- Mostrar y ocultar información sobre alimentos y salud mental ---
    const moodFoodButtons = document.querySelectorAll('.toggle-mood-food'); // Botones para mostrar/ocultar información
    moodFoodButtons.forEach(button => {
        button.addEventListener('click', function () {
            const moodFoodDiv = document.getElementById(this.dataset.moodId);
            moodFoodDiv.classList.toggle('hidden'); // Alternar visibilidad
            this.innerText = moodFoodDiv.classList.contains('hidden') ? 'Mostrar información sobre alimentos que mejoran el ánimo' : 'Ocultar información';
        });
    });

    // --- Validación de formulario de contacto ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Evitar el envío del formulario

            // Obtener valores del formulario
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validación simple
            if (name === '' || email === '' || message === '') {
                alert('Por favor, completa todos los campos.');
                return; // Termina la ejecución si los campos están vacíos
            }

            document.getElementById('formResponse').style.display = 'block'; // Muestra el mensaje de respuesta
            contactForm.reset(); // Limpia los campos del formulario
            console.log(`Nombre: ${name}, Email: ${email}, Mensaje: ${message}`); // Solo para depuración
        });
    }

    // --- Calculador de Calorías ---
    const calorieCalculator = document.getElementById('calorieCalculator');
    if (calorieCalculator) {
        calorieCalculator.addEventListener('submit', function (event) {
            event.preventDefault(); // Evitar el envío del formulario

            // Obtener valores del formulario
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value);
            const age = parseInt(document.getElementById('age').value);
            const activityLevel = document.getElementById('activityLevel').value;

            // Calcular las calorías a partir de la fórmula de Harris-Benedict
            let bmr = 0; // Tasa de Metabolismo Basal
            if (activityLevel === 'sedentario') {
                bmr = 1.2; // Sedentario
            } else if (activityLevel === 'ligero') {
                bmr = 1.375; // Ligero
            } else if (activityLevel === 'moderado') {
                bmr = 1.55; // Moderado
            } else {
                bmr = 1.725; // Alto
            }

            // Calorías necesarias por día
            const caloricNeeds = Math.round(((10 * weight) + (6.25 * height) - (5 * age) + 5) * bmr); // Fórmula adaptada para hombres
            alert(`Tu requerimiento calórico estimado es de ${caloricNeeds} calorías al día.`);
        });
    }

    // --- Lógica adicional para manejar el formulario de contacto y otras interacciones aquí ---
});