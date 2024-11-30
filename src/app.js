import express from "express";
import morgan from "morgan";

const app = express();

// Import routes
import pacientesRoutes from "./routes/pacientesRoutes.js";
import medicosRoutes from "./routes/medicosRoutes.js"
import fichaMedica from "./routes/fichaMedicaRoutes.js"
import historialRoutes from "./routes/historialRoutes.js"
// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/pacientes",pacientesRoutes);
app.use("/api/medicos",medicosRoutes);
app.use("/api/fichaMedica",fichaMedica);
app.use("/api/",historialRoutes);

export default app;
