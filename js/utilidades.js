// utilidades.js
// Funciones utilitarias generales

function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-CL");
}

function generarNumeroOrden() {
  const numero = Math.floor(Math.random() * 9000) + 1000;
  return `ORD-${numero}`;
}

export { formatearPrecio, generarNumeroOrden };
