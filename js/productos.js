// productos.js
// Clase Producto y manipulación del DOM para mostrar productos

import { obtenerProductos } from "./api.js";
import { formatearPrecio } from "./utilidades.js";
import { agregarAlCarrito } from "./carrito.js";

class Producto {
  constructor(id, nombre, precio, categoria, marca, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.marca = marca;
    this.stock = stock;
  }
}

let listaProductos = [];

function crearTarjetaProducto(producto) {
  const articulo = document.createElement("article");

  const titulo = document.createElement("h3");
  titulo.textContent = producto.nombre;

  const precio = document.createElement("p");
  precio.innerHTML = `Precio: <strong>${formatearPrecio(producto.precio)}</strong>`;

  const disponibilidad = document.createElement("p");
  disponibilidad.textContent = producto.stock > 0 ? "Disponible" : "Agotado";

  const boton = document.createElement("button");
  boton.type = "button";
  boton.textContent = "Agregar al carrito";
  boton.addEventListener("click", () => agregarAlCarrito(producto));

  articulo.appendChild(titulo);
  articulo.appendChild(precio);
  articulo.appendChild(disponibilidad);
  articulo.appendChild(boton);

  return articulo;
}

function mostrarProductos(productos) {
  const contenedor = document.getElementById("grilla-productos");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  productos.forEach((p) => {
    const producto = new Producto(p.id, p.nombre, p.precio, p.categoria, p.marca, p.stock);
    contenedor.appendChild(crearTarjetaProducto(producto));
  });
}

function filtrarProductos(termino) {
  const texto = termino.toLowerCase();
  return listaProductos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(texto) ||
      p.categoria.toLowerCase().includes(texto) ||
      p.marca.toLowerCase().includes(texto)
  );
}

async function inicializarProductos() {
  listaProductos = await obtenerProductos();
  mostrarProductos(listaProductos);

  const buscador = document.getElementById("buscar-producto");
  if (buscador) {
    buscador.addEventListener("input", (evento) => {
      const resultado = filtrarProductos(evento.target.value);
      mostrarProductos(resultado);
    });
  }
}

document.addEventListener("DOMContentLoaded", inicializarProductos);

export { Producto, listaProductos };
