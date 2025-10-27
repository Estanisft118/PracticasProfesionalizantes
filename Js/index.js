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
      <div class="banner-title carousel-caption d-none d-md-block">
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
