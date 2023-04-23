import pg from "pg";
import { selectData, selectDataId } from "./queryControllers.js";

const pool = new pg.Pool({
    host: "localhost",
    user: "postgres",
    password: "LZACGWCS",
    database: "tasksapp",
});

export const getHabits = async (req,res) => {
    const data = await selectData([
        "id",
        "title",
        "description",
        "days",
        "time_to_do",
        "category"
    ],"habits") 
    console.log(data.rows)
    res.render("habits/habitsList", {
        styles: "habits",
        habits: data.rows,
    })
}

export const addHabit = async (req,res) => {
    const { title, description, days, time_to_do, category } = req.body

    await pool.query("INSERT INTO habits ( title, description, days, time_to_do, category ) VALUES ($1,$2,$3,$4,$5)", [ title, description, days, time_to_do, category])
    req.session.message = "Habito Creado con Éxito"

    res.redirect("/habits/list")
}
