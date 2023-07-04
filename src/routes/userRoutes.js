import { Router } from "express";
import {
    changeUsername,
    changePassword,
    getUserProfile,
    deleteAccount,
    changeUserImg,
} from "../controllers/userControllers.js";
import { selectHabitData } from "../controllers/querys/habitsQuerys.js";
import { selectTaskData } from "../controllers/querys/tasksQuerys.js";
import {
    getHabitsCount,
    getTasksCount,
    getPoints,
} from "../controllers/querys/userQuerys.js";

const router = Router();

router.get("/dashboard", async (req, res) => {
    const id = req.user.id;
    const habitsData = await selectHabitData("title ASC", id);
    const tasksData = await selectTaskData("title ASC", id, false);
    const todayTasks = tasksData.rows.filter((task) => {
        return (
            new Date(task.finish_at).toDateString() == new Date().toDateString()
        );
    });
    const pointsData = await getPoints(id)
    const points = pointsData.rows[0].points
    const tasksCountData = await getTasksCount(id)
    const habitsCountData = await getHabitsCount(id)
    const tasksCount = tasksCountData.rows.length
    const tasksDonedCount = tasksCountData.rows.filter(t => t.done == true).length
    const habitsCount = habitsCountData.rows.length


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
        points
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
