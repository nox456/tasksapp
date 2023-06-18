CREATE DATABASE tasksapp;

/* TASKS */
CREATE TABLE tasks (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    description TEXT DEFAULT 'Ninguna descripcion',
    created_at TIMESTAMP NOT NULL,
    finish_at TIMESTAMP NOT NULL,
    category VARCHAR(15) DEFAULT 'Otra',
    done BOOLEAN NOT NULL DEFAULT false,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

/* HABITS */
CREATE TABLE habits (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    description TEXT DEFAULT 'Ninguna descripcion',
    days text[] NOT NULL,
    time_to_do TIME WITHOUT TIME ZONE NOT NULL,
    category VARCHAR(15) DEFAULT 'Otra',
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

/* USERS */
CREATE TABLE users (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);
