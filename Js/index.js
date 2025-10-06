import { obtenerCarreras } from "./Data.js";

document.addEventListener("DOMContentLoaded", async () => {
  const carreras = await obtenerCarreras();

  // Contenedores del carrusel
  const carruselInner = document.querySelector(".carousel-inner");
  const indicadores = document.querySelector(".carousel-indicators");
  const thumbsContainer = document.querySelector(".carrusel-thumbs");

  carreras.forEach((carrera, index) => {
    // Slide principal
    const slide = document.createElement("div");
    slide.classList.add("carousel-item");
    if (index === 0) slide.classList.add("active");

    slide.innerHTML = `
      <img src="${carrera.heroImg}" class="d-block w-100" alt="${carrera.nombre}">
      <div class="carousel-caption d-none d-md-block">
        <h5>${carrera.nombre}</h5>
      </div>
    `;
    carruselInner.appendChild(slide);

    // Indicador (puntito)
    const indicador = document.createElement("button");
    indicador.type = "button";
    indicador.setAttribute("data-bs-target", "#carruselBootstrap");
    indicador.setAttribute("data-bs-slide-to", index);
    if (index === 0) indicador.classList.add("active");
    indicador.setAttribute("aria-current", index === 0 ? "true" : "false");
    indicador.setAttribute("aria-label", carrera.nombre);
    indicadores.appendChild(indicador);

    // Miniatura
    if (thumbsContainer) {
      const thumb = document.createElement("img");
      thumb.src = carrera.heroImg;
      thumb.alt = carrera.nombre;
      thumb.classList.add("thumb");
      thumb.addEventListener("click", () => {
        const carousel = bootstrap.Carousel.getInstance(
          document.querySelector("#carruselBootstrap")
        );
        carousel.to(index);
      });
      thumbsContainer.appendChild(thumb);
    }
  });

  // Inicializar carrusel con intervalo automático
  const myCarousel = document.querySelector("#carruselBootstrap");
  new bootstrap.Carousel(myCarousel, {
    interval: 3000,
    ride: "carousel",
  });
});
async function cargarDatos() {
  try {
    const res = await fetch("http://localhost:4000/contenido");
    const data = await res.json();

    // Tomamos las noticias más recientes (máximo 5)
    const noticias = data.noticias.slice(-5).reverse();

    const noticiasGrid = document.getElementById("noticias-grid");
    noticiasGrid.innerHTML = "";

    noticias.forEach((noticia) => {
      const card = document.createElement("div");
      card.classList.add("col-md-4", "col-lg-3");

      card.innerHTML = `
        <div class="card h-100 text-dark shadow-sm">
          <img src="${noticia.imagen}" class="card-img-top" alt="${
        noticia.titulo
      }" />
          <div class="card-body">
            <h5 class="card-title">${noticia.titulo}</h5>
            <p class="card-text">${noticia.descripcion}</p>
            <small class="text-muted">${new Date(
              noticia.fecha
            ).toLocaleDateString()}</small>
          </div>
        </div>
      `;

      noticiasGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar noticias:", error);
  }
}

cargarDatos();
