import pool from "../database/db.js";
import User from "../models/user.js";

export const getHabitsAndTasks = async (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    const tasks = await pool.query("SELECT * FROM tasks WHERE user_id = $1", [
        req.user.id,
    ]);
    const habits = await pool.query("SELECT * FROM habits WHERE user_id = $1", [
        req.user.id,
    ]);
    const tasksCount = tasks.rows.length;
    const habitsCount = habits.rows.length;

    res.render("users/profile", {
        styles: "profile",
        message,
        user: req.user,
        tasksCount,
        habitsCount,
    });
};

export const changeUsername = async (req, res) => {
    const { password, newUsername, username } = req.body;
    const user = new User(username);

    if (await user.comparePassword(password)) {
        const data = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [newUsername]
        );

        if (data.rows.length == 0) {
            await pool.query(
                "UPDATE users SET username = $1 WHERE username = $2",
                [newUsername, username]
            );
            req.session.message = "Nombre de Usuario Cambiado";
            res.redirect("/profile");
        } else {
            req.session.message = "Este nombre de usuario ya existe";
            res.redirect("/profile/change-username");
        }
    } else {
        req.session.message = "Contraseña Incorrecta";
        res.redirect("/profile/change-username");
    }
};

export const changePassword = async (req, res) => {
    const { password, newPassword, username } = req.body;
    const user = new User(username);

    if (await user.comparePassword(password)) {
        user.password = newPassword;
        user.encryptPassword();
        await pool.query("UPDATE users SET password = $1 WHERE username = $2", [
            user.password,
            username,
        ]);
        req.session.message = "Contraseña Cambiada";
        res.redirect("/profile");
    } else {
        req.session.message = "Contraseña Incorrecta";
        res.redirect("/profile/change-password");
    }
};

export const deleteAccount = async (req, res) => {
    const { username, password } = req.body;
    const user = new User(username);

    if (await user.comparePassword(password)) {
        req.logout((err) => {
            if (err) {
                console.log(err)
            }
            req.session.message = "Cuenta Eliminada"
            res.redirect("/")
        })
        await pool.query("DELETE FROM users WHERE username = $1", [username]);
    } else {
        req.session.message = "Contraseña Incorrecta"
        res.redirect("/profile/delete-account")
    }
};
