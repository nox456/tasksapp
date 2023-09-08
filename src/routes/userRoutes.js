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

// Route to dashboard page
router.get("/dashboard", async (req, res) => {
    const id = req.user.id;
    const username = req.user.username
    let habitsData;
    let tasksData;
    let tasksCount;
    let tasksDonedCount;
    let habitsCount;
    try {
        habitsData = await Habit.getAll("title ASC", id);
        tasksData = await Task.getAll("title ASC", id, false);
        tasksCount = await User.getTasksCount(username);
        tasksDonedCount = await User.getTasksDonedCount(username);
        habitsCount = await User.getHabitsCount(username);
    } catch (error) {
        console.error(error)
        return res.redirect("/error")
    }
    const todayTasks = tasksData.rows.filter((task) => {
        return (
            new Date(task.finish_at).toDateString() == new Date().toDateString()
        );
    });

    const message = req.session.message;
    delete req.session.message;

    res.render("users/dashboard", {
        user: req.user,
        habits: habitsData.rows,
        styles: "habits",
        styles2: "tasks",
        styles3: "profile",
        styles4: "dashboard",
        styles5: "inputs",
        tasks: todayTasks,
        message,
        tasksCount,
        tasksDonedCount,
        habitsCount,
        points: req.user.points,
        noUserImgSidebar: true,
    });
});

// Route to profile page
router.get("/profile", getUserProfile);

// Route to change username page
router.get("/profile/change-username", (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    res.render("users/changeUsername", {
        user: req.user,
        styles: "profile",
        styles2: "inputs",
        message,
    });
});

// Route to change password page
router.get("/profile/change-password", (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    res.render("users/changePassword", {
        user: req.user,
        styles: "profile",
        styles2: "inputs",
        message,
    });
});

// Route to clasification page
router.get("/scoretable", getScoreTable);

// Route to change username of a user
router.post("/changeUsername", changeUsername);

// Route to change password of a user
router.post("/changePassword", changePassword);

// Route to delete user page
router.get("/profile/delete-account", (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    res.render("users/deleteAccount", {
        styles: "profile",
        styles2: "inputs",
        message,
        user: req.user,
    });
});

// Route to delete a user
router.post("/deleteAccount", deleteAccount);

// Route to change user image
router.post("/profile/userImg", changeUserImg);

export default router;
