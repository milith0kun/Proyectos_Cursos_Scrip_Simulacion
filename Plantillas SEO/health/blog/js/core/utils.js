// Funciones utilitarias reutilizables
export function formatNumber(num) {
  return num.toLocaleString();
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Formatear fecha a formato legible (ej: "10 de Marzo, 2025")
export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', options);
}

// Validar dirección de correo electrónico
export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Truncar texto con puntos suspensivos
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Calcular porcentaje
export function calculatePercentage(value, total) {
  return (value / total) * 100;
}

// Generar ID único
export function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Convertir kilogramos a libras
export function kgToLbs(kg) {
  return kg * 2.20462;
}

// Convertir libras a kilogramos
export function lbsToKg(lbs) {
  return lbs / 2.20462;
}

// Convertir centímetros a pies y pulgadas
export function cmToFeetInches(cm) {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
}

// Formatear valor con unidad
export function formatWithUnit(value, unit) {
  return `${formatNumber(value)} ${unit}`;
}

// Obtener edad a partir de fecha de nacimiento
export function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

// Almacenar datos en localStorage
export function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Obtener datos de localStorage
export function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

// Calcular IMC (Índice de Masa Corporal)
export function calculateBMI(weight, height) {
  // Altura en metros (si viene en cm)
  const heightInMeters = height > 3 ? height / 100 : height;
  return weight / (heightInMeters * heightInMeters);
}

// Clasificar IMC
export function classifyBMI(bmi) {
  if (bmi < 18.5) return 'Bajo peso';
  if (bmi < 25) return 'Peso normal';
  if (bmi < 30) return 'Sobrepeso';
  if (bmi < 35) return 'Obesidad grado I';
  if (bmi < 40) return 'Obesidad grado II';
  return 'Obesidad grado III';
}

// Debounce para evitar múltiples llamadas a funciones
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}