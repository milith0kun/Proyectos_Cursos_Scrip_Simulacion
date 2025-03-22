// Importar módulos necesarios
import { formatNumber, capitalize } from './utils.js';
import { calcularIMC } from '../modules/calculadoras.js';
import { crearPlan } from '../modules/planificadores.js';
import { registrarProgreso } from '../modules/seguimiento.js';
import { evaluarSalud } from '../modules/evaluaciones.js';  

// Funciones para exponer al ámbito global
window.calcularIMC = function() {
  const peso = parseFloat(document.getElementById('peso').value);
  const altura = parseFloat(document.getElementById('altura').value);
  
  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    alert('Por favor, ingrese valores válidos para peso y altura.');
    return;
  }
  
  const imc = calcularIMC(peso, altura);
  alert(`Su IMC es: ${formatNumber(imc)}`);
};

window.calcularCalorias = function() {
  const actividad = document.getElementById('actividad').value;
  const edad = parseInt(document.getElementById('edad').value);
  const genero = document.getElementById('genero').value;
  
  if (!actividad || isNaN(edad) || !genero) {
    alert('Por favor, complete todos los campos.');
    return;
  }
  
  // Aquí iría la lógica para calcular calorías
  alert('Función de cálculo de calorías implementada.');
};

window.guardarPlan = function(event) {
  event.preventDefault();
  const fechaInicio = document.getElementById('fecha-inicio').value;
  const tipoPlan = document.getElementById('tipo-plan').value;
  const caloriasObjetivo = document.getElementById('calorias-objetivo').value;
  
  // Crear el plan usando la función importada
  const plan = crearPlan(tipoPlan, caloriasObjetivo);
  alert('Plan guardado correctamente');
};

window.registrarProgreso = function(event) {
  event.preventDefault();
  const peso = document.getElementById('peso-seguimiento').value;
  const fecha = document.getElementById('fecha-seguimiento').value;
  
  // Registrar el progreso usando la función importada
  const progreso = registrarProgreso('Usuario', { peso, fecha });
  
  // Actualizar estadísticas en la interfaz
  document.getElementById('peso-actual').textContent = `${peso} kg`;
  
  alert('Progreso registrado correctamente');
};

window.cambiarHerramienta = function(herramienta) {
  // Ocultar todas las secciones
  const secciones = document.querySelectorAll('.tool-section');
  secciones.forEach(seccion => seccion.classList.remove('active'));
  
  // Mostrar la sección seleccionada
  document.getElementById(herramienta).classList.add('active');
  
  // Actualizar botones
  const botones = document.querySelectorAll('.tool-nav-btn');
  botones.forEach(boton => boton.classList.remove('active'));
  document.querySelector(`[data-tool="${herramienta}"]`).classList.add('active');
};

window.navegarHerramientas = function(direccion) {
  const seccionActiva = document.querySelector('.tool-section.active');
  const secciones = Array.from(document.querySelectorAll('.tool-section'));
  const indiceActual = secciones.indexOf(seccionActiva);
  
  let nuevoIndice;
  if (direccion === 'next') {
    nuevoIndice = (indiceActual + 1) % secciones.length;
  } else {
    nuevoIndice = (indiceActual - 1 + secciones.length) % secciones.length;
  }
  
  const nuevaHerramienta = secciones[nuevoIndice].id;
  cambiarHerramienta(nuevaHerramienta);
};

// Inicializar la aplicación
function initApp() {
  console.log('Aplicación inicializada');
  
  // Configurar fecha actual en los campos de fecha
  const camposFecha = document.querySelectorAll('input[type="date"]');
  const fechaActual = new Date().toISOString().split('T')[0];
  camposFecha.forEach(campo => {
    campo.value = fechaActual;
  });
  
  // Inicializar la primera herramienta
  cambiarHerramienta('calculadoras');
}

// Llamar a la función de inicialización
document.addEventListener('DOMContentLoaded', initApp);