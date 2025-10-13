const apiUrl = "http://localhost:4000/noticias";

async function cargarNoticias() {
  try {
    const res = await fetch(apiUrl);

    if (!res.ok) throw new Error("Error al cargar noticias");

    const data = await res.json();

    // Asegurarnos de que sea un array
    const noticias = Array.isArray(data) ? data : data.noticias || [];

    // Ordenar por fecha y tomar las 5 más recientes
    const ultimasNoticias = noticias.slice(-5).reverse();

    const contenedor = document.getElementById("noticias-grid");
    contenedor.innerHTML = "";

    if (ultimasNoticias.length === 0) {
      contenedor.innerHTML = `<p class="text-muted">No hay noticias disponibles.</p>`;
      return;
    }

    ultimasNoticias.forEach((noticia) => {
  const div = document.createElement("div");
  div.className = "col-12 col-md-6 col-lg-4 d-flex";

  div.innerHTML = `
    <div class="card h-100 w-100 shadow-sm d-flex flex-column">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-dark">${noticia.titulo}</h5>
        <p class="card-text text-muted flex-grow-1">${noticia.contenido}</p>
        <div class="mt-auto text-end">
          <small class="text-muted">${new Date(noticia.fecha).toLocaleDateString("es-AR")}</small>
        </div>
      </div>
    </div>
  `;
  contenedor.appendChild(div);
});
  } catch (error) {
    console.error(error);
    document.getElementById(
      "noticias-grid"
    ).innerHTML = `<p class="text-danger">Error al cargar las noticias.</p>`;
  }
}

cargarNoticias();
