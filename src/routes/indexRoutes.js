import { Router } from "express";
import passport from "../passport/localAuth.js";

const router = Router();

router.get("/", (req,res) => {
    const message = req.session.message
    delete req.session.message

    res.render("index", { message })
})

router.get("/dashboard", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("dashboard", { user: req.user});
    } else {
        req.session.message = "Inicie sesion para acceder a Dashboard"
        res.redirect("/");
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
        successRedirect: "/dashboard",
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
        successRedirect: "/dashboard",
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
        res.redirect("/")
    })
});

export default router;
