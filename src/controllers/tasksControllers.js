import {
    deleteTaskData,
    insertTaskData,
    selectTaskData,
    selectTaskDataById,
    updateTaskData,
} from "./querys/tasksQuerys.js";

export const getTasks = async (req, res) => {
    const orderText = req.query.order;
    const user_id = req.user.id
    const data = await selectTaskData(orderText || "title ASC",user_id);

    const message = req.session.message;
    delete req.session.message;

    res.render("tasks/taskList", {
        styles: "tasks",
        tasks: data.rows,
        message,
        orderText,
        user: req.user ? req.user : undefined
    });
};

export const addTask = async (req, res) => {
    const { title, description, finished_at, category } = req.body;
    const user_id = req.user.id
    await insertTaskData([title, description, finished_at, category,user_id]);

    req.session.message = "Tarea Creada con Éxito";

    res.redirect("/tasks/list");
};

export const deleteTask = async (req, res) => {
    const { id } = req.query;

    await deleteTaskData(id);

    req.session.message = "Tarea Eliminada con Éxito";
    res.redirect("/tasks/list");
};

export const getTasksData = async (req, res) => {
    const { id } = req.query;

    const data = await selectTaskDataById(id, req.url);

    res.render("tasks/updateTasks", {
        styles: "tasks",
        tasks: data.rows[0],
        user: req.user ? req.user : undefined
    });
};

export const updateTasks = async (req, res) => {
    const { id, title, description, finished_at, category } = req.query;

    await updateTaskData([title, description, finished_at, category], id);

    req.session.message = "Tarea Modificada con Éxito";
    res.redirect("/tasks/list");
};

export const getTaskDetails = async (req, res) => {
    const { id } = req.query;

    const data = await selectTaskDataById(id, req.url);

    res.render("tasks/detailsTasks", {
        styles: "tasks",
        task: data.rows[0],
        user: req.user ? req.user : undefined
    });
};
