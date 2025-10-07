// panelAdmin.js
import { listarNoticias, agregarNoticia, eliminarNoticia } from "./adminNoticias.js";

const lista = document.getElementById("listaNoticias");
const form = document.getElementById("formAgregarNoticia");

// Función para mostrar noticias en la lista
async function mostrarNoticias() {
  const noticias = await listarNoticias();
  lista.innerHTML = "";

  noticias.forEach(noticia => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start";
    li.innerHTML = `
      <div>
        <strong>${noticia.titulo}</strong>
        <p class="mb-1">${noticia.contenido}</p>
        <small>${noticia.fecha}</small>
      </div>
      <button class="btn btn-sm btn-danger">Eliminar</button>
    `;

    li.querySelector("button").addEventListener("click", async () => {
      await eliminarNoticia(noticia.id);
      mostrarNoticias();
    });

    lista.appendChild(li);
  });
}

// Evento submit para agregar noticia
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const noticia = {
    titulo: document.getElementById("titulo").value,
    contenido: document.getElementById("contenido").value,
    fecha: document.getElementById("fecha").value
  };

  await agregarNoticia(noticia);
  form.reset();
  mostrarNoticias();
});

// Cargar noticias al iniciar
mostrarNoticias();