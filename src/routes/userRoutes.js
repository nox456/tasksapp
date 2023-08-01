import { Router } from "express";
import {
    changeUsername,
    changePassword,
    getUserProfile,
    deleteAccount,
    changeUserImg,
    getScoreTable,
} from "../controllers/userControllers.js";
import Habit from "../models/habit.js";
import Task from "../models/task.js";
import User from "../models/user.js";

const router = Router();

router.get("/dashboard", async (req, res) => {
    const id = req.user.id;
    const user = new User(req.user.username)
    const habitsData = await new Habit().getAll("title ASC", id);
    const tasksData = await new Task().getAll("title ASC", id, false);
    const todayTasks = tasksData.rows.filter((task) => {
        return (
            new Date(task.finish_at).toDateString() == new Date().toDateString()
        );
    });
    const points = await user.getPoints()
    const tasksCount = await user.getTasksCount()
    const tasksDonedCount = await user.getTasksDonedCount()
    const habitsCount = await user.getHabitsCount()

    const message = req.session.message;
    delete req.session.message;

    res.render("users/dashboard", {
        user: req.user,
        habits: habitsData.rows,
        styles: "habits",
        styles2: "tasks",
        styles3: "profile",
        tasks: todayTasks,
        message,
        tasksCount,
        tasksDonedCount,
        habitsCount,
        points,
        noUserImgSidebar: true
    });
});

router.get("/profile", getUserProfile);

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

router.get("/scoretable", getScoreTable)

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

router.post("/profile/userImg", changeUserImg)

export default router;
