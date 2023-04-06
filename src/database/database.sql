CREATE DATABASE tasksapp;

CREATE TABLE tasks (
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    description VARCHAR(100) DEFAULT 'Ninguna descripcion',
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    finish_at TIMESTAMP NOT NULL
);

ALTER TABLE tasks ADD COLUMN category VARCHAR(15) DEFAULT 'Otra';
