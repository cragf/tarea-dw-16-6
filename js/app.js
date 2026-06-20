// app.js
// Punto de entrada general de la aplicación

window.addEventListener("load", () => {
  console.log("TechStore Online cargado correctamente.");
});

document.addEventListener("DOMContentLoaded", () => {
  const botonAbrirModal = document.getElementById("btn-abrir-modal");
  const modal = document.getElementById("modal-demo");

  if (botonAbrirModal && modal) {
    botonAbrirModal.addEventListener("click", () => modal.showModal());
  }

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && modal && modal.open) {
      modal.close();
    }
  });
});
