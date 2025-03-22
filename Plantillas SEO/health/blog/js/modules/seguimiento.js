// Lógica de seguimiento
export function registrarProgreso(usuario, progreso) {
  return {
    usuario,
    progreso,
    fecha: new Date().toLocaleDateString()
  };
}
