import { Router } from "express";
import { getTasks } from "../controllers/tasksControllers.js";

const router = Router()

router.get("/", (req,res) => res.render("index"))

router.get("/tasklist", getTasks)

export default router
