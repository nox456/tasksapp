import { Router } from "express";
import passport from "../passport/localAuth.js";

const router = Router();

// Route to main page
router.get("/", (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    if (req.isAuthenticated()) { 
        res.redirect("/dashboard")
    } else { 
        res.render("index", { message });
    }
});

// Route to signin page
router.get("/signin", (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    res.render("signin_loggin/signin", { styles: "signInputs", message });
});

// Route to login a user
router.post(
    "/signin",
    passport.authenticate("local-signin", {
        successRedirect: "/dashboard",
        failureRedirect: "/signin",
        passReqToCallback: true,
        keepSessionInfo: true,
    })
);

// Route to signup page
router.get("/signup", (req, res) => {
    const message = req.session.message;
    delete req.session.message;
    res.render("signin_loggin/signup", { styles: "signInputs", message });
});

// Route to register a user
router.post(
    "/signup",
    passport.authenticate("local-signup", {
        successRedirect: "/dashboard",
        failureRedirect: "/signup",
        passReqToCallback: true,
        keepSessionInfo: true,
    })
);

// Route to logout a user
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        req.session.message = "Sesion cerrada";
        res.redirect("/");
    });
});

// Route to server error
router.get("/error", (req,res) => {
    req.logout((err) => {
        if (err) {
            console.error(err)
        }
        req.session.message = "Error del Servidor"
        res.redirect("/")
    })
})

export default router;
