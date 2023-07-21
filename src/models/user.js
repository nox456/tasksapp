import pool from "../database/db.js";
import bcrypt from "bcrypt";

export default class User {
    constructor(username, password) {
        this.username = username || undefined;
        this.password = password || undefined;
    }
    async save() {
        const data = await pool.query(
            "INSERT INTO users VALUES (DEFAULT, $1, $2,DEFAULT) RETURNING id",
            [this.username, this.password]
        );
        this.id = data.rows[0].id;
    }
    async getById(id) {
        const data = await pool.query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);
        return data.rows[0];
    }
    encryptPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    }
    async usernameExits() {
        const data = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [this.username]
        );
        return data.rows.length > 0;
    }
    async compareUsername(username) {
        const data = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        return data.rows.length == 0;
    }
    async comparePassword(password) {
        const data = await pool.query(
            "SELECT password FROM users WHERE username = $1",
            [this.username]
        );
        return await bcrypt.compare(password, data.rows[0].password);
    }
    async setUserFromDB(username) {
        const data = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        this.id = data.rows[0].id;
        this.username = data.rows[0].username;
        this.password = data.rows[0].password;
    }
    async updateUsername(newUsername) {
        return await pool.query("UPDATE users SET username = $1 WHERE username = $2",
        [newUsername,this.username])
    }
    async updatePassword() {
        return await pool.query("UPDATE users SET password = $1 WHERE username = $2",[this.password,this.username])
    }
    async delete() {
        return await pool.query("DELETE FROM users WHERE username = $1",[this.username])
    }
    async setImg(file_name) {
        return await pool.query("UPDATE users SET user_img = $1 WHERE username = $2",[file_name,this.username])
    }
    async getPoints() {
        const data = await pool.query("SELECT points FROM users WHERE username = $1",[this.username])
        return data.rows[0].points
    }
}
