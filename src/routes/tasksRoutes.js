import { Router } from "express";
import { getTasks, addTask, deleteTask, getTasksData, updateTasks, getTaskDetails } from "../controllers/tasksControllers.js";

const router = Router()

router.get("/tasks/list", getTasks)

router.get("/tasks/add", (req,res) => res.render("tasks/addTask"))

router.post("/add", addTask)

router.get("/delete", deleteTask)

router.get("/tasks/update", getTasksData)

router.get("/update", updateTasks)

router.get("/tasks/detail", getTaskDetails)

export default router
