// validaciones.js
// Validación del formulario de contacto

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const telefonoRegex = /^[\+]?[0-9\s\-]{8,}$/;

function validarFormularioContacto(evento) {
  evento.preventDefault();

  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const telefono = document.getElementById("telefono");
  const mensaje = document.getElementById("mensaje");

  let valido = true;
  const errores = [];

  if (nombre.value.trim().length < 3) {
    valido = false;
    errores.push("El nombre debe tener al menos 3 caracteres.");
  }

  if (!emailRegex.test(email.value)) {
    valido = false;
    errores.push("El correo electrónico no es válido.");
  }

  if (password.value && password.value.length < 8) {
    valido = false;
    errores.push("La contraseña debe tener al menos 8 caracteres.");
  }

  if (telefono.value && !telefonoRegex.test(telefono.value)) {
    valido = false;
    errores.push("El teléfono no es válido.");
  }

  if (mensaje.value.trim().length < 20) {
    valido = false;
    errores.push("El mensaje debe tener al menos 20 caracteres.");
  }

  const contenedorErrores = document.getElementById("errores-formulario");
  if (contenedorErrores) {
    contenedorErrores.innerHTML = "";
    errores.forEach((error) => {
      const parrafo = document.createElement("p");
      parrafo.textContent = error;
      contenedorErrores.appendChild(parrafo);
    });
  }

  if (valido) {
    alert("Formulario enviado correctamente.");
    evento.target.reset();
  }

  return valido;
}

function inicializarValidaciones() {
  const formulario = document.querySelector("main form");
  if (formulario) {
    formulario.addEventListener("submit", validarFormularioContacto);
  }
}

document.addEventListener("DOMContentLoaded", inicializarValidaciones);

export { validarFormularioContacto };
