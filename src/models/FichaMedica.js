import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Router } from "express";
import { Paciente } from "./Pacientes.js";
import { Medico } from "./Medicos.js";

export const FichaMedica = sequelize.define('FichaMedica', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  detallesConsulta: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  motivoConsulta: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  diagnostico: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tratamiento: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

// Relaciones
FichaMedica.belongsTo(Paciente, { foreignKey: 'pacienteId', as: 'paciente' });
FichaMedica.belongsTo(Medico, { foreignKey: 'medicoId', as: 'medico' });

