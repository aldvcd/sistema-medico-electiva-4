CREATE DATABASE sistema_medico
WITH 
    OWNER = avelazquez
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

    CREATE TABLE Pacientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    cedula VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefono VARCHAR(50),
    fecha_nacimiento DATE NOT NULL
);

CREATE TABLE Medicos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    cedula VARCHAR(255) NOT NULL UNIQUE,
    especialidad VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    email VARCHAR(255) UNIQUE
);


CREATE TABLE FichasClinicas (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL,
    diagnostico TEXT,
    tratamiento TEXT,
    observaciones TEXT,
    paciente_id INT NOT NULL,
    medico_id INT NOT NULL,
    FOREIGN KEY (paciente_id) REFERENCES Pacientes (id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES Medicos (id) ON DELETE SET NULL
);


CREATE TABLE HistorialesMedicos (
    id SERIAL PRIMARY KEY,
    fecha_ingreso TIMESTAMP NOT NULL,
    descripcion TEXT,
    paciente_id INT NOT NULL,
    FOREIGN KEY (paciente_id) REFERENCES Pacientes (id) ON DELETE CASCADE
);


ALTER TABLE FichasClinicas
ADD COLUMN historial_medico_id INT,
ADD FOREIGN KEY (historial_medico_id) REFERENCES HistorialesMedicos (id) ON DELETE SET NULL;
