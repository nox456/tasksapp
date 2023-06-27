import pool from "../../database/db.js";

let taskData = [
    "id",
    "title",
    "description",
    "created_at",
    "finish_at",
    "category",
    "done",
];

export const selectTaskData = async (order, user_id, done) => {
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
};

export const selectTaskDataById = async (id, url) => {
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
};

export const insertTaskData = async (values) => {
    const valuesData = values.map((e, i) => `$${i + 1}`);
    return await pool.query(
        `INSERT INTO tasks (id,done,created_at,title,description,finish_at,category,user_id)
         VALUES ( DEFAULT,DEFAULT, current_date,${valuesData.join(",")} )`,
        values
    );
};

export const deleteTaskData = async (id) => {
    return await pool.query(`DELETE FROM tasks WHERE id = $1`, [id]);
};

export const updateTaskData = async (values, id) => {
    const data = taskData
        .filter((e) => e != "created_at" && e != "id")
        .map((e, i) => `${e} = $${i + 1}`);
    return await pool.query(
        `UPDATE tasks SET ${data.join(",")} WHERE id = '${id}'`,
        values
    );
};

export const updateDoneTask = async (id) => {
    await pool.query("UPDATE tasks SET done = $1 WHERE id = $2", [true, id]);
};
