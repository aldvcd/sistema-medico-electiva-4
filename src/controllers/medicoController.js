import { Medico } from '../models/Medicos.js';
import bcrypt from 'bcryptjs';  // Importa bcrypt de manera predeterminada
import jwt from 'jsonwebtoken';  // Importa jwt de manera predeterminada

// Crear un nuevo médico
export async function crearMedico(req, res) {
  try {
    const medico = await Medico.create(req.body);
    res.status(201).json(medico);
  } catch (error) {
    console.error("Error al crear médico:", error);
    res.status(400).json({ error: "Error al crear médico" });
  }
}

// Obtener todos los médicos
export async function obtenerMedicos(req, res) {
  try {
    const medicos = await Medico.findAll();
    res.status(200).json(medicos);
  } catch (error) {
    console.error("Error al obtener médicos:", error);
    res.status(500).json({ error: "Error al obtener médicos" });
  }
}

// Obtener un médico por ID
export  async function obtenerMedicoPorId(req, res) {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (!medico) {
      return res.status(404).json({ error: "Médico no encontrado" });
    }
    res.status(200).json(medico);
  } catch (error) {
    console.error("Error al obtener médico:", error);
    res.status(500).json({ error: "Error al obtener médico" });
  }
}

// Actualizar un médico
export async function actualizarMedico(req, res) {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (!medico) {
      return res.status(404).json({ error: "Médico no encontrado" });
    }
    await medico.update(req.body);
    res.status(200).json(medico);
  } catch (error) {
    console.error("Error al actualizar médico:", error);
    res.status(400).json({ error: "Error al actualizar médico" });
  }
}

// Eliminar un médico
export async function eliminarMedico(req, res) {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (!medico) {
      return res.status(404).json({ error: "Médico no encontrado" });
    }
    await medico.destroy();
    res.status(200).json({ message: "Médico eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar médico:", error);
    res.status(500).json({ error: "Error al eliminar médico" });
  }
}

// Función para hacer login de médicos
export const loginMedico = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const medico = await Medico.findOne({ where: { usuario } });
    if (!medico) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, medico.password);
    if (!isMatch) {
      return res.status(400).json({ success:false,error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: medico.id, usuario: medico.usuario }, 'tu_clave_secreta', { expiresIn: '1h' });
    const success = true;
    const medicoId=medico.id
    const medicoUsuario=medico.usuario
    res.status(200).json({ success,token,medicoId,medicoUsuario});
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ success:false,error: 'Error al iniciar sesión' });
  }
};
