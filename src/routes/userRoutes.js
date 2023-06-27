import { Router } from "express";
import {
    changeUsername,
    changePassword,
    getHabitsAndTasks,
    deleteAccount,
} from "../controllers/userControllers.js";
import { selectHabitData } from "../controllers/querys/habitsQuerys.js";
import { selectTaskData } from "../controllers/querys/tasksQuerys.js";

const router = Router();

router.get("/dashboard", async (req, res) => {
    const user_id = req.user.id;
    const habitsData = await selectHabitData("title ASC", user_id);
    const tasksData = await selectTaskData("title ASC", user_id, false);
    const todayTasks = tasksData.rows.filter(task => {
        return new Date(task.finish_at).toDateString() == new Date().toDateString()
    })

    const message = req.session.message
    delete req.session.message

    res.render("users/dashboard", {
        user: req.user,
        habits: habitsData.rows,
        styles: "habits",
        styles2: "tasks",
        tasks: todayTasks,
        message
    });
});

router.get("/profile", getHabitsAndTasks);

router.get("/profile/change-username", (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    res.render("users/changeUsername", {
        user: req.user,
        styles: "profile",
        message,
    });
});

router.get("/profile/change-password", (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    res.render("users/changePassword", {
        user: req.user,
        styles: "profile",
        message,
    });
});

router.post("/changeUsername", changeUsername);

router.post("/changePassword", changePassword);

router.get("/profile/delete-account", (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    res.render("users/deleteAccount", {
        styles: "profile",
        message,
        user: req.user,
    });
});

router.post("/deleteAccount", deleteAccount);

export default router;
