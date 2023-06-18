import { Router } from "express";
import {
    getTasks,
    addTask,
    deleteTask,
    getTasksData,
    updateTasks,
    getTaskDetails,
    doneTask,
} from "../controllers/tasksControllers.js";

const router = Router();

router.get("/tasks/list", getTasks);

router.get("/tasks/add", (req, res) =>
    res.render("tasks/addTask", {
        styles: "tasks",
        user: req.user ? req.user : undefined,
    })
);

router.post("/tasksAdd", addTask);

router.get("/tasksDelete", deleteTask);

router.get("/tasks/update", getTasksData);

router.get("/tasksUpdate", updateTasks);

router.get("/tasks/detail", getTaskDetails);

router.post("/tasksDone", doneTask)

export default router;
