document.addEventListener('DOMContentLoaded', () => {

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

    // --- Mostrar y ocultar técnica de mindfulness ---
    const mindfulnessToggleButtons = document.querySelectorAll('.toggle-mindfulness');
    mindfulnessToggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const techniqueDiv = document.getElementById(this.dataset.techniqueId);
            techniqueDiv.classList.toggle('hidden'); // Usar una clase CSS para mostrar/ocultar
            this.innerText = techniqueDiv.classList.contains('hidden') ? 'Mostrar Técnica' : 'Ocultar Técnica'; // Cambiar texto del botón
        });
    });

    // --- Evento para validar rutina diaria ---
    const dailyRoutineForm = document.getElementById('dailyRoutineForm');
    if (dailyRoutineForm) {
        dailyRoutineForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita el envío del formulario
            const routineName = document.getElementById('routineName').value.trim();

            if (routineName === '') {
                alert('Por favor, introduce un nombre para tu rutina diaria.');
                return; // Terminar si el campo está vacío
            }

            alert(`¡Rutina ${routineName} guardada con éxito!`);
            dailyRoutineForm.reset(); // Limpiar campos
        });
    }
});