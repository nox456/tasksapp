import pool from "../../database/db.js";

export const getUserTasks = async (user_id) => {
    return await pool.query("SELECT * FROM tasks WHERE user_id = $1", [
        user_id,
    ]);
};

export const getUserHabits = async (user_id) => {
    return await pool.query("SELECT * FROM habits WHERE user_id = $1", [
        user_id,
    ]);
};

export const getUserByUsername = async (username) => {
    return await pool.query("SELECT * FROM users WHERE username = $1", [
        username,
    ]);
};

export const updateUsername = async (old_username, new_username) => {
    await pool.query("UPDATE users SET username = $1 WHERE username = $2", [
        new_username,
        old_username,
    ]);
};

export const updatePassword = async (username, new_password) => {
    await pool.query("UPDATE users SET password = $1 WHERE username = $2", [
        new_password,
        username,
    ]);
};

export const deleteUser = async (username) => {
    await pool.query("DELETE FROM users WHERE username = $1", [username]);
};
