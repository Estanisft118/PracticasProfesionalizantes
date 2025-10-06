export function renderCarrera(carreraId, carreras) {
  const carrera = carreras.find((c) => c.id === carreraId);
  if (!carrera) return;

  const nombreEl = document.getElementById("nombre-carrera");
  const duracionEl = document.getElementById("duracion-carrera");
  const descripcionEl = document.getElementById("descripcion-carrera");
  const salidaEl = document.getElementById("salida-carrera");
  const materiasEl = document.getElementById("materias-carrera");
  const heroContainer = document.getElementById("hero-carrera");

  // Render del hero
  if (heroContainer) {
    heroContainer.innerHTML = "";
    const img = document.createElement("img");
    img.src = carrera.heroImg;
    img.alt = "Imagen ilustrativa de la carrera";
    img.className = "img-fluid rounded mb-3";
    heroContainer.appendChild(img);
    const desc = document.createElement("p");
    desc.textContent = carrera.descripcion;
    desc.className = "lead";
    heroContainer.appendChild(desc);
  }

  if (nombreEl) nombreEl.textContent = carrera.nombre;
  if (duracionEl) duracionEl.textContent = carrera.duracion;
  if (descripcionEl) descripcionEl.textContent = carrera.descripcion;
  if (salidaEl) salidaEl.textContent = carrera.salidaLaboral;

  if (materiasEl) {
    materiasEl.innerHTML = "";
    const row = document.createElement("div");
    row.className = "row justify-content-center";
    const anios = [
      { key: "primerAño", label: "1er Año" },
      { key: "segundoAño", label: "2do Año" },
      { key: "tercerAño", label: "3er Año" },
    ];
    anios.forEach((anio) => {
      if (carrera.materias[anio.key]) {
        const col = document.createElement("div");
        col.className = "col-12 col-md-4 mb-3";
        const table = document.createElement("table");
        table.className = "table table-bordered table-striped";
        const thead = document.createElement("thead");
        const trHead = document.createElement("tr");
        const th = document.createElement("th");
        th.textContent = anio.label;
        th.className = "text-center";
        trHead.appendChild(th);
        thead.appendChild(trHead);
        table.appendChild(thead);
        const tbody = document.createElement("tbody");
        carrera.materias[anio.key].forEach((materia) => {
          const tr = document.createElement("tr");
          const td = document.createElement("td");
          td.textContent = materia;
          tr.appendChild(td);
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        col.appendChild(table);
        row.appendChild(col);
      }
    });
    materiasEl.appendChild(row);
  }
}
