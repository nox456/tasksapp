import pool from "../database/db.js";

const habitData = `id,title,description,days,time_to_do,category`;
export default class Habit {
    constructor(title, description, days, time_to_do, category, user_id) {
        this.title = title || undefined;
        this.description = description || undefined;
        this.days = days || undefined;
        this.time_to_do = time_to_do || undefined;
        this.category = category || undefined;
        this.user_id = user_id || undefined;
    }
    async save() {
        const values = [
            this.title,
            this.description,
            typeof this.days == "string" ? [this.days] : this.days,
            this.time_to_do,
            this.category,
            this.user_id,
        ];
        const valuesData = values.map((e, i) => `$${i + 1}`);
        return await pool.query(
            `INSERT INTO habits (id,title,description,days,time_to_do,category,user_id) VALUES ( DEFAULT,${valuesData.join(
                ","
            )} )`,
            values
        );
    }
    async getAll(order, user_id) {
        if (order) {
            return await pool.query(
                `SELECT ${habitData} FROM habits WHERE user_id = '${user_id}' ORDER BY ${order}`
            );
        } else {
            return await pool.query(`SELECT ${habitData} FROM habits`);
        }
    }
    async getById(id) {
        return await pool.query(
            `SELECT ${habitData} FROM habits WHERE id = $1`,
            [id]
        );
    }
    async update(id) {
        const values = [
            id,
            this.title,
            this.description,
            typeof this.days == "string" ? [this.days] : this.days,
            this.time_to_do,
            this.category,
        ];
        const fieldsData = habitData
            .split(",")
            .map((e, i) => `${e} = $${i + 1}`);
        return await pool.query(
            `UPDATE habits SET ${fieldsData.join(",")} WHERE id = '${id}'`,
            values
        );
    }
    async delete(id) {
        return await pool.query(`DELETE FROM habits WHERE id = $1`, [id]);
    }
}
