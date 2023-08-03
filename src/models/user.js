import pool from "../database/db.js";
import bcrypt from "bcrypt";

export default class User {
    constructor(username, password) {
        this.username = username || undefined;
        this.password = password || undefined;
    }
    // Store a user in db by the data of this object
    async save() {
        const data = await pool.query(
            "INSERT INTO users VALUES (DEFAULT, $1, $2,DEFAULT) RETURNING id",
            [this.username, this.password]
        );
        this.id = data.rows[0].id;
    }
    // Get user data by ID
    async getById(id) {
        const data = await pool.query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);
        return data.rows[0];
    }
    // Encrypt the password of this object
    encryptPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
    }
    // Check if the username of this object is stored in db 
    async usernameExits() {
        const data = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [this.username]
        );
        return data.rows.length > 0;
    }
    // Check if the username of parameter is stored in db
    async compareUsername(username) {
        const data = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        return data.rows.length == 0;
    }
    // Check if the password of parameter is the same of the username of this object
    async comparePassword(password) {
        const data = await pool.query(
            "SELECT password FROM users WHERE username = $1",
            [this.username]
        );
        return await bcrypt.compare(password, data.rows[0].password);
    }
    // Instance this object with the data of the username
    async setUserFromDB(username) {
        const data = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        this.id = data.rows[0].id;
        this.username = data.rows[0].username;
        this.password = data.rows[0].password;
    }
    // Update the username of the user of this object
    async updateUsername(newUsername) {
        return await pool.query("UPDATE users SET username = $1 WHERE username = $2",
        [newUsername,this.username])
    }
    // Update the password of the user of this object
    async updatePassword() {
        return await pool.query("UPDATE users SET password = $1 WHERE username = $2",[this.password,this.username])
    }
    // Delete a user from db
    async delete() {
        return await pool.query("DELETE FROM users WHERE username = $1",[this.username])
    }
    // Add a user image
    async setImg(file_name) {
        return await pool.query("UPDATE users SET user_img = $1 WHERE username = $2",[file_name,this.username])
    }
    // Get the points of a user
    async getPoints() {
        const data = await pool.query("SELECT points FROM users WHERE username = $1",[this.username])
        return data.rows[0].points
    }
    // Add 5 points to a user
    async addPoints(){
        return await pool.query("UPDATE users SET points = points + 5 WHERE username = $1", [this.username])
    }
    // Get the count of tasks of a user
    async getTasksCount() {
        const dataUser = await pool.query("SELECT id FROM users WHERE username = $1",[this.username])
        const id = dataUser.rows[0].id
        const data = await pool.query("select * from tasks where user_id = $1",[id])
        return data.rows.length
    }
    // Get the count of tasks doned of a user
    async getTasksDonedCount() {
        const dataUser = await pool.query("SELECT id FROM users WHERE username = $1",[this.username])
        const id = dataUser.rows[0].id 
        const data = await pool.query("select * from tasks where user_id = $1",[id])
        return data.rows.filter(t => t.done == true).length
    }
    // Get the count of habits of a user
    async getHabitsCount() {
        const dataUser = await pool.query("SELECT id FROM users WHERE username = $1",[this.username])
        const id = dataUser.rows[0].id
        const data = await pool.query("select * from habits where user_id = $1",[id])
        return data.rows.length
    }
}
