import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/user.js";

const localStrategy = Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let user
    try {
        user = await new User().getById(id)
    } catch (error) {
        return done(error,false)
    }
    return done(null, user);
});

// Authenticate a user and register it
passport.use(
    "local-signin",
    new localStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            const user = new User(username, password);
            try {
                await user.validate(username, password)
            } catch (error) {
                const err = error.errors[0]
                if (err.path[0] == "password") {
                    req.session.passwordMessage = err.message
                    console.log(err.message)
                } else {
                    req.session.usernameMessage = err.message
                    console.log(err.message)
                }
                req.session.message = error.errors[0].message
                return done(null,false)
            }
            let usernameExists
            try {
                usernameExists = await user.usernameExits()   
            } catch (error) {
                return done(error,false)
            }
            if (usernameExists) {
                req.session.message = "Este nombre de usuario ya existe";
                return done(null, false);
            } else {
                user.encryptPassword();
                try {
                    await user.save();
                } catch (error) {
                    done(error,false)
                }
                done(null, user);
            }
        }
    )
);

// Authenticate a user and loggin
passport.use(
    "local-signup",
    new localStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            const user = new User(username);
            try {
                await user.validate(username, password)
            } catch (error) {
                const err = error.errors[0]
                if (err.path[0] == "password") {
                    req.session.passwordMessage = err.message
                    console.log(err.message)
                } else {
                    req.session.usernameMessage = err.message
                    console.log(err.message)
                }
                return done(null,false)
            }
            let comparedUsername
            let comparedPassword
            try {
                comparedUsername = await user.compareUsername(username)
            } catch (error) { 
                return done(error,false)
            }
            if (comparedUsername) {
                req.session.message = "Usuario o Contraseña incorrectos";
                return done(null, false);
            }
            try { 
                await user.setUserFromDB(username);
            } catch (error) {
                return done(error,false)
            }
            try {
                comparedPassword = await user.comparePassword(password)
            } catch (error) { 
                return done(error,false)
            }
            if (!comparedPassword) {
                req.session.message = "Usuario o Contraseña incorrectos";
                return done(null, false);
            }
            done(null, user);
        }
    )
);

export default passport;
