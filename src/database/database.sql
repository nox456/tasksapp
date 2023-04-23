CREATE DATABASE tasksapp;

\c tasksapp

/* TASKS */
CREATE TABLE tasks (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    description TEXT DEFAULT 'Ninguna descripcion',
    created_at TIMESTAMP NOT NULL,
    finish_at TIMESTAMP NOT NULL,
    category VARCHAR(15) DEFAULT 'Otra'
);

/* HABITS */
CREATE TABLE habits (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    description TEXT DEFAULT 'Ninguna descripcion',
    days text[] NOT NULL,
    time_to_do TIME WITHOUT TIME ZONE NOT NULL,
    category VARCHAR(15) DEFAULT 'Otra'
);
