import { Router } from "express";
import { changeUsername, changePassword, getHabitsAndTasks, deleteAccount } from "../controllers/userControllers.js";

const router = Router();

router.get("/dashboard", (req, res) => {
    res.render("users/dashboard", { user: req.user });
});

router.get("/profile", getHabitsAndTasks);

router.get("/profile/change-username", (req,res) => {
    const message = req.session.message
    delete req.session.message
    res.render("users/changeUsername", { user: req.user, styles: "profile", message })
})

router.get("/profile/change-password", (req,res) => {
    const message = req.session.message
    delete req.session.message
    res.render("users/changePassword", { user: req.user, styles: "profile", message })
})

router.post("/changeUsername", changeUsername)

router.post("/changePassword", changePassword)

router.get("/profile/delete-account", (req,res) => {
    const message = req.session.message
    delete req.session.message
    res.render("users/deleteAccount", { styles: "profile", message, user: req.user })
})

router.post("/deleteAccount", deleteAccount)

export default router;
