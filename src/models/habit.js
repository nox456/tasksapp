import pool from "../database/db.js";
import { z } from "zod";

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
    static async save(title,description,days,time_to_do,category,user_id) {
        const values = [
            title,
            description,
            typeof days == "string" ? [days] : days,
            time_to_do,
            category,
            user_id,
        ];
        const valuesData = values.map((e, i) => `$${i + 1}`);
        return await pool.query(
            `INSERT INTO habits (id,title,description,days,time_to_do,category,user_id) VALUES ( DEFAULT,${valuesData.join(
                ","
            )} )`,
            values
        );
    }
    // Get all habits that owner is the user logged
    static async getAll(order, user_id) {
        return await pool.query(
            `SELECT ${habitData} FROM habits WHERE user_id = '${user_id}' ORDER BY ${order}`
        );
    }
    // Get a habit by ID field
    static async getById(id) {
        return await pool.query(
            `SELECT ${habitData} FROM habits WHERE id = $1`,
            [id]
        );
    }
    // Update a habit
    static async update(id, title, description, days, time_to_do, category) {
        const values = [
            id,
            title,
            description,
            typeof days == "string" ? [days] : days,
            time_to_do,
            category,
        ];
        const fieldsData = habitData
            .split(",")
            .map((e, i) => `${e} = $${i + 1}`);
        return await pool.query(
            `UPDATE habits SET ${fieldsData.join(",")} WHERE id = '${id}'`,
            values
        );
    }
    // Delete a Habit
    static async delete(id) {
        return await pool.query(`DELETE FROM habits WHERE id = $1`, [id]);
    }
    // Get the tasks wich title includes the search query
    static async search(search_query, user_id) {
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
    // Validate habit input
    static async validate(title, description, days, time_to_do, category) {
        const habitSchema = z.object({
            title: z
                .string()
                .min(1, { message: "Ingresa un Titulo!" })
                .max(20, {
                    message: "El Titulo debe tener maximo 20 caracteres!",
                }),
            description: z
                .string()
                .min(1, { message: "Ingresa una Descripcion!" })
                .max(60, {
                    message: "La Descripcion debe tener maximo 60 caracteres!",
                }),
            days: z
                .string({ required_error: "Seleccione por lo menos 1 dia!" })
                .array(),
            time_to_do: z.string().min(1, { message: "Ingrese una hora!" }),
            category: z
                .enum([
                    "Seleccione",
                    "Academica",
                    "Salud",
                    "Practica",
                    "Laboral",
                ])
                .refine((val) => val != "Seleccione", {
                    message: "Ingrese una Categoria!",
                }),
        });
        return await habitSchema.parseAsync({
            title,
            description,
            days: typeof days == "string" ? [days] : days,
            time_to_do,
            category
        });
    }
}
