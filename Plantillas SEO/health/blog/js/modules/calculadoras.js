// Lógica de las calculadoras
export function calcularIMC(peso, altura) {
  const alturaMetros = altura / 100;
  return (peso / (alturaMetros * alturaMetros)).toFixed(2);
}
