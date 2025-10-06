import express from "express";
import cors from "cors";
import fs from "fs";
import multer from "multer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import noticiasRoutes from "./routes/noticiasRoutes.js";

// --- INICIALIZACIÓN ---

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("./uploads"));
// --- CONFIGURACIÓN ---
const SECRET = "clave_secreta_para_token";
const DATA_FILE = "./db.json";
// --- CARGA DE IMÁGENES ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "backend/uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });
// --- LOGIN ---
const ADMIN_USER = "admin";
const ADMIN_PASS_HASH = await bcrypt.hash("Isft118Software", 10);

app.post("/login", async (req, res) => {
  const { user, pass } = req.body;
  if (user === ADMIN_USER && (await bcrypt.compare(pass, ADMIN_PASS_HASH))) {
    const token = jwt.sign({ user }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }
  res.status(401).json({ message: "Credenciales incorrectas" });
});
// --- MIDDLEWARE PARA VERIFICAR TOKEN ---
function verificarToken(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(403).json({ message: "Token requerido" });
  const token = header.split(" ")[1];
  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Token inválido" });
  }
}
// --- LEER DATOS ---
app.get("/contenido", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  res.json(data);
});

// --- ACTUALIZAR TEXTOS E IMÁGENES ---
app.put("/contenido", verificarToken, (req, res) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
  res.json({ message: "Contenido actualizado" });
});

app.post("/upload", verificarToken, upload.single("imagen"), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});
app.use("/noticias", noticiasRoutes);

app.listen(4000, () =>
  console.log("Servidor corriendo en http://localhost:4000")
);
