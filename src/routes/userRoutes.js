import { Router } from "express";
import pool from "../database/db.js";
import User from "../models/user.js";

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

router.get("/profile/change-username", (req,res) => {
    const message = req.session.message
    delete req.session.message
    res.render("users/changeUsername", { user: req.user, styles: "profile", message })
})

router.post("/changeUsername", async (req,res) => {
    const { password, newUsername, username } = req.body
    const user = new User(username)

    if (await user.comparePassword(password)) {
        const data = await pool.query("SELECT * FROM users WHERE username = $1", [newUsername])

        if (data.rows.length == 0) {
            await pool.query("UPDATE users SET username = $1 WHERE username = $2",[newUsername,username])
            req.session.message = "Nombre de Usuario Cambiado"
            res.redirect("/profile")
        } else {
            req.session.message = "Este nombre de usuario ya existe"
            res.redirect("/profile/change-username")
        }

    } else {
        req.session.message = "Contraseña Incorrecta"
        res.redirect("/profile/change-username")
    }
})

export default router;
