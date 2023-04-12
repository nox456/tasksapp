import pg from "pg";

const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'LZACGWCS',
    database: 'tasksapp'
})

export const selectData = async (taskData) => {
    return await pool.query(`SELECT ${taskData.join(",")} FROM tasks`)
}
export const selectDataId = async (id,taskData) => {
    return await pool.query(`SELECT ${taskData.join(",")} FROM tasks WHERE id = $1`,[id])
}
