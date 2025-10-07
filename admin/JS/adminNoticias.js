// adminNoticias.js
const apiUrl = "http://localhost:4000/noticias";

// Agregar noticia
export async function agregarNoticia(noticia) {
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noticia),
  });
  return res.json();
}

// Eliminar noticia por ID
export async function eliminarNoticia(id) {
  const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  return res.json();
}

// Listar noticias (máximo 5 más recientes)
export async function listarNoticias() {
  const res = await fetch(apiUrl);
  const data = await res.json();

  // Acceder al array dentro del objeto
  const noticias = data.noticias || [];

  // Ordenar por fecha descendente
  noticias.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  // Devolver las 5 más recientes
  return noticias.slice();
}
