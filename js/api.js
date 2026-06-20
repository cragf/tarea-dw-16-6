// api.js
// Consumo de datos mediante Fetch API (async/await + manejo de excepciones)

async function obtenerProductos() {
  try {
    const respuesta = await fetch("data/productos.json");
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  } finally {
    console.log("Solicitud de productos finalizada.");
  }
}

export { obtenerProductos };
