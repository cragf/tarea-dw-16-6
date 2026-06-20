// carrito.js
// Clase Carrito, manejo de LocalStorage y eventos del carrito

import { formatearPrecio, generarNumeroOrden } from "./utilidades.js";

class Carrito {
  constructor() {
    const datosGuardados = localStorage.getItem("carrito");
    this.items = datosGuardados ? JSON.parse(datosGuardados) : [];
  }

  agregar(producto) {
    const existente = this.items.find((item) => item.id === producto.id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      this.items.push({ ...producto, cantidad: 1 });
    }
    this.guardar();
  }

  eliminar(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.guardar();
  }

  vaciar() {
    this.items = [];
    this.guardar();
  }

  calcularTotal() {
    return this.items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
  }

  guardar() {
    localStorage.setItem("carrito", JSON.stringify(this.items));
  }
}

const carrito = new Carrito();

function agregarAlCarrito(producto) {
  carrito.agregar(producto);
  renderizarCarrito();
}

function renderizarCarrito() {
  const cuerpoTabla = document.querySelector("table tbody");
  if (!cuerpoTabla) return;

  cuerpoTabla.innerHTML = "";

  carrito.items.forEach((item) => {
    const fila = document.createElement("tr");

    const celdaProducto = document.createElement("td");
    celdaProducto.textContent = item.nombre;

    const celdaPrecio = document.createElement("td");
    celdaPrecio.textContent = formatearPrecio(item.precio);

    const celdaCantidad = document.createElement("td");
    celdaCantidad.textContent = item.cantidad;

    const celdaSubtotal = document.createElement("td");
    celdaSubtotal.textContent = formatearPrecio(item.precio * item.cantidad);

    const celdaAcciones = document.createElement("td");
    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () => {
      carrito.eliminar(item.id);
      renderizarCarrito();
    });
    celdaAcciones.appendChild(botonEliminar);

    fila.appendChild(celdaProducto);
    fila.appendChild(celdaPrecio);
    fila.appendChild(celdaCantidad);
    fila.appendChild(celdaSubtotal);
    fila.appendChild(celdaAcciones);

    cuerpoTabla.appendChild(fila);
  });

  const totalElemento = document.getElementById("total-carrito");
  if (totalElemento) {
    totalElemento.textContent = formatearPrecio(carrito.calcularTotal());
  }
}

function inicializarCarrito() {
  renderizarCarrito();

  const botonVaciar = document.getElementById("btn-vaciar-carrito");
  if (botonVaciar) {
    botonVaciar.addEventListener("click", () => {
      carrito.vaciar();
      renderizarCarrito();
    });
  }

  const botonPagar = document.getElementById("btn-pagar");
  if (botonPagar) {
    botonPagar.addEventListener("click", () => {
      const numeroOrden = generarNumeroOrden();
      alert(`Compra realizada exitosamente.\nNúmero de orden: ${numeroOrden}`);
      carrito.vaciar();
      renderizarCarrito();
    });
  }
}

document.addEventListener("DOMContentLoaded", inicializarCarrito);

export { Carrito, carrito, agregarAlCarrito };
