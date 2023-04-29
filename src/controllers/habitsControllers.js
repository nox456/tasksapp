import pg from "pg";
import {
    deleteData,
    insertData,
    selectData,
    selectDataId,
    updateData,
} from "./queryControllers.js";

const pool = new pg.Pool({
    host: "localhost",
    user: "postgres",
    password: "LZACGWCS",
    database: "tasksapp",
});

export const getHabits = async (req, res) => {
    const orderText = req.query.order
    const data = await selectData(
        ["id", "title", "description", "days", "time_to_do", "category"],
        "habits",
        orderText || "title ASC"
    );
    const message = req.session.message;
    delete req.session.message;
    res.render("habits/habitsList", {
        styles: "habits",
        habits: data.rows,
        message,
        orderText
    });
};

export const addHabit = async (req, res) => {
    const { title, description, days, time_to_do, category } = req.body;

    await insertData("habits", [
        title,
        description,
        typeof days == "string" ? [days] : days,
        time_to_do,
        category,
    ]);
    req.session.message = "Habito Creado con Éxito";

    res.redirect("/habits/list");
};

export const deleteHabit = async (req, res) => {
    const { id } = req.query;

    await deleteData(id, "habits");
    req.session.message = "Habito Eliminado con Éxito";

    res.redirect("/habits/list");
};

export const getHabitsData = async (req, res) => {
    const { id } = req.query;
    const data = await selectDataId(
        id,
        ["id", "title", "description", "days", "time_to_do", "category"],
        "habits"
    );
    res.render("habits/updateHabits", {
        habit: data.rows[0],
        styles: "habits",
    });
};

export const updateHabits = async (req, res) => {
    const { id, title, description, days, time_to_do, category } = req.query;

    await updateData(
        "habits",
        ["title", "description", "days", "time_to_do", "category"],
        [title, description,typeof days == "string" ? [days] : days, time_to_do, category],
        id
    );

    req.session.message = "Habito Modificado con Éxito";

    res.redirect("/habits/list");
};

export const getHabitsDetails = async (req, res) => {
    const { id } = req.query;

    const data = await selectDataId(
        id,
        ["title", "description", "days", "time_to_do", "category"],
        "habits"
    );
    res.render("habits/detailsHabits", {
        styles: "habits",
        habit: data.rows[0],
    });
};
