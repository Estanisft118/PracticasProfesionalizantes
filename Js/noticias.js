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
      div.className = "col-md-4";

      div.innerHTML = `
        <div class="card bg-dark text-white h-100 border-light shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${noticia.titulo}</h5>
            <p class="card-text">${noticia.contenido}</p>
          </div>
          <div class="card-footer text-muted text-end">
            ${new Date(noticia.fecha).toLocaleDateString("es-AR")}
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
