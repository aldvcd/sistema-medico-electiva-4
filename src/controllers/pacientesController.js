import {Paciente} from '../models/Pacientes.js'

export const getAllPacientes = async (req, res) => {
    const pacientes = await Paciente.findAll();
    res.json(pacientes);
};

export const createPaciente = async (req, res) => {
    const paciente = await Paciente.create(req.body);
    res.status(201).json(paciente);
};
