import pool from "../database/db.js";

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
    async update(id) {
        const values = [
            this.title,
            this.description,
            this.finished_at,
            this.category,
            false
        ]
        const data = taskData
            .filter((e) => e != "created_at" && e != "id")
            .map((e, i) => `${e} = $${i + 1}`);
        return await pool.query(
            `UPDATE tasks SET ${data.join(",")} WHERE id = '${id}'`,
            values
        );
    }
    async delete(id) {
        return await pool.query("DELETE FROM tasks WHERE id = $1",[id])
    }
    async done(id) {
        return await pool.query("UPDATE tasks SET done = $1 WHERE id = $2",[true,id])
    }
}
