import pool from "../../database/db.js";

export const getUserByUsername = async (username) => {
    return await pool.query("SELECT * FROM users WHERE username = $1", [
        username,
    ]);
};

export const addPoints = async (id) => {
    await pool.query("UPDATE users SET points = points + 5 WHERE id = $1", [id])
}

export const getTasksCount = async (id) => {
    return await pool.query("SELECT * FROM tasks WHERE user_id = $1", [id])
}

export const getHabitsCount = async (id) => {
    return await pool.query("SELECT * FROM habits WHERE user_id = $1", [id])
}
