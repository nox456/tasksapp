import { Router } from "express";
import { getTasks, addTask, deleteTask, getTasksData, updateTasks } from "../controllers/tasksControllers.js";

const router = Router()

router.get("/", (req,res) => res.render("index"))

router.get("/tasks/list", getTasks)

router.get("/tasks/add", (req,res) => res.render("addTask"))

router.post("/add", addTask)

router.get("/delete", deleteTask)

router.get("/tasks/update", getTasksData)

router.get("/update", updateTasks)

router.get("/tasks/details", (req,res) => res.render("detailsTasks"))

export default router
