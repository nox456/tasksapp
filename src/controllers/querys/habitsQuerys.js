import pool from "../../database/db.js";

const habitData = `id,title,description,days,time_to_do,category`;

export const selectHabitData = async (order) => {
    if (order) {
        return await pool.query(
            `SELECT ${habitData} FROM habits ORDER BY ${order}`
        );
    } else {
        return await pool.query(`SELECT ${habitData} FROM habits`);
    }
};
export const selectHabitDataById = async (id) => {
    return await pool.query(`SELECT ${habitData} FROM habits WHERE id = $1`, [
        id,
    ]);
};

export const insertHabitData = async (values) => {
    const valuesData = values.map((e, i) => `$${i + 1}`);
    return await pool.query(
        `INSERT INTO habits (id,title,description,days,time_to_do,category) VALUES ( DEFAULT,${valuesData.join(
            ","
        )} )`,
        values
    );
};


export const deleteHabitData = async (id) => {
    return await pool.query(`DELETE FROM habits WHERE id = $1`, [id]);
};


export const updateHabitData = async (values, id) => {
    const fieldsData = habitData.split(",").map((e, i) => `${e} = $${i + 1}`);
    return await pool.query(
        `UPDATE habits SET ${fieldsData.join(",")} WHERE id = '${id}'`,
        values
    );
}
