import express from "express";
import {
  obtenerNoticias,
  agregarNoticia,
  eliminarNoticia,
} from "../controllers/noticiasControllers.js";

const router = express.Router();

router.get("/", obtenerNoticias);
router.post("/", agregarNoticia);
router.delete("/:id", eliminarNoticia);

export default router;
