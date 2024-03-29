import pool from "../database/db.js";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter.js";
import { z } from "zod";

dayjs.extend(isSameOrAfter);

// String that have the task fields in db
let taskData = [
    "id",
    "title",
    "description",
    "created_at",
    "finish_at",
    "category",
    "done",
];

export default class Task {
    // Store a task in db with the data of this object
    static async save(title,description,finished_at,category,user_id) {
        const values = [
            title,
            description,
            finished_at,
            category,
            user_id,
        ];
        const valuesData = values.map((e, i) => `$${i + 1}`);
        return await pool.query(
            `INSERT INTO tasks (id,done,created_at,title,description,finish_at,category,user_id) VALUES (DEFAULT, DEFAULT, current_date,${valuesData.join(
                ","
            )} )`,
            [
                title,
                description,
                finished_at,
                category,
                user_id,
            ]
        );
    }
    // Get all tasks that owner is the user logged
    static async getAll(order, user_id, done) {
        const data = taskData.map((e, i) => {
            if (e == "created_at") {
                return "to_char(created_at,'DD Mon YYYY') as created_at";
            }
            if (e == "finish_at") {
                return "to_char(finish_at,'DD Mon YYYY') as finish_at";
            }
            return e;
        });
        if (done) {
            if (order) {
                return await pool.query(
                    `SELECT ${data.join(
                        ","
                    )} FROM tasks WHERE user_id = '${user_id}' AND done = true ORDER BY ${order}`
                );
            } else {
                return await pool.query(
                    `SELECT ${data.join(
                        ","
                    )} FROM tasks WHERE user_id = '${user_id}' AND done = true`
                );
            }
        } else {
            if (order) {
                return await pool.query(
                    `SELECT ${data.join(
                        ","
                    )} FROM tasks WHERE user_id = '${user_id}' AND done = false ORDER BY ${order}`
                );
            } else {
                return await pool.query(
                    `SELECT ${data.join(
                        ","
                    )} FROM tasks WHERE user_id = '${user_id}' AND done = false`
                );
            }
        }
    }
    // Get a task by ID field
    static async getById(id, url) {
        const data = taskData.map((e) => {
            if (e == "created_at") {
                return "to_char(created_at,'DD Mon YYYY') as created_at";
            }
            if (e == "finish_at") {
                return `to_char(finish_at,'${
                    url.includes("detail") ? "DD Mon YYYY" : "YYYY-MM-DD"
                }') as finish_at`;
            }
            return e;
        });
        return await pool.query(
            `SELECT ${data.join(",")} FROM tasks WHERE id = $1`,
            [id]
        );
    }
    // Update a task
    static async update(id,title,description,finish_at,category) {
        const values = [
            title,
            description,
            finish_at,
            category,
            false,
        ];
        const data = taskData
            .filter((e) => e != "created_at" && e != "id")
            .map((e, i) => `${e} = $${i + 1}`);
        return await pool.query(
            `UPDATE tasks SET ${data.join(",")} WHERE id = '${id}'`,
            values
        );
    }
    // Delete a task
    static async delete(id) {
        return await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    }
    // Mark a task doned, changing it 'done' field
    static async done(id) {
        return await pool.query("UPDATE tasks SET done = $1 WHERE id = $2", [
            true,
            id,
        ]);
    }
    // Get the tasks wich title includes the search query
    static async search(search_query, user_id) {
        const data = await pool.query(
            "SELECT title,category,done,to_char(finish_at,'DD Mon YYYY') as finish_at FROM tasks WHERE user_id = $1",
            [user_id]
        );
        const tasks = data.rows;
        const tasksFounded = [];
        tasks.forEach((task) => {
            if (task.title.toLowerCase().includes(search_query)) {
                tasksFounded.push(task);
            }
        });
        return tasksFounded;
    }
    // Validate task input
    static async validate(title, description, finish_at, category) {
        const taskSchema = z.object({
            title: z
                .string()
                .min(1, { message: "Ingresa un Titulo!" })
                .max(20, {
                    message: "El Titulo debe tener maximo 20 caracteres!",
                }),
            description: z
                .string()
                .min(1, { message: "Ingresa una Descripcion!" })
                .max(60, {
                    message: "La Descripcion debe tener maximo 60 caracteres!",
                }),
            finish_at: z
                .string()
                .min(1, { message: "Ingrese una Fecha de Finalizacion!" })
                .refine(
                    (val) => {
                        return dayjs(val)
                            .isSameOrAfter(dayjs(), "day");
                    },
                    {
                        message:
                            "La Fecha de Finalizacion no debe ser antes de hoy!",
                    }
                ),
            category: z
                .enum([
                    "Seleccione",
                    "Academica",
                    "Salud",
                    "Practica",
                    "Laboral",
                ])
                .refine((val) => val != "Seleccione", {
                    message: "Ingrese una Categoria!",
                }),
        });
        return await taskSchema.parseAsync({
            title,
            description,
            finish_at,
            category,
        });
    }
}
