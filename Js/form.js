const form = document.getElementById("formContacto");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      // Éxito: mostramos mensaje y limpiamos el form
      document.getElementById("msg-ok").innerText = "¡Consulta enviada!";
      console.log(res);
      document.getElementById("msg-ok").classList.remove("d-none");
      form.reset();
    } else {
      alert("Hubo un error al enviar. Intentá de nuevo.");
    }
  } catch (err) {
    console.log(err);
  }
});
