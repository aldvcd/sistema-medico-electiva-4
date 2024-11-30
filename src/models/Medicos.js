import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Router } from "express";
import bcrypt from 'bcryptjs';

export const Medico = sequelize.define("Medico", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    especialidad: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Pediatra", "Dermatologo", "Clinico", "Cardiologo", "Traumatologo"]],
      },
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Medico.beforeCreate(async (medico) => {
    if (medico.password) {
      const salt = await bcrypt.genSalt(10); // Genera un "salt" de 10 rondas
      medico.password = await bcrypt.hash(medico.password, salt); // Encripta la contraseña
    }
  });