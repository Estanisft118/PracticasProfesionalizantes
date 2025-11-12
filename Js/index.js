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
      <div class="banner-title carousel-caption d-flex align-items-end justify-content-center pb-3">
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
  // ======= GALERÍA MASONRY NOSOTROS + MODAL =======
  const galeria = document.querySelector(".galeria-instituto");
  if (galeria) {
    for (let i = 1; i <= 7; i++) {
      const col = document.createElement("div");
      col.className = "col-6 col-md-4 col-lg-3";
      col.innerHTML = `
        <div class="instituto-item" data-bs-toggle="modal" data-bs-target="#imagenModal">
          <img src="./Assets/Instituto${i}.jpeg" alt="Instituto ${i}" class="img-fluid rounded">
        </div>
      `;
      col.querySelector("img").addEventListener("click", (e) => {
        const modalImg = document.getElementById("imagenModalImg");
        modalImg.src = e.target.src;
        modalImg.alt = e.target.alt;
      });
      galeria.appendChild(col);
    }
  }
});
