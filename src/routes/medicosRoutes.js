import { Router } from "express";
import {
  crearMedico,
  obtenerMedicos,
  obtenerMedicoPorId,
  actualizarMedico,
  eliminarMedico,
  loginMedico
} from '../controllers/medicoController.js'

const router = Router();

// Rutas para la administración de médicos
router.post("/", crearMedico);
router.get("/", obtenerMedicos);
router.get("/:id", obtenerMedicoPorId);
router.put("/:id", actualizarMedico);
router.delete("/:id", eliminarMedico);
router.post("/login", loginMedico);
export default router
