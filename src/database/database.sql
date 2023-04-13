CREATE DATABASE tasksapp;

CREATE TABLE tasks (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    description TEXT DEFAULT 'Ninguna descripcion',
    created_at TIMESTAMP NOT NULL,
    finish_at TIMESTAMP NOT NULL,
    category VARCHAR(15) DEFAULT 'Otra'
);
