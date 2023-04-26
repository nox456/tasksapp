import pg from "pg";

const pool = new pg.Pool({
    host: "localhost",
    user: "postgres",
    password: "LZACGWCS",
    database: "tasksapp",
});

export const selectData = async (taskData, table, order) => {
    if (order) {
        return await pool.query(
            `SELECT ${taskData.join(",")} FROM ${table} ORDER BY ${order}`
        );
    } else {
        return await pool.query(`SELECT ${taskData.join(",")} FROM ${table}`);
    }
};
export const selectDataId = async (id, taskData, table) => {
    return await pool.query(
        `SELECT ${taskData.join(",")} FROM ${table} WHERE id = $1`,
        [id]
    );
};
export const insertData = async (table, values) => {
    const valuesData = values.map((e, i) => `$${i + 1}`);
    return await pool.query(
        `INSERT INTO ${table} VALUES ( DEFAULT,${valuesData.join(",")} )`,
        values
    );
};
export const deleteData = async (id, table) => {
    return await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
};
export const updateData = async (table, fields, values, id) => {
    const fieldsData = fields.map((e, i) => `${e} = $${i + 1}`);
    return await pool.query(
        `UPDATE ${table} SET ${fieldsData.join(",")} WHERE id = '${id}'`,
        values
    );
};
