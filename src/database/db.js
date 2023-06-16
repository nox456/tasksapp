import pg from "pg";

const pool = new pg.Pool({
    host: "localhost",
    user: "postgres",
    password: "LZACGWCS",
    database: "tasksapp",
});

export default pool;
