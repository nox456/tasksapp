CREATE DATABASE tasksapp;

CREATE TABLE tasks (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    description VARCHAR(100) DEFAULT 'Ninguna descripcion',
    created_at TEXT NOT NULL,
    finish_at TEXT NOT NULL,
    category VARCHAR(15) DEFAULT 'Otra'
);
