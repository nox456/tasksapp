import { Router } from "express";

const router = Router();

router.get("/dashboard", (req, res) => {
    res.render("users/dashboard", { user: req.user });
});

router.get("/profile", (req, res) => {
    const message = req.session.message;
    delete req.session.message;

    res.render("users/profile", { styles: "profile", message });
});

export default router;
