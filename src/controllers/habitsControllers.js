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
