import { Router } from "express";
import {
    getTasks,
    addTask,
    deleteTask,
    getTasksData,
    updateTasks,
    getTaskDetails,
    doneTask,
    searchTask,
} from "../controllers/tasksControllers.js";

const router = Router();

// Route to tasks list page
router.get("/tasks/list", getTasks);

// Route to add task page
router.get("/tasks/add", (req, res) => {
    const message = req.session.message
    delete req.session.message
    res.render("tasks/addTask", {
        message,
        styles: "tasks",
        styles2: "inputs",
        user: req.user ? req.user : undefined,
    });
});

// Route to add a task
router.post("/tasksAdd", addTask);

// Route to delete a task
router.get("/tasksDelete", deleteTask);

// Route to update task page
router.get("/tasks/update", getTasksData);

// Route to update a task
router.get("/tasksUpdate", updateTasks);

// Route to task detalis page
router.get("/tasks/detail", getTaskDetails);

// Route to mark a task doned
router.post("/tasksDone", doneTask);

// Route to search task results
router.get("/searchTasks", searchTask);

export default router;
