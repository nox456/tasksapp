import { Router } from "express";
import passport from "../passport/localAuth.js";

const router = Router();

router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("index");
    } else {
        res.redirect("/signup");
    }
});

router.get("/signin", (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    res.render("signin_loggin/signin", { styles: "signInputs", message });
});

router.post(
    "/signin",
    passport.authenticate("local-signin", {
        successRedirect: "/",
        failureRedirect: "/signin",
        passReqToCallback: true,
        keepSessionInfo: true,
    })
);

router.get("/signup", (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    res.render("signin_loggin/signup", { styles: "signInputs", message });
});

router.post(
    "/signup",
    passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/signup",
        passReqToCallback: true,
        keepSessionInfo: true,
    })
);

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err)
        }
        req.session.message = "Sesion cerrada"
        res.redirect("/signup")
    })
});

export default router;
