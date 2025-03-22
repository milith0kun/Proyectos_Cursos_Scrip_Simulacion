document.addEventListener('DOMContentLoaded', () => {
    initPage();
    setupSmoothScroll();
    setupCalorieCalculator();
    setupTableHoverEffects();
    updateMainTitle();
    setupReadingProgress();
});

// Inicializa elementos comunes de la página
function initPage() {
    // Cambiar el título de la página
    document.title = "Nutrición y Estilo de Vida Saludable EDMIL";

    // Cambiar el estilo del encabezado
    const header = document.querySelector('header');
    if (header) {
        header.style.backgroundColor = '#4CAF50'; // Verde
        header.style.color = 'white';
        header.style.padding = '20px';
    }

    // Cambiar el contenido del título principal
    const mainTitle = document.getElementById('main-title');
    if (mainTitle) {
        mainTitle.textContent = "Bienvenido a Nutrición Saludable";
    }

    // Cambiar imágenes dinámicamente
    document.querySelectorAll('img').forEach((img, index) => {
        img.setAttribute('alt', `Imagen ${index + 1} de nutrición`);
    });

    // Agregar sistema de eventos para botones
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            alert(`Has hecho clic en: ${button.textContent}`);
        });
    });
}

// Efecto smooth scroll para navegación interna
function setupSmoothScroll() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Configura la calculadora de calorías
function setupCalorieCalculator() {
    const calorieCalculator = document.getElementById('calorieCalculator');
    if (calorieCalculator) {
        calorieCalculator.addEventListener('submit', (e) => {
            e.preventDefault();
            calculateCalories();
        });
    }
}

// Función para calcular y mostrar las calorías
function calculateCalories() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseFloat(document.getElementById('age').value);
    const activityLevel = document.getElementById('activityLevel').value;

    // Validación básica
    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
        alert('Por favor completa todos los campos correctamente');
        return;
    }

    // Cálculo de calorías usando la fórmula de Mifflin-St Jeor
    const bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5; // Fórmula básica
    const activityMultipliers = {
        sedentario: 1.2,
        ligero: 1.375,
        moderado: 1.55,
        alto: 1.725,
    };
    const calories = Math.round(bmr * activityMultipliers[activityLevel]);

    // Mostrar el resultado dinámicamente
    displayCalorieResult(calories);
}

// Muestra el resultado de las calorías
function displayCalorieResult(calories) {
    const existingResult = document.querySelector('.calorie-result');
    if (existingResult) existingResult.remove(); 

    const resultDiv = document.createElement('div');
    resultDiv.className = 'calorie-result bg-blue-100 p-4 mt-4 rounded-lg';
    resultDiv.innerHTML = `
        <h3 class="text-xl font-bold mb-2">Resultado:</h3>
        <p>Necesitas aproximadamente <strong>${calories} calorías</strong> diarias para mantener tu peso con dieta cetogénica.</p>
        <p class="mt-2 text-sm text-blue-600">* Basado en la ecuación de Mifflin-St Jeor</p>
    `;
    document.getElementById('calorieCalculator').parentNode.insertBefore(resultDiv, calorieCalculator.nextElementSibling);
}

// Animación de tablas al hacer hover
function setupTableHoverEffects() {
    document.querySelectorAll('td').forEach(td => {
        td.addEventListener('mouseenter', () => {
            td.style.transition = 'background-color 0.3s ease';
            td.style.backgroundColor = '#FBF5DD';
        });
        td.addEventListener('mouseleave', () => {
            td.style.backgroundColor = '';
        });
    });
}

// Actualización dinámica del título principal
function updateMainTitle() {
    const mainTitle = document.querySelector('header h1');
    if (mainTitle) {
        mainTitle.innerHTML = `Dieta Cetogénica <span class="text-sm">(${new Date().getFullYear()})</span>`;
    }
}

// Sistema de progreso de lectura
function setupReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: #DDA853;
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Funcionalidades específicas para cada página
function initSpecificPages() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'gluten-free-diet.html':
            initGlutenFreeDiet();
            break;
        case 'healthy-lifestyle.html':
            initHealthyLifestyle();
            break;
        case 'healthy-recipes.html':
            initHealthyRecipes();
            break;
        case 'mental-health.html':
            initMentalHealth();
            break;
        default:
            break;
    }
}

// Ejemplo de inicializaci&oacute;n para "Dieta sin Gluten"
function initGlutenFreeDiet() {
    let glutenFreeSection = document.getElementById('gluten-free');
    if (glutenFreeSection) {
        glutenFreeSection.innerHTML = `
            <h2>Dieta sin Gluten</h2>
            <p>La dieta sin gluten es esencial para personas con celiaquía.</p>
            <button class="btn">Más información</button>
        `;
    }
}

// Repite lo mismo para las otras páginas
function initHealthyLifestyle() {
    let lifestyleSection = document.getElementById('healthy-lifestyle');
    if (lifestyleSection) {
        lifestyleSection.innerHTML = `
            <h2>Estilo de Vida Saludable</h2>
            <p>Consejos para mantener un estilo de vida saludable.</p>
            <button class="btn">Ver consejos</button>
        `;
    }
}

function initHealthyRecipes() {
    let recipesSection = document.getElementById('healthy-recipes');
    if (recipesSection) {
        recipesSection.innerHTML = `
            <h2>Recetas Saludables</h2>
            <p>Descubre nuestras recetas más saludables.</p>
            <button class="btn">Ver recetas</button>
        `;
    }
}

function initMentalHealth() {
    let mentalHealthSection = document.getElementById('mental-health');
    if (mentalHealthSection) {
        mentalHealthSection.innerHTML = `
            <h2>Salud Mental</h2>
            <p>Consejos para cuidar tu salud mental.</p>
            <button class="btn">Ver consejos</button>
        `;
    }
}

// Llamar a las funciones de inicialización
initSpecificPages();