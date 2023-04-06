import { Router }  from "express";

const router = Router()

router.get("/tasklist/add", (req,res) => res.render("addTask"))

export default router
