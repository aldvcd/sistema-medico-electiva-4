import { Router } from "express";
import { obtenerHistorial } from '../controllers/historialController.js';

const router = Router();

// Ruta para el historial de consultas
router.get('/historial', obtenerHistorial);

export default router