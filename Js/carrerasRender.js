export function renderCarrera(carreraId, carreras) {
  const carrera = carreras.find((c) => c.id === carreraId);
  if (!carrera) return;

  const banner = document.getElementById("banner-carrera");
  if (banner) {
    banner.innerHTML = `
    <div class="position-relative">
      <img src="${carrera.heroImg}" alt="${carrera.nombre}" class="banner-img">
      <div class="banner-title">${carrera.nombre}</div>
    </div>

    <div class="datos container-fluid px-0 mt-3">
  <div class="heroBack row text-center g-1">

    <!-- Duración -->
    <div class="col-6 col-md-3">
      <div class="icon">
        <svg viewBox="0 0 24 24" width="40" height="40"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm1-13h-2v5l4.24 2.52.76-1.23-3.5-2.09V7z"/></svg>
      </div>
        <strong>Duración</strong><br>${carrera.duracion}
    </div>

    <!-- Modalidad -->
    <div class="col-6 col-md-3">
      <div class="icon">
        <svg viewBox="0 0 24 24" width="40" height="40"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      </div>
        <strong>Modalidad</strong><br>${carrera.modalidad || "Presencial"}
    </div>

    <!-- Título oficial -->
    <div class="col-6 col-md-3">
      <div class="icon">
        <svg viewBox="0 0 24 24" width="40" height="40"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
      </div>
        <strong>Título oficial</strong><br>${carrera.titulo || "—"}
    </div>

    <!-- Resolución -->
    <div class="col-6 col-md-3">
      <div class="icon">
        <svg viewBox="0 0 24 24" width="40" height="40"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg>
      </div>
        <strong>Resolución</strong><br>${carrera.resolucion || "—"}
    </div>

  </div>
</div>
  `;
  }
  // —— Render de materias (sin cambios) —— //
  const materiasEl = document.getElementById("materias-carrera");
  if (!materiasEl) return;

  materiasEl.innerHTML = "";
  const row = document.createElement("div");
  row.className = "row justify-content-center";

  const anios = [
    { key: "primerAño", label: "1er Año" },
    { key: "segundoAño", label: "2do Año" },
    { key: "tercerAño", label: "3er Año" },
  ];

  anios.forEach((anio) => {
    if (!carrera.materias[anio.key]) return;

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
  });

  materiasEl.appendChild(row);
}
