import { Router } from "express";
import { getAllPacientes,createPaciente } from "../controllers/pacientesController.js";

const router = Router();

router.get('/', getAllPacientes);
router.post('/', createPaciente);

export default router;