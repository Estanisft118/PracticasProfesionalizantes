export async function obtenerCarreras() {
  const res = await fetch("http://localhost:4000/contenido");
  const data = await res.json();
  return data.carreras;
}
