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
    constructor(title, description, finished_at, category, user_id) {
        this.title = title || undefined;
        this.description = description || undefined;
        this.finished_at = finished_at || undefined;
        this.category = category || undefined;
        this.user_id = user_id || undefined;
    }
    // Store a task in db with the data of this object
    async save() {
        const values = [
            this.title,
            this.description,
            this.finished_at,
            this.category,
            this.user_id,
        ];
        const valuesData = values.map((e, i) => `$${i + 1}`);
        return await pool.query(
            `INSERT INTO tasks (id,done,created_at,title,description,finish_at,category,user_id) VALUES (DEFAULT, DEFAULT, current_date,${valuesData.join(
                ","
            )} )`,
            [
                this.title,
                this.description,
                this.finished_at,
                this.category,
                this.user_id,
            ]
        );
    }
    // Get all tasks that owner is the user logged
    async getAll(order, user_id, done) {
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
    async getById(id, url) {
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
    async update(id) {
        const values = [
            this.title,
            this.description,
            this.finished_at,
            this.category,
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
    async delete(id) {
        return await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    }
    // Mark a task doned, changing it 'done' field
    async done(id) {
        return await pool.query("UPDATE tasks SET done = $1 WHERE id = $2", [
            true,
            id,
        ]);
    }
    // Get the tasks wich title includes the search query
    async search(search_query, user_id) {
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
    async validate(title, description, finish_at, category) {
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
                .string({
                    required_error: "Ingrese una Fecha de Finalizacion!",
                })
                .datetime()
                .refine(
                    (val) => {
                        return dayjs(val).add(1,"day").isSameOrAfter(dayjs(),"day");
                    },
                    {
                        message:
                            "La Fecha de Finalizacion no debe ser antes de hoy!",
                    }
                ),
        });
        return await taskSchema.parseAsync({
            title,
            description,
            finish_at:
                finish_at.length > 0
                    ? new Date(finish_at).toISOString()
                    : undefined,
        });
    }
}
