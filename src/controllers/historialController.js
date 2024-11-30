import { FichaMedica } from '../models/FichaMedica.js';
import { Medico } from '../models/Medicos.js';
import { Paciente } from '../models/Pacientes.js';
import { Op, Sequelize } from 'sequelize';

export async function obtenerHistorial(req, res) {
  try {
    const { texto, especialidad, medicoId, pacienteId, fechaInicio, fechaFin } = req.query;

    // Construir los filtros dinámicamente
    const filtros = {};

    // Filtro por texto en los detalles
    if (texto) {
      filtros[Op.or] = [
        Sequelize.where(Sequelize.cast(Sequelize.col('detallesConsulta'), 'TEXT'), { [Op.like]: `%${texto}%` }),
        Sequelize.where(Sequelize.cast(Sequelize.col('motivoConsulta'), 'TEXT'), { [Op.like]: `%${texto}%` }),
        Sequelize.where(Sequelize.cast(Sequelize.col('diagnostico'), 'TEXT'), { [Op.like]: `%${texto}%` }),
        Sequelize.where(Sequelize.cast(Sequelize.col('tratamiento'), 'TEXT'), { [Op.like]: `%${texto}%` }),
      ];
    }

    // Filtro por paciente
    if (pacienteId) {
      filtros.pacienteId = pacienteId;
    }

    // Filtro por médico
    if (medicoId) {
      filtros.medicoId = medicoId;
    }

    // Filtro por rango de fechas
    if (fechaInicio && fechaFin) {
      filtros.fecha = {
        [Op.between]: [new Date(fechaInicio), new Date(fechaFin)],
      };
    } else if (fechaInicio) {
      filtros.fecha = { [Op.gte]: new Date(fechaInicio) };
    } else if (fechaFin) {
      filtros.fecha = { [Op.lte]: new Date(fechaFin) };
    }

    // Consulta a la base de datos con los filtros aplicados
    const historial = await FichaMedica.findAll({
      where: filtros,
      include: [
        { model: Paciente, as: 'paciente' },
        { model: Medico, as: 'medico', where: especialidad ? { especialidad } : undefined },
      ],
    });

    res.status(200).json(historial);
  } catch (error) {
    console.error('Error al obtener el historial:', error);
    res.status(500).json({ error: 'Error al obtener el historial de consultas' });
  }
}