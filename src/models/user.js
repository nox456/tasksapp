import pool from "../database/db.js";
import bcrypt from "bcrypt";


export default class User {
    constructor(username,password) {
        this.username = username || undefined
        this.password = password || undefined
    }
    async save() {
        const data = await pool.query("INSERT INTO users VALUES (DEFAULT, $1, $2) RETURNING id", [this.username,this.password])
        this.id = data.rows[0].id
    }
    async getById(id) {
        const data = await pool.query("SELECT * FROM users WHERE id = $1", [id])
        return data.rows[0]
    }
    encryptPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
    }
    async emailExits() {
        const data = await pool.query("SELECT * FROM users WHERE username = $1", [this.username]) 
        return data.rows.length > 0
    }
    async compareUsername(username) {
        const data = await pool.query("SELECT * FROM users WHERE username = $1", [username])
        return data.rows.length > 0
    }
    async comparePassword(password) {
        const data = await pool.query("SELECT password FROM users WHERE username = $1", [this.username])
        return await bcrypt.compare(password, data.rows[0].password)
    }
    async setUserFromDB(username) {
        const data = await pool.query("SELECT * FROM users WHERE username = $1", [username])
        this.id = data.rows[0].id
        this.username = data.rows[0].username
        this.password = data.rows[0].password
    }
}
