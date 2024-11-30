import { Paciente } from "../models/Pacientes.js";
import { Medico } from "../models/Medicos.js";
import { FichaMedica } from "../models/FichaMedica.js";

// Crear una nueva ficha médica
export async function crearFichaMedica(req, res) {
  try {
    const { pacienteId, medicoId, motivoConsulta, diagnostico, tratamiento } = req.body;

    const fichaMedica = await FichaMedica.create({
      pacienteId,
      medicoId,
      motivoConsulta,
      diagnostico,
      tratamiento,
    });

    res.status(201).json(fichaMedica);
  } catch (error) {
    console.error("Error al crear ficha médica:", error);
    res.status(400).json({ error: "Error al crear ficha médica" });
  }
}

// Obtener todas las fichas médicas
export async function obtenerFichasMedicas(req, res) {
  try {
    const fichasMedicas = await FichaMedica.findAll({
      include: [
        { model: Paciente, attributes: ["id", "nombre", "apellido"], as: 'paciente' },  // Especificamos el alias 'paciente'
        { model: Medico, attributes: ["id", "nombre", "apellido"], as: 'medico' }       // Especificamos el alias 'medico'
      ],
    });

    res.status(200).json(fichasMedicas);
  } catch (error) {
    console.error("Error al obtener fichas médicas:", error);
    res.status(500).json({ error: "Error al obtener fichas médicas" });
  }
}

export async function obtenerFichaMedicaPorId(req, res) {
  try {
    const fichaMedica = await FichaMedica.findByPk(req.params.id, {
      include: [
        { model: Paciente, attributes: ["id", "nombre", "apellido"], as: 'paciente' },
        { model: Medico, attributes: ["id", "nombre", "apellido"], as: 'medico' }
      ],
    });

    if (!fichaMedica) {
      return res.status(404).json({ error: "Ficha médica no encontrada" });
    }

    res.status(200).json(fichaMedica);
  } catch (error) {
    console.error("Error al obtener ficha médica:", error);
    res.status(500).json({ error: "Error al obtener ficha médica" });
  }
}

// Actualizar una ficha médica
export async function actualizarFichaMedica(req, res) {
  try {
    const fichaMedica = await FichaMedica.findByPk(req.params.id);

    if (!fichaMedica) {
      return res.status(404).json({ error: "Ficha médica no encontrada" });
    }

    await fichaMedica.update(req.body);

    res.status(200).json(fichaMedica);
  } catch (error) {
    console.error("Error al actualizar ficha médica:", error);
    res.status(400).json({ error: "Error al actualizar ficha médica" });
  }
}

// Eliminar una ficha médica
export async function eliminarFichaMedica(req, res) {
  try {
    const fichaMedica = await FichaMedica.findByPk(req.params.id);

    if (!fichaMedica) {
      return res.status(404).json({ error: "Ficha médica no encontrada" });
    }

    await fichaMedica.destroy();

    res.status(200).json({ message: "Ficha médica eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar ficha médica:", error);
    res.status(500).json({ error: "Error al eliminar ficha médica" });
  }
}

