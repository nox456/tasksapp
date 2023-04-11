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


    res.redirect("/tasklist")
}

export const deleteTask = async (req,res) => {
    const { id } = req.query

    await pool.query("DELETE FROM tasks WHERE id = $1",[ id ])
    res.redirect("/tasklist")
}

export const getTasksData = async (req,res) => {
    const { id } = req.query

    const data = await pool.query("SELECT * FROM tasks WHERE id = $1", [ id ])

    res.render("updateTasks", {
        tasks: data.rows[0]
    })
}

