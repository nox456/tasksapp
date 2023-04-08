import { Router } from "express";
import { getTasks, addTask } from "../controllers/tasksControllers.js";

const router = Router()

router.get("/", (req,res) => res.render("index"))

router.get("/tasklist", getTasks)

router.get("/tasklist/add", (req,res) => res.render("addTask"))

router.post("/addtask", addTask)

export default router
