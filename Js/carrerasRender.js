export function renderCarrera(carreraId, carreras) {
  const carrera = carreras.find((c) => c.id === carreraId);
  if (!carrera) return;

  /* ---------- Banner ---------- */
  const banner = document.getElementById("banner-carrera");
  if (banner) {
    banner.innerHTML = `
    <div class="position-relative">
      <img src="${carrera.heroImg}" alt="${carrera.nombre}" class="banner-img">
      <div class="banner-title">${carrera.nombre}</div>
    </div>

    <div class="datos container-fluid px-0 mt-3">
      <div class="heroBack row text-center g-1">
        <div class="col-6 col-md-3">
          <div class="icon">
            <svg viewBox="0 0 24 24" width="40" height="40"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm1-13h-2v5l4.24 2.52.76-1.23-3.5-2.09V7z"/></svg>
          </div>
          <strong>Duración</strong><br>${carrera.duracion}
        </div>
        <div class="col-6 col-md-3">
          <div class="icon">
            <svg viewBox="0 0 24 24" width="40" height="40"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </div>
          <strong>Modalidad</strong><br>${carrera.modalidad || "Presencial"}
        </div>
        <div class="col-6 col-md-3">
          <div class="icon">
            <svg viewBox="0 0 24 24" width="40" height="40"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
          </div>
          <strong>Título oficial</strong><br>${carrera.titulo || "—"}
        </div>
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

  /* ---------- Tabla de materias ---------- */
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

    carrera.materias[anio.key].forEach((item) => {
      const tr = document.createElement("tr");
      const td = document.createElement("td");

      const nombre = typeof item === "object" ? item.nombre : item;
      const correlativas = typeof item === "object" ? item.correlativas || [] : [];

      let html = nombre;
      if (correlativas.length > 0) {
        html += ` <span class="text-danger fw-bold" style="cursor:help" title="Correlativas: ${correlativas.join(", ")}">*</span>`;
      }

      td.innerHTML = html;
      tr.appendChild(td);
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    col.appendChild(table);
    row.appendChild(col);
  });

  materiasEl.appendChild(row);

  /* ---------- Botón y tabla de correlativas ---------- */
  const btn = document.createElement("button");
  btn.className = "btn mt-3";
  btn.style.backgroundColor = "#FFBA49";
  btn.style.border = "1px solid #FFBA49";
  btn.style.color = "#212529";
  btn.style.fontWeight = "500";
  btn.textContent = "Correlativas";
  btn.type = "button";
  materiasEl.appendChild(btn);

  /* Hover */
  btn.addEventListener("mouseenter", () => {
    btn.style.backgroundColor = "#e0a435";
    btn.style.borderColor = "#e0a435";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.backgroundColor = "#FFBA49";
    btn.style.borderColor = "#FFBA49";
  });

  const tablaCorrelDiv = document.createElement("div");
  tablaCorrelDiv.className = "mt-3 d-none";

  const tablaCorrel = document.createElement("table");
  tablaCorrel.className = "table table-sm table-bordered";
  tablaCorrel.innerHTML = `
    <thead class="table-light">
      <tr>
        <th>Materia</th>
        <th>Correlativas</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;
  tablaCorrelDiv.appendChild(tablaCorrel);
  materiasEl.appendChild(tablaCorrelDiv);

  /* ---------- Llenar la tabla de correlativas ---------- */
  const correlTbody = tablaCorrel.querySelector("tbody");
  anios.forEach((anio) => {
    if (!carrera.materias[anio.key]) return;
    carrera.materias[anio.key].forEach((item) => {
      const nombre = typeof item === "object" ? item.nombre : item;
      const correlativas = typeof item === "object" ? item.correlativas || [] : [];
      if (correlativas.length === 0) return;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${nombre}</td>
        <td>${correlativas.join(", ")}</td>
      `;
      correlTbody.appendChild(tr);
    });
  });

  /* ---------- Mostrar/ocultar tabla ---------- */
  btn.addEventListener("click", () => {
    const visible = !tablaCorrelDiv.classList.contains("d-none");
    tablaCorrelDiv.classList.toggle("d-none", visible);
    btn.textContent = visible ? "Correlativas" : "Ocultar correlativas";
  });
}