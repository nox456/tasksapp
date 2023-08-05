import Task from "../models/task.js";

import User from "../models/user.js";

// Get all tasks order or not, doned or no, and render 'taskList' view
export const getTasks = async (req, res) => {
    if (
        !req.session.orderText ||
        (req.session.orderText != req.query.order &&
            req.query.order != undefined)
    ) {
        req.session.orderText = req.query.order;
    }

    if (
        !req.session.doned ||
        (req.session.doned != req.query.doned && req.query.doned != undefined)
    ) {
        req.session.doned = req.query.doned;
    }

    const user_id = req.user.id;
    const data = await new Task().getAll(
        req.session.orderText || "title ASC",
        user_id,
        req.session.doned == "yes-done"
    );

    const message = req.session.message;
    delete req.session.message;

    res.render("tasks/taskList", {
        styles: "tasks",
        styles2: "search",
        tasks: data.rows,
        message,
        orderText: req.session.orderText,
        user: req.user ? req.user : undefined,
        doned: req.session.doned,
        searchTasks: true
    });
};

// Create a Task, save in db and redirect to tasks list page
export const addTask = async (req, res) => {
    const { title, description, finished_at, category } = req.body;
    const user_id = req.user.id;
    await new Task(title, description, finished_at, category, user_id).save();

    req.session.message = "Tarea Creada con Éxito";

    res.redirect("/tasks/list");
};

// Delete a task from db and redirect to tasks list page
export const deleteTask = async (req, res) => {
    const { id } = req.query;

    await new Task().delete(id);

    req.session.message = "Tarea Eliminada con Éxito";
    res.redirect("/tasks/list");
};

// Get a task by it ID field and render 'updateTasks' view to update it
export const getTasksData = async (req, res) => {
    const { id } = req.query;

    const data = await new Task().getById(id, req.url);

    res.render("tasks/updateTasks", {
        styles: "tasks",
        tasks: data.rows[0],
        user: req.user ? req.user : undefined,
    });
};

// Update a task in db and redirect to task list page
export const updateTasks = async (req, res) => {
    const { id, title, description, finished_at, category } = req.query;

    await new Task(title,description,finished_at,category).update(id)

    req.session.message = "Tarea Modificada con Éxito";
    res.redirect("/tasks/list");
};

// Get a task by it ID field and render 'detailsTasks' to show it data
export const getTaskDetails = async (req, res) => {
    const { id } = req.query;

    const data = await new Task().getById(id, req.url);

    res.render("tasks/detailsTasks", {
        styles: "tasks",
        task: data.rows[0],
        user: req.user ? req.user : undefined,
    });
};

// Update the 'done' field of a task and redirect to 'back' route
export const doneTask = async (req, res) => {
    const { id } = req.body;
    await new Task().done(id)
    const user = new User(req.user.username)
    await user.addPoints()
    req.session.message = "Tarea Hecha\n(+5 Puntos)";
    res.redirect("back");
};

// Search the tasks wich title includes the search query and render 'searchTasks' view 
export const searchTask = async (req,res) => {
    const { search_query } = req.query

    const tasksFounded = await new Task().search(search_query.trim().toLowerCase(),req.user.id)

    const message = req.session.message
    delete req.session.message
    
    res.render("tasks/searchTasks", {
        message,
        user: req.user,
        styles: "search",
        tasksFounded
    })
}
