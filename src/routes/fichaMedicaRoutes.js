import { Router } from "express";
import {
  crearFichaMedica,
  obtenerFichasMedicas,
  obtenerFichaMedicaPorId,
  actualizarFichaMedica,
  eliminarFichaMedica,
} from "../controllers/fichaMedicaController.js";

const router = Router();

// Rutas para la gestión de fichas médicas
router.post("/", crearFichaMedica);
router.get("/", obtenerFichasMedicas);
router.get("/:id", obtenerFichaMedicaPorId);
router.put("/:id", actualizarFichaMedica);
router.delete("/:id", eliminarFichaMedica);

export default router
