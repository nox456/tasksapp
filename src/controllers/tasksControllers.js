import pg from "pg";

const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'LZACGWCS',
    database: 'tasksapp'
})

export const getTasks = async (req,res) => {
    const data = await pool.query("SELECT * FROM tasks")
    res.render("taskList", {
        tasks: data.rows
    })
}
