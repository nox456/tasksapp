import { Router } from "express";

const router = Router()

router.get("/", (req,res) => res.render("index"))

router.get("/tasklist", (req,res) => res.render("taskList"))

export default router
