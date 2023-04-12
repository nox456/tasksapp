import pg from "pg";

const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'LZACGWCS',
    database: 'tasksapp'
})


export const getTasks = async (req,res) => {
    const data = await pool.query("SELECT id,title,description,to_char(created_at,'DD Mon YYYY') as created_at,to_char(finish_at,'DD Mon YYYY') as finish_at, category FROM tasks")
    res.render("taskList", {
        tasks: data.rows
    })
}

export const addTask = async (req,res) => {
    const { title, description, created_at, finished_at, category } = req.body

    await pool.query("INSERT INTO tasks ( title,description,created_at,finish_at,category ) VALUES ($1,$2,current_date,$3,$4)",[ title, description, finished_at, category ])


    res.redirect("/tasklist")
}

export const deleteTask = async (req,res) => {
    const { id } = req.query

    await pool.query("DELETE FROM tasks WHERE id = $1",[ id ])
    res.redirect("/tasklist")
}

export const getTasksData = async (req,res) => {
    const { id } = req.query

    const data = await pool.query("SELECT id,title, description, to_char(finish_at,'YYYY-MM-DD') as finish_at, category FROM tasks WHERE id = $1", [ id ])

    res.render("updateTasks", {
        tasks: data.rows[0]
    })
}


export const updateTasks = async (req,res) => {
    const { id, title, description, finished_at, category } = req.query

    await pool.query("UPDATE tasks SET title = $1, description = $2, finish_at = $3, category = $4 WHERE id = $5", [ title, description, finished_at, category, id ])
    res.redirect("/tasklist")
}
