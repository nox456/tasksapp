import { Router } from "express";
import pool from "../database/db.js";

const router = Router();

router.get("/dashboard", (req, res) => {
    res.render("users/dashboard", { user: req.user });
});

router.get("/profile", async (req, res) => { 
    const message = req.session.message;
    delete req.session.message;
    const tasks = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [req.user.id])
    const habits = await pool.query("SELECT * FROM habits WHERE user_id = $1", [req.user.id])
    const tasksCount = tasks.rows.length
    const habitsCount = habits.rows.length

    res.render("users/profile", { styles: "profile", message, user: req.user, tasksCount, habitsCount });
});

export default router;
