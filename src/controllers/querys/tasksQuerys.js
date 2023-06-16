import pool from "../../database/db.js";

let taskData = [
    "id",
    "title",
    "description",
    "created_at",
    "finish_at",
    "category",
];

export const selectTaskData = async (order, user_id) => {
    const data = taskData.map((e, i) => {
        if (e == "created_at") {
            return "to_char(created_at,'DD Mon YYYY') as created_at";
        }
        if (e == "finish_at") {
            return "to_char(finish_at,'DD Mon YYYY') as finish_at";
        }
        return e;
    });
    if (order) {
        return await pool.query(
            `SELECT ${data.join(
                ","
            )} FROM tasks WHERE user_id = '${user_id}' ORDER BY ${order}`
        );
    } else {
        return await pool.query(
            `SELECT ${data.join(
                ","
            )} FROM tasks INNER JOIN users ON users.id = tasks.user_id`
        );
    }
};

export const selectTaskDataById = async (id) => {
    const data = taskData.map((e, i) => {
        if (e == "created_at") {
            return "to_char(created_at,'DD Mon YYYY') as created_at";
        }
        if (e == "finish_at") {
            return "to_char(finish_at,'YYYY-MM-DD') as finish_at";
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
        `INSERT INTO tasks (id,created_at,title,description,finish_at,category,user_id)
         VALUES ( DEFAULT, current_date,${valuesData.join(",")} )`,
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
