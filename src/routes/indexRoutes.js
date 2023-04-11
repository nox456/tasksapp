import { Router } from "express";
import { getTasks, addTask, deleteTask, getTasksData } from "../controllers/tasksControllers.js";

const router = Router()

router.get("/", (req,res) => res.render("index"))

router.get("/tasklist", getTasks)

router.get("/tasklist/add", (req,res) => res.render("addTask"))

router.post("/addtask", addTask)

router.get("/delete", deleteTask)

router.get("/tasklist/update", getTasksData)

export default router
