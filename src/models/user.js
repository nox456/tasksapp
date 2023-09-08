import pool from "../database/db.js";
import bcrypt from "bcrypt";
import { z } from "zod";

export default class User {
    // Store a user in db by the data of this object
    static async save(username, password) {
        const data = await pool.query(
            "INSERT INTO users VALUES (DEFAULT, $1, $2,DEFAULT) RETURNING id",
            [username, password]
        );
        this.id = data.rows[0].id;
    }
    // Get user data by ID
    static async getById(id) {
        const data = await pool.query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);
        return data.rows[0];
    }
    // Encrypt the password of this object
    static encryptPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    // Check if the username of this object is stored in db
    static async usernameExits(username) {
        const data = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        return data.rows.length > 0;
    }
    // Check if the username of parameter is stored in db
    static async compareUsername(username) {
        const data = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        return data.rows.length == 0;
    }
    // Check if the password of parameter is the same of the username of this object
    static async comparePassword(username,password) {
        const data = await pool.query(
            "SELECT password FROM users WHERE username = $1",
            [username]
        );
        return await bcrypt.compare(password, data.rows[0].password);
    }
    // Instance this object with the data of the username
    static async setUserFromDB(username) {
        const data = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        return {
            id: data.rows[0].id,
            username: data.rows[0].username,
            password: data.rows[0].password,
        };
    }
    // Update the username of the user of this object
    static async updateUsername(newUsername,username) {
        return await pool.query(
            "UPDATE users SET username = $1 WHERE username = $2",
            [newUsername, username]
        );
    }
    // Update the password of the user of this object
    static async updatePassword(newPassword,username) {
        return await pool.query(
            "UPDATE users SET password = $1 WHERE username = $2",
            [newPassword, username]
        );
    }
    // Delete a user from db
    static async delete(username) {
        return await pool.query("DELETE FROM users WHERE username = $1", [
            username,
        ]);
    }
    // Add a user image
    static async setImg(username,file_name) {
        return await pool.query(
            "UPDATE users SET user_img = $1 WHERE username = $2",
            [file_name, username]
        );
    }
    // Add 5 points to a user
    static async addPoints(username) {
        return await pool.query(
            "UPDATE users SET points = points + 5 WHERE username = $1",
            [username]
        );
    }
    // Get the count of tasks of a user
    static async getTasksCount(username) {
        const dataUser = await pool.query(
            "SELECT id FROM users WHERE username = $1",
            [username]
        );
        const id = dataUser.rows[0].id;
        const data = await pool.query(
            "select * from tasks where user_id = $1",
            [id]
        );
        return data.rows.length;
    }
    // Get the count of tasks doned of a user
    static async getTasksDonedCount(username) {
        const dataUser = await pool.query(
            "SELECT id FROM users WHERE username = $1",
            [username]
        );
        const id = dataUser.rows[0].id;
        const data = await pool.query(
            "select * from tasks where user_id = $1",
            [id]
        );
        return data.rows.filter((t) => t.done == true).length;
    }
    // Get the count of habits of a user
    static async getHabitsCount(username) {
        const dataUser = await pool.query(
            "SELECT id FROM users WHERE username = $1",
            [username]
        );
        const id = dataUser.rows[0].id;
        const data = await pool.query(
            "select * from habits where user_id = $1",
            [id]
        );
        return data.rows.length;
    }
    // Validate input data
    static async validate(username, password) {
        const userSchema = z.object({
            username: z
                .string()
                .max(20, {
                    message:
                        "El nombre de usuario tiene que ser menor de 20 caracteres!",
                })
                .refine(
                    (val) => {
                        return !val.includes(" ");
                    },
                    {
                        message:
                            "El nombre de usuario no debe tener espacios en blanco!",
                    }
                ),
            password: z
                .string()
                .min(5, {
                    message:
                        "La contraseña tiene que ser mayor de 5 caracteres!",
                })
                .refine(
                    (val) => {
                        const specialChars = [".", ",", "_", "-"];
                        return specialChars.some((char) => val.includes(char));
                    },
                    {
                        message:
                            "La contraseña debe tener por lo menos 1 caracter especial! ( , . _ - )",
                    }
                ),
        });
        return await userSchema.parseAsync({ username, password });
    }
}
