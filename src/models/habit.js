import pool from "../database/db.js";

// String that have the habit fields in db
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
    // Store a habit in db with the data of this object
    async save() {
        return new Promise(async (resolve, reject) => {
            const values = [
                this.title,
                this.description,
                typeof this.days == "string" ? [this.days] : this.days,
                this.time_to_do,
                this.category,
                this.user_id,
            ];
            const valuesData = values.map((e, i) => `$${i + 1}`);
            let data;
            try {
                data = await pool.query(
                    `INSERT INTO habits (id,title,description,days,time_to_do,category,user_id) VALUES ( DEFAULT,${valuesData.join(
                        ","
                    )} )`,
                    values
                );
            } catch (error) {
                console.log(error);
                reject(error);
            }
            resolve(data);
        });
    }
    // Get all habits that owner is the user logged
    async getAll(order, user_id) {
        return new Promise(async (resolve, reject) => {
            let data;
            try {
                data = await pool.query(
                    `SELECT ${habitData} FROM habits WHERE user_id = '${user_id}' ORDER BY ${order}`
                );
            } catch (error) {
                console.error(error);
                reject(error);
            }
            resolve(data);
        });
    }
    // Get a habit by ID field
    async getById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    await pool.query(
                        `SELECT ${habitData} FROM habits WHERE id = $1`,
                        [id]
                    )
                );
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }
    // Update a habit
    async update(id) {
        return new Promise(async (resolve, reject) => {
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
            try {
                resolve(
                    await pool.query(
                        `UPDATE habits SET ${fieldsData.join(
                            ","
                        )} WHERE id = '${id}'`,
                        values
                    )
                );
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }
    // Delete a Habit
    async delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    await pool.query(`DELETE FROM habits WHERE id = $1`, [id])
                );
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }
    // Get the tasks wich title includes the search query
    async search(search_query, user_id) {
        const data = await pool.query(
            "SELECT title,category,time_to_do FROM habits WHERE user_id = $1",
            [user_id]
        );
        const habits = data.rows;
        const habitsFounded = [];
        habits.forEach((habit) => {
            if (habit.title.toLowerCase().includes(search_query)) {
                habitsFounded.push(habit);
            }
        });
        return habitsFounded;
    }
}
