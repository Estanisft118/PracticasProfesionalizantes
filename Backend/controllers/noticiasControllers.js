import fs from "fs";
import path from "path";

const dataPath = path.resolve("data/noticias.json");

export const obtenerNoticias = (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    const noticias = JSON.parse(data);
    res.json(noticias);
  } catch (error) {
    res.status(500).json({ error: "Error al leer las noticias" });
  }
};

export const agregarNoticia = (req, res) => {
  try {
    const { titulo, contenido, fecha } = req.body;
    const data = fs.readFileSync(dataPath, "utf8");
    const noticias = JSON.parse(data);

    const nuevaNoticia = {
      id: noticias.length ? noticias[noticias.length - 1].id + 1 : 1,
      titulo,
      contenido,
      fecha,
    };

    noticias.push(nuevaNoticia);
    fs.writeFileSync(dataPath, JSON.stringify(noticias, null, 2));

    res
      .status(201)
      .json({
        mensaje: "Noticia agregada correctamente",
        noticia: nuevaNoticia,
      });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar la noticia" });
  }
};

export const eliminarNoticia = (req, res) => {
  try {
    const { id } = req.params;
    const data = fs.readFileSync(dataPath, "utf8");
    let noticias = JSON.parse(data);

    noticias = noticias.filter((n) => n.id !== parseInt(id));
    fs.writeFileSync(dataPath, JSON.stringify(noticias, null, 2));

    res.json({ mensaje: "Noticia eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la noticia" });
  }
};
// Otros controladores (editarNoticia, obtenerNoticiaPorId, etc.) pueden ser añadidos aquí
// según las necesidades de la aplicación.
