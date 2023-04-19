import pg from "pg";

const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'LZACGWCS',
    database: 'tasksapp'
})

export const selectData = async (taskData,table,order) => {
    return await pool.query(`SELECT ${taskData.join(",")} FROM ${table} ${order}`)
}
export const selectDataId = async (id,taskData,table) => {
    return await pool.query(`SELECT ${taskData.join(",")} FROM ${table} WHERE id = $1`,[id])
}
