import { obtenerCarreras } from "./Data.js";
import { renderCarrera } from "./carrerasRender.js";

// Detectar el nombre de la carrera según el nombre del archivo HTML
const path = window.location.pathname;
const carreraId = path.split("/").pop().replace(".html", ""); // Ej: "software"

(async () => {
  try {
    const carreras = await obtenerCarreras();
    renderCarrera(carreraId, carreras);
  } catch (error) {
    console.error("Error al cargar la carrera:", error);
  }
})();
