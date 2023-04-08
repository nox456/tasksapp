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

export const addTask = async (req,res) => {
    const { title, description, created_at, finished_at, category } = req.body

    await pool.query("INSERT INTO tasks ( title,description,created_at,finish_at,category ) VALUES ($1,$2,$3,$4,$5)",[ title, description, created_at, finished_at, category ])

    console.log(title)
    console.log(description)
    console.log(created_at)
    console.log(finished_at)
    console.log(category)

    res.redirect("/tasklist")
}
